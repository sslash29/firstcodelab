"use client";

import { useState } from "react";
import RateUser from "./RateUser";

function DisplayUser({ users = [], typeOfUser }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="flex flex-col gap-2.5 mt-2.5">
      {users.map((user, index) => (
        <div
          key={index}
          className="flex flex-col gap-2.5 bg-red-200 text-black rounded p-4"
        >
          <h2 className="text-lg font-semibold">{user.full_name}</h2>
          <div>
            <label className="font-medium">Phone Number</label>
            <p>{user.phone_number}</p>
          </div>
          <button
            onClick={() => toggle(index)}
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            {openIndex === index ? "Cancel" : "Rate"}
          </button>
          {openIndex === index && (
            <div className="text-sm text-gray-700 mt-2">
              <RateUser userId={user.id} type={typeOfUser} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default DisplayUser;
