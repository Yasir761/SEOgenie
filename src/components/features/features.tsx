"use client"

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
    title: "From AI to Blog Post",
    description:
      "Generate SEO-ready blog posts from a single keyword using AI. No manual effort required.",
    
  },
  {
    icon: FileText,
    title: "Fully Customized",
    description:
      "Tailor every piece of content to your tone, target audience, and structure preferences.",
    
  },
  {
    icon: ShieldCheck,
    title: "Plagiarism Safe",
    description:
      "All content is passed through deep AI plagiarism checks to ensure uniqueness and safety.",
    
  },
  {
    icon: Sparkles,
    title: "SEO Optimized",
    description:
      "Meta tags, schema, and internal links are generated automatically for top rankings.",
    
  },
  {
    icon: Wand2,
    title: "1-Click Export",
    description:
      "Export your blog posts to PDF, Google Docs or directly post to your CMS with one click.",
   
  },
  {
    icon: BrainCog,
    title: "Built for Everyone",
    description:
      "Whether you're a founder, marketer, or student — generate quality content effortlessly.",
    
  },
]

export default function Features() {
  return (
    <section className="py-24 sm:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-24" id="features">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 sm:mb-16 text-center">
          {/* <h2 className="text-4xl font-bold text-gray-900 font-heading">Features</h2> */}
          <p className="mt-2 text-lg sm:text-xl text-gray-600">
            Powerful capabilities crafted for your content success
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {features.map(({ icon: Icon, title, description, cta }, i) => (
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
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">{title}</h3>
                  <p className="mt-2 text-gray-600 text-sm leading-relaxed">{description}</p>
                  <a
                    href="#"
                    className="inline-block mt-4 text-sm font-medium text-indigo-600 group-hover:text-indigo-700 transition-colors"
                  >
                    {cta}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
