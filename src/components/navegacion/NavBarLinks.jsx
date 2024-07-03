"use client"

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function NavBarLinks() {
    const pathname = usePathname();

    // Definición de los enlaces
    const links = [
        { nombre: 'Inicio', url: '/' },
        { nombre: 'Chat', url: '/chat' },
        { nombre: 'Contacto', url: '/contacto' },
        { nombre: 'Perfil', url: '/perfil' },
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