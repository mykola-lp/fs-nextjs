import { NextResponse } from "next/server"

import { db } from "@/db"
import { blogs, notes, readingList, users } from "@/db/schema"

export const DELETE = async () => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      {
        error: "This endpoint is not available in production",
      },
      {
        status: 403,
      },
    )
  }

  await db.delete(readingList)
  await db.delete(blogs)
  await db.delete(notes)
  await db.delete(users)

  return NextResponse.json({
    message: "Database reset successfully",
  })
}

// curl -X DELETE http://localhost:3000/api/testing/reset

// OR
// http DELETE :3000/api/testing/reset
