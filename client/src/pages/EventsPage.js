import { useOutletContext } from "react-router-dom";
import EventsList from "../components/EventsList";
import CreateEvent from "../components/NewEvent";


export default function EventsPage() {
  // filters provided by <Outlet context={{ filters }} />
  const { filters } = useOutletContext(); // { topic, sort }
  
  return (
    <div>
      <h1>Events</h1>
    <EventsList filters={filters} />
    </div>

    <div><CreateEvent />
    </div>
  );
}