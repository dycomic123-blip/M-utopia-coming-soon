/**
 * Movie Utopia - Title Design
 * 温度 + 反叛 + 高级审美 + 极简
 * 层叠融合式情感视觉 + 光影效果
 */

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import VideoModal from './components/showcase/VideoModal'

// 视频墙图片配置 - 包含图片路径、对应文字和视频路径
interface ImageItem {
  src: string
  text: string
  video: string
}

// 瀑布流卡片位置类型
interface CardPosition {
  left: number
  top: number
  width: number
  height: number
}

// 图片尺寸信息类型
interface ImageSize {
  src: string
  width: number
  height: number
  aspectRatio: number
}

// 预加载图片并获取尺寸
function preloadImages(images: ImageItem[]): Promise<ImageSize[]> {
  return Promise.all(
    images.map(
      (item) =>
        new Promise<ImageSize>((resolve) => {
          const img = new Image()
          img.onload = () => {
            resolve({
              src: item.src,
              width: img.naturalWidth,
              height: img.naturalHeight,
              aspectRatio: img.naturalWidth / img.naturalHeight,
            })
          }
          img.onerror = () => {
            // 加载失败时使用默认16:9比例
            resolve({
              src: item.src,
              width: 16,
              height: 9,
              aspectRatio: 16 / 9,
            })
          }
          img.src = item.src
        })
    )
  )
}

// 获取响应式列数
function getResponsiveColumns(width: number): number {
  if (width >= 1400) return 5
  if (width >= 1200) return 4
  if (width >= 992) return 4
  if (width >= 768) return 3
  return 2
}

// 瀑布流布局Hook
function useMasonryLayout(
  _items: ImageItem[],
  imageSizes: ImageSize[],
  containerRef: React.RefObject<HTMLDivElement>,
  gap: number = 16
) {
  const [positions, setPositions] = useState<CardPosition[]>([])
  const [containerHeight, setContainerHeight] = useState(0)
  const [columns, setColumns] = useState(5)

  const calculateLayout = useCallback(() => {
    if (!containerRef.current || imageSizes.length === 0) return

    const containerWidth = containerRef.current.offsetWidth
    const currentColumns = getResponsiveColumns(window.innerWidth)
    setColumns(currentColumns)

    const columnWidth = (containerWidth - gap * (currentColumns - 1)) / currentColumns
    const columnHeights = new Array(currentColumns).fill(0)
    const newPositions: CardPosition[] = []

    imageSizes.forEach((size) => {
      // 找到最短的列
      const minColumnIndex = columnHeights.indexOf(Math.min(...columnHeights))
      // 根据图片宽高比计算卡片高度
      const cardHeight = columnWidth / size.aspectRatio

      newPositions.push({
        left: minColumnIndex * (columnWidth + gap),
        top: columnHeights[minColumnIndex],
        width: columnWidth,
        height: cardHeight,
      })

      // 更新该列的高度
      columnHeights[minColumnIndex] += cardHeight + gap
    })

    setPositions(newPositions)
    setContainerHeight(Math.max(...columnHeights) - gap) // 减去最后一个gap
  }, [imageSizes, containerRef, gap])

  // 监听窗口大小变化
  useEffect(() => {
    calculateLayout()

    let resizeTimer: ReturnType<typeof setTimeout>
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(calculateLayout, 100)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimer)
    }
  }, [calculateLayout])

  return { positions, containerHeight, columns }
}

const IMAGE_CONFIG: ImageItem[] = [
  { src: '/assets/images/1.jpg', text: 'Les rendez-vous', video: '/assets/videos/1.mp4' },
  { src: '/assets/images/2.jpg', text: 'Pine head1', video: '/assets/videos/2.mp4' },
  { src: '/assets/images/3.jpg', text: 'Nap', video: '/assets/videos/3.mp4' },
  { src: '/assets/images/4.jpg', text: 'Underdogs', video: '/assets/videos/4.mp4' },
  { src: '/assets/images/5.jpg', text: 'Dune', video: '/assets/videos/5.mp4' },
  { src: '/assets/images/6.jpg', text: 'Pine head2', video: '/assets/videos/6.mp4' },
  { src: '/assets/images/7.jpg', text: 'Paths of glory', video: '/assets/videos/7.mp4' },
  { src: '/assets/images/8.jpg', text: 'Pine head3', video: '/assets/videos/8.mp4' },
  { src: '/assets/images/9.jpg', text: 'Joker', video: '/assets/videos/9.mp4' },
  { src: '/assets/images/10.jpg', text: 'The soprano', video: '/assets/videos/10.mp4' },
  { src: '/assets/images/11.jpg', text: 'Jurassic Park', video: '/assets/videos/11.mp4' },
  { src: '/assets/images/12.jpg', text: 'Pine head2', video: '/assets/videos/12.mp4' },
  { src: '/assets/images/13.jpg', text: 'Hua Yang Nian Hua', video: '/assets/videos/13.mp4' },
  { src: '/assets/images/14.jpg', text: 'Gemini', video: '/assets/videos/14.mp4' },
  { src: '/assets/images/15.jpg', text: 'Nostalgia', video: '/assets/videos/15.mp4' },
  { src: '/assets/images/16.jpg', text: 'Pine head4', video: '/assets/videos/16.mp4' },
  { src: '/assets/images/17.jpg', text: 'Arcane', video: '/assets/videos/17.mp4' },
  { src: '/assets/images/18.jpg', text: 'Carol', video: '/assets/videos/18.mp4' },
  { src: '/assets/images/19.jpg', text: 'Fury', video: '/assets/videos/19.mp4' },
  { src: '/assets/images/20.jpg', text: 'Aftermath', video: '/assets/videos/20.mp4' },
  { src: '/assets/images/21.jpg', text: 'Dr.Chamberlain', video: '/assets/videos/21.mp4' },
  { src: '/assets/images/22.jpg', text: 'Gladiator', video: '/assets/videos/22.mp4' },
  { src: '/assets/images/23.jpg', text: 'The new world', video: '/assets/videos/23.mp4' },
  { src: '/assets/images/24.jpg', text: 'Revolutionary road', video: '/assets/videos/24.mp4' },
  { src: '/assets/images/25.jpg', text: 'Yojimbo VS Gunsmoke', video: '/assets/videos/25.mp4' },
  { src: '/assets/images/26.jpg', text: 'The horse of Turin', video: '/assets/videos/26.mp4' },
  { src: '/assets/images/27.jpg', text: 'The white ribbon', video: '/assets/videos/27.mp4' },
  { src: '/assets/images/28.jpg', text: 'The wrestler', video: '/assets/videos/28.mp4' },
  { src: '/assets/images/29.jpg', text: 'Nanking Nanking', video: '/assets/videos/29.mp4' },
  { src: '/assets/images/30.jpg', text: 'Tree of life', video: '/assets/videos/30.mp4' },
  { src: '/assets/images/31.jpg', text: 'Egypt', video: '/assets/videos/31.mp4' },
  { src: '/assets/images/32.png', text: 'Fingerprints of Kubrick', video: '/assets/videos/32.mp4' },
]

