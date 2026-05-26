import { getBlogs } from "../services/blogs"

const Blogs = () => {
  const blogs = getBlogs()

  return (
    <div>
      <h2>Blogs</h2>

      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <strong>{blog.title}</strong> by {blog.author}

            <br />
            <a href={blog.url} target="_blank" rel="noopener noreferrer">
              Read more
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