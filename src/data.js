export const navLinks = [
  { label: 'The loop', href: '#story' },
  { label: 'Menu', href: '#menu' },
  { label: 'Founder', href: '#founder' },
  { label: 'Locations', href: '#locations' },
  { label: 'Contact', href: '#contact' },
]

export const steps = [
  {
    id: 'bean',
    index: '01',
    word: 'Bean',
    title: 'Chosen with care',
    body: 'Roasted to taste like where it came from. Small lots, clear provenance, no shortcuts.',
    meta: 'Origin · 1,800m',
  },
  {
    id: 'brew',
    index: '02',
    word: 'Brew',
    title: 'Dialled in daily',
    body: 'Every morning the grinder moves before the door opens. Shot by shot, until it tastes right.',
    meta: 'Dose · 18g in',
  },
  {
    id: 'cup',
    index: '03',
    word: 'Cup',
    title: 'Poured by hand',
    body: 'Milk textured to order, coffee poured slow. The way it should be, every single time.',
    meta: 'Yield · 36g out',
  },
  {
    id: 'you',
    index: '04',
    word: 'You',
    title: 'And back again',
    body: "You come back tomorrow. That's the loop: people, cups, mornings, on repeat.",
    meta: 'Return · daily',
  },
]

export const drinks = [
  {
    name: 'Espresso',
    price: 1000,
    desc: 'Short, thick crema, sweet finish.',
    tags: ['Espresso', 'Crema'],
    art: 'assets/cup.jpg',
  },
  {
    name: 'Cortado',
    price: 1150,
    desc: 'Espresso cut with an equal part of warm milk.',
    tags: ['Warm milk', 'Espresso'],
    art: 'assets/latte.jpg',
  },
  {
    name: 'Flat white',
    price: 1250,
    desc: 'Silky microfoam over a double shot.',
    tags: ['Microfoam', 'Double shot'],
    art: 'assets/pour.jpg',
  },
  {
    name: 'Cappuccino',
    price: 1200,
    desc: 'Equal parts espresso, milk and foam.',
    tags: ['Foam', 'Steamed milk'],
    art: 'assets/latte.jpg',
  },
  {
    name: 'Pour-over',
    price: 1500,
    desc: 'Single origin, brewed slow by hand.',
    tags: ['Filter', 'Single origin'],
    art: 'assets/pour.jpg',
  },
  {
    name: 'Iced latte',
    price: 1300,
    desc: 'Double shot over ice and cold milk.',
    tags: ['Ice', 'Cold milk'],
    art: 'assets/cups.jpg',
  },
  {
    name: 'Cold brew',
    price: 1350,
    desc: 'Steeped overnight, smooth and bright.',
    tags: ['18h steep', 'Ice'],
    art: 'assets/beans.jpg',
  },
  {
    name: 'Mocha',
    price: 1450,
    desc: 'Espresso, chocolate, steamed milk.',
    tags: ['Chocolate', 'Foam'],
    art: 'assets/cafe.jpg',
  },
]

export const timeline = [
  { year: '2017', text: 'Starts vlogging while working as a mobile app designer.' },
  { year: '2021', text: 'Builds SCNZCREW, a merchandise brand out of the community.' },
  { year: 'Dec 2025', text: '@drinkloop.co goes live. 47K followers, and counting.' },
  { year: 'Jan 2026', text: 'Soft launch: a test outlet in Phase 8, a short menu, long lines.' },
  { year: 'Oct 2026', text: 'Bukhari, Phase 8, NN 5 Star and NN Spar are live.' },
]

export const outlets = [
  {
    id: 'phase8',
    index: '01',
    name: 'Phase 8',
    tag: 'Live · where it began',
    area: 'DHA Phase 8',
    address: 'Ground Floor, 3C, 10 Zulfiqar Street 1, DHA Phase 8, Karachi',
    x: 63,
    y: 47,
  },
  {
    id: 'bukhari',
    index: '02',
    name: 'Bukhari',
    tag: 'Live · Bukhari Commercial',
    area: 'DHA Phase 6',
    address: 'Bukhari Commercial Area, DHA Phase 6, Karachi',
    x: 52,
    y: 40,
  },
  {
    id: 'nnspar',
    index: '03',
    name: 'NN Spar',
    tag: 'Live · North Nazimabad',
    area: 'North Nazimabad',
    address: 'By SPAR, North Nazimabad, Karachi',
    x: 73,
    y: 28,
  },
  {
    id: 'nn5star',
    index: '04',
    name: 'NN 5 Star',
    tag: 'Live · North Nazimabad',
    area: 'North Nazimabad',
    address: 'By 5 Star Chowrangi, North Nazimabad, Karachi',
    x: 64,
    y: 23,
  },
]

export const gallery = [
  { src: 'assets/barista.jpg', caption: 'The bar, before the rush', meta: 'Phase 8' },
  { src: 'assets/latte.jpg', caption: 'Cortado o’clock', meta: '06:42' },
  { src: 'assets/cafe.jpg', caption: 'Saturday, front row', meta: 'Bukhari' },
  { src: 'assets/beans.jpg', caption: 'Highland lots, in', meta: 'Roastery' },
  { src: 'assets/pour.jpg', caption: 'Poured slow', meta: 'The bar' },
  { src: 'assets/cups.jpg', caption: 'Table for the crew', meta: 'NN Spar' },
  { src: 'assets/cup.jpg', caption: 'Last cup, first light', meta: '07:15' },
  { src: 'assets/portrait.jpg', caption: 'Building in public', meta: 'Founder' },
]
