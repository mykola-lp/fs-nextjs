"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"

import { createNote } from "@/app/actions/notes"
import { useNotification } from "@/app/components/NotificationContext"

const NewNoteForm = () => {
  const [state, formAction] = useActionState(createNote, {
    error: "",
    success: false,
  })

  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("note created")
      router.push("/notes")
    }
  }, [state, showNotification, router])

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        Create a new note
      </h2>

      <form action={formAction} className="space-y-4">
        <div>
          <label className="block mb-1">
            Content
          </label>

          <input
            type="text"
            name="content"
            required
            minLength={10}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <label className="flex items-center gap-2">
          <input type="checkbox" name="important" />
          <span>Important</span>
        </label>

        <button
          type="submit"
          className="border rounded px-4 py-2 hover:bg-gray-100"
        >
          Create
        </button>
      </form>

      {state.error && (
        <p className="mt-4 text-red-600">
          {state.error}
        </p>
      )}
    </main>
  )
}

export default NewNoteForm