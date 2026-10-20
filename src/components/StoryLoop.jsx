import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, getLenis } from '../lib/scroll'
import { steps } from '../data'

export default function StoryLoop() {
  const rootRef = useRef(null)
  const [step, setStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const stepRef = useRef(0)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const p = self.progress
          setProgress(p)
          const next = Math.min(steps.length - 1, Math.floor(p * steps.length * 0.999))
          if (next !== stepRef.current) {
            stepRef.current = next
            setStep(next)
          }
        },
      })

      gsap.from('.story-head .line > span', {
        yPercent: 110,
        duration: 1,
        stagger: 0.08,
        ease: 'power4.out',
        scrollTrigger: { trigger: root, start: 'top 65%' },
      })

      gsap.from('.loop-node', {
        scale: 0,
        opacity: 0,
        duration: 0.7,
        stagger: 0.09,
        ease: 'back.out(1.7)',
        scrollTrigger: { trigger: root, start: 'top 60%' },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  const active = steps[step]
  const rotation = progress * 300

  const jumpTo = (i) => {
    const el = rootRef.current
    if (!el) return
    const scrollable = el.offsetHeight - window.innerHeight
    const y = el.offsetTop + scrollable * ((i + 0.5) / steps.length)
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(y, { duration: 1.2 })
    else window.scrollTo({ top: y, behavior: 'smooth' })
    setStep(i)
  }

  return (
    <section className="story" id="story" ref={rootRef} style={{ '--p': progress }}>
      <div className="story-sticky">
        <div className="story-copy">
          <p className="eyebrow">
            <span className="dot" /> The loop · 01 — 04
          </p>
          <h2 className="story-head display">
            <span className="line">
              <span>Every cup</span>
            </span>
            <span className="line">
              <span>
                comes <em>full circle.</em>
              </span>
            </span>
          </h2>

          <div className="story-body" key={active.id}>
            <div className="story-index">
              <span>{active.index}</span> / 04
            </div>
            <div>
              <h3 className="story-word">{active.word}</h3>
              <p className="story-title">{active.title}</p>
              <p className="story-desc">{active.body}</p>
              <p className="story-meta">{active.meta}</p>
            </div>
          </div>

          <ol className="story-steps" aria-label="The loop, four steps">
            {steps.map((s, i) => (
              <li key={s.id} className={i === step ? 'is-active' : ''}>
                <button type="button" onClick={() => jumpTo(i)}>
                  <span>{s.index}</span>
                  <b>{s.word}</b>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="story-visual">
          <div className="loop-ring" style={{ '--rot': `${rotation}deg` }}>
            <svg viewBox="0 0 600 600" aria-hidden="true">
              <circle className="loop-track" cx="300" cy="300" r="214" />
              <circle
                className="loop-dash"
                cx="300"
                cy="300"
                r="258"
                strokeDasharray="2 14"
                style={{ transform: `rotate(${rotation}deg)` }}
              />
              <circle
                className="loop-progress"
                cx="300"
                cy="300"
                r="214"
                pathLength="100"
                style={{ strokeDashoffset: `${100 - progress * 100}` }}
              />
              <g className="loop-ticks">
                {Array.from({ length: 48 }).map((_, i) => (
                  <line
                    key={i}
                    x1="300"
                    y1="58"
                    x2="300"
                    y2={i % 4 === 0 ? '70' : '64'}
                    transform={`rotate(${i * 7.5} 300 300)`}
                  />
                ))}
              </g>
            </svg>

            <div className="loop-core">
              <span className="loop-inf">∞</span>
              <span className="loop-core-label">Tetap dalam loop</span>
              <span className="loop-core-step">
                {active.index} / 04
              </span>
            </div>

            {steps.map((s, i) => {
              const pos = ['top', 'right', 'bottom', 'left'][i]
              return (
                <div key={s.id} className={`loop-node is-${pos}${i === step ? ' is-active' : ''}`}>
                  <span className="loop-node-dot">
                    <i />
                  </span>
                  <span className="loop-node-label">
                    <small>0{i + 1}</small>
                    {s.word}
                  </span>
                </div>
              )
            })}

            <span className="loop-bean loop-bean-a" aria-hidden="true" />
            <span className="loop-bean loop-bean-b" aria-hidden="true" />
            <span className="loop-bean loop-bean-c" aria-hidden="true" />
          </div>

          <p className="loop-note">
            <span className="live-dot" /> Roasted, dialled, poured, repeated — Karachi, every day.
          </p>
        </div>
      </div>
    </section>
  )
}
