import { useState, useRef } from "react";
import { uploadImage, apiBaseURL } from "../../services/api";

const MAX_IMAGES = 9;

export default function SoraView() {
  const [ratio, setRatio] = useState("9:16");
  const [count, setCount] = useState(1);
  const [duration, setDuration] = useState("15");
  const [description, setDescription] = useState("");
  const [imageList, setImageList] = useState<{ url: string; newFileName: string }[]>([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const clearText = () => setDescription("");

  const generateScript = () => {
    setDescription("一个未来城市的航拍镜头，霓虹灯闪烁，电影级运镜，超现实风格。");
  };

  const handleUploadClick = () => {
    if (imageList.length >= MAX_IMAGES) return;
    setUploadError("");
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    const remain = MAX_IMAGES - imageList.length;
    const toAdd = Array.from(files).slice(0, remain);
    if (toAdd.length === 0) return;
    setUploadLoading(true);
    setUploadError("");
    try {
      const results = await Promise.all(toAdd.map((file) => uploadImage(file)));
      setImageList((prev) => [
        ...prev,
        ...results.map((r) => ({ url: r.url, newFileName: r.newFileName })),
      ]);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "图片上传失败");
    } finally {
      setUploadLoading(false);
      e.target.value = "";
    }
  };

  const removeImage = (index: number) => {
    setImageList((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="model-view">
      <h2 className="model-title">Sora2 - AI 视频生成</h2>

      {/* ===== 产品能力说明 ===== */}
      <div className="model-info">
        <span>支持 1~9 张参考图，可拼接九宫格效果更佳</span>
        {imageList.length > 0 && (
          <span className="model-info-count">（最多 9 张，已上传 {imageList.length} 张）</span>
        )}
      </div>

      {/* ===== 上传区域 ===== */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp,image/bmp"
        multiple
        className="studio-upload-input"
        onChange={handleFileChange}
      />
      <div className="upload-area">
        {imageList.length > 0 && (
          <div className="upload-thumb-list">
            {imageList.map((img, index) => (
              <div key={img.newFileName} className="upload-thumb-wrap">
                <img
                  src={`${apiBaseURL}${img.url}`}
                  alt={`参考图 ${index + 1}`}
                  className="upload-thumb-img"
                />
                <button
                  type="button"
                  className="upload-thumb-remove"
                  onClick={() => removeImage(index)}
                  aria-label="移除"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        {imageList.length < MAX_IMAGES && (
          <div
            className={`upload-box-large ${uploadLoading ? "uploading" : ""}`}
            onClick={handleUploadClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleUploadClick()}
          >
            {uploadLoading ? "上传中…" : "+"}
          </div>
        )}
        {uploadError && <div className="upload-error">{uploadError}</div>}
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
