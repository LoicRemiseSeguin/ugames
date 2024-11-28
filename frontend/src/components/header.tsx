'use client';

import Link from 'next/link';
import Image from 'next/image';
import logo from "/src/logos/UGs_Logo.png"
import { usePathname } from 'next/navigation';
import { useAuth } from '../hooks/authContext';
import { User } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Header() {
    const { isAuthenticated } = useAuth();
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
    }, []);

    const isActive = (path: string) => {
        return pathname === path ? 'border-b-2 border-secondary' : '';
    };

    // Only render auth-dependent content after mounting
    if (!mounted) {
        return <header className="w-full bg-background border-b border-primary/20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between py-4">
                    {/* Logo and static content */}
                    <div className="flex items-center space-x-3">
                        <div className="w-16 h-16 relative">
                            <Image
                                src={logo}
                                alt="UGames Logo"
                                fill
                                sizes="(max-width: 64px) 100vw"
                                className="object-contain"
                                priority
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-primary text-2xl font-bold">UGames</span>
                            <span className="text-primary/80 text-sm uppercase tracking-wider leading-tight">
                                Boardgame<br />Social Network
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>;
    }

    return (
        <header className="w-full bg-background border-b border-primary/20">
            {/* Rest of your header code remains the same */}
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between py-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-16 h-16 relative">
                            <Image
                                src={logo}
                                alt="UGames Logo"
                                fill
                                sizes="(max-width: 64px) 100vw"
                                className="object-contain"
                                priority
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-primary text-2xl font-bold">UGames</span>
                            <span className="text-primary/80 text-sm uppercase tracking-wider leading-tight">
                                Boardgame<br />Social Network
                            </span>
                        </div>
                    </div>

                    <nav className="flex flex-col md:flex-row items-center md:items-center space-y-2 md:space-y-0 md:space-x-8 mt-4 md:mt-0">
                        <Link href="/" className={`text-primary hover:text-secondary transition-colors py-1 ${isActive('/')}`}>
                            Home
                        </Link>
                        <Link href="/search" className={`text-primary hover:text-secondary transition-colors py-1 ${isActive('/search')}`}>
                            Search
                        </Link>
                        {isAuthenticated && (
                            <Link href="/event/create" className={`text-primary hover:text-secondary transition-colors py-1 ${isActive('/event/create')}`}>
                                Create
                            </Link>
                        )}
                        <Link href="/about" className={`text-primary hover:text-secondary transition-colors py-1 ${isActive('/about')}`}>
                            About
                        </Link>
                    </nav>

                    <div className="flex flex-col md:flex-row items-center md:items-center space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
                        {isAuthenticated ? (
                            <Link
                                href="/profile/events"
                                className="w-12 h-12 rounded-full border border-primary flex items-center justify-center hover:bg-primary/10 transition-colors"
                                aria-label="Play Circle"
                            >
                                <User className="w-6 h-6 text-primary" />
                            </Link>
                        ) : (
                            <>
                                <Link href="/register" className="text-primary hover:text-secondary transition-colors">
                                    Register
                                </Link>
                                <Link href="/login" className="border border-primary px-4 py-1 rounded hover:bg-primary/10 transition-colors">
                                    Log In
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}