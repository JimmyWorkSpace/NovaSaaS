import React from "react";
import { useNavigate } from "react-router-dom";
import { Image, Video, Rocket, User } from "lucide-react";

function FeatureSection() {
  const navigate = useNavigate();

  return (
    <section className="ns-feature">
      <div className="container">

        <h2 className="ns-feature-title">
          選擇創作模型
        </h2>

        {/* 直接改成 4 個入口卡片 */}
        <div className="ns-feature-grid">

          <div 
            className="ns-feature-card"
            onClick={() => navigate("/studio/sora")}
          >
            <div className="ns-feature-card-header">
              <h4>AI 視頻生成</h4>
              <div className="ns-feature-icon">
                <Video size={36} strokeWidth={1.8} />
              </div>
            </div>
            <p>Sora API - 專業視頻創作</p>
          </div>

          <div 
            className="ns-feature-card"
            onClick={() => navigate("/studio/nano")}
          >
            <div className="ns-feature-card-header">
              <h4>AI 創意生圖</h4>
              <div className="ns-feature-icon">
                <Image size={36} strokeWidth={1.8} />
              </div>
            </div>
            <p>NanoBanana Pro - 高質量圖像生成</p>
          </div>

          <div 
            className="ns-feature-card"
            onClick={() => navigate("/studio/veo")}
          >
            <div className="ns-feature-card-header">
              <h4>圖文聯創視頻</h4>
              <div className="ns-feature-icon">
                <Video size={36} strokeWidth={1.8} />
              </div>
            </div>
            <p>Veo3 API - 文本 + 視頻生成</p>
          </div>

          <div 
            className="ns-feature-card"
            onClick={() => navigate("/studio/grok")}
          >
            <div className="ns-feature-card-header">
              <h4>極速創作短視頻</h4>
              <div className="ns-feature-icon">
                <Rocket size={36} strokeWidth={1.8} />
              </div>
            </div>
            <p>Grok Imagine - 快速視頻生成</p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default FeatureSection;