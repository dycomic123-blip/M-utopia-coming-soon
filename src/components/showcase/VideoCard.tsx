import { useState } from 'react'

interface VideoCardProps {
  title: string
  description: string
  thumbnail: string
  video: string
  onClick: () => void
}

/**
 * Video/Project Card - Modernist Gallery Item
 */
export default function VideoCard({
  title,
  description,
  thumbnail,
  onClick,
}: VideoCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="showcase-card group transition-colors duration-200 cursor-pointer"
      style={{ 
        backgroundColor: '#FFFFFF', 
        border: isHovered ? '1px solid #0A0A0A' : '1px solid #E5E5E5',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0" style={{ backgroundColor: '#E5E5E5' }} />
        )}
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-all duration-300"
          style={{ filter: isHovered ? 'grayscale(0)' : 'grayscale(0.85)' }}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Hover overlay */}
        <div 
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-200"
          style={{ 
            backgroundColor: isHovered ? 'rgba(0,0,0,0.1)' : 'transparent',
          }}
        >
          <div style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 200ms' }}>
            <svg
              className="w-8 h-8"
              style={{ color: '#0A0A0A' }}
              fill="none"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-base font-bold mb-2" style={{ color: '#0A0A0A' }}>{title}</h3>
        <p className="text-sm" style={{ color: '#6B6B6B' }}>{description}</p>
      </div>
    </div>
  )
}
