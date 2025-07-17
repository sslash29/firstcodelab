"use client";

import { addStudentToGroup } from "@/lib/actions/adminAction";
import { useActionState, useState, useRef, useEffect } from "react";
import SubmitButton from "./SubmitButton";

function AddStudent({ students = [], group }) {
  const [formState, addStudentAction] = useActionState(addStudentToGroup, {
    success: null,
    message: "",
  });

  const [showStudent, setShowStudent] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [studentForm, setStudentForm] = useState({ students: [] });

  const studentsInputRef = useRef(null);

  const handleAddStudent = () => {
    const student = students.find((s) => s.id === selectedStudent);
    if (student && !studentForm.students.some((s) => s.id === student.id)) {
      setStudentForm((prev) => ({
        students: [...prev.students, student],
      }));
      setSelectedStudent("");
    }
  };

  useEffect(() => {
    if (studentsInputRef.current) {
      studentsInputRef.current.value = JSON.stringify(
        studentForm.students.map((s) => ({ id: s.id }))
      );
    }
  }, [studentForm.students]);

  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md border border-zinc-300 dark:border-zinc-700 max-w-xl mx-auto">
      <form action={addStudentAction} className="flex flex-col gap-4">
        <input type="hidden" name="groupId" value={group.id} />
        <input
          ref={studentsInputRef}
          type="hidden"
          name="students"
          defaultValue="[]"
        />

        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
            Student Assignment
          </h2>
          <button
            type="button"
            onClick={() => setShowStudent((prev) => !prev)}
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md transition duration-200"
          >
            {showStudent ? "Cancel" : "Add Student"}
          </button>
        </div>

        {showStudent && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <select
              className="flex-1 px-3 py-2 border rounded-md bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
            >
              <option value="">Select a student</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.full_name}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={handleAddStudent}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition duration-200"
              disabled={!selectedStudent}
            >
              Add
            </button>
          </div>
        )}

        {studentForm.students.length > 0 && (
          <>
            <div>
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Assigned Students:
              </p>
              <div className="flex flex-wrap gap-2">
                {studentForm.students.map((student) => (
                  <span
                    key={student.id}
                    className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-white px-3 py-1 rounded-full text-sm font-medium shadow"
                  >
                    {student.full_name}
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

export default AddStudent;
