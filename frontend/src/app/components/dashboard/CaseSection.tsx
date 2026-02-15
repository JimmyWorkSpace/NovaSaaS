
function CaseSection() {
  return (
    <section className="py-5">
      <div className="container">
        <h3 className="fw-bold mb-5 text-center">發佈成果案例</h3>

        <div className="row">
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="col-md-4 mb-4">
              <div className="bg-dark text-white rounded-4 p-3">
                <div style={{ height: 180, background: "#374151", borderRadius: 12 }} />
                <div className="mt-3">案例 #{i}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default CaseSection;
