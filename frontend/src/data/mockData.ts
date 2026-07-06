// Ideiglenes minta-adatok a felület bemutatásához.
// Amint a backend auth + adat-végpontok készen állnak, ezt egy services/api.ts
// modulra cseréljük, ami a valós /api végpontokat hívja.

export type Role = "Admin" | "HR" | "TerulentiVezeto" | "Vezeto" | "CsakOlvaso";

export interface DemoUser {
  id: string;
  name: string;
  role: Role;
  costCenters?: string[]; // amelyeket vezetőként lát
}

export const DEMO_USERS: DemoUser[] = [
  { id: "u1", name: "Kovács Éva", role: "Admin" },
  { id: "u2", name: "Nagy Judit", role: "HR" },
  { id: "u3", name: "Szabó Péter", role: "TerulentiVezeto", costCenters: ["1001", "1002", "1005"] },
  { id: "u4", name: "Tóth Anna", role: "Vezeto", costCenters: ["1001"] },
  { id: "u5", name: "Kiss Bence", role: "CsakOlvaso" },
];

export const ROLE_LABELS: Record<Role, string> = {
  Admin: "Admin",
  HR: "HR ügyintéző",
  TerulentiVezeto: "Területi vezető",
  Vezeto: "Vezető",
  CsakOlvaso: "Csak olvasó",
};

export interface Employee {
  id: string;
  name: string;
  costCenter: string;
  department: string;
  hireDate: string;
  isActive: boolean;
  evaluationStatus: "kesz" | "folyamatban" | "hianyzik";
}

export const EMPLOYEES: Employee[] = [
  { id: "e1", name: "Farkas Dóra", costCenter: "1001", department: "Ügyfélszolgálat", hireDate: "2021-03-01", isActive: true, evaluationStatus: "kesz" },
  { id: "e2", name: "Balogh Márk", costCenter: "1001", department: "Ügyfélszolgálat", hireDate: "2019-09-15", isActive: true, evaluationStatus: "folyamatban" },
  { id: "e3", name: "Horváth Lili", costCenter: "1001", department: "Logisztika", hireDate: "2022-01-10", isActive: true, evaluationStatus: "hianyzik" },
  { id: "e4", name: "Varga Zsolt", costCenter: "1002", department: "Logisztika", hireDate: "2020-06-01", isActive: true, evaluationStatus: "kesz" },
  { id: "e5", name: "Molnár Petra", costCenter: "1005", department: "Pénzügy", hireDate: "2018-11-20", isActive: true, evaluationStatus: "kesz" },
  { id: "e6", name: "Németh Gábor", costCenter: "1002", department: "Logisztika", hireDate: "2023-02-01", isActive: false, evaluationStatus: "hianyzik" },
];

export interface EvaluationTemplate {
  id: string;
  name: string;
  type: "egyszeru" | "feladatonkenti" | "napi" | "napi_feladatonkenti";
  competencies: string[];
}

export const TEMPLATES: EvaluationTemplate[] = [
  { id: "t1", name: "Havi összteljesítmény", type: "egyszeru", competencies: ["Összesített teljesítmény"] },
  { id: "t2", name: "Projekt feladatértékelés", type: "feladatonkenti", competencies: ["Határidők tartása", "Minőség", "Együttműködés"] },
  { id: "t3", name: "Napi jelenlét-teljesítmény", type: "napi", competencies: ["Napi teljesítmény"] },
  { id: "t4", name: "Napi feladat-részletes", type: "napi_feladatonkenti", competencies: ["Feladat A", "Feladat B", "Feladat C"] },
];

export const PERIODS = [
  { id: "p1", name: "2026-04", isClosed: true },
  { id: "p2", name: "2026-05", isClosed: true },
  { id: "p3", name: "2026-06", isClosed: false },
];
