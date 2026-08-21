import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './Masonry.css'

const useMedia = (queries, values, defaultValue) => {
  const get = () => {
    if (typeof window === 'undefined') return defaultValue
    return values[queries.findIndex((query) => window.matchMedia(query).matches)] ?? defaultValue
  }

  const [value, setValue] = useState(get)

  useEffect(() => {
    const handler = () => setValue(get())
    const mediaQueries = queries.map((query) => window.matchMedia(query))
    mediaQueries.forEach((query) => query.addEventListener('change', handler))
    return () => mediaQueries.forEach((query) => query.removeEventListener('change', handler))
  }, [queries])

  return value
}

const useMeasure = () => {
  const ref = useRef(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    if (!ref.current) return undefined
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ width, height })
    })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return [ref, size]
}

const preloadImages = async (urls) => {
  await Promise.all(urls.map((src) => new Promise((resolve) => {
    const image = new Image()
    image.src = src
    image.onload = image.onerror = () => resolve()
  })))
}

const Masonry = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
  onItemClick
}) => {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [5, 4, 3, 2],
    1
  )
  const isMobileViewport = useMedia(['(max-width: 760px)'], [true], false)
  const [containerRef, { width }] = useMeasure()
  const [imagesReady, setImagesReady] = useState(false)
  const hasMounted = useRef(false)

  const getInitialPosition = (item) => {
    const containerRect = containerRef.current?.getBoundingClientRect()
    if (!containerRect) return { x: item.x, y: item.y }

    let direction = animateFrom
    if (animateFrom === 'random') {
      const directions = ['top', 'bottom', 'left', 'right']
      direction = directions[Math.floor(Math.random() * directions.length)]
    }

    if (direction === 'top') return { x: item.x, y: -200 }
    if (direction === 'bottom') return { x: item.x, y: window.innerHeight + 200 }
    if (direction === 'left') return { x: -200, y: item.y }
    if (direction === 'right') return { x: window.innerWidth + 200, y: item.y }
    if (direction === 'center') return { x: containerRect.width / 2 - item.w / 2, y: containerRect.height / 2 - item.h / 2 }
    return { x: item.x, y: item.y + 100 }
  }

  useEffect(() => {
    setImagesReady(false)
    preloadImages(items.map((item) => item.img).filter(Boolean)).then(() => setImagesReady(true))
  }, [items])

  const grid = useMemo(() => {
    if (!width) return []
    const columnHeights = new Array(columns).fill(0)
    const columnWidth = width / columns

    return items.map((child) => {
      const column = columnHeights.indexOf(Math.min(...columnHeights))
      const x = columnWidth * column
      const height = child.height / 2
      const y = columnHeights[column]
      columnHeights[column] += height
      return { ...child, x, y, w: columnWidth, h: height }
    })
  }, [columns, items, width])

  useLayoutEffect(() => {
    if (!imagesReady) return

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`
      const animationProps = { x: item.x, y: item.y, width: item.w, height: item.h }

      if (!hasMounted.current) {
        const initialPosition = getInitialPosition(item)
        gsap.fromTo(selector, {
          opacity: 0,
          x: initialPosition.x,
          y: initialPosition.y,
          width: item.w,
          height: item.h,
          ...(blurToFocus ? { filter: 'blur(10px)' } : {})
        }, {
          opacity: 1,
          ...animationProps,
          ...(blurToFocus ? { filter: 'blur(0px)' } : {}),
          duration: 0.8,
          ease: 'power3.out',
          delay: index * stagger
        })
      } else {
        gsap.to(selector, { ...animationProps, duration, ease, overwrite: 'auto' })
      }
    })

    hasMounted.current = true
  }, [blurToFocus, duration, ease, grid, imagesReady, stagger])

  const handleMouseEnter = (event, item) => {
    const element = event.currentTarget
    const selector = `[data-key="${item.id}"]`
    if (scaleOnHover) gsap.to(selector, { scale: hoverScale, duration: 0.3, ease: 'power2.out' })
    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay')
      if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.3 })
    }
  }

  const handleMouseLeave = (event, item) => {
    const element = event.currentTarget
    const selector = `[data-key="${item.id}"]`
    if (scaleOnHover) gsap.to(selector, { scale: 1, duration: 0.3, ease: 'power2.out' })
    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay')
      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 })
    }
  }

  return (
    <div ref={containerRef} className="list" role="list" aria-label="项目作品瀑布流">
      {grid.map((item) => (
        <button
          key={item.id}
          type="button"
          data-key={item.id}
          className="item-wrapper"
          onClick={() => onItemClick?.(item)}
          onMouseEnter={(event) => handleMouseEnter(event, item)}
          onMouseLeave={(event) => handleMouseLeave(event, item)}
          aria-label={item.alt || '查看作品'}
        >
          <span className="item-img" style={item.video ? undefined : { backgroundImage: `url(${item.img})` }}>
            {item.video && (
              <video poster={item.img} autoPlay={!isMobileViewport} loop muted playsInline preload={isMobileViewport ? 'none' : 'metadata'}>
                <source src={item.mobileVideo || item.video} type="video/mp4" media="(max-width: 760px)" />
                <source src={item.video} type="video/mp4" media="(min-width: 761px)" />
              </video>
            )}
            {colorShiftOnHover && <span className="color-overlay" />}
          </span>
        </button>
      ))}
    </div>
  )
}

export default Masonry
