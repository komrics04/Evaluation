import { useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { EMPLOYEES, TEMPLATES, PERIODS } from "../data/mockData";

export default function EvaluationFillPage() {
  const { user } = useAuth();
  const currentPeriod = PERIODS.find((p) => !p.isClosed)!;

  const visibleEmployees =
    user!.role === "Vezeto" || user!.role === "TerulentiVezeto"
      ? EMPLOYEES.filter((e) => user!.costCenters?.includes(e.costCenter))
      : EMPLOYEES;

  const [employeeId, setEmployeeId] = useState(visibleEmployees[0]?.id ?? "");
  const [templateId, setTemplateId] = useState(TEMPLATES[0].id);
  const template = TEMPLATES.find((t) => t.id === templateId)!;

  // Once-típusú sablonokhoz (egyszerű / feladatonkénti): kompetenciánként egy pontszám.
  const [onceScores, setOnceScores] = useState<Record<string, string>>({});

  // Daily-típusú sablonokhoz (napi / napi+feladatonkénti): nap -> kompetencia -> pontszám.
  const [selectedDay, setSelectedDay] = useState(1);
  const [dailyScores, setDailyScores] = useState<Record<number, Record<string, string>>>({});

  const isDaily = template.type === "napi" || template.type === "napi_feladatonkenti";
  const daysEntered = Object.keys(dailyScores).map(Number).sort((a, b) => a - b);

  const average = useMemo(() => {
    if (!isDaily) {
      const vals = Object.values(onceScores).map(Number).filter((n) => !isNaN(n));
      if (vals.length === 0) return null;
      return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
    } else {
      const allVals: number[] = [];
      Object.values(dailyScores).forEach((day) =>
        Object.values(day).forEach((v) => {
          const n = Number(v);
          if (!isNaN(n)) allVals.push(n);
        })
      );
      if (allVals.length === 0) return null;
      return (allVals.reduce((a, b) => a + b, 0) / allVals.length).toFixed(1);
    }
  }, [onceScores, dailyScores, isDaily]);

  function saveDay() {
    // az adott nap pontszámait már beírtuk a dailyScores state-be inputonként,
    // itt csak vizuálisan zárjuk a napot (ledger-listába kerül)
    setSelectedDay((d) => Math.min(d + 1, 31));
  }

  function setDailyScore(day: number, competency: string, value: string) {
    setDailyScores((prev) => ({
      ...prev,
      [day]: { ...(prev[day] ?? {}), [competency]: value },
    }));
  }

  return (
    <>
      <div className="topbar">
        <div>
          <div className="topbar__eyebrow">Értékelés · {currentPeriod.name}</div>
          <h1>Értékelés kitöltése</h1>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Dolgozó</label>
            <select value={employeeId} onChange={(e) => setEmployeeId(e.target.value)}>
              {visibleEmployees.map((e) => (
                <option key={e.id} value={e.id}>{e.name} — {e.department}</option>
              ))}
            </select>
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Értékelési sablon</label>
            <select value={templateId} onChange={(e) => { setTemplateId(e.target.value); setOnceScores({}); setDailyScores({}); }}>
              {TEMPLATES.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {!isDaily && (
        <div className="card">
          <h3 style={{ marginBottom: 4 }}>Pontszámok</h3>
          <p className="ledger-row__meta" style={{ marginBottom: 10 }}>
            {template.type === "egyszeru" ? "Egyetlen összesített pontszám erre az időszakra." : "Feladatonként külön pontszám, egyszeri rögzítéssel."}
          </p>
          {template.competencies.map((c) => (
            <div className="score-grid" key={c}>
              <span className="ledger-row__label">{c}</span>
              <input
                type="number"
                min={1}
                max={10}
                className="score-input"
                value={onceScores[c] ?? ""}
                onChange={(e) => setOnceScores((prev) => ({ ...prev, [c]: e.target.value }))}
              />
            </div>
          ))}
        </div>
      )}

      {isDaily && (
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <h3>Napi bejegyzés</h3>
            <div className="field" style={{ marginBottom: 0, flexDirection: "row", alignItems: "center", gap: 8 }}>
              <label style={{ marginBottom: 0 }}>Nap:</label>
              <select value={selectedDay} onChange={(e) => setSelectedDay(Number(e.target.value))} style={{ width: 90 }}>
                {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>{currentPeriod.name}-{String(d).padStart(2, "0")}</option>
                ))}
              </select>
            </div>
          </div>

          {template.competencies.map((c) => (
            <div className="score-grid" key={c}>
              <span className="ledger-row__label">{c}</span>
              <input
                type="number"
                min={1}
                max={10}
                className="score-input"
                value={dailyScores[selectedDay]?.[c] ?? ""}
                onChange={(e) => setDailyScore(selectedDay, c, e.target.value)}
              />
            </div>
          ))}

          <button className="btn btn--ghost" style={{ marginTop: 14 }} onClick={saveDay}>
            Nap mentése, tovább a következőre →
          </button>

          {daysEntered.length > 0 && (
            <>
              <div className="ledger-row__meta" style={{ marginTop: 20, marginBottom: 6 }}>Rögzített napok:</div>
              {daysEntered.map((d) => (
                <div className="ledger-row" key={d} style={{ padding: "6px 0" }}>
                  <span className="ledger-row__label mono">{currentPeriod.name}-{String(d).padStart(2, "0")}</span>
                  <span className="ledger-row__score">
                    {(() => {
                      const vals = Object.values(dailyScores[d]).map(Number).filter((n) => !isNaN(n));
                      return vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1) : "—";
                    })()}
                  </span>
                </div>
              ))}
            </>
          )}
        </div>
      )}

      <div className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div className="ledger-row__meta">Számított átlag ebben az időszakban</div>
          <div className="mono" style={{ fontSize: "1.4rem", fontWeight: 600, color: "var(--amber-500)" }}>
            {average ?? "—"}
          </div>
        </div>
        <button className="btn btn--primary">Értékelés beküldése</button>
      </div>
    </>
  );
}
