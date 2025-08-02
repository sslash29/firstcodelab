import DisplayUsers from "@/components/DispalyUsers";
import { getUsersWithGroups } from "@/lib/data-servcie";
import { Suspense } from "react";
import Loading from "@/app/Loading";

async function page() {
  const { admins, instructors, students } = await getUsersWithGroups();

  const allUsers = [
    ...instructors.map((u) => ({ ...u, role: "instructor" })),
    ...students.map((u) => ({ ...u, role: "student" })),
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <Suspense fallback={<Loading />}>
          <DisplayUsers users={allUsers} />
        </Suspense>
      </div>
    </div>
  );
}

export default page;
