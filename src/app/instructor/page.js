import CalendarNav from "@/components/CalendarNav";
import DisplayHomeworks from "@/components/DisplayHomeworks";
import DisplayUser from "@/components/DisplayUser";
import {
  getCookies,
  getHomeworkForInstructor,
  getInstructorSessionsWithGroups,
  getStudentsDataForInstructor,
  getUsersWithGroups,
} from "@/lib/data-servcie";
async function page() {
  const { id, full_name, rating, role } = getCookies();
  console.log(id, full_name, rating, role);
  const sessions = await getInstructorSessionsWithGroups(id);
  const homeworks = await getHomeworkForInstructor(id);
  const { students } = await getStudentsDataForInstructor(id);
  console.log(students);
  return (
    <div className="flex bg-[#f2f2f2] relative">
      <div className="flex flex-col border-r h-dvh w-[350px]">
        <div className="flex flex-col p-4 py-6 gap-10 w-full ">
          <div className="flex items-center gap-1.5">
            <div className="bg-black text-white font-bold rounded-full w-[40px] h-[40px] flex items-center justify-center text-2xl">
              <p className="mb-0.5">I</p>
            </div>
            <p className="text-3xl font-semibold">{full_name}</p>
          </div>
          <div className="flex items-center justify-center bg-black text-white rounded-lg w-full px-5 py-2 ">
            <span className="font-bold">
              You Are In{" "}
              {Array.isArray(sessions?.[0]?.groups)
                ? sessions[0].groups.length
                : sessions.length}{" "}
              Groups
            </span>
          </div>
        </div>
        <div className="w-full bg-black h-[1px]"></div>
        <div className="flex-1 flex items-center justify-center w-full">
          {!students || students.length === 0 ? (
            <h2 className="text-4xl font-bold text-center -translate-y-20">
              No Students
            </h2>
          ) : (
            <div className="w-full p-4">
              <DisplayUser users={students} typeOfUser={"student"} />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col p-4 py-6 gap-10 items-center w-[700px] border-r">
        {!homeworks || homeworks.length === 0 ? (
          <div className="flex items-center justify-center h-full w-full">
            <h2 className="text-4xl font-bold text-center">No Homework</h2>
          </div>
        ) : (
          <DisplayHomeworks data={homeworks} />
        )}
      </div>

      <div className="flex flex-col gap-10 items-center w-[600px]">
        <CalendarNav sessions={sessions} />
      </div>
    </div>
  );
}

export default page;
