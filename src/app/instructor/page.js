import CalendarNav from "@/components/CalendarNav";
import DisplayHomeworks from "@/components/DisplayHomeworks";
import DisplayUser from "@/components/DisplayUser";
import {
  getHomeworkForInstructor,
  getInstructorSessionsWithGroups,
  getUsersWithGroups,
} from "@/lib/data-servcie";
async function page() {
  const sessions = await getInstructorSessionsWithGroups(
    "9089477f-2dba-46bd-ba75-e50b24d52b2f"
  );

  const homeworks = await getHomeworkForInstructor(
    "9089477f-2dba-46bd-ba75-e50b24d52b2f"
  );
  const { students } = await getUsersWithGroups();
  console.log(students);
  return (
    <div className="flex bg-[#f2f2f2]">
      <div className="flex flex-col border-r h-dvh w-[350px]">
        <div className="flex flex-col p-4 py-6 gap-10 w-full ">
          <div className="flex items-center gap-1.5">
            <div className="bg-black text-white font-bold rounded-full w-[40px] h-[40px] flex items-center justify-center text-2xl">
              <p className="mb-0.5">I</p>
            </div>
            <p className="text-3xl font-semibold">Ammar Ehab</p>
          </div>
          <div className="flex items-center justify-center bg-black text-white rounded-lg w-full px-5 py-2 ">
            <span className="font-bold">
              You Are In {sessions[0].groups.length} Groups
            </span>
          </div>
        </div>
        <div className="w-full bg-black h-[1px]"></div>
        <div className="flex flex-col p-4 py-6 gap-10 w-full">
          <DisplayUser users={students} typeOfUser={"student"} />
        </div>
      </div>
      <div className="flex flex-col p-4 py-6 gap-10 items-center w-[700px] border-r">
        <DisplayHomeworks homeworks={homeworks} />
      </div>
      <div className="flex flex-col gap-10 items-center w-[600px]">
        <CalendarNav sessions={sessions} />
      </div>
    </div>
  );
}

export default page;
