import React from "react";

function GlobalFooter() {
  return (
    <footer className="bg-dark text-light text-center py-4 mt-5 border-top border-secondary">
      <div className="container small">
        <div className="mb-2">
          <a href="#" className="text-decoration-none text-light me-3">
            Terms
          </a>
          <a href="#" className="text-decoration-none text-light me-3">
            Privacy
          </a>
          <a href="#" className="text-decoration-none text-light">
            Contact
          </a>
        </div>

        <div className="text-secondary">
          © {new Date().getFullYear()} NovaSaaS. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default GlobalFooter;
