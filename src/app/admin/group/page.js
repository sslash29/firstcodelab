import GroupDisplayer from "@/components/GroupDisplayer";
import { getGroups, getUsers } from "@/lib/data-servcie";
import Link from "next/link";

export default async function Page() {
  const data = await getGroups();
  const { instructors, students } = await getUsers();

  return (
    <div className="p-6 flex gap-2 relative h-dvh flex-wrap">
      <Link href="/admin/group/add-group">
        <button className="border text-black px-4 py-2 rounded-xl fixed bottom-5 right-7 cursor-pointer hover:bg-black hover:text-white transition-all ">
          Add Group
        </button>
      </Link>

      <GroupDisplayer
        groups={data}
        instructors={instructors}
        students={students}
      />
    </div>
  );
}
