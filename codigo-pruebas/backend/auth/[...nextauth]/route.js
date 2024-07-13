import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
   providers: [
  CredentialsProvider({
    // El nombre para mostrar en el formulario de inicio de sesión (por ejemplo, 'Iniciar sesión con...')
    name: 'Credentials',
    // Las credenciales se utilizan para generar un formulario adecuado en la página de inicio de sesión.
    // Puedes especificar los campos que esperas que se envíen.
    // por ejemplo, dominio, nombre de usuario, contraseña, token 2FA, etc.
    // Puedes pasar cualquier atributo HTML a la etiqueta <input> a través del objeto.
    credentials: {
      username: { label: "Username", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      // Necesitas proporcionar tu propia lógica aquí que tome las credenciales
      // enviadas y devuelva un objeto que represente a un usuario o un valor
      // que sea falso/nulo si las credenciales son inválidas.
      // por ejemplo, return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
      // También puedes usar el objeto `req` para obtener parámetros adicionales
      // (es decir, la dirección IP de la solicitud)
      const res = await fetch("/your/endpoint", {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { "Content-Type": "application/json" }
      })
      const user = await res.json()

      // Si no hay error y tenemos datos del usuario, devuélvelos
      if (res.ok && user) {
        return user
      }
      // Devuelve null si no se pudieron recuperar los datos del usuario
      return null
    }
  })
]
  
})

export { handler as GET, handler as POST }