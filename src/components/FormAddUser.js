"use client";

import { addUser } from "@/lib/actions/adminAction";
import { useActionState, useState } from "react";
import SubmitButton from "./SubmitButton";

function FormUser() {
  const [form, setForm] = useState({
    fullName: "",
    userId: "",
    password: "",
    phone: "",
    role: "student",
  });

  const [formState, formAction] = useActionState(addUser, {});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <div className="flex flex-col items-center justify-center p-5 bg-white border w-[431px] gap-5">
        <div className="text-center font-bold text-5xl">Create User</div>

        <form action={formAction} className="space-y-3 w-full">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <label className="font-bold">Full Name</label>
              <input
                name="fullName"
                placeholder="Full Name..."
                className="border rounded-lg p-1 pl-2"
                onChange={handleChange}
                value={form.fullName}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-bold">User ID</label>
              <input
                name="userId"
                placeholder="User ID..."
                className="border rounded-lg p-1 pl-2"
                onChange={handleChange}
                value={form.userId}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-bold">Password</label>
              <input
                name="password"
                placeholder="Password..."
                type="password"
                className="border rounded-lg p-1 pl-2"
                onChange={handleChange}
                value={form.password}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-bold">Phone Number</label>
              <input
                name="phone"
                placeholder="Phone number..."
                type="number"
                className="border rounded-lg p-1 pl-2"
                onChange={handleChange}
                value={form.phone}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-bold">Role</label>
              <select
                name="role"
                onChange={handleChange}
                value={form.role}
                className="border rounded-lg p-1 pl-2 bg-[#252525] text-white"
              >
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <SubmitButton title={"Add User"} titleUpdating={"Adding..."} />
          </div>

          {formState?.success && (
            <div className="text-green-600 font-semibold">
              User added successfully!
            </div>
          )}
          {formState?.success === false && (
            <div className="text-red-600 font-semibold">
              Failed to add the user.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default FormUser;
