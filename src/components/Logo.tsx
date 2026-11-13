/**
 * Recreation of the Ranaka logo card: a gold "R" in a fine gold ring on a
 * navy disc, with the RANAKA / BEAUTY SALON wordmark. Swap for the official
 * artwork when it is available.
 */
export function Monogram({size = 56, className = ''}: {size?: number; className?: string}) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-hidden>
      <circle cx="32" cy="32" r="32" fill="#141a3d" />
      <circle cx="32" cy="32" r="23" fill="none" stroke="#c9a45c" strokeWidth="1.2" />
      <path d="M17 44c4-2 6-5 7-9M47 20c-4 2-6 5-7 9" stroke="#c9a45c" strokeWidth="0.6" fill="none" opacity="0.7" />
      <text x="32" y="42.5" textAnchor="middle" fontFamily="'Libre Caslon Condensed', Georgia, serif" fontSize="31" fill="#c9a45c">
        R
      </text>
    </svg>
  );
}

export function Wordmark({className = '', tone = 'light'}: {className?: string; tone?: 'light' | 'dark'}) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Monogram size={44} />
      <span className="flex flex-col leading-none">
        <span className="display text-[24px] tracking-[0.18em] text-gold">Ranaka</span>
        <span className={`caps mt-1 text-[9.5px] tracking-[0.32em] ${tone === 'light' ? 'text-white/80' : 'text-ink/70'}`}>Beauty salon</span>
      </span>
    </span>
  );
}
