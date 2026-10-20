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
          <img src="assets/portrait.jpg" alt="Irfan Junejo, pendiri Loop Coffee Co." />
          <figcaption>
            <span>Irfan Junejo</span>
            <small>Pendiri · Loop Coffee Co. (proyek asli)</small>
          </figcaption>
          <span className="fd-corner" aria-hidden="true">
            IJ
          </span>
        </figure>
        <div className="fd-stamp" aria-hidden="true">
          <span>Membangun di depan publik</span>
          <span>Karachi · 2025—</span>
        </div>
      </div>

      <div className="founder-copy">
        <p className="eyebrow">
          <span className="dot" /> Tokoh di baliknya
        </p>
        <h2 className="founder-head display">
          <span className="line">
            <span>Built in</span>
          </span>
          <span className="line">
            <span>
              <em>public.</em>
            </span>
          </span>
        </h2>

        <p className="fd-lede">
          Irfan mulai vlogging tahun 2017 saat masih jadi desainer aplikasi mobile, lalu dikenal lewat gaya berceritanya
          dan kalimat khasnya <em>“Scenes kuch aisay hain.”</em>
        </p>
        <p className="fd-lede">
          Loop adalah perusahaan kopinya: kopi enak, harga masuk akal, tumbuh dari mulut ke mulut dan orang-orang yang
          rela antre untuknya.
        </p>

        <blockquote className="fd-quote">
          <p>
            “I started a coffee company, and this is us building @drinkloop in public. The response has been unreal.”
          </p>
          <cite>
            <span className="fd-quote-dot" /> Irfan Junejo · media sosial, Januari 2026
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
