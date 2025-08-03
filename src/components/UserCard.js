"use client";

import { useState } from "react";
import EditInput from "./EditInput";
import SubmitButton from "./SubmitButton";
import { useActionState } from "react";
import { deleteUser, updateUser } from "@/lib/actions/adminAction";

function UserCard({ user }) {
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({
    fullName: user?.full_name,
    phone: user?.phone_number || "",
    id: user?.id,
  });
  const [showGroupDropdown, setShowGroupDropdown] = useState(false);

  const [formStateUpdate, formActionUpdate] = useActionState(updateUser, {});
  const [formStateDelete, formActionDelete] = useActionState(deleteUser, {});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const truncateText = (text, maxLength = 12) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const groups = Array.isArray(user?.groupName) ? user.groupName : [];

  return (
    <div className="relative border rounded-lg p-4 bg-white w-[350px]">
      <form action={formActionUpdate}>
        {/* Hidden Inputs */}
        <input type="hidden" name="role" value={user?.role} />
        <input type="hidden" name="originalPhone" value={user?.phone_number} />
        <input type="hidden" name="originalFullName" value={user?.full_name} />
        <input type="hidden" name="originalId" value={user?.id} />

        {/* Header */}
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="bg-black text-white font-bold rounded-full w-[40px] h-[40px] flex items-center justify-center">
              <p className="text-3xl mb-2">{user?.role[0]}</p>
            </div>
            <div>
              <p className="font-semibold text-lg text-gray-700">
                {user?.full_name}
              </p>
              {isEdit && (
                <EditInput
                  placeholder="Change Full Name"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                />
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsEdit((prev) => !prev)}
              className="bg-blue-400 text-white text-sm rounded px-5 font-semibold py-1 hover:bg-blue-500 transition w-[50px] flex items-center justify-center"
            >
              {isEdit ? "Cancel" : "Edit"}
            </button>
            {isEdit && (
              <SubmitButton title="Submit" titleUpdating="Editing..." />
            )}
          </div>
        </div>

        {/* Grid Info */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-4">
          {/* Phone Number */}
          <div>
            <label className="font-semibold">Phone Number</label>
            <p className="text-gray-600 text-sm">{user?.phone_number}</p>
            {isEdit && (
              <EditInput
                placeholder="Change Phone Number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            )}
          </div>

          {/* Group Dropdown */}
          <div className="relative">
            <label className="font-semibold">Group</label>
            <div
              className="flex items-center gap-1 w-fit cursor-pointer"
              onClick={() => setShowGroupDropdown((prev) => !prev)}
            >
              <img
                src="/SmallEnlargeArrow.svg"
                alt="SmallArrow"
                className={`mt-[1px] transition-transform duration-200 ${
                  showGroupDropdown ? "rotate-90" : ""
                }`}
              />
              <p className="text-gray-500 text-sm break-all">
                {groups[0] || "None"}
              </p>
            </div>

            {showGroupDropdown && groups.length > 0 && (
              <div className="absolute top-full left-0 mt-2 max-h-40 overflow-y-auto bg-white shadow-lg border rounded-md w-48 z-20 text-left">
                {groups.map((group, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {group}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Success / Error Message */}
        {formStateUpdate?.success && (
          <div className="text-green-500 mt-2">User updated successfully!</div>
        )}
        {formStateUpdate?.success === false && (
          <div className="text-red-500 mt-2">Failed to update user</div>
        )}
      </form>

      {/* Delete Button */}
      <div className="w-full flex flex-row-reverse">
        <form action={formActionDelete} className="mt-4">
          <input type="hidden" name="originalId" value={user?.id} />
          <input type="hidden" name="role" value={user?.role} />
          <button className="bg-red-400 text-white text-sm rounded px-5 py-1 hover:bg-red-500 transition w-[50px] flex justify-center items-center font-semibold">
            Delete
          </button>

          {formStateDelete?.success && (
            <div className="text-green-500 mt-2">
              User deleted successfully!
            </div>
          )}
          {formStateDelete?.success === false && (
            <div className="text-red-500 mt-2">Failed to delete user</div>
          )}
        </form>
      </div>
    </div>
  );
}

export default UserCard;
