import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import Chat from '@/models/Chat';
import { pusherServer } from '@/lib/pusher';

export const POST = async (req) => {
  await connectToDatabase();

  const { userId, targetId } = await req.json();

  try {
    const user = await User.findById(userId);
    const target = await User.findById(targetId);

    if (!user || !target) {
      return new Response(JSON.stringify({ success: false, message: 'User not found' }), { status: 404 });
    }

    // Añadir targetId a los likes del usuario
    if (!user.likes.includes(targetId)) {
      user.likes.push(targetId);
    }

    // Verificar si el target ya ha dado like al usuario
    if (target.likes.includes(userId)) {
      if (!user.matches.includes(targetId)) {
        user.matches.push(targetId);
      }
      if (!target.matches.includes(userId)) {
        target.matches.push(userId);
      }

      // Crear un nuevo chat entre los usuarios si aún no existe
      const existingChat = await Chat.findOne({ members: { $all: [userId, targetId] } });
      if (!existingChat) {
        const chat = new Chat({
          members: [userId, targetId],
        });

        user.chats.push(chat._id);
        target.chats.push(chat._id);

        await chat.save();
      }

      // Guardar los cambios en el usuario target y notificar sobre el match usando Pusher
      await target.save();
      await pusherServer.trigger(targetId.toString(), "new-match", { matchUserId: userId });
    }

    await user.save();

    return new Response(JSON.stringify({ success: true, data: user }), { status: 200 });
  } catch (error) {
    console.error("Failed to process like", error);
    return new Response(JSON.stringify({ success: false, message: 'Failed to process like' }), { status: 500 });
  }
};
