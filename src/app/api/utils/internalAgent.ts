// // utils/internalAgent.ts
// import { NextRequest } from "next/server"

// export async function callRouteHandler({
//   handler,
//   body
// }: {
//   handler: (req: NextRequest) => Promise<Response>,
//   body: any
// }) {
//   const req = new Request("http://localhost", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body)
//   })

//   // Simulate a NextRequest
//   const nextReq = new NextRequest(req)

//   const res = await handler(nextReq)
//   const json = await res.json()

//   if (!res.ok) {
//     throw {
//       error: json.error || "Unknown error",
//       status: res.status
//     }
//   }

//   return json
// }
