import Link from "next/link"

import { getBlogsSortedByLikes } from "../services/blogs"

// import BlogList from "./BlogList"

const getSortOrder = (
  sort: string | string[] | undefined
) => {
  return sort === "likes-asc"
    ? "asc"
    : "desc"
}

const Blogs = async (props: PageProps<"/blogs">) => {
  const { sort } = await props.searchParams

  const sortOrder = getSortOrder(sort)
  const blogs = getBlogsSortedByLikes(sortOrder)

  return (
    <div>
      <h2>Blogs</h2>

      <p>
        Sort by likes:{" "}
        <Link href="/blogs?sort=likes-desc">Most liked first</Link>{" "}
        |{" "}
        <Link href="/blogs?sort=likes-asc">Least liked first</Link>
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
