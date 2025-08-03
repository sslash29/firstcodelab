"use client";

import { useState } from "react";
import RateUser from "./RateUser";

function DisplayUser({ users = [], typeOfUser }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2.5 mt-2.5 overflow-y-scroll">
        {users.map((user, index) => {
          return (
            <div
              key={index}
              className="flex flex-col gap-2.5 text-black rounded-lg p-4 border"
            >
              <div className="flex justify-between w-full items-center">
                <h2 className="text-xl font-bold">{user.full_name}</h2>
                <span className="bg-black text-white px-2 py-1 text-sm rounded-md font-semibold">
                  {Array.isArray(user.groupName) && user.groupName.length > 0
                    ? user.groupName[0]
                    : "None"}
                </span>
              </div>
              <div className="flex items-center w-full gap-3">
                <label className="font-medium text-sm">Phone Number:</label>
                <p className="font-bold text-sm">{user.phone_number}</p>
              </div>
              <button
                onClick={() => toggle(index)}
                className="bg-[#35A7FF] text-white px-4 py-1 rounded"
              >
                {openIndex === index ? "Cancel" : "Rate"}
              </button>
              {openIndex === index && (
                <div className="text-sm text-gray-700 mt-2">
                  <RateUser userId={user.id} type={typeOfUser} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DisplayUser;
