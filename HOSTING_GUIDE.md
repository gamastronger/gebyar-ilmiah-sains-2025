# Panduan Hosting File Besar

## File yang Dihapus dari Repository

File-file berikut terlalu besar untuk GitHub dan telah dihapus:
- `src/assets/amelio.mp4` (61.37 MB)
- `src/assets/bukpansc.pdf` (84.46 MB)
- `src/assets/bukpanswc.pdf` (87.37 MB)

## Solusi untuk File Besar

### Opsi 1: Upload ke Cloud Storage (GRATIS)

**Cloudinary (Recommended untuk video/gambar):**
1. Daftar di https://cloudinary.com (Free tier: 25GB)
2. Upload file video `amelio.mp4`
3. Dapatkan URL dan ganti di kode

**Google Drive / Dropbox:**
1. Upload file PDF
2. Set permission ke "Anyone with the link can view"
3. Generate direct download link

**Firebase Storage (Recommended untuk PDF):**
```bash
npm install firebase
```
Upload file ke Firebase Storage dan dapatkan public URL

### Opsi 2: Menggunakan CDN Gratis

**jsDelivr untuk file publik:**
- Upload ke GitHub release
- Akses via: `https://cdn.jsdelivr.net/gh/username/repo@version/file.pdf`

### Implementasi di Kode

Ganti path file di komponen React:

```javascript
// Sebelum:
import video from './assets/amelio.mp4'

// Sesudah:
const video = 'https://res.cloudinary.com/your-cloud/video/upload/amelio.mp4'
```

## Alternatif untuk Video

Untuk video seperti `amelio.mp4`, pertimbangkan:
1. **YouTube** - Upload dan embed
2. **Vimeo** - Free tier tersedia
3. **Cloudinary** - Optimasi otomatis

## Checklist Deploy ke Vercel

- [x] File besar dihapus dari repository
- [x] .gitignore di-update
- [ ] File dipindah ke cloud storage
- [ ] Update reference di kode
- [ ] Test di local
- [ ] Deploy ke Vercel

## Catatan Penting

- GitHub limit: 50 MB per file
- Vercel build time limit: 45 detik (free tier)
- Repository size ideal: < 100 MB
