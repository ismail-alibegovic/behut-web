/** Hairline divider with a small eight-point star, a nod to the geometric motifs of old Sarajevo interiors. */
export function Ornament({ className = '' }: { className?: string }) {
  return <svg className={`ornament ${className}`} viewBox="0 0 120 12" aria-hidden="true" focusable="false">
    <line x1="0" y1="6" x2="48" y2="6" />
    <line x1="72" y1="6" x2="120" y2="6" />
    <rect x="55" y="1" width="10" height="10" />
    <rect x="55" y="1" width="10" height="10" transform="rotate(45 60 6)" />
    <circle cx="60" cy="6" r="1.4" />
  </svg>
}

/** Small editorial label: index number + text. */
export function Label({ index, children, className = '' }: { index?: string; children: React.ReactNode; className?: string }) {
  return <span className={`label ${className}`}>{index && <span className="label-index">{index}</span>}{children}</span>
}
