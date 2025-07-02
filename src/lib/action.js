"use server";
import { supabase } from "./supabase";

async function addUser(prevState, queryData) {
  const fullName = queryData.get("fullName");
  const userId = queryData.get("userId");
  const password = queryData.get("password");
  const phone = queryData.get("phone");
  const role = queryData.get("role");

  const { error } = await supabase.from(role).insert({
    userId,
    password,
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
  const userId = queryData.get("userId");
  const password = queryData.get("password");
  const phone = queryData.get("phone");
  const originalUserId = queryData.get("originalUserId");
  const role = queryData.get("role");

  // Original values as fallbacks
  const originalFullName = queryData.get("originalFullName");
  const originalPassword = queryData.get("originalPassword");
  const originalPhone = queryData.get("originalPhone");

  const { error } = await supabase
    .from(role)
    .update({
      userId: userId || originalUserId,
      full_name: fullName || originalFullName,
      password: password || originalPassword,
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

export { addUser, updateUser, deleteUser };
