// app/profile/edit/page.tsx
import { Camera } from 'lucide-react';

export default function EditProfilePage() {
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
                <button className="px-4 py-2 border border-primary/20 rounded-md text-primary hover:bg-primary/10 transition-colors">
                    Cancel
                </button>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                    Save Changes
                </button>
            </div>
        </>
    );
}