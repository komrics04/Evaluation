import { useState } from "react";
import StatusStamp from "../components/StatusStamp";
import { PERIODS as INITIAL_PERIODS } from "../data/mockData";

export default function PeriodsPage() {
  const [periods, setPeriods] = useState(INITIAL_PERIODS);

  function toggle(id: string) {
    setPeriods((prev) => prev.map((p) => (p.id === id ? { ...p, isClosed: !p.isClosed } : p)));
  }

  return (
    <>
      <div className="topbar">
        <div>
          <div className="topbar__eyebrow">Admin</div>
          <h1>Időszakok</h1>
        </div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <table className="table">
          <thead>
            <tr>
              <th>Időszak</th>
              <th>Állapot</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {periods.map((p) => (
              <tr key={p.id}>
                <td className="mono" style={{ fontWeight: 600 }}>{p.name}</td>
                <td><StatusStamp isClosed={p.isClosed} /></td>
                <td style={{ textAlign: "right" }}>
                  <button className="btn btn--ghost" onClick={() => toggle(p.id)}>
                    {p.isClosed ? "Újranyitás" : "Lezárás"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
