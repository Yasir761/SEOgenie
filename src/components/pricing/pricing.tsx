'use client'

import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Get started with basic blog generation.',
    features: [
      '3 blog credits/month',
      'Keyword to blog generation',
      'Export to PDF',
    ],
    cta: 'Start for Free',
    highlight: false,
  },
  {
    name: 'Starter',
    price: '$19/mo',
    description: 'Everything you need to write weekly blogs.',
    features: [
      '20 blog credits/month',
      'Custom tone & structure',
      'SEO optimization',
      'Google Docs & Notion Export',
    ],
    cta: 'Get Starter Plan',
    highlight: true,
  },
  {
    name: 'Pro',
    price: '$49/mo',
    description: 'Unlimited access with CMS integrations.',
    features: [
      'Unlimited blog credits',
      'Advanced AI control',
      'Auto-publish to WordPress',
      'Priority support',
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

  if (!mounted) return null // Avoids SSR mismatch

  return (
    <section className="py-24 scroll-mt-28" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
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
                  <Check className="w-4 h-4 text-indigo-600" />
                  {feature}
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
