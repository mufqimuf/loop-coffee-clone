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
          <span className="dot" /> Locations · Karachi
        </p>
        <h2 className="display">
          <span className="line">
            <span>
              Live across <em>Karachi.</em>
            </span>
          </span>
        </h2>
        <p className="loc-intro">
          It began with a test outlet in Phase 8. Today Bukhari, Phase 8, NN 5 Star and NN Spar are live, with more
          announced on Instagram first.
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
                    <a href="https://maps.google.com/?q=Karachi" target="_blank" rel="noreferrer">
                      Directions <span aria-hidden="true">→</span>
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
            Outlets as listed in Loop&apos;s Instagram bio, October 2026. More doors are announced on @drinkloop.co
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
                  d="M0,0 H800 V600 H520 C500,548 502,478 462,446 C422,414 424,362 382,332 C340,302 350,252 302,232 C254,212 252,160 202,140 C152,120 132,72 92,42 C58,16 22,10 0,0 Z"
                />
                <g className="blocks">
                  {[
                    [470, 60, 90, 54],
                    [590, 40, 120, 64],
                    [430, 150, 70, 60],
                    [540, 140, 96, 74],
                    [660, 130, 80, 50],
                    [470, 250, 60, 70],
                    [560, 240, 84, 52],
                    [676, 220, 88, 62],
                    [520, 330, 66, 48],
                    [620, 320, 104, 64],
                    [710, 300, 60, 90],
                    [430, 380, 56, 46],
                    [580, 410, 72, 54],
                    [682, 430, 80, 66],
                    [470, 470, 44, 50],
                    [640, 500, 96, 52],
                    [740, 510, 48, 54],
                  ].map(([x, y, w, h], i) => (
                    <rect key={i} x={x} y={y} width={w} height={h} rx="4" />
                  ))}
                </g>
                <g className="roads">
                  <path className="rd c1" d="M402,600 C424,512 452,470 486,420 C520,370 548,300 574,230 C594,176 618,128 648,84" />
                  <path className="rd c2" d="M520,600 C540,530 566,486 610,452 C660,414 706,396 800,382" />
                  <path className="rd c2" d="M400,352 C470,344 548,332 622,308 C700,282 750,264 800,258" />
                  <path className="rd c3" d="M450,500 C510,486 566,462 610,428" />
                  <path className="rd c3" d="M520,260 C570,240 640,222 706,212" />
                  <path className="rd c3" d="M590,560 C606,520 626,490 656,470" />
                  <path className="rd c3" d="M452,170 C500,186 540,210 566,240" />
                </g>
                <g className="map-labels">
                  <text className="lb sea" x="130" y="470">
                    Arabian Sea
                  </text>
                  <text className="lb" x="560" y="222">
                    DHA
                  </text>
                  <text className="lb" x="662" y="188">
                    Clifton
                  </text>
                  <text className="lb" x="700" y="142">
                    North Nazimabad
                  </text>
                  <text className="lb" x="520" y="520">
                    Shahrah-e-Faisal
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
              <b>Karachi</b>
              <span>24.8650° N · 67.0550° E</span>
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

            <p className="map-credit">Map data © OpenStreetMap contributors (ODbL)</p>
          </div>
          <p className="map-note">
            <span className="live-dot" /> The Phase 8 pin is the address on Loop&apos;s Google Maps link; the others
            mark the neighbourhood named in the bio.
          </p>
        </div>
      </div>
    </section>
  )
}
