"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

import { addNote, toggleImportance } from "../services/notes"
import { getCurrentUser } from "../services/session"

export const createNote = async (
  formData: FormData
) => {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const content = formData.get("content") as string
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
