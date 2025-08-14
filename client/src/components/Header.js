export default function Header() {
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
      <div
        style={{ width: 32, height: 32, borderRadius: "50%", background: "#ddd" }}
      />
    </header>
  );
}