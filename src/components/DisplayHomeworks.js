"use client";

import { useState } from "react";
import DisplayHomework from "./DisplayHomework";

function DisplayHomeworks({ homeworks }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("submitted");

  const toggleFilterDropdown = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setIsFilterOpen(false);
  };

  return (
    <div className="flex flex-col px-6 gap-5">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-4xl">Homework</h2>
        <div className="relative">
          <button
            className="border font-regular flex items-center text-xl rounded-xl px-4 gap-2"
            onClick={toggleFilterDropdown}
          >
            {selectedFilter === "submitted" ? "Submitted" : "Not Submitted"}
            <img
              src="/SmallEnlargeArrow.svg"
              alt="Arrow"
              className={`scale-150 mt-0.5 transition-transform ${
                isFilterOpen ? "rotate-270" : "rotate-90"
              }`}
            />
          </button>

          {isFilterOpen && (
            <div className="absolute bg-white border mt-2 rounded-xl shadow-md w-full z-10">
              <button
                onClick={() => handleFilterSelect("submitted")}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-t-xl ${
                  selectedFilter === "submitted" ? "font-semibold" : ""
                }`}
              >
                Submitted
              </button>
              <button
                onClick={() => handleFilterSelect("notSubmitted")}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-xl ${
                  selectedFilter === "notSubmitted" ? "font-semibold" : ""
                }`}
              >
                Not Submitted
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {homeworks.map((homework, key) => {
          const submissions =
            selectedFilter === "submitted"
              ? homework.submitted
              : homework.notSubmitted;

          return submissions.map((student, i) => (
            <DisplayHomework
              key={`${key}-${i}`}
              homeworkData={{
                homework: homework.homework,
                submitted: [student],
              }}
            />
          ));
        })}
      </div>
    </div>
  );
}

export default DisplayHomeworks;
