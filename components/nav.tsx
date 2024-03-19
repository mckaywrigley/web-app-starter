"use client"

import { logout } from "@/actions/auth"
import { User } from "@supabase/supabase-js"
import { IconMenu2, IconX } from "@tabler/icons-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FC, useState } from "react"
import { Button } from "./ui/button"
import { ThemeSwitcher } from "./utility/theme-switcher"

const links = [
  { href: "/about", label: "About" },
  { href: "/product", label: "Product" },
  { href: "/contact", label: "Contact" }
]

interface NavProps {
  user: User | null
}

export const Nav: FC<NavProps> = ({ user }) => {
  const pathname = usePathname()

  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="hidden p-4 lg:flex lg:items-center lg:justify-between">
        <Link className="flex items-center space-x-3" href="/">
          <Image
            className="rounded"
            src="/logo.png"
            alt="logo"
            width={36}
            height={36}
          />

          <div className="text-2xl font-semibold">Starter</div>
        </Link>

        <div className="absolute left-1/2 flex -translate-x-1/2 space-x-6 rounded-full border px-6 py-2">
          {links.map((link, index) => (
            <Link
              className="font-bold hover:opacity-50"
              key={index}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <ThemeSwitcher />

          {user ? (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  logout()
                }}
              >
                Logout
              </Button>

              <Link href="/todos">
                <Button className="bg-blue-500 text-white hover:bg-blue-600">
                  Todos
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>

              <Link href="/join">
                <Button className="bg-blue-500 text-white hover:bg-blue-600">
                  Signup
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between px-2 py-3 lg:hidden">
        <Link
          className="flex items-center space-x-2 text-xl font-bold"
          href="/"
        >
          <Image
            className="rounded"
            src="/logo.png"
            alt="logo"
            width={32}
            height={32}
          />

          <div>Starter</div>
        </Link>

        {open ? (
          <IconX onClick={() => setOpen(false)} size={32} />
        ) : (
          <IconMenu2 onClick={() => setOpen(true)} size={32} />
        )}

        {open && (
          <div
            className="absolute inset-x-0 top-14 flex h-screen flex-col items-center space-y-4 rounded border-t-2 bg-white shadow-2xl"
            onClick={() => setOpen(false)}
          >
            {links.map((link, index) => (
              <Link
                key={index}
                className="w-full border-b-2 py-4 text-center text-2xl hover:border-black dark:text-black"
                href={link.href}
              >
                {link.label}
              </Link>
            ))}

            {user ? (
              <div className="flex w-full flex-col space-y-4 px-2">
                <Button
                  className="w-full text-lg"
                  variant="outline"
                  onClick={() => {
                    logout()
                  }}
                >
                  Logout
                </Button>

                <Link className="w-full" href="/todos">
                  <Button className="w-full bg-blue-500 text-lg text-white hover:bg-blue-600">
                    Todos
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex w-full flex-col space-y-4 px-2">
                <Link className="w-full" href="/login">
                  <Button className="w-full text-lg" variant="outline">
                    Login
                  </Button>
                </Link>

                <Link className="w-full" href="/join">
                  <Button className="w-full bg-blue-500 text-lg text-white hover:bg-blue-600">
                    Signup
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
