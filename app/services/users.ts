import { eq } from "drizzle-orm"

import bcrypt from "bcryptjs"

import { db } from "@/db"
import { users } from "@/db/schema"

export const getUsers = async () => {
  return db.query.users.findMany()
}

export const getUserWithBlogsByUsername = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: {
      blogs: true,
    },
  })
}

export const createUser = async ({
  username,
  name,
  password,
}: {
  username: string
  name: string
  password: string
}) => {
  const passwordHash = await bcrypt.hash(
    password,
    10,
  )

  await db.insert(users).values({
    username,
    name,
    passwordHash,
  })
}