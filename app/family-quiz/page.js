'use client';

import ProjectShell, { SectionTitle } from '@/components/ProjectShell';
import { Reveal } from '@/components/Interactive';
import { familyQuizLangs } from '../project-i18n';

const STORES = {
  play: 'https://play.google.com/store/apps/details?id=com.shakkam.familyquiz',
  apple: 'https://apps.apple.com/app/id6782669677',
};

const GODS = ['zeus', 'poseidon', 'hermes', 'hades', 'aphrodite', 'hephaestus'];
const GOD_NAMES = { zeus: 'Zeus', poseidon: 'Poseidon', hermes: 'Hermes', hades: 'Hades', aphrodite: 'Aphrodite', hephaestus: 'Hephaestus' };
const CATS = ['arts', 'geography', 'history', 'nature', 'science', 'sport'];

const OTHERS = [
  { name: 'Guess Your Mind', href: '/guess-your-mind', img: '/images/projects/guess-your-mind.webp' },
  { name: 'Seek and Destroy and Return the Ball', href: '/seek-and-destroy', img: '/images/projects/seek-and-destroy.webp', pixel: true },
];

export default function FamilyQuiz() {
  return (
    <ProjectShell
      name="Family Quiz"
      icon="/images/projects/family-quiz.webp"
      tone="amber"
      stores={STORES}
      content={familyQuizLangs}
      others={OTHERS}
    >
      {(t) => (
        <>
          <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-24">
            <SectionTitle>{t.g1}</SectionTitle>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {GODS.map((g, i) => (
                <Reveal key={g} delay={(i % 3) * 100}>
                  <figure className="group relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-950">
                    <img src={`/images/projects/fq/${g}.webp`} alt={GOD_NAMES[g]} loading="lazy" className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105" />
                    <figcaption className="absolute inset-x-0 bottom-0 p-4 pt-12 bg-gradient-to-t from-black/80 to-transparent font-display font-bold text-lg">
                      {GOD_NAMES[g]}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-24">
            <SectionTitle>{t.g2}</SectionTitle>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
              {CATS.map((k, i) => (
                <Reveal key={k} delay={i * 60}>
                  <div className="flex flex-col items-center gap-2 text-center">
                    <img src={`/images/projects/fq/${k}.webp`} alt="" loading="lazy" className="w-full max-w-[120px] hover:scale-110 hover:-rotate-3 transition-transform duration-300" />
                    <span className="text-sm text-zinc-300">{t.cats[k]}</span>
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
