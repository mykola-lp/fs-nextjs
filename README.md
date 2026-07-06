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

### Exercise 3: Blog page

Add an individual page for each blog at the route /blogs/[id]. The page should display the blog's title, author, url, and likes. Use a dynamic route segment following the Next.js App Router convention.

### Exercise 4: Like button

Add a button on the individual blog page that increments the blog's likes by one. Implement this using a Server Action with a hidden form field to pass the blog id. Make sure the like count is correctly updated both in development and in production mode.

### Exercise 5: Rendered in order ("use client" and server)

Change the blogs list at /blogs so that blogs are rendered in descending order by the number of likes, with the most liked blog shown first.

### Exercise 6: Search

Add a search feature to the blogs list that allows the user to filter blogs by title. Implement the feature using URL search parameters and a Server Component, following the same pattern used in the notes app. The search term should be reflected in the URL (e.g. /blogs?filter=next) so that the filtered view can be bookmarked and shared. Add a text input and a search button to the page. Submitting the form should update the URL and re-render the list with only the matching blogs.

### Exercise 7: Deploy to Vercel

Deploy your blog application to Vercel. Push the code to a GitHub repository, connect it to Vercel, and verify that the app works at the public URL Vercel provides. You will notice that creating new blogs does not work reliably in production, since the in-memory array is not shared across serverless function instances. This is expected and will be fixed in the next exercise.

### Exercise 8: DrizzleORM and a database

Replace the hardcoded in-memory blog list with a PostgreSQL database. Create a Vercel Postgres (Neon) database, configure the DATABASE_URL in a local .env.local file (and add .env.local to .gitignore).

Install Drizzle ORM and set up the schema, database connection, and Drizzle config files following the same pattern used in the notes app. Define a blogs table with columns for id, title, author, url, and likes. Generate and apply the migration. Update the service functions to use the database instead of the in-memory array. Verify that creating a new blog works correctly both locally and on Vercel.

### Exercise 9: Users

Add a users table to the blog app database with columns for id, username and name. Add a foreign key column userId to the blogs table referencing the users table. Generate and apply the migration. Create a page at /users that lists all users. Each user's name should link to their individual user page. Add a link to the users page in the navigation bar.

Create a user directly in Drizzle Studio, and associate the existing blogs with that user by setting their userId to the new user's id.

### Exercise 10: Users page

Create an individual page for each user at /users/[username]. The page should display the user's name and a list of the blogs they have added.

Note that the URL of a user page must be based on the username, not the numeric id, for example /users/mluukkai.

Use a single Drizzle join query instead of two separate queries. Define the relations between the users and blogs tables in db/schema.ts using the relations function from drizzle-orm, then use the with option in db.query.users.findFirst to fetch the user and their blogs in one go.

### Exercise 11: Login

Add login support to the blog app using NextAuth.js and bcryptjs. Remember to add a passwordHash column to the users table!

### Exercise 12: Registration

Add a registration page to the blog app at /register. Create a Server Action registerUser that reads username, name, and password from the form, hashes the password with bcrypt.hash, inserts the new user into the database, and redirects to /login. Add a link to the registration page in the navigation bar for unauthenticated users.

### Exercise 13: Validations in blog creation

Add validation to the blog creation form using the useActionState pattern from the notes app.

Apply the following rules:

* title, author and url must be present and all have minimum length of 5 characters

### Exercise 14: Blog creation form on error

Ensure that if there is a validation error when creating a blog, the form input fields (title, author, url) retain their values instead of resetting. The user should not have to retype their input after a failed submission.

Hints:

In case of a validation error, you should return also the previous form values:

```ts
const title = formData.get("title") as string
const author = formData.get("author") as string
const url = formData.get("url") as string

const errors = {}
// ...

if (Object.keys(errors).length > 0) {
  return { errors, values: { title, author, url } }
}
```

You can use defaultValue in the form to set these values back to the input elements:

```tsx
const [state, formAction] = useActionState(createBlog, initialState)

// ...

<input
  id="author"
  name="author"
  type="text"
  defaultValue={state.values?.author}
/>
```

### Exercise 15: Validations in user registration

Add server-side validation to the registerUser Server Action in the blog app.

Apply the following rules:

* username must be at least 4 characters long
* password must be at least 4 characters long
* the form must include a passwordConfirm field, and its value must match password
* if a user with the given username already exists in the database, return an appropriate error message

### Exercise 16: Styled notification with context

Add a notification system to the blog application using React Context, following the same architecture as the notes application.

Requirements:

* create a notification context for global state management
* display success and error messages after user actions
* automatically clear notifications after a short delay
* style the notification component using Tailwind CSS
* integrate the notification provider into the application layout

### Exercise 17: Tailwind CSS styling

Style the blog application using Tailwind CSS to create a clean and consistent user interface.

Apply styling to the following parts of the application:

* the navigation bar
* the blog list page
* the individual blog page
* the blog creation form

Use reusable utility classes and maintain a consistent visual style across the application.

