import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

interface VideoModalProps {
  videoSrc: string
  isOpen: boolean
  onClose: () => void
}

/**
 * Video Modal - Fullscreen video player with blur backdrop
 * - No controls, non-interactive video
 * - Close button on top right
 * - Stops at last frame when finished
 * - Prevents body scroll when open
 * - Uses Portal to render outside parent DOM hierarchy
 */
export default function VideoModal({ videoSrc, isOpen, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Prevent scroll and handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  // Handle video loaded - ensure playback starts
  const handleLoadedData = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked, ignore silently
      })
    }
  }

  if (!isOpen) return null

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      }}
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        className="absolute top-6 right-6 z-10 p-2 transition-colors duration-200 hover:bg-white/10 rounded-full"
        aria-label="Close video"
      >
        <svg
          className="w-8 h-8"
          style={{ color: '#FFFFFF' }}
          fill="none"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Video Container - click on video doesn't close modal */}
      <div
        className="relative max-w-5xl w-full mx-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Key forces React to recreate video element when src changes */}
        <video
          key={videoSrc}
          ref={videoRef}
          src={videoSrc}
          className="w-full h-auto rounded-lg shadow-2xl"
          style={{
            maxHeight: '80vh',
            objectFit: 'contain',
            pointerEvents: 'none',
          }}
          playsInline
          muted
          autoPlay
          onLoadedData={handleLoadedData}
        />
      </div>
    </div>
  )

  // Use Portal to render modal at document.body level
  return createPortal(modalContent, document.body)
}
