"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { IconArrowRight } from "@tabler/icons-react"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="w-full pb-10">
      <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-16">
        <div>
          <Badge className="text-md px-10 py-1">DISCOUNT HERE</Badge>
        </div>

        <div className="mt-6 space-y-3">
          <div className="mx-auto text-6xl font-bold tracking-tight sm:text-7xl">
            Line 1
          </div>

          <div className="mx-auto text-6xl font-bold tracking-tight text-blue-500 sm:text-7xl">
            Line 2
          </div>

          <div className="mx-auto text-6xl font-bold tracking-tight sm:text-7xl">
            Line 3
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-2xl text-xl tracking-tight sm:text-3xl">
          Tagline
        </div>

        <Link href="/join">
          <Button className="mt-8 bg-blue-500 px-12 py-6 text-2xl text-white hover:bg-blue-600 sm:mt-8 sm:px-8">
            Start Building
            <IconArrowRight className="ml-1" size={28} />
          </Button>
        </Link>
      </div>

      <div className="overflow-hidden bg-blue-600 py-12 md:py-16">
        <div className="relative mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg text-center sm:max-w-2xl">
            <div className="text-4xl tracking-tighter text-white sm:text-5xl sm:font-semibold">
              Heading
            </div>

            <div className="mt-6 text-lg tracking-tighter text-white sm:mt-10 sm:text-2xl">
              Sentence
            </div>

            <div className="mt-6 text-lg tracking-tighter text-white sm:mt-10 sm:text-2xl">
              Sentence
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 pt-16 sm:px-6 lg:px-8">
        <div className="text-4xl font-bold tracking-tighter sm:text-5xl">
          Built by
        </div>

        <div className="mt-8 flex min-w-[280px] flex-col space-y-4 sm:mt-12 md:min-w-[300px]">
          <Link
            className="hover:opacity-50"
            href="https://twitter.com/takeoffai"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center">
              <Image
                className="max-h-[64px] max-w-[64px] rounded"
                src="/logo.png"
                alt="logo"
                width={64}
                height={64}
              />
              <div className="ml-4 text-2xl font-bold md:text-3xl">
                Takeoff AI
              </div>
            </div>
          </Link>
        </div>

        <div className="sm:text-md mt-16 text-center text-xs opacity-60">
          Copyright © 2024 Company, Inc. All rights reserved.
        </div>
      </div>
    </div>
  )
}
