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
                        <div className='w-1/3 max-sm:w-5/6 max-lg:w-2/3 max-xl:w-1/2 flex flex-col items-center justify-center gap-6 bg-white rounded-3xl shadow-2xl shadow-pink-400/60'>

                            <div className='relative w-full'>
                                <img
                                    className='w-full h-full rounded-t-3xl rounde object-cover object-center'
                                    src={user?.profileImage || "/assets/default-user.jpg"}
                                    alt={user?.username}
                                />
                                <div className='absolute bottom-2 left-2'>
                                <h1 className='bottom-3.5'>{user?.username}</h1>
                                <p className=''>{user?.age}</p>
                                </div>
                                <div className='absolute top-2 right-0'>
                                <p className='px-2 truncate hover:overflow-visible hover:whitespace-normal max-w-[20ch]'>{user?.location}</p>
                                </div>
                               
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
