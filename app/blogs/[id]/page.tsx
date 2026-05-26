import { notFound } from "next/navigation"

import { getBlogById } from "../../services/blogs"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div>
      <h2>{blog.title}</h2>

      <ul>
        <li>
          <strong>Author:</strong> {blog.author}
        </li>

        <li>
          <strong>URL:</strong>{" "}
          <a href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.url}
          </a>
        </li>
   
        <li>
          <strong>Likes:</strong> {blog.likes}
        </li>
      </ul>
    </div>
  )
}

export default BlogPage