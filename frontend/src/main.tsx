import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


/* =========================
   Base
========================= */
import "./styles/base/base.css";

/* =========================
   Layout
========================= */
import "./styles/layout/header.css";

/* =========================
   Components
========================= */
import "./styles/components/buttons.css";
import "./styles/components/animations.css";

/* =========================
   Dashboard Sections
========================= */
import "./styles/dashboard/hero.css";
import "./styles/dashboard/feature.css";
import "./styles/dashboard/workflow.css";
import "./styles/dashboard/analytics.css";
import "./styles/dashboard/case.css";
import "./styles/dashboard/testimonial.css";
import "./styles/dashboard/pricing.css";
import "./styles/dashboard/faq.css";
import "./styles/dashboard/cta.css";

/* =========================
   Auth
========================= */
import "./styles/auth/login.css";
import "./styles/auth/register.css";

/* =========================
   Studio Workd
========================= */
import "./styles/studio/studio.css";
import "./styles/works/works.css";
import "./styles/works/workDetails.css";
import "./styles/works/subtitle.css";
import "./styles/works/schedule.css";
import "./styles/works/editor.css";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
