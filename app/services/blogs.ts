const blogs = [
  {
    id: 1,
    title: "Understanding React Server Components",
    author: "Dan Abramov",
    url: "https://react.dev",
    likes: 12,
  },
  {
    id: 2,
    title: "Why Next.js App Router Matters",
    author: "Lee Robinson",
    url: "https://nextjs.org",
    likes: 25,
  },
  {
    id: 3,
    title: "Fullstack Development with Next.js",
    author: "Matti Luukkainen",
    url: "https://fullstackopen.com",
    likes: 18,
  },
  {
    id: 4,
    title: "Modern JavaScript Patterns",
    author: "Addy Osmani",
    url: "https://addyosmani.com",
    likes: 30,
  },
  {
    id: 5,
    title: "Introduction to TypeScript",
    author: "Anders Hejlsberg",
    url: "https://www.typescriptlang.org",
    likes: 21,
  },
]

let nextId = 6

export const getBlogs = () => {
  return blogs
}

export const addBlog = (
  title: string,
  author: string,
  url: string,
  likes: number
) => {
  blogs.push({
    id: nextId++,
    title,
    author,
    url,
    likes,
  })
}

export const getBlogById = (
  id: number
) => {
  return blogs.find(
    (blog) => blog.id === id
  )
}

export const incrementBlogLikes = (id: number) => {
  const blog = blogs.find((blog) => blog.id === id)

  if (!blog) {
    throw new Error("Blog not found")
  }

  blog.likes += 1

  return blog
}