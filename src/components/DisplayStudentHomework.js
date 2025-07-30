"use client";

import { submitHomeworkAction } from "@/lib/actions/studentAction";
import { useActionState, useState } from "react";

function DisplayStudentHomework({ data }) {
  const [state, formAction, isPending] = useActionState(submitHomeworkAction, {
    success: false,
    message: "",
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("notSubmitted");

  const toggleFilterDropdown = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setIsFilterOpen(false);
  };

  const filteredData = data.filter((assignment) => {
    const isSubmitted = Boolean(
      assignment.submission_text || assignment.submission_file
    );
    return selectedFilter === "submitted" ? isSubmitted : !isSubmitted;
  });

  return (
    <div className="space-y-6 px-6">
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

      {filteredData.map((assignment) => {
        const hw = assignment.homework;
        const id = assignment.id;
        const isSubmitted = Boolean(
          assignment.submission_text || assignment.submission_file
        );
        const isPastDue = new Date(hw.due_date) < new Date();

        return (
          <form
            key={id}
            action={formAction}
            className="border rounded-xl p-4 shadow space-y-3 bg-white"
          >
            <input type="hidden" name="assignment_id" value={id} />

            {isSubmitted ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {hw.title}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {new Date(hw.due_date).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "2-digit",
                    })}
                  </span>
                </div>

                <textarea
                  disabled
                  className="resize-none text-black bg-[#E6E6E6] rounded-lg p-2 h-[126px] w-full"
                  value={assignment.submission_text || "No submission"}
                />

                <div className="flex justify-between items-center gap-2.5">
                  {assignment.fileUrl ? (
                    <a
                      href={assignment.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm border px-4 py-1 rounded-3xl font-semibold hover:bg-gray-200"
                    >
                      View Homework
                    </a>
                  ) : (
                    <span className="text-sm text-gray-400">
                      No file uploaded
                    </span>
                  )}

                  <button
                    type="button"
                    disabled
                    className="px-4 py-1 bg-gray-400 text-white rounded cursor-not-allowed"
                  >
                    Already Submitted
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="text-lg font-semibold text-gray-800">
                  {hw.title}
                </div>
                <div className="text-sm text-gray-600 italic">
                  {hw.description}
                </div>
                <div className="text-sm text-gray-500">
                  Due: {new Date(hw.due_date).toLocaleString()}
                </div>

                {isPastDue && (
                  <p className="text-red-600 text-sm font-medium mt-2">
                    Due date has passed. Submission is closed.
                  </p>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Submission Text
                  </label>
                  <textarea
                    name="submission_text"
                    rows={3}
                    className="mt-1 block w-full border px-3 py-2 rounded-md"
                    defaultValue={assignment.submission_text || ""}
                    disabled={isPastDue}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Submission File
                  </label>
                  <input
                    name="submission_file"
                    type="file"
                    className="mt-1 block"
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    disabled={isPastDue}
                  />
                </div>

                <button
                  type="submit"
                  className={`mt-2 px-4 py-2 text-white rounded ${
                    isPastDue
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  disabled={isPending || isPastDue}
                >
                  {isPending ? "Submitting..." : "Submit"}
                </button>
              </>
            )}

            {state.message && (
              <p
                className={`text-sm italic ${
                  state.success ? "text-green-600" : "text-red-600"
                }`}
              >
                {state.message}
              </p>
            )}
          </form>
        );
      })}
    </div>
  );
}

export default DisplayStudentHomework;
