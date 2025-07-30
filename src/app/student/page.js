import DisplayStudentHomework from "@/components/DisplayStudentHomework";
import DisplayStudentSession from "@/components/DisplayStudentSession";
import {
  getStudentHomework,
  getStudentSession,
  getUsersWithGroups,
} from "@/lib/data-servcie";
import DisplayUser from "@/components/DisplayUser";
import CalendarNav from "@/components/CalendarNav";

async function Page() {
  const sessions = await getStudentSession(
    "fc2404df-4704-4f35-8c82-bf775936ae82"
  );
  const homeworkData = await getStudentHomework(
    "fc2404df-4704-4f35-8c82-bf775936ae82"
  );
  const { instructors } = await getUsersWithGroups();
  console.log(instructors);
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
            <span className="font-bold">You Are In 2 Groups</span>
          </div>
        </div>
        <div className="w-full bg-black h-[1px]"></div>
        <div className="flex flex-col p-4 py-6 gap-10 w-full">
          <DisplayUser users={instructors} typeOfUser="instructor" />
        </div>
      </div>
      <div className="flex flex-col p-4 py-6 gap-10 items-center w-[700px] border-r">
        <DisplayStudentHomework data={homeworkData} />
      </div>
      <div className="flex flex-col gap-10 items-center w-[600px]">
        <CalendarNav sessions={sessions} type={"student"} />
      </div>
    </div>
  );
}

export default Page;

{
  /* <DisplayStudentSession data={data} />
<DisplayStudentHomework data={homeworkData} />
<DisplayUser users={instructors} typeOfUser="instructor" /> */
}
