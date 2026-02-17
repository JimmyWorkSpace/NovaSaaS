import MainLayout from "../components/layout/MainLayout";

import HeroSection from "../components/dashboard/HeroSection";
import FeatureSection from "../components/dashboard/FeatureSection";
import WorkflowSection from "../components/dashboard/WorkflowSection";
import AnalyticsSection from "../components/dashboard/AnalyticsSection";
import CaseSection from "../components/dashboard/CaseSection";
import TestimonialSection from "../components/dashboard/TestimonialSection";
import PricingSection from "../components/dashboard/PricingSection";
import FAQSection from "../components/dashboard/FAQSection";
import CTASection from "../components/dashboard/CTASection";   // ✅ 新增

function DashboardPage() {
  return (
    <MainLayout>

      <HeroSection />

      <FeatureSection />

      <WorkflowSection />

      <AnalyticsSection />

      <CaseSection />

      <TestimonialSection />

      <PricingSection />

      <FAQSection />

      <CTASection />  

    </MainLayout>
  );
}

export default DashboardPage;
