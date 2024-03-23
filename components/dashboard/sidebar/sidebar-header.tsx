import { ThemeSwitcher } from "@/components/utility/theme-switcher"
import Image from "next/image"
import { FC } from "react"

interface SidebarHeaderProps {}

export const SidebarHeader: FC<SidebarHeaderProps> = ({}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3 text-2xl font-extrabold">
        <Image
          src="/logo.png"
          alt="Starter"
          width={40}
          height={40}
          className="rounded-lg"
        />
        <div>Starter</div>
      </div>

      <ThemeSwitcher />
    </div>
  )
}
