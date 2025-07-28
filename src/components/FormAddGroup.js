"use client";

import { useState } from "react";
import { useActionState } from "react";
import SubmitButton from "./SubmitButton";
import { addGroup } from "@/lib/actions/adminAction";

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
    <div className="w-full h-dvh flex items-center justify-center">
      <div className="flex flex-col items-center justify-center p-5 bg-white border w-[431px] gap-5 rounded-lg ">
        <div className="text-center font-bold text-5xl">Create Group</div>

        <form action={formAction} className="space-y-3 w-full">
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

          <div className="flex flex-col">
            <label className="font-bold">Group Name</label>
            <input
              name="groupName"
              placeholder="Group name..."
              className="border rounded-lg p-1 pl-2"
              value={form.groupName}
              onChange={(e) => setForm({ ...form, groupName: e.target.value })}
            />
          </div>

          {/* Instructors */}
          <div className="flex flex-col">
            <label className="font-bold">Add Instructor</label>
            <div className="flex gap-2">
              <select
                className="border rounded-lg p-1 pl-2 w-full bg-[#252525] text-white"
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
                className="bg-blue-500 text-white px-3 rounded"
              >
                Add
              </button>
            </div>
            {form.instructors.length > 0 && (
              <div className="mt-2 flex gap-2 flex-wrap bg-[#252525] text-white p-2 rounded">
                {form.instructors.map((inst, index) => (
                  <div
                    key={inst.userId}
                    className="bg-gray-700 px-3 py-1 rounded text-sm whitespace-nowrap"
                  >
                    {index === 0 ? "Primary: " : "Secondary: "}
                    {inst.full_name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Students */}
          <div className="flex flex-col">
            <label className="font-bold">Add Student</label>
            <div className="flex gap-2">
              <select
                className="border rounded-lg p-1 pl-2 w-full bg-[#252525] text-white"
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
                className="bg-blue-500 text-white px-3 rounded"
              >
                Add
              </button>
            </div>
            {form.students.length > 0 && (
              <div className="mt-2 flex gap-2 flex-wrap bg-[#252525] text-white p-2 rounded">
                {form.students.map((stu) => (
                  <div
                    key={stu.userId}
                    className="bg-gray-700 px-3 py-1 rounded text-sm whitespace-nowrap"
                  >
                    Student: {stu.full_name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <SubmitButton title="Create Group" titleUpdating="Creating..." />

          {formState?.success && (
            <div className="text-green-600 font-semibold">
              Group created successfully!
            </div>
          )}
          {formState?.success === false && (
            <div className="text-red-600 font-semibold">
              Failed to create group.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default FormAddGroup;
