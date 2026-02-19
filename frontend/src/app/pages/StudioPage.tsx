import { useNavigate, useParams } from "react-router-dom";
import { ReactNode } from "react";

import SoraView from "./SoraView";
import NanoView from "./NanoView";
import VeoView from "./VeoView";
import GrokView from "./GrokView";

export default function StudioPage() {
  const navigate = useNavigate();
  const { model } = useParams();

  const modelMap: Record<string, ReactNode> = {
    sora: <SoraView />,
    nano: <NanoView />,
    veo: <VeoView />,
    grok: <GrokView />,
  };

  // 子页面
  if (model && modelMap[model]) {
    return (
      <div className="studio-hero">
        <div className="studio-sub-container">
          <button
            className="studio-back-btn"
            onClick={() => navigate("/studio")}
          >
            ← 返回
          </button>

          {modelMap[model]}
        </div>
      </div>
    );
  }

  // 入口页面
  return (
    <div className="studio-hero">
      <div className="studio-center">
        <h1 className="studio-title">选择创作模型</h1>

        <div className="studio-grid">
          <div className="studio-card" onClick={() => navigate("/studio/sora")}>
            <h3>AI 视频生成</h3>
            <p>Sora API · 专业视频创作</p>
          </div>

          <div className="studio-card" onClick={() => navigate("/studio/nano")}>
            <h3>AI 创意生图</h3>
            <p>NanoBanana Pro · 高清图像生成</p>
          </div>

          <div className="studio-card" onClick={() => navigate("/studio/veo")}>
            <h3>图文联创视频</h3>
            <p>Veo3 API · 文本 + 视频生成</p>
          </div>

          <div className="studio-card" onClick={() => navigate("/studio/grok")}>
            <h3>极速创作短视频</h3>
            <p>Grok Imagine · 快速视频生成</p>
          </div>
        </div>
      </div>
    </div>
  );
}
