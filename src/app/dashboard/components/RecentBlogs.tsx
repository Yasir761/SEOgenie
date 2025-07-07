import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"

const blogs = [
  { title: "Top SEO Tips", date: "Jul 6", exported: true, integration: "WordPress" },
  { title: "How to Rank #1", date: "Jul 5", exported: false, integration: "-" },
]

export default function RecentBlogs() {
  return (
    <div className="mt-6 w-full">
      <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
        Recent Blogs
      </h3>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow">
        <Table className="min-w-[600px]">
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap">Title</TableHead>
              <TableHead className="whitespace-nowrap">Date</TableHead>
              <TableHead className="whitespace-nowrap">Exported</TableHead>
              <TableHead className="whitespace-nowrap">Integration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.map((blog, i) => (
              <TableRow key={i}>
                <TableCell>{blog.title}</TableCell>
                <TableCell>{blog.date}</TableCell>
                <TableCell>{blog.exported ? "Yes" : "No"}</TableCell>
                <TableCell>{blog.integration}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
