"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { AiFillBug } from "react-icons/ai"

const NavBar = () => {
    const pathname = usePathname();
    const links = [
        {label: "Issues", href: "/issues"},
        {label: "Dashboard", href: "/"}
    ]

    return (
    <nav className="w-full h-[80px] bg-white border-b sticky top-0 left-0 flex justify-between items-center gap-4 py-2 px-6 z-30">
        <Link href="/"><AiFillBug size={40} color="dodgerblue" /></Link>

        <div className="flex justify-start items-center gap-4">
            {
                links.map(link => (
                    <Link key={link.label} href={link.href} 
                        className={`font-semibold text-gray-400 ${pathname === link.href ? "text-gray-600" : "hover:text-gray-600"} transition-colors`}
                    >{link.label}</Link>
                ))
            }
        </div>
    </nav>
    )
}

export default NavBar;