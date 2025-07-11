import { supabase } from "./supabase";

async function fetchTable(tableName) {
  const { data, error } = await supabase.from(tableName).select("*");
  if (error) {
    console.error(`Error fetching from ${tableName}:`, error.message);
    return [];
  }
  return data;
}

async function getUsers() {
  const admins = await fetchTable("admin");
  const instructors = await fetchTable("instructor");
  const students = await fetchTable("student");

  return { admins, instructors, students };
}

async function getGroups() {
  const { data: groups, error: groupError } = await supabase.from("group")
    .select(`
    id,
    name,
    group_assignment (
      id,
      student_id,
      instructor_id
    )
  `);

  if (groupError) {
    console.error("Error fetching groups:", groupError.message);
    return [];
  }

  // Fetch lookup tables
  const students = await fetchTable("student");
  const instructors = await fetchTable("instructor");

  // Create lookup maps for faster access
  const studentMap = Object.fromEntries(students.map((s) => [s.id, s]));
  const instructorMap = Object.fromEntries(instructors.map((i) => [i.id, i]));

  // Enrich group_assignment with student/instructor info
  const enrichedGroups = groups.map((group) => ({
    ...group,
    group_assignment: group.group_assignment.map((assignment) => ({
      ...assignment,
      student: assignment.student_id ? studentMap[assignment.student_id] : null,
      instructor: assignment.instructor_id
        ? instructorMap[assignment.instructor_id]
        : null,
    })),
  }));

  return enrichedGroups;
}

export { getUsers, getGroups };
