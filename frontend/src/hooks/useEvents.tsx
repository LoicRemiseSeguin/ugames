"use client";

import { EventModel, eventService, JoinModel } from '@/services/events';
import { createContext, useContext, ReactNode, useState } from 'react';

interface EventContextType {
    eventData: EventModel | null;
    nbPlayersByEvent: number;
    eventList: EventModel[];
    getById: (id: string) => Promise<void>;
    create: (eventData: EventModel, undecodedToken: string) => Promise<void>;
    update: (id: string, eventData: EventModel, undecodedToken: string) => Promise<void>;
    deleteEvent: (id: string, undecodedToken: string) => Promise<void>;
    searchEvents: (params: string) => Promise<void>;
    join: (joinData: JoinModel, undecodedToken: string) => Promise<void>;
    getUserJoiningStatusByEvent: (userId: string, eventId: string, undecodedToken: string) => Promise<boolean>;
    unjoin: (userId: string, eventId: string, undecodedToken: string) => Promise<void>;
    getNbPlayersByEvent: (eventId: string) => Promise<void>;
};

interface EventProviderProps {
    children: ReactNode;
};

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: EventProviderProps) => {

    const [eventData, setEventData] = useState<EventModel | null>(null);
    const [nbPlayersByEvent, setNbPlayersByEvent] = useState<number>(0);
    const [eventList, setEventList] = useState<EventModel[]>([]);

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

    const create = async (data: EventModel, undecodedToken: string) => {
        try {
            const res = await eventService.create(data, undecodedToken);
            setEventData(res);
        } catch (err) {
            console.error('Error creatinig event:', err);
            setEventData(null);
            throw err;
        }
    };

    const update = async (id: string, eventData: EventModel, undecodedToken: string) => {
        try {
            await eventService.update(id, eventData, undecodedToken);
            setEventData(eventData);
        } catch (err) {
            console.error('Error updating event:', err);
            setEventData(null);
            throw err;
        }
    };

    const deleteEvent = async (id: string, undecodedToken: string) => {
        try {
            await eventService.delete(id, undecodedToken);
        } catch (err) {
            console.error('Error deleting event:', err);
            throw err;
        }
    };

    const searchEvents = async (params: string) => {
        try {
            const res = await eventService.searchEvents(params);
            setEventList(res);
        } catch (err) {
            console.error('Error searching events:', err);
            setEventList([]);
            throw err;
        }
    };

    const join = async (joinData: JoinModel, undecodedToken: string) => {
        try {
            await eventService.join(joinData, undecodedToken);
        } catch (err) {
            console.error('Error joining event:', err);
            throw err;
        }
    };

    const getUserJoiningStatusByEvent = async (userId: string, eventId: string, undecodedToken: string) => {
        try {
            const res: JoinModel = await eventService.getUserJoiningStatusByEvent(userId, eventId, undecodedToken);
            return res.is_going;
        } catch (err) {
            console.error('Error joining event:', err);
            return false;
            throw err;
        }
    };

    const unjoin = async (userId: string, eventId: string, undecodedToken: string) => {
        try {
            await eventService.unjoin(userId, eventId, undecodedToken);
        } catch (err) {
            console.error('Error unjoining event:', err);
            throw err;
        }
    };

    const getNbPlayersByEvent = async (eventId: string) => {
        try {
            const res = await eventService.getNbPlayersByEvent(eventId);
            setNbPlayersByEvent(res.participant_count);
        } catch (err) {
            console.error('Error getting Nb Players by event:', err);
            setNbPlayersByEvent(0);
            throw err;
        }
    };

    const value: EventContextType = {
        eventData,
        nbPlayersByEvent,
        eventList,
        getById,
        create,
        update,
        deleteEvent,
        searchEvents,
        join,
        getUserJoiningStatusByEvent,
        unjoin,
        getNbPlayersByEvent,
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