import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { login as loginApi } from "../../../services/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const [mode, setMode] = useState<"email" | "mobile">("email");
  const [countdown, setCountdown] = useState(0);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* 驗證碼倒數 */
  useEffect(() => {
    if (countdown === 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username.trim()) {
      setError("請輸入用戶名");
      return;
    }
    if (!password) {
      setError("請輸入密碼");
      return;
    }
    setLoading(true);
    try {
      const { token } = await loginApi(username.trim(), password);
      authLogin(token, { name: username.trim() });
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "登入失敗");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h2 className="login-title">
          {mode === "email" ? "登入帳號" : "手機驗證登入"}
        </h2>

        {/* ================= 帳號密碼登入（對接後端） ================= */}
        {mode === "email" ? (
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="login-error" role="alert">
                {error}
              </div>
            )}

            <input
              type="text"
              className="login-input"
              placeholder="用戶名"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              disabled={loading}
            />

            <input
              type="password"
              className="login-input"
              placeholder="密碼"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              disabled={loading}
            />

            {/* 🔐 忘記密碼 */}
            <div className="forgot-password">
              <span onClick={() => navigate("/forgot-password")}>
                忘記密碼？
              </span>
            </div>

            <button
              type="submit"
              className="login-btn-primary"
              disabled={loading}
            >
              {loading ? "登入中…" : "登入"}
            </button>
          </form>
        ) : (
          <>
            <input
              type="tel"
              className="login-input"
              placeholder="手機號碼"
            />

            <div className="otp-row">
              <input
                type="text"
                className="login-input"
                placeholder="驗證碼"
              />

              <button
                className="otp-btn"
                disabled={countdown > 0}
                onClick={() => setCountdown(60)}
              >
                {countdown > 0 ? `${countdown}s` : "發送"}
              </button>
            </div>

            <button
              className="login-btn-primary"
              onClick={() => navigate("/dashboard")}
            >
              驗證並登入
            </button>

            <div
              className="login-switch"
              onClick={() => setMode("email")}
            >
              返回 Email 登入
            </div>
          </>
        )}

        {/* ================= OAuth ================= */}
        {mode === "email" && (
          <>
            <div className="login-divider">
              <span>或使用以下方式</span>
            </div>

            <button className="login-btn google">
              使用 Google 登入
            </button>

            <button className="login-btn facebook">
              使用 Facebook 登入
            </button>

            <button className="login-btn instagram">
              使用 Instagram 登入
            </button>

            <button
              className="login-btn mobile"
              onClick={() => setMode("mobile")}
            >
              使用手機號碼登入
            </button>
          </>
        )}

        {/* 註冊 */}
        <div className="login-register">
          還沒有帳號？
          <span onClick={() => navigate("/register")}>
            註冊
          </span>
        </div>

      </div>
    </div>
  );
}
