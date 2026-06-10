export type CreateBlogState = {
  errors?: {
    title?: string
    author?: string
    url?: string
  }
  values?: {
    title: string
    author: string
    url: string
  }
  success?: boolean
}

export const createBlogInitialState: CreateBlogState = {
  success: false,
}
