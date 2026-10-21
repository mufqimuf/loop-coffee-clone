const ITEMS = ['Balikpapan', 'Samarinda', 'Banjarmasin', 'Palangka Raya', 'Kalimantan', 'Kopi spesialti', 'LoopCoffeeClone · vMufqi']

function Row({ reverse = false, outlined = false }) {
  return (
    <div className={`mq-row${reverse ? ' is-reverse' : ''}${outlined ? ' is-outline' : ''}`}>
      {[0, 1].map((copy) => (
        <div className="mq-set" key={copy} aria-hidden={copy === 1}>
          {ITEMS.map((item) => (
            <span className="mq-item" key={`${copy}-${item}`}>
              <i aria-hidden="true">∞</i>
              {item}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

export default function Marquee() {
  return (
    <section className="band" aria-label="Lokasi CopyMufqi">
      <Row />
      <Row reverse outlined />
    </section>
  )
}
