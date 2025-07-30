import SessionForm from "@/components/SessionForm";
import { getGroups } from "@/lib/data-servcie";

async function page() {
  const groups = await getGroups();

  return (
    <div className="bg-[#F2F2F2] h-dvh flex items-center justify-center">
      <SessionForm groups={groups} />
    </div>
  );
}

export default page;
