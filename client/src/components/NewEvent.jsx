import { useState } from "react";



const CreateEvent = () => {
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

    if (!title || !description || !type || !eventDate  || !eventTime ) {
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
      eventDate,
      eventTime,
      location: type === "in-person" ? location : null, /// to handle condition 
      link: type === "online" ? link : null,
    };

    try {
      const response = await api.post('/api/events', newEventData);
      
      console.log('Event created successfully:', response.data);

      setTitle('');
      setDescription('');
      setEventType ('');
      setEventDate ('');
      setEventTime ('');
      setEventLocation ('');
      setEventLink ('');




    } catch (error) {
      console.error('Event creation failed', error);
      displayError('Failed to create event. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <h2>Create a new Event</h2>
      
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
          <option value="1">Online</option>
          <option value="2">In-person</option>
         
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
        className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Create Event
      </button>
    </form>
  );
};

export default CreateEvent;