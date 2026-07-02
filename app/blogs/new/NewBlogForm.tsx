"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"

import { createBlog } from "@/app/actions/blogs"
import { useNotification } from "@/app/components/NotificationContext"

import { createBlogInitialState } from "@/app/actions/blogs.types"

const NewBlogForm = () => {
  const [state, formAction] = useActionState(
    createBlog,
    createBlogInitialState
  )

  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("blog created")
      router.push("/blogs")
    }
  }, [state.success])

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        Create a new blog post
      </h2>

      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">
            Title
          </label>

          <input
            id="title"
            name="title"
            type="text"
            defaultValue={state.values?.title}
            required
            minLength={5}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="author" className="block mb-1">
            Author
          </label>

          <input
            id="author"
            name="author"
            type="text"
            defaultValue={state.values?.author}
            required
            minLength={5}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="url" className="block mb-1">
            URL
          </label>

          <input
            id="url"
            name="url"
            type="url"
            defaultValue={state.values?.url}
            required
            minLength={5}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="border rounded px-4 py-2 hover:bg-gray-100"
        >
          Create
        </button>
      </form>

      {state.errors && (
        <ul className="mt-4 list-disc list-inside text-red-600">
          {state.errors.title && <li>{state.errors.title}</li>}
          {state.errors.author && <li>{state.errors.author}</li>}
          {state.errors.url && <li>{state.errors.url}</li>}
        </ul>
      )}
    </main>
  )
}

export default NewBlogForm
