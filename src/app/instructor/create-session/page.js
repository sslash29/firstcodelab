import SessionForm from "@/components/SessionForm";
import { getGroups } from "@/lib/data-servcie";

async function page() {
  const groups = await getGroups();

  return (
    <div>
      <SessionForm groups={groups} />
    </div>
  );
}

export default page;
