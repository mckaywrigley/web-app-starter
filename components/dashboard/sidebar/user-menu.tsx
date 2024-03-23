import { Avatar, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { LogoutMenuItem } from "@/components/utility/logout-menu-item"
import defaultPfp from "@/public/default-pfp.jpg"
import { User } from "@supabase/supabase-js"
import Link from "next/link"
import { FC } from "react"

interface UserMenuProps {
  user: User
}

export const UserMenu: FC<UserMenuProps> = ({ user }) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={defaultPfp.src} />
            </Avatar>

            <div>{user.email}</div>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <Link href="/dashboard/profile">
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </Link>

          <Link href="/dashboard/billing">
            <DropdownMenuItem>Billing</DropdownMenuItem>
          </Link>

          <DropdownMenuSeparator />

          <div className="mb-1">
            <LogoutMenuItem />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
