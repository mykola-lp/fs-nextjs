import { eq } from "drizzle-orm"

import { db } from "@/db"
import { readingList } from "@/db/schema"

export const createReadingListItem = async (
  userId: number,
  blogId: number,
) => {
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