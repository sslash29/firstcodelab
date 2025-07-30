"use client";

import { useState, useActionState } from "react";
import SubmitButton from "./SubmitButton";
import { createSession } from "@/lib/actions/instructorAction";
import Link from "next/link";

export default function SessionForm({ groups }) {
  const [formData, setFormData] = useState({
    start_time: "",
    end_time: "",
    session_name: "",
    session_content: "",
    group_id: "",
  });

  const [error, setError] = useState(null);

  // Client-side validation wrapper
  const sessionAction = async (prevState, formData) => {
    const start = new Date(formData.get("start_time"));
    const end = new Date(formData.get("end_time"));

    if (start >= end) {
      setError("End time must be after start time.");
      return { success: false };
    }

    setError(null); // Clear old error
    return await createSession(prevState, formData);
  };

  const [sessionState, formAction] = useActionState(sessionAction, {});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form
      className="bg-white border p-6 rounded-2xl text-black w-[500px]"
      action={formAction}
    >
      {/* Hidden instructor ID */}
      <input
        hidden
        value="9089477f-2dba-46bd-ba75-e50b24d52b2f"
        name="instructor_id"
        readOnly
      />

      <h2 className="text-2xl font-bold">Create New Session</h2>

      {/* Start Time */}
      <div className="flex flex-col">
        <label htmlFor="start_time" className="mb-1 font-medium text-gray-500">
          Start Time
        </label>
        <input
          type="datetime-local"
          id="start_time"
          name="start_time"
          value={formData.start_time}
          onChange={handleChange}
          required
          className="rounded-md bg-[#DDDCE3] px-3 py-2 text-gray-900 "
        />
      </div>

      {/* End Time */}
      <div className="flex flex-col">
        <label htmlFor="end_time" className="mb-1 font-medium text-gray-500">
          End Time
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

      {/* Session Name */}
      <div className="flex flex-col">
        <label
          htmlFor="session_name"
          className="mb-1 font-medium text-gray-500"
        >
          Session Name
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

      {/* Session Content */}
      <div className="flex flex-col">
        <label
          htmlFor="session_content"
          className="mb-1 font-medium text-gray-500"
        >
          Session Content
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

      {/* Group Dropdown */}
      <div className="flex flex-col mb-6">
        <label htmlFor="group_id" className="mb-1 font-medium text-gray-500">
          Assign to Group
        </label>
        <select
          name="group_id"
          id="group_id"
          value={formData.group_id}
          onChange={handleChange}
          required
          className="rounded-md bg-[#DDDCE3] px-3 py-2 text-gray-900 "
        >
          <option value="">-- Select a Group --</option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center justify-between">
        <SubmitButton />
        <button className="text-sm border px-4 py-1 flex items-center justify-center rounded-3xl font-semibold cursor-pointer hover:bg-gray-200">
          <Link href={"/instructor"}>Cancel</Link>
        </button>
      </div>

      {/* Client-side error */}
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      {/* Server-side error */}
      {sessionState?.success === false && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {sessionState.message}
        </p>
      )}
    </form>
  );
}
