import { UserModel } from "@/app/models/user"

/**
 * Checks and deducts 1 credit for non-Pro users.
 * - Free: 3 credits/month
 * - Starter: 25 credits/month
 * - Pro: unlimited (no deduction)
 *
 * @param email - The user's email
 * @throws if user not found or out of credits
 * @returns the updated user document
 */
export async function checkAndConsumeCredit(email: string) {
  const user = await UserModel.findOne({ email })

  if (!user) {
    throw new Error("User not found")
  }

  const plan = user.plan || "Free"
  const isPro = plan === "Pro"

  if (!isPro) {
    if (user.credits <= 0) {
      throw new Error("You're out of credits. Please upgrade your plan.")
    }

    user.credits -= 1
    await user.save()
  }

  return user
}