### Exercise 18: Personal profile page with API token

Add a protected personal page at `/me` that is only accessible to authenticated users.

Requirements:

* create a `/me` page that requires authentication
* display the logged-in user's name and username
* add a nullable `token` column to the `users` table
* generate and apply the database migration
* display the current API token if one exists
* otherwise display a message indicating that no token has been generated
* provide a button that calls a Server Action to generate a new API token
* generate the token using `crypto.randomUUID()`
* save the generated token to the current user's database record
* revalidate the `/me` page after updating the token

### Exercise 19: API route with token authentication

Create an authenticated API endpoint at `app/api/me/route.ts` that returns the current user's information as JSON.

Requirements:

* create a `GET` Route Handler at `app/api/me/route.ts`
* authenticate requests using the `Authorization: Bearer <token>` header
* find the user whose stored API token matches the provided token
* return the authenticated user's information as JSON
* return HTTP `401 Unauthorized` if the token is missing or invalid
* make the endpoint suitable for external clients such as `curl`, Postman, or other applications

### Exercise 20: Personal reading list

Add support for a personal reading list for each user.

Requirements:

* create a `reading_list` table with the following columns:

  * `id`
  * `userId` (foreign key to `users`)
  * `blogId` (foreign key to `blogs`)
  * `read` (`boolean`, default `false`)
* automatically add every newly created blog to the author's reading list
* on each blog page, show an **Add to Reading List** button only for blogs that are **not already** in the logged-in user's reading list
* allow users to add blogs created by other users to their own reading list
* display the logged-in user's reading list on the `/me` page

**Note**

As a usability improvement, the **Add to Reading List** button is automatically hidden when the current blog is already present in the logged-in user's reading list. This prevents duplicate additions through the user interface and provides clearer feedback to the user.

### Exercise 21: Better reading list

Improve the /me page to display the reading list in a more organized way. Group the blogs into two sections: unread and read. Each section should display all the blogs the user has added to their reading list that match that status. Next to each unread blog, show a "mark as read" button.

### Exercise 22: Static homepage from markdown

Create a static homepage for the app at / that reads its content from a Markdown file.

**Hint:** Next.js has built-in support for MDX, which lets you write JSX directly in Markdown files. Follow the setup guide to install @next/mdx and configure next.config.js. You can then import .mdx files directly as React components in your page.

MDX content renders as plain HTML without any styling, so you will need to add CSS to make it look good. One approach is to wrap the imported component in a container with a custom class and define styles for common markdown elements. Here is an example:

```tsx
import Homepage from "./homepage.mdx"

const Home = () => {
  return (
    <div className="markdown">
      <Homepage />
    </div>
  )
}

export default Home
```

Then add these styles to app/globals.css to format headings, paragraphs, lists, and links inside the .markdown container:

```css
.markdown h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 1.5rem 0 1rem;
}

.markdown h2 {
  font-size: 1.875rem;
  font-weight: bold;
  margin: 2rem 0 0.75rem;
}

.markdown h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 1.5rem 0 0.5rem;
}

.markdown p {
  margin: 1rem 0;
  line-height: 1.7;
}

.markdown a {
  color: #3b82f6;
  text-decoration: underline;
}

.markdown a:hover {
  color: #2563eb;
}

.markdown ul {
  margin: 1rem 0;
  padding-left: 2rem;
  line-height: 1.7;
  list-style-type: disc;
}

.markdown ol {
  margin: 1rem 0;
  padding-left: 2rem;
  line-height: 1.7;
  list-style-type: decimal;
}

.markdown li {
  margin: 0.5rem 0;
}

.markdown hr {
  margin: 2rem 0;
  opacity: 0.2;
}
```

This scoped approach ensures the markdown styles only apply inside the .markdown container and do not affect other parts of your application.

### Exercise 23: Finishing touches

For the next exercise implement two API routes to your app:

**HTTP DELETE** `/api/testing/reset`

The HTTP DELETE request to this API should delete all data from all the tables.

**HTTP POST** `/api/testing/users`

The request to this API with the request body

```json
{
  "username": "testuser",
  "name": "Test User",
  "password": "testpass123"
}
```

creates the user directly in the database.

Both of these APIs should not work in production, so the handler functions should start like this:

```ts
if (process.env.NODE_ENV === "production") {
  return NextResponse.json(
    { error: "This endpoint is not available in production" },
    { status: 403 },
  )
}
```

### 24. The final check

The repository https://github.com/fullstack-hy2020/next-js-tests contains tests for your project. See the README of the repository for info on how to enable the tests for your project.

Ensure that the tests pass when run in GitHub.

### 25. Your GitHub repository

In this exercise, you should only tell us what your submission repository is.

Note:

* All the tests added in the previous exercise must pass in your GitHub repository. If tests do not pass, your submission will be rejected.
* If you are using a private repository, add the GitHub user **mluukkai** as a collaborator. If the repository cannot be accessed, your course will not be graded.
