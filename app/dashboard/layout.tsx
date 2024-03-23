import { getProfile } from "@/actions/profiles"
import { SidebarHeader } from "@/components/dashboard/sidebar/sidebar-header"
import { SidebarNav } from "@/components/dashboard/sidebar/sidebar-nav"
import { UserMenu } from "@/components/dashboard/sidebar/user-menu"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.auth.getUser()

  // If the user is not logged in, redirect them to the login page
  if (error || !data?.user) {
    return redirect("/login")
  }

  const profile = await getProfile(data.user.id)

  // If the user is on a free plan, redirect them to the about page
  if (profile.membership === "free") {
    return redirect("/join")
  }

  const user = data.user

  return (
    <div className="flex h-screen w-screen">
      <div className="flex w-[280px] flex-col justify-between border-r px-6 py-4">
        <div>
          <SidebarHeader />

          <SidebarNav />
        </div>

        <UserMenu user={user} />
      </div>

      <div className="flex-1">{children}</div>
    </div>
  )
}
