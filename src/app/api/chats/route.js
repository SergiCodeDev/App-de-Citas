import Chat from "@models/Chat";
import User from "@models/User";
import { connectToDB } from "@mongodb";

export const POST = async (req) => {
  try {
    await connectToDB();

    const body = await req.json();

    const { currentUserId, members } = body;

    const query = { members: { $all: [currentUserId, ...members], $size: 2 } }

    let chat = await Chat.findOne(query);

    if (!chat) {
      chat = await new Chat(
        { members: [currentUserId, ...members] }
      );

      await chat.save();

      const updateAllMembers = chat.members.map(async (memberId) => {
        await User.findByIdAndUpdate(
          memberId,
          {
            $addToSet: { chats: chat._id },
          },
          { new: true }
        );
      }) 
      Promise.all(updateAllMembers);
      
      /* Activa un evento para que cada miembro notifique un nuevo chat */
    }


    return new Response(JSON.stringify(chat), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to create a new chat", { status: 500 })
  }
};
