import React from "react";

const caseData = [
  {
    id: 1,
    title: "酥炸白醬義大利麵",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2",
    duration: "16:9",
    category: ["小商家", "餐飲"],
  },
  {
    id: 2,
    title: "氣炸鍋舒肥雞腿排",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    duration: "16:9",
    category: ["市集商家", "美食"],
  },
  {
    id: 3,
    title: "主廚教你做晚餐",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    duration: "16:9",
    category: ["自媒體"],
  },
  {
    id: 4,
    title: "優選海鮮拼盤",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
    duration: "16:9",
    category: ["餐飲"],
  },
  {
    id: 5,
    title: "咖啡館日常短影片",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    duration: "16:9",
    category: ["美業"],
  },
  {
    id: 6,
    title: "輕食健康生活",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
    duration: "16:9",
    category: ["小商家"],
  },
];

function CaseSection() {
  return (
    <section className="ns-case">
      <div className="container">

        {/* HEADER */}
        <div className="ns-case-header">
          <h2 className="ns-case-title">發佈成果案例</h2>

          <div className="ns-case-tabs">
            <button className="active">全部</button>
            <button>餐飲</button>
            <button>美業</button>
            <button>小商家</button>
          </div>
        </div>

        {/* GRID */}
        <div className="ns-case-grid">
          {caseData.map((item) => (
            <div key={item.id} className="ns-case-card">

              {/* IMAGE */}
              <div className="ns-case-image">
                <img src={item.image} alt={item.title} />
                <span className="ns-case-duration">{item.duration}</span>
              </div>

              {/* CONTENT */}
              <div className="ns-case-content">
                <h3>{item.title}</h3>

                <div className="ns-case-tags">
                  {item.category.map((tag, index) => (
                    <span key={index}>{tag}</span>
                  ))}
                </div>

                <div className="ns-case-flow">
                  <span>生成 <span className="check">✓</span></span>
                  <span className="arrow">→</span>
                  <span>排程 <span className="check">✓</span></span>
                  <span className="arrow">→</span>
                  <span>發佈 <span className="check">✓</span></span>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default CaseSection;
