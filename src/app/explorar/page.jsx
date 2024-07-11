"use client"
import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";

export default function Explorar() {
    const { data: session } = useSession()
    const [user, setUser] = useState(null);
    const [errorData, setErrorData] = useState(false)
    const userId = session?.user?._id;

    useEffect(() => {

        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/users/${userId}/getuser`);

                if (!response.ok) {
                    setErrorData(true)
                    throw new Error(`Error: ${response.status}`);
                }

                // No quedan usuarios para mostrar
                if (response.status === 204) {
                    setUser(null);
                    setErrorData(false)
                    return;
                }

                setErrorData(false)
                const data = await response.json();
                setUser(data);
            } catch (err) {
                console.log(err.message);
            }
        }

        if (userId) {
            fetchUser();
        }

    }, [userId]);

    return (
        <main className='"w-full min-h-lvh flex items-center justify-center'>
            {errorData ? (
                <p>¡Ups! Algo salió mal.</p>
            )
                : user
                    ? (<div className='flex items-center flex-col gap-6'>
                        <div className='max-sm:w-5/6 max-md:w-6/12 max-lg:w-5/12 max-xl:w-4/12 max-2xl:w-3/12 w-1/5 flex flex-col items-center justify-center bg-white rounded-3xl shadow-2xl shadow-pink-400/60'>

                            <div className='relative w-full'>
                                <img
                                    className='w-full h-full rounded-t-3xl rounde object-cover object-center'
                                    src={user?.profileImage || "/assets/default-user.jpg"}
                                    alt={user?.username}
                                />
                                <div className='absolute bottom-2 left-2'>
                                    <div className='px-3 py-1 text-white backdrop-blur-md rounded-2xl shadow-[0_0_12px] shadow-white/40 transition-all ease-in-out duration-300 hover:backdrop-blur-lg flex flex-wrap items-end gap-1'>
                                        <h1 className=' text-xl font-semibold truncate hover:overflow-visible hover:whitespace-normal max-w-[16ch]'>{user?.username}</h1>
                                        <p className='text-lg translate-y-[1px] font-semibold'>{user?.age}</p>
                                    </div>
                                </div>
                                {user?.location && <div className='absolute top-2 right-2'>
                                    <p
                                        className='px-3 py-1 text-white font-medium backdrop-blur-md rounded-2xl shadow-[0_0_12px] shadow-white/40 truncate hover:overflow-visible hover:whitespace-normal max-w-[20ch] transition-all ease-in-out duration-300 hover:backdrop-blur-lg'
                                    >
                                        {user?.location}
                                    </p>
                                </div>}
                                {/* poner bg-black/40 y hacer verificacion si exite el campo */}

                            </div>
                            <div className='py-7 px-4 w-full'>
                                <p>{user?.bio}</p>
                            </div>

                        </div>
                        <div className='flex gap-10'>
                            <button className='bg-green-300 w-16 h-16 rounded-full'>Like</button>
                            <button className='bg-red-300 w-16 h-16 rounded-full'>DisLike</button>
                        </div>
                    </div>
                    )
                    : (
                        <p>No hay más usuarios para mostrar</p>
                    )
            }

        </main>
    )
}
