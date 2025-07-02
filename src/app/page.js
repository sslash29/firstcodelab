import Link from "next/link";

export default function page() {
  return (
    <div>
      <Link href="/admin">admin</Link>
      <Link href="/instructor">instructor</Link>
      <Link href="/student">student</Link>
    </div>
  );
}
