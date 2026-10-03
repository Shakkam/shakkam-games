'use client';

import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';
import Logo, { Vrille } from './Logo';
import LangSwitcher, { useLang } from './LangSwitcher';
import StoreLinks from './StoreLinks';
import { Reveal, SpotlightCard } from './Interactive';
import { commonLangs } from '@/app/project-i18n';

const TONES = {
  amber: { glow: 'from-amber-900/30', badge: 'bg-amber-400/10 text-amber-300 border-amber-400/30', dot: 'bg-amber-300', shadow: 'shadow-amber-900/50' },
  cyan: { glow: 'from-cyan-900/30', badge: 'bg-cyan-400/10 text-cyan-300 border-cyan-400/30', dot: 'bg-cyan-300', shadow: 'shadow-cyan-900/50' },
};

export function SectionTitle({ children }) {
  return (
    <Reveal className="mb-8">
      <h2 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight text-white">{children}</h2>
    </Reveal>
  );
}

// Gabarit commun des pages projet : en-tête, hero, trois atouts, contenu libre, autres projets, footer.
// `children` est une fonction (t, lang) pour accéder aux textes de la langue courante.
export default function ProjectShell({ name, icon, iconPixel = false, tone = 'amber', status = 'available', stores, content, others = [], children }) {
  const codes = Object.keys(content);
  const [lang, setLang] = useLang(codes);
  const t = content[lang];
  const c = commonLangs[lang];
  const tn = TONES[tone];

  const features = [
    { title: t.f1t, desc: t.f1d },
    { title: t.f2t, desc: t.f2d },
    { title: t.f3t, desc: t.f3d },
  ];

  return (
    <div className="min-h-screen bg-ink text-white overflow-x-hidden">
      <div className="grain" aria-hidden="true" />

      <header className="fixed top-0 inset-x-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-4">
          <nav className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-ink/60 backdrop-blur-xl px-4 py-2.5">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors text-sm">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                {c.back}
              </Link>
              <span className="text-zinc-700 text-xs">|</span>
              <Link href="/" aria-label="LEO Labs"><Logo size="sm" /></Link>
            </div>
            <LangSwitcher lang={lang} langs={codes} onChange={setLang} />
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className={`absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b ${tn.glow} to-transparent pointer-events-none`} aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <Vrille className="absolute -right-20 top-10 w-[420px] h-[420px] text-vine/10 pointer-events-none" strokeWidth={1} />

        <div className="relative mx-auto max-w-5xl grid md:grid-cols-[auto_1fr] gap-10 md:gap-14 items-center">
          <img
            src={icon}
            alt={name}
            className={`hero-in w-40 h-40 md:w-56 md:h-56 rounded-[2.6rem] shadow-2xl ${tn.shadow} ${iconPixel ? 'pixelated bg-[#3b3d40] object-cover border border-white/10' : ''}`}
          />
          <div>
            <span className={`hero-in inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest border rounded-full px-2.5 py-1 mb-5 ${tn.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${tn.dot}`} />
              {status === 'available' ? c.available : c.prototype}
            </span>
            <h1 className="hero-in font-display font-extrabold tracking-tight leading-[0.95] text-4xl sm:text-6xl md:text-7xl mb-5" style={{ animationDelay: '100ms' }}>
              {name}
            </h1>
            <p className="hero-in font-display text-xl sm:text-2xl font-bold text-vine mb-4" style={{ animationDelay: '180ms' }}>{t.tagline}</p>
            <p className="hero-in text-zinc-400 text-lg leading-relaxed max-w-2xl mb-8" style={{ animationDelay: '260ms' }}>{t.desc}</p>

            <div className="hero-in flex flex-wrap items-center gap-6" style={{ animationDelay: '340ms' }}>
              {stores ? (
                <>
                  <StoreLinks game={stores} label={c.getOn} />
                  <div className="hidden md:flex gap-3">
                    {[stores.play, stores.apple].map((u) => (
                      <div key={u} className="bg-white rounded-xl p-1.5">
                        <QRCodeSVG value={u} size={64} level="M" />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-zinc-500 text-sm border border-white/10 rounded-xl px-4 py-3">{c.soon}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Atouts */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 100}>
              <SpotlightCard className="h-full rounded-3xl border border-white/10 bg-zinc-950 p-6" tilt={false}>
                <span className="font-mono text-xs text-vine">0{i + 1}</span>
                <h3 className="font-display font-extrabold text-xl mt-3 mb-2">{f.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{f.desc}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {children(t, lang)}

      {/* Autres projets */}
      {others.length > 0 && (
        <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-24">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500 mb-5">{c.otherGames}</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {others.map((o) => (
              <Link key={o.href} href={o.href} className="group flex items-center gap-4 rounded-2xl border border-white/10 hover:border-vine/40 bg-zinc-950 p-4 transition-colors">
                <img src={o.img} alt="" className={`w-14 h-14 rounded-2xl ${o.pixel ? 'pixelated bg-[#3b3d40] object-cover' : ''}`} />
                <span className="font-display font-bold text-lg flex-1 leading-tight">{o.name}</span>
                <svg className="w-5 h-5 text-zinc-600 group-hover:text-vine group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" /></svg>
              </Link>
            ))}
          </div>
        </section>
      )}

      <footer className="border-t border-white/10 px-4 sm:px-6 py-8">
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row justify-between gap-3 text-sm text-zinc-500">
          <span className="flex items-center gap-2"><Vrille className="w-4 h-4 text-vine" strokeWidth={6} />LEO Labs · Shakkam Games</span>
          <span>© {new Date().getFullYear()} LEO Labs</span>
        </div>
      </footer>
    </div>
  );
}
