"use client"

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function NavBarLinks() {
    const pathname = usePathname();

    // Definición de los enlaces
    const links = [
        { nombre: 'Inicio', url: '/' },
        { nombre: 'Explorar', url: '/explorar'},
        { nombre: 'Chat', url: '/chat' },
        { nombre: 'Perfil', url: '/perfil' },
        { nombre: 'Registro', url: '/register' },
        { nombre: 'Iniciar sesión', url: '/login' },
    ];

    return (
        <>
            {links.map((item, index) => (
                <li key={index} className={`hover:scale-110 transition-all ${pathname === item.url
                        ? 'text-slate-800 font-semibold'
                        : 'text-white'}`}
                >
                    <Link href={item.url}>{item.nombre}</Link>
                </li>
            ))}
        </>
    );
}