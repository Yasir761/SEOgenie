'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Instagram, X, Mail } from 'lucide-react'

export default function CTAAndFooter() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <footer className="mt-24">
      {/* CTA */}
      <section className="py-20 text-center px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-heading">
          Ready to generate better content — faster?
        </h2>
        <p className="mt-4 text-gray-600 text-base sm:text-lg">
          Try SEOgenie now and get your first 3 blogs on us. No credit card required.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/signup">
            <Button className="text-white px-6 py-2 rounded-full w-full sm:w-auto">
              Get Started Free
            </Button>
          </Link>
          <Link href="/pricing">
            <Button
              variant="outline"
              className="px-6 py-2 rounded-full w-full sm:w-auto"
            >
              See Plans
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t border-gray-200 py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-gray-600 text-sm">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800">SEOgenie</h3>
            <p className="mt-2">Smarter content, faster results.</p>
          </div>

          {/* Links */}
          <div className="space-y-2">
            <p>
              <Link href="/features" className="hover:text-indigo-600 transition">
                Features
              </Link>
            </p>
            <p>
              <Link href="/pricing" className="hover:text-indigo-600 transition">
                Pricing
              </Link>
            </p>
            <p>
              <Link href="/faq" className="hover:text-indigo-600 transition">
                FAQs
              </Link>
            </p>
            <p>
              <Link href="/contact" className="hover:text-indigo-600 transition">
                Contact
              </Link>
            </p>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <p className="font-medium text-gray-800">Stay updated</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="Enter your email"
                className="rounded-full px-4 py-2 w-full"
              />
              <Button className="rounded-full text-white px-5 w-full sm:w-auto">
                Subscribe
              </Button>
            </div>
            <div className="flex gap-4 pt-2 text-gray-500">
              <Link href="#">
                <X className="w-5 h-5 hover:text-indigo-600" />
              </Link>
              <Link href="#">
                <Instagram className="w-5 h-5 hover:text-indigo-600" />
              </Link>
              <Link href="#">
                <Mail className="w-5 h-5 hover:text-indigo-600" />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-gray-400 mt-10">
          &copy; {new Date().getFullYear()} SEOgenie. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
