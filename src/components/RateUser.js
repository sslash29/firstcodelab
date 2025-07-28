"use client";

import { rateStudent } from "@/lib/actions/instructorAction";
import { rateInstructor } from "@/lib/actions/studentAction";
import { useActionState, useState } from "react";

const defaultCriteria = {
  instructor: [
    { label: "Explanation", name: "explanation" },
    { label: "Homework", name: "homework" },
    { label: "Attention to student", name: "attention" },
  ],
  student: [
    { label: "Participation", name: "participation" },
    { label: "Homework Submission", name: "submission" },
    { label: "Punctuality", name: "punctuality" },
  ],
};

export default function RateUser({ userId, type }) {
  const criteria = defaultCriteria[type] || [];

  const [ratings, setRatings] = useState(
    Object.fromEntries(criteria.map(({ name }) => [name, 3]))
  );

  const [instructorFormState, instructorFormAction] = useActionState(
    rateInstructor,
    {}
  );
  const [studentFormState, studentFormAction] = useActionState(rateStudent, {});

  const handleRatingChange = (name, value) => {
    setRatings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form
      className="space-y-4 p-4 border rounded-xl shadow"
      action={type === "instructor" ? instructorFormAction : studentFormAction}
    >
      <h2 className="text-xl font-semibold mb-2 capitalize">Rate {type}</h2>

      <input type="hidden" name="userId" value={userId} readOnly />

      {criteria.map(({ label, name }) => (
        <div key={name} className="flex flex-col">
          <label className="font-medium mb-1">{label}</label>
          <input
            type="range"
            min={1}
            max={5}
            step={1}
            value={ratings[name]}
            onChange={(e) => handleRatingChange(name, Number(e.target.value))}
            className="w-full"
          />
          <input type="hidden" name={name} value={ratings[name]} />
          <span className="text-sm text-gray-600">Rating: {ratings[name]}</span>
        </div>
      ))}

      <button
        type="submit"
        className="bg-[#01f4729a] text-white px-4 py-2 rounded hover:bg-blue-700 font-bold"
      >
        Submit Rating
      </button>

      {(instructorFormState?.message || studentFormState?.message) && (
        <p className="mt-2 text-sm text-green-600">
          {instructorFormState?.message || studentFormState?.message}
        </p>
      )}
    </form>
  );
}
