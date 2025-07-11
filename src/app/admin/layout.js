import Link from "next/link";

function layout({ children }) {
  return (
    <html>
      <body className="text-white bg-[#252525]">
        {children}
        <Link href="/admin">back</Link>
      </body>
    </html>
  );
}

export default layout;
