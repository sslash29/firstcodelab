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
          alt="img"
          className="rounded-lg border w-[680px] h-[470px]"
        />
      </div>
      <div className="flex gap-5 flex-col gap-y-10 w-[610px] ">
        <div className="w-[300px] flex gap-5 h-fit ">
          <Image src="/pepsi.png" alt="img" className="rounded-lg border" />
          <Image src="/pizzaria.png" alt="img" className="rounded-lg border" />
        </div>
        <div className="w-[300px] flex gap-5 h-fit ">
          <Image
            src="/portofolio.png"
            alt="img"
            className="rounded-lg border"
          />
          <Image src="/album.png" alt="img" className="rounded-lg border" />
        </div>
      </div>
    </div>
  );
}
