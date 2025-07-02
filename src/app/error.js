"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("App Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
      <p className="mb-4 text-red-400">{error.message}</p>
      <button
        onClick={() => reset()}
        className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded"
      >
        Try again
      </button>
    </div>
  );
}
