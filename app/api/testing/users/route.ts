import { NextRequest, NextResponse } from "next/server"

import bcrypt from "bcryptjs"

import { createUser, getUserByUsername } from "@/app/services/users"

export const POST = async (
  request: NextRequest,
) => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      {
        error: "This endpoint is not available in production",
      },
      {
        status: 403,
      },
    )
  }

  const { username, name, password } = await request.json()

  const existingUser = await getUserByUsername(username)

  if (existingUser) {
    return NextResponse.json(
      {
        error: "Username already exists",
      },
      {
        status: 400,
      },
    )
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await createUser({
    username,
    name,
    passwordHash,
  })

  return NextResponse.json(
    {
      message: "User created successfully",
    },
    {
      status: 201,
    },
  )
}

// curl -X POST http://localhost:3000/api/testing/users \
//   -H "Content-Type: application/json" \
//   -d '{
//     "username":"testuser",
//     "name":"Test User",
//     "password":"testpass123"
//   }'

// OR
// http POST :3000/api/testing/users username=testuser name="Test User" password=testpass123
