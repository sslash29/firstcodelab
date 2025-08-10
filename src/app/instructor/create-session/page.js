import SessionForm from "@/components/SessionForm";
import { getGroups } from "@/lib/data-servcie";

async function page() {
  const groups = await getGroups();

  return (
    <div className="bg-[#F2F2F2] min-h-screen flex items-start md:items-center justify-center py-8 md:py-0 px-4">
      <SessionForm groups={groups} />
    </div>
  );
}

export default page;
