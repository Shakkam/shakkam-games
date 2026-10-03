'use client';

import ProjectShell, { SectionTitle } from '@/components/ProjectShell';
import { Reveal } from '@/components/Interactive';
import { seekLangs } from '../project-i18n';

const PILOTS = ['controleur', 'lourd', 'mini', 'missiles', 'mitrailleur', 'organisateur', 'perturbateur', 'vif', 'zoneur'];

const SHOTS = [
  '/images/projects/sd/gameplay.webp',
  '/images/projects/sd/gameplay2.webp',
  '/images/projects/sd/gameplay3.webp',
];

const OTHERS = [
  { name: 'Guess Your Mind', href: '/guess-your-mind', img: '/images/projects/guess-your-mind.webp' },
  { name: 'Family Quiz', href: '/family-quiz', img: '/images/projects/family-quiz.webp' },
];

export default function SeekAndDestroy() {
  return (
    <ProjectShell
      name="Seek and Destroy and Return the Ball"
      icon="/images/projects/seek-and-destroy.webp"
      iconPixel
      tone="cyan"
      status="prototype"
      content={seekLangs}
      others={OTHERS}
    >
      {(t) => (
        <>
          <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-24">
            <SectionTitle>{t.gameplay}</SectionTitle>
            <div className="grid sm:grid-cols-2 gap-4">
              {SHOTS.map((src, i) => (
                <Reveal key={src} delay={i * 100} className={i === 0 ? 'sm:col-span-2' : ''}>
                  <div className="rounded-3xl border border-white/10 overflow-hidden bg-black shadow-2xl shadow-cyan-900/20">
                    <img src={src} alt={t.gameplay} loading="lazy" className="w-full block pixelated" />
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-24">
            <SectionTitle>{t.g1}</SectionTitle>
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
              {PILOTS.map((p, i) => (
                <Reveal key={p} delay={(i % 5) * 60}>
                  <div className="group w-full aspect-square rounded-2xl border border-white/10 bg-zinc-900 overflow-hidden hover:border-cyan-300/50 transition-colors">
                    <img src={`/images/projects/sd/${p}.webp`} alt="" loading="lazy" className="w-full h-full object-cover pixelated group-hover:scale-110 transition-transform duration-300" />
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
