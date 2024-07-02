import { Inter } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/navegacion/NavBar";
import ToastCustom from "@/components/toast/ToastCustom";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CiteApp",
  description: "App de citas para encontrar el amor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ToastCustom />
        <NavBar />
        {children}
        </body>
    </html>
  );
}
