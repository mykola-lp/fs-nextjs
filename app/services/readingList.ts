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