// 打字机效果组件
function TypewriterText({ text, isActive }: { text: string; isActive: boolean }) {
  const [displayText, setDisplayText] = useState('')
  
  useEffect(() => {
    if (!isActive) {
      setDisplayText('')
      return
    }
    
    let i = 0
    setDisplayText('')
    
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, 50) // 50ms 每字符，速度较快
    
    return () => clearInterval(timer)
  }, [isActive, text])
  
  return <span>{displayText}</span>
}

// 3D 视频卡片组件
function VideoCard3D({ 
  src, 
  text, 
  onClickPlay,
  index,
  cardRef,
  style
}: { 
  src: string
  text: string
  onClickPlay: () => void
  index: number
  cardRef?: (el: HTMLDivElement | null) => void
  style?: React.CSSProperties
}) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div 
      className="video-card-3d"
      ref={cardRef}
      data-index={index}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClickPlay}
      style={style}
    >
      <div className="card-inner">
        {src && (
          <img
            src={src}
            alt="Film"
            loading="lazy"
          />
        )}
        {/* 黑白遮罩层 */}
        <div className="grayscale-overlay" />
        {/* View 图标 */}
        <div className="view-icon-overlay">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>
        {/* 文字覆盖层 */}
        <div className="text-overlay">
          <TypewriterText text={text} isActive={isHovered} />
        </div>
      </div>
    </div>
  )
}

// 经典电影名言库
const MOVIE_QUOTES = [
  "Conflict",
  "Emotion",
  "Theme",
  "Motif",
  "Climax",
  "Tension",
  "Vision",
  "Pacing",
  "Concept",
  "Metaphor"
]

// 浮现文字项类型
interface QuoteItem {
  id: number
  text: string
  x: number
  y: number
}

// 单个浮动文字组件 - 使用 JS 动画（缓慢浮现 + 快速消散）
function FloatingQuote({ quote }: { quote: QuoteItem }) {
  const [opacity, setOpacity] = useState(0)
  const [scale, setScale] = useState(0.8)
  const [blur, setBlur] = useState(4)
  
  useEffect(() => {
    const startTime = Date.now()
    const totalDuration = 3400 // 总时长 3.4 秒
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      
      if (elapsed < 2000) {
        // 0-2秒：opacity 从 0 缓慢到 0.5，blur 从 4 到 0
        const p = elapsed / 2000
        setOpacity(p * 0.5)
        setBlur(4 - p * 4)
      } else if (elapsed < 3000) {
        // 2-3秒：保持 opacity 0.5，blur 0
        setOpacity(0.5)
        setBlur(0)
      }
      
      if (elapsed < 3000) {
        // 0-3秒：scale 从 0.8 缓缓放大到 1
        const p = elapsed / 3000
        setScale(0.8 + p * 0.2)
      } else if (elapsed < 3400) {
        // 3-3.4秒：迅速放大至 2 倍，opacity 保持不变，blur 从 0 到 4
        const p = (elapsed - 3000) / 400
        setScale(1 + p * 1) // 1 -> 2
        setOpacity(0.5) // 保持 0.5 不变
        setBlur(p * 4) // 0 -> 4
      }
      
      if (elapsed < totalDuration) {
        requestAnimationFrame(animate)
      }
    }
    
    const animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [])
  
  return (
    <span style={{
      position: 'absolute',
      left: `${quote.x}%`,
      top: `${quote.y}%`,
      fontSize: '24px',
      fontWeight: 300,
      fontStyle: 'italic',
      color: `rgba(255, 255, 255, ${opacity})`,
      whiteSpace: 'nowrap',
      textShadow: '0 0 15px rgba(230, 57, 70, 0.3)',
      transform: `scale(${scale})`,
      transformOrigin: 'center center',
      filter: `blur(${blur}px)`
    }}>
      {quote.text}
    </span>
  )
}

// 滚动触发的浮现文字组件
function ScrollQuotes({ sectionRef }: { sectionRef: React.RefObject<HTMLElement> }) {
  const [quotes, setQuotes] = useState<QuoteItem[]>([])
  const lastScrollY = useRef(window.scrollY)
  
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return
      
      const rect = section.getBoundingClientRect()
      const isInView = rect.top < window.innerHeight && rect.bottom > 0
      
      if (!isInView) return
      
      const currentScrollY = window.scrollY
      const scrollDiff = Math.abs(currentScrollY - lastScrollY.current)
      
      if (scrollDiff > 15) {
        // 随机选择边缘位置（上、下、左、右）- 限定在四周窄边区域，避免与主体冲突
        const edge = Math.floor(Math.random() * 4)
        let x: number, y: number
        switch (edge) {
          case 0: // 上边缘
            x = Math.random() * 60 + 5   // 5%-65%（左侧偏移，避免右侧溢出）
            y = Math.random() * 8        // 0%-8%
            break
          case 1: // 下边缘
            x = Math.random() * 60 + 5   // 5%-65%
            y = 92 + Math.random() * 6   // 92%-98%
            break
          case 2: // 左边缘
            x = Math.random() * 6        // 0%-6%（更窄的边缘）
            y = Math.random() * 60 + 20  // 20%-80%
            break
          default: // 右边缘
            x = 88 + Math.random() * 6   // 88%-94%（更靠右但不超出）
            y = Math.random() * 60 + 20  // 20%-80%
            break
        }
        
        const newQuote: QuoteItem = {
          id: Date.now() + Math.random(),
          text: MOVIE_QUOTES[Math.floor(Math.random() * MOVIE_QUOTES.length)],
          x,
          y,
        }
        setQuotes(prev => [...prev.slice(-4), newQuote])
        lastScrollY.current = currentScrollY
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionRef])
  
  useEffect(() => {
    const cleanup = setInterval(() => {
      setQuotes(prev => prev.filter(q => Date.now() - q.id < 3400))
    }, 100)
    return () => clearInterval(cleanup)
  }, [])
  
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      overflow: 'visible',
      zIndex: 5
    }}>
      {quotes.map(q => (
        <FloatingQuote key={q.id} quote={q} />
      ))}
    </div>
  )
}

