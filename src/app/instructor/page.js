import DisplaySession from "@/components/DisplayInstructorSession";
import DisplayUser from "@/components/DisplayUser";
import { getInstructorSessionsWithGroups, getUsers } from "@/lib/data-servcie";
import Link from "next/link";

async function page() {
  const sessions = await getInstructorSessionsWithGroups(
    "9089477f-2dba-46bd-ba75-e50b24d52b2f"
  );

  const { students } = await getUsers();

  return (
    <div>
      <Link href="/instructor/create-session">Create Session</Link>
      <DisplaySession sessions={sessions} />
      <DisplayUser users={students} typeOfUser={"student"} />
    </div>
  );
}

export default page;
