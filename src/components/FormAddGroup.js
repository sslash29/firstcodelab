"use client";

import { useState } from "react";
import SubmitButton from "./SubmitButton";
import { useActionState } from "react";
import { addGroup } from "@/lib/action";

function FormAddGroup({ instructors = [], students = [] }) {
  const [form, setForm] = useState({
    groupName: "",
    instructors: [],
    students: [],
  });

  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");

  const [formState, formAction] = useActionState(addGroup, {});

  const handleAddInstructor = () => {
    const instructor = instructors.find((i) => i.userId === selectedInstructor);
    if (
      instructor &&
      !form.instructors.some((i) => i.userId === instructor.userId)
    ) {
      setForm((prev) => ({
        ...prev,
        instructors: [...prev.instructors, instructor],
      }));
    }
  };

  const handleAddStudent = () => {
    const student = students.find((s) => s.userId === selectedStudent);
    if (student && !form.students.some((s) => s.userId === student.userId)) {
      setForm((prev) => ({
        ...prev,
        students: [...prev.students, student],
      }));
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <form action={formAction} className="space-y-4">
        <input
          type="hidden"
          name="adminId"
          value="e980c315-d446-4c20-9a6c-e316f4024ecd"
        />
        <input
          type="hidden"
          name="instructors"
          value={JSON.stringify(form.instructors)}
        />
        <input
          type="hidden"
          name="students"
          value={JSON.stringify(form.students)}
        />

        <input
          name="groupName"
          placeholder="Group name"
          value={form.groupName}
          onChange={(e) => setForm({ ...form, groupName: e.target.value })}
          className="w-full p-2 border rounded"
        />

        {/* Instructors */}
        <div>
          <label className="block mb-1 font-medium">Add Instructor</label>
          <div className="flex gap-2">
            <select
              className="p-2 border rounded w-full bg-black text-white"
              value={selectedInstructor}
              onChange={(e) => setSelectedInstructor(e.target.value)}
            >
              <option value="">Select an instructor</option>
              {instructors.map((inst) => (
                <option key={inst.userId} value={inst.userId}>
                  {inst.full_name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleAddInstructor}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add
            </button>
          </div>

          {form.instructors.length > 0 && (
            <div className="mt-3 flex gap-2 overflow-x-auto p-2 bg-black text-white rounded">
              {form.instructors.map((inst, index) => (
                <div
                  key={inst.userId}
                  className="bg-gray-600 shadow px-3 py-1 rounded text-sm whitespace-nowrap"
                >
                  {index === 0 ? "Primary: " : "Secondary: "} {inst.full_name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Students */}
        <div>
          <label className="block mb-1 font-medium">Add Student</label>
          <div className="flex gap-2">
            <select
              className="p-2 border rounded w-full bg-black text-white"
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
            >
              <option value="">Select a student</option>
              {students.map((stu) => (
                <option key={stu.userId} value={stu.userId}>
                  {stu.full_name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleAddStudent}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add
            </button>
          </div>

          {form.students.length > 0 && (
            <div className="mt-3 flex gap-2 overflow-x-auto p-2 bg-black text-white rounded">
              {form.students.map((stu) => (
                <div
                  key={stu.userId}
                  className="bg-gray-600 shadow px-3 py-1 rounded text-sm whitespace-nowrap"
                >
                  Student: {stu.full_name}
                </div>
              ))}
            </div>
          )}
        </div>

        <SubmitButton title="Create Group" titleUpdating="Creating..." />

        {/* Feedback messages */}
        {formState?.success && (
          <p className="text-green-500 mt-2">Group created successfully!</p>
        )}
        {formState?.success === false && (
          <p className="text-red-500 mt-2">{formState.message}</p>
        )}
      </form>
    </div>
  );
}

export default FormAddGroup;
