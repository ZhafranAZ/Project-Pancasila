import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import confetti from 'canvas-confetti'
import { ArrowLeft, Copy, ExternalLink, RefreshCw, CheckCircle2, Loader2, Sparkles, Zap, Heart } from 'lucide-react'

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

const topics = [
  { id: 'Sains & Alam Semesta', label: 'Sains & Alam Semesta', icon: '🔭' },
  { id: 'Teknologi & Masa Depan', label: 'Teknologi & Masa Depan', icon: '💻' },
  { id: 'Sejarah & Peradaban', label: 'Sejarah & Peradaban', icon: '🏛️' },
  { id: 'Logika & Matematika', label: 'Logika & Matematika', icon: '🧮' },
  { id: 'Geografi & Lingkungan', label: 'Geografi & Lingkungan', icon: '🌍' },
]

const outputs = [
  { id: 'Pembahasan Rinci & Lengkap', label: 'Pembahasan Rinci & Lengkap', icon: '📝' },
  { id: 'Rangkuman Poin Penting', label: 'Rangkuman Poin Penting', icon: '⚡' },
  { id: 'Latihan Soal & Kunci Jawaban', label: 'Latihan Soal & Kunci Jawaban', icon: '🎯' },
  { id: 'Tabel Perbandingan', label: 'Tabel Perbandingan', icon: '📊' },
  { id: 'Panduan Langkah demi Langkah', label: 'Panduan Langkah demi Langkah', icon: '🪜' },
]

const styles = [
  { id: 'Gaya YouTuber Edukasi', label: 'Gaya YouTuber Edukasi', icon: '🎧' },
  { id: 'Analogi Kehidupan Sehari-hari', label: 'Analogi Kehidupan Sehari-hari', icon: '🧩' },
  { id: 'Gaya Bahasa Gaul & Santai', label: 'Gaya Bahasa Gaul & Santai', icon: '😎' },
  { id: 'Gaya Detektif / Investigasi', label: 'Gaya Detektif / Investigasi', icon: '🕵️' },
  { id: 'Sudut Pandang Debat/Kritis', label: 'Sudut Pandang Debat/Kritis', icon: '⚖️' },
  { id: 'Bahasa Formal Akademis', label: 'Bahasa Formal Akademis', icon: '🎓' },
]

const levels = [
  { id: 'Siswa SD', label: 'Siswa SD (Dasar)', icon: '🎒' },
  { id: 'Siswa SMP', label: 'Siswa SMP (Menengah)', icon: '🏫' },
  { id: 'Pelajar SMA', label: 'Pelajar SMA (Lanjutan)', icon: '🎓' },
  { id: 'Mahasiswa / Umum', label: 'Mahasiswa / Umum', icon: '🚀' },
]

const lengths = [
  { id: 'Sangat Singkat (maksimal 2-3 paragraf, padat dan to the point)', label: 'Sangat Singkat (2-3 Paragraf)', icon: '⚡' },
  { id: 'Sedang (sekitar 500 kata atau setara 1 halaman bacaan)', label: 'Sedang (1 Halaman)', icon: '📄' },
  { id: 'Sangat Panjang & Detail (penjelasan komprehensif, kupas tuntas minimal 1000 kata)', label: 'Sangat Panjang & Detail', icon: '📚' },
]

