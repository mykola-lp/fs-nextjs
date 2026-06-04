import Link from "next/link"
import { notFound } from "next/navigation"

import { getUserByUsername, getBlogsByUserId } from "../../services/users"

const UserPage = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params
  const user = await getUserByUsername(username)

  if (!user) {
    notFound()
  }

  const blogs = await getBlogsByUserId(user.id)

  return (
    <div>
      <h2>{user.name}</h2>

      <p>Username: {user.username}</p>
      <h3>Blogs</h3>

      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserPage
