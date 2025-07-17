import DisplayInstructor from "@/components/DisplayUser";
import DisplayStudentHomework from "@/components/DisplayStudentHomework";
import DisplayStudentSession from "@/components/DisplayStudentSession";
import {
  getStudentHomework,
  getStudentSession,
  getUsers,
} from "@/lib/data-servcie";
import DisplayUser from "@/components/DisplayUser";

async function Page() {
  const data = await getStudentSession("fc2404df-4704-4f35-8c82-bf775936ae82");
  const homeworkData = await getStudentHomework(
    "fc2404df-4704-4f35-8c82-bf775936ae82"
  );
  const { instructors } = await getUsers();
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Sessions</h1>
      <DisplayStudentSession data={data} />
      <DisplayStudentHomework data={homeworkData} />
      <DisplayUser users={instructors} typeOfUser="instructor" />
    </div>
  );
}

export default Page;
