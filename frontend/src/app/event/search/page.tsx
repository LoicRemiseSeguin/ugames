"use client";

import EventCard from "@/components/eventCard";
import SearchBar from "@/components/searchBar";
import { EventModel, eventService } from "@/services/events";
import { useEffect, useState } from "react";
// import eventsData from './mock-events.json';
import { useEvent } from "@/hooks/useEvents";

const SearchPage = () => {

    const { eventList } = useEvent();

    // useEffect(() => {

    // }, [eventList]);
    // const [eventsData, setEventsData] = useState([]);

    // const setup = async () => {
    //     const res = await eventService.getAll();
    //     setEventsData(res);
    // };

    // setup();

    return (
        <div className="min-h-screen">
            {/* Search Section */}
            <section className="w-full py-8 px-4 bg-gradient-to-b from-background to-background/95">
                <div className="container mx-auto">
                    <SearchBar />
                </div>
            </section>

            {/* Results Section - You can add your search results here */}
            {/* <section className="container mx-auto px-4 py-8"> */}
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                {/* Add your search results content here */}
                {eventList?.map((event: EventModel) => (
                    // <EventCard
                    //     key={event.event_id}
                    //     {...event}
                    // />
                    <p>test</p>
                ))}
            </section>
        </div>
    );
};

export default SearchPage;