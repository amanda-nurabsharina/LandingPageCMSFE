# PrintHub - Landing Page Frontend

Repository ini berisi kode sumber frontend untuk **PrintHub**, Landing Page premium untuk bisnis percetakan digital. Landing page ini dibangun menggunakan **React**, **Vite**, **Tailwind CSS**, dan **Lucide Icons** dengan desain ultra-modern, performa cepat, dan responsif di seluruh perangkat.

---

## 1. Prasyarat Sistem (System Requirements)

Pastikan sistem Anda telah memiliki:
- **Node.js >= 18.0.0**
- **NPM** (terinstal bawaan bersama Node.js)

---

## 2. Cara Menjalankan Aplikasi di Lokal (Run Local)

Ikuti langkah-langkah di bawah ini untuk menjalankan frontend secara lokal di komputer Anda:

1. **Instal dependency Node modules**:
   ```bash
   npm install
   ```

2. **Jalankan Development Server**:
   ```bash
   npm run dev
   ```
   Setelah server berjalan, Anda dapat mengakses aplikasi di browser Anda melalui tautan yang tampil di terminal (biasanya **[http://localhost:5173](http://localhost:5173)**).

3. **Koneksi ke Backend**:
   Frontend ini dilengkapi dengan fitur **Auto-Detect API URL**.
   - Jika dijalankan di localhost, frontend akan otomatis mencoba mendeteksi backend Laravel di `http://127.0.0.1:8000`.
   - Pastikan backend API Laravel Anda sudah dijalankan dengan perintah `php artisan serve` di port `8000` agar data landing page dapat dimuat secara dinamis.
   - Jika backend mati atau tidak terjangkau, frontend akan otomatis menampilkan **Fallback Data** dengan aman sehingga halaman web tetap tampil cantik dan tidak blank/error.

---

## 3. Konfigurasi Environment (Environment Configurations)

Jika Anda ingin mengubah target URL API backend secara manual (misalnya setelah dideploy ke server VPS/Hosting produksi), Anda dapat mengonfigurasinya melalui file `.env.production`.

Isi dari `.env.production`:
```env
VITE_API_BASE_URL=https://api.domainanda.com
```

Ganti `https://api.domainanda.com` dengan URL domain backend Laravel Anda yang sudah aktif dan online.

---

## 4. Build untuk Produksi (Production Build)

Untuk menghasilkan bundel file statis yang siap diunggah ke layanan hosting (cPanel, Vercel, Netlify, Cloudflare Pages, VPS Nginx/Apache):

1. **Jalankan perintah build**:
   ```bash
   npm run build
   ```

2. **Unggah folder `dist`**:
   Setelah perintah build selesai, sebuah folder bernama **`dist`** akan terbuat secara otomatis di direktori utama. Folder `dist` ini berisi file HTML, Javascript, CSS, dan gambar statis yang telah dikompresi secara maksimal (minify). Anda hanya perlu mengunggah isi dari folder `dist` ini ke direktori public hosting Anda.

---

## 5. Fitur Utama Landing Page (Panduan Pemakaian)

Landing Page ini didesain khusus untuk mengoptimalkan konversi penjualan produk cetakan:

- **WhatsApp Redirect Generator**: Seluruh tombol "Pesan Sekarang" dan "Hubungi Kami" akan mengarahkan pengguna langsung ke chat WhatsApp. Teks pesannya disusun secara khusus sesuai dengan layanan atau portofolio yang sedang diklik oleh pengguna (contoh: *"Halo PrintHub, saya ingin berkonsultasi tentang cetak custom Spanduk & Banner"*). Nomor WhatsApp dibaca secara dinamis dari database CMS.
- **Dynamic Lucide Icons**: Ikon layanan dan proses kerja dirender secara fleksibel sesuai data ikon yang dikirim dari database backend.
- **Filter Portofolio**: Memungkinkan calon pelanggan melihat hasil cetak sampel berdasarkan kategori secara interaktif tanpa memuat ulang halaman (Zero-latency category filter).
- **Testimonial Slider**: Menampilkan ulasan bintang lima dari para klien terdahulu untuk meningkatkan rasa percaya calon pembeli.
