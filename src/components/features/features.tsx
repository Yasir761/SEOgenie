'use client'

import {
  PenLine,
  FileText,
  ShieldCheck,
  Sparkles,
  Wand2,
  BrainCog,
} from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: PenLine,
    title: "Instant Content, No Complexity",
    description:
      "Turn a keyword into a full blog post with built-in SEO and structure. Zero writing required.",
  },
  {
    icon: FileText,
    title: "Custom-Tailored to Your Voice",
    description:
      "Choose your tone, audience, and blog type — Wordywrites adapts to sound like you.",
  },
  {
    icon: ShieldCheck,
    title: "Uniqueness You Can Trust",
    description:
      "Every blog passes deep AI-powered checks to ensure originality and avoid repetition.",
  },
  {
    icon: Sparkles,
    title: "Smart SEO Built In",
    description:
      "Get content that performs — with optimized titles, hashtags, and built-in structure.",
  },
  {
    icon: Wand2,
    title: "1-Click Export & Publish",
    description:
      "Send your blog to WordPress, Google Docs, or PDF — ready to go live in seconds.",
  },
  {
    icon: BrainCog,
    title: "Made for Creators & Teams",
    description:
      "Whether you're a founder, freelancer, or student — Wordywrites scales with you.",
  },
]

export default function Features() {
  return (
    <section
      className="py-24 sm:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-24"
      id="features"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 sm:mb-16 text-center">
          <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
            Why Wordywrites?
          </span>
          <h2 className="text-4xl font-bold text-gray-900 font-heading mt-2">
            Everything You Need to Blog Better
          </h2>
          <p className="mt-2 text-lg sm:text-xl text-gray-600">
            Powerful capabilities, built for creators who care about content.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {features.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-white border border-gray-200 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-100 via-white to-purple-100 shadow-inner border border-indigo-200 transition-all shrink-0">
                  <Icon className="w-6 h-6 text-indigo-600 group-hover:rotate-6 transition-transform" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">{title}</h3>
                  <p className="mt-2 text-gray-600 text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
