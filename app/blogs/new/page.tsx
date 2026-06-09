'use client'

import { useActionState } from "react"

import { createBlog } from "../../actions/blogs"
import { createBlogInitialState } from "../../actions/blogs.types"

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, createBlogInitialState)

  return (
    <div>
      <h2>Create a new blog post</h2>

      <form action={formAction}>
        <div>
          <label>
            Title
            <input
              id="title"
              name="title"
              type="text"
              defaultValue={state.values?.title}
              required
              minLength={5}
            />
          </label>
        </div>

        <div>
          <label>
            Author
            <input
              id="author"
              name="author"
              type="text"
              defaultValue={state.values?.author}
              required
              minLength={5}
            />
          </label>
        </div>

        <div>
          <label>
            URL
            <input
              id="url"
              name="url"
              type="url"
              defaultValue={state.values?.url}
              required
              minLength={5}
            />
          </label>
        </div>

        <button type="submit">Create</button>
      </form>

      {state.errors && (
        <ul style={{ color: "red" }}>
          {state.errors.title && <li>{state.errors.title}</li>}
          {state.errors.author && <li>{state.errors.author}</li>}
          {state.errors.url && <li>{state.errors.url}</li>}
        </ul>
      )}
    </div>
  )
}

export default NewBlog
