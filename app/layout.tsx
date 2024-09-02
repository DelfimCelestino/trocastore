import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Bottomtab from "@/components/bottom-tab"
import Header from "@/components/header"
import AuthProvider from "@/providers/auth"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "TrocaStore",
  description: "Troca store for your online store",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="pb-16 pt-16 lg:pb-0">{children}</main>
            <Toaster />

            <Bottomtab />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
