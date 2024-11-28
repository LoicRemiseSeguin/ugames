import { fetchWrapper } from '@/api/fetchWrapper';

export interface GameModel {
    game_id: string,
    name: string,
    description: string,
    category: string,
    average_playtime: number,
    min_players: number,
    max_players: number
};

export const gameService = {

    getAll: () => {
        return fetchWrapper('/api/games');
    }

};