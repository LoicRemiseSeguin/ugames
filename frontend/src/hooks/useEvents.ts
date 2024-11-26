import { useState, useEffect, useCallback } from 'react'
import { eventService } from '@/services/events'

export function useEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEvents = useCallback(async () => {
        try {
            setLoading(true)
            const data = await eventService.getAllEvents();
            setEvents(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const createEvent = async (event) => {
        try {
            const newEvent = await eventService.createEvent(event);
            setEvents(prev => [...prev, newEvent]);
            return newEvent;
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    const updateEvent = async (id, event) => {
        try {
            const updatedEvent = await eventService.update(id, event);
            setEvents(prev =>
                prev.map(p => p.id === id ? updatedEvent : p)
            );
            return updatedEvent;
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    const deleteEvent = async (id) => {
        try {
            await productService.delete(id);
            setProducts(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    useEffect(() => {
        fetchEvents()
    }, [fetchEvents]);

    return {
        events,
        loading,
        error,
        createEvent,
        updateEvent,
        deleteEvent,
        refetch: fetchEvents
    };
}