import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { checkAndConsumeCredit } from "@/app/api/utils/useCredits";
import { publishBlogToWordPress } from "../publish";
import { WordPressPostInput, WordPressPostSchema } from "../schema";

export async function POST(req: NextRequest) {
  const body = await req.json();

  // ✅ Validate schema
  const validated = WordPressPostSchema.safeParse(body);
  if (!validated.success) {
    return NextResponse.json({ error: "Invalid input", issues: validated.error.flatten() }, { status: 400 });
  }

  try {
    // ✅ Clerk auth
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userRes = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    });

    const user = await userRes.json();
    const email = user?.email_addresses?.[0]?.email_address;
    if (!email) return NextResponse.json({ error: "Email not found" }, { status: 403 });

    // ✅ Enforce plan access: Starter & Pro only
    await checkAndConsumeCredit(email, { allowOnly: ["Starter", "Pro"] });

    // ✅ Publish to WordPress
    const result = await publishBlogToWordPress(validated.data);

    return NextResponse.json({ success: true, result });
  } catch (err: any) {
    console.error("💥 WordPress Export Error:", err);
    return NextResponse.json({ error: "Failed to export to WordPress", detail: err?.message || err }, { status: 500 });
  }
}
