"use client"
import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import LeerMasBio from '@/components/text/LeerMasBio';
import { IconDislike, IconLike } from '@/components/icon/IconsGroup';
import { useNewUserToLike } from '@/hooks/useNewUserToLike';

export default function Explorar() {
    const { data: session } = useSession()
/*     const [userToLike, setToLike] = useState(null);
    const [errorData, setErrorData] = useState(false) */
    const userId = session?.user?._id;
    const { userToLike, errorData, getNewUserToLike } = useNewUserToLike();

   /*  useEffect(() => {

        const newUserToLike = async () => {
            try {
                const response = await fetch(`/api/users/${userId}/getuser`);

                if (!response.ok) {
                    setErrorData(true)
                    throw new Error(`Error: ${response.status}`);
                }

                // No quedan usuarios para mostrar
                if (response.status === 204) {
                    setToLike(null);
                    setErrorData(false)
                    return;
                }

                setErrorData(false)
                const data = await response.json();
                setToLike(data);
            } catch (err) {
                console.log(err.message);
            }
        }

        if (userId) {
            newUserToLike();
        }

    }, [userId]);

    const handleActionLike = async (like) => {
        try {
          const response = await fetch("/api/users/like", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: userId,
              userToLikeId: userToLike._id,
              action: like,
            }),
          });
    
          if (response.status === 200) {
            newUserToLike()
          } else {
            console.error(`Error: ${response.status}`);
          }
        } catch (err) {
          console.error(err);
        }
      }; */

      useEffect(() => {
        if (userId) {
            getNewUserToLike(userId);
        }
    }, [userId]);

    const handleActionLike = async (like) => {
        console.log(like)
        try {
            const response = await fetch("/api/users/like", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: userId,
                    userToLikeId: userToLike._id,
                    action: like,
                }),
            });

            if (response.status === 200) {
                getNewUserToLike(userId);
            } else {
                console.error(`Error: ${response.status}`);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <main className='"w-full min-h-[calc(100lvh-60px)] flex items-center justify-center'>
            {errorData ? (
                <p className='font-semibold text-xl text-black/30'>¡Ups! Algo salió mal.</p>
            )
                : userToLike
                    ? (<div className='flex items-center flex-col gap-6 w-full max-sm:my-4 my-14'>
                        <div className='max-sm:w-5/6 w-96 flex flex-col items-center justify-center bg-white rounded-3xl shadow-2xl shadow-pink-400/60'>

                            <div className='relative w-full'>
                                <img
                                    className='w-full h-full aspect-square rounded-t-3xl rounde object-cover object-center'
                                    src={userToLike?.profileImage || "/assets/default-user.jpg"}
                                    alt={userToLike?.username}
                                />
                                <div className='absolute bottom-2 left-2'>
                                    <div className='px-3 py-1 text-white bg-black/10 backdrop-blur-md rounded-2xl shadow-[0_0_12px] shadow-white/35 transition-all ease-in-out duration-300 hover:backdrop-blur-lg flex flex-wrap items-end gap-1'>
                                        <h1 className=' text-xl font-semibold truncate hover:overflow-visible hover:whitespace-normal max-w-[16ch]'>{userToLike?.username}</h1>
                                        {userToLike?.age && <p className='text-lg translate-y-[1px] font-semibold'>{userToLike?.age}</p>}
                                    </div>
                                </div>
                                {userToLike?.location && <div className='absolute top-2 right-2'>
                                    <p
                                        className='px-3 py-1 text-white font-medium bg-black/10 backdrop-blur-md rounded-2xl shadow-[0_0_12px] shadow-white/35 truncate hover:overflow-visible hover:whitespace-normal max-w-[20ch] transition-all ease-in-out duration-300 hover:backdrop-blur-lg'
                                    >
                                        {userToLike?.location}
                                    </p>
                                </div>}
                            </div>
                            {userToLike?.bio && <LeerMasBio>{userToLike?.bio}</LeerMasBio>}
                        </div>
                        <div className='flex gap-10'>
                            <button
                             onClick={() => handleActionLike(true)}
                            className='bg-green-400 hover:bg-green-500 active:bg-green-600 transition-colors ease-in-out duration-200 w-16 h-16 rounded-full flex justify-center items-center'
                            >
                                <IconLike className="text-white h-[46px] translate-y-[2px]" />
                            </button>
                            <button 
                             onClick={() => handleActionLike(false)}
                            className='bg-red-400 hover:bg-red-500 active:bg-red-600 transition-colors ease-in-out duration-200 w-16 h-16 rounded-full flex justify-center items-center'
                            >
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
