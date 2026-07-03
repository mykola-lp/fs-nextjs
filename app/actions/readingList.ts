"use server"

import { revalidatePath } from "next/cache"

import { requireCurrentUser } from "@/app/services/session"
import { createReadingListItem, markReadingListItemAsRead} from "@/app/services/readingList"

export const addToReadingList = async (formData: FormData) => {
  const currentUser = await requireCurrentUser()
  const id = Number(formData.get("id"))

  await createReadingListItem(
    currentUser.id,
    id,
  )

  revalidatePath(`/blogs/${id}`)
  revalidatePath("/me")
}

export const markAsRead = async (
  formData: FormData,
) => {
  const user = await requireCurrentUser()

  const blogId = Number(
    formData.get("blogId"),
  )

  await markReadingListItemAsRead(
    user.id,
    blogId,
  )

  revalidatePath("/me")
}