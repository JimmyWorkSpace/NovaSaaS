import React from "react";

function AnalyticsSection() {
  return (
    <section className="ns-analytics">
      <div className="container ns-analytics-container">

        {/* LEFT CONTENT */}
        <div className="ns-analytics-content">
          <h2 className="ns-analytics-title">
            成效分析
          </h2>

          <p className="ns-analytics-text">
            登錄生成成果的數據儀表板，
            也還原流程。將精準數據與發佈節點整合，
            讓每次成果可視化，帶來更大的回饋與成效分析。
          </p>
        </div>

        {/* RIGHT SVG VISUAL */}
        <div className="ns-analytics-visual">

          <svg
            className="ns-analytics-svg"
            viewBox="0 0 600 400"
            fill="none"
          >

            {/* Dashboard Card Background */}
            <rect
              x="20"
              y="20"
              width="560"
              height="360"
              rx="24"
              fill="#ffffff"
              stroke="#e5e7eb"
            />

            {/* Chart Area */}
            <rect
              x="60"
              y="80"
              width="480"
              height="180"
              rx="16"
              fill="#f3f4f6"
            />

            {/* Line Graph */}
            <path
              d="M80 200 L140 170 L200 190 L260 150 L320 170 L380 120 L440 140 L500 110"
              stroke="#4f46e5"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />

            {/* Bars */}
            <rect x="120" y="290" width="30" height="50" rx="6" fill="#6366f1"/>
            <rect x="170" y="310" width="30" height="30" rx="6" fill="#818cf8"/>
            <rect x="220" y="270" width="30" height="70" rx="6" fill="#4f46e5"/>
            <rect x="270" y="300" width="30" height="40" rx="6" fill="#a5b4fc"/>

          </svg>

        </div>

      </div>
    </section>
  );
}

export default AnalyticsSection;
