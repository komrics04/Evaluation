import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import EmployeesPage from "./pages/EmployeesPage";
import EvaluationFillPage from "./pages/EvaluationFillPage";
import TemplatesPage from "./pages/TemplatesPage";
import PeriodsPage from "./pages/PeriodsPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<Layout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/dolgozok" element={<EmployeesPage />} />
            <Route path="/ertekeles" element={<EvaluationFillPage />} />
            <Route path="/sablonok" element={<TemplatesPage />} />
            <Route path="/idoszakok" element={<PeriodsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
