/** @type {import('tailwindcss').Config} */

/**
 * Modernist Design System
 * Based on: Vignelli, Müller-Brockmann, Dieter Rams, Paul Rand
 * Philosophy: "Less, but better"
 */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Modernist Color Palette (极致克制)
      colors: {
        black: '#0A0A0A',        // Near Black - Primary
        dark: '#1A1A1A',         // Soft Black - Secondary
        accent: '#E63946',       // Vignelli Red - Single accent
        white: '#FFFFFF',        // Pure White - Surface
        paper: '#FAFAFA',        // Paper White - Background
        muted: '#6B6B6B',        // Swiss Gray - Muted text
        light: '#E5E5E5',        // Grid Gray - Borders
      },
      // Golden Ratio Spacing (φ = 1.618)
      spacing: {
        '22': '5.5625rem',       // 89px  - 2xl (55 × 1.618)
        '36': '9rem',            // 144px - 3xl (89 × 1.618)
      },
      fontFamily: {
        sans: ['"Helvetica Neue"', 'Helvetica', 'Inter', 'Arial', 'sans-serif'],
        mono: ['"SF Mono"', 'Monaco', 'Consolas', 'monospace'],
      },
      // Golden Ratio Typography Scale
      fontSize: {
        '4xl': ['4.5rem', { lineHeight: '5rem' }],         // 72px - Display
      },
      // 12-Column Grid System (Müller-Brockmann)
      maxWidth: {
        'grid': '1200px',      // Container max-width
        'narrow': '50%',       // 6/12 columns
        'standard': '66.67%',  // 8/12 columns
        'wide': '83.33%',      // 10/12 columns
      },
      // Functional Animations (Dieter Rams)
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'out': 'cubic-bezier(0.33, 1, 0.68, 1)',
        'in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      letterSpacing: {
        'swiss': '0.05em',
        'wide': '0.1em',
      },
    },
  },
  plugins: [],
}
