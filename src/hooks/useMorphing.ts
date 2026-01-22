import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function useMorphing() {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const morphValues = [
      '60% 40% 30% 70% / 60% 30% 70% 40%',
      '30% 60% 70% 40% / 50% 60% 30% 60%',
      '70% 30% 50% 50% / 30% 50% 70% 50%',
      '40% 60% 50% 50% / 60% 40% 60% 40%',
    ]

    const tl = gsap.timeline({ repeat: -1, yoyo: true })

    morphValues.forEach((value) => {
      tl.to(element, {
        borderRadius: value,
        duration: 2,
        ease: 'power2.inOut',
      })
    })

    return () => {
      tl.kill()
    }
  }, [])

  return elementRef
}
