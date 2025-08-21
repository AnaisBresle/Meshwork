import { useEffect,useState, useRef } from "react";
import { useSession } from "../contexts/SessionContext";
import { NavLink as RouterNavLink, Link, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BellIcon,
  ChatBubbleOvalLeftIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";

import logo from "../images/logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, setUser, logout } = useSession();
  const [unreadCounts, setUnreadCounts] = useState({
    notifications: 5,
    messages: 2,
  });
  const [showSearch, setShowSearch] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

useEffect(() => {
  console.log("useEffect triggered");

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token found:", token);

      if (!token) return console.log("No token, aborting fetch");

      const res = await fetch("http://localhost:3001/api/users/me", {
        method: "GET",
        headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});
      console.log("Response received:", res);

      if (!res.ok) throw new Error("Failed to fetch user");

      const data = await res.json();
      console.log("Fetched user data:", data);
      setUser(data);
      console.log("User picture:", data.picture);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  fetchUser();
}, []); 

  // Lightmode & Dark Mode

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const handleLogout = () => {
    logout();        // clear session
    navigate("/login"); // send user to login page
  };

  if (!user) {
    return (
      <nav className="p-4">
        <Link to="/login" className="text-[var(--primary)] font-medium">Login</Link>
      </nav>
    );
  }

  return (
    <header
      className={`sticky top-0 z-50 bg-[var(--surface)] border-b border-[var(--border)] shadow-sm`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand + Navigation */}
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="flex-shrink-0 font-bold text-xl text-[var(--primary)]"
            >
              {/* Desktop: text / Mobile: logo */}
              <span className="hidden md:inline">Meshwork</span>
              <img src={logo} alt="Meshwork Logo" className="h-8 md:hidden" />
            </Link>
            <nav className="hidden md:flex space-x-1">
              <NavItem icon={HomeIcon} text="Home" to="/" active />
              <NavItem
                icon={MagnifyingGlassIcon}
                text="Explore"
                to="/explore"
              />
              <NavItem
                icon={BellIcon}
                text="Notifications"
                to="/notifications"
                badge={unreadCounts.notifications}
              />
              <NavItem
                icon={ChatBubbleOvalLeftIcon}
                text="Messages"
                to="/messages"
                badge={unreadCounts.messages}
              />
            </nav>
          </div>

          {/* Center: Search */}
          <div className="flex-1 max-w-xl mx-4">
            {showSearch ? (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search people, posts, #tags..."
                  className="w-full pl-4 pr-10 py-2 rounded-full bg-[var(--background)] text-[var(--text-primary)] focus:outline-none"
                />
                <button
                  onClick={() => setShowSearch(false)}
                  className="absolute right-3 top-2.5 text-[var(--text-secondary)]"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearch(true)}
                className="md:hidden p-2 text-[var(--text-secondary)]"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Right: User Controls */}
          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-[var(--background)]"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <SunIcon className="h-5 w-5 text-[var(--primary)]" />
              ) : (
                <MoonIcon className="h-5 w-5 text-[var(--text-secondary)]" />
              )}
            </button>

             {/* Combined User + Create Menu */}
            <UserCreateMenu user={user} handleLogout={handleLogout} />
          </div>
        </div>
      </div>
    </header>
  );
}

function NavItem({ icon: Icon, text, to, active, badge }) {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-3 py-2 rounded-md text-sm font-medium transition 
        ${
          isActive || active
            ? "active-link"
            : "text-[var(--text-secondary)] hover:bg-[var(--background)] hover:text-[var(--primary)]"
        }`
      }
    >
      <Icon className="h-5 w-5 mr-2" />
      {text}
      {badge > 0 && (
        <span className="ml-2 bg-[var(--error)] text-white text-xs px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </RouterNavLink>
  );
}

// Right: User Controls (Create + User menu separate)
function UserCreateMenu({ user, handleLogout }) {
  const [openCreate, setOpenCreate] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const createRef = useRef(null);
  const userRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (createRef.current && !createRef.current.contains(event.target)) {
        setOpenCreate(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setOpenUser(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center space-x-3">
      {/* Create Button */}
<div className="relative" ref={createRef}>
  <button
    onClick={() => setOpenCreate(!openCreate)}
    className="px-4 py-2 bg-[var(--primary)] text-white rounded-full hover:bg-blue-300 transition"
  >
    Create
  </button>
  {openCreate && (
    <div className="absolute right-0 mt-2 w-56 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-lg z-50 overflow-hidden">
      <Link
        to="/create-post"
        onClick={() => setOpenCreate(false)}
        className="flex items-center gap-3 px-5 py-3 text-[15px] text-gray-700 hover:bg-gray-50 transition"
      >
        <ChatBubbleOvalLeftIcon className="h-5 w-5 text-[var(--primary)]" />
        <span>Create Post</span>
      </Link>
      <Link
        to="/create-event"
        onClick={() => setOpenCreate(false)}
        className="flex items-center gap-3 px-5 py-3 text-[15px] text-gray-700 hover:bg-gray-50 transition"
      >
        <BellIcon className="h-5 w-5 text-[var(--primary)]" />
        <span>Create Event</span>
      </Link>
    </div>
  )}
</div>

      {/* User Menu */}
      <div className="relative" ref={userRef}>
        <button
          onClick={() => setOpenUser(!openUser)}
          className="flex items-center space-x-2 focus:outline-none"
        >
          <img
            src={user.picture ? user.picture: "/profile/default-avatar.png"}
            alt={`${user.firstname} ${user.lastname}`}
            className="w-8 h-8 rounded-full"
          />
          <span className="hidden md:inline text-[var(--text-primary)]">
            {user.firstname || "Username"}
          </span>
        </button>
        {openUser && (
          <div className="absolute right-0 mt-2 w-48 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-lg z-50 overflow-hidden">
            <Link to={`/profile/${user.id}`}
            className="block px-4 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--background)]"
            >Your Profile</Link>
            <Link
              to="/settings"
              onClick={() => setOpenUser(false)}
              className="block px-4 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--background)]"
            >
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left block px-4 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--background)]"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}