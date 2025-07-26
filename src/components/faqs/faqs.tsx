'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    question: 'What do I need to get started?',
    answer:
      'Just one keyword. Wordywrites will generate a full-length, optimized blog for you — no setup or prior knowledge needed.',
  },
  {
    question: 'Can I adjust tone, style, or audience?',
    answer:
      'Absolutely. You can choose from tones like informative, casual, formal, or promotional, and tailor it to your target audience.',
  },
  {
    question: 'Will the blogs be SEO optimized?',
    answer:
      'Yes. Our engine applies modern SEO practices — optimized titles, structured outlines, and relevant keywords to help you rank.',
  },
  {
    question: 'Is the content really plagiarism-free?',
    answer:
      '100%. We run all generated content through AI-powered plagiarism checks to ensure originality and safety.',
  },
  {
    question: 'Can I export the content easily?',
    answer:
      'Yes — you can download as PDF, export to Google Docs, or publish directly to WordPress or Medium.',
  },
  {
    question: 'Will my data be saved or reused?',
    answer:
      'No. Your inputs and generated content are private and never reused or stored beyond your account history.',
  },
  {
    question: 'Do I need to connect my CMS to use it?',
    answer:
      'No. CMS integration is optional. You can use all features manually too.',
  },
  {
    question: 'How is Wordywrites different from ChatGPT?',
    answer:
      'Unlike general AI tools, Wordywrites is purpose-built for SEO blog writing with dedicated AI agents, structured workflows, and publishing tools.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section className="py-24 px-4 sm:px-8 max-w-4xl mx-auto" id="faq">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 font-heading">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-500 mt-4 text-sm sm:text-base">
          Still curious?{' '}
          <a href="/contact" className="text-indigo-600 hover:underline">
            Contact us →
          </a>
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl px-5 sm:px-6 py-4 shadow-md cursor-pointer transition-all duration-200 hover:shadow-lg"
            onClick={() => toggleFAQ(i)}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-gray-800 font-medium text-base sm:text-lg">
                {faq.question}
              </h3>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 text-indigo-500 ${
                  openIndex === i ? 'rotate-180' : ''
                }`}
              />
            </div>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-3 text-sm sm:text-base text-gray-600"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <p className="text-center mt-10 text-sm text-gray-500">
        Trusted by founders, marketers, and creators around the world.
      </p>
    </section>
  )
}
