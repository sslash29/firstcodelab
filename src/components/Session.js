"use client";

import { useState } from "react";
import { useActionState } from "react";
import { FaChevronDown, FaChevronUp, FaEdit, FaSave } from "react-icons/fa";
import HomeworkForm from "./HomeworkForm";
import { updateSessionTime } from "@/lib/actions/instructorAction";

function Session({ session }) {
  const [openGroups, setOpenGroups] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [startTime, setStartTime] = useState(session.start_time);
  const [endTime, setEndTime] = useState(session.end_time);

  const [state, formAction, isPending] = useActionState(updateSessionTime, {
    success: false,
    message: "",
  });

  const toggleGroup = (groupId) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  return (
    <div className="bg-white border shadow rounded-2xl p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{session.name}</h2>
          <p className="text-sm text-gray-600 italic">{session.content}</p>
        </div>
        <button
          onClick={() => setIsEditing((prev) => !prev)}
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition"
        >
          <FaEdit className="text-base" />
          {isEditing ? "Cancel Edit" : "Edit Time"}
        </button>
      </div>

      {/* Time Display or Edit */}
      {!isEditing ? (
        <p className="text-sm text-gray-500">
          {new Date(session.start_time).toLocaleString()} –{" "}
          {new Date(session.end_time).toLocaleString()}
        </p>
      ) : (
        <form
          action={formAction}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <input type="hidden" name="session_id" value={session.id} />

          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Start Time</label>
            <input
              type="datetime-local"
              name="start_time"
              value={startTime.slice(0, 16)}
              onChange={(e) => setStartTime(e.target.value)}
              className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">End Time</label>
            <input
              type="datetime-local"
              name="end_time"
              value={endTime.slice(0, 16)}
              onChange={(e) => setEndTime(e.target.value)}
              className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={isPending}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              <FaSave />
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>

          {state.message && (
            <div className="md:col-span-3 text-sm italic mt-1">
              <p
                className={`${
                  state.success ? "text-green-600" : "text-red-600"
                }`}
              >
                {state.message}
              </p>
            </div>
          )}
        </form>
      )}

      {/* Group List */}
      <div className="space-y-2">
        {session.groups.map((group) => {
          const assignments = group.group_assignment || [];
          const isOpen = openGroups[group.id];

          return (
            <div key={group.id} className="border-t pt-3">
              <button
                onClick={() => toggleGroup(group.id)}
                className="flex items-center gap-2 text-blue-700 font-medium hover:underline focus:outline-none"
              >
                <span>{group.name}</span>
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>

              {isOpen && (
                <ul className="mt-2 pl-5 list-disc text-sm text-gray-700 space-y-1">
                  {assignments.filter((a) => a.student).length > 0 ? (
                    assignments
                      .filter((a) => a.student)
                      .map((assignment) => (
                        <li key={assignment.id}>
                          {assignment.student.full_name ||
                            assignment.student.email}
                        </li>
                      ))
                  ) : (
                    <li className="text-gray-400 italic">
                      No students assigned
                    </li>
                  )}
                </ul>
              )}

              <div className="mt-3">
                <HomeworkForm groupId={group.id} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Session;
