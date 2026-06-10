"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

import { addBlog } from "../services/blogs"
import { incrementBlogLikes } from "../services/blogs"
import { requireCurrentUser } from "../services/session"
import type { CreateBlogState } from "./blogs.types"

export const createBlog = async (
  prevState: CreateBlogState,
  formData: FormData
) => {
  const user = await requireCurrentUser()

  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string

  const values = { title, author, url }
  const errors: NonNullable<CreateBlogState["errors"]> = {}

  if (!title || title.length < 5) {
    errors.title = "Blog title must be at least 5 characters long"
  }

  if (!author || author.length < 5) {
    errors.author = "Blog author must be at least 5 characters long"
  }

  if (!url || url.length < 5) {
    errors.url = "Blog URL must be at least 5 characters long"
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values }
  }

  await addBlog(
    title,
    author,
    url,
    user.id
  )

  revalidatePath("/blogs")
  redirect("/blogs")
}

export const likeBlog = async (formData: FormData) => {
  const id = Number(formData.get("id"))

  await incrementBlogLikes(id)

  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}
