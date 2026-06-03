import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import confetti from 'canvas-confetti'
import { ArrowLeft, ExternalLink, Copy, Check, FileText, Notebook as NotebookIcon, Sparkles, List as ListIcon, FileQuestion, ChevronUp, ChevronDown, X as XIcon } from 'lucide-react'

export default function QuizGemini({ darkMode }) {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('pdf')
  const [copied, setCopied] = useState(false)
  const [showPrompt, setShowPrompt] = useState(true)
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
      localStorage.setItem('tutorial_quiz-gemini_completed', 'true')
    }
  }, [isEndInView])

  // Simple scroll spy for TOC
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['langkah-1', 'langkah-2', 'langkah-3']
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

  const promptText = `Halo Gemini. Baca sumber materi yang saya berikan. Jangan buat kuis terlebih dahulu. Tanyakan dua hal berikut kepada saya.

1. Jumlah Soal Quiz Latihan
2. Tingkat Kesulitan Mudah atau Sedang(default) atau Sulit

Setelah saya menjawab buat aplikasi web kuis interaktif. Kamu wajib menggunakan fitur Gemini Canvas untuk membuat aplikasi ini. Ikuti ketentuan fitur kuis berikut.

Gaya visual. Gunakan gaya UI neobrutalism. Pilih warna cerah dan menarik.

gunakan style ini sebagai referensi, boleh bedakan variasi warna aksen dan interaksinya:
<style>
        body {
            font-family: 'Space Grotesk', sans-serif;
            background-color: #f4f4f0;
            background-image: radial-gradient(#d1d1d1 2px, transparent 2px);
            background-size: 30px 30px;
        }
        
        .neo-box {
            background-color: white;
            border: 4px solid #000;
            box-shadow: 8px 8px 0px #000;
            border-radius: 12px;
        }
        
        .neo-btn {
            border: 4px solid #000;
            box-shadow: 6px 6px 0px #000;
            border-radius: 8px;
            transition: all 0.15s ease-in-out;
            font-weight: 700;
            cursor: pointer;
        }
        
        .neo-btn:hover {
            transform: translate(-2px, -2px);
            box-shadow: 8px 8px 0px #000;
        }
        
        .neo-btn:active {
            transform: translate(6px, 6px);
            box-shadow: 0px 0px 0px #000;
        }

        .neo-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            transform: translate(6px, 6px);
            box-shadow: 0px 0px 0px #000;
        }

        .option-btn {
            text-align: left;
            width: 100%;
            padding: 1rem;
            margin-bottom: 1rem;
            background-color: #fff;
            border: 3px solid #000;
            box-shadow: 4px 4px 0px #000;
            border-radius: 8px;
            font-weight: 600;
            transition: all 0.1s;
            cursor: pointer;
        }

        .option-btn:not(:disabled):hover {
            background-color: #fef08a;
            transform: translate(-2px, -2px);
            box-shadow: 6px 6px 0px #000;
        }

        .correct-ans {
            background-color: #4ade80 !important;
            color: #000;
        }

        .wrong-ans {
            background-color: #f87171 !important;
            color: #000;
        }

        .hidden { display: none; }
    </style>

Halaman awal. Tampilkan judul Quiz Latihan Materi lalu ikuti dengan nama materinya. Buat tombol Mulai Quiz di bawah judul.
Halaman pengerjaan. Tampilkan progres nomor soal di bagian atas. Tampilkan pengatur waktu untuk menghitung lama pengerjaan kuis. Acak urutan pertanyaan pada setiap sesi. Acak juga posisi pilihan ganda pada setiap pertanyaan. tambahkan gambar yang sesuai dengan soal untuk pertanyaan yang memang memerlukan gambar untuk kejelasan konteks (opsional).

Interaksi kuis. Beri warna hijau jika opsi yang dipilih benar. Beri warna merah jika opsi salah. Tampilkan teks penjelasan materi setelah pengguna memilih jawaban. jelaskan juga kenapa jawabannya salah jika memilih jawaban salah. Sediakan tombol Petunjuk(hint) di bawah pilihan ganda. Beri tombol Selanjutnya dan Sebelumnya di bagian paling bawah untuk pindah soal.

Halaman akhir setelah semua soal selesai. Tampilkan jumlah jawaban yang benar, total waktu pengerjaan kuis, dan di bawahnya preview riwayat semua jawabannya serta penjelasannya. serta tombol untuk balik ke halaman awal`;

  const handleCopy = () => {
    navigator.clipboard.writeText(promptText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`relative min-h-screen pt-20 md:pt-28 pb-12 md:pb-20 bg-grid ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      <div className={`absolute inset-0 ${
        darkMode 
          ? 'bg-gradient-to-br from-dark via-dark-surface/30 to-dark' 
          : 'bg-gradient-to-br from-purple-brand/20 via-white to-blue-brand/10'
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
            <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl border-4 flex items-center justify-center shrink-0 bg-purple-brand text-white shadow-[4px_4px_0px_0px_#000] ${darkMode ? 'border-white/30' : 'border-black'}`}>
              <Sparkles size={32} />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-heading font-black tracking-tight">
              Membuat Kuis Interaktif Menggunakan <span className="gemini-sparkle">Google Gemini</span>
            </h1>
          </div>
          <p className={`text-base sm:text-lg md:text-xl leading-relaxed mt-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Halo teman-teman! Yuk, kita sulap materi catatan pelajaranmu jadi game kuis interaktif yang super seru pakai <span className="gemini-sparkle">Google Gemini</span>! Caranya gampang banget kok, ikuti langkah-langkah di bawah ini ya!
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
              <li>
                <a 
                  href="#langkah-1" 
                  className={`block transition-colors ${activeToc === 'langkah-1' ? 'text-blue-brand font-bold' : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black')}`}
                >
                  1. Membuka Google Gemini
                </a>
              </li>
              <li>
                <a 
                  href="#langkah-2" 
                  className={`block transition-colors ${activeToc === 'langkah-2' ? 'text-pink-brand font-bold' : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black')}`}
                >
                  2. Memasukkan Sumber Materi Belajar
                </a>
              </li>
              <li>
                <a 
                  href="#langkah-3" 
                  className={`block transition-colors ${activeToc === 'langkah-3' ? 'text-green-brand font-bold' : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black')}`}
                >
                  3. Meminta Gemini Membuatkan Quiz
                </a>
              </li>
            </ul>
          </div>
          </div>

          <div className="space-y-8 md:space-y-12 w-full">
            
            {/* Section 1 */}
            <motion.section 
              id="langkah-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`scroll-mt-28 neo-card p-4 sm:p-6 md:p-8 ${darkMode ? 'bg-dark-card border-white/20' : 'bg-white'}`}
            >
            <h2 className="text-xl md:text-3xl font-heading font-bold mb-4 flex items-center gap-3">
              <span className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-3 flex items-center justify-center shrink-0 ${darkMode ? 'bg-pink-brand text-black border-white/20' : 'bg-pink-brand text-black border-black shadow-[3px_3px_0px_0px_#000]'}`}>1</span>
              Membuka <span className="gemini-sparkle">Google Gemini</span>
            </h2>
            <p className={`mb-6 text-base md:text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Pertama-tama, kita harus masuk ke dalam website <span className="gemini-sparkle">Google Gemini</span>. Klik tombol biru di bawah ini ya, nanti website-nya akan otomatis terbuka di tab baru.
            </p>
            <a 
              href="https://gemini.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`neo-btn px-6 py-3 text-lg w-full sm:w-auto justify-center ${darkMode ? 'bg-blue-brand text-white border-white/20' : 'bg-blue-brand text-white hover:bg-blue-dark'}`}
            >
              Buka <span className="gemini-sparkle">Google Gemini</span> <ExternalLink size={20} />
            </a>
            <div className={`mt-6 rounded-xl border-2 md:border-4 overflow-hidden ${darkMode ? 'border-white/20 bg-white/5' : 'border-black bg-gray-50'}`}>
              <img src="/image/Modul_Quiz_Gemini/Gambar 15.jpg" alt="Halaman Utama Gemini" className="w-full h-auto object-contain" />
            </div>
          </motion.section>

          {/* Section 2 */}
          <motion.section 
            id="langkah-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="scroll-mt-28 mb-8 md:mb-12"
          >
            {/* Header Section 2 */}
            <div className={`neo-card p-4 sm:p-6 md:p-8 mb-8 ${darkMode ? 'bg-dark-card border-white/20' : 'bg-white'}`}>
              <h2 className="text-lg md:text-2xl font-heading font-bold flex items-center gap-3">
                <span className={`w-7 h-7 md:w-8 md:h-8 rounded-full border-3 flex items-center justify-center shrink-0 font-bold ${darkMode ? 'bg-pink-brand text-black border-white/20' : 'bg-pink-brand text-black border-black shadow-[2px_2px_0px_0px_#000]'}`}>2</span>
                Memasukkan Sumber Materi Belajar
              </h2>
            </div>
            
            {/* Bookmark Navigator Tabs */}
            <div className="flex items-end pl-2 sm:pl-8 relative z-10 overflow-x-auto scrollbar-hide -mb-[3px]">
              <button 
                onClick={() => setActiveTab('pdf')}
                className={`px-3 sm:px-6 py-2 sm:py-3 rounded-t-xl border-3 border-b-0 font-bold flex items-center gap-1.5 sm:gap-2 relative transition-all duration-200 ${
                  activeTab === 'pdf' 
                    ? `pt-3 sm:pt-4 z-20 ${darkMode ? 'bg-gradient-to-b from-pink-brand/40 to-dark-card text-white border-white/20' : 'bg-gradient-to-b from-pink-300 to-white text-black border-black'}`
                    : `mb-[3px] z-0 ${darkMode ? 'bg-dark-surface text-gray-400 border-white/20 hover:bg-white/10' : 'bg-gray-200 text-gray-500 border-black hover:bg-gray-300 hover:text-black shadow-[inset_0_-4px_0_rgba(0,0,0,0.1)]'}`
                }`}
              >
                <FileText className="shrink-0 w-4 h-4 sm:w-[18px] sm:h-[18px]" /> <span className="text-xs sm:text-base">Pilih dari Komputer</span>
              </button>
              <button 
                onClick={() => setActiveTab('notebooklm')}
                className={`px-3 sm:px-6 py-2 sm:py-3 rounded-t-xl border-3 border-b-0 font-bold flex items-center gap-1.5 sm:gap-2 relative transition-all duration-200 ml-1 sm:ml-2 ${
                  activeTab === 'notebooklm' 
                    ? `pt-3 sm:pt-4 z-20 ${darkMode ? 'bg-gradient-to-b from-pink-brand/40 to-dark-card text-white border-white/20' : 'bg-gradient-to-b from-pink-300 to-white text-black border-black'}`
                    : `mb-[3px] z-0 ${darkMode ? 'bg-dark-surface text-gray-400 border-white/20 hover:bg-white/10' : 'bg-gray-200 text-gray-500 border-black hover:bg-gray-300 hover:text-black shadow-[inset_0_-4px_0_rgba(0,0,0,0.1)]'}`
                }`}
              >
                <NotebookIcon className="shrink-0 w-4 h-4 sm:w-[18px] sm:h-[18px]" /> <span className="text-xs sm:text-base hidden sm:inline">Ambil dari <span className="notebook-sparkle">NotebookLM</span></span><span className="text-xs sm:hidden"><span className="notebook-sparkle">NotebookLM</span></span>
              </button>
            </div>

            {/* Content Card */}
            <div className={`relative border-3 rounded-2xl p-6 md:p-8 z-0 ${
              darkMode ? 'border-white/20 bg-dark-card shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]' : 'border-black bg-white shadow-[6px_6px_0px_0px_#000]'
            }`}>
              <div className="space-y-10">
                {activeTab === 'pdf' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                    <div className="space-y-3">
                      <p className="font-bold text-base md:text-lg">1. Cari tombol berlogo Plus (+) di pojok kiri bawah layar <span className="gemini-sparkle">Gemini</span>, lalu klik tombol tersebut.</p>
                      <div className={`rounded-xl border-2 md:border-4 overflow-hidden ${darkMode ? 'border-white/20 bg-white/5' : 'border-black bg-gray-50'}`}>
                        <img src="/image/Modul_Quiz_Gemini/Gambar 1.jpg" alt="Langkah 1" className="w-full h-auto object-contain" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <p className="font-bold text-base md:text-lg">2. Setelah muncul menu kecil, pilih opsi 'Upload File' (Unggah File).</p>
                      <div className={`rounded-xl border-2 md:border-4 overflow-hidden ${darkMode ? 'border-white/20 bg-white/5' : 'border-black bg-gray-50'}`}>
                        <img src="/image/Modul_Quiz_Gemini/Gambar 2.jpg" alt="Langkah 2" className="w-full h-auto object-contain" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <p className="font-bold text-base md:text-lg">3. Cari dan pilih file materi pelajaranmu (bisa berupa PDF atau PPT) yang ada di komputermu.</p>
                      <div className={`rounded-xl border-2 md:border-4 overflow-hidden ${darkMode ? 'border-white/20 bg-white/5' : 'border-black bg-gray-50'}`}>
                        <img src="/image/Modul_Quiz_Gemini/Gambar 3.jpg" alt="Langkah 3" className="w-full h-auto object-contain" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <p className="font-bold text-base md:text-lg">4. Yeay! File kamu sudah berhasil masuk dan siap dibaca oleh <span className="gemini-sparkle">Gemini</span>.</p>
                      <div className={`rounded-xl border-2 md:border-4 overflow-hidden ${darkMode ? 'border-white/20 bg-white/5' : 'border-black bg-gray-50'}`}>
                        <img src="/image/Modul_Quiz_Gemini/Gambar 4.jpg" alt="Langkah 4" className="w-full h-auto object-contain" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'notebooklm' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                    <div className="space-y-3">
                      <p className="font-bold text-base md:text-lg">1. Sama seperti tadi, klik tombol Plus (+) dulu ya.</p>
                      <div className={`rounded-xl border-2 md:border-4 overflow-hidden ${darkMode ? 'border-white/20 bg-white/5' : 'border-black bg-gray-50'}`}>
                        <img src="/image/Modul_Quiz_Gemini/Gambar 1.jpg" alt="Langkah 1" className="w-full h-auto object-contain" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <p className="font-bold text-base md:text-lg">2. Pilih menu 'Upload Lainnya' (opsi yang paling bawah), kemudian klik 'Notebooks'.</p>
                      <div className={`rounded-xl border-2 md:border-4 overflow-hidden ${darkMode ? 'border-white/20 bg-white/5' : 'border-black bg-gray-50'}`}>
                        <img src="/image/Modul_Quiz_Gemini/Gambar 5.jpg" alt="Langkah 2" className="w-full h-auto object-contain" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <p className="font-bold text-base md:text-lg">3. Pilih catatan <span className="notebook-sparkle">NotebookLM</span> kamu yang ingin dijadikan kuis, lalu tekan tombol tambahkan.</p>
                      <div className={`rounded-xl border-2 md:border-4 overflow-hidden ${darkMode ? 'border-white/20 bg-white/5' : 'border-black bg-gray-50'}`}>
                        <img src="/image/Modul_Quiz_Gemini/Gambar 6.jpg" alt="Langkah 3" className="w-full h-auto object-contain" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <p className="font-bold text-base md:text-lg">4. Berhasil! Materi dari <span className="notebook-sparkle">NotebookLM</span> kamu sudah tersambung.</p>
                      <div className={`rounded-xl border-2 md:border-4 overflow-hidden ${darkMode ? 'border-white/20 bg-white/5' : 'border-black bg-gray-50'}`}>
                        <img src="/image/Modul_Quiz_Gemini/Gambar 7.jpg" alt="Langkah 4" className="w-full h-auto object-contain" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.section>

          {/* Section 3 */}
          <motion.section 
            id="langkah-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`scroll-mt-28 neo-card p-4 sm:p-6 md:p-8 ${darkMode ? 'bg-dark-card border-white/20' : 'bg-white'}`}
          >
            <h2 className="text-lg md:text-2xl font-heading font-bold mb-6 flex items-center gap-3">
              <span className={`w-7 h-7 md:w-8 md:h-8 rounded-full border-3 flex items-center justify-center shrink-0 font-bold ${darkMode ? 'bg-pink-brand text-black border-white/20' : 'bg-pink-brand text-black border-black shadow-[2px_2px_0px_0px_#000]'}`}>3</span>
              Meminta <span className="gemini-sparkle">Google Gemini</span> Membuatkan Quiz
            </h2>
            
            <div className="space-y-10">
              <div className="space-y-3">
                <p className="font-bold text-base md:text-lg">1. Pastikan kamu memilih mode '<span className="gemini-sparkle">Gemini</span> Canvas' agar kuis yang dibuat bisa menjadi sebuah aplikasi web yang keren.</p>
                <div className={`rounded-xl border-2 md:border-4 overflow-hidden ${darkMode ? 'border-white/20 bg-white/5' : 'border-black bg-gray-50'}`}>
                  <img src="/image/Modul_Quiz_Gemini/Gambar 8.jpg" alt="Gemini Canvas" className="w-full h-auto object-contain" />
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="font-bold text-base md:text-lg">2. Jangan lupa pilih model <span className="gemini-sparkle">Gemini</span> yang paling canggih (contohnya <span className="gemini-sparkle">gemini</span> pro, dan penalaran nya mendalam) jika tersedia, supaya hasilnya maksimal.</p>
                <div className={`rounded-xl border-2 md:border-4 overflow-hidden ${darkMode ? 'border-white/20 bg-white/5' : 'border-black bg-gray-50'}`}>
                  <img src="/image/Modul_Quiz_Gemini/Gambar 9.jpg" alt="Model Gemini" className="w-full h-auto object-contain" />
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="font-bold text-base md:text-lg">3. Sekarang, salin (copy) teks rahasia di bawah ini. Teks ini disebut 'Prompt', yang fungsinya seperti mantra untuk menyuruh <span className="gemini-sparkle">Gemini</span> membuatkan kuis.</p>
                
                <div className={`neo-card overflow-hidden transition-all ${darkMode ? 'bg-dark-card border-white/20' : 'bg-white'}`}>
                  <div className="p-4 md:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl border-3 flex items-center justify-center shrink-0 bg-yellow-brand text-black border-black shadow-[3px_3px_0px_0px_#000]`}>
                          <FileQuestion size={24} />
                        </div>
                        <div>
                          <h3 className="text-base md:text-lg font-heading font-bold">Prompt Membuat Kuis</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-4 md:px-6 pb-4 md:pb-6 flex flex-col sm:flex-row gap-3">
                    <button 
                      onClick={handleCopy}
                      className={`neo-btn px-5 py-2.5 text-sm flex-1 flex items-center justify-center gap-2 ${copied ? 'bg-green-brand text-black' : 'bg-yellow-brand hover:bg-yellow-light text-black'}`}
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />} 
                      {copied ? 'Tersalin!' : 'Salin Prompt'}
                    </button>
                    
                    <button 
                      onClick={() => setShowPrompt(!showPrompt)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border-3 transition-all font-bold text-sm ${
                        darkMode ? 'border-white/20 bg-dark-surface hover:bg-white/10 text-white' : 'border-black bg-gray-100 hover:bg-gray-200 text-black shadow-[3px_3px_0px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none'
                      }`}
                    >
                      {showPrompt ? 'Sembunyikan Prompt' : 'Lihat Isi Prompt'}
                      {showPrompt ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                  </div>
                  
                  <AnimatePresence>
                    {showPrompt && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 md:px-6 pb-4 md:pb-6">
                          <div className={`prompt-text text-xs md:text-sm max-h-48 overflow-y-auto whitespace-pre-wrap break-words ${darkMode ? 'bg-black/50 border-white/20 text-gray-300' : 'bg-[#f4f4f4] border-black text-gray-800'}`}>
                            {promptText}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-bold text-base md:text-lg">4. Tempel (paste) teks tadi ke kolom chat <span className="gemini-sparkle">Gemini</span>, lalu tekan tombol kirim (ikon panah ke atas).</p>
                <div className={`rounded-xl border-2 md:border-4 overflow-hidden ${darkMode ? 'border-white/20 bg-white/5' : 'border-black bg-gray-50'}`}>
                  <img src="/image/Modul_Quiz_Gemini/Gambar 10.jpg" alt="Kirim" className="w-full h-auto object-contain" />
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-bold text-base md:text-lg">5. <span className="gemini-sparkle">Gemini</span> akan bertanya kepadamu: Mau berapa soal? Dan seberapa susah? Jawab saja sesukamu, misalnya ketik: '10 soal dengan kesulitan sedang'.</p>
                <div className={`rounded-xl border-2 md:border-4 overflow-hidden ${darkMode ? 'border-white/20 bg-white/5' : 'border-black bg-gray-50'}`}>
                  <img src="/image/Modul_Quiz_Gemini/Gambar 11.jpg" alt="Jawab" className="w-full h-auto object-contain" />
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-bold text-base md:text-lg">6. Tunggu sebentar ya, robot <span className="gemini-sparkle">Gemini</span> sedang sibuk menulis kode program dan membuatkan kuis spesial buat kamu...</p>
                <div className={`rounded-xl border-2 md:border-4 overflow-hidden ${darkMode ? 'border-white/20 bg-white/5' : 'border-black bg-gray-50'}`}>
                  <img src="/image/Modul_Quiz_Gemini/Gambar 12.jpg" alt="Loading" className="w-full h-auto object-contain" />
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-bold text-base md:text-lg">7. Taraaa! Aplikasi Kuis Interaktif buatanmu sudah jadi di sebelah kanan layar dan bisa langsung dimainkan.</p>
                <div className={`rounded-xl border-2 md:border-4 overflow-hidden ${darkMode ? 'border-white/20 bg-white/5' : 'border-black bg-gray-50'}`}>
                  <img src="/image/Modul_Quiz_Gemini/Gambar 13.jpg" alt="Selesai" className="w-full h-auto object-contain" />
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-bold text-base md:text-lg">8. Kalau mau dimainkan lagi nanti tanpa butuh internet, kamu bisa klik ikon 'Export/Download' di pojok kanan atas untuk menyimpannya ke komputermu.</p>
                <div className={`rounded-xl border-2 md:border-4 overflow-hidden ${darkMode ? 'border-white/20 bg-white/5' : 'border-black bg-gray-50'}`}>
                  <img src="/image/Modul_Quiz_Gemini/Gambar 14.jpg" alt="Download" className="w-full h-auto object-contain" />
                </div>
              </div>

              {/* Tips Box */}
              <div className={`mt-10 p-5 sm:p-6 rounded-2xl border-4 ${
                darkMode 
                  ? 'bg-yellow-brand/10 border-yellow-brand/30' 
                  : 'bg-yellow-brand/20 border-black shadow-[4px_4px_0px_0px_#000]'
              }`}>
                <h3 className="text-xl md:text-2xl font-heading font-bold mb-6 flex items-center gap-2">
                  💡 Tips Tambahan
                </h3>
                <ul className={`space-y-5 text-sm md:text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li className="flex items-start gap-3">
                    <span className="text-xl shrink-0 mt-0.5">🎭</span>
                    <div className="flex-1">
                      <h4 className={`font-bold text-base md:text-lg ${darkMode ? 'text-white' : 'text-black'}`}>Gunakan "Roleplay"</h4>
                      <p className="mt-1">
                        Beri Gemini persona seru!
                        <br />
                        <span className={`italic ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-xs md:text-sm mt-1 inline-block`}>Contoh: "Bertindaklah sebagai karakter detektif yang mengajak anak memecahkan misteri..."</span>
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl shrink-0 mt-0.5">🎯</span>
                    <div className="flex-1">
                      <h4 className={`font-bold text-base md:text-lg ${darkMode ? 'text-white' : 'text-black'}`}>Spesifikkan Target Usia</h4>
                      <p className="mt-1">
                        Sebutkan usia/kelas siswa agar gaya bahasanya pas.
                        <br />
                        <span className={`italic ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-xs md:text-sm mt-1 inline-block`}>Contoh: "Gunakan gaya bahasa gaul anak SMP kelas 8."</span>
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl shrink-0 mt-0.5">💡</span>
                    <div className="flex-1">
                      <h4 className={`font-bold text-base md:text-lg ${darkMode ? 'text-white' : 'text-black'}`}>Penjelasan Menarik</h4>
                      <p className="mt-1">
                        Perintahkan Gemini merespons jawaban salah dengan analogi lucu agar siswa tidak cepat menyerah.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl shrink-0 mt-0.5">🎉</span>
                    <div className="flex-1">
                      <h4 className={`font-bold text-base md:text-lg ${darkMode ? 'text-white' : 'text-black'}`}>Berikan Pujian Virtual</h4>
                      <p className="mt-1">
                        Instruksikan Gemini untuk menyelipkan emoji (seperti ⭐, 🚀, atau 🏆) setiap siswa berhasil menjawab benar!
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl shrink-0 mt-0.5">🎮</span>
                    <div className="flex-1">
                      <h4 className={`font-bold text-base md:text-lg ${darkMode ? 'text-white' : 'text-black'}`}>Kaitkan dengan Hobi Anak</h4>
                      <p className="mt-1">
                        Gabungkan materi pelajaran dengan hal-hal yang sedang disukai anak, seperti petualangan dunia game atau pahlawan super.
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
        className={`fixed bottom-6 left-6 z-40 p-4 rounded-full border-4 shadow-[4px_4px_0px_0px_#000] flex items-center justify-center transition-transform hover:scale-105 active:scale-95 ${darkMode ? 'bg-pink-brand text-black border-white/20' : 'bg-pink-brand text-black border-black'} xl:hidden`}
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
                <li>
                  <a 
                    href="#langkah-1" 
                    onClick={() => setIsTocOpen(false)}
                    className={`block transition-colors ${activeToc === 'langkah-1' ? 'text-blue-brand font-bold' : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black')}`}
                  >
                    1. Membuka Google Gemini
                  </a>
                </li>
                <li>
                  <a 
                    href="#langkah-2" 
                    onClick={() => setIsTocOpen(false)}
                    className={`block transition-colors ${activeToc === 'langkah-2' ? 'text-pink-brand font-bold' : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black')}`}
                  >
                    2. Memasukkan Sumber Materi Belajar
                  </a>
                </li>
                <li>
                  <a 
                    href="#langkah-3" 
                    onClick={() => setIsTocOpen(false)}
                    className={`block transition-colors ${activeToc === 'langkah-3' ? 'text-green-brand font-bold' : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black')}`}
                  >
                    3. Meminta Gemini Membuatkan Quiz
                  </a>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className={`fixed bottom-8 left-1/2 px-6 py-3 rounded-xl border-3 flex items-center gap-3 z-50 font-bold ${
              darkMode 
                ? 'bg-green-brand text-black border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)]' 
                : 'bg-green-brand text-black border-black shadow-[4px_4px_0px_0px_#000]'
            }`}
          >
            <Check size={20} />
            Prompt Berhasil Di Copy!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
