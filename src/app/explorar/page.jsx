"use client"
import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import LeerMasBio from '@/components/text/LeerMasBio';
import { IconDislike, IconLike } from '@/components/icon/IconsGroup';

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
                <p className='font-semibold text-xl text-black/30'>¡Ups! Algo salió mal.</p>
            )
                : user
                    ? (<div className='flex items-center flex-col gap-6'>
                        <div className='max-sm:w-5/6 max-md:w-6/12 max-lg:w-5/12 max-xl:w-4/12 max-2xl:w-3/12 w-1/5 flex flex-col items-center justify-center bg-white rounded-3xl shadow-2xl shadow-pink-400/60'>

                            <div className='relative w-full'>
                                <img
                                    className='w-full h-full aspect-square rounded-t-3xl rounde object-cover object-center'
                                    src={user?.profileImage || "/assets/default-user.jpg"}
                                    alt={user?.username}
                                />
                                <div className='absolute bottom-2 left-2'>
                                    <div className='px-3 py-1 text-white bg-black/10 backdrop-blur-md rounded-2xl shadow-[0_0_12px] shadow-white/35 transition-all ease-in-out duration-300 hover:backdrop-blur-lg flex flex-wrap items-end gap-1'>
                                        <h1 className=' text-xl font-semibold truncate hover:overflow-visible hover:whitespace-normal max-w-[16ch]'>{user?.username}</h1>
                                        {user?.age && <p className='text-lg translate-y-[1px] font-semibold'>{user?.age}</p>}
                                    </div>
                                </div>
                                {user?.location && <div className='absolute top-2 right-2'>
                                    <p
                                        className='px-3 py-1 text-white font-medium bg-black/10 backdrop-blur-md rounded-2xl shadow-[0_0_12px] shadow-white/35 truncate hover:overflow-visible hover:whitespace-normal max-w-[20ch] transition-all ease-in-out duration-300 hover:backdrop-blur-lg'
                                    >
                                        {user?.location}
                                    </p>
                                </div>}
                            </div>
                            {user?.bio && <LeerMasBio>{user?.bio}</LeerMasBio>}
                        </div>
                        <div className='flex gap-10'>
                            <button className='bg-green-400 hover:bg-green-500 active:bg-green-600 transition-colors ease-in-out duration-200 w-16 h-16 rounded-full flex justify-center items-center'>
                                <IconLike className="text-white h-[46px] translate-y-[2px]" />
                            </button>
                            <button className='bg-red-400 hover:bg-red-500 active:bg-red-600 transition-colors ease-in-out duration-200 w-16 h-16 rounded-full flex justify-center items-center'>
                                <IconDislike className="text-white h-12" />
                            </button>
                        </div>
                    </div>
                    )
                    : (
                        <p className='font-semibold text-xl text-black/30'>No hay más usuarios para mostrar</p>
                    )
            }

        </main>
    )
}
