import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Bottomtab from "@/components/bottom-tab"
import Header from "@/components/header"

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
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="pb-16 pt-16 lg:pb-0">{children}</main>
          <Bottomtab />
        </ThemeProvider>
      </body>
    </html>
  )
}
