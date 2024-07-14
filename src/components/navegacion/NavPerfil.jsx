import { useId, useState } from 'react';
import { IconLogout } from '../icon/IconsGroup';
import Link from 'next/link';

export function NavPerfil({ urlImg, handleLogout }) {
    const [isOpen, setIsOpen] = useState(false);
    const navPerfil = useId();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="hidden md:inline-block relative text-left">
            <div>
                <img src={urlImg}
                    id={navPerfil}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={toggleMenu}
                    alt="Imagen de perfil"
                    className="w-7 h-7 scale-[1.4] rounded-full object-cover object-center cursor-pointer"
                />
            </div>

            <div
                className={`${isOpen ? 'select-auto transition ease-out duration-100 transform opacity-100 scale-100 pointer-events-auto' : 'select-none transition ease-in duration-75 transform opacity-0 scale-95 pointer-events-none'} absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                aria-orientation="vertical"
                aria-labelledby={navPerfil}
            >
                <div className="py-1" role="none">
                    <Link href="/perfil" onClick={toggleMenu} className="block px-4 py-2 text-sm text-gray-700">Perfil</Link>
                </div>
                <div className="py-1" role="none">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700">Archive</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700">Move</a>
                </div>
                <div className="py-1" role="none">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700">Share</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700">Add to favorites</a>
                </div>
                <div className="py-1" role="none">
                    <div className="flex gap-x-2 cursor-pointer px-4 py-2 text-sm text-gray-700" onClick={handleLogout}>
                        <p>Cerrar sesión</p>
                        <IconLogout className="h-[1.1rem] translate-y-[0.11rem]" />
                    </div>
                </div>
            </div>
        </div>
    );
};
