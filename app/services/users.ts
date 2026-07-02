import { eq } from "drizzle-orm"

import { db } from "@/db"
import { users } from "@/db/schema"

export const getUsers = async () => {
  return db.query.users.findMany()
}

export const getUserByUsername = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(
      users.username,
      username
    ),
  })
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
  passwordHash,
}: {
  username: string
  name: string
  passwordHash: string
}) => {
  return db.insert(users).values({
    username,
    name,
    passwordHash,
  })
}

export const updateUserToken = async (
  username: string,
  token: string,
) => {
  return db
    .update(users)
    .set({
      token,
    })
    .where(eq(users.username, username))
}

export const getUserByToken = async (
  token: string
) => {
  return db.query.users.findFirst({
    where: eq(users.token, token),
  })
}