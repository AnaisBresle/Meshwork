import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import EventsList from "../components/EventsList";
import CreateEvent from "../components/NewEvent";


export default function EventsPage() {
  // filters provided by <Outlet context={{ filters }} />
  const { filters } = useOutletContext(); // { topic, sort }

  const [events, setEvents] = useState([]);
  
  return (
    <>
    <div>
      <h1>Events</h1>
    <EventsList events={events} filters={filters} />
    </div>

    <div><CreateEvent  setEvents={setEvents} />
    </div>
    </>
  );
}