import IntegrationPanel from "../components/IntegrationPanel"

export default function IntegrationsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Integrations</h1>
      <p className="text-muted-foreground text-sm">
        Manage your blog export connections like WordPress, Medium, and Google Docs.
      </p>
      <IntegrationPanel />
    </div>
  )
}
