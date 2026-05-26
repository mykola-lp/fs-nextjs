import { createBlog } from "../../actions/blogs"

const NewBlog = () => {
  return (
    <div>
      <h2>Create a new blog post</h2>

      <form action={createBlog}>
        <div>
          <label>
            Title
            <input type="text" name="title" required />
          </label>
        </div>

        <div>
          <label>
            Author
            <input type="text" name="author" required />
          </label>
        </div>

        <div>
          <label>
            URL
            <input type="url" name="url" required />
          </label>
        </div>

        <div>
          <label>
            Likes
            <input type="number" name="likes" min="0" defaultValue="0" />
          </label>
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default NewBlog