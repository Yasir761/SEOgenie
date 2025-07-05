'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const integrations = [
  { name: 'Medium', icon: '/icons/medium.svg', x: '-13rem', y: '-8rem' },
  { name: 'Google Docs', icon: '/icons/googledocs.svg', x: '-13rem', y: '7rem' },
  { name: 'WordPress', icon: '/icons/wordpress.svg', x: '13rem', y: '-8rem' },
  { name: 'Zapier', icon: '/icons/zapier.svg', x: '13rem', y: '7rem' },
]

export default function IntegrationMap() {
  return (
    <section className="py-24" id="integrations">
      <div className="text-center mb-16">
        <p className="mt-2 text-gray-600 text-base sm:text-lg">
          Seamlessly integrates with all your favorite tools
          <br />
          {/* <span className="text-indigo-600 font-medium">
            One click. Zero native integration pain.
          </span> */}
        </p>
      </div>

      <div className="relative h-[30rem] w-full flex items-center justify-center px-4 sm:px-0">
        {/* Fixed SVG Lines (hide on small screens) */}
        <svg
          className="absolute w-full h-full pointer-events-none z-0 hidden sm:block"
          viewBox="0 0 500 500"
        >
          <path
            d="M100 100 C 150 100, 200 150, 250 250"
            stroke="#a5b4fc"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M100 400 C 150 400, 200 350, 250 250"
            stroke="#a5b4fc"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M400 100 C 350 100, 300 150, 250 250"
            stroke="#a5b4fc"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M400 400 C 350 400, 300 350, 250 250"
            stroke="#a5b4fc"
            strokeWidth="2"
            fill="none"
          />
        </svg>

        {/* Center Node */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
          className="w-32 h-32 bg-gradient-to-tr from-indigo-100 to-purple-100 text-indigo-700 rounded-full flex items-center justify-center text-lg font-bold shadow-inner z-10"
        >
          SEOgenie
        </motion.div>

        {/* Positioned Icons for Desktop */}
        {integrations.map((item, i) => (
          <TooltipProvider key={i}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="absolute flex flex-col items-center z-10 hidden sm:flex"
                  style={{
                    transform: `translate(${item.x}, ${item.y})`,
                  }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center">
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={28}
                      height={28}
                      className="object-contain hover:scale-110 transition-transform"
                    />
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>{item.name}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}

        {/* Mobile fallback layout (icons centered below) */}
        <div className="sm:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-6 mt-8 px-4 z-10">
          {integrations.map((item, i) => (
            <TooltipProvider key={i}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white shadow">
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={28}
                      height={28}
                      className="object-contain hover:scale-110 transition-transform"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>{item.name}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    </section>
  )
}
