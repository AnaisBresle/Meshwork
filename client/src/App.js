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
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateRows: "auto auto 1fr auto", // header, filter, main, footer
      }}
    >
      <NavBar />
      <FilterBar onChange={handleFilters} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "220px 1fr",
          minHeight: 0,
        }}
      >
        <Sidebar />
        <main style={{ padding: 16 }}>
          <Outlet context={{ filters }} />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
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
        {/* Also accessible after login */}
      </Route>
    )}
  </Routes>
);

}
