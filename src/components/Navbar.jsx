import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

/**
 * Navbar - Responsive navigation with dark mode toggle
 * Transparent on top, solid on scroll. Includes hamburger menu for mobile.
 */

const navLinks = [
  { label: 'Beranda', href: '#hero' },
  { label: 'Kenapa AI?', href: '#why-ai' },
  { label: 'Tutorial', href: '#tutorials' },
  { label: 'Tools', href: '#tools' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar({ darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Menutup menu mobile ketika pindah halaman
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    
    const scrollToSection = () => {
      const el = document.querySelector(href)
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    }

    if (menuOpen) {
      setMenuOpen(false)
      // Jeda 300ms menunggu animasi menu mobile tertutup agar scroll tidak dibatalkan browser
      setTimeout(scrollToSection, 300)
    } else {
      scrollToSection()
    }
  }

  const handleLogoClick = (e) => {
    if (isHome) {
      e.preventDefault()
      setMenuOpen(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? darkMode
            ? 'bg-dark/95 backdrop-blur-md border-b border-white/10 shadow-lg'
            : 'bg-white/95 backdrop-blur-md border-b-3 border-black shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group" onClick={handleLogoClick}>
            <div className={`w-10 h-10 rounded-lg border-3 flex items-center justify-center transition-all group-hover:rotate-12 overflow-hidden ${
              darkMode 
                ? 'bg-yellow-brand border-white/30' 
                : 'bg-yellow-brand border-black shadow-[3px_3px_0px_0px_#000]'
            }`}>
              <img src="/image/lwa_logo.png" alt="Learn With AI Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-heading font-bold text-lg md:text-xl">
              Learn With AI
            </span>
          </a>

          {/* Desktop nav links - Hanya tampil di Beranda */}
          {isHome && (
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all hover:scale-105 ${
                    darkMode
                      ? 'hover:bg-white/10'
                      : 'hover:bg-yellow-brand/30'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}

          {/* Right side: Dark mode toggle + hamburger */}
          <div className="flex items-center gap-3">
            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg border-2 transition-all hover:scale-110 ${
                darkMode
                  ? 'border-white/30 bg-dark-card text-yellow-brand hover:bg-white/10'
                  : 'border-black bg-yellow-brand text-black shadow-[3px_3px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px]'
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Hamburger menu button - mobile only, hanya tampil di Beranda */}
            {isHome && (
              <button
                className="md:hidden flex flex-col gap-1.5 p-2"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? (
                  <X size={28} />
                ) : (
                  <>
                    <div className="hamburger-line" />
                    <div className="hamburger-line" />
                    <div className="hamburger-line" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu - Hanya render jika di Beranda */}
      <AnimatePresence>
        {isHome && menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden overflow-hidden border-t-3 ${
              darkMode ? 'bg-dark border-white/10' : 'bg-white border-black'
            }`}
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`px-4 py-3 rounded-xl font-medium text-lg transition-all ${
                    darkMode
                      ? 'hover:bg-white/10'
                      : 'hover:bg-yellow-brand/30 border-2 border-black/10'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
