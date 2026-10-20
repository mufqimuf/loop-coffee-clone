import { useEffect, useRef } from 'react'
import { gsap } from '../lib/scroll'
import { timeline } from '../data'

const stats = [
  { value: 47, suffix: 'K', label: 'Pengikut' },
  { value: 8, suffix: '', label: 'Menu minuman' },
  { value: 4, suffix: '', label: 'Outlet' },
]

export default function Founder() {
  const rootRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fd-photo', {
        clipPath: 'inset(100% 0% 0% 0%)',
        duration: 1.2,
        ease: 'power4.inOut',
        scrollTrigger: { trigger: '.founder', start: 'top 68%' },
      })

      gsap.from('.fd-photo img', {
        scale: 1.25,
        duration: 1.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.founder', start: 'top 68%' },
      })

      gsap.from('.founder-head .line > span', {
        yPercent: 110,
        duration: 1,
        stagger: 0.08,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.founder', start: 'top 62%' },
      })

      gsap.utils.toArray('.fd-stat b').forEach((el) => {
        const target = Number(el.dataset.value)
        const suffix = el.dataset.suffix || ''
        const counter = { v: 0 }
        gsap.to(counter, {
          v: target,
          duration: 1.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          onUpdate: () => {
            el.textContent = `${Math.round(counter.v)}${suffix}`
          },
        })
      })

      gsap.fromTo(
        '.fd-line i',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.fd-timeline',
            start: 'top 78%',
            end: 'bottom 55%',
            scrub: true,
          },
        },
      )

      gsap.from('.fd-item', {
        x: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.09,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.fd-timeline', start: 'top 82%' },
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="founder" id="founder" ref={rootRef}>
      <div className="founder-media">
        <figure className="fd-photo">
          <img src="assets/portrait.jpg" alt="Mufqi Harits, pembuat clone LoopCoffeeClone ini" />
          <figcaption>
            <span>Mufqi Harits</span>
            <small>Pembuat clone · CopyMufqi</small>
          </figcaption>
          <span className="fd-corner" aria-hidden="true">
            MH
          </span>
        </figure>
        <div className="fd-stamp" aria-hidden="true">
          <span>Membangun di depan publik</span>
          <span>Kalimantan · 2026—</span>
        </div>
      </div>

      <div className="founder-copy">
        <p className="eyebrow">
          <span className="dot" /> Tokoh di baliknya
        </p>
        <h2 className="founder-head display">
          <span className="line">
            <span>Dibangun</span>
          </span>
          <span className="line">
            <span>
              <em>di depan publik.</em>
            </span>
          </span>
        </h2>

        <p className="fd-lede">
          Mufqi mulai serius ngoprek AI & automation tahun 2025 saat masih jadi desainer UI/UX, lalu dikenal lewat
          proyek-proyek isengnya yang dibangun terbuka dan dokumentasinya dibagikan apa adanya di LinkedIn.
        </p>
        <p className="fd-lede">
          CopyMufqi adalah proyek kopinya: clone situs kopi enak yang dibangun sambil belajar, tumbuh dari rasa penasaran
          dan kebiasaan bikin sesuatu cuma karena pengen tahu caranya.
        </p>

        <blockquote className="fd-quote">
          <p>
            “Aku kloning situs kopi ini karna nganggur, dan inilah hasil belajarnya, dibagikan apa adanya.”
          </p>
          <cite>
            <span className="fd-quote-dot" /> Mufqi Harits · LinkedIn, Oktober 2026
          </cite>
        </blockquote>

        <div className="fd-stats">
          {stats.map((s) => (
            <div className="fd-stat" key={s.label}>
              <b data-value={s.value} data-suffix={s.suffix}>
                0{s.suffix}
              </b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        <ol className="fd-timeline" aria-label="Perjalanan Loop Coffee Co.">
          <span className="fd-line" aria-hidden="true">
            <i />
          </span>
          {timeline.map((t) => (
            <li className="fd-item" key={t.year}>
              <span className="fd-year">{t.year}</span>
              <span className="fd-dot" aria-hidden="true" />
              <p>{t.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
