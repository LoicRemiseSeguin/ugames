"use client";

import { useState, Fragment } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { DayPicker } from 'react-day-picker';
import { ChevronDown, Check, X } from 'lucide-react';
import { format } from 'date-fns';

// Mock data for dropdowns
const locations = [
    'Amsterdam', 'Berlin', 'Copenhagen', 'Dublin', 'Edinburgh',
    'Frankfurt', 'Geneva', 'Helsinki', 'Istanbul', 'London',
    'Madrid', 'Oslo', 'Paris', 'Rome', 'Stockholm',
    'Vienna', 'Warsaw', 'Zurich'
];

const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
    '21:00', '21:30', '22:00'
];

const tagOptions = [
    'Strategy', 'Family', 'Party', 'Card Game', 'Cooperative',
    'Competitive', 'Deck Building', 'Adventure', 'Fantasy',
    'Sci-Fi', 'Historical', 'Mystery', 'Economic', 'War Game',
    'Abstract', 'Dice Rolling', 'Area Control', 'Storytelling',
    'Word Game', 'Racing', 'Fighting', 'Puzzle', 'Trivia',
    'Educational', 'Kids', 'Adult', 'Quick Play', 'Long Game'
].sort();

const useDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);
    const toggle = () => setIsOpen(!isOpen);

    return { isOpen, open, close, toggle };
};

const SearchBar = () => {
    const [selectedLocation, setSelectedLocation] = useState<string>('');
    const [locationQuery, setLocationQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [isDateOpen, setIsDateOpen] = useState(false);
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [timeQuery, setTimeQuery] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [tagQuery, setTagQuery] = useState('');
    const tagsDropdown = useDropdown();

    const handleLocationChange = (value: string | null) => {
        setSelectedLocation(value || '');
    };

    const handleTimeChange = (value: string | null) => {
        setSelectedTime(value || '');
    };

    const handleTagSelect = (value: string) => {
        if (value && !selectedTags.includes(value)) {
            setSelectedTags([...selectedTags, value]);
            setTagQuery('');
            tagsDropdown.close();
        }
    };

    const clearLocation = () => {
        setSelectedLocation('');
        setLocationQuery('');
    };

    const clearTime = () => {
        setSelectedTime('');
        setTimeQuery('');
    };

    const filteredLocations = locationQuery === ''
        ? locations
        : locations.filter((location) => location.toLowerCase().includes(locationQuery.toLowerCase()));

    const filteredTimes = timeQuery === ''
        ? timeSlots
        : timeSlots.filter((time) => time.toLowerCase().includes(timeQuery.toLowerCase()));

    const filteredTags = tagQuery === ''
        ? tagOptions
        : tagOptions.filter((tag) => tag.toLowerCase().includes(tagQuery.toLowerCase()));

    const today = new Date();
    const disabledDays = { before: today };

    const handleSearch = () => {
        console.log({
            location: selectedLocation,
            date: selectedDate,
            time: selectedTime,
            tags: selectedTags
        });
    };

    return (
        <div className="w-full bg-background/50 backdrop-blur-sm border border-primary/20 rounded-lg p-4">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Locations Dropdown */}
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

                    {/* Date Picker */}
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

                    {/* Time Dropdown */}
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

                    {/* Tags Multi-select */}
                    <div className="relative">
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

                                {/* Selected Tags Pills */}
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
                    </div>


                    {/* Search Button */}
                    <div className="flex justify-end mt-4">
                        <button
                            type="button"
                            className="bg-secondary text-secondary-foreground px-8 py-2 rounded hover:bg-secondary/90 transition-colors"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;