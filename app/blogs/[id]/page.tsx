import { notFound } from "next/navigation"

import { getBlogById } from "@/app/services/blogs"
import { likeBlog } from "@/app/actions/blogs"
import { addToReadingList } from "@/app/actions/readingList"

const BlogPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">
        {blog.title}
      </h2>

      <ul className="space-y-3">
        <li>
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

          <form action={addToReadingList}>
            <input type="hidden" name="id" value={blog.id} />

            <button
              type="submit"
              className="border rounded px-3 py-1 hover:bg-gray-100"
            >
              Add to Reading List
            </button>
          </form>
        </li>
      </ul>
    </main>
  )
}

export default BlogPage
