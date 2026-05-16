export const metadata = {
  title: 'Shakkam Games — Mobile Gaming Studio',
  description: 'Découvrez Guess Your Mind, le jeu de devinettes psychologiques de Shakkam Games.',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">

      {/* Ambient background blobs */}
      <div className="pulse-bg absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-purple-700/20 rounded-full blur-[120px] pointer-events-none" />
      <div
        className="pulse-bg absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[120px] pointer-events-none"
        style={{ animationDelay: '2.5s' }}
      />

      {/* Header */}
      <header className="relative z-10 flex items-center px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-violet-700 rounded-xl shadow-lg shadow-purple-900/50 flex items-center justify-center">
            <span className="text-lg">🎮</span>
          </div>
          <span className="text-white font-bold tracking-[0.2em] uppercase text-sm">
            Shakkam Games
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 text-center pt-16 pb-20 px-8">
        <p className="text-purple-400 text-xs tracking-[0.5em] uppercase mb-5">
          Mobile Gaming Studio
        </p>
        <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white mb-6 leading-none">
          SHAKKAM
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-purple-600">
            GAMES
          </span>
        </h1>
        <p className="text-zinc-500 text-lg max-w-sm mx-auto leading-relaxed">
          Des jeux mobiles qui défient votre esprit.
        </p>
      </section>

      {/* Games section */}
      <section className="relative z-10 px-6 pb-28 max-w-4xl mx-auto">
        <p className="text-zinc-600 text-xs tracking-[0.5em] uppercase text-center mb-12">
          Nos Jeux
        </p>

        {/* Guess Your Mind card */}
        <div className="card-glow border border-purple-700/40 bg-gradient-to-br from-zinc-900/80 to-zinc-950/90 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row gap-10 items-center">

            {/* App icon */}
            <div className="float flex-shrink-0">
              <div className="w-36 h-36 bg-gradient-to-br from-purple-500 via-violet-600 to-purple-800 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-purple-900/60">
                <span className="text-6xl">🧠</span>
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 text-center md:text-left">
              <span className="inline-block bg-purple-600/20 border border-purple-500/30 text-purple-300 text-xs tracking-widest uppercase px-3 py-1 rounded-full mb-4">
                Disponible maintenant
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                Guess Your Mind
              </h2>
              <p className="text-zinc-400 text-base leading-relaxed mb-8 max-w-lg">
                Testez vos capacités mentales et défiez vos amis dans ce jeu de
                devinettes psychologiques captivant. Lisez dans les pensées,
                devinez les réponses et voyez qui vous connaît le mieux.
              </p>

              {/* Store badges */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">

                {/* Google Play */}
                <a
                  href="https://play.google.com/store/apps/details?id=com.shakkam.guessyourmind"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/60 rounded-2xl px-5 py-3 transition-all duration-200 group"
                >
                  <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M1.22 0c-.26.13-.44.39-.44.69V23.31c0 .3.18.56.44.69l.06.03L13.09 12.2v-.28L1.28-.03 1.22 0z" fill="#4FC3F7"/>
                    <path d="M17.03 16.12l-3.94-3.93v-.28l3.94-3.93.09.05 4.67 2.65c1.33.76 1.33 2 0 2.76l-4.67 2.65-.09.03z" fill="#FFD600"/>
                    <path d="M17.12 16.09L13.09 12 1.22 23.69c.44.47 1.16.52 1.67.13l14.23-7.73" fill="#F44336"/>
                    <path d="M17.12 7.91L2.89 .18C2.38-.21 1.66-.16 1.22.31L13.09 12l4.03-4.09z" fill="#4CAF50"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-zinc-500 text-xs leading-none mb-0.5">Disponible sur</div>
                    <div className="text-white font-semibold text-sm leading-none">Google Play</div>
                  </div>
                </a>

                {/* App Store - Coming Soon */}
                <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.07] rounded-2xl px-5 py-3 opacity-50 cursor-not-allowed select-none">
                  <svg className="w-7 h-7 flex-shrink-0 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-zinc-500 text-xs leading-none mb-0.5">Bientôt sur</div>
                    <div className="text-white font-semibold text-sm leading-none">App Store</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 px-8 py-8 text-center">
        <p className="text-zinc-700 text-sm">
          © {new Date().getFullYear()} Shakkam Games · Tous droits réservés
        </p>
      </footer>

    </div>
  );
}
