function ModernTechSection() {
  return (
    <div className="px-16 flex flex-col gap-5">
      <h2 className="text-5xl text-center font-bold">
        Learn Modern Technology
      </h2>
      <div className="grid grid-cols-5 auto-rows-[minmax(100px,_auto)] gap-4">
        {/* Row 1 - Big on left */}
        <div className="col-span-3 row-span-3 flex justify-between border bg-[#DDDCE3] p-5 py-6 rounded-lg">
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5">
              <img src="/Code.svg" alt="Code" />
              <h2 className="text-[36px] font-bold">Frontend Development</h2>
            </div>
            <div className="flex flex-col gap-3.5">
              <p className="w-[313px] text-[20px] opacity-70">
                start by learning the{" "}
                <span className="opacity-100 font-bold">
                  basics of frontend{" "}
                </span>
                with its latest updates!.
              </p>
              <div className="flex flex-col text-[18px]">
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
          <div className="flex flex-col items-center">
            <div className="flex gap-10">
              <img src="/Html.svg" alt="HTML" />
              <img src="/Css.svg" alt="CSS" />
            </div>
            <img src="/Js.svg" alt="JS" />
          </div>
        </div>

        <div className="col-start-4 col-span-1 row-span-3 flex flex-col bg-[#DDDCE3] border p-5 py-4 rounded-lg relative gap-3">
          <div className="flex items-center gap-2">
            <img src="/Books.svg" alt="Books" />
            <h3 className="w-[200px] font-bold opacity-90 text-[20px]">
              Learn JS Library
            </h3>
          </div>
          <div>
            <h3 className="font-bold text-[18px]">Up your skills with React</h3>
            <p className="text-[16px]">Write code in a professional way</p>
          </div>
          <div className="absolute bottom-0">
            <img src="/React.svg" alt="React" />
          </div>
        </div>

        <div className="col-start-5 col-span-1 row-span-3 flex flex-col bg-[#DDDCE3] border p-5 py-4 rounded-lg relative gap-3">
          <div className="flex items-center gap-2">
            <img src="/Triangle.svg" alt="Triangle" />
            <h3 className="w-[200px] font-bold opacity-90 text-[20px]">
              Learn Framework
            </h3>
          </div>
          <div>
            <h3 className="font-bold text-[18px]">Master Modern Tech</h3>
            <p className="text-[16px]">
              Learn the framework built for React,{" "}
              <span className="font-bold">Next.js</span>.
            </p>
          </div>
          <div className="absolute bottom-0 translate-x-[15px]">
            <img src="/NextJs.svg" alt="NextJs" />
          </div>
        </div>

        {/* Row 2 - Big on right */}
        <div className="col-start-1 col-span-1 row-span-3 flex flex-col bg-[#DDDCE3] border p-5 py-4 rounded-lg relative gap-3">
          <div className="flex items-center gap-2">
            <img src="/Terminal.svg" alt="Terminal" />
            <h3 className="w-[200px] font-bold opacity-90 text-[20px]">
              Backend Language
            </h3>
          </div>
          <div>
            <h3 className="font-bold text-[18px]">Server-Side Language</h3>
            <p className="text-[16px]">
              Widely-used language for web, data, and scripting.
            </p>
          </div>
          <div className="absolute bottom-0 translate-x-[15px]">
            <img src="/Python.svg" alt="Python" />
          </div>
        </div>

        <div className="col-start-2 col-span-1 row-span-3 flex flex-col bg-[#DDDCE3] border p-5 py-4 rounded-lg relative gap-3">
          <div className="flex items-center gap-2">
            <img src="/Triangle.svg" alt="Triangle" />
            <h3 className="w-[200px] font-bold opacity-90 text-[20px]">
              Mobile Framework
            </h3>
          </div>
          <div>
            <h3 className="font-bold text-[18px]">Master Modern Tech</h3>
            <p className="text-[16px]">
              Cross-platform language for responsive and native-feeling apps.
            </p>
          </div>
          <div className="absolute bottom-0 translate-x-[15px]">
            <img src="/DartBig.svg" alt="Dart" />
          </div>
        </div>

        <div className="col-start-3 col-span-3 row-span-3 flex justify-between border bg-[#DDDCE3] p-5 py-4 rounded-lg">
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5">
              <img src="/DatabaseSmall.svg" alt="Database" />
              <h2 className="text-[36px] font-bold">Backend Development</h2>
            </div>
            <div className="flex flex-col gap-3.5">
              <p className="w-[350px] text-[20px] opacity-70">
                start by learning the{" "}
                <span className="opacity-100 font-bold">
                  basics of backend{" "}
                </span>
                with its best security practices!.
              </p>
              <div className="flex flex-col text-[18px]">
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
          <div className="flex flex-col items-center">
            <img src="Database.svg" alt="Database" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModernTechSection;
