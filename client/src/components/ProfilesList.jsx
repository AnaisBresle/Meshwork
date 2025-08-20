import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

export default function ProfilesList() {
  const [q, setQ] = useState("");
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/profiles")
      .then((res) => res.json())
      .then((data) => setProfiles(data))
      .catch(console.error);
  }, []);

  const visible = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return profiles;
    return profiles.filter((p) => {
      const hay = `${p.User.firstname} ${p.User.lastname} ${p.jobtitle} ${p.company} ${p.bio} ${p.location} ${p.industry} ${p.website} ${p.linkedIn}`.toLowerCase();
      return hay.includes(term);
    });
  }, [q, profiles]);

  return (
    <div className="grid gap-4">
      {/* search bar */}
      <div className="flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search people, roles, locations…"
          className="flex-1 max-w-xl px-3 py-2 border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] bg-[var(--background)] focus:ring-2 focus:ring-[var(--primary)] focus:outline-none"
        />
      </div>

      {/* grid of people cards */}
      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
        {visible.map((p) => {
          return (
            <article
              key={p.id}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 grid gap-3 shadow-sm hover:shadow-md hover:-translate-y-1 transition-transform duration-200"
            >
              {/* header row */}
              <div className="grid grid-cols-[48px_1fr] gap-3 items-center">
                <img
                  src={p.picture}
                  alt={`${p.User.firstname} ${p.User.lastname}`}
                  className="w-12 h-12 rounded-full border-2 border-[var(--primary)] object-cover bg-[var(--background)]"
                />
                <div>
                  <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                    {p.User.firstname} {p.User.lastname}
                  </h2>
                  <div className="text-xs text-[var(--text-secondary)]">
                    {p.jobtitle} • {p.company} • {p.industry}
                    <br />
                    {p.location}
                  </div>
                </div>
              </div>

              {/* bio */}
              <p className="text-sm text-[var(--text-primary)]">{p.bio}</p>

              {/* links */}
              <div className="flex flex-col gap-1 text-sm">
                {p.website && (
                  <a
                    href={p.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[var(--primary)] hover:underline"
                  >
                    🌐 <span>{p.website.replace(/^https?:\/\//, "")}</span>
                  </a>
                )}
                {p.linkedIn && (
                  <a
                    href={p.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[var(--primary)] hover:underline"
                  >
                    💼 <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {visible.length === 0 && (
        <p className="text-[var(--text-secondary)]">No results. Try a different search term.</p>
      )}
    </div>
  );
}
