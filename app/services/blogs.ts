import { eq, ilike, desc, asc } from "drizzle-orm"

import { db } from "../../db"
import { blogs } from "../../db/schema"

type BlogSortOrder = "asc" | "desc"

export const getBlogs = async () => {
  return db.query.blogs.findMany()
}

export const getBlogsSortedByLikes = async (
  order: BlogSortOrder = "desc"
) => {
  return db.query.blogs.findMany({
    orderBy: order === "asc" ? asc(blogs.likes) : desc(blogs.likes),
  })
}

export const addBlog = async (
  title: string,
  author: string,
  url: string,
  userId: number
) => {
  await db.insert(blogs).values({
    title,
    author,
    url,
    userId,
  })
}

export const getBlogById = async (
  id: number
) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  })
}

export const incrementBlogLikes = async (
  id: number
) => {
  const blog = await getBlogById(id)

  if (!blog) {
    throw new Error("Blog not found")
  }

  await db
    .update(blogs)
    .set({ likes: blog.likes + 1 })
    .where(eq(blogs.id, id))

  return { ...blog, likes: blog.likes + 1 }
}

export const getVisibleBlogs = async (
  filter: string,
  order: BlogSortOrder = "desc"
) => {
  const normalizedFilter = filter.trim().toLowerCase()

  if (!normalizedFilter) {
    return getBlogsSortedByLikes(order)
  }

  return db.query.blogs.findMany({
    where: ilike(blogs.title, `%${normalizedFilter}%`),
    orderBy: order === "asc" ? asc(blogs.likes) : desc(blogs.likes),
  })
}
