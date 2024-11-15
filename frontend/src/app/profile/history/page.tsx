// app/profile/history/page.tsx
"use client";

import React, { useState } from 'react';
import { Tags, Image } from 'lucide-react';

interface HistoryItem {
    id: number;
    image: string;
    description: string;
    type: 'saved' | 'history';
}

export default function HistoryPage() {
    const [activeTab, setActiveTab] = useState<'saved' | 'history'>('saved');

    const historyItems: HistoryItem[] = [
        {
            id: 1,
            image: '/placeholder.jpg',
            description: 'Lorem ipsum dolor sit amet consectetur. Diam tempus non id sapien bibendum turpis. Integer arcu cras sagittis dictumst sit. Integer ac dui nunc donec phasellus sit.',
            type: 'saved'
        },
        {
            id: 2,
            image: '/placeholder.jpg',
            description: 'Lorem ipsum dolor sit amet consectetur. Diam tempus non id sapien bibendum turpis. Integer arcu cras sagittis dictumst sit. Integer ac dui nunc donec phasellus sit.',
            type: 'saved'
        },
        {
            id: 3,
            image: '/placeholder.jpg',
            description: 'Lorem ipsum dolor sit amet consectetur. Diam tempus non id sapien bibendum turpis. Integer arcu cras sagittis dictumst sit. Integer ac dui nunc donec phasellus sit.',
            type: 'saved'
        },
        {
            id: 4,
            image: '/placeholder.jpg',
            description: 'Lorem ipsum dolor sit amet consectetur. Diam tempus non id sapien bibendum turpis. Integer arcu cras sagittis dictumst sit. Integer ac dui nunc donec phasellus sit.',
            type: 'history'
        },
        {
            id: 5,
            image: '/placeholder.jpg',
            description: 'Lorem ipsum dolor sit amet consectetur. Diam tempus non id sapien bibendum turpis. Integer arcu cras sagittis dictumst sit. Integer ac dui nunc donec phasellus sit.',
            type: 'history'
        }
    ];

    const HistorySection = ({ type }: { type: 'saved' | 'history' }) => {
        const items = historyItems.filter(item => item.type === type);

        return (
            <div className={`border rounded-lg p-6 ${type === 'saved' ? 'border-accent' : 'border-primary'}`}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className={`text-2xl ${type === 'saved' ? 'text-accent' : 'text-primary'}`}>
                        {type === 'saved' ? 'Saved' : 'History'}
                    </h2>
                    {type === 'saved' && (
                        <div className="text-accent">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2 mb-4">
                    <Tags className={`w-5 h-5 ${type === 'saved' ? 'text-accent' : 'text-primary'}`} />
                    <span className={`${type === 'saved' ? 'text-accent' : 'text-primary'}`}>Tags</span>
                </div>

                <div className="space-y-6">
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-4 items-center pb-4 border-b border-primary/20">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${type === 'saved' ? 'bg-accent/20' : 'bg-primary/20'
                                }`}>
                                <Image className={`w-8 h-8 ${type === 'saved' ? 'text-accent' : 'text-primary'
                                    }`} />
                            </div>
                            <p className="text-sm text-muted-foreground flex-1">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="grid grid-cols-2 gap-6">
            <HistorySection type="saved" />
            <HistorySection type="history" />
        </div>
    );
}