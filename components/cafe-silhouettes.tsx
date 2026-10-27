import React from 'react'

/**
 * Delicate botanical silhouette & fine-line engraving of a Sarajevan Rose
 * ("Ruža đulbešećerka") with layered petals, rosebud, and serrated leaves.
 */
export function RoseBloomSilhouette({
  className = '',
  flip = false,
}: {
  className?: string
  flip?: boolean
}) {
  return (
    <svg
      viewBox="0 0 360 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
      aria-hidden="true"
    >
      <g opacity="0.9">
        {/* Outer soft silhouette petals */}
        <path
          d="M178 46C142 38 106 62 98 98C88 74 56 82 48 114C40 146 64 182 96 194C72 212 84 248 118 256C150 264 176 244 188 226C204 248 238 258 266 240C294 222 298 184 278 162C306 144 308 104 280 82C252 60 218 68 204 84C198 60 190 48 178 46Z"
          fill="currentColor"
          fillOpacity="0.22"
        />
        <path
          d="M176 72C150 66 124 84 120 112C102 104 82 122 86 148C90 174 114 190 136 192C126 210 142 232 168 232C194 232 210 212 212 194C234 202 258 186 260 160C262 134 242 114 220 114C224 90 202 78 176 72Z"
          fill="currentColor"
          fillOpacity="0.32"
        />
        {/* Inner rose heart */}
        <path
          d="M176 108C158 106 142 120 144 140C146 160 164 174 184 172C204 170 218 154 214 134C210 114 194 110 176 108Z"
          fill="currentColor"
          fillOpacity="0.45"
        />

        {/* Intricate botanical petal contours */}
        <path
          d="M176 138C168 136 164 128 170 122C178 114 192 120 192 132C192 146 176 154 162 148C146 142 142 122 154 108C166 94 192 94 206 110C220 126 216 154 196 166C176 178 146 172 132 152"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M124 114C104 118 92 140 102 162C112 184 140 194 166 188"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M214 104C236 106 254 126 248 150C242 174 216 188 190 184"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M142 98C152 76 182 70 204 84C226 98 232 126 220 148"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M98 188C110 218 148 236 182 224C216 212 238 186 236 158"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Curved main stem */}
        <path
          d="M180 228C178 272 164 326 138 392"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Left Rose Leaf Branch */}
        <path
          d="M168 282C136 276 102 288 74 312"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M132 280C114 256 80 254 58 272C78 294 112 296 132 280Z"
          fill="currentColor"
          fillOpacity="0.38"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M96 294C76 286 48 298 36 322C62 332 88 318 96 294Z"
          fill="currentColor"
          fillOpacity="0.32"
          stroke="currentColor"
          strokeWidth="1.6"
        />

        {/* Right Rose Leaf & Secondary Rosebud */}
        <path
          d="M162 316C198 308 236 286 266 252"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M204 302C222 322 256 322 278 302C258 282 224 282 204 302Z"
          fill="currentColor"
          fillOpacity="0.36"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        {/* Rosebud silhouette at top right */}
        <path
          d="M266 252C262 232 276 212 298 206C296 228 286 248 266 252Z"
          fill="currentColor"
          fillOpacity="0.45"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </g>
    </svg>
  )
}

/**
 * Arabica coffee branch silhouette with layered botanical leaves and roasted coffee beans.
 */
export function CoffeeBranchSilhouette({
  className = '',
  flip = false,
}: {
  className?: string
  flip?: boolean
}) {
  return (
    <svg
      viewBox="0 0 380 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
      aria-hidden="true"
    >
      <g opacity="0.9">
        {/* Main sweeping branch stem */}
        <path
          d="M44 378C108 312 178 218 288 62"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
        />

        {/* Coffee Leaf 1 (Upper Left) */}
        <path
          d="M222 152C196 114 142 98 94 112C122 154 176 168 222 152Z"
          fill="currentColor"
          fillOpacity="0.32"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M222 152C178 138 136 124 96 112"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        {/* Coffee Leaf 2 (Upper Right) */}
        <path
          d="M242 126C282 114 328 132 352 170C306 182 264 162 242 126Z"
          fill="currentColor"
          fillOpacity="0.28"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M242 126C282 142 318 156 350 170"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        {/* Coffee Leaf 3 (Middle Left) */}
        <path
          d="M158 236C124 198 68 188 24 210C58 248 112 258 158 236Z"
          fill="currentColor"
          fillOpacity="0.36"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M158 236C114 226 70 218 26 210"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        {/* Coffee Leaf 4 (Lower Right) */}
        <path
          d="M134 268C182 262 232 286 256 328C206 336 158 312 134 268Z"
          fill="currentColor"
          fillOpacity="0.3"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M134 268C176 288 216 308 254 328"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        {/* Coffee Cherry / Bean Cluster at Stem Node 1 */}
        <g transform="translate(208 138) rotate(-24)">
          <ellipse cx="0" cy="0" rx="16" ry="22" fill="currentColor" fillOpacity="0.55" />
          <path
            d="M0 -18C-5 -6 5 6 0 18"
            stroke="var(--ivory, #f5eddb)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
        <g transform="translate(234 156) rotate(32)">
          <ellipse cx="0" cy="0" rx="14" ry="20" fill="currentColor" fillOpacity="0.48" />
          <path
            d="M0 -16C-4 -5 4 5 0 16"
            stroke="var(--ivory, #f5eddb)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>

        {/* Coffee Bean Cluster at Stem Node 2 */}
        <g transform="translate(144 222) rotate(-38)">
          <ellipse cx="0" cy="0" rx="17" ry="24" fill="currentColor" fillOpacity="0.55" />
          <path
            d="M0 -19C-5 -6 5 6 0 19"
            stroke="var(--ivory, #f5eddb)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
        <g transform="translate(172 244) rotate(22)">
          <ellipse cx="0" cy="0" rx="15" ry="21" fill="currentColor" fillOpacity="0.45" />
          <path
            d="M0 -16C-4 -5 4 5 0 16"
            stroke="var(--ivory, #f5eddb)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>

        {/* Floating Roasted Coffee Beans Silhouette */}
        <g transform="translate(298 64) rotate(18)">
          <ellipse cx="0" cy="0" rx="18" ry="25" fill="currentColor" fillOpacity="0.5" />
          <path
            d="M0 -20C-6 -6 6 6 0 20"
            stroke="var(--ivory, #f5eddb)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </g>
        <g transform="translate(88 332) rotate(-45)">
          <ellipse cx="0" cy="0" rx="19" ry="26" fill="currentColor" fillOpacity="0.52" />
          <path
            d="M0 -21C-6 -7 6 7 0 21"
            stroke="var(--ivory, #f5eddb)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </g>
      </g>
    </svg>
  )
}

