import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token"); // 未來後端會用
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const isValid = password.length >= 6 && password === confirm;

  return (
    <div className="login-page">
      <div className="login-card">

        <h2 className="login-title">重設密碼</h2>
        <p className="login-subtitle">
          請輸入你的新密碼
        </p>

        {!token && (
          <div className="auth-error">
            無效或過期的重設連結
          </div>
        )}

        <input
          type="password"
          className="login-input"
          placeholder="新密碼"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          className="login-input"
          placeholder="確認新密碼"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button
          className="login-btn-primary"
          disabled={!isValid}
          onClick={() => navigate("/login")}
        >
          重設密碼
        </button>

        <div className="login-register">
          想起密碼了？
          <span onClick={() => navigate("/login")}>
            返回登入
          </span>
        </div>

      </div>
    </div>
  );
}
