export default function ProjectGrid() {
  return (
    <div
      className="px-16 flex flex-wrap gap-5 
    "
    >
      <div className="w-fit">
        <img
          src="/SwipeProject.png"
          alt="img"
          className="rounded-lg border w-[680px] h-[470px]"
        />
      </div>
      <div className="flex gap-5 flex-col gap-y-10 w-[610px] ">
        <div className="w-[300px] flex gap-5 h-fit ">
          <img
            src="/SwipeProject.png"
            alt="img"
            className="rounded-lg border"
          />
          <img
            src="/SwipeProject.png"
            alt="img"
            className="rounded-lg border"
          />
        </div>
        <div className="w-[300px] flex gap-5 h-fit ">
          <img
            src="/SwipeProject.png"
            alt="img"
            className="rounded-lg border"
          />
          <img
            src="/SwipeProject.png"
            alt="img"
            className="rounded-lg border"
          />
        </div>
      </div>
    </div>
  );
}
