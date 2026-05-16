'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.shakkam.guessyourmind';

const langs = {
  en: {
    back: 'Back',
    available: 'Available on Google Play',
    appSoon: 'Coming soon on App Store',
    desc: 'Test your mental abilities and challenge your friends in this captivating psychological guessing game. Read minds, guess the answers and see who knows you best.',
    screenshots: 'Screenshots',
    features: 'Key Features',
    f1title: 'Challenge Friends',
    f1desc: 'Invite friends and find out who truly knows you best.',
    f2title: 'Psychological Questions',
    f2desc: 'Hundreds of carefully crafted questions to explore personality and intuition.',
    f3title: 'Real-time Multiplayer',
    f3desc: 'Play live with friends anywhere in the world, anytime.',
    playStore: 'Get it on',
    scanPlay: 'Scan to download',
    footer: 'All rights reserved',
  },
  fr: {
    back: 'Retour',
    available: 'Disponible sur Google Play',
    appSoon: 'Bientôt sur App Store',
    desc: 'Testez vos capacités mentales et défiez vos amis dans ce jeu de devinettes psychologiques captivant. Lisez dans les pensées, devinez les réponses et voyez qui vous connaît le mieux.',
    screenshots: "Captures d'écran",
    features: 'Fonctionnalités',
    f1title: 'Défiez vos amis',
    f1desc: 'Invitez vos amis et découvrez qui vous connaît vraiment le mieux.',
    f2title: 'Questions psychologiques',
    f2desc: "Des centaines de questions soigneusement conçues pour explorer la personnalité et l'intuition.",
    f3title: 'Multijoueur en direct',
    f3desc: 'Jouez en temps réel avec vos amis partout dans le monde.',
    playStore: 'Disponible sur',
    scanPlay: 'Scanner pour télécharger',
    footer: 'Tous droits réservés',
  },
  es: {
    back: 'Volver',
    available: 'Disponible en Google Play',
    appSoon: 'Próximamente en App Store',
    desc: 'Pon a prueba tus habilidades mentales y desafía a tus amigos en este cautivador juego de adivinanzas psicológicas.',
    screenshots: 'Capturas de pantalla',
    features: 'Características',
    f1title: 'Desafía a tus amigos',
    f1desc: 'Invita a tus amigos y descubre quién te conoce mejor.',
    f2title: 'Preguntas psicológicas',
    f2desc: 'Cientos de preguntas diseñadas para explorar la personalidad.',
    f3title: 'Multijugador en tiempo real',
    f3desc: 'Juega en vivo con amigos en cualquier parte del mundo.',
    playStore: 'Disponible en',
    scanPlay: 'Escanear para descargar',
    footer: 'Todos los derechos reservados',
  },
  de: {
    back: 'Zurück',
    available: 'Verfügbar auf Google Play',
    appSoon: 'Bald im App Store',
    desc: 'Teste deine mentalen Fähigkeiten und fordere deine Freunde in diesem fesselnden psychologischen Ratespiel heraus.',
    screenshots: 'Screenshots',
    features: 'Funktionen',
    f1title: 'Freunde herausfordern',
    f1desc: 'Lade Freunde ein und finde heraus, wer dich am besten kennt.',
    f2title: 'Psychologische Fragen',
    f2desc: 'Hunderte von Fragen, die Persönlichkeit und Intuition erkunden.',
    f3title: 'Echtzeit-Multiplayer',
    f3desc: 'Spiele live mit Freunden überall auf der Welt.',
    playStore: 'Erhältlich auf',
    scanPlay: 'Zum Herunterladen scannen',
    footer: 'Alle Rechte vorbehalten',
  },
  pt: {
    back: 'Voltar',
    available: 'Disponível no Google Play',
    appSoon: 'Em breve na App Store',
    desc: 'Teste suas habilidades mentais e desafie seus amigos neste cativante jogo de adivinhação psicológica.',
    screenshots: 'Capturas de tela',
    features: 'Funcionalidades',
    f1title: 'Desafie amigos',
    f1desc: 'Convide amigos e descubra quem realmente te conhece melhor.',
    f2title: 'Perguntas psicológicas',
    f2desc: 'Centenas de perguntas para explorar personalidade e intuição.',
    f3title: 'Multijogador em tempo real',
    f3desc: 'Jogue ao vivo com amigos em qualquer lugar do mundo.',
    playStore: 'Disponível no',
    scanPlay: 'Escanear para baixar',
    footer: 'Todos os direitos reservados',
  },
  ja: {
    back: '戻る',
    available: 'Google Playで配信中',
    appSoon: 'App Storeで近日公開',
    desc: '心理的な推測ゲームで精神力をテストし、友達に挑戦しましょう。心を読み、答えを推測して、誰があなたを一番知っているか確かめよう。',
    screenshots: 'スクリーンショット',
    features: '特徴',
    f1title: '友達に挑戦',
    f1desc: '友達を招待して、誰があなたを一番よく知っているか確かめましょう。',
    f2title: '心理的な質問',
    f2desc: '個性と直感を探る数百の質問。',
    f3title: 'リアルタイム対戦',
    f3desc: '世界中どこでも友達とライブプレイ。',
    playStore: 'Google Playで入手',
    scanPlay: 'スキャンしてダウンロード',
    footer: '全著作権所有',
  },
  zh: {
    back: '返回',
    available: '在Google Play上可用',
    appSoon: '即将登陆App Store',
    desc: '在这款引人入胜的心理猜谜游戏中测试你的心智能力，挑战你的朋友。读懂他人的思想，猜出答案，看看谁最了解你。',
    screenshots: '截图',
    features: '特色功能',
    f1title: '挑战朋友',
    f1desc: '邀请朋友，看看谁最了解你。',
    f2title: '心理问题',
    f2desc: '数百个精心设计的问题，探索性格与直觉。',
    f3title: '实时多人游戏',
    f3desc: '随时随地与世界各地的朋友在线对战。',
    playStore: 'Google Play下载',
    scanPlay: '扫码下载',
    footer: '版权所有',
  },
  it: {
    back: 'Indietro',
    available: 'Disponibile su Google Play',
    appSoon: 'Presto su App Store',
    desc: "Metti alla prova le tue capacità mentali e sfida i tuoi amici in questo avvincente gioco di indovinelli psicologici.",
    screenshots: 'Screenshot',
    features: 'Caratteristiche',
    f1title: 'Sfida gli amici',
    f1desc: 'Invita gli amici e scopri chi ti conosce davvero meglio.',
    f2title: 'Domande psicologiche',
    f2desc: "Centinaia di domande per esplorare la personalità e l'intuizione.",
    f3title: 'Multiplayer in tempo reale',
    f3desc: 'Gioca in diretta con gli amici ovunque nel mondo.',
    playStore: 'Disponibile su',
    scanPlay: 'Scansiona per scaricare',
    footer: 'Tutti i diritti riservati',
  },
};

