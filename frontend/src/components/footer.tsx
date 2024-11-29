import Image from 'next/image';
import Link from 'next/link';
import logo from "/src/logos/UGs_Logo.png";
import { Instagram, PlayCircle } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full bg-background border-t border-primary/20 py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-start justify-between space-y-6 md:space-y-0">
                    {/* Logo and Description Section */}
                    <div className="flex flex-col space-y-4 max-w-md">
                        <div className="flex items-start space-x-3">
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
                        </div>
                        <p className="text-primary/80 text-sm leading-relaxed">
                            UGames is a BoardGame social network platform for searching, organizing, joining your
                            interested BoardGame plays, etc...
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex space-x-4">
                        <Link
                            href="#"
                            className="w-12 h-12 rounded-full border border-primary flex items-center justify-center hover:bg-primary/10 transition-colors"
                            aria-label="Play Circle"
                        >
                            <PlayCircle className="w-6 h-6 text-primary" />
                        </Link>
                        <Link
                            href="#"
                            className="w-12 h-12 rounded-full border border-primary flex items-center justify-center hover:bg-primary/10 transition-colors"
                            aria-label="Instagram"
                        >
                            <Instagram className="w-6 h-6 text-primary" />
                        </Link>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-4 border-t border-primary/20">
                    <p className="text-primary/80 text-sm">
                        ©2024 UGames. All rights reserved
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;