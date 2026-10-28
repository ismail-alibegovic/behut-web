import type { SiteImage as ImageConfig } from '@/data/site-config'

export function SiteImage({ image, className = '', priority = false, aspectRatio, sizes }: { image: ImageConfig; className?: string; priority?: boolean; aspectRatio?: string; sizes?: string }) {
  return <picture className={`site-photo ${className}`} style={{ aspectRatio: aspectRatio ?? image.aspectRatio }}>
    {image.mobileSrc && <source media="(max-width: 640px)" srcSet={image.mobileSrc} />}
    <img src={image.src} alt={image.alt} width={image.width} height={image.height} sizes={sizes} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" style={{ objectPosition: image.position ?? 'center', objectFit: image.fit ?? 'cover' }} />
  </picture>
}
