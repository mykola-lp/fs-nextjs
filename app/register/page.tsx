"use client"

import { useActionState } from "react"

import { registerUser } from "@/app/actions/users"
import { registerInitialState } from "@/app/actions/users.types"

const RegisterPage = () => {
  const [state, formAction, pending] = useActionState(
    registerUser,
    registerInitialState,
  )

  return (
    <div>
      <h2>Register</h2>

      <form action={formAction}>
        <div>
          <label>
            Username
            <input type="text" name="username" required />
          </label>
        </div>

        <div>
          <label>
            Name
            <input type="text" name="name" required />
          </label>
        </div>

        <div>
          <label>
            Password
            <input type="password" name="password" required />
          </label>
        </div>

        <div>
          <label>
            Confirm Password
            <input type="password" name="confirmPassword" required />
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
