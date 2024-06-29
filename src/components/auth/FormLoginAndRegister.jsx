"use client"

import Link from "next/link";
import { IconLock, IconMail, IconUser } from "../icon/IconsGroup";
import { useRef } from "react";

export default function FormLoginAndRegister({ type }) {

    const usuario = useRef(null);
    const correo = useRef(null);
    const contraUno = useRef(null);
    const contraDos = useRef(null);
  
    const handleFocusImput = (ref) => {
      ref.current.focus();
    };

    return (
        <main className="w-full h-lvh flex items-center justify-center">
            <div className="w-1/3 py-7 px-4 max-sm:w-5/6 max-lg:w-2/3 max-xl:w-1/2 flex flex-col items-center justify-center gap-6 bg-white rounded-3xl">
                <img src="/next.svg" alt="logo" className="w-52 h-auto" />
                <form action="" className="flex flex-col items-center gap-5">
                    {type === "register" && (
                        <div onClick={() => handleFocusImput(usuario)} className="flex items-center justify-between px-5 py-3 rounded-2xl shadow-2xl transition-all duration-200 ease-in-out hover:scale-110 hover:bg-white cursor-text">
                            <input ref={usuario} type="text" name="" id="usuario" placeholder="Usuario" className="w-[300px] max-sm:w-full bg-transparent outline-none" />
                            <IconUser className="h-7" />
                        </div>
                    )}

                    <div onClick={() => handleFocusImput(correo)} className="flex items-center justify-between px-5 py-3 rounded-2xl shadow-2xl transition-all duration-200 ease-in-out hover:scale-110 hover:bg-white cursor-text">
                        <input ref={correo} type="email" name="" id="correo" placeholder="Correo" className="w-[300px] max-sm:w-full bg-transparent outline-none" />
                        <IconMail className="h-6" />
                    </div>
                    <div onClick={() => handleFocusImput(contraUno)} className="flex items-center justify-between px-5 py-3 rounded-2xl shadow-2xl transition-all duration-200 ease-in-out hover:scale-110 hover:bg-white cursor-text">
                        <input ref={contraUno} type="password" name="" id="contraUno" placeholder="Contraseña" className="w-[300px] max-sm:w-full bg-transparent outline-none" />
                        <IconLock className="h-6" />
                    </div>

                    {type === "register" && (
                        <div onClick={() => handleFocusImput(contraDos)} className="flex items-center justify-between px-5 py-3 rounded-2xl shadow-2xl transition-all duration-200 ease-in-out hover:scale-110 hover:bg-white cursor-text">
                            <input ref={contraDos} type="password" name="" id="contraDos" placeholder="Repetir contraseña" className="w-[300px] max-sm:w-full bg-transparent outline-none" />
                            <IconLock className="h-6" />
                        </div>
                    )}

                    <button type="submit" className="w-full px-5 py-3 mt-5 mb-7 rounded-xl cursor-pointer bg-pink-500 hover:bg-pink-600 text-white text-body-bold transition-colors duration-200 ease-in-out font-medium">
                        {type === "register" ? "Registrase Gratis" : "Inicia sesión"}
                    </button>

                    {type === "register" ? (
                        <Link href="/login" className="hover:text-pink-600 transition-colors duration-200 ease-in-out">
                            <p className="text-center">¿Ya tienes una cuenta? Inicia sesión aquí.</p>
                        </Link>
                    ) : (
                        <Link href="/register" className="hover:text-pink-600 transition-colors duration-200 ease-in-out">
                            <p className="text-center">¿No tienes una cuenta? Regístrese aquí.</p>
                        </Link>
                    )}
                </form>
            </div>
        </main>
    )
}