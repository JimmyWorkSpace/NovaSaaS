import { useState } from "react";

export default function VeoView() {
  const [description, setDescription] = useState("");
  const [mode, setMode] = useState("normal");
  const [ratio, setRatio] = useState("9:16");
  const [count, setCount] = useState(1);

  const clearText = () => setDescription("");

  return (
    <div className="model-view">
      <h2 className="model-title">Veo3 - 图文联创视频</h2>

      {/* ===== 产品说明 ===== */}
      <div className="model-info">
        支持人物图像，一句话生成带声音的视频，效果更强
      </div>

      {/* ===== 模式切换 ===== */}
      <div className="model-section">
        <div className="option-group">
          <button
            className={`option-btn ${mode === "normal" ? "active" : ""}`}
            onClick={() => setMode("normal")}
          >
            普通模式
          </button>

          <button
            className={`option-btn ${mode === "frame" ? "active" : ""}`}
            onClick={() => setMode("frame")}
          >
            首尾帧模式
          </button>
        </div>
      </div>

      {/* ===== 上传区域 ===== */}
      <div className="upload-box-large">
        +
      </div>

      <div className="hint-text">
        支持人物图像，最多可上传 3 张参考图
      </div>

      {/* ===== 描述 ===== */}
      <div className="model-section">
        <div className="section-header">
          <div className="section-title">视频创意描述</div>
          <button className="link-btn" onClick={clearText}>
            清空
          </button>
        </div>

        <textarea
          className="model-textarea"
          placeholder="描述你所想象的画面、分镜、场景、风格..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
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
              {r === "9:16" ? "9:16 竖屏" : "16:9 横屏"}
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

      {/* ===== CTA ===== */}
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
