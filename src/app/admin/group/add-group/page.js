import FormAddGroup from "@/components/FormAddGroup";
import { getUsers } from "@/lib/data-servcie";

async function page() {
  const { instructors, students } = await getUsers();
  return (
    <div>
      <FormAddGroup instructors={instructors} students={students} />
    </div>
  );
}

export default page;