const templateStrings = [
  "Halo AI! Tolong bantu aku memahami materi tentang [T]. Audiens sasaran penjelasan ini adalah [K], jadi tolong sesuaikan gaya bahasamu. Aku butuh hasilnya dalam bentuk [O] dengan panjang tulisan [P]. Oh ya, tolong jelaskan menggunakan [S] supaya aku gampang paham ya!",
  "Bertindaklah sebagai ahli untuk [K]. Topik yang ingin aku pelajari sekarang adalah [T]. Buatkan aku [O] tentang topik ini dengan panjang jawaban [P]. Tolong sampaikan dengan [S] agar tidak membosankan.",
  "Hai! Aku sedang belajar [T] nih. Bisakah kamu membuatkan [O] yang ditujukan untuk [K]? Pastikan panjangnya [P]. Jangan lupa gunakan [S] supaya penjelasannya lebih seru!",
  "Tolong buatkan [O] yang membahas secara mendalam mengenai [T]. Gunakan kosa kata yang cocok untuk [K]. Tolong adopsi [S] dalam setiap kalimatmu dan buat ukurannya [P] agar aku lebih mudah mengingatnya.",
  "AI, aku butuh bantuanmu tentang [T]. Tolong sajikan materinya berupa [O] yang [P]. Karena materi ini untuk [K], pastikan kamu menggunakan [S] layaknya mentor terbaik.",
  "Aku butuh informasi tentang [T] yang khusus disesuaikan untuk [K]. Tolong ubah menjadi [O] yang [P] dan menarik. Jangan kaku, gunakan [S] agar aku bisa belajar dengan asyik!",
  "Mari kita bahas [T]. Tolong buatkan [O] mengenai topik tersebut dengan durasi baca [P]. Supaya gampang dimengerti oleh [K], tolong gunakan [S].",
  "Hai AI, bisakah kamu membuatkan [O] tentang [T]? Pastikan bahasa yang dipakai sesuai untuk [K] dan buat teksnya [P]. Kalau bisa, tolong aplikasikan [S] di penjelasannya ya!",
  "Aku sedang mencari referensi tentang [T] untuk kebutuhan [K]. Bantu aku dengan membuatkan [O] yang berukuran [P]. Untuk gaya bahasanya, tolong pakai [S].",
  "Tolong bantu aku belajar [T] dengan membuatkan [O] yang [P]. Sesuaikan kerumitan materinya dengan standar [K], dan jelaskan semuanya menggunakan [S] agar aku bisa cepat paham.",
  "Halo AI, tolong bertindak sebagai pengajar ahli. Aku butuh [O] mengenai materi [T]. Buat materinya cocok untuk dipahami oleh [K], dengan ukuran [P]. Jangan lupa sampaikan menggunakan [S] agar aku tidak cepat bosan membacanya.",
  "Aku punya tugas untuk mempelajari [T]. Bisakah kamu menyusun [O] yang [P] khusus untuk tingkat [K]? Tolong tulis semuanya dengan [S], ya!",
  "Jelaskan kepadaku tentang [T]! Format jawabannya tolong dibuat berupa [O] yang ukurannya [P]. Karena aku adalah [K], pastikan kamu menjelaskannya menggunakan [S].",
  "Bantu aku memahami inti dari [T]. Tolong berikan penjelasan dalam wujud [O]. Jaga agar panjangnya [P] dan sesuaikan tingkat kesulitannya untuk [K]. Oh ya, gunakan [S] untuk gaya bahasanya.",
  "AI, bisakah kamu menjabarkan materi [T]? Aku sangat membutuhkan [O] yang didesain spesifik untuk [K]. Tolong pastikan teksnya [P] dan menggunakan [S] agar informasinya gampang nempel di otakku.",
  "Tolong buatkan [O] yang membahas tentang [T]. Pastikan kontennya ramah untuk [K]. Gunakan [S] dan atur panjangnya menjadi [P].",
  "Aku butuh materi belajar yang asyik tentang [T]. Tolong susun menjadi [O] yang ditujukan untuk [K]. Untuk ukurannya, tolong buat [P] dan pastikan gaya penulisannya memakai [S].",
  "Halo! Tolong rangkumkan informasi mengenai [T] menjadi sebuah [O]. Tulis secara khusus untuk audiens [K], dengan ukuran teks [P], dan menggunakan [S].",
  "Sebagai asisten belajarku, tolong siapkan [O] mengenai [T]. Gunakan diksi yang sesuai untuk [K]. Tulis menggunakan [S] dengan panjang keseluruhan sekitar [P].",
  "Tolong ceritakan kepadaku tentang [T] dengan membuatkan [O]. Pastikan bahasa dan kedalaman materinya disesuaikan untuk [K]. Aku ingin teks ini [P] dan ditulis murni dengan [S].",
  "Bisakah kamu membuat [O] tentang [T]? Sesuaikan tingkat pemahamannya agar mudah dimengerti oleh [K]. Tolong buat [P] dan gunakan [S] di seluruh teksnya ya.",
  "Aku sedang kesulitan memahami [T]. Tolong bantu aku dengan memberikan [O] yang [P]. Karena aku di level [K], tolong gunakan [S] sebagai gaya bahasamu.",
  "Halo! Tolong berikan edukasi tentang [T] melalui sebuah [O]. Audiensnya adalah [K], jadi mohon gunakan [S]. Untuk durasi bacanya, buat [P] saja.",
  "Tolong ajari aku materi [T]. Format penjelasannya tolong buat dalam bentuk [O] yang [P]. Agar lebih interaktif untuk [K], pastikan kamu konsisten menggunakan [S].",
  "Aku butuh pencerahan tentang [T]. Bisakah kamu menyajikan [O] yang dirancang untuk [K]? Tolong kemas informasinya menggunakan [S] dan buat ukurannya [P]."
]

