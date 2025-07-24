import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/app/api/utils/db'
import { TransactionModel } from '@/app/models/transaction'
import { UserModel } from '@/app/models/user'
import crypto from 'crypto'
import { PLANS } from '@/app/constants/plans'

// Retry utility
async function retry(fn: () => Promise<any>, retries = 3, delay = 500): Promise<any> {
  try {
    return await fn()
  } catch (err) {
    if (retries <= 0) throw err
    await new Promise((res) => setTimeout(res, delay))
    return retry(fn, retries - 1, delay * 2)
  }
}

// HMAC signature check
function verifyLemonWebhook(body: string, signature: string) {
  const secret = process.env.LEMON_WEBHOOK_SECRET!
  const hmac = crypto.createHmac('sha256', secret).update(body).digest('hex')
  return hmac === signature
}

// Get next reset date (same day, next month)
function getNextMonthDate(): Date {
  const now = new Date()
  const next = new Date(now)
  next.setMonth(now.getMonth() + 1)
  return next
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get('X-Signature') || ''
  const body = await req.text()

  const isValid = verifyLemonWebhook(body, signature)
  if (!isValid) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const event = JSON.parse(body)
  const { event_name, data } = event
  const userEmail = data?.attributes?.user_email
  const now = new Date()

  if (!userEmail) {
    return NextResponse.json({ error: 'Missing user email' }, { status: 400 })
  }

  await connectDB()

  const planName =
    data?.attributes?.first_order_item?.name || data?.attributes?.name || 'Free'
  const selectedPlan = PLANS[planName as keyof typeof PLANS]
  const credits = selectedPlan?.monthlyCredits ?? PLANS.Free.monthlyCredits
  const nextResetDate = getNextMonthDate()

  // 1️⃣ Initial purchase
  if (event_name === 'order_created') {
    await retry(() =>
      TransactionModel.create({
        email: userEmail,
        plan: planName,
        amount: data.attributes.total,
        orderId: data.id,
        createdAt: now,
      })
    )

    await retry(() =>
      UserModel.findOneAndUpdate(
        { email: userEmail },
        {
          $set: {
            plan: planName,
            credits,
            nextResetDate,
          },
        },
        { upsert: true }
      )
    )
  }

  // 2️⃣ Monthly renewal
  if (event_name === 'subscription_payment_successful') {
    const user = await UserModel.findOne({ email: userEmail })

    if (user && (!user.nextResetDate || new Date(user.nextResetDate) < now)) {
      await retry(() =>
        UserModel.updateOne(
          { email: userEmail },
          {
            $set: {
              credits,
              nextResetDate,
            },
          }
        )
      )
    }
  }

  // 3️⃣ Cancelled or Refunded
  if (event_name === 'subscription_cancelled' || event_name === 'order_refunded') {
    await retry(() =>
      UserModel.findOneAndUpdate(
        { email: userEmail },
        {
          $set: {
            plan: 'Free',
            credits: PLANS.Free.monthlyCredits,
            nextResetDate,
          },
        }
      )
    )
  }

  return NextResponse.json({ received: true })
}
