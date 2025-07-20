
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/app/api/utils/db';
import { TransactionModel } from '@/app/models/transaction';
import { UserModel } from '@/app/models/user'; // Assume you track credits here
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  const signature = req.headers.get('X-Signature') || '';
  const body = await req.text(); // Important: text not json

  const isValid = verifyLemonWebhook(body, signature);

  if (!isValid) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const event = JSON.parse(body);
  const { event_name, data } = event;

  if (event_name === 'order_created') {
    await connectDB();
    const userEmail = data.attributes.user_email;
    const plan = data.attributes.first_order_item.name; // "Starter", "Pro", etc.

    // Save transaction
    await TransactionModel.create({
      email: userEmail,
      plan,
      amount: data.attributes.total,
      orderId: data.id,
      createdAt: new Date()
    });

    // Update user's credit
    const credits = plan === 'Pro' ? 99999 : plan === 'Starter' ? 20 : 3;

    await UserModel.findOneAndUpdate(
      { email: userEmail },
      { $set: { credits, plan } },
      { upsert: true }
    );
  }

  return NextResponse.json({ received: true });
}

function verifyLemonWebhook(body: string, signature: string) {
  const secret = process.env.LEMON_WEBHOOK_SECRET!;
  const hmac = crypto.createHmac('sha256', secret).update(body).digest('hex');
  return hmac === signature;
}
