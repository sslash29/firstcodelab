"use client";

import { addInstructorToGroup } from "@/lib/actions/adminAction";
import { useActionState, useEffect, useRef, useState } from "react";
import SubmitButton from "./SubmitButton";

function AddInstructor({ instructors = [], group }) {
  const [formState, addInstructorAction] = useActionState(
    addInstructorToGroup,
    {
      success: null,
      message: "",
    }
  );

  const [showInstructor, setShowInstructor] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [instructorForm, setInstructorForm] = useState({ instructors: [] });

  const instructorsInputRef = useRef(null);

  const handleAddInstructor = () => {
    const instructor = instructors.find((i) => i.id === selectedInstructor);
    if (
      instructor &&
      !instructorForm.instructors.some((i) => i.id === instructor.id)
    ) {
      setInstructorForm((prev) => ({
        instructors: [...prev.instructors, instructor],
      }));
      setSelectedInstructor("");
    }
  };

  const handleCancel = () => {
    setShowInstructor(false);
    setSelectedInstructor("");
    setInstructorForm({ instructors: [] });
  };

  useEffect(() => {
    if (instructorsInputRef.current) {
      instructorsInputRef.current.value = JSON.stringify(
        instructorForm.instructors.map((i) => ({ id: i.id }))
      );
    }
  }, [instructorForm.instructors]);

  return (
    <div className="bg-white px-4 py-2 text-xs rounded-xl dark max-w-xl mx-auto">
      <form action={addInstructorAction} className="flex flex-col gap-4">
        <input type="hidden" name="groupId" value={group.id} />
        <input
          ref={instructorsInputRef}
          type="hidden"
          name="instructors"
          defaultValue="[]"
        />

        <div className="flex justify-between items-center w-fit">
          <button
            type="button"
            onClick={
              showInstructor ? handleCancel : () => setShowInstructor(true)
            }
            className="border hover:bg-blue-500 hover:text-white text-black font-medium px-4 py-2 rounded-md transition duration-200"
          >
            {showInstructor ? "Cancel" : "Add Instructor"}
          </button>
        </div>

        {showInstructor && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <select
              className="flex-1 px-3 py-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={selectedInstructor}
              onChange={(e) => setSelectedInstructor(e.target.value)}
            >
              <option value="">Select an instructor</option>
              {instructors.map((inst) => (
                <option key={inst.id} value={inst.id}>
                  {inst.full_name}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={handleAddInstructor}
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md transition duration-200 cursor-pointer"
              disabled={!selectedInstructor}
            >
              Add
            </button>
          </div>
        )}

        {showInstructor && instructorForm.instructors.length > 0 && (
          <>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">
                Assigned Instructors:
              </p>
              <div className="flex flex-wrap gap-2">
                {instructorForm.instructors.map((inst, index) => (
                  <span
                    key={inst.id}
                    className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-white px-3 py-1 rounded-full text-sm font-medium shadow"
                  >
                    {index === 0 ? "Primary: " : "Secondary: "} {inst.full_name}
                  </span>
                ))}
              </div>
            </div>

            <SubmitButton
              title="Add to group"
              titleUpdating="Adding to group..."
            />
          </>
        )}

        {formState.message && (
          <p
            className={`text-sm mt-2 font-medium ${
              formState.success ? "text-green-600" : "text-red-500"
            }`}
          >
            {formState.message}
          </p>
        )}
      </form>
    </div>
  );
}

export default AddInstructor;
