"use client";

import { useState } from 'react';
import { Camera, ChevronDown, X, Check } from 'lucide-react';
import { useEvent } from '@/hooks/useEvents';
import { EventModel } from '@/services/events';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/authContext';
import { useGame } from '@/hooks/useGames';

const CreateEventPage = () => {

    const router = useRouter();
    const { isAuthenticated, token } = useAuth();
    const { create } = useEvent();
    const { games, getAll } = useGame();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isAuthenticated) return;

        setError(null);
        setIsLoading(true);

        try {
            const form = e.currentTarget;
            const gameIdInput = form.email as HTMLInputElement;
            const eventNameInput = form.password as HTMLInputElement;
            const eventDescriptionInput = form.email as HTMLInputElement;
            const isPublicInput = form.password as HTMLInputElement;
            const cityInput = form.email as HTMLInputElement;

            const eventData: EventModel = {
                creator_id: token.id,
                game_id: gameIdInput.value,
                event_name: eventNameInput.value,
                event_description: eventDescriptionInput.value,
                is_public: isPublicInput.value,
                city: cityInput.value
            };

            const newEvent = await create(eventData);

            router.push(`/event/${newEvent.id}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl font-bold text-primary">Create Event</h1>
                    <button className="px-6 py-2 border border-secondary text-secondary hover:bg-secondary/10 rounded">
                        Publish
                    </button>
                </div>

                {/* Back Button */}
                <button className="px-6 py-2 border border-secondary text-secondary hover:bg-secondary/10 rounded mb-6">
                    Back
                </button>

                {/* Cover Photo Section */}
                <div className="border border-primary/20 rounded-lg p-6 mb-6">
                    <h2 className="text-xl text-primary mb-4">Cover Photo</h2>

                    <div className="flex items-start gap-8">
                        <div className="text-center">
                            <div className="w-24 h-24 rounded-full border-2 border-dashed border-secondary flex items-center justify-center mb-2">
                                <Camera className="w-8 h-8 text-secondary" />
                            </div>
                            <button className="px-4 py-2 text-sm border border-secondary text-secondary hover:bg-secondary/10 rounded mb-2">
                                Upload Photo
                            </button>
                            <button className="text-secondary text-sm hover:text-secondary/80">
                                remove
                            </button>
                        </div>

                        <div className="text-primary/60">
                            <h3 className="text-primary mb-2">Image requirements:</h3>
                            <ol className="list-decimal list-inside space-y-1">
                                <li>Recommend: 1000 x 1000px</li>
                                <li>Max: 5MB</li>
                                <li>BoardGame photo or logo</li>
                            </ol>
                        </div>
                    </div>
                </div>

                {/* Event Details Form */}
                <div className="border border-primary/20 rounded-lg p-6">
                    <h2 className="text-xl text-primary mb-6">Event Details</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-primary mb-2">Event Name*</label>
                                <input
                                    type="text"
                                    placeholder="Placeholder"
                                    className="w-full bg-transparent border-b border-secondary/20 text-secondary py-2 focus:outline-none focus:border-secondary"
                                />
                            </div>
                            <div>
                                <label className="block text-primary mb-2">Start Date & Time*</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Placeholder"
                                        className="w-full bg-transparent border-b border-secondary/20 text-secondary py-2 focus:outline-none focus:border-secondary"
                                    />
                                    <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-secondary" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-primary mb-2">Description*</label>
                            <textarea
                                placeholder="Placeholder"
                                rows={4}
                                className="w-full bg-transparent border border-secondary/20 text-secondary p-2 rounded focus:outline-none focus:border-secondary"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-primary mb-2">Number of Players*</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Placeholder"
                                        className="w-full bg-transparent border-b border-secondary/20 text-secondary py-2 focus:outline-none focus:border-secondary"
                                    />
                                    <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-secondary" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-primary mb-2">Public or Private*</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Placeholder"
                                        className="w-full bg-transparent border-b border-secondary/20 text-secondary py-2 focus:outline-none focus:border-secondary"
                                    />
                                    <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-secondary" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-primary mb-2">Links</label>
                            <textarea
                                placeholder="Placeholder"
                                rows={2}
                                className="w-full bg-transparent border border-secondary/20 text-secondary p-2 rounded focus:outline-none focus:border-secondary"
                            />
                        </div>

                        <div>
                            <label className="block text-primary mb-2">Tags</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Placeholder"
                                    className="w-full bg-transparent border-b border-secondary/20 text-secondary py-2 focus:outline-none focus:border-secondary"
                                />
                                <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-secondary" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-primary mb-2">Invite Friends</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Placeholder"
                                    className="w-full bg-transparent border-b border-secondary/20 text-secondary py-2 focus:outline-none focus:border-secondary"
                                />
                                <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-secondary" />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-6 py-2 border border-secondary text-secondary hover:bg-secondary/10 rounded"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowSuccessMessage(true);
                                    setTimeout(() => setShowSuccessMessage(false), 3000);
                                }}
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>

                {/* Success Message */}
                {showSuccessMessage && (
                    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-md">
                        <Check className="w-4 h-4" />
                        <span>Successfully Saved. Your event draft have been saved.</span>
                        <button
                            onClick={() => setShowSuccessMessage(false)}
                            className="ml-4"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateEventPage;