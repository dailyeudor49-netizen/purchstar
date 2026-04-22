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
  Sun,
  Droplets,
  Wind,
  Ruler,
  Layers,
  Lock,
  Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * POP UP GAZEBO — 3x3m Doppio Tetto
 * Landing Page per Facebook Ads - Marketing Aggressivo
 */

// --- Countdown Timer ---
const CountdownTimer = () => {
  const [time, setTime] = useState({ hours: 2, minutes: 47, seconds: 33 });

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
          <span className="font-black text-sm md:text-base uppercase tracking-wide">PROMO INIZIO ESTATE - ULTIMI PEZZI!</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-300">Offerta scade tra:</span>
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
      <span className="text-red-700 font-black text-base">ATTENZIONE: Solo 7 pezzi rimasti!</span>
    </div>
  );
};

// --- Live Viewers ---
const LiveViewers = () => {
  const [viewers, setViewers] = useState(23);

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
          <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-red-500 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">
            {['M', 'G', 'L'][i]}
          </div>
        ))}
      </div>
      <span><strong className="text-black">{Math.max(15, viewers)}</strong> persone stanno guardando</span>
    </div>
  );
};

const Header = () => (
  <header className="sticky top-0 z-50 bg-white border-b-2 border-orange-500 shadow-md">
    <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
      <div className="font-black text-xl tracking-tight uppercase">
        <span className="text-orange-600">POP UP</span> <span className="text-gray-800">GAZEBO</span>
      </div>
      <button
        onClick={() => document.getElementById('ordina')?.scrollIntoView({ behavior: 'smooth' })}
        className="bg-orange-500 text-white px-5 py-2 rounded-lg font-black text-sm uppercase tracking-wide hover:bg-orange-600 transition-colors hidden md:flex items-center gap-2"
      >
        <ShoppingBag size={18} />
        Ordina -55%
      </button>
      <button className="md:hidden bg-orange-500 p-2 rounded-lg" onClick={() => document.getElementById('ordina')?.scrollIntoView({ behavior: 'smooth' })}>
        <ShoppingBag size={22} className="text-white" />
      </button>
    </div>
  </header>
);

