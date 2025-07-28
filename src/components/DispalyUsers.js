"use client";

import UserCard from "./UserCard";

function DisplayUsers({ users = [] }) {
  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <div className="flex flex-wrap gap-6 justify-start">
        {users.map((user, index) => (
          <div key={index} className="w-full sm:w-[48%] lg:w-[30%]">
            <UserCard user={user} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DisplayUsers;
