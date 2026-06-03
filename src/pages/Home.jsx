import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import WhyLearnAI from '../components/WhyLearnAI'
import Tutorials from '../components/Tutorials'
import AITools from '../components/AITools'
import FAQ from '../components/FAQ'

export default function Home({ darkMode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Hero darkMode={darkMode} />
      <WhyLearnAI darkMode={darkMode} />
      <Tutorials darkMode={darkMode} />
      <AITools darkMode={darkMode} />
      <FAQ darkMode={darkMode} />
    </motion.main>
  )
}
