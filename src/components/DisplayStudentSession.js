"use client";

import StudentSession from "./StudentSession";

function DisplayStudentSession({ data }) {
  return (
    <div className="space-y-4">
      {data.length === 0 ? (
        <p className="text-gray-500 italic">No sessions found.</p>
      ) : (
        data.map((session) => (
          <StudentSession key={session.id} session={session} />
        ))
      )}
    </div>
  );
}

export default DisplayStudentSession;
