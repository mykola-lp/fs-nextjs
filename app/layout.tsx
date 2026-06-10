import { auth } from "@/auth"

import AuthSessionProvider from "./components/SessionProvider"
import NavBar from "./components/NavBar"

import { NotificationProvider } from "./components/NotificationContext"
import Notification from "./components/Notification"

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
          <NotificationProvider>
            <NavBar />
            <Notification />
            {children}
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  )
}