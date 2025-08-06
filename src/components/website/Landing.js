"use client";

import BulletPoint from "./BulletPoint";
import StarSectionData from "./StarSectionData";
function Landing() {
  return (
    <div
      className="px-16 min-h-[calc(100vh-70px)] bg-cover bg-center flex flex-col"
      style={{ backgroundImage: 'url("/Grid.png")' }}
    >
      <div className="h-[500px] flex items-center  gap-16">
        <div className="flex flex-col ">
          <h1 className="text-5xl font-bold w-[745px]">
            Empowering the Next Generation of
            <span className="text-[#35A7FF]"> [ ...Developers... ]</span>
          </h1>
          <div className="mx-4 mt-4 flex flex-col gap-3.5">
            <BulletPoint>1 : 1 Online Classes For All Ages</BulletPoint>
            <BulletPoint>High Quality, Cheap Prices</BulletPoint>
            <BulletPoint>
              For All ages, weather a toddler, teenager, adult
            </BulletPoint>
          </div>
        </div>

        <div className="flex flex-col gap-20 ">
          <h2 className="w-[412px] text-2xl font-semibold">
            Start Coding by choosing your own path, Creating Games, Website and
            much more...
          </h2>
          <button className="flex items-center px-4 py-2 gap-2 text-lg bg-[#EEEEEE] w-fit rounded-2xl cursor-pointer transition-all hover:scale-105">
            <img src="/Arrow.svg" alt="Arrow" /> explore more
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 translate-y-3">
        <StarSectionData firstText="We Are Best" secondText="Teaching" />
        <StarSectionData firstText="We Are Best" secondText="Mastering" />
        <StarSectionData firstText="We Are Best" secondText="Teaching" />
        <StarSectionData firstText="We Are Best" secondText="Mastering" />
        <div className="flex items-center ">
          <img src="/SmallStar.svg" alt="Star" />
          <p>We Are Best</p>
          <div className="w-[88px] h-[0.5px] bg-black mx-1.5" />
          <img src="/SmallStar.svg" alt="Star" />
        </div>
      </div>
      <div className="flex items-center justify-between bg-[#DDDCE3] rounded-lg w-full p-2 h-[230px] px-20 mt-10">
        <div className="flex items-center gap-10">
          <img src="/BigStar.svg" alt="Star" />
          <h2 className="w-[273px] text-5xl font-bold">Join A Big Community</h2>
        </div>
        <div className="flex gap-5 mr-40">
          <div className="flex flex-col items-center ">
            <h3 className="font-bold text-[40px]">40K</h3>
            <p className="text-[20px]">Students</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="font-bold text-[40px]">90+</h3>
            <p className="text-[20px]">Countries</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="font-bold text-[40px]">15+</h3>
            <p className="text-[20px]">Courses</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
