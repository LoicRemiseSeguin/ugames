import { fetchWrapper } from '@/api/api'

interface Event {
    id?: string
    name: string
}

export const eventService = {

    getAllEvents: () => {
        return fetchWrapper('/api/events');
    },

    getEventById: (id: string) => {
        return fetchWrapper(`/api/events/${id}`);
    },

    createEvent: (event: Event) => {
        return fetchWrapper('/api/events', {
            method: 'POST',
            body: event
        });
    },

    update: (id: string, event: Event) => {
        return fetchWrapper(`/api/events/${id}`, {
            method: 'PUT',
            body: event
        });
    },

    delete: (id: string) => {
        return fetchWrapper(`/api/events/${id}`, {
            method: 'DELETE'
        });
    }
}