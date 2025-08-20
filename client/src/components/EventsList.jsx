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
  if (loading) return <div className="text-[var(--text-secondary)]">Loading...</div>;
  if (error) return <div className="text-[var(--error)]">Error: {error}</div>;

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
    <div className="grid gap-4">
      <div className="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
        {list.map((ev) => (
          <article
            key={ev.id}
            className="
              bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 grid gap-3
              shadow-sm hover:shadow-md hover:-translate-y-1
              transition-transform duration-200
            "
          >
            {/* event image */}
            <img
              src={`/images/events/${ev.id}.jpg`}
              onError={(e) => (e.currentTarget.src = "/images/events/default.jpg")}
              alt={ev.title}
              className="w-full h-40 object-cover rounded-lg"
            />

            <h2 className="m-0 text-lg font-semibold text-[var(--text-primary)]">{ev.title}</h2>

            <div className="text-sm text-[var(--text-secondary)]">
              <strong>Location:</strong>{" "}
              {ev.type === "online" ? "Online" : ev.location}
            </div>

            <div className="text-sm text-[var(--text-primary)]">
              <strong>Date:</strong> {ev.eventDate} <br />
              <strong>Time:</strong> {ev.eventTime}
            </div>

            <p className="text-sm text-[var(--text-primary)] m-0">{ev.description}</p>

            {ev.link && (
              <a
                href={ev.link}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-[var(--primary)] hover:underline inline-flex items-center gap-1"
              >
                Join Event <span aria-hidden>→</span>
              </a>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
