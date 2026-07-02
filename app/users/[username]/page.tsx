import Link from "next/link"
import { notFound } from "next/navigation"

import { getUserWithBlogsByUsername } from "@/app/services/users"

const UserPage = async ({
  params,
}: {
  params: Promise<{ username: string }>
}) => {
  const { username } = await params
  const user = await getUserWithBlogsByUsername(username)

  if (!user) {
    notFound()
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        {user.name}
      </h2>

      <p className="mb-6">
        <strong>Username:</strong> {user.username}
      </p>

      <h3 className="text-xl font-semibold mb-3">
        Blogs
      </h3>

      <ul className="space-y-2">
        {user.blogs.map((blog) => (
          <li
            key={blog.id}
            className="border rounded p-3 hover:bg-gray-50"
          >
            <Link
              href={`/blogs/${blog.id}`}
              className="text-blue-600 hover:underline"
            >
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default UserPage
