import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [mode, setMode] = useState<"email" | "mobile">("email");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);
  const [countdown, setCountdown] = useState(0);

  /* OTP 倒數 */
  useEffect(() => {
    if (countdown === 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const getStrength = () => {
    if (password.length < 6) return "弱";
    if (password.length < 10) return "中";
    return "強";
  };

  const passwordMatch = password === confirm;

  return (
    <div className="login-page">
      <div className="login-card">

        <h2 className="login-title">建立帳號</h2>
        <p className="login-subtitle">
          開始你的 AI SaaS 之旅
        </p>

        {/* ===== 模式切換 ===== */}
        <div className="auth-mode-switch">
          <span
            className={mode === "email" ? "active" : ""}
            onClick={() => setMode("email")}
          >
            Email 註冊
          </span>
          <span
            className={mode === "mobile" ? "active" : ""}
            onClick={() => setMode("mobile")}
          >
            手機註冊
          </span>
        </div>

        {/* ===== Email 註冊模式 ===== */}
        {mode === "email" && (
          <>
            <input
              type="email"
              className="login-input"
              placeholder="Email"
            />

            <input
              type="password"
              className="login-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {password && (
              <div className={`password-strength ${getStrength()}`}>
                密碼強度：{getStrength()}
              </div>
            )}

            <input
              type="password"
              className="login-input"
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />

            {!passwordMatch && confirm && (
              <div className="error-text">
                密碼不一致
              </div>
            )}
          </>
        )}

        {/* ===== Mobile 註冊模式 ===== */}
        {mode === "mobile" && (
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
          </>
        )}

        {/* ===== Agree ===== */}
        <div className="register-agree">
          <input
            type="checkbox"
            checked={agree}
            onChange={() => setAgree(!agree)}
          />
          <span>
            我同意 <b>服務條款</b> 與 <b>隱私政策</b>
          </span>
        </div>

        <button
          className="login-btn-primary"
          disabled={!agree}
          onClick={() => navigate("/dashboard")}
        >
          註冊
        </button>

        {/* ===== OAuth ===== */}
        <div className="login-divider">
          <span>或使用以下方式</span>
        </div>

        <button className="login-btn google">
          使用 Google 註冊
        </button>

        <button className="login-btn facebook">
          使用 Facebook 註冊
        </button>

        <button className="login-btn instagram">
          使用 Instagram 註冊
        </button>

        <div className="login-register">
          已經有帳號？
          <span onClick={() => navigate("/login")}>
            登入
          </span>
        </div>

      </div>
    </div>
  );
}
