"use client";

import Link from "next/link";

function Navbar() {
  return (
    <div className="flex items-center justify-between p-3 px-16 border-b">
      <h2 className="font-bold text-2xl">
        <Link href="/">firstcodelab</Link>
      </h2>

      <div className="flex items-center gap-6 group">
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

      {/* Buttons */}
      <div className="flex items-center gap-6">
        <button className="px-6 py-2 cursor-pointer bg-[#35A7FF] text-white rounded-lg font-semibold text-lg hover:scale-90 transition-all">
          <Link href={"/login"}>log in</Link>
        </button>
        <button className="flex items-center justify-between text-[#35A7FF] font-bold cursor-pointer gap-1">
          <img src="/Language.svg" alt="worldIcon" />
          EN
        </button>
      </div>
    </div>
  );
}

export default Navbar;
