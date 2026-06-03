import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Sparkles, Star, Zap, GraduationCap, Heart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

/**
 * Hero - Full screen hero section with floating shapes
 * Features animated title, CTA buttons, and decorative elements
 */

const FreeCircleIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <text x="12" y="14" textAnchor="middle" fontSize="5" fontWeight="bold" stroke="none" fill="currentColor" style={{ fontFamily: 'sans-serif', letterSpacing: '0.5px' }}>FREE</text>
  </svg>
)

// Floating decorative shapes
const FloatingShape = ({ className, delay = 0, children }) => (
  <motion.div
    animate={{
      y: [0, -15, 0],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
      delay,
    }}
    className={className}
  >
    {children}
  </motion.div>
)

export default function Hero({ darkMode }) {
  const navigate = useNavigate()
  
  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid">
      {/* Background gradient */}
      <div className={`absolute inset-0 ${
        darkMode 
          ? 'bg-gradient-to-br from-dark via-dark-surface/30 to-dark' 
          : 'bg-gradient-to-br from-yellow-brand/20 via-white to-blue-brand/10'
      }`} />

      {/* Floating decorative shapes */}
      <FloatingShape
        className={`absolute top-20 left-[10%] w-16 h-16 md:w-20 md:h-20 rounded-xl border-3 rotate-12 flex items-center justify-center ${
          darkMode ? 'bg-yellow-brand/80 border-white/30' : 'bg-yellow-brand border-black shadow-[4px_4px_0px_0px_#000]'
        }`}
        delay={0}
      >
        <Star size={28} className="text-black" />
      </FloatingShape>

      <FloatingShape
        className={`absolute top-32 right-[15%] w-14 h-14 md:w-16 md:h-16 rounded-full border-3 flex items-center justify-center ${
          darkMode ? 'bg-blue-brand/80 border-white/30' : 'bg-blue-brand border-black shadow-[4px_4px_0px_0px_#000]'
        }`}
        delay={0.5}
      >
        <Zap size={24} className="text-white" />
      </FloatingShape>

      <FloatingShape
        className={`absolute bottom-32 left-[8%] w-12 h-12 md:w-14 md:h-14 rounded-lg border-3 -rotate-12 flex items-center justify-center ${
          darkMode ? 'bg-pink-brand/80 border-white/30' : 'bg-pink-brand border-black shadow-[4px_4px_0px_0px_#000]'
        }`}
        delay={1}
      >
        <Heart size={20} className="text-white" />
      </FloatingShape>

      <FloatingShape
        className={`absolute bottom-40 right-[10%] w-14 h-14 md:w-18 md:h-18 rounded-xl border-3 rotate-6 flex items-center justify-center ${
          darkMode ? 'bg-green-brand/80 border-white/30' : 'bg-green-brand border-black shadow-[4px_4px_0px_0px_#000]'
        }`}
        delay={1.5}
      >
        <BookOpen size={24} className="text-white" />
      </FloatingShape>

      {/* Additional floating dots */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
        className={`absolute top-[60%] left-[20%] w-6 h-6 rounded-full ${darkMode ? 'bg-yellow-brand/40' : 'bg-yellow-brand/50'}`}
      />
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        className={`absolute top-[30%] right-[25%] w-4 h-4 rounded-full ${darkMode ? 'bg-blue-brand/40' : 'bg-blue-brand/50'}`}
      />
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
        className={`absolute bottom-[25%] right-[35%] w-5 h-5 rounded-full ${darkMode ? 'bg-pink-brand/30' : 'bg-pink-brand/40'}`}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center py-24">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border-3 font-heading font-bold text-sm ${
            darkMode
              ? 'bg-yellow-brand/20 border-white/20 text-yellow-brand'
              : 'bg-yellow-brand border-black shadow-[3px_3px_0px_0px_#000]'
          }`}>
            <Sparkles size={16} /> Belajar Lebih Pintar
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-6"
        >
          Ubah Cara Belajarmu Jadi Lebih{' '}
          <span className={`relative inline-block ${
            darkMode ? 'text-yellow-brand' : ''
          }`}>
            Pintar
            <motion.span
              className={`absolute -bottom-2 left-0 w-full h-3 rounded-full -z-10 ${
                darkMode ? 'bg-yellow-brand/30' : 'bg-yellow-brand'
              }`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            />
          </span>{' '}
          Bersama{' '}
          <span className={`relative inline-block ${
            darkMode ? 'text-blue-brand' : ''
          }`}>
            AI
            <motion.span
              className={`absolute -bottom-2 left-0 w-full h-3 rounded-full -z-10 ${
                darkMode ? 'bg-blue-brand/30' : 'bg-blue-brand/40'
              }`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            />
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className={`text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          Kumpulan panduan interaktif untuk anak sekolah dasar hingga menengah. 
          Temukan cara-cara seru menyulap buku catatanmu jadi bahan belajar yang lebih cerdas dan praktis menggunakan teknologi AI!
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollTo('#tutorials')}
            className={`neo-btn px-8 py-4 text-lg ${
              darkMode
                ? 'bg-yellow-brand text-black border-white/30'
                : 'bg-yellow-brand text-black'
            }`}
          >
            Mulai Belajar <ArrowRight size={20} />
          </button>
          <button
            onClick={() => navigate('/prompt-lab')}
            className={`neo-btn relative overflow-hidden group px-8 py-4 text-lg ${
              darkMode
                ? 'bg-blue-brand text-white border-white/30'
                : 'bg-blue-brand text-white'
            }`}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">Coba Prompt Labs 🧪</span>
            <motion.div
              animate={{ left: ['-100%', '200%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
              className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            />
          </button>
        </motion.div>

        {/* Benefit Badges */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="grid grid-cols-3 items-stretch justify-center gap-2 md:gap-8 mt-10 md:mt-14 max-w-3xl mx-auto w-full px-2 md:px-0"
        >
          {[
            { icon: Zap, label: 'Sangat Interaktif' },
            { icon: GraduationCap, label: 'Bahasa Mudah Dipahami' },
            { icon: FreeCircleIcon, label: '100% Gratis' },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className={`px-1 py-3 md:px-4 md:py-4 rounded-xl md:rounded-2xl border-2 flex flex-col items-center text-center gap-1 md:gap-2 transition-transform hover:-translate-y-1 ${
                darkMode
                  ? 'border-white/10 bg-white/5'
                  : 'border-gray-200 bg-white'
              }`}>
                <div className="mb-0 md:mb-1">
                  <Icon className="w-6 h-6 md:w-8 md:h-8 text-blue-brand" />
                </div>
                <div className={`text-[10px] md:text-sm font-medium leading-tight ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {stat.label}
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
