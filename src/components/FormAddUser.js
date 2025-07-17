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
    <div className="p-5">
      <form action={formAction} className="space-y-3">
        <div className="flex gap-2 items-center">
          <input
            name="fullName"
            placeholder="Full Name..."
            onChange={handleChange}
            value={form.fullName}
          />
          <input
            name="userId"
            placeholder="User Id..."
            onChange={handleChange}
            value={form.userId}
          />
        </div>
        <div className="flex flex-col gap-2">
          <input
            name="password"
            placeholder="Password..."
            type="password"
            onChange={handleChange}
            value={form.password}
          />
          <input
            name="phone"
            placeholder="Phone number..."
            type="number"
            onChange={handleChange}
            value={form.phone}
          />
          <select
            name="role"
            onChange={handleChange}
            className="bg-[#252525] text-white"
          >
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </select>
          <SubmitButton title={"Add User"} titleUpdating={"Adding..."} />
        </div>
        {formState?.success && <div className="">user Added successfully!</div>}
        {formState?.success === false && (
          <div className="">Failed to add the user</div>
        )}
      </form>
    </div>
  );
}

export default FormUser;
