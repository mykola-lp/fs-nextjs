import { requireCurrentUser } from "@/app/services/session"

import NewBlogForm from "./NewBlogForm"

const NewBlogPage = async () => {
  await requireCurrentUser()

  return <NewBlogForm />
}

export default NewBlogPage
