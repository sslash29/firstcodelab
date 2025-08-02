"use client";

import { useActionState, useEffect, useState } from "react";
import SubmitButton from "./SubmitButton";
import { handleLogIn } from "@/lib/actions/actions";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

function LogInForm() {
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    fullName: "",
  });

  const [loginState, handleLogInForm, isPending] = useActionState(handleLogIn, {
    success: null,
    message: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (loginState?.success && loginState?.user) {
      sessionStorage.setItem("user", JSON.stringify(loginState.user));

      if (loginState.user.role === "admin") router.push("/admin/add-user");
      if (loginState.user.role === "instructor") router.push("/instructor");
      if (loginState.user.role === "student") router.push("/student");
    }
  }, [loginState]);

  return (
    <div className="border bg-white text-black p-5 rounded w-[300px] flex flex-col gap-5">
      <h2 className="text-5xl font-bold text-center">Log In</h2>

      <form className="flex flex-col gap-3" action={handleLogInForm}>
        <div className="flex flex-col justify-center">
          <label className="font-semibold text-lg">Full Name</label>
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="border rounded-lg p-1 pl-2"
            placeholder="full name..."
          />
        </div>
        <div className="flex flex-col justify-center">
          <label className="font-semibold text-lg">User Id</label>
          <input
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
            className="border rounded-lg p-1 pl-2"
            placeholder="user id..."
          />
        </div>
        <div className="flex flex-col justify-center mb-3">
          <label className="font-semibold text-lg">Password</label>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            type="password"
            className="border rounded-lg p-1 pl-2"
            placeholder="password..."
          />
        </div>
        <SubmitButton title="log in" titleUpdating="logging in..." />
      </form>

      {/* ✅ Conditional Message Display */}
      {loginState.success === false && (
        <p className="text-red-600 text-center font-semibold">
          ❌ {loginState.message || "Login failed"}
        </p>
      )}
    </div>
  );
}

export default LogInForm;
