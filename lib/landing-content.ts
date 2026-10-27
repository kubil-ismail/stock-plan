// Seluruh teks landing page ada di sini supaya mudah diubah tanpa menyentuh komponen.

export const navLinks = [
  { href: "#masalah", label: "Masalah" },
  { href: "#cara-kerja", label: "Cara kerja" },
  { href: "#fitur", label: "Fitur" },
  { href: "#faq", label: "Tanya jawab" },
] as const;

export const hero = {
  badge: "Segera hadir",
  title: "Pahami bisnis di balik saham, bukan cuma angkanya",
  description:
    "Cari perusahaan lewat tema seperti batubara, lihat siapa saja yang bermain di setiap tahapnya, lalu susun portofolio sesuai keyakinan investasimu.",
  cta: "Daftar tunggu",
  secondaryCta: "Lihat contoh",
  disclaimer:
    "StockPlan adalah alat riset dan perencanaan, bukan saran investasi.",
} as const;

export const problem = {
  title: "Kategori saham sering tidak menceritakan dari mana uangnya datang",
  description:
    "IHSG punya 960+ emiten. Sebuah perusahaan bisa terdaftar di satu sektor, tetapi sumber pendapatan terbesarnya ada di bisnis lain. Untuk tahu pastinya, kamu harus membaca laporan keuangan, dan tidak semua orang punya waktu untuk itu.",
  points: [
    "Memilih saham dari nama atau sektor, bukan dari bisnis sebenarnya",
    "Perusahaan di satu tema sulit ditemukan karena tersebar di banyak lapisan",
    "Sulit menyusun portofolio yang konsisten dengan keyakinanmu",
  ],
} as const;

export const steps = [
  {
    title: "Pilih tema",
    description:
      "Cari bisnis yang kamu yakini, misalnya batubara atau energi.",
  },
  {
    title: "Lihat rantai nilainya",
    description:
      "Dari kontraktor tambang sampai pembangkit listrik, lengkap dengan persentase pendapatan dari tema itu.",
  },
  {
    title: "Susun tesis dan portofolio",
    description:
      "Tulis alasan investasimu, pilih perusahaan yang cocok, dan pantau semuanya di satu tempat.",
  },
] as const;

export type ValueChainRow = {
  code: string;
  layer: string;
  exposure: number;
};

// Data ilustrasi. Bukan data asli, persentase eksposur nanti dihitung dari
// laporan keuangan dan ditautkan ke sumbernya.
export const valueChainDemo = {
  title: "Rantai nilai batubara",
  description:
    "Contoh tampilan. Data pada tabel ini bersifat ilustrasi dan belum mencerminkan angka sebenarnya.",
  note: "Persentase asli dihitung dari laporan keuangan dan selalu ditautkan ke sumbernya.",
  rows: [
    { code: "UNTR", layer: "Kontraktor tambang", exposure: 85 },
    { code: "PTBA", layer: "Pemilik tambang", exposure: 90 },
    { code: "AADI", layer: "Logistik dan pembangkit", exposure: 55 },
    { code: "ADMR", layer: "Pengolahan", exposure: 55 },
  ] satisfies ValueChainRow[],
} as const;

export const features = [
  {
    title: "Cari lewat tema bisnis",
    description: "Temukan perusahaan dari bisnisnya, bukan dari rasio keuangan.",
  },
  {
    title: "Peta rantai nilai",
    description: "Lihat setiap tahap dari hulu ke hilir dalam satu layar.",
  },
  {
    title: "Bisnis sebenarnya",
    description:
      "Ringkasan usaha, sumber pendapatan, anak usaha, dan manajemen dalam bahasa sederhana.",
  },
  {
    title: "Tesis dan portofolio",
    description:
      "Kelola portofolio berdasarkan tesis investasi yang kamu susun sendiri.",
  },
] as const;

export const audience = {
  title: "Dibuat untuk investor yang ingin mengerti apa yang dibelinya",
  description:
    "Cocok untuk pemula yang ingin berinvestasi jangka panjang. Tanpa istilah rumit dan tanpa layar penuh angka. Setiap istilah dijelaskan, setiap angka ada sumbernya.",
} as const;

export const trust = {
  title: "Data yang bisa kamu telusuri",
  points: [
    "Setiap label bisnis ditautkan ke sumbernya",
    "Data diperbarui saat ada laporan keuangan baru",
    "Persentase eksposur dihitung dari laporan, bukan ditebak",
  ],
} as const;

export const nonGoals = {
  title: "Yang tidak kami lakukan",
  points: [
    "Bukan aplikasi jual beli saham",
    "Tidak ada prediksi harga",
    "Tidak ada rekomendasi beli atau jual",
  ],
} as const;

export const pricing = {
  title: "Satu paket, fokus penuh pada risetmu",
  description:
    "StockPlan adalah layanan berlangganan, jadi seluruh fitur hanya tersedia untuk pelanggan. Paket dan harga diumumkan saat peluncuran. Anggota daftar tunggu mendapat akses lebih awal.",
} as const;

export const faq = [
  {
    question: "Apa bedanya StockPlan dengan aplikasi sekuritas?",
    answer:
      "Aplikasi sekuritas berfokus pada jual beli saham. StockPlan berfokus pada riset dan perencanaan: memahami bisnis perusahaan dan mengelola portofolio sesuai tesismu. Kamu tidak bisa bertransaksi di StockPlan.",
  },
  {
    question: "Apakah StockPlan memberi rekomendasi saham?",
    answer:
      "Tidak. StockPlan adalah alat riset dan perencanaan. Informasi di sini bukan saran atau ajakan untuk membeli atau menjual efek apa pun.",
  },
  {
    question: "Dari mana data berasal dan seberapa akurat?",
    answer:
      "Setiap label bisnis ditautkan ke sumbernya sehingga kamu bisa memeriksanya sendiri. Data diperbarui saat ada laporan keuangan baru.",
  },
  {
    question: "Kapan StockPlan dirilis dan berapa harganya?",
    answer:
      "Kami sedang menyiapkan peluncuran. Jadwal dan harga akan diumumkan lebih dulu kepada anggota daftar tunggu.",
  },
  {
    question: "Saya pemula, apakah bisa langsung memakainya?",
    answer:
      "Bisa. StockPlan dirancang untuk pemula: bahasanya sederhana dan setiap istilah teknis dijelaskan.",
  },
] as const;

export const finalCta = {
  title: "Mulai dari bisnisnya, bukan dari tebakan",
  description: "Daftar tunggu untuk mendapat akses lebih awal.",
} as const;

export const footer = {
  links: [
    { href: "#", label: "Kebijakan Privasi" },
    { href: "#", label: "Syarat Penggunaan" },
  ],
  disclaimer:
    "StockPlan adalah alat riset dan perencanaan. Informasi di sini bukan saran atau ajakan untuk membeli atau menjual efek apa pun. Keputusan investasi sepenuhnya ada pada kamu.",
} as const;
