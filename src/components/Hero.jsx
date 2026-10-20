import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/scroll'

const BEANS = [
  { x: '8%', y: '18%', r: 24, d: 0 },
  { x: '86%', y: '26%', r: -38, d: 1.4 },
  { x: '16%', y: '80%', r: 68, d: 2.6 },
  { x: '82%', y: '76%', r: -14, d: 0.8 },
]

export default function Hero({ ready }) {
  const rootRef = useRef(null)
  const stageRef = useRef(null)
  const badgeRef = useRef(null)
  const swirlRef = useRef(null)
  const cupRef = useRef(null)
  const stirredRef = useRef(false)

  useEffect(() => {
    const stage = stageRef.current
    const badge = badgeRef.current
    const cup = cupRef.current
    const swirl = swirlRef.current
    if (!stage || !swirl) return

    let rot = 0
    let vel = 0
    let dragging = false
    let lastAngle = 0
    let raf = 0
    let alive = true

    const paint = () => {
      swirl.setAttribute('transform', `rotate(${rot} 100 100)`)
      if (cup) cup.style.setProperty('--tilt', `${Math.max(-2, Math.min(2, vel * 0.12))}deg`)
    }

    const loop = () => {
      if (!alive) return
      if (!dragging && Math.abs(vel) > 0.02) {
        rot += vel
        vel *= 0.955
        paint()
      }
      raf = requestAnimationFrame(loop)
    }

    const angleFrom = (e) => {
      const r = stage.getBoundingClientRect()
      const x = e.clientX - (r.left + r.width / 2)
      const y = e.clientY - (r.top + r.height / 2)
      return (Math.atan2(y, x) * 180) / Math.PI
    }

    const onDown = (e) => {
      dragging = true
      stage.classList.add('is-stirring')
      stage.setPointerCapture?.(e.pointerId)
      lastAngle = angleFrom(e)
      if (badge) badge.textContent = 'Diaduk'
    }

    const onMove = (e) => {
      const r = stage.getBoundingClientRect()
      if (badge) {
        badge.style.setProperty('--bx', `${e.clientX - r.left}px`)
        badge.style.setProperty('--by', `${e.clientY - r.top}px`)
      }
      if (!dragging) return
      const a = angleFrom(e)
      let delta = a - lastAngle
      if (delta > 180) delta -= 360
      if (delta < -180) delta += 360
      lastAngle = a
      rot += delta
      vel = delta * 0.55
      paint()
      if (!stirredRef.current && Math.abs(rot) > 260) {
        stirredRef.current = true
        stage.classList.add('is-stirred')
        if (badge) badge.textContent = 'Mantap'
      }
    }

    const onUp = () => {
      dragging = false
      stage.classList.remove('is-stirring')
      if (badge && !stirredRef.current) badge.textContent = 'Aduk'
    }

    const onEnter = () => stage.classList.add('is-hovering')
    const onLeave = () => {
      stage.classList.remove('is-hovering', 'is-stirring')
      if (badge) badge.textContent = stirredRef.current ? 'Nice' : 'Stir'
    }

    stage.addEventListener('pointerdown', onDown)
    stage.addEventListener('pointermove', onMove)
    stage.addEventListener('pointerup', onUp)
    stage.addEventListener('pointercancel', onUp)
    stage.addEventListener('pointerenter', onEnter)
    stage.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(loop)

    return () => {
      alive = false
      cancelAnimationFrame(raf)
      stage.removeEventListener('pointerdown', onDown)
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerup', onUp)
      stage.removeEventListener('pointercancel', onUp)
      stage.removeEventListener('pointerenter', onEnter)
      stage.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  useEffect(() => {
    if (!ready) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15, defaults: { ease: 'power4.out' } })

      tl.from('.hero-title .line > span', { yPercent: 118, duration: 1.15, stagger: 0.085 })
        .from('.hero-eyebrow', { y: 14, opacity: 0, duration: 0.7 }, 0.15)
        .from('.hero-lede', { y: 18, opacity: 0, duration: 0.8 }, 0.5)
        .from('.hero-actions > *', { y: 18, opacity: 0, duration: 0.7, stagger: 0.08 }, 0.62)
        .from('.hero-foot', { y: 14, opacity: 0, duration: 0.7 }, 0.8)
        .from('.cup-stage', { scale: 0.82, opacity: 0, duration: 1.3, ease: 'power3.out' }, 0.1)
        .from('.cup-stamp', { scale: 0.6, opacity: 0, rotate: -30, duration: 0.9, ease: 'back.out(1.8)' }, 0.85)

      gsap.to('.cup-stage', {
        yPercent: -9,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      const onLoad = () => ScrollTrigger.refresh()
      window.addEventListener('load', onLoad)
      return () => window.removeEventListener('load', onLoad)
    }, rootRef)

    return () => ctx.revert()
  }, [ready])

  return (
    <section className="hero" id="home" ref={rootRef}>
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow">
          <span className="live-dot" /> Karachi · Studi desain
        </p>
        <h1 className="hero-title">
          <span className="line">
            <span>Something</span>
          </span>
          <span className="line">
            <span>
              <em>enak</em> itu
            </span>
          </span>
          <span className="line">
            <span>sedang diseduh.</span>
          </span>
        </h1>
        <p className="hero-lede">
          LoopCoffeeClone (Version Mufqi) — studi ulang situs Loop Coffee Co.: empat outlet-nya buka di Bukhari, Phase 8, NN 5 Star dan NN Spar. Kopi enak, harga masuk akal.
        </p>
        <div className="hero-actions">
          <a className="btn red" href="#locations">
            Lihat Lokasi <span aria-hidden="true">→</span>
          </a>
          <a className="btn ghost" href="https://instagram.com/drinkloop.co" target="_blank" rel="noreferrer">
            Lihat @drinkloop.co <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="hero-foot">
          <span className="hero-live">
            <span className="live-dot" /> 4 outlet buka
          </span>
          <span className="hero-coords">24.8650° N · 67.0550° E</span>
          <a className="scroll-cue" href="#story" aria-label="Scroll to the loop">
            <span>Scroll</span>
            <i />
          </a>
        </div>
      </div>

      <div className="hero-visual">
        <div className="cup-stage" ref={stageRef} data-cursor="stir">
          {BEANS.map((b, i) => (
            <span
              key={i}
              className="bean"
              aria-hidden="true"
              style={{ left: b.x, top: b.y, '--r': `${b.r}deg`, '--d': `${b.d}s` }}
            >
              <i />
            </span>
          ))}

          <div className="saucer" aria-hidden="true" />
          <div className="saucer-ring" aria-hidden="true" />

          <div className="cup" ref={cupRef}>
            <span className="cup-handle" aria-hidden="true" />
            <div className="coffee">
              <svg className="surface" viewBox="0 0 200 200" role="img" aria-label="A cup of coffee. Drag to stir.">
                <defs>
                  <radialGradient id="brewGrad" cx="38%" cy="32%" r="78%">
                    <stop offset="0%" stopColor="#c88a56" />
                    <stop offset="38%" stopColor="#8a4f2a" />
                    <stop offset="74%" stopColor="#4a2714" />
                    <stop offset="100%" stopColor="#2a1309" />
                  </radialGradient>
                  <radialGradient id="cremaGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#d8a06a" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#a9673a" stopOpacity="0" />
                  </radialGradient>
                  <filter id="soft">
                    <feGaussianBlur stdDeviation="2.2" />
                  </filter>
                </defs>
                <circle cx="100" cy="100" r="98" fill="url(#brewGrad)" />
                <g ref={swirlRef} style={{ transformOrigin: '100px 100px' }}>
                  <circle cx="100" cy="100" r="88" fill="url(#cremaGrad)" opacity="0.55" filter="url(#soft)" />
                  <path
                    d="M100 100c14-8 30-2 32 10s-10 22-22 18-16-18-8-28 28-12 40-2 12 30 0 42-36 14-50 2-18-34-6-48 38-18 54-6 20 40 6 56-44 20-62 6"
                    fill="none"
                    stroke="#e4b484"
                    strokeOpacity="0.5"
                    strokeWidth="3.4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M100 100c-10 8-8 24 4 28s24-6 22-18-16-18-28-12-18 22-10 34 30 16 42 4 12-32 0-44-34-14-48-2"
                    fill="none"
                    stroke="#f2c79a"
                    strokeOpacity="0.28"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  <ellipse cx="74" cy="72" rx="16" ry="10" fill="#e9bd8f" opacity="0.22" filter="url(#soft)" />
                  <ellipse cx="132" cy="126" rx="22" ry="12" fill="#20100a" opacity="0.25" filter="url(#soft)" />
                </g>
                <circle cx="100" cy="100" r="98" fill="none" stroke="#1a0b05" strokeOpacity="0.55" strokeWidth="3" />
                <circle cx="100" cy="100" r="91" fill="none" stroke="#f5d5ae" strokeOpacity="0.18" strokeWidth="2" />
              </svg>
              <span className="cup-glint" aria-hidden="true" />
            </div>
          </div>

          <div className="stir-badge" ref={badgeRef} aria-hidden="true">
            Stir
          </div>

          <div className="cup-stamp" aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <defs>
                <path id="stampCircle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
              </defs>
              <text>
                <textPath href="#stampCircle" startOffset="0%">
                  LOOP COFFEE CO. · KARACHI · SINCE 2025 ·
                </textPath>
              </text>
            </svg>
            <span>∞</span>
          </div>

          <p className="cup-cap">
            <span>Move across the cup to stir it</span>
            <span className="cup-cap-arrow" aria-hidden="true">
              ↺
            </span>
          </p>
        </div>

        <div className="steam" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      </div>
    </section>
  )
}
