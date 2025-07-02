import DisplayUsers from "@/components/DispalyUsers";
import { getUsers } from "@/lib/data-servcie";

async function page() {
  const { admins, instructors, students } = await getUsers();
  return (
    <div className="flex justify-between">
      <DisplayUsers users={admins} title={"Admins"} />
      <DisplayUsers users={instructors} title={"Instrcutors"} />
      <DisplayUsers users={students} title={"Student"} />
    </div>
  );
}

export default page;
