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

async function getInstructorSessionsWithGroups(instructorId) {
  // 1. Get sessions by instructor
  const { data: sessions, error: sessionError } = await supabase
    .from("session")
    .select("*")
    .eq("instructor_id", instructorId);

  if (sessionError) {
    console.error("Error fetching sessions:", sessionError.message);
    return [];
  }

  if (!sessions.length) return [];

  // 2. Get all session_assignments for these sessions
  const sessionIds = sessions.map((s) => s.id);

  const { data: sessionAssignments, error: assignmentError } = await supabase
    .from("session_assingment")
    .select("*")
    .in("session_id", sessionIds);

  if (assignmentError) {
    console.error(
      "Error fetching session assignments:",
      assignmentError.message
    );
    return [];
  }

  // 3. Get related groups and students
  const groupIds = [...new Set(sessionAssignments.map((a) => a.group_id))];
  const studentIds = [...new Set(sessionAssignments.map((a) => a.student_id))];

  const [groups, groupAssignments, students] = await Promise.all([
    supabase.from("group").select("*").in("id", groupIds),
    supabase.from("group_assignment").select("*").in("group_id", groupIds),
    supabase.from("student").select("*").in("id", studentIds),
  ]);

  const groupMap = Object.fromEntries(
    (groups.data || []).map((g) => [g.id, g])
  );
  const studentMap = Object.fromEntries(
    (students.data || []).map((s) => [s.id, s])
  );

  const groupedAssignments = {};
  for (const ga of groupAssignments.data || []) {
    if (!groupedAssignments[ga.group_id]) groupedAssignments[ga.group_id] = [];
    groupedAssignments[ga.group_id].push({
      ...ga,
      student: studentMap[ga.student_id] || null,
    });
  }

  // 4. Build enriched session list
  const enrichedSessions = sessions.map((session) => {
    const assignments = sessionAssignments.filter(
      (a) => a.session_id === session.id
    );

    const linkedGroups = assignments.map((a) => {
      const group = groupMap[a.group_id];
      return {
        id: group.id,
        name: group.name,
        group_assignment: groupedAssignments[group.id] || [],
      };
    });

    return {
      ...session,
      groups: linkedGroups,
    };
  });

  return enrichedSessions;
}

async function getStudentSession(studentId) {
  // Step 1: Get session assignments
  const { data: assignments, error: assignmentError } = await supabase
    .from("session_assingment")
    .select("session_id")
    .eq("student_id", studentId);

  if (assignmentError) {
    throw new Error(assignmentError.message);
  }

  const sessionIds = assignments.map((a) => a.session_id);

  if (sessionIds.length === 0) return [];

  // Step 2: Get session details
  const { data: sessions, error: sessionError } = await supabase
    .from("session")
    .select("*")
    .in("id", sessionIds);

  if (sessionError) {
    throw new Error(sessionError.message);
  }

  return sessions;
}

async function getStudentHomework(studentId) {
  const { data, error } = await supabase
    .from("homework_assignment")
    .select("*, homework:homework_id(*)")
    .eq("student_id", studentId);

  if (error) {
    console.error("Error fetching homework:", error.message);
    return [];
  }

  return data;
}

async function getHomeworkForInstructor() {}

export {
  getUsers,
  getGroups,
  getInstructorSessionsWithGroups,
  getStudentSession,
  getStudentHomework,
};
