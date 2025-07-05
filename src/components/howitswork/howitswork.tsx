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
  CheckCircle,
  Upload,
  TrendingUp,
  PenLine,
  FileText,
  ShieldCheck,
  Sparkles,
  Wand2,
  BrainCog,
} from 'lucide-react'

const howItWorksSteps = [
  {
    title: 'Start With a Keyword',
    summary: 'Kickstart your blog journey by entering just one keyword.',
    description:
      'Just type one keyword. SEOgenie instantly understands your intent and builds a smart outline optimized for rankings.',
    gradient: 'from-[#e0f2fe] via-[#e0e7ff] to-[#ede9fe]',
    delay: 0.1,
    icon: TrendingUp,
  },
  {
    title: 'AI Does the Work',
    summary:
      'Let the engine generate content with SEO, structure, and quality built-in.',
    description:
      'Your blog is generated with compelling structure, SEO meta tags, internal links, CTAs, and even schema markup — no edits needed.',
    gradient: 'from-[#fef3c7] via-[#fcd34d] to-[#fca5a5]',
    delay: 0.2,
    icon: CheckCircle,
  },
  {
    title: 'Export & Publish',
    summary:
      'Instantly export your blog or post it directly to your CMS.',
    description:
      'Download as PDF or Google Doc, copy the HTML, or publish directly to your CMS. Your content is ready to go live in one click.',
    gradient: 'from-[#d1fae5] via-[#a7f3d0] to-[#99f6e4]',
    delay: 0.3,
    icon: Upload,
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 scroll-mt-24" id="how-it-works">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        <div className="text-center mb-10">
          {/* <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">How It Works</h2> */}
          {/* <p className="mt-2 text-lg text-gray-600">Just 3 simple steps to SEO magic</p> */}
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