import { useAuth } from "../../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function GlobalHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 模擬登入狀態
  const [isSimulated, setIsSimulated] = useState(false);

  const isLoggedIn = user || isSimulated;

  /* =========================
     動態頁面標題
  ========================= */
  const getPageTitle = () => {
    if (!isLoggedIn) return null;

    if (
      location.pathname.startsWith("/works") ||
      location.pathname.startsWith("/dashboard")
    ) {
      return "我的作品";
    }

    // studio 子頁面也統一回到 Dashboard
    if (location.pathname.startsWith("/studio")) {
      return "建立新作品";
    }

    return null;
  };

  const pageTitle = getPageTitle();

  return (
    <>
      {/* MAIN HEADER */}
      <nav className="navbar navbar-expand-lg ns-header">
        <div className="container position-relative d-flex align-items-center">

          {/* Logo + 動態標題 */}
          <div className="d-flex align-items-center gap-3">

            <button
              className="navbar-brand border-0 bg-transparent p-0"
              onClick={() => navigate("/")}
            >
              <img
                src="/assets/logo.png"
                alt="NextWave Logo"
                height="40"
              />
            </button>

            {/* 🔥 動態頁面標題 */}
            {pageTitle && (
              <h5
                className="mb-0 fw-bold ns-page-title ms-3"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (pageTitle === "我的作品") {
                    navigate("/works");
                  }
                  if (pageTitle === "建立新作品") {
                    navigate("/dashboard"); // ✅ 不再跳 /studio
                  }
                }}
              >
                {pageTitle}
              </h5>
            )}

          </div>

          {/* 手機漢堡按鈕 */}
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* 可折疊區域 */}
          <div
            className="collapse navbar-collapse justify-content-between"
            id="mainNavbar"
          >

            {/* 中間導航 */}
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 text-center">
              <li className="nav-item">
                <span
                  className="nav-link fw-bold px-3"
                  onClick={() => navigate("/")}
                  style={{ cursor: "pointer" }}
                >
                  產品
                </span>
              </li>
              <li className="nav-item">
                <span className="nav-link fw-bold px-3">功能</span>
              </li>
              <li className="nav-item">
                <span className="nav-link fw-bold px-3">發佈成果</span>
              </li>
              <li className="nav-item">
                <span className="nav-link fw-bold px-3">適用產業</span>
              </li>
              <li className="nav-item">
                <span className="nav-link fw-bold px-3">價格</span>
              </li>
            </ul>

            {/* 右側區塊 */}
            <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">

              {isLoggedIn ? (
                <>
                  {/* ❌ 已移除 建立新作品 按鈕 */}

                  <span className="fw-semibold text-white">
                    👤 {user?.name || "Demo User"}
                  </span>

                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => {
                      logout?.();
                      setIsSimulated(false);
                      navigate("/");
                    }}
                  >
                    登出
                  </button>
                </>
              ) : (
                <>
                  {/* 真登入 */}
                  <button
                    className="fw-semibold btn btn-link text-dark"
                    onClick={() => navigate("/login")}
                  >
                    登入
                  </button>

                  {/* 模擬登入 */}
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => {
                      setIsSimulated(true);
                      navigate("/dashboard");
                    }}
                  >
                    模擬登入
                  </button>

                  <button
                    className="btn btn-primary px-4 fw-semibold"
                    onClick={() => navigate("/register")}
                  >
                    註冊領取算力
                  </button>
                </>
              )}

            </div>

          </div>
        </div>
      </nav>

      {/* NOTICE BAR */}
      <div className="ns-header-notice fw-semibold text-center py-2">
        新用戶註冊即送{" "}
        <span className="notice-highlight">
          10 點創作算力
        </span>
      </div>
    </>
  );
}