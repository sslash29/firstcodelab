import { supabase } from "./supabase";

async function fetchTable(tableName) {
  const { data, error } = await supabase.from(tableName).select("*");
  if (error) {
    console.error(`Error fetching from ${tableName}:`, error.message);
    return [];
  }
  return data;
}

export async function getUsers() {
  const admins = await fetchTable("admin");
  const instructors = await fetchTable("instructor");
  const students = await fetchTable("student");

  return { admins, instructors, students };
}
