'use client'

import { useEffect, useState } from 'react'
import { Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Updated plan details as per your latest instruction
const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Start for free with limited access.',
    features: [
      { label: '5 blog credits/month', included: true },
      { label: 'Custom tone & voice', included: false },
      { label: 'SEO optimization', included: false },
      { label: 'Export to Google Docs', included: false },
      { label: 'Export to WordPress', included: false },
      { label: 'Publish to X (Twitter)', included: false },
      { label: 'LinkedIn teaser generation', included: false },
      { label: 'Repurpose Toolkit', included: false },
    ],
    cta: 'Start for Free',
    highlight: false,
  },
  {
    name: 'Starter',
    price: '$7.99/mo',
    description: 'For consistent blogging and Google Docs export.',
    features: [
      { label: '25 blog credits/month', included: true },
      { label: 'Custom tone & voice', included: true },
      { label: 'SEO optimization', included: true },
      { label: 'Export to Google Docs', included: true },
      { label: 'Export to WordPress', included: false },
      { label: 'Publish to X (Twitter)', included: false },
      { label: 'LinkedIn teaser generation', included: true },
      { label: 'Repurpose Toolkit', included: false },
    ],
    cta: 'Get Starter Plan',
    highlight: true,
  },
  {
    name: 'Pro',
    price: '$9.99/mo',
    description: 'Full power unlocked with unlimited blogging.',
    features: [
      { label: 'Unlimited blog credits', included: true },
      { label: 'Custom tone & voice', included: true },
      { label: 'SEO optimization', included: true },
      { label: 'Export to Google Docs', included: true },
      { label: 'Export to WordPress', included: true },
      { label: 'Publish to X (Twitter)', included: true },
      { label: 'LinkedIn teaser generation', included: true },
      { label: 'Repurpose Toolkit', included: true },
    ],
    cta: 'Go Pro',
    highlight: false,
  },
]

export default function Pricing() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // Avoid hydration mismatch

  return (
    <section className="py-24 scroll-mt-28" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple Pricing</h2>
        <p className="mt-2 text-gray-600 text-base sm:text-lg">
          No hidden fees. No credit card required for Free plan.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 sm:px-6">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`relative rounded-3xl p-6 border transition duration-300 shadow-sm hover:shadow-md
              ${
                plan.highlight
                  ? 'border-indigo-500 bg-white/80 backdrop-blur-lg ring-2 ring-indigo-300'
                  : 'border-gray-200 bg-white/70'
              }`}
          >
            {plan.highlight && (
              <div className="absolute top-4 right-4 bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full font-medium">
                Most Popular
              </div>
            )}

            <h3 className="text-xl font-semibold text-gray-800">{plan.name}</h3>
            <p className="mt-1 text-3xl font-bold text-gray-900">{plan.price}</p>
            <p className="mt-2 text-gray-600 text-sm">{plan.description}</p>

            <ul className="mt-6 space-y-3 text-left text-sm text-gray-700">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  {feature.included ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <X className="w-4 h-4 text-gray-400" />
                  )}
                  {feature.label}
                </li>
              ))}
            </ul>

            <Button className="mt-6 w-full">{plan.cta}</Button>
          </div>
        ))}
      </div>
    </section>
  )
}
