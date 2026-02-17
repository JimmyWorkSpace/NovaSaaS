import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="login-page">
      <div className="login-card">

        {!sent ? (
          <>
            <h2 className="login-title">重設密碼</h2>
            <p className="login-subtitle">
              請輸入你的 Email，我們會寄送重設連結
            </p>

            <input
              type="email"
              className="login-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              className="login-btn-primary"
              disabled={!email}
              onClick={() => setSent(true)}
            >
              發送重設連結
            </button>

            <div className="login-register">
              想起密碼了？
              <span onClick={() => navigate("/login")}>
                返回登入
              </span>
            </div>
          </>
        ) : (
          <>
            <h2 className="login-title">信件已寄出</h2>
            <p className="login-subtitle">
              如果此 Email 存在於系統中，我們已寄送密碼重設連結。
              <br />
              請前往信箱查看。
            </p>

            <button
              className="login-btn-primary"
              onClick={() => navigate("/login")}
            >
              返回登入
            </button>
          </>
        )}

      </div>
    </div>
  );
}
