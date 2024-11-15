// app/profile/layout.tsx
import React from 'react';
import { Camera, Calendar/*, Bell, Users*/ } from 'lucide-react';
import Link from 'next/link';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Navbar */}
            <nav className="border-b border-primary/20 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-primary text-3xl font-bold">Profile</h1>
                    <Link href="/event/create" className="px-4 py-2 border border-accent rounded-md text-accent hover:bg-accent/10 transition-colors">
                        Create Event
                    </Link>
                </div>
            </nav>

            {/* Main content with sidebar */}
            <main className="container mx-auto py-8 px-4">
                <div className="flex gap-8">
                    {/* Sidebar */}
                    <aside className="w-64 border-r border-primary/20 pr-6">
                        {[
                            { label: 'Edit Profile', icon: Camera, href: '/profile/edit' },
                            { label: 'My Event', icon: Calendar, href: '/profile/events' },
                            { label: 'Saved & History', icon: Calendar, href: '/profile/history' },
                            // { label: 'Notifications', icon: Bell, href: '/profile/notifications' },
                            // { label: 'Friends', icon: Users, href: '/profile/friends' },
                        ].map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                className="dropdown-button w-full group"
                            >
                                <span className="flex items-center gap-3">
                                    <item.icon className="w-5 h-5" />
                                    {item.label}
                                </span>
                            </a>
                        ))}
                    </aside>

                    {/* Page content */}
                    <div className="flex-1">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProfileLayout;