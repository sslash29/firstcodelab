"use client";

import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import SearchBar from "./SearchBar";

function DisplayUsers({ users = [] }) {
  const [searchValue, setSearchValue] = useState("");
  const [userData, setUserData] = useState(users);
  useEffect(() => {
    const filtered = users.filter((user) =>
      user.full_name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setUserData(filtered);
  }, [searchValue, users]);
  return (
    <div className="flex flex-col">
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="p-6 max-w-screen-xl mx-auto max-sm:p-2">
        <div className="flex flex-wrap gap-6 max-sm:justify-center max-sm:gap-3">
          {userData && userData.length > 0 ? (
            userData.map((user, index) => (
              <div key={index}>
                <UserCard user={user} />
              </div>
            ))
          ) : (
            <p className="text-gray-500">No Users found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DisplayUsers;
