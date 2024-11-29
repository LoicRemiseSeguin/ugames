"use client";

import { Fragment, useState } from 'react';
import { Camera, ChevronDown, X, Check } from 'lucide-react';
import { useEvent } from '@/hooks/useEvents';
import { EventModel } from '@/services/events';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/authContext';
import { useGame } from '@/hooks/useGames';
import { Combobox, Transition } from '@headlessui/react';
import { locations, /*tagOptions,*/ timeSlots/*, useDropdown*/ } from '@/components/searchBar';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { CustomCheckbox } from '@/components/checkbox';
import Loading from '@/components/loadingAnimation';
import { GameModel } from '@/services/games';

const CreateEventPage = () => {

    const router = useRouter();
    const { token, undecodedToken } = useAuth();
    const { eventData, create } = useEvent();
    const { games } = useGame();

    const [isLoading, setIsLoading] = useState(false);

    // const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!token || !undecodedToken) return;

        try {
            const form = e.currentTarget;
            const eventNameInput = form.eventName as HTMLInputElement;
            const eventDescriptionInput = form.eventDescription as HTMLInputElement;
            const game = JSON.stringify(selectedGame);

            if (!game || eventNameInput.value == '' || !selectedDate || !selectedTime || selectedLocation == '') return;

            const newEventData: EventModel = {
                creator_id: token.id,
                game_id: Number(selectedGame.game_id),
                event_name: eventNameInput.value,
                event_description: eventDescriptionInput.value,
                event_date: selectedDate.toISOString().split('T')[0] + " " + selectedTime,
                is_public: isPublic,
                city: selectedLocation,
                // tags: selectedTags
            };

            setIsLoading(true);

            await create(newEventData, undecodedToken);
            if (eventData) {
                router.push(`/event/${eventData.event_id}`);
            } else {
                router.push('/');
            }
        } catch (err) {
            console.log(err instanceof Error ? err.message : 'Event creation failed');
        } finally {
            setIsLoading(false);
        }
    };

    // Form
    const [isPublic, setIsPublic] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<string>('');
    const [locationQuery, setLocationQuery] = useState('');
    const [selectedGame, setSelectedGame] = useState<string>('');
    const [gameQuery, setGameQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [isDateOpen, setIsDateOpen] = useState(false);
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [timeQuery, setTimeQuery] = useState('');
    // const [selectedTags, setSelectedTags] = useState<string[]>([]);
    // const [tagQuery, setTagQuery] = useState('');
    // const tagsDropdown = useDropdown();

    const handleLocationChange = (value: string | null) => {
        setSelectedLocation(value || '');
    };

    const handleGameChange = (value: string | null) => {
        setSelectedGame(value || '');
    };

    const handleTimeChange = (value: string | null) => {
        setSelectedTime(value || '');
    };

    // const handleTagSelect = (value: string) => {
    //     if (value && !selectedTags.includes(value)) {
    //         setSelectedTags([...selectedTags, value]);
    //         setTagQuery('');
    //         tagsDropdown.close();
    //     }
    // };

    const clearLocation = () => {
        setSelectedLocation('');
        setLocationQuery('');
    };

    const clearGame = () => {
        setSelectedGame('');
        setGameQuery('');
    };

    const clearTime = () => {
        setSelectedTime('');
        setTimeQuery('');
    };

    const filteredLocations = locationQuery === ''
        ? locations
        : locations.filter((location) => location.toLowerCase().includes(locationQuery.toLowerCase()));

    const filteredGames = gameQuery === ''
        ? games
        : games.filter((game) => game.name.toLowerCase().includes(gameQuery.toLowerCase()));

    const filteredTimes = timeQuery === ''
        ? timeSlots
        : timeSlots.filter((time) => time.toLowerCase().includes(timeQuery.toLowerCase()));

    // const filteredTags = tagQuery === ''
    //     ? tagOptions
    //     : tagOptions.filter((tag) => tag.toLowerCase().includes(tagQuery.toLowerCase()));

    const today = new Date();
    const disabledDays = { before: today };

    // const handleSearch = () => {
    //     console.log({
    //         location: selectedLocation,
    //         date: selectedDate,
    //         time: selectedTime,
    //         tags: selectedTags
    //     });
    // };

    return (
        <div className="min-h-screen bg-background p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl font-bold text-primary">Create Event</h1>
                    {/* <button className="px-6 py-2 border border-secondary text-secondary hover:bg-secondary/10 rounded">
                        Publish
                    </button> */}
                </div>

                {/* Back Button */}
                {/* <button className="px-6 py-2 border border-secondary text-secondary hover:bg-secondary/10 rounded mb-6">
                    Back
                </button> */}

                {/* Cover Photo Section */}
                <div className="border border-primary/20 rounded-lg p-6 mb-6">
                    <h2 className="text-xl text-primary mb-4">Cover Photo</h2>

                    <div className="flex items-start gap-8">
                        <div className="text-center">
                            <div className="w-24 h-24 rounded-full border-2 border-dashed border-secondary flex items-center justify-center mb-2">
                                <Camera className="w-8 h-8 text-secondary" />
                            </div>
                            <button className="px-4 py-2 text-sm border border-secondary text-secondary hover:bg-secondary/10 rounded mb-2">
                                Upload Photo
                            </button>
                            <button className="text-secondary text-sm hover:text-secondary/80">
                                remove
                            </button>
                        </div>

                        <div className="text-primary/60">
                            <h3 className="text-primary mb-2">Image requirements:</h3>
                            <ol className="list-decimal list-inside space-y-1">
                                <li>Recommend: 1000 x 1000px</li>
                                <li>Max: 5MB</li>
                                <li>BoardGame photo or logo</li>
                            </ol>
                        </div>
                    </div>
                </div>

                {/* Event Details Form */}
                <div className="border border-primary/20 rounded-lg p-6">
                    <h2 className="text-xl text-primary mb-6">Event Details</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-primary mb-2">Event Name*</label>
                                <input
                                    id="eventName"
                                    type="text"
                                    placeholder="Placeholder"
                                    className="w-full bg-transparent border-b border-secondary/20 text-secondary py-2 focus:outline-none focus:border-secondary"
                                />
                            </div>
                            <div className="relative">
                                <label className="text-primary text-xl mb-1 block">Locations</label>
                                <Combobox value={selectedLocation} onChange={handleLocationChange}>
                                    <div className="relative">
                                        <div className="relative">
                                            <Combobox.Input
                                                className="w-full bg-background border border-primary/20 rounded px-3 py-2 text-primary/80 focus:outline-none focus:border-primary pr-16"
                                                displayValue={(location: string) => location}
                                                onChange={(event) => setLocationQuery(event.target.value)}
                                                placeholder="Select your city"
                                            />
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                                                {selectedLocation && (
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            clearLocation();
                                                        }}
                                                        className="p-1 hover:text-primary text-primary/60 mr-1"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                )}
                                                <Combobox.Button className="p-1">
                                                    <ChevronDown className="h-4 w-4 text-primary/60" />
                                                </Combobox.Button>
                                            </div>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-background border border-primary/20 py-1">
                                                {filteredLocations.length === 0 ? (
                                                    <div className="px-4 py-2 text-primary/60">Nothing found.</div>
                                                ) : (
                                                    filteredLocations.map((location) => (
                                                        <Combobox.Option
                                                            key={location}
                                                            value={location}
                                                            className={({ active }) =>
                                                                `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-primary/20 text-primary' : 'text-primary/60'
                                                                }`
                                                            }
                                                        >
                                                            {({ selected }) => (
                                                                <>
                                                                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                                        {location}
                                                                    </span>
                                                                    {selected && (
                                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                                                                            <Check className="h-5 w-5" />
                                                                        </span>
                                                                    )}
                                                                </>
                                                            )}
                                                        </Combobox.Option>
                                                    ))
                                                )}
                                            </Combobox.Options>
                                        </Transition>
                                    </div>
                                </Combobox>
                            </div>
                        </div>

                        <div className="relative">
                            <label className="text-primary text-xl mb-1 block">Games</label>
                            <Combobox value={selectedGame} onChange={handleGameChange}>
                                <div className="relative">
                                    <div className="relative">
                                        <Combobox.Input
                                            className="w-full bg-background border border-primary/20 rounded px-3 py-2 text-primary/80 focus:outline-none focus:border-primary pr-16"
                                            displayValue={(game: GameModel) => game.name}
                                            onChange={(event) => setGameQuery(event.target.value)}
                                            placeholder="Select your game"
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                                            {selectedLocation && (
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        clearGame();
                                                    }}
                                                    className="p-1 hover:text-primary text-primary/60 mr-1"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            )}
                                            <Combobox.Button className="p-1">
                                                <ChevronDown className="h-4 w-4 text-primary/60" />
                                            </Combobox.Button>
                                        </div>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-background border border-primary/20 py-1">
                                            {filteredGames.length === 0 ? (
                                                <div className="px-4 py-2 text-primary/60">Nothing found.</div>
                                            ) : (
                                                filteredGames.map((game) => (
                                                    <Combobox.Option
                                                        key={game.name}
                                                        value={game}
                                                        className={({ active }) =>
                                                            `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-primary/20 text-primary' : 'text-primary/60'
                                                            }`
                                                        }
                                                    >
                                                        {({ selected }) => (
                                                            <>
                                                                <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                                    {game.name}
                                                                </span>
                                                                {selected && (
                                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                                                                        <Check className="h-5 w-5" />
                                                                    </span>
                                                                )}
                                                            </>
                                                        )}
                                                    </Combobox.Option>
                                                ))
                                            )}
                                        </Combobox.Options>
                                    </Transition>
                                </div>
                            </Combobox>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="relative">
                                <label className="text-primary text-xl mb-1 block">Date</label>
                                <button
                                    type="button"
                                    className="w-full bg-background border border-primary/20 rounded px-3 py-2 text-left text-primary/80 focus:outline-none focus:border-primary"
                                    onClick={() => setIsDateOpen(!isDateOpen)}
                                >
                                    {selectedDate ? format(selectedDate, 'dd.MM.yyyy') : 'Select your date'}
                                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/60" />
                                </button>
                                {isDateOpen && (
                                    <div className="absolute z-10 mt-1 bg-background border border-primary/20 rounded p-2">
                                        <DayPicker
                                            mode="single"
                                            selected={selectedDate}
                                            onSelect={(date) => {
                                                setSelectedDate(date);
                                                setIsDateOpen(false);
                                            }}
                                            disabled={disabledDays}
                                            className="text-primary"
                                            classNames={{
                                                day_selected: "bg-primary text-primary-foreground",
                                                day_today: "font-bold",
                                                day: "hover:bg-primary/20 rounded-full",
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="relative">
                                <label className="text-primary text-xl mb-1 block">Time</label>
                                <Combobox value={selectedTime} onChange={handleTimeChange}>
                                    <div className="relative">
                                        <div className="relative">
                                            <Combobox.Input
                                                className="w-full bg-background border border-primary/20 rounded px-3 py-2 text-primary/80 focus:outline-none focus:border-primary pr-16"
                                                displayValue={(time: string) => time}
                                                onChange={(event) => setTimeQuery(event.target.value)}
                                                placeholder="Select your time"
                                            />
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                                                {selectedTime && (
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            clearTime();
                                                        }}
                                                        className="p-1 hover:text-primary text-primary/60 mr-1"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                )}
                                                <Combobox.Button className="p-1">
                                                    <ChevronDown className="h-4 w-4 text-primary/60" />
                                                </Combobox.Button>
                                            </div>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-background border border-primary/20 py-1">
                                                {filteredTimes.map((time) => (
                                                    <Combobox.Option
                                                        key={time}
                                                        value={time}
                                                        className={({ active }) =>
                                                            `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-primary/20 text-primary' : 'text-primary/60'
                                                            }`
                                                        }
                                                    >
                                                        {({ selected }) => (
                                                            <>
                                                                <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                                    {time}
                                                                </span>
                                                                {selected && (
                                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                                                                        <Check className="h-5 w-5" />
                                                                    </span>
                                                                )}
                                                            </>
                                                        )}
                                                    </Combobox.Option>
                                                ))}
                                            </Combobox.Options>
                                        </Transition>
                                    </div>
                                </Combobox>
                            </div>
                        </div>

                        <div>
                            <label className="block text-primary mb-2">Description*</label>
                            <textarea
                                id="eventDescription"
                                placeholder="Placeholder"
                                rows={4}
                                className="w-full bg-transparent border border-secondary/20 text-secondary p-2 rounded focus:outline-none focus:border-secondary"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {/* <div>
                                <label className="block text-primary mb-2">Number of Players*</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        defaultValue={2}
                                        placeholder="Placeholder"
                                        className="w-full bg-transparent border-b border-secondary/20 text-secondary py-2 focus:outline-none focus:border-secondary"
                                    />
                                </div>
                            </div> */}
                            <div>
                                <label className="block text-primary mb-2">Public or Private*</label>
                                <div className="relative">
                                    {/* <input
                                        type="text"
                                        placeholder="Placeholder"
                                        className="w-full bg-transparent border-b border-secondary/20 text-secondary py-2 focus:outline-none focus:border-secondary"
                                    /> */}
                                    <div className="w-full bg-transparent border-b border-secondary/20 text-secondary py-2 focus:outline-none focus:border-secondary">
                                        <CustomCheckbox
                                            label={isPublic ? "Public" : "Private"}
                                            checked={isPublic}
                                            onChange={(e) => setIsPublic(e.target.checked)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <div className="relative">
                            <label className="text-primary text-xl mb-1 block">Tags</label>
                            <div className="relative">
                                <Combobox
                                    as="div"
                                    value={tagQuery}
                                    onChange={handleTagSelect}
                                    onFocus={tagsDropdown.open}
                                >
                                    <div className="relative">
                                        <Combobox.Input
                                            className="w-full bg-background border border-primary/20 rounded px-3 py-2 text-primary/80 focus:outline-none focus:border-primary pr-16"
                                            onChange={(event) => {
                                                setTagQuery(event.target.value);
                                                if (!tagsDropdown.isOpen) {
                                                    tagsDropdown.open();
                                                }
                                            }}
                                            displayValue={() => tagQuery}
                                            placeholder={selectedTags.length === 0 ? "Select your tags" : "Add more tags"}
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                                            {selectedTags.length > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedTags([]);
                                                    }}
                                                    className="p-1 hover:text-primary text-primary/60 mr-1"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            )}
                                            <Combobox.Button
                                                className="p-1"
                                                onClick={() => tagsDropdown.toggle()}
                                            >
                                                <ChevronDown className="h-4 w-4 text-primary/60" />
                                            </Combobox.Button>
                                        </div>
                                    </div>

                                    {selectedTags.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {selectedTags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="inline-flex items-center bg-primary/20 text-primary rounded px-2 py-1 text-sm"
                                                >
                                                    {tag}
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedTags(selectedTags.filter(t => t !== tag));
                                                        }}
                                                        className="ml-1 hover:text-primary/80"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {tagsDropdown.isOpen && (
                                        <Transition
                                            as={Fragment}
                                            show={tagsDropdown.isOpen}
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                            afterLeave={() => setTagQuery('')}
                                        >
                                            <Combobox.Options
                                                static
                                                className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-background border border-primary/20 py-1"
                                            >
                                                {filteredTags.length === 0 && tagQuery !== '' ? (
                                                    <div className="px-4 py-2 text-primary/60">Nothing found.</div>
                                                ) : (
                                                    filteredTags
                                                        .filter(tag => !selectedTags.includes(tag))
                                                        .map((tag) => (
                                                            <Combobox.Option
                                                                key={tag}
                                                                value={tag}
                                                                className={({ active }) =>
                                                                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-primary/20 text-primary' : 'text-primary/60'
                                                                    }`
                                                                }
                                                                onClick={() => {
                                                                    handleTagSelect(tag);
                                                                    tagsDropdown.close();
                                                                }}
                                                            >
                                                                {({ selected }) => (
                                                                    <>
                                                                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                                            {tag}
                                                                        </span>
                                                                        {selected && (
                                                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                                                                                <Check className="h-5 w-5" />
                                                                            </span>
                                                                        )}
                                                                    </>
                                                                )}
                                                            </Combobox.Option>
                                                        ))
                                                )}
                                            </Combobox.Options>
                                        </Transition>
                                    )}
                                </Combobox>
                            </div>
                        </div> */}

                        {/* <div>
                            <label className="block text-primary mb-2">Invite Friends</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Placeholder"
                                    className="w-full bg-transparent border-b border-secondary/20 text-secondary py-2 focus:outline-none focus:border-secondary"
                                />
                                <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-secondary" />
                            </div>
                        </div> */}

                        <div className="flex justify-end">
                            {
                                isLoading ? <Loading /> :
                                    <button
                                        type="submit"
                                        className="px-6 py-2 border border-secondary text-secondary hover:bg-secondary/10 rounded"
                                    // onClick={(e) => {
                                    //     e.preventDefault();
                                    //     setShowSuccessMessage(true);
                                    //     setTimeout(() => setShowSuccessMessage(false), 3000);
                                    // }}
                                    >
                                        Publish
                                    </button>
                            }
                        </div>
                    </form>
                </div>

                {/* Success Message */}
                {/* {showSuccessMessage && (
                    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-md">
                        <Check className="w-4 h-4" />
                        <span>Successfully Saved. Your event draft have been saved.</span>
                        <button
                            onClick={() => setShowSuccessMessage(false)}
                            className="ml-4"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )} */}
            </div>
        </div>
    );
};

export default CreateEventPage;