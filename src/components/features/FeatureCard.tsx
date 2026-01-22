interface FeatureCardProps {
  title: string
  description: string
  index: string
}

/**
 * Feature Card - Dieter Rams Functional Design
 */
export default function FeatureCard({
  title,
  description,
  index,
}: FeatureCardProps) {
  return (
    <div 
      className="feature-card group p-8 transition-colors duration-200 cursor-pointer"
      style={{ 
        backgroundColor: '#FFFFFF', 
        border: '1px solid #E5E5E5',
      }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = '#0A0A0A'}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E5E5E5'}
    >
      {/* Index number */}
      <span 
        className="block text-4xl font-bold mb-6 transition-colors duration-200"
        style={{ color: '#E5E5E5' }}
      >
        {index}
      </span>

      {/* Title */}
      <h3 className="text-lg font-bold mb-3" style={{ color: '#0A0A0A' }}>{title}</h3>
      
      {/* Description */}
      <p className="text-sm leading-relaxed" style={{ color: '#6B6B6B' }}>{description}</p>
    </div>
  )
}
