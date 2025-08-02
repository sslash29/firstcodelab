import FormAddGroup from "@/components/FormAddGroup";
import { getCookies, getUsers } from "@/lib/data-servcie";

async function page() {
  const { instructors, students } = await getUsers();
  const { id, full_name, rating, role } = getCookies();

  return (
    <div>
      <FormAddGroup
        instructors={instructors}
        students={students}
        adminId={id}
      />
    </div>
  );
}

export default page;
