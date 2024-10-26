import User from "@/models/User";
import { connectToDB } from "@/mongodb";

export const GET = async (req, { params }) => {
    try {
        // Establece la conexión a la base de datos.
        await connectToDB();

        // Extrae el userId de los parámetros de la solicitud.
        const { userId } = await params;

        // Verifica si el userId está presente en la solicitud.
        if (!userId) {
            // Si falta el userId, devuelve una respuesta de error 400 (Bad Request).
            return new Response("Faltan parámetros necesarios", { status: 400 });
        }

        // Busca el usuario actual en la base de datos por su ID.
        const currentUser = await User.findById(userId).exec();

        // Verifica si el usuario fue encontrado.
        if (!currentUser) {
            // Si el usuario no se encuentra, devuelve una respuesta de error 404 (Not Found).
            return new Response("Usuario no encontrado", { status: 404 });
        }

        // Encuentra los usuarios que el usuario actual ha dado "like" pero que no están en la lista de "matches".
        const potentialMatches = await User.find({
            _id: { $in: currentUser.likes },  // Filtra usuarios que están en la lista de "likes" del usuario actual.
            likes: userId,                    // Verifica si estos usuarios también han dado "like" al usuario actual.
            _id: { $nin: currentUser.matches } // Excluye usuarios que ya están en la lista de "matches".
        }).exec();

        // Inicializa un array para almacenar las nuevas coincidencias.
        const newMatches = [];

        // Recorre cada usuario potencial para verificar si es una coincidencia.
        for (const user of potentialMatches) {
            // Verifica si el usuario también ha dado "like" al usuario actual.
            if (user.likes.includes(userId)) {
                // Agrega el usuario a la lista de nuevas coincidencias.
                newMatches.push(user);
                // Actualiza la lista de "matches" del usuario actual y del usuario coincidente.
                await User.updateOne({ _id: userId }, { $addToSet: { matches: user._id } });
                await User.updateOne({ _id: user._id }, { $addToSet: { matches: userId } });
            }
        }

        // Devuelve la lista de nuevas coincidencias en formato JSON con una respuesta de estado 200 (OK).
        return new Response(JSON.stringify(newMatches), { status: 200 });
    } catch (err) {
        // Captura cualquier error que ocurra durante el proceso.
        console.log(err);
        // Devuelve una respuesta de error 500 (Internal Server Error) si ocurre un problema.
        return new Response("Error al procesar la solicitud", { status: 500 });
    }
};