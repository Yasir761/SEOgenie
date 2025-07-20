import { UserModel } from "@/app/models/user";

/**
 * Checks and consumes one credit for the user based on email.
 * @param email The user's email
 * @returns The updated user document
 * @throws Error if user not found or out of credits
 */
export async function checkAndConsumeCredit(email: string) {
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.credits <= 0) {
    throw new Error("Out of credits");
  }

  user.credits -= 1;
  await user.save();

  return user;
}
