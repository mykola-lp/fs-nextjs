"use client"

import { useActionState, useEffect } from "react"

import { useRouter } from "next/navigation"

import { registerUser } from "@/app/actions/users"
import { useNotification } from "@/app/components/NotificationContext"

import { registerInitialState } from "@/app/actions/users.types"

const RegisterPage = () => {
  const [state, formAction, pending] = useActionState(
    registerUser,
    registerInitialState,
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
    <div>
      <h2>Register</h2>

      <form action={formAction}>
        <div>
          <label>
            Username
            <input
              type="text"
              name="username"
              required
              minLength={4}
            />
          </label>
        </div>

        <div>
          <label>
            Name
            <input
              type="text"
              name="name"
              required
              minLength={4}
            />
          </label>
        </div>

        <div>
          <label>
            Password
            <input
              type="password"
              name="password"
              required
              minLength={4}
            />
          </label>
        </div>

        <div>
          <label>
            Confirm Password
            <input
              type="password"
              name="confirmPassword"
              required
              minLength={4}
            />
          </label>
        </div>

        {state.error ? <p role="alert">{state.error}</p> : null}

        <button type="submit" disabled={pending}>
          {pending ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  )
}

export default RegisterPage
