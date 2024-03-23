import { Nav } from "@/components/nav"
import { Providers } from "@/components/utility/providers"
import { createClient } from "@/lib/supabase/server"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { cookies } from "next/headers"
import { Toaster } from "sonner"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Starter App",
  description:
    "A starter app with Next.js, Tailwind, Shadcn, Supabase, and Stripe."
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data } = await supabase.auth.getUser()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers attribute="class" defaultTheme="light">
          <Toaster richColors position="top-center" duration={3000} />

          <Nav user={data.user} />

          <div className="flex flex-col items-center">{children}</div>
        </Providers>
      </body>
    </html>
  )
}
