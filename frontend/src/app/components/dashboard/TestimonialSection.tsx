import React from "react";

function TestimonialSection() {
  return (
    <section className="ns-testimonial">
      <div className="container">

        {/* =========================
           HEADER
        ========================== */}
        <div className="ns-testimonial-header">

          <button className="ns-testimonial-arrow">
            ‹
          </button>

          <div className="ns-testimonial-title-group">
            <h2 className="ns-testimonial-title">
              行業見證分享
            </h2>
            <p className="ns-testimonial-subtitle">
              各行業用戶見證
            </p>
          </div>

          <button className="ns-testimonial-arrow">
            ›
          </button>

        </div>


        {/* =========================
           CARDS
        ========================== */}
        <div className="ns-testimonial-grid">

          {/* CARD 1 */}
          <div className="ns-testimonial-card">
            <div className="ns-testimonial-image">
              <img
                src="https://images.unsplash.com/photo-1551218808-94e220e084d2"
                alt="餐飲案例"
              />
              <span className="ns-duration">16:9</span>
            </div>

            <div className="ns-testimonial-content">
              <p>
                「透過智能生成與排程系統，我們大幅提升了內容產出效率，
                成效比預期更好，客流量明顯增加。」
              </p>

              <div className="ns-testimonial-author">
                <strong>名廚餐飲</strong>
                <span>連鎖餐飲品牌</span>
              </div>
            </div>
          </div>


          {/* CARD 2 */}
          <div className="ns-testimonial-card">
            <div className="ns-testimonial-image">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
                alt="品牌案例"
              />
              <span className="ns-duration">16:9</span>
            </div>

            <div className="ns-testimonial-content">
              <p>
                「流程自動化讓我們節省了大量人力成本，
                同時提升品牌曝光與轉換率。」
              </p>

              <div className="ns-testimonial-author">
                <strong>城市美業</strong>
                <span>連鎖美容品牌</span>
              </div>
            </div>
          </div>


          {/* CARD 3 */}
          <div className="ns-testimonial-card">
            <div className="ns-testimonial-image">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                alt="商家案例"
              />
              <span className="ns-duration">16:9</span>
            </div>

            <div className="ns-testimonial-content">
              <p>
                「數據分析功能幫助我們更精準掌握客群，
                每一次投放都更有效率。」
              </p>

              <div className="ns-testimonial-author">
                <strong>環球商圈</strong>
                <span>新零售平台</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default TestimonialSection;
