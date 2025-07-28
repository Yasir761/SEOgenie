'use client'

import { motion } from 'framer-motion'

export default function BlogLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative bg-white/30 backdrop-blur-xl border border-white/20 shadow-xl rounded-3xl px-8 py-10 w-[90%] max-w-md text-center space-y-6"
      >
        {/* Glowing background aura */}
        <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-tr from-indigo-400/30 via-pink-400/20 to-yellow-300/20 blur-2xl animate-pulse opacity-20 z-[-1]" />

        {/* Subtle sparkles */}
        <div className="absolute top-4 right-6 w-2 h-2 bg-yellow-300 rounded-full animate-ping opacity-80"></div>
        <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping opacity-80"></div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-xl font-bold text-gray-900 tracking-tight"
        >
          ✨ Generating your blog with Wordywrites AI...
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-sm text-gray-700"
        >
          Sit tight while our intelligent agents weave your content masterpiece.
        </motion.p>

        {/* Circular spinner animation */}
        <motion.div
          className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        />

        {/* Optional subtle pulse ring */}
        <div className="w-14 h-14 rounded-full border-2 border-indigo-300 opacity-30 animate-ping absolute left-1/2 top-[85%] transform -translate-x-1/2 -translate-y-1/2 z-[-1]" />
      </motion.div>
    </div>
  )
}
