'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import clsx from 'clsx'

const navItems = [
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Pricing", href: "#pricing" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  // const [activeSection, setActiveSection] = useState('')

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 20)

    const scrollPos = window.scrollY + 100

    const sectionOffsets = navItems.map(item => {
      const id = item.name.toLowerCase().replace(/\s+/g, '-')
      const el = document.getElementById(id)
      return el ? { id, offset: el.offsetTop } : null
    }).filter(Boolean) as { id: string; offset: number }[]

    let current = ''
    for (let i = 0; i < sectionOffsets.length; i++) {
      if (scrollPos >= sectionOffsets[i].offset) {
        current = sectionOffsets[i].id
      }
    }
    // setActiveSection(current)
  }

  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={clsx(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        scrolled ? 'backdrop-blur-md bg-white/60 shadow-md' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="text-xl font-bold text-gray-800 font-heading hover:text-primary transition-colors"
          >
            SEOgenie
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
            {navItems.map((item, i) => {
              const id = item.name.toLowerCase().replace(/\s+/g, '-')
              return (
                <a
                  key={i}
                  href={item.href}
                  className={clsx(
                    'cursor-pointer transition-colors hover:text-primary',
                    // activeSection === id && 'text-primary font-semibold'
                  )}
                >
                  {item.name}
                </a>
              )
            })}
          </nav>

          {/* Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" className="text-sm px-4">
              Login
            </Button>
            <Button className="text-sm px-5 py-2">Try It Free</Button>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden px-6 pb-4 pt-2 bg-white/70 backdrop-blur-md shadow-md"
        >
          <div className="flex flex-col gap-4 text-gray-700 font-medium">
            {navItems.map((item, i) => {
              const id = item.name.toLowerCase().replace(/\s+/g, '-')
              return (
                <a
                  key={i}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={clsx(
                    'cursor-pointer transition-colors hover:text-primary',
                    // activeSection === id && 'text-primary font-semibold'
                  )}
                >
                  {item.name}
                </a>
              )
            })}
            <Button variant="ghost" className="w-full mt-2">
              Login
            </Button>
            <Button className="w-full">Try It Free</Button>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
