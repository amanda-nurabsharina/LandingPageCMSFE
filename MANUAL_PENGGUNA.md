# PANDUAN PENGGUNAAN CMS & TAMPILAN LANDING PAGE (PRINTHUB)

Dokumen ini menjelaskan alur pengelolaan konten melalui **Filament Admin Panel (Backend)** dan pengaruh pengaturannya pada tampilan **Landing Page (Frontend)**. Setiap menu dijelaskan secara rinci beserta placeholder untuk screenshot Anda.

---

## DAFTAR ISI
1. [Cara Mengakses Panel Admin](#1-cara-mengakses-panel-admin)
2. [Site Config (Pengaturan Umum)](#2-site-config-pengaturan-umum)
3. [Hero Section (Bagian Utama)](#3-hero-section-bagian-utama)
4. [Why Choose Us (Keunggulan Kami)](#4-why-choose-us-keunggulan-kami)
5. [Services (Layanan Percetakan)](#5-services-layanan-percetakan)
6. [Statistics (Statistik Pencapaian)](#6-statistics-statistik-pencapaian)
7. [Order Steps (Alur Pemesanan)](#7-order-steps-alur-pemesanan)
8. [Portfolios (Galeri Hasil Cetak)](#8-portfolios-galeri-hasil-cetak)
9. [Testimonials (Ulasan Pelanggan)](#9-testimonials-ulasan-pelanggan)

---

## 1. CARA MENGAKSES PANEL ADMIN

- **URL Akses**: `http://127.0.0.1:8000/admin` (Lokal)
- **Akun Default**:
  - **Email**: `admin@example.com`
  - **Password**: `password`

### Tampilan Login Admin:
*(Tempatkan screenshot halaman login admin di sini)*
`[SCREENSHOT: Halaman Login Admin]`

---

## 2. SITE CONFIG (PENGATURAN UMUM)

Menu ini digunakan untuk mengatur identitas dasar website percetakan Anda, seperti nama brand, logo, kontak WhatsApp, dan sosial media.

### Kolom Pengisian di Admin Panel:
- **Site Name**: Nama brand/situs percetakan Anda (Teks).
- **Logo**: File gambar logo website percetakan Anda.
- **WhatsApp Number**: Nomor WhatsApp utama Anda. **WAJIB menggunakan kode negara tanpa tanda "+"** (Contoh: `628123456789`).
- **Email**: Alamat email resmi.
- **Address**: Alamat fisik toko percetakan Anda.
- **Facebook / Instagram / Twitter URL**: Link menuju akun media sosial toko Anda.

### Letak Tampilan di Frontend:
1. **Header (Navbar)**:
   - Logo gambar akan muncul di pojok kiri atas. Jika logo kosong, frontend akan menampilkan inisial teks "ND" bergradasi hijau.
   - Nama situs muncul di sebelah kanan logo.
   - Tombol **"Hubungi Kami"** di kanan atas akan otomatis mengarahkan ke chat WhatsApp menggunakan nomor yang diatur di menu ini.
2. **Footer (Bagian Bawah)**:
   - Menampilkan logo, nama situs, deskripsi situs, alamat, email, dan nomor WhatsApp.
   - Ikon media sosial (Facebook, Instagram, Twitter) di pojok kiri bawah footer akan aktif dan merujuk ke link yang Anda input.

### Screenshot Rujukan:
* **Tampilan Menu Site Config di Admin Panel:**
  `[SCREENSHOT: Menu Admin Site Config]`
  
* **Tampilan Hasilnya di Frontend Header & Footer:**
  `[SCREENSHOT: Tampilan Header & Footer Frontend]`

---

## 3. HERO SECTION (BAGIAN UTAMA)

Menu ini mengontrol bagian paling atas dari Landing Page (di bawah Navbar). Bagian ini adalah impresi pertama pengunjung saat membuka website Anda.

### Kolom Pengisian di Admin Panel:
- **Badge**: Teks kecil di atas judul utama (Contoh: "Percetakan Digital").
- **Title**: Judul utama halaman (Headline). Teks setelah kata ke-3 akan otomatis bergradasi hijau untuk menonjolkan estetika desain.
- **Subtitle**: Sub-judul penjelasan singkat layanan Anda (Sub-headline).
- **Primary Btn Text**: Label teks tombol utama (Contoh: "Pesan Sekarang").
- **Primary Btn Url**: Link tujuan tombol utama (Default: `#order`).
- **Secondary Btn Text**: Label teks tombol kedua (Contoh: "Layanan Kami").
- **Secondary Btn Url**: Link tujuan tombol kedua (Default: `#services`).
- **Image Path**: Unggah gambar banner utama (Gambar mesin cetak/flyer). Jika kosong, frontend akan menampilkan ilustrasi vektor *Premium Print Engine* bawaan.

### Letak Tampilan di Frontend:
- Teks **Badge**, **Title**, dan **Subtitle** muncul di sisi kiri halaman Hero.
- **Primary Button** & **Secondary Button** muncul di bawah Subtitle. Tombol Primary secara otomatis menghubungkan chat WhatsApp dengan teks pesan kustom.
- **Gambar Banner Utama** muncul di sisi kanan halaman Hero dengan bingkai kaca yang modern.

### Screenshot Rujukan:
* **Tampilan Menu Hero Section di Admin Panel:**
  `[SCREENSHOT: Menu Admin Hero Section]`
  
* **Tampilan Hasilnya di Frontend Hero Banner:**
  `[SCREENSHOT: Tampilan Hero Section Frontend]`

---

## 4. WHY CHOOSE US (KEUNGGULAN KAMI)

Menu ini digunakan untuk meyakinkan calon pelanggan mengapa mereka harus memilih jasa percetakan Anda dibanding kompetitor.

### Kolom Pengisian di Admin Panel:
- **Title**: Judul bagian keunggulan (Contoh: "Mengapa Memilih Kami?").
- **Subtitle**: Penjelasan ringkas keunggulan Anda.
- **Features**: Daftar poin kelebihan (List dinamis). Anda bisa menambahkan atau menghapus poin keunggulan sesuai keinginan (Contoh: "Cetak Kualitas HD", "Pengerjaan Cepat", "Harga Kompetitif").
- **Image Path**: Foto/ilustrasi pendukung bagian keunggulan. Jika kosong, frontend menampilkan *High Fidelity mockup card* keunggulan yang modern.

### Letak Tampilan di Frontend:
- Muncul di bagian tengah halaman landing page.
- Poin-poin dalam **Features** akan ditampilkan dalam bentuk daftar checklist hijau di sisi kanan.
- Gambar keunggulan muncul di sisi kiri dengan animasi shadow halus.

### Screenshot Rujukan:
* **Tampilan Menu Why Choose Us di Admin Panel:**
  `[SCREENSHOT: Menu Admin Why Choose Us]`
  
* **Tampilan Hasilnya di Frontend Keunggulan:**
  `[SCREENSHOT: Tampilan Why Choose Us Frontend]`

---

## 5. SERVICES (LAYANAN PERCETAKAN)

Menu ini menampilkan produk-produk utama yang Anda tawarkan (misal: Brosur, Stiker, Spanduk). Anda bisa menambah, mengubah, atau menghapus layanan ini secara fleksibel.

### Kolom Pengisian di Admin Panel:
- **Title**: Nama layanan/produk cetakan (Contoh: "Spanduk & Banner").
- **Description**: Penjelasan singkat mengenai produk cetak tersebut.
- **Icon**: Pilih ikon yang sesuai. Anda wajib mengetik nama ikon dari library **Lucide Icons**:
  - `printer` (untuk Spanduk/Banner)
  - `tag` (untuk Stiker/Label)
  - `file-text` (untuk Brosur/Flyer)
  - `credit-card` (untuk ID Card/Kartu Nama)
  - `package` (untuk Dus Makanan/Kemasan)
  - `gift` (untuk Souvenir/Merchandise)
- **Sort Order**: Angka urutan penampilan kartu layanan (Contoh: `1`, `2`, `3`).

### Letak Tampilan di Frontend:
- Ditampilkan dalam format grid kartu 3-kolom di bagian **"Layanan Kami"**.
- Kartu pertama (Urutan ke-1) akan otomatis berwarna hijau emerald cerah (Sorotan Utama), sedangkan kartu lainnya berlatar putih bersih yang elegan.
- Setiap kartu memiliki tombol **"Pesan Sekarang"** yang terhubung langsung ke WhatsApp dengan pesan kustom otomatis sesuai judul layanan yang diklik.

### Screenshot Rujukan:
* **Tampilan Menu Services di Admin Panel:**
  `[SCREENSHOT: Menu Admin Services]`
  
* **Tampilan Hasilnya di Frontend Services Grid:**
  `[SCREENSHOT: Tampilan Services Frontend]`

---

## 6. STATISTICS (STATISTIK PENCAPAian)

Bagian ini digunakan untuk menampilkan data kuantitatif pencapaian bisnis Anda untuk membangun kepercayaan pelanggan (Social Proof).

### Kolom Pengisian di Admin Panel:
- **Value**: Nilai pencapaian (Contoh: "500+", "10,000+", "5 Tahun").
- **Label**: Keterangan nilai tersebut (Contoh: "Klien Puas", "Produk Terkirim", "Pengalaman").
- **Sort Order**: Urutan tampil dari kiri ke kanan.

### Letak Tampilan di Frontend:
- Ditampilkan di dalam bar hijau tebal yang membentang secara horizontal tepat di bawah Hero Section.
- Diurutkan dari kiri ke kanan berdasarkan input **Sort Order**.

### Screenshot Rujukan:
* **Tampilan Menu Statistics di Admin Panel:**
  `[SCREENSHOT: Menu Admin Statistics]`
  
* **Tampilan Hasilnya di Frontend Statistics Bar:**
  `[SCREENSHOT: Tampilan Statistics Bar Frontend]`

---

## 7. ORDER STEPS (ALUR PEMESANAN)

Menjelaskan langkah demi langkah proses pemesanan dari awal hingga barang selesai agar pelanggan tidak bingung.

### Kolom Pengisian di Admin Panel:
- **Step Number**: Angka urutan langkah (Contoh: `1` untuk Konsultasi, `2` untuk Desain, dst).
- **Title**: Judul langkah alur (Contoh: "Konsultasi").
- **Description**: Penjelasan singkat apa yang harus dilakukan pembeli di langkah tersebut.
- **Icon**: Nama ikon dari Lucide Icons (seperti `message-square`, `edit`, `printer`, `check`).
- **Sort Order**: Urutan penayangan alur.

### Letak Tampilan di Frontend:
- Ditampilkan di bagian **"Cara Pemesanan Sangat Mudah"**.
- Terbagi menjadi alur garis horizontal pada desktop dan tumpukan kartu yang responsif pada layar handphone.
- Langkah ke-1 (Konsultasi) akan memiliki tombol khusus di bawahnya untuk langsung menghubungi WhatsApp admin.

### Screenshot Rujukan:
* **Tampilan Menu Order Steps di Admin Panel:**
  `[SCREENSHOT: Menu Admin Order Steps]`
  
* **Tampilan Hasilnya di Frontend Order Steps:**
  `[SCREENSHOT: Tampilan Order Steps Frontend]`

---

## 8. PORTFOLIOS (GALERI HASIL CETAK)

Galeri interaktif untuk memamerkan foto produk yang pernah dicetak. Dilengkapi fitur filter kategori.

### Kolom Pengisian di Admin Panel:
- **Title**: Judul hasil cetak portofolio (Contoh: "Stiker Botol Kopi A").
- **Category**: Kategori cetak (Contoh: "Stiker", "Brosur", "Banner", "Buku"). Kategori ini akan otomatis dideteksi untuk filter di frontend.
- **Image Path**: File gambar/foto hasil cetakan.
- **Sort Order**: Urutan tampil gambar.

### Letak Tampilan di Frontend:
- Ditampilkan di bagian **"Hasil Cetakan Terbaik Kami"**.
- Frontend akan otomatis memunculkan tab filter kategori berdasarkan entri unik kategori yang Anda masukkan.
- Saat gambar disorot (hover), akan muncul detail judul, kategori, dan tombol **"Tanya Cetak"** WhatsApp yang secara otomatis merujuk ke gambar portofolio tersebut.

### Screenshot Rujukan:
* **Tampilan Menu Portfolios di Admin Panel:**
  `[SCREENSHOT: Menu Admin Portfolios]`
  
* **Tampilan Hasilnya di Frontend Portfolio Grid & Filters:**
  `[SCREENSHOT: Tampilan Portofolio Frontend]`

---

## 9. TESTIMONIALS (ULASAN PELANGGAN)

Menampilkan ulasan/review kepuasan dari pelanggan untuk meningkatkan konversi penjualan.

### Kolom Pengisian di Admin Panel:
- **Client Name**: Nama pelanggan (Contoh: "Rian Diantono").
- **Client Role**: Jabatan/usaha pelanggan (Contoh: "Pemilik Kedai Kopi").
- **Stars**: Penilaian rating bintang, dari angka `1` hingga `5`.
- **Content**: Isi tulisan ulasan/testimoni pelanggan.
- **Sort Order**: Urutan tampil kartu testimonial.

### Letak Tampilan di Frontend:
- Ditampilkan di bagian grid kartu testimoni pada segmen **"Apa Kata Pelanggan Setia Kami"**.
- Bintang rating dirender secara grafis (bintang kuning) secara otomatis sesuai angka **Stars** yang Anda masukkan.

### Screenshot Rujukan:
* **Tampilan Menu Testimonials di Admin Panel:**
  `[SCREENSHOT: Menu Admin Testimonials]`
  
* **Tampilan Hasilnya di Frontend Testimonials Grid:**
  `[SCREENSHOT: Tampilan Testimonials Frontend]`
