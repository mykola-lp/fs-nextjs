"use server"

import { redirect } from "next/navigation"

import { createUser } from "@/app/services/users"

export async function registerUser(
  formData: FormData,
) {
  const username = formData.get("username") as string
  const name = formData.get("name") as string
  const password = formData.get("password") as string

  try {
    await createUser({
      username,
      name,
      password,
    })
  } catch {
    return {
      error: "Registration failed",
    }
  }

  redirect("/login")
}