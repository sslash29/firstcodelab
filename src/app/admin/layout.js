import Link from "next/link";

function layout({ children }) {
  return (
    <html>
      <body className="text-black bg-[#F2F2F2]">
        <div className="flex max-sm:flex-col">
          {/* Sidebar */}
          <div className="flex flex-col border-r border-black w-fit h-dvh p-4 pr gap-3 relative max-sm:w-full max-sm:h-auto max-sm:border-r-0 max-sm:border-b max-sm:flex-row max-sm:items-center max-sm:justify-between max-sm:p-2">
            <div className="flex flex-col gap-2.5 max-sm:flex-row max-sm:items-center">
              <div className="rounded-full w-[40px] h-[40px] bg-black flex flex-col items-center justify-center max-sm:w-[32px] max-sm:h-[32px]">
                <p className="text-3xl h-fit text-white font-bold mb-2 max-sm:text-xl max-sm:mb-0">
                  a
                </p>
              </div>
              <div className="bg-black w-[calc(100%-1rem)] h-[0.5px] max-sm:w-[0.5px] max-sm:h-[32px] max-sm:mx-2"></div>
            </div>

            <div className="flex flex-col gap-2.5 text-lg max-sm:flex-row max-sm:gap-1 max-sm:text-base">
              <Link
                href="/admin/add-user"
                className="flex items-center hover:bg-gray-900 hover:text-white transition p-1 px-1.5 rounded-lg max-sm:p-1 max-sm:px-2 max-sm:rounded-md"
              >
                <img
                  src="/Add.svg"
                  alt="Add"
                  className="w-6 h-6 max-sm:w-5 max-sm:h-5"
                />
                <span className="max-sm:hidden">Create user</span>
                <span className="hidden max-sm:inline">Add</span>
              </Link>
              <Link
                href="/admin/update-user"
                className="flex items-center hover:bg-gray-900 hover:text-white transition p-1 px-1.5 rounded-lg ml-1 max-sm:p-1 max-sm:px-2 max-sm:rounded-md max-sm:ml-0"
              >
                <img
                  src="/Update.svg"
                  alt="Update"
                  className="w-6 h-6 max-sm:w-5 max-sm:h-5"
                />
                <span className="max-sm:hidden">Update user</span>
                <span className="hidden max-sm:inline">Update</span>
              </Link>
              <Link
                href="/admin/group"
                className="flex items-center hover:bg-gray-900 hover:text-white transition p-1 px-1.5 rounded-lg max-sm:p-1 max-sm:px-2 max-sm:rounded-md"
              >
                <img
                  src="/Group.svg"
                  alt="Group"
                  className="w-6 h-6 max-sm:w-5 max-sm:h-5"
                />
                <span className="max-sm:hidden">View & Create Groups</span>
                <span className="hidden max-sm:inline">Groups</span>
              </Link>
            </div>
            <Link
              href="/admin"
              className="absolute bottom-1 px-6 py-2 border rounded-full font-semibold max-sm:static max-sm:px-3 max-sm:py-1 max-sm:rounded-md max-sm:ml-2"
            >
              back
            </Link>
          </div>
          {/* Main content */}
          <div className="w-full bg-[#f2f2f2]">{children}</div>
        </div>
      </body>
    </html>
  );
}

export default layout;
