import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import confetti from 'canvas-confetti'
import { ArrowLeft, ExternalLink, Video, List as ListIcon, X as XIcon } from 'lucide-react'

export default function VideoNotebookLM({ darkMode }) {
  const navigate = useNavigate()
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
      localStorage.setItem('tutorial_video-notebooklm_completed', 'true')
    }
  }, [isEndInView])

  // Scroll spy for TOC
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['langkah-1', 'langkah-2', 'langkah-3', 'langkah-4']
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

  const imgBase = '/image/Modul_Video_NotebookLM'

  // Reusable step image component
  const StepImage = ({ src, alt }) => (
    <div className={`rounded-xl border-2 md:border-4 overflow-hidden ${darkMode ? 'border-white/20 bg-white/5' : 'border-black bg-gray-50'}`}>
      <img src={src} alt={alt} className="w-full h-auto object-contain" />
    </div>
  )

  // Reusable step number badge (for section headers)
  const SectionBadge = ({ num, size = 'lg' }) => {
    const sizeClasses = size === 'lg' 
      ? 'w-8 h-8 md:w-10 md:h-10' 
      : 'w-7 h-7 md:w-8 md:h-8'
    return (
      <span className={`${sizeClasses} rounded-full border-3 flex items-center justify-center shrink-0 font-bold ${darkMode ? 'bg-orange-brand text-black border-white/20' : 'bg-orange-brand text-black border-black shadow-[3px_3px_0px_0px_#000]'}`}>{num}</span>
    )
  }

  const tocItems = [
    { id: 'langkah-1', label: '1. Membuka NotebookLM', color: 'text-orange-brand' },
    { id: 'langkah-2', label: '2. Membuat Notebook & Upload Materi', color: 'text-yellow-brand' },
    { id: 'langkah-3', label: '3. Membuat Video Overview', color: 'text-blue-brand' },
    { id: 'langkah-4', label: '4. Menonton & Menyimpan Video', color: 'text-green-brand' },
  ]

  return (
    <div className={`relative min-h-screen pt-20 md:pt-28 pb-12 md:pb-20 bg-grid ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      <div className={`absolute inset-0 ${
        darkMode 
          ? 'bg-gradient-to-br from-dark via-dark-surface/30 to-dark' 
          : 'bg-gradient-to-br from-orange-brand/15 via-white to-yellow-brand/10'
      }`} />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button
          onClick={() => navigate('/#tutorials')}
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
            <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl border-4 flex items-center justify-center shrink-0 bg-orange-brand text-black shadow-[4px_4px_0px_0px_#000] ${darkMode ? 'border-white/30' : 'border-black'}`}>
              <Video size={32} />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-heading font-black tracking-tight">
              Membuat Video Belajar Menggunakan <span className="notebook-sparkle">NotebookLM</span>
            </h1>
          </div>
          <p className={`text-base sm:text-lg md:text-xl leading-relaxed mt-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Halo teman-teman! Yuk, kita ubah materi pelajaran yang membosankan jadi <strong>video belajar yang keren</strong> pakai <span className="notebook-sparkle">Google NotebookLM</span>! Cukup upload dokumen, pilih gaya video, dan AI akan otomatis membuatkan video untukmu. Gampang banget, ikuti langkah-langkahnya ya!
          </p>
        </motion.div>

        <div className="relative">
          
          {/* Floating TOC (Desktop Only) */}
          <div className="hidden xl:block absolute top-0 bottom-0 -left-[280px] w-64">
            <div className={`sticky top-28 neo-card p-5 ${darkMode ? 'bg-dark-card border-white/20' : 'bg-white'}`}>
              <h3 className="font-heading font-bold text-base md:text-lg mb-4 flex items-center gap-2">
                <ListIcon size={18} /> Daftar Isi
              </h3>
              <ul className="space-y-3 font-medium text-sm">
                {tocItems.map(item => (
                  <li key={item.id}>
                    <a 
                      href={`#${item.id}`} 
                      className={`block transition-colors ${activeToc === item.id ? `${item.color} font-bold` : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black')}`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-8 md:space-y-12 w-full">
            
            {/* ========== Section 1: Membuka NotebookLM ========== */}
            <motion.section 
              id="langkah-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`scroll-mt-28 neo-card p-4 sm:p-6 md:p-8 ${darkMode ? 'bg-dark-card border-white/20' : 'bg-white'}`}
            >
              <h2 className="text-xl md:text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <SectionBadge num={1} />
                Membuka <span className="notebook-sparkle">NotebookLM</span>
              </h2>
              <p className={`mb-6 text-base md:text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Langkah pertama, kita harus masuk ke website <span className="notebook-sparkle">Google NotebookLM</span> dulu. Klik tombol oranye di bawah ini, nanti website-nya akan otomatis terbuka di tab baru. Lalu klik tombol <strong>"Try NotebookLM"</strong> dan pastikan kamu sudah login dengan akun Google!
              </p>
              <a 
                href="https://notebooklm.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`neo-btn px-6 py-3 text-lg w-full sm:w-auto justify-center mb-6 ${darkMode ? 'bg-orange-brand text-black border-white/20' : 'bg-orange-brand text-black hover:bg-yellow-brand'}`}
              >
                Buka <span className="notebook-sparkle">NotebookLM</span> <ExternalLink size={20} />
              </a>
              <StepImage src={`${imgBase}/Gambar 1.png`} alt="Halaman utama NotebookLM - Klik Try NotebookLM" />
            </motion.section>

            {/* ========== Section 2: Membuat Notebook & Upload Materi ========== */}
            <motion.section 
              id="langkah-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`scroll-mt-28 neo-card p-4 sm:p-6 md:p-8 ${darkMode ? 'bg-dark-card border-white/20' : 'bg-white'}`}
            >
              <h2 className="text-xl md:text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <SectionBadge num={2} />
                Membuat Notebook Baru & Upload Materi
              </h2>
              
              <div className="space-y-10">
                <div className="space-y-3">
                  <p className="font-bold text-base md:text-lg">1. Setelah masuk, klik tombol <strong>"+ Buat Baru"</strong> yang ada di pojok kanan atas untuk membuat notebook baru.</p>
                  <StepImage src={`${imgBase}/Gambar 2.png`} alt="Klik Create new" />
                </div>

                <div className="space-y-3">
                  <p className="font-bold text-base md:text-lg">2. Akan muncul halaman untuk memasukkan materi. Kamu bisa drag & drop file ke area tersebut, atau klik tombol <strong>"Upload files"</strong> untuk memilih file dari komputermu. Kamu juga bisa upload dari link Website, Google Drive, atau Copied text.</p>
                  <StepImage src={`${imgBase}/Gambar 3.png`} alt="Halaman upload - klik Upload files" />
                </div>

                <div className="space-y-3">
                  <p className="font-bold text-base md:text-lg">3. Cari dan pilih file materi pelajaranmu (contoh: file PDF), lalu klik <strong>"Open"</strong>.</p>
                  <StepImage src={`${imgBase}/Gambar 4.jpg`} alt="Pilih file PDF dari komputer" />
                </div>

                <div className="space-y-3">
                  <p className="font-bold text-base md:text-lg">4. Yeay! 🎉 Notebook kamu sudah jadi! Materi yang kamu upload sudah terbaca oleh <span className="notebook-sparkle">NotebookLM</span>. Perhatikan di sisi kanan layar ada panel <strong>"Studio"</strong> — di sinilah kita akan membuat video nanti.</p>
                  <StepImage src={`${imgBase}/Gambar 5.png`} alt="Notebook berhasil dibuat dengan panel Studio di kanan" />
                </div>
              </div>
            </motion.section>

            {/* ========== Section 3: Membuat Video Overview ========== */}
            <motion.section 
              id="langkah-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`scroll-mt-28 neo-card p-4 sm:p-6 md:p-8 ${darkMode ? 'bg-dark-card border-white/20' : 'bg-white'}`}
            >
              <h2 className="text-xl md:text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <SectionBadge num={3} />
                Membuat Video Overview
              </h2>
              
              <div className="space-y-10">
                <div className="space-y-3">
                  <p className="font-bold text-base md:text-lg">5. Di panel <strong>"Studio"</strong> yang ada di sisi kanan, cari dan klik opsi <strong>"Ringkasan..."</strong>.</p>
                  <StepImage src={`${imgBase}/Gambar 6.png`} alt="Klik Video Overview di panel Studio" />
                </div>

                <div className="space-y-3">
                  <p className="font-bold text-base md:text-lg">6. Akan muncul halaman pengaturan video. Di sini kamu bisa memilih:</p>
                  <ul className={`list-none space-y-2 ml-1 mb-3 text-base md:text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-orange-brand shrink-0">•</span>
                      <span><strong>Format:</strong> Pilih <em>"Explainer"</em> (penjelasan lengkap) atau <em>"Brief"</em> (ringkasan singkat)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-orange-brand shrink-0">•</span>
                      <span><strong>Bahasa:</strong> Pilih <em>"Indonesia"</em> supaya videonya berbahasa Indonesia</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-orange-brand shrink-0">•</span>
                      <span><strong>Visual Style:</strong> Pilih gaya visual yang kamu suka (Auto-select, Whiteboard, Kawaii, Anime, dll)</span>
                    </li>
                  </ul>
                  <p className={`text-base md:text-lg mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Setelah selesai memilih, klik tombol <strong>"Generate"</strong> berwarna biru di pojok kanan bawah.</p>
                  <StepImage src={`${imgBase}/Gambar 7.png`} alt="Customize Video Overview - pilih format, bahasa, visual style, lalu Generate" />
                </div>

                <div className="space-y-3">
                  <p className="font-bold text-base md:text-lg">7. Tunggu sebentar ya, AI sedang memproses materi dan membuatkan video spesial buatmu... ⏳ Kamu akan melihat tulisan <strong>"Membuat Ringkasan Video... Proses ini mungkin perlu waktu..."</strong>.</p>
                  <StepImage src={`${imgBase}/Gambar 8.png`} alt="Loading - Generating Video Overview" />
                </div>
              </div>
            </motion.section>

            {/* ========== Section 4: Menonton & Menyimpan Video ========== */}
            <motion.section 
              id="langkah-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`scroll-mt-28 neo-card p-4 sm:p-6 md:p-8 ${darkMode ? 'bg-dark-card border-white/20' : 'bg-white'}`}
            >
              <h2 className="text-xl md:text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <SectionBadge num={4} />
                Menonton & Menyimpan Hasil Video
              </h2>
              
              <div className="space-y-10">
                <div className="space-y-3">
                  <p className="font-bold text-base md:text-lg">8. Taraaa! 🎬 Video sudah selesai dibuat! Kamu bisa melihat hasilnya muncul di bagian bawah panel Studio. Klik video tersebut untuk membukanya.</p>
                  <StepImage src={`${imgBase}/Gambar 9.png`} alt="Video selesai dibuat - klik untuk membuka" />
                </div>

                <div className="space-y-3">
                  <p className="font-bold text-base md:text-lg">9. Sekarang kamu bisa menonton video belajar buatanmu! Klik tombol <strong>"Play video"</strong> untuk mulai memutar. Kamu juga bisa mengatur kecepatan, share, atau download video ini lewat ikon-ikon yang tersedia. 🎉</p>
                  <StepImage src={`${imgBase}/Gambar 10.png`} alt="Preview dan play video - Rahasia Tata Surya Kita" />
                </div>

                {/* Tips Box */}
                <div className={`p-5 sm:p-6 rounded-2xl border-4 ${
                  darkMode 
                    ? 'bg-yellow-brand/10 border-yellow-brand/30' 
                    : 'bg-yellow-brand/20 border-black shadow-[4px_4px_0px_0px_#000]'
                }`}>
                <h3 className="text-xl md:text-2xl font-heading font-bold mb-6 flex items-center gap-2">
                  💡 Tips Tambahan
                </h3>
                <ul className={`space-y-5 text-sm md:text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li className="flex items-start gap-3">
                    <span className="text-xl shrink-0 mt-0.5">📄</span>
                    <div className="flex-1">
                      <h4 className={`font-bold text-base md:text-lg ${darkMode ? 'text-white' : 'text-black'}`}>Dokumen Lengkap</h4>
                      <p className="mt-1">
                        Semakin lengkap dokumen materi yang kamu upload, semakin bagus dan akurat video yang dihasilkan!
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl shrink-0 mt-0.5">⚙️</span>
                    <div className="flex-1">
                      <h4 className={`font-bold text-base md:text-lg ${darkMode ? 'text-white' : 'text-black'}`}>Format Video</h4>
                      <p className="mt-1">
                        Pilih format <strong>"Explainer"</strong> untuk penjelasan yang detail, atau <strong>"Brief"</strong> kalau mau sekadar ringkasan singkat.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl shrink-0 mt-0.5">🇮🇩</span>
                    <div className="flex-1">
                      <h4 className={`font-bold text-base md:text-lg ${darkMode ? 'text-white' : 'text-black'}`}>Bahasa Narasi</h4>
                      <p className="mt-1">
                        Jangan lupa pilih bahasa <strong>Indonesia</strong> di pengaturan supaya narasi videonya berbahasa Indonesia.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl shrink-0 mt-0.5">🔄</span>
                    <div className="flex-1">
                      <h4 className={`font-bold text-base md:text-lg ${darkMode ? 'text-white' : 'text-black'}`}>Coba Ulang (Regenerate)</h4>
                      <p className="mt-1">
                        Kalau hasilnya kurang memuaskan, jangan ragu untuk mengganti gaya visual dan generate ulang.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl shrink-0 mt-0.5">📚</span>
                    <div className="flex-1">
                      <h4 className={`font-bold text-base md:text-lg ${darkMode ? 'text-white' : 'text-black'}`}>Multi Dokumen</h4>
                      <p className="mt-1">
                        Kamu bisa meng-upload lebih dari satu dokumen ke dalam satu notebook agar video yang dihasilkan jauh lebih komprehensif.
                      </p>
                    </div>
                  </li>
                </ul>
                </div>
              </div>
            </motion.section>

            {/* End Ref for Confetti Trigger */}
            <div ref={endRef} className="h-4 w-full" />

          </div>
        </div>
      </div>

      {/* Mobile Floating TOC Button */}
      <button
        onClick={() => setIsTocOpen(true)}
        className={`fixed bottom-6 left-6 z-40 p-4 rounded-full border-4 shadow-[4px_4px_0px_0px_#000] flex items-center justify-center transition-transform hover:scale-105 active:scale-95 ${darkMode ? 'bg-orange-brand text-black border-white/20' : 'bg-orange-brand text-black border-black'} xl:hidden`}
      >
        <ListIcon size={24} />
      </button>

      {/* Mobile TOC Drawer */}
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
                {tocItems.map(item => (
                  <li key={item.id}>
                    <a 
                      href={`#${item.id}`} 
                      onClick={() => setIsTocOpen(false)}
                      className={`block transition-colors ${activeToc === item.id ? `${item.color} font-bold` : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black')}`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
