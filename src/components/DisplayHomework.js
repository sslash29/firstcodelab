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
    <div className="border flex flex-col p-3 px-4 rounded-xl w-full sm:w-[400px] max-w-full">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h4 className="font-extralight text-2xl mb-1 break-words">
          {student?.studentName || "No name"}
        </h4>
        <span className="bg-[#DDDCE3] text-gray-900 rounded-md px-3 py-1 text-sm font-medium whitespace-nowrap">
          {student?.groupName || "No group"}
        </span>
      </div>

      <h2 className="font-semibold text-2xl sm:text-3xl mb-4 sm:mb-6 break-words">
        {homework?.title}
      </h2>

      <textarea
        disabled
        className="resize-none text-black bg-[#E6E6E6] rounded-lg p-2 h-[126px] overflow-auto mb-3 text-sm sm:text-base"
        value={student?.submission_text || "No submission"}
      />

      <div className="flex justify-between items-center gap-3 flex-wrap">
        {student?.fileUrl ? (
          <a
            href={student.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm border px-3 sm:px-4 py-1 flex items-center justify-center rounded-3xl font-semibold cursor-pointer hover:bg-gray-200"
          >
            View Homework
          </a>
        ) : (
          <span className="text-xs sm:text-sm text-gray-400">
            No file uploaded
          </span>
        )}

        <span className="text-xs sm:text-sm text-gray-500 ml-auto">
          {formatDate(homework?.due_date)}
        </span>
      </div>
    </div>
  );
}

export default DisplayHomework;
