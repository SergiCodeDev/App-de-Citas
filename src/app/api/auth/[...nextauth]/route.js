import User from "@/models/User";
import { connectToDB } from "@/mongodb";
import { compare } from "bcrypt";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials, req) {
                if (!credentials.correo || !credentials.contra) {
                    throw new Error("Correo o contraseña incorrectos")
                }

                await connectToDB()

                const user = await User.findOne({ email: credentials.correo });

                if (!user || !user?.password) {
                    throw new Error("Correo o contraseña incorrectos");
                }

                const isMatch = await compare(credentials.contra, user.password);

                if (!isMatch) {
                    throw new Error("Correo o contraseña incorrectos"); // <- Generico // Contraseña incorrecta
                }

                return user // cambiar esto y limitar lo que se devuelve?
            }
        })
    ],

    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
      async session({session}) {
        const mongodbUser = await User.findOne({ email: session.user.email })
        session.user.id = mongodbUser._id.toString()
  
        session.user = {...session.user, ...mongodbUser._doc} // cambiar lo que le pasamos al front 
  
        return session
      }
    }

})

export { handler as GET, handler as POST }
