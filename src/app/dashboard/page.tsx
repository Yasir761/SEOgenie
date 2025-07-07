import OverviewCards from "./components/OverviewCards"
import UsageChart from "./components/UsageChart"
import RecentBlogs from "./components/RecentBlogs"
import IntegrationPanel from "./components/IntegrationPanel"

export default function DashboardPage() {
  return (
    <div className="flex-1 flex flex-col p-6 space-y-8">
      <OverviewCards />
      <UsageChart />
      <RecentBlogs />
      <IntegrationPanel />
    </div>
  )
}
