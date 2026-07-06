import dotenv from "dotenv";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import bcrypt from "bcryptjs"

import { blogs, notes, users } from "./schema";

dotenv.config({ path: ".env.local" });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing");
}

const client = postgres(connectionString);
const db = drizzle(client);

async function clearDatabase() {
  console.log("Clearing database...");

  try {
  await db.execute(`
    TRUNCATE TABLE notes, blogs, users RESTART IDENTITY CASCADE;
  `);
  } catch (e) {
    console.log("⚠️ Clear skipped (tables might not exist yet)");
  }

  console.log("Database cleared");
}

async function seedUsers(): Promise<number[]> {
  const initialUsers = [
    {
      username: "john123",
      name: "John Doe",
      passwordHash: await bcrypt.hash("john123", 10),
    },
    {
      username: "alice456",
      name: "Alice Smith",
      passwordHash: await bcrypt.hash("alice456", 10),
    },
  ];

  const insertedUsers = await db
    .insert(users)
    .values(initialUsers)
    .returning({ id: users.id });

  console.log("= Users seeded");

  return insertedUsers.map((user) => user.id);
}

async function seedBlogs(userIds: number[]): Promise<void> {
  const initialBlogs: typeof blogs.$inferInsert[] = [
    {
      title: "Understanding React Server Components",
      author: "Dan Abramov",
      url: "https://react.dev",
      likes: 12,
      userId: userIds[0],
    },
    {
      title: "Why Next.js App Router Matters",
      author: "Lee Robinson",
      url: "https://nextjs.org",
      likes: 25,
      userId: userIds[0],
    },
    {
      title: "Fullstack Development with Next.js",
      author: "Matti Luukkainen",
      url: "https://fullstackopen.com",
      likes: 18,
      userId: userIds[1],
    },
    {
      title: "Modern JavaScript Patterns",
      author: "Addy Osmani",
      url: "https://addyosmani.com",
      likes: 30,
      userId: userIds[1],
    },
    {
      title: "Introduction to TypeScript",
      author: "Anders Hejlsberg",
      url: "https://www.typescriptlang.org",
      likes: 21,
      userId: userIds[0],
    },
  ];

  await db.insert(blogs).values(initialBlogs);

  console.log("= Blogs seeded");
}

async function seedNotes(userIds: number[]): Promise<void> {
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

  console.log("= Notes seeded");
}

async function seed(): Promise<void> {
  await clearDatabase();

  const userIds = await seedUsers();
  await seedBlogs(userIds);
  await seedNotes(userIds);

  await client.end();

  console.log("✅ Seed completed");
}

seed().catch(console.error);

// DROP TABLE IF EXISTS notes CASCADE;
// DROP TABLE IF EXISTS blogs CASCADE;
// DROP TABLE IF EXISTS users CASCADE;
// DROP TABLE IF EXISTS drizzle.__drizzle_migrations CASCADE;

// npx drizzle-kit drop

// npx drizzle-kit generate
// npx drizzle-kit migrate