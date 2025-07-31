import DisplayStudentHomework from "@/components/DisplayStudentHomework";
import {
  getCookies,
  getStudentHomework,
  getStudentSession,
  getUserGroups,
  getUsersWithGroups,
} from "@/lib/data-servcie";
import DisplayUser from "@/components/DisplayUser";
import CalendarNav from "@/components/CalendarNav";

async function Page() {
  const { id, full_name, rating, role } = getCookies();
  const sessions = await getStudentSession(id);
  const homeworkData = await getStudentHomework(id);
  const groups = await getUserGroups(id, role);
  const { instructors } = await getUsersWithGroups();

  return (
    <div className="flex bg-[#f2f2f2]">
      <div className="flex flex-col border-r h-dvh w-[350px]">
        <div className="flex flex-col p-4 py-6 gap-10 w-full ">
          <div className="flex items-center gap-1.5">
            <div className="bg-black text-white font-bold rounded-full w-[40px] h-[40px] flex items-center justify-center text-2xl">
              <p className="mb-0.5">I</p>
            </div>
            <p className="text-3xl font-semibold">{full_name}</p>
          </div>
          <div className="flex items-center justify-center bg-black text-white rounded-lg w-full px-5 py-2 ">
            <span className="font-bold">You Are In {groups.length} Groups</span>
          </div>
        </div>
        <div className="w-full bg-black h-[1px]"></div>
        <div className="flex flex-col p-4 py-6 gap-10 w-full">
          <DisplayUser users={instructors} typeOfUser="instructor" />
        </div>
      </div>
      <div className="flex flex-col p-4 py-6 gap-10 items-center w-[700px] border-r">
        {!homeworkData || homeworkData.length === 0 ? (
          <h2 className="text-4xl font-bold h-dvh flex items-center justify-center ">
            No Homework
          </h2>
        ) : (
          <DisplayStudentHomework data={homeworkData} />
        )}
      </div>
      <div className="flex flex-col gap-10 items-center w-[600px]">
        <CalendarNav sessions={sessions} type={"student"} />
      </div>
    </div>
  );
}

export default Page;

// {"id":"21d696fc-c5a1-4abd-9af6-6fa44521ebb2","created_at":"2025-07-31T04:54:44.082134+00:00","userId":"$2b$12$SPWAfjv/5A7FBurvmJxPz.ayBovkSERBvWPV5lhU9kOHFsxNcyDH.","full_name":"Nour Ahmed","phone_number":"01278953422","role":"student","rating":null}
