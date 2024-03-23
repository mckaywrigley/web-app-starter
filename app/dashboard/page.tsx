import { getProfile } from "@/actions/profiles"
import { DashboardPageContainer } from "@/components/dashboard/dashboard-page-container"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function DashboardHomePage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.auth.getUser()

  // If the user is not logged in, redirect them to the login page
  if (error || !data?.user) {
    return redirect("/login")
  }

  const profile = await getProfile(data.user.id)

  return (
    <DashboardPageContainer>
      <div className="mt-10 p-6 md:mx-auto md:mt-20 md:max-w-[600px]">
        <div className="text-3xl font-extrabold md:text-4xl">Welcome!</div>
      </div>
    </DashboardPageContainer>
  )
}
