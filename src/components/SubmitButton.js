"use client";

import { useFormStatus } from "react-dom";

function SubmitButton({ title = "Add", titleUpdating = "Adding..." }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`px-2 py-2.5 bg-red-500 transition-colors duration-200
          ${
            pending
              ? "bg-red-300 opacity-50 cursor-not-allowed"
              : "hover:bg-red-400"
          }
  `}
    >
      {!pending ? title : titleUpdating}
    </button>
  );
}

export default SubmitButton;
