import { notFound } from "next/navigation"

import { getNoteById } from "@/app/services/notes"
import { toggleNoteImportance } from "@/app/actions/notes"

const NotePage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const note = await getNoteById(Number(id))

  if (!note) {
    notFound()
  }

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">
        {note.content}
      </h2>

      <p>
        {note.important ? "Important" : "Not important"}
      </p>

      <form action={toggleNoteImportance}>
        <input type="hidden" name="id" value={note.id} />

        <button
          type="submit"
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          {note.important
            ? "Mark as not important"
            : "Mark as important"}
        </button>
      </form>
    </main>
  )
}

export default NotePage