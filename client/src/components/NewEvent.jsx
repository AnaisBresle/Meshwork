
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";


const CreateEvent = ({ setEvents }) => {

const currentLocation = useLocation();
const navigate = useNavigate();
  const { user, token} = useSession();
    
 if (!user) {
 return <p>Loading user info...</p>; 
}

const eventsSetter = setEvents || currentLocation.state?.setEvents;


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [location, setEventLocation] = useState('');
  const [type, setEventType] = useState('');
  const [link, setEventLink] = useState('');
  const [error, setError] = useState('');

  const displayError = (message) => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, 3000);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const formattedDate = new Date(eventDate).toISOString().split("T")[0];
  const formattedTime = eventTime + ":00";

  // Validations
  if (!title || !description || !type || !eventDate || !eventTime) {
    displayError('Please fill in all required fields.');
    return;
  }

  if (type === "online" && !link) {
    displayError("Link is required for online events.");
    return;
  }

  if (type === "in-person" && !location) {
    displayError("Location is required for in-person events.");
    return;
  }

  const newEventData = {
    title,
    description,
    type,
    eventDate: formattedDate,
    eventTime: formattedTime,
    ...(type === "in-person" && { location }),
    ...(type === "online" && { link }),
    createdBy: user.id
  };

  try {
      const response = await fetch("http://localhost:3001/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,  
       },
      body: JSON.stringify(newEventData),
    });

    const data = await response.json().catch(() => ({})); // never fails

    if (!response.ok) {
      const message = data.error || data.message || "Failed to create event";
      throw new Error(message);
    }

     // Update local state to include the new event
    eventsSetter?.(prev => [...prev, data]);

   

    // Reset form
    setTitle('');
    setDescription('');
    setEventType('');
    setEventDate('');
    setEventTime('');
    setEventLocation('');
    setEventLink('');

  console.log("Event created successfully:", data);

  navigate('/events');
 
  } catch (error) {
    console.error("Event creation failed", error.message);
    displayError(error.message);
  }
};


  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
      <h1> ✏️ Create a new Event</h1>
      
      <div >
        <label htmlFor="title" className="block text-gray-700">Event Name</label>
        <input
          id="title"
          type="text"
          placeholder="Enter event name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="description" className="block text-gray-700">Description</label>
        <textarea
          id="description"
          placeholder="Enter event description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows="4"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        ></textarea>
      </div>

      <div className="space-y-1">
        <label htmlFor="type" className="block text-gray-700">Type</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setEventType(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select a Type</option>
          <option value="online">Online</option>
          <option value="in-person">In-person</option>
         
        </select>
      </div>


 {type === "in-person" && (
      <div className="space-y-1">
        <label htmlFor="location" className="block text-gray-700">Location</label>
        <input
          id="location"
          type="text"
          placeholder="Enter event location"
          value={location}
          onChange={(e) => setEventLocation(e.target.value)}
          required={type === "in-person"} //only if type is in person
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        ></input>
      </div>
 )}

{type === "online" && (
        <div>
          <label htmlFor="link" className="block text-gray-700">
            Event Link
          </label>
          <input
            id="link"
            type="url"
            value={link}
            onChange={(e) => setEventLink(e.target.value)}
            placeholder="https://example.com/event"
            required={type === "online"}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
      )}

 <div>
        <label htmlFor="eventDate" className="block text-gray-700">
          Date
        </label>
        <input
          id="eventDate"
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>
      
      <div>

       <label htmlFor="eventTime" className="block text-gray-700">
          Time
        </label>
        <input
          id="eventTime"
          type="time"
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>
         
   

      {error && <p className="text-red-500 text-center">{error}</p>}
      
      <button
        type="submit"
        className="w-full bg-[var(--primary)] text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Create Event
      </button>
    </form>
   
  );
};
 
export default CreateEvent;