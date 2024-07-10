import User from "@/models/User";
import { connectToDB } from "@/mongodb";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const { userId } = await params;

    if (!userId) {
      return new Response("ID de usuario no proporcionado", { status: 400 });
    }

    const currentUser = await User.findById(userId);

    if (!currentUser) {
      return new Response("Usuario no encontrado", { status: 404 });
    }

    
    const user = await User.findOne({
      _id: { $ne: userId },
      _id: { $nin: [...currentUser.likes, ...currentUser.dislikes] }
    }).exec();
    
/* 
    const user = await User.findOne({
      _id: { $ne: userId },
      $nor: [
        { _id: { $in: currentUser.likes } },
        { _id: { $in: currentUser.dislikes } }
      ]
    }).exec();
     */
    /* 
    if (!user) {
      return new Response("Ningún usuario disponible", { status: 404 });
    }
    */

    if (!user) {
      return new Response("No hay más usuarios para mostrar", { status: 204 });
    }

    // Seleccionar las propiedades específicas del usuario que deseas devolver
    const userToSend = {
      _id: user._id,
      username: user.username,
      profileImage: user.profileImage,
      age: user.age,
      location: user.location,
      bio: user.bio
    };

    return new Response(JSON.stringify(userToSend), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Error al recuperar usuario", { status: 500 });
  }
}
