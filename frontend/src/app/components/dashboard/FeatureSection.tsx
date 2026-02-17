import React from "react";
import { Image, Video, Rocket, User } from "lucide-react";

function FeatureSection() {
  return (
    <section className="ns-feature">
      <div className="container">

        <h2 className="ns-feature-title">
          AI 創作能力
        </h2>

        {/* 主卡片 */}
        <div className="ns-feature-main-card">

          {/* 左側影片區 */}
          <div className="ns-feature-video">
            <div className="ns-feature-video-wrapper">

              <img
                src="https://images.unsplash.com/photo-1551281044-8d8f2d9d7c34"
                alt="AI Dashboard"
                className="ns-feature-video-image"
              />

              <div className="ns-feature-play-overlay">
                <div className="ns-feature-play-button">
                  ▶
                </div>
              </div>

            </div>
          </div>

          {/* 右側文字 */}
          <div className="ns-feature-main-content">
            <h3>AI 創意影音（Sora 引擎）</h3>
            <p>
              AI 智能生成，顛覆影音創作流程，
              可快速產生高品質影音內容，
              展現驚人視覺效果。
            </p>
          </div>

        </div>

        {/* 下方功能卡片 */}
        <div className="ns-feature-grid">

          <div className="ns-feature-card">
            <div className="ns-feature-card-header">
              <h4>AI 創意生圖</h4>
              <div className="ns-feature-icon">
                <Image size={36} strokeWidth={1.8} />
              </div>
            </div>
            <p>快速產生高品質創意圖像內容。</p>
          </div>

          <div className="ns-feature-card">
            <div className="ns-feature-card-header">
              <h4>圖文聯創影音</h4>
              <div className="ns-feature-icon">
                <Video size={36} strokeWidth={1.8} />
              </div>
            </div>
            <p>圖文腳本快速轉換為影音作品。</p>
          </div>

          <div className="ns-feature-card">
            <div className="ns-feature-card-header">
              <h4>極速創作影音</h4>
              <div className="ns-feature-icon">
                <Rocket size={36} strokeWidth={1.8} />
              </div>
            </div>
            <p>秒級生成影音內容。</p>
          </div>

          <div className="ns-feature-card">
            <div className="ns-feature-card-header">
              <h4>虛擬人</h4>
              <div className="ns-feature-icon">
                <User size={36} strokeWidth={1.8} />
              </div>
            </div>
            <p>虛擬人角色創建與應用。</p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default FeatureSection;
