import { auth } from "@/auth"

import AuthSessionProvider from "@/app/components/SessionProvider"
import NavBar from "@/app/components/NavBar"

import { NotificationProvider } from "@/app/components/NotificationContext"
import Notification from "@/app/components/Notification"

import "@/app/globals.css"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
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