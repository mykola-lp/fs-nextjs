import { NextRequest, NextResponse } from "next/server"

import { getUserByToken } from "@/app/services/users"

export async function GET(request: NextRequest) {
  const authorization = request.headers.get("authorization")

  if (!authorization?.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 },
    )
  }

  const token = authorization.replace("Bearer ", "")

  const user = await getUserByToken(token)

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 },
    )
  }

  return NextResponse.json({
    id: user.id,
    username: user.username,
    name: user.name,
  })
}
