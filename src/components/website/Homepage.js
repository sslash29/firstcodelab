"use client";

import Landing from "./Landing";
import ModernTechSection from "./ModernTechSection";
import Navbar from "./Navbar";

function Homepage() {
  return (
    <div className="flex flex-col bg-[#F2F2F2] gap-10">
      <Navbar />
      <Landing />
      <ModernTechSection />
    </div>
  );
}

export default Homepage;
