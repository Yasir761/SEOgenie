import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

export default function OverviewCards() {
  const stats = [
    { label: "Blogs Created", value: 24 },
    { label: "Words Written", value: "18.2k" },
    { label: "Avg SEO Score", value: "89%" },
  ]

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
      {stats.map((stat, i) => (
        <Card key={i} className="w-full">
          <CardHeader className="pb-1">
            <CardTitle className="text-sm text-muted-foreground">
              {stat.label}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {stat.value}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