// 3D翻转摄影机装饰组件 - 使用 scaleX 模拟翻转
function RotatingCamera() {
  const [scaleX, setScaleX] = useState(1)
  const phaseRef = useRef(0)
  
  useEffect(() => {
    let animationId: number
    let lastTime = performance.now()
    
    const animate = (currentTime: number) => {
      const delta = currentTime - lastTime
      lastTime = currentTime
      // 3秒一个完整周期
      phaseRef.current = (phaseRef.current + delta / 3000) % 1
      // 使用 cos 函数实现平滑的 1 → 0 → 1 变化
      const scale = Math.abs(Math.cos(phaseRef.current * Math.PI))
      setScaleX(scale)
      animationId = requestAnimationFrame(animate)
    }
    
    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [])
  
  return (
    <div style={{
      position: 'absolute',
      right: '20px',
      top: '80px',
      width: '80px',
      height: '80px'
    }}>
      <div style={{
        width: '100%',
        height: '100%',
        transform: `scaleX(${scaleX})`,
        color: 'rgba(255, 255, 255, 0.3)'
      }}>
        <svg viewBox="0 0 100 100" fill="none" style={{ width: '100%', height: '100%' }}>
          <rect x="15" y="32" width="45" height="36" rx="4" fill="currentColor"/>
          <polygon points="60,36 80,22 80,78 60,64" fill="currentColor"/>
          <circle cx="35" cy="50" r="14" fill="none" stroke="currentColor" strokeWidth="4"/>
          <circle cx="35" cy="50" r="6" fill="currentColor"/>
          <circle cx="22" cy="26" r="9" fill="currentColor"/>
          <circle cx="22" cy="26" r="4" fill="#0A0A0A"/>
          <circle cx="50" cy="26" r="9" fill="currentColor"/>
          <circle cx="50" cy="26" r="4" fill="#0A0A0A"/>
          <rect x="28" y="68" width="16" height="8" rx="2" fill="currentColor"/>
        </svg>
      </div>
    </div>
  )
}

// 魔术棒装饰组件 - 以底部为锚点做角度摇摆
function RotatingWand() {
  const [angle, setAngle] = useState(0)
  const phaseRef = useRef(0)
  
  useEffect(() => {
    let animationId: number
    let lastTime = performance.now()
    
    const animate = (currentTime: number) => {
      const delta = currentTime - lastTime
      lastTime = currentTime
      // 2秒一个完整周期
      phaseRef.current = (phaseRef.current + delta / 2000) % 1
      // 使用 sin 函数实现平滑的 -10° → 10° → -10° 变化
      const rotation = Math.sin(phaseRef.current * Math.PI * 2) * 10
      setAngle(rotation)
      animationId = requestAnimationFrame(animate)
    }
    
    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [])
  
  return (
    <div style={{
      width: '60px',
      height: '60px',
      flexShrink: 0,
      marginTop: '-15px'
    }}>
      <div style={{
        width: '100%',
        height: '100%',
        transform: `rotate(${angle}deg)`,
        transformOrigin: 'bottom center',
        color: 'rgba(255, 255, 255, 0.3)'
      }}>
        <svg viewBox="0 0 100 100" fill="none" style={{ width: '100%', height: '100%' }}>
          {/* 魔术棒主体 */}
          <rect x="20" y="60" width="60" height="12" rx="2" fill="currentColor" transform="rotate(-45 50 66)"/>
          {/* 魔术棒顶端 */}
          <rect x="65" y="15" width="18" height="25" rx="3" fill="currentColor" transform="rotate(-45 74 27)"/>
          {/* 星星装饰 - 大星星 */}
          <polygon points="25,20 27,26 33,26 28,30 30,36 25,32 20,36 22,30 17,26 23,26" fill="currentColor"/>
          {/* 星星装饰 - 小星星1 */}
          <polygon points="15,45 16,48 19,48 17,50 18,53 15,51 12,53 13,50 11,48 14,48" fill="currentColor"/>
          {/* 星星装饰 - 小星星2 */}
          <polygon points="40,15 41,17 43,17 42,19 42,21 40,20 38,21 38,19 37,17 39,17" fill="currentColor"/>
          {/* 闪光效果 */}
          <circle cx="70" cy="25" r="3" fill="currentColor"/>
          <circle cx="80" cy="35" r="2" fill="currentColor"/>
          <circle cx="75" cy="18" r="2" fill="currentColor"/>
        </svg>
      </div>
    </div>
  )
}

// SNS社交网络装饰组件 - 周期性scale动效
function PulsingSNS() {
  const [scale, setScale] = useState(1)
  const phaseRef = useRef(0)
  
  useEffect(() => {
    let animationId: number
    let lastTime = performance.now()
    
    const animate = (currentTime: number) => {
      const delta = currentTime - lastTime
      lastTime = currentTime
      // 2.5秒一个完整周期
      phaseRef.current = (phaseRef.current + delta / 2500) % 1
      // 使用 sin 函数实现平滑的 0.85 -> 1.15 -> 0.85 变化
      const s = 1 + Math.sin(phaseRef.current * Math.PI * 2) * 0.15
      setScale(s)
      animationId = requestAnimationFrame(animate)
    }
    
    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [])
  
  return (
    <div style={{
      position: 'absolute',
      right: '20px',
      top: '80px',
      width: '80px',
      height: '80px'
    }}>
      <div style={{
        width: '100%',
        height: '100%',
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
        color: 'rgba(255, 255, 255, 0.3)'
      }}>
        <svg viewBox="0 0 100 100" fill="none" style={{ width: '100%', height: '100%' }}>
          {/* 中心节点 */}
          <circle cx="50" cy="50" r="12" fill="currentColor"/>
          {/* 连接线 */}
          <line x1="50" y1="50" x2="20" y2="25" stroke="currentColor" strokeWidth="2"/>
          <line x1="50" y1="50" x2="80" y2="25" stroke="currentColor" strokeWidth="2"/>
          <line x1="50" y1="50" x2="20" y2="75" stroke="currentColor" strokeWidth="2"/>
          <line x1="50" y1="50" x2="80" y2="75" stroke="currentColor" strokeWidth="2"/>
          <line x1="50" y1="50" x2="50" y2="15" stroke="currentColor" strokeWidth="2"/>
          {/* 周围节点 */}
          <circle cx="20" cy="25" r="8" fill="currentColor"/>
          <circle cx="80" cy="25" r="8" fill="currentColor"/>
          <circle cx="20" cy="75" r="8" fill="currentColor"/>
          <circle cx="80" cy="75" r="8" fill="currentColor"/>
          <circle cx="50" cy="15" r="8" fill="currentColor"/>
          {/* 小装饰点 */}
          <circle cx="35" cy="37" r="3" fill="currentColor"/>
          <circle cx="65" cy="37" r="3" fill="currentColor"/>
          <circle cx="35" cy="63" r="3" fill="currentColor"/>
          <circle cx="65" cy="63" r="3" fill="currentColor"/>
        </svg>
      </div>
    </div>
  )
}

// 特色功能翻转卡片组件
function FeatureFlipCard({ 
  image, 
  video, 
  title, 
  description,
  label = '01',
  decorationIcon
}: { 
  image: string
  video: string
  title: string
  description: string
  label?: string
  decorationIcon?: React.ReactNode
}) {
  const [showVideo, setShowVideo] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [_videoReady, setVideoReady] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  
  const handleClick = () => {
    if (isAnimating || showVideo) return
    setIsAnimating(true)
    
    // 立即开始预加载视频
    if (videoRef.current) {
      videoRef.current.load()
    }
    
    // 使用 GSAP 实现翻转动画
    const tl = gsap.timeline()
    
    // 第一阶段：图片收缩
    tl.to(mediaRef.current, {
      scaleX: 0,
      duration: 0.2,
      ease: 'power2.in'
    })
    // 第二阶段：图片展开（完成翻转效果）
    .to(mediaRef.current, {
      scaleX: 1,
      duration: 0.2,
      ease: 'power2.out',
      onComplete: () => {
        // 翻转完成后切换到视频并播放
        setShowVideo(true)
        setIsAnimating(false)
        if (videoRef.current) {
          videoRef.current.currentTime = 0
          videoRef.current.play()
        }
      }
    })
  }
  
  const handleVideoEnd = () => {
    setIsAnimating(true)
    
    const tl = gsap.timeline()
    
    // 视频收缩
    tl.to(mediaRef.current, {
      scaleX: 0,
      duration: 0.2,
      ease: 'power2.in'
    })
    // 视频展开（完成翻转效果）
    .to(mediaRef.current, {
      scaleX: 1,
      duration: 0.2,
      ease: 'power2.out',
      onComplete: () => {
        // 翻转完成后切换回图片
        setShowVideo(false)
        setIsAnimating(false)
      }
    })
  }
  
  // 视频加载完成回调
  const handleVideoCanPlay = () => {
    setVideoReady(true)
  }
  
  return (
    <div className="feature-card">
      {/* 左侧：媒体区域 */}
      <div className="media-container" onClick={handleClick}>
        <div ref={mediaRef} className="media-inner" style={{ position: 'relative' }}>
          {/* 图片始终存在，通过 opacity 控制可见性 */}
          <img 
            src={image} 
            alt={title}
            style={{
              opacity: showVideo ? 0 : 1,
              position: showVideo ? 'absolute' : 'relative',
              top: 0,
              left: 0,
              width: '100%',
              height: 'auto'
            }}
          />
          {/* 视频始终存在于 DOM，预加载，通过 opacity 控制可见性 */}
          <video 
            ref={videoRef} 
            onEnded={handleVideoEnd}
            onCanPlay={handleVideoCanPlay}
            muted
            playsInline
            preload="auto"
            style={{
              opacity: showVideo ? 1 : 0,
              position: showVideo ? 'relative' : 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: 'auto',
              pointerEvents: showVideo ? 'auto' : 'none'
            }}
          >
            <source src={video} type="video/mp4" />
          </video>
        </div>
      </div>
      {/* 右侧：文字说明 */}
      <div className="feature-text">
        <span className="feature-label">{label}</span>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="click-hint">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
          <span>Click to explore more</span>
        </div>
        {/* 装饰图标 - 默认使用旋转摄影机 */}
        {decorationIcon || <RotatingCamera />}
      </div>
    </div>
  )
}

// 特色功能翻转卡片组件 - 反向布局（右图左文字）
function FeatureFlipCardReverse({ 
  image, 
  flipImage, 
  title, 
  description,
  label = '02'
}: { 
  image: string
  flipImage: string
  title: string
  description: string
  label?: string
}) {
  const [showFlipped, setShowFlipped] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const mediaRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<number | null>(null)
  
  // 清理定时器
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])
  
  const handleClick = () => {
    if (isAnimating || showFlipped) return
    setIsAnimating(true)
    
    // 使用 GSAP 实现翻转动画
    const tl = gsap.timeline()
    
    // 第一阶段：图片收缩
    tl.to(mediaRef.current, {
      scaleX: 0,
      duration: 0.2,
      ease: 'power2.in'
    })
    // 第二阶段：图片展开到90%时切换图片
    .to(mediaRef.current, {
      scaleX: 0.9,
      duration: 0.16,
      ease: 'power2.out',
      onComplete: () => {
        // 在90%时切换到翻转图片
        setShowFlipped(true)
      }
    })
    // 第三阶段：继续展开到100%
    .to(mediaRef.current, {
      scaleX: 1,
      duration: 0.04,
      ease: 'power2.out',
      onComplete: () => {
        setIsAnimating(false)
        
        // 3秒后自动翻转回原图
        timerRef.current = window.setTimeout(() => {
          handleFlipBack()
        }, 3000)
      }
    })
  }
  
  const handleFlipBack = () => {
    if (isAnimating) return
    setIsAnimating(true)
    
    const tl = gsap.timeline()
    
    // 图片收缩
    tl.to(mediaRef.current, {
      scaleX: 0,
      duration: 0.2,
      ease: 'power2.in'
    })
    // 图片展开到90%时切换图片
    .to(mediaRef.current, {
      scaleX: 0.9,
      duration: 0.16,
      ease: 'power2.out',
      onComplete: () => {
        // 在90%时切换回原图
        setShowFlipped(false)
      }
    })
    // 继续展开到100%
    .to(mediaRef.current, {
      scaleX: 1,
      duration: 0.04,
      ease: 'power2.out',
      onComplete: () => {
        setIsAnimating(false)
      }
    })
  }
  
  return (
    <div className="feature-card-reverse">
      {/* 左侧：文字说明 */}
      <div className="feature-text-left">
        <span className="feature-label">{label}</span>
        <div className="title-with-icon">
          <RotatingWand />
          <h3>{title}</h3>
        </div>
        <p>{description}</p>
        <div className="click-hint">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
          <span>Click to explore more</span>
        </div>
      </div>
      {/* 右侧：媒体区域 */}
      <div className="media-container-right" onClick={handleClick}>
        <div ref={mediaRef} className="media-inner" style={{ position: 'relative' }}>
          {/* 原始图片 */}
          <img 
            src={image} 
            alt={title}
            style={{
              opacity: showFlipped ? 0 : 1,
              position: showFlipped ? 'absolute' : 'relative',
              top: 0,
              left: 0,
              width: '100%',
              height: 'auto'
            }}
          />
          {/* 翻转后的图片 */}
          <img 
            src={flipImage} 
            alt={`${title} - flipped`}
            style={{
              opacity: showFlipped ? 1 : 0,
              position: showFlipped ? 'relative' : 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: 'auto'
            }}
          />
        </div>
      </div>
    </div>
  )
}

// 样式定义
const heroStyles = `
  .video-wall-item {
    transition: filter 0.3s ease;
    position: relative;
    cursor: pointer;
  }
  .video-wall-item:hover {
    z-index: 10;
  }
  .video-wall-item img {
    transition: filter 0.4s ease, transform 0.3s ease;
    filter: grayscale(0.85) brightness(0.75);
  }
  .video-wall-item:hover img {
    filter: grayscale(0) brightness(1);
    transform: scale(1.05);
  }
  
  /* ===== 遮罩层 - hover 时透明度 100% -> 0% ===== */
  .video-wall-item .grayscale-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.15);
    opacity: 1;
    transition: opacity 0.4s ease;
    pointer-events: none;
    z-index: 2;
  }
  .video-wall-item:hover .grayscale-overlay {
    opacity: 0;
  }
  
  /* ===== View 图标覆盖层样式 ===== */
  .video-wall-item .view-icon-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 6;
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
    pointer-events: none;
  }
  .video-wall-item:hover .view-icon-overlay {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1);
  }
  .video-wall-item .view-icon-overlay svg {
    color: #FFFFFF;
    filter: drop-shadow(0 2px 8px rgba(0,0,0,0.6));
  }
  
  /* ===== 文字覆盖层样式 ===== */
  .video-wall-item .text-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 40%, transparent 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
    z-index: 5;
  }
  .video-wall-item:hover .text-overlay {
    opacity: 1;
  }
  .video-wall-item .text-overlay span {
    color: #FFFFFF;
    font-size: 42px;
    font-weight: 700;
    letter-spacing: 0.02em;
    line-height: 1.1;
    text-shadow: 0 2px 8px rgba(0,0,0,0.6);
    word-break: break-all;
    text-align: left;
  }
  
  /* ===== 3D 透视视频网格样式 ===== */
  
  /* 3D 容器 - 全宽展示 */
  .video-grid-container {
    width: 100%;
    max-width: none;
    margin: 0 auto;
    padding: 20px 24px 60px 24px;
    perspective: 1200px;
    perspective-origin: center center;
  }
  
  /* 3D 网格 - 瀑布流使用相对定位作为容器 */
  .video-grid-3d {
    position: relative;
    width: 100%;
    transform-style: preserve-3d;
    transition: transform 0.4s ease-out;
  }
  
  /* 3D 卡片 - 使用绝对定位 */
  .video-card-3d {
    position: absolute;
    cursor: pointer;
    transform-style: preserve-3d;
    transform: translateZ(0);
    opacity: 0;
    transition: transform 0.35s ease, box-shadow 0.35s ease, opacity 0.5s ease;
  }
  
  .video-card-3d .card-inner {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 8px 25px rgba(0,0,0,0.4);
    transition: box-shadow 0.35s ease;
  }
  
  .video-card-3d:hover {
    transform: translateZ(40px) scale(1.03);
    z-index: 10;
  }
  
  .video-card-3d:hover .card-inner {
    box-shadow: 0 20px 50px rgba(0,0,0,0.6);
  }
  
  .video-card-3d img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: filter 0.4s ease, transform 0.4s ease;
    filter: grayscale(0.8) brightness(0.75);
  }
  
  .video-card-3d:hover img {
    filter: grayscale(0) brightness(1);
    transform: scale(1.05);
  }
  
  /* 3D 卡片遮罩层 */
  .video-card-3d .grayscale-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.15);
    opacity: 1;
    transition: opacity 0.4s ease;
    pointer-events: none;
    z-index: 2;
  }
  
  .video-card-3d:hover .grayscale-overlay {
    opacity: 0;
  }
  
  /* 3D 卡片 View 图标 */
  .video-card-3d .view-icon-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 6;
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
    pointer-events: none;
  }
  
  .video-card-3d:hover .view-icon-overlay {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1);
  }
  
  .video-card-3d .view-icon-overlay svg {
    color: #FFFFFF;
    filter: drop-shadow(0 2px 10px rgba(0,0,0,0.7));
  }
  
  /* 3D 卡片文字覆盖层 */
  .video-card-3d .text-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
    z-index: 5;
  }
  
  .video-card-3d:hover .text-overlay {
    opacity: 1;
  }
  
  .video-card-3d .text-overlay span {
    color: #FFFFFF;
    font-size: 28px;
    font-weight: 700;
    letter-spacing: 0.02em;
    line-height: 1.2;
    text-shadow: 0 2px 12px rgba(0,0,0,0.9);
    word-break: break-word;
  }
  
  /* ===== 3D 网格响应式 ===== */
  
  /* 大屏幕 1200-1399px */
  @media (max-width: 1399px) {
    .video-grid-container {
      padding: 16px 20px 50px 20px;
    }
  }
  
  /* 中等屏幕 992-1199px */
  @media (max-width: 1199px) {
    .video-card-3d .text-overlay span {
      font-size: 24px;
    }
  }
  
  /* 平板 768-991px */
  @media (max-width: 991px) {
    .video-grid-container {
      padding: 12px 16px 40px 16px;
      perspective: 1000px;
    }
    .video-card-3d .text-overlay span {
      font-size: 20px;
    }
    .video-card-3d:hover {
      transform: translateZ(30px) scale(1.02);
    }
  }
  
  /* 小平板/大手机 576-767px */
  @media (max-width: 767px) {
    .video-grid-container {
      padding: 10px 12px 30px 12px;
      perspective: none; /* 移动端禁用透视 */
    }
    .video-grid-3d {
      transform: none !important; /* 禁用鼠标跟随倾斜 */
    }
    .video-card-3d:hover {
      transform: scale(1.02);
    }
    .video-card-3d .text-overlay span {
      font-size: 18px;
    }
  }
  
  /* 手机 < 576px */
  @media (max-width: 575px) {
    .video-grid-container {
      padding: 8px 8px 24px 8px;
    }
    .video-card-3d .card-inner {
      border-radius: 6px;
    }
    .video-card-3d .text-overlay {
      padding: 10px;
    }
    .video-card-3d .text-overlay span {
      font-size: 16px;
    }
    .video-card-3d:active {
      transform: scale(0.98);
    }
  }
  
  /* ===== 特色功能翻转卡片样式 ===== */
  .feature-section {
    background: #0A0A0A;
  }
  
  .feature-card {
    display: flex;
    gap: 60px;
    align-items: center;
  }
  
  .media-container {
    cursor: pointer;
    width: 60%;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .media-inner {
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    background: #0A0A0A;
    transform-origin: center center;
  }
  
  .media-inner img {
    width: 100%;
    height: auto;
    display: block;
  }
  
  .media-inner video {
    width: 100%;
    height: auto;
    display: block;
  }
  
  .feature-text {
    flex: 1;
    padding: 24px 0;
    position: relative;
  }
  
  .feature-text .feature-label {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.2em;
    color: #E63946;
    text-transform: uppercase;
    margin-bottom: 20px;
    display: block;
  }
  
  .feature-text h3 {
    font-size: 56px;
    font-weight: 700;
    color: #FFFFFF;
    margin: 0 0 24px 0;
    letter-spacing: -0.03em;
    line-height: 1.1;
  }
  
  .feature-text p {
    font-size: 20px;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.6);
    margin: 0 0 32px 0;
    max-width: 520px;
  }
  
  .feature-text .click-hint {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.4);
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .feature-text .click-hint svg {
    width: 16px;
    height: 16px;
    stroke: rgba(255, 255, 255, 0.4);
  }
  
  /* ===== 旋转摄影机装饰 ===== */
  .rotating-camera {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    width: 100px;
    height: 100px;
    color: rgba(255, 255, 255, 0.15);
  }
  
  .rotating-camera svg {
    width: 100%;
    height: 100%;
  }
  
  /* ===== 特色功能翻转卡片 - 反向布局 ===== */
  .feature-card-reverse {
    display: flex;
    flex-direction: row;
    gap: 60px;
    align-items: center;
    margin-top: 120px;
  }
  
  .media-container-right {
    cursor: pointer;
    width: 60%;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .feature-text-left {
    flex: 1;
    padding: 24px 0;
    position: relative;
  }
  
  .feature-text-left .feature-label {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.2em;
    color: #E63946;
    text-transform: uppercase;
    margin-bottom: 20px;
    margin-left: 110px;
    display: block;
  }
  
  .feature-text-left h3 {
    font-size: 56px;
    font-weight: 700;
    color: #FFFFFF;
    margin: 0 0 24px 0;
    letter-spacing: -0.03em;
    line-height: 1.1;
  }
  
  .feature-text-left p {
    font-size: 20px;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.6);
    margin: 0 0 32px 0;
    margin-left: 110px;
    max-width: 520px;
  }
  
  .feature-text-left .click-hint {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.4);
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: 110px;
  }
  
  .feature-text-left .click-hint svg {
    width: 16px;
    height: 16px;
    stroke: rgba(255, 255, 255, 0.4);
  }
  
  .feature-text-left .title-with-icon {
    display: flex;
    align-items: center;
    gap: 50px;
  }
  
  .feature-text-left .title-with-icon h3 {
    margin: 0 0 24px 0;
  }
  
  /* ===== 滚动触发浮现文字 ===== */
  .scroll-quotes {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: visible;
    z-index: 5;
  }
  
  .floating-quote {
    position: absolute;
    font-size: 28px;
    font-weight: 300;
    font-style: italic;
    color: rgba(255, 255, 255, 0.6);
    white-space: nowrap;
    text-shadow: 0 0 20px rgba(230, 57, 70, 0.3);
    letter-spacing: 0.02em;
  }
  
  /* ===== 锁定遮罩层样式 ===== */
  .lock-overlay {
    position: absolute;
    inset: 0;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    background: rgba(10, 10, 10, 0.7);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 20;
    pointer-events: all;
  }
  
  /* 锁定状态下禁止动画 */
  .video-wall-section.locked .row1-track,
  .video-wall-section.locked .row2-track {
    animation-play-state: paused !important;
  }
  
  /* 错误提示淡入动画 */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  /* ===== 移动端适配 ===== */
  @media (max-width: 768px) {
    /* 输入框区域 - 垂直布局 */
    .access-code-form {
      flex-direction: column !important;
      width: 100%;
      max-width: 280px;
    }
    .access-code-form input {
      width: 100% !important;
      box-sizing: border-box;
    }
    .access-code-form button {
      width: 100%;
    }
    
    /* 照片墙网格 - 减少列数 */
    .video-wall-item {
      min-width: 200px !important;
    }
    
    /* 轮播图项 - 移动端尺寸 */
    .carousel-item {
      width: 200px !important;
      height: 120px !important;
    }
    
    /* 特色功能卡片 - 垂直布局 */
    .feature-card {
      flex-direction: column !important;
      gap: 24px !important;
      padding: 0 20px;
    }
    .media-container {
      width: 100% !important;
    }
    .feature-text {
      width: 100% !important;
      padding: 0 !important;
    }
    
    /* 特色功能文字区域 */
    .feature-text h3 {
      font-size: 28px !important;
    }
    .feature-text p {
      font-size: 16px !important;
      max-width: 100% !important;
    }
    
    /* 旋转摄影机 - 移动端隐藏或缩小 */
    .rotating-camera {
      display: none;
    }
    
    /* 反向布局卡片 - 垂直布局 */
    .feature-card-reverse {
      flex-direction: column !important;
      gap: 24px !important;
      padding: 0 20px;
      margin-top: 60px !important;
    }
    .media-container-right {
      width: 100% !important;
    }
    .feature-text-left {
      width: 100% !important;
      padding: 0 !important;
    }
    .feature-text-left h3 {
      font-size: 28px !important;
    }
    .feature-text-left p {
      font-size: 16px !important;
      max-width: 100% !important;
    }
    
    /* 浮现文字 - 移动端缩小 */
    .floating-quote {
      font-size: 18px !important;
    }
  }
  
  @media (max-width: 480px) {
    /* 超小屏幕适配 */
    .carousel-item {
      width: 160px !important;
      height: 100px !important;
    }
    .feature-text h3 {
      font-size: 24px !important;
    }
    .feature-text-left h3 {
      font-size: 24px !important;
    }
    
    /* 浮现文字 - 超小屏幕 */
    .floating-quote {
      font-size: 14px !important;
    }
  }
`

function App() {
  const [introComplete, setIntroComplete] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  // ===== Beta 内测码解锁状态 =====
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [accessCode, setAccessCode] = useState('')
  const [showError, setShowError] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const titleContainerRef = useRef<HTMLDivElement>(null)
  const movieLettersRef = useRef<(HTMLSpanElement | null)[]>([])
  const utopiaLettersRef = useRef<(HTMLSpanElement | null)[]>([])
  const subtitleRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)

  // ===== 3D 视频墙 =====
  const videoGridRef = useRef<HTMLDivElement>(null)
  const masonryContainerRef = useRef<HTMLDivElement>(null)
  const videoCardsRef = useRef<(HTMLDivElement | null)[]>([])
  const [gridAnimated, setGridAnimated] = useState(false)
  
  // ===== 特色功能区域 =====
  const featureSectionRef = useRef<HTMLElement>(null)
  
  // ===== 瀑布流布局 =====
  const [imageSizes, setImageSizes] = useState<ImageSize[]>([])
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const { positions, containerHeight } = useMasonryLayout(
    IMAGE_CONFIG,
    imageSizes,
    masonryContainerRef,
    16 // gap
  )
  
  // 预加载图片尺寸
  useEffect(() => {
    preloadImages(IMAGE_CONFIG).then((sizes) => {
      setImageSizes(sizes)
      setImagesLoaded(true)
    })
  }, [])

  useEffect(() => {
    let tl: gsap.core.Timeline | null = null

    const timer = setTimeout(() => {
      const movieEls = movieLettersRef.current.filter(Boolean) as HTMLSpanElement[]
      const utopiaEls = utopiaLettersRef.current.filter(Boolean) as HTMLSpanElement[]
      const allLetters = [...movieEls, ...utopiaEls]
      
      if (allLetters.length === 0) return

      // ===== 初始状态 =====
      allLetters.forEach((el, i) => {
        gsap.set(el, { 
          opacity: 0, 
          y: 80 + (i % 5) * 20,
          rotation: (i % 2 === 0 ? -10 : 8)
        })
      })
      
      gsap.set(titleContainerRef.current, { y: 100, scale: 1.05 })
      gsap.set(subtitleRef.current, { opacity: 0, y: 20 })
      gsap.set(dividerRef.current, { scaleX: 0, transformOrigin: 'center center' })
      gsap.set(contentRef.current, { opacity: 0, y: 30 })
      gsap.set(scrollHintRef.current, { opacity: 0, y: 15 })

      // ===== 主时间线 =====
      tl = gsap.timeline({ 
        onComplete: () => {
          setIntroComplete(true)
          
          // U字母呼吸灯
          const uLetter = utopiaEls[0]
          if (uLetter) {
            gsap.to(uLetter, {
              opacity: 0.2,
              duration: 1.5,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1
            })
          }
        }
      })

      // 1. 字母螺旋阶梯出现
      tl.to(allLetters, {
        opacity: 1,
        y: 0,
        rotation: 0,
        duration: 1.2,
        ease: 'power2.out',
        stagger: { amount: 1.2, from: 'random' }
      }, 0.1)

      // 2. 标题容器上移
      .to(titleContainerRef.current, {
        y: 0,
        scale: 1,
        duration: 1.0,
        ease: 'power2.out'
      }, 0.8)

      // 3. 装饰线展开
      .to(dividerRef.current, {
        scaleX: 1,
        duration: 0.6,
        ease: 'power2.out'
      }, 2.0)

      // 5. 副标题淡入
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, 2.3)

      // 6. 内容区渐现
      .to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, 2.6)

      // 7. 滚动提示
      .to(scrollHintRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
      }, 3.0)

    }, 100)

    return () => {
      clearTimeout(timer)
      if (tl) tl.kill()
    }
  }, [])

  // ===== 3D 视频网格入场动画 =====
  useEffect(() => {
    // 等待图片加载完成且位置计算好
    if (gridAnimated || !imagesLoaded || positions.length === 0) return
    
    const cards = videoCardsRef.current.filter(Boolean) as HTMLDivElement[]
    if (cards.length === 0) return
    
    const container = videoGridRef.current
    if (!container) return
    
    // 先设置初始状态
    cards.forEach(card => {
      gsap.set(card, { opacity: 0, y: 40 })
    })
    
    // 使用 IntersectionObserver 检测网格区域进入视口
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !gridAnimated) {
            setGridAnimated(true)
            
            // 入场动画：从底部依次淡入上浮
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: {
                amount: 0.8,
                grid: 'auto',
                from: 'start'
              },
              ease: 'back.out(1.2)'
            })
            
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )
    
    observer.observe(container)
    
    return () => observer.disconnect()
  }, [gridAnimated, imagesLoaded, positions.length])

  // ===== 内测码验证函数 =====
  const handleJoin = () => {
    if (accessCode === 'shuzhiyuan1888') {
      setIsUnlocked(true)
      setShowError(false)
    } else {
      setShowError(true)
      // 3秒后自动隐藏错误提示
      setTimeout(() => setShowError(false), 3000)
    }
  }

  // 字母分割
  const movieLetters = 'MOVIE'.split('')
  const utopiaLetters = 'UTOPIA'.split('')

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#FAFAFA',
      fontFamily: '"Helvetica Neue", Helvetica, Inter, Arial, sans-serif'
    }}>
      {/* 注入动画样式 */}
      <style>{heroStyles}</style>

      {/* 入场遮罩层 */}
      {!introComplete && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'transparent',
          zIndex: 100,
          pointerEvents: 'all'
        }} />
      )}

      {/* ============ Hero Title Section - 深色背景 ============ */}
      <header 
        ref={heroRef}
        style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '80px 48px 48px',
          position: 'relative',
          overflow: 'hidden',
          background: `
            radial-gradient(ellipse 100% 80% at 50% 30%, rgba(230,57,70,0.15) 0%, transparent 50%),
            radial-gradient(ellipse 60% 50% at 20% 50%, rgba(230,57,70,0.08) 0%, transparent 50%),
            radial-gradient(ellipse 60% 50% at 80% 60%, rgba(230,57,70,0.06) 0%, transparent 50%),
            linear-gradient(180deg, #0A0A0A 0%, #141414 50%, #1A1A1A 100%)
          `
        }}
      >
        {/* ===== 背景视频 ===== */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            pointerEvents: 'none',
            userSelect: 'none'
          }}
        >
          <source src="/assets/videos/bg.mp4" type="video/mp4" />
        </video>

        {/* ===== 视频遮罩层（保证文字可读性） ===== */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(10, 10, 10, 0.6)',
          zIndex: 0,
          pointerEvents: 'none'
        }} />

        {/* ===== 氛围光点 ===== */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '15%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(230,57,70,0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          pointerEvents: 'none',
          zIndex: 1
        }} />
        <div style={{
          position: 'absolute',
          bottom: '25%',
          right: '10%',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(230,57,70,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(30px)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        {/* ===== 主标题区域 ===== */}
        <div 
          ref={titleContainerRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            zIndex: 3
          }}
        >
          {/* MOVIE */}
          <div style={{
            fontSize: 'clamp(20px, 3vw, 32px)',
            fontWeight: 700,
            letterSpacing: '0.25em',
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '8px',
            display: 'flex'
          }}>
            {movieLetters.map((letter, i) => (
              <span
                key={`movie-${i}`}
                ref={el => { movieLettersRef.current[i] = el }}
                style={{ display: 'inline-block' }}
              >
                {letter}
              </span>
            ))}
          </div>
          
          {/* UTOPIA - 主标题 */}
          <h1 style={{
            fontSize: 'clamp(60px, 12vw, 140px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 0.85,
            margin: 0,
            display: 'flex'
          }}>
            {utopiaLetters.map((letter, i) => (
              <span
                key={`utopia-${i}`}
                ref={el => { utopiaLettersRef.current[i] = el }}
                style={{ 
                  display: 'inline-block',
                  color: i === 0 ? '#E63946' : '#FFFFFF'
                }}
              >
                {letter}
              </span>
            ))}
          </h1>

          {/* 装饰线 */}
          <div 
            ref={dividerRef}
            style={{
              width: '120px',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
              marginTop: '24px',
              marginBottom: '18px'
            }}
          />

          {/* 副标题 */}
          <div 
            ref={subtitleRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '0.18em',
              color: 'rgba(255,255,255,0.5)',
              textTransform: 'uppercase'
            }}
          >
            <span>ALL FOR MOVIE</span>
            <span style={{ 
              color: '#E63946', 
              fontSize: '20px',
              lineHeight: 1,
              textShadow: '0 0 10px rgba(230,57,70,0.5)'
            }}>·</span>
            <span>ONLY FOR MOVIE</span>
          </div>

          {/* 内测码输入区域 */}
          {!isUnlocked && (
            <div className="access-code-container" style={{
              marginTop: '32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              width: '100%',
              padding: '0 20px',
              boxSizing: 'border-box'
            }}>
              <div className="access-code-form" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <input
                  type="text"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
                  placeholder="Access Code"
                  style={{
                    width: '200px',
                    padding: '12px 16px',
                    fontSize: '14px',
                    letterSpacing: '0.05em',
                    color: '#FFFFFF',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '6px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease, background-color 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(230, 57, 70, 0.6)'
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                  }}
                />
                <button
                  onClick={handleJoin}
                  style={{
                    padding: '12px 24px',
                    fontSize: '14px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    color: '#FFFFFF',
                    backgroundColor: '#E63946',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease, transform 0.1s ease',
                    textTransform: 'uppercase'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#d62839'
                    e.currentTarget.style.transform = 'scale(1.02)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#E63946'
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                >
                  Join
                </button>
              </div>
              {/* 错误提示 */}
              {showError && (
                <p style={{
                  fontSize: '13px',
                  color: '#E63946',
                  margin: 0,
                  animation: 'fadeIn 0.3s ease'
                }}>
                  Invalid access code. Please try again.
                </p>
              )}
            </div>
          )}
        </div>

        {/* 滚动提示 */}
        <div 
          ref={scrollHintRef}
          style={{
            position: 'absolute',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            zIndex: 3
          }}
        >
          <span style={{
            fontSize: '10px',
            letterSpacing: '0.15em',
            color: 'rgba(255,255,255,0.4)',
            textTransform: 'uppercase'
          }}>
            Scroll
          </span>
          <div style={{
            width: '1px',
            height: '28px',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 100%)'
          }} />
        </div>
      </header>

      {/* Main Content */}
      <main ref={contentRef}>
        {/* ========== 3D 透视视频网格 ========== */}
        <section 
          className={`video-wall-section video-grid-section${!isUnlocked ? ' locked' : ''}`}
          style={{ 
            padding: '0',
            width: '100vw',
            marginLeft: 'calc(-50vw + 50%)',
            overflow: 'hidden',
            background: '#0A0A0A',
            position: 'relative'
          }}
        >
          {/* 3D 网格容器 */}
          <div 
            className="video-grid-container" 
            ref={(el) => {
              (videoGridRef as React.MutableRefObject<HTMLDivElement | null>).current = el
              ;(masonryContainerRef as React.MutableRefObject<HTMLDivElement | null>).current = el
            }}
            onMouseMove={(e) => {
              // 仅桌面端启用鼠标跟随倾斜
              if (window.innerWidth <= 767) return
              const rect = e.currentTarget.getBoundingClientRect()
              const centerX = rect.width / 2
              const centerY = rect.height / 2
              const mouseX = e.clientX - rect.left
              const mouseY = e.clientY - rect.top
              
              // 计算倾斜角度 (最大 ±3 度)
              const rotateY = ((mouseX - centerX) / centerX) * 3
              const rotateX = ((centerY - mouseY) / centerY) * 3
              
              const grid = e.currentTarget.querySelector('.video-grid-3d') as HTMLElement
              if (grid) {
                grid.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
              }
            }}
            onMouseLeave={(e) => {
              const grid = e.currentTarget.querySelector('.video-grid-3d') as HTMLElement
              if (grid) {
                grid.style.transform = 'rotateX(0deg) rotateY(0deg)'
              }
            }}
          >
            <div 
              className="video-grid-3d"
              style={{ height: containerHeight > 0 ? containerHeight : 'auto' }}
            >
              {imagesLoaded && positions.length > 0 ? (
                IMAGE_CONFIG.map((item, index) => (
                  <VideoCard3D
                    key={`card-${index}`}
                    src={item.src}
                    text={item.text}
                    onClickPlay={() => setSelectedVideo(item.video)}
                    index={index}
                    cardRef={(el) => { videoCardsRef.current[index] = el }}
                    style={{
                      position: 'absolute',
                      left: positions[index]?.left ?? 0,
                      top: positions[index]?.top ?? 0,
                      width: positions[index]?.width ?? 'auto',
                      height: positions[index]?.height ?? 'auto',
                    }}
                  />
                ))
              ) : (
                // 加载中占位
                <div style={{ 
                  height: '400px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.5)'
                }}>
                  Loading...
                </div>
              )}
            </div>
          </div>

          {/* 底部渐变遮罩 - 与下方区域融合 */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '80px',
            background: 'linear-gradient(to top, #0A0A0A 0%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 10
          }} />

          {/* 锁定遮罩层 */}
          {!isUnlocked && (
            <div className="lock-overlay">
              {/* 锁图标 */}
              <svg 
                width="80" 
                height="80" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="rgba(255, 255, 255, 0.6)" 
                strokeWidth="1.5"
                style={{ marginBottom: '24px' }}
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              {/* 提示文字 */}
              <p style={{
                fontSize: '16px',
                fontWeight: 500,
                letterSpacing: '0.05em',
                color: 'rgba(255, 255, 255, 0.7)',
                margin: 0,
                textAlign: 'center'
              }}>
                Enter the beta code to unlock the content.
              </p>
            </div>
          )}
        </section>

        {/* ========== 特色功能区域 ========== */}
        <section 
          ref={featureSectionRef}
          className="feature-section"
          style={{
            background: '#0A0A0A',
            width: '100vw',
            marginLeft: 'calc(-50vw + 50%)',
            padding: '60px 0 120px 0',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* 滚动触发的浮现文字 */}
          <ScrollQuotes sectionRef={featureSectionRef} />
          
          {/* 氛围光点 */}
          <div style={{
            position: 'absolute',
            top: '10%',
            right: '8%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(230,57,70,0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            pointerEvents: 'none',
            zIndex: 1
          }} />
          <div style={{
            position: 'absolute',
            bottom: '20%',
            left: '5%',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(230,57,70,0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            pointerEvents: 'none',
            zIndex: 1
          }} />

          <div style={{
            maxWidth: '1600px',
            margin: '0 auto',
            padding: '0 48px',
            position: 'relative',
            zIndex: 3
          }}>
            <p style={{
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.25em',
              color: '#E63946',
              marginBottom: '80px',
              textTransform: 'uppercase'
            }}>
              Features
            </p>
            
            {/* 特色功能 1 - 翻转卡片 */}
            <FeatureFlipCard
              image="/assets/images/func1.jpg"
              video="/assets/videos/func1.mp4"
              label="01"
              title="Step Into Your Imagination"
              description="Transform your creative vision into a fully explorable, interactive environment."
            />
            
            {/* 特色功能 2 - 反向翻转卡片 */}
            <FeatureFlipCardReverse
              image="/assets/images/func2.png"
              flipImage="/assets/images/func2-flip.jpg"
              label="02"
              title="Unfold Your Full Story"
              description="Transform your vision into a complete, cinema-quality feature. No cuts, just seamless storytelling."
            />
            
            {/* 特色功能 3 - 社区 */}
            <div style={{ marginTop: '120px' }}>
              <FeatureFlipCard
                image="/assets/images/func3.jpg"
                video="/assets/videos/func3.mp4"
                label="03"
                title="Connect With Creators"
                description="Join a vibrant community of filmmakers and storytellers. Share your work, discover inspiration, and collaborate with creators worldwide."
                decorationIcon={<PulsingSNS />}
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{
        padding: '48px',
        borderTop: '1px solid #E5E5E5',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <p style={{ 
          fontSize: '11px', 
          color: '#6B6B6B',
          letterSpacing: '0.1em'
        }}>
          © 2026 MOVIE UTOPIA
        </p>
        <p style={{ 
          fontSize: '11px', 
          color: '#6B6B6B',
          letterSpacing: '0.15em'
        }}>
          ALL FOR MOVIE <span style={{ color: '#E63946' }}>·</span> ONLY FOR MOVIE
        </p>
      </footer>

      {/* Video Modal for Video Wall */}
      <VideoModal
        videoSrc={selectedVideo || ''}
        isOpen={selectedVideo !== null}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  )
}

export default App
