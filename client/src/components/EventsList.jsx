
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";


export default function EventsList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Declaring error
  const { filters } = useOutletContext(); // { topics, sort }

  useEffect(() => {
    fetch("http://localhost:3001/api/events") 
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
 
// loader UI
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  // Start with everything
  let list = [...events];

  // 1) Topic filter
  if (filters?.type && filters.type !== "all") {
    list = list.filter((p) => p.type === filters.type);
  }


  // 2) Sort (newest/popular/nearby)
  if (filters?.sort === "newest") {
    list.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (filters?.sort === "popular") {
    // TODO: later sort by likes/comments
  } else if (filters?.sort === "nearby") {
    // TODO: later sort by distance to user
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
     
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
        }}
      >

          {list.map((ev) => (
          <article
            key={ev.id}
            style={{
              border: "1px solid #eee",
              borderRadius: 12,
              background: "white",
              padding: 16,
              display: "grid",
              gap: 10,
            }}
          >

           <h2 style={{ margin: 0 }}>{ev.title}</h2>
            <div style={{ fontSize: 14, color: "#666" }}>
              <strong>Location:</strong> {ev.type === "online" ? "Online" : ev.location}
            </div>
            <div style={{ fontSize: 14 }}>
              <strong>Date:</strong> {ev.eventDate} <br />
              <strong>Time:</strong> {ev.eventTime}
            </div>
            <p style={{ fontSize: 14, margin: 0 }}>{ev.description}</p>
            {ev.link && (
              <a
                href={ev.link}
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: 14 }}
              >
                Join Event →
              </a>
            )}
          </article>
            ))}
          </div>
    </div>
    
  );
}