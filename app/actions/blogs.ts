"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

import { addBlog } from "../services/blogs"
import { incrementBlogLikes } from "../services/blogs"

export const createBlog = async (formData: FormData) => {
  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string
  const likes = Number(formData.get("likes"))
  const userId = Number(formData.get("userId"))

  await addBlog(
    title,
    author,
    url,
    likes,
    userId
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
