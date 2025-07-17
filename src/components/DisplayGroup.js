"use client";

import {
  deleteGroup,
  deleteInstructorFromGroup,
  deleteStudentFromGroup,
} from "@/lib/actions/adminAction";
import { useActionState, useOptimistic } from "react";
import AddStudent from "./AddStudent";
import AddInstructor from "./AddInstructor";
import SubmitButton from "./SubmitButton";

export default function DisplayGroup({
  group,
  instructors = [],
  students = [],
}) {
  const [deleteGroupState, deleteGroupAction] = useActionState(deleteGroup, {});

  const [optimisticAssignments, setOptimisticAssignments] = useOptimistic(
    group.group_assignment,
    (assignments, { type, id }) => {
      console.log(type, assignments);
      if (type === "instructor") {
        return assignments.filter((a) => a.instructor?.id !== id);
      } else if (type === "student") {
        return assignments.filter((a) => a.student?.id !== id);
      }
      return assignments;
    }
  );

  // Instructor delete action with optimistic update
  const [deleteInstructorState, deleteInstructorAction] = useActionState(
    async (_prev, formData) => {
      const instructorId = formData.get("instructorId");
      const res = await deleteInstructorFromGroup(null, formData);
      console.log(res);
      if (res?.success) {
        setOptimisticAssignments({ type: "instructor", id: instructorId });
        console.log(instructorId);
      }
      return res;
    },
    { message: "", success: null }
  );

  // Student delete action with optimistic update
  const [deleteStudentState, deleteStudentAction] = useActionState(
    async (_prev, formData) => {
      const studentId = formData.get("studentId");
      const res = await deleteStudentFromGroup(null, formData);
      if (res?.success) {
        setOptimisticAssignments({ type: "student", id: studentId });
        console.log(typeof studentId);
      }
      return res;
    },
    { message: "", success: null }
  );

  if (!group || !Array.isArray(group.group_assignment)) {
    return (
      <div className="p-4 bg-red-100 text-red-600 rounded-lg">
        Invalid group data.
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-xl mx-auto mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Group: {group.name}
      </h2>

      <div className="space-y-3">
        {optimisticAssignments.length === 0 ? (
          <p className="text-gray-500">No assignments yet.</p>
        ) : (
          optimisticAssignments.map((assignment, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between"
            >
              {assignment.instructor ? (
                <form
                  action={deleteInstructorAction}
                  className="flex items-center gap-4 w-full justify-between"
                >
                  <input type="hidden" name="groupId" value={group.id} />
                  <input
                    type="hidden"
                    name="instructorId"
                    value={assignment.instructor.id}
                  />
                  <div className="font-medium text-gray-700">
                    Instructor: {assignment.instructor.full_name}
                  </div>
                  <SubmitButton
                    title="Delete"
                    titleUpdating="Deleting..."
                    variant="destructive"
                  />
                </form>
              ) : assignment.student ? (
                <form
                  action={deleteStudentAction}
                  className="flex items-center gap-4 w-full justify-between"
                >
                  <input type="hidden" name="groupId" value={group.id} />
                  <input
                    type="hidden"
                    name="studentId"
                    value={assignment.student.id}
                  />
                  <div className="font-medium text-gray-700">
                    Student: {assignment.student.full_name}
                  </div>
                  <SubmitButton
                    title="Delete"
                    titleUpdating="Deleting..."
                    variant="destructive"
                  />
                </form>
              ) : (
                <span className="text-gray-500">Unassigned</span>
              )}
            </div>
          ))
        )}
      </div>

      {(deleteInstructorState.message || deleteStudentState.message) && (
        <p
          className={`mt-2 text-sm ${
            deleteInstructorState.success || deleteStudentState.success
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {deleteInstructorState.message || deleteStudentState.message}
        </p>
      )}

      <form action={deleteGroupAction} className="mt-6">
        <input type="hidden" name="groupId" value={group.id} />
        <SubmitButton
          title="Delete Group"
          titleUpdating="Deleting..."
          variant="destructive"
        />
        {deleteGroupState?.message && (
          <p
            className={`mt-2 text-sm ${
              deleteGroupState.success ? "text-green-600" : "text-red-600"
            }`}
          >
            {deleteGroupState.message}
          </p>
        )}
      </form>

      <div className="mt-8">
        <AddInstructor instructors={instructors} group={group} />
      </div>
      <div className="mt-4">
        <AddStudent students={students} group={group} />
      </div>
    </div>
  );
}
