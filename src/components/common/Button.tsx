import { clsx } from 'clsx'
import { ReactNode, CSSProperties } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  href?: string
}

/**
 * Button - Functional Purity (Dieter Rams)
 * 
 * Design principles:
 * - No gradients, no shadows
 * - Uppercase text with letter-spacing
 * - Simple opacity/color transitions
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  href,
}: ButtonProps) {
  const baseStyles = clsx(
    'inline-flex items-center justify-center',
    'font-medium uppercase',
    'transition-all duration-200',
    'cursor-pointer'
  )

  const sizes = {
    sm: 'px-5 py-2 text-xs',
    md: 'px-8 py-3 text-xs',
    lg: 'px-10 py-4 text-sm',
  }

  const variantStyles: Record<string, CSSProperties> = {
    primary: {
      backgroundColor: '#0A0A0A',
      color: '#FFFFFF',
      border: 'none',
      letterSpacing: '0.05em',
    },
    secondary: {
      backgroundColor: 'transparent',
      color: '#0A0A0A',
      border: '1px solid #0A0A0A',
      letterSpacing: '0.05em',
    },
    accent: {
      backgroundColor: '#E63946',
      color: '#FFFFFF',
      border: 'none',
      letterSpacing: '0.05em',
    },
  }

  const buttonElement = (
    <button
      className={clsx(baseStyles, sizes[size], 'hover:opacity-80', className)}
      style={variantStyles[variant]}
      onClick={onClick}
    >
      {children}
    </button>
  )

  if (href) {
    return (
      <a href={href} className="inline-block">
        {buttonElement}
      </a>
    )
  }

  return buttonElement
}
