"use server";

import { supabase } from "../supabase";
import bcrypt from "bcrypt";

async function addUser(prevState, queryData) {
  const fullName = queryData.get("fullName");
  const userId = queryData.get("userId");
  const password = queryData.get("password");
  const phone = queryData.get("phone");
  const role = queryData.get("role");

  const hashedUserId = await bcrypt.hash(userId, 12);
  const hashedPassword = await bcrypt.hash(password, 12);

  const { error } = await supabase.from(role).insert({
    userId: hashedUserId,
    password: hashedPassword,
    full_name: fullName,
    role,
    ...(role !== "admin" && { phone_number: phone }),
  });

  if (error) {
    console.error("Insert Error:", error);
    return {
      success: false,
      message: error.message || "Unknown error",
    };
  }

  return {
    success: true,
    message: "User added successfully",
  };
}

async function updateUser(prevState, queryData) {
  const fullName = queryData.get("fullName");
  const phone = queryData.get("phone");
  const originalUserId = queryData.get("originalUserId");
  const role = queryData.get("role");

  // Original values as fallbacks
  const originalFullName = queryData.get("originalFullName");
  const originalPhone = queryData.get("originalPhone");

  const { error } = await supabase
    .from(role)
    .update({
      full_name: fullName || originalFullName,
      phone_number: phone || originalPhone,
    })
    .eq("userId", originalUserId);

  if (error) {
    console.error("Update Error:", error);
    return {
      success: false,
      message: error.message || "Unknown error",
    };
  }

  return {
    success: true,
    message: "User updated successfully",
  };
}
async function deleteUser(prevState, queryData) {
  const userId = queryData.get("userId");
  const role = queryData.get("role");

  if (role === "main-admin")
    return {
      success: false,
      message: "Can't delete main admin",
    };

  const { error } = await supabase.from(role).delete().eq("userId", userId);

  if (error) {
    console.error("Delete Error:", error);
    return {
      success: false,
      message: error.message || "Unknown error",
    };
  }

  return {
    success: true,
    message: "User deleted successfully",
  };
}

async function addGroup(prevState, formData) {
  const groupName = formData.get("groupName");
  const adminId = formData.get("adminId");

  const instructors = JSON.parse(formData.get("instructors") || "[]");
  const students = JSON.parse(formData.get("students") || "[]");

  const { data: groupData, error: groupError } = await supabase
    .from("group")
    .insert({ name: groupName, admin_id: adminId })
    .select("id")
    .single();

  if (groupError || !groupData) {
    console.error("Group Insert Error:", groupError);
    return {
      success: false,
      message: groupError?.message || "Failed to create group",
    };
  }

  const groupId = groupData.id;

  const assignments = [];

  instructors.forEach((instructor) => {
    assignments.push({
      instructor_id: instructor.id,
      group_id: groupId,
    });
  });

  students.forEach((student) => {
    assignments.push({
      student_id: student.id,
      group_id: groupId,
    });
  });

  const { error: assignmentError } = await supabase
    .from("group_assignment")
    .insert(assignments);

  if (assignmentError) {
    console.error("Assignment Insert Error:", assignmentError);
    return {
      success: false,
      message: assignmentError.message || "Failed to assign users to group",
    };
  }

  return {
    success: true,
    message: "Group created and users assigned successfully",
  };
}

async function deleteGroup(prevState, formData) {
  const groupId = formData.get("groupId");

  // Delete group assignments first
  const { error: assignmentError } = await supabase
    .from("group_assignment")
    .delete()
    .eq("group_id", groupId);

  if (assignmentError) {
    console.error("Assignment Deletion Error:", assignmentError);
    return {
      success: false,
      message: "Failed to delete group assignments.",
    };
  }

  // Then delete the group itself
  const { error: groupError } = await supabase
    .from("group")
    .delete()
    .eq("id", groupId);

  if (groupError) {
    console.error("Group Deletion Error:", groupError);
    return {
      success: false,
      message: "Failed to delete group.",
    };
  }

  return {
    success: true,
    message: "Group deleted successfully.",
  };
}

