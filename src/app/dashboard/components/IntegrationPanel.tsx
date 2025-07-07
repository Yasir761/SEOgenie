import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle } from "lucide-react"
import clsx from "clsx"

const integrations = [
  { name: "WordPress", connected: true },
  { name: "Medium", connected: false },
  { name: "Google Docs", connected: true },
]

export default function IntegrationPanel() {
  return (
    <div className="mt-6">
      <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">Integrations</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrations.map((item, i) => (
          <Card key={i} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg text-gray-900">
                {item.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2 text-sm font-medium">
              {item.connected ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-green-600">Connected</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span className="text-red-500">Not Connected</span>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
