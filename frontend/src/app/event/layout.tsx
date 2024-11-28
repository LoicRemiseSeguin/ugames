"use client";

import { useGame } from "@/hooks/useGames";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {

    const { games, getAll } = useGame();

    const getGames = async () => {
        try {
            await getAll();
        } catch (err) {
            console.error('Error fetching games:', err);
            throw err;
        }
    };

    if (games.length === 0) {
        getGames();
    }

    return (
        <div>
            {children}
        </div>
    );
};

export default ProfileLayout;