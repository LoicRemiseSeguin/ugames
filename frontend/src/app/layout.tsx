import Footer from "@/components/footer"
import Header from "@/components/header"

import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/hooks/authContext";
import { EventProvider } from "@/hooks/useEvents";
import { GameProvider } from "@/hooks/useGames";

// const geistSans = localFont({
//     src: "../fonts/GeistVF.woff",
//     variable: "--font-geist-sans",
//     weight: "100 900",
// });
// const geistMono = localFont({
//     src: "../fonts/GeistMonoVF.woff",
//     variable: "--font-geist-mono",
//     weight: "100 900",
// });

export const metadata: Metadata = {
    title: "UGames",
    description: "Social network for board gaming",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className="min-h-screen bg-background font-sans antialiased">
                <AuthProvider>
                    <EventProvider>
                        <GameProvider>
                            <Header />
                            <main className="container mx-auto px-4">
                                {children}
                            </main>
                            <Footer />
                        </GameProvider>
                    </EventProvider>
                </AuthProvider>
            </body>
        </html>
    )
}
