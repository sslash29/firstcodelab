"use client";

import Landing from "./Landing";
import Navbar from "./Navbar";

function Homepage() {
  return (
    <div className="flex flex-col bg-[#F2F2F2]">
      <Navbar />
      <Landing />
    </div>
  );
}

export default Homepage;
