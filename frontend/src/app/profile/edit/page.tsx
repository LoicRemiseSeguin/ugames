"use client";

import { useAuth } from '@/hooks/authContext';
import { useUser } from '@/hooks/useUsers';
import { UserModel } from '@/services/user';
import { Camera } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function EditProfilePage() {

    const { token, undecodedToken } = useAuth();
    const { userData, get, update } = useUser();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onClickSave = () => {
        if (token && userData) {
            const newUserData: UserModel = {
                email: userData.email,
                username: usernameInputField,
                // bio: userData.bio
            };
            update(token.id, newUserData, undecodedToken ?? "");
        }
    };

    const onClickCancel = () => {
        if (userData) {
            setUsernameInputField(userData.username);
        }
    };

    useEffect(() => {

        async function fetchUserData(id: string) {
            setIsLoading(true);
            await get(id, undecodedToken ?? "");
            setIsLoading(false);
        }

        if (token) {
            if (userData) {
                setUsernameInputField(userData.username);
            } else {
                fetchUserData(token.id);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData]);

    const [usernameInputField, setUsernameInputField] = useState<string>(userData ? userData.username : "");

    const onChangeUsernameInputField = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsernameInputField(event.target.value);
    }

    return (
        <>
            <div className="border border-primary/20 rounded-lg p-6 mb-8">
                <h2 className="text-2xl text-primary mb-6">Edit Profile</h2>
                <div className="flex items-start gap-6">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full border-2 border-primary/20 flex items-center justify-center">
                            <Camera className="w-8 h-8 text-primary/60" />
                        </div>
                        <button className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2">
                            <Camera className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex-1 space-y-4">
                        <div>
                            <label className="block text-sm text-muted-foreground mb-1">
                                Username
                            </label>
                            <input
                                type="text"
                                className="w-full bg-muted p-2 rounded-md border border-primary/20 focus:border-primary focus:outline-none"
                                placeholder="Enter username"
                                value={usernameInputField}
                                onChange={onChangeUsernameInputField}
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-muted-foreground mb-1">
                                Bio
                            </label>
                            <textarea
                                className="w-full bg-muted p-2 rounded-md border border-primary/20 focus:border-primary focus:outline-none min-h-[100px]"
                                placeholder="Tell us about yourself"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-muted-foreground mb-1">
                                Tags
                            </label>
                            <input
                                type="text"
                                className="w-full bg-muted p-2 rounded-md border border-primary/20 focus:border-primary focus:outline-none"
                                placeholder="Add tags (separated by commas)"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <button onClick={onClickCancel} className="px-4 py-2 border border-primary/20 rounded-md text-primary hover:bg-primary/10 transition-colors">
                    Cancel
                </button>
                <button onClick={onClickSave} className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                    Save Changes
                </button>
            </div>
        </>
    );
}