import Image from "next/image";

export default function ProjectGrid() {
  return (
    <div className="px-4 sm:px-16 flex flex-col sm:flex-row gap-5">
      <div className="w-full sm:w-fit">
        <Image
          src="/SwipeProject.png"
          alt="swipe project"
          width={680}
          height={470}
          className="rounded-lg w-full h-auto"
        />
      </div>
      <div className="flex flex-col gap-5 sm:gap-y-10 w-full sm:w-[610px]">
        <div className="flex flex-col sm:flex-row gap-5">
          <Image
            src="/pepsi.png"
            alt="pepsi project"
            className="rounded-lg w-full h-auto"
            width={300}
            height={215}
          />
          <Image
            src="/pizzaria.png"
            alt="pizzaria project"
            className="rounded-lg w-full h-auto"
            width={300}
            height={215}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-5">
          <Image
            src="/portofolio.png"
            alt="portofolio project"
            className="rounded-lg w-full h-auto"
            width={300}
            height={215}
          />
          <Image
            src="/album.png"
            alt="album project"
            width={300}
            height={215}
            className="rounded-lg w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
