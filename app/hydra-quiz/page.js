'use client';

import ProjectShell, { SectionTitle } from '@/components/ProjectShell';
import { Reveal } from '@/components/Interactive';
import { hydraLangs } from '../project-i18n';

const STORES = {
  play: 'https://play.google.com/store/apps/details?id=com.shakkam.familyquiz',
  apple: 'https://apps.apple.com/app/id6782669677',
};

const SHOTS = ['01-home', '02-turn', '03-divine-zeus', '04-alliance', '05-quad', '06-correct', '07-wrong', '08-dice', '09-divine-aphrodite', '10-agora'];
const GODS = ['zeus', 'poseidon', 'hermes', 'hades', 'aphrodite', 'hephaestus'];
// Mêmes emojis que dans l'app (src/constants/themes.ts).
const THEMES = [
  { id: 'history', emoji: '🏺' },
  { id: 'geography', emoji: '🌍' },
  { id: 'science', emoji: '🔬' },
  { id: 'nature', emoji: '🌿' },
  { id: 'sport', emoji: '⚽' },
  { id: 'arts', emoji: '🎨' },
  { id: 'food', emoji: '🍳' },
  { id: 'movies', emoji: '🎬' },
];

const OTHERS = [
  { name: 'Guess Your Mind', href: '/guess-your-mind', img: '/images/projects/guess-your-mind.webp' },
  { name: 'Seek and Destroy and Return the Ball', href: '/seek-and-destroy', img: '/images/projects/seek-and-destroy.webp', pixel: true },
];

export default function HydraQuiz() {
  return (
    <ProjectShell
      name="Hydra Quiz"
      icon="/images/projects/hydra-quiz.webp"
      tone="amber"
      stores={STORES}
      content={hydraLangs}
      others={OTHERS}
    >
      {(t) => (
        <>
          <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-24">
            <SectionTitle>{t.shots}</SectionTitle>
            {/* Bande qui défile au doigt sur mobile, grille 5x2 sur grand écran. */}
            <Reveal>
              <div className="-mx-4 px-4 scroll-px-4 sm:-mx-6 sm:px-6 sm:scroll-px-6 lg:mx-0 lg:px-0 flex lg:grid lg:grid-cols-5 gap-4 overflow-x-auto lg:overflow-visible snap-x snap-mandatory pb-2">
                {SHOTS.map((s) => (
                  <img
                    key={s}
                    src={`/images/projects/hydra/shots/${s}.webp`}
                    alt={t.shots}
                    loading="lazy"
                    className="w-[42%] sm:w-[28%] lg:w-full flex-shrink-0 snap-start rounded-2xl border border-white/10 shadow-xl shadow-violet-950/40"
                  />
                ))}
              </div>
            </Reveal>
          </section>

          <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-24">
            <SectionTitle>{t.g1}</SectionTitle>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {GODS.map((g, i) => (
                <Reveal key={g} delay={(i % 3) * 100} className="h-full">
                  <figure className="group h-full rounded-2xl overflow-hidden border border-white/10 bg-zinc-950">
                    <div className="overflow-hidden">
                      <img src={`/images/projects/hydra/${g}.webp`} alt={t.gods[g][0]} loading="lazy" className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <figcaption className="p-4">
                      <span className="block font-display font-bold text-lg">{t.gods[g][0]}</span>
                      <span className="block text-sm text-zinc-400 leading-snug mt-1">{t.gods[g][1]}</span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-24">
            <SectionTitle>{t.g2}</SectionTitle>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {THEMES.map(({ id, emoji }, i) => (
                <Reveal key={id} delay={(i % 4) * 60} className="h-full">
                  <div className="h-full flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 hover:border-amber-300/40 transition-colors">
                    <span className="text-2xl" aria-hidden="true">{emoji}</span>
                    <span className="text-zinc-200 font-semibold leading-tight">{t.themes[id]}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        </>
      )}
    </ProjectShell>
  );
}
