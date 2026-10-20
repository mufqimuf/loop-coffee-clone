import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/scroll'
import { outlets } from '../data'

export default function Locations() {
  const [active, setActive] = useState(0)
  const [zoom, setZoom] = useState(1)
  const rootRef = useRef(null)
  const outlet = outlets[active]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.loc-head .line > span', {
        yPercent: 110,
        duration: 1,
        stagger: 0.08,
        ease: 'power4.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 68%' },
      })

      gsap.from('.outlet', {
        y: 26,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.outlet-list', start: 'top 82%' },
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="locations" id="locations" ref={rootRef}>
      <div className="loc-head">
        <p className="eyebrow">
          <span className="dot" /> Lokasi · Kalimantan
        </p>
        <h2 className="display">
          <span className="line">
            <span>
              Buka di seluruh <em>Kalimantan.</em>
            </span>
          </span>
        </h2>
        <p className="loc-intro">
          Dimulai dari satu outlet uji coba di Balikpapan. Kini Samarinda, Banjarmasin dan Palangka Raya juga buka — outlet
          berikutnya selalu diumumkan duluan di Instagram.
        </p>
      </div>

      <div className="loc-grid">
        <div className="outlet-list" onMouseLeave={() => setActive(0)}>
          {outlets.map((o, i) => (
            <article
              className={`outlet${active === i ? ' is-active' : ''}`}
              key={o.id}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              tabIndex={0}
            >
              <span className="outlet-index">{o.index}</span>
              <div className="outlet-main">
                <div className="outlet-top">
                  <h3>{o.name}</h3>
                  <span className="outlet-tag">
                    <span className="live-dot" /> {o.tag}
                  </span>
                </div>
                <p className="outlet-area">{o.area}</p>
                <div className="outlet-detail">
                  <div>
                    <p>{o.address}</p>
                    <a href="https://maps.google.com/?q=Kalimantan+Timur" target="_blank" rel="noreferrer">
                      Lihat peta <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </div>
              <span className="outlet-arrow" aria-hidden="true">
                ↗
              </span>
            </article>
          ))}
          <p className="outlet-note">
            Daftar outlet versi fiksi proyek ini, Oktober 2026. Outlet berikutnya diumumkan lewat @minumcopy
            first.
          </p>
        </div>

        <div className="map-wrap">
          <div className="map">
            <div
              className="map-canvas"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: `${outlet.x}% ${outlet.y}%`,
              }}
            >
              <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <rect className="sea" width="800" height="600" />
                <g className="waves">
                  {[0, 1, 2, 3, 4, 5].map((n) => (
                    <path
                      key={n}
                      className="wave"
                      d={`M${-40 + n * 30},${520 - n * 26} q 40 -18 80 0 t 80 0 t 80 0`}
                    />
                  ))}
                </g>
                <path
                  className="land"
                  d="M60,190 C70,140 120,105 190,88 C260,70 330,62 400,68 C470,74 540,85 600,105 C660,125 705,155 720,200 C735,245 725,295 705,340 C688,380 668,415 640,445 C615,472 585,490 550,500 C520,508 490,505 465,492 C440,480 420,462 400,448 C380,435 358,428 335,432 C310,437 288,445 265,440 C240,435 220,418 205,395 C190,372 180,350 168,330 C155,308 138,295 120,285 C98,272 80,255 68,235 C58,218 55,205 60,190 Z"
                />
                {/* Sungai Mahakam — Samarinda di tepinya */}
                <path
                  className="rd river"
                  d="M430,160 C445,200 470,230 520,250 C570,270 610,290 640,320 C665,345 678,370 680,400 C681,430 672,455 655,475"
                  fill="none"
                />
                {/* Sungai Barito — Banjarmasin delta */}
                <path
                  className="rd river"
                  d="M300,300 C315,340 330,370 340,410 C350,445 360,470 370,490"
                  fill="none"
                />
                <g className="blocks">
                  {[
                    [300, 320, 34, 22], [350, 330, 28, 18], [310, 360, 26, 20],
                    [355, 360, 30, 16], [395, 335, 24, 18], [330, 300, 22, 14],
                    [230, 400, 26, 16], [270, 415, 30, 18], [410, 300, 20, 14],
                  ].map(([x, y, w, h], i) => (
                    <rect key={i} x={x} y={y} width={w} height={h} rx="3" />
                  ))}
                </g>
                <g className="roads">
                  <path className="rd c1" d="M180,300 C240,320 300,318 360,335 C420,352 470,360 520,355" />
                  <path className="rd c2" d="M310,360 C330,400 340,430 335,460 C332,480 325,495 320,505" />
                  <path className="rd c2" d="M360,335 C390,360 420,385 450,400" />
                  <path className="rd c3" d="M225,415 C260,420 300,418 335,410" />
                  <path className="rd c3" d="M330,300 C345,320 360,340 380,355" />
                  <path className="rd c3" d="M450,400 C470,415 490,425 515,430" />
                </g>
                <g className="map-labels">
                  <text className="lb sea" x="760" y="480">
                    Selat Makassar
                  </text>
                  <text className="lb sea" x="130" y="520">
                    Laut Jawa
                  </text>
                  <text className="lb" x="620" y="345">
                    Sudirman
                  </text>
                  <text className="lb" x="660" y="390">
                    Gajah Mada
                  </text>
                  <text className="lb" x="360" y="480">
                    Antasari
                  </text>
                  <text className="lb" x="250" y="330">
                    Sungai Barito
                  </text>
                </g>
                <path className="compass" d="M730,520 l0,-34 m-10,12 l10,-12 l10,12" />
              </svg>

              {outlets.map((o, i) => (
                <button
                  type="button"
                  className={`map-pin pin-${i + 1}${active === i ? ' is-active' : ''}`}
                  key={o.id}
                  style={{ left: `${o.x}%`, top: `${o.y}%` }}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-label={`${o.name}, ${o.area}`}
                >
                  <span className="pin-pulse" aria-hidden="true" />
                  <span className="pin-body">{i + 1}</span>
                </button>
              ))}
            </div>

            <div className="map-hud">
              <small>Now showing</small>
              <b>Kalimantan</b>
              <span>1.2379° S · 116.8529° E</span>
              <span className="map-hud-live">
                <span className="live-dot" /> {outlet.name} · {outlet.area}
              </span>
            </div>

            <div className="map-zoom">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(1.6, Number((z + 0.2).toFixed(2))))}
                aria-label="Zoom in"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(1, Number((z - 0.2).toFixed(2))))}
                aria-label="Zoom out"
              >
                −
              </button>
            </div>

            <p className="map-credit">Data peta © OpenStreetMap contributors (ODbL)</p>
          </div>
          <p className="map-note">
            <span className="live-dot" /> Pin-pin di peta ini posisinya mengikuti lokasi asli keempat kota di
            Kalimantan; alamatnya fiksi proyek ini.
          </p>
        </div>
      </div>
    </section>
  )
}
