"use client"

import { cn } from "@/lib/utils"
import { IconHome, IconLink } from "@tabler/icons-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FC } from "react"

const links: {
  href: string
  label: string
  icon: React.ReactNode
}[] = [
  { href: "/dashboard", label: "Home", icon: <IconHome /> },
  { href: "/dashboard/link1", label: "Link 1", icon: <IconLink /> },
  { href: "/dashboard/link2", label: "Link 2", icon: <IconLink /> },
  { href: "/dashboard/link3", label: "Link 3", icon: <IconLink /> }
]

interface SidebarNavProps {}

export const SidebarNav: FC<SidebarNavProps> = () => {
  const pathname = usePathname()

  return (
    <div className="mt-10 flex flex-col space-y-1">
      {links.map(link => (
        <Link
          key={link.href}
          className={cn(
            "flex cursor-pointer items-center space-x-3 p-2 text-xl hover:bg-neutral-200 hover:opacity-50",
            pathname === link.href ? "rounded bg-neutral-200" : ""
          )}
          href={link.href}
        >
          {link.icon}

          <div>{link.label}</div>
        </Link>
      ))}
    </div>
  )
}
