"use client";

import { useState } from "react";
import { format, addDays, subDays } from "date-fns";
import DisplayInstructorSession from "./DisplayInstructorSession";
import Link from "next/link";

function isToday(date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export default function CalendarNav({ sessions, type = "instructor" }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const goToPrevDay = () => setSelectedDate(subDays(selectedDate, 1));
  const goToNextDay = () => setSelectedDate(addDays(selectedDate, 1));

  const hours = Array.from({ length: 12 }, (_, i) => 9 + i); // 09:00 to 20:00
  const formattedDate = isToday(selectedDate)
    ? "Today"
    : format(selectedDate, "MMM dd, yyyy");

  return (
    <div className="p-6 bg-[#f2f2f2] min-h-screen w-full relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">{formattedDate}</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrevDay}
            className="border border-black rounded-full w-8 h-8 flex items-center justify-center hover:bg-black hover:text-white transition"
          >
            ←
          </button>
          <button
            onClick={goToNextDay}
            className="border border-black rounded-full w-8 h-8 flex items-center justify-center hover:bg-black hover:text-white transition"
          >
            →
          </button>
        </div>
      </div>

      {/* Scrollable timeline */}
      <div className="relative h-[80vh] overflow-y-auto border-l border-gray-300 pl-16">
        {hours.map((hour) => (
          <div key={hour} className="relative h-24 border-t border-gray-300">
            <span className="absolute -left-12 text-sm text-gray-500 top-2">
              {`${String(hour).padStart(2, "0")}:00`}
            </span>
          </div>
        ))}

        {sessions
          .filter((session) => {
            const sessionDate = new Date(session.start_time);
            return (
              sessionDate.getDate() === selectedDate.getDate() &&
              sessionDate.getMonth() === selectedDate.getMonth() &&
              sessionDate.getFullYear() === selectedDate.getFullYear()
            );
          })
          .map((session, key) => (
            <div key={key}>
              <DisplayInstructorSession session={session} type={type} />
            </div>
          ))}
      </div>
      {type === "instructor" && (
        <button className="text-sm border px-4 py-1 flex items-center justify-center rounded-3xl font-semibold cursor-pointer hover:bg-gray-200 absolute bottom-5 right-5">
          <Link href={"/instructor/create-session"}>Create Sesssion</Link>
        </button>
      )}
    </div>
  );
}
