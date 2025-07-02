import Link from "next/link";

function page() {
  return (
    <div className="flex flex-col">
      <Link href="/admin/add-user">Add user</Link>
      <Link href="/admin/update-user">update user</Link>
    </div>
  );
}

export default page;
