import User from "@/models/User";
import { connectToDB } from "@/mongodb";
// buscar alternativas 
// import { hash } from "bcryptjs"; // compatibilidad 
import { hash } from "bcrypt"; // +rapidez -compatibilidad

export const POST = async (req) => {
    try {
        await connectToDB();

        const body = await req.json();

        const { username, email, password } = body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return new Response(JSON.stringify({ error: "El usuario ya existe" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const hashedPassword = await hash(password, process.env.SALT_ROUNDS);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return new Response(JSON.stringify(newUser), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: "Fallo al crear un nuevo usuario" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
