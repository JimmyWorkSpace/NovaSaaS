import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaMagic,
  FaTimes,
  FaArrowLeft,
} from "react-icons/fa";

export default function StudioPage() {
  const navigate = useNavigate();

  const [ratio, setRatio] = useState("9:16");
  const [resolution, setResolution] = useState("1K");
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* =============================
     上傳圖片（限制 1–9 張）
  ============================== */
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const fileArray = Array.from(e.target.files);

    if (fileArray.length + images.length > 9) {
      setError("最多只能上傳 9 張圖片");
      return;
    }

    setImages([...images, ...fileArray]);
    setError("");
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  /* =============================
     提交生成
  ============================== */
  const handleGenerate = () => {
    if (loading) return;

    if (!prompt.trim()) {
      setError("請輸入創意描述");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2500);
  };

  const isDisabled = loading || !prompt.trim();

  return (
    <div className="studio-page container-fluid py-5">
      <div className="container">
        <div className="row g-4">

          {/* ================= LEFT PANEL ================= */}
          <div className="col-lg-6">
            <div className="studio-card p-4 position-relative">

              {loading && <div className="studio-overlay"></div>}

              {/* 🔙 Back Button */}
              <button
                className="btn btn-outline-light mb-3"
                onClick={() => navigate("/dashboard")}
                disabled={loading}
              >
                <FaArrowLeft className="me-2" />
                返回首頁
              </button>

              <h3 className="studio-title mb-4">建立新作品</h3>

              {/* ================= Upload Area ================= */}
              <div className="mb-3">
                <label className="upload-box">
                  <input
                    type="file"
                    multiple
                    hidden
                    onChange={handleUpload}
                    disabled={loading}
                  />
                  <span>+</span>
                </label>

                <p className="upload-hint text-center">
                  支援 1–9 張參考圖
                </p>
              </div>

              {images.length > 0 && (
                <div className="uploaded-preview mb-3">
                  {images.map((img, index) => (
                    <div key={index} className="preview-thumb">
                      <img
                        src={URL.createObjectURL(img)}
                        alt="preview"
                      />
                      <button
                        className="remove-btn"
                        onClick={() => removeImage(index)}
                        disabled={loading}
                      >
                        <FaTimes size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* ================= Prompt ================= */}
              <div className="mb-3">
                <label className="form-label text-white">創意描述</label>
                <textarea
                  className="form-control studio-textarea"
                  placeholder="描述你想生成的畫面、風格、場景..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="studio-error mb-3">
                  {error}
                </div>
              )}

              {/* ================= Resolution ================= */}
              <div className="mb-3">
                <div className="studio-subtitle mb-2">生成分辨率</div>
                <div className="d-flex gap-2 flex-wrap">
                  {["1K", "2K", "4K"].map((r) => (
                    <button
                      key={r}
                      className={`studio-option-btn ${
                        resolution === r ? "active" : ""
                      }`}
                      onClick={() => setResolution(r)}
                      disabled={loading}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* ================= Ratio ================= */}
              <div className="mb-4">
                <div className="studio-subtitle mb-2">圖片比例</div>
                <div className="d-flex gap-2 flex-wrap">
                  {["1:1", "16:9", "9:16", "4:3"].map((r) => (
                    <button
                      key={r}
                      className={`studio-option-btn ${
                        ratio === r ? "active" : ""
                      }`}
                      onClick={() => setRatio(r)}
                      disabled={loading}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* ================= Buttons ================= */}
              <div className="d-flex gap-3 flex-wrap">
                <button
                  className="btn btn-outline-light px-4"
                  disabled={loading}
                  onClick={() => navigate("/works")}
                >
                  查看作品
                </button>

                <button
                  className="studio-generate-btn px-4"
                  onClick={handleGenerate}
                  disabled={isDisabled}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      生成中...
                    </>
                  ) : (
                    <>
                      <FaMagic className="me-2" />
                      提交生成 <FaArrowRight className="ms-2" />
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>

          {/* ================= RIGHT PANEL ================= */}
          <div className="col-lg-6">
            <div className="studio-card p-4">

              <h3 className="studio-title mb-3">即時預覽</h3>

              <div className="studio-preview d-flex align-items-center justify-content-center">

                {loading ? (
                  <div className="studio-skeleton"></div>
                ) : (
                  <span className="preview-placeholder">
                    生成結果將顯示在這裡
                  </span>
                )}

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
