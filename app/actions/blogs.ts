"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

import { addBlog } from "../services/blogs"
import { incrementBlogLikes } from "../services/blogs"
import { getCurrentUser } from "../services/session"

export const createBlog = async (
  prevState: { error: string },
  formData: FormData
) => {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect("/login")
  }

  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string

  if (!title || title.length < 5) {
    return { error: "Blog title must be at least 5 characters long" }
  }

  if (!author || author.length < 5) {
    return { error: "Blog author must be at least 5 characters long" }
  }

  if (!url || url.length < 5) {
    return { error: "Blog URL must be at least 5 characters long" }
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
