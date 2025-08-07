function ModernTechSection() {
  return (
    <div className="px-4 sm:px-16 flex flex-col gap-5">
      <h2 className="text-3xl sm:text-5xl text-center font-bold">
        Learn Modern Technology
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-5 auto-rows-[minmax(100px,_auto)] gap-4">
        {/* Row 1 - Big on left */}
        <div className="sm:col-span-3 sm:row-span-3 flex flex-col sm:flex-row justify-between border bg-[#DDDCE3] p-5 py-6 rounded-lg">
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5">
              <img src="/Code.svg" alt="Code" />
              <h2 className="text-2xl sm:text-[36px] font-bold">
                Frontend Development
              </h2>
            </div>
            <div className="flex flex-col gap-3.5">
              <p className="w-full sm:w-[290px] text-lg sm:text-[20px] opacity-70">
                start by learning the{" "}
                <span className="opacity-100 font-bold">
                  basics of frontend{" "}
                </span>
                with its latest updates!.
              </p>
              <div className="flex flex-col text-base sm:text-[18px]">
                <div className="flex gap-2.5 items-center">
                  <img src="/Check.svg" alt="Check" />
                  <p>Learn Basics of Frontend</p>
                </div>
                <div className="flex gap-2.5 items-center">
                  <img src="/Check.svg" alt="Check" />
                  <p>Master The Modern Way Of Writing Code</p>
                </div>
                <div className="flex gap-2.5 items-center">
                  <img src="/Check.svg" alt="Check" />
                  <p>Learn By Practicing</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center mt-4 sm:mt-0">
            <div className="flex gap-10">
              <img src="/Html.svg" alt="HTML" className="w-16 sm:w-auto" />
              <img src="/Css.svg" alt="CSS" className="w-16 sm:w-auto" />
            </div>
            <img src="/Js.svg" alt="JS" className="w-24 sm:w-auto" />
          </div>
        </div>

        <div className="sm:col-start-4 sm:col-span-1 sm:row-span-3 flex flex-col bg-[#DDDCE3] border p-5 py-4 rounded-lg relative gap-3">
          <div className="flex items-center gap-2">
            <img src="/Books.svg" alt="Books" />
            <h3 className="w-full sm:w-[200px] font-bold opacity-90 text-lg sm:text-[20px]">
              Learn JS Library
            </h3>
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-[18px]">
              Up your skills with React
            </h3>
            <p className="text-sm sm:text-[16px]">
              Write code in a professional way
            </p>
          </div>
          <div className="absolute bottom-0 right-0 sm:relative sm:bottom-auto sm:right-auto">
            <img src="/React.svg" alt="React" className="w-24 sm:w-auto" />
          </div>
        </div>

        <div className="sm:col-start-5 sm:col-span-1 sm:row-span-3 flex flex-col bg-[#DDDCE3] border p-5 py-4 rounded-lg relative gap-3">
          <div className="flex items-center gap-2">
            <img src="/Triangle.svg" alt="Triangle" />
            <h3 className="w-full sm:w-[200px] font-bold opacity-90 text-lg sm:text-[20px]">
              Learn Framework
            </h3>
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-[18px]">
              Master Modern Tech
            </h3>
            <p className="text-sm sm:text-[16px] max-sm:w-[265px]">
              Learn the framework built for React,{" "}
              <span className="font-bold">Next.js</span>.
            </p>
          </div>
          <div className="absolute bottom-0 right-0 sm:relative sm:bottom-auto sm:translate-x-[15px]">
            <img src="/NextJs.svg" alt="NextJs" className="w-24 sm:w-auto" />
          </div>
        </div>

        {/* Row 2 - Big on right */}
        <div className="sm:col-start-1 sm:col-span-1 sm:row-span-3 flex flex-col bg-[#DDDCE3] border p-5 py-4 rounded-lg relative gap-3">
          <div className="flex items-center gap-2">
            <img src="/Terminal.svg" alt="Terminal" />
            <h3 className="w-full sm:w-[200px] font-bold opacity-90 text-lg sm:text-[20px]">
              Backend Language
            </h3>
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-[18px]">
              Server-Side Language
            </h3>
            <p className="text-sm sm:text-[16px] max-sm:w-[200px]">
              Widely-used language for web, data, and scripting.
            </p>
          </div>
          <div className="absolute bottom-0 right-0 sm:relative sm:bottom-auto sm:translate-x-[15px]">
            <img src="/Python.svg" alt="Python" className="w-24 sm:w-auto" />
          </div>
        </div>

        <div className="sm:col-start-2 sm:col-span-1 sm:row-span-3 flex flex-col bg-[#DDDCE3] border p-5 py-4 rounded-lg relative gap-3">
          <div className="flex items-center gap-2">
            <img src="/Triangle.svg" alt="Triangle" />
            <h3 className="w-full sm:w-[200px] font-bold opacity-90 text-lg sm:text-[20px]">
              Mobile Framework
            </h3>
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-[18px]">
              Master Modern Tech
            </h3>
            <p className="text-sm sm:text-[16px] max-sm:w-[240px]">
              Cross-platform language for responsive and native-feeling apps.
            </p>
          </div>
          <div className="absolute bottom-0 right-0 sm:relative sm:bottom-auto sm:translate-x-[15px]">
            <img src="/DartBig.svg" alt="Dart" className="w-24 sm:w-auto" />
          </div>
        </div>

        <div className="sm:col-start-3 sm:col-span-3 sm:row-span-3 flex flex-col sm:flex-row justify-between border bg-[#DDDCE3] p-5 py-4 rounded-lg">
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5">
              <img src="/DatabaseSmall.svg" alt="Database" />
              <h2 className="text-2xl sm:text-[36px] font-bold">
                Backend Development
              </h2>
            </div>
            <div className="flex flex-col gap-3.5">
              <p className="w-full sm:w-[290px] text-lg sm:text-[20px] opacity-70">
                start by learning the{" "}
                <span className="opacity-100 font-bold">
                  basics of backend{" "}
                </span>
                with its best security practices!.
              </p>
              <div className="flex flex-col text-base sm:text-[18px]">
                <div className="flex gap-2.5 items-center">
                  <img src="/Check.svg" alt="Check" />
                  <p>Learn Basics of Backend</p>
                </div>
                <div className="flex gap-2.5 items-center">
                  <img src="/Check.svg" alt="Check" />
                  <p>Learn SQL</p>
                </div>
                <div className="flex gap-2.5 items-center">
                  <img src="/Check.svg" alt="Check" />
                  <p>Create Your Own Server</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center mt-4 sm:mt-0">
            <img src="Database.svg" alt="Database" className="w-32 sm:w-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModernTechSection;
