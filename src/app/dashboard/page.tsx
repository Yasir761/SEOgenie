import OverviewCards from "./components/OverviewCards"
import UsageChart from "./components/UsageChart"
import RecentBlogs from "./components/RecentBlogs"
import IntegrationPanel from "./components/IntegrationPanel"
import AIAgentsPanel from "./components/AiAgents"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <OverviewCards />
      <UsageChart />
      <RecentBlogs />
      <AIAgentsPanel/>
      <IntegrationPanel />
    </div>
  )
}
