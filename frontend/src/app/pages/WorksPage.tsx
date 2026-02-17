import { useNavigate } from "react-router-dom";
import {
  FaEye,
  FaTrash,
  FaClosedCaptioning,
  FaStream,
} from "react-icons/fa";

type WorkStatus = "done" | "processing";

type WorkItem = {
  id: number;
  title: string;
  createdAt: string;
  status: WorkStatus;
  thumbnailUrl?: string;
  videoUrl?: string;
};

export default function WorksPage() {
  const navigate = useNavigate();

  const works: WorkItem[] = [
    { id: 1, title: "品牌宣傳短片", createdAt: "2024-03-01", status: "done" },
    { id: 2, title: "AI 商品圖生成", createdAt: "2024-03-02", status: "processing" },
    { id: 3, title: "社群行銷素材", createdAt: "2024-03-03", status: "done" },
  ];

  const statusLabel = (s: WorkStatus) =>
    s === "done" ? "已完成" : "處理中";

  const statusClass = (s: WorkStatus) =>
    s === "done" ? "status-done" : "status-processing";

  const handleDelete = (id: number) => {
    alert(`刪除作品 ${id}（UI 示意）`);
  };

  return (
    <div className="works-page">
      <div className="container py-5">

        {/* Header */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h2 className="works-title m-0">我的作品</h2>

          <button
            className="btn btn-primary px-4 fw-semibold"
            onClick={() => navigate("/studio")}
          >
            ＋ 建立新作品
          </button>
        </div>

        {/* Grid */}
        <div className="row g-4">
          {works.map((w) => (
            <div className="col-12 col-sm-6 col-lg-5" key={w.id}>
              <div className="work-card h-100 d-flex flex-column">

                {/* Thumbnail（可点击跳转） */}
                <div
                  className="work-thumbnail"
                  onClick={() => navigate(`/works/${w.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="work-thumbnail-inner">
                    <div className="work-thumbnail-icon">▶</div>
                    <div className="work-thumbnail-text">預覽區</div>
                  </div>
                </div>

                <div className="work-body d-flex flex-column flex-grow-1">

                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <div className="work-title-text">{w.title}</div>
                      <div className="work-date">
                        建立於 {w.createdAt}
                      </div>
                    </div>

                    <span className={`status-badge ${statusClass(w.status)}`}>
                      {statusLabel(w.status)}
                    </span>
                  </div>

                  {/* 按钮区域始终在底部 */}
                  <div className="work-actions mt-auto">

                    <button
                      className="btn btn-sm btn-outline-light"
                      onClick={() => navigate(`/works/${w.id}`)}
                    >
                      <FaEye className="me-1" />
                      查看
                    </button>

                    <button
                      className="btn btn-sm btn-outline-info"
                      onClick={() => navigate(`/works/${w.id}/subtitle`)}
                    >
                      <FaClosedCaptioning className="me-1" />
                      加字幕
                    </button>


                   <button
                      className="btn btn-sm btn-outline-warning"
                      onClick={() => navigate(`/works/${w.id}/schedule`)}
                    >
                      <FaStream className="me-1" />
                      排程
                    </button>


                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => {
                        const confirmed = window.confirm("確定要刪除此作品嗎？此操作無法復原。");
                        if (confirmed) {
                          handleDelete(w.id);
                        }
                      }}
                    >
                      <FaTrash className="me-1" />
                      刪除
                    </button>


                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
