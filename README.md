This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

<b>Clone project:</b>

```bash
git clone <repository-url>
cd <project-folder>
```

<b>Install dependencies:</b>

```bash
npm install
```

<b>Run the development server:</b>

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Blog

### Exercise 1: Blog list

The exercises of this part use a blog application that should be familiar from the previous parts of Full Stack Open. In the exercises, you will build the same application using Next.js.

Create a new Next.js application. Set up a navigation bar with links to a home page and a blogs page. Create the route /blogs that renders a hardcoded list of blogs at the URL http://localhost:3000/blogs. Each blog should have fields id, title, author, url, and likes.

### Exercise 2: New blog

Add the route /blogs/new with a form for creating a new blog. The form should have fields for title, author, and url. Implement a Server Action that handles the form submission and adds the new blog to the list. After submission, redirect the user back to /blogs. Make sure the new blog appears in the list after creation both in development and in production mode.
