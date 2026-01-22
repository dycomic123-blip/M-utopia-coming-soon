/**
 * Movie Utopia - Title Design
 * 温度 + 反叛 + 高级审美 + 极简
 * 层叠融合式情感视觉 + 光影效果
 */

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import VideoModal from './components/showcase/VideoModal'

// 视频墙图片配置 - 包含图片路径、对应文字和视频路径
interface ImageItem {
  src: string
  text: string
  video: string
}

const IMAGE_CONFIG: ImageItem[] = [
  { src: '/assets/images/1.jpg', text: 'Les rendez-vous', video: '/assets/videos/1.mp4' },
  { src: '/assets/images/2.jpg', text: 'Pine head1', video: '/assets/videos/2.mp4' },
  { src: '/assets/images/3.jpg', text: 'Nap', video: '/assets/videos/3.mp4' },
  { src: '/assets/images/4.jpg', text: 'Underdogs', video: '/assets/videos/4.mp4' },
  { src: '/assets/images/5.jpg', text: 'Dune', video: '/assets/videos/5.mp4' },
  { src: '/assets/images/6.jpg', text: 'Pine head2', video: '/assets/videos/6.mp4' },
  { src: '/assets/images/7.jpg', text: 'Paths of glory', video: '/assets/videos/7.mp4' },
  { src: '/assets/images/8.jpg', text: 'Pine head1', video: '/assets/videos/8.mp4' },
  { src: '/assets/images/9.jpg', text: 'Joker', video: '/assets/videos/9.mp4' },
  { src: '/assets/images/10.jpg', text: 'The soprano', video: '/assets/videos/10.mp4' },
  { src: '/assets/images/11.jpg', text: 'Jurassic Park', video: '/assets/videos/11.mp4' },
  { src: '/assets/images/12.jpg', text: 'Pine head2', video: '/assets/videos/12.mp4' },
  { src: '/assets/images/13.jpg', text: 'Hua Yang Nian Hua', video: '/assets/videos/13.mp4' },
  { src: '/assets/images/14.jpg', text: 'Gemini', video: '/assets/videos/14.mp4' },
  { src: '/assets/images/15.jpg', text: 'Nostalgia', video: '/assets/videos/15.mp4' },
  { src: '/assets/images/16.jpg', text: 'Pine head2', video: '/assets/videos/16.mp4' },
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

// 辅助函数：根据图片路径获取配置
const getImageConfig = (src: string): ImageItem => {
  return IMAGE_CONFIG.find(item => item.src === src) || { src, text: '', video: '' }
}

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

// 视频墙卡片组件
function VideoWallCard({ src, text, onClickPlay }: { src: string; text: string; onClickPlay: () => void }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div 
      className="inner video-wall-item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClickPlay}
    >
      {src && (
        <img
          src={src}
          alt="Film"
        />
      )}
      {/* 黑白遮罩层 - hover 时从 100% 变到 0% */}
      <div className="grayscale-overlay" />
      {/* View 图标 - hover 时显示 */}
      <div className="view-icon-overlay">
        <svg
          width="32"
          height="32"
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
  )
}

