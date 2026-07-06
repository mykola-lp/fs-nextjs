import { redirect } from "next/navigation"
import Link from "next/link"

import { auth } from "@/auth"

import Profile from "@/app/components/Profile"

import { getUserByUsername } from "@/app/services/users"
import { getUserReadingList } from "@/app/services/readingList"

import { generateToken } from "@/app/actions/users"
import { markAsRead } from "@/app/actions/readingList"

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

  const unreadBlogs = readingList.filter(
    (item) => !item.read,
  )

  const readBlogs = readingList.filter(
    (item) => item.read,
  )

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        Profile
      </h2>

      <Profile />

      <div
        data-testid="user-profile"
        className="mt-6 space-y-2"
      >
        <p>
          <strong>Name:</strong>{" "}
          <span data-testid="user-name">
            {user.name}
          </span>
        </p>

        <p>
          <strong>Username:</strong>{" "}
          <span data-testid="user-username">
            {user.username}
          </span>
        </p>
      </div>

      <hr className="my-6" />

      <h3 className="text-xl font-semibold mb-4">
        Reading List
      </h3>

      <div data-testid="reading-list-section">
        {readingList.length === 0 ? (
          <p data-testid="empty-reading-list">
            No blogs in your reading list.
          </p>
        ) : (
          <div className="space-y-8">

            <div>
              <h4 className="font-semibold mb-3">
                Unread ({unreadBlogs.length})
              </h4>

              <div data-testid="unread-section">
                {unreadBlogs.length === 0 ? (
                  <p
                    data-testid="no-unread-blogs"
                    className="text-gray-500"
                  >
                    No unread blogs.
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {unreadBlogs.map((item) => (
                      <li
                        key={item.id}
                        className="border rounded p-3 flex items-center justify-between"
                      >
                        <Link
                          href={`/blogs/${item.blog.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          {item.blog.title}
                        </Link>

                        <form action={markAsRead}>
                          <input
                            type="hidden"
                            name="blogId"
                            value={item.blog.id}
                          />

                          <button
                            type="submit"
                            data-testid={`mark-read-${item.blog.id}`}
                            className="border rounded px-3 py-1 hover:bg-gray-100"
                          >
                            Mark as read
                          </button>
                        </form>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">
                Read ({readBlogs.length})
              </h4>

              {readBlogs.length === 0 ? (
                <p
                  data-testid="no-read-blogs"
                  className="text-gray-500"
                >
                  No read blogs.
                </p>
              ) : (
                <ul className="space-y-2">
                  {readBlogs.map((item) => (
                    <li
                      key={item.id}
                      className="border rounded p-3"
                    >
                      <Link
                        href={`/blogs/${item.blog.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {item.blog.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

          </div>
        )}
      </div>

      <hr className="my-6" />

      <div data-testid="api-token-section">
        <h3 className="text-xl font-semibold mb-4">
          Token API
        </h3>

        {user.token ? (
          <div
            data-testid="token-display"
            className="mb-6"
          >
            <p className="font-medium mb-2">
              Current token:
            </p>

            <code
              data-testid="api-token"
              className="block border rounded p-3 break-all bg-gray-50"
            >
              {user.token}
            </code>
          </div>
        ) : (
          <p
            data-testid="no-token-message"
            className="mb-6 text-gray-600"
          >
            No token has been generated yet.
          </p>
        )}

        <form action={generateToken}>
          <button
            type="submit"
            data-testid="generate-token-button"
            className="border rounded px-4 py-2 hover:bg-gray-50 cursor-pointer"
          >
            Generate token
          </button>
        </form>
      </div>
    </div>
  )
}

export default MePage