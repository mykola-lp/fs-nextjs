export type RegisterState = {
  error: string
  errorField: "username" | "name" | "password" | "passwordConfirm" | null
  success: boolean
}

export const registerInitialState: RegisterState = {
  error: "",
  errorField: null,
  success: false,
}