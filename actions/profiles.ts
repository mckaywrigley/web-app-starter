"use server"

import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export async function getProfile(userId: string) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single()

  if (error) {
    throw new Error("Failed to fetch profile")
  }

  return data
}
