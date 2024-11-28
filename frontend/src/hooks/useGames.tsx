"use client";

import { GameModel, gameService } from '@/services/games';
import { createContext, useContext, ReactNode, useState } from 'react';

interface GameContextType {
    games: GameModel[];
    game: GameModel | null;
    getAll: () => Promise<void>;
    getGameDataById: (id: string) => void;
};

interface GameProviderProps {
    children: ReactNode;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: GameProviderProps) => {

    const [games, setGames] = useState<GameModel[]>([]);
    const [game, setGame] = useState<GameModel | null>(null);

    const getAll = async () => {
        try {
            const res = await gameService.getAll();
            setGames(res);
        } catch (err) {
            console.error('Error fetching games:', err);
            setGames([]);
            throw err;
        }
    };

    const getGameDataById = (id: string) => {
        setGame(games.find(game => game.game_id === id) ?? null);
    };

    const value: GameContextType = {
        games,
        game,
        getAll,
        getGameDataById
    };

    return (
        <GameContext.Provider value={value} >
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGame must be used within an GameProvider");
    }
    return context;
};