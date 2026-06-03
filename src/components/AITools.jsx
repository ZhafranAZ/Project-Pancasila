import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink } from 'lucide-react'

const GeminiLogo = ({ size, className }) => (
  <img 
    src="/image/Google_Gemini.png" 
    alt="Gemini Logo" 
    width={size} 
    height={size} 
    className={`object-contain ${className || ''}`}
    style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.15))' }}
  />
)

const NotebookLMLogo = ({ size, className }) => (
  <img 
    src="/image/notebooklm.webp" 
    alt="NotebookLM Logo" 
    width={size} 
    height={size} 
    className={`object-contain ${className || ''}`}
  />
)

/**
 * AITools - Section showcasing AI tools for learning content creation
 * Features Gemini, NotebookLM, Canva, and CapCut
 */

const tools = [
  {
    icon: GeminiLogo,
    name: <span className="gemini-sparkle">Gemini</span>,
    description: 'AI chatbot dari Google yang bisa menjawab pertanyaan, membuat ringkasan, menjelaskan konsep, dan membantu mengerjakan tugas.',
    category: 'Chatbot AI',
    color: 'bg-white', // Changed to white so original logo colors pop out
    hoverColor: 'hover:bg-purple-brand',
    iconColor: '', // No extra color needed for img
    link: 'https://gemini.google.com',
    features: ['Tanya Jawab', 'Ringkasan', 'Penjelasan Materi'],
  },
  {
    icon: NotebookLMLogo,
    name: <span className="notebook-sparkle">NotebookLM</span>,
    description: 'Tools dari Google untuk membuat catatan cerdas. Upload materi dan AI akan membantu merangkum dan membuat tanya jawab otomatis.',
    category: 'Catatan Cerdas',
    color: 'bg-white', // Changed to white so original logo colors pop out
    hoverColor: 'hover:bg-green-brand',
    iconColor: '', 
    link: 'https://notebooklm.google.com',
    features: ['Upload Dokumen', 'Rangkuman Otomatis', 'Podcast AI'],
  }
]

export default function AITools({ darkMode }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="tools" className={`py-20 md:py-28 bg-dots ${darkMode ? '' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className={`inline-block px-4 py-1.5 rounded-full border-3 font-heading font-bold text-sm mb-4 ${
            darkMode
              ? 'bg-purple-brand/20 border-white/20 text-purple-brand'
              : 'bg-purple-brand/10 border-black shadow-[3px_3px_0px_0px_#000]'
          }`}>
            AI Tools
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Tools{' '}
            <span className="text-purple-brand">AI</span>{' '}
            untuk Konten Belajar
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Gunakan tools berikut untuk membuat konten pembelajaran yang menarik dan efektif.
          </p>
        </motion.div>

        {/* Tools grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto gap-6 md:gap-8">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.12, duration: 0.5 }}
              className="neo-card p-6 flex flex-col group"
            >
              {/* Icon + Category */}
              <div className={`w-16 h-16 rounded-xl border-3 flex items-center justify-center mb-5 transition-all group-hover:rotate-6 group-hover:scale-110 ${
                tool.color
              } ${darkMode ? 'border-white/30' : 'border-black shadow-[3px_3px_0px_0px_#000]'}`}>
                <tool.icon size={32} className={tool.iconColor} />
              </div>

              <span className={`text-xs font-bold px-2 py-0.5 rounded-full mb-3 self-start ${
                darkMode ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-600'
              }`}>
                {tool.category}
              </span>

              <h3 className="text-xl font-heading font-bold mb-2">{tool.name}</h3>
              <p className={`text-sm leading-relaxed mb-4 flex-1 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {tool.description}
              </p>

              {/* Feature tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {tool.features.map((feature, i) => (
                  <span
                    key={i}
                    className={`text-xs px-2 py-1 rounded-lg border-2 font-medium ${
                      darkMode
                        ? 'border-white/15 text-gray-300'
                        : 'border-black/15 text-gray-700'
                    }`}
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <a
                href={tool.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`neo-btn px-4 py-2.5 text-sm justify-center transition-colors duration-300 ${
                  darkMode
                    ? `bg-white text-black border-white/30 ${tool.hoverColor}`
                    : `bg-white text-black ${tool.hoverColor}`
                }`}
              >
                Kunjungi <ExternalLink size={14} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
