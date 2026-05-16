'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.shakkam.guessyourmind';

const langs = {
  en: {
    studio: 'Mobile Gaming Studio',
    tagline: 'Mobile games that challenge your mind.',
    ourGames: 'Our Games',
    available: 'Available now',
    desc: 'Test your mental abilities and challenge your friends in this captivating psychological guessing game. Read minds, guess the answers and see who knows you best.',
    playStore: 'Available on',
    appSoon: 'Coming soon on',
    footer: 'All rights reserved',
  },
  fr: {
    studio: 'Mobile Gaming Studio',
    tagline: 'Des jeux mobiles qui défient votre esprit.',
    ourGames: 'Nos Jeux',
    available: 'Disponible maintenant',
    desc: 'Testez vos capacités mentales et défiez vos amis dans ce jeu de devinettes psychologiques captivant. Lisez dans les pensées, devinez les réponses et voyez qui vous connaît le mieux.',
    playStore: 'Disponible sur',
    appSoon: 'Bientôt sur',
    footer: 'Tous droits réservés',
  },
  es: {
    studio: 'Estudio de Juegos Móviles',
    tagline: 'Juegos móviles que desafían tu mente.',
    ourGames: 'Nuestros Juegos',
    available: 'Disponible ahora',
    desc: 'Pon a prueba tus habilidades mentales y desafía a tus amigos en este cautivador juego de adivinanzas psicológicas. Lee mentes, adivina las respuestas y descubre quién te conoce mejor.',
    playStore: 'Disponible en',
    appSoon: 'Próximamente en',
    footer: 'Todos los derechos reservados',
  },
  de: {
    studio: 'Mobile Gaming Studio',
    tagline: 'Mobile Spiele, die deinen Geist herausfordern.',
    ourGames: 'Unsere Spiele',
    available: 'Jetzt verfügbar',
    desc: 'Teste deine mentalen Fähigkeiten und fordere deine Freunde in diesem fesselnden psychologischen Ratespiel heraus. Lies Gedanken, errate die Antworten und sieh, wer dich am besten kennt.',
    playStore: 'Erhältlich auf',
    appSoon: 'Bald auf',
    footer: 'Alle Rechte vorbehalten',
  },
  pt: {
    studio: 'Estúdio de Jogos Mobile',
    tagline: 'Jogos móveis que desafiam a sua mente.',
    ourGames: 'Nossos Jogos',
    available: 'Disponível agora',
    desc: 'Teste suas habilidades mentais e desafie seus amigos neste cativante jogo de adivinhação psicológica. Leia mentes, adivinhe as respostas e veja quem te conhece melhor.',
    playStore: 'Disponível no',
    appSoon: 'Em breve no',
    footer: 'Todos os direitos reservados',
  },
  ja: {
    studio: 'モバイルゲームスタジオ',
    tagline: 'あなたの心に挑戦するモバイルゲーム。',
    ourGames: 'ゲーム一覧',
    available: '今すぐプレイ',
    desc: '心理的な推測ゲームで精神力をテストし、友達に挑戦しましょう。心を読み、答えを推測して、誰があなたを一番知っているか確かめよう。',
    playStore: 'Google Playで入手',
    appSoon: 'App Storeで近日公開',
    footer: '全著作権所有',
  },
  zh: {
    studio: '手机游戏工作室',
    tagline: '挑战你思维的手机游戏。',
    ourGames: '我们的游戏',
    available: '立即可玩',
    desc: '在这款引人入胜的心理猜谜游戏中测试你的心智能力，挑战你的朋友。读懂他人的思想，猜出答案，看看谁最了解你。',
    playStore: 'Google Play下载',
    appSoon: '即将登陆App Store',
    footer: '版权所有',
  },
  it: {
    studio: 'Studio di Giochi Mobile',
    tagline: 'Giochi mobili che sfidano la tua mente.',
    ourGames: 'I Nostri Giochi',
    available: 'Disponibile ora',
    desc: 'Metti alla prova le tue capacità mentali e sfida i tuoi amici in questo avvincente gioco di indovinelli psicologici. Leggi le menti, indovina le risposte e scopri chi ti conosce meglio.',
    playStore: 'Disponibile su',
    appSoon: 'Presto su',
    footer: 'Tutti i diritti riservati',
  },
};

