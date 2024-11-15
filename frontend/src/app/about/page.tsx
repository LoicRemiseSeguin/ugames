import React from 'react';
import { Image } from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <main className="container mx-auto px-8 py-12">
                {/* Header */}
                <div className="mb-16">
                    <h1 className="text-secondary text-xl mb-4">Infomations about UGames ↓</h1>
                    <div className="h-[2px] bg-gradient-to-r from-secondary to-transparent" />
                </div>

                {/* Content Container */}
                <div className="flex gap-12 items-start">
                    {/* Text Content */}
                    <div className="flex-1 space-y-8">
                        <div>
                            <span className="text-primary font-medium">UGames</span>
                            <p className="text-primary/80 mt-2">
                                is an innovative digital platform designed to connect board game enthusiasts of all
                                experience levels, fostering a vibrant community centered around the shared passion for tabletop
                                gaming.
                            </p>
                        </div>

                        <p className="text-primary/80">
                            At its core, the service provides a comprehensive suite of tools for organizing, discovering, and
                            participating in board game events, catering to a diverse user base ranging from curious
                            newcomers to seasoned veterans and established gaming associations.
                        </p>

                        <p className="text-primary/80">
                            The platform's main functionalities include a robust event management system, allowing users to
                            create public and private gaming sessions with detailed information such as game type, player
                            count, location, and time. A user-friendly calendar interface displays all upcoming events, making it
                            easy for members to plan their gaming schedule.
                        </p>

                        <p className="text-primary/80">
                            The service also incorporates a friend system with tagging capabilities, enabling users to connect
                            with like-minded players and organize their contacts based on gaming preferences or availability.
                        </p>

                        <p className="text-primary/80">
                            The platform features discussion forums, game ratings, and reviews to enhance the community
                            aspect, creating a rich ecosystem of shared knowledge and experiences. The service offers
                            advanced statistics tracking, recording game outcomes and participation rates for more dedicated
                            players and organizations to provide valuable insights into gaming habits and preferences.
                        </p>
                    </div>

                    {/* Image Container */}
                    <div className="w-[400px] h-[500px] flex-shrink-0">
                        <div className="w-full h-full border border-secondary rounded-lg flex items-center justify-center bg-background/50">
                            <Image className="w-24 h-24 text-secondary/40" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AboutPage;