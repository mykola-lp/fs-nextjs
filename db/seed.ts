import dotenv from "dotenv";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import { blogs, notes } from "./schema";

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

const initialNotes: typeof notes.$inferInsert[] = [
  {
    content: "Learn Drizzle ORM",
    important: true,
  },
  {
    content: "Build Next.js API routes",
    important: false,
  },
  {
    content: "Deploy app to Vercel",
    important: true,
  },
  {
    content: "Read database docs",
    important: false,
  },
];

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing");
}

const client = postgres(connectionString);
const db = drizzle(client);

async function seedBlogs(): Promise<void> {
  await db.delete(blogs);
  await db.insert(blogs).values(initialBlogs);

  console.log("Blogs seeded");
}

async function seedNotes(): Promise<void> {
  await db.delete(notes);
  await db.insert(notes).values(initialNotes);

  console.log("Notes seeded");
}

async function seed(): Promise<void> {
  await seedBlogs();
  await seedNotes();

  await client.end();
}

seed().catch(console.error);
