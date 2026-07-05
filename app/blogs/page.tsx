import Link from "next/link"

import { getVisibleBlogs } from "@/app/services/blogs"

export const revalidate = 0

// import BlogList from "./BlogList"

const getSortOrder = (
  sort: string | string[] | undefined
) => {
  return sort === "likes-asc"
    ? "asc"
    : "desc"
}

const getFilterValue = (
  filter: string | string[] | undefined
) => {
  return typeof filter === "string"
    ? filter
    : ""
}

const Blogs = async (props: PageProps<"/blogs">) => {
  const { sort, filter } = await props.searchParams

  const sortOrder = getSortOrder(sort)
  const filterValue = getFilterValue(filter)
  const blogs = await getVisibleBlogs(filterValue, sortOrder)

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        Blogs
      </h2>

      <form action="/blogs" className="flex gap-2 mb-4">
        <input
          type="text"
          name="filter"
          defaultValue={filterValue}
          className="flex-1 border rounded px-3 py-2"
        />

        <input
          type="hidden"
          name="sort"
          value={sortOrder === "asc" ? "likes-asc" : "likes-desc"}
        />

        <button
          type="submit"
          className="border rounded px-4 py-2 hover:bg-gray-100"
        >
          Search
        </button>
      </form>

      <p className="mb-4">
        Sort by likes:{" "}

        <Link
          href={`/blogs?sort=likes-desc&filter=${encodeURIComponent(filterValue)}`}
          className="text-blue-600 hover:underline"
        >
          Most liked first
        </Link>{" "}
        |{" "}
        <Link
          href={`/blogs?sort=likes-asc&filter=${encodeURIComponent(filterValue)}`}
          className="text-blue-600 hover:underline"
        >
          Least liked first
        </Link>
      </p>

      {/*
      <BlogList blogs={blogs} />
      */}

      <ul data-testid="blogs-list" className="space-y-2">
        {blogs.map((blog) => (
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

            <p className="mt-2">
              <a
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Visit site ↗
              </a>
            </p>

            <p className="mt-2">
              {blog.likes} likes
            </p>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Blogs
