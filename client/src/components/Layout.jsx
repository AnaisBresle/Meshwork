import NavBar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import FilterBar from "./components/FilterBar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function Layout() {
  const [filters, setFilters] = useState({ category: "all", industry: "all", sort: "newest" });

  const handleFilterChange = (change) => setFilters((prev) => ({ ...prev, ...change }));

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <NavBar />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <FilterBar onChange={handleFilterChange} />
          <div style={{ padding: 16, flex: 1 }}>
            <Outlet context={filters} /> {/* Your routed page content */}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
