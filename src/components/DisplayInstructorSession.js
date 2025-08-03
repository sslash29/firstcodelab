"use client";

import { format } from "date-fns";
import Link from "next/link";

function getTopOffset(startTime) {
  const date = new Date(startTime);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const startHour = 9; // Timeline starts from 09:00
  const pixelsPerHour = 96; // 1 hour = 96px

  return (hour - startHour) * pixelsPerHour + (minute / 60) * pixelsPerHour;
}

function getDurationHeight(startTime, endTime) {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const diffInMinutes = (end - start) / (1000 * 60);
  const pixelsPerMinute = 96 / 60;

  return diffInMinutes * pixelsPerMinute;
}

export default function DisplayInstructorSession({ session, type }) {
  const top = getTopOffset(session.start_time);
  const height = getDurationHeight(session.start_time, session.end_time);

  const formattedTime = `${format(
    new Date(session.start_time),
    "HH:mm"
  )} – ${format(new Date(session.end_time), "HH:mm")}`;
  return (
    <div
      className="absolute left-20 w-4/5"
      style={{ top: `${top}px`, height: `${height}px` }}
    >
      <div className="bg-black text-white rounded-2xl px-4 py-2 w-full h-full shadow-md flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <div className="bg-white text-black inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold">
              {formattedTime}
            </div>
            <div className="flex items-center justify-center rounded-full bg-white text-black p-2">
              <img src="Check.svg" alt="Check" className="w-4 h-4" />
            </div>
          </div>
          {type === "instructor" && (
            <button className="text-sm px-4 py-1 flex items-center justify-center rounded-3xl font-semibold cursor-pointer hover:scale-90 transition-all  bg-white text-black  ">
              <Link href={"/instructor/create-homework"}>Create Homework</Link>
            </button>
          )}
        </div>
        <div>
          <p className="text-sm text-gray-400 mt-1">
            {session.groups?.[0]?.name
              ? `Group: ${session.groups[0].name}`
              : "Session"}
          </p>
          <p className="text-lg font-semibold">{session.name}</p>
        </div>
      </div>
    </div>
  );
}
