import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/",
    signOut: "/explorar"
  }
});

export const config = { 
  matcher: [
    "/chat/:path*",
    "/explorar/:path*",
    "/perfil/:path*",
  ]
};