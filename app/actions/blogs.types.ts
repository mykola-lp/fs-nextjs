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
}

export const createBlogInitialState: CreateBlogState = {}
