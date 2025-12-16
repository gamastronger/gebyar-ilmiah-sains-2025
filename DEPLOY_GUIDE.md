# 🚀 Panduan Deploy ke Vercel

## Langkah-langkah Deploy

### 1. Persiapan Akun Vercel

1. Kunjungi [vercel.com](https://vercel.com)
2. Klik **"Sign Up"** atau **"Login"**
3. Pilih **"Continue with GitHub"** untuk koneksi otomatis

### 2. Import Project

1. Setelah login, klik **"Add New..."** → **"Project"**
2. Pilih repository: `gamastronger/gebyar-ilmiah-sains-2025`
3. Klik **"Import"**

### 3. Configure Project

Vercel akan auto-detect sebagai Vite project. Pastikan:

```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### 4. Environment Variables (Jika Ada)

Jika ada file `.env`, tambahkan variable di Vercel:

1. Buka tab **"Environment Variables"**
2. Tambahkan setiap variable dari `.env` Anda
3. Contoh:
   ```
   VITE_API_URL=https://your-api.com
   VITE_FIREBASE_API_KEY=your-key
   ```

### 5. Deploy

1. Klik **"Deploy"**
2. Tunggu 2-3 menit
3. Selesai! 🎉

## URL Production

Setelah deploy sukses, Anda akan mendapat URL seperti:
```
https://gebyar-ilmiah-sains-2025.vercel.app
```

## Custom Domain (Opsional)

Untuk menggunakan domain sendiri:

1. Buka project di Vercel Dashboard
2. Klik **"Settings"** → **"Domains"**
3. Tambahkan domain Anda
4. Update DNS records sesuai instruksi Vercel

## Auto Deploy

✅ Setiap kali Anda `git push` ke branch `main`, Vercel akan otomatis deploy ulang!

## Troubleshooting

### Build Failed

**Error: "Module not found"**
```bash
# Di local, pastikan semua dependency terinstall:
npm install
npm run build

# Jika berhasil di local, push ulang ke GitHub
```

**Error: "Out of memory"**
- Repository terlalu besar
- Hapus file besar (sudah dilakukan ✅)

### Runtime Errors

**404 on Refresh**
- Sudah di-handle dengan `vercel.json` ✅

**Assets not loading**
- Pastikan path menggunakan `/` bukan `./`
- Contoh: `/css/tailwind.css` bukan `./css/tailwind.css`

## Performance Tips

### 1. Optimasi Build

File `vite.config.js` sudah dikonfigurasi dengan baik:
```javascript
build: {
  outDir: 'dist',
}
```

### 2. Lazy Loading

Gunakan dynamic imports untuk route:
```javascript
const Dashboard = lazy(() => import('./pages/Dashboard'));
```

### 3. Image Optimization

Untuk gambar besar, gunakan:
- Cloudinary (recommended)
- Vercel Image Optimization
- Next.js Image component (jika migrate)

## Monitoring

Setelah deploy, monitor:

1. **Analytics**: Vercel Dashboard → Analytics
2. **Logs**: Vercel Dashboard → Deployments → Logs
3. **Speed Insights**: Aktifkan di Settings

## Biaya

✅ **Free Tier** mencakup:
- Bandwidth: 100GB/bulan
- Builds: 6000 menit/bulan
- Deployments: Unlimited
- Team members: 1

⚠️ Cukup untuk project ini!

## Checklist Deploy

- [x] Repository dibersihkan dari file besar
- [x] .gitignore sudah benar
- [x] vercel.json sudah dikonfigurasi
- [x] PropTypes ditambahkan (linting clean)
- [ ] Push ke GitHub
- [ ] Import ke Vercel
- [ ] Deploy
- [ ] Test production URL
- [ ] Setup custom domain (opsional)

## Support

Jika ada masalah:
1. Cek [Vercel Docs](https://vercel.com/docs)
2. Cek logs di Vercel Dashboard
3. Review console errors di browser

---

**Status Repository**: ✅ SIAP DEPLOY

Last Updated: ${new Date().toLocaleDateString('id-ID')}
