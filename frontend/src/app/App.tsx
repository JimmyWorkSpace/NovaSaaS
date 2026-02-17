import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";

import DashboardPage from "./pages/DashboardPage";
import WorksPage from "./pages/WorksPage";
import WorkDetailPage from "./pages/WorkDetailPage";
import StudioPage from "./pages/StudioPage";
import SubtitlePage from "./pages/SubtitlePage";
import SchedulePage from "./pages/SchedulePage";

import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import ForgotPasswordPage from "./components/auth/ForgotPasswordPage";
import ResetPasswordPage from "./components/auth/ResetPasswordPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* =========================
             Root
          ========================= */}
          <Route path="/" element={<Navigate to="/dashboard" />} />

          {/* =========================
             Public Pages
          ========================= */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/studio" element={<StudioPage />} />

          {/* =========================
             Works Module
          ========================= */}

          {/* 我的作品列表 */}
          <Route path="/works" element={<WorksPage />} />

          {/* 作品詳情 */}
          <Route path="/works/:id" element={<WorkDetailPage />} />

          {/* 加字幕（二級流程） */}
          <Route path="/works/:id/subtitle" element={<SubtitlePage />} />

          {/* ✅ 排程發布（二級流程） */}
          <Route path="/works/:id/schedule" element={<SchedulePage />} />

          {/* =========================
             Auth
          ========================= */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* =========================
             404
          ========================= */}
          <Route path="*" element={<Navigate to="/dashboard" />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
