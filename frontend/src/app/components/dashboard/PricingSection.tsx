
function PlanCard({ title, price, highlight }: any) {
  return (
    <div className="col-md-4 mb-4">
      <div className={`p-4 rounded-4 h-100 ${highlight ? "bg-primary text-white" : "bg-light"}`}>
        <h5>{title}</h5>
        <h2 className="fw-bold my-3">${price}</h2>
        <button className="btn btn-dark w-100">
          訂閱方案
        </button>
      </div>
    </div>
  );
}

function PricingSection() {
  return (
    <section className="py-5 bg-light">
      <div className="container text-center">
        <h3 className="fw-bold mb-5">訂閱方案</h3>

        <div className="row">
          <PlanCard title="入門" price="49" />
          <PlanCard title="推薦" price="199" highlight />
          <PlanCard title="進階" price="299" />
        </div>

      </div>
    </section>
  );
}

export default PricingSection;
