import HomeworkForm from "@/components/HomeworkForm";

function page() {
  const groupId = "8d864d88-797b-4c4a-9fba-2a59cdf4b8ee";
  return (
    <div className="flex items-center justify-center h-dvh">
      <HomeworkForm groupId={groupId} />
    </div>
  );
}

export default page;