const HERO_IMAGES = [
  "/images/gazebo/1.jpg",
  "/images/gazebo/2.jpg",
  "/images/gazebo/3.jpg",
  "/images/gazebo/4.jpg",
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
                  alt={`Pop Up Gazebo 3x3m ${i + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === idx ? "opacity-100" : "opacity-0"}`}
                />
              ))}
              {/* Frecce */}
              <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/95 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-10">
                <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-gray-800 fill-none" strokeWidth={2.5}><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/95 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-10">
                <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-gray-800 fill-none" strokeWidth={2.5}><path d="M9 6l6 6-6 6" /></svg>
              </button>
              {/* Badge sconto */}
              <div className="absolute top-3 left-3 bg-red-600 text-white px-4 py-2 rounded-lg font-black text-xl shadow-lg">
                -55%
              </div>
              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {HERO_IMAGES.map((_, i) => (
                  <button key={i} onClick={() => setIdx(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === idx ? "bg-white scale-125 shadow-lg" : "bg-white/60"}`} />
                ))}
              </div>
            </div>
            {/* Thumbnails */}
            <div className="flex gap-2 mt-3 justify-center">
              {HERO_IMAGES.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${i === idx ? "border-orange-500 scale-105 shadow-md" : "border-gray-200 opacity-70 hover:opacity-100"}`}
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
              <span className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-black uppercase">
                BESTSELLER 2024
              </span>
              <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-black uppercase">
                <Sun size={12} />
                PROMO ESTATE
              </span>
            </div>

            <h1 className="text-[28px] md:text-4xl font-black leading-tight uppercase tracking-tight text-gray-900">
              Pop Up Gazebo 3x3m<br />
              <span className="text-orange-600">Doppio Tetto + 4 Tende</span>
            </h1>

            <p className="text-[17px] md:text-lg text-gray-600 leading-relaxed">
              Struttura premium in acciaio verniciato, telo impermeabile anti-UV e tende laterali rimovibili incluse.
            </p>
          </div>

          {/* PREZZO GRANDE E IMPATTANTE */}
          <div className="bg-gradient-to-r from-orange-50 via-yellow-50 to-orange-50 p-5 rounded-2xl border-2 border-orange-300 shadow-lg">
            <div className="flex items-center justify-center gap-4 mb-2">
              <span className="text-gray-400 line-through text-2xl font-bold">219€</span>
              <div className="relative">
                <span className="text-6xl md:text-7xl font-black text-orange-600">99€</span>
              </div>
            </div>
            <div className="text-center mb-3">
              <span className="bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-black inline-block">
                RISPARMI 120€ — SOLO OGGI!
              </span>
            </div>
            <div className="flex items-center justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} size={22} fill="currentColor" className="text-yellow-500" />)}
              <span className="font-bold text-sm ml-2">4.9/5</span>
              <span className="text-gray-500 text-sm">(847 recensioni)</span>
            </div>
            <StockCounter />
          </div>

          {/* Live Viewers */}
          <LiveViewers />

          {/* Bullet Points */}
          <ul className="space-y-2.5">
            {[
              { icon: Ruler, text: "3x3 Metri — Spazio per 8-10 persone" },
              { icon: Layers, text: "Doppio Tetto Ventilato — Fresco anche a 40°C" },
              { icon: Droplets, text: "100% Impermeabile — Protezione totale" },
              { icon: Wind, text: "4 Tende Laterali Incluse" },
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                <div className="bg-orange-500 rounded-full p-2 flex-shrink-0">
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
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-5 rounded-xl font-black text-xl uppercase tracking-wide shadow-xl hover:from-orange-600 hover:to-red-600 transition-all flex items-center justify-center gap-3"
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
              <Truck className="mx-auto mb-1 text-orange-600" size={22} />
              <p className="text-[11px] font-bold text-gray-700">Spedizione<br />GRATIS</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-xl text-center">
              <RotateCcw className="mx-auto mb-1 text-orange-600" size={22} />
              <p className="text-[11px] font-bold text-gray-700">Reso<br />30 Giorni</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-xl text-center">
              <Shield className="mx-auto mb-1 text-orange-600" size={22} />
              <p className="text-[11px] font-bold text-gray-700">Garanzia<br />2 Anni</p>
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
            <span className="font-bold text-sm flex items-center gap-2"><Shield size={16} /> GARANZIA 2 ANNI</span>
            <span className="font-bold text-sm flex items-center gap-2"><RotateCcw size={16} /> RESO GRATUITO</span>
            <span className="font-bold text-sm flex items-center gap-2"><ThumbsUp size={16} /> +5.000 CLIENTI</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ProblemSolution = () => (
  <section className="bg-gray-50 py-16 px-4">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-[22px] md:text-4xl font-black uppercase tracking-tight leading-tight">
          Stanco di Rinunciare al Giardino d&apos;Estate?
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Problems */}
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="text-lg md:text-xl font-black text-red-600 mb-4 flex items-center gap-2">
            <XCircle size={24} /> SENZA POP UP GAZEBO
          </h3>
          <ul className="space-y-3">
            {[
              "Sole cocente che rende impossibile stare fuori",
              "Piogge improvvise rovinano feste e grigliate",
              "Zero privacy dai vicini",
              "Mobili rovinati dalle intemperie",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[15px] md:text-base">
                <XCircle className="text-red-400 flex-shrink-0 mt-0.5" size={18} />
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Solutions */}
        <div className="bg-white p-5 md:p-6 rounded-2xl border-2 border-orange-300 shadow-sm">
          <h3 className="text-lg md:text-xl font-black text-orange-600 mb-4 flex items-center gap-2">
            <CheckCircle2 size={24} /> CON POP UP GAZEBO
          </h3>
          <ul className="space-y-3">
            {[
              "Ombra fresca anche con 40°C",
              "Protezione totale da pioggia",
              "Privacy con tende laterali",
              "Goditi il giardino tutto l'anno",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[15px] md:text-base">
                <CheckCircle2 className="text-orange-500 flex-shrink-0 mt-0.5" size={18} />
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
      title: "Doppio Tetto Ventilato",
      desc: "Fino a 10°C più fresco rispetto ai gazebo tradizionali.",
      img: "/images/gazebo/1.jpg",
    },
    {
      title: "Telo Impermeabile",
      desc: "Poliestere 180g/m² con rivestimento PU. 100% waterproof.",
      img: "/images/gazebo/2.jpg",
    },
    {
      title: "Acciaio Premium",
      desc: "Verniciato a polvere anti-ruggine. Resiste a venti di 50 km/h.",
      img: "/images/gazebo/3.jpg",
    },
    {
      title: "4 Tende Incluse",
      desc: "Privacy e protezione dal vento. Montaggio in 30 secondi.",
      img: "/images/gazebo/4.jpg",
    },
    {
      title: "Montaggio Facile",
      desc: "2 persone, 30 minuti. Tutto incluso nella confezione.",
      img: "/images/gazebo/5.jpg",
    },
    {
      title: "Design Elegante",
      desc: "Colore beige che si adatta a qualsiasi giardino.",
      img: "/images/gazebo/6.jpg",
    },
  ];

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
            Perché Scegliere <span className="text-orange-600">Pop Up Gazebo</span>
          </h2>
        </div>

        {/* 1 colonna su mobile, 2 su tablet, 3 su desktop - immagine sopra, testo sotto */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
              {/* Immagine sopra - larga */}
              <div className="w-full aspect-[4/3] overflow-hidden">
                <img src={feat.img} alt={feat.title} className="w-full h-full object-cover" />
              </div>
              {/* Testo sotto */}
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
          Specifiche Tecniche
        </h2>
      </div>

      <div className="bg-gray-800 rounded-2xl p-5 md:p-6">
        <div className="grid grid-cols-2 gap-4 md:gap-5">
          {[
            { label: "Dimensioni", value: "3m x 3m x 2.65m" },
            { label: "Copertura", value: "9 m²" },
            { label: "Struttura", value: "Acciaio verniciato" },
            { label: "Telo", value: "Poliestere 180g/m²" },
            { label: "Impermeabilità", value: "100%" },
            { label: "Protezione UV", value: "UPF 50+" },
            { label: "Capacità", value: "8-10 persone" },
            { label: "Tende Laterali", value: "4 incluse" },
          ].map((spec, i) => (
            <div key={i} className="flex flex-col py-1">
              <span className="text-gray-400 text-xs md:text-sm uppercase">{spec.label}</span>
              <span className="font-bold text-white text-[15px] md:text-base">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const reviewData = [
  // Batch 1 - Visibili subito
  { batch: 1, av: "M", name: "Marco B.", city: "Roma", stars: 5, text: "Montato in 40 minuti con mia moglie. Qualità incredibile per il prezzo, pensavo di trovare materiali scadenti e invece la struttura è robustissima. Il doppio tetto è geniale!" },
  { batch: 1, av: "L", name: "Laura S.", city: "Milano", stars: 5, text: "Ha già resistito a due temporali fortissimi senza fare entrare una goccia. Le tende laterali sono comodissime quando i vicini sono in giardino. Super consigliato!" },
  { batch: 1, av: "G", name: "Giuseppe F.", city: "Napoli", stars: 5, text: "A 99€ è un regalo! L'avevo visto in negozio a quasi il doppio. Arrivato in 2 giorni, montaggio facile. Ora pranziamo sempre sotto al gazebo." },
  // Batch 2
  { batch: 2, av: "A", name: "Anna R.", city: "Firenze", stars: 5, text: "Abbiamo fatto il compleanno di mio figlio sotto il gazebo. 15 bambini al riparo dal sole! Struttura stabile, colore elegante che sta bene nel nostro giardino." },
  { batch: 2, av: "P", name: "Paolo D.", city: "Torino", stars: 5, text: "Cercavo un gazebo con le tende laterali incluse, altrove le vendono separatamente a 50€ in più. Qui era tutto compreso nel prezzo. Qualità premium!" },
  { batch: 2, av: "S", name: "Sara M.", city: "Bologna", stars: 5, text: "Il doppio tetto fa davvero la differenza. C'è sempre aria fresca anche alle 2 del pomeriggio. Montato in meno di un'ora, il risultato è spettacolare!" },
  // Batch 3
  { batch: 3, av: "R", name: "Roberto C.", city: "Verona", stars: 5, text: "Terzo gazebo che compro in 5 anni, gli altri due li ho buttati dopo una stagione. Questo sembra fatto per durare: acciaio spesso, telo resistente, cuciture perfette." },
  { batch: 3, av: "F", name: "Francesca L.", city: "Palermo", stars: 5, text: "Lo uso come zona relax per leggere e prendere il caffè. Con le tende abbassate è il mio angolo di paradiso. Ottimo rapporto qualità prezzo!" },
  { batch: 3, av: "D", name: "Davide P.", city: "Genova", stars: 5, text: "Scettico sul prezzo così basso, ho ordinato pronto a fare il reso. Invece mi sono ricreduto: qualità top, spedizione velocissima, montaggio semplice. 5 stelle meritate." },
  // Batch 4
  { batch: 4, av: "C", name: "Claudia T.", city: "Bari", stars: 5, text: "Finalmente posso fare colazione in giardino senza morire di caldo! Il gazebo è arrivato ben imballato, nessun pezzo danneggiato. Consigliatissimo." },
  { batch: 4, av: "E", name: "Enrico M.", city: "Padova", stars: 5, text: "Comprato per le grigliate domenicali. Ha già superato 3 temporali estivi senza problemi. I miei amici sono rimasti impressionati dalla qualità." },
  { batch: 4, av: "V", name: "Valentina G.", city: "Catania", stars: 5, text: "Qui in Sicilia il sole è fortissimo. Il doppio tetto mantiene fresco l'ambiente sotto. Le tende laterali perfette per la privacy. Acquisto azzeccatissimo!" },
  // Batch 5
  { batch: 5, av: "N", name: "Nicola F.", city: "Perugia", stars: 5, text: "Ho montato il gazebo da solo in circa 50 minuti seguendo le istruzioni. Struttura solida, telo di qualità. A questo prezzo non si trova di meglio." },
  { batch: 5, av: "I", name: "Isabella R.", city: "Trieste", stars: 4, text: "Ottimo prodotto, solo le istruzioni potevano essere più chiare. Ma alla fine tutto montato perfettamente. Il gazebo è bellissimo e funzionale." },
  { batch: 5, av: "T", name: "Tommaso B.", city: "Ancona", stars: 5, text: "Acquistato per il matrimonio di mia figlia in giardino. Elegante, spazioso, ha protetto gli ospiti dal sole cocente di luglio. Soldi spesi benissimo!" },
  // Batch 6
  { batch: 6, av: "B", name: "Barbara C.", city: "Brescia", stars: 5, text: "Lo uso tutti i giorni per lavorare al PC all'aperto. Con la connessione WiFi e il gazebo, ho il mio ufficio in giardino. Geniale!" },
  { batch: 6, av: "O", name: "Oscar L.", city: "Reggio Emilia", stars: 5, text: "Cercavo qualcosa di robusto che durasse. Dopo 6 mesi di utilizzo intenso posso dire che è un prodotto eccellente. Zero problemi." },
  { batch: 6, av: "H", name: "Helena V.", city: "Modena", stars: 5, text: "Pagamento alla consegna comodissimo, nessun rischio. Il corriere è stato puntualissimo. Il gazebo è esattamente come nelle foto, anzi meglio!" },
  // Batch 7
  { batch: 7, av: "U", name: "Umberto Z.", city: "Lecce", stars: 5, text: "Fantastico! Lo uso per cene all'aperto con gli amici. La qualità è davvero superiore, il tessuto sembra resistentissimo. Ottimo acquisto!" },
  { batch: 7, av: "K", name: "Katia N.", city: "Pescara", stars: 5, text: "Il mio vecchio gazebo si è rotto dopo un anno. Questo sembra molto più solido. Le tende laterali sono un plus incredibile a questo prezzo." },
  { batch: 7, av: "J", name: "Jacopo S.", city: "Bergamo", stars: 5, text: "Perfetto per il nostro giardino! Montaggio semplicissimo, in due ci abbiamo messo mezz'ora. Il colore beige è elegante e si abbina a tutto." },
  // Batch 8
  { batch: 8, av: "W", name: "Walter M.", city: "Messina", stars: 5, text: "Con il caldo siciliano era impossibile stare fuori. Ora con il doppio tetto si sta benissimo! Consegna veloce e prodotto conforme alla descrizione." },
  { batch: 8, av: "X", name: "Xenia P.", city: "Ravenna", stars: 5, text: "Ho confrontato tanti gazebo online, questo aveva il miglior rapporto qualità prezzo. Non sono rimasta delusa, anzi! Struttura robusta e bella." },
  { batch: 8, av: "Y", name: "Yuri C.", city: "Livorno", stars: 5, text: "Lo uso anche d'inverno per riparare i mobili da giardino. Impermeabile al 100%, l'ho testato con piogge fortissime. Niente infiltrazioni!" },
  // Batch 9
  { batch: 9, av: "Z", name: "Zoe A.", city: "Rimini", stars: 5, text: "Comprato per l'estate, è diventato il centro delle nostre serate in giardino. Gli amici chiedono sempre dove l'ho preso. Super soddisfatta!" },
  { batch: 9, av: "Q", name: "Quirino D.", city: "Pisa", stars: 4, text: "Buon prodotto nel complesso. L'unica cosa: avrei preferito colori diversi disponibili. Ma la qualità è ottima per il prezzo pagato." },
  { batch: 9, av: "AA", name: "Alessio V.", city: "Salerno", stars: 5, text: "Ero indeciso per il pagamento alla consegna ma è stato tutto perfetto. Il gazebo è arrivato integro e ben imballato. Lo consiglio!" },
  // Batch 10
  { batch: 10, av: "AB", name: "Beatrice F.", city: "Novara", stars: 5, text: "Finalmente un gazebo che non vola via al primo vento! La struttura è solida e le tende proteggono bene. Molto soddisfatta dell'acquisto." },
  { batch: 10, av: "AC", name: "Carlo E.", city: "Treviso", stars: 5, text: "L'ho montato per il battesimo di mio nipote. Tutti gli invitati hanno apprezzato. Bello esteticamente e molto funzionale." },
  { batch: 10, av: "AD", name: "Diana L.", city: "Taranto", stars: 5, text: "Dopo tante ricerche ho scelto questo e non me ne pento. Il prezzo è imbattibile per la qualità offerta. Spedizione rapidissima!" },
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
          <h2 className="text-[22px] md:text-4xl font-black uppercase tracking-tight">847 Clienti Soddisfatti</h2>
          <p className="text-gray-500 text-[15px] md:text-base mt-2">Recensioni verificate dei nostri clienti</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleReviews.map((rev, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-black text-lg">{rev.av.charAt(0)}</div>
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
              className="bg-white border-2 border-orange-500 text-orange-600 px-8 py-4 rounded-xl font-black text-base uppercase tracking-wide hover:bg-orange-500 hover:text-white transition-all shadow-sm"
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

// Helper per ottenere parametri UTM dalla URL
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

// Helper per ottenere fingerprint (se disponibile tramite window.tmfp o simili)
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

    // Prepara i dati per l'API
    const fingerprint = getFingerprint();
    const utmParams = getUtmParams();

    // Costruisci il body come form-urlencoded
    const formData = new URLSearchParams();

    // Campi obbligatori
    formData.append('uid', '0198088f-a4bc-7ed8-89aa-83089fe0180e');
    formData.append('key', 'ec15cab563da6cf51f0c7c');
    formData.append('offer', '768');
    formData.append('lp', '779');
    formData.append('name', form.fullName.trim());
    formData.append('tel', '+39' + form.phone.trim().replace(/\s/g, ''));
    formData.append('street-address', form.address.trim());

    // Fingerprint o fallback a IP/UA
    if (fingerprint) {
      formData.append('tmfp', fingerprint);
    } else {
      // Se non c'è fingerprint, l'API richiede ip e ua
      // Questi verranno gestiti lato server o ignorati se non disponibili
      formData.append('ua', navigator.userAgent);
      // IP non è accessibile da client-side, l'API dovrà gestirlo
    }

    // Campi opzionali UTM
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

    // Salva dati per thank you page
    try {
      localStorage.setItem("gazebo-order", JSON.stringify({
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

      // Successo - redirect alla thank you page
      window.location.href = "/ty/gazebo-giardino";
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "riprova";
      console.error("Network Error:", message);
      alert("Errore di rete: " + message);
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 py-16 px-4" id="form-ordine">
      <div className="max-w-lg mx-auto">
        <div className="text-center text-white mb-6">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2.5 rounded-full text-[13px] md:text-sm font-bold mb-4">
            <AlertTriangle className="animate-pulse" size={16} />
            OFFERTA LIMITATA - SOLO 7 PEZZI
          </div>
          <h2 className="text-[28px] md:text-4xl font-black uppercase mb-3">
            Ordina Ora!
          </h2>
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-white/70 line-through text-xl md:text-2xl">219€</span>
            <span className="text-5xl md:text-6xl font-black">99€</span>
          </div>
          <p className="text-white/90 text-[15px] md:text-base">
            Spedizione GRATUITA • Consegna 24-48h
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-5 md:p-6 shadow-2xl space-y-4">
          <div>
            <label className="block text-[15px] md:text-base font-bold text-gray-700 mb-1.5">Nome e Cognome *</label>
            <input
              type="text"
              placeholder="Es. Mario Rossi"
              value={form.fullName}
              onChange={(e) => updateForm("fullName", e.target.value)}
              className={`w-full py-4 px-4 border-2 rounded-xl text-[16px] font-medium outline-none transition-colors ${errors.fullName ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-orange-500"}`}
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
              className={`w-full py-4 px-4 border-2 rounded-xl text-[16px] font-medium outline-none transition-colors ${errors.address ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-orange-500"}`}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          <div>
            <label className="block text-[15px] md:text-base font-bold text-gray-700 mb-1.5">Numero di Telefono *</label>
            <div className={`flex items-stretch border-2 rounded-xl overflow-hidden ${errors.phone ? "border-red-500 bg-red-50" : "border-gray-200 focus-within:border-orange-500"}`}>
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
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-5 rounded-xl font-black text-[17px] md:text-lg uppercase tracking-wide shadow-lg hover:from-orange-600 hover:to-red-600 transition-all disabled:opacity-60 disabled:cursor-wait flex items-center justify-center gap-2"
          >
            {submitting ? (
              <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <ShoppingBag size={22} />
                CONFERMA ORDINE — 99€ ALLA CONSEGNA
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
            <span className="flex items-center gap-1"><Shield size={14} /> Garanzia 2 anni</span>
          </div>
        </form>

        <p className="text-center text-white/70 text-[13px] md:text-sm mt-4">
          Un nostro operatore ti contatterà per confermare l&apos;ordine
        </p>
      </div>
    </section>
  );
};

// --- SEZIONE MARKETING AGGRESSIVO ---
const UrgencySection = () => {
  const [soldToday, setSoldToday] = useState(47);

  useEffect(() => {
    const interval = setInterval(() => {
      setSoldToday(prev => prev + (Math.random() > 0.7 ? 1 : 0));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-black text-white py-16 px-4 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }}></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Alert badge */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-600 text-white px-4 md:px-5 py-2.5 rounded-full font-black text-[13px] md:text-sm uppercase tracking-wide flex items-center gap-2 animate-pulse">
            <AlertTriangle size={18} />
            ATTENZIONE — LEGGI PRIMA DI CONTINUARE
          </div>
        </div>

        <h2 className="text-[26px] md:text-5xl font-black text-center uppercase tracking-tight mb-8 leading-tight">
          Perché Devi <span className="text-orange-500">Agire ORA</span>
        </h2>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-5 text-center border border-white/20">
            <div className="text-3xl md:text-5xl font-black text-orange-500 mb-1">{soldToday}</div>
            <div className="text-[11px] md:text-sm font-bold text-gray-300 uppercase tracking-wide">Venduti Oggi</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-5 text-center border border-white/20">
            <div className="text-3xl md:text-5xl font-black text-red-500 mb-1">7</div>
            <div className="text-[11px] md:text-sm font-bold text-gray-300 uppercase tracking-wide">Pezzi Rimasti</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-5 text-center border border-white/20">
            <div className="text-3xl md:text-5xl font-black text-yellow-500 mb-1">55%</div>
            <div className="text-[11px] md:text-sm font-bold text-gray-300 uppercase tracking-wide">Sconto Attivo</div>
          </div>
        </div>

        {/* Warning boxes */}
        <div className="space-y-4 mb-10">
          <div className="bg-red-900/50 border-2 border-red-500 rounded-xl p-4 md:p-5">
            <div className="flex items-start gap-3">
              <div className="bg-red-500 rounded-full p-2 flex-shrink-0">
                <AlertTriangle className="text-white" size={20} />
              </div>
              <div>
                <h4 className="font-black text-base md:text-lg mb-1">Scorte in Esaurimento</h4>
                <p className="text-gray-300 text-[14px] md:text-[15px] leading-relaxed">
                  Questo lotto a <strong className="text-white">99€</strong> è quasi terminato. Il prossimo ordine dal fornitore avrà un costo maggiore e il prezzo tornerà a <strong className="text-white">219€</strong>. Non possiamo garantire questo prezzo domani.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-orange-900/50 border-2 border-orange-500 rounded-xl p-4 md:p-5">
            <div className="flex items-start gap-3">
              <div className="bg-orange-500 rounded-full p-2 flex-shrink-0">
                <Truck className="text-white" size={20} />
              </div>
              <div>
                <h4 className="font-black text-base md:text-lg mb-1">Spedizione Gratis Solo Oggi</h4>
                <p className="text-gray-300 text-[14px] md:text-[15px] leading-relaxed">
                  Normalmente la spedizione costa <strong className="text-white">14,90€</strong> per un pacco così grande. Oggi la offriamo <strong className="text-white">GRATIS</strong> per incentivare le vendite del magazzino. Questa promozione potrebbe terminare a mezzanotte.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-5 md:p-6 mb-10 border border-gray-700">
          <h3 className="text-lg md:text-xl font-black text-center mb-6 uppercase">Se Ordini Oggi vs Se Aspetti</h3>
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-green-400 font-bold text-sm md:text-base">
                <CheckCircle2 size={20} />
                <span>ORDINI OGGI</span>
              </div>
              <ul className="space-y-2.5 text-[13px] md:text-sm">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> Paghi solo 99€</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> Spedizione GRATIS</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> Consegna 24-48h</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> Pronto per l&apos;estate</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> Risparmi 120€</li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-red-400 font-bold text-sm md:text-base">
                <XCircle size={20} />
                <span>SE ASPETTI</span>
              </div>
              <ul className="space-y-2.5 text-[13px] md:text-sm text-gray-400">
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Pagherai 219€</li>
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Spedizione 14,90€</li>
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Attesa 2-3 settimane</li>
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Perdi mezza estate</li>
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Nessun risparmio</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Final push */}
        <div className="text-center">
          <p className="text-gray-400 text-[14px] md:text-base mb-5 leading-relaxed">
            Non c&apos;è nessun rischio: <strong className="text-white">paghi alla consegna</strong> e hai <strong className="text-white">30 giorni</strong> per il reso gratuito.
          </p>
          <button
            onClick={() => document.getElementById('form-ordine')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full md:w-auto bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 md:px-10 py-5 rounded-xl font-black text-lg md:text-xl uppercase tracking-wide shadow-2xl hover:from-orange-600 hover:to-red-600 transition-all inline-flex items-center justify-center gap-3"
          >
            <ShoppingBag size={24} />
            SÌ, VOGLIO IL MIO GAZEBO A 99€
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
      q: "Quanto tempo ci vuole per montarlo?",
      a: "30-45 minuti con 2 persone. Istruzioni chiare e attrezzi inclusi."
    },
    {
      q: "Resiste alla pioggia?",
      a: "Sì, il telo è impermeabile al 100% con rivestimento PU."
    },
    {
      q: "Le tende sono incluse?",
      a: "Sì! Tutte e 4 le tende laterali sono incluse nel prezzo di 99€."
    },
    {
      q: "Come pago?",
      a: "Paghi in contanti al corriere quando ricevi il pacco. Nessun pagamento anticipato."
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
                <span className={`text-2xl text-orange-500 transition-transform flex-shrink-0 ${open === i ? 'rotate-45' : ''}`}>+</span>
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
          <div className="bg-white border-t-2 border-orange-500 p-4 shadow-2xl flex items-center gap-4">
            <div className="flex-1">
              <p className="font-black text-3xl text-orange-600">99€</p>
              <p className="text-xs font-bold text-gray-400 line-through">219€</p>
            </div>
            <button
              onClick={() => document.getElementById('form-ordine')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex-[2] bg-gradient-to-r from-orange-500 to-red-500 text-white font-black py-4 px-4 rounded-xl uppercase text-base shadow-lg active:scale-95 transition-transform"
            >
              ORDINA ORA
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
        <span className="text-orange-500">POP UP</span> GAZEBO
      </div>
      <div className="flex flex-wrap justify-center gap-6 text-xs font-bold uppercase text-gray-500 tracking-wide">
        <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy</a>
        <a href="/terms-of-service" className="hover:text-white transition-colors">Termini</a>
        <a href="/contact" className="hover:text-white transition-colors">Contatti</a>
      </div>
      <p className="text-xs text-gray-600">
        © 2024 Pop Up Gazebo Italia. Le immagini sono a scopo illustrativo.
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
