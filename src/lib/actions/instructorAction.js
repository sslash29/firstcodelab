"use server";

import { supabase } from "../supabase";

async function createSession(prevState, formData) {
  const startTime = formData.get("start_time");
  const endTime = formData.get("end_time");
  const sessionName = formData.get("session_name");
  const sessionContent = formData.get("session_content");
  const instructorId = formData.get("instructor_id");
  const groupId = formData.get("group_id");

  // Step 1: Insert session
  const { data: sessionData, error: sessionError } = await supabase
    .from("session")
    .insert({
      start_time: startTime,
      end_time: endTime,
      name: sessionName,
      content: sessionContent,
      instructor_id: instructorId,
    })
    .select() // so we can get session ID
    .single();

  if (sessionError) {
    return {
      success: false,
      message: sessionError.message || "Failed to create session.",
    };
  }

  const sessionId = sessionData.id;

  // Step 2: Get students in that group
  const { data: groupAssignments, error: assignmentError } = await supabase
    .from("group_assignment")
    .select("student_id")
    .eq("group_id", groupId);

  if (assignmentError) {
    return {
      success: false,
      message: assignmentError.message || "Failed to fetch group assignments.",
    };
  }

  const studentIds = groupAssignments
    .map((assignment) => assignment.student_id)
    .filter(Boolean);

  // Step 3: Insert into session_assignment
  if (studentIds.length > 0) {
    const inserts = studentIds.map((student_id) => ({
      session_id: sessionId,
      student_id,
      group_id: groupId,
    }));

    const { error: insertError } = await supabase
      .from("session_assingment")
      .insert(inserts);

    if (insertError) {
      return {
        success: false,
        message: insertError.message || "Failed to assign students to session.",
      };
    }
  }

  return {
    success: true,
    message: "Session created and students assigned successfully.",
  };
}

async function createHomework(prevState, formData) {
  const endTime = formData.get("end_time");
  const name = formData.get("session_name");
  const content = formData.get("session_content");
  const groupId = formData.get("group_id");
  const instructorId = formData.get("instructor_id");

  // Step 1: Insert the homework (without group_id)
  const { data: homeworkData, error: homeworkError } = await supabase
    .from("homework")
    .insert({
      due_date: endTime,
      title: name,
      description: content,
      instructor_id: instructorId,
    })
    .select()
    .single();

  if (homeworkError) {
    return {
      success: false,
      message: homeworkError.message || "Failed to create homework.",
    };
  }

  const homeworkId = homeworkData.id;

  // Step 2: Get all student_ids assigned to that group
  const { data: assignments, error: fetchError } = await supabase
    .from("group_assignment")
    .select("student_id")
    .eq("group_id", groupId);

  if (fetchError) {
    return {
      success: false,
      message: fetchError.message || "Failed to fetch group assignments.",
    };
  }

  const studentIds = assignments
    .map((assignment) => assignment.student_id)
    .filter(Boolean);

  // Step 3: Insert into homework_assignment
  if (studentIds.length > 0) {
    const inserts = studentIds.map((student_id) => ({
      homework_id: homeworkId,
      student_id,
      group_id: groupId,
    }));

    const { error: insertError } = await supabase
      .from("homework_assignment")
      .insert(inserts);

    if (insertError) {
      return {
        success: false,
        message:
          insertError.message || "Failed to assign students to homework.",
      };
    }
  }

  return {
    success: true,
    message: "Homework created and assigned successfully.",
  };
}

async function updateSessionTime(prevState, formData) {
  const sessionId = formData.get("session_id");
  const startTime = formData.get("start_time");
  const endTime = formData.get("end_time");

  const { error } = await supabase
    .from("session")
    .update({
      start_time: startTime,
      end_time: endTime,
    })
    .eq("id", sessionId);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: "Session updated successfully." };
}

async function rateStudent(prevState, formData) {
  const userId = formData.get("userId");

  const participation = Number(formData.get("participation"));
  const submission = Number(formData.get("submission"));
  const punctuality = Number(formData.get("punctuality"));
  const rating = { participation, submission, punctuality };

  const { data, error } = await supabase
    .from("student")
    .update({ rating })
    .eq("id", userId);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: "Student rated successfully." };
}

export { createSession, createHomework, updateSessionTime, rateStudent };
