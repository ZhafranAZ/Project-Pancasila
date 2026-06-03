import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: "Apa itu LearnWithAI?",
    answer: "LearnWithAI adalah platform pembelajaran yang membantu pelajar, mahasiswa, dan pengajar mengubah cara mereka belajar menjadi lebih interaktif. Kami mengajarkan cara menyulap AI (seperti Gemini & NotebookLM) menjadi asisten dan tutor belajar pribadi."
  },
  {
    question: "Apakah LearnWithAI gratis?",
    answer: "Ya, 100% gratis! Semua tutorial, video, dan fitur Prompt Labs dapat diakses tanpa biaya sepeser pun."
  },
  {
    question: "Siapa yang cocok menggunakan LearnWithAI?",
    answer: "Mahasiswa, pelajar, dosen, guru, dan siapa saja yang ingin menggunakan AI secara sehat dan produktif untuk meningkatkan kualitas belajar mengajar."
  },
  {
    question: "Bagaimana cara memulai belajar?",
    answer: "Sangat mudah! Kamu bisa langsung mencoba fitur 'Prompt Labs' untuk merasakan pengalaman dibimbing oleh AI, atau buka menu 'Tutorial' untuk menonton panduan langkah demi langkah penggunaan AI."
  },
  {
    question: "Apa bedanya menggunakan AI biasa dengan menggunakan fitur Prompt Labs di website ini?",
    answer: "Jika kamu sekadar menggunakan ChatGPT atau Gemini, mereka hanya bertindak sebagai mesin penjawab. Namun, dengan fitur Prompt Labs kami, instruksi (prompt) yang kamu kirimkan telah diracik secara otomatis di balik layar. Hasilnya? AI tidak akan memberikan jawaban instan, melainkan bertindak secara cerdas sebagai 'Tutor Pribadi' atau 'Pembuat Kuis' yang melatih cara berpikirmu!"
  },
  {
    question: "Apakah menggunakan AI akan membuat saya menjadi malas belajar?",
    answer: "Tidak, jika digunakan dengan benar! Fitur seperti Prompt Labs kami dirancang agar AI bertindak sebagai tutor pribadi (Socratic tutor) yang memancingmu berpikir kritis, bukan sekadar mesin penjawab soal instan. AI di sini adalah teman diskusi, bukan joki tugas."
  },
  {
    question: "Apakah jawaban dari AI selalu 100% benar?",
    answer: "Tidak. AI terkadang bisa 'berhalusinasi' atau mengarang fakta. Oleh karena itu, platform kami mengajarkan cara membuat instruksi (prompt) yang tepat agar AI menyertakan sumber kredibel. Tetap jadikan AI sebagai pemantik ide awal, dan selalu periksa ulang (cross-check) informasi penting ke buku referensimu!"
  },
  {
    question: "Apakah saya perlu meng-install aplikasi khusus?",
    answer: "Sama sekali tidak. LearnWithAI berbasis web sepenuhnya (Web-based). Selama kamu memiliki browser dan koneksi internet, kamu bisa langsung belajar tanpa membebani memori HP atau laptopmu."
  },
  {
    question: "Apakah platform ini bisa diakses lewat HP (smartphone)?",
    answer: "Tentu saja! Website dan fitur Prompt Labs kami dirancang responsif (mobile-friendly). Kamu bisa meracik prompt dan menonton tutorial dengan nyaman langsung dari genggaman tanganmu kapan saja."
  },
  {
    question: "Berapa lama waktu yang dibutuhkan untuk menyelesaikan satu tutorial?",
    answer: "Sebagian besar tutorial kami dirancang singkat dan padat (bite-sized), rata-rata hanya memakan waktu 5-10 menit untuk dipahami dan dipraktekkan, sehingga tidak akan menyita waktu belajar utamamu."
  },
  {
    question: "Apakah tool AI yang digunakan berbayar?",
    answer: "Semua materi yang kami ajarkan berfokus pada penggunaan tool AI versi gratis (seperti Google Gemini dan NotebookLM) sehingga ramah di kantong pelajar."
  },
  {
    question: "Apakah saya perlu membuat akun untuk menggunakan AI tersebut?",
    answer: "Ya. Beberapa tutorial dan fitur AI (seperti Google Gemini atau NotebookLM) mewajibkanmu masuk menggunakan akun Google (Gmail) yang sudah kamu miliki."
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
      </div>
    </section>
  )
}
