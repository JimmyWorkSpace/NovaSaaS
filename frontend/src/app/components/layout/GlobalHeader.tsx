export default function GlobalHeader() {
  return (
    <>
      {/* MAIN HEADER */}
      <header className="ns-header">
        <div className="container d-flex align-items-center justify-content-between">

          {/* Logo */}
          <div className="ns-logo">
            <img src="/assets/logo.png" alt="NextWave Logo" />
          </div>

          {/* Navigation */}
          <nav className="ns-nav d-none d-lg-flex">
            <a href="#" className="fw-medium">產品</a>
            <a href="#" className="fw-medium">功能</a>
            <a href="#" className="fw-medium">發佈成果</a>
            <a href="#" className="fw-medium">適用產業</a>
            <a href="#" className="fw-medium">價格</a>
          </nav>

          {/* CTA */}
          <button className="ns-btn-register fw-semibold">
            註冊領取算力
          </button>

        </div>
      </header>

      {/* NOTICE BAR */}
      <div className="ns-header-notice fw-semibold">
        新用戶註冊即送 
        <span className="notice-highlight">
          10 點創作算力
        </span>
      </div>
    </>
  );
}
