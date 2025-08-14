export default function Footer() {
  return (
    <footer
      style={{
        padding: "16px",
        background: "#f7f7f7",
        borderTop: "1px solid #ddd",
        textAlign: "center",
        fontSize: 14,
        color: "#555"
      }}
    >
      © {new Date().getFullYear()} Meshwork — Connecting Local Businesses
    </footer>
  );
}