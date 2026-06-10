"use server"

import { revalidatePath } from "next/cache"

import { requireCurrentUser } from "@/app/services/session"
import { addBlog, incrementBlogLikes } from "@/app/services/blogs"

import type { CreateBlogState } from "@/app/actions/blogs.types"

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
    return {
      errors,
      values,
      success: false,
    }
  }

  await addBlog(
    title,
    author,
    url,
    user.id
  )

  revalidatePath("/blogs")

  return {
    success: true,
  }
}

export const likeBlog = async (formData: FormData) => {
  const id = Number(formData.get("id"))

  await incrementBlogLikes(id)

  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}
