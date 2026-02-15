import React from "react";

function HeroSection() {
  return (
    <section className="ns-hero">

      {/* 波浪背景 */}
      <div className="ns-hero-waves">
        <svg viewBox="0 0 1440 600" preserveAspectRatio="none">
          <path
            d="M0,300 C300,200 600,400 900,300 C1100,250 1300,350 1440,300 L1440,600 L0,600 Z"
            className="wave wave1"
          />
          <path
            d="M0,350 C400,250 800,450 1200,320 C1350,280 1400,300 1440,290 L1440,600 L0,600 Z"
            className="wave wave2"
          />
          <path
            d="M0,380 C300,330 600,420 900,360 C1200,320 1350,340 1440,330 L1440,600 L0,600 Z"
            className="wave wave3"
          />
        </svg>
      </div>

      <div className="container">
        <div className="row align-items-center">

          <div className="col-lg-6">
            <h1 className="ns-hero-title">
                讓內容自動發佈&#65292;
                <br />
                讓來客穩定成長
            </h1>




            <p className="ns-hero-subtitle">
              AI 智能生成 + 自動排程 = 商業內容自動化
            </p>

            <div className="mt-4 d-flex gap-3">
              <button className="ns-btn-primary">
                註冊領取算力
              </button>
              <button className="ns-btn-outline">
                查看方案
              </button>
            </div>
          </div>

          <div className="col-lg-6 text-center">
            <div className="ns-hero-mockup" />
          </div>

        </div>
      </div>

      {/* 底部漸層過渡 */}
      <div className="ns-hero-bottom-fade" />

    </section>
  );
}

export default HeroSection;
