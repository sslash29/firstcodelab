"use client";

import { useState, useEffect } from "react";
import DisplayGroup from "./DisplayGroup";
import SearchBarForGroups from "./SearchBarForGroups";

function GroupDisplayer({ groups, instructors, students }) {
  const [searchValue, setSearchValue] = useState("");
  const [groupsData, setGroupsData] = useState(groups);

  useEffect(() => {
    const filtered = groups.filter((group) =>
      group.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setGroupsData(filtered);
  }, [searchValue, groups]);

  return (
    <div className="flex flex-col">
      <SearchBarForGroups
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <div className="flex gap-1.5 ">
        {groupsData && groupsData.length > 0 ? (
          groupsData.map((group) => (
            <DisplayGroup
              key={group.id}
              group={group}
              instructors={instructors}
              students={students}
            />
          ))
        ) : (
          <p className="text-gray-500">No groups found.</p>
        )}
      </div>
    </div>
  );
}

export default GroupDisplayer;
