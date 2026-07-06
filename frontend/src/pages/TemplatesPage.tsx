import { TEMPLATES } from "../data/mockData";

const TYPE_LABELS: Record<string, string> = {
  egyszeru: "Egyszerű · havi 1 pontszám",
  feladatonkenti: "Feladatonkénti · több pontszám, egyszeri",
  napi: "Napi · 1 pontszám, minden napra",
  napi_feladatonkenti: "Napi + feladatonkénti · a legrészletesebb",
};

export default function TemplatesPage() {
  return (
    <>
      <div className="topbar">
        <div>
          <div className="topbar__eyebrow">Admin</div>
          <h1>Értékelési sablonok</h1>
        </div>
        <button className="btn btn--primary">+ Új sablon</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {TEMPLATES.map((t) => (
          <div className="card" key={t.id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
              <h3 style={{ fontSize: "1.05rem" }}>{t.name}</h3>
              <button className="btn btn--ghost" style={{ padding: "5px 12px", fontSize: "0.8rem" }}>Szerkeszt</button>
            </div>
            <div className="pill pill--teal" style={{ marginTop: 8, marginBottom: 14 }}>{TYPE_LABELS[t.type]}</div>

            <div className="ledger-row__meta" style={{ marginBottom: 6 }}>Kompetenciák:</div>
            {t.competencies.map((c, i) => (
              <div key={i} className="ledger-row" style={{ padding: "6px 0" }}>
                <span className="ledger-row__label">{c}</span>
                <span className="ledger-row__meta mono">1–10</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
