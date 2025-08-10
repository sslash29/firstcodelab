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
    <div className="relative w-full rounded-lg border bg-white p-4 sm:w-[350px]">
      <form action={formActionUpdate}>
        {/* Hidden Inputs */}
        <input type="hidden" name="role" value={user?.role} />
        <input type="hidden" name="originalPhone" value={user?.phone_number} />
        <input type="hidden" name="originalFullName" value={user?.full_name} />
        <input type="hidden" name="originalId" value={user?.id} />

        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-1.5">
            <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-black font-bold text-white">
              <p className="mb-2 text-3xl">{user?.role[0]}</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-700">
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
              className="flex h-[30px] w-[60px] items-center justify-center rounded bg-blue-400 px-5 py-1 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              {isEdit ? "Cancel" : "Edit"}
            </button>
            {isEdit && (
              <SubmitButton title="Submit" titleUpdating="Editing..." />
            )}
          </div>
        </div>

        {/* Grid Info */}
        <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          {/* Phone Number */}
          <div>
            <label className="font-semibold">Phone Number</label>
            <p className="text-sm text-gray-600">{user?.phone_number}</p>
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
              className="flex w-fit cursor-pointer items-center gap-1"
              onClick={() => setShowGroupDropdown((prev) => !prev)}
            >
              <img
                src="/SmallEnlargeArrow.svg"
                alt="SmallArrow"
                className={`mt-[1px] transition-transform duration-200 ${
                  showGroupDropdown ? "rotate-90" : ""
                }`}
              />
              <p className="break-all text-sm text-gray-500">
                {groups[0] || "None"}
              </p>
            </div>

            {showGroupDropdown && groups.length > 0 && (
              <div className="absolute left-0 top-full z-20 mt-2 max-h-40 w-48 overflow-y-auto rounded-md border bg-white text-left shadow-lg">
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
          <div className="mt-2 text-green-500">User updated successfully!</div>
        )}
        {formStateUpdate?.success === false && (
          <div className="mt-2 text-red-500">Failed to update user</div>
        )}
      </form>

      {/* Delete Button */}
      <div className="flex w-full flex-row-reverse">
        <form action={formActionDelete} className="mt-4">
          <input type="hidden" name="originalId" value={user?.id} />
          <input type="hidden" name="role" value={user?.role} />
          <button className="flex h-[30px] w-[60px] items-center justify-center rounded bg-red-400 px-5 py-1 text-sm font-semibold text-white transition hover:bg-red-500">
            Delete
          </button>

          {formStateDelete?.success && (
            <div className="mt-2 text-green-500">
              User deleted successfully!
            </div>
          )}
          {formStateDelete?.success === false && (
            <div className="mt-2 text-red-500">Failed to delete user</div>
          )}
        </form>
      </div>
    </div>
  );
}

export default UserCard;
