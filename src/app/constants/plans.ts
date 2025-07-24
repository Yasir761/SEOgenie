// constants/plans.ts
export const PLANS = {
  Free: {
    name: "Free",
    price: 0,
    monthlyCredits: 3,
    features: ["Basic blog generation"],
  },
  Starter: {
    name: "Starter",
    price: 7.99,
    monthlyCredits: 25,
    features: ["Advanced blog", "Tone/Voice", "SEO Optimization"],
  },
  Pro: {
    name: "Pro",
    price: 9.99,
    monthlyCredits: Infinity,
    features: ["Everything Unlimited"],
  },
}
