import DisplayUsers from "@/components/DispalyUsers";
import { getUsers } from "@/lib/data-servcie";
import { Suspense } from "react";
import Loading from "@/app/Loading";
async function page() {
  const { admins, instructors, students } = await getUsers();
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl">Update Users</h1>
      <div className="flex justify-between">
        <Suspense fallback={<Loading />}>
          <DisplayUsers users={admins} title={"Admins"} />
          <DisplayUsers users={instructors} title={"Instrcutors"} />
          <DisplayUsers users={students} title={"Student"} />
        </Suspense>
      </div>
    </div>
  );
}

export default page;
