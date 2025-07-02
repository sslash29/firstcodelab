"use client";

import UserCard from "./UserCard";

function DisplayUsers({ users = [], title = "" }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-white">{title}</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {users?.map((user, id) => (
          <div key={id}>
            <UserCard user={user} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DisplayUsers;
