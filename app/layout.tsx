import { auth } from "@/auth"
import AuthSessionProvider from "./components/SessionProvider"
import NavBar from "./components/NavBar"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <html lang="en">
      <body>
        <AuthSessionProvider session={session}>
          <NavBar />
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  )
}