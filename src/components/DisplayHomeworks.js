"use client";

import DisplayHomework from "./DisplayHomework";

function DisplayHomeworks({ homeworks }) {
  return (
    <div className="flex flex-col px-6 ">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-4xl">Homework</h2>
        <button className="border font-regular flex items-center text-xl rounded-xl px-4 gap-2 ">
          In Progress
          <img
            src="/SmallEnlargeArrow.svg"
            alt="Arrow"
            className=" scale-150 rotate-90 mt-0.5"
          />
        </button>
      </div>

      <div>
        {homeworks.map((homework, key) => (
          <div key={key}>
            <DisplayHomework homeworkData={homework} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DisplayHomeworks;
