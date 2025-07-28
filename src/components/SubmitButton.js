"use client";

import { useFormStatus } from "react-dom";

function SubmitButton({ title = "Add", titleUpdating = "Adding..." }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`px-2 py-2.5 bg-[#35A7FF] text-white font-semibold transition-all duration-200 rounded-md 
          ${
            pending
              ? "bg-red-300 opacity-50 cursor-not-allowed"
              : "hover:scale-95"
          }
  `}
    >
      {!pending ? title : titleUpdating}
    </button>
  );
}

export default SubmitButton;
