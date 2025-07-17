"use client";

import { submitHomeworkAction } from "@/lib/actions/studentAction";
import { useActionState } from "react";

function DisplayStudentHomework({ data }) {
  const [state, formAction, isPending] = useActionState(submitHomeworkAction, {
    success: false,
    message: "",
  });

  return (
    <div className="space-y-6">
      {data.map((assignment) => {
        const hw = assignment.homework;
        const id = assignment.id;

        return (
          <form
            key={id}
            action={formAction}
            className="border rounded-xl p-4 shadow space-y-3 bg-white"
          >
            <input type="hidden" name="assignment_id" value={id} />

            <div className="text-lg font-semibold text-gray-800">
              {hw.title}
            </div>
            <div className="text-sm text-gray-600 italic">{hw.description}</div>
            <div className="text-sm text-gray-500">
              Due: {new Date(hw.due_date).toLocaleString()}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Submission Text
              </label>
              <textarea
                name="submission_text"
                rows={3}
                className="mt-1 block w-full border px-3 py-2 rounded-md"
                defaultValue={assignment.submission_text || ""}
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
              />
            </div>

            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={isPending}
            >
              {isPending ? "Submitting..." : "Submit"}
            </button>

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
