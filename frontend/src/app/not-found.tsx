import Link from 'next/link';

export default function NotFoundLayout() {
    return (
        <html lang="en" className="dark">
            <body className="min-h-screen bg-black font-sans antialiased">
                <div className="min-h-screen flex flex-col items-center justify-center p-4">
                    <h1 className="text-[#ff00ff] text-6xl md:text-8xl font-bold mb-4">404</h1>
                    <div className="text-cyan-400 text-xl md:text-2xl mb-8 text-center">
                        Oops! This page seems to have rolled off the game table.
                    </div>
                    <Link
                        href="/"
                        className="bg-[#ff00ff] hover:bg-[#ff40ff] text-black font-bold py-3 px-6 rounded-lg transition-colors"
                    >
                        Return Home
                    </Link>
                    <div className="absolute top-8 left-8">
                        <div className="text-[#ff00ff] text-2xl font-bold">UGames</div>
                        <div className="text-cyan-400 text-sm">BOARDGAME SOCIAL NETWORK</div>
                    </div>
                </div>
            </body>
        </html>
    );
}