"use client";

import { useEffect, useState } from 'react';
import { Calendar, Clock, Users, MapPin, Share2, Heart/*, MessageSquare*/ } from 'lucide-react';
import { useEvent } from '@/hooks/useEvents';
import Loading from '@/components/loadingAnimation';
import { useGame } from '@/hooks/useGames';
import { useAuth } from '@/hooks/authContext';

export default function Event({ params }:
    { params: { eventId: string } }) {
    // return <h1>Event : {params.eventId}</h1>;

    const [isLiked, setIsLiked] = useState(false);

    const { token } = useAuth();
    const { eventData, getById } = useEvent();
    const { game, games, getGameDataById } = useGame();

    const [isCreator, setIsCreator] = useState<boolean>(false);
    const [joining, setJoining] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        async function fetchEventData(id: string) {
            setIsLoading(true);
            await getById(id);
            setIsCreator(eventData?.creator_id === token?.id);
            setIsLoading(false);
        };

        if (eventData?.event_id?.toString() != params.eventId) {
            fetchEventData(params.eventId);
        }

        if (games.length !== 0) {
            getGameDataById(eventData?.game_id.toString() ?? "");
        }

        console.log(game?.game_id);
        console.log(eventData?.game_id);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventData, games]);

    if (isLoading || !eventData || game?.game_id.toString() !== eventData?.game_id.toString()) return <Loading />;

    const eventDate = new Date(eventData.event_date);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
    const formattedTime = eventDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    });

    return (
        < div className="min-h-screen bg-background" >
            {/* Hero Section with Cover Image */}
            < div className="relative h-[400px] w-full" >
                {/* <img
                    src="/api/placeholder/1200/400"
                    alt="Event cover"
                    className="w-full h-full object-cover"
                /> */}
                < div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            </div >

            {/* Main Content */}
            < div className="max-w-4xl mx-auto px-6 -mt-20 relative" >
                {/* Event Header */}
                < div className="bg-background/80 backdrop-blur-sm border border-primary/20 rounded-lg p-6 mb-6" >
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm mb-4">
                                {eventData.event_name}
                            </span>
                            <h1 className="text-4xl font-bold text-primary mb-2">
                                {game?.name ?? ""}
                            </h1>
                            <div className="flex items-center gap-4 text-muted-foreground">
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {formattedDate}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    {formattedTime}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    4-8 players
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                className="p-2 rounded-full border border-secondary text-secondary hover:bg-secondary/10"
                                onClick={() => setIsLiked(!isLiked)}
                            >
                                <Heart className={`w-5 h-5 ${isLiked ? 'fill-secondary' : ''}`} />
                            </button>
                            <button className="p-2 rounded-full border border-secondary text-secondary hover:bg-secondary/10">
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div >

                {/* Content Grid */}
                < div className="grid grid-cols-3 gap-6" >
                    {/* Main Content - 2 columns */}
                    < div className="col-span-2 space-y-6" >
                        {/* Description */}
                        < div className="bg-background/80 backdrop-blur-sm border border-primary/20 rounded-lg p-6" >
                            <h2 className="text-xl text-primary mb-4">About this Event</h2>
                            <p className="text-muted-foreground">
                                {eventData.event_description}
                            </p>
                        </div >

                        {/* Location */}
                        < div className="bg-background/80 backdrop-blur-sm border border-primary/20 rounded-lg p-6" >
                            <h2 className="text-xl text-primary mb-4">Location</h2>
                            <div className="flex items-start gap-4">
                                <MapPin className="w-5 h-5 text-secondary mt-1" />
                                <div>
                                    <h3 className="text-foreground font-medium">Game Store Name</h3>
                                    <p className="text-muted-foreground">123 Gaming Street</p>
                                    <p className="text-muted-foreground">City, State 12345</p>
                                    <button className="mt-3 text-secondary hover:text-secondary/80">
                                        View on map
                                    </button>
                                </div>
                            </div>
                        </div >
                    </div >

                    {/* Sidebar - 1 column */}
                    < div className="space-y-6" >
                        {/* Host Info */}
                        < div className="bg-background/80 backdrop-blur-sm border border-primary/20 rounded-lg p-6" >
                            <h2 className="text-xl text-primary mb-4">Host</h2>
                            <div className="flex items-center gap-4">
                                {/* <img
                                    src="/api/placeholder/48/48"
                                    alt="Host avatar"
                                    className="w-12 h-12 rounded-full"
                                /> */}
                                <div>
                                    <h3 className="font-medium text-foreground">Game Store Staff</h3>
                                    <p className="text-sm text-muted-foreground">Member since 2020</p>
                                </div>
                            </div>
                        </div >

                        {/* Attendees */}
                        < div className="bg-background/80 backdrop-blur-sm border border-primary/20 rounded-lg p-6" >
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl text-primary">Attendees</h2>
                                <span className="text-muted-foreground">3/8</span>
                            </div>
                            <div className="flex -space-x-2 mb-4">
                                {/* <img src="/api/placeholder/32/32" alt="Attendee 1" className="w-8 h-8 rounded-full border-2 border-background" />
                                <img src="/api/placeholder/32/32" alt="Attendee 2" className="w-8 h-8 rounded-full border-2 border-background" />
                                <img src="/api/placeholder/32/32" alt="Attendee 3" className="w-8 h-8 rounded-full border-2 border-background" /> */}
                            </div>
                            <button className="w-full py-2 border border-secondary text-secondary hover:bg-secondary/10 rounded">
                                {isCreator ? "Delete" : "Join Event"}
                            </button>
                        </div >

                        {/* Tags */}
                        {
                            eventData.tags ??
                            <div className="bg-background/80 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                                <h2 className="text-xl text-primary mb-4">Tags</h2>
                                <div className="flex flex-wrap gap-2">
                                    {eventData.tags?.map((tag, index) => (
                                        <span key={`${tag}-${index}`} className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm">
                                            tag
                                        </span>
                                    ))}

                                </div>
                            </div>
                        }
                    </div >
                </div >
            </div >
        </div >
    );
}