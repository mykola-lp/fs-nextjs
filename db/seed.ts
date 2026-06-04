import dotenv from "dotenv";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import { blogs, notes, users } from "./schema";

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

const initialUsers: typeof users.$inferInsert[] = [
  {
    username: "john123",
    name: "John Doe",
  },
  {
    username: "alice456",
    name: "Alice Smith",
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

async function seedUsers(): Promise<number[]> {
  await db.delete(users);

  const insertedUsers = await db
    .insert(users)
    .values(initialUsers)
    .returning({ id: users.id });

  console.log("Users seeded");

  return insertedUsers.map((user) => user.id);
}

async function seedNotes(userIds: number[]): Promise<void> {
  await db.delete(notes);

  const initialNotes: typeof notes.$inferInsert[] = [
    {
      content: "Learn Drizzle ORM",
      important: true,
      userId: userIds[0],
    },
    {
      content: "Build Next.js API routes",
      important: false,
      userId: userIds[0],
    },
    {
      content: "Deploy app to Vercel",
      important: true,
      userId: userIds[1],
    },
    {
      content: "Read database docs",
      important: false,
      userId: userIds[1],
    },
  ];

  await db.insert(notes).values(initialNotes);

  console.log("Notes seeded");
}

async function seed(): Promise<void> {
  await seedBlogs();
  const userIds = await seedUsers();
  await seedNotes(userIds);

  await client.end();
}

seed().catch(console.error);
