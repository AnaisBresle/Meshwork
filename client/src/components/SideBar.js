import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  UserCircleIcon,
  UsersIcon,
  CalendarDaysIcon,
  BookmarkIcon,
  BuildingStorefrontIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

import logo from "../images/logo.png";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Main Feed", to: "/", icon: HomeIcon },
    { name: "Profile", to: "/profile/socialsavvy-studio", icon: UserCircleIcon },
    { name: "Directory", to: "/directory", icon: UsersIcon },
    { name: "Events", to: "/events", icon: CalendarDaysIcon },
  ];

  const savedItems = [
    { name: "Saved Posts", to: "/saved/posts", icon: BookmarkIcon },
    { name: "Saved Events", to: "/saved/events", icon: CalendarDaysIcon },
    { name: "Saved Businesses", to: "/saved/businesses", icon: BuildingStorefrontIcon },
  ];

  const accountItems = [
    { name: "Settings", to: "/settings", icon: Cog6ToothIcon },
  ];

  return (
    <div>
      {/* Mobile toggle button */}
      <button
        className="p-2 m-2 rounded-md border md:hidden"
        onClick={() => setOpen(!open)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-[var(--text-primary)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {open ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-60 bg-[var(--surface)] border-r border-[var(--border)] p-4 flex flex-col justify-between transform transition-transform duration-200 md:translate-x-0 md:relative md:block
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div>
          {/* Logo */}
          <div className="flex items-center justify-center mb-6">
            <img src={logo} alt="Meshwork Logo" className="w-full max-h-16 object-contain" />
          </div>

          {/* Main Nav */}
          <nav className="flex flex-col space-y-3 mb-6">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition 
                  ${
                    isActive
                      ? "active-link"
                      : "text-[var(--text-secondary)] hover:bg-[var(--background)] hover:text-[var(--primary)]"
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Divider */}
          <div className="border-t border-[var(--border)] my-4"></div>

          {/* Saved Section */}
          <div>
            <h3 className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide px-3 mb-2">
              Saved
            </h3>
            <ul className="space-y-2">
              {savedItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg transition 
                      ${
                        isActive
                          ? "active-link"
                          : "text-[var(--text-secondary)] hover:bg-[var(--background)] hover:text-[var(--primary)]"
                      }`
                    }
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Account Section */}
        <div className="border-t border-[var(--border)] pt-4">
          <ul className="space-y-2">
            {accountItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition 
                    ${
                      isActive
                        ? "active-link"
                        : "text-[var(--text-secondary)] hover:bg-[var(--background)] hover:text-[var(--primary)]"
                    }`
                  }
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}