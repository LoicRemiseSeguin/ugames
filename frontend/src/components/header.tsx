'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

enum LogState {
    NotLogged = 0,
    Logging = 1,
    Logged = 2,
};


export default function Header() {
    const logState = LogState.Logging;
    // const [logState, setLogState] = useState(LogState.NotLogged);

    // const pathname = usePathname();

    // if (pathname.includes("login") || pathname.includes("register")) {
    //     setLogState(LogState.Logging);
    // }

    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path ? 'border-b-2 border-secondary' : '';
    };

    return (
        <header className="w-full bg-background border-b border-primary/20">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and Title Section */}
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12">
                            <svg viewBox="0 0 100 100" className="w-full h-full fill-primary">
                                <path d="M10,10 h60 v20 h-20 v20 h20 v20 h-60 v-20 h20 v-20 h-20 z" />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-primary text-2xl font-bold">UGames</span>
                            <span className="text-primary/80 text-sm uppercase tracking-wider">
                                Boardgame
                                <br />
                                Social Network
                            </span>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/"
                            className={`text-primary hover:text-secondary transition-colors py-1 ${isActive('/')}`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/create"
                            className={`text-primary hover:text-secondary transition-colors py-1 ${isActive('/create')}`}
                        >
                            Create
                        </Link>
                        <Link
                            href="/info"
                            className={`text-primary hover:text-secondary transition-colors py-1 ${isActive('/info')}`}
                        >
                            Info
                        </Link>
                    </nav>

                    {/* Auth Buttons */}
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/signup"
                            className="text-primary hover:text-secondary transition-colors"
                        >
                            Sign-Up
                        </Link>
                        <Link
                            href="/login"
                            className="border border-primary px-4 py-1 rounded hover:bg-primary/10 transition-colors"
                        >
                            Log In
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );

    switch (logState.valueOf()) {
        case LogState.NotLogged:
            return <header>Not Logged Header</header>;
        case LogState.Logging:
            return <header>Logging Header</header>;
        case LogState.Logged:
            return <header>Logged Header</header>;
        default:
            return <header>Unknown State</header>;
    }

}