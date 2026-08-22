import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './AccordionGallery.css'

const AccordionGallery = ({
  items = [],
  defaultIndex = 0,
  accentColor = '#d1ef65',
  overlayColor = '#06171d',
  textColor = '#ecede9',
  height = 126,
  gap = 8,
  radius = 8,
  expandRatio = 0.38,
  orientation = 'horizontal',
  duration = 0.55,
  ease = 'power3.out',
  parallax = 0.42,
  tilt = 4,
  stagger = 0.05,
  trigger = 'hover',
  showLabels = true,
  grayscale = false,
  className = ''
}) => {
  const rootRef = useRef(null)
  const panelRefs = useRef([])
  const mediaRefs = useRef([])
  const videoRefs = useRef([])
  const barRefs = useRef([])
  const textRefs = useRef([])
  const timelineRef = useRef(null)
  const firstRunRef = useRef(true)
  const mediaSizeRef = useRef(320)
  const vertical = orientation === 'vertical'
  const count = items.length
  const [active, setActive] = useState(Math.min(Math.max(defaultIndex, 0), Math.max(count - 1, 0)))
  const [activatedVideos, setActivatedVideos] = useState(() => new Set())
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  const applyLayout = useCallback((animate) => {
    const panels = panelRefs.current
    if (!panels.length || !count) return

    const ratio = Math.min(Math.max(expandRatio, 0.2), 0.9)
    const grow = count > 1 ? (ratio * (count - 1)) / (1 - ratio) : 1
    const mediaSize = mediaSizeRef.current

    timelineRef.current?.kill()
    const durationValue = animate && !prefersReduced ? duration : 0
    const timeline = gsap.timeline()

    panels.forEach((panel, index) => {
      if (!panel) return
      const isActive = index === active
      const media = mediaRefs.current[index]
      const bar = barRefs.current[index]
      const text = textRefs.current[index]
      const rotation = isActive ? 0 : index < active ? tilt : -tilt
      const rotationProps = vertical ? { rotateX: -rotation } : { rotateY: rotation }

      timeline.to(panel, {
        flexGrow: isActive ? grow : 1,
        ...rotationProps,
        duration: durationValue,
        ease
      }, 0)

      if (media) {
        const drift = Math.max(-1.5, Math.min(1.5, active - index))
        const shift = drift * parallax * mediaSize * 0.06
        const gray = grayscale ? (isActive ? 0 : 1) : 0
        timeline.to(media, {
          xPercent: -50,
          yPercent: -50,
          x: vertical ? 0 : isActive ? 0 : shift,
          y: vertical ? (isActive ? 0 : shift) : 0,
          '--ag-gray': gray,
          '--ag-dim': isActive ? 0 : 0.35,
          duration: durationValue,
          ease
        }, 0)
      }

      if (showLabels && bar && text) {
        if (isActive) {
          timeline.to([bar, text], {
            opacity: 1,
            x: 0,
            duration: durationValue,
            ease,
            stagger: prefersReduced ? 0 : stagger
          }, 0)
        } else {
          timeline.to([bar, text], {
            opacity: 0.72,
            x: 0,
            duration: durationValue * 0.6,
            ease
          }, 0)
        }
      }
    })

    timelineRef.current = timeline
  }, [active, count, duration, ease, expandRatio, grayscale, parallax, prefersReduced, showLabels, stagger, tilt, vertical])

  useEffect(() => {
    const element = rootRef.current
    if (!element || !count) return undefined

    const measure = () => {
      const rect = element.getBoundingClientRect()
      const total = vertical ? rect.height : rect.width
      const usable = Math.max(total - gap * (count - 1), 120)
      const size = Math.max(140, usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.22)
      mediaSizeRef.current = size
      element.style.setProperty('--ag-media-size', `${size}px`)
      applyLayout(!firstRunRef.current)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    return () => observer.disconnect()
  }, [applyLayout, count, expandRatio, gap, vertical])

  useEffect(() => {
    applyLayout(!firstRunRef.current)
    firstRunRef.current = false
  }, [applyLayout])

  const activateVideo = useCallback((index) => {
    if (!items[index]?.video) return
    setActivatedVideos((previous) => {
      if (previous.has(index)) return previous
      const next = new Set(previous)
      next.add(index)
      return next
    })
  }, [items])

  useEffect(() => {
    activateVideo(active)
    videoRefs.current.forEach((video, index) => {
      if (!video) return
      if (index === active) {
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    })
  }, [active, activateVideo, activatedVideos])

  useEffect(() => () => timelineRef.current?.kill(), [])

  if (!count) return null

  const handleEnter = (index) => {
    activateVideo(index)
    if (trigger === 'hover') setActive(index)
  }

  const handleClick = (index, event) => {
    activateVideo(index)
    if (index !== active) {
      event.preventDefault()
      setActive(index)
    }
  }

  const handleKeyDown = (index, event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault()
      const nextIndex = (index + 1) % count
      activateVideo(nextIndex)
      setActive(nextIndex)
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault()
      const nextIndex = (index - 1 + count) % count
      activateVideo(nextIndex)
      setActive(nextIndex)
    }
  }

  return (
    <div
      ref={rootRef}
      className={`accordion-gallery${vertical ? ' accordion-gallery--vertical' : ''}${className ? ` ${className}` : ''}`}
      style={{
        '--ag-accent': accentColor,
        '--ag-overlay': overlayColor,
        '--ag-text': textColor,
        '--ag-gap': `${gap}px`,
        '--ag-radius': `${radius}px`,
        height: vertical ? `${Math.round(height * 1.6)}px` : `${height}px`
      }}
      role="list"
      aria-label="精选作品展开画廊"
    >
      {items.map((item, index) => {
        const isActive = index === active
        const Tag = item.link ? 'a' : 'div'
        return (
          <Tag
            key={`${item.label || 'panel'}-${index}`}
            ref={(element) => { panelRefs.current[index] = element }}
            className={`ag-panel${isActive ? ' ag-panel--active' : ''}`}
            style={{ borderRadius: `${radius}px` }}
            href={item.link || undefined}
            onClick={(event) => handleClick(index, event)}
            onMouseEnter={() => handleEnter(index)}
            onFocus={() => setActive(index)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            role="listitem"
            tabIndex={0}
            aria-current={isActive ? 'true' : undefined}
            aria-label={item.label}
          >
            <span className="ag-panel__frame">
              <span className="ag-panel__media" ref={(element) => { mediaRefs.current[index] = element }}>
                {item.video && (isActive || activatedVideos.has(index)) ? (
                  <video
                    ref={(element) => { videoRefs.current[index] = element }}
                    poster={item.image}
                    autoPlay={isActive}
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    aria-label={item.alt || item.label || ''}
                  >
                    <source src={item.mobileVideo || item.video} type="video/mp4" media="(max-width: 760px)" />
                    <source src={item.video} type="video/mp4" media="(min-width: 761px)" />
                  </video>
                ) : (
                  <img src={item.image} alt={item.alt || item.label || ''} loading={index === active ? 'eager' : 'lazy'} decoding="async" draggable="false" />
                )}
              </span>
              <span className="ag-panel__overlay" aria-hidden="true" />
            </span>
            {showLabels && (
              <span className="ag-panel__label" aria-hidden="true">
                <span className="ag-panel__bar" ref={(element) => { barRefs.current[index] = element }} />
                <span className="ag-panel__text" ref={(element) => { textRefs.current[index] = element }}>
                  {item.label}
                </span>
              </span>
            )}
          </Tag>
        )
      })}
    </div>
  )
}

export default AccordionGallery
