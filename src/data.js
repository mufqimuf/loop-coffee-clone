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
    meta: 'Origin · 1.800 mdpl',
  },
  {
    id: 'brew',
    index: '02',
    word: 'Seduh',
    title: 'Dites tiap pagi',
    body: 'Setiap pagi grinder nyala sebelum pintu dibuka. Shot demi shot, sampai rasanya pas.',
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
    desc: 'Pendek, crema tebal, finishing manis.',
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
    desc: 'Microfoam halus di atas double shot.',
    tags: ['Microfoam', 'Double shot'],
    art: 'assets/pour.jpg',
  },
  {
    name: 'Cappuccino',
    price: 21000,
    desc: 'Seimbang: espresso, susu, dan foam.',
    tags: ['Foam', 'Susu kukus'],
    art: 'assets/latte.jpg',
  },
  {
    name: 'Pour-over',
    price: 25000,
    desc: 'Single origin, diseduh pelan dengan tangan.',
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
  { year: '2017', text: 'Irfan mulai vlogging saat masih bekerja sebagai desainer aplikasi mobile.' },
  { year: '2021', text: 'Membangun SCNZCREW, merek merchandise dari komunitasnya.' },
  { year: 'Des 2025', text: '@drinkloop.co tayang. 47K pengikut, dan terus bertambah.' },
  { year: 'Jan 2026', text: 'Soft launch: outlet uji coba di Phase 8, menu singkat, antrean panjang.' },
  { year: 'Okt 2026', text: 'Bukhari, Phase 8, NN 5 Star dan NN Spar resmi buka.' },
]

export const outlets = [
  {
    id: 'phase8',
    index: '01',
    name: 'Phase 8',
    tag: 'Buka · di sinilah dimulai',
    area: 'DHA Phase 8',
    address: 'Ground Floor, 3C, 10 Zulfiqar Street 1, DHA Phase 8, Karachi',
    x: 63,
    y: 47,
  },
  {
    id: 'bukhari',
    index: '02',
    name: 'Bukhari',
    tag: 'Buka · Bukhari Commercial',
    area: 'DHA Phase 6',
    address: 'Bukhari Commercial Area, DHA Phase 6, Karachi',
    x: 52,
    y: 40,
  },
  {
    id: 'nnspar',
    index: '03',
    name: 'NN Spar',
    tag: 'Buka · North Nazimabad',
    area: 'North Nazimabad',
    address: 'By SPAR, North Nazimabad, Karachi',
    x: 73,
    y: 28,
  },
  {
    id: 'nn5star',
    index: '04',
    name: 'NN 5 Star',
    tag: 'Buka · North Nazimabad',
    area: 'North Nazimabad',
    address: 'By 5 Star Chowrangi, North Nazimabad, Karachi',
    x: 64,
    y: 23,
  },
]

export const gallery = [
  { src: 'assets/barista.jpg', caption: 'Barnya, sebelum ramai', meta: 'Phase 8' },
  { src: 'assets/latte.jpg', caption: 'Jam-nya cortado', meta: '06.42' },
  { src: 'assets/cafe.jpg', caption: 'Sabtu, barisan depan', meta: 'Bukhari' },
  { src: 'assets/beans.jpg', caption: 'Lot dataran tinggi, datang', meta: 'Roastery' },
  { src: 'assets/pour.jpg', caption: 'Dituang pelan', meta: 'Barnya' },
  { src: 'assets/cups.jpg', caption: 'Meja buat anak-anak', meta: 'NN Spar' },
  { src: 'assets/cup.jpg', caption: 'Cangkir terakhir, cahaya pertama', meta: '07.15' },
  { src: 'assets/portrait.jpg', caption: 'Membangun di depan publik', meta: 'Founder' },
]
