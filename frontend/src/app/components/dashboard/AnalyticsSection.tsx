
function AnalyticsSection() {
  return (
    <section className="py-5 bg-dark text-white">
      <div className="container">
        <div className="row align-items-center">

          <div className="col-lg-6">
            <h3 className="fw-bold mb-3">成效分析</h3>
            <p className="text-secondary">
              提供完整數據報告，追蹤流量與轉換率。
            </p>
          </div>

          <div className="col-lg-6">
            <div
              style={{
                height: 250,
                background: "#1f2937",
                borderRadius: 16,
              }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}

export default AnalyticsSection;
