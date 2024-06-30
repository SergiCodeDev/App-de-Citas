"use client"

import Link from "next/link";
import { IconLock, IconMail, IconUser } from "../icon/IconsGroup";
import { useId, useRef } from "react";
import { useForm } from "react-hook-form";

export default function FormLoginAndRegister({ type }) {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const usuarioForm = useId();
    const correoForm = useId();
    const contraForm = useId();
    const confirmarContraForm = useId();

    const handleFocusImput = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.focus();
        }
    };

    const onSubmitLogic = async (data) => {
        console.log(data)
    }

    return (
        <main className="w-full h-lvh flex items-center justify-center">
            <div className="w-1/3 py-7 px-4 max-sm:w-5/6 max-lg:w-2/3 max-xl:w-1/2 flex flex-col items-center justify-center gap-6 bg-white rounded-3xl">
                <img src="/next.svg" alt="logo" className="w-52 h-auto" />
                <form noValidate className="flex flex-col items-center gap-5" onSubmit={handleSubmit(onSubmitLogic)}>
                    {type === "register" && (
                        <div>
                            <div onClick={() => handleFocusImput(usuarioForm)} className="flex items-center justify-between px-5 py-3 rounded-2xl shadow-2xl transition-all duration-200 ease-in-out hover:scale-110 hover:bg-white cursor-text focus-within:scale-110 focus-within:bg-white">
                                <input
                                    defaultValue=""
                                    {...register("usuario", {
                                        required: "Se requiere nombre de usuario",
                                        validate: (value) => {
                                            if (value.length < 3) {
                                                return "El nombre de usuario debe tener al menos 3 caracteres";
                                            }
                                        },
                                    })}
                                    type="text"
                                    name="usuario"
                                    id={usuarioForm}
                                    placeholder="Usuario"
                                    className="w-[300px] max-sm:w-full bg-transparent outline-none"
                                />
                                <IconUser className="h-7" />
                            </div>
                            {errors.usuario && (
                                <p className="text-red-500">{errors.usuario.message}</p>
                            )}
                        </div>
                    )}
                    <div>
                        <div onClick={() => handleFocusImput(correoForm)} className="flex items-center justify-between px-5 py-3 rounded-2xl shadow-2xl transition-all duration-200 ease-in-out hover:scale-110 hover:bg-white cursor-text focus-within:scale-110 focus-within:bg-white">
                            <input
                                defaultValue=""
                                {...register("correo", {
                                    required: "El correo electrónico es requerido",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Ingrese un correo electrónico válido",
                                    },
                                })}
                                type="email"
                                name="correo"
                                id={correoForm}
                                placeholder="Correo"
                                className="w-[300px] max-sm:w-full bg-transparent outline-none"
                            />
                            <IconMail className="h-6" />
                        </div>
                        {errors.correo && (
                            <p className="text-red-500">{errors.correo.message}</p>
                        )}
                    </div>
                    <div>
                        <div onClick={() => handleFocusImput(contraForm)} className="flex items-center justify-between px-5 py-3 rounded-2xl shadow-2xl transition-all duration-200 ease-in-out hover:scale-110 hover:bg-white cursor-text focus-within:scale-110 focus-within:bg-white">
                            <input
                                defaultValue=""
                                {...register("contra", {
                                    required: "Se requiere contraseña",
                                    validate: (value) => {
                                        if (
                                            value.length < 8 ||
                                            !value.match(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/)
                                        ) {
                                            return "La contraseña debe tener al menos 8 caracteres, contener al menos una letra mayuscula, un numero y un carácter especial";
                                        }
                                    },
                                })}
                                type="password"
                                name="contra"
                                id={contraForm}
                                placeholder="Contraseña"
                                className="w-[300px] max-sm:w-full bg-transparent outline-none"
                            />
                            <IconLock className="h-6" />
                        </div>
                        {errors.contra && (
                            <p className="text-red-500">{errors.contra.message}</p>
                        )}
                    </div>

                    {type === "register" && (
                        <div>
                            <div onClick={() => handleFocusImput(confirmarContraForm)} className="flex items-center justify-between px-5 py-3 rounded-2xl shadow-2xl transition-all duration-200 ease-in-out hover:scale-110 hover:bg-white cursor-text focus-within:scale-110 focus-within:bg-white">
                                <input
                                    defaultValue=""
                                    {...register("confirmarContra", {
                                        required: "Se requiere contraseña",
                                        validate: (value) => {
                                            if (value === watch("contra")) {
                                                return true
                                            } else {
                                                return "Las contraseñas no coinciden"
                                            }
                                        }
                                    })}
                                    type="password"
                                    name="confirmarContra"
                                    id={confirmarContraForm}
                                    placeholder="Repetir contraseña"
                                    className="w-[300px] max-sm:w-full bg-transparent outline-none"
                                />
                                <IconLock className="h-6" />
                            </div>
                            {errors.confirmarContra && (
                                <p className="text-red-500">{errors.confirmarContra.message}</p>
                            )}
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
                    <pre style={{ width: "400px" }}>{JSON.stringify(watch(), null, 2)}</pre>
                </form>
            </div>
        </main>
    )
}