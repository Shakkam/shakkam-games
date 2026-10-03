'use client';

import { useEffect, useRef, useState } from 'react';

export const LANG_KEY = 'leolabs-lang';

// Langue sauvegardée, sinon celle du navigateur si elle est disponible.
export function useLang(available) {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LANG_KEY) || localStorage.getItem('shakkam-lang');
      if (saved && available.includes(saved)) { setLang(saved); return; }
    } catch {}
    const code = (navigator.language || '').slice(0, 2).toLowerCase();
    if (available.includes(code)) setLang(code);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const change = (code) => {
    setLang(code);
    try { localStorage.setItem(LANG_KEY, code); } catch {}
  };

  return [lang, change];
}

export default function LangSwitcher({ lang, langs, onChange, accent = 'bg-vine text-ink' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const close = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Language"
        className="flex items-center gap-1.5 text-xs font-mono uppercase text-zinc-300 hover:text-white border border-white/10 hover:border-white/30 rounded-full px-3 py-1.5 transition-colors"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
        </svg>
        {lang}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 grid grid-cols-4 gap-1 p-1.5 rounded-2xl bg-zinc-900/95 border border-white/10 backdrop-blur-md shadow-2xl z-50">
          {langs.map((code) => (
            <button
              key={code}
              onClick={() => { onChange(code); setOpen(false); }}
              className={`text-xs font-mono uppercase px-2.5 py-1.5 rounded-lg transition-colors ${
                lang === code ? accent : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {code}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
