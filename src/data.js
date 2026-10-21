export const navLinks = [
  { label: 'Cerita', href: '#story' },
  { label: 'Menu', href: '#menu' },
  { label: 'Tokoh', href: '#founder' },
  { label: 'Lokasi', href: '#locations' },
  { label: 'Kontak', href: '#contact' },
]

export const steps = [
  {
    id: 'bean',
    index: '01',
    word: 'Biji',
    title: 'Dipilih dengan sengaja',
    body: 'Disangrai agar rasanya jujur pada asalnya. Lot kecil, asal jelas, tanpa jalan pintas.',
    meta: 'Asal · 1.800 mdpl',
  },
  {
    id: 'brew',
    index: '02',
    word: 'Seduh',
    title: 'Dites tiap pagi',
    body: 'Setiap pagi penggiling nyala sebelum pintu dibuka. Shot demi shot, sampai rasanya pas.',
    meta: 'Dosis · 18g masuk',
  },
  {
    id: 'cup',
    index: '03',
    word: 'Cangkir',
    title: 'Dituang dengan tangan',
    body: 'Susu di-texture sesuai pesanan, kopi dituang pelan. Seperti mestinya, setiap saat.',
    meta: 'Hasil · 36g keluar',
  },
  {
    id: 'you',
    index: '04',
    word: 'Kamu',
    title: 'Dan kembali lagi',
    body: 'Besok kamu datang lagi. Itulah loop-nya: orang, cangkir, pagi, berulang.',
    meta: 'Kembali · harian',
  },
]

export const drinks = [
  {
    name: 'Espresso',
    price: 18000,
    desc: 'Pendek, crema tebal, akhirannya manis.',
    tags: ['Espresso', 'Crema'],
    art: 'assets/cup.jpg',
  },
  {
    name: 'Cortado',
    price: 20000,
    desc: 'Espresso dipotong susu hangat 1:1.',
    tags: ['Susu hangat', 'Espresso'],
    art: 'assets/latte.jpg',
  },
  {
    name: 'Flat white',
    price: 22000,
    desc: 'Busa halus di atas shot ganda.',
    tags: ['Busa halus', 'Shot ganda'],
    art: 'assets/pour.jpg',
  },
  {
    name: 'Cappuccino',
    price: 21000,
    desc: 'Seimbang: espresso, susu, dan busa.',
    tags: ['Busa', 'Susu kukus'],
    art: 'assets/latte.jpg',
  },
  {
    name: 'Pour-over',
    price: 25000,
    desc: 'Biji asal tunggal, diseduh pelan dengan tangan.',
    tags: ['Filter', 'Asal tunggal'],
    art: 'assets/pour.jpg',
  },
  {
    name: 'Iced latte',
    price: 24000,
    desc: 'Shot ganda di atas es dan susu dingin.',
    tags: ['Es', 'Susu dingin'],
    art: 'assets/cups.jpg',
  },
  {
    name: 'Cold brew',
    price: 26000,
    desc: 'Direndam semalaman, halus dan cerah.',
    tags: ['Rendam 18 jam', 'Es'],
    art: 'assets/beans.jpg',
  },
  {
    name: 'Mocha',
    price: 27000,
    desc: 'Espresso, cokelat, susu kukus.',
    tags: ['Cokelat', 'Busa'],
    art: 'assets/cafe.jpg',
  },
]

export const timeline = [
  { year: '2017', text: 'Mulai kuliah & kerja serabutan; pertama pegang desain grafis dan web.' },
  { year: '2021', text: 'Jadi desainer UI/UX; proyek web & aplikasi untuk klien lokal.' },
  { year: '2025', text: 'Juara VibeCoding 2026: membangun UraiNote, AI planner dari masalah pribadi.' },
  { year: 'Sep 2026', text: 'Berkreasi sendiri di waktu senggang: membangun AI Office & otomasi self-hosted; mulai aktif di LinkedIn.' },
  { year: 'Okt 2026', text: 'LoopCoffeeClone (Versi Mufqi): clone studi desain web ini dirilis open-source.' },
]

export const outlets = [
  {
    id: 'balikpapan',
    index: '01',
    name: 'Balikpapan',
    tag: 'Buka · di sinilah dimulai',
    area: 'Balikpapan, Kaltim',
    address: 'Jl. Jenderal Sudirman, Balikpapan, Kalimantan Timur',
    x: 86,
    y: 71,
  },
  {
    id: 'samarinda',
    index: '02',
    name: 'Samarinda',
    tag: 'Buka · tepi Mahakam',
    area: 'Samarinda, Kaltim',
    address: 'Jl. Gajah Mada, Samarinda, Kalimantan Timur',
    x: 80,
    y: 66,
  },
  {
    id: 'banjarmasin',
    index: '03',
    name: 'Banjarmasin',
    tag: 'Buka · kota seribu sungai',
    area: 'Banjarmasin, Kalsel',
    address: 'Jl. Pangeran Antasari, Banjarmasin, Kalimantan Selatan',
    x: 46,
    y: 80,
  },
  {
    id: 'palangkaraya',
    index: '04',
    name: 'Palangka Raya',
    tag: 'Buka · jantung Kalimantan',
    area: 'Palangka Raya, Kalteng',
    address: 'Jl. Diponegoro, Palangka Raya, Kalimantan Tengah',
    x: 44,
    y: 55,
  },
]

export const gallery = [
  { src: 'assets/barista.jpg', caption: 'Barnya, sebelum ramai', meta: 'Balikpapan' },
  { src: 'assets/latte.jpg', caption: 'Jam-nya cortado', meta: '06.42' },
  { src: 'assets/cafe.jpg', caption: 'Sabtu, barisan depan', meta: 'Samarinda' },
  { src: 'assets/beans.jpg', caption: 'Lot dataran tinggi, datang', meta: 'Pabrik sangrai' },
  { src: 'assets/pour.jpg', caption: 'Dituang pelan', meta: 'Barnya' },
  { src: 'assets/cups.jpg', caption: 'Meja buat anak-anak', meta: 'Banjarmasin' },
  { src: 'assets/cup.jpg', caption: 'Cangkir terakhir, cahaya pertama', meta: '07.15' },
  { src: 'assets/portrait.jpg', caption: 'Di tangga, mikirin loop', meta: 'Mufqi' },
]
