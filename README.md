# Aplikasi Manajemen Artikel React Vite

Aplikasi sederhana untuk mengelola artikel dengan fitur untuk menambah, mengedit, menghapus, dan melihat artikel. Proyek ini menggunakan Ant Design untuk komponen UI dan Axios untuk permintaan API.

## Fitur

- Melihat semua artikel yang dikategorikan sebagai Published, Drafts, dan Trashed.
- Menambahkan artikel baru.
- Mengedit artikel yang ada.
- Memindahkan artikel ke tempat sampah.
- Dukungan paginasi untuk daftar artikel.

## Teknologi yang Digunakan

- React Vite
- Ant Design (antd)
- Axios
- Tailwind CSS

## Instalasi

Ikuti langkah-langkah berikut untuk mengatur dan menjalankan aplikasi di mesin lokal Anda.

### Prasyarat

- Node.js (v14 atau lebih baru)
- npm atau yarn

### Clone Repository

```bash
git clone https://github.com/akbr-hilal/FE-SVI.git
cd FE-SVI
```

### Install Dependencies
Menggunakan npm:
```bash
npm install
```

### Menjalankan Aplikasi
Menggunakan npm:
```bash
npm start
```
Aplikasi akan berjalan di http://localhost:5173.

### Variabel Lingkungan
Jika URL dasar API Anda berbeda atau Anda memiliki pengaturan spesifik lingkungan lainnya, Anda dapat membuat file .env di root proyek Anda dan mendefinisikan variabel:

```plaintext
VITE_SERVER_URL=http://localhost:8080
```

Pastikan Anda memperbarui konfigurasi API di axiosConfig.js untuk menggunakan variabel lingkungan ini:

```javascript
import axios from 'axios';

const serverUrl = import.meta.env.VITE_SERVER_URL;
export const API = axios.create({
    baseURL: `${serverUrl}/`
})
```