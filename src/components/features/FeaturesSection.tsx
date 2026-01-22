import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FeatureCard from './FeatureCard'
import { FEATURES } from '../../utils/constants'

gsap.registerPlugin(ScrollTrigger)

/**
 * Features Section - Müller-Brockmann Grid
 */
export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      const elements = contentRef.current.querySelectorAll('.feature-card')
      
      gsap.fromTo(
        elements,
        { opacity: 0, y: 8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section
      id="features"
      ref={sectionRef}
      className="py-20"
      style={{ backgroundColor: '#FAFAFA' }}
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-14">
          <p className="swiss-caps mb-3" style={{ color: '#6B6B6B' }}>Capabilities</p>
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0A0A0A' }}>Features</h2>
          <div className="w-14 h-px mb-6" style={{ backgroundColor: '#0A0A0A' }} />
          <p className="max-w-xl" style={{ color: '#6B6B6B' }}>
            Discover the powerful features that make our solution stand out
          </p>
        </div>

        {/* Feature Grid */}
        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature) => (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              index={feature.index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
