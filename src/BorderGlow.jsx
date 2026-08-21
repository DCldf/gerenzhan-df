import { useCallback, useEffect, useRef } from 'react'
import './BorderGlow.css'

function parseHSL(value) {
  const match = value.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/)
  if (!match) return { h: 190, s: 80, l: 70 }
  return { h: Number(match[1]), s: Number(match[2]), l: Number(match[3]) }
}

function buildGlowVars(glowColor, intensity) {
  const { h, s, l } = parseHSL(glowColor)
  const base = `${h}deg ${s}% ${l}%`
  const opacities = [100, 60, 50, 40, 30, 20, 10]
  const keys = ['', '-60', '-50', '-40', '-30', '-20', '-10']
  return Object.fromEntries(opacities.map((opacity, index) => [
    `--glow-color${keys[index]}`,
    `hsl(${base} / ${Math.min(opacity * intensity, 100)}%)`,
  ]))
}

const gradientPositions = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%']
const gradientKeys = ['--gradient-one', '--gradient-two', '--gradient-three', '--gradient-four', '--gradient-five', '--gradient-six', '--gradient-seven']
const colorMap = [0, 1, 2, 0, 1, 2, 1]

function buildGradientVars(colors) {
  const vars = {}
  gradientPositions.forEach((position, index) => {
    const color = colors[Math.min(colorMap[index], colors.length - 1)]
    vars[gradientKeys[index]] = `radial-gradient(at ${position}, ${color} 0px, transparent 50%)`
  })
  vars['--gradient-base'] = `linear-gradient(${colors[0]} 0 100%)`
  return vars
}

function BorderGlow({
  children,
  className = '',
  edgeSensitivity = 30,
  glowColor = '190 80 70',
  backgroundColor = '#11191b',
  borderRadius = 12,
  glowRadius = 30,
  glowIntensity = 0.9,
  coneSpread = 25,
  colors = ['#62d6e8', '#d1ef65', '#738bff'],
  fillOpacity = 0.22,
}) {
  const cardRef = useRef(null)

  const getCenter = useCallback((element) => {
    const { width, height } = element.getBoundingClientRect()
    return [width / 2, height / 2]
  }, [])

  const getEdgeProximity = useCallback((element, x, y) => {
    const [cx, cy] = getCenter(element)
    const dx = x - cx
    const dy = y - cy
    const kx = dx === 0 ? Infinity : cx / Math.abs(dx)
    const ky = dy === 0 ? Infinity : cy / Math.abs(dy)
    return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1)
  }, [getCenter])

  const getCursorAngle = useCallback((element, x, y) => {
    const [cx, cy] = getCenter(element)
    const radians = Math.atan2(y - cy, x - cx)
    const degrees = radians * (180 / Math.PI) + 90
    return `${(degrees < 0 ? degrees + 360 : degrees).toFixed(3)}deg`
  }, [getCenter])

  const handlePointerMove = useCallback((event) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    card.style.setProperty('--edge-proximity', `${(getEdgeProximity(card, x, y) * 100).toFixed(3)}`)
    card.style.setProperty('--cursor-angle', getCursorAngle(card, x, y))
  }, [getCursorAngle, getEdgeProximity])

  useEffect(() => {
    const card = cardRef.current
    if (!card) return undefined
    const reset = () => {
      card.style.setProperty('--edge-proximity', '0')
    }
    card.addEventListener('pointerleave', reset)
    return () => card.removeEventListener('pointerleave', reset)
  }, [])

  return (
    <div
      ref={cardRef}
      className={`border-glow-card ${className}`}
      onPointerMove={handlePointerMove}
      style={{
        '--card-bg': backgroundColor,
        '--edge-sensitivity': edgeSensitivity,
        '--border-radius': `${borderRadius}px`,
        '--glow-padding': `${glowRadius}px`,
        '--cone-spread': coneSpread,
        '--fill-opacity': fillOpacity,
        ...buildGlowVars(glowColor, glowIntensity),
        ...buildGradientVars(colors),
      }}
    >
      <span className="edge-light" />
      <div className="border-glow-inner">{children}</div>
    </div>
  )
}

export default BorderGlow
