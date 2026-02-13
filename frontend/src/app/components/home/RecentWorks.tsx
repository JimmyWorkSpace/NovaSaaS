import React from "react";

const works = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  status: i % 3 === 0 ? "Generating" : i % 3 === 1 ? "Completed" : "Failed",
}));

function getBadgeClass(status: string) {
  if (status === "Completed") return "ns-badge ns-badge-success";
  if (status === "Generating") return "ns-badge ns-badge-warning";
  return "ns-badge ns-badge-danger";
}

function RecentWorks() {
  return (
    <div className="container py-4">

      <h5 className="mb-3">Recent Works</h5>

      <div className="row g-4">

        {works.map((work) => (
          <div key={work.id} className="col-lg-3 col-md-4 col-sm-6">
            <div className="ns-panel p-3 h-100">

              <div
                className="rounded mb-3"
                style={{
                  height: 120,
                  background: "rgba(255,255,255,0.05)",
                }}
              />

              <div className="d-flex justify-content-between align-items-center">
                <span>Work #{work.id}</span>
                <span className={getBadgeClass(work.status)}>
                  {work.status}
                </span>
              </div>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default RecentWorks;
