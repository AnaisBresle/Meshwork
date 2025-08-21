import React, { useEffect} from "react";
import { useSession } from "../context/SessionContext";

export default function Header() {

   const { user, logout } = useSession();

  const picture = user?.profile?.picture;
  const initials = user?.firstname && user?.lastname
    ? `${user.firstname[0]}${user.lastname[0]}`
    : "?";

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "12px 16px",
        borderBottom: "1px solid #eee",
        position: "sticky",
        top: 0,
        background: "white",
        zIndex: 10,
      }}
    >
      {/* brand */}
      <div style={{ fontWeight: 600 }}>Meshwork</div>

      {/* search */}
      <input
        placeholder="Search posts, businesses, events…"
        style={{
          flex: 1,
          maxWidth: 600,
          padding: 8,
          border: "1px solid #ddd",
          borderRadius: 8,
        }}
      />

      {/* call to action */}
      <button
        style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #ddd" }}
      >
        Create Post
      </button>

      {/* notifications + avatar */}
      <span aria-hidden>🔔</span>
      {/* profile picture or initials */}
      
      {picture ? (
        <img
          src={user.picture.startsWith("/") ? user.picture : `/${user.picture}`}
          alt={`${user.firstname} ${user.lastname}`}
          style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }}
        />
      ) : (
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#ddd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            fontWeight: 600,
            color: "#555",
          }}
        >
          {user?.firstname?.[0]}{user?.lastname?.[0] || "?"}
        </div>
      )}

      {/* logout button */}
      {user && (
        <button
          onClick={logout}
          style={{
            marginLeft: 8,
            padding: "6px 10px",
            borderRadius: 6,
            border: "1px solid #ddd",
            background: "#f5f5f5",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      )}
 
    </header>
  );
}