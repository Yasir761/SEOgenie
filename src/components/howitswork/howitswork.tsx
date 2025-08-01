'use client'

import { motion } from 'framer-motion'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import {
  TrendingUp,
  Sparkles,
  FileText,
  PenLine,
  Upload,
} from 'lucide-react'

const howItWorksSteps = [
  {
    title: 'Just Add a Keyword',
    summary: 'Start with one idea — we’ll handle the rest.',
    description:
      'Type a single keyword and let Wordywrites handle the research. Behind the scenes, our AI agents analyze trends, hashtags, audience, and competition to give you a strong strategic starting point.',
    gradient: 'from-[#e0f2fe] via-[#e0e7ff] to-[#ede9fe]',
    delay: 0.1,
    icon: TrendingUp,
  },
  {
    title: 'SEO Strategy Engine',
    summary: 'More than content — a full strategy.',
    description:
      'Our engine builds a growth-ready plan with optimized titles, relevant hashtags, smart tone adaptation, and teaser copy for sharing — all aligned to your keyword and audience.',
    gradient: 'from-[#fef3c7] via-[#fcd34d] to-[#fca5a5]',
    delay: 0.15,
    icon: Sparkles,
  },
  {
    title: 'AI Blueprint Builder',
    summary: 'A structure that performs.',
    description:
      'Wordywrites crafts a smart blog outline with proper H2s, H3s, CTAs, and alignment with tone and audience — so your blog is compelling before it’s even written.',
    gradient: 'from-[#ede9fe] via-[#d8b4fe] to-[#f0abfc]',
    delay: 0.2,
    icon: FileText,
  },
  {
    title: 'Blog Writing Magic',
    summary: 'Written and refined by AI.',
    description:
      'Our AI Writer Agent generates the full blog, while the Editor Agent polishes tone, structure, and grammar. You get publish-ready content instantly.',
    gradient: 'from-[#d1fae5] via-[#a7f3d0] to-[#99f6e4]',
    delay: 0.25,
    icon: PenLine,
  },
  {
    title: 'Export & Publish',
    summary: 'Send it live anywhere.',
    description:
      'Copy HTML, export to Google Docs or PDF, or publish directly to WordPress or Medium. Wordywrites supports your entire publishing workflow.',
    gradient: 'from-[#e0f2fe] via-[#c7d2fe] to-[#fce7f3]',
    delay: 0.3,
    icon: Upload,
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 scroll-mt-24" id="how-it-works">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            How It Works
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            From one keyword to a full blog — powered by AI agents working together.
          </p>
        </div>
        {howItWorksSteps.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ delay: item.delay, duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-start gap-6 md:gap-10"
          >
            <Card
              className={`w-full md:w-2/5 bg-gradient-to-br ${item.gradient} border-none shadow-xl hover:shadow-2xl transition duration-300 rounded-3xl`}
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl font-heading text-gray-800">
                  <item.icon className="w-5 h-5 text-primary" />
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm sm:text-base text-gray-700 font-medium">
                  {item.summary}
                </CardDescription>
              </CardContent>
            </Card>

            <div className="w-full md:w-3/5 text-gray-700 font-body text-base sm:text-lg leading-relaxed pt-2 md:pt-0">
              {item.description}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
