// app/profile/events/page.tsx
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export default function EventsPage() {
    const days = [
        { day: 'Sat', date: '9/14' },
        { day: 'Sun', date: '9/15' },
        { day: 'Mon', date: '9/16' },
        { day: 'Tue', date: '9/17' },
        { day: 'Wed', date: '9/18' },
        { day: 'Thu', date: '9/19' },
        { day: 'Fri', date: '9/20' },
    ];

    const events = [
        {
            id: 1,
            title: 'Self Created',
            date: '9/15',
            type: 'self',
            players: '4/5',
            role: 'Casual Gamer',
        },
        {
            id: 2,
            title: 'Registered',
            date: '9/16',
            type: 'registered',
            players: '4',
            role: 'Avid Gamer',
        },
        {
            id: 3,
            title: 'Saved',
            date: '9/18',
            type: 'saved',
            players: '4',
            role: 'Avid Gamer',
        },
    ];

    return (
        <>
            <div className="border border-primary/20 rounded-lg p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl text-primary">My Calendar</h2>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        <span className="text-primary">Weekly</span>
                        <ChevronRight className="w-5 h-5 text-primary" />
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-4">
                    {days.map((day, index) => (
                        <div key={index} className="relative">
                            <div className="text-center">
                                <div className="text-accent mb-2">{day.day}</div>
                                <div className="text-primary/60">{day.date}</div>
                            </div>

                            {/* Events */}
                            <div className="mt-4">
                                {events
                                    .filter(event => event.date === day.date)
                                    .map(event => (
                                        <div
                                            key={event.id}
                                            className={`mb-2 p-3 rounded-md ${event.type === 'self' ? 'bg-primary/20' :
                                                event.type === 'registered' ? 'bg-accent/20' :
                                                    'bg-secondary/20'
                                                }`}
                                        >
                                            <div className="text-sm font-medium mb-1">{event.title}</div>
                                            <div className="text-xs text-muted-foreground">
                                                {event.players} Players
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {event.role}
                                            </div>
                                            <button className="mt-2 text-xs px-2 py-1 bg-background/50 rounded">
                                                Remove
                                            </button>
                                            {event.type === 'self' && (
                                                <button className="mt-1 text-xs px-2 py-1 bg-background/50 rounded w-full">
                                                    Delete Event
                                                </button>
                                            )}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center gap-2 mt-8">
                    <button className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center">
                        <ChevronLeft className="w-5 h-5 text-primary" />
                    </button>
                    <button className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center">
                        <ChevronRight className="w-5 h-5 text-primary" />
                    </button>
                </div>
            </div>
        </>
    );
}