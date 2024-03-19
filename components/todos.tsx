"use client"

import { toggleTodoCompletion } from "@/actions/todos"
import { Tables } from "@/supabase/types"
import { FC, useOptimistic } from "react"
import { Input } from "./ui/input"

interface TodosProps {
  todos: Tables<"todos">[]
}

export const Todos: FC<TodosProps> = ({ todos }) => {
  return (
    <div className="space-y-4">
      {todos
        .sort((a, b) => a.id.localeCompare(b.id))
        .map(todo => (
          <Todo key={todo.id} todo={todo} />
        ))}
    </div>
  )
}

interface TodoProps {
  todo: Tables<"todos">
}

const Todo: FC<TodoProps> = ({ todo }) => {
  const [optimisticTodo, toggleOptimisticTodo] = useOptimistic(
    todo,
    (currentState, updatedTodo: Tables<"todos">) => updatedTodo
  )

  return (
    <div
      key={optimisticTodo.id}
      className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow"
    >
      <form
        action={async (formData: FormData) => {
          const isComplete = formData.get("isComplete") === "on"

          toggleOptimisticTodo({
            ...optimisticTodo,
            is_completed: isComplete
          })

          await toggleTodoCompletion({
            todoId: todo.id,
            isComplete: isComplete
          })
        }}
      >
        <Input
          name="isComplete"
          type="checkbox"
          checked={optimisticTodo.is_completed}
          onClick={e =>
            e.currentTarget.form?.dispatchEvent(
              new Event("submit", { cancelable: true, bubbles: true })
            )
          }
          className="transform scale-125"
        />
      </form>

      <div className="flex-grow font-semibold">{optimisticTodo.title}</div>
      <div className="text-gray-600">{optimisticTodo.description}</div>
    </div>
  )
}
