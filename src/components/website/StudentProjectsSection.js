import Image from "next/image";

export default function ProjectGrid() {
  return (
    <div
      className="px-16 flex gap-5 
    "
    >
      <div className="w-fit">
        <Image
          src="/SwipeProject.png"
          alt="swipe project"
          width={680}
          height={470}
          className="rounded-lg"
        />
      </div>
      <div className="flex gap-5 flex-col gap-y-10 w-[610px] ">
        <div className="w-[300px] flex gap-5 h-fit ">
          <Image
            src="/pepsi.png"
            alt="pepsi project"
            className="rounded-lg"
            width={300}
            height={215}
          />
          <Image
            src="/pizzaria.png"
            alt="pizzaria project"
            className="rounded-lg "
            width={300}
            height={215}
          />
        </div>
        <div className="w-[300px] flex gap-5 h-fit ">
          <Image
            src="/portofolio.png"
            alt="portofolio project"
            className="rounded-lg "
            width={300}
            height={215}
          />
          <Image
            src="/album.png"
            alt="album project"
            width={300}
            height={215}
            className="rounded-lg "
          />
        </div>
      </div>
    </div>
  );
}
