import { requireCurrentUser } from "@/app/services/session"

import NewNoteForm from "./NewNoteForm"

const NewNotePage = async () => {
  await requireCurrentUser()

  return <NewNoteForm />
}

export default NewNotePage
