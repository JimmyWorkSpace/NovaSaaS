import React from "react";

function HeroSection() {
  return (
    <div className="container py-4">

      <div className="row g-4">

        {/* Left: Reference Upload */}
        <div className="col-lg-5">
          <div className="ns-panel p-4 h-100">
            <h5 className="mb-3">Reference Upload</h5>
            <div
              className="d-flex align-items-center justify-content-center border rounded"
              style={{ height: 300, borderColor: "var(--border)" }}
            >
              1–9 Image Grid Preview
            </div>
          </div>
        </div>

        {/* Right: Prompt & Parameters */}
        <div className="col-lg-7">
          <div className="ns-panel p-4 h-100">
            <h5 className="mb-3">Prompt & Parameters</h5>

            <textarea
              className="form-control ns-textarea mb-4"
              rows={4}
              placeholder="Describe your creative idea..."
            />

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <select className="form-select ns-select">
                  <option>Resolution 1K</option>
                  <option>Resolution 2K</option>
                  <option>Resolution 4K</option>
                </select>
              </div>

              <div className="col-md-6">
                <select className="form-select ns-select">
                  <option>Aspect Ratio 9:16</option>
                  <option>Aspect Ratio 16:9</option>
                  <option>Aspect Ratio 1:1</option>
                </select>
              </div>

              <div className="col-md-6">
                <select className="form-select ns-select">
                  <option>Duration 15s</option>
                  <option>Duration 25s</option>
                </select>
              </div>

              <div className="col-md-6">
                <select className="form-select ns-select">
                  <option>Quantity 1</option>
                  <option>Quantity 2</option>
                  <option>Quantity 3</option>
                </select>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <span className="ns-muted">
                Estimated Credit Cost: <strong>30</strong>
              </span>

              <button className="ns-btn-primary">
                GENERATE
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

export default HeroSection;
