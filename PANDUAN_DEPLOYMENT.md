# PANDUAN DEPLOYMENT - UPLOAD KE CPANEL & HOSTING

Panduan ini menjelaskan langkah demi langkah untuk mengunggah (deploy) proyek **PrintHub** (Laravel Backend & React Frontend) ke shared hosting menggunakan **cPanel**.

Secara garis besar, kita akan membagi deployment menjadi dua bagian:
1. **Backend (Laravel API & Admin Panel)** di subdomain (misal: `api.domainanda.com`).
2. **Frontend (React Landing Page)** di domain utama (misal: `domainanda.com`).

---

## BAGIAN 1: DEPLOY BACKEND (LARAVEL 11)

Langkah paling direkomendasikan untuk shared hosting adalah menaruh backend di subdomain agar file backend dan frontend terpisah dengan rapi.

### Langkah 1: Buat Subdomain di cPanel
1. Masuk ke **cPanel** hosting Anda.
2. Cari menu **Subdomains** atau **Domains** -> **Create a New Domain**.
3. Buat subdomain baru, contoh: `api.domainanda.com`.
4. Tentukan folder tujuan (Document Root), contoh: `public_html/api`.

### Langkah 2: Siapkan File Backend & Upload
1. Di komputer lokal Anda, kompres seluruh isi folder **BE LP** menjadi satu file ZIP (misal: `backend.zip`).
   *Catatan: Jangan ikut mengompres folder `vendor`, `node_modules`, `storage/framework/cache/data`, atau file database lokal `.sqlite` jika tidak ingin datanya terbawa.*
2. Masuk ke cPanel -> **File Manager**.
3. Navigasikan ke luar folder `public_html` (direktori utama root hosting Anda, misal: `/home/username/`).
4. Buat folder baru bernama `printhub-backend` di direktori root tersebut.
5. Upload file `backend.zip` Anda ke dalam folder `/home/username/printhub-backend/` lalu **Extract**.

### Langkah 3: Pindahkan Folder Public ke Subdomain
1. Buka folder `/home/username/printhub-backend/public/`.
2. Pindahkan (Move) seluruh file dan folder yang ada di dalamnya ke direktori Document Root subdomain Anda (contoh: `public_html/api`).
3. Sekarang folder `public_html/api` berisi:
   - `css/`
   - `fonts/`
   - `js/`
   - `index.php`
   - `.htaccess`
   - dan file public lainnya.

### Langkah 4: Hubungkan index.php ke Core Laravel
Karena core Laravel dipindah ke luar `public_html` demi keamanan, kita harus menyesuaikan path di `index.php` subdomain:
1. Edit file `public_html/api/index.php`.
2. Cari kode berikut (biasanya di baris awal):
   ```php
   // Sebelum diubah:
   if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
       require $maintenance;
   }
   require __DIR__.'/../vendor/autoload.php';
   $app = require_once __DIR__.'/../bootstrap/app.php';
   ```
3. Ubah path tersebut agar mengarah ke folder `/home/username/printhub-backend/`:
   ```php
   // Sesuaikan "/home/username" dengan nama user cPanel Anda:
   if (file_exists($maintenance = '/home/username/printhub-backend/storage/framework/maintenance.php')) {
       require $maintenance;
   }
   require '/home/username/printhub-backend/vendor/autoload.php';
   $app = require_once '/home/username/printhub-backend/bootstrap/app.php';
   ```
4. Simpan perubahan.

### Langkah 5: Konfigurasi Database & File `.env`
Jika Anda ingin menggunakan database **MySQL** (direkomendasikan untuk production di hosting):
1. Masuk ke cPanel -> **MySQL Database Wizard**.
2. Buat database baru (misal: `user_printhub_db`).
3. Buat user database baru dan buat password yang kuat.
4. Berikan akses penuh (**All Privileges**) ke user tersebut.
5. Kembali ke **File Manager**, edit file `/home/username/printhub-backend/.env` dan sesuaikan konfigurasinya:
   ```env
   APP_ENV=production
   APP_DEBUG=false
   APP_URL=https://api.domainanda.com

   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=user_printhub_db
   DB_USERNAME=user_printhub_user
   DB_PASSWORD=password_anda
   ```

*Catatan: Jika tetap ingin menggunakan SQLite, cukup buat file kosong bernama `database.sqlite` di `/home/username/printhub-backend/database/` dan set `DB_CONNECTION=sqlite` di `.env`.*

### Langkah 6: Jalankan Migrasi, Seed, dan Storage Link
1. Masuk ke cPanel -> **Terminal** (jika hosting Anda menyediakannya). Jika tidak ada Terminal, Anda bisa membuat rute sementara di `routes/web.php` untuk memicu migrasi.
2. Jika menggunakan **Terminal**, jalankan perintah:
   ```bash
   cd /home/username/printhub-backend
   composer install --no-dev --optimize-autoloader
   php artisan key:generate
   php artisan migrate --force
   php artisan db:seed --force
   ```
3. Buat symlink storage agar gambar logo, hero, dan portofolio dapat tampil:
   ```bash
   # Hapus symlink lokal jika ada
   rm public_html/api/storage
   
   # Buat symlink baru yang mengarah ke folder public subdomain
   ln -s /home/username/printhub-backend/storage/app/public /home/username/public_html/api/storage
   ```

---

## BAGIAN 2: DEPLOY FRONTEND (REACT + VITE)

React Frontend akan kita build di lokal terlebih dahulu menjadi file HTML/JS statis sebelum diunggah ke cPanel.

### Langkah 1: Konfigurasi Environment Produksi di Lokal
1. Di folder **FE LP** komputer lokal Anda, edit file `.env.production`.
2. Ubah URL API agar mengarah ke domain backend production Anda yang sudah dibuat pada Bagian 1:
   ```env
   VITE_API_BASE_URL=https://api.domainanda.com
   ```

### Langkah 2: Build File Frontend
1. Jalankan perintah build di terminal lokal komputer Anda:
   ```bash
   npm run build
   ```
   *(Gunakan `npm.cmd run build` jika di Windows PowerShell dan mendapati error policy).*
2. Perintah ini akan menghasilkan folder bernama **`dist`** di direktori utama **FE LP**.

### Langkah 3: Upload Frontend ke cPanel
1. Masuk ke cPanel -> **File Manager**.
2. Navigasikan ke folder **`public_html`** (Domain Utama).
3. Kompres isi dari folder **`dist`** (ingat: isi di dalamnya, bukan folder `dist`-nya sendiri) menjadi `frontend.zip`.
4. Upload file `frontend.zip` ke `public_html` di cPanel, lalu **Extract**.

### Langkah 4: Tambahkan File `.htaccess` untuk React Router
Agar halaman web tidak memunculkan error 404 ketika di-reload di sub-halaman:
1. Buat file baru bernama **`.htaccess`** di dalam folder `public_html`.
2. Isi file tersebut dengan konfigurasi berikut:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteCond %{REQUEST_FILENAME} !-l
     RewriteRule . /index.html [L]
   </IfModule>
   ```
3. Simpan file `.htaccess`.

---

## SELESAI
Sekarang silakan akses domain utama Anda (`https://domainanda.com`). Tampilan landing page Anda akan berjalan lancar dengan data dinamis yang diambil dari database di subdomain backend Anda (`https://api.domainanda.com/admin`).
