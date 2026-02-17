import React from "react";

function CTASection() {
  return (
    <section className="ns-cta">

      {/* 背景波浪層 */}
      <div className="ns-cta-waves">
        <svg viewBox="0 0 1440 600" preserveAspectRatio="none">
          <path
            d="M0,300 C300,200 600,400 900,300 C1100,250 1300,350 1440,300 L1440,600 L0,600 Z"
            className="cta-wave wave1"
          />
          <path
            d="M0,350 C400,250 800,450 1200,320 C1350,280 1400,300 1440,290 L1440,600 L0,600 Z"
            className="cta-wave wave2"
          />
        </svg>
      </div>

      <div className="container">

        {/* 主標題 */}
        <h2 className="ns-cta-title">
          準備開始你的 AI 內容經營？
        </h2>

        {/* 按鈕 */}
        <button className="ns-cta-button">
          註冊領取算力
        </button>

        {/* 分隔線 */}
        <div className="ns-cta-divider" />

        {/* 底部區域 */}
        <div className="ns-cta-footer">

          <div className="ns-cta-links">
            關於我們 / 條款 / 隱私政策 / 聯絡
          </div>

          <div className="ns-cta-logo">
            <img src="/assets/logo.png" alt="NextWave Logo" />
          </div>

        </div>

      </div>
    </section>
  );
}

export default CTASection;
