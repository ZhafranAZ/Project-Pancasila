import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import confetti from 'canvas-confetti'
import { ArrowLeft, ExternalLink, FileText, Play, Sparkles, List as ListIcon, X as XIcon, Headphones, Download } from 'lucide-react'

export default function AudioNotebookLM({ darkMode }) {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('upload')
  const [activeToc, setActiveToc] = useState('langkah-1')
  const [isTocOpen, setIsTocOpen] = useState(false)

  const endRef = useRef(null)
  const isEndInView = useInView(endRef, { once: true, margin: "0px 0px -20% 0px" })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (isEndInView) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FFD93D', '#4D96FF', '#6BCB77', '#FF78C4', '#A855F7']
      })
      localStorage.setItem('tutorial_audio_notebooklm_completed', 'true')
    }
  }, [isEndInView])

  // Scroll spy untuk Daftar Isi (TOC)
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['langkah-1', 'langkah-2', 'langkah-3', 'langkah-4', 'langkah-5']
      let current = sections[0]
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element && window.scrollY >= (element.offsetTop - 150)) {
          current = section
        }
      }
      setActiveToc(current)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`relative min-h-screen pt-20 md:pt-28 pb-12 md:pb-20 bg-grid ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      <div className={`absolute inset-0 ${
        darkMode 
          ? 'bg-gradient-to-br from-dark via-dark-surface/30 to-dark' 
          : 'bg-gradient-to-br from-blue-brand/20 via-white to-purple-brand/10'
      }`} />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Tombol Kembali */}
        <button
          onClick={() => navigate('/')}
          className={`group flex items-center gap-2 mb-6 md:mb-8 px-4 py-2 rounded-xl font-bold transition-all ${
            darkMode 
              ? 'hover:bg-white/10 text-gray-300 hover:text-white' 
              : 'hover:bg-gray-200 text-gray-600 hover:text-black'
          }`}
        >
          <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          Kembali
        </button>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`neo-card p-4 sm:p-6 md:p-10 mb-8 md:mb-12 ${
            darkMode ? 'bg-dark-card border-white/20' : 'bg-white'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
            <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl border-4 flex items-center justify-center shrink-0 bg-blue-brand text-black shadow-[4px_4px_0px_0px_#000] ${darkMode ? 'border-white/30' : 'border-black'}`}>
              <Headphones size={32} />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-heading font-black tracking-tight leading-tight">
              Mengubah Materi Pelajaran Menjadi Obrolan Audio Seru Menggunakan <span className="notebook-sparkle">NotebookLM</span>
            </h1>
          </div>
          <p className={`text-base sm:text-lg md:text-xl leading-relaxed mt-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Di sini kita akan belajar cara menggunakan robot pintar <span className="notebook-sparkle">Google NotebookLM</span> untuk mengubah teks pelajaran yang membosankan menjadi sebuah obrolan audio (podcast) dua orang yang seru banget buat didengar!
          </p>
        </motion.div>

        <div className="relative">
          
          {/* Side Daftar Isi (Desktop Only) */}
          <div className="hidden xl:block absolute top-0 bottom-0 -left-[280px] w-64">
            <div className={`sticky top-28 neo-card p-5 ${darkMode ? 'bg-dark-card border-white/20' : 'bg-white'}`}>
              <h3 className="font-heading font-bold text-base md:text-lg mb-4 flex items-center gap-2">
                <ListIcon size={18} /> Daftar Isi
              </h3>
              <ul className="space-y-3 font-medium text-sm">
                <li>
                  <a 
                    href="#langkah-1" 
                    className={`block transition-colors ${activeToc === 'langkah-1' ? 'text-blue-brand font-bold' : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black')}`}
                  >
                    1. Membuka Google NotebookLM
                  </a>
                </li>
                <li>
                  <a 
                    href="#langkah-2" 
                    className={`block transition-colors ${activeToc === 'langkah-2' ? 'text-pink-brand font-bold' : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black')}`}
                  >
                    2. Membuat "Buku Catatan" Baru
                  </a>
                </li>
                <li>
                  <a 
                    href="#langkah-3" 
                    className={`block transition-colors ${activeToc === 'langkah-3' ? 'text-green-brand font-bold' : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black')}`}
                  >
                    3. Memasukkan Sumber Pelajaran
                  </a>
                </li>
                <li>
                  <a 
                    href="#langkah-4" 
                    className={`block transition-colors ${activeToc === 'langkah-4' ? 'text-yellow-brand font-bold' : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black')}`}
                  >
                    4. Membuat Obrolan Audio
                  </a>
                </li>
                <li>
                  <a 
                    href="#langkah-5" 
                    className={`block transition-colors ${activeToc === 'langkah-5' ? 'text-purple-brand font-bold' : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black')}`}
                  >
                    5. Mendengarkan & Mengunduh
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-8 md:space-y-12 w-full">
            
            {/* Langkah 1 */}
            <motion.section 
              id="langkah-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`scroll-mt-28 neo-card p-4 sm:p-6 md:p-8 ${darkMode ? 'bg-dark-card border-white/20' : 'bg-white'}`}
            >
              <h2 className="text-xl md:text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <span className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-3 flex items-center justify-center shrink-0 ${darkMode ? 'bg-blue-brand text-black border-white/20' : 'bg-blue-brand text-black border-black shadow-[3px_3px_0px_0px_#000]'}`}>1</span>
                Membuka <span className="notebook-sparkle">Google NotebookLM</span>
              </h2>
              <div className="space-y-6 mt-6">
                <a 
                  href="https://notebooklm.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`neo-btn px-6 py-3 text-lg w-full sm:w-auto inline-flex items-center justify-center gap-2 ${darkMode ? 'bg-green-brand text-black border-white/20' : 'bg-green-brand text-black hover:bg-green-500'}`}
                >
                  Buka <span className="notebook-sparkle">Google NotebookLM</span> <ExternalLink size={20} />
                </a>
                <p className="font-bold text-base md:text-lg">Nantinya kamu akan berada di halaman Notebook LM Seperti ini:</p>
                <div className={`rounded-xl border-2 md:border-4 overflow-hidden ${darkMode ? 'border-white/20 bg-white/5' : 'border-black bg-gray-50'}`}>
                  <img src="/image/Modul_Audio/Gambar 1.png" alt="Halaman Awal NotebookLM" className="w-full h-auto object-contain" />
                </div>
              </div>
            </motion.section>

            {/* Langkah 2 */}
            <motion.section 
              id="langkah-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`scroll-mt-28 neo-card p-4 sm:p-6 md:p-8 ${darkMode ? 'bg-dark-card border-white/20' : 'bg-white'}`}
            >
              <h2 className="text-xl md:text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <span className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-3 flex items-center justify-center shrink-0 ${darkMode ? 'bg-pink-brand text-black border-white/20' : 'bg-pink-brand text-black border-black shadow-[3px_3px_0px_0px_#000]'}`}>2</span>
                Membuat "Buku Catatan" Baru
              </h2>
              <div className="space-y-6 mt-6">
                <p className="font-bold text-base md:text-lg">1. Klik tombol "Buat Baru" untuk memulai proyek belajar barumu.</p>
                <div className={`rounded-xl border-2 md:border-4 overflow-hidden ${darkMode ? 'border-white/20 bg-white/5' : 'border-black bg-gray-50'}`}>
                  <img src="/image/Modul_Audio/Gambar 2.png" alt="Buat Baru" className="w-full h-auto object-contain" />
                </div>
              </div>
            </motion.section>

            {/* Langkah 3 */}
            <motion.section 
              id="langkah-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="scroll-mt-28 mb-8 md:mb-12"
            >
              <div className={`neo-card p-4 sm:p-6 md:p-8 mb-8 ${darkMode ? 'bg-dark-card border-white/20' : 'bg-white'}`}>
                <h2 className="text-lg md:text-2xl font-heading font-bold flex items-center gap-3">
                  <span className={`w-7 h-7 md:w-8 md:h-8 rounded-full border-3 flex items-center justify-center shrink-0 font-bold ${darkMode ? 'bg-green-brand text-black border-white/20' : 'bg-green-brand text-black border-black shadow-[2px_2px_0px_0px_#000]'}`}>3</span>
                  Memasukkan Sumber Pelajaran ke Dalam Notebook
                </h2>
              </div>
              
              {/* Bookmark Navigator Tabs */}
              <div className="flex items-end pl-2 sm:pl-8 relative z-10 overflow-x-auto scrollbar-hide -mb-[3px]">
                <button 
                  onClick={() => setActiveTab('upload')}
                  className={`px-3 sm:px-6 py-2 sm:py-3 rounded-t-xl border-3 border-b-0 font-bold flex items-center gap-1.5 sm:gap-2 relative transition-all duration-200 ${
                    activeTab === 'upload' 
                      ? `pt-3 sm:pt-4 z-20 ${darkMode ? 'bg-gradient-to-b from-green-brand/40 to-dark-card text-white border-white/20' : 'bg-gradient-to-b from-green-300 to-white text-black border-black'}`
                      : `mb-[3px] z-0 ${darkMode ? 'bg-dark-surface text-gray-400 border-white/20 hover:bg-white/10' : 'bg-gray-200 text-gray-500 border-black hover:bg-gray-300 hover:text-black shadow-[inset_0_-4px_0_rgba(0,0,0,0.1)]'}`
                  }`}
                >
                  <FileText className="shrink-0 w-4 h-4 sm:w-[18px] sm:h-[18px]" /> <span className="text-xs sm:text-base">Upload File</span>
                </button>
                <button 
                  onClick={() => setActiveTab('youtube')}
                  className={`px-3 sm:px-6 py-2 sm:py-3 rounded-t-xl border-3 border-b-0 font-bold flex items-center gap-1.5 sm:gap-2 relative transition-all duration-200 ml-1 sm:ml-2 ${
                    activeTab === 'youtube' 
                      ? `pt-3 sm:pt-4 z-20 ${darkMode ? 'bg-gradient-to-b from-red-400/40 to-dark-card text-white border-white/20' : 'bg-gradient-to-b from-red-400 to-white text-black border-black'}`
                      : `mb-[3px] z-0 ${darkMode ? 'bg-dark-surface text-gray-400 border-white/20 hover:bg-white/10' : 'bg-gray-200 text-gray-500 border-black hover:bg-gray-300 hover:text-black shadow-[inset_0_-4px_0_rgba(0,0,0,0.1)]'}`
                  }`}
                >
                  <Play className="shrink-0 w-4 h-4 sm:w-[18px] sm:h-[18px]" /> <span className="text-xs sm:text-base">Link YouTube</span>
                </button>
              </div>

              {/* Content Card */}
              <div className={`relative border-3 rounded-2xl p-6 md:p-8 z-0 ${
                darkMode ? 'border-white/20 bg-dark-card shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]' : 'border-black bg-white shadow-[6px_6px_0px_0px_#000]'
              }`}>
                <div className="space-y-10">
                  {activeTab === 'upload' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                      <div className="space-y-3">
                        <p className="font-bold text-base md:text-lg">1. Klik tombol "Tambahkan Sumber"</p>
                        <div className={`rounded-xl border-2 md:border-4 overflow-hidden ${darkMode ? 'border-white/20 bg-white/5' : 'border-black bg-gray-50'}`}>
                          <img src="/image/Modul_Audio/Gambar 3.png" alt="Tambahkan Sumber" className="w-full h-auto object-contain" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <p className="font-bold text-base md:text-lg">2. Klik tombol "Upload File"</p>
                        <div className={`rounded-xl border-2 md:border-4 overflow-hidden ${darkMode ? 'border-white/20 bg-white/5' : 'border-black bg-gray-50'}`}>
                          <img src="/image/Modul_Audio/Gambar 4.png" alt="Upload File" className="w-full h-auto object-contain" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <p className="font-bold text-base md:text-lg">3. Pilih file dokumen pelajaran yang ingin kamu ubah jadi audio</p>
                        <div className={`rounded-xl border-2 md:border-4 overflow-hidden ${darkMode ? 'border-white/20 bg-white/5' : 'border-black bg-gray-50'}`}>
                          <img src="/image/Modul_Audio/Gambar 5.png" alt="Pilih File" className="w-full h-auto object-contain" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <p className="font-bold text-base md:text-lg">4. Tunggu sebentar sampai materi berhasil dibaca oleh sistem</p>
                        <div className={`rounded-xl border-2 md:border-4 overflow-hidden ${darkMode ? 'border-white/20 bg-white/5' : 'border-black bg-gray-50'}`}>
                          <img src="/image/Modul_Audio/Gambar 6.png" alt="Materi Dimasukkan" className="w-full h-auto object-contain" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'youtube' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                      <div className="space-y-3">
                        <p className="font-bold text-base md:text-lg">1. Klik tombol "Tambahkan Sumber"</p>
                        <div className={`rounded-xl border-2 md:border-4 overflow-hidden ${darkMode ? 'border-white/20 bg-white/5' : 'border-black bg-gray-50'}`}>
                          <img src="/image/Modul_Audio/Gambar 7.png" alt="Tambahkan Sumber" className="w-full h-auto object-contain" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <p className="font-bold text-base md:text-lg">2. Pilih opsi "Situs" atau ikon YouTube</p>
                        <div className={`rounded-xl border-2 md:border-4 overflow-hidden ${darkMode ? 'border-white/20 bg-white/5' : 'border-black bg-gray-50'}`}>
                          <img src="/image/Modul_Audio/Gambar 8.png" alt="Pilih Situs" className="w-full h-auto object-contain" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <p className="font-bold text-base md:text-lg">3. Masukkan link video YouTube pembelajaran pilihanmu</p>
                        <div className={`rounded-xl border-2 md:border-4 overflow-hidden ${darkMode ? 'border-white/20 bg-white/5' : 'border-black bg-gray-50'}`}>
                          <img src="/image/Modul_Audio/Gambar 9.png" alt="Masukkan Link" className="w-full h-auto object-contain" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <p className="font-bold text-base md:text-lg">4. Tunggu sampai robot pintar selesai memproses isi videonya!</p>
                        <div className={`rounded-xl border-2 md:border-4 overflow-hidden ${darkMode ? 'border-white/20 bg-white/5' : 'border-black bg-gray-50'}`}>
                          <img src="/image/Modul_Audio/Gambar 10.png" alt="Materi Dimasukkan" className="w-full h-auto object-contain" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.section>

            {/* Langkah 4 */}
            <motion.section 
              id="langkah-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`scroll-mt-28 neo-card p-4 sm:p-6 md:p-8 ${darkMode ? 'bg-dark-card border-white/20' : 'bg-white'}`}
            >
              <h2 className="text-xl md:text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <span className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-3 flex items-center justify-center shrink-0 ${darkMode ? 'bg-yellow-brand text-black border-white/20' : 'bg-yellow-brand text-black border-black shadow-[3px_3px_0px_0px_#000]'}`}>4</span>
                Membuat Obrolan Audio (Audio Overview)
              </h2>
              <div className="space-y-10 mt-6">
                <div className="space-y-3">
                  <p className="font-bold text-base md:text-lg">1. Lihat ke pojok kanan atas pada menu "Panduan Catatan" (Notebook Guide) atau klik bagian "Studio".</p>
                  <div className={`rounded-xl border-2 md:border-4 overflow-hidden ${darkMode ? 'border-white/20 bg-white/5' : 'border-black bg-gray-50'}`}>
                    <img src="/image/Modul_Audio/Gambar 11.png" alt="Buka Panduan Catatan" className="w-full h-auto object-contain" />
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="font-bold text-base md:text-lg">2. Cari menu "Ringkasan Audio" (Audio Overview), lalu sesuaikan untuk kebutuhan, contohnya 'Membuat ringkasan yang berfokus pada poin-poin utama' lalu tambahkan pada kolom Prompt. Lalu kili tombol "Buat" </p>
                  <div className={`rounded-xl border-2 md:border-4 overflow-hidden ${darkMode ? 'border-white/20 bg-white/5' : 'border-black bg-gray-50'}`}>
                    <img src="/image/Modul_Audio/Gambar 12.png" alt="Klik Generate Audio" className="w-full h-auto object-contain" />
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="font-bold text-base md:text-lg">3. Proses pembuatan audio akan dimulai. Robot pintar sedang berdiskusi membuat percakapan seru berdasarkan materi yang kamu berikan. Proses ini memakan waktu beberapa menit, jadi harap bersabar ya!</p>
                  <div className={`rounded-xl border-2 md:border-4 overflow-hidden ${darkMode ? 'border-white/20 bg-white/5' : 'border-black bg-gray-50'}`}>
                    <img src="/image/Modul_Audio/Gambar 13.png" alt="Proses Generate" className="w-full h-auto object-contain" />
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Langkah 5 */}
            <motion.section 
              id="langkah-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`scroll-mt-28 neo-card p-4 sm:p-6 md:p-8 ${darkMode ? 'bg-dark-card border-white/20' : 'bg-white'}`}
            >
              <h2 className="text-xl md:text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <span className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-3 flex items-center justify-center shrink-0 ${darkMode ? 'bg-purple-brand text-white border-white/20' : 'bg-purple-brand text-white border-black shadow-[3px_3px_0px_0px_#000]'}`}>5</span>
                Mendengarkan dan Mengunduh Audio Belajar
              </h2>
              <div className="space-y-10 mt-6">
                <div className="space-y-3">
                  <p className="font-bold text-base md:text-lg">1. Hore! Audio podcast belajarmu sudah jadi. Kamu bisa langsung klik tombol "Putar" (Play) untuk mendengarkan penjelasannya lewat suara yang jernih.</p>
                  <div className={`rounded-xl border-2 md:border-4 overflow-hidden ${darkMode ? 'border-white/20 bg-white/5' : 'border-black bg-gray-50'}`}>
                    <img src="/image/Modul_Audio/Gambar 14.png" alt="Putar Audio" className="w-full h-auto object-contain" />
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="font-bold text-base md:text-lg">2. Kamu juga bisa mengatur kecepatan suara atau klik tombol "Download" (Unduh) agar filenya tersimpan di HP/Laptop dan bisa didengarkan kapan saja tanpa kuota internet!</p>
                  <div className={`rounded-xl border-2 md:border-4 overflow-hidden ${darkMode ? 'border-white/20 bg-white/5' : 'border-black bg-gray-50'}`}>
                    <img src="/image/Modul_Audio/Gambar 15.png" alt="Unduh Audio" className="w-full h-auto object-contain" />
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Efek Confetti Selesai Belajar */}
            <div ref={endRef} className="h-4 w-full" />

          </div>
        </div>
      </div>

      {/* Daftar Isi Mobile (Floating Button) */}
      <button
        onClick={() => setIsTocOpen(true)}
        className={`fixed bottom-6 left-6 z-40 p-4 rounded-full border-4 shadow-[4px_4px_0px_0px_#000] flex items-center justify-center transition-transform hover:scale-105 active:scale-95 ${darkMode ? 'bg-pink-brand text-black border-white/20' : 'bg-pink-brand text-black border-black'} xl:hidden`}
      >
        <ListIcon size={24} />
      </button>

      {/* Drawer Daftar Isi Mobile */}
      <AnimatePresence>
        {isTocOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTocOpen(false)}
              className="fixed inset-0 bg-black/60 z-50 xl:hidden"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl border-t-4 border-l-4 border-r-4 p-6 shadow-[0px_-8px_0px_0px_rgba(0,0,0,1)] xl:hidden ${darkMode ? 'bg-dark-card border-white/20' : 'bg-white border-black'}`}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-heading font-bold text-xl flex items-center gap-2">
                  <ListIcon size={20} /> Daftar Isi
                </h3>
                <button onClick={() => setIsTocOpen(false)} className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-200'}`}>
                  <XIcon size={24} />
                </button>
              </div>
              <ul className="space-y-4 font-medium text-base">
                <li>
                  <a 
                    href="#langkah-1" 
                    onClick={() => setIsTocOpen(false)}
                    className={`block transition-colors ${activeToc === 'langkah-1' ? 'text-blue-brand font-bold' : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black')}`}
                  >
                    1. Membuka Google NotebookLM
                  </a>
                </li>
                <li>
                  <a 
                    href="#langkah-2" 
                    onClick={() => setIsTocOpen(false)}
                    className={`block transition-colors ${activeToc === 'langkah-2' ? 'text-pink-brand font-bold' : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black')}`}
                  >
                    2. Membuat "Buku Catatan" Baru
                  </a>
                </li>
                <li>
                  <a 
                    href="#langkah-3" 
                    onClick={() => setIsTocOpen(false)}
                    className={`block transition-colors ${activeToc === 'langkah-3' ? 'text-green-brand font-bold' : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black')}`}
                  >
                    3. Memasukkan Sumber Pelajaran
                  </a>
                </li>
                <li>
                  <a 
                    href="#langkah-4" 
                    onClick={() => setIsTocOpen(false)}
                    className={`block transition-colors ${activeToc === 'langkah-4' ? 'text-yellow-brand font-bold' : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black')}`}
                  >
                    4. Membuat Obrolan Audio
                  </a>
                </li>
                <li>
                  <a 
                    href="#langkah-5" 
                    onClick={() => setIsTocOpen(false)}
                    className={`block transition-colors ${activeToc === 'langkah-5' ? 'text-purple-brand font-bold' : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black')}`}
                  >
                    5. Mendengarkan & Mengunduh
                  </a>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}