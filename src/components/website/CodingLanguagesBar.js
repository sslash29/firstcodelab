"use client";

function CodingLanguagesBar() {
  return (
    <div className="flex gap-30 px-16 items-center ">
      <div>
        <h2 className="text-4xl w-[377px] text-[#767676]">
          learn coding with{" "}
          <span className="text-black font-bold">any langauge</span> you choose
        </h2>
      </div>
      <div className="flex items-center justify-between w-full">
        <img src="/PythonSmall.svg" alt="Python" />
        <img src="/JSsmall.svg" alt="JS" />
        <img src="/C.svg" alt="C" />
        <img src="/Cpp.svg" alt="C++" />
        <img src="/DartSmall.svg" alt="Dart" />
        <img src="/TypescriptSmall.svg" alt="Dart" />
      </div>
    </div>
  );
}

export default CodingLanguagesBar;
