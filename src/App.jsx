import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Routes, Route, useLocation } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import Home from './pages/Home'
import VideoNotebookLM from './pages/tutorials/VideoNotebookLM'
import AudioNotebookLM from './pages/tutorials/AudioNotebookLM'
import QuizFlashcardNotebookLM from './pages/tutorials/QuizFlashcardNotebookLM'
import QuizGemini from './pages/tutorials/QuizGemini'
import PromptLab from './pages/PromptLab'

function App() {
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const location = useLocation()

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  // Fix scroll position on route change
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    // Set a tiny timeout to ensure DOM has updated after routing
    setTimeout(() => {
      if (location.hash) {
        const id = location.hash.replace('#', '')
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'instant' })
          return
        }
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }, 0)
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-dark text-white' : 'bg-white text-gray-900'}`}>
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>

      {!loading && (
        <>
          <ScrollProgress />
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home darkMode={darkMode} />} />
              <Route path="/tutorial/video-notebooklm" element={<VideoNotebookLM darkMode={darkMode} />} />
              <Route path="/tutorial/audio-notebooklm" element={<AudioNotebookLM darkMode={darkMode} />} />
              <Route path="/tutorial/quiz-flashcard-notebooklm" element={<QuizFlashcardNotebookLM darkMode={darkMode} />} />
              <Route path="/tutorial/quiz-gemini" element={<QuizGemini darkMode={darkMode} />} />
              <Route path="/prompt-lab" element={<PromptLab darkMode={darkMode} />} />
            </Routes>
          </AnimatePresence>
          <Footer darkMode={darkMode} />
          <BackToTop />
        </>
      )}
    </div>
  )
}

export default App
