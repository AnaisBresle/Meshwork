import { Link } from "react-router-dom";
import {
  InformationCircleIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <footer
      style={{
        padding: "16px",
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        textAlign: "center",
        fontSize: 14,
        color: "var(--text-secondary)",
      }}
    >
      <div>
        © {new Date().getFullYear()}{" "}
        <span style={{ color: "var(--primary)", fontWeight: 600 }}>
          Meshwork
        </span>{" "}
        — Connecting Local Businesses
      </div>

      {/* Quick Links row */}
      <div
        style={{
          marginTop: "8px",
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          fontSize: "13px",
        }}
      >
        <Link to="/about" style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--text-secondary)" }}>
          <InformationCircleIcon style={{ height: "16px", width: "16px" }} /> About
        </Link>
        <Link to="/help" style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--text-secondary)" }}>
          <QuestionMarkCircleIcon style={{ height: "16px", width: "16px" }} /> Help
        </Link>
        <Link to="/terms" style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--text-secondary)" }}>
          <ShieldCheckIcon style={{ height: "16px", width: "16px" }} /> Terms
        </Link>
        <Link to="/privacy" style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--text-secondary)" }}>
          <GlobeAltIcon style={{ height: "16px", width: "16px" }} /> Privacy
        </Link>
      </div>
    </footer>
  );
}