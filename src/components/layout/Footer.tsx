import { SITE_CONFIG } from '../../utils/constants'

/**
 * Footer - Modernist Grid Layout
 */
export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{ borderTop: '1px solid #E5E5E5', backgroundColor: '#FAFAFA' }}>
      <div className="max-w-5xl mx-auto px-6 py-14">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg mb-4" style={{ color: '#0A0A0A' }}>
              {SITE_CONFIG.name}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#6B6B6B' }}>
              {SITE_CONFIG.description}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="swiss-caps mb-4" style={{ color: '#6B6B6B' }}>Navigation</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-sm transition-colors duration-200 hover:opacity-70" style={{ color: '#6B6B6B' }}>
                  Home
                </a>
              </li>
              <li>
                <a href="#showcase" className="text-sm transition-colors duration-200 hover:opacity-70" style={{ color: '#6B6B6B' }}>
                  Showcase
                </a>
              </li>
              <li>
                <a href="#features" className="text-sm transition-colors duration-200 hover:opacity-70" style={{ color: '#6B6B6B' }}>
                  Features
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="swiss-caps mb-4" style={{ color: '#6B6B6B' }}>Contact</h4>
            <p className="text-sm" style={{ color: '#6B6B6B' }}>contact@example.com</p>
            <p className="text-sm mt-2" style={{ color: '#6B6B6B' }}>+1 234 567 8900</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8" style={{ borderTop: '1px solid #E5E5E5' }}>
          <p className="text-xs" style={{ color: '#6B6B6B' }}>
            © {currentYear} {SITE_CONFIG.name}
          </p>
        </div>
      </div>
    </footer>
  )
}
