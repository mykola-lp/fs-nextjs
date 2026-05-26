"use client"

import Link from "next/link"

type Blog = {
  id: number
  title: string
  url: string
  likes: number
}

const sortBlogsByLikes = (blogs: Blog[]) => {
  return [...blogs].sort((a, b) => b.likes - a.likes)
}

const BlogList = ({ blogs }: { blogs: Blog[] }) => {
  const sortedBlogs = sortBlogsByLikes(blogs)

  return (
    <ul>
      {sortedBlogs.map((blog) => (
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
  )
}

export default BlogList
