import { useState } from "react";
import { NavLink as RouterNavLink, Link } from "react-router-dom";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BellIcon,
  ChatBubbleOvalLeftIcon,
  SunIcon,
  MoonIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

import logo from "../images/logo.png";

export default function Navbar() {
  const [unreadCounts, setUnreadCounts] = useState({
    notifications: 5,
    messages: 2,
  });
  const [showSearch, setShowSearch] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <header
      className={`sticky top-0 z-50 bg-[var(--surface)] border-b border-[var(--border)] shadow-sm`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand + Navigation */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex-shrink-0 font-bold text-xl text-[var(--primary)]">
              {/* Desktop: text / Mobile: logo */}
              <span className="hidden md:inline">Meshwork</span>
              <img src={logo} alt="Meshwork Logo" className="h-8 md:hidden" />
            </Link>
            <nav className="hidden md:flex space-x-1">
              <NavItem icon={HomeIcon} text="Home" to="/" active />
              <NavItem icon={MagnifyingGlassIcon} text="Explore" to="/explore" />
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

            {/* Create Post */}
            <CreatePostButton />

            {/* User Menu */}
            <div className="relative">
              <button className="flex items-center space-x-2 focus:outline-none">
                <img
                  src="/user-avatar.jpg"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="hidden md:inline text-[var(--text-primary)]">
                  Username
                </span>
              </button>
              {/* Dropdown (example – can do later) */}
              <div className="hidden absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[var(--surface)] border border-[var(--border)]">
                <Link
                  to="/profile"
                  className="dropdown-item block px-4 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--background)]"
                >
                  Your Profile
                </Link>
                <Link
                  to="/settings"
                  className="dropdown-item block px-4 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--background)]"
                >
                  Settings
                </Link>
                <button className="dropdown-item block w-full text-left px-4 py-2 text-sm text-[var(--error)] hover:bg-[var(--background)]">
                  Logout
                </button>
              </div>
            </div>
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

function CreatePostButton() {
  return (
    <button className="flex items-center px-4 py-2 bg-[var(--primary)] text-white rounded-full hover:opacity-90 transition">
      <PlusIcon className="h-5 w-5 mr-2" />
      <span className="hidden md:inline">Create</span>
    </button>
  );
}
