/* Originalne line-art ilustracije: grana u behutu (cvjetanju), list i ikone za meni bez fotografije. */

type Leaf = [x: number, y: number, angle: number, length: number]
type Blossom = [x: number, y: number, radius: number, turn: number]

// List kao dvije krivulje od peteljke do vrha, sa srednjom žilom.
const leafPath = (length: number) => {
  const w = length * 0.34
  return `M0 0 C ${w} ${-length * 0.2} ${w * 0.9} ${-length * 0.75} 0 ${-length} C ${-w * 0.9} ${-length * 0.75} ${-w} ${-length * 0.2} 0 0 M0 ${-length * 0.08} Q ${w * 0.12} ${-length * 0.5} 0 ${-length * 0.9}`
}

function LeafShape({ leaf: [x, y, angle, length] }: { leaf: Leaf }) {
  return <path d={leafPath(length)} transform={`translate(${x} ${y}) rotate(${angle})`} />
}

function BlossomShape({ blossom: [x, y, r, turn] }: { blossom: Blossom }) {
  return <g transform={`translate(${x} ${y}) rotate(${turn})`}>
    {[0, 72, 144, 216, 288].map(a => <path key={a} transform={`rotate(${a})`} d={`M0 0 C ${r * 0.55} ${-r * 0.35} ${r * 0.5} ${-r} 0 ${-r * 1.05} C ${-r * 0.5} ${-r} ${-r * 0.55} ${-r * 0.35} 0 0`} />)}
    <circle r={r * 0.16} />
    {[20, 92, 164, 236, 308].map(a => <path key={a} transform={`rotate(${a})`} d={`M0 ${-r * 0.18} L0 ${-r * 0.48}`} />)}
  </g>
}

const branch = {
  stems: [
    'M118 318 C 116 262 132 214 114 162 C 98 114 104 64 138 14',
    'M116 236 C 96 222 72 214 44 220',
    'M122 186 C 146 170 170 160 202 164',
    'M106 118 C 86 104 74 88 70 62',
    'M120 74 C 140 64 152 50 160 30',
  ],
  leaves: [[44, 220, -64, 34], [68, 216, -150, 28], [202, 164, 70, 36], [176, 162, 160, 26], [70, 62, -12, 30], [96, 100, -120, 22], [126, 266, 52, 30], [112, 292, -40, 26]] as Leaf[],
  blossoms: [[138, 14, 13, 10], [160, 30, 10, 40], [92, 210, 9, 18], [150, 172, 10, 52]] as Blossom[],
  buds: [[52, 210], [192, 152], [84, 82]],
}

export function BlossomBranch({ className = '' }: { className?: string }) {
  return <svg className={`botanical ${className}`} viewBox="0 0 240 330" fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {branch.stems.map(d => <path key={d} d={d} />)}
    {branch.leaves.map(leaf => <LeafShape key={leaf.join()} leaf={leaf} />)}
    {branch.blossoms.map(b => <BlossomShape key={b.join()} blossom={b} />)}
    {branch.buds.map(([x, y]) => <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="3.4" ry="5.2" transform={`rotate(-25 ${x} ${y})`} />)}
  </svg>
}

const sprigLeaves: Leaf[] = [[60, 170, -50, 30], [60, 170, 50, 30], [62, 136, -48, 28], [64, 134, 46, 26], [66, 102, -44, 24], [68, 100, 42, 22], [70, 70, -38, 20], [72, 68, 36, 18], [74, 42, 0, 18]]

export function LeafSprig({ className = '' }: { className?: string }) {
  return <svg className={`botanical ${className}`} viewBox="0 0 140 220" fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M58 214 C 60 170 64 110 74 42" />
    {sprigLeaves.map(leaf => <LeafShape key={leaf.join()} leaf={leaf} />)}
  </svg>
}

export function SingleBlossom({ className = '' }: { className?: string }) {
  return <svg className={`botanical ${className}`} viewBox="-30 -30 60 60" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" aria-hidden="true" focusable="false">
    <BlossomShape blossom={[0, 0, 22, 8]} />
  </svg>
}

/** Ikone za stavke menija bez fotografije: fildžan, čaša, kolač. */
export function MenuIcon({ type }: { type: 'cup' | 'glass' | 'pastry' }) {
  return <svg className="menu-icon" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {type === 'cup' && <>
      <path d="M22 34 H58 L54 56 C 53 60 50 62 46 62 H34 C 30 62 27 60 26 56 Z" />
      <path d="M18 66 C 28 70 52 70 62 66" />
      <path d="M26 42 C 34 45 46 45 54 42" />
      <path d="M34 26 C 30 22 38 18 34 12 M44 26 C 40 22 48 18 44 12" />
    </>}
    {type === 'glass' && <>
      <path d="M26 16 H54 L50 64 C 50 66 48 68 46 68 H34 C 32 68 30 66 30 64 Z" />
      <path d="M28 30 H52" />
      <path d="M36 40 l4 -4 l4 4 l-4 4 Z M42 52 l3 -3 l3 3 l-3 3 Z" />
      <path d="M46 16 L56 6" />
    </>}
    {type === 'pastry' && <>
      <path d="M14 56 C 26 62 54 62 66 56" />
      <path d="M20 50 L40 26 L60 50 Z" />
      <path d="M27 42 H53 M33 34 H47" />
      <path d="M36 50 l4 -5 l4 5" />
    </>}
  </svg>
}
