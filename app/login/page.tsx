"use client"

import { useState } from "react"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

const LoginPage = () => {
  const router = useRouter()
  const [error, setError] = useState("")

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid username or password")
    } else {
      router.push("/")
      router.refresh()
    }
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        Login
      </h2>

      {error && (
        <p
          data-testid="error-message"
          className="mb-4 text-red-600"
        >
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1">
            Username
          </label>

          <input
            id="username"
            type="text"
            name="username"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1">
            Password
          </label>

          <input
            id="password"
            type="password"
            name="password"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          data-testid="login-button"
          className="border rounded px-4 py-2 hover:bg-gray-100"
        >
          Login
        </button>
      </form>
    </main>
  )
}

export default LoginPage
