import { useEffect, useState } from 'react'

function useWibTime() {
  const [time, setTime] = useState('--:--:--')
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('id-ID', {
      timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', hour12: false,
    })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])
  return time
}

function useWitaTime() {
  const [time, setTime] = useState('--:--:--')

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('id-ID', {
      timeZone: 'Asia/Makassar',
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

const loop = ['Tetap dalam loop', 'Balikpapan', 'Samarinda', 'Banjarmasin', 'Palangka Raya', 'Kalimantan']

export default function Footer() {
  const time = useWitaTime()
  const jakTime = useWibTime()

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
          <a className="brand is-light" href="#home" aria-label="CopyMufqi, beranda">
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
            <span className="brand-name">CopyMufqi</span>
          </a>
          <p>
            Studi desain web — clone dari Loop Coffee Co. Empat outlet aslinya buka, sisanya cerita.
            <em> Tetap dalam loop.</em>
          </p>
          <a className="ft-follow" href="#" onClick={(e) => e.preventDefault()}>
            @minumcopy · segera hadir <span aria-hidden="true">↗</span>
          </a>
          <div className="ft-live">
            <span className="live-dot" /> 4 outlet buka · Kalimantan
          </div>
        </div>

        <div className="ft-col">
          <h3>Jelajahi</h3>
          <ul>
            <li>
              <a href="#story">Cerita</a>
            </li>
            <li>
              <a href="#menu">Menu</a>
            </li>
            <li>
              <a href="#founder">Tokoh</a>
            </li>
            <li>
              <a href="#gallery">Instagram</a>
            </li>
            <li>
              <a href="#locations">Lokasi</a>
            </li>
          </ul>
        </div>

        <div className="ft-col">
          <h3>Temukan kami</h3>
          <ul>
            <li>
              <a href="#locations">Balikpapan · Kaltim</a>
            </li>
            <li>
              <a href="#locations">Samarinda · Kaltim</a>
            </li>
            <li>
              <a href="#locations">Banjarmasin · Kalsel</a>
            </li>
            <li>
              <a href="#locations">Palangka Raya · Kalteng</a>
            </li>
          </ul>
        </div>

        <div className="ft-col">
          <h3>Mari Berbincang</h3>
          <ul>
            <li>
              <a href="tel:+628566121052">+62 856-6121-052</a>
            </li>
            <li>
              <a href="#" onClick={(e) => e.preventDefault()}>
                @minumcopy · segera
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => e.preventDefault()}>
                minumcopy.co · segera
              </a>
            </li>
            <li>
              <a href="#contact">Kontak</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="ft-bottom">
        <span>© 2026 CopyMufqi — studi desain</span>
        <span className="ft-mid">
          Terinspirasi dari{' '}
          <a href="#" onClick={(e) => e.preventDefault()}>
            Loop Coffee Co.
          </a>{' '}
          oleh Irfan Junejo · proyek asli:{' '}
          <a href="#" onClick={(e) => e.preventDefault()}>
            minumcopy.co
          </a>
        </span>
        <span className="ft-time">
          Balikpapan <b>{time}</b> WITA · Jakarta <b>{jakTime}</b> WIB
        </span>
        <span className="ft-mid">Clone untuk belajar · bukan afiliasi resmi</span>
        <a className="ft-top-link" href="#home">
          Ke atas ↑
        </a>
      </div>
    </footer>
  )
}
