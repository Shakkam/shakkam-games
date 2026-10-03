'use client';

import ProjectShell, { SectionTitle } from '@/components/ProjectShell';
import { Reveal } from '@/components/Interactive';
import { seekLangs } from '../project-i18n';

const PILOTS = ['controleur', 'lourd', 'mini', 'missiles', 'mitrailleur', 'organisateur', 'perturbateur', 'vif', 'zoneur'];

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
            <SectionTitle>{t.g1}</SectionTitle>
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
              {PILOTS.map((p, i) => (
                <Reveal key={p} delay={(i % 5) * 60}>
                  <div className="group flex flex-col items-center gap-2 text-center">
                    <div className="w-full aspect-square rounded-2xl border border-white/10 bg-zinc-900 overflow-hidden group-hover:border-cyan-300/50 transition-colors">
                      <img src={`/images/projects/sd/${p}.webp`} alt={t.roster[p]} loading="lazy" className="w-full h-full object-cover pixelated group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <span className="text-xs text-zinc-400 leading-tight">{t.roster[p]}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-24">
            <SectionTitle>{t.g2}</SectionTitle>
            <Reveal>
              <div className="rounded-3xl border border-white/10 overflow-hidden bg-zinc-950">
                <img src="/images/projects/sd/map.webp" alt={t.g2} loading="lazy" className="w-full block pixelated" />
              </div>
            </Reveal>
          </section>
        </>
      )}
    </ProjectShell>
  );
}
