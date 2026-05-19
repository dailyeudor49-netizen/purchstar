"use client";

import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  XCircle,
  Star,
  Truck,
  AlertTriangle,
  Shield,
  ThumbsUp,
  RotateCcw,
  ShoppingBag,
  Zap,
  Battery,
  Wind,
  Ruler,
  Layers,
  Lock,
  Phone,
  Gift,
  Wrench,
  TreePine,
  Scissors
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Daugiafunkcė krūmapjovė 40V TurboTrim PRO
 * Landing Page - LITHUANIA (Lithuanian)
 */

// --- Canvas Fingerprint ---
const getCanvasFingerprint = (): string => {
  if (typeof window === 'undefined') return '';
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 50;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = '#069';
    ctx.fillText('TurboTrimPRO', 2, 15);
    ctx.fillStyle = 'rgba(102,204,0,0.7)';
    ctx.fillText('fingerprint', 4, 17);
    const dataUrl = canvas.toDataURL();
    let hash = 0;
    for (let i = 0; i < dataUrl.length; i++) {
      const char = dataUrl.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    return Math.abs(hash).toString(36);
  } catch {
    return '';
  }
};

// --- Countdown Timer ---
const CountdownTimer = () => {
  const [time, setTime] = useState({ hours: 1, minutes: 23, seconds: 47 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-black text-white py-3 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-center">
        <div className="flex items-center gap-2">
          <AlertTriangle className="animate-pulse text-yellow-400" size={20} />
          <span className="font-black text-sm md:text-base uppercase tracking-wide">SANDĖLIO IŠPARDAVIMAS - LIKO TIK 5 VNT.!</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-300">Pasiūlymas baigiasi po:</span>
          <div className="flex gap-1">
            <span className="bg-red-600 px-2.5 py-1 rounded font-mono font-bold">{String(time.hours).padStart(2, '0')}</span>
            <span className="font-bold text-red-500">:</span>
            <span className="bg-red-600 px-2.5 py-1 rounded font-mono font-bold">{String(time.minutes).padStart(2, '0')}</span>
            <span className="font-bold text-red-500">:</span>
            <span className="bg-red-600 px-2.5 py-1 rounded font-mono font-bold">{String(time.seconds).padStart(2, '0')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Stock Counter ---
const StockCounter = () => {
  return (
    <div className="flex items-center gap-2 bg-yellow-50 border-2 border-yellow-400 rounded-lg px-4 py-3">
      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
      <span className="text-red-700 font-black text-base">DĖMESIO: Šia kaina liko tik 5 vnt.!</span>
    </div>
  );
};

// --- Live Viewers ---
const LiveViewers = () => {
  const [viewers, setViewers] = useState(31);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 rounded-lg px-3 py-2">
      <div className="flex -space-x-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-green-500 to-green-700 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">
            {['M', 'G', 'L'][i]}
          </div>
        ))}
      </div>
      <span><strong className="text-black">{Math.max(20, viewers)}</strong> žmonių dabar žiūri šį produktą</span>
    </div>
  );
};

const Header = () => (
  <header className="sticky top-0 z-50 bg-white border-b-2 border-green-600 shadow-md">
    <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
      <div className="font-black text-xl tracking-tight uppercase">
        <span className="text-green-600">TurboTrim</span> <span className="text-gray-800">PRO</span>
      </div>
      <button
        onClick={() => document.getElementById('ordina')?.scrollIntoView({ behavior: 'smooth' })}
        className="bg-green-600 text-white px-5 py-2 rounded-lg font-black text-sm uppercase tracking-wide hover:bg-green-700 transition-colors hidden md:flex items-center gap-2"
      >
        <ShoppingBag size={18} />
        Užsakyti -50%
      </button>
      <button className="md:hidden bg-green-600 p-2 rounded-lg" onClick={() => document.getElementById('ordina')?.scrollIntoView({ behavior: 'smooth' })}>
        <ShoppingBag size={22} className="text-white" />
      </button>
    </div>
  </header>
);

const HERO_IMAGES = [
  "/images/decespugliatore/carosello/5.jpg",
  "/images/decespugliatore/carosello/2.jpg",
  "/images/decespugliatore/carosello/6.jpg",
  "/images/decespugliatore/carosello/9.jpg",
];

