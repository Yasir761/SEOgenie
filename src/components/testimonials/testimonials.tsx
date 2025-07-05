'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const testimonials = [
  {
    name: 'Aman Sharma',
    role: 'Founder, EduTechHub',
    avatar: '/avatars/aman.jpg',
    quote:
      "SEOgenie helped me publish weekly blogs in half the time. It's my secret weapon for scaling organic traffic.",
  },
  {
    name: 'Priya Kapoor',
    role: 'Content Marketer, Growthy.io',
    avatar: '/avatars/priya.jpg',
    quote:
      'What used to take 3 hours now takes 5 minutes. The AI output is clean, optimized, and ready to go.',
  },
  {
    name: 'Mohit Das',
    role: 'Solo Creator',
    avatar: '/avatars/mohit.jpg',
    quote:
      'The one-click Notion export is a lifesaver. This tool actually understands what content creators need.',
  },
]

export default function Testimonials() {
  return (
    <section className="py-24" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 font-heading">
          Loved by early users.
        </h2>
        <p className="text-gray-600 text-base sm:text-lg mb-12">
          Hear what real users are saying about{' '}
          <span className="text-indigo-600 font-medium">SEOgenie</span>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="bg-white rounded-3xl shadow-sm p-6 hover:shadow-md transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={item.avatar}
                  alt={item.name}
                  width={48}
                  height={48}
                  className="rounded-full border border-gray-200"
                />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">“{item.quote}”</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
