import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "開始使用需要什麼客製流程？",
    answer:
      "我們提供標準化部署與設定流程，系統內建 AI 內容生成與排程機制，無需繁瑣設定即可快速上線。",
  },
  {
    question: "為什麼選擇 AI 內容經營？",
    answer:
      "AI 能夠大幅降低內容製作成本，同時提升產出效率，讓品牌在市場上持續曝光並穩定成長。",
  },
  {
    question: "為什麼價格如此透明？",
    answer:
      "我們採用標準化 SaaS 訂閱模式，價格清楚透明，沒有隱藏費用，讓企業可以安心使用。",
  },
];

function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="ns-faq">
      <div className="container">

        <h2 className="ns-faq-title">FAQ</h2>

        <div className="ns-faq-list">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`ns-faq-item ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <button
                className="ns-faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <span>{item.question}</span>
                <ChevronDown
                  size={20}
                  className={`ns-faq-icon ${
                    activeIndex === index ? "rotate" : ""
                  }`}
                />
              </button>

              <div className="ns-faq-answer-wrapper">
                <div className="ns-faq-answer">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default FAQSection;
