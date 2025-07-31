"use server";

import { supabase } from "../supabase";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

async function handleLogIn(prevState, formData) {
  const fullName = formData.get("fullName")?.trim();
  const password = formData.get("password")?.trim();

  const tables = ["student", "admin", "instructor"];
  const users = [];

  for (const table of tables) {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("full_name", fullName);

    if (error) continue;
    if (Array.isArray(data) && data.length > 0) {
      data.forEach((user) => users.push({ ...user, role: table }));
    }
  }

  for (const user of users) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const { password: _, ...userWithoutPassword } = user;

      // ✅ Set cookie on login
      cookies().set("auth", JSON.stringify(userWithoutPassword), {
        path: "/",
        httpOnly: false,
        maxAge: 60 * 60 * 1, // 1 hour
      });

      return {
        success: true,
        user: userWithoutPassword,
        message: `Logged in as ${user.role}`,
      };
    }
  }

  return {
    success: false,
    message: "Invalid credentials.",
  };
}

export { handleLogIn };
