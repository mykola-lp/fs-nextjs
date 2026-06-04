import Link from "next/link"
import { notFound } from "next/navigation"

import { getUserById, getNotesByUserId } from "../../services/users"

const UserPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const user = await getUserById(Number(id))

  if (!user) {
    notFound()
  }

  const notes = await getNotesByUserId(Number(id))

  if (!notes) {
    notFound()
  }

  return (
    <div>
      <h2>{user.name}</h2>

      <p>Username: {user.username}</p>
      <h3>Notes</h3>
      
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <Link href={`/notes/${note.id}`}>
              {note.content}
            </Link>
    
            {note.important && <strong> (important)</strong>}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserPage
