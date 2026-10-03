function PlayIcon() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
      <path d="M1.22 0c-.26.13-.44.39-.44.69V23.31c0 .3.18.56.44.69l.06.03L13.09 12.2v-.28L1.28-.03 1.22 0z" fill="#4FC3F7" />
      <path d="M17.03 16.12l-3.94-3.93v-.28l3.94-3.93.09.05 4.67 2.65c1.33.76 1.33 2 0 2.76l-4.67 2.65-.09.03z" fill="#FFD600" />
      <path d="M17.12 16.09L13.09 12 1.22 23.69c.44.47 1.16.52 1.67.13l14.23-7.73" fill="#F44336" />
      <path d="M17.12 7.91L2.89 .18C2.38-.21 1.66-.16 1.22.31L13.09 12l4.03-4.09z" fill="#4CAF50" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg className="w-5 h-5 flex-shrink-0 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

export default function StoreLinks({ game, label }) {
  const cls = 'relative z-10 flex items-center gap-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-xl px-3.5 py-2 transition-colors';
  return (
    <div className="flex flex-wrap gap-2.5">
      <a href={game.play} target="_blank" rel="noopener noreferrer" className={cls} onClick={(e) => e.stopPropagation()}>
        <PlayIcon />
        <span className="text-left leading-none">
          <span className="block text-[10px] text-zinc-500 mb-0.5">{label}</span>
          <span className="block text-sm font-semibold text-white">Google Play</span>
        </span>
      </a>
      <a href={game.apple} target="_blank" rel="noopener noreferrer" className={cls} onClick={(e) => e.stopPropagation()}>
        <AppleIcon />
        <span className="text-left leading-none">
          <span className="block text-[10px] text-zinc-500 mb-0.5">{label}</span>
          <span className="block text-sm font-semibold text-white">App Store</span>
        </span>
      </a>
    </div>
  );
}
