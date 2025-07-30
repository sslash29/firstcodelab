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
  console.log("groups that you asked for");
  console.dir(groups);

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
  // 1. Fetch all homework assignments for this student
  const { data: assignments, error } = await supabase
    .from("homework_assignment")
    .select("*, homework:homework_id(*)")
    .eq("student_id", studentId);

  if (error) {
    console.error("Error fetching homework:", error.message);
    return [];
  }

  const enriched = await Promise.all(
    assignments.map(async (item) => {
      let fileUrl = null;

      if (item.submission_file) {
        const { data: urlData, error: urlError } = supabase.storage
          .from("homework-submissions")
          .getPublicUrl(item.submission_file);

        if (!urlError && urlData?.publicUrl) {
          fileUrl = urlData.publicUrl;
        }
      }

      return {
        ...item,
        fileUrl,
      };
    })
  );

  return enriched;
}

async function getHomeworkForInstructor(instructorId) {
  // 1. Fetch all homework created by this instructor
  const { data: homeworks, error: homeworkError } = await supabase
    .from("homework")
    .select("*")
    .eq("instructor_id", instructorId);

  if (homeworkError) {
    console.error("Error fetching homework:", homeworkError.message);
    return [];
  }

  if (!homeworks.length) return [];

  // 2. Get all group assignments for this instructor
  const { data: groupAssignments, error: groupError } = await supabase
    .from("group_assignment")
    .select("group_id")
    .eq("instructor_id", instructorId);

  if (groupError) {
    console.error("Error fetching instructor groups:", groupError.message);
    return [];
  }

  const groupIds = groupAssignments.map((g) => g.group_id);
  if (groupIds.length === 0) return [];

  // 3. Get all students in those groups
  const { data: studentAssignments, error: studentError } = await supabase
    .from("group_assignment")
    .select("student_id, group_id")
    .in("group_id", groupIds)
    .not("student_id", "is", null);

  if (studentError) {
    console.error(
      "Error fetching students in instructor groups:",
      studentError.message
    );
    return [];
  }

  const studentIds = studentAssignments.map((s) => s.student_id);
  const studentGroupMap = Object.fromEntries(
    studentAssignments.map((s) => [s.student_id, s.group_id])
  );

  // 4. Get student full names
  const { data: studentDetails, error: studentInfoError } = await supabase
    .from("student")
    .select("id, full_name")
    .in("id", studentIds);

  if (studentInfoError) {
    console.error("Error fetching student names:", studentInfoError.message);
    return [];
  }

  const studentMap = Object.fromEntries(
    (studentDetails || []).map((s) => [s.id, s.full_name])
  );

  // 5. Get all homework assignments linked to this instructor's homework
  const { data: homeworkAssignments, error: haError } = await supabase
    .from("homework_assignment")
    .select("*")
    .in(
      "homework_id",
      homeworks.map((h) => h.id)
    )
    .in("student_id", studentIds);

  if (haError) {
    console.error("Error fetching homework assignments:", haError.message);
    return [];
  }

  // 6. Get all group IDs involved in those assignments (for name mapping)
  const assignmentGroupIds = [
    ...new Set([
      ...homeworkAssignments.map((a) => a.group_id),
      ...Object.values(studentGroupMap),
    ]),
  ].filter(Boolean);

  const { data: groupData, error: groupFetchError } = await supabase
    .from("group")
    .select("id, name")
    .in("id", assignmentGroupIds);

  if (groupFetchError) {
    console.error("Error fetching group names:", groupFetchError.message);
    return [];
  }

  const groupNameMap = Object.fromEntries(
    (groupData || []).map((g) => [g.id, g.name])
  );

  // 7. Group homework data
  const submissionsByHomework = {};

  for (const hw of homeworks) {
    submissionsByHomework[hw.id] = {
      homework: hw,
      submitted: [],
      notSubmitted: [],
    };

    // 🔍 Find group_ids this homework was assigned to
    const groupIdsAssignedToThisHomework = homeworkAssignments
      .filter((ha) => ha.homework_id === hw.id)
      .map((ha) => ha.group_id);

    // 🔍 Find students in those groups
    const studentsInThisHomework = studentAssignments.filter((s) =>
      groupIdsAssignedToThisHomework.includes(s.group_id)
    );

    for (const { student_id, group_id } of studentsInThisHomework) {
      const submitted = homeworkAssignments.find(
        (h) =>
          h.homework_id === hw.id &&
          h.student_id === student_id &&
          h.group_id === group_id &&
          h.submission_file !== null
      );

      const groupName = group_id ? groupNameMap[group_id] || "Unknown" : null;

      let fileUrl = null;
      if (submitted?.submission_file) {
        const { data: urlData, error: urlError } = supabase.storage
          .from("homework-submissions")
          .getPublicUrl(submitted.submission_file);

        if (!urlError && urlData?.publicUrl) {
          fileUrl = urlData.publicUrl;
        }
      }

      if (submitted) {
        submissionsByHomework[hw.id].submitted.push({
          ...submitted,
          studentName: studentMap[student_id] || "Unknown",
          groupName,
          fileUrl,
        });
      } else {
        submissionsByHomework[hw.id].notSubmitted.push({
          student_id,
          studentName: studentMap[student_id] || "Unknown",
          groupId: group_id,
          groupName,
        });
      }
    }
  }

  return Object.values(submissionsByHomework);
}

async function getUsersWithGroups() {
  const students = await fetchTable("student");
  const instructors = await fetchTable("instructor");
  const admins = await fetchTable("admin");

  const getGroupInfo = async (userId, role) => {
    const column = role === "student" ? "student_id" : "instructor_id";
    const { data, error } = await supabase
      .from("group_assignment")
      .select("group_id, group(name)")
      .eq(column, userId);

    if (error && error.code !== "PGRST116") {
      console.error(
        `Error getting group for ${role} ${userId}:`,
        error.message
      );
    }

    return data && Array.isArray(data) && data.length > 0
      ? {
          groupId: data.map((entry) => entry.group_id),
          groupName: data.map((entry) => entry.group?.name),
        }
      : { groupId: null, groupName: null };
  };

  const enrichedStudents = await Promise.all(
    (students || []).map(async (student) => {
      const group = await getGroupInfo(student.id, "student");
      return {
        ...student,
        role: "student",
        ...group,
      };
    })
  );

  const enrichedInstructors = await Promise.all(
    (instructors || []).map(async (instructor) => {
      const group = await getGroupInfo(instructor.id, "instructor");
      return {
        ...instructor,
        role: "instructor",
        ...group,
      };
    })
  );

  const enrichedAdmins = (admins || []).map((admin) => ({
    ...admin,
    role: "admin",
    groupId: null,
    groupName: null,
  }));

  return {
    students: enrichedStudents,
    instructors: enrichedInstructors,
    admins: enrichedAdmins,
  };
}

export {
  getUsers,
  getGroups,
  getInstructorSessionsWithGroups,
  getStudentSession,
  getStudentHomework,
  getUsersWithGroups,
  getHomeworkForInstructor,
};
