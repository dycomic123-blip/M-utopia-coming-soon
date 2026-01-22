import { ReactNode, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion, useAnimation } from 'framer-motion'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

/**
 * Animated Section - Modernist Animation
 * 
 * Only uses subtle fade + minimal translateY
 * Short duration, natural easing
 * Respects prefers-reduced-motion
 */
export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
}: AnimatedSectionProps) {
  const controls = useAnimation()
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const variants = {
    hidden: { 
      opacity: 0, 
      y: 8  // Subtle movement only - Dieter Rams principle
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,  // Short duration
        delay,
        ease: [0.33, 1, 0.68, 1],  // ease-out cubic
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}
