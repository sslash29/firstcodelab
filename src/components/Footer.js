import Link from "next/link";

function Footer() {
  return (
    <div>
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

export default Footer;
