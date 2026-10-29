import Image from 'next/image'
import type { SiteImage as ImageConfig } from '@/data/site-config'

export function SiteImage({ image, className = '', priority = false, sizes = '100vw' }: { image: ImageConfig; className?: string; priority?: boolean; sizes?: string }) {
  return <span className={`site-photo ${className}`}>
    <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} style={{ objectPosition: image.position ?? 'center', objectFit: image.fit ?? 'cover' }} />
  </span>
}
