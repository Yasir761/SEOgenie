

import { NextRequest, NextResponse } from "next/server";
import { LEMON_API_BASE, headers } from "./config";
import { CreateCheckoutPayload } from "./types";

export async function POST(req: NextRequest) {
  const body: CreateCheckoutPayload = await req.json();

  if (!body.productId) {
    return NextResponse.json({ error: "Missing productId" }, { status: 400 });
  }

  try {
    const res = await fetch(`${LEMON_API_BASE}/checkouts`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        checkout: {
          store_id: process.env.LEMONSQUEEZY_STORE_ID,
          product_id: body.productId,
          email: body.email || undefined,
          custom: {},
          checkout_options: {
            redirect_url: body.returnUrl || "http://localhost:3000/success",
          },
        },
      }),
    });

    const data = await res.json();
    const url = data?.checkout?.data?.attributes?.url;

    if (!url) {
      return NextResponse.json({ error: "No checkout URL returned" }, { status: 500 });
    }

    return NextResponse.json({ url });
  } catch (err) {
    console.error("LemonSqueezy Checkout Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
