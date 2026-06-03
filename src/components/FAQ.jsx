import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ChevronDown, Mail } from 'lucide-react'

const faqs = [
  {
    question: "Apa itu LearnWithAI?",
    answer: "LearnWithAI adalah platform pembelajaran yang membantu pengguna mempelajari dan memanfaatkan berbagai tools AI melalui tutorial, modul belajar, dan panduan praktis."
  },
  {
    question: "Apakah LearnWithAI gratis?",
    answer: "Ya, seluruh materi dan tutorial dapat diakses secara gratis kecuali terdapat informasi khusus pada modul tertentu."
  },
  {
    question: "Siapa yang cocok menggunakan LearnWithAI?",
    answer: "Mahasiswa, pelajar, dosen, guru, content creator, freelancer, dan siapa saja yang ingin meningkatkan produktivitas menggunakan AI."
  },
  {
    question: "Bagaimana cara memulai belajar?",
    answer: "Pilih menu Tutorial, kemudian pilih modul yang ingin dipelajari sesuai kebutuhan Anda."
  },
  {
    question: "Apakah saya harus mengikuti modul secara berurutan?",
    answer: "Tidak. Anda dapat mempelajari modul sesuai kebutuhan dan minat Anda."
  },
  {
    question: "Apakah saya perlu akun ChatGPT atau Gemini?",
    answer: "Beberapa tutorial memerlukan akun pada platform AI tertentu seperti ChatGPT, Gemini, Claude, atau NotebookLM."
  },
  {
    question: "Apakah tool AI yang digunakan berbayar?",
    answer: "Tidak semuanya. Banyak tutorial menggunakan versi gratis dari tool AI yang tersedia."
  },
  {
    question: "Apakah saya harus memiliki kemampuan coding?",
    answer: "Tidak. Sebagian besar tutorial dirancang untuk pemula tanpa latar belakang pemrograman."
  },
  {
    question: "Bagaimana jika saya mengalami kendala saat mengikuti tutorial?",
    answer: "Anda dapat menghubungi tim melalui halaman kontak atau media sosial yang tersedia."
  }
]

export default function FAQ({ darkMode }) {
  const [openIndex, setOpenIndex] = useState(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-28 bg-grid">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className={`inline-block px-4 py-1.5 rounded-full border-3 font-heading font-bold text-sm mb-4 ${
            darkMode
              ? 'bg-yellow-brand/20 border-white/20 text-yellow-brand'
              : 'bg-yellow-brand/20 border-black shadow-[3px_3px_0px_0px_#000]'
          }`}>
            FAQ
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Frequently Asked <span className="text-blue-brand">Questions</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Temukan jawaban untuk pertanyaan yang paling sering ditanyakan mengenai LearnWithAI.
          </p>
        </motion.div>

        {/* Accordion list */}
        <div className="space-y-4 max-w-[900px] mx-auto">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className={`neo-card rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? (darkMode ? 'border-white/50' : 'border-black') : ''
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className={`w-full text-left px-6 py-5 flex items-center justify-between gap-4 transition-colors focus:outline-none ${
                    darkMode ? 'hover:bg-white/5' : 'hover:bg-yellow-light/50'
                  }`}
                  aria-expanded={isOpen}
                >
                  <span className="font-heading font-bold text-lg pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border-2 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : 'rotate-0'
                    } ${
                      darkMode ? 'border-white/30 text-white' : 'border-black text-black bg-white'
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className={`px-6 pb-6 pt-2 text-base leading-relaxed ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className={`mt-16 max-w-[900px] mx-auto text-center p-8 md:p-10 rounded-2xl neo-card ${
            darkMode ? 'bg-dark-card' : 'bg-yellow-light'
          }`}
        >
          <h3 className="text-2xl md:text-3xl font-heading font-bold mb-3">
            Masih punya pertanyaan?
          </h3>
          <p className={`mb-8 text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Hubungi kami dan kami akan membantu Anda.
          </p>
          <a
            href="https://www.instagram.com/learnwithai.adzkar/"
            className={`neo-btn px-8 py-3.5 text-lg justify-center transition-colors duration-300 ${
              darkMode
                ? 'bg-white text-black border-white/30 hover:bg-gray-200'
                : 'bg-white text-black hover:bg-blue-brand hover:text-white'
            }`}
          >
            <Mail size={20} />
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  )
}
