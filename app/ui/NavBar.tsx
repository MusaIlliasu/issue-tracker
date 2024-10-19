"use client";

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { AiFillBug } from "react-icons/ai"
import Spinner from '../issues/[id]/Spinner';
import Image from 'next/image';

const NavBar = () => {
    const { status, data: session } = useSession();
    const pathname = usePathname();
    // const links = [
    //     {label: "Issues", href: "/issues"},
    //     {label: "Dashboard", href: "/"}
    // ]

    return (
    <nav className="w-full h-[80px] bg-white border-b sticky top-0 left-0 flex justify-between items-center gap-4 py-2 px-6 z-30">
        <Link href="/"><AiFillBug size={40} color="dodgerblue" /></Link>

        <div className="flex justify-start items-center gap-4">
            <Link href="/issues" className={`font-semibold text-gray-400 ${pathname.startsWith("/issues") ? "text-gray-600" : "hover:text-gray-600"} transition-colors`}>Issues</Link>

            {/* Loading */}
            {status === "loading" ? <Spinner borderColor='dodgerblue' /> : null}

            {/* Authenticated */}
            {
                status === "authenticated" ? (
                    <>
                        {/* {
                            links.map(link => (
                                <Link key={link.label} href={link.href} 
                                    className={`font-semibold text-gray-400 ${pathname === link.href ? "text-gray-600" : "hover:text-gray-600"} transition-colors`}
                                >{link.label}</Link>
                            ))
                        } */}

                        <Link href="/" className={`font-semibold text-gray-400 ${pathname.startsWith("/dashboard") ? "text-gray-600" : "hover:text-gray-600"} transition-colors`}>Dashboard</Link>
                        
                        <span className='inline-block w-[40px] h-[40px] border rounded-full overflow-hidden'>
                            <Image src={session.user!.image!} fill alt="Profile_Image" />
                        </span>

                        <Link href="/api/auth/signout" className="font-semibold text-gray-400 hover:text-gray-600 transition-colors">Logout</Link>
                    </>
                ) : null
            }
            
            {/* Unauthenticated */}
            {status === "unauthenticated" ? <Link href="/api/auth/signin" className="font-semibold text-gray-400 hover:text-gray-600 transition-colors">Login</Link> : null}
            
        </div>
    </nav>
    )
}

export default NavBar;