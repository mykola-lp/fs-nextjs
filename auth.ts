import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"

import { db } from "@/db"
import { users } from "@/db/schema"

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        const user = await db.query.users.findFirst({
          where: eq(users.username, credentials.username as string),
        })

        if (!user || !user.passwordHash) {
          return null
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash,
        )

        if (!isValid) {
          return null
        }

        // We do not have an email address in our schema, so we reuse
        // the email field to store the username instead.
        return {
          id: String(user.id),
          name: user.name,
          email: user.username,
        }
      },
    }),
  ],
  // If not specified, Auth.js / NextAuth will automatically use its
  // built-in sign-in page at: /api/auth/signin
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
})