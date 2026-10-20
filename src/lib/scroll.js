import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

let lenis = null

export function initSmoothScroll() {
  if (lenis) return lenis

  lenis = new Lenis({
    lerp: 0.085,
    wheelMultiplier: 1,
    smoothWheel: true,
    anchors: true,
  })

  lenis.on('scroll', ScrollTrigger.update)

  const tick = (time) => {
    lenis.raf(time * 1000)
  }

  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  lenis._gsapTick = tick

  if (document.fonts?.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh())
  }

  return lenis
}

export function destroySmoothScroll() {
  if (!lenis) return
  gsap.ticker.remove(lenis._gsapTick)
  lenis.destroy()
  lenis = null
}

export function getLenis() {
  return lenis
}

export { gsap, ScrollTrigger }
