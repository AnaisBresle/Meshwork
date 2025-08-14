import events from "../data/events";
import profiles from "../data/profiles";

export default function EventsPage() {
  // Map each event to include business name
  const eventsWithBusiness = events.map((ev) => {
    const business = profiles.find((p) => p.id === ev.businessId);
    return { ...ev, businessName: business?.name || "Unknown Business" };
  });

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <h1>Events</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {eventsWithBusiness.map((ev) => (
          <article
            key={ev.id}
            style={{
              border: "1px solid #eee",
              borderRadius: 12,
              padding: 16,
              background: "white",
              display: "grid",
              gap: 8,
            }}
          >
            <h2 style={{ margin: 0 }}>{ev.title}</h2>
            <div style={{ fontSize: 14, color: "#666" }}>
              {ev.businessName} • {ev.type === "online" ? "Online" : ev.location}
            </div>
            <div style={{ fontSize: 14 }}>
              <strong>Date:</strong> {ev.date} <br />
              <strong>Time:</strong> {ev.time}
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