// Picto « vrille » : la tige de vigne qui s'enroule. Spirale en demi-cercles
// alternant deux centres, précédée d'une tige qui y entre tangentiellement.
export const VRILLE_PATH =
  'M14 60 C20 46 52 48 52 24 A12 12 0 0 0 28 24 A10 10 0 0 0 48 24 A8 8 0 0 0 32 24 A6 6 0 0 0 44 24 A4 4 0 0 0 36 24 A2 2 0 0 0 40 24';

export function Vrille({ className = '', strokeWidth = 4, draw = false }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <path
        d={VRILLE_PATH}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        className={draw ? 'draw-path' : ''}
      />
      <circle cx="14" cy="60" r={strokeWidth * 0.9} fill="currentColor" />
    </svg>
  );
}

export default function Logo({ size = 'md' }) {
  const box = size === 'sm' ? 'w-7 h-7' : 'w-9 h-9';
  const text = size === 'sm' ? 'text-base' : 'text-lg';
  return (
    <span className="flex items-center gap-2.5">
      <span className={`${box} rounded-xl bg-vine text-ink flex items-center justify-center`}>
        <Vrille className="w-[78%] h-[78%]" strokeWidth={3.6} />
      </span>
      <span className={`font-display font-extrabold tracking-tight text-white ${text}`}>
        LEO Labs
      </span>
    </span>
  );
}
