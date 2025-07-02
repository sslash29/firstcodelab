"use client";

import { useState } from "react";
import EditInput from "./EditInput";
import SubmitButton from "./SubmitButton";
import { useActionState } from "react";
import { deleteUser, updateUser } from "@/lib/action";

function UserCard({ user }) {
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({
    fullName: user?.full_name,
    userId: user?.userId,
    password: user?.password,
    phone: user?.phone_number || "",
  });

  const [formStateUpdate, formActionUpdate] = useActionState(updateUser, {});
  const [formStateDelete, formActionDelete] = useActionState(deleteUser, {});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition bg-white">
      <form action={formActionUpdate}>
        <input type="hidden" name="originalUserId" value={user?.userId} />
        <input type="hidden" name="role" value={user?.role} />
        <input type="hidden" name="originalPhone" value={user?.phone_number} />
        <input type="hidden" name="originalPassword" value={user?.password} />
        <input type="hidden" name="originalFullName" value={user?.full_name} />

        <p className="font-semibold text-lg text-gray-700">{user?.full_name}</p>
        {isEdit && (
          <EditInput
            placeholder="Change User full Name"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
          />
        )}

        <p className="text-gray-600">📞 {user?.phone_number}</p>
        {isEdit && (
          <EditInput
            placeholder="Change User phone number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
        )}

        <p className="text-gray-600">🆔 {user?.userId}</p>
        {isEdit && (
          <EditInput
            placeholder="Change User userId"
            name="userId"
            value={form.userId}
            onChange={handleChange}
          />
        )}

        <p className="text-gray-500 text-sm break-all">🔐 {user?.password}</p>
        {isEdit && (
          <EditInput
            placeholder="Change User password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        )}

        <div className="flex gap-2 mt-3">
          <button
            type="button"
            onClick={() => setIsEdit((prev) => !prev)}
            className="bg-blue-400 text-white text-sm rounded px-3 py-2 hover:bg-blue-500 transition"
          >
            {isEdit ? "Cancel" : "Edit"}
          </button>

          {isEdit && <SubmitButton title="Submit" titleUpdating="Editing..." />}
        </div>

        {formStateUpdate?.success && (
          <div className="text-green-500 mt-2">User updated successfully!</div>
        )}
        {formStateUpdate?.success === false && (
          <div className="text-red-500 mt-2">Failed to update user</div>
        )}
      </form>

      <form action={formActionDelete} className="mt-2">
        <input type="hidden" name="userId" value={user?.userId} />
        <input type="hidden" name="role" value={user?.role} />
        <button className="bg-red-400 text-white text-sm rounded px-3 py-2 hover:bg-red-500 transition">
          Delete
        </button>

        {formStateDelete?.success && (
          <div className="text-green-500 mt-2">User deleted successfully!</div>
        )}
        {formStateDelete?.success === false && (
          <div className="text-red-500 mt-2">Failed to delete user</div>
        )}
      </form>
    </div>
  );
}

export default UserCard;
