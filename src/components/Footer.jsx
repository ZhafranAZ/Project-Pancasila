import { Heart, Camera, MapPin, Globe, Play } from 'lucide-react'

const InstagramIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
)

/**
 * Footer - Site footer with about, contact, and social links
 */

export default function Footer({ darkMode }) {
  return (
    <footer className={`py-16 border-t-3 ${
      darkMode
        ? 'bg-dark-card border-white/10'
        : 'bg-gray-900 border-black text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-0 mb-4">
              <div className="w-22 h-22 flex items-center justify-center overflow-hidden">
                <img src="/image/lwa_logo1.png" alt="Learn With AI Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-heading font-bold text-2xl">Learn With AI</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Platform pembelajaran AI sederhana untuk pengajar dan anak-anak. 
              Membantu memahami dan memanfaatkan AI sebagai alat pendamping belajar yang interaktif dan efektif.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Navigasi</h3>
            <ul className="space-y-2">
              {[
                { label: 'Beranda', href: '#hero' },
                { label: 'Kenapa AI?', href: '#why-ai' },
                { label: 'Tutorial', href: '#tutorials' },
                { label: 'Prompt Labs', href: '/prompt-lab' },
                { label: 'AI Tools', href: '#tools' },
                { label: 'FAQ', href: '#faq' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith('#')) {
                        e.preventDefault()
                        const el = document.querySelector(link.href)
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth' })
                        } else {
                          window.location.href = '/' + link.href
                        }
                      }
                    }}
                    className="text-gray-400 hover:text-yellow-brand transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Kontak</h3>
            <div className="space-y-3 mb-6">
              <a href="https://instagram.com/learnwithai.adzkar/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-pink-brand transition-colors w-fit">
                <InstagramIcon size={18} className="text-pink-brand" />
                @learnwithai.adzkar
              </a>
              <p className="flex items-center gap-2 text-gray-400">
                <MapPin size={18} className="text-blue-brand" />
                Indonesia
              </p>
            </div>

            <h4 className="font-heading font-bold text-sm mb-3 text-gray-300">Ikuti Kami</h4>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/learnwithai.adzkar/"
                className="w-10 h-10 rounded-lg border-2 border-white/20 flex items-center justify-center text-gray-400 transition-all hover:text-white hover:border-white/40 hover:bg-pink-brand"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={`border-t pt-8 ${darkMode ? 'border-white/10' : 'border-white/15'}`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Learn With AI.
            </p>
            <p className="text-gray-500 text-sm">
              Dibuat dengan{' '}
              <Heart size={14} className="inline text-red-brand" />{' '}
              untuk generasi cerdas Indonesia.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
