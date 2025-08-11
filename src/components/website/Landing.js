"use client";

import BulletPoint from "./BulletPoint";
import StarSectionData from "./StarSectionData";
import { useI18n } from "@/lib/i18n";
function Landing() {
  const { t, lang } = useI18n();
  return (
    <div
      className="px-16 min-h-[calc(100vh-70px)] bg-cover bg-center flex flex-col max-sm:px-6"
      style={{ backgroundImage: 'url("/Grid.png")' }}
    >
      <div className="h-[500px] flex items-center gap-16 max-sm:gap-4 max-sm:justify-center">
        <div className="flex flex-col max-sm:mt-20">
          <h1 className="text-5xl font-bold w-[745px] max-sm:text-4xl max-sm:w-[329px] flex max-sm:items-center  flex-col">
            {t("hero.line1")}
            <span>{t("hero.line2")}</span>
            <span className="text-[#35A7FF]"> {t("hero.line3")}</span>
          </h1>
          <div className="mx-4 mt-4 flex flex-col gap-3.5 ">
            <BulletPoint>{t("hero.point1")}</BulletPoint>
            <BulletPoint>{t("hero.point2")}</BulletPoint>
            <BulletPoint>{t("hero.point3")}</BulletPoint>
          </div>
        </div>

        <div className="flex flex-col gap-20 max-sm:hidden ">
          <h2 className="w-[412px] text-2xl font-semibold">
            {t("hero.startCoding")}
          </h2>
          <button className="flex items-center px-4 py-2 gap-2 text-lg bg-[#EEEEEE] w-fit rounded-2xl cursor-pointer transition-all hover:scale-105">
            <img src="/Arrow.svg" alt="Arrow" /> {t("hero.explore")}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 translate-y-3 max-sm:hidden">
        <StarSectionData
          firstText={t("hero.weAreBest")}
          secondText={t("hero.teaching")}
        />
        <StarSectionData
          firstText={t("hero.weAreBest")}
          secondText={t("hero.mastering")}
        />
        <StarSectionData
          firstText={t("hero.weAreBest")}
          secondText={t("hero.teaching")}
        />
        <StarSectionData
          firstText={t("hero.weAreBest")}
          secondText={t("hero.mastering")}
        />
        <div className="flex items-center ">
          <img src="/SmallStar.svg" alt="Star" />
          <p>{t("hero.weAreBest")}</p>
          <div className="w-[88px] h-[0.5px] bg-black mx-1.5" />
          <img src="/SmallStar.svg" alt="Star" />
        </div>
      </div>
      <div className="flex items-center justify-between bg-[#DDDCE3] rounded-lg w-full p-2 h-[230px] px-20 mt-10 max-sm:px-5 max-sm:flex-col max-sm:py-10 max-sm:h-fit max-sm:gap-10">
        <div className="flex items-center gap-10 max-sm:gap-4 max-sm:justify-center">
          <img src="/BigStar.svg" alt="Star" className="max-sm:scale-80" />
          <h2 className="w-[273px] text-5xl font-bold max-sm:text-3xl ">
            {t("hero.joinCommunity")}
          </h2>
        </div>
        <div className="flex gap-5 mr-40 max-sm:flex-col max-sm:mr-0">
          <div className="flex flex-col items-center">
            <h3 className="font-bold text-[40px] max-sm:text-5xl">40K</h3>
            <p className="text-[20px] max-sm:text-2xl">
              {t("hero.stats.students")}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="font-bold text-[40px] max-sm:text-5xl">90+</h3>
            <p className="text-[20px] max-sm:text-2xl">
              {t("hero.stats.countries")}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="font-bold text-[40px] max-sm:text-5xl">15+</h3>
            <p className="text-[20px] max-sm:text-2xl">
              {t("hero.stats.courses")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
