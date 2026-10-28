import type { FrameVariant } from '@/data/menu'
import type { SiteImage as ImageConfig } from '@/data/site-config'
import { SiteImage } from '../site-image'

/**
 * Antique-inspired picture frame built purely with CSS (borders, gradients and
 * pseudo-elements). Variants: slim brass double-line, walnut with a fine gold
 * inner border, and an engraved bronze moulding.
 */
export function PictureFrame({ image, variant = 'brass', className = '', sizes, priority, placeholder }: { image?: ImageConfig; variant?: FrameVariant; className?: string; sizes?: string; priority?: boolean; placeholder?: React.ReactNode }) {
  return <div className={`frame frame--${variant} ${className}`}>
    <div className="frame-mat">
      <div className="frame-window">
        {image ? <SiteImage image={image} sizes={sizes} priority={priority} /> : <div className="frame-empty">{placeholder}</div>}
      </div>
    </div>
  </div>
}
