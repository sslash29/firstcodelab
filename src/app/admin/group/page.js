import DisplayGroup from "@/components/DisplayGroup";
import { getGroups, getUsers } from "@/lib/data-servcie";
import Link from "next/link";

export default async function Page() {
  const data = await getGroups();
  const { instructors, students } = await getUsers();

  return (
    <div className="p-6 space-y-4 max-w-3xl mx-auto">
      <Link href="/admin/group/add-group">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Add Group
        </button>
      </Link>

      {data && data.length > 0 ? (
        data.map((group) => (
          <DisplayGroup
            key={group.id}
            group={group}
            instructors={instructors}
            students={students}
          />
        ))
      ) : (
        <p className="text-gray-500">No groups found.</p>
      )}
    </div>
  );
}
