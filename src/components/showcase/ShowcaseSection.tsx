import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import VideoCard from './VideoCard'
import VideoModal from './VideoModal'
import { SHOWCASE_ITEMS } from '../../utils/constants'

gsap.registerPlugin(ScrollTrigger)

/**
 * Showcase Section - Grid Gallery
 */
export default function ShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  const handleCardClick = (videoSrc: string) => {
    setSelectedVideo(videoSrc)
  }

  const handleCloseModal = () => {
    setSelectedVideo(null)
  }

  useEffect(() => {
    if (contentRef.current) {
      const cards = contentRef.current.querySelectorAll('.showcase-card')
      
      gsap.fromTo(
        cards,
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
      id="showcase"
      ref={sectionRef}
      className="py-20"
      style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #E5E5E5' }}
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-14">
          <p className="swiss-caps mb-3" style={{ color: '#6B6B6B' }}>Portfolio</p>
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0A0A0A' }}>Showcase</h2>
          <div className="w-14 h-px mb-6" style={{ backgroundColor: '#0A0A0A' }} />
          <p className="max-w-xl" style={{ color: '#6B6B6B' }}>
            Explore our featured projects and discover what we can create together
          </p>
        </div>

        {/* Showcase Grid */}
        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SHOWCASE_ITEMS.map((item) => (
            <VideoCard
              key={item.id}
              title={item.title}
              description={item.description}
              thumbnail={item.thumbnail}
              video={item.video}
              onClick={() => handleCardClick(item.video)}
            />
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        videoSrc={selectedVideo || ''}
        isOpen={selectedVideo !== null}
        onClose={handleCloseModal}
      />
    </section>
  )
}
