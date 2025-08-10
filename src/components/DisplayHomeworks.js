"use client";

import { useState } from "react";
import DisplayHomework from "./DisplayHomework";

function DisplayHomeworks({ homeworks = [] }) {
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
    <div className="flex flex-col gap-5 px-3 sm:px-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-2xl sm:text-4xl font-semibold">Homework</h2>
        <div className="relative w-full sm:w-auto">
          <button
            className="flex items-center gap-2 rounded-xl border px-4 py-2 text-base sm:text-xl w-full sm:w-auto justify-between sm:justify-center"
            onClick={toggleFilterDropdown}
          >
            {selectedFilter === "submitted" ? "Submitted" : "Not Submitted"}
            <img
              src="/SmallEnlargeArrow.svg"
              alt="Arrow"
              className={`mt-0.5 scale-125 sm:scale-150 transition-transform ${
                isFilterOpen ? "rotate-270" : "rotate-90"
              }`}
            />
          </button>

          {isFilterOpen && (
            <div className="absolute z-10 mt-2 w-full rounded-xl border bg-white shadow-md">
              <button
                onClick={() => handleFilterSelect("submitted")}
                className={`block w-full rounded-t-xl px-4 py-2 text-left hover:bg-gray-100 ${
                  selectedFilter === "submitted" ? "font-semibold" : ""
                }`}
              >
                Submitted
              </button>
              <button
                onClick={() => handleFilterSelect("notSubmitted")}
                className={`block w-full rounded-b-xl px-4 py-2 text-left hover:bg-gray-100 ${
                  selectedFilter === "notSubmitted" ? "font-semibold" : ""
                }`}
              >
                Not Submitted
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-wrap sm:flex-row gap-4 sm:justify-start">
        {homeworks?.map((homework, key) => {
          const submissions =
            selectedFilter === "submitted"
              ? homework.submitted
              : homework.notSubmitted;

          return submissions.map((student, i) => (
            <div key={`${key}-${i}`} className="w-full sm:w-auto">
              <DisplayHomework
                homeworkData={{
                  homework: homework.homework,
                  submitted: [student],
                }}
              />
            </div>
          ));
        })}
      </div>
    </div>
  );
}

export default DisplayHomeworks;
