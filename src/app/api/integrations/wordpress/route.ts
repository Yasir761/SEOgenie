import { NextRequest, NextResponse } from "next/server";
import { WordPressPostSchema } from "./schema";
import { publishBlogToWordPress } from "./publish";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = WordPressPostSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", issues: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const result = await publishBlogToWordPress(parsed.data);
    return NextResponse.json({ message: "Post published successfully", result });
  } catch (err: any) {
    console.error("❌ WordPress publish failed:", err);
    return NextResponse.json({ error: err.message || "Failed to publish blog" }, { status: 500 });
  }
}
