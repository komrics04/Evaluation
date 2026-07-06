import { useAuth } from "../context/AuthContext";
import { EMPLOYEES } from "../data/mockData";

export default function EmployeesPage() {
  const { user } = useAuth();

  const visibleEmployees =
    user!.role === "Vezeto" || user!.role === "TerulentiVezeto"
      ? EMPLOYEES.filter((e) => user!.costCenters?.includes(e.costCenter))
      : EMPLOYEES;

  return (
    <>
      <div className="topbar">
        <div>
          <div className="topbar__eyebrow">Dolgozói törzs</div>
          <h1>Dolgozók</h1>
        </div>
        {(user!.role === "Vezeto" || user!.role === "TerulentiVezeto") && (
          <div className="ledger-row__meta">
            Csak a saját költséghelyed dolgozói: {user!.costCenters?.join(", ")}
          </div>
        )}
      </div>

      <div className="card" style={{ padding: 0 }}>
        <table className="table">
          <thead>
            <tr>
              <th>Név</th>
              <th>Szervezeti egység</th>
              <th>Költséghely</th>
              <th>Belépés</th>
              <th>Jogviszony</th>
              <th>Értékelés</th>
            </tr>
          </thead>
          <tbody>
            {visibleEmployees.map((e) => (
              <tr key={e.id}>
                <td style={{ fontWeight: 600 }}>{e.name}</td>
                <td>{e.department}</td>
                <td className="mono">{e.costCenter}</td>
                <td className="mono">{e.hireDate}</td>
                <td>
                  <span className="pill" style={!e.isActive ? { background: "rgba(107,122,128,0.15)" } : undefined}>
                    {e.isActive ? "Aktív" : "Inaktív"}
                  </span>
                </td>
                <td>
                  <span
                    className="pill"
                    style={
                      e.evaluationStatus === "kesz"
                        ? { background: "rgba(63,143,95,0.14)", color: "var(--moss-600)" }
                        : e.evaluationStatus === "folyamatban"
                        ? { background: "rgba(198,138,46,0.14)", color: "#8A6218" }
                        : { background: "rgba(181,74,58,0.12)", color: "var(--brick-600)" }
                    }
                  >
                    {e.evaluationStatus === "kesz" ? "Kész" : e.evaluationStatus === "folyamatban" ? "Folyamatban" : "Hiányzik"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {visibleEmployees.length === 0 && (
        <p className="ledger-row__meta" style={{ marginTop: 16 }}>Nincs megjeleníthető dolgozó ehhez a szerepkörhöz.</p>
      )}
    </>
  );
}
