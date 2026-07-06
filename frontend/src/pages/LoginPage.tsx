import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { DEMO_USERS, ROLE_LABELS } from "../data/mockData";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // A valós backend auth (Identity + emailes 2FA) még nincs bekötve —
    // demó célból az űrlap beküldése az első HR-felhasználóval léptet be.
    login(DEMO_USERS.find((u) => u.role === "HR")!);
    navigate("/");
  }

  return (
    <div className="login-screen">
      <div className="login-screen__visual">
        <span className="topbar__eyebrow" style={{ color: "rgba(243,245,244,0.65)" }}>
          Belső rendszer
        </span>
        <h2>Teljesítményértékelés, egy helyen — dolgozónként, hónapról hónapra.</h2>
        <p>
          Költséghely szerinti jogosultság, rugalmas értékelési sablonok, és
          teljes visszakereshetőség minden lezárt időszakról.
        </p>
      </div>

      <div className="login-screen__form">
        <div className="login-card">
          <div className="topbar__eyebrow">Bejelentkezés</div>
          <h1 style={{ marginTop: 6, marginBottom: 24 }}>Értékelési rendszer</h1>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="email">Email cím</label>
              <input
                id="email"
                type="email"
                placeholder="nev.vezeteknev@ceg.hu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="password">Jelszó</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn--primary" style={{ width: "100%", justifyContent: "center" }}>
              Belépés
            </button>
          </form>

          <div className="login-card__demo">
            <div className="ledger-row__meta" style={{ marginBottom: 10 }}>
              Bemutatóhoz — gyors belépés szerepkör szerint (a valós SMTP/2FA
              beállítása után ez a szekció eltűnik):
            </div>
            {DEMO_USERS.map((u) => (
              <button
                key={u.id}
                type="button"
                className="demo-role-btn"
                onClick={() => {
                  login(u);
                  navigate("/");
                }}
              >
                <span>{u.name}</span>
                <span className="pill pill--teal">{ROLE_LABELS[u.role]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
