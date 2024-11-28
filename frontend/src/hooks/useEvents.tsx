"use client";

import { EventModel, eventService } from '@/services/events';
import { createContext, useContext, ReactNode, useState } from 'react';

interface EventContextType {
    eventData: EventModel | null;
    getById: (id: string) => Promise<void>;
    create: (eventData: EventModel) => Promise<void>;
    update: (id: string, eventData: EventModel) => Promise<void>;
    deleteEvent: (id: string) => Promise<void>;
    join: (id: string) => Promise<void>;
    unjoin: (id: string) => Promise<void>;
};

interface EventProviderProps {
    children: ReactNode;
};

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: EventProviderProps) => {

    const [eventData, setEventData] = useState<EventModel | null>(null);

    const getById = async (id: string) => {
        try {
            const res = await eventService.getById(id);
            setEventData(res);
        } catch (err) {
            console.error('Error fetching event:', err);
            setEventData(null);
            throw err;
        }
    };

    const create = async (data: EventModel) => {
        try {
            await eventService.create(data);
        } catch (err) {
            console.error('Error creatinig event:', err);
            throw err;
        }
    };

    const update = async (id: string, eventData: EventModel) => {
        try {
            await eventService.update(id, eventData);
            setEventData(eventData);
        } catch (err) {
            console.error('Error updating event:', err);
            setEventData(null);
            throw err;
        }
    };

    const deleteEvent = async (id: string) => {
        try {
            await eventService.delete(id);
        } catch (err) {
            console.error('Error deleting event:', err);
            throw err;
        }
    };

    const join = async (id: string) => {
        try {
            await eventService.join(id);
        } catch (err) {
            console.error('Error joining event:', err);
            throw err;
        }
    };

    const unjoin = async (id: string) => {
        try {
            await eventService.unjoin(id);
        } catch (err) {
            console.error('Error unjoining event:', err);
            throw err;
        }
    };

    const value: EventContextType = {
        eventData,
        getById,
        create,
        update,
        deleteEvent,
        join,
        unjoin
    };

    return (
        <EventContext.Provider value={value} >
            {children}
        </EventContext.Provider>
    );
};

export const useEvent = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error("useEvent must be used within an EventProvider");
    }
    return context;
};