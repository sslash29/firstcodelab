"use client";

import Footer from "./Footer";
import CodingLanguagesBar from "./CodingLanguagesBar";
import Landing from "./Landing";
import ModernTechSection from "./ModernTechSection";
import Navbar from "./Navbar";
import PricingPlan from "./PricingPlan";
import StudentProjectsSection from "./StudentProjectsSection";

function Homepage() {
  return (
    <div className="flex flex-col bg-[#F2F2F2] gap-10">
      <Navbar />
      <Landing />
      <ModernTechSection />
      <CodingLanguagesBar />
      <StudentProjectsSection />
      <PricingPlan />
      <Footer />
    </div>
  );
}

export default Homepage;
