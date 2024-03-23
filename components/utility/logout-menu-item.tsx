"use client"

import { logout } from "@/actions/auth"
import { Button } from "../ui/button"

export const LogoutMenuItem = () => {
  return (
    <Button
      className="w-full"
      size="sm"
      onClick={() => {
        logout()
      }}
    >
      Logout
    </Button>
  )
}
