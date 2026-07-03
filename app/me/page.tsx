import { redirect } from "next/navigation"

import { auth } from "@/auth"
import { generateToken } from "@/app/actions/users"
import { getUserByUsername } from "@/app/services/users"
import { getUserReadingList } from "@/app/services/readingList"

const MePage = async () => {
  const session = await auth()

  if (!session?.user?.email) {
    redirect("/login")
  }

  const user = await getUserByUsername(session.user.email)

  if (!user) {
    redirect("/login")
  }

  const readingList = await getUserReadingList(user.id)

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        Profile
      </h2>

      <div className="space-y-2">
        <p>
          <strong>Name:</strong> {user.name}
        </p>

        <p>
          <strong>Username:</strong> {user.username}
        </p>
      </div>

      <hr className="my-6" />

      <h3 className="text-xl font-semibold mb-4">
        Reading List
      </h3>

      {readingList.length === 0 ? (
        <p>No blogs in your reading list.</p>
      ) : (
        <ul className="space-y-2">
          {readingList.map((item) => (
            <li
              key={item.id}
              className="border rounded p-3"
            >
              {item.blog.title}
            </li>
          ))}
        </ul>
      )}

      <hr className="my-6" />

      <h3 className="text-xl font-semibold mb-4">
        Token API
      </h3>

      {user.token ? (
        <div className="mb-6">
          <p className="font-medium mb-2">
            Current token:
          </p>

          <code className="block border rounded p-3 break-all bg-gray-50">
            {user.token}
          </code>
        </div>
      ) : (
        <p className="mb-6 text-gray-600">
          No token has been generated yet.
        </p>
      )}

      <form action={generateToken}>
        <button
          type="submit"
          className="border rounded px-4 py-2 hover:bg-gray-50 cursor-pointer"
        >
          Generate token
        </button>
      </form>
    </div>
  )
}

export default MePage