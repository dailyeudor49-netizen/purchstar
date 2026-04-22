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
 * POP UP GAZEBO — 3x3m Dvojitá Střecha
 * Landing Page pro Facebook Ads - Agresivní Marketing - ČESKÁ REPUBLIKA
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
          <span className="font-black text-sm md:text-base uppercase tracking-wide">LETNÍ AKCE - POSLEDNÍ KUSY!</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-300">Nabídka končí za:</span>
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
      <span className="text-red-700 font-black text-base">POZOR: Pouze 7 kusů skladem!</span>
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
            {['M', 'J', 'P'][i]}
          </div>
        ))}
      </div>
      <span><strong className="text-black">{Math.max(15, viewers)}</strong> lidí si právě prohlíží tento produkt</span>
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
        onClick={() => document.getElementById('objednat')?.scrollIntoView({ behavior: 'smooth' })}
        className="bg-orange-500 text-white px-5 py-2 rounded-lg font-black text-sm uppercase tracking-wide hover:bg-orange-600 transition-colors hidden md:flex items-center gap-2"
      >
        <ShoppingBag size={18} />
        Objednat -55%
      </button>
      <button className="md:hidden bg-orange-500 p-2 rounded-lg" onClick={() => document.getElementById('objednat')?.scrollIntoView({ behavior: 'smooth' })}>
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
              {/* Arrows */}
              <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/95 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-10">
                <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-gray-800 fill-none" strokeWidth={2.5}><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/95 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-10">
                <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-gray-800 fill-none" strokeWidth={2.5}><path d="M9 6l6 6-6 6" /></svg>
              </button>
              {/* Discount badge */}
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
                LETNÍ AKCE
              </span>
            </div>

            <h1 className="text-[28px] md:text-4xl font-black leading-tight uppercase tracking-tight text-gray-900">
              Pop Up Gazebo 3x3m<br />
              <span className="text-orange-600">Dvojitá Střecha + 4 Boční Stěny</span>
            </h1>

            <p className="text-[17px] md:text-lg text-gray-600 leading-relaxed">
              Prémiová ocelová konstrukce, voděodolná plachta s UV ochranou a odnímatelné boční stěny v ceně.
            </p>
          </div>

          {/* BIG PRICE */}
          <div className="bg-gradient-to-r from-orange-50 via-yellow-50 to-orange-50 p-5 rounded-2xl border-2 border-orange-300 shadow-lg">
            <div className="flex items-center justify-center gap-4 mb-2">
              <span className="text-gray-400 line-through text-2xl font-bold">5 449 Kč</span>
              <div className="relative">
                <span className="text-5xl md:text-6xl font-black text-orange-600">2 449 Kč</span>
              </div>
            </div>
            <div className="text-center mb-3">
              <span className="bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-black inline-block">
                UŠETŘÍTE 3 000 Kč — POUZE DNES!
              </span>
            </div>
            <div className="flex items-center justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} size={22} fill="currentColor" className="text-yellow-500" />)}
              <span className="font-bold text-sm ml-2">4.9/5</span>
              <span className="text-gray-500 text-sm">(847 hodnocení)</span>
            </div>
            <StockCounter />
          </div>

          {/* Live Viewers */}
          <LiveViewers />

          {/* Bullet Points */}
          <ul className="space-y-2.5">
            {[
              { icon: Ruler, text: "3x3 Metry — Prostor pro 8-10 osob" },
              { icon: Layers, text: "Dvojitá Větraná Střecha — Chladno i při 40°C" },
              { icon: Droplets, text: "100% Voděodolné — Úplná ochrana" },
              { icon: Wind, text: "4 Boční Stěny V Ceně" },
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
          <div id="objednat">
            <button
              onClick={() => document.getElementById('form-objednat')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-5 rounded-xl font-black text-xl uppercase tracking-wide shadow-xl hover:from-orange-600 hover:to-red-600 transition-all flex items-center justify-center gap-3"
            >
              <ShoppingBag size={24} />
              OBJEDNAT — PLATBA PŘI DORUČENÍ
            </button>
            <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-500">
              <Lock size={14} />
              <span>Bezpečná platba v hotovosti při doručení</span>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-gray-100 p-3 rounded-xl text-center">
              <Truck className="mx-auto mb-1 text-orange-600" size={22} />
              <p className="text-[11px] font-bold text-gray-700">Doprava<br />ZDARMA</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-xl text-center">
              <RotateCcw className="mx-auto mb-1 text-orange-600" size={22} />
              <p className="text-[11px] font-bold text-gray-700">Vrácení<br />30 Dní</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-xl text-center">
              <Shield className="mx-auto mb-1 text-orange-600" size={22} />
              <p className="text-[11px] font-bold text-gray-700">Záruka<br />2 Roky</p>
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
            <span className="font-bold text-sm flex items-center gap-2"><Truck size={16} /> EXPRESNÍ DORUČENÍ 24-48H</span>
            <span className="font-bold text-sm flex items-center gap-2"><Shield size={16} /> 2 ROKY ZÁRUKY</span>
            <span className="font-bold text-sm flex items-center gap-2"><RotateCcw size={16} /> VRÁCENÍ ZDARMA</span>
            <span className="font-bold text-sm flex items-center gap-2"><ThumbsUp size={16} /> +5.000 ZÁKAZNÍKŮ</span>
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
          Už Vás Nebaví Být V Létě Zavření Doma?
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Problems */}
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="text-lg md:text-xl font-black text-red-600 mb-4 flex items-center gap-2">
            <XCircle size={24} /> BEZ POP UP GAZEBA
          </h3>
          <ul className="space-y-3">
            {[
              "Palčivé slunce, které znemožňuje pobyt venku",
              "Náhlé bouřky kazí oslavy a grilování",
              "Žádné soukromí před sousedy",
              "Zahradní nábytek zničený počasím",
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
            <CheckCircle2 size={24} /> S POP UP GAZEBEM
          </h3>
          <ul className="space-y-3">
            {[
              "Příjemný stín i při 40°C",
              "Úplná ochrana před deštěm",
              "Soukromí díky bočním stěnám",
              "Užívejte si zahradu celý rok",
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
      title: "Dvojitá Větraná Střecha",
      desc: "Až o 10°C chladnější než běžné altány.",
      img: "/images/gazebo/1.jpg",
    },
    {
      title: "Voděodolná Plachta",
      desc: "Polyester 180g/m² s PU povlakem. 100% voděodolné.",
      img: "/images/gazebo/2.jpg",
    },
    {
      title: "Prémiová Ocel",
      desc: "Práškově lakovaná proti rzi. Odolá větru do 50 km/h.",
      img: "/images/gazebo/3.jpg",
    },
    {
      title: "4 Stěny V Ceně",
      desc: "Soukromí a ochrana před větrem. Montáž za 30 sekund.",
      img: "/images/gazebo/4.jpg",
    },
    {
      title: "Snadná Montáž",
      desc: "2 osoby, 30 minut. Vše součástí balení.",
      img: "/images/gazebo/5.jpg",
    },
    {
      title: "Elegantní Design",
      desc: "Béžová barva, která ladí s každou zahradou.",
      img: "/images/gazebo/6.jpg",
    },
  ];

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
            Proč Si Vybrat <span className="text-orange-600">Pop Up Gazebo</span>
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
          Technické Specifikace
        </h2>
      </div>

      <div className="bg-gray-800 rounded-2xl p-5 md:p-6">
        <div className="grid grid-cols-2 gap-4 md:gap-5">
          {[
            { label: "Rozměry", value: "3m x 3m x 2.65m" },
            { label: "Plocha", value: "9 m²" },
            { label: "Konstrukce", value: "Lakovaná ocel" },
            { label: "Plachta", value: "Polyester 180g/m²" },
            { label: "Voděodolnost", value: "100%" },
            { label: "UV Ochrana", value: "UPF 50+" },
            { label: "Kapacita", value: "8-10 osob" },
            { label: "Boční Stěny", value: "4 v ceně" },
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
  // Batch 1
  { batch: 1, av: "M", name: "Martin B.", city: "Praha", stars: 5, text: "Postavil jsem ho za 40 minut s manželkou. Neuvěřitelná kvalita za tuto cenu, myslel jsem, že dostanu levné materiály, ale konstrukce je opravdu pevná. Dvojitá střecha je geniální!" },
  { batch: 1, av: "J", name: "Jana S.", city: "Brno", stars: 5, text: "Už přežil dvě silné bouřky bez jediné kapky vody. Boční stěny jsou super praktické, když jsou sousedi na zahradě. Velmi doporučuji!" },
  { batch: 1, av: "P", name: "Petr F.", city: "Ostrava", stars: 5, text: "Za 2 449 Kč je to dárek! Viděl jsem ho v obchodě téměř za dvojnásobek. Dorazil za 2 dny, montáž snadná. Teď vždy obědváme pod altánem." },
  // Batch 2
  { batch: 2, av: "L", name: "Lucie R.", city: "Plzeň", stars: 5, text: "Měli jsme synovy narozeniny pod altánem. 15 dětí v bezpečí před sluncem! Stabilní konstrukce, elegantní barva, která ladí s naší zahradou." },
  { batch: 2, av: "T", name: "Tomáš D.", city: "Liberec", stars: 5, text: "Hledal jsem altán s bočními stěnami v ceně, jinde je prodávají zvlášť za 1 200 Kč navíc. Tady bylo vše součástí ceny. Prémiová kvalita!" },
  { batch: 2, av: "K", name: "Kateřina M.", city: "Olomouc", stars: 5, text: "Dvojitá střecha opravdu dělá rozdíl. Vždy je tam čerstvý vzduch i ve 14 hodin odpoledne. Postaveno za méně než hodinu, výsledek je spektakulární!" },
  // Batch 3
  { batch: 3, av: "R", name: "Robert C.", city: "České Budějovice", stars: 5, text: "Třetí altán, který kupuji za 5 let, první dva jsem vyhodil po jedné sezóně. Tento vypadá, že vydrží: silná ocel, odolná plachta, perfektní švy." },
  { batch: 3, av: "E", name: "Eva L.", city: "Hradec Králové", stars: 5, text: "Používám ho jako koutek na čtení a ranní kávu. Se spuštěnými stěnami je to můj malý ráj. Výborný poměr ceny a kvality!" },
  { batch: 3, av: "D", name: "David P.", city: "Pardubice", stars: 5, text: "Pochyboval jsem kvůli nízké ceně, objednal jsem připraven na vrácení. Ale zmýlil jsem se: top kvalita, rychlá doprava, snadná montáž. 5 hvězdiček zasloužených." },
  // Batch 4
  { batch: 4, av: "V", name: "Věra T.", city: "Zlín", stars: 5, text: "Konečně můžu snídat na zahradě, aniž bych umírala vedrem! Altán dorazil dobře zabalený, žádný kus poškozený. Velmi doporučuji." },
  { batch: 4, av: "O", name: "Ondřej M.", city: "Havířov", stars: 5, text: "Koupil jsem ho na nedělní grilování. Už přežil 3 letní bouřky bez problémů. Moji přátelé byli nadšení z kvality." },
  { batch: 4, av: "A", name: "Alena G.", city: "Kladno", stars: 5, text: "U nás je v létě slunce velmi silné. Dvojitá střecha udržuje prostor chladný. Boční stěny perfektní pro soukromí. Výborná koupě!" },
  // Batch 5
  { batch: 5, av: "F", name: "František F.", city: "Most", stars: 5, text: "Postavil jsem altán sám za přibližně 50 minut podle návodu. Stabilní konstrukce, kvalitní plachta. Za tuto cenu není lepší." },
  { batch: 5, av: "I", name: "Ivana R.", city: "Opava", stars: 4, text: "Výborný výrobek, jen návod mohl být jasnější. Ale nakonec vše postaveno perfektně. Altán je krásný a funkční." },
  { batch: 5, av: "H", name: "Honza B.", city: "Frýdek-Místek", stars: 5, text: "Koupil jsem ho na dcerčinu svatbu na zahradě. Elegantní, prostorný, ochránil hosty před červencovým sluncem. Peníze velmi dobře utracené!" },
  // Batch 6
  { batch: 6, av: "B", name: "Barbora C.", city: "Karviná", stars: 5, text: "Používám ho každý den na práci u počítače venku. S WiFi a altánem mám svou kancelář na zahradě. Geniální!" },
  { batch: 6, av: "G", name: "Gustav L.", city: "Jihlava", stars: 5, text: "Hledal jsem něco pevného, co vydrží. Po 6 měsících intenzivního používání mohu říct, že je to výborný výrobek. Žádné problémy." },
  { batch: 6, av: "N", name: "Nikola V.", city: "Teplice", stars: 5, text: "Platba při doručení velmi pohodlná, žádné riziko. Kurýr byl přesný. Altán je přesně jako na obrázcích, vlastně ještě lepší!" },
  // Batch 7
  { batch: 7, av: "U", name: "Urban Z.", city: "Děčín", stars: 5, text: "Fantastické! Používám ho na večeře venku s přáteli. Kvalita je opravdu špičková, plachta vypadá velmi odolně. Výborná koupě!" },
  { batch: 7, av: "Z", name: "Zuzana N.", city: "Chomutov", stars: 5, text: "Můj starý altán se zlomil po jednom roce. Tento vypadá mnohem pevnější. Boční stěny jsou neuvěřitelný plus za tuto cenu." },
  { batch: 7, av: "C", name: "Cyril S.", city: "Přerov", stars: 5, text: "Perfektní pro naši zahradu! Montáž velmi snadná, ve dvou jsme potřebovali půl hodiny. Béžová barva je elegantní a ladí se vším." },
  // Batch 8
  { batch: 8, av: "W", name: "Václav M.", city: "Mladá Boleslav", stars: 5, text: "U nás je v létě velmi horko. Dvojitá střecha udržuje prostor chladný! Rychlá doprava a výrobek odpovídá popisu." },
  { batch: 8, av: "X", name: "Kristýna P.", city: "Třebíč", stars: 5, text: "Porovnávala jsem mnoho altánů online, tento měl nejlepší poměr kvality a ceny. Nebyla jsem zklamaná, naopak! Pevná a krásná konstrukce." },
  { batch: 8, av: "Y", name: "Jakub C.", city: "Znojmo", stars: 5, text: "Používám ho i v zimě na ochranu zahradního nábytku. 100% voděodolné, testoval jsem ho se silným deštěm. Žádné průsaky!" },
  // Batch 9
  { batch: 9, av: "S", name: "Simona A.", city: "Příbram", stars: 5, text: "Koupila jsem ho na léto, stal se centrem našich večerů na zahradě. Přátelé se vždy ptají, kde jsem ho sehnala. Super spokojená!" },
  { batch: 9, av: "Q", name: "Kamil D.", city: "Cheb", stars: 4, text: "Dobrý výrobek celkově. Jen bych si přál, aby byly k dispozici různé barvy. Ale kvalita je výborná za zaplacenou cenu." },
  { batch: 9, av: "AA", name: "Adam V.", city: "Trutnov", stars: 5, text: "Váhal jsem s platbou při doručení, ale vše bylo perfektní. Altán dorazil celý a dobře zabalený. Doporučuji!" },
  // Batch 10
  { batch: 10, av: "AB", name: "Blanka F.", city: "Písek", stars: 5, text: "Konečně altán, který neodletí při prvním větru! Konstrukce je pevná a stěny dobře chrání. Velmi spokojená s nákupem." },
  { batch: 10, av: "AC", name: "Čeněk E.", city: "Kroměříž", stars: 5, text: "Postavil jsem ho na křtiny synovce. Všichni hosté byli nadšení. Esteticky krásný a velmi funkční." },
  { batch: 10, av: "AD", name: "Dagmar L.", city: "Kolín", stars: 5, text: "Po dlouhém hledání jsem si vybrala tento a nelituji. Cena je nepřekonatelná za nabízenou kvalitu. Rychlá doprava!" },
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
          <h2 className="text-[22px] md:text-4xl font-black uppercase tracking-tight">847 Spokojených Zákazníků</h2>
          <p className="text-gray-500 text-[15px] md:text-base mt-2">Ověřená hodnocení od našich zákazníků</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleReviews.map((rev, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-black text-lg">{rev.av.charAt(0)}</div>
                <div>
                  <p className="font-bold text-base">{rev.name}</p>
                  <p className="text-sm text-gray-400">{rev.city} • Ověřený nákup</p>
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
              Zobrazit více hodnocení
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// --- ORDER FORM ---

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
  const [form, setForm] = useState({ fullName: "", address: "", phone: "", postalCode: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const updateForm = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = "Zadejte jméno a příjmení";
    if (!form.address.trim()) errs.address = "Zadejte úplnou adresu";
    const digits = form.phone.replace(/\D/g, "");
    if (!form.phone.trim()) errs.phone = "Zadejte telefonní číslo";
    else if (digits.length < 7) errs.phone = "Neplatné číslo";
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

    // Required fields - Czech offer
    formData.append('uid', '0198088f-a4bc-7ed8-89aa-83089fe0180e');
    formData.append('key', 'ec15cab563da6cf51f0c7c');
    formData.append('offer', '766');
    formData.append('lp', '777');
    formData.append('name', form.fullName.trim());
    formData.append('tel', '+420' + form.phone.trim().replace(/\s/g, ''));
    formData.append('street-address', form.address.trim());

    if (fingerprint) {
      formData.append('tmfp', fingerprint);
    } else {
      formData.append('ua', navigator.userAgent);
    }

    // Optional postal code
    if (form.postalCode.trim()) {
      formData.append('postal-code', form.postalCode.trim());
    }

    // UTM params
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
      localStorage.setItem("gazebo-cz-order", JSON.stringify({
        fullName: form.fullName.trim(),
        address: form.address.trim(),
        phone: form.phone.trim(),
        postalCode: form.postalCode.trim(),
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
        alert("Došlo k chybě. Zkuste to znovu.");
        setSubmitting(false);
        return;
      }

      window.location.href = "/ty/gazebo-cz";
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "zkuste to znovu";
      console.error("Network Error:", message);
      alert("Chyba sítě: " + message);
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 py-16 px-4" id="form-objednat">
      <div className="max-w-lg mx-auto">
        <div className="text-center text-white mb-6">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2.5 rounded-full text-[13px] md:text-sm font-bold mb-4">
            <AlertTriangle className="animate-pulse" size={16} />
            OMEZENÁ NABÍDKA - POUZE 7 KUSŮ
          </div>
          <h2 className="text-[28px] md:text-4xl font-black uppercase mb-3">
            Objednejte Nyní!
          </h2>
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-white/70 line-through text-lg md:text-xl">5 449 Kč</span>
            <span className="text-4xl md:text-5xl font-black">2 449 Kč</span>
          </div>
          <p className="text-white/90 text-[15px] md:text-base">
            Doprava ZDARMA • Doručení 24-48h
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-5 md:p-6 shadow-2xl space-y-4">
          <div>
            <label className="block text-[15px] md:text-base font-bold text-gray-700 mb-1.5">Jméno a Příjmení *</label>
            <input
              type="text"
              placeholder="Např. Jan Novák"
              value={form.fullName}
              onChange={(e) => updateForm("fullName", e.target.value)}
              className={`w-full py-4 px-4 border-2 rounded-xl text-[16px] font-medium outline-none transition-colors ${errors.fullName ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-orange-500"}`}
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-[15px] md:text-base font-bold text-gray-700 mb-1.5">Úplná Adresa *</label>
            <input
              type="text"
              placeholder="Ulice 123, 110 00 Praha"
              value={form.address}
              onChange={(e) => updateForm("address", e.target.value)}
              className={`w-full py-4 px-4 border-2 rounded-xl text-[16px] font-medium outline-none transition-colors ${errors.address ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-orange-500"}`}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          <div>
            <label className="block text-[15px] md:text-base font-bold text-gray-700 mb-1.5">PSČ (volitelné)</label>
            <input
              type="text"
              placeholder="110 00"
              value={form.postalCode}
              onChange={(e) => updateForm("postalCode", e.target.value)}
              className="w-full py-4 px-4 border-2 rounded-xl text-[16px] font-medium outline-none transition-colors border-gray-200 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-[15px] md:text-base font-bold text-gray-700 mb-1.5">Telefonní Číslo *</label>
            <div className={`flex items-stretch border-2 rounded-xl overflow-hidden ${errors.phone ? "border-red-500 bg-red-50" : "border-gray-200 focus-within:border-orange-500"}`}>
              <span className="py-4 px-3.5 text-[15px] font-bold text-gray-500 bg-gray-100 border-r-2 border-gray-200 flex items-center">+420</span>
              <input
                type="tel"
                placeholder="777 123 456"
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
                POTVRDIT OBJEDNÁVKU — 2 449 Kč
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 text-[14px] md:text-[15px] text-gray-500 pt-2">
            <Lock size={16} className="text-green-600" />
            <span><strong className="text-green-600">BEZPEČNÁ</strong> platba v hotovosti při doručení</span>
          </div>

          <div className="flex items-center justify-center gap-4 text-[13px] md:text-sm text-gray-400 pt-2">
            <span className="flex items-center gap-1"><Truck size={14} /> Doprava Zdarma</span>
            <span className="flex items-center gap-1"><RotateCcw size={14} /> Vrácení 30 dní</span>
            <span className="flex items-center gap-1"><Shield size={14} /> Záruka 2 roky</span>
          </div>
        </form>

        <p className="text-center text-white/70 text-[13px] md:text-sm mt-4">
          Náš operátor vás bude kontaktovat pro potvrzení objednávky
        </p>
      </div>
    </section>
  );
};

// --- URGENCY SECTION ---
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
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }}></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex justify-center mb-6">
          <div className="bg-red-600 text-white px-4 md:px-5 py-2.5 rounded-full font-black text-[13px] md:text-sm uppercase tracking-wide flex items-center gap-2 animate-pulse">
            <AlertTriangle size={18} />
            POZOR — PŘEČTĚTE SI NEŽ BUDETE POKRAČOVAT
          </div>
        </div>

        <h2 className="text-[26px] md:text-5xl font-black text-center uppercase tracking-tight mb-8 leading-tight">
          Proč Musíte <span className="text-orange-500">Jednat HNED</span>
        </h2>

        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-5 text-center border border-white/20">
            <div className="text-3xl md:text-5xl font-black text-orange-500 mb-1">{soldToday}</div>
            <div className="text-[11px] md:text-sm font-bold text-gray-300 uppercase tracking-wide">Prodáno Dnes</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-5 text-center border border-white/20">
            <div className="text-3xl md:text-5xl font-black text-red-500 mb-1">7</div>
            <div className="text-[11px] md:text-sm font-bold text-gray-300 uppercase tracking-wide">Kusů Zbývá</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-5 text-center border border-white/20">
            <div className="text-3xl md:text-5xl font-black text-yellow-500 mb-1">55%</div>
            <div className="text-[11px] md:text-sm font-bold text-gray-300 uppercase tracking-wide">Aktivní Sleva</div>
          </div>
        </div>

        <div className="space-y-4 mb-10">
          <div className="bg-red-900/50 border-2 border-red-500 rounded-xl p-4 md:p-5">
            <div className="flex items-start gap-3">
              <div className="bg-red-500 rounded-full p-2 flex-shrink-0">
                <AlertTriangle className="text-white" size={20} />
              </div>
              <div>
                <h4 className="font-black text-base md:text-lg mb-1">Zásoby se Vyprodávají</h4>
                <p className="text-gray-300 text-[14px] md:text-[15px] leading-relaxed">
                  Tato série za <strong className="text-white">2 449 Kč</strong> je téměř vyprodaná. Další objednávka od dodavatele bude dražší a cena se vrátí na <strong className="text-white">5 449 Kč</strong>. Tuto cenu nemůžeme zaručit zítra.
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
                <h4 className="font-black text-base md:text-lg mb-1">Doprava Zdarma Pouze Dnes</h4>
                <p className="text-gray-300 text-[14px] md:text-[15px] leading-relaxed">
                  Normálně doprava stojí <strong className="text-white">349 Kč</strong> za tak velký balík. Dnes ji nabízíme <strong className="text-white">ZDARMA</strong> jako pobídku k vyprodání skladu. Tato akce může skončit o půlnoci.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-5 md:p-6 mb-10 border border-gray-700">
          <h3 className="text-lg md:text-xl font-black text-center mb-6 uppercase">Když Objednáte Dnes vs Když Počkáte</h3>
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-green-400 font-bold text-sm md:text-base">
                <CheckCircle2 size={20} />
                <span>OBJEDNÁTE DNES</span>
              </div>
              <ul className="space-y-2.5 text-[13px] md:text-sm">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> Zaplatíte jen 2 449 Kč</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> Doprava ZDARMA</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> Doručení 24-48h</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> Připraveni na léto</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> Ušetříte 3 000 Kč</li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-red-400 font-bold text-sm md:text-base">
                <XCircle size={20} />
                <span>KDYŽ POČKÁTE</span>
              </div>
              <ul className="space-y-2.5 text-[13px] md:text-sm text-gray-400">
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Zaplatíte 5 449 Kč</li>
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Doprava 349 Kč</li>
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Čekání 2-3 týdny</li>
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Zmeškáte půl léta</li>
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Žádná úspora</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-400 text-[14px] md:text-base mb-5 leading-relaxed">
            Žádné riziko: <strong className="text-white">platíte při doručení</strong> a máte <strong className="text-white">30 dní</strong> na vrácení zdarma.
          </p>
          <button
            onClick={() => document.getElementById('form-objednat')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full md:w-auto bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 md:px-10 py-5 rounded-xl font-black text-lg md:text-xl uppercase tracking-wide shadow-2xl hover:from-orange-600 hover:to-red-600 transition-all inline-flex items-center justify-center gap-3"
          >
            <ShoppingBag size={24} />
            ANO, CHCI SVŮJ ALTÁN ZA 2 449 Kč
          </button>
          <p className="text-gray-500 text-xs md:text-sm mt-3">
            Klikněte na tlačítko a vyplňte formulář — zabere to jen 30 sekund
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
      q: "Jak dlouho trvá montáž?",
      a: "30-45 minut se 2 osobami. Jasný návod a nářadí v ceně."
    },
    {
      q: "Je odolný proti dešti?",
      a: "Ano, plachta je 100% voděodolná s PU povlakem."
    },
    {
      q: "Jsou stěny v ceně?",
      a: "Ano! Všechny 4 boční stěny jsou zahrnuty v ceně 2 449 Kč."
    },
    {
      q: "Jak zaplatím?",
      a: "Platíte v hotovosti kurýrovi při převzetí balíku. Žádná platba předem."
    },
  ];

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-[22px] md:text-4xl font-black uppercase tracking-tight">Časté Dotazy</h2>
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
              <p className="font-black text-2xl text-orange-600">2 449 Kč</p>
              <p className="text-xs font-bold text-gray-400 line-through">5 449 Kč</p>
            </div>
            <button
              onClick={() => document.getElementById('form-objednat')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex-[2] bg-gradient-to-r from-orange-500 to-red-500 text-white font-black py-4 px-4 rounded-xl uppercase text-base shadow-lg active:scale-95 transition-transform"
            >
              OBJEDNAT
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
        <a href="/privacy-policy" className="hover:text-white transition-colors">Ochrana Soukromí</a>
        <a href="/terms-of-service" className="hover:text-white transition-colors">Podmínky</a>
        <a href="/contact" className="hover:text-white transition-colors">Kontakt</a>
      </div>
      <p className="text-xs text-gray-600">
        © 2024 Pop Up Gazebo Česká republika. Obrázky jsou ilustrativní.
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
