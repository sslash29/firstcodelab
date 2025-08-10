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
import { motion } from "motion/react";

export default function DisplayGroup({
  group,
  instructors = [],
  students = [],
}) {
  const [deleteGroupState, deleteGroupAction] = useActionState(deleteGroup, {});

  const [optimisticAssignments, setOptimisticAssignments] = useOptimistic(
    group.group_assignment,
    (assignments, { type, id }) => {
      if (type === "instructor") {
        return assignments.filter((a) => a.instructor?.id !== id);
      } else if (type === "student") {
        return assignments.filter((a) => a.student?.id !== id);
      }
      return assignments;
    }
  );

  const [deleteInstructorState, deleteInstructorAction] = useActionState(
    async (_prev, formData) => {
      const instructorId = formData.get("instructorId");
      const res = await deleteInstructorFromGroup(null, formData);
      if (res?.success) {
        setOptimisticAssignments({ type: "instructor", id: instructorId });
      }
      return res;
    },
    { message: "", success: null }
  );

  const [deleteStudentState, deleteStudentAction] = useActionState(
    async (_prev, formData) => {
      const studentId = formData.get("studentId");
      const res = await deleteStudentFromGroup(null, formData);
      if (res?.success) {
        setOptimisticAssignments({ type: "student", id: studentId });
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

  const instructorsList = optimisticAssignments.filter((a) => a.instructor);
  const studentsList = optimisticAssignments.filter((a) => a.student);

  return (
    <div className="mt-6 h-auto w-full rounded-2xl border bg-white p-6 shadow-md sm:h-[350px] sm:w-[380px] max-sm:w-fit">
      <div className="mb-6 flex w-full flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-black font-bold text-white">
            <p className="mb-1 text-2xl">{group.name[0]}</p>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{group.name}</h2>
        </div>
        <form action={deleteGroupAction}>
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
      </div>

      <div className="flex flex-col gap-6 sm:flex-row">
        {/* Instructors */}
        <div className="w-full sm:w-1/2">
          <h3 className="mb-2 text-xl font-semibold text-gray-700">
            Instructors
          </h3>
          <div className="h-[90px] space-y-3 overflow-y-auto pr-1 scrollbar-thin">
            {instructorsList.length === 0 ? (
              <p className="text-gray-500">No instructors assigned.</p>
            ) : (
              instructorsList.map((assignment, index) => (
                <form
                  key={index}
                  action={deleteInstructorAction}
                  className="group flex w-fit items-center justify-between gap-2 rounded-xl p-4"
                >
                  <input type="hidden" name="groupId" value={group.id} />
                  <input
                    type="hidden"
                    name="instructorId"
                    value={assignment.instructor.id}
                  />
                  <div className="font-medium text-gray-700">
                    {assignment.instructor.full_name}
                  </div>
                  <motion.div
                    className="hidden group-hover:block"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                  >
                    <SubmitButton
                      title="Delete User"
                      titleUpdating="Deleting..."
                      variant="destructive"
                    />
                  </motion.div>
                </form>
              ))
            )}
          </div>
          <div className="mt-4">
            <AddInstructor instructors={instructors} group={group} />
          </div>
        </div>

        {/* Students */}
        <div className="w-full sm:w-1/2">
          <h3 className="mb-2 text-xl font-semibold text-gray-700">Students</h3>
          <div className="h-[90px] space-y-3 overflow-y-auto pr-1 scrollbar-thin">
            {studentsList.length === 0 ? (
              <p className="text-gray-500">No students assigned.</p>
            ) : (
              studentsList.map((assignment, index) => (
                <form
                  key={index}
                  action={deleteStudentAction}
                  className="group flex w-fit items-center justify-between gap-2 rounded-xl p-4"
                >
                  <input type="hidden" name="groupId" value={group.id} />
                  <input
                    type="hidden"
                    name="studentId"
                    value={assignment.student.id}
                  />
                  <div className="font-medium text-gray-700">
                    {assignment.student.full_name}
                  </div>
                  <motion.div
                    className="hidden group-hover:block"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                  >
                    <SubmitButton
                      title="Delete User"
                      titleUpdating="Deleting..."
                      variant="destructive"
                    />
                  </motion.div>
                </form>
              ))
            )}
          </div>
          <div className="mt-4">
            <AddStudent students={students} group={group} />
          </div>
        </div>
      </div>

      {(deleteInstructorState.message || deleteStudentState.message) && (
        <p
          className={`mt-4 text-sm ${
            deleteInstructorState.success || deleteStudentState.success
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {deleteInstructorState.message || deleteStudentState.message}
        </p>
      )}
    </div>
  );
}
