"use client";

import React from 'react';
import { Camera, ChevronDown, X, Check, Trash2, AlertTriangle } from 'lucide-react';

export default function Event({ params }:
    { params: { eventId: string } }) {
    // return <h1>Modify Event : {params.eventId}</h1>;

    const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
    const [isDirty, setIsDirty] = React.useState(false);

    // Mock existing event data
    const [eventData, setEventData] = React.useState({
        name: "Friday Night Magic: Commander Edition",
        startDate: "2024-11-22T19:00",
        description: "Join us for an exciting evening of Commander, the most popular casual format in Magic: The Gathering. Whether you're a seasoned player or new to the format, all skill levels are welcome.",
        numberOfPlayers: "4-8",
        visibility: "Public",
        links: "https://magic.wizards.com/commander",
        tags: ["Magic: The Gathering", "Commander", "Card Games"],
        invitedFriends: ["John Doe", "Jane Smith"],
        coverImage: "/api/placeholder/1000/1000"
    });

    // Handle form changes
    const handleChange = (field, value) => {
        setEventData(prev => ({
            ...prev,
            [field]: value
        }));
        setIsDirty(true);
    };

    return (
        <div className="min-h-screen bg-background p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl font-bold text-primary">Edit Event</h1>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setShowDeleteDialog(true)}
                            className="px-6 py-2 border border-primary/20 text-primary hover:bg-primary/10 rounded"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                            disabled={!isDirty}
                            className="px-6 py-2 border border-secondary text-secondary hover:bg-secondary/10 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Publish Changes
                        </button>
                    </div>
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
                            <div className="relative w-32 h-32 rounded-lg border-2 border-dashed border-secondary flex items-center justify-center mb-2 overflow-hidden">
                                {eventData.coverImage ? (
                                    <>
                                        <img
                                            src={eventData.coverImage}
                                            alt="Event cover"
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                            <Camera className="w-8 h-8 text-white" />
                                        </div>
                                    </>
                                ) : (
                                    <Camera className="w-8 h-8 text-secondary" />
                                )}
                            </div>
                            <button className="px-4 py-2 text-sm border border-secondary text-secondary hover:bg-secondary/10 rounded mb-2">
                                Change Photo
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

                    <form className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-primary mb-2">Event Name*</label>
                                <input
                                    type="text"
                                    value={eventData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    className="w-full bg-transparent border-b border-secondary/20 text-secondary py-2 focus:outline-none focus:border-secondary"
                                />
                            </div>
                            <div>
                                <label className="block text-primary mb-2">Start Date & Time*</label>
                                <div className="relative">
                                    <input
                                        type="datetime-local"
                                        value={eventData.startDate}
                                        onChange={(e) => handleChange('startDate', e.target.value)}
                                        className="w-full bg-transparent border-b border-secondary/20 text-secondary py-2 focus:outline-none focus:border-secondary"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-primary mb-2">Description*</label>
                            <textarea
                                value={eventData.description}
                                onChange={(e) => handleChange('description', e.target.value)}
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
                                        value={eventData.numberOfPlayers}
                                        onChange={(e) => handleChange('numberOfPlayers', e.target.value)}
                                        className="w-full bg-transparent border-b border-secondary/20 text-secondary py-2 focus:outline-none focus:border-secondary"
                                    />
                                    <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-secondary" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-primary mb-2">Public or Private*</label>
                                <div className="relative">
                                    <select
                                        value={eventData.visibility}
                                        onChange={(e) => handleChange('visibility', e.target.value)}
                                        className="w-full bg-transparent border-b border-secondary/20 text-secondary py-2 focus:outline-none focus:border-secondary appearance-none"
                                    >
                                        <option value="Public">Public</option>
                                        <option value="Private">Private</option>
                                    </select>
                                    <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-secondary pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-primary mb-2">Links</label>
                            <textarea
                                value={eventData.links}
                                onChange={(e) => handleChange('links', e.target.value)}
                                rows={2}
                                className="w-full bg-transparent border border-secondary/20 text-secondary p-2 rounded focus:outline-none focus:border-secondary"
                            />
                        </div>

                        <div>
                            <label className="block text-primary mb-2">Tags</label>
                            <div className="space-y-2">
                                <div className="flex flex-wrap gap-2">
                                    {eventData.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm flex items-center gap-2"
                                        >
                                            {tag}
                                            <button
                                                onClick={() => handleChange('tags', eventData.tags.filter((_, i) => i !== index))}
                                                className="hover:text-primary/80"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Add new tag"
                                        className="w-full bg-transparent border-b border-secondary/20 text-secondary py-2 focus:outline-none focus:border-secondary"
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter' && e.target.value) {
                                                handleChange('tags', [...eventData.tags, e.target.value]);
                                                e.target.value = '';
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-primary mb-2">Invited Friends</label>
                            <div className="space-y-2">
                                <div className="flex flex-wrap gap-2">
                                    {eventData.invitedFriends.map((friend, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm flex items-center gap-2"
                                        >
                                            {friend}
                                            <button
                                                onClick={() => handleChange('invitedFriends', eventData.invitedFriends.filter((_, i) => i !== index))}
                                                className="hover:text-primary/80"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Add friend"
                                        className="w-full bg-transparent border-b border-secondary/20 text-secondary py-2 focus:outline-none focus:border-secondary"
                                    />
                                    <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-secondary" />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                className="px-6 py-2 text-muted-foreground hover:text-foreground"
                                onClick={() => {
                                    if (isDirty) {
                                        // Show confirmation dialog
                                    }
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 border border-secondary text-secondary hover:bg-secondary/10 rounded"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowSuccessMessage(true);
                                    setIsDirty(false);
                                    setTimeout(() => setShowSuccessMessage(false), 3000);
                                }}
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>

                {/* Success Message */}
                {showSuccessMessage && (
                    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-md">
                        <Check className="w-4 h-4" />
                        <span>Changes saved successfully.</span>
                        <button
                            onClick={() => setShowSuccessMessage(false)}
                            className="ml-4"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {/* Delete Confirmation Dialog */}
                {showDeleteDialog && (
                    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                        <div className="bg-background border border-primary/20 rounded-lg p-6 max-w-md w-full mx-4">
                            <div className="flex items-center gap-4 text-primary mb-4">
                                <AlertTriangle className="w-6 h-6" />
                                <h2 className="text-xl font-medium">Delete Event</h2>
                            </div>
                            <p className="text-muted-foreground mb-6">
                                Are you sure you want to delete this event? This action cannot be undone.
                            </p>
                            <div className="flex justify-end gap-4">
                                <button
                                    className="px-4 py-2 text-muted-foreground hover:text-foreground"
                                    onClick={() => setShowDeleteDialog(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 bg-primary/20 text-primary rounded hover:bg-primary/30"
                                    onClick={() => {
                                        // Handle delete
                                        setShowDeleteDialog(false);
                                    }}
                                >
                                    Delete Event
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}