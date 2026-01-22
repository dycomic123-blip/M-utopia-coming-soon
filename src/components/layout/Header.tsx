import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NAVIGATION_ITEMS, SITE_CONFIG } from '../../utils/constants'

/**
 * Header - Swiss Style Navigation
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-200"
      style={{
        backgroundColor: scrolled ? '#FAFAFA' : 'transparent',
        borderBottom: scrolled ? '1px solid #E5E5E5' : 'none',
      }}
    >
      <nav className="max-w-5xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="text-lg font-bold tracking-tight hover:opacity-80 transition-opacity duration-200"
            style={{ color: '#0A0A0A' }}
          >
            {SITE_CONFIG.name}
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {NAVIGATION_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden hover:opacity-60 transition-opacity duration-200"
            style={{ color: '#0A0A0A' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="square"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-6 pt-6"
              style={{ borderTop: '1px solid #E5E5E5' }}
            >
              <div className="space-y-4">
                {NAVIGATION_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block nav-link py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
