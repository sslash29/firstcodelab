import GroupDisplayer from "@/components/GroupDisplayer";
import { getGroups, getUsers } from "@/lib/data-servcie";
import Link from "next/link";

export default async function Page() {
  const data = await getGroups();
  const { instructors, students } = await getUsers();

  return (
    <div className="relative h-dvh flex-wrap gap-2 p-4 sm:p-6">
      <Link href="/admin/group/add-group">
        <button className="fixed bottom-4 right-4 cursor-pointer rounded-xl border px-4 py-2 text-black transition-all hover:bg-black hover:text-white sm:bottom-5 sm:right-7">
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
