import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaTrash, FaSave } from "react-icons/fa";


type Subtitle = {
  id: number;
  start: number;
  end: number;
  text: string;
};

export default function SubtitlePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);

  const [start, setStart] = useState("0");
  const [end, setEnd] = useState("5");
  const [text, setText] = useState("");

  const [toast, setToast] = useState("");

  /* =======================
     監聽影片播放時間
  ======================== */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const current = video.currentTime;

      const active = subtitles.find(
        (s) => current >= s.start && current <= s.end
      );

      setActiveId(active ? active.id : null);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [subtitles]);

  /* =======================
     新增字幕
  ======================== */
  const addSubtitle = () => {
    if (!text.trim()) return;

    const newSub: Subtitle = {
      id: Date.now(),
      start: parseFloat(start),
      end: parseFloat(end),
      text,
    };

    setSubtitles([...subtitles, newSub]);
    setText("");
    setToast("字幕新增成功");

    setTimeout(() => setToast(""), 2000);
  };

  /* =======================
     刪除字幕
  ======================== */
  const deleteSubtitle = (id: number) => {
    setSubtitles(subtitles.filter((s) => s.id !== id));
  };

  /* =======================
     儲存字幕
  ======================== */
  const saveSubtitles = () => {
    setToast("字幕已儲存");
    setTimeout(() => setToast(""), 2000);
  };

  return (
    <div className="subtitle-page">
      <div className="container py-5">

        {/* Header */}
        <div className="subtitle-header">
          <button
            className="btn btn-outline-light btn-sm"
            onClick={() => navigate(`/works/${id}`)}
          >
            <FaArrowLeft />
          </button>
          <h2>加字幕 - 作品 #{id}</h2>
        </div>

        <div className="row g-4">

          {/* 左側播放器 */}
          <div className="col-lg-7">
            <div className="video-card">
              <video
                ref={videoRef}
                controls
                className="video-player"
              >
                <source src="/sample.mp4" type="video/mp4" />
              </video>

              {/* Active 字幕 Overlay */}
              {activeId && (
                <div className="subtitle-overlay">
                  {
                    subtitles.find((s) => s.id === activeId)?.text
                  }
                </div>
              )}
            </div>
          </div>

          {/* 右側控制面板 */}
          <div className="col-lg-5">
            <div className="subtitle-panel">

              <h5>新增字幕</h5>

              <label>開始秒數</label>
              <input
                type="number"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className="form-control mb-2"
              />

              <label>結束秒數</label>
              <input
                type="number"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className="form-control mb-2"
              />

              <label>字幕內容</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="form-control mb-3"
              />

              <button
                className="btn btn-primary w-100 mb-4"
                onClick={addSubtitle}
              >
                ＋ 新增字幕
              </button>

              <hr />

              <h6>字幕列表</h6>

              <div className="subtitle-list">
                {subtitles.map((s) => (
                  <div
                    key={s.id}
                    className={`subtitle-item ${
                      activeId === s.id ? "active" : ""
                    }`}
                  >
                    <div>
                      {s.start}s - {s.end}s
                      <div className="subtitle-text">
                        {s.text}
                      </div>
                    </div>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => deleteSubtitle(s.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>

              <button
                className="btn btn-success w-100 mt-4"
                onClick={saveSubtitles}
              >
                <FaSave className="me-2" />
                儲存字幕
              </button>

            </div>
          </div>

        </div>
      </div>

      {/* Toast */}
      {toast && <div className="subtitle-toast">{toast}</div>}
    </div>
  );
}
