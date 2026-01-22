import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Button from '../common/Button'
import { SITE_CONFIG } from '../../utils/constants'

/**
 * Hero Section - Modernist Design
 * 
 * Layout based on Golden Ratio (φ = 1.618):
 * - Visual center at 38.2% from top (1 - 0.618)
 * - Asymmetric balance
 * - Maximum whitespace
 * - No decorative elements
 */
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: {
        ease: 'power2.out',
        duration: 0.6,
      },
    })

    if (contentRef.current) {
      const elements = contentRef.current.children
      tl.from(elements, {
        opacity: 0,
        y: 8,
        stagger: 0.1,
      })
    }

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-screen flex flex-col justify-center"
      style={{ backgroundColor: '#FAFAFA' }}
    >
      {/* Golden Ratio: Content positioned at ~38% from top */}
      <div className="max-w-5xl mx-auto px-6 w-full pt-32 pb-20">
        <div
          ref={contentRef}
          className="max-w-3xl"
        >
          {/* Tagline - Swiss caps */}
          <p className="swiss-caps mb-5" style={{ color: '#6B6B6B' }}>
            {SITE_CONFIG.tagline}
          </p>

          {/* Headline - Display typography */}
          <h1 className="text-display mb-8">
            {SITE_CONFIG.name}
          </h1>

          {/* Horizontal rule - Müller-Brockmann grid line */}
          <div className="w-14 h-px mb-8" style={{ backgroundColor: '#0A0A0A' }} />

          {/* Description - Body text */}
          <p className="text-lg leading-relaxed mb-10 max-w-xl" style={{ color: '#6B6B6B' }}>
            {SITE_CONFIG.description}
          </p>

          {/* CTA Buttons - Primary and Secondary */}
          <div className="flex gap-4 flex-wrap">
            <Button size="lg" href="#showcase">
              Get Started
            </Button>
            <Button variant="secondary" size="lg" href="#features">
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Minimal */}
      <div className="max-w-5xl mx-auto px-6 w-full pb-10">
        <a
          href="#showcase"
          className="inline-flex items-center gap-2 transition-colors duration-200 hover:opacity-70"
          style={{ color: '#6B6B6B' }}
        >
          <span className="swiss-caps">Scroll</span>
          <svg
            className="w-4 h-4"
            fill="none"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7" />
          </svg>
        </a>
      </div>
    </section>
  )
}
