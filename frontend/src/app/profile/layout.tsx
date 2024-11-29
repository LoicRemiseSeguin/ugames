"use client";

import React, { useEffect } from 'react';
import { Camera, Calendar, /*Bell, Users,*/ LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/authContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {

    const router = useRouter();

    const { isAuthenticated, logout } = useAuth();

    const onClickLogout = () => {
        logout();
        router.push('/');
    };

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/");
        }
    },);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <nav className="border-b border-primary/20 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-primary text-3xl font-bold">Profile</h1>
                    <div className="flex gap-4 items-center">
                        <Link href="/event/create" className="px-4 py-2 border border-accent rounded-md text-accent hover:bg-accent/10 transition-colors">
                            Create Event
                        </Link>
                        <button onClick={onClickLogout} className="flex items-center gap-2 px-4 py-2 border border-destructive rounded-md text-destructive hover:bg-destructive/10 transition-colors">
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* Rest of the layout remains the same */}
            <main className="container mx-auto py-8 px-4">
                <div className="flex gap-8">
                    <aside className="w-64 border-r border-primary/20 pr-6">
                        {[
                            { label: 'Edit Profile', icon: Camera, href: '/profile/edit' },
                            { label: 'My Event', icon: Calendar, href: '/profile/events' },
                            { label: 'Saved & History', icon: Calendar, href: '/profile/history' },
                            // { label: 'Notifications', icon: Bell, href: '/profile/notifications' },
                            // { label: 'Friends', icon: Users, href: '/profile/friends' },
                        ].map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className="dropdown-button w-full group"
                            >
                                <span className="flex items-center gap-3">
                                    <item.icon className="w-5 h-5" />
                                    {item.label}
                                </span>
                            </Link>
                        ))}
                    </aside>
                    <div className="flex-1">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProfileLayout;