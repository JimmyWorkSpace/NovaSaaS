import { useState } from "react";

export default function GrokView() {
  const [description, setDescription] = useState("");
  const [count, setCount] = useState(1);

  const clearText = () => setDescription("");

  const generateScript = () => {
    setDescription("一个炫酷的科技感短视频，快节奏剪辑，霓虹灯背景，电影级运镜。");
  };

  return (
    <div className="model-view">
      <h2 className="model-title">Grok Imagine - 极速创作短视频</h2>

      {/* ===== 产品说明 ===== */}
      <div className="model-info">
        支持人物图像，支持 1~9 张参考图，可拼接九宫格效果更佳
      </div>

      {/* ===== 上传区域 ===== */}
      <div className="upload-box-large">
        +
      </div>

      {/* ===== 描述区域 ===== */}
      <div className="model-section">
        <div className="section-header">
          <div className="section-title">视频创意描述</div>
          <div className="section-actions">
            <button className="link-btn" onClick={generateScript}>
              一键生成脚本
            </button>
            <button className="link-btn" onClick={clearText}>
              清空
            </button>
          </div>
        </div>

        <textarea
          className="model-textarea"
          placeholder="描述你所想象的画面、分镜、场景、风格..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* ===== 生成条数 ===== */}
      <div className="model-section">
        <div className="section-title">生成条数</div>
        <div className="option-group">
          {[1, 2, 3].map(n => (
            <button
              key={n}
              className={`option-btn ${count === n ? "active" : ""}`}
              onClick={() => setCount(n)}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* ===== CTA ===== */}
      <div className="model-footer">
        <button className="view-btn">查看作品</button>

        <div className="generate-wrapper">
          <button className="generate-btn">
            提交生成
          </button>
          <div className="cost-text">
            将消耗智能视频算力 {count * 30} 点
          </div>
        </div>
      </div>
    </div>
  );
}
