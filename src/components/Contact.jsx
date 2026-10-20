import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/scroll'

const PHONE = '+92 307 1115667'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-head .line > span', {
        yPercent: 110,
        duration: 1,
        stagger: 0.08,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.contact-head', start: 'top 74%' },
      })

      gsap.from('.phone', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-phone', start: 'top 82%' },
      })

      gsap.from('.contact-cell', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-grid', start: 'top 86%' },
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PHONE.replace(/\s/g, ''))
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="contact" id="contact" ref={rootRef}>
      <div className="contact-head">
        <p className="eyebrow">
          <span className="dot" /> Contact · Open daily
        </p>
        <h2 className="display">
          <span className="line">
            <span>
              Say <em>hello.</em>
            </span>
          </span>
        </h2>
      </div>

      <div className="contact-phone">
        <span className="contact-phone-label">Call the bar</span>
        <a className="phone" href="tel:+923071115667">
          {PHONE}
        </a>
        <button type="button" className={`copy${copied ? ' is-copied' : ''}`} onClick={copy}>
          <span>{copied ? 'Copied' : 'Copy number'}</span>
          <i aria-hidden="true">{copied ? '✓' : '⧉'}</i>
        </button>
      </div>

      <div className="contact-grid">
        <div className="contact-cell">
          <small>Call</small>
          <a href="tel:+923071115667">+92 307 1115667</a>
          <span>Daily · 7:00 — 23:00</span>
        </div>
        <div className="contact-cell">
          <small>Instagram</small>
          <a href="https://instagram.com/drinkloop.co" target="_blank" rel="noreferrer">
            @drinkloop.co ↗
          </a>
          <span>47K followers · DMs open</span>
        </div>
        <div className="contact-cell">
          <small>Website</small>
          <a href="https://drinkloop.co" target="_blank" rel="noreferrer">
            drinkloop.co ↗
          </a>
          <span>New openings announced here first</span>
        </div>
        <div className="contact-cell">
          <small>City</small>
          <b>Karachi, Pakistan</b>
          <span>Bukhari · Phase 8 · NN 5 Star · NN Spar</span>
        </div>
      </div>

      <div className="contact-card">
        <div className="contact-card-copy">
          <p className="eyebrow is-light">
            <span className="live-dot" /> Tetap dalam loop
          </p>
          <h3>
            New openings, new drinks and everything in between.
            <em> Ikuti Loop di Instagram, atau telepon barnya.</em>
          </h3>
        </div>
        <div className="contact-card-actions">
          <a className="btn light" href="https://instagram.com/drinkloop.co" target="_blank" rel="noreferrer">
            Ikuti @drinkloop.co <span aria-hidden="true">↗</span>
          </a>
          <a className="btn red" href="tel:+923071115667">
            Call {PHONE} <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