export default function Home() {
  const [lang, setLang] = useState('en');
  const t = langs[lang];
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem('shakkam-lang');
    if (saved && langs[saved]) { setLang(saved); return; }
    const code = (navigator.language || '').slice(0, 2).toLowerCase();
    if (langs[code]) setLang(code);
  }, []);

  const switchLang = (code) => {
    setLang(code);
    localStorage.setItem('shakkam-lang', code);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">

      <div className="pulse-bg absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-purple-700/20 rounded-full blur-[120px] pointer-events-none" />
      <div
        className="pulse-bg absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[120px] pointer-events-none"
        style={{ animationDelay: '2.5s' }}
      />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5 gap-4">
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-violet-700 rounded-xl shadow-lg shadow-purple-900/50 flex items-center justify-center">
            <span className="text-lg">🎮</span>
          </div>
          <span className="text-white font-bold tracking-[0.2em] uppercase text-sm hidden sm:block">
            Shakkam Games
          </span>
        </div>

        {/* Language switcher */}
        <div className="flex gap-1 flex-wrap justify-end">
          {Object.keys(langs).map((code) => (
            <button
              key={code}
              onClick={() => switchLang(code)}
              className={`text-xs px-2 py-1 rounded-lg font-mono uppercase transition-all ${
                lang === code
                  ? 'bg-purple-600 text-white'
                  : 'text-zinc-500 hover:text-white'
              }`}
            >
              {code}
            </button>
          ))}
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 text-center pt-14 pb-20 px-8">
        <p className="text-purple-400 text-xs tracking-[0.5em] uppercase mb-5">
          {t.studio}
        </p>
        <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white mb-6 leading-none">
          SHAKKAM
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-purple-600">
            GAMES
          </span>
        </h1>
        <p className="text-zinc-500 text-lg max-w-sm mx-auto leading-relaxed">
          {t.tagline}
        </p>
      </section>

      {/* Games */}
      <section className="relative z-10 px-6 pb-28 max-w-4xl mx-auto">
        <p className="text-zinc-600 text-xs tracking-[0.5em] uppercase text-center mb-12">
          {t.ourGames}
        </p>

        <div
          onClick={() => router.push('/guess-your-mind')}
          className="card-glow border border-purple-700/40 hover:border-purple-500/70 bg-gradient-to-br from-zinc-900/80 to-zinc-950/90 rounded-3xl p-8 md:p-12 backdrop-blur-sm cursor-pointer transition-colors duration-200 relative group"
        >
          <div className="absolute top-6 right-6 text-zinc-600 group-hover:text-purple-400 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <div className="flex flex-col md:flex-row gap-10 items-center">

            <div className="float flex-shrink-0">
              <div className="w-36 h-36 bg-gradient-to-br from-purple-500 via-violet-600 to-purple-800 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-purple-900/60">
                <span className="text-6xl">🧠</span>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <span className="inline-block bg-purple-600/20 border border-purple-500/30 text-purple-300 text-xs tracking-widest uppercase px-3 py-1 rounded-full mb-4">
                {t.available}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                Guess Your Mind
              </h2>
              <p className="text-zinc-400 text-base leading-relaxed mb-8 max-w-lg">
                {t.desc}
              </p>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start">

                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/60 rounded-2xl px-5 py-3 transition-all duration-200"
                >
                  <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M1.22 0c-.26.13-.44.39-.44.69V23.31c0 .3.18.56.44.69l.06.03L13.09 12.2v-.28L1.28-.03 1.22 0z" fill="#4FC3F7"/>
                    <path d="M17.03 16.12l-3.94-3.93v-.28l3.94-3.93.09.05 4.67 2.65c1.33.76 1.33 2 0 2.76l-4.67 2.65-.09.03z" fill="#FFD600"/>
                    <path d="M17.12 16.09L13.09 12 1.22 23.69c.44.47 1.16.52 1.67.13l14.23-7.73" fill="#F44336"/>
                    <path d="M17.12 7.91L2.89 .18C2.38-.21 1.66-.16 1.22.31L13.09 12l4.03-4.09z" fill="#4CAF50"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-zinc-500 text-xs leading-none mb-0.5">{t.playStore}</div>
                    <div className="text-white font-semibold text-sm leading-none">Google Play</div>
                  </div>
                </a>

                <div onClick={(e) => e.stopPropagation()} className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.07] rounded-2xl px-5 py-3 opacity-50 cursor-not-allowed select-none">
                  <svg className="w-7 h-7 flex-shrink-0 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-zinc-500 text-xs leading-none mb-0.5">{t.appSoon}</div>
                    <div className="text-white font-semibold text-sm leading-none">App Store</div>
                  </div>
                </div>

              </div>

              {/* QR codes */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex gap-6 mt-7 justify-center md:justify-start"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-white rounded-xl p-2 shadow-md shadow-purple-900/20">
                    <QRCodeSVG value={PLAY_STORE_URL} size={72} level="M" />
                  </div>
                  <span className="text-zinc-600 text-xs">Google Play</span>
                </div>
                <div className="flex flex-col items-center gap-2 opacity-35">
                  <div className="bg-white/10 border border-white/10 rounded-xl w-[88px] h-[88px] flex flex-col items-center justify-center gap-1">
                    <svg className="w-5 h-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                    <span className="text-zinc-600 text-xs text-center px-1">Soon</span>
                  </div>
                  <span className="text-zinc-600 text-xs">App Store</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/5 px-8 py-8 text-center">
        <p className="text-zinc-700 text-sm">
          © {new Date().getFullYear()} Shakkam Games · {t.footer}
        </p>
      </footer>

    </div>
  );
}
