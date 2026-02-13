function GlobalHeader() {
  return (
    <header className="ns-header">
      <div className="ns-header-left">
        <img src="/assets/logo.png" alt="NextWave" className="ns-logo" />
      </div>

      <div className="ns-header-right">
        <span className="ns-header-item">Credits: 120</span>
        <span className="ns-header-item">Pro Plan</span>
        <span className="ns-header-item">Social ✓</span>

        <div className="ns-avatar">U ▾</div>
      </div>
    </header>
  );
}

export default GlobalHeader;
