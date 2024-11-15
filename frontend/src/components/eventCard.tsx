import Image from 'next/image';
import { Heart, User } from 'lucide-react';

interface Tag {
    id: string;
    name: string;
}

interface EventCardProps {
    boardGame: string;
    eventName: string;
    image: string;
    playerCount: number;
    date: string;
    tags: Tag[];
    user: {
        name: string;
        type: string;
    };
    isLiked?: boolean;
}

const EventCard = ({
    boardGame,
    eventName,
    image,
    playerCount,
    date,
    tags,
    user,
    isLiked = false
}: EventCardProps) => {
    return (
        <div className="event-card bg-background border border-secondary rounded-lg p-4 flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="text-secondary text-lg font-medium">{boardGame}</h3>
                    <p className="text-secondary/80">{eventName}</p>
                </div>
                <button
                    className="text-secondary hover:text-secondary/80 transition-colors"
                    aria-label={isLiked ? "Unlike event" : "Like event"}
                >
                    <Heart className={`w-6 h-6 ${isLiked ? 'fill-secondary' : ''}`} />
                </button>
            </div>

            {/* Image */}
            <div className="relative w-full aspect-square mb-4 bg-secondary/10 rounded-md overflow-hidden">
                <Image
                    src={image}
                    alt={`${boardGame} - ${eventName}`}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Info */}
            <div className="mb-4">
                <p className="text-secondary mb-2">
                    {playerCount} Players/ {date}
                </p>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span
                            key={tag.id}
                            className="px-3 py-1 border border-secondary text-secondary text-sm rounded"
                        >
                            {tag.name}
                        </span>
                    ))}
                </div>
            </div>

            {/* Register Button */}
            <button className="bg-secondary text-secondary-foreground py-2 rounded hover:bg-secondary/90 transition-colors mb-4">
                Register
            </button>

            {/* User */}
            <div className="flex items-center space-x-2 text-secondary">
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                    <User className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-sm">{user.name}</p>
                    <p className="text-xs text-secondary/70">{user.type}</p>
                </div>
            </div>
        </div>
    );
};

export default EventCard;