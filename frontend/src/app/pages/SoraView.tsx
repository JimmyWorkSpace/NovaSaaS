import { useState } from "react";

export default function SoraView() {
  const [ratio, setRatio] = useState("9:16");
  const [count, setCount] = useState(1);
  const [duration, setDuration] = useState("15");
  const [description, setDescription] = useState("");

  const clearText = () => setDescription("");

  const generateScript = () => {
    setDescription("一个未来城市的航拍镜头，霓虹灯闪烁，电影级运镜，超现实风格。");
  };

  return (
    <div className="model-view">
      <h2 className="model-title">Sora2 - AI 视频生成</h2>

      {/* ===== 产品能力说明 ===== */}
      <div className="model-info">
        <span>支持 1~9 张参考图，可拼接九宫格效果更佳</span>
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

        <div className="hint-text">
          提示：不可涉及真实人物，否则可能生成失败。
        </div>
      </div>

      {/* ===== 视频时长 ===== */}
      <div className="model-section">
        <div className="section-title">视频时长</div>
        <div className="option-group">
          {["15", "25"].map(d => (
            <button
              key={d}
              className={`option-btn ${duration === d ? "active" : ""}`}
              onClick={() => setDuration(d)}
            >
              {d} 秒
            </button>
          ))}
        </div>
      </div>

      {/* ===== 视频比例 ===== */}
      <div className="model-section">
        <div className="section-title">视频比例</div>
        <div className="option-group">
          {["9:16", "16:9"].map(r => (
            <button
              key={r}
              className={`option-btn ${ratio === r ? "active" : ""}`}
              onClick={() => setRatio(r)}
            >
              {r}
            </button>
          ))}
        </div>
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

      {/* ===== CTA 区域 ===== */}
      <div className="model-footer">
        <button className="view-btn">查看作品</button>

        <div className="generate-wrapper">
          <button className="generate-btn">
            提交生成
          </button>
          <div className="cost-text">
            将消耗智能视频算力 {count * 100} 点
          </div>
        </div>
      </div>
    </div>
  );
}
