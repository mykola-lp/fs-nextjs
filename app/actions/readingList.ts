"use server"

import { revalidatePath } from "next/cache"

import { requireCurrentUser } from "@/app/services/session"
import { createReadingListItem} from "@/app/services/readingList"

export const addToReadingList = async (formData: FormData) => {
  const currentUser = await requireCurrentUser()
  const id = Number(formData.get("id"))

  await createReadingListItem(
    currentUser.id,
    id,
  )

  revalidatePath(`/blogs/${id}`)
}
