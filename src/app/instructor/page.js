import DisplayHomeworks from "@/components/DisplayHomeworks";
import DisplaySession from "@/components/DisplayInstructorSession";
import DisplayUser from "@/components/DisplayUser";
import {
  getHomeworkForInstructor,
  getInstructorSessionsWithGroups,
  getUsersWithGroups,
} from "@/lib/data-servcie";
import Link from "next/link";

async function page() {
  const sessions = await getInstructorSessionsWithGroups(
    "9089477f-2dba-46bd-ba75-e50b24d52b2f"
  );

  const homeworks = await getHomeworkForInstructor(
    "9089477f-2dba-46bd-ba75-e50b24d52b2f"
  );
  const { students } = await getUsersWithGroups();

  return (
    <div className="flex ">
      <div className="flex flex-col w-fit border-r h-dvh ">
        <div className="flex flex-col p-4 py-6 gap-10 w-fit ">
          <div className="flex items-center gap-1.5">
            <div className="bg-black text-white font-bold rounded-full w-[40px] h-[40px] flex items-center justify-center text-2xl">
              <p className="mb-0.5">I</p>
            </div>
            <p className="text-3xl font-semibold">Ammar Ehab</p>
          </div>
          <div className="flex items-center justify-center bg-black text-white rounded-lg w-full px-5 py-2">
            <span className="font-bold">You Are In 7 Groups</span>
          </div>
        </div>
        <div className="w-full bg-black h-[1px]"></div>
        <div className="flex flex-col p-4 py-6 gap-10 w-fit">
          <DisplayUser users={students} typeOfUser={"student"} />
        </div>
      </div>
      <div className="flex flex-col p-4 py-6 gap-10 w-fit">
        <DisplayHomeworks homeworks={homeworks} />
      </div>
    </div>
  );
}

export default page;

{
  /* <Link href="/instructor/create-session">Create Session</Link> */
}
{
  /* <DisplaySession sessions={sessions} /> */
}
{
  /* <DisplayUser users={students} typeOfUser={"student"} /> */
}
