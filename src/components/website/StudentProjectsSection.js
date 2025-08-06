import Image from "next/image";

export default function ProjectGrid() {
  return (
    <div
      className="px-16 flex gap-5 
    "
    >
      <div className="w-fit">
        <Image
          src="public/SwipeProject.png"
          alt="img"
          width={680}
          height={470}
          className="rounded-lg"
        />
      </div>
      <div className="flex gap-5 flex-col gap-y-10 w-[610px] ">
        <div className="w-[300px] flex gap-5 h-fit ">
          <Image
            src="public/pepsi.png"
            alt="img"
            className="rounded-lg"
            width={300}
            height={215}
          />
          <Image
            src="public/pizzaria.png"
            alt="img"
            className="rounded-lg "
            width={300}
            height={215}
          />
        </div>
        <div className="w-[300px] flex gap-5 h-fit ">
          <Image
            src="public/portofolio.png"
            alt="img"
            className="rounded-lg "
            width={300}
            height={215}
          />
          <Image
            src="public/album.png"
            alt="img"
            width={300}
            height={215}
            className="rounded-lg "
          />
        </div>
      </div>
    </div>
  );
}
