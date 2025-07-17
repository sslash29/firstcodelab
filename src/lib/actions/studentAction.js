"use server";

import { supabase } from "../supabase";

async function submitHomeworkAction(prevState, formData) {
  const assignmentId = formData.get("assignment_id");
  const submissionText = formData.get("submission_text");
  const file = formData.get("submission_file");

  const updates = {
    submission_text: submissionText,
    submitted_at: new Date().toISOString(),
  };

  if (file && typeof file === "object" && "name" in file) {
    const fileName = `${assignmentId}-${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("homework-submissions")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      return { success: false, message: uploadError.message };
    }

    updates.submission_file = uploadData.path;
  }

  const { error } = await supabase
    .from("homework_assignment")
    .update(updates)
    .eq("id", assignmentId);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: "Homework submitted successfully!" };
}

async function rateInstructor(prevState, formData) {
  const userId = formData.get("userId");
  const explanation = Number(formData.get("explanation"));
  const homework = Number(formData.get("homework"));
  const attention = Number(formData.get("attention"));

  const rating = { explanation, homework, attention };
  const { data, error } = await supabase
    .from("instructor")
    .update({ rating })
    .eq("id", userId);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: "Instructor rated successfully." };
}

export { submitHomeworkAction, rateInstructor };
