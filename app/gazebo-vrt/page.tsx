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
 * POP UP GAZEBO — 3x3m Dvojna Streha
 * Landing Page za Facebook Ads - Agresivni Marketing - SLOVENIJA
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
          <span className="font-black text-sm md:text-base uppercase tracking-wide">POLETNA AKCIJA - ZADNJI KOSI!</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-300">Ponudba poteče čez:</span>
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
      <span className="text-red-700 font-black text-base">POZOR: Samo še 7 kosov na zalogi!</span>
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
            {['M', 'A', 'J'][i]}
          </div>
        ))}
      </div>
      <span><strong className="text-black">{Math.max(15, viewers)}</strong> oseb si ogleduje ta izdelek</span>
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
        onClick={() => document.getElementById('narocilo')?.scrollIntoView({ behavior: 'smooth' })}
        className="bg-orange-500 text-white px-5 py-2 rounded-lg font-black text-sm uppercase tracking-wide hover:bg-orange-600 transition-colors hidden md:flex items-center gap-2"
      >
        <ShoppingBag size={18} />
        Naroči -55%
      </button>
      <button className="md:hidden bg-orange-500 p-2 rounded-lg" onClick={() => document.getElementById('narocilo')?.scrollIntoView({ behavior: 'smooth' })}>
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
                POLETNA AKCIJA
              </span>
            </div>

            <h1 className="text-[28px] md:text-4xl font-black leading-tight uppercase tracking-tight text-gray-900">
              Pop Up Gazebo 3x3m<br />
              <span className="text-orange-600">Dvojna Streha + 4 Stranske Tende</span>
            </h1>

            <p className="text-[17px] md:text-lg text-gray-600 leading-relaxed">
              Premium jeklena konstrukcija, vodoodporno platno z UV zaščito in odstranljive stranske tende vključene.
            </p>
          </div>

          {/* BIG PRICE */}
          <div className="bg-gradient-to-r from-orange-50 via-yellow-50 to-orange-50 p-5 rounded-2xl border-2 border-orange-300 shadow-lg">
            <div className="flex items-center justify-center gap-4 mb-2">
              <span className="text-gray-400 line-through text-2xl font-bold">219€</span>
              <div className="relative">
                <span className="text-6xl md:text-7xl font-black text-orange-600">99€</span>
              </div>
            </div>
            <div className="text-center mb-3">
              <span className="bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-black inline-block">
                PRIHRANITE 120€ — SAMO DANES!
              </span>
            </div>
            <div className="flex items-center justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} size={22} fill="currentColor" className="text-yellow-500" />)}
              <span className="font-bold text-sm ml-2">4.9/5</span>
              <span className="text-gray-500 text-sm">(847 ocen)</span>
            </div>
            <StockCounter />
          </div>

          {/* Live Viewers */}
          <LiveViewers />

          {/* Bullet Points */}
          <ul className="space-y-2.5">
            {[
              { icon: Ruler, text: "3x3 Metra — Prostor za 8-10 oseb" },
              { icon: Layers, text: "Dvojna Prezračevalna Streha — Sveže tudi pri 40°C" },
              { icon: Droplets, text: "100% Vodoodporno — Popolna zaščita" },
              { icon: Wind, text: "4 Stranske Tende Vključene" },
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
          <div id="narocilo">
            <button
              onClick={() => document.getElementById('form-narocilo')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-5 rounded-xl font-black text-xl uppercase tracking-wide shadow-xl hover:from-orange-600 hover:to-red-600 transition-all flex items-center justify-center gap-3"
            >
              <ShoppingBag size={24} />
              NAROČI ZDAJ — PLAČILO OB DOSTAVI
            </button>
            <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-500">
              <Lock size={14} />
              <span>Varno plačilo ob dostavi v gotovini</span>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-gray-100 p-3 rounded-xl text-center">
              <Truck className="mx-auto mb-1 text-orange-600" size={22} />
              <p className="text-[11px] font-bold text-gray-700">Dostava<br />BREZPLAČNA</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-xl text-center">
              <RotateCcw className="mx-auto mb-1 text-orange-600" size={22} />
              <p className="text-[11px] font-bold text-gray-700">Vračilo<br />30 Dni</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-xl text-center">
              <Shield className="mx-auto mb-1 text-orange-600" size={22} />
              <p className="text-[11px] font-bold text-gray-700">Garancija<br />2 Leti</p>
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
            <span className="font-bold text-sm flex items-center gap-2"><Truck size={16} /> HITRA DOSTAVA 24-48H</span>
            <span className="font-bold text-sm flex items-center gap-2"><Shield size={16} /> 2 LETI GARANCIJE</span>
            <span className="font-bold text-sm flex items-center gap-2"><RotateCcw size={16} /> BREZPLAČNO VRAČILO</span>
            <span className="font-bold text-sm flex items-center gap-2"><ThumbsUp size={16} /> +5.000 STRANK</span>
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
          Ste Naveličani Poleti Ostajati Doma?
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Problems */}
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="text-lg md:text-xl font-black text-red-600 mb-4 flex items-center gap-2">
            <XCircle size={24} /> BREZ POP UP GAZEBA
          </h3>
          <ul className="space-y-3">
            {[
              "Pekoče sonce, ki onemogoča bivanje zunaj",
              "Nenadne nevihte pokvarijo zabave in piknike",
              "Brez zasebnosti pred sosedi",
              "Vrtno pohištvo uničeno od vremena",
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
            <CheckCircle2 size={24} /> S POP UP GAZEBOM
          </h3>
          <ul className="space-y-3">
            {[
              "Prijetna senca tudi pri 40°C",
              "Popolna zaščita pred dežjem",
              "Zasebnost s stranskimi tendami",
              "Uživajte na vrtu vse leto",
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
      title: "Dvojna Prezračevalna Streha",
      desc: "Do 10°C hladneje kot pri običajnih gazebih.",
      img: "/images/gazebo/1.jpg",
    },
    {
      title: "Vodoodporno Platno",
      desc: "Poliester 180g/m² s PU premazom. 100% vodoodporno.",
      img: "/images/gazebo/2.jpg",
    },
    {
      title: "Premium Jeklo",
      desc: "Prašno barvano proti rji. Vzdrži vetrove do 50 km/h.",
      img: "/images/gazebo/3.jpg",
    },
    {
      title: "4 Tende Vključene",
      desc: "Zasebnost in zaščita pred vetrom. Montaža v 30 sekundah.",
      img: "/images/gazebo/4.jpg",
    },
    {
      title: "Enostavna Montaža",
      desc: "2 osebi, 30 minut. Vse vključeno v paketu.",
      img: "/images/gazebo/5.jpg",
    },
    {
      title: "Eleganten Dizajn",
      desc: "Bež barva, ki se ujema z vsakim vrtom.",
      img: "/images/gazebo/6.jpg",
    },
  ];

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
            Zakaj Izbrati <span className="text-orange-600">Pop Up Gazebo</span>
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
          Tehnične Specifikacije
        </h2>
      </div>

      <div className="bg-gray-800 rounded-2xl p-5 md:p-6">
        <div className="grid grid-cols-2 gap-4 md:gap-5">
          {[
            { label: "Dimenzije", value: "3m x 3m x 2.65m" },
            { label: "Površina", value: "9 m²" },
            { label: "Konstrukcija", value: "Barvano jeklo" },
            { label: "Platno", value: "Poliester 180g/m²" },
            { label: "Vodoodpornost", value: "100%" },
            { label: "UV Zaščita", value: "UPF 50+" },
            { label: "Kapaciteta", value: "8-10 oseb" },
            { label: "Stranske Tende", value: "4 vključene" },
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
  { batch: 1, av: "M", name: "Marko B.", city: "Ljubljana", stars: 5, text: "Postavil sem ga v 40 minutah s partnerico. Neverjetna kakovost za to ceno, mislil sem, da bom dobil poceni materiale, pa je konstrukcija res robustna. Dvojna streha je genialna!" },
  { batch: 1, av: "A", name: "Ana S.", city: "Maribor", stars: 5, text: "Že prestal dve močni nevihti brez kapljice vode. Stranske tende so super praktične, ko so sosedi na vrtu. Super priporočam!" },
  { batch: 1, av: "J", name: "Jože F.", city: "Celje", stars: 5, text: "Za 99€ je darilo! Videl sem ga v trgovini za skoraj dvojno ceno. Prišel v 2 dneh, montaža enostavna. Zdaj vedno kosimo pod gazebom." },
  // Batch 2
  { batch: 2, av: "N", name: "Nina R.", city: "Kranj", stars: 5, text: "Imeli smo rojstni dan sina pod gazebom. 15 otrok na varnem pred soncem! Stabilna konstrukcija, elegantna barva, ki se ujema z našim vrtom." },
  { batch: 2, av: "P", name: "Peter D.", city: "Koper", stars: 5, text: "Iskal sem gazebo s stranskimi tendami vključenimi, drugje jih prodajajo posebej za 50€ več. Tukaj je bilo vse vključeno v ceni. Premium kakovost!" },
  { batch: 2, av: "S", name: "Sara M.", city: "Novo Mesto", stars: 5, text: "Dvojna streha res naredi razliko. Vedno je svež zrak tudi ob 14h popoldne. Postavljen v manj kot uro, rezultat je spektakularen!" },
  // Batch 3
  { batch: 3, av: "R", name: "Robert C.", city: "Velenje", stars: 5, text: "Tretji gazebo, ki ga kupim v 5 letih, prva dva sem vrgel stran po eni sezoni. Ta zgleda, da bo zdržal: debelo jeklo, odporno platno, popolni šivi." },
  { batch: 3, av: "F", name: "Francka L.", city: "Ptuj", stars: 5, text: "Uporabljam ga kot kotiček za branje in jutranjo kavo. S spuščenimi tendami je moj mali raj. Odlično razmerje med ceno in kakovostjo!" },
  { batch: 3, av: "D", name: "David P.", city: "Murska Sobota", stars: 5, text: "Dvomil sem zaradi nizke cene, naročil pripravljen na vračilo. Pa sem se zmotil: top kakovost, hitra dostava, enostavna montaža. 5 zvezdic zasluženih." },
  // Batch 4
  { batch: 4, av: "K", name: "Klara T.", city: "Jesenice", stars: 5, text: "Končno lahko zajtrkovam na vrtu brez da umiram od vročine! Gazebo je prišel dobro zapakiran, noben kos poškodovan. Zelo priporočam." },
  { batch: 4, av: "E", name: "Erik M.", city: "Trbovlje", stars: 5, text: "Kupil za nedeljske žare. Že prestal 3 poletne nevihte brez težav. Moji prijatelji so bili navdušeni nad kakovostjo." },
  { batch: 4, av: "V", name: "Valentina G.", city: "Postojna", stars: 5, text: "Pri nas je poleti sonce zelo močno. Dvojna streha ohranja prostor hladen. Stranske tende popolne za zasebnost. Odličen nakup!" },
  // Batch 5
  { batch: 5, av: "T", name: "Tomaž F.", city: "Škofja Loka", stars: 5, text: "Postavil sem gazebo sam v približno 50 minutah po navodilih. Stabilna konstrukcija, kakovostno platno. Za to ceno ni boljšega." },
  { batch: 5, av: "I", name: "Irena R.", city: "Domžale", stars: 4, text: "Odličen izdelek, samo navodila bi lahko bila bolj jasna. Ampak na koncu vse postavljeno popolno. Gazebo je lep in funkcionalen." },
  { batch: 5, av: "L", name: "Luka B.", city: "Kamnik", stars: 5, text: "Kupil za hčerino poroko na vrtu. Eleganten, prostoren, zaščitil goste pred julijs kim soncem. Denar zelo dobro porabljen!" },
  // Batch 6
  { batch: 6, av: "B", name: "Barbara C.", city: "Izola", stars: 5, text: "Uporabljam ga vsak dan za delo na računalniku zunaj. Z WiFi in gazebom imam svojo pisarno na vrtu. Genialno!" },
  { batch: 6, av: "G", name: "Gregor L.", city: "Slovenska Bistrica", stars: 5, text: "Iskal sem nekaj robustnega, kar bo zdržalo. Po 6 mesecih intenzivne uporabe lahko rečem, da je odličen izdelek. Brez težav." },
  { batch: 6, av: "H", name: "Helena V.", city: "Ajdovščina", stars: 5, text: "Plačilo ob dostavi zelo priročno, brez tveganja. Kurir je bil točen. Gazebo je točno kot na slikah, pravzaprav še lepši!" },
  // Batch 7
  { batch: 7, av: "U", name: "Urban Z.", city: "Piran", stars: 5, text: "Fantastično! Uporabljam za večerje na prostem s prijatelji. Kakovost je res vrhunska, platno zgleda zelo odporno. Odličen nakup!" },
  { batch: 7, av: "Z", name: "Zala N.", city: "Bled", stars: 5, text: "Moj stari gazebo se je zlomil po enem letu. Ta zgleda veliko bolj trden. Stranske tende so neverjeten plus za to ceno." },
  { batch: 7, av: "C", name: "Cvetka S.", city: "Radovljica", stars: 5, text: "Popoln za naš vrt! Montaža zelo enostavna, v dvoje sva potrebovala pol ure. Bež barva je elegantna in se ujema z vsem." },
  // Batch 8
  { batch: 8, av: "W", name: "Vinko M.", city: "Lendava", stars: 5, text: "Pri nas je poleti zelo vroče. Dvojna streha ohranja prostor hladen! Hitra dostava in izdelek skladen z opisom." },
  { batch: 8, av: "X", name: "Karmen P.", city: "Črnomelj", stars: 5, text: "Primerjala sem veliko gazebov na spletu, ta je imel najboljše razmerje med kakovostjo in ceno. Nisem bila razočarana, nasprotno! Robustna in lepa konstrukcija." },
  { batch: 8, av: "Y", name: "Jurij C.", city: "Metlika", stars: 5, text: "Uporabljam ga tudi pozimi za zaščito vrtnega pohištva. 100% vodoodporno, testiral sem ga z močnim dežjem. Brez vdorov vode!" },
  // Batch 9
  { batch: 9, av: "O", name: "Olga A.", city: "Brežice", stars: 5, text: "Kupila za poletje, postal je središče naših večerov na vrtu. Prijatelji vedno sprašujejo, kje sem ga dobila. Super zadovoljna!" },
  { batch: 9, av: "Q", name: "Klemen D.", city: "Sevnica", stars: 4, text: "Dober izdelek na splošno. Edino bi mi bilo všeč, da bi bile na voljo različne barve. Ampak kakovost je odlična za plačano ceno." },
  { batch: 9, av: "AA", name: "Aleš V.", city: "Krško", stars: 5, text: "Bil sem neodločen glede plačila ob dostavi, pa je bilo vse popolno. Gazebo je prišel cel in dobro zapakiran. Priporočam!" },
  // Batch 10
  { batch: 10, av: "AB", name: "Brigita F.", city: "Trebnje", stars: 5, text: "Končno gazebo, ki ne odleti pri prvem vetru! Konstrukcija je trdna in tende dobro ščitijo. Zelo zadovoljna z nakupom." },
  { batch: 10, av: "AC", name: "Ciril E.", city: "Grosuplje", stars: 5, text: "Postavil sem ga za krst nečaka. Vsi gostje so bili navdušeni. Lep estetsko in zelo funkcionalen." },
  { batch: 10, av: "AD", name: "Darja L.", city: "Litija", stars: 5, text: "Po dolgem iskanju sem izbrala tega in ne obžalujem. Cena je nepremagljiva za ponujeno kakovost. Hitra dostava!" },
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
          <h2 className="text-[22px] md:text-4xl font-black uppercase tracking-tight">847 Zadovoljnih Strank</h2>
          <p className="text-gray-500 text-[15px] md:text-base mt-2">Preverjene ocene naših strank</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleReviews.map((rev, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-black text-lg">{rev.av.charAt(0)}</div>
                <div>
                  <p className="font-bold text-base">{rev.name}</p>
                  <p className="text-sm text-gray-400">{rev.city} • Preverjen nakup</p>
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
              Pokaži več ocen
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
  const [form, setForm] = useState({ fullName: "", address: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const updateForm = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = "Vnesite ime in priimek";
    if (!form.address.trim()) errs.address = "Vnesite popoln naslov";
    const digits = form.phone.replace(/\D/g, "");
    if (!form.phone.trim()) errs.phone = "Vnesite telefonsko številko";
    else if (digits.length < 7) errs.phone = "Neveljavna številka";
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

    formData.append('uid', '0198088f-a4bc-7ed8-89aa-83089fe0180e');
    formData.append('key', 'ec15cab563da6cf51f0c7c');
    formData.append('offer', '768');
    formData.append('lp', '779');
    formData.append('name', form.fullName.trim());
    formData.append('tel', '+386' + form.phone.trim().replace(/\s/g, ''));
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
      localStorage.setItem("gazebo-vrt-order", JSON.stringify({
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
        alert("Prišlo je do napake. Poskusite znova.");
        setSubmitting(false);
        return;
      }

      window.location.href = "/ty/gazebo-vrt";
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "poskusite znova";
      console.error("Network Error:", message);
      alert("Napaka omrežja: " + message);
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 py-16 px-4" id="form-narocilo">
      <div className="max-w-lg mx-auto">
        <div className="text-center text-white mb-6">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2.5 rounded-full text-[13px] md:text-sm font-bold mb-4">
            <AlertTriangle className="animate-pulse" size={16} />
            OMEJENA PONUDBA - SAMO 7 KOSOV
          </div>
          <h2 className="text-[28px] md:text-4xl font-black uppercase mb-3">
            Naročite Zdaj!
          </h2>
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-white/70 line-through text-xl md:text-2xl">219€</span>
            <span className="text-5xl md:text-6xl font-black">99€</span>
          </div>
          <p className="text-white/90 text-[15px] md:text-base">
            BREZPLAČNA Dostava • Dostava 24-48h
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-5 md:p-6 shadow-2xl space-y-4">
          <div>
            <label className="block text-[15px] md:text-base font-bold text-gray-700 mb-1.5">Ime in Priimek *</label>
            <input
              type="text"
              placeholder="Npr. Janez Novak"
              value={form.fullName}
              onChange={(e) => updateForm("fullName", e.target.value)}
              className={`w-full py-4 px-4 border-2 rounded-xl text-[16px] font-medium outline-none transition-colors ${errors.fullName ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-orange-500"}`}
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-[15px] md:text-base font-bold text-gray-700 mb-1.5">Popoln Naslov *</label>
            <input
              type="text"
              placeholder="Slovenska cesta 1, 1000 Ljubljana"
              value={form.address}
              onChange={(e) => updateForm("address", e.target.value)}
              className={`w-full py-4 px-4 border-2 rounded-xl text-[16px] font-medium outline-none transition-colors ${errors.address ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-orange-500"}`}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          <div>
            <label className="block text-[15px] md:text-base font-bold text-gray-700 mb-1.5">Telefonska Številka *</label>
            <div className={`flex items-stretch border-2 rounded-xl overflow-hidden ${errors.phone ? "border-red-500 bg-red-50" : "border-gray-200 focus-within:border-orange-500"}`}>
              <span className="py-4 px-3.5 text-[15px] font-bold text-gray-500 bg-gray-100 border-r-2 border-gray-200 flex items-center">+386</span>
              <input
                type="tel"
                placeholder="40 123 456"
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
                POTRDI NAROČILO — 99€ OB DOSTAVI
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 text-[14px] md:text-[15px] text-gray-500 pt-2">
            <Lock size={16} className="text-green-600" />
            <span><strong className="text-green-600">VARNO</strong> plačilo v gotovini ob dostavi</span>
          </div>

          <div className="flex items-center justify-center gap-4 text-[13px] md:text-sm text-gray-400 pt-2">
            <span className="flex items-center gap-1"><Truck size={14} /> Brezplačna Dostava</span>
            <span className="flex items-center gap-1"><RotateCcw size={14} /> Vračilo 30 dni</span>
            <span className="flex items-center gap-1"><Shield size={14} /> Garancija 2 leti</span>
          </div>
        </form>

        <p className="text-center text-white/70 text-[13px] md:text-sm mt-4">
          Naš operater vas bo kontaktiral za potrditev naročila
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
            POZOR — PREBERITE PREDEN NADALJUJETE
          </div>
        </div>

        <h2 className="text-[26px] md:text-5xl font-black text-center uppercase tracking-tight mb-8 leading-tight">
          Zakaj Morate <span className="text-orange-500">Ukrepati ZDAJ</span>
        </h2>

        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-5 text-center border border-white/20">
            <div className="text-3xl md:text-5xl font-black text-orange-500 mb-1">{soldToday}</div>
            <div className="text-[11px] md:text-sm font-bold text-gray-300 uppercase tracking-wide">Prodanih Danes</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-5 text-center border border-white/20">
            <div className="text-3xl md:text-5xl font-black text-red-500 mb-1">7</div>
            <div className="text-[11px] md:text-sm font-bold text-gray-300 uppercase tracking-wide">Kosov Preostalo</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-5 text-center border border-white/20">
            <div className="text-3xl md:text-5xl font-black text-yellow-500 mb-1">55%</div>
            <div className="text-[11px] md:text-sm font-bold text-gray-300 uppercase tracking-wide">Aktiven Popust</div>
          </div>
        </div>

        <div className="space-y-4 mb-10">
          <div className="bg-red-900/50 border-2 border-red-500 rounded-xl p-4 md:p-5">
            <div className="flex items-start gap-3">
              <div className="bg-red-500 rounded-full p-2 flex-shrink-0">
                <AlertTriangle className="text-white" size={20} />
              </div>
              <div>
                <h4 className="font-black text-base md:text-lg mb-1">Zaloga se Prazni</h4>
                <p className="text-gray-300 text-[14px] md:text-[15px] leading-relaxed">
                  Ta serija po <strong className="text-white">99€</strong> je skoraj razprodana. Naslednje naročilo od dobavitelja bo dražje in cena se bo vrnila na <strong className="text-white">219€</strong>. Te cene jutri ne moremo zagotoviti.
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
                <h4 className="font-black text-base md:text-lg mb-1">Brezplačna Dostava Samo Danes</h4>
                <p className="text-gray-300 text-[14px] md:text-[15px] leading-relaxed">
                  Normalno dostava stane <strong className="text-white">14,90€</strong> za tako velik paket. Danes jo ponujamo <strong className="text-white">BREZPLAČNO</strong> za spodbudo prodaje iz skladišča. Ta promocija se lahko konča ob polnoči.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-5 md:p-6 mb-10 border border-gray-700">
          <h3 className="text-lg md:text-xl font-black text-center mb-6 uppercase">Če Naročite Danes vs Če Počakate</h3>
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-green-400 font-bold text-sm md:text-base">
                <CheckCircle2 size={20} />
                <span>NAROČITE DANES</span>
              </div>
              <ul className="space-y-2.5 text-[13px] md:text-sm">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> Plačate samo 99€</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> Dostava BREZPLAČNA</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> Dostava 24-48h</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> Pripravljeni za poletje</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> Prihranite 120€</li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-red-400 font-bold text-sm md:text-base">
                <XCircle size={20} />
                <span>ČE POČAKATE</span>
              </div>
              <ul className="space-y-2.5 text-[13px] md:text-sm text-gray-400">
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Plačali boste 219€</li>
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Dostava 14,90€</li>
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Čakanje 2-3 tedne</li>
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Zamudite pol poletja</li>
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Brez prihranka</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-400 text-[14px] md:text-base mb-5 leading-relaxed">
            Brez tveganja: <strong className="text-white">plačate ob dostavi</strong> in imate <strong className="text-white">30 dni</strong> za brezplačno vračilo.
          </p>
          <button
            onClick={() => document.getElementById('form-narocilo')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full md:w-auto bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 md:px-10 py-5 rounded-xl font-black text-lg md:text-xl uppercase tracking-wide shadow-2xl hover:from-orange-600 hover:to-red-600 transition-all inline-flex items-center justify-center gap-3"
          >
            <ShoppingBag size={24} />
            DA, ŽELIM SVOJ GAZEBO ZA 99€
          </button>
          <p className="text-gray-500 text-xs md:text-sm mt-3">
            Kliknite gumb in izpolnite obrazec — traja samo 30 sekund
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
      q: "Koliko časa traja montaža?",
      a: "30-45 minut z 2 osebama. Jasna navodila in orodje vključeno."
    },
    {
      q: "Ali je odporen na dež?",
      a: "Da, platno je 100% vodoodporno s PU premazom."
    },
    {
      q: "Ali so tende vključene?",
      a: "Da! Vse 4 stranske tende so vključene v ceni 99€."
    },
    {
      q: "Kako plačam?",
      a: "Plačate v gotovini kurirju ob prevzemu paketa. Brez predplačila."
    },
  ];

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-[22px] md:text-4xl font-black uppercase tracking-tight">Pogosta Vprašanja</h2>
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
              onClick={() => document.getElementById('form-narocilo')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex-[2] bg-gradient-to-r from-orange-500 to-red-500 text-white font-black py-4 px-4 rounded-xl uppercase text-base shadow-lg active:scale-95 transition-transform"
            >
              NAROČI ZDAJ
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
        <a href="/privacy-policy" className="hover:text-white transition-colors">Zasebnost</a>
        <a href="/terms-of-service" className="hover:text-white transition-colors">Pogoji</a>
        <a href="/contact" className="hover:text-white transition-colors">Kontakt</a>
      </div>
      <p className="text-xs text-gray-600">
        © 2024 Pop Up Gazebo Slovenija. Slike so ilustrativne.
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
