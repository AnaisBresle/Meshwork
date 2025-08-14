import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside style={{ width: 220, padding: 16, borderRight: "1px solid #eee" }}>
      <nav style={{ display: "grid", gap: 8 }}>
        <Link to="/">Main Feed</Link>
        <Link to="/profile/socialsavvy-studio">Profile</Link>
        <Link to="/directory">Directory</Link>
        <Link to="/events">Events</Link>
      </nav>
    </aside>

  );
}