// 特色功能翻转卡片组件
function FeatureFlipCard({ 
  image, 
  video, 
  title, 
  description,
  label = '01'
}: { 
  image: string
  video: string
  title: string
  description: string
  label?: string
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
    filter: grayscale(1) brightness(0.75);
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
  
  /* ===== 视频墙传送带动画 - 无缝循环 ===== */
  @keyframes slideRight {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0%); }
  }
  
  @keyframes slideLeft {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  }
  
  .row1-track {
    display: flex !important;
    width: 200% !important;
    animation: slideRight 50s linear infinite !important;
    will-change: transform;
  }
  
  .row2-track {
    display: flex !important;
    width: 200% !important;
    animation: slideLeft 50s linear infinite !important;
    will-change: transform;
  }
  
  /* hover整个视频墙区域时，两行都暂停 */
  .video-wall-section:hover .row1-track,
  .video-wall-section:hover .row2-track {
    animation-play-state: paused !important;
  }
  
  .carousel-item {
    flex: 0 0 calc(100% / 12) !important;
    padding: 0;
    box-sizing: border-box;
  }
  
  .carousel-item .inner {
    aspect-ratio: 16/9;
    overflow: hidden;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
  }
  
  .carousel-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: filter 0.4s ease, transform 0.3s ease;
    filter: grayscale(1) brightness(0.75);
  }
  
  .carousel-item:hover img {
    filter: grayscale(0) brightness(1);
    transform: scale(1.05);
  }
  
  /* ===== 特色功能翻转卡片样式 ===== */
  .feature-section {
    background: #0A0A0A;
  }
  
  .feature-card {
    display: flex;
    gap: 80px;
    align-items: center;
  }
  
  .media-container {
    cursor: pointer;
    width: 55%;
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
    font-size: 48px;
    font-weight: 700;
    color: #FFFFFF;
    margin: 0 0 24px 0;
    letter-spacing: -0.03em;
    line-height: 1.1;
  }
  
  .feature-text p {
    font-size: 18px;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.6);
    margin: 0 0 32px 0;
    max-width: 480px;
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

  // ===== 视频墙传送带状态 - 简单分组循环设计 =====
  // 将所有图片分成两组，每组内部独立循环滚动
  const totalImages = IMAGE_CONFIG.length
  const row1Count = Math.floor(totalImages / 2)  // 16
  const row2Count = Math.ceil(totalImages / 2)   // 16
  
  // 第一组：索引 0 到 row1Count-1
  const row1Images = IMAGE_CONFIG.slice(0, row1Count).map(item => item.src)
  // 第二组：索引 row1Count 到末尾
  const row2Images = IMAGE_CONFIG.slice(row1Count).map(item => item.src)
  
  // 为了实现无缝循环，每组图片复制一份拼接
  const row1LoopImages = [...row1Images, ...row1Images]
  const row2LoopImages = [...row2Images, ...row2Images]

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
            <div style={{
              marginTop: '32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
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
        {/* ========== 视频墙 - 传送带循环滚动 ========== */}
        <section 
          className={`video-wall-section${!isUnlocked ? ' locked' : ''}`}
          style={{ 
            padding: '0',
            width: '100vw',
            marginLeft: 'calc(-50vw + 50%)',
            overflow: 'hidden',
            background: '#0A0A0A',
            position: 'relative'
          }}
        >
          {/* 第一行 - 向右滚动，内部循环 */}
          <div style={{ overflow: 'hidden', '--items-per-group': row1Count } as React.CSSProperties}>
            <div className="row1-track">
              {row1LoopImages.map((src, i) => {
                const config = getImageConfig(src)
                return (
                  <div key={`row1-${i}-${src}`} className="carousel-item">
                    <VideoWallCard 
                      src={config.src} 
                      text={config.text} 
                      onClickPlay={() => setSelectedVideo(config.video)}
                    />
                  </div>
                )
              })}
            </div>
          </div>
          
          {/* 第二行 - 向左滚动，内部循环 */}
          <div style={{ overflow: 'hidden', '--items-per-group': row2Count } as React.CSSProperties}>
            <div className="row2-track">
              {row2LoopImages.map((src, i) => {
                const config = getImageConfig(src)
                return (
                  <div key={`row2-${i}-${src}`} className="carousel-item">
                    <VideoWallCard 
                      src={config.src} 
                      text={config.text} 
                      onClickPlay={() => setSelectedVideo(config.video)}
                    />
                  </div>
                )
              })}
            </div>
          </div>
          
          {/* 左侧渐变遮罩 */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '240px',
            height: '100%',
            background: 'linear-gradient(to right, #0A0A0A 0%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 10
          }} />

          {/* 右侧渐变遮罩 */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '240px',
            height: '100%',
            background: 'linear-gradient(to left, #0A0A0A 0%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 10
          }} />

          {/* 底部渐变遮罩 */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '80px',
            background: 'linear-gradient(to top, #0A0A0A 0%, transparent 100%)',
            pointerEvents: 'none'
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
          className="feature-section"
          style={{
            background: '#0A0A0A',
            width: '100vw',
            marginLeft: 'calc(-50vw + 50%)',
            padding: '120px 0',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
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

          {/* 顶部渐变过渡 */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100px',
            background: 'linear-gradient(to bottom, #0A0A0A 0%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 2
          }} />

          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 64px',
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
              label=""
              title="Step Into Your Imagination"
              description="Transform your creative vision into a fully explorable, interactive environment."
            />
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
