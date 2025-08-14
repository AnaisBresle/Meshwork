
import profiles from "../data/profiles";

export default function ProfilePage() {
  return (
    <div style={{ display: "grid", gap: "24px" }}>
      <h1>Business Profiles</h1>

      {profiles.map((profile) => (
        <section
          key={profile.id}
          style={{
            display: "grid",
            gridTemplateColumns: "64px 1fr",
            gap: 16,
            padding: 16,
            border: "1px solid #eee",
            borderRadius: 12,
            background: "white",
          }}
        >
          {/* Avatar placeholder */}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "#ddd",
            }}
          />

          {/* Profile details */}
          <div style={{ display: "grid", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <h2 style={{ margin: 0 }}>{profile.name}</h2>
              <span style={{ fontSize: 12, color: "#666" }}>@{profile.id}</span>
            </div>

            <div style={{ fontSize: 14, color: "#444" }}>{profile.bio}</div>

            <div style={{ display: "flex", gap: 12, fontSize: 12, color: "#666" }}>
              <span>Industry: {profile.industry}</span>
              <span>Location: {profile.location}</span>
            </div>

            <div style={{ display: "flex", gap: 16, fontSize: 12 }}>
              <strong>{profile.stats.followers}</strong> followers
              <strong>{profile.stats.following}</strong> following
              <strong>{profile.stats.posts}</strong> posts
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}