'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'

const faqs = [
  {
    question: 'How does SEOgenie work with just one keyword?',
    answer:
      'You enter a single keyword and our AI generates a full-length, SEO-optimized blog post complete with structure, meta data, internal links, and more.',
  },
  {
    question: 'Can I customize the blog tone and structure?',
    answer:
      'Yes. You can select the tone, word count, and outline preferences before generating content.',
  },
  {
    question: 'Do I need to connect a CMS to use it?',
    answer:
      'No. You can download your content or export it to PDF, Google Docs, or even copy HTML. CMS integration is optional.',
  },
  {
    question: 'Is the generated content plagiarism-free?',
    answer:
      'Absolutely. All outputs are scanned for originality and passed through AI-powered plagiarism checks.',
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
        {/* <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 font-heading">
          🧐 FAQ
        </h2> */}
        <p className="text-gray-600 text-lg sm:text-xl font-semibold mt-2">
          Frequently Asked Questions
        </p>
        <p className="text-gray-500 mt-4 text-sm sm:text-base">
          Have a question that needs a human to answer?{' '}
          <a href="#contact" className="text-indigo-600 hover:underline">
            Contact us →
          </a>
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl px-5 sm:px-6 py-4 shadow-md cursor-pointer"
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
          </div>
        ))}
      </div>
    </section>
  )
}
