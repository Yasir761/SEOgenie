import { UserModel } from "@/app/models/user"

export async function checkAndConsumeCredit(email: string, p0: { allowOnly: string[] }) {
  const user = await UserModel.findOne({ email })

  if (!user) {
    throw new Error("User not found")
  }

  const { plan, credits } = user

  // Allow unlimited access for Pro plan
  if (plan === "Pro") {
    return user
  }

  // Starter and Free: enforce credit limits
  if (credits <= 0) {
    throw new Error("Out of credits")
  }

  user.credits -= 1
  await user.save()

  return user
}


export async function checkProAccess(email: string) {
  const user = await UserModel.findOne({ email });

  if (!user) throw new Error("User not found");

  if (user.plan !== "Pro") {
    throw new Error("This feature is available only for Pro users");
  }

  return user;
}
