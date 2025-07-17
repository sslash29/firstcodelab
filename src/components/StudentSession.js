"use client";

function StudentSession({ session }) {
  return (
    <div className="border p-4 rounded-xl bg-white shadow space-y-2">
      <h3 className="text-lg font-semibold text-gray-800">{session.name}</h3>
      <p className="text-sm text-gray-600 italic">{session.content}</p>
      <p className="text-sm text-gray-500">
        {new Date(session.start_time).toLocaleString()} –{" "}
        {new Date(session.end_time).toLocaleString()}
      </p>
    </div>
  );
}

export default StudentSession;
