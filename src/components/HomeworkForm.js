"use client";

import { useState, useActionState } from "react";
import SubmitButton from "./SubmitButton";
import { createHomework } from "@/lib/actions/instructorAction"; // Make sure this exists

export default function HomeworkForm({ groupId }) {
  const [formData, setFormData] = useState({
    end_time: "",
    session_name: "",
    session_content: "",
    group_id: "",
  });

  const [homeworkState, formAction] = useActionState(createHomework, {});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form
      className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 p-6 rounded-2xl shadow-md space-y-6 max-w-xl mx-auto"
      action={formAction}
    >
      {/* Hidden instructor ID */}
      <input
        hidden
        name="instructor_id"
        value="9089477f-2dba-46bd-ba75-e50b24d52b2f"
        readOnly
      />

      <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">
        Create Homework
      </h2>

      {/* End Time */}
      <div className="flex flex-col">
        <label
          htmlFor="end_time"
          className="mb-1 font-medium text-zinc-700 dark:text-zinc-300"
        >
          Due Date
        </label>
        <input
          type="datetime-local"
          id="end_time"
          name="end_time"
          value={formData.end_time}
          onChange={handleChange}
          required
          className="rounded-md border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white px-3 py-2"
        />
      </div>

      {/* Homework Name */}
      <div className="flex flex-col">
        <label
          htmlFor="session_name"
          className="mb-1 font-medium text-zinc-700 dark:text-zinc-300"
        >
          Homework Name
        </label>
        <input
          type="text"
          id="session_name"
          name="session_name"
          value={formData.session_name}
          onChange={handleChange}
          required
          className="rounded-md border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white px-3 py-2"
        />
      </div>

      {/* Homework Content */}
      <div className="flex flex-col">
        <label
          htmlFor="session_content"
          className="mb-1 font-medium text-zinc-700 dark:text-zinc-300"
        >
          Homework Content
        </label>
        <textarea
          id="session_content"
          name="session_content"
          value={formData.session_content}
          onChange={handleChange}
          rows={4}
          required
          className="rounded-md border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white px-3 py-2 resize-none"
        />
      </div>

      <input hidden readOnly name="group_id" value={groupId} />

      {/* Submit Button */}
      <SubmitButton />

      {/* Errors */}
      {homeworkState?.error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      {homeworkState?.success === false && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {homeworkState.message}
        </p>
      )}
    </form>
  );
}
