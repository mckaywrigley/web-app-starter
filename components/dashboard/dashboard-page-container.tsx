import { FC, ReactNode } from "react"
import { DashboardBreadcrumb } from "./dashboard-breadcrumb"

interface DashboardPageContainerProps {
  children: ReactNode
}

export const DashboardPageContainer: FC<DashboardPageContainerProps> = ({
  children
}) => {
  return (
    <div className="p-6">
      <DashboardBreadcrumb />

      <div>{children}</div>
    </div>
  )
}