async function addInstructorToGroup(prevState, formData) {
  const groupId = formData.get("groupId");
  const instructorsJSON = formData.get("instructors");

  if (!groupId || !instructorsJSON) {
    return {
      success: false,
      message: "Missing group or instructors",
    };
  }

  let instructors;
  try {
    instructors = JSON.parse(instructorsJSON);
  } catch (e) {
    return {
      success: false,
      message: "Invalid instructor data",
    };
  }

  if (!Array.isArray(instructors) || instructors.length === 0) {
    return {
      success: false,
      message: "No instructors to assign",
    };
  }

  // 1. Get already assigned instructors for this group
  const { data: existingAssignments, error: fetchError } = await supabase
    .from("group_assignment")
    .select("instructor_id")
    .eq("group_id", groupId)
    .not("instructor_id", "is", null); // exclude nulls

  if (fetchError) {
    console.error("Fetch Error:", fetchError);
    return {
      success: false,
      message: "Failed to check existing assignments",
    };
  }

  const existingIds = existingAssignments.map((row) => row.instructor_id);

  // 2. Filter out already assigned instructors
  const newInstructors = instructors.filter(
    (inst) => !existingIds.includes(inst.id)
  );

  if (newInstructors.length === 0) {
    return {
      success: false,
      message: "All selected instructors are already assigned to this group",
    };
  }

  // 3. Insert only new instructors
  const records = newInstructors.map((inst) => ({
    group_id: groupId,
    instructor_id: inst.id,
  }));

  const { error: insertError } = await supabase
    .from("group_assignment")
    .insert(records);

  if (insertError) {
    console.error("Insert Error:", insertError);
    return {
      success: false,
      message: insertError.message || "Failed to assign instructors",
    };
  }

  return {
    success: true,
    message: "Instructors added successfully",
  };
}

async function addStudentToGroup(prevState, formData) {
  const groupId = formData.get("groupId");
  const studentsJSON = formData.get("students");

  if (!groupId || !studentsJSON) {
    return {
      success: false,
      message: "Missing group ID or students list.",
    };
  }

  let students;

  try {
    students = JSON.parse(studentsJSON);
  } catch (error) {
    console.error("Failed to parse students:", error);
    return {
      success: false,
      message: "Invalid student data format.",
    };
  }

  if (!Array.isArray(students) || students.length === 0) {
    return {
      success: false,
      message: "No students selected.",
    };
  }

  // Check for duplicates before inserting
  const { data: existingAssignments, error: fetchError } = await supabase
    .from("group_assignment")
    .select("student_id")
    .eq("group_id", groupId);

  if (fetchError) {
    console.error("Fetch existing student assignments error:", fetchError);
    return {
      success: false,
      message: "Failed to check existing assignments.",
    };
  }

  const existingIds = existingAssignments.map((row) => row.student_id);

  const newAssignments = students
    .filter((student) => !existingIds.includes(student.id))
    .map((student) => ({
      group_id: groupId,
      student_id: student.id,
    }));

  if (newAssignments.length === 0) {
    return {
      success: false,
      message: "All selected students are already in the group.",
    };
  }

  const { error: insertError } = await supabase
    .from("group_assignment")
    .insert(newAssignments);

  if (insertError) {
    console.error("Insert Error:", insertError);
    return {
      success: false,
      message: "Failed to add students to the group.",
    };
  }

  return {
    success: true,
    message: "Students successfully added to the group.",
  };
}

async function deleteInstructorFromGroup(prevState, formData) {
  const groupId = formData.get("groupId");
  const instructorId = formData.get("instructorId");

  if (!groupId || !instructorId) {
    return {
      success: false,
      message: "Missing instructor or group ID.",
    };
  }

  const { error } = await supabase
    .from("group_assignment") // use your actual table name
    .delete()
    .match({
      group_id: groupId,
      instructor_id: instructorId,
    });

  if (error) {
    return {
      success: false,
      message: error.message || "Failed to delete instructor.",
    };
  }

  return {
    success: true,
    message: "Instructor removed from group.",
  };
}

async function deleteStudentFromGroup(_prevState, formData) {
  const groupId = formData.get("groupId");
  const studentId = formData.get("studentId");

  if (!groupId || !studentId) {
    return { success: false, message: "Missing IDs" };
  }

  const { error } = await supabase
    .from("group_assignment")
    .delete()
    .eq("group_id", groupId)
    .eq("student_id", studentId);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: "Student removed from group." };
}

export {
  addUser,
  updateUser,
  deleteUser,
  addGroup,
  deleteGroup,
  addInstructorToGroup,
  addStudentToGroup,
  deleteInstructorFromGroup,
  deleteStudentFromGroup,
};