export default function PromptLab({ darkMode }) {
  const navigate = useNavigate()
  const resultRef = useRef(null)
  
  const [selectedTopic, setSelectedTopic] = useState('Sains & Alam Semesta')
  const [customTopic, setCustomTopic] = useState('')
  const [isCustomTopic, setIsCustomTopic] = useState(false)
  
  const [selectedOutput, setSelectedOutput] = useState('Rangkuman Poin Penting')
  const [customOutput, setCustomOutput] = useState('')
  const [isCustomOutput, setIsCustomOutput] = useState(false)
  
  const [selectedStyle, setSelectedStyle] = useState('Gaya YouTuber Edukasi')
  const [selectedLevel, setSelectedLevel] = useState('Pelajar SMA')
  const [selectedLength, setSelectedLength] = useState('Sedang (sekitar 500 kata atau setara 1 halaman bacaan)')
  
  const [templateIndex, setTemplateIndex] = useState(0)
  const [isCopied, setIsCopied] = useState(false)
  
  const [isLoading, setIsLoading] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)

  // Auto-reset generated state when any option changes
  useEffect(() => {
    setIsGenerated(false)
  }, [selectedTopic, customTopic, isCustomTopic, selectedOutput, customOutput, isCustomOutput, selectedStyle, selectedLevel, selectedLength])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const currentTopic = isCustomTopic ? (customTopic || '[Topik Kosong]') : selectedTopic
  const currentOutput = isCustomOutput ? (customOutput || '[Format Kosong]') : selectedOutput

  const handleGenerate = () => {
    setIsLoading(true)
    setIsGenerated(false)
    // Randomize template index
    setTemplateIndex(Math.floor(Math.random() * templateStrings.length))
    
    // Simulate API processing delay
    setTimeout(() => {
      setIsLoading(false)
      setIsGenerated(true)
      
      // Auto-scroll on mobile to the result view
      setTimeout(() => {
        if (resultRef.current) {
          resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
    }, 1500)
  }

  const handleShuffle = () => {
    if (isShuffling) return; // Prevent multiple clicks
    setIsShuffling(true)
    // Guarantee a different template by moving to the next one
    setTemplateIndex((prev) => (prev + 1) % templateStrings.length)
    
    // Simulate API processing delay for shuffle
    setTimeout(() => {
      setIsShuffling(false)
    }, 1500)
  }

  const getPlainText = () => {
    let text = templateStrings[templateIndex]
    let baseText = text
      .replace('[T]', currentTopic)
      .replace('[O]', currentOutput)
      .replace('[S]', selectedStyle)
      .replace('[K]', selectedLevel)
      .replace('[P]', selectedLength)
      
    return baseText + '\nNamun, sebelum kamu mulai menjawab, tolong evaluasi topiknya. Jika topik yang aku minta masih terlalu luas, bertanyalah dulu kepadaku bagian mana yang ingin difokuskan. Saat kamu memberikan jawaban akhir nanti, tolong gunakan pemformatan yang rapi (seperti poin-poin dan cetak tebal pada kata kunci), sertakan emoji secukupnya agar tidak membosankan, dan yang paling penting: pastikan semua informasi faktual yang kamu berikan akurat tanpa mengarang fakta (halusinasi).'
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(getPlainText())
    setIsCopied(true)
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD93D', '#4D96FF', '#6BCB77', '#FF78C4', '#FF5733']
    })
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handleCopyAndOpen = () => {
    handleCopy()
    setTimeout(() => {
      window.open('https://gemini.google.com', '_blank')
    }, 500)
  }

  const renderColoredText = () => {
    const text = templateStrings[templateIndex]
    const parts = text.split(/(\[T\]|\[O\]|\[S\]|\[K\]|\[P\])/)
    
    const renderedParts = parts.map((part, i) => {
      if (part === '[T]') {
        return <span key={i} className={`font-bold px-1.5 py-0.5 rounded ${darkMode ? 'bg-blue-brand/20 text-blue-300' : 'bg-blue-200 text-blue-800'}`}>{currentTopic}</span>
      } else if (part === '[O]') {
        return <span key={i} className={`font-bold px-1.5 py-0.5 rounded ${darkMode ? 'bg-pink-brand/20 text-pink-300' : 'bg-pink-200 text-pink-800'}`}>{currentOutput}</span>
      } else if (part === '[S]') {
        return <span key={i} className={`font-bold px-1.5 py-0.5 rounded ${darkMode ? 'bg-green-brand/20 text-green-300' : 'bg-green-200 text-green-800'}`}>{selectedStyle}</span>
      } else if (part === '[K]') {
        return <span key={i} className={`font-bold px-1.5 py-0.5 rounded ${darkMode ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-200 text-orange-800'}`}>{selectedLevel}</span>
      } else if (part === '[P]') {
        return <span key={i} className={`font-bold px-1.5 py-0.5 rounded ${darkMode ? 'bg-red-500/20 text-red-300' : 'bg-red-200 text-red-800'}`}>{selectedLength}</span>
      }
      return <span key={i}>{part}</span>
    })
    
    return (
      <>
        {renderedParts}
        <br />
        {'Namun, sebelum kamu mulai menjawab, tolong evaluasi topiknya. Jika topik yang aku minta masih terlalu luas, bertanyalah dulu kepadaku bagian mana yang ingin difokuskan. Saat kamu memberikan jawaban akhir nanti, tolong gunakan pemformatan yang rapi (seperti poin-poin dan cetak tebal pada kata kunci), sertakan emoji secukupnya agar tidak membosankan, dan yang paling penting: pastikan semua informasi faktual yang kamu berikan akurat tanpa mengarang fakta (halusinasi).'}
      </>
    )
  }

  return (
    <div className={`min-h-screen pt-20 md:pt-28 pb-12 md:pb-20 bg-grid relative ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      
      {/* Background gradient: Hijau ke Ungu */}
      <div className={`absolute inset-0 ${
        darkMode 
          ? 'bg-gradient-to-br from-dark via-dark-surface/50 to-dark' 
          : 'bg-gradient-to-br from-green-brand/20 via-white to-purple-brand/20'
      }`} />
      
      {/* Floating decorative shapes */}
      <FloatingShape
        className={`absolute top-32 left-[5%] w-12 h-12 md:w-16 md:h-16 rounded-xl border-3 rotate-12 flex items-center justify-center ${
          darkMode ? 'bg-green-brand/80 border-white/30' : 'bg-green-brand border-black shadow-[4px_4px_0px_0px_#000]'
        }`}
        delay={0}
      >
        <Sparkles size={24} className="text-black" />
      </FloatingShape>

      <FloatingShape
        className={`absolute bottom-40 right-[8%] w-14 h-14 md:w-16 md:h-16 rounded-full border-3 flex items-center justify-center ${
          darkMode ? 'bg-purple-brand/80 border-white/30' : 'bg-purple-brand text-white border-black shadow-[4px_4px_0px_0px_#000]'
        }`}
        delay={0.5}
      >
        <Zap size={24} className="text-white" />
      </FloatingShape>

      <FloatingShape
        className={`absolute top-[40%] right-[5%] w-10 h-10 md:w-12 md:h-12 rounded-lg border-3 -rotate-12 flex items-center justify-center ${
          darkMode ? 'bg-pink-brand/80 border-white/30' : 'bg-pink-brand border-black shadow-[4px_4px_0px_0px_#000]'
        }`}
        delay={1}
      >
        <Heart size={18} className="text-white" />
      </FloatingShape>

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className={`group flex items-center gap-2 mb-6 md:mb-8 px-4 py-2 rounded-xl font-bold transition-all w-max ${
            darkMode 
              ? 'hover:bg-white/10 text-gray-300 hover:text-white' 
              : 'hover:bg-gray-200 text-gray-600 hover:text-black'
          }`}
        >
          <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          Kembali
        </button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 md:mb-14"
        >
          <span className={`inline-block px-5 py-2 rounded-full border-3 font-heading font-bold text-sm mb-5 shadow-[3px_3px_0px_0px_#000] ${
            darkMode ? 'bg-purple-brand text-white border-black' : 'bg-purple-brand text-white border-black'
          }`}>
            Eksperimen AI 🧪
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight mb-5">
            Prompt <span className="text-purple-brand">Labs</span>
          </h1>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Buat instruksi AI (prompt) paling presisi untuk tugas sekolahmu hanya dengan 5 langkah mudah!
          </p>
        </motion.div>

        {/* 6:6 Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Opsi Pilihan (Kiri) - col-span-6 */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Step 1: Topik */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className={`neo-card p-6 md:p-8 relative ${darkMode ? 'bg-dark-card border-white/20' : 'bg-white'}`}
            >
              <div className={`absolute -top-5 -left-5 w-10 h-10 rounded-full border-3 flex items-center justify-center font-bold text-lg shadow-[3px_3px_0px_0px_#000] ${darkMode ? 'bg-blue-brand text-white border-black' : 'bg-blue-brand text-white border-black'}`}>
                1
              </div>
              <h2 className="text-xl md:text-2xl font-heading font-bold mb-4 ml-2">Pilih Topik Pelajaran</h2>
              
              <div className="flex flex-wrap gap-3">
                {topics.map(t => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setSelectedTopic(t.id)
                      setIsCustomTopic(false)
                    }}
                    className={`px-4 py-2 rounded-xl border-3 font-bold transition-all flex items-center gap-2 ${
                      !isCustomTopic && selectedTopic === t.id
                        ? `${darkMode ? 'bg-blue-brand text-white border-blue-400' : 'bg-blue-300 text-blue-900 border-black shadow-[4px_4px_0px_0px_#000]'} translate-y-[-2px]`
                        : `${darkMode ? 'bg-dark-surface text-gray-300 border-white/20 hover:border-white/40' : 'bg-gray-50 text-gray-700 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] hover:bg-gray-100 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]'}`
                    }`}
                  >
                    <span>{t.icon}</span>
                    <span className="text-sm md:text-base">{t.label}</span>
                  </button>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t-2 border-dashed border-gray-300">
                <label className="flex items-center gap-2 mb-2 font-bold cursor-pointer w-max">
                  <input 
                    type="radio" 
                    checked={isCustomTopic} 
                    onChange={() => setIsCustomTopic(true)} 
                    className="w-5 h-5 accent-blue-brand"
                  />
                  <span>Atau Ketik Topik Sendiri:</span>
                </label>
                <input
                  type="text"
                  placeholder="Misal: Perang Dunia 2, Fotosintesis, dll..."
                  value={customTopic}
                  onChange={(e) => {
                    setCustomTopic(e.target.value)
                    setIsCustomTopic(true)
                  }}
                  onFocus={() => setIsCustomTopic(true)}
                  className={`w-full px-4 py-3 rounded-xl border-3 transition-all outline-none font-medium ${
                    isCustomTopic 
                      ? `${darkMode ? 'border-blue-400 bg-blue-900/20' : 'border-blue-brand bg-blue-50 shadow-[4px_4px_0px_0px_#000]'}` 
                      : `${darkMode ? 'border-white/20 bg-dark-surface' : 'border-black bg-white shadow-[2px_2px_0px_0px_#000]'}`
                  }`}
                />
              </div>
            </motion.div>

            {/* Step 2: Output */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={`neo-card p-6 md:p-8 relative ${darkMode ? 'bg-dark-card border-white/20' : 'bg-white'}`}
            >
              <div className={`absolute -top-5 -left-5 w-10 h-10 rounded-full border-3 flex items-center justify-center font-bold text-lg shadow-[3px_3px_0px_0px_#000] ${darkMode ? 'bg-pink-brand text-white border-black' : 'bg-pink-brand text-white border-black'}`}>
                2
              </div>
              <h2 className="text-xl md:text-2xl font-heading font-bold mb-4 ml-2">Mau Dijawab Seperti Apa?</h2>
              
              <div className="flex flex-wrap gap-3">
                {outputs.map(o => (
                  <button
                    key={o.id}
                    onClick={() => {
                      setSelectedOutput(o.id)
                      setIsCustomOutput(false)
                    }}
                    className={`px-4 py-2 rounded-xl border-3 font-bold transition-all flex items-center gap-2 ${
                      !isCustomOutput && selectedOutput === o.id
                        ? `${darkMode ? 'bg-pink-brand text-white border-pink-400' : 'bg-pink-300 text-pink-900 border-black shadow-[4px_4px_0px_0px_#000]'} translate-y-[-2px]`
                        : `${darkMode ? 'bg-dark-surface text-gray-300 border-white/20 hover:border-white/40' : 'bg-gray-50 text-gray-700 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] hover:bg-gray-100 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]'}`
                    }`}
                  >
                    <span>{o.icon}</span>
                    <span className="text-sm md:text-base">{o.label}</span>
                  </button>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t-2 border-dashed border-gray-300">
                <label className="flex items-center gap-2 mb-2 font-bold cursor-pointer w-max">
                  <input 
                    type="radio" 
                    checked={isCustomOutput} 
                    onChange={() => setIsCustomOutput(true)} 
                    className="w-5 h-5 accent-pink-brand"
                  />
                  <span>Atau Ketik Format Sendiri:</span>
                </label>
                <input
                  type="text"
                  placeholder="Misal: Lirik Lagu, Kode Python, Puisi..."
                  value={customOutput}
                  onChange={(e) => {
                    setCustomOutput(e.target.value)
                    setIsCustomOutput(true)
                  }}
                  onFocus={() => setIsCustomOutput(true)}
                  className={`w-full px-4 py-3 rounded-xl border-3 transition-all outline-none font-medium ${
                    isCustomOutput 
                      ? `${darkMode ? 'border-pink-400 bg-pink-900/20' : 'border-pink-brand bg-pink-50 shadow-[4px_4px_0px_0px_#000]'}` 
                      : `${darkMode ? 'border-white/20 bg-dark-surface' : 'border-black bg-white shadow-[2px_2px_0px_0px_#000]'}`
                  }`}
                />
              </div>
            </motion.div>

            {/* Step 3: Style */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className={`neo-card p-6 md:p-8 relative ${darkMode ? 'bg-dark-card border-white/20' : 'bg-white'}`}
            >
              <div className={`absolute -top-5 -left-5 w-10 h-10 rounded-full border-3 flex items-center justify-center font-bold text-lg shadow-[3px_3px_0px_0px_#000] ${darkMode ? 'bg-green-brand text-black border-black' : 'bg-green-brand text-black border-black'}`}>
                3
              </div>
              <h2 className="text-xl md:text-2xl font-heading font-bold mb-4 ml-2">Gaya Penjelasan AI</h2>
              
              <div className="flex flex-wrap gap-3">
                {styles.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedStyle(s.id)}
                    className={`px-4 py-2 rounded-xl border-3 font-bold transition-all flex items-center gap-2 ${
                      selectedStyle === s.id
                        ? `${darkMode ? 'bg-green-brand text-black border-green-400' : 'bg-green-300 text-green-900 border-black shadow-[4px_4px_0px_0px_#000]'} translate-y-[-2px]`
                        : `${darkMode ? 'bg-dark-surface text-gray-300 border-white/20 hover:border-white/40' : 'bg-gray-50 text-gray-700 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] hover:bg-gray-100 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]'}`
                    }`}
                  >
                    <span>{s.icon}</span>
                    <span className="text-sm md:text-base">{s.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Step 4: Level */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className={`neo-card p-6 md:p-8 relative ${darkMode ? 'bg-dark-card border-white/20' : 'bg-white'}`}
            >
              <div className={`absolute -top-5 -left-5 w-10 h-10 rounded-full border-3 flex items-center justify-center font-bold text-lg shadow-[3px_3px_0px_0px_#000] ${darkMode ? 'bg-orange-400 text-black border-black' : 'bg-orange-400 text-black border-black'}`}>
                4
              </div>
              <h2 className="text-xl md:text-2xl font-heading font-bold mb-4 ml-2">Tingkat Pendidikan (Level)</h2>
              
              <div className="flex flex-wrap gap-3">
                {levels.map(l => (
                  <button
                    key={l.id}
                    onClick={() => setSelectedLevel(l.id)}
                    className={`px-4 py-2 rounded-xl border-3 font-bold transition-all flex items-center gap-2 ${
                      selectedLevel === l.id
                        ? `${darkMode ? 'bg-orange-500 text-white border-orange-400' : 'bg-orange-300 text-orange-900 border-black shadow-[4px_4px_0px_0px_#000]'} translate-y-[-2px]`
                        : `${darkMode ? 'bg-dark-surface text-gray-300 border-white/20 hover:border-white/40' : 'bg-gray-50 text-gray-700 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] hover:bg-gray-100 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]'}`
                    }`}
                  >
                    <span>{l.icon}</span>
                    <span className="text-sm md:text-base">{l.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Step 5: Length */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className={`neo-card p-6 md:p-8 relative ${darkMode ? 'bg-dark-card border-white/20' : 'bg-white'}`}
            >
              <div className={`absolute -top-5 -left-5 w-10 h-10 rounded-full border-3 flex items-center justify-center font-bold text-lg shadow-[3px_3px_0px_0px_#000] ${darkMode ? 'bg-red-400 text-white border-black' : 'bg-red-400 text-white border-black'}`}>
                5
              </div>
              <h2 className="text-xl md:text-2xl font-heading font-bold mb-4 ml-2">Panjang Jawaban</h2>
              
              <div className="flex flex-wrap gap-3">
                {lengths.map(l => (
                  <button
                    key={l.id}
                    onClick={() => setSelectedLength(l.id)}
                    className={`px-4 py-2 rounded-xl border-3 font-bold transition-all flex items-center gap-2 ${
                      selectedLength === l.id
                        ? `${darkMode ? 'bg-red-500 text-white border-red-400' : 'bg-red-300 text-red-900 border-black shadow-[4px_4px_0px_0px_#000]'} translate-y-[-2px]`
                        : `${darkMode ? 'bg-dark-surface text-gray-300 border-white/20 hover:border-white/40' : 'bg-gray-50 text-gray-700 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] hover:bg-gray-100 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]'}`
                    }`}
                  >
                    <span>{l.icon}</span>
                    <span className="text-sm md:text-base">{l.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Hasil Prompt (Kanan) - col-span-6 */}
          <div className="lg:col-span-6 sticky top-28" ref={resultRef}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`neo-card p-1 relative overflow-hidden ${darkMode ? 'bg-dark-card border-white/20' : 'bg-white border-black'}`}
            >
              {/* Conditional Rendering: Belum Generate vs Sudah Generate */}
              {!isGenerated ? (
                <div className="p-8 md:p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
                  {isLoading ? (
                    <div className="flex flex-col items-center gap-6">
                      <Loader2 size={64} className="animate-spin text-purple-brand" />
                      <p className={`font-bold text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Sedang Merangkai Kata...
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-6">
                      <div className={`w-24 h-24 rounded-full flex items-center justify-center text-5xl mb-2 border-4 ${darkMode ? 'bg-dark-surface border-white/20' : 'bg-yellow-brand/20 border-yellow-brand'}`}>
                        🪄
                      </div>
                      <div>
                        <h3 className="font-heading font-black text-2xl mb-2">Selesai Memilih 5 Langkah?</h3>
                        <p className={`text-lg max-w-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Tekan tombol di bawah untuk menyihir pilihanmu menjadi instruksi AI yang sangat akurat!
                        </p>
                      </div>
                      <button
                        onClick={handleGenerate}
                        className={`neo-btn mt-2 px-8 py-5 font-bold text-xl flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 ${
                          darkMode ? 'bg-purple-brand text-white border-black' : 'bg-purple-brand text-white border-black shadow-[4px_4px_0px_0px_#000]'
                        }`}
                      >
                        Hasilkan Prompt <Sparkles size={24} />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {/* Header Hasil */}
                  <div className={`p-4 md:p-6 border-b-3 flex justify-between items-center ${darkMode ? 'border-white/20 bg-dark-surface' : 'border-black bg-yellow-brand/20'}`}>
                    <h3 className="font-heading font-bold text-lg md:text-xl flex items-center gap-2">
                      <span className="text-2xl">✨</span> Hasil Prompt
                    </h3>
                    <button 
                      onClick={handleShuffle}
                      className={`p-2 rounded-full border-2 transition-all ${darkMode ? 'border-white/20 hover:bg-white/10' : 'border-black hover:bg-white hover:scale-110 active:scale-95 shadow-[2px_2px_0px_0px_#000]'}`}
                      title="Acak Kalimat"
                    >
                      <RefreshCw size={18} />
                    </button>
                  </div>

                  {/* Teks Hasil */}
                  <div className="p-6 md:p-10 min-h-[300px] flex items-center justify-center">
                    {isShuffling ? (
                      <div className="flex flex-col items-center gap-4 justify-center w-full">
                        <Loader2 size={48} className="animate-spin text-purple-brand" />
                        <p className={`font-bold text-lg animate-pulse ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Sedang Merangkai Kata...
                        </p>
                      </div>
                    ) : (
                      <p className={`text-base md:text-lg leading-relaxed font-medium w-full ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        {renderColoredText()}
                      </p>
                    )}
                  </div>

                  {/* Tombol Aksi */}
                  <div className={`p-4 md:p-6 border-t-3 flex flex-col sm:flex-row gap-4 ${darkMode ? 'border-white/20 bg-dark-surface' : 'border-black bg-gray-50'}`}>
                    <button
                      onClick={handleCopy}
                      disabled={isShuffling}
                      className={`neo-btn py-4 px-6 font-bold text-base md:text-lg flex-1 flex items-center justify-center gap-2 transition-colors ${
                        isShuffling ? 'opacity-50 cursor-not-allowed' : ''
                      } ${
                        isCopied 
                          ? 'bg-green-brand text-black' 
                          : darkMode ? 'bg-white text-black hover:bg-gray-200 border-black' : 'bg-white text-black hover:bg-gray-100 border-black'
                      }`}
                    >
                      {isCopied ? <CheckCircle2 size={24} /> : <Copy size={24} />}
                      {isCopied ? 'Berhasil Disalin!' : 'Salin Teks'}
                    </button>
                    
                    <button
                      onClick={handleCopyAndOpen}
                      disabled={isShuffling}
                      className={`neo-btn py-4 px-6 font-bold text-base md:text-lg flex-1 flex items-center justify-center gap-2 transition-colors ${
                        isShuffling ? 'opacity-50 cursor-not-allowed' : ''
                      } ${
                        darkMode ? 'bg-purple-brand text-white border-black' : 'bg-purple-brand text-white border-black'
                      }`}
                    >
                      Buka Gemini <ExternalLink size={24} />
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
          
        </div>

        {/* Tips Pro Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`mt-12 neo-card p-6 md:p-10 relative ${darkMode ? 'bg-dark-card border-white/20' : 'bg-blue-brand/10 border-black'}`}
        >
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="lg:w-1/2 space-y-4">
              <span className={`inline-block px-4 py-1.5 rounded-full border-2 font-bold text-sm shadow-[2px_2px_0px_0px_#000] ${darkMode ? 'bg-yellow-brand text-black border-black' : 'bg-yellow-brand text-black border-black'}`}>
                💡 Tips Pro Gemilang
              </span>
              <h2 className="text-2xl md:text-3xl font-heading font-black">
                Gunakan Fitur "Pembelajaran Terpandu"
              </h2>
              <p className={`text-base md:text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Tahukah kamu? Google Gemini punya fitur rahasia agar ia bertindak layaknya tutor atau guru les pribadimu, lho! 
                <br /><br />
                Caranya mudah: Di kotak obrolan Gemini, klik tanda <strong>(+)</strong> di sebelah kiri, pilih <strong>Alat lainnya</strong>, lalu aktifkan mode <strong>Pembelajaran terpandu</strong>. 
                <br /><br />
                Gabungkan mode ini dengan instruksi mutlak yang baru saja kamu buat di atas untuk mendapatkan pengalaman belajar AI yang interaktif, akurat, dan super seru!
              </p>
            </div>
            <div className="lg:w-1/2 w-full">
              <img 
                src="/image/PromptLabs.png" 
                alt="Cara Mengaktifkan Pembelajaran Terpandu di Gemini" 
                className={`w-full rounded-2xl border-4 shadow-[6px_6px_0px_0px_#000] object-cover ${darkMode ? 'border-white/20' : 'border-black'}`}
              />
            </div>
          </div>
        </motion.div>
        
      </div>
    </div>
  )
}
