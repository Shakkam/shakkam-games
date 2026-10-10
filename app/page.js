'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Logo, { Vrille, VRILLE_PATH } from '@/components/Logo';
import LangSwitcher, { useLang } from '@/components/LangSwitcher';
import { SpotlightCard, Reveal } from '@/components/Interactive';
import StoreLinks from '@/components/StoreLinks';
import { homeLangs } from './home-i18n';

const LANG_CODES = Object.keys(homeLangs);

const GAMES = {
  gym: {
    name: 'Guess Your Mind',
    img: '/images/projects/guess-your-mind.webp',
    href: '/guess-your-mind',
    play: 'https://play.google.com/store/apps/details?id=com.shakkam.guessyourmind',
    apple: 'https://apps.apple.com/fr/app/guessyourmind/id6769421421',
    stack: ['iOS', 'Android', 'Expo'],
  },
  fq: {
    name: 'Family Quiz',
    img: '/images/projects/family-quiz.webp',
    href: '/family-quiz',
    play: 'https://play.google.com/store/apps/details?id=com.shakkam.familyquiz',
    apple: 'https://apps.apple.com/app/id6782669677',
    stack: ['iOS', 'Android', 'Expo'],
  },
  sd: {
    name: 'Seek and Destroy and Return the Ball',
    href: '/seek-and-destroy',
    img: '/images/projects/seek-and-destroy.webp',
    stack: ['Lua', 'PC'],
  },
};

const SITES = [
  { key: 'tl', name: '2-LIMITED', url: 'https://2limited.fr', domain: '2limited.fr', img: '/images/projects/2limited.webp' },
  { key: 'sk', name: 'SHAKKAM', url: 'https://shakkam.me', domain: 'shakkam.me', img: '/images/projects/shakkam-me.webp' },
  { key: 'lm', name: 'Laurent Christin', url: 'https://laurent-massage.vercel.app', domain: 'laurent-massage.vercel.app', img: '/images/projects/laurent-christin.webp' },
  { key: 'ml', name: 'Madeleine & Léon', url: 'https://www.madeleine-leon.fr', domain: 'madeleine-leon.fr', img: '/images/projects/madeleine-leon.webp' },
];

const MARQUEE = ['iOS', 'Android', 'Web', 'Next.js', 'React Native', 'Lua', 'Game design', 'UX / UI', 'Motion', 'i18n'];

function Chips({ items }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((s) => (
        <span key={s} className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 border border-white/10 rounded-full px-2.5 py-0.5">
          {s}
        </span>
      ))}
    </div>
  );
}

function Badge({ children, tone = 'vine' }) {
  const tones = {
    vine: 'bg-vine/10 text-vine border-vine/30',
    amber: 'bg-amber-400/10 text-amber-300 border-amber-400/30',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest border rounded-full px-2.5 py-1 ${tones[tone]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${tone === 'vine' ? 'bg-vine' : 'bg-amber-300'} animate-pulse`} />
      {children}
    </span>
  );
}

function SectionHead({ kicker, title, sub }) {
  return (
    <Reveal className="mb-12 md:mb-16 max-w-3xl">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-vine mb-4">{kicker}</p>
      <h2 className="font-display font-extrabold text-5xl md:text-7xl tracking-tight leading-[0.95] text-white mb-5">{title}</h2>
      {sub && <p className="text-zinc-400 text-lg leading-relaxed">{sub}</p>}
    </Reveal>
  );
}

function SubHead({ title, sub }) {
  return (
    <Reveal className="mb-8 flex flex-col md:flex-row md:items-end gap-2 md:gap-8 border-t border-white/10 pt-8">
      <h3 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight text-white">{title}</h3>
      <p className="text-zinc-400 md:pb-1 max-w-xl">{sub}</p>
    </Reveal>
  );
}

function BrowserFrame({ domain, src }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950 overflow-hidden shadow-2xl shadow-black/60">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10 bg-white/[0.03]">
        <span className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-white/15" /><span className="w-2 h-2 rounded-full bg-white/15" /><span className="w-2 h-2 rounded-full bg-white/15" />
        </span>
        <span className="flex-1 text-center font-mono text-[10px] text-zinc-500">{domain}</span>
      </div>
      <img src={src} alt="" className="w-full aspect-[16/9] object-cover block" />
    </div>
  );
}

function ShotFrame({ src, glow }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-black overflow-hidden shadow-2xl ${glow}`}>
      <img src={src} alt="" className="w-full block" />
    </div>
  );
}

