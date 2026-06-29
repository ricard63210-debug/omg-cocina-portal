// Rose SVG decoration for section dividers and accents
export function RoseSVG({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Center */}
      <circle cx="32" cy="32" r="5" fill="#E91E8C" opacity="0.9" />
      {/* Inner petals */}
      <ellipse cx="32" cy="20" rx="5" ry="9" fill="#E91E8C" opacity="0.85" />
      <ellipse cx="32" cy="44" rx="5" ry="9" fill="#C0166E" opacity="0.85" />
      <ellipse cx="20" cy="32" rx="9" ry="5" fill="#E91E8C" opacity="0.85" />
      <ellipse cx="44" cy="32" rx="9" ry="5" fill="#C0166E" opacity="0.85" />
      {/* Outer petals */}
      <ellipse cx="21" cy="21" rx="5" ry="8" fill="#E91E8C" opacity="0.65" transform="rotate(-45 21 21)" />
      <ellipse cx="43" cy="21" rx="5" ry="8" fill="#C0166E" opacity="0.65" transform="rotate(45 43 21)" />
      <ellipse cx="21" cy="43" rx="5" ry="8" fill="#E91E8C" opacity="0.65" transform="rotate(45 21 43)" />
      <ellipse cx="43" cy="43" rx="5" ry="8" fill="#C0166E" opacity="0.65" transform="rotate(-45 43 43)" />
      {/* Gold stamen */}
      <circle cx="32" cy="32" r="3" fill="#D4AF37" />
      <circle cx="32" cy="28" r="1.5" fill="#F0D060" />
      <circle cx="36" cy="34" r="1.5" fill="#F0D060" />
      <circle cx="28" cy="34" r="1.5" fill="#F0D060" />
    </svg>
  )
}

// Large decorative background rose
export function RoseWatermark({ className = '' }: { className?: string }) {
  return (
    <svg
      width="400"
      height="400"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="32" cy="32" r="5" fill="#E91E8C" opacity="0.08" />
      <ellipse cx="32" cy="20" rx="5" ry="9" fill="#E91E8C" opacity="0.07" />
      <ellipse cx="32" cy="44" rx="5" ry="9" fill="#C0166E" opacity="0.07" />
      <ellipse cx="20" cy="32" rx="9" ry="5" fill="#E91E8C" opacity="0.07" />
      <ellipse cx="44" cy="32" rx="9" ry="5" fill="#C0166E" opacity="0.07" />
      <ellipse cx="21" cy="21" rx="5" ry="8" fill="#E91E8C" opacity="0.05" transform="rotate(-45 21 21)" />
      <ellipse cx="43" cy="21" rx="5" ry="8" fill="#C0166E" opacity="0.05" transform="rotate(45 43 21)" />
      <ellipse cx="21" cy="43" rx="5" ry="8" fill="#E91E8C" opacity="0.05" transform="rotate(45 21 43)" />
      <ellipse cx="43" cy="43" rx="5" ry="8" fill="#C0166E" opacity="0.05" transform="rotate(-45 43 43)" />
      <circle cx="32" cy="32" r="3" fill="#D4AF37" opacity="0.06" />
      {/* Stem */}
      <path d="M32 37 C30 45 28 52 30 60" stroke="#2A6B30" strokeWidth="1.5" opacity="0.06" fill="none" />
      {/* Leaves */}
      <ellipse cx="27" cy="50" rx="6" ry="3" fill="#2A6B30" opacity="0.06" transform="rotate(-30 27 50)" />
      <ellipse cx="34" cy="54" rx="5" ry="2.5" fill="#2A6B30" opacity="0.06" transform="rotate(20 34 54)" />
    </svg>
  )
}

// Section divider with rose icon
export function SectionDivider({ title }: { title: string }) {
  return (
    <div className="rose-divider">
      <RoseSVG size={24} />
      <span className="text-gradient-pink-gold section-title">{title}</span>
      <RoseSVG size={24} />
    </div>
  )
}
