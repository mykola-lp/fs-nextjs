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