import React from "react";

function WorkflowSection() {
  return (
    <section className="ns-workflow">
      <div className="container">

        {/* TITLE */}
        <h2 className="ns-workflow-title">
          發佈流程
        </h2>

        {/* =========================
           STEPS
        ========================== */}
        <div className="ns-workflow-steps">

          {/* Step 1 */}
          <div className="ns-step">
            <svg className="ns-step-svg" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h10M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M16 6l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>生成</span>
          </div>

          <div className="ns-step-arrow">→</div>

          {/* Step 2 */}
          <div className="ns-step">
            <svg className="ns-step-svg" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="3"
                stroke="currentColor" strokeWidth="2"/>
              <path d="M8 2v4M16 2v4M3 10h18"
                stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span>排程</span>
          </div>

          <div className="ns-step-arrow">→</div>

          {/* Step 3 */}
          <div className="ns-step">
            <svg className="ns-step-svg" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"
                stroke="currentColor" strokeWidth="2"/>
              <path d="M9 12l2 2 4-4"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>驗證</span>
          </div>

          <div className="ns-step-arrow">→</div>

          {/* Step 4 */}
          <div className="ns-step">
            <svg className="ns-step-svg" viewBox="0 0 24 24" fill="none">
              <path d="M2 12l20-8-8 20-2-8-10-4z"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>發佈成功</span>
          </div>

        </div>


        {/* =========================
           CARDS (Vendor 下方說明卡)
        ========================== */}

        <div className="ns-workflow-cards">

          <div className="ns-workflow-card">
            <h4>自動驗證</h4>
            <p>
              自動檢測、生成內容檢驗，
              避免內容錯誤。
            </p>
          </div>

          <div className="ns-workflow-card">
            <h4>成功率透明</h4>
            <p>
              成功率即時顯示，
              成功成果可視化。
            </p>
          </div>

          <div className="ns-workflow-card">
            <h4>訂閱保護</h4>
            <p>
              訂閱保障機制，
              穩定長期發佈。
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default WorkflowSection;
