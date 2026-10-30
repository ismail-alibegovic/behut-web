// STATIC_EXPORT=1 pravi potpuno statičan sajt (folder out/) za cPanel hosting; bez toga je ovo običan Next build (Vercel).
const staticExport = process.env.STATIC_EXPORT === '1'

/** @type {import('next').NextConfig} */
const nextConfig = staticExport
  ? {
      output: 'export',
      // /meni/ -> meni/index.html: radi na svakom Apache hostingu bez rewrite pravila.
      trailingSlash: true,
      // Optimizacija slika traži Node server; slike su već webp u public/images.
      images: { unoptimized: true },
    }
  : {
      async headers() {
        return [{ source: '/:path*', headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
        ] }]
      },
      images: {
        formats: ['image/avif', 'image/webp'],
      },
    }

export default nextConfig
