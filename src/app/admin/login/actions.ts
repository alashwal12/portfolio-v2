"use server";

import { login } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function loginAction(prevState: any, formData: FormData) {
  const password = formData.get("password") as string;
  
  try {
    await login(password);
  } catch (error) {
    return { error: "Invalid password" };
  }
  
  redirect("/admin");
}
