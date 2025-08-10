import CalendarNav from "@/components/CalendarNav";
import DisplayHomeworks from "@/components/DisplayHomeworks";
import DisplayUser from "@/components/DisplayUser";
import Link from "next/link";
import {
  getCookies,
  getHomeworkForInstructor,
  getInstructorSessionsWithGroups,
  getStudentsDataForInstructor,
} from "@/lib/data-servcie";
async function page() {
  const { id, full_name } = getCookies();
  const sessions = await getInstructorSessionsWithGroups(id);
  const homeworks = await getHomeworkForInstructor(id);
  const { students } = await getStudentsDataForInstructor(id);
  return (
    <div className="relative flex flex-col bg-[#f2f2f2] min-h-screen overflow-y-auto lg:flex-row lg:overflow-hidden">
      {/* Profile & Students */}
      <div className="flex w-full flex-col border-b lg:h-dvh lg:w-[350px] lg:border-r lg:overflow-y-auto">
        <div className="flex w-full flex-col gap-8 p-3 py-5 sm:p-4 sm:py-6">
          <div className="flex items-center gap-1.5 justify-center lg:justify-start">
            <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-black text-2xl font-bold text-white">
              <p className="mb-0.5">I</p>
            </div>
            <p className="text-2xl sm:text-3xl font-semibold truncate max-w-[200px] lg:max-w-none">
              {full_name}
            </p>
          </div>
          <div className="flex w-full items-center justify-center rounded-lg bg-black px-5 py-2 text-white">
            <span className="font-bold text-center">
              You Are In{" "}
              {Array.isArray(sessions?.[0]?.groups)
                ? sessions[0].groups.length
                : sessions.length}{" "}
              Groups
            </span>
          </div>
        </div>
        <div className="h-[1px] w-full bg-black" />
        <div className="flex flex-1 items-start justify-center w-full px-3 pb-5 sm:px-4 sm:pb-6 overflow-y-auto">
          <h2 className="sr-only">Students</h2>
          {!students || students.length === 0 ? (
            <h2 className="mt-6 text-center text-3xl sm:text-4xl font-bold">
              No Students
            </h2>
          ) : (
            <div className="w-full">
              <DisplayUser users={students} typeOfUser={"student"} />
            </div>
          )}
        </div>
      </div>

      {/* Homeworks */}
      <div className="flex w-full flex-col gap-6 border-b p-3 py-5 sm:p-4 sm:py-6 lg:w-[700px] lg:border-r lg:h-dvh lg:overflow-y-auto">
        <div className="flex w-full items-center gap-3 justify-between">
          <h2 className="text-xl font-semibold lg:hidden">Homeworks</h2>
          <button className="ml-auto rounded-md bg-black px-4 py-2 text-white text-sm font-medium hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/50 active:scale-[0.97] transition">
            <Link href="/instructor/create-homework">Create Homework</Link>
          </button>
        </div>
        {!homeworks || homeworks.length === 0 ? (
          <div className="flex flex-1 w-full items-center justify-center min-h-[200px]">
            <h2 className="text-center text-3xl sm:text-4xl font-bold">
              No Homework
            </h2>
          </div>
        ) : (
          <div className="flex-1 w-full">
            <DisplayHomeworks data={homeworks} />
          </div>
        )}
      </div>

      {/* Calendar */}
      <div className="flex w-full flex-col gap-6 p-3 py-5 sm:p-4 sm:py-6 lg:w-[600px] lg:h-dvh lg:overflow-y-auto">
        <h2 className="text-xl font-semibold lg:hidden">Calendar</h2>
        <div className="flex-1">
          <CalendarNav sessions={sessions} />
        </div>
      </div>
    </div>
  );
}

export default page;
