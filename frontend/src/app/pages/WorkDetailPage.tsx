import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaRedo, FaEdit, FaArrowLeft } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";

export default function WorkDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  /* ================================
     基本狀態
  ================================= */

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("已完成");

  const [ratio, setRatio] = useState("16:9");
  const [resolution, setResolution] = useState("1K");
  const [prompt, setPrompt] = useState("生成一個科技感企業宣傳影片");

  /* ================================
     Logs
  ================================= */

  const [statusLogs, setStatusLogs] = useState([
    "✓ 任務建立",
    "✓ 影片生成完成",
    "✓ 已發布",
  ]);

  const [actionLogs, setActionLogs] = useState([
    "2024-03-03 14:20 建立作品",
    "2024-03-03 14:25 生成完成",
  ]);

  /* ================================
     🔁 重新生成 UI 流程
  ================================= */

  const handleRegenerate = () => {
    if (loading) return;

    setLoading(true);
    setStatus("生成中");

    const now = new Date().toLocaleString();

    setStatusLogs((prev) => [
      ...prev,
      "✓ 任務重新建立",
      "⏳ 影片生成中",
    ]);

    setActionLogs((prev) => [
      ...prev,
      `${now} 重新生成`,
    ]);

    setTimeout(() => {
      const finishTime = new Date().toLocaleString();

      setLoading(false);
      setStatus("已完成");

      setStatusLogs((prev) => [
        ...prev,
        "✓ 影片生成完成",
      ]);

      setActionLogs((prev) => [
        ...prev,
        `${finishTime} 生成完成`,
      ]);
    }, 2500);
  };

  /* ================================
     ✏️ 編輯 Modal
  ================================= */

  const [showEdit, setShowEdit] = useState(false);

  const [editPrompt, setEditPrompt] = useState(prompt);
  const [editRatio, setEditRatio] = useState(ratio);
  const [editResolution, setEditResolution] = useState(resolution);

  const handleOpenEdit = () => {
    setEditPrompt(prompt);
    setEditRatio(ratio);
    setEditResolution(resolution);
    setShowEdit(true);
  };

  const handleSaveEdit = () => {
    setPrompt(editPrompt);
    setRatio(editRatio);
    setResolution(editResolution);

    const now = new Date().toLocaleString();

    setActionLogs((prev) => [
      ...prev,
      `${now} 編輯作品參數`,
    ]);

    setShowEdit(false);
  };

  return (
    <div className="work-detail-page container py-5 text-white">

      {/* ================= Header ================= */}
      <div className="d-flex align-items-center mb-4">

        <button
          className="btn btn-outline-light me-3"
          onClick={() => navigate("/works")}
        >
          <FaArrowLeft className="me-2" />
          返回
        </button>

        <div>
          <h2 className="fw-bold m-0">品牌宣傳短片</h2>
          <div className="small text-secondary">
            作品 ID: {id}
          </div>
        </div>

      </div>

      <div className="row g-4">

        {/* ================= LEFT ================= */}
        <div className="col-lg-8">

          <div className="detail-video-card p-4">

            <div className="video-wrapper">

              {loading ? (
                <div className="video-skeleton">
                  重新生成中...
                </div>
              ) : (
                <video className="w-100 rounded-4" controls>
                  <source src="" type="video/mp4" />
                </video>
              )}

            </div>

          </div>

        </div>

        {/* ================= RIGHT ================= */}
        <div className="col-lg-4">

          <div className="detail-info-card p-4">

            <div className="mb-3">
              <div className="text-secondary small">狀態</div>
              <div className={`fw-bold ${status === "生成中" ? "text-warning" : "text-success"}`}>
                {status}
              </div>
            </div>

            <div className="mb-3">
              <div className="text-secondary small">建立時間</div>
              <div>2024-03-01</div>
            </div>

            <div className="mb-3">
              <div className="text-secondary small">比例</div>
              <div>{ratio}</div>
            </div>

            <div className="mb-3">
              <div className="text-secondary small">分辨率</div>
              <div>{resolution}</div>
            </div>

            <div className="mb-4">
              <div className="text-secondary small">Prompt</div>
              <div>{prompt}</div>
            </div>

            {/* Buttons */}
            <button
              className="btn btn-primary w-100 mb-3"
              onClick={handleRegenerate}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  生成中...
                </>
              ) : (
                <>
                  <FaRedo className="me-2" />
                  重新生成
                </>
              )}
            </button>

            <button
              className="btn btn-outline-light w-100 mb-3"
              onClick={handleOpenEdit}
              disabled={loading}
            >
              <FaEdit className="me-2" />
              編輯
            </button>

          </div>

        </div>

      </div>

      {/* ================= Status Logs ================= */}
      <div className="mt-5">
        <h5 className="fw-bold mb-3">狀態紀錄</h5>
        <ul className="status-log-list">
          {statusLogs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>

      {/* ================= Action Logs ================= */}
      <div className="mt-4">
        <h5 className="fw-bold mb-3">操作紀錄</h5>
        <ul className="action-log-list">
          {actionLogs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>

      {/* ================= EDIT MODAL ================= */}

      <Modal
        show={showEdit}
        onHide={() => setShowEdit(false)}
        centered
        contentClassName="work-edit-modal"
      >
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>編輯作品參數</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <div className="mb-3">
            <label className="form-label">Prompt</label>
            <textarea
              className="form-control edit-textarea"
              value={editPrompt}
              onChange={(e) => setEditPrompt(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">比例</label>
            <select
              className="form-select"
              value={editRatio}
              onChange={(e) => setEditRatio(e.target.value)}
            >
              <option>16:9</option>
              <option>9:16</option>
              <option>1:1</option>
              <option>4:3</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">分辨率</label>
            <select
              className="form-select"
              value={editResolution}
              onChange={(e) => setEditResolution(e.target.value)}
            >
              <option>1K</option>
              <option>2K</option>
              <option>4K</option>
            </select>
          </div>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>
            取消
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            儲存
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}
