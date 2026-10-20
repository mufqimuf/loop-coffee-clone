import { useCallback, useEffect, useState } from 'react'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import StoryLoop from './components/StoryLoop'
import Menu from './components/Menu'
import Founder from './components/Founder'
import Gallery from './components/Gallery'
import Locations from './components/Locations'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { initSmoothScroll, destroySmoothScroll, ScrollTrigger } from './lib/scroll'

function ScrollUI() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <>
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <a className={`to-top${progress > 0.12 ? ' is-visible' : ''}`} href="#home" aria-label="Back to top">
        ↑
      </a>
    </>
  )
}

export default function App() {
  const [ready, setReady] = useState(false)

  const handleDone = useCallback(() => setReady(true), [])

  useEffect(() => {
    if (!ready) {
      document.body.classList.add('is-locked')
      return () => document.body.classList.remove('is-locked')
    }

    document.body.classList.remove('is-locked')
    initSmoothScroll()

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    const t = window.setTimeout(refresh, 700)

    return () => {
      window.removeEventListener('load', refresh)
      window.clearTimeout(t)
      destroySmoothScroll()
    }
  }, [ready])

  return (
    <>
      <a className="skip" href="#main">
        Skip to the content
      </a>
      <Loader onDone={handleDone} />
      <Cursor />
      <ScrollUI />
      <Nav />
      <main id="main">
        <Hero ready={ready} />
        <Marquee />
        <StoryLoop />
        <Menu />
        <Founder />
        <Gallery />
        <Locations />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
