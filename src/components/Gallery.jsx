import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/scroll'
import { gallery } from '../data'

export default function Gallery() {
  const rootRef = useRef(null)
  const stageRef = useRef(null)
  const ringRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const rotRef = useRef(0)

  useEffect(() => {
    const stage = stageRef.current
    const ring = ringRef.current
    if (!stage || !ring) return

    const count = gallery.length
    const stepAngle = 360 / count
    let radius = 340
    let cardW = 230

    const size = () => {
      const w = stage.clientWidth
      cardW = w < 640 ? 148 : w < 1000 ? 190 : 236
      radius = Math.max(260, (cardW / 2 / Math.tan(Math.PI / count)) * 1.45 + 30)
      ring.style.setProperty('--cw', `${cardW}px`)
      ring.style.setProperty('--r', `${radius}px`)
      ring.style.setProperty('--step', `${stepAngle}deg`)
      paint()
    }

    let raf
    let draggingNow = false
    let hovering = false
    let lastX = 0
    let vel = 0
    let alive = true

    const paint = () => {
      ring.style.transform = `translateZ(-${radius}px) rotateY(${rotRef.current}deg)`
    }

    const loop = () => {
      if (!alive) return
      if (!draggingNow && !hovering) {
        rotRef.current += 0.055
      }
      if (!draggingNow && Math.abs(vel) > 0.02) {
        rotRef.current += vel
        vel *= 0.94
      }
      paint()
      raf = requestAnimationFrame(loop)
    }

    const onDown = (e) => {
      draggingNow = true
      setDragging(true)
      lastX = e.clientX
      stage.setPointerCapture?.(e.pointerId)
    }

    const onMove = (e) => {
      if (!draggingNow) return
      const dx = e.clientX - lastX
      lastX = e.clientX
      rotRef.current += dx * 0.28
      vel = dx * 0.28
      paint()
    }

    const onUp = () => {
      draggingNow = false
      setDragging(false)
    }

    const onEnter = () => {
      hovering = true
    }
    const onLeave = () => {
      hovering = false
      draggingNow = false
      setDragging(false)
    }

    stage.addEventListener('pointerdown', onDown)
    stage.addEventListener('pointermove', onMove)
    stage.addEventListener('pointerup', onUp)
    stage.addEventListener('pointercancel', onUp)
    stage.addEventListener('pointerenter', onEnter)
    stage.addEventListener('pointerleave', onLeave)

    size()
    window.addEventListener('resize', size)
    raf = requestAnimationFrame(loop)

    const ctx = gsap.context(() => {
      gsap.from('.gal-head .line > span', {
        yPercent: 110,
        duration: 1,
        stagger: 0.08,
        ease: 'power4.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 68%' },
      })
    }, rootRef)

    return () => {
      alive = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', size)
      stage.removeEventListener('pointerdown', onDown)
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerup', onUp)
      stage.removeEventListener('pointercancel', onUp)
      stage.removeEventListener('pointerenter', onEnter)
      stage.removeEventListener('pointerleave', onLeave)
      ctx.revert()
    }
  }, [])

  const nudge = (dir) => {
    rotRef.current += (360 / gallery.length) * dir
  }

  return (
    <section className="gallery" id="gallery" ref={rootRef}>
      <div className="grain" aria-hidden="true" />
      <div className="gal-head">
        <p className="eyebrow is-light">
          <span className="live-dot" /> @drinkloop.co · 47K
        </p>
        <h2 className="display">
          <span className="line">
            <span>
              Straight from <em>the feed.</em>
            </span>
          </span>
        </h2>
        <div className="gal-side">
          <p>The bar, the team, the cups: straight from Loop&apos;s Instagram. Drag the ring, or just keep scrolling.</p>
          <a className="btn light" href="https://instagram.com/drinkloop.co" target="_blank" rel="noreferrer">
            Follow @drinkloop.co <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <div
        className={`carousel${dragging ? ' is-dragging' : ''}`}
        ref={stageRef}
        data-cursor="drag"
        aria-label="Instagram photo carousel. Drag to turn."
      >
        <div className="carousel-ring" ref={ringRef}>
          {gallery.map((g, i) => (
            <a
              className="carousel-card"
              key={g.src + i}
              href="https://instagram.com/drinkloop.co"
              target="_blank"
              rel="noreferrer"
              style={{ '--i': i }}
              onPointerDown={(e) => e.preventDefault()}
            >
              <img src={g.src} alt={g.caption} loading="lazy" draggable="false" />
              <span className="carousel-shade" />
              <span className="carousel-meta">
                <small>{g.meta}</small>
                <b>{g.caption}</b>
              </span>
              <span className="carousel-index">0{i + 1}</span>
            </a>
          ))}
        </div>
        <div className="carousel-badge" aria-hidden="true">
          <span>Drag</span>
          <span>to turn</span>
          <i>↺</i>
        </div>
        <div className="carousel-controls">
          <button type="button" onClick={() => nudge(-1)} aria-label="Previous photos">
            ←
          </button>
          <span>{gallery.length} frames · ∞ loop</span>
          <button type="button" onClick={() => nudge(1)} aria-label="Next photos">
            →
          </button>
        </div>
      </div>

      <p className="gal-note">Photos from @drinkloop.co · loop to supply full-size originals.</p>
    </section>
  )
}
