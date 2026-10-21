import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/scroll'
import { drinks } from '../data'

export function RollNumber({ value, digits = 4 }) {
  const str = String(value).padStart(digits, '0')
  return (
    <span className="roll" aria-label={String(value)}>
      {str.split('').map((d, i) => (
        <span className="rd" key={i} aria-hidden="true">
          <span
            className="rd-col"
            style={{ transform: `translateY(-${Number(d)}em)`, transitionDelay: `${i * 55}ms` }}
          >
            {Array.from({ length: 10 }).map((_, n) => (
              <span key={n}>{n}</span>
            ))}
          </span>
        </span>
      ))}
    </span>
  )
}

export default function Menu() {
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState(false)
  const rootRef = useRef(null)
  const drink = drinks[active]

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) setHovered(true)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.menu-head .line > span', {
        yPercent: 110,
        duration: 1,
        stagger: 0.08,
        ease: 'power4.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 65%' },
      })

      gsap.from('.price-side', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.menu-grid', start: 'top 72%' },
      })

      gsap.from('.drink-row', {
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.055,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.drink-list', start: 'top 80%' },
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="menu" id="menu" ref={rootRef}>
      <div className="menu-head">
        <p className="eyebrow">
          <span className="dot" /> Menu · Dari barnya
        </p>
        <h2 className="display">
          <span className="line">
            <span>
              Barnya sudah <em>buka.</em>
            </span>
          </span>
        </h2>
        <p className="menu-intro">
          Delapan minuman, empat outlet, satu loop. Arahkan kursor ke salah satu untuk melihat harganya.
        </p>
      </div>

      <div className="menu-grid">
        <aside className="price-side" aria-live="polite">
          <span className="price-label">Rp</span>
          <div className={`price-big${hovered ? ' is-live' : ''}`}>
            <RollNumber value={hovered ? drink.price : 0} digits={4} />
          </div>
          <div className="price-meta">
            <span className="price-dot" />
            <span className="price-name">{hovered ? drink.name : 'Paling laris'}</span>
            <span className="price-rank">{hovered ? 'Lagi di barnya' : 'Rp 0.000 — pilih satu'}</span>
          </div>

          <div className="price-art" aria-hidden="true">
            <img src={drink.art} alt="" key={drink.art} />
            <span className="price-art-ring">LOOP · COFFEE · CO. · KALIMANTAN · </span>
          </div>

          <div className="price-foot">
            <p>Contoh menu untuk proyek ini. Minuman, harga, dan fotonya akan diganti dengan milikmu sendiri.</p>
            <span className="price-chip">8 minuman · 4 outlet · 1 loop</span>
          </div>
        </aside>

        <div className={`drink-list${hovered ? ' is-live' : ''}`} onMouseLeave={() => setHovered(false)}>
          {drinks.map((d, i) => (
            <button
              type="button"
              className={`drink-row${active === i ? ' is-active' : ''}`}
              key={d.name}
              onMouseEnter={() => {
                setActive(i)
                setHovered(true)
              }}
              onFocus={() => {
                setActive(i)
                setHovered(true)
              }}
              onBlur={() => setHovered(false)}
              onClick={() => {
                setActive(i)
                setHovered(true)
              }}
            >
              <span className="drink-index">0{i + 1}</span>
              <span className="drink-main">
                <span className="drink-top">
                  <span className="drink-name">{d.name}</span>
                  <span className="drink-price">
                    <small>Rp</small> {d.price.toLocaleString('id-ID')}
                  </span>
                </span>
                <span className="drink-desc">{d.desc}</span>
                <span className="drink-layers">
                  <span>
                    {d.tags.map((t) => (
                      <em key={t}>{t}</em>
                    ))}
                  </span>
                </span>
              </span>
              <span className="drink-go" aria-hidden="true">
                ↗
              </span>
            </button>
          ))}
          <p className="drink-note">
            <span className="live-dot" /> Digiling setiap pagi sejak pukul 7. Espresso, filter, dingin — sepanjang hari.
          </p>
        </div>
      </div>
    </section>
  )
}
