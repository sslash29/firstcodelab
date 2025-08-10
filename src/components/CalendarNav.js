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
    <div className="relative w-full min-h-screen bg-[#f2f2f2] p-4 sm:p-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold sm:text-2xl">{formattedDate}</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrevDay}
            className="flex h-6 w-6 items-center justify-center rounded-full border border-black transition hover:bg-black hover:text-white sm:h-8 sm:w-8"
          >
            ←
          </button>
          <button
            onClick={goToNextDay}
            className="flex h-6 w-6 items-center justify-center rounded-full border border-black transition hover:bg-black hover:text-white sm:h-8 sm:w-8"
          >
            →
          </button>
        </div>
      </div>

      {/* Scrollable timeline */}
      <div className="relative h-[75vh] overflow-y-auto border-l border-gray-300 pl-14 sm:h-[80vh] sm:pl-16">
        {hours.map((hour) => (
          <div key={hour} className="relative h-24 border-t border-gray-300">
            <span className="absolute -left-10 top-2 text-sm text-gray-500 sm:-left-12">
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
        <button className="absolute bottom-4 right-4 flex cursor-pointer items-center justify-center rounded-3xl border px-4 py-1 text-sm font-semibold hover:bg-gray-200 sm:bottom-5 sm:right-5">
          <Link href={"/instructor/create-session"}>Create Sesssion</Link>
        </button>
      )}
    </div>
  );
}
