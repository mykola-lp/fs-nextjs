"use server"

import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"

import { createUser } from "@/app/services/users"

import type { RegisterState } from "./users.types"

export async function registerUser(
  prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState | never> {
  const username = formData.get("username") as string
  const name = formData.get("name") as string
  const password = formData.get("password") as string

  if (!username || username.length <= 4) {
    return { error: "Username must be at least 4 characters long" }
  }

  if (!name || name.length <= 4) {
    return { error: "Name must be at least 4 characters long" }
  }

  if (!password || password.length <= 4) {
    return { error: "Password must be at least 4 characters long" }
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10)

    await createUser({
      username,
      name,
      passwordHash,
    })
  } catch {
    return {
      error: "Username already exists or registration failed",
    }
  }

  redirect("/login")
}
