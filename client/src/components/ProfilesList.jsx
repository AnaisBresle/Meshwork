
import {useState, useEffect, useMemo} from "react";
import { Link } from "react-router-dom";

export default function DirectoryPage() {
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
    <div style={{ display: "grid", gap: 16 }}>
      
      {/* simple search (TODO: add industry filter here later) */}
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search people, roles, locations…"
          style={{ flex: 1, maxWidth: 480, padding: 8, border: "1px solid #ddd", borderRadius: 8 }}
        />
      </div>

      {/* grid of people cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        {visible.map((p) => {
          return (
            <article
              key={p.id}
              style={{
                border: "1px solid #eee",
                borderRadius: 12,
                background: "white",
                padding: 16,
                display: "grid",
                gap: 10,
              }}
            >
              {/* header row */}
              <div style={{ display: "grid", gridTemplateColumns: "48px 1fr", gap: 12, alignItems: "center" }}>
                <img    src={p.picture} alt={`${p.User.firstname} ${p.User.lastname}`} style={{ width: 48, height: 48, borderRadius: "50%", background: "#ddd" }} />
                <div>
                  <h2 style={{ margin: 0, fontSize: 18 }}>{p.User.firstname} {p.User.lastname}</h2>
                  <div style={{ fontSize: 12, color: "#666" }}>
                    {p.jobtitle} • {p.company} • {p.industry}
                    <br />{p.location}
 
                  </div>
                </div>
              </div>

              {/* bio */}
              <p style={{ margin: 0, fontSize: 14, color: "#444" }}>{p.bio}</p>

            
            {/* links */}
            <p><Link to={p.website} style={{ fontSize: 14 }}>{p.website}</Link></p>
             <p><Link to={p.linkedIn} style={{ fontSize: 14 }}>{p.linkedIn}</Link></p>
      

              {/* stats row --- no such data yet
              <div style={{ display: "flex", gap: 16, fontSize: 12 }}>
                <strong>{p.stats.followers}</strong> followers
                <strong>{p.stats.posts}</strong> posts
              </div>*/}

              {/* actions */}
              <div style={{ display: "flex", gap: 8 }}>
                {/* TODO: create /people/:id profile page later */}
                {/* <Link to={`/people/${p.id}`} style={{ fontSize: 14 }}>View person →</Link> */}
                
              </div>
            </article>
          );
        })}
      </div>

      {visible.length === 0 && (
        <p style={{ color: "#666" }}>No results. Try a different search term.</p>
      )}
    </div>
  );
}