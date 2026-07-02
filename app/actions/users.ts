"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

import bcrypt from "bcryptjs"

import { createUser, getUserByUsername, updateUserToken } from "@/app/services/users"
import type { RegisterState } from "@/app/actions/users.types"

export async function registerUser(
  prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState | never> {
  const username = formData.get("username") as string
  const name = formData.get("name") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  if (!username || username.length < 4) {
    return {
      error: "Username must be at least 4 characters long",
      success: false,
    }
  }

  if (!name || name.length < 4) {
    return {
      error: "Name must be at least 4 characters long",
      success: false,
    }
  }

  if (!password || password.length < 4) {
    return {
      error: "Password must be at least 4 characters long",
      success: false,
    }
  }

  if (!confirmPassword || confirmPassword.length < 4) {
    return {
      error: "Confirm Password must be at least 4 characters long",
      success: false,
    }
  }

  if (password !== confirmPassword) {
    return {
      error: "Passwords do not match",
      success: false,
    }
  }

  const existingUser = await getUserByUsername(username)

  if (existingUser) {
    return {
      error: "Username already exists",
      success: false,
    }
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
      error: "Registration failed",
      success: false,
    }
  }

  return {
    error: "",
    success: true,
  }
}

export async function generateToken() {
  const session = await auth()

  if (!session?.user?.email) {
    throw new Error("Unauthorized")
  }

  const token = crypto.randomUUID()

  await updateUserToken(
    session.user.email,
    token,
  )

  revalidatePath("/me")
}