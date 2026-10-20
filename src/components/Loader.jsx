import { useEffect, useRef } from 'react'
import { gsap } from '../lib/scroll'

export default function Loader({ onDone }) {
  const rootRef = useRef(null)
  const numRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    const counter = { v: 0 }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.classList.add('is-loaded')
          onDone?.()
        },
      })

      tl.to(counter, {
        v: 100,
        duration: 1.45,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (numRef.current) numRef.current.textContent = String(Math.round(counter.v)).padStart(3, '0')
          if (barRef.current) barRef.current.style.transform = `scaleX(${counter.v / 100})`
        },
      })
        .to('.loader-inner', { yPercent: -24, opacity: 0, duration: 0.5, ease: 'power2.in' }, '+=0.12')
        .to(
          root,
          {
            clipPath: 'inset(0% 0% 100% 0%)',
            duration: 0.95,
            ease: 'power4.inOut',
          },
          '-=0.18',
        )
        .set(root, { display: 'none' })
    }, root)

    return () => ctx.revert()
  }, [onDone])

  return (
    <div className="loader" ref={rootRef} aria-hidden="true">
      <div className="loader-inner">
        <div className="loader-top">
          <span className="loader-brand">
            <span className="mark">∞</span> LoopCoffeeClone · by Mufqi
          </span>
          <span className="loader-tag">Karachi · PK</span>
        </div>
        <div className="loader-mid">
          <span className="loader-word">Brewing</span>
          <span className="loader-num" ref={numRef}>
            000
          </span>
        </div>
        <div className="loader-bottom">
          <span className="loader-note">Something good is loading</span>
          <span className="loader-line">
            <i ref={barRef} />
          </span>
        </div>
      </div>
    </div>
  )
}
