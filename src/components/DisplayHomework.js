"use client";

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear().toString().slice(-2);
  return `${day} ${month}, ${year}`;
}

function DisplayHomework({ homeworkData }) {
  const { homework, submitted } = homeworkData;
  const student = submitted?.[0];
  if (!student) return null;

  return (
    <div className="border flex flex-col p-3 px-4 rounded-xl w-[400px]">
      <div className="flex items-center justify-between">
        <h4 className="font-extralight text-2xl mb-1">
          {student?.studentName || "No name"}
        </h4>
        <span className="bg-[#DDDCE3] text-gray-900 rounded-md px-3 py-1 text-sm font-medium">
          {student?.groupName || "No group"}
        </span>
      </div>

      <h2 className="font-semibold text-3xl mb-6">{homework?.title}</h2>

      <textarea
        disabled
        className="resize-none text-black bg-[#E6E6E6] rounded-lg p-2 h-[126px] overflow-scroll mb-3"
        value={student?.submission_text || "No submission"}
      />

      <div className="flex justify-between items-center">
        {student?.fileUrl ? (
          <a
            href={student.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm border px-4 py-1 flex items-center justify-center rounded-3xl font-semibold cursor-pointer hover:bg-gray-200"
          >
            View Homework
          </a>
        ) : (
          <span className="text-sm text-gray-400">No file uploaded</span>
        )}

        <span className="text-sm text-gray-500">
          {formatDate(homework?.due_date)}
        </span>
      </div>
    </div>
  );
}

export default DisplayHomework;
