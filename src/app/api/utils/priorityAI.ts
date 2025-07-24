
// export type Plan = "free" | "starter" | "pro";

// export function getUserPlanFromEmail(email: string | null): Plan {
//   if (!email) return "free"; // fallback for unauthenticated

//   // You can replace this with a DB lookup later
//   if (email.endsWith("@teststarter.com")) return "starter";
//   if (email.endsWith("@testpro.com")) return "pro";
//   return "free";
// }

// export function getLLMConfigByPlan(plan: Plan) {
//   switch (plan) {
//     case "starter":
//     case "pro":
//       return {
//         provider: "openai" as const,
//         endpoint: "https://api.openai.com/v1/chat/completions",
//         model: "gpt-4o-mini",
//         headers: {
//           Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//           "Content-Type": "application/json"
//         }
//       };

//     case "free":
//     default:
//       return {
//         provider: "groq" as const,
//         endpoint: "https://api.groq.com/openai/v1/chat/completions",
//         model: "llama3-8b-8192",
//         headers: {
//           Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
//           "Content-Type": "application/json"
//         }
//       };
//   }
// }
