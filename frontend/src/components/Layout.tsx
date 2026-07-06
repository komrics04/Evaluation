import { NavLink, Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROLE_LABELS } from "../data/mockData";

interface NavItem {
  to: string;
  label: string;
  roles: string[];
}

const NAV_ITEMS: NavItem[] = [
  { to: "/", label: "Áttekintés", roles: ["Admin", "HR", "TerulentiVezeto", "Vezeto", "CsakOlvaso"] },
  { to: "/dolgozok", label: "Dolgozók", roles: ["Admin", "HR", "TerulentiVezeto", "Vezeto", "CsakOlvaso"] },
  { to: "/ertekeles", label: "Értékelés kitöltése", roles: ["Admin", "HR", "TerulentiVezeto", "Vezeto"] },
  { to: "/sablonok", label: "Értékelési sablonok", roles: ["Admin", "HR"] },
  { to: "/idoszakok", label: "Időszakok", roles: ["Admin", "HR"] },
];

export default function Layout() {
  const { user, logout } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  const visibleItems = NAV_ITEMS.filter((item) => item.roles.includes(user.role));

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar__brand">
          Értékelési rendszer
          <small>Belső HR alkalmazás</small>
        </div>

        {visibleItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
          >
            {item.label}
          </NavLink>
        ))}

        <div className="sidebar__footer">
          <div style={{ color: "var(--paper-50)", fontWeight: 600, marginBottom: 2 }}>{user.name}</div>
          <div style={{ marginBottom: 10 }}>{ROLE_LABELS[user.role]}</div>
          <button
            onClick={logout}
            className="btn btn--ghost"
            style={{ borderColor: "rgba(255,255,255,0.2)", color: "var(--paper-50)", width: "100%", justifyContent: "center" }}
          >
            Kijelentkezés
          </button>
        </div>
      </aside>

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
