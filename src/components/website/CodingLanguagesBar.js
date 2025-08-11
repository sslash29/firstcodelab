"use client";

import { useI18n } from "@/lib/i18n";

function CodingLanguagesBar() {
  const { t } = useI18n();
  return (
    <div className="flex flex-col sm:flex-row gap-8 sm:gap-30 px-4 sm:px-16 items-center">
      <div>
        <h2 className="text-2xl sm:text-4xl w-full sm:w-[377px] text-[#767676] text-center sm:text-left">
          {t("codingBar.learnCodingWith")}{" "}
          <span className="text-black font-bold">
            {t("codingBar.anyLanguage")}
          </span>{" "}
          {t("codingBar.youChoose")}
        </h2>
      </div>
      <div className="grid grid-cols-3 gap-4 place-items-center sm:flex sm:items-center sm:justify-between w-full">
        <img
          src="/PythonSmall.svg"
          alt="Python"
          className="w-[55px] h-[55px]"
        />
        <img src="/JSsmall.svg" alt="JS" className="w-[55px] h-[55px]" />
        <img src="/C.svg" alt="C" className="w-[55px] h-[55px]" />
        <img src="/Cpp.svg" alt="C++" className="w-[55px] h-[55px]" />
        <img src="/DartSmall.svg" alt="Dart" className="w-[55px] h-[55px]" />
        <img
          src="/TypescriptSmall.svg"
          alt="TypeScript"
          className="w-[55px] h-[55px]"
        />
      </div>
    </div>
  );
}

export default CodingLanguagesBar;
