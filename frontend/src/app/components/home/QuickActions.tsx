function QuickActions() {
  return (
    <div className="container py-4">

      <h5 className="mb-3">Quick Actions</h5>

      <div className="row g-3">

        <div className="col-md-3 col-sm-6">
          <button className="ns-btn-outline w-100">
            View Works
          </button>
        </div>

        <div className="col-md-3 col-sm-6">
          <button className="ns-btn-outline w-100">
            Create Job
          </button>
        </div>

        <div className="col-md-3 col-sm-6">
          <button className="ns-btn-outline w-100">
            Connect Social
          </button>
        </div>

        <div className="col-md-3 col-sm-6">
          <button className="ns-btn-outline w-100">
            Buy Credits
          </button>
        </div>

      </div>
    </div>
  );
}

export default QuickActions;
