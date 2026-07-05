import { notFound } from "next/navigation"

import { auth } from "@/auth"

import { getBlogById } from "@/app/services/blogs"
import { getUserByUsername } from "@/app/services/users"
import { isBlogInReadingList } from "@/app/services/readingList"

import { likeBlog } from "@/app/actions/blogs"
import { addToReadingList } from "@/app/actions/readingList"

const BlogPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params

  const [blog, session] = await Promise.all([
    getBlogById(Number(id)),
    auth(),
  ])

  if (!blog) {
    notFound()
  }

  let showReadingListButton = false

  if (session?.user?.email) {
    const user = await getUserByUsername(
      session.user.email,
    )

    if (user) {
      showReadingListButton =
        !(await isBlogInReadingList(
          user.id,
          blog.id,
        ))
    }
  }

  return (
    <main
      data-testid="blog-detail"
      className="max-w-2xl mx-auto p-6 space-y-4"
    >
      <h2
        data-testid="blog-title"
        className="text-2xl font-bold"
      >
        {blog.title}
      </h2>

      <ul className="space-y-3">
        <li data-testid="blog-author">
          <strong>Author:</strong> {blog.author}
        </li>

        <li>
          <strong>URL:</strong>{" "}
          <a
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {blog.url}
          </a>
        </li>

        <li className="flex items-center gap-3">
          <span>
            <strong>Likes:</strong> {blog.likes}
          </span>

          <form action={likeBlog}>
            <input type="hidden" name="id" value={blog.id} />

            <button
              type="submit"
              className="border rounded px-3 py-1 hover:bg-gray-100"
            >
              Like
            </button>
          </form>

          {showReadingListButton && (
            <form action={addToReadingList}>
              <input
                type="hidden"
                name="id"
                value={blog.id}
              />

              <button
                type="submit"
                className="border rounded px-3 py-1 hover:bg-gray-100"
              >
                Add to Reading List
              </button>
            </form>
          )}
        </li>
      </ul>
    </main>
  )
}

export default BlogPage
