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

/*

// si se comprobara el match al dar like

import User from "@/models/User";
import { connectToDB } from "@/mongodb";
import mongoose from "mongoose";

export const POST = async (req) => {
  // Inicia una nueva sesión de transacción
  const session = await mongoose.startSession();

  try {
    // Conéctate a la base de datos
    await connectToDB();
    
    // Inicia la transacción
    session.startTransaction();

    // Extrae los datos del cuerpo de la solicitud
    const { userId, userToLikeId, action: like } = await req.json();

    // Verifica que los parámetros sean válidos
    if (!userId || !userToLikeId || typeof like !== "boolean") {
      await session.abortTransaction();  // Aborta la transacción en caso de parámetros inválidos
      session.endSession();
      return new Response("Faltan parámetros necesarios o parámetros incorrectos", { status: 400 });
    }

    // Encuentra los documentos de usuario actuales y el usuario al que se le dio "like"
    const currentUser = await User.findById(userId).session(session);
    const userToLike = await User.findById(userToLikeId).session(session);

    // Verifica si ambos usuarios existen
    if (!currentUser || !userToLike) {
      await session.abortTransaction();  // Aborta la transacción si algún usuario no se encuentra
      session.endSession();
      return new Response("Usuario no encontrado", { status: 404 });
    }

    // Actualiza el registro de "likes" y "dislikes" del usuario actual
    if (like) {
      currentUser.likes.addToSet(userToLikeId);  // Agrega el ID del usuario al array de "likes"
      currentUser.dislikes.pull(userToLikeId);   // Elimina el ID del usuario del array de "dislikes"

      // Guarda los cambios para el usuario actual
      await currentUser.save();

      // Verifica si el usuario al que se le dio "like" también ha dado "like" al usuario actual
      if (userToLike.likes.includes(userId)) {
        currentUser.matches.addToSet(userToLikeId);  // Agrega el ID del usuario a la lista de coincidencias del usuario actual
        userToLike.matches.addToSet(userId);         // Agrega el ID del usuario actual a la lista de coincidencias del usuario al que se le dio "like"

        // Guarda los cambios para el usuario al que se le dio "like"
        await userToLike.save();
      }
    } else {
      // Si el "action" es "false", significa que el usuario dio un "dislike"
      currentUser.dislikes.addToSet(userToLikeId);  // Agrega el ID del usuario al array de "dislikes"
      currentUser.likes.pull(userToLikeId);         // Elimina el ID del usuario del array de "likes"

      // Guarda los cambios para el usuario actual
      await currentUser.save();
    }

    // Confirma la transacción si todo ha ido bien
    await session.commitTransaction();
    session.endSession();

    return new Response("Acción registrada correctamente", { status: 200 });
  } catch (err) {
    console.log(err);
    await session.abortTransaction();  // Aborta la transacción en caso de error
    session.endSession();
    return new Response("Error al procesar la solicitud", { status: 500 });
  }
};

*/
