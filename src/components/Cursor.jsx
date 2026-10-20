import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    document.documentElement.classList.add('has-cursor')

    const dot = dotRef.current
    const ring = ringRef.current
    const wrap = dot?.parentElement
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { x: target.x, y: target.y }
    let raf
    let hovering = false
    let moved = false

    const onMove = (e) => {
      target.x = e.clientX
      target.y = e.clientY
      if (!moved) {
        moved = true
        wrap?.classList.add('is-visible')
      }
      if (dot) dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`
      const hit = e.target.closest?.('a, button, [data-cursor]')
      const next = Boolean(hit)
      if (next !== hovering) {
        hovering = next
        ring?.classList.toggle('is-hover', hovering)
      }
      const label = hit?.getAttribute?.('data-cursor')
      if (label) ring?.setAttribute('data-label', label)
      else ring?.removeAttribute('data-label')
    }

    const onDown = () => {
      ring?.classList.add('is-down')
    }
    const onUp = () => {
      ring?.classList.remove('is-down')
    }

    const loop = () => {
      ringPos.x += (target.x - ringPos.x) * 0.14
      ringPos.y += (target.y - ringPos.y) * 0.14
      if (ring) {
        ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])

  return (
    <div className="cursor" aria-hidden="true">
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef}>
        <span className="cursor-label" />
      </div>
    </div>
  )
}
