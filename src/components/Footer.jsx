import { useEffect, useState } from 'react'

function useKarachiTime() {
  const [time, setTime] = useState('--:--:--')

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Karachi',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  return time
}

const loop = ['Stay in the loop', 'Bukhari', 'Phase 8', 'NN 5 Star', 'NN Spar', 'Karachi']

export default function Footer() {
  const time = useKarachiTime()

  return (
    <footer className="foot">
      <div className="ft-mq" aria-hidden="true">
        <div className="ft-mq-track">
          {[0, 1].map((c) => (
            <div className="ft-mq-set" key={c}>
              {loop.map((item, i) => (
                <span key={`${c}-${i}`}>
                  <b>∞</b> {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="ft-top">
        <div className="ft-brand">
          <a className="brand is-light" href="#home" aria-label="Loop Coffee Co., home">
            <svg className="brand-mark" viewBox="0 0 64 64" aria-hidden="true">
              <circle cx="32" cy="32" r="32" fill="var(--red)" />
              <path
                d="M20 38c0-7 5-12 12-12s12 5 12 12-5 12-12 12"
                fill="none"
                stroke="var(--bg)"
                strokeWidth="4.2"
                strokeLinecap="round"
              />
              <path
                d="M44 26c0-7-5-12-12-12s-12 5-12 12 5 12 12 12"
                fill="none"
                stroke="var(--bg)"
                strokeWidth="4.2"
                strokeLinecap="round"
              />
              <circle cx="32" cy="32" r="4.2" fill="var(--bg)" />
            </svg>
            <span className="brand-name">Loop Coffee Co.</span>
          </a>
          <p>
            Specialty coffee in Karachi. Four outlets live, more brewing.
            <em> Stay in the loop.</em>
          </p>
          <a className="ft-follow" href="https://instagram.com/drinkloop.co" target="_blank" rel="noreferrer">
            Follow @drinkloop.co <span aria-hidden="true">↗</span>
          </a>
          <div className="ft-live">
            <span className="live-dot" /> 4 outlets live · Karachi
          </div>
        </div>

        <div className="ft-col">
          <h3>Explore</h3>
          <ul>
            <li>
              <a href="#story">The loop</a>
            </li>
            <li>
              <a href="#menu">Menu</a>
            </li>
            <li>
              <a href="#founder">Founder</a>
            </li>
            <li>
              <a href="#gallery">Instagram</a>
            </li>
            <li>
              <a href="#locations">Locations</a>
            </li>
          </ul>
        </div>

        <div className="ft-col">
          <h3>Find us</h3>
          <ul>
            <li>
              <a href="#locations">Phase 8 · DHA</a>
            </li>
            <li>
              <a href="#locations">Bukhari · DHA</a>
            </li>
            <li>
              <a href="#locations">NN Spar · North Nazimabad</a>
            </li>
            <li>
              <a href="#locations">NN 5 Star · North Nazimabad</a>
            </li>
          </ul>
        </div>

        <div className="ft-col">
          <h3>Say hello</h3>
          <ul>
            <li>
              <a href="tel:+923071115667">+92 307 1115667</a>
            </li>
            <li>
              <a href="https://instagram.com/drinkloop.co" target="_blank" rel="noreferrer">
                @drinkloop.co · 47K
              </a>
            </li>
            <li>
              <a href="https://drinkloop.co" target="_blank" rel="noreferrer">
                drinkloop.co
              </a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="ft-bottom">
        <span>© 2026 Loop Coffee Co.</span>
        <span className="ft-time">
          Karachi <b>{time}</b> PKT
        </span>
        <span className="ft-mid">A website proposal · not affiliated</span>
        <a className="ft-top-link" href="#home">
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}
