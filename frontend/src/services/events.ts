import { fetchWrapper } from '@/api/fetchWrapper';

export interface EventModel {
    id?: string,
    // name: string,
    creator_id?: string,
    game_id: number,
    event_name: string,
    event_description: string,
    event_date: Date,
    is_public: boolean,
    city: string
};

export interface EventFilter {
    city: string,
    event_date: Date,
    tags: string[]
};

export const eventService = {

    getAll: () => {
        return fetchWrapper('/api/events');
    },

    getWithFilters: (filters: EventFilter) => {
        return fetchWrapper('/api/events', {
            method: 'GET',
            body: filters
        });
    },

    getById: (id: string) => {
        return fetchWrapper(`/api/events/${id}`);
    },

    create: (event: EventModel) => {
        return fetchWrapper('/api/events', {
            method: 'POST',
            body: event
        });
    },

    update: (id: string, event: EventModel) => {
        return fetchWrapper(`/api/events/${id}`, {
            method: 'PUT',
            body: event
        });
    },

    delete: (id: string) => {
        return fetchWrapper(`/api/events/${id}`, {
            method: 'DELETE'
        });
    },

    join: (id: string) => {
        return fetchWrapper('/api/event-participants', {
            method: 'POST'
        });
    },

    unjoin: (id: string) => {
        return fetchWrapper(`/api/event-participants/:user_id/:event_id${id}`, {
            method: 'DELETE'
        });
    },
};