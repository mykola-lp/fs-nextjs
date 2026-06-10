"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

import { addNote, toggleImportance } from "../services/notes"
import { requireCurrentUser } from "../services/session"

export const createNote = async (
  prevState: { error: string },
  formData: FormData
) => {
  const user = await requireCurrentUser()

  const content = formData.get("content") as string

  if (!content || content.length < 10) {
    return { error: "Note content must be at least 10 characters long" }
  }

  const important = formData.get("important") === "on"

  await addNote(
    content,
    important,
    user.id
  )

  revalidatePath("/notes")
  redirect("/notes")
}

export const toggleNoteImportance = async (formData: FormData) => {
  const id = Number(formData.get("id"))

  await toggleImportance(id)

  revalidatePath(`/notes/${id}`)
  revalidatePath("/notes")
}
