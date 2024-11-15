import { ChevronLeft, ChevronRight } from 'lucide-react';
import EventCard from './eventCard';

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

const EventSection = ({ title, events }: { title: string; events: typeof sampleEvent[] }) => {
    return (
        <div className="mb-12">
            <h2 className="text-primary text-2xl font-medium mb-6">{title}</h2>
            <div className="relative">
                <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                    {events.map((event, index) => (
                        <div key={index} className="w-[300px] flex-shrink-0">
                            <EventCard {...event} />
                        </div>
                    ))}
                </div>
                <button className="absolute left-0 top-1/2 -translate-y-1/2 -ml-5 w-10 h-10 rounded-full bg-background border border-primary flex items-center justify-center text-primary hover:bg-primary/10 transition-colors">
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button className="absolute right-0 top-1/2 -translate-y-1/2 -mr-5 w-10 h-10 rounded-full bg-background border border-primary flex items-center justify-center text-primary hover:bg-primary/10 transition-colors">
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default EventSection;