/**
 * Scattered roasted coffee beans & rose petals cluster for subtle corner/margin life.
 */
export function CoffeeBeansCluster({
  className = '',
}: {
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 260 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Large Primary Coffee Bean Silhouette */}
      <g transform="translate(78 86) rotate(-28)">
        <ellipse cx="0" cy="0" rx="28" ry="38" fill="currentColor" fillOpacity="0.42" />
        <ellipse
          cx="0"
          cy="0"
          rx="28"
          ry="38"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M0 -31C-9 -10 9 10 0 31"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </g>

      {/* Secondary Tilted Bean */}
      <g transform="translate(154 68) rotate(36)">
        <ellipse cx="0" cy="0" rx="22" ry="31" fill="currentColor" fillOpacity="0.34" />
        <ellipse
          cx="0"
          cy="0"
          rx="22"
          ry="31"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M0 -25C-7 -8 7 8 0 25"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      {/* Third Smaller Bean */}
      <g transform="translate(126 148) rotate(-14)">
        <ellipse cx="0" cy="0" rx="19" ry="27" fill="currentColor" fillOpacity="0.3" />
        <ellipse
          cx="0"
          cy="0"
          rx="19"
          ry="27"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M0 -21C-6 -7 6 7 0 21"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </g>

      {/* Delicate floating rose petals */}
      <path
        d="M196 122C214 114 232 126 228 144C224 162 200 164 192 148C186 136 188 126 196 122Z"
        fill="currentColor"
        fillOpacity="0.24"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M36 146C50 138 66 148 62 164C58 180 38 180 32 166C28 156 30 150 36 146Z"
        fill="currentColor"
        fillOpacity="0.22"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  )
}

/**
 * Context-aware silhouette watermark for Menu Cards & Ritual Seal.
 */
export function CardBotanicalWatermark({
  variant,
  className = '',
}: {
  variant: 'coffee' | 'rose' | 'mint' | 'sweet'
  className?: string
}) {
  if (variant === 'rose') {
    return (
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        <path
          d="M100 32C76 28 54 44 50 68C34 64 20 80 24 102C28 124 48 136 66 138C60 154 74 172 96 172C118 172 132 154 132 138C152 142 172 126 172 104C172 82 154 68 136 68C138 46 120 36 100 32Z"
          fill="currentColor"
          fillOpacity="0.18"
        />
        <path
          d="M100 98C92 96 88 88 94 82C102 74 116 80 116 92C116 106 100 114 86 108C70 102 66 82 78 68C90 54 116 54 130 70C144 86 140 114 120 126C100 138 70 132 56 112"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M66 138C78 160 110 168 134 152"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  if (variant === 'mint') {
    return (
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        {/* Citrus Wheel & Fresh Mint Leaves Silhouette */}
        <circle
          cx="118"
          cy="86"
          r="46"
          fill="currentColor"
          fillOpacity="0.14"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle
          cx="118"
          cy="86"
          r="36"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="4 4"
        />
        <path
          d="M118 46V126M78 86H158M90 58L146 114M146 58L90 114"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M44 156C64 128 96 104 128 92"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M92 114C78 90 48 86 30 102C46 122 74 126 92 114Z"
          fill="currentColor"
          fillOpacity="0.28"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M84 126C98 148 128 152 146 136C130 116 102 114 84 126Z"
          fill="currentColor"
          fillOpacity="0.24"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    )
  }

  if (variant === 'sweet') {
    return (
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        {/* Traditional Bosnian Diamond Rosette & Leaf */}
        <g transform="translate(100 100)">
          <rect
            x="-46"
            y="-46"
            width="92"
            height="92"
            rx="8"
            transform="rotate(45)"
            fill="currentColor"
            fillOpacity="0.16"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <rect
            x="-32"
            y="-32"
            width="64"
            height="64"
            rx="4"
            transform="rotate(45)"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <circle cx="0" cy="0" r="14" fill="currentColor" fillOpacity="0.28" />
        </g>
      </svg>
    )
  }

  // Default: 'coffee' — Dual Roasted Coffee Beans & Arabica Leaf Silhouette
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M42 148C78 118 118 78 158 36"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeDasharray="3 5"
      />
      <g transform="translate(78 88) rotate(-26)">
        <ellipse
          cx="0"
          cy="0"
          rx="28"
          ry="39"
          fill="currentColor"
          fillOpacity="0.22"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M0 -31C-9 -10 9 10 0 31"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </g>
      <g transform="translate(132 114) rotate(28)">
        <ellipse
          cx="0"
          cy="0"
          rx="23"
          ry="33"
          fill="currentColor"
          fillOpacity="0.18"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M0 -26C-7 -8 7 8 0 26"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}

