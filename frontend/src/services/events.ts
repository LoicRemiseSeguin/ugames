import { fetchWrapper } from '@/api/fetchWrapper';

export interface EventModel {
    event_id?: string,
    creator_id: string,
    game_id: number,
    event_name: string,
    event_description: string,
    event_date: string,
    is_public: boolean,
    city: string,
    tags?: string[]
};

export interface EventFilter {
    city: string,
    event_date: Date,
    game: string,
    tags: string[]
};

export interface JoinModel {
    user_id: number,
    event_id: number,
    is_going: boolean
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

    create: (event: EventModel, undecodedToken: string) => {
        return fetchWrapper('/api/events', {
            method: 'POST',
            body: event,
            undecodedToken
        });
    },

    update: (id: string, event: EventModel, undecodedToken: string) => {
        return fetchWrapper(`/api/events/${id}`, {
            method: 'PUT',
            body: event,
            undecodedToken
        });
    },

    delete: (id: string, undecodedToken: string) => {
        return fetchWrapper(`/api/events/${id}`, {
            method: 'DELETE',
            undecodedToken
        });
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    join: (joinData: JoinModel, undecodedToken: string) => {
        return fetchWrapper('/api/event-participants', {
            method: 'POST',
            body: joinData,
            undecodedToken
        });
    },

    getUserJoiningStatusByEvent: (userId: string, gameId: string, undecodedToken: string) => {
        return fetchWrapper(`/api/event-participants/${userId}/${gameId}`, {
            method: 'GET',
            undecodedToken
        });
    },

    unjoin: (userId: string, gameId: string, undecodedToken: string) => {
        return fetchWrapper(`/api/event-participants/${userId}/${gameId}`, {
            method: 'DELETE',
            undecodedToken
        });
    },

    getNbPlayersByEvent: (eventId: string) => {
        return fetchWrapper(`/api/events/${eventId}/nbParticipants`);
    },

};