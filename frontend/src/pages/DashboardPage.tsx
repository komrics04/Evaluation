import { useAuth } from "../context/AuthContext";
import { EMPLOYEES, PERIODS, ROLE_LABELS } from "../data/mockData";
import StatusStamp from "../components/StatusStamp";

export default function DashboardPage() {
  const { user } = useAuth();
  const currentPeriod = PERIODS.find((p) => !p.isClosed)!;

  const visibleEmployees =
    user!.role === "Vezeto" || user!.role === "TerulentiVezeto"
      ? EMPLOYEES.filter((e) => user!.costCenters?.includes(e.costCenter))
      : EMPLOYEES;

  const missing = visibleEmployees.filter((e) => e.evaluationStatus === "hianyzik").length;
  const inProgress = visibleEmployees.filter((e) => e.evaluationStatus === "folyamatban").length;
  const done = visibleEmployees.filter((e) => e.evaluationStatus === "kesz").length;

  return (
    <>
      <div className="topbar">
        <div>
          <div className="topbar__eyebrow">{ROLE_LABELS[user!.role]}</div>
          <h1>Szia, {user!.name.split(" ")[0]}!</h1>
        </div>
        <StatusStamp isClosed={false} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 8 }}>
        <div className="card">
          <div className="ledger-row__meta">Nyitott időszak</div>
          <div className="mono" style={{ fontSize: "1.6rem", fontWeight: 600, marginTop: 6 }}>{currentPeriod.name}</div>
        </div>
        <div className="card">
          <div className="ledger-row__meta">Kész értékelés</div>
          <div className="mono" style={{ fontSize: "1.6rem", fontWeight: 600, marginTop: 6, color: "var(--moss-600)" }}>{done} / {visibleEmployees.length}</div>
        </div>
        <div className="card">
          <div className="ledger-row__meta">Hiányzó értékelés</div>
          <div className="mono" style={{ fontSize: "1.6rem", fontWeight: 600, marginTop: 6, color: missing > 0 ? "var(--brick-600)" : "var(--ink-900)" }}>{missing}</div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: 14 }}>Dolgozók állapota — {currentPeriod.name}</h3>
        {visibleEmployees.map((e) => (
          <div className="ledger-row" key={e.id}>
            <div>
              <div className="ledger-row__label">{e.name}</div>
              <div className="ledger-row__meta">{e.department} · Költséghely {e.costCenter}</div>
            </div>
            <span
              className={
                "pill " +
                (e.evaluationStatus === "kesz" ? "pill--teal" : e.evaluationStatus === "folyamatban" ? "pill--amber" : "")
              }
              style={e.evaluationStatus === "hianyzik" ? { background: "rgba(181,74,58,0.12)", color: "var(--brick-600)" } : undefined}
            >
              {e.evaluationStatus === "kesz" ? "Kész" : e.evaluationStatus === "folyamatban" ? "Folyamatban" : "Hiányzik"}
            </span>
          </div>
        ))}
        {inProgress === 0 && missing === 0 && (
          <p className="ledger-row__meta" style={{ marginTop: 10 }}>Minden értékelés kész erre az időszakra.</p>
        )}
      </div>
    </>
  );
}
