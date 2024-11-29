import React from 'react';
import Link from 'next/link';
import EventSection from '@/components/eventSection';

const sampleEvent = {
    boardGame: "BoardGame",
    eventName: "Event Name",
    image: "/api/placeholder/400/400",
    playerCount: 4,
    date: "26.09.2024",
    tags: [
        { id: "1", name: "Tag" },
        { id: "2", name: "Tag" },
        { id: "3", name: "Tag" },
    ],
    user: {
        name: "User",
        type: "Avid Gamer"
    }
};

const HomePage = () => {

    const nearbyEvents = Array(4).fill(sampleEvent);
    const recentEvents = Array(4).fill(sampleEvent);
    const popularEvents = Array(4).fill(sampleEvent);
    const recommendedEvents = Array(4).fill(sampleEvent);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <main className="container mx-auto px-4 py-12">
                <div className="relative">
                    {/* Decorative elements */}
                    <div className="absolute -top-10 right-0 w-1/3">
                        <svg className="w-full text-secondary/20" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                            <path d="M10,10 L90,90 M20,10 L90,80 M30,10 L90,70" strokeWidth="0.5" />
                        </svg>
                    </div>

                    {/* Main content */}
                    <div className="relative z-10 max-w-4xl">
                        <h1 className="text-secondary text-xl mb-8 flex items-center gap-2">
                            Welcome to Your BoardGame Events
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M19 14l-7 7m0 0l-7-7m7 7V3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </h1>

                        <h2 className="text-primary text-6xl font-bold mb-6 leading-tight">
                            BIRDING BOARDGAME:
                            <br />
                            WINGSPAN
                        </h2>

                        <p className="text-foreground/60 max-w-2xl mb-8">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation
                        </p>

                        <div className="flex gap-4">
                            <Link
                                href="/register"
                                className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg hover:bg-secondary/90 transition-colors"
                            >
                                Register now
                            </Link>
                            <Link
                                href="/more"
                                className="border border-secondary/20 text-secondary px-6 py-3 rounded-lg hover:bg-secondary/10 transition-colors"
                            >
                                See More
                            </Link>
                        </div>
                    </div>

                    {/* Placeholder image */}
                    {/* <div className="absolute top-40 right-0 w-1/3 aspect-square rounded-lg border border-secondary/20 flex items-center justify-center">
                        <svg className="w-16 h-16 text-secondary/40" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                            <path d="M21 15l-5-5L5 21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div> */}
                </div>

                <div className="min-h-screen bg-background text-foreground">
                    <main className="container mx-auto px-8 py-12">
                        {/* Hero Section */}
                        <div className="mb-16">
                            <h1 className="text-secondary text-xl mb-4">Welcome to Your BoardGame Events ↓</h1>
                            <div className="h-[2px] bg-gradient-to-r from-secondary to-transparent mb-12" />
                        </div>

                        {/* Event Sections */}
                        <div className="relative">
                            {/* Decorative elements */}
                            <div className="absolute -top-20 right-0 w-1/3">
                                <svg className="w-full text-secondary/20" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                                    <path d="M10,10 L90,90 M20,10 L90,80 M30,10 L90,70" strokeWidth="0.5" />
                                </svg>
                            </div>

                            {/* Event sections */}
                            <EventSection title="Nearby" events={nearbyEvents} />
                            <EventSection title="Recent" events={recentEvents} />
                            <EventSection title="Popular" events={popularEvents} />
                            <EventSection title="Recommended" events={recommendedEvents} />

                            {/* Pagination */}
                            <div className="flex justify-center items-center gap-2 mt-8">
                                <button className="text-primary hover:text-primary/80 transition-colors">PREV</button>
                                {[1, 2, 3, 4, 5].map((page) => (
                                    <button
                                        key={page}
                                        className={`w-3 h-3 rounded-full ${page === 1 ? 'bg-primary' : 'bg-primary/20'
                                            } hover:bg-primary/60 transition-colors`}
                                    />
                                ))}
                                <button className="text-primary hover:text-primary/80 transition-colors">NEXT</button>
                            </div>
                        </div>
                    </main>
                </div>


            </main>
        </div>
    );
};

export default HomePage;