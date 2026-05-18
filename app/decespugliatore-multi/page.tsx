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
 * Decespugliatore Multifunzione 40V TurboTrim PRO
 * Landing Page per Google Ads Demand Gen - Marketing Aggressivo - ITALIA
 */

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
          <span className="font-black text-sm md:text-base uppercase tracking-wide">LIQUIDAZIONE MAGAZZINO - ULTIMI 5 DISPONIBILI!</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-300">L&apos;offerta scade tra:</span>
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
      <span className="text-red-700 font-black text-base">ATTENZIONE: Solo 5 pezzi rimasti a questo prezzo!</span>
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
      <span><strong className="text-black">{Math.max(20, viewers)}</strong> persone stanno guardando questo prodotto</span>
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
        Ordina -40%
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
                  alt={`Decespugliatore Multifunzione TurboTrim PRO 40V ${i + 1}`}
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
                -40%
              </div>
              <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1.5 rounded-lg font-black text-sm shadow-lg flex items-center gap-1">
                <Gift size={14} />
                2 BATTERIE EXTRA GRATIS
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
                N°1 VENDITE 2026
              </span>
              <span className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-black uppercase">
                <Zap size={12} />
                3 ATTREZZI IN 1
              </span>
              <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-black uppercase">
                QUALITÀ PROFESSIONALE
              </span>
            </div>

            <h1 className="text-[26px] md:text-4xl font-black leading-tight uppercase tracking-tight text-gray-900">
              TurboTrim PRO<br />
              <span className="text-green-600">Decespugliatore Multifunzione 40V</span>
            </h1>

            <p className="text-[17px] md:text-lg text-gray-600 leading-relaxed">
              Motore Brushless professionale con sistema a doppia batteria 20V simultanea per 40V di potenza combinata. 4 batterie 20V/4Ah incluse, decespugliatore + tagliabordi + lama a 3 denti. <strong className="text-gray-900">Kit protezione OMAGGIO del valore di 49€.</strong>
            </p>
          </div>

          {/* BIG PRICE */}
          <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 p-5 rounded-2xl border-2 border-green-400 shadow-lg">
            <div className="flex items-center justify-center gap-4 mb-2">
              <span className="text-gray-400 line-through text-2xl font-bold">461€</span>
              <div className="relative">
                <span className="text-6xl md:text-7xl font-black text-green-600">279€</span>
              </div>
            </div>
            <div className="text-center mb-3">
              <span className="bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-black inline-block">
                RISPARMI 182€ — SOLO OGGI!
              </span>
            </div>
            <div className="flex items-center justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} size={22} fill="currentColor" className="text-yellow-500" />)}
              <span className="font-bold text-sm ml-2">4.8/5</span>
              <span className="text-gray-500 text-sm">(634 recensioni)</span>
            </div>
            <StockCounter />
          </div>

          {/* Live Viewers */}
          <LiveViewers />

          {/* OMAGGI */}
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-xl border-2 border-amber-300">
            <h3 className="font-black text-base text-amber-800 mb-3 flex items-center gap-2">
              <Gift className="text-amber-600" size={20} />
              INCLUSO GRATIS CON IL TUO ORDINE (Valore 129€)
            </h3>
            <ul className="space-y-2">
              {[
                "2x Batterie EXTRA 20V/4Ah PowerShare (valore 79€)",
                "Caricatore doppio rapido",
                "Cuffie antirumore professionali",
                "Occhiali protettivi CE in policarbonato",
                "Guanti da lavoro rinforzati",
                "Tracolla imbottita ergonomica",
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
              { icon: Zap, text: "Doppia Batteria Simultanea — 2x20V = 40V di potenza combinata" },
              { icon: Wrench, text: "3 in 1 — Decespugliatore + Tagliabordi + Lama Acciaio" },
              { icon: Battery, text: "4 Batterie 20V/4Ah Incluse — Autonomia fino a 60 minuti" },
              { icon: Ruler, text: "Taglio fino a 38cm — Motore Brushless senza benzina" },
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
              ORDINA ORA — PAGA ALLA CONSEGNA
            </button>
            <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-500">
              <Lock size={14} />
              <span>Pagamento sicuro alla consegna in contanti</span>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-gray-100 p-3 rounded-xl text-center">
              <Truck className="mx-auto mb-1 text-green-600" size={22} />
              <p className="text-[11px] font-bold text-gray-700">Spedizione<br />GRATIS</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-xl text-center">
              <RotateCcw className="mx-auto mb-1 text-green-600" size={22} />
              <p className="text-[11px] font-bold text-gray-700">Reso<br />30 Giorni</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-xl text-center">
              <Shield className="mx-auto mb-1 text-green-600" size={22} />
              <p className="text-[11px] font-bold text-gray-700">Garanzia<br />5 Anni</p>
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
            <span className="font-bold text-sm flex items-center gap-2"><Truck size={16} /> SPEDIZIONE EXPRESS 24-48H</span>
            <span className="font-bold text-sm flex items-center gap-2"><Shield size={16} /> GARANZIA 5 ANNI</span>
            <span className="font-bold text-sm flex items-center gap-2"><RotateCcw size={16} /> RESO GRATUITO 30GG</span>
            <span className="font-bold text-sm flex items-center gap-2"><ThumbsUp size={16} /> +600 VENDUTI</span>
            <span className="font-bold text-sm flex items-center gap-2"><Battery size={16} /> 4 BATTERIE INCLUSE</span>
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
          UN ATTREZZO, INFINITE POSSIBILITÀ
        </span>
        <h2 className="text-[26px] md:text-5xl font-black uppercase tracking-tight leading-tight">
          3 Attrezzi Professionali<br />
          <span className="text-green-400">Al Prezzo di 1</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {[
          {
            icon: Wind,
            title: "DECESPUGLIATORE",
            desc: "Lama in acciaio a 3 denti per erba alta, rovi e sterpaglie. Alimentato da doppia batteria simultanea (2x20V=40V) per potenza combinata inarrestabile.",
            badge: "INCLUSO"
          },
          {
            icon: Scissors,
            title: "TAGLIABORDI",
            desc: "Testina a filo con avanzamento automatico tap-and-go. Larghezza taglio fino a 38cm per bordi perfetti.",
            badge: "INCLUSO"
          },
          {
            icon: TreePine,
            title: "LAMA A 3 DENTI",
            desc: "Disco in acciaio temperato per vegetazione fitta e rami fino a 2cm. Potenza professionale garantita.",
            badge: "INCLUSO"
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
          In negozio pagheresti <strong className="text-white line-through">461€</strong> per questi 3 accessori separati.
          <br />Oggi li hai <strong className="text-green-400">TUTTI INSIEME a soli 279€</strong>.
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
          Il Tuo Giardino è Fuori Controllo?
        </h2>
        <p className="text-gray-500 text-base mt-3 max-w-2xl mx-auto">Il decespugliatore a benzina puzza, vibra e non parte mai. Quello economico si rompe dopo 2 mesi. Basta.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="text-lg md:text-xl font-black text-red-600 mb-4 flex items-center gap-2">
            <XCircle size={24} /> SENZA IL TurboTrim PRO
          </h3>
          <ul className="space-y-3">
            {[
              "Decespugliatore a benzina: puzza, rumore, manutenzione costante",
              "Modelli economici: si rompono dopo una stagione",
              "Comprare 3 attrezzi separati costa più di 500€",
              "Batterie scadenti: 10 minuti di autonomia e già scariche",
              "Erba alta e sterpaglie impossibili da gestire",
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
            <CheckCircle2 size={24} /> CON IL TurboTrim PRO MULTIFUNZIONE
          </h3>
          <ul className="space-y-3">
            {[
              "Motore Brushless a doppia batteria simultanea: 40V reali, zero benzina, zero puzza",
              "Costruzione professionale: dura anni e anni",
              "3 attrezzi in 1: risparmi oltre 180€ sul prezzo di listino",
              "4 batterie 20V/4Ah: 2 lavorano insieme, 2 in ricarica. 60 min di autonomia",
              "Taglia qualsiasi cosa: erba, rovi, sterpaglie, rami",
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
      title: "Motore Brushless 40V a Doppia Batteria",
      desc: "2 batterie da 20V lavorano in simultanea per erogare 40V di potenza combinata. Potenza costante senza calo, nessuna scintilla e durata 3 volte superiore ai motori tradizionali.",
      img: "/images/decespugliatore/carosello/8.jpg",
    },
    {
      title: "4 Batterie PowerShare — Doppia Simultanea",
      desc: "Il motore usa 2 batterie 20V in contemporanea per 40V reali. In dotazione 4 batterie totali: mentre 2 lavorano, 2 si ricaricano. Autonomia fino a 60 minuti senza pause.",
      img: "/images/decespugliatore/carosello/7.jpg",
    },
    {
      title: "Lama in Acciaio a 3 Denti",
      desc: "Taglia rovi, arbusti e vegetazione fitta. Disco temperato per uso professionale. Larghezza taglio 25cm.",
      img: "/images/decespugliatore/carosello/12.jpg",
    },
    {
      title: "Testina Tap-and-Go",
      desc: "Avanzamento automatico del filo con un semplice tocco a terra. Larghezza taglio fino a 38cm per bordi perfetti.",
      img: "/images/decespugliatore/carosello/4.jpg",
    },
    {
      title: "Asta in Alluminio Separabile",
      desc: "Leggerissima e robusta. Si divide in 2 sezioni per trasporto facile. Solo 5kg totali con batteria montata.",
      img: "/images/decespugliatore/carosello/3.jpg",
    },
    {
      title: "Modalità ECO",
      desc: "Gestione intelligente dell'energia. Aumenta l'autonomia del 30% per lavori meno impegnativi. Batteria che dura di più.",
      img: "/images/decespugliatore/carosello/10.jpg",
    },
  ];

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
            Perché Il <span className="text-green-600">TurboTrim PRO</span> è Superiore
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
          Specifiche Tecniche Premium
        </h2>
      </div>

      <div className="bg-gray-800 rounded-2xl p-5 md:p-6">
        <div className="grid grid-cols-2 gap-4 md:gap-5">
          {[
            { label: "Modello", value: "TurboTrim PRO Multifunzione" },
            { label: "Motore", value: "Brushless ad induzione" },
            { label: "Voltaggio", value: "40V (2x20V simultanee)" },
            { label: "Batterie", value: "4x 20V/4Ah — doppia simultanea" },
            { label: "Autonomia", value: "Fino a 60 minuti" },
            { label: "Larghezza Taglio Filo", value: "38 cm max" },
            { label: "Larghezza Taglio Lama", value: "25 cm" },
            { label: "Peso", value: "Solo 5 kg" },
            { label: "Asta", value: "Alluminio separabile" },
            { label: "Caricatore", value: "Doppio rapido" },
            { label: "Garanzia", value: "5 Anni" },
            { label: "Livello", value: "Professionale" },
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
            <h4 className="font-black text-base md:text-lg mb-1">Sistema Doppia Batteria + PowerShare Universale</h4>
            <p className="text-gray-300 text-[14px] md:text-[15px] leading-relaxed">
              Il TurboTrim PRO utilizza <strong className="text-white">2 batterie 20V in simultanea</strong> per erogare 40V di potenza combinata reale — come un motore a scoppio, ma senza benzina. Le batterie PowerShare sono compatibili con <strong className="text-white">TUTTI gli attrezzi cordless della gamma</strong>: trapani, seghe, soffiatori, tosaerba e molto altro.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const reviewData = [
  { batch: 1, av: "M", name: "Marco B.", city: "Roma", stars: 5, text: "Ho venduto il vecchio decespugliatore a benzina dopo 2 giorni. Questo TurboTrim PRO è un mostro: taglia rovi e sterpaglie come burro. Il motore brushless non perde potenza neanche dopo 40 minuti. 4 batterie = giardino intero senza fermarsi." },
  { batch: 1, av: "L", name: "Luigi T.", city: "Milano", stars: 5, text: "Finalmente un decespugliatore a batteria che funziona DAVVERO. Gli altri che avevo provato duravano 15 minuti e non tagliavano niente. Questo ha la potenza di un motore a scoppio ma senza puzza e rumore. Kit protezione incluso top." },
  { batch: 1, av: "G", name: "Giuliana P.", city: "Napoli", stars: 5, text: "Lo uso per il mio terreno di 800mq. Con le 4 batterie faccio tutto senza problemi. La lama a 3 denti distrugge i rovi che il filo non riusciva a tagliare. 279€ per tutto questo è un affare assurdo." },
  { batch: 2, av: "A", name: "Andrea S.", city: "Firenze", stars: 5, text: "Confrontato con il Stihl del mio vicino: stessa potenza, ma io non devo comprare benzina, miscela e candele. In più ho 5 anni di garanzia TurboTrim PRO. Le batterie si usano anche sul soffiatore e il trapano." },
  { batch: 2, av: "P", name: "Paolo V.", city: "Torino", stars: 5, text: "Il cambio accessorio è velocissimo, da tagliabordi a lama in 30 secondi. L'asta in alluminio è leggerissima, mia moglie lo usa senza problemi. Montato in 5 minuti, subito operativo. Consigliatissimo!" },
  { batch: 2, av: "S", name: "Simone R.", city: "Bologna", stars: 5, text: "Sono giardiniere professionista e lo uso come secondo attrezzo. Qualità costruttiva eccellente, motore brushless che non si surriscalda. Le 2 batterie extra in omaggio valgono da sole 80€. Acquisto geniale." },
  { batch: 3, av: "R", name: "Roberto F.", city: "Verona", stars: 5, text: "Terzo decespugliatore a batteria che provo in 3 anni. I primi due erano giocattoli. Questo è una macchina seria: potenza reale, autonomia reale, robustezza reale. TurboTrim PRO è un altro pianeta." },
  { batch: 3, av: "F", name: "Francesca M.", city: "Palermo", stars: 5, text: "Mai usato un decespugliatore prima. Ho preso questo per il giardino di casa e in 10 minuti l'ho montato da sola. Leggero, silenzioso e potente. Il kit di protezione incluso gratis è molto comodo." },
  { batch: 3, av: "D", name: "Daniele C.", city: "Genova", stars: 4, text: "Prodotto eccellente, solo nota: le istruzioni potevano essere più dettagliate sul montaggio della lama. Per il resto è perfetto: potenza, autonomia, peso. Il caricatore doppio carica entrambe le batterie insieme." },
  { batch: 4, av: "C", name: "Claudia N.", city: "Bari", stars: 5, text: "Il mio terreno era invaso dalle sterpaglie. In 2 ore ho ripulito tutto con la lama a 3 denti. Non ha mai perso potenza. La modalità ECO allunga tantissimo la batteria per i lavori più leggeri." },
  { batch: 4, av: "E", name: "Enrico G.", city: "Padova", stars: 5, text: "279€ per 4 batterie, caricatore doppio, decespugliatore, tagliabordi E il kit protezione? In negozio ho visto modelli inferiori a 400€ SENZA batterie. Qui è tutto compreso. Qualità/prezzo imbattibile." },
  { batch: 4, av: "V", name: "Valentina L.", city: "Catania", stars: 5, text: "Comprato per mio marito per il compleanno. Lo usa ogni weekend e ne è entusiasta. Dice che taglia meglio del suo vecchio Husqvarna a benzina. E io sono contenta: niente più puzza di miscela in garage!" },
  { batch: 5, av: "N", name: "Nicola D.", city: "Perugia", stars: 5, text: "La tracolla imbottita fa la differenza: dopo 40 minuti di lavoro zero mal di schiena. L'impugnatura regolabile si adatta alla mia altezza (1.90m). Pensato per chi lavora davvero, non un giocattolo." },
  { batch: 5, av: "I", name: "Isabella B.", city: "Trieste", stars: 5, text: "Ho un piccolo uliveto e avevo bisogno di qualcosa di serio. La lama in acciaio taglia rami fino a 2cm senza sforzo. L'asta separabile entra nel bagagliaio della Panda. Praticissimo!" },
  { batch: 5, av: "T", name: "Tommaso A.", city: "Ancona", stars: 5, text: "Pagamento alla consegna, zero rischi. Arrivato in 48 ore, tutto imballato perfettamente. Qualità premium che si vede e si sente appena lo prendi in mano. Il verde TurboTrim PRO è anche bello da vedere!" },
  { batch: 6, av: "B", name: "Bruno S.", city: "Brescia", stars: 5, text: "Ho un giardino di 400mq con bordi, aiuole e una zona incolta. Con il TurboTrim PRO faccio tutto: bordi precisi col filo, sterpaglie con la lama. Cambio in 30 secondi. Fantastico strumento multiuso." },
  { batch: 6, av: "O", name: "Oscar Z.", city: "Reggio Emilia", stars: 5, text: "Lavoro edile, lo uso nei cantieri per pulire le aree. Robustissimo, motore che non molla mai. Le batterie PowerShare le uso anche sul trapano TurboTrim PRO. Ecosistema batterie = soldi risparmiati." },
  { batch: 6, av: "H", name: "Helena W.", city: "Modena", stars: 5, text: "Mio padre ha 72 anni e riesce ad usarlo senza problemi grazie al peso ridotto (5kg). Gli altri a benzina pesano il doppio e vibrano troppo. Questo TurboTrim PRO è silenzioso e non vibra quasi per niente." },
  { batch: 7, av: "U", name: "Umberto K.", city: "Lecce", stars: 5, text: "Ho confrontato online per settimane. A questo prezzo con 4 batterie incluse non esiste niente di paragonabile. Il TurboTrim PRO è il miglior rapporto qualità-prezzo nel segmento professionale. Punto." },
  { batch: 7, av: "K", name: "Katia J.", city: "Pescara", stars: 5, text: "Lo uso 3 volte a settimana da 4 mesi. Zero problemi, zero manutenzione. Col decespugliatore a benzina dovevo cambiare candele, filtri, miscela... qui accendi e tagli. Fine. Lo adoro." },
  { batch: 7, av: "J", name: "Jacopo Q.", city: "Bergamo", stars: 5, text: "La modalità ECO è geniale: per i bordi usa meno energia e la batteria dura quasi il doppio. Poi quando serve potenza piena per le sterpaglie, basta togliere la modalità ECO. Intelligente." },
  { batch: 8, av: "W", name: "Walter H.", city: "Messina", stars: 5, text: "Decespugliatore arrivato in 2 giorni. Montaggio in 5 minuti letterali. Prima tagliata: devastante. Ha tagliato erba alta 60cm senza battere ciglio. Le 4 batterie sono un vantaggio enorme." },
  { batch: 8, av: "X", name: "Xenia O.", city: "Ravenna", stars: 5, text: "Regalo perfetto per mio marito giardiniere della domenica. Ora non si lamenta più del vecchio decespugliatore che non partiva mai. Questo è sempre pronto, basta inserire la batteria e via." },
  { batch: 8, av: "Y", name: "Yuri I.", city: "Livorno", stars: 5, text: "Professionista del verde qui. Lo uso come backup del mio Stihl professionale. Onestamente per il 90% dei lavori domestici questo TurboTrim PRO è PIÙ che sufficiente. E costa la metà. Consiglio." },
  { batch: 9, av: "Z", name: "Zoe E.", city: "Rimini", stars: 5, text: "Non sapevo niente di decespugliatori. Ho seguito le istruzioni e in 10 minuti stavo già tagliando. Facilissimo da usare, leggero, e il kit protezione incluso mi ha fatto sentire sicura. 5 stelle!" },
  { batch: 9, av: "Q", name: "Quirino U.", city: "Pisa", stars: 4, text: "Ottimo prodotto, qualità eccellente. L'unico appunto: avrei voluto un'asta telescopica regolabile in altezza. Ma per il resto è il miglior decespugliatore a batteria che abbia mai usato." },
  { batch: 9, av: "AA", name: "Alessio Y.", city: "Salerno", stars: 5, text: "A 279€ con 4 batterie, caricatore doppio E kit protezione è un regalo. In negozio lo stesso modello con solo 2 batterie costa 350€. Qui hai tutto incluso. Affare del secolo." },
  { batch: 10, av: "AB", name: "Beatrice X.", city: "Novara", stars: 5, text: "Finalmente posso occuparmi del giardino da sola senza aspettare mio marito. Leggerissimo, nessuna vibrazione fastidiosa, e la tracolla distribuisce il peso benissimo. Donna approva al 100%!" },
  { batch: 10, av: "AC", name: "Carlo W.", city: "Treviso", stars: 5, text: "Ho un terreno collinare con accesso difficile. L'asta separabile mi permette di portarlo ovunque nello zaino. Rimonto in 2 minuti e sono operativo. Pensato per chi lavora sul campo." },
  { batch: 10, av: "AD", name: "Diana V.", city: "Taranto", stars: 5, text: "Ordinato lunedì, arrivato mercoledì. Pagato alla consegna senza problemi. Qualità superiore a quello che mi aspettavo. Le 2 batterie extra in omaggio sono state la ciliegina sulla torta!" },
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
          <h2 className="text-[22px] md:text-4xl font-black uppercase tracking-tight">634 Clienti Soddisfatti</h2>
          <p className="text-gray-500 text-[15px] md:text-base mt-2">Recensioni verificate dei nostri clienti</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleReviews.map((rev, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-black text-lg">{rev.av.charAt(0)}</div>
                <div>
                  <p className="font-bold text-base">{rev.name}</p>
                  <p className="text-sm text-gray-400">{rev.city} • Acquisto verificato</p>
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
              Mostra altre recensioni
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// --- FORM ORDINE RAPIDO ---

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

const getFingerprint = (): string => {
  if (typeof window === 'undefined') return '';
  const w = window as unknown as Record<string, unknown>;
  if (typeof w.tmfp === 'string') return w.tmfp;
  if (typeof w.fingerprint === 'string') return w.fingerprint;
  return '';
};

const QuickOrderForm = () => {
  const [form, setForm] = useState({ fullName: "", address: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const updateForm = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = "Inserisci nome e cognome";
    if (!form.address.trim()) errs.address = "Inserisci indirizzo completo";
    const digits = form.phone.replace(/\D/g, "");
    if (!form.phone.trim()) errs.phone = "Inserisci numero di telefono";
    else if (digits.length < 7) errs.phone = "Numero non valido";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    const fingerprint = getFingerprint();
    const utmParams = getUtmParams();

    const formData = new URLSearchParams();

    // Campi obbligatori
    formData.append('uid', '0198088f-a4bc-7ed8-89aa-83089fe0180e');
    formData.append('key', 'ec15cab563da6cf51f0c7c');
    formData.append('offer', '768');
    formData.append('lp', '779');
    formData.append('name', form.fullName.trim());
    formData.append('tel', '+39' + form.phone.trim().replace(/\s/g, ''));
    formData.append('street-address', form.address.trim());

    if (fingerprint) {
      formData.append('tmfp', fingerprint);
    } else {
      formData.append('ua', navigator.userAgent);
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
      localStorage.setItem("decespugliatore-order", JSON.stringify({
        fullName: form.fullName.trim(),
        address: form.address.trim(),
        phone: form.phone.trim(),
      }));
    } catch {}

    try {
      const res = await fetch("https://offers.supertrendaffiliateprogram.com/forms/api/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("API Error:", res.status, text);
        alert("Si è verificato un errore. Riprova.");
        setSubmitting(false);
        return;
      }

      window.location.href = "/ty/decespugliatore-multi";
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "riprova";
      console.error("Network Error:", message);
      alert("Errore di rete: " + message);
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 py-16 px-4" id="form-ordine">
      <div className="max-w-lg mx-auto">
        <div className="text-center text-white mb-6">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2.5 rounded-full text-[13px] md:text-sm font-bold mb-4">
            <AlertTriangle className="animate-pulse" size={16} />
            LIQUIDAZIONE — SOLO 5 PEZZI DISPONIBILI
          </div>
          <h2 className="text-[28px] md:text-4xl font-black uppercase mb-3">
            Ordina Il Tuo TurboTrim PRO!
          </h2>
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-white/70 line-through text-xl md:text-2xl">461€</span>
            <span className="text-5xl md:text-6xl font-black">279€</span>
          </div>
          <p className="text-white/90 text-[15px] md:text-base">
            4 Batterie + Kit Protezione GRATIS • Spedizione GRATUITA • Consegna 24-48h
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-5 md:p-6 shadow-2xl space-y-4">
          {/* What's included recap */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-2">
            <p className="font-black text-green-800 text-sm mb-2 flex items-center gap-2"><Gift size={16} /> IL TUO ORDINE INCLUDE:</p>
            <ul className="text-[13px] text-green-700 space-y-1">
              <li className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-green-500 flex-shrink-0" /> TurboTrim PRO TurboTrim PRO Multifunzione completo</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-green-500 flex-shrink-0" /> 4x Batterie 20V/4Ah PowerShare</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-green-500 flex-shrink-0" /> Caricatore doppio rapido</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-green-500 flex-shrink-0" /> Kit protezione completo (cuffie + occhiali + guanti)</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-green-500 flex-shrink-0" /> Tracolla imbottita ergonomica</li>
            </ul>
          </div>

          <div>
            <label className="block text-[15px] md:text-base font-bold text-gray-700 mb-1.5">Nome e Cognome *</label>
            <input
              type="text"
              placeholder="Es. Mario Rossi"
              value={form.fullName}
              onChange={(e) => updateForm("fullName", e.target.value)}
              className={`w-full py-4 px-4 border-2 rounded-xl text-[16px] font-medium outline-none transition-colors ${errors.fullName ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-green-500"}`}
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-[15px] md:text-base font-bold text-gray-700 mb-1.5">Indirizzo Completo *</label>
            <input
              type="text"
              placeholder="Via Roma 1, 20100 Milano MI"
              value={form.address}
              onChange={(e) => updateForm("address", e.target.value)}
              className={`w-full py-4 px-4 border-2 rounded-xl text-[16px] font-medium outline-none transition-colors ${errors.address ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-green-500"}`}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          <div>
            <label className="block text-[15px] md:text-base font-bold text-gray-700 mb-1.5">Numero di Telefono *</label>
            <div className={`flex items-stretch border-2 rounded-xl overflow-hidden ${errors.phone ? "border-red-500 bg-red-50" : "border-gray-200 focus-within:border-green-500"}`}>
              <span className="py-4 px-3.5 text-[15px] font-bold text-gray-500 bg-gray-100 border-r-2 border-gray-200 flex items-center">+39</span>
              <input
                type="tel"
                placeholder="333 123 4567"
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
                CONFERMA ORDINE — 279€ ALLA CONSEGNA
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 text-[14px] md:text-[15px] text-gray-500 pt-2">
            <Lock size={16} className="text-green-600" />
            <span>Pagamento <strong className="text-green-600">SICURO</strong> in contanti alla consegna</span>
          </div>

          <div className="flex items-center justify-center gap-4 text-[13px] md:text-sm text-gray-400 pt-2">
            <span className="flex items-center gap-1"><Truck size={14} /> Spedizione Gratis</span>
            <span className="flex items-center gap-1"><RotateCcw size={14} /> Reso 30gg</span>
            <span className="flex items-center gap-1"><Shield size={14} /> Garanzia 5 anni</span>
          </div>
        </form>

        <p className="text-center text-white/70 text-[13px] md:text-sm mt-4">
          Un nostro operatore ti contatterà per confermare l&apos;ordine
        </p>
      </div>
    </section>
  );
};

// --- SEZIONE URGENZA ---
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
            ATTENZIONE — LEGGI PRIMA DI CONTINUARE
          </div>
        </div>

        <h2 className="text-[26px] md:text-5xl font-black text-center uppercase tracking-tight mb-8 leading-tight">
          Perché Questa Offerta <span className="text-green-500">Non Durerà</span>
        </h2>

        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-5 text-center border border-white/20">
            <div className="text-3xl md:text-5xl font-black text-green-500 mb-1">{soldToday}</div>
            <div className="text-[11px] md:text-sm font-bold text-gray-300 uppercase tracking-wide">Venduti Oggi</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-5 text-center border border-white/20">
            <div className="text-3xl md:text-5xl font-black text-red-500 mb-1">5</div>
            <div className="text-[11px] md:text-sm font-bold text-gray-300 uppercase tracking-wide">Pezzi Rimasti</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-5 text-center border border-white/20">
            <div className="text-3xl md:text-5xl font-black text-yellow-500 mb-1">40%</div>
            <div className="text-[11px] md:text-sm font-bold text-gray-300 uppercase tracking-wide">Sconto Attivo</div>
          </div>
        </div>

        <div className="space-y-4 mb-10">
          <div className="bg-red-900/50 border-2 border-red-500 rounded-xl p-4 md:p-5">
            <div className="flex items-start gap-3">
              <div className="bg-red-500 rounded-full p-2 flex-shrink-0">
                <AlertTriangle className="text-white" size={20} />
              </div>
              <div>
                <h4 className="font-black text-base md:text-lg mb-1">Liquidazione Magazzino in Corso</h4>
                <p className="text-gray-300 text-[14px] md:text-[15px] leading-relaxed">
                  Questo lotto con <strong className="text-white">4 batterie + kit protezione incluso</strong> è in liquidazione a <strong className="text-white">279€</strong>. Il prezzo di listino è <strong className="text-white">461€</strong> e tornerà al prezzo pieno con la prossima fornitura. Le 2 batterie extra in omaggio sono disponibili solo fino ad esaurimento scorte.
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
                <h4 className="font-black text-base md:text-lg mb-1">Omaggi Solo Per Questo Lotto</h4>
                <p className="text-gray-300 text-[14px] md:text-[15px] leading-relaxed">
                  Le <strong className="text-white">2 batterie extra</strong> (valore 79€) e il <strong className="text-white">kit protezione completo</strong> (valore 49€) sono inclusi SOLO con questo lotto di liquidazione. Nella prossima fornitura saranno venduti separatamente a prezzo pieno.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-5 md:p-6 mb-10 border border-gray-700">
          <h3 className="text-lg md:text-xl font-black text-center mb-6 uppercase">Se Ordini Oggi vs Se Aspetti</h3>
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-green-400 font-bold text-sm md:text-base">
                <CheckCircle2 size={20} />
                <span>ORDINI OGGI</span>
              </div>
              <ul className="space-y-2.5 text-[13px] md:text-sm">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> Paghi solo 279€</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> 4 batterie incluse</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> Kit protezione GRATIS</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> Spedizione GRATIS</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> Risparmi 182€</li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-red-400 font-bold text-sm md:text-base">
                <XCircle size={20} />
                <span>SE ASPETTI</span>
              </div>
              <ul className="space-y-2.5 text-[13px] md:text-sm text-gray-400">
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Pagherai 461€</li>
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Solo 2 batterie</li>
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Kit protezione a parte (49€)</li>
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Spedizione 14,90€</li>
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Nessun risparmio</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-400 text-[14px] md:text-base mb-5 leading-relaxed">
            Non c&apos;è nessun rischio: <strong className="text-white">paghi alla consegna</strong> e hai <strong className="text-white">30 giorni</strong> per il reso gratuito. <strong className="text-white">Garanzia 5 anni TurboTrim PRO.</strong>
          </p>
          <button
            onClick={() => document.getElementById('form-ordine')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full md:w-auto bg-gradient-to-r from-green-600 to-green-700 text-white px-8 md:px-10 py-5 rounded-xl font-black text-lg md:text-xl uppercase tracking-wide shadow-2xl hover:from-green-700 hover:to-green-800 transition-all inline-flex items-center justify-center gap-3"
          >
            <ShoppingBag size={24} />
            SÌ, VOGLIO IL TurboTrim PRO NITRO A 279€
          </button>
          <p className="text-gray-500 text-xs md:text-sm mt-3">
            Clicca il pulsante e compila il form — ci vogliono solo 30 secondi
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
      q: "Quante batterie sono incluse?",
      a: "4 batterie in totale: 2 batterie 20V/4Ah incluse di serie + 2 batterie 20V/4Ah EXTRA in omaggio. Per un'autonomia combinata fino a 60 minuti di lavoro continuo."
    },
    {
      q: "È adatto a un uso professionale?",
      a: "Il TurboTrim PRO TurboTrim PRO è classificato come professionale. Perfetto per giardini fino a 1000mq, terreni incolti, bordi, sterpaglie e rovi. Il motore brushless garantisce potenza costante e durata superiore."
    },
    {
      q: "Cosa include il kit protezione in omaggio?",
      a: "Cuffie antirumore professionali, occhiali protettivi CE in policarbonato (anti-appannamento e anti-graffio), guanti da lavoro rinforzati con grip in gomma. Valore commerciale 49€, incluso GRATIS."
    },
    {
      q: "Le batterie sono compatibili con altri attrezzi?",
      a: "Sì! Le batterie PowerShare 20V funzionano con TUTTI gli attrezzi TurboTrim PRO cordless: trapani, seghe, soffiatori, tosaerba e molto altro. Un investimento che vale per l'intero ecosistema."
    },
    {
      q: "Quanto pesa?",
      a: "Solo 5 kg con batteria montata. Grazie all'asta in alluminio e alla tracolla imbottita, è estremamente comodo da usare anche per sessioni prolungate."
    },
    {
      q: "Come pago?",
      a: "Paghi in contanti al corriere quando ricevi il pacco. Nessun pagamento anticipato, nessun rischio. Se non sei soddisfatto, hai 30 giorni per il reso gratuito."
    },
  ];

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-[22px] md:text-4xl font-black uppercase tracking-tight">Domande Frequenti</h2>
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
              <p className="font-black text-3xl text-green-600">279€</p>
              <p className="text-xs font-bold text-gray-400 line-through">461€</p>
            </div>
            <button
              onClick={() => document.getElementById('form-ordine')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex-[2] bg-gradient-to-r from-green-600 to-green-700 text-white font-black py-4 px-4 rounded-xl uppercase text-base shadow-lg active:scale-95 transition-transform"
            >
              ORDINA -40%
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
        <span className="text-green-500">TurboTrim PRO</span> NITRO
      </div>
      <div className="flex flex-wrap justify-center gap-6 text-xs font-bold uppercase text-gray-500 tracking-wide">
        <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy</a>
        <a href="/terms-of-service" className="hover:text-white transition-colors">Termini</a>
        <a href="/contact" className="hover:text-white transition-colors">Contatti</a>
      </div>
      <p className="text-xs text-gray-600">
        © 2026 TurboTrim PRO Italia. Le immagini sono a scopo illustrativo.
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
