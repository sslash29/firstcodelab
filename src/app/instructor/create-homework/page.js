import HomeworkForm from "@/components/HomeworkForm";
import { getCookies, getUserGroups } from "@/lib/data-servcie";
import Link from "next/link";

async function Page() {
  const { id } = getCookies();
  const groups = await getUserGroups(id, "Instructor");
  console.log(groups);
  return (
    <div className="min-h-dvh w-full flex flex-col md:justify-center md:items-center bg-[#f2f2f2] px-4 py-6 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl md:mb-4">
        <Link
          href="/instructor"
          className="inline-flex items-center gap-1 text-sm font-medium text-black hover:underline mb-4 md:mb-6"
        >
          <span className="text-base">←</span> Back
        </Link>
      </div>
      <HomeworkForm groups={groups} instructorId={id} />
      <div className="h-8" />
    </div>
  );
}

export default Page;
