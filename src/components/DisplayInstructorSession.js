"use client";

import Session from "./Session";

function DisplayInstructorSession({ sessions }) {
  return (
    <div className="space-y-4">
      {sessions.length === 0 ? (
        <p className="text-gray-500 italic">No sessions available.</p>
      ) : (
        sessions.map((session) => (
          <Session key={session.id} session={session} />
        ))
      )}
    </div>
  );
}

export default DisplayInstructorSession;