export default function Home() {
  const [lang, setLang] = useLang(LANG_CODES);
  const t = homeLangs[lang];
  const heroRef = useRef(null);

  // Le hero suit le pointeur : halo lumineux + parallaxe des cartes flottantes.
  useEffect(() => {
    const el = heroRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const onMove = (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--hx', `${e.clientX - r.left}px`);
        el.style.setProperty('--hy', `${e.clientY - r.top}px`);
        el.style.setProperty('--px', ((e.clientX / r.width) - 0.5).toFixed(3));
        el.style.setProperty('--py', ((e.clientY / r.height) - 0.5).toFixed(3));
      });
    };
    window.addEventListener('pointermove', onMove);
    return () => { window.removeEventListener('pointermove', onMove); cancelAnimationFrame(frame); };
  }, []);

  return (
    <div className="min-h-screen bg-ink text-white overflow-x-hidden">
      <div className="grain" aria-hidden="true" />

      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-4">
          <nav className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-ink/60 backdrop-blur-xl px-4 py-2.5">
            <a href="#top" aria-label="LEO Labs"><Logo size="sm" /></a>
            <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
              <a href="#sites" className="hover:text-white transition-colors">{t.navSites}</a>
              <a href="#games" className="hover:text-white transition-colors">{t.navGames}</a>
              <a href="#studio" className="hover:text-white transition-colors">{t.navAbout}</a>
              <a href="#contact" className="hover:text-white transition-colors">{t.navContact}</a>
            </div>
            <LangSwitcher lang={lang} langs={LANG_CODES} onChange={setLang} />
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="top" ref={heroRef} className="hero relative min-h-[100svh] flex items-center overflow-hidden pt-28 pb-16">
        <div className="hero-spot" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />

        {/* Grande vrille qui se dessine en fond */}
        <svg
          viewBox="0 0 64 64"
          fill="none"
          aria-hidden="true"
          className="absolute -right-[18vw] md:-right-[6vw] top-1/2 -translate-y-1/2 w-[95vw] md:w-[62vw] max-w-[900px] text-vine/25 pointer-events-none"
        >
          <path d={VRILLE_PATH} stroke="currentColor" strokeWidth={0.6} strokeLinecap="round" pathLength={1} className="draw-path draw-slow" />
        </svg>

        <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-12 items-center">
          <div>
            <p className="hero-in font-mono text-[11px] sm:text-xs uppercase tracking-[0.3em] text-zinc-400 mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-vine" />
              {t.eyebrow}
            </p>

            <h1 className="font-display font-extrabold leading-[0.82] tracking-tighter select-none">
              <span className="hero-in block text-[19vw] sm:text-[15vw] lg:text-[min(10.5vw,9.5rem)] text-outline" style={{ animationDelay: '80ms' }}>
                LEO
              </span>
              <span className="hero-in block text-[19vw] sm:text-[15vw] lg:text-[min(10.5vw,9.5rem)] text-white" style={{ animationDelay: '180ms' }}>
                LABS<span className="text-vine">.</span>
              </span>
            </h1>

            <p className="hero-in mt-8 font-display text-2xl sm:text-4xl font-bold text-white" style={{ animationDelay: '320ms' }}>
              {t.tagline}
            </p>
            <p className="hero-in mt-3 text-zinc-400 text-base sm:text-lg max-w-xl" style={{ animationDelay: '400ms' }}>
              {t.sub}
            </p>

            <div className="hero-in mt-10 flex flex-wrap items-center gap-4" style={{ animationDelay: '480ms' }}>
              <a href="#work" className="group inline-flex items-center gap-2 bg-vine text-ink font-bold rounded-full px-6 py-3.5 hover:shadow-[0_0_40px_-5px] hover:shadow-vine transition-shadow">
                {t.ctaWork}
                <svg className="w-4 h-4 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0l-6-6m6 6l6-6" />
                </svg>
              </a>
              <a href="#studio" className="inline-flex items-center gap-2 border border-white/15 hover:border-white/40 rounded-full px-6 py-3.5 text-white transition-colors">
                {t.ctaAbout}
              </a>
            </div>

          </div>

          {/* Cartes flottantes en parallaxe : sites + apps */}
          <div className="relative h-[480px] hidden lg:block" aria-hidden="true">
            <div className="float-card w-[225px]" style={{ '--d': 1.4, top: '0%', left: '0%', '--r': '-5deg' }}>
              <BrowserFrame domain="2limited.fr" src="/images/projects/2limited.webp" />
            </div>
            <div className="float-card w-[225px]" style={{ '--d': 2.2, top: '6%', right: '-2%', '--r': '4deg', animationDelay: '1.2s' }}>
              <ShotFrame src="/images/projects/sd-hero.webp" glow="shadow-cyan-900/50" />
            </div>
            <div className="float-card w-[250px]" style={{ '--d': 1, bottom: '14%', left: '0%', '--r': '3deg', animationDelay: '2.4s' }}>
              <ShotFrame src="/images/projects/fq-banner.webp" glow="shadow-amber-900/50" />
            </div>
            <div className="float-card w-[225px]" style={{ '--d': 1.8, bottom: '0%', right: '4%', '--r': '-4deg', animationDelay: '3.2s' }}>
              <BrowserFrame domain="shakkam.me" src="/images/projects/shakkam-me.webp" />
            </div>
          </div>
        </div>

        <a href="#work" className="scroll-cue absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-zinc-500 hover:text-white" aria-label={t.ctaWork}>
          <span className="block w-5 h-8 rounded-full border border-current relative">
            <span className="absolute left-1/2 top-1.5 w-1 h-1.5 -translate-x-1/2 rounded-full bg-current" />
          </span>
        </a>
      </section>

      {/* Bandeau défilant */}
      <div className="relative border-y border-white/10 bg-vine text-ink py-4 overflow-hidden -rotate-1 scale-[1.03]">
        <div className="marquee flex w-max gap-10 font-display font-extrabold text-2xl sm:text-4xl uppercase tracking-tight">
          {[0, 1].map((k) => (
            <div key={k} className="flex gap-10 items-center" aria-hidden={k === 1}>
              {MARQUEE.map((w) => (
                <span key={w} className="flex items-center gap-10 whitespace-nowrap">
                  {w}
                  <Vrille className="w-7 h-7 sm:w-9 sm:h-9" strokeWidth={4} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Dernières réalisations */}
      <section id="work" className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-32 pb-24 scroll-mt-20">
        <SectionHead kicker="Portfolio" title={t.workTitle} />

        <div id="sites" className="scroll-mt-24 mb-24">
          <SubHead title={t.sitesTitle} sub={t.sitesSub} />
        <div className="grid md:grid-cols-2 gap-5">
          {SITES.map((s, i) => (
            <Reveal key={s.key} delay={i * 120} className="h-full">
              <SpotlightCard
                as="a"
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                tilt={false}
                className="group flex flex-col h-full rounded-[2rem] border border-white/10 bg-zinc-950 overflow-hidden"
              >
                {/* Fausse barre de navigateur */}
                <div className="flex items-center gap-3 px-5 py-3 border-b border-white/10 bg-white/[0.03]">
                  <span className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  </span>
                  <span className="flex-1 text-center font-mono text-xs text-zinc-500 group-hover:text-vine transition-colors truncate">
                    {s.domain}
                  </span>
                </div>
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
                  <span className="absolute top-4 left-4 text-[11px] font-mono uppercase tracking-widest bg-ink/70 backdrop-blur border border-white/10 rounded-full px-3 py-1 text-zinc-300">
                    {t[`${s.key}Tag`]}
                  </span>
                  <h3 className="absolute bottom-4 left-6 font-display font-extrabold text-3xl sm:text-4xl tracking-tight">{s.name}</h3>
                </div>
                <div className="p-6 pt-4 flex-1 flex flex-col sm:flex-row sm:items-start justify-between gap-5">
                  <p className="text-zinc-400 leading-relaxed max-w-sm">{t[`${s.key}Desc`]}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-white whitespace-nowrap sm:self-end group-hover:text-vine transition-colors">
                    {t.visit}
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" /></svg>
                  </span>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
        </div>

        <div id="games" className="scroll-mt-24">
          <SubHead title={t.appsTitle} sub={t.gamesSub} />
        <div className="grid lg:grid-cols-2 gap-5">
          {/* Guess Your Mind — mise en avant */}
          <Reveal className="lg:row-span-2">
            <SpotlightCard className="group h-full rounded-[2rem] border border-white/10 bg-gradient-to-br from-purple-950/60 via-zinc-950 to-zinc-950 p-7 sm:p-10 flex flex-col">
              <Link href={GAMES.gym.href} className="absolute inset-0 z-0 rounded-[2rem]" aria-label={`${t.discover} — ${GAMES.gym.name}`} />
              <div className="flex items-start justify-between gap-4 mb-10">
                <Badge>{t.available}</Badge>
                <span className="text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all text-sm flex items-center gap-1.5">
                  {t.discover}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" /></svg>
                </span>
              </div>
              <img
                src={GAMES.gym.img}
                alt={GAMES.gym.name}
                className="w-40 h-40 sm:w-52 sm:h-52 rounded-[2.5rem] shadow-2xl shadow-purple-700/40 mb-10 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3"
              />
              <h3 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight mb-4">{GAMES.gym.name}</h3>
              <p className="text-zinc-400 leading-relaxed mb-8 max-w-md">{t.gymDesc}</p>
              <div className="mt-auto flex flex-col gap-5">
                <StoreLinks game={GAMES.gym} label={t.getOn} />
                <Chips items={GAMES.gym.stack} />
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Family Quiz */}
          <Reveal delay={100}>
            <SpotlightCard className="group h-full rounded-[2rem] border border-white/10 bg-gradient-to-br from-amber-950/50 via-zinc-950 to-zinc-950 p-7 sm:p-8">
              <Link href={GAMES.fq.href} className="absolute inset-0 z-0 rounded-[2rem]" aria-label={`${t.discover} — ${GAMES.fq.name}`} />
              <span className="absolute top-6 right-6 text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all" aria-hidden="true">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" /></svg>
              </span>
              <div className="flex flex-col sm:flex-row gap-6 sm:items-center mb-6">
                <img
                  src={GAMES.fq.img}
                  alt={GAMES.fq.name}
                  className="w-24 h-24 rounded-[1.6rem] shadow-xl shadow-amber-900/40 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3"
                />
                <div>
                  <Badge>{t.available}</Badge>
                  <h3 className="font-display font-extrabold text-3xl tracking-tight mt-3">{GAMES.fq.name}</h3>
                </div>
              </div>
              <p className="text-zinc-400 leading-relaxed mb-6">{t.fqDesc}</p>
              <div className="flex flex-col gap-4">
                <StoreLinks game={GAMES.fq} label={t.getOn} />
                <Chips items={GAMES.fq.stack} />
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Seek and Destroy — prototype */}
          <Reveal delay={200}>
            <SpotlightCard className="group h-full rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-950/50 via-zinc-950 to-zinc-950 p-7 sm:p-8 overflow-hidden">
              <Link href={GAMES.sd.href} className="absolute inset-0 z-0 rounded-[2rem]" aria-label={`${t.discover} — ${GAMES.sd.name}`} />
              <span className="absolute top-6 right-6 text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all" aria-hidden="true">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" /></svg>
              </span>
              <div className="flex flex-col sm:flex-row gap-6 sm:items-center mb-6">
                <div className="w-24 h-24 rounded-[1.6rem] overflow-hidden bg-[#3b3d40] border border-white/10 flex-shrink-0 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3">
                  <img src={GAMES.sd.img} alt={GAMES.sd.name} className="w-full h-full object-cover pixelated" />
                </div>
                <div>
                  <Badge tone="amber">{t.prototype}</Badge>
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight mt-3 leading-tight">{GAMES.sd.name}</h3>
                </div>
              </div>
              <p className="text-zinc-400 leading-relaxed mb-6">{t.sdDesc}</p>
              <Chips items={GAMES.sd.stack} />
            </SpotlightCard>
          </Reveal>
        </div>
        </div>
      </section>

      {/* Le studio */}
      <section id="studio" className="relative mx-auto max-w-7xl px-4 sm:px-6 py-24 scroll-mt-20">
        <div className="relative rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-vine/[0.07] via-zinc-950 to-zinc-950 p-6 sm:p-14 overflow-hidden">
          <Vrille className="absolute -right-10 -bottom-10 w-72 h-72 sm:w-[28rem] sm:h-[28rem] text-vine/15" strokeWidth={1.5} />
          <div className="relative grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-vine mb-4">{t.aboutKicker}</p>
              <h2 className="font-display font-extrabold text-[2.5rem] sm:text-5xl md:text-7xl break-words tracking-tight leading-[0.95]">{t.aboutTitle}</h2>
            </Reveal>
            <div className="space-y-6 text-lg leading-relaxed">
              <Reveal delay={80}><p className="text-zinc-300"><span className="text-vine font-bold">L · E · O</span> — {t.about1}</p></Reveal>
              <Reveal delay={160}><p className="text-zinc-300">{t.about2}</p></Reveal>
              <Reveal delay={240}><p className="text-zinc-400">{t.about3}</p></Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative mx-auto max-w-7xl px-4 sm:px-6 pb-24 scroll-mt-20">
        <Reveal>
          <div className="rounded-[2.5rem] border border-white/10 bg-zinc-950 p-8 sm:p-14 text-center">
            <h2 className="font-display font-extrabold text-4xl md:text-6xl tracking-tight mb-6">{t.contactTitle}</h2>
            <p className="text-lg text-zinc-300 max-w-2xl mx-auto mb-2">{t.contactText}</p>
            <p className="text-zinc-400 mb-6">{t.contactCta}</p>
            <a
              href="mailto:camille.schoell@gmail.com"
              className="inline-block font-mono text-lg sm:text-2xl text-vine hover:text-white transition-colors break-all"
            >
              camille.schoell@gmail.com
            </a>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="relative pt-16 pb-10 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p aria-hidden="true" className="font-display font-extrabold tracking-tighter leading-none text-[12vw] whitespace-nowrap text-outline-faint select-none -mb-2">
            LEO LABS
          </p>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-sm text-zinc-500">
            <span className="flex items-center gap-2">
              <Vrille className="w-4 h-4 text-vine" strokeWidth={6} />
              {t.madeBy}
            </span>
            <span>© {new Date().getFullYear()} LEO Labs · {t.rights}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
