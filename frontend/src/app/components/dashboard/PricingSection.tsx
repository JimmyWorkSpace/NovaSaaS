import React from "react";

function PricingSection() {
  return (
    <section className="ns-pricing">
      <div className="container">

        {/* =========================
           TITLE
        ========================== */}
        <div className="ns-pricing-header">
          <h2 className="ns-pricing-title">訂閱方案</h2>

          <div className="ns-pricing-toggle">
            <button className="active">月月</button>
            <button>年年</button>
          </div>
        </div>


        {/* =========================
           MAIN PRICING CARDS
        ========================== */}
        <div className="ns-pricing-grid">

          {/* BASIC */}
          <div className="ns-pricing-card">
            <h3>入門</h3>
            <div className="ns-price">$49<span>/月</span></div>

            <ul>
              <li>• 基礎不可編</li>
              <li>• 增圖可設定</li>
              <li>• 增圖可管理</li>
            </ul>

            <button className="ns-btn-primary">
              註冊即送 10 點算力
            </button>
          </div>


          {/* RECOMMENDED */}
          <div className="ns-pricing-card featured">
            <h3>推薦</h3>
            <div className="ns-price">$199<span>/月</span></div>

            <ul>
              <li>• 增圖可編</li>
              <li>• 增圖可設定</li>
              <li>• 增圖可管理</li>
            </ul>

            <button className="ns-btn-primary">
              註冊即送 10 點算力
            </button>
          </div>


          {/* ADVANCED */}
          <div className="ns-pricing-card">
            <h3>進階</h3>
            <div className="ns-price">$299<span>/月</span></div>

            <ul>
              <li>• 增圖可編</li>
              <li>• 增圖可設定</li>
              <li>• 增圖可管理</li>
            </ul>

            <button className="ns-btn-primary">
              註冊即送 10 點算力
            </button>
          </div>

        </div>


        {/* =========================
           ADDON SECTION
        ========================== */}
        <div className="ns-addon-section">

          <h2 className="ns-addon-title">算力加購包</h2>
          <p className="ns-addon-subtitle">
            創作越多，消耗越多算力
          </p>

          <div className="ns-addon-grid">

            <div className="ns-addon-card">
              <h4>輕量</h4>
              <div className="addon-price">$160</div>
              <span>100 點算力</span>
            </div>

            <div className="ns-addon-card">
              <h4>中量</h4>
              <div className="addon-price">$700</div>
              <span>100 點算力</span>
            </div>

            <div className="ns-addon-card">
              <h4>重量</h4>
              <div className="addon-price">$1,000</div>
              <span>300 點算力</span>
            </div>

          </div>
        </div>


        {/* =========================
           ENTERPRISE
        ========================== */}
        <div className="ns-enterprise">
          <h3>企業方案</h3>
          <p>API 整合・專屬算力・客製服務</p>
          <button className="ns-btn-outline-dark">
            聯絡我們
          </button>
        </div>

      </div>
    </section>
  );
}

export default PricingSection;
