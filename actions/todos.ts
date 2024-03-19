"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function getTodos() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.from("todos").select("*")

  if (error) {
    throw new Error("Failed to fetch todos")
  }

  return data
}

export async function toggleTodoCompletion(data: {
  todoId: string
  isComplete: boolean
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { error } = await supabase
    .from("todos")
    .update({ is_completed: data.isComplete })
    .eq("id", data.todoId)

  if (error) {
    throw new Error("Failed to toggle todo completion")
  }

  revalidatePath("/todos")
}
