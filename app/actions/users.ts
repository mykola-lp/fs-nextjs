"use server"

import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"

import { createUser } from "@/app/services/users"

import type { RegisterState } from "./users.types"

export async function registerUser(
  _prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState | never> {
  const username = formData.get("username") as string
  const name = formData.get("name") as string
  const password = formData.get("password") as string

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
