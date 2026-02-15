
function FeatureCard({ title, desc }: any) {
  return (
    <div className="col-md-6 col-lg-3 mb-4">
      <div className="p-4 bg-dark text-white rounded-4 h-100">
        <h6 className="fw-bold mb-2">{title}</h6>
        <p className="text-secondary small mb-0">{desc}</p>
      </div>
    </div>
  );
}

function FeatureSection() {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h3 className="fw-bold mb-5 text-center">AI 創作能力</h3>

        <div className="row">
          <FeatureCard title="AI 創意影音" desc="Sora 生成影片內容" />
          <FeatureCard title="圖文轉影片" desc="自動生成短影音" />
          <FeatureCard title="虛擬人" desc="AI 主播 + 人工智能" />
          <FeatureCard title="排程發佈" desc="多平台自動發佈" />
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;
