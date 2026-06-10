import Link from "next/link"

import { getVisibleBlogs } from "@/app/services/blogs"

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
    <div>
      <h2>Blogs</h2>

      <form action="/blogs">
        <input type="text" name="filter" defaultValue={filterValue} />

        <input
          type="hidden"
          name="sort"
          value={sortOrder === "asc" ? "likes-asc" : "likes-desc"}
        />
      
        <button type="submit">Search</button>
      </form>

      <p>
        Sort by likes:{" "}

        <Link href={`/blogs?sort=likes-desc&filter=${encodeURIComponent(filterValue)}`}>
          Most liked first
        </Link>{" "}
        |{" "}
        <Link href={`/blogs?sort=likes-asc&filter=${encodeURIComponent(filterValue)}`}>
          Least liked first
        </Link>
      </p>

      {/*
      <BlogList blogs={blogs} />
      */}

      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>

            <br />
            <a href={blog.url} target="_blank" rel="noopener noreferrer">
              Visit site ↗
            </a>

            <br />
            Likes: {blog.likes}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs
