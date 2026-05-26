import Link from "next/link"

import { getBlogs } from "../services/blogs"

const Blogs = () => {
  const blogs = getBlogs()

  return (
    <div>
      <h2>Blogs</h2>

      <ul>
        {blogs.map(blog => (
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