const Hero = () => {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
  const next = () => setIdx((i) => (i + 1) % HERO_IMAGES.length);

  return (
    <section className="bg-white pt-6 pb-10 px-4 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Left - Images */}
        <div className="order-1">
          <div className="relative group">
            <div className="aspect-square rounded-2xl overflow-hidden border-2 border-gray-200 shadow-xl relative bg-gray-100">
              {HERO_IMAGES.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`Daugiafunkcė krūmapjovė TurboTrim PRO 40V ${i + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === idx ? "opacity-100" : "opacity-0"}`}
                />
              ))}
              <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/95 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-10">
                <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-gray-800 fill-none" strokeWidth={2.5}><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/95 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-10">
                <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-gray-800 fill-none" strokeWidth={2.5}><path d="M9 6l6 6-6 6" /></svg>
              </button>
              <div className="absolute top-3 left-3 bg-red-600 text-white px-4 py-2 rounded-lg font-black text-xl shadow-lg">
                -50%
              </div>
              <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1.5 rounded-lg font-black text-sm shadow-lg flex items-center gap-1">
                <Gift size={14} />
                2 PAPILDOMOS BATERIJOS NEMOKAMAI
              </div>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {HERO_IMAGES.map((_, i) => (
                  <button key={i} onClick={() => setIdx(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === idx ? "bg-white scale-125 shadow-lg" : "bg-white/60"}`} />
                ))}
              </div>
            </div>
            <div className="flex gap-2 mt-3 justify-center">
              {HERO_IMAGES.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${i === idx ? "border-green-500 scale-105 shadow-md" : "border-gray-200 opacity-70 hover:opacity-100"}`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Content */}
        <div className="order-2 space-y-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-black uppercase">
                NR. 1 PARDAVIMAI 2026
              </span>
              <span className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-black uppercase">
                <Zap size={12} />
                3 ĮRANKIAI 1-AME
              </span>
              <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-black uppercase">
                PROFESIONALI KOKYBĖ
              </span>
            </div>

            <h1 className="text-[26px] md:text-4xl font-black leading-tight uppercase tracking-tight text-gray-900">
              TurboTrim PRO<br />
              <span className="text-green-600">Daugiafunkcė krūmapjovė 40V</span>
            </h1>

            <p className="text-[17px] md:text-lg text-gray-600 leading-relaxed">
              Profesionalus bešepetėlinis variklis su dvigubos baterijos 20V sistema vienu metu — 40V kombinuotos galios. 4 baterijos 20V/4Ah komplekte, krūmapjovė + žolės trimmeris + 3 dantų peilis. <strong className="text-gray-900">Apsaugos rinkinys DOVANŲ, kurio vertė 12€.</strong>
            </p>
          </div>

          {/* BIG PRICE */}
          <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 p-5 rounded-2xl border-2 border-green-400 shadow-lg">
            <div className="flex items-center justify-center gap-4 mb-2">
              <span className="text-gray-400 line-through text-2xl font-bold">139€</span>
              <div className="relative">
                <span className="text-6xl md:text-7xl font-black text-green-600">69€</span>
              </div>
            </div>
            <div className="text-center mb-3">
              <span className="bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-black inline-block">
                SUTAUPOTE 70€ — TIK ŠIANDIEN!
              </span>
            </div>
            <div className="flex items-center justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} size={22} fill="currentColor" className="text-yellow-500" />)}
              <span className="font-bold text-sm ml-2">4.8/5</span>
              <span className="text-gray-500 text-sm">(634 atsiliepimai)</span>
            </div>
            <StockCounter />
          </div>

          {/* Live Viewers */}
          <LiveViewers />

          {/* OMAGGI */}
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-xl border-2 border-amber-300">
            <h3 className="font-black text-base text-amber-800 mb-3 flex items-center gap-2">
              <Gift className="text-amber-600" size={20} />
              NEMOKAMAI SU JŪSŲ UŽSAKYMU (Vertė 32€)
            </h3>
            <ul className="space-y-2">
              {[
                "2x Papildomos baterijos 20V/4Ah PowerShare (vertė 20€)",
                "Dvigubas greitas įkroviklis",
                "Profesionalios triukšmo slopinimo ausinės",
                "CE polikarbonatiniai apsauginiai akiniai",
                "Sustiprintos darbo pirštinės",
                "Ergonomiška paminkštinta dirželio juosta",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-[14px] text-amber-900">
                  <CheckCircle2 className="text-green-500 flex-shrink-0" size={16} />
                  <span className="font-semibold">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bullet Points */}
          <ul className="space-y-2.5">
            {[
              { icon: Zap, text: "Dviguba baterija vienu metu — 2x20V = 40V kombinuotos galios" },
              { icon: Wrench, text: "3 viename — Krūmapjovė + Trimmeris + Plieninis peilis" },
              { icon: Battery, text: "4 baterijos 20V/4Ah komplekte — Iki 60 min. autonomija" },
              { icon: Ruler, text: "Pjovimo plotis iki 38 cm — Bešepetėlinis variklis be benzino" },
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                <div className="bg-green-600 rounded-full p-2 flex-shrink-0">
                  <item.icon className="text-white" size={18} />
                </div>
                <span className="font-bold text-gray-800 text-[15px] md:text-base">{item.text}</span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div id="ordina">
            <button
              onClick={() => document.getElementById('form-ordine')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-5 rounded-xl font-black text-xl uppercase tracking-wide shadow-xl hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center gap-3"
            >
              <ShoppingBag size={24} />
              UŽSAKYKITE DABAR — MOKĖKITE PRISTATYMO METU
            </button>
            <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-500">
              <Lock size={14} />
              <span>Saugus mokėjimas pristatymo metu grynaisiais</span>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-gray-100 p-3 rounded-xl text-center">
              <Truck className="mx-auto mb-1 text-green-600" size={22} />
              <p className="text-[11px] font-bold text-gray-700">Pristatymas<br />NEMOKAMAS</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-xl text-center">
              <RotateCcw className="mx-auto mb-1 text-green-600" size={22} />
              <p className="text-[11px] font-bold text-gray-700">Grąžinimas<br />per 30 dienų</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-xl text-center">
              <Shield className="mx-auto mb-1 text-green-600" size={22} />
              <p className="text-[11px] font-bold text-gray-700">Garantija<br />5 metai</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TrustRow = () => (
  <div className="bg-gray-900 text-white py-3 px-4 overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(3)].map((_, idx) => (
          <div key={idx} className="flex items-center gap-10 mx-6">
            <span className="font-bold text-sm flex items-center gap-2"><Truck size={16} /> GREITAS PRISTATYMAS 24-48 VAL.</span>
            <span className="font-bold text-sm flex items-center gap-2"><Shield size={16} /> 5 METŲ GARANTIJA</span>
            <span className="font-bold text-sm flex items-center gap-2"><RotateCcw size={16} /> NEMOKAMAS GRĄŽINIMAS 30 D.</span>
            <span className="font-bold text-sm flex items-center gap-2"><ThumbsUp size={16} /> 600+ PARDUOTA</span>
            <span className="font-bold text-sm flex items-center gap-2"><Battery size={16} /> 4 BATERIJOS KOMPLEKTE</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// --- 3 IN 1 SECTION ---
const ThreeInOne = () => (
  <section className="bg-gradient-to-b from-gray-900 to-black text-white py-16 px-4">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <span className="inline-block bg-green-600 text-white px-4 py-1.5 rounded-full text-sm font-black uppercase mb-4">
          VIENAS ĮRANKIS, BEGALINĖS GALIMYBĖS
        </span>
        <h2 className="text-[26px] md:text-5xl font-black uppercase tracking-tight leading-tight">
          3 profesionalūs įrankiai<br />
          <span className="text-green-400">už 1 kainą</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {[
          {
            icon: Wind,
            title: "KRŪMAPJOVĖ",
            desc: "3 dantų plieninis peilis aukštai žolei, krūmams ir piktžolėms. Maitinama dviguba baterija vienu metu (2x20V=40V) — nesustabdoma kombinuota galia.",
            badge: "KOMPLEKTE"
          },
          {
            icon: Scissors,
            title: "ŽOLĖS TRIMMERIS",
            desc: "Siūlo galvutė su automatiniu tap-and-go padavimu. Pjovimo plotis iki 38 cm idealiai tvarkomiems kraštams.",
            badge: "KOMPLEKTE"
          },
          {
            icon: TreePine,
            title: "3 DANTŲ PEILIS",
            desc: "Grūdintas plieninis diskas tankiai augmenijai ir šakoms iki 2 cm. Profesionali galia garantuota.",
            badge: "KOMPLEKTE"
          },
        ].map((item, i) => (
          <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center hover:bg-white/15 transition-colors">
            <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <item.icon className="text-white" size={32} />
            </div>
            <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-xs font-black mb-3">{item.badge}</span>
            <h3 className="font-black text-xl mb-2 uppercase">{item.title}</h3>
            <p className="text-gray-300 text-[15px] leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-400 text-base">
          Parduotuvėje už šiuos 3 priedus atskirai mokėtumėte <strong className="text-white line-through">139€</strong>.
          <br />Šiandien juos gaunate <strong className="text-green-400">VISUS KARTU tik už 69€</strong>.
        </p>
      </div>
    </div>
  </section>
);

const ProblemSolution = () => (
  <section className="bg-gray-50 py-16 px-4">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-[22px] md:text-4xl font-black uppercase tracking-tight leading-tight">
          Jūsų sodas nebekontroliuojamas?
        </h2>
        <p className="text-gray-500 text-base mt-3 max-w-2xl mx-auto">Benzininė krūmapjovė smirda, vibruoja ir niekada neužsiveda. Pigus variantas sulūžta po 2 mėnesių. Gana.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="text-lg md:text-xl font-black text-red-600 mb-4 flex items-center gap-2">
            <XCircle size={24} /> BE TurboTrim PRO
          </h3>
          <ul className="space-y-3">
            {[
              "Benzininė krūmapjovė: smirda, triukšminga, nuolatinė priežiūra",
              "Pigūs modeliai: sulūžta po vieno sezono",
              "3 atskiri įrankiai kainuoja daugiau nei 150€",
              "Prastos baterijos: 10 minučių autonomija ir jau išsikrovusios",
              "Aukštos žolės ir piktžolių neįmanoma sutvarkyti",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[15px] md:text-base">
                <XCircle className="text-red-400 flex-shrink-0 mt-0.5" size={18} />
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-5 md:p-6 rounded-2xl border-2 border-green-400 shadow-sm">
          <h3 className="text-lg md:text-xl font-black text-green-600 mb-4 flex items-center gap-2">
            <CheckCircle2 size={24} /> SU TurboTrim PRO DAUGIAFUNKCE
          </h3>
          <ul className="space-y-3">
            {[
              "Bešepetėlinis variklis su dviguba baterija: tikri 40V, be benzino, be smarvės",
              "Profesionali konstrukcija: tarnaus ilgus metus",
              "3 viename: sutaupote daugiau nei 70€ nuo rekomenduojamos kainos",
              "4 baterijos 20V/4Ah: 2 dirba kartu, 2 kraunasi. 60 min. autonomija",
              "Pjauna viską: žolę, krūmus, piktžoles, šakas",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[15px] md:text-base">
                <CheckCircle2 className="text-green-500 flex-shrink-0 mt-0.5" size={18} />
                <span className="text-gray-700 font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const Features = () => {
  const features = [
    {
      title: "Bešepetėlinis 40V variklis su dviguba baterija",
      desc: "2 baterijos po 20V dirba vienu metu, suteikdamos 40V kombinuotą galią. Pastovi galia be kritimų, be kibirkščių, 3 kartus ilgesnė tarnavimo trukmė nei įprastų variklių.",
      img: "/images/decespugliatore/carosello/8.jpg",
    },
    {
      title: "4 PowerShare baterijos — dvigubos vienu metu",
      desc: "Variklis naudoja 2 baterijas po 20V vienu metu, kas suteikia tikrus 40V. Komplekte 4 baterijos: kol 2 dirba, 2 kraunasi. Iki 60 minučių autonomija be pertraukų.",
      img: "/images/decespugliatore/carosello/7.jpg",
    },
    {
      title: "3 dantų plieninis peilis",
      desc: "Pjauna krūmus, sąžalynus ir tankią augmeniją. Grūdintas diskas profesionaliam naudojimui. 25 cm pjovimo plotis.",
      img: "/images/decespugliatore/carosello/12.jpg",
    },
    {
      title: "Tap-and-Go galvutė",
      desc: "Automatinis siūlo padavimas paprastu palietimu prie žemės. Pjovimo plotis iki 38 cm idealiai tvarkomiems kraštams.",
      img: "/images/decespugliatore/carosello/4.jpg",
    },
    {
      title: "Išardomas aliuminio kotas",
      desc: "Itin lengvas ir tvirtas. Dalomas į 2 dalis patogiam transportavimui. Tik 5 kg bendras svoris su baterija.",
      img: "/images/decespugliatore/carosello/3.jpg",
    },
    {
      title: "ECO režimas",
      desc: "Protingas energijos valdymas. Padidina autonomiją 30% lengvesniems darbams. Baterija tarnauja ilgiau.",
      img: "/images/decespugliatore/carosello/10.jpg",
    },
  ];

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
            Kodėl <span className="text-green-600">TurboTrim PRO</span> yra pranašesnis
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-full aspect-[4/3] overflow-hidden">
                <img src={feat.img} alt={feat.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-black text-lg md:text-xl uppercase mb-2">{feat.title}</h3>
                <p className="text-gray-600 text-[15px] md:text-base leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Specs = () => (
  <section className="bg-gray-900 text-white py-16 px-4">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-[22px] md:text-4xl font-black uppercase tracking-tight">
          Aukščiausios klasės techninės specifikacijos
        </h2>
      </div>

      <div className="bg-gray-800 rounded-2xl p-5 md:p-6">
        <div className="grid grid-cols-2 gap-4 md:gap-5">
          {[
            { label: "Modelis", value: "TurboTrim PRO daugiafunkcė" },
            { label: "Variklis", value: "Bešepetėlinis indukcinis" },
            { label: "Įtampa", value: "40V (2x20V vienu metu)" },
            { label: "Baterijos", value: "4x 20V/4Ah — dvigubos vienu metu" },
            { label: "Autonomija", value: "Iki 60 minučių" },
            { label: "Siūlo pjovimo plotis", value: "38 cm maks." },
            { label: "Peilio pjovimo plotis", value: "25 cm" },
            { label: "Svoris", value: "Tik 5 kg" },
            { label: "Kotas", value: "Išardomas aliuminis" },
            { label: "Įkroviklis", value: "Dvigubas greitas" },
            { label: "Garantija", value: "5 metai" },
            { label: "Lygis", value: "Profesionalus" },
          ].map((spec, i) => (
            <div key={i} className="flex flex-col py-1">
              <span className="text-gray-400 text-xs md:text-sm uppercase">{spec.label}</span>
              <span className="font-bold text-white text-[15px] md:text-base">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* PowerShare Compatibility */}
      <div className="mt-6 bg-green-900/40 border-2 border-green-500 rounded-xl p-4 md:p-5">
        <div className="flex items-start gap-3">
          <div className="bg-green-500 rounded-full p-2 flex-shrink-0">
            <Battery className="text-white" size={20} />
          </div>
          <div>
            <h4 className="font-black text-base md:text-lg mb-1">Dvigubos baterijos + universali PowerShare sistema</h4>
            <p className="text-gray-300 text-[14px] md:text-[15px] leading-relaxed">
              TurboTrim PRO naudoja <strong className="text-white">2 baterijas po 20V vienu metu</strong>, kad suteiktų 40V tikros kombinuotos galios — kaip vidaus degimo variklis, bet be benzino. PowerShare baterijos suderinamos su <strong className="text-white">VISAIS belaidžiais įrankiais iš asortimento</strong>: grąžtais, pjūklais, pūtikliais, vejapjovėmis ir daugeliu kitų.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const reviewData = [
  { batch: 1, av: "M", name: "Mantas B.", city: "Vilnius", stars: 5, text: "Po 2 dienų pardaviau seną benzininę krūmapjovę. Šis TurboTrim PRO yra monstras: pjauna krūmus ir piktžoles kaip sviestą. Bešepetėlinis variklis nepraranda galios net po 40 minučių. 4 baterijos = visas sodas be sustojimų." },
  { batch: 1, av: "L", name: "Lukas T.", city: "Kaunas", stars: 5, text: "Pagaliau akumuliatorinė krūmapjovė, kuri TIKRAI veikia. Kitos, kurias bandžiau, veikė 15 minučių ir nieko nepjovė. Ši turi vidaus degimo variklio galią, bet be smarvės ir triukšmo. Apsaugos rinkinys komplekte — puiku." },
  { batch: 1, av: "G", name: "Giedrė P.", city: "Klaipėda", stars: 5, text: "Naudoju 800 kv.m sklypui. Su 4 baterijomis viską padarau be problemų. 3 dantų peilis sunaikina krūmus, kurių siūlas negalėjo perpjauti. 69€ už visa tai — neįtikėtinas sandoris." },
  { batch: 2, av: "A", name: "Andrius S.", city: "Šiauliai", stars: 5, text: "Palyginau su kaimyno Stihl: ta pati galia, bet man nereikia pirkti benzino, mišinio ir žvakių. Be to, turiu 5 metų TurboTrim PRO garantiją. Baterijos tinka ir pūtikliui, ir grąžtui." },
  { batch: 2, av: "P", name: "Paulius V.", city: "Panevėžys", stars: 5, text: "Priedų keitimas yra žaibiškas — nuo trimmerio iki peilio per 30 sekundžių. Aliuminio kotas yra lengvutis, mano žmona naudoja be problemų. Surinktas per 5 minutes, iškart paruoštas darbui. Labai rekomenduoju!" },
  { batch: 2, av: "S", name: "Simonas R.", city: "Alytus", stars: 5, text: "Esu profesionalus sodininkas ir naudoju kaip antrą įrankį. Puiki gamybos kokybė, bešepetėlinis variklis neperkaista. 2 papildomos baterijos dovanų pačios vertos 20€. Genialus pirkinys." },
  { batch: 3, av: "R", name: "Rokas F.", city: "Marijampolė", stars: 5, text: "Trečia akumuliatorinė krūmapjovė, kurią bandau per 3 metus. Pirmosios dvi buvo žaislai. Ši yra rimta mašina: tikra galia, tikra autonomija, tikras tvirtumas. TurboTrim PRO — visai kitas lygis." },
  { batch: 3, av: "F", name: "Fausta M.", city: "Utena", stars: 5, text: "Niekada nenaudojau krūmapjovės. Nusipirkau šią namų sodui ir per 10 minučių surinkau pati. Lengva, tyli ir galinga. Nemokamai pridėtas apsaugos rinkinys labai patogus." },
  { batch: 3, av: "D", name: "Dainius C.", city: "Telšiai", stars: 4, text: "Puikus produktas, vienintelė pastaba: peilio montavimo instrukcija galėjo būti detalesnė. Visa kita tobula: galia, autonomija, svoris. Dvigubas įkroviklis krauna abi baterijas vienu metu." },
  { batch: 4, av: "C", name: "Ceslova N.", city: "Tauragė", stars: 5, text: "Mano sklypas buvo užžėlęs piktžolėmis. Per 2 valandas viską išvaliau 3 dantų peiliu. Galia niekada nesumažėjo. ECO režimas labai prailgina bateriją lengvesniems darbams." },
  { batch: 4, av: "E", name: "Erikas G.", city: "Druskininkai", stars: 5, text: "69€ už 4 baterijas, dvigubą įkroviklį, krūmapjovę, trimmerį IR apsaugos rinkinį? Parduotuvėje mačiau prastesnius modelius po 100€ BE baterijų. Čia viskas įskaičiuota. Nepralenkiamas kainos ir kokybės santykis." },
  { batch: 4, av: "V", name: "Vilma L.", city: "Visaginas", stars: 5, text: "Nupirkau vyrui gimtadienio proga. Naudoja kiekvieną savaitgalį ir yra patenkintas. Sako, kad pjauna geriau nei jo senas Husqvarna benzininis. O aš džiaugiuosi: nebėra benzino smarvės garaže!" },
  { batch: 5, av: "N", name: "Nerijus D.", city: "Palanga", stars: 5, text: "Paminkštinta dirželio juosta daro didelį skirtumą: po 40 minučių darbo — jokio nugaros skausmo. Reguliuojama rankena prisitaiko prie mano ūgio (1,90 m). Sukurta tiems, kas tikrai dirba, ne žaislas." },
  { batch: 5, av: "I", name: "Indrė B.", city: "Kėdainiai", stars: 5, text: "Turiu nedidelį obelyną ir man reikėjo rimto įrankio. Plieninis peilis pjauna šakas iki 2 cm be jokių pastangų. Išardomas kotas telpa į Panda bagažinę. Labai praktiškas!" },
  { batch: 5, av: "T", name: "Tomas A.", city: "Raseiniai", stars: 5, text: "Mokėjimas pristatymo metu, jokios rizikos. Atkeliavo per 48 valandas, viskas puikiai supakuota. Aukščiausios kokybės — tai jaučiasi ir matosi, kai paimti į rankas. TurboTrim PRO žalia spalva dar ir gražiai atrodo!" },
  { batch: 6, av: "B", name: "Bronius S.", city: "Jonava", stars: 5, text: "Turiu 400 kv.m sodą su kraštais, lysvėmis ir neprižiūrėta zona. Su TurboTrim PRO viską padarau: tikslius kraštus siūlu, piktžoles peiliu. Keitimas per 30 sekundžių. Fantastiškas daugiafunkcis įrankis." },
  { batch: 6, av: "O", name: "Osvaldas Z.", city: "Ukmergė", stars: 5, text: "Dirbu statybose, naudoju aikštelių valymui. Itin tvirtas, variklis niekada nepaleidžia. PowerShare baterijas naudoju ir su TurboTrim PRO grąžtu. Baterijų ekosistema = sutaupyti pinigai." },
  { batch: 6, av: "H", name: "Helena W.", city: "Šilutė", stars: 5, text: "Mano tėčiui 72 metai ir jis naudoja be problemų dėl mažo svorio (5 kg). Kiti benzininiai sveria dvigubai ir per daug vibruoja. Šis TurboTrim PRO yra tylus ir beveik nevibruoja." },
  { batch: 7, av: "U", name: "Ugnius K.", city: "Plungė", stars: 5, text: "Lyginau internete kelias savaites. Už šią kainą su 4 baterijomis komplekte nėra nieko panašaus. TurboTrim PRO turi geriausią kainos ir kokybės santykį profesionaliame segmente. Taškas." },
  { batch: 7, av: "K", name: "Kristina J.", city: "Biržai", stars: 5, text: "Naudoju 3 kartus per savaitę jau 4 mėnesius. Jokių problemų, jokios priežiūros. Su benzinine reikėjo keisti žvakes, filtrus, mišinį... čia įjungi ir pjauni. Viskas. Dievinu." },
  { batch: 7, av: "J", name: "Jonas Q.", city: "Rokiškis", stars: 5, text: "ECO režimas yra genialus: kraštams naudoja mažiau energijos ir baterija veikia beveik dvigubai ilgiau. Kai reikia visos galios piktžolėms, tiesiog išjungi ECO režimą. Protinga." },
  { batch: 8, av: "W", name: "Vaidas H.", city: "Mažeikiai", stars: 5, text: "Krūmapjovė atkeliavo per 2 dienas. Surinkimas per 5 minutes pažodžiui. Pirmas pjovimas: naikinantis. Perpjovė 60 cm aukščio žolę net nemirktelėjęs. 4 baterijos — milžiniškas privalumas." },
  { batch: 8, av: "X", name: "Ksena O.", city: "Prienai", stars: 5, text: "Puiki dovana mano vyrui — šeštadienio sodininkui. Dabar nebesiskundžia dėl senos krūmapjovės, kuri niekada neužsivedė. Ši visada paruošta — tiesiog įdėk bateriją ir pirmyn." },
  { batch: 8, av: "Y", name: "Yrius I.", city: "Jurbarkas", stars: 5, text: "Žaliųjų plotų priežiūros profesionalas. Naudoju kaip atsarginį savo profesionaliam Stihl. Atvirai pasakius, 90% namų darbų šis TurboTrim PRO yra DAUGIAU nei pakankamas. Ir kainuoja perpus pigiau. Rekomenduoju." },
  { batch: 9, av: "Z", name: "Živilė E.", city: "Šakiai", stars: 5, text: "Nieko neišmaniau apie krūmapjoves. Pasekiau instrukcijas ir per 10 minučių jau pjoviau. Labai paprasta naudoti, lengva, o apsaugos rinkinys komplekte — jaučiausi saugiai. 5 žvaigždutės!" },
  { batch: 9, av: "Q", name: "Karolis U.", city: "Elektrėnai", stars: 4, text: "Puikus produktas, puiki kokybė. Vienintelis pastebėjimas: norėčiau, kad kotas būtų teleskopinis, reguliuojamas aukščiu. Bet visa kita — tai geriausia akumuliatorinė krūmapjovė, kokią esu naudojęs." },
  { batch: 9, av: "AA", name: "Arnas Y.", city: "Lazdijai", stars: 5, text: "Už 69€ su 4 baterijomis, dvigubu įkrovikliu IR apsaugos rinkiniu — tai tiesiog dovana. Parduotuvėje tas pats modelis su tik 2 baterijomis kainuoja 100€. Čia viskas komplekte. Amžiaus sandoris." },
  { batch: 10, av: "AB", name: "Birutė X.", city: "Molėtai", stars: 5, text: "Pagaliau galiu pati prižiūrėti sodą nelaukdama vyro. Lengvutė, jokių nemalonių vibracijų, o dirželio juosta puikiai paskirsto svorį. Moterys — pritariu 100%!" },
  { batch: 10, av: "AC", name: "Česlovas W.", city: "Ignalina", stars: 5, text: "Turiu kalvotą sklypą su sunkiu priėjimu. Išardomas kotas leidžia nešti kuprinėje bet kur. Surinku per 2 minutes ir esu paruoštas darbui. Sukurta tiems, kas dirba lauke." },
  { batch: 10, av: "AD", name: "Daiva V.", city: "Anykščiai", stars: 5, text: "Užsakiau pirmadienį, atkeliavo trečiadienį. Sumokėjau pristatymo metu be jokių problemų. Kokybė viršijo lūkesčius. 2 papildomos baterijos dovanų buvo vyšnaitė ant torto!" },
];

const Reviews = () => {
  const [visibleBatch, setVisibleBatch] = useState(1);
  const maxBatch = 10;
  const visibleReviews = reviewData.filter(r => r.batch <= visibleBatch);
  const hasMore = visibleBatch < maxBatch;

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => <Star key={i} size={28} fill="currentColor" className="text-yellow-500" />)}
          </div>
          <h2 className="text-[22px] md:text-4xl font-black uppercase tracking-tight">634 patenkinti klientai</h2>
          <p className="text-gray-500 text-[15px] md:text-base mt-2">Patvirtinti mūsų klientų atsiliepimai</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleReviews.map((rev, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-black text-lg">{rev.av.charAt(0)}</div>
                <div>
                  <p className="font-bold text-base">{rev.name}</p>
                  <p className="text-sm text-gray-400">{rev.city} • Patvirtintas pirkinys</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(rev.stars)].map((_, j) => <Star key={j} size={14} fill="currentColor" className="text-yellow-500" />)}
                </div>
              </div>
              <p className="text-gray-600 text-[15px] md:text-base leading-relaxed">{rev.text}</p>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-8">
            <button
              onClick={() => setVisibleBatch(prev => Math.min(prev + 1, maxBatch))}
              className="bg-white border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl font-black text-base uppercase tracking-wide hover:bg-green-600 hover:text-white transition-all shadow-sm"
            >
              Rodyti daugiau atsiliepimų
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// --- QUICK ORDER FORM ---

const getUtmParams = () => {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_term: params.get('utm_term') || '',
    utm_content: params.get('utm_content') || '',
    subid: params.get('subid') || '',
    subid2: params.get('subid2') || '',
    subid3: params.get('subid3') || '',
    subid4: params.get('subid4') || '',
    pubid: params.get('pubid') || '',
  };
};

const QuickOrderForm = () => {
  const [form, setForm] = useState({ fullName: "", address: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [fingerprint, setFingerprint] = useState('');

  useEffect(() => {
    const fp = getCanvasFingerprint();
    setFingerprint(fp);
  }, []);

  const updateForm = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = "Įveskite vardą ir pavardę";
    if (!form.address.trim()) errs.address = "Įveskite pilną adresą";
    const digits = form.phone.replace(/\D/g, "");
    if (!form.phone.trim()) errs.phone = "Įveskite telefono numerį";
    else if (digits.length < 7) errs.phone = "Neteisingas numeris";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    const utmParams = getUtmParams();

    const formData = new URLSearchParams();

    // Hardcoded required fields
    formData.append('uid', '0191dbf2-738a-7d28-82a0-18c3859d5e8f');
    formData.append('key', '151af1e45a084aaf75c15f');
    formData.append('offer', '3374');
    formData.append('lp', '3410');
    formData.append('name', form.fullName.trim());
    formData.append('tel', '+370' + form.phone.trim().replace(/\s/g, ''));
    formData.append('street-address', form.address.trim());

    if (fingerprint) {
      formData.append('tmfp', fingerprint);
    } else {
      // Fallback: send UA and try to fetch IP
      formData.append('ua', navigator.userAgent);
      try {
        const ipRes = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipRes.json();
        if (ipData.ip) formData.append('ip', ipData.ip);
      } catch {
        // IP fetch failed, continue without it
      }
    }

    if (utmParams.utm_source) formData.append('utm_source', utmParams.utm_source);
    if (utmParams.utm_medium) formData.append('utm_medium', utmParams.utm_medium);
    if (utmParams.utm_campaign) formData.append('utm_campaign', utmParams.utm_campaign);
    if (utmParams.utm_term) formData.append('utm_term', utmParams.utm_term);
    if (utmParams.utm_content) formData.append('utm_content', utmParams.utm_content);
    if (utmParams.subid) formData.append('subid', utmParams.subid);
    if (utmParams.subid2) formData.append('subid2', utmParams.subid2);
    if (utmParams.subid3) formData.append('subid3', utmParams.subid3);
    if (utmParams.subid4) formData.append('subid4', utmParams.subid4);
    if (utmParams.pubid) formData.append('pubid', utmParams.pubid);

    try {
      localStorage.setItem("decespugliatore-lt-order", JSON.stringify({
        fullName: form.fullName.trim(),
        address: form.address.trim(),
        phone: form.phone.trim(),
      }));
    } catch {}

    try {
      const res = await fetch("https://offers.adricenetwork.com/forms/api/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("API Error:", res.status, text);
        alert("Įvyko klaida. Bandykite dar kartą.");
        setSubmitting(false);
        return;
      }

      const params = new URLSearchParams({
        name: form.fullName,
        address: form.address,
        phone: form.phone,
      });
      window.location.href = `/decespugliatore-lt/ty?${params.toString()}`;
      return;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "bandykite dar kartą";
      console.error("Network Error:", message);
      alert("Tinklo klaida: " + message);
      setSubmitting(false);
    }
  };


  return (
    <section className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 py-16 px-4" id="form-ordine">
      <div className="max-w-lg mx-auto">
        <div className="text-center text-white mb-6">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2.5 rounded-full text-[13px] md:text-sm font-bold mb-4">
            <AlertTriangle className="animate-pulse" size={16} />
            IŠPARDAVIMAS — LIKO TIK 5 VNT.
          </div>
          <h2 className="text-[28px] md:text-4xl font-black uppercase mb-3">
            Užsakykite savo TurboTrim PRO!
          </h2>
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-white/70 line-through text-xl md:text-2xl">139€</span>
            <span className="text-5xl md:text-6xl font-black">69€</span>
          </div>
          <p className="text-white/90 text-[15px] md:text-base">
            4 baterijos + apsaugos rinkinys NEMOKAMAI • NEMOKAMAS pristatymas • Pristatymas per 24-48 val.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-5 md:p-6 shadow-2xl space-y-4">
          {/* What's included recap */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-2">
            <p className="font-black text-green-800 text-sm mb-2 flex items-center gap-2"><Gift size={16} /> JŪSŲ UŽSAKYME:</p>
            <ul className="text-[13px] text-green-700 space-y-1">
              <li className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-green-500 flex-shrink-0" /> TurboTrim PRO daugiafunkcė krūmapjovė</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-green-500 flex-shrink-0" /> 4x baterijos 20V/4Ah PowerShare</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-green-500 flex-shrink-0" /> Dvigubas greitas įkroviklis</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-green-500 flex-shrink-0" /> Pilnas apsaugos rinkinys (ausinės + akiniai + pirštinės)</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-green-500 flex-shrink-0" /> Ergonomiška paminkštinta dirželio juosta</li>
            </ul>
          </div>

          <div>
            <label className="block text-[15px] md:text-base font-bold text-gray-700 mb-1.5">Vardas ir pavardė *</label>
            <input
              type="text"
              placeholder="Pvz. Jonas Jonaitis"
              value={form.fullName}
              onChange={(e) => updateForm("fullName", e.target.value)}
              className={`w-full py-4 px-4 border-2 rounded-xl text-[16px] font-medium outline-none transition-colors ${errors.fullName ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-green-500"}`}
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-[15px] md:text-base font-bold text-gray-700 mb-1.5">Pilnas adresas *</label>
            <input
              type="text"
              placeholder="Gedimino pr. 1, LT-01103 Vilnius"
              value={form.address}
              onChange={(e) => updateForm("address", e.target.value)}
              className={`w-full py-4 px-4 border-2 rounded-xl text-[16px] font-medium outline-none transition-colors ${errors.address ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-green-500"}`}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          <div>
            <label className="block text-[15px] md:text-base font-bold text-gray-700 mb-1.5">Telefono numeris *</label>
            <div className={`flex items-stretch border-2 rounded-xl overflow-hidden ${errors.phone ? "border-red-500 bg-red-50" : "border-gray-200 focus-within:border-green-500"}`}>
              <span className="py-4 px-3.5 text-[15px] font-bold text-gray-500 bg-gray-100 border-r-2 border-gray-200 flex items-center">+370</span>
              <input
                type="tel"
                placeholder="612 34567"
                value={form.phone}
                onChange={(e) => updateForm("phone", e.target.value)}
                className="flex-1 py-4 px-4 text-[16px] font-medium outline-none bg-transparent"
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-5 rounded-xl font-black text-[17px] md:text-lg uppercase tracking-wide shadow-lg hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-60 disabled:cursor-wait flex items-center justify-center gap-2"
          >
            {submitting ? (
              <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <ShoppingBag size={22} />
                PATVIRTINTI UŽSAKYMĄ — 69€ PRISTATYMO METU
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 text-[14px] md:text-[15px] text-gray-500 pt-2">
            <Lock size={16} className="text-green-600" />
            <span><strong className="text-green-600">SAUGUS</strong> mokėjimas grynaisiais pristatymo metu</span>
          </div>

          <div className="flex items-center justify-center gap-4 text-[13px] md:text-sm text-gray-400 pt-2">
            <span className="flex items-center gap-1"><Truck size={14} /> Nemokamas pristatymas</span>
            <span className="flex items-center gap-1"><RotateCcw size={14} /> Grąžinimas 30 d.</span>
            <span className="flex items-center gap-1"><Shield size={14} /> 5 m. garantija</span>
          </div>
        </form>

        <p className="text-center text-white/70 text-[13px] md:text-sm mt-4">
          Mūsų operatorius susisieks su jumis užsakymo patvirtinimui
        </p>
      </div>
    </section>
  );
};

// --- URGENCY SECTION ---
const UrgencySection = () => {
  const [soldToday, setSoldToday] = useState(23);

  useEffect(() => {
    const interval = setInterval(() => {
      setSoldToday(prev => prev + (Math.random() > 0.7 ? 1 : 0));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-black text-white py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }}></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex justify-center mb-6">
          <div className="bg-red-600 text-white px-4 md:px-5 py-2.5 rounded-full font-black text-[13px] md:text-sm uppercase tracking-wide flex items-center gap-2 animate-pulse">
            <AlertTriangle size={18} />
            DĖMESIO — PERSKAITYKITE PRIEŠ TĘSIANT
          </div>
        </div>

        <h2 className="text-[26px] md:text-5xl font-black text-center uppercase tracking-tight mb-8 leading-tight">
          Kodėl šis pasiūlymas <span className="text-green-500">nebus amžinas</span>
        </h2>

        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-5 text-center border border-white/20">
            <div className="text-3xl md:text-5xl font-black text-green-500 mb-1">{soldToday}</div>
            <div className="text-[11px] md:text-sm font-bold text-gray-300 uppercase tracking-wide">Parduota šiandien</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-5 text-center border border-white/20">
            <div className="text-3xl md:text-5xl font-black text-red-500 mb-1">5</div>
            <div className="text-[11px] md:text-sm font-bold text-gray-300 uppercase tracking-wide">Liko vienetų</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-5 text-center border border-white/20">
            <div className="text-3xl md:text-5xl font-black text-yellow-500 mb-1">50%</div>
            <div className="text-[11px] md:text-sm font-bold text-gray-300 uppercase tracking-wide">Aktyvi nuolaida</div>
          </div>
        </div>

        <div className="space-y-4 mb-10">
          <div className="bg-red-900/50 border-2 border-red-500 rounded-xl p-4 md:p-5">
            <div className="flex items-start gap-3">
              <div className="bg-red-500 rounded-full p-2 flex-shrink-0">
                <AlertTriangle className="text-white" size={20} />
              </div>
              <div>
                <h4 className="font-black text-base md:text-lg mb-1">Sandėlio išpardavimas vyksta</h4>
                <p className="text-gray-300 text-[14px] md:text-[15px] leading-relaxed">
                  Ši partija su <strong className="text-white">4 baterijomis + apsaugos rinkiniu komplekte</strong> parduodama už <strong className="text-white">69€</strong>. Rekomenduojama kaina yra <strong className="text-white">139€</strong> ir grįš į pilną kainą su kitu tiekimu. 2 papildomos baterijos dovanų — tik kol yra likučių.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-900/50 border-2 border-green-500 rounded-xl p-4 md:p-5">
            <div className="flex items-start gap-3">
              <div className="bg-green-500 rounded-full p-2 flex-shrink-0">
                <Gift className="text-white" size={20} />
              </div>
              <div>
                <h4 className="font-black text-base md:text-lg mb-1">Dovanos tik šiai partijai</h4>
                <p className="text-gray-300 text-[14px] md:text-[15px] leading-relaxed">
                  <strong className="text-white">2 papildomos baterijos</strong> (vertė 20€) ir <strong className="text-white">pilnas apsaugos rinkinys</strong> (vertė 12€) pridedami TIK prie šios išpardavimo partijos. Kitame tiekime bus parduodami atskirai pilna kaina.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-5 md:p-6 mb-10 border border-gray-700">
          <h3 className="text-lg md:text-xl font-black text-center mb-6 uppercase">Jei užsakote šiandien vs jei laukiate</h3>
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-green-400 font-bold text-sm md:text-base">
                <CheckCircle2 size={20} />
                <span>UŽSAKOTE ŠIANDIEN</span>
              </div>
              <ul className="space-y-2.5 text-[13px] md:text-sm">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> Mokate tik 69€</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> 4 baterijos komplekte</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> Apsaugos rinkinys NEMOKAMAI</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> Pristatymas NEMOKAMAI</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> Sutaupote 70€</li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-red-400 font-bold text-sm md:text-base">
                <XCircle size={20} />
                <span>JEI LAUKIATE</span>
              </div>
              <ul className="space-y-2.5 text-[13px] md:text-sm text-gray-400">
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Mokėsite 139€</li>
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Tik 2 baterijos</li>
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Apsaugos rinkinys atskirai (12€)</li>
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Pristatymas 4,90€</li>
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Jokio sutaupymo</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-400 text-[14px] md:text-base mb-5 leading-relaxed">
            Jokios rizikos: <strong className="text-white">mokate pristatymo metu</strong> ir turite <strong className="text-white">30 dienų</strong> nemokamam grąžinimui. <strong className="text-white">5 metų TurboTrim PRO garantija.</strong>
          </p>
          <button
            onClick={() => document.getElementById('form-ordine')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full md:w-auto bg-gradient-to-r from-green-600 to-green-700 text-white px-8 md:px-10 py-5 rounded-xl font-black text-lg md:text-xl uppercase tracking-wide shadow-2xl hover:from-green-700 hover:to-green-800 transition-all inline-flex items-center justify-center gap-3"
          >
            <ShoppingBag size={24} />
            TAIP, NORIU TurboTrim PRO UŽ 69€
          </button>
          <p className="text-gray-500 text-xs md:text-sm mt-3">
            Spustelėkite mygtuką ir užpildykite formą — tai užtruks tik 30 sekundžių
          </p>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);

  const faqs = [
    {
      q: "Kiek baterijų yra komplekte?",
      a: "Iš viso 4 baterijos: 2 baterijos 20V/4Ah standartinės + 2 baterijos 20V/4Ah PAPILDOMAI dovanų. Kombinuota autonomija iki 60 minučių nepertraukiamo darbo."
    },
    {
      q: "Ar tinka profesionaliam naudojimui?",
      a: "TurboTrim PRO klasifikuojamas kaip profesionalus. Puikiai tinka sodams iki 1000 kv.m, neprižiūrėtiems sklypams, kraštams, piktžolėms ir krūmams. Bešepetėlinis variklis užtikrina pastovią galią ir ilgesnę tarnavimo trukmę."
    },
    {
      q: "Kas įeina į apsaugos rinkinį dovanų?",
      a: "Profesionalios triukšmo slopinimo ausinės, CE polikarbonatiniai apsauginiai akiniai (nerasojantys ir atsparūs įbrėžimams), sustiprintos darbo pirštinės su guminiu sukibimu. Komercinė vertė 12€, pridedama NEMOKAMAI."
    },
    {
      q: "Ar baterijos suderinamos su kitais įrankiais?",
      a: "Taip! PowerShare 20V baterijos veikia su VISAIS TurboTrim PRO belaidžiais įrankiais: grąžtais, pjūklais, pūtikliais, vejapjovėmis ir daugeliu kitų. Investicija, kuri atsperka visoje ekosistemoje."
    },
    {
      q: "Kiek sveria?",
      a: "Tik 5 kg su baterija. Aliuminio kotas ir paminkštinta dirželio juosta užtikrina itin patogų naudojimą net ilgesnėms darbo sesijoms."
    },
    {
      q: "Kaip mokėti?",
      a: "Mokate grynaisiais kurjeriui, kai gaunate siuntinį. Jokio išankstinio mokėjimo, jokios rizikos. Jei nesate patenkinti, turite 30 dienų nemokamam grąžinimui."
    },
  ];

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-[22px] md:text-4xl font-black uppercase tracking-tight">Dažniausiai užduodami klausimai</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-gray-50 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full p-4 md:p-5 text-left font-bold flex items-center justify-between gap-4 hover:bg-gray-100 transition-colors text-[15px] md:text-base"
              >
                {faq.q}
                <span className={`text-2xl text-green-600 transition-transform flex-shrink-0 ${open === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              {open === i && (
                <div className="px-4 md:px-5 pb-4 md:pb-5 text-gray-600 text-[15px] md:text-base leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StickyBar = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
          <div className="bg-white border-t-2 border-green-600 p-4 shadow-2xl flex items-center gap-4">
            <div className="flex-1">
              <p className="font-black text-3xl text-green-600">69€</p>
              <p className="text-xs font-bold text-gray-400 line-through">139€</p>
            </div>
            <button
              onClick={() => document.getElementById('form-ordine')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex-[2] bg-gradient-to-r from-green-600 to-green-700 text-white font-black py-4 px-4 rounded-xl uppercase text-base shadow-lg active:scale-95 transition-transform"
            >
              UŽSAKYTI -50%
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 text-white py-10 px-4">
    <div className="max-w-7xl mx-auto text-center space-y-6">
      <div className="font-black text-2xl uppercase tracking-tight">
        <span className="text-green-500">TurboTrim PRO</span>
      </div>
      <div className="flex flex-wrap justify-center gap-6 text-xs font-bold uppercase text-gray-500 tracking-wide">
        <a href="/privacy-policy" className="hover:text-white transition-colors">Privatumas</a>
        <a href="/terms-of-service" className="hover:text-white transition-colors">Sąlygos</a>
        <a href="/contact" className="hover:text-white transition-colors">Kontaktai</a>
      </div>
      <p className="text-xs text-gray-600">
        &copy; 2026 TurboTrim PRO Lietuva. Vaizdai skirti iliustraciniais tikslais.
      </p>
    </div>
  </footer>
);

// --- Main Component ---

export default function Page() {
  return (
    <div className="min-h-screen bg-white font-sans text-black">
      <CountdownTimer />
      <Header />
      <Hero />
      <TrustRow />
      <ThreeInOne />
      <ProblemSolution />
      <Features />
      <Specs />
      <Reviews />
      <UrgencySection />
      <QuickOrderForm />
      <FAQ />
      <Footer />
      <StickyBar />

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
