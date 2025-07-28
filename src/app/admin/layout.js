import Link from "next/link";

function layout({ children }) {
  return (
    <html>
      <body className="text-black bg-[#F2F2F2]">
        <div className="flex ">
          <div className="flex flex-col border-r border-black w-fit h-dvh p-4 pr gap-3 relative">
            <div className="flex flex-col gap-2.5">
              <div className="rounded-full w-[40px] h-[40px] bg-black  flex flex-col items-center justify-center">
                <p className="text-3xl h-fit text-white font-bold mb-2">a</p>
              </div>
              <div className="bg-black w-[calc(100%-1rem) h-[0.5px]"></div>
            </div>

            <div className="flex flex-col gap-2.5 text-lg">
              <Link
                href="/admin/add-user"
                className="flex items-center hover:bg-gray-900 hover:text-white transition p-1 px-1.5 rounded-lg"
              >
                <img src="/Add.svg" alt="Add" className=" w-6 h-6" />
                Create user
              </Link>
              <Link
                href="/admin/update-user"
                className="flex items-center hover:bg-gray-900 hover:text-white transition p-1 px-1.5 rounded-lg ml-1"
              >
                <img src="/Update.svg" alt="Update" className=" " />
                Update user
              </Link>
              <Link
                href="/admin/group"
                className="flex items-center hover:bg-gray-900 hover:text-white transition p-1 px-1.5 rounded-lg"
              >
                <img src="/Group.svg" alt="Group" className=" w-6 h-6" />
                View & Create Groups
              </Link>
            </div>
            <Link
              href="/admin"
              className="absolute bottom-1 px-6 py-2 border rounded-full font-semibold"
            >
              back
            </Link>
          </div>
          <div className="w-full bg-[#f2f2f2]">{children}</div>
        </div>
      </body>
    </html>
  );
}

export default layout;
