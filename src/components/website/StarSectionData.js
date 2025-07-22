"use client";

function StarSectionData({ firstText, secondText }) {
  return (
    <div className="flex items-center gap-1">
      <img src="/SmallStar.svg" alt="Star" />
      <p>{firstText}</p>
      <div className="w-[64px] h-[0.5px] bg-black mx-1.5" />
      <p>{secondText}</p>
    </div>
  );
}

export default StarSectionData;
