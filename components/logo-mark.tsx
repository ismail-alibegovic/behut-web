/** Behut logo kao maska: isti crtež, boja iz tokena (--logo-color). Naziv daje roditeljski link. */
export function LogoMark({ className = '' }: { className?: string }) {
  return <span className={`logo-mark ${className}`} aria-hidden="true" />
}
