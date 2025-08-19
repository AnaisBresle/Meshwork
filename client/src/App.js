// App.js
import { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import NavBar from "./components/NavBar";
import Sidebar from "./components/SideBar";
import FilterBar from "./components/FilterBar";
import Footer from "./components/Footer";

import MainFeed from "./pages/MainFeed";
import ProfilePage from "./pages/ProfilePage";
import DirectoryPage from "./pages/DirectoryPage";
import EventsPage from "./pages/EventsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";   
import CreateProfilePage from "./pages/CreateProfilePage"; 
import { SessionProvider } from "./contexts/SessionContext";

// Layout = header + filters + (sidebar | page slot)
function Layout() {
  const [filters, setFilters] = useState({
    category: "all",
    industry: "all",
    sort: "newest",
  });

  const handleFilters = (change) => {
    setFilters((prev) => ({ ...prev, ...change }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[var(--text-primary)]">
      {/* Navbar */}
      <NavBar />
      
      {/* Filters */}
      <FilterBar onChange={handleFilters} />

      {/* Main section with sidebar + page content */}
      <div className="flex flex-1 bg-white">
        <Sidebar />
        <main
          className="
            flex-1 p-6
            md:ml-60
            transition-all duration-300 ease-in-out
            max-w-4xl mx-auto
          "
        >
          <Outlet context={{ filters }} />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return ( <SessionProvider>
    <Routes>
      {!isLoggedIn ? (
        <>
          <Route
            path="/login"
            element={<LoginPage onLogin={() => setIsLoggedIn(true)} />}
          />
          <Route
            path="/signup"
            element={<SignupPage onSignup={() => setIsLoggedIn(true)} />}
          />
          <Route path="/create-profile" element={<CreateProfilePage />} /> 
          {/* Allow access even if not logged in */}

          {/* Redirect unknown paths */}
          <Route
            path="*"
            element={<LoginPage onLogin={() => setIsLoggedIn(true)} />}
          />
        </>
      ) : (
        <Route element={<Layout />}>
          <Route index element={<MainFeed />} />
          <Route path="profile/:id" element={<ProfilePage />} />
          <Route path="directory" element={<DirectoryPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="create-profile" element={<CreateProfilePage />} /> 
        </Route>
      )}
    </Routes>
    </SessionProvider>
  );
  
}