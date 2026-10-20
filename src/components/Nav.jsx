import { useEffect, useRef, useState } from 'react'

function useNoiseSound() {
  const ctxRef = useRef(null)
  const gainRef = useRef(null)
  const [on, setOn] = useState(false)

  const toggle = () => {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return

    if (!ctxRef.current) {
      const ctx = new AC()
      const seconds = 4
      const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      let last = 0
      for (let i = 0; i < data.length; i += 1) {
        const white = Math.random() * 2 - 1
        last = (last + 0.02 * white) / 1.02
        data[i] = last * 3.2
      }

      const src = ctx.createBufferSource()
      src.buffer = buffer
      src.loop = true

      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.value = 680
      filter.Q.value = 0.4

      const gain = ctx.createGain()
      gain.gain.value = 0

      src.connect(filter).connect(gain).connect(ctx.destination)
      src.start()

      ctxRef.current = ctx
      gainRef.current = gain
    }

    const ctx = ctxRef.current
    if (ctx.state === 'suspended') ctx.resume()

    if (on) {
      gainRef.current.gain.cancelScheduledValues(ctx.currentTime)
      gainRef.current.gain.setTargetAtTime(0, ctx.currentTime, 0.18)
      setOn(false)
    } else {
      gainRef.current.gain.cancelScheduledValues(ctx.currentTime)
      gainRef.current.gain.setTargetAtTime(0.05, ctx.currentTime, 0.25)
      setOn(true)
    }
  }

  useEffect(
    () => () => {
      ctxRef.current?.close?.()
    },
    [],
  )

  return { on, toggle }
}

export default function Nav() {
  const [stuck, setStuck] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const lastY = useRef(0)
  const { on, toggle } = useNoiseSound()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setStuck(y > 24)
      setHidden(y > 420 && y > lastY.current && !open)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [open])

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open)
  }, [open])

  return (
    <>
      <header className={`top${stuck ? ' is-stuck' : ''}${hidden ? ' is-hidden' : ''}`}>
        <a className="brand" href="#home" aria-label="Loop Coffee Co., home" onClick={() => setOpen(false)}>
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

        <nav className="nav" aria-label="Main">
          {['story', 'menu', 'founder', 'locations', 'contact'].map((id, i) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {['The loop', 'Menu', 'Founder', 'Locations', 'Contact'][i]}
            </a>
          ))}
        </nav>

        <div className="top-actions">
          <button
            type="button"
            className={`snd${on ? ' is-on' : ''}`}
            onClick={toggle}
            aria-pressed={on}
            aria-label={on ? 'Turn the sound off' : 'Turn the sound on'}
          >
            <span className="snd-bars" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </span>
            <span className="snd-text">{on ? 'Sound on' : 'Sound'}</span>
          </button>
          <a className="btn small" href="https://instagram.com/drinkloop.co" target="_blank" rel="noreferrer">
            Follow <span aria-hidden="true">↗</span>
          </a>
          <button
            type="button"
            className={`burger${open ? ' is-open' : ''}`}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <i />
            <i />
          </button>
        </div>
      </header>

      <div className={`mobile-nav${open ? ' is-open' : ''}`} aria-hidden={!open}>
        <div className="mobile-nav-inner">
          {['story', 'menu', 'founder', 'locations', 'contact'].map((id, i) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              <span>0{i + 1}</span>
              {['The loop', 'Menu', 'Founder', 'Locations', 'Contact'][i]}
            </a>
          ))}
          <a className="btn red" href="https://instagram.com/drinkloop.co" target="_blank" rel="noreferrer">
            Follow @drinkloop.co ↗
          </a>
        </div>
      </div>
    </>
  )
}
