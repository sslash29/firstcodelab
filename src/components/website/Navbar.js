"use client";

import Link from "next/link";
import { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative flex items-center justify-between p-3 px-4 sm:px-16 border-b">
      <h2 className="font-bold text-2xl">
        <Link href="/">firstcodelab</Link>
      </h2>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex items-center gap-6 group">
        {["Courses", "Projects", "Pricing", "About", "Contact Us"].map(
          (item, idx) => (
            <p
              key={idx}
              className="transition-all duration-200 group-hover:opacity-55 hover:!opacity-100 cursor-pointer"
            >
              {item}
            </p>
          )
        )}
      </div>

      {/* Desktop Buttons */}
      <div className="hidden sm:flex items-center gap-6">
        <button className="px-6 py-2 cursor-pointer bg-[#35A7FF] text-white rounded-lg font-semibold text-lg hover:scale-90 transition-all">
          <Link href={"/login"}>log in</Link>
        </button>
        <button className="flex items-center justify-between text-[#35A7FF] font-bold cursor-pointer gap-1">
          <img src="/Language.svg" alt="worldIcon" />
          EN
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="sm:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b sm:hidden flex flex-col items-center gap-4 p-4 z-10">
          {["Courses", "Projects", "Pricing", "About", "Contact Us"].map(
            (item, idx) => (
              <p key={idx} className="cursor-pointer">
                {item}
              </p>
            )
          )}
          <button className="w-full px-6 py-2 cursor-pointer bg-[#35A7FF] text-white rounded-lg font-semibold text-lg">
            <Link href={"/login"}>log in</Link>
          </button>
          <button className="flex items-center justify-center text-[#35A7FF] font-bold cursor-pointer gap-1 w-full">
            <img src="/Language.svg" alt="worldIcon" />
            EN
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
