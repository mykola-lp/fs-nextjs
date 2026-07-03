import { eq, and } from "drizzle-orm"

import { db } from "@/db"
import { readingList } from "@/db/schema"

export const createReadingListItem = async (
  userId: number,
  blogId: number,
) => {
  const exists = await isBlogInReadingList(
    userId,
    blogId,
  )

  if (exists) return

  return db.insert(readingList).values({
    userId,
    blogId,
  })
}

export const getUserReadingList = async (
  userId: number,
) => {
  return db.query.readingList.findMany({
    where: eq(readingList.userId, userId),
    with: {
      blog: true,
    },
  })
}

export const isBlogInReadingList = async (
  userId: number,
  blogId: number,
) => {
  const item = await db.query.readingList.findFirst({
    where: and(
      eq(readingList.userId, userId),
      eq(readingList.blogId, blogId),
    ),
  })

  return !!item
}

export const markReadingListItemAsRead = async (
  userId: number,
  blogId: number,
) => {
  await db
    .update(readingList)
    .set({
      read: true,
    })
    .where(
      and(
        eq(readingList.userId, userId),
        eq(readingList.blogId, blogId),
      ),
    )
}