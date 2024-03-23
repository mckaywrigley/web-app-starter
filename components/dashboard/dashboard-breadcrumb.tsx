"use client"

import { usePathname } from "next/navigation"
import { FC } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "../ui/breadcrumb"

interface DashboardBreadcrumbProps {}

export const DashboardBreadcrumb: FC<DashboardBreadcrumbProps> = ({}) => {
  const pathname = usePathname()
  const pathSegments = pathname.split("/").filter(path => path !== "")

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((path, index) => (
          <>
            <BreadcrumbItem key={index}>
              <BreadcrumbLink
                href={`/${pathSegments.slice(0, index + 1).join("/")}`}
              >
                {path.charAt(0).toUpperCase() + path.slice(1)}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < pathSegments.length - 1 && <BreadcrumbSeparator />}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
