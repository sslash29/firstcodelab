"use client";

import { useState, useActionState, useEffect } from "react";
import SubmitButton from "./SubmitButton";
import { createHomework } from "@/lib/actions/instructorAction"; // Make sure this exists
import { useRouter } from "next/navigation";

export default function HomeworkForm({ groups, instructorId }) {
  const [formData, setFormData] = useState({
    end_time: "",
    session_name: "",
    session_content: "",
    group_id: "",
  });

  const [homeworkState, formAction] = useActionState(createHomework, {});
  const router = useRouter();
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (homeworkState?.success === true) {
      router.push("/instructor");
    }
  }, [homeworkState?.success, router]);

  return (
    <form
      className="bg-white border p-4 sm:p-6 rounded-2xl text-black w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto space-y-5"
      action={formAction}
    >
      {/* Hidden instructor ID */}
      <input hidden name="instructor_id" value={instructorId} readOnly />

      <h2 className="text-xl sm:text-2xl font-bold text-center sm:text-left">
        Create Homework
      </h2>

      {/* End Time */}
      <div className="flex flex-col gap-1">
        <label htmlFor="end_time" className="mb-1 font-medium text-gray-500">
          Due Date
        </label>
        <input
          type="datetime-local"
          id="end_time"
          name="end_time"
          value={formData.end_time}
          onChange={handleChange}
          required
          className="rounded-md bg-[#DDDCE3] px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/40"
        />
      </div>

      {/* Homework Name */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="session_name"
          className="mb-1 font-medium text-gray-500"
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
          className="rounded-md bg-[#DDDCE3] px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/40"
        />
      </div>

      {/* Homework Content */}
      <div className="flex flex-col gap-1 mb-2">
        <label
          htmlFor="session_content"
          className="mb-1 font-medium text-gray-500"
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
          className="rounded-md bg-[#DDDCE3] px-3 py-2 text-gray-900 resize-y focus:outline-none focus:ring-2 focus:ring-black/40"
        />
      </div>

      {/* Group Selection */}
      <div className="flex flex-col gap-1 mb-2">
        <label htmlFor="group_id" className="mb-1 font-medium text-gray-500">
          Select Group
        </label>
        <select
          id="group_id"
          name="group_id"
          value={formData.group_id}
          onChange={handleChange}
          required
          className="rounded-md bg-[#DDDCE3] px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/40"
        >
          <option value="" disabled>
            Select a group
          </option>
          {Array.isArray(groups) &&
            groups.length > 0 &&
            groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name || `Group ${group.id}`}
              </option>
            ))}
        </select>
      </div>
      {/* Hidden input to pass group_id for form submission */}
      <input hidden readOnly name="group_id" value={formData.group_id} />

      {/* Submit Button */}
      <SubmitButton />

      {/* Errors */}
      {homeworkState?.error && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {homeworkState.error}
        </p>
      )}
      {homeworkState?.success === false && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {homeworkState.message}
        </p>
      )}
    </form>
  );
}
