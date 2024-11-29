import { fetchWrapper } from '@/api/fetchWrapper';

export interface UserModel {
    id?: string,
    email: string,
    username: string,
    first_name?: string,
    last_name?: string,
    bio?: string,
    city?: string,
    registration_date?: Date
};

export interface StatisticsModel {
    id?: string,
    // name: string,
    creator_id?: number,
    game_id: number,
    event_name: string,
    event_description: string,
    event_date: Date,
    is_public: boolean,
    city: string
};

export const userService = {

    // Users
    getUsers: () => {
        return fetchWrapper('/api/users');
    },

    getUserById: (id: string, undecodedToken: string) => {
        return fetchWrapper(`/api/users/${id}`, {
            method: 'GET',
            undecodedToken
        });
    },

    update: (id: string, user: UserModel, undecodedToken: string) => {
        return fetchWrapper(`/api/users/${id}`, {
            method: 'PUT',
            body: user,
            undecodedToken
        });
    },

    delete: (id: string, undecodedToken: string) => {
        return fetchWrapper(`/api/users/${id}`, {
            method: 'DELETE',
            undecodedToken
        });
    },

    // Event
    getUserEvents: (userId: string, undecodedToken: string) => {
        return fetchWrapper(`/api/users/${userId}/events`, {
            method: 'GET',
            undecodedToken
        });
    },

    // Statistics
    getStatistics: () => {
        return fetchWrapper('/api/user-statistics');
    },

    // getStatistics: () => {
    //     return fetchWrapper('/api/user-statistics/:user_id/:game_id');
    // },

    // createStatistics: (event: StatisticsModel) => {
    //     return fetchWrapper('/api/events', {
    //         method: 'POST',
    //         body: JSON.stringify(event)
    //     });
    // },

    updateStatistics: (user_id: string, game_id: string, statistics: StatisticsModel) => {
        return fetchWrapper(`/api/user-statistics/${user_id}/${game_id}`, {
            method: 'PUT',
            body: statistics
        });
    },

    deleteStatistics: (user_id: string, game_id: string) => {
        return fetchWrapper(`/api/user-statistics/${user_id}/${game_id}`, {
            method: 'DELETE'
        });
    }
}