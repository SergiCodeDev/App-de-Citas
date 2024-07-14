"use client"

import { IconCalendar, IconCity, IconDescription, IconUser } from "@/components/icon/IconsGroup";
import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react"
import Cargando from "@/components/loader/cargando";

export default function Perfil() {
    const { data: session } = useSession()
    const user = session?.user
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        if (user) {
            reset({
                usuario: user?.username,
                fotoDePerfil: null,
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

    const updateUser = async (data) => {
        setCargando(true);
        const formData = new FormData();

        // Agregar cada campo al formData
        formData.append("usuario", data.usuario);
        // Verificar si se proporcionó alguna imagen antes de agregarla al formData
        if (data.fotoDePerfil && data.fotoDePerfil.length > 0) {
            formData.append("fotoDePerfil", data.fotoDePerfil[0]);
        }
        formData.append("edad", data.edad);
        formData.append("ciudad", data.ciudad);
        formData.append("descripcion", data.descripcion);


        try {
            const res = await fetch(`/api/users/${user._id}/update`, {
                method: "PUT",
                body: formData,
            });

            if (res.ok) {
                setCargando(false);
                window.location.reload();
            } else {
                toast.error("Hubo un problema al actualizar el perfil");
            }

        } catch (error) {
            console.error("Error al actualizar el perfil:", error);
            toast.error("Hubo un error al intentar actualizar el perfil");
        }
    };

    const fotoDePerfilForm = useId();
    const usuarioForm = useId();
    const edadForm = useId();
    const ciudadForm = useId();
    const descripcionForm = useId();

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

    return cargando ? <Cargando /> : (
        <main className="w-full min-h-[calc(100lvh-60px)] flex items-center justify-center bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50">
            <div className="w-1/3 py-7 px-4 max-sm:w-5/6 max-lg:w-2/3 max-xl:w-1/2 flex flex-col items-center justify-center gap-6 bg-white rounded-3xl shadow-2xl shadow-pink-400/60  max-sm:my-4 my-12">
                <form noValidate className="flex flex-col items-center gap-5" onSubmit={handleSubmit(updateUser)}>

                    <div className="max-sm:w-72 w-96">
                        <img
                            src={previewImageUrl}
                            alt="Foto de perfil"
                            className="w-32 h-32 rounded-full object-cover object-center m-auto mb-6"
                        />
                        <div onClick={() => handleFocusImput(fotoDePerfilForm)} className="flex items-center justify-between rounded-2xl shadow-2xl transition-all duration-200 ease-in-out hover:scale-110 hover:bg-white focus-within:scale-110 focus-within:bg-white shadow-pink-400/60">

                            <input
                                defaultValue=""
                                {...register("fotoDePerfil", {
                                    required: false,
                                    validate: async (file) => {
                                        if (file) {
                                            const validTypes = ['image/jpeg', 'image/png'];
                                            if (!validTypes.includes(file[0].type)) {
                                                return 'Sólo se permiten archivos JPEG y PNG.';
                                            }
                                            if (file[0].size > 2 * 1024 * 1024) { // 2MB
                                                return 'El tamaño del archivo supera los 2 MB.';
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
                                        }

                                        return true;
                                    }
                                })}
                                type="file"
                                name="fotoDePerfil"
                                id={fotoDePerfilForm}
                                accept="image/jpeg, image/png"
                                className="w-[328px] max-sm:w-full bg-transparent outline-none file:bg-pink-400 file:hover:bg-pink-500 file:pl-5 file:pr-[10px] file:mr-[10px] file:cursor-pointer cursor-pointer file:transition-color file:duration-200 file:ease-in-out file:text-white file:border-none file:rounded-s-2xl file:h-12"
                            />
                            <img
                                src={previewImageUrl}
                                alt="Foto de perfil"
                                className="w-6 h-6 rounded-full object-cover object-center mr-5"
                            />
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
                            <IconUser className="h-6" />
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
                                type="text"
                                name="edad"
                                id={edadForm}
                                placeholder="Edad"
                                className="w-[300px] max-sm:w-full bg-transparent outline-none"
                                onInput={handleNumericInput}
                            />
                            <IconCalendar className="h-6" />
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
                            <IconCity className="h-6" />
                        </div>
                        {errors.ciudad && (
                            <p className="text-red-500 px-5 pt-3 pb-0">{errors.ciudad.message}</p>
                        )}
                    </div>


                    <div className="max-sm:w-72 w-96">
                        <div onClick={() => handleFocusImput(descripcionForm)} className="flex items-center justify-between px-5 py-3 rounded-2xl shadow-2xl transition-all duration-200 ease-in-out hover:scale-110 hover:bg-white cursor-text focus-within:scale-110 focus-within:bg-white shadow-pink-400/60">
                            <textarea
                                defaultValue=""
                                {...register("descripcion", {
                                    required: false,
                                    maxLength: {
                                        value: 300,
                                        message: "La descripción no debe tener más de 500 caracteres."
                                    }
                                })}
                                type="password"
                                name="descripcion"
                                id={descripcionForm}
                                placeholder="Descripción"
                                className="w-[300px] max-sm:w-full bg-transparent outline-none"
                                rows="5"
                            />
                            <IconDescription className="h-6" />
                        </div>
                        {errors.descripcion && (
                            <p className="text-red-500 px-5 pt-3 pb-0">{errors.descripcion.message}</p>
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