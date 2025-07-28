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

  return (
    <div className="border flex flex-col p-3 px-4 rounded-xl">
      <div className="flex items-center justify-between">
        <h4 className="font-extralight text-2xl mb-1">
          {submitted[0]?.studentName}
        </h4>
        <span className="bg-[#DDDCE3] text-gray-900 rounded-md px-3 py-1 text-sm font-medium">
          {submitted[0]?.groupName}
        </span>
      </div>

      <h2 className="font-semibold text-3xl mb-6">{homework?.title}</h2>

      <textarea
        disabled
        className="resize-none text-black bg-[#E6E6E6] rounded-lg p-2 h-[126px] overflow-scroll mb-3"
        value={submitted[0]?.submission_text}
      />

      <div className="flex justify-between items-center">
        {submitted[0]?.fileUrl ? (
          <a
            href={submitted[0].fileUrl}
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
