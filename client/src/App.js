import { Routes, Route, Outlet } from "react-router-dom";
import { SessionProvider } from "./contexts/SessionContext";
import NavBar from "./components/NavBar";
import Sidebar from "./components/SideBar";
import FilterBar from "./components/FilterBar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

// Layout for protected pages
function ProtectedLayout() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <NavBar />
      <div style={{ display: "flex", flex: 1 }}>
        <SideBar />
        <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <FilterBar />
          <div style={{ padding: 16, flex: 1 }}>
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

      {/* Protected */}
      <Route element={<ProtectedRoute><ProtectedLayout /></ProtectedRoute>}>
        <Route index element={<h2>Main Feed</h2>} />
        {/* Add more protected routes here */}
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default function App() {
  return (
    <SessionProvider>
      <NavBar /> {/* Always visible NavBar outside routes if you want no flicker */}
      <AppRoutes />
    </SessionProvider>
  );
}
