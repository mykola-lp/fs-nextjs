import dotenv from "dotenv";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import { blogs } from "./schema";

dotenv.config({ path: ".env.local" });

const initialBlogs: typeof blogs.$inferInsert[] = [
  {
    title: "Understanding React Server Components",
    author: "Dan Abramov",
    url: "https://react.dev",
    likes: 12,
  },
  {
    title: "Why Next.js App Router Matters",
    author: "Lee Robinson",
    url: "https://nextjs.org",
    likes: 25,
  },
  {
    title: "Fullstack Development with Next.js",
    author: "Matti Luukkainen",
    url: "https://fullstackopen.com",
    likes: 18,
  },
  {
    title: "Modern JavaScript Patterns",
    author: "Addy Osmani",
    url: "https://addyosmani.com",
    likes: 30,
  },
  {
    title: "Introduction to TypeScript",
    author: "Anders Hejlsberg",
    url: "https://www.typescriptlang.org",
    likes: 21,
  },
];

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing");
}

const client = postgres(connectionString);
const db = drizzle(client);

async function seed(): Promise<void> {
  await db.delete(blogs);
  await db.insert(blogs).values(initialBlogs);

  await client.end();

  console.log("Blogs seeded");
}

seed().catch(console.error);
