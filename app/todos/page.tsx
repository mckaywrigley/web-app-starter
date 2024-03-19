import { getTodos } from "@/actions/todos"
import { Todos } from "@/components/todos"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function PrivatePage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/")
  }

  const todos = await getTodos()

  return (
    <div className="p-4">
      <div className="text-2xl font-bold mb-4 text-center">Todos</div>

      <Todos todos={todos} />
    </div>
  )
}
