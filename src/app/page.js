import Link from "next/link";

export default function page() {
  return (
    <div className="flex flex-col text-2xl  gap-2">
      <Link href="/admin" className="hover:scale-105 transition-all">
        admin
      </Link>
      <Link href="/instructor" className="hover:scale-105 transition-all">
        instructor
      </Link>
      <Link href="/student" className="hover:scale-105 transition-all">
        student
      </Link>
    </div>
  );
}
