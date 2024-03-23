"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"
import { getProfile } from "./profiles"

export async function login(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return redirect(`/login?message=${error.message}`)
  }

  const { data: userData, error: userError } = await supabase.auth.getUser()

  let profile = null
  if (userData.user) {
    profile = await getProfile(userData.user.id)

    if (profile.membership === "free") {
      revalidatePath("/", "layout")
      return redirect("/join")
    } else {
      revalidatePath("/", "layout")
      return redirect("/dashboard")
    }
  }
}

export async function signup(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    return redirect(`/login?message=${error.message}`)
  }

  revalidatePath("/", "layout")
  return redirect(
    "/login?message=Please check your email to confirm your account"
  )
}

export async function googleSignIn() {
  const origin = headers().get("origin")
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/api/auth/callback?next=/dashboard`
    }
  })

  if (error) {
    return redirect(`/login?message=${error.message}`)
  }

  return redirect(data.url)
}

export async function logout() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { error } = await supabase.auth.signOut()

  if (error) {
    return redirect(`/login?message=${error.message}`)
  }

  console.log("logging out")

  revalidatePath("/", "layout")
  return redirect("/login?message=You have been logged out successfully")
}
