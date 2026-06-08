import Link from "next/link"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/">home</Link>
          {" | "}
          <Link href="/notes">notes</Link>
          {" | "}
          <Link href="/blogs">blogs</Link>
          {" | "}
          <Link href="/users">users</Link>
          {" | "}
          <Link href="/blogs/new">create new</Link>
          {" | "}
          <Link href="/register">register</Link>
        </nav>
        {children}
      </body>
    </html>
  )
}