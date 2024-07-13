import User from "@/models/User";
import { connectToDB } from "@/mongodb";

export const POST = async (req) => {
  try {
    await connectToDB();

    const { userId, userToLikeId, action: like } = await req.json();
    
    console.log("Inicio de la función route.js")
    console.log(userId, userToLikeId, like)

    if (!userId || !userToLikeId || typeof like !== "boolean") {
      return new Response("Faltan parámetros necesarios o parámetros incorrectos", { status: 400 });
    }

    const currentUser = await User.findById(userId);

    if (!currentUser) {
      return new Response("Usuario no encontrado", { status: 404 });
    }

    if (like) {
      // Agregar userToLikeId a likes si no está presente
      currentUser.likes.addToSet(userToLikeId);

      // Eliminar userToLikeId de dislikes si está presente
      currentUser.dislikes.pull(userToLikeId);
    }
    
    if (!like) {
      // Agregar userToLikeId a dislikes si no está presente
      currentUser.dislikes.addToSet(userToLikeId);

      // Eliminar userToLikeId de likes si está presente
      currentUser.likes.pull(userToLikeId);
    }

    await currentUser.save();

    return new Response("Acción registrada correctamente", { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Error al procesar la solicitud", { status: 500 });
  }
};