const SCREENSHOTS = [
  '/images/SCIPHONE1.png',
  '/images/SCIPHONE2.png',
  '/images/SCIPHONE3.png',
  '/images/SCIPHONE4.png',
  '/images/SCIPHONE5.png',
  '/images/SCIPHONE6.png',
  '/images/SCIPHONE7.png',
  '/images/SCIPHONE8.png',
];

function Screenshot({ src, index, onClick }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex-shrink-0 w-44 h-80 rounded-3xl border-2 border-dashed border-purple-800/40 bg-zinc-900/80 flex flex-col items-center justify-center gap-3">
        <span className="text-3xl">📱</span>
        <span className="text-zinc-600 text-xs text-center px-4 font-mono leading-relaxed">
          SCIPHONE{index + 1}.png
        </span>
      </div>
    );
  }

  return (
    <div
      onClick={() => onClick(index)}
      className="flex-shrink-0 w-44 rounded-3xl overflow-hidden border border-purple-700/30 bg-zinc-900/80 cursor-pointer hover:border-purple-400/60 hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-black/40"
    >
      <img
        src={src}
        onError={() => setFailed(true)}
        alt={`Screenshot ${index + 1}`}
        className="w-full h-auto block"
      />
    </div>
  );
}

function Lightbox({ screenshots, index, onClose, onNavigate }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((index - 1 + screenshots.length) % screenshots.length);
      if (e.key === 'ArrowRight') onNavigate((index + 1) % screenshots.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, onNavigate, index, screenshots.length]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors"
        onClick={onClose}
      >
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Prev */}
      <button
        className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2"
        onClick={(e) => { e.stopPropagation(); onNavigate((index - 1 + screenshots.length) % screenshots.length); }}
      >
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Image */}
      <img
        src={screenshots[index]}
        className="max-h-[90vh] max-w-xs sm:max-w-sm object-contain rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        alt={`Screenshot ${index + 1}`}
      />

      {/* Next */}
      <button
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2"
        onClick={(e) => { e.stopPropagation(); onNavigate((index + 1) % screenshots.length); }}
      >
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 flex gap-2">
        {screenshots.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); onNavigate(i); }}
            className={`w-2 h-2 rounded-full transition-all ${i === index ? 'bg-purple-400 scale-125' : 'bg-white/30 hover:bg-white/60'}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function GuessYourMind() {
  const [lang, setLang] = useState('en');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const t = langs[lang];

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

  const features = [
    { icon: '👥', title: t.f1title, desc: t.f1desc },
    { icon: '🧠', title: t.f2title, desc: t.f2desc },
    { icon: '⚡', title: t.f3title, desc: t.f3desc },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">

      {lightboxIndex !== null && (
        <Lightbox
          screenshots={SCREENSHOTS}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}

      <div className="pulse-bg absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-purple-700/20 rounded-full blur-[120px] pointer-events-none" />
      <div
        className="pulse-bg absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[120px] pointer-events-none"
        style={{ animationDelay: '2.5s' }}
      />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5 gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {t.back}
          </Link>
          <span className="text-zinc-700 text-xs">|</span>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-purple-500 to-violet-700 rounded-lg flex items-center justify-center">
              <span className="text-sm">🎮</span>
            </div>
            <span className="text-white font-bold tracking-[0.2em] uppercase text-xs hidden sm:block">
              Shakkam Games
            </span>
          </div>
        </div>

        <div className="flex gap-1 flex-wrap justify-end">
          {Object.keys(langs).map((code) => (
            <button
              key={code}
              onClick={() => switchLang(code)}
              className={`text-xs px-2 py-1 rounded-lg font-mono uppercase transition-all ${
                lang === code ? 'bg-purple-600 text-white' : 'text-zinc-500 hover:text-white'
              }`}
            >
              {code}
            </button>
          ))}
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 text-center pt-10 pb-16 px-8">
        <div className="float inline-block mb-6">
          <div className="w-28 h-28 bg-gradient-to-br from-purple-500 via-violet-600 to-purple-800 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-purple-900/60 mx-auto">
            <span className="text-5xl">🧠</span>
          </div>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-5 leading-none">
          Guess Your Mind
        </h1>
        <span className="inline-block bg-purple-600/20 border border-purple-500/30 text-purple-300 text-xs tracking-widest uppercase px-4 py-1.5 rounded-full mb-7">
          {t.available}
        </span>
        <p className="text-zinc-400 text-base max-w-lg mx-auto leading-relaxed">
          {t.desc}
        </p>
      </section>

      {/* Screenshots */}
      <section className="relative z-10 pb-20">
        <p className="text-zinc-600 text-xs tracking-[0.5em] uppercase text-center mb-8 px-6">
          {t.screenshots}
        </p>
        <div className="flex gap-4 overflow-x-auto pb-4 px-6 sm:justify-center" style={{ scrollbarWidth: 'none' }}>
          {SCREENSHOTS.map((src, i) => (
            <Screenshot key={i} src={src} index={i} onClick={setLightboxIndex} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 pb-20 px-6 max-w-4xl mx-auto">
        <p className="text-zinc-600 text-xs tracking-[0.5em] uppercase text-center mb-10">
          {t.features}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="border border-purple-700/30 bg-zinc-900/60 rounded-2xl p-6 text-center backdrop-blur-sm"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="text-white font-bold text-base mb-2">{f.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA + QR codes */}
      <section className="relative z-10 pb-28 px-6 max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start justify-center">

          {/* Google Play */}
          <div className="flex flex-col items-center gap-3">
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/60 rounded-2xl px-6 py-4 transition-all duration-200 w-full sm:w-auto"
            >
              <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1.22 0c-.26.13-.44.39-.44.69V23.31c0 .3.18.56.44.69l.06.03L13.09 12.2v-.28L1.28-.03 1.22 0z" fill="#4FC3F7"/>
                <path d="M17.03 16.12l-3.94-3.93v-.28l3.94-3.93.09.05 4.67 2.65c1.33.76 1.33 2 0 2.76l-4.67 2.65-.09.03z" fill="#FFD600"/>
                <path d="M17.12 16.09L13.09 12 1.22 23.69c.44.47 1.16.52 1.67.13l14.23-7.73" fill="#F44336"/>
                <path d="M17.12 7.91L2.89 .18C2.38-.21 1.66-.16 1.22.31L13.09 12l4.03-4.09z" fill="#4CAF50"/>
              </svg>
              <div className="text-left">
                <div className="text-zinc-500 text-xs leading-none mb-1">{t.playStore}</div>
                <div className="text-white font-bold text-base leading-none">Google Play</div>
              </div>
            </a>
            <div className="bg-white rounded-xl p-2.5 shadow-lg shadow-purple-900/30">
              <QRCodeSVG value={PLAY_STORE_URL} size={100} level="M" />
            </div>
            <p className="text-zinc-600 text-xs">{t.scanPlay}</p>
          </div>

          {/* App Store */}
          <div className="flex flex-col items-center gap-3 opacity-40">
            <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.07] rounded-2xl px-6 py-4 cursor-not-allowed select-none w-full sm:w-auto">
              <svg className="w-7 h-7 flex-shrink-0 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="text-left">
                <div className="text-zinc-500 text-xs leading-none mb-1">{t.appSoon}</div>
                <div className="text-white font-bold text-base leading-none">App Store</div>
              </div>
            </div>
            <div className="bg-white/10 border border-white/10 rounded-xl w-[117px] h-[117px] flex flex-col items-center justify-center gap-1">
              <svg className="w-6 h-6 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <span className="text-zinc-600 text-xs text-center px-2">Coming soon</span>
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
