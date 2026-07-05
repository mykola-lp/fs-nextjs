"use client"

import { useActionState, useEffect } from "react"

import { useRouter } from "next/navigation"

import { registerUser } from "@/app/actions/users"
import { useNotification } from "@/app/components/NotificationContext"

import { registerInitialState } from "@/app/actions/users.types"

const RegisterPage = () => {
  const [state, formAction, pending] = useActionState(
    registerUser,
    registerInitialState
  )

  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("registration successful")
      router.push("/login")
    }
  }, [state.success])

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        Register
      </h2>

      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            required
            minLength={4}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="name" className="block mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            required
            minLength={4}
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
            minLength={4}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block mb-1">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            required
            minLength={4}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {state.error && (
          <p className="text-red-600">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          data-testid="register-button"
          disabled={pending}
          className="border rounded px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
        >
          {pending ? "Registering..." : "Register"}
        </button>
      </form>
    </main>
  )
}

export default RegisterPage
