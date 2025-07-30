"use client";

import { useState, useActionState } from "react";
import SubmitButton from "./SubmitButton";
import { createHomework } from "@/lib/actions/instructorAction"; // Make sure this exists
import { useRouter } from "next/navigation";

export default function HomeworkForm({ groupId }) {
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

  if (homeworkState?.success === true) {
    router.push("/instructor");
  }

  return (
    <form
      className="bg-white border p-6 rounded-2xl text-black w-[500px]"
      action={formAction}
    >
      {/* Hidden instructor ID */}
      <input
        hidden
        name="instructor_id"
        value="9089477f-2dba-46bd-ba75-e50b24d52b2f"
        readOnly
      />

      <h2 className="text-2xl font-bold">Create Homework</h2>

      {/* End Time */}
      <div className="flex flex-col">
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
          className="rounded-md bg-[#DDDCE3] px-3 py-2 text-gray-900 "
        />
      </div>

      {/* Homework Name */}
      <div className="flex flex-col">
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
          className="rounded-md bg-[#DDDCE3] px-3 py-2 text-gray-900 "
        />
      </div>

      {/* Homework Content */}
      <div className="flex flex-col mb-6">
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
          className="rounded-md bg-[#DDDCE3] px-3 py-2 text-gray-900 "
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
