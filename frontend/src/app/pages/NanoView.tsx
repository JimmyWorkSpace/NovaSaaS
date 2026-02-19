import { useState } from "react";

export default function NanoView() {
  const [description, setDescription] = useState("");
  const [resolution, setResolution] = useState("1K");
  const [ratio, setRatio] = useState("1:1");

  const clearText = () => setDescription("");

  return (
    <div className="model-view">
      <h2 className="model-title">NanoBanana Pro - AI 创意生图</h2>

      {/* ===== 参考图说明 ===== */}
      <div className="model-info">
        支持 1~9 张参考图，拼接九宫格效果更佳
      </div>

      {/* ===== 上传区域 ===== */}
      <div className="upload-box-large">
        +
      </div>

      {/* ===== 创意描述 ===== */}
      <div className="model-section">
        <div className="section-header">
          <div className="section-title">创意描述</div>
          <button className="link-btn" onClick={clearText}>
            清空
          </button>
        </div>

        <textarea
          className="model-textarea"
          placeholder="描述你要对图片的创意想法..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* ===== 分辨率 ===== */}
      <div className="model-section">
        <div className="section-title">生成分辨率</div>
        <div className="option-group">
          {["1K", "2K", "4K"].map(r => (
            <button
              key={r}
              className={`option-btn ${resolution === r ? "active" : ""}`}
              onClick={() => setResolution(r)}
            >
              {r === "1K" && "标准 1K"}
              {r === "2K" && "高清 2K"}
              {r === "4K" && "超清 4K"}
            </button>
          ))}
        </div>
      </div>

      {/* ===== 图片比例 ===== */}
      <div className="model-section">
        <div className="section-title">生成图片比例</div>
        <div className="option-group">
          {["1:1", "16:9", "9:16", "4:3", "3:4"].map(r => (
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

      {/* ===== CTA ===== */}
      <div className="model-footer">
        <button className="view-btn">查看作品</button>

        <div className="generate-wrapper">
          <button className="generate-btn">
            提交生成
          </button>
          <div className="cost-text">
            将消耗智能图像算力 20 点
          </div>
        </div>
      </div>
    </div>
  );
}
