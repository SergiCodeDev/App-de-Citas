"use client"

import Link from "next/link";
import { IconLock, IconMail, IconUser } from "@/components/icon/IconsGroup";
import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react"
import Cargando from "@/components/loader/cargando";

export default function Perfil() {
    const { data: session } = useSession()
    const user = session?.user
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        if (user) {
            reset({
                usuario: user?.username,
                fotoDePerfil: user?.profileImage,
                edad: user?.age,
                ciudad: user?.location,
                descripcion: user?.bio
            })
        }
        setCargando(false)
    }, [user])

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

    const fotoDePerfilForm = useId();
    const usuarioForm = useId();
    const edadForm = useId();
    const ciudadForm = useId();
    const confirmarContraForm = useId();

    const handleFocusImput = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.focus();
        }
    };

    // Observar el campo de entrada del archivo
    const selectedFile = watch("fotoDePerfil");

    // Generar la URL de la imagen para previsualización
    const previewImageUrl = selectedFile && selectedFile.length > 0
        ? URL.createObjectURL(selectedFile[0])
        : user?.profileImage || "/assets/default-user.jpg";

    // Función para permitir solo números en el campo de entrada y limitar a 0-130
    const handleNumericInput = (e) => {
        // Obtener el valor actual del campo
        let value = e.target.value;

        // Remover caracteres que no sean números
        value = value.replace(/\D/g, '');

        // Limitar a 0-130
        if (value === '') {
            // Si el campo está vacío, dejarlo como está
            e.target.value = value;
        } else {
            // Convertir a número entero
            const intValue = parseInt(value, 10);

            // Limitar a 0-130
            if (intValue < 0) {
                value = '0';
            } else if (intValue > 130) {
                value = '130';
            }

            // Actualizar el valor en el campo de entrada
            e.target.value = value;
        }
    };


    const router = useRouter()

    const onSubmitLogic = async (data) => {

    }

    return cargando ? <Cargando /> : (
        <main className="w-full h-lvh flex items-center justify-center">
            <div className="w-1/3 py-7 px-4 max-sm:w-5/6 max-lg:w-2/3 max-xl:w-1/2 flex flex-col items-center justify-center gap-6 bg-white rounded-3xl shadow-2xl shadow-pink-400/60">
                <img src="/next.svg" alt="logo" className="w-52 h-auto" />
                <form noValidate className="flex flex-col items-center gap-5" onSubmit={handleSubmit(onSubmitLogic)}>

                    <div className="max-sm:w-72 w-96">
                        <img
                            src={previewImageUrl}
                            alt="Foto de perfil"
                            className="w-32 h-32 rounded-full object-cover object-center m-auto mb-2"
                        />
                        <div onClick={() => handleFocusImput(fotoDePerfilForm)} className="flex items-center justify-between px-5 py-3 rounded-2xl shadow-2xl transition-all duration-200 ease-in-out hover:scale-110 hover:bg-white cursor-text focus-within:scale-110 focus-within:bg-white shadow-pink-400/60">

                            <input
                                defaultValue=""
                                {...register("fotoDePerfil", {
                                    required: "Se requiere nombre de usuario.",
                                    validate: async (file) => {
                                        const validTypes = ['image/jpeg', 'image/png'];
                                        if (!validTypes.includes(file[0].type)) {
                                            return 'Sólo se permiten archivos JPEG y PNG.';
                                        }
                                        if (file[0].size > 2 * 1024 * 1024) { // 2MB
                                            return 'El tamaño del archivo no debe exceder los 2 MB.';
                                        }
                                        /* 
                                        // Validar dimensiones de la imagen
                                        const isValidDimensions = await new Promise((resolve) => {
                                            const img = new Image();
                                            img.src = URL.createObjectURL(file);
                                            img.onload = () => {
                                                const isSquare = img.width === img.height && img.width <= 1080;
                                                const isFourThree = img.width / img.height === 4 / 3 && img.width <= 1080;
                                                const isFourFive = img.width / img.height === 4 / 5 && img.width <= 1080 && img.height <= 1350;
                                                if (isSquare || isFourThree || isFourFive) {
                                                    resolve(false);
                                                } else {
                                                    resolve(true);
                                                }
                                            };
                                            img.onerror = () => {
                                                resolve(false);
                                            };
                                        });

                                        if (!isValidDimensions) {
                                            return 'Las dimensiones de la imagen no deben exceder los 1920 x 1080 píxeles.';
                                        }
                                        */

                                        return true;
                                    }
                                })}
                                type="file"
                                name="fotoDePerfil"
                                id={fotoDePerfilForm}
                                placeholder="Foto de perfil"
                                className="w-[300px] max-sm:w-full bg-transparent outline-none file:bg-pink-400 file:text-white file:border-none file:rounded-s-3xl"
                            />
                            <IconUser className="h-7" />
                        </div>
                        {errors.fotoDePerfil && (
                            <p className="text-red-500 px-5 pt-3 pb-0">{errors.fotoDePerfil.message}</p>
                        )}
                    </div>

                    <div className="max-sm:w-72 w-96">
                        <div onClick={() => handleFocusImput(usuarioForm)} className="flex items-center justify-between px-5 py-3 rounded-2xl shadow-2xl transition-all duration-200 ease-in-out hover:scale-110 hover:bg-white cursor-text focus-within:scale-110 focus-within:bg-white shadow-pink-400/60">
                            <input
                                defaultValue=""
                                {...register("usuario", {
                                    required: "Se requiere nombre de usuario.",
                                    minLength: {
                                        value: 3,
                                        message: "El nombre de usuario debe tener al menos 3 caracteres."
                                    },
                                    maxLength: {
                                        value: 30,
                                        message: "El nombre de usuario no debe tener más de 30 caracteres."
                                    }
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
                            <p className="text-red-500 px-5 pt-3 pb-0">{errors.usuario.message}</p>
                        )}
                    </div>

                    <div className="max-sm:w-72 w-96">
                        <div onClick={() => handleFocusImput(edadForm)} className="flex items-center justify-between px-5 py-3 rounded-2xl shadow-2xl transition-all duration-200 ease-in-out hover:scale-110 hover:bg-white cursor-text focus-within:scale-110 focus-within:bg-white shadow-pink-400/60">
                            <input
                                defaultValue=""
                                {...register("edad", {
                                    required: false,
                                })}
                                type="email"
                                name="correo"
                                id={edadForm}
                                placeholder="Edad"
                                className="w-[300px] max-sm:w-full bg-transparent outline-none"
                                onInput={handleNumericInput}
                            />
                            <IconMail className="h-6" />
                        </div>
                        {errors.edad && (
                            <p className="text-red-500 px-5 pt-3 pb-0">{errors.edad.message}</p>
                        )}
                    </div>
                    <div className="max-sm:w-72 w-96">
                        <div onClick={() => handleFocusImput(ciudadForm)} className="flex items-center justify-between px-5 py-3 rounded-2xl shadow-2xl transition-all duration-200 ease-in-out hover:scale-110 hover:bg-white cursor-text focus-within:scale-110 focus-within:bg-white shadow-pink-400/60">
                            <input
                                defaultValue=""
                                {...register("ciudad", {
                                    required: false,
                                    minLength: {
                                        value: 1, 
                                        message: "La ciudad debe tener al menos 1 caracter."
                                    },
                                    maxLength: {
                                        value: 100,
                                        message: "La ciudad no debe tener más de 100 caracteres."
                                    }
                                })}
                                type="text"
                                name="ciudad"
                                id={ciudadForm}
                                placeholder="Ciudad"
                                className="w-[300px] max-sm:w-full bg-transparent outline-none"
                            />
                            <IconLock className="h-6" />
                        </div>
                        {errors.ciudad && (
                            <p className="text-red-500 px-5 pt-3 pb-0">{errors.ciudad.message}</p>
                        )}
                    </div>


                    <div className="max-sm:w-72 w-96">
                        <div onClick={() => handleFocusImput(confirmarContraForm)} className="flex items-center justify-between px-5 py-3 rounded-2xl shadow-2xl transition-all duration-200 ease-in-out hover:scale-110 hover:bg-white cursor-text focus-within:scale-110 focus-within:bg-white shadow-pink-400/60">
                            <input
                                defaultValue=""
                                {...register("confirmarContra", {
                                    required: "Se requiere confirmar contraseña.",
                                    validate: (value) => {
                                        if (value === watch("contra")) {
                                            return true
                                        } else {
                                            return "Las contraseñas no coinciden."
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
                            <p className="text-red-500 px-5 pt-3 pb-0">{errors.confirmarContra.message}</p>
                        )}
                    </div>


                    <button type="submit" className="w-full px-5 py-3 mt-5 mb-7 rounded-xl cursor-pointer bg-pink-500 hover:bg-pink-600 text-white text-body-bold transition-colors duration-200 ease-in-out font-medium">
                        Guardar cambios
                    </button>

                    {/* <pre style={{ width: "400px" }}>{JSON.stringify(watch(), null, 2)}</pre> */}
                </form>
            </div>
        </main>
    )
}