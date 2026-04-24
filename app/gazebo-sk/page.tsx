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
 * POP UP GAZEBO — 3x3m Dvojitá Strecha
 * Landing Page pre Facebook Ads - Agresívny Marketing - SLOVENSKO
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
          <span className="font-black text-sm md:text-base uppercase tracking-wide">LETNÁ AKCIA - POSLEDNÉ KUSY!</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-300">Ponuka končí za:</span>
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
      <span className="text-red-700 font-black text-base">POZOR: Iba 7 kusov na sklade!</span>
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
      <span><strong className="text-black">{Math.max(15, viewers)}</strong> ľudí si práve prezerá tento produkt</span>
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
        Objednať -55%
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
                LETNÁ AKCIA
              </span>
            </div>

            <h1 className="text-[28px] md:text-4xl font-black leading-tight uppercase tracking-tight text-gray-900">
              Pop Up Gazebo 3x3m<br />
              <span className="text-orange-600">Dvojitá Strecha + 4 Bočné Steny</span>
            </h1>

            <p className="text-[17px] md:text-lg text-gray-600 leading-relaxed">
              Prémiová oceľová konštrukcia, vodoodolná plachta s UV ochranou a odnímateľné bočné steny v cene.
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
                UŠETRÍTE 120€ — IBA DNES!
              </span>
            </div>
            <div className="flex items-center justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} size={22} fill="currentColor" className="text-yellow-500" />)}
              <span className="font-bold text-sm ml-2">4.9/5</span>
              <span className="text-gray-500 text-sm">(847 hodnotení)</span>
            </div>
            <StockCounter />
          </div>

          {/* Live Viewers */}
          <LiveViewers />

          {/* Bullet Points */}
          <ul className="space-y-2.5">
            {[
              { icon: Ruler, text: "3x3 Metre — Priestor pre 8-10 osôb" },
              { icon: Layers, text: "Dvojitá Vetraná Strecha — Chladno aj pri 40°C" },
              { icon: Droplets, text: "100% Vodoodolné — Úplná ochrana" },
              { icon: Wind, text: "4 Bočné Steny V Cene" },
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
              OBJEDNAŤ — PLATBA PRI DORUČENÍ
            </button>
            <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-500">
              <Lock size={14} />
              <span>Bezpečná platba v hotovosti pri doručení</span>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-gray-100 p-3 rounded-xl text-center">
              <Truck className="mx-auto mb-1 text-orange-600" size={22} />
              <p className="text-[11px] font-bold text-gray-700">Doprava<br />ZADARMO</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-xl text-center">
              <RotateCcw className="mx-auto mb-1 text-orange-600" size={22} />
              <p className="text-[11px] font-bold text-gray-700">Vrátenie<br />30 Dní</p>
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
            <span className="font-bold text-sm flex items-center gap-2"><Truck size={16} /> EXPRESNÉ DORUČENIE 24-48H</span>
            <span className="font-bold text-sm flex items-center gap-2"><Shield size={16} /> 2 ROKY ZÁRUKY</span>
            <span className="font-bold text-sm flex items-center gap-2"><RotateCcw size={16} /> VRÁTENIE ZADARMO</span>
            <span className="font-bold text-sm flex items-center gap-2"><ThumbsUp size={16} /> +5.000 ZÁKAZNÍKOV</span>
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
          Už Vás Nebaví Byť V Lete Zatvorení Doma?
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
              "Páliace slnko, ktoré znemožňuje pobyt vonku",
              "Náhle búrky kazia oslavy a grilovanie",
              "Žiadne súkromie pred susedmi",
              "Záhradný nábytok zničený počasím",
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
              "Príjemný tieň aj pri 40°C",
              "Úplná ochrana pred dažďom",
              "Súkromie vďaka bočným stenám",
              "Užívajte si záhradu celý rok",
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
      title: "Dvojitá Vetraná Strecha",
      desc: "Až o 10°C chladnejšie ako bežné altánky.",
      img: "/images/gazebo/1.jpg",
    },
    {
      title: "Vodoodolná Plachta",
      desc: "Polyester 180g/m² s PU povlakom. 100% vodoodolné.",
      img: "/images/gazebo/2.jpg",
    },
    {
      title: "Prémiová Oceľ",
      desc: "Práškovo lakovaná proti hrdzi. Odolá vetru do 50 km/h.",
      img: "/images/gazebo/3.jpg",
    },
    {
      title: "4 Steny V Cene",
      desc: "Súkromie a ochrana pred vetrom. Montáž za 30 sekúnd.",
      img: "/images/gazebo/4.jpg",
    },
    {
      title: "Jednoduchá Montáž",
      desc: "2 osoby, 30 minút. Všetko súčasťou balenia.",
      img: "/images/gazebo/5.jpg",
    },
    {
      title: "Elegantný Dizajn",
      desc: "Béžová farba, ktorá ladí s každou záhradou.",
      img: "/images/gazebo/6.jpg",
    },
  ];

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
            Prečo Si Vybrať <span className="text-orange-600">Pop Up Gazebo</span>
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
          Technické Špecifikácie
        </h2>
      </div>

      <div className="bg-gray-800 rounded-2xl p-5 md:p-6">
        <div className="grid grid-cols-2 gap-4 md:gap-5">
          {[
            { label: "Rozmery", value: "3m x 3m x 2.65m" },
            { label: "Plocha", value: "9 m²" },
            { label: "Konštrukcia", value: "Lakovaná oceľ" },
            { label: "Plachta", value: "Polyester 180g/m²" },
            { label: "Vodoodolnosť", value: "100%" },
            { label: "UV Ochrana", value: "UPF 50+" },
            { label: "Kapacita", value: "8-10 osôb" },
            { label: "Bočné Steny", value: "4 v cene" },
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
  { batch: 1, av: "M", name: "Martin B.", city: "Bratislava", stars: 5, text: "Postavil som ho za 40 minút s manželkou. Neuveriteľná kvalita za túto cenu, myslel som, že dostanem lacné materiály, ale konštrukcia je naozaj pevná. Dvojitá strecha je geniálna!" },
  { batch: 1, av: "J", name: "Jana S.", city: "Košice", stars: 5, text: "Už prežil dve silné búrky bez jedinej kvapky vody. Bočné steny sú super praktické, keď sú susedia na záhrade. Veľmi odporúčam!" },
  { batch: 1, av: "P", name: "Peter F.", city: "Prešov", stars: 5, text: "Za 99€ je to darček! Videl som ho v obchode takmer za dvojnásobok. Dorazil za 2 dni, montáž jednoduchá. Teraz vždy obedujeme pod altánkom." },
  // Batch 2
  { batch: 2, av: "L", name: "Lucia R.", city: "Žilina", stars: 5, text: "Mali sme synove narodeniny pod altánkom. 15 detí v bezpečí pred slnkom! Stabilná konštrukcia, elegantná farba, ktorá ladí s našou záhradou." },
  { batch: 2, av: "T", name: "Tomáš D.", city: "Banská Bystrica", stars: 5, text: "Hľadal som altánok s bočnými stenami v cene, inde ich predávajú zvlášť za 50€ naviac. Tu bolo všetko súčasťou ceny. Prémiová kvalita!" },
  { batch: 2, av: "K", name: "Katarína M.", city: "Nitra", stars: 5, text: "Dvojitá strecha naozaj robí rozdiel. Vždy je tam čerstvý vzduch aj o 14 hodine popoludní. Postavené za menej ako hodinu, výsledok je spektakulárny!" },
  // Batch 3
  { batch: 3, av: "R", name: "Róbert C.", city: "Trnava", stars: 5, text: "Tretí altánok, ktorý kupujem za 5 rokov, prvé dva som vyhodil po jednej sezóne. Tento vyzerá, že vydrží: silná oceľ, odolná plachta, perfektné švy." },
  { batch: 3, av: "E", name: "Eva L.", city: "Trenčín", stars: 5, text: "Používam ho ako kútik na čítanie a rannú kávu. So spustenými stenami je to môj malý raj. Výborný pomer ceny a kvality!" },
  { batch: 3, av: "D", name: "Dávid P.", city: "Martin", stars: 5, text: "Pochyboval som kvôli nízkej cene, objednal som pripravený na vrátenie. Ale zmýlil som sa: top kvalita, rýchla doprava, jednoduchá montáž. 5 hviezdičiek zaslúžených." },
  // Batch 4
  { batch: 4, av: "V", name: "Veronika T.", city: "Poprad", stars: 5, text: "Konečne môžem raňajkovať na záhrade bez toho, aby som umierala horúčavou! Altánok dorazil dobre zabalený, žiadny kus poškodený. Veľmi odporúčam." },
  { batch: 4, av: "O", name: "Ondrej M.", city: "Piešťany", stars: 5, text: "Kúpil som ho na nedeľné grilovanie. Už prežil 3 letné búrky bez problémov. Moji priatelia boli nadšení z kvality." },
  { batch: 4, av: "A", name: "Alena G.", city: "Považská Bystrica", stars: 5, text: "U nás je v lete slnko veľmi silné. Dvojitá strecha udržuje priestor chladný. Bočné steny perfektné pre súkromie. Výborná kúpa!" },
  // Batch 5
  { batch: 5, av: "F", name: "František F.", city: "Zvolen", stars: 5, text: "Postavil som altánok sám za približne 50 minút podľa návodu. Stabilná konštrukcia, kvalitná plachta. Za túto cenu nie je lepšieho." },
  { batch: 5, av: "I", name: "Ivana R.", city: "Michalovce", stars: 4, text: "Výborný výrobok, len návod mohol byť jasnejší. Ale nakoniec všetko postavené perfektne. Altánok je krásny a funkčný." },
  { batch: 5, av: "H", name: "Honza B.", city: "Komárno", stars: 5, text: "Kúpil som ho na dcérinu svadbu na záhrade. Elegantný, priestranný, ochránil hostí pred júlovým slnkom. Peniaze veľmi dobre utratené!" },
  // Batch 6
  { batch: 6, av: "B", name: "Barbora C.", city: "Levice", stars: 5, text: "Používam ho každý deň na prácu pri počítači vonku. S WiFi a altánkom mám svoju kanceláriu na záhrade. Geniálne!" },
  { batch: 6, av: "G", name: "Gustáv L.", city: "Dunajská Streda", stars: 5, text: "Hľadal som niečo pevné, čo vydrží. Po 6 mesiacoch intenzívneho používania môžem povedať, že je to výborný výrobok. Žiadne problémy." },
  { batch: 6, av: "N", name: "Nikola V.", city: "Nové Zámky", stars: 5, text: "Platba pri doručení veľmi pohodlná, žiadne riziko. Kuriér bol presný. Altánok je presne ako na obrázkoch, vlastne ešte lepší!" },
  // Batch 7
  { batch: 7, av: "U", name: "Urban Z.", city: "Lučenec", stars: 5, text: "Fantastické! Používam ho na večere vonku s priateľmi. Kvalita je naozaj špičková, plachta vyzerá veľmi odolne. Výborná kúpa!" },
  { batch: 7, av: "Z", name: "Zuzana N.", city: "Spišská Nová Ves", stars: 5, text: "Môj starý altánok sa zlomil po jednom roku. Tento vyzerá oveľa pevnejší. Bočné steny sú neuveriteľný plus za túto cenu." },
  { batch: 7, av: "C", name: "Cyril S.", city: "Bardejov", stars: 5, text: "Perfektný pre našu záhradu! Montáž veľmi jednoduchá, vo dvoch sme potrebovali pol hodiny. Béžová farba je elegantná a ladí so všetkým." },
  // Batch 8
  { batch: 8, av: "W", name: "Václav M.", city: "Senica", stars: 5, text: "U nás je v lete veľmi horúco. Dvojitá strecha udržuje priestor chladný! Rýchla doprava a výrobok zodpovedá popisu." },
  { batch: 8, av: "X", name: "Kristína P.", city: "Hlohovec", stars: 5, text: "Porovnávala som veľa altánkov online, tento mal najlepší pomer kvality a ceny. Nebola som sklamaná, naopak! Pevná a krásna konštrukcia." },
  { batch: 8, av: "Y", name: "Jakub C.", city: "Topoľčany", stars: 5, text: "Používam ho aj v zime na ochranu záhradného nábytku. 100% vodoodolné, testoval som ho so silným dažďom. Žiadne priesaky!" },
  // Batch 9
  { batch: 9, av: "S", name: "Simona A.", city: "Partizánske", stars: 5, text: "Kúpila som ho na leto, stal sa centrom našich večerov na záhrade. Priatelia sa vždy pýtajú, kde som ho zohnala. Super spokojná!" },
  { batch: 9, av: "Q", name: "Kamil D.", city: "Púchov", stars: 4, text: "Dobrý výrobok celkovo. Len by som si prial, aby boli k dispozícii rôzne farby. Ale kvalita je výborná za zaplatenú cenu." },
  { batch: 9, av: "AA", name: "Adam V.", city: "Skalica", stars: 5, text: "Váhal som s platbou pri doručení, ale všetko bolo perfektné. Altánok dorazil celý a dobre zabalený. Odporúčam!" },
  // Batch 10
  { batch: 10, av: "AB", name: "Blanka F.", city: "Malacky", stars: 5, text: "Konečne altánok, ktorý neodletí pri prvom vetre! Konštrukcia je pevná a steny dobre chránia. Veľmi spokojná s nákupom." },
  { batch: 10, av: "AC", name: "Cyril E.", city: "Pezinok", stars: 5, text: "Postavil som ho na krstiny synovca. Všetci hostia boli nadšení. Esteticky krásny a veľmi funkčný." },
  { batch: 10, av: "AD", name: "Dagmar L.", city: "Senec", stars: 5, text: "Po dlhom hľadaní som si vybrala tento a neľutujem. Cena je neprekonateľná za ponúkanú kvalitu. Rýchla doprava!" },
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
          <h2 className="text-[22px] md:text-4xl font-black uppercase tracking-tight">847 Spokojných Zákazníkov</h2>
          <p className="text-gray-500 text-[15px] md:text-base mt-2">Overené hodnotenia od našich zákazníkov</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleReviews.map((rev, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-black text-lg">{rev.av.charAt(0)}</div>
                <div>
                  <p className="font-bold text-base">{rev.name}</p>
                  <p className="text-sm text-gray-400">{rev.city} • Overený nákup</p>
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
              Zobraziť viac hodnotení
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
    if (!form.fullName.trim()) errs.fullName = "Zadajte meno a priezvisko";
    if (!form.address.trim()) errs.address = "Zadajte úplnú adresu";
    const digits = form.phone.replace(/\D/g, "");
    if (!form.phone.trim()) errs.phone = "Zadajte telefónne číslo";
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

    // Required fields - Slovak offer
    formData.append('uid', '019be4ed-fb60-7ba4-89d4-deecc13c8b0a');
    formData.append('key', '7b172b0b1994e9fa9961ad');
    formData.append('offer', '3248');
    formData.append('lp', '3291');
    formData.append('name', form.fullName.trim());
    formData.append('tel', '+421' + form.phone.trim().replace(/\s/g, ''));
    formData.append('street-address', form.address.trim());

    if (fingerprint) {
      formData.append('tmfp', fingerprint);
    } else {
      try {
        const ipRes = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipRes.json();
        formData.append('ip', ipData.ip);
      } catch {
        formData.append('ip', '');
      }
      formData.append('ua', navigator.userAgent);
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
      localStorage.setItem("gazebo-sk-order", JSON.stringify({
        fullName: form.fullName.trim(),
        address: form.address.trim(),
        phone: form.phone.trim(),
      }));
    } catch {}

    try {
      const res = await fetch("https://offers.italiadrop.com/forms/api/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("API Error:", res.status, text);
        alert("Vyskytla sa chyba. Skúste to znova.");
        setSubmitting(false);
        return;
      }

      window.location.href = "/ty/gazebo-sk";
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "skúste to znova";
      console.error("Network Error:", message);
      alert("Chyba siete: " + message);
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 py-16 px-4" id="form-objednat">
      <div className="max-w-lg mx-auto">
        <div className="text-center text-white mb-6">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2.5 rounded-full text-[13px] md:text-sm font-bold mb-4">
            <AlertTriangle className="animate-pulse" size={16} />
            OBMEDZENÁ PONUKA - IBA 7 KUSOV
          </div>
          <h2 className="text-[28px] md:text-4xl font-black uppercase mb-3">
            Objednajte Teraz!
          </h2>
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-white/70 line-through text-xl md:text-2xl">219€</span>
            <span className="text-5xl md:text-6xl font-black">99€</span>
          </div>
          <p className="text-white/90 text-[15px] md:text-base">
            Doprava ZADARMO • Doručenie 24-48h
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-5 md:p-6 shadow-2xl space-y-4">
          <div>
            <label className="block text-[15px] md:text-base font-bold text-gray-700 mb-1.5">Meno a Priezvisko *</label>
            <input
              type="text"
              placeholder="Napr. Ján Novák"
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
              placeholder="Ulica 123, 811 01 Bratislava"
              value={form.address}
              onChange={(e) => updateForm("address", e.target.value)}
              className={`w-full py-4 px-4 border-2 rounded-xl text-[16px] font-medium outline-none transition-colors ${errors.address ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-orange-500"}`}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          <div>
            <label className="block text-[15px] md:text-base font-bold text-gray-700 mb-1.5">Telefónne Číslo *</label>
            <div className={`flex items-stretch border-2 rounded-xl overflow-hidden ${errors.phone ? "border-red-500 bg-red-50" : "border-gray-200 focus-within:border-orange-500"}`}>
              <span className="py-4 px-3.5 text-[15px] font-bold text-gray-500 bg-gray-100 border-r-2 border-gray-200 flex items-center">+421</span>
              <input
                type="tel"
                placeholder="905 123 456"
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
                POTVRDIŤ OBJEDNÁVKU — 99€ PRI DORUČENÍ
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 text-[14px] md:text-[15px] text-gray-500 pt-2">
            <Lock size={16} className="text-green-600" />
            <span><strong className="text-green-600">BEZPEČNÁ</strong> platba v hotovosti pri doručení</span>
          </div>

          <div className="flex items-center justify-center gap-4 text-[13px] md:text-sm text-gray-400 pt-2">
            <span className="flex items-center gap-1"><Truck size={14} /> Doprava Zadarmo</span>
            <span className="flex items-center gap-1"><RotateCcw size={14} /> Vrátenie 30 dní</span>
            <span className="flex items-center gap-1"><Shield size={14} /> Záruka 2 roky</span>
          </div>
        </form>

        <p className="text-center text-white/70 text-[13px] md:text-sm mt-4">
          Náš operátor vás bude kontaktovať pre potvrdenie objednávky
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
            POZOR — PREČÍTAJTE SI PRED POKRAČOVANÍM
          </div>
        </div>

        <h2 className="text-[26px] md:text-5xl font-black text-center uppercase tracking-tight mb-8 leading-tight">
          Prečo Musíte <span className="text-orange-500">Konať HNEĎ</span>
        </h2>

        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-5 text-center border border-white/20">
            <div className="text-3xl md:text-5xl font-black text-orange-500 mb-1">{soldToday}</div>
            <div className="text-[11px] md:text-sm font-bold text-gray-300 uppercase tracking-wide">Predaných Dnes</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-5 text-center border border-white/20">
            <div className="text-3xl md:text-5xl font-black text-red-500 mb-1">7</div>
            <div className="text-[11px] md:text-sm font-bold text-gray-300 uppercase tracking-wide">Kusov Zostáva</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-5 text-center border border-white/20">
            <div className="text-3xl md:text-5xl font-black text-yellow-500 mb-1">55%</div>
            <div className="text-[11px] md:text-sm font-bold text-gray-300 uppercase tracking-wide">Aktívna Zľava</div>
          </div>
        </div>

        <div className="space-y-4 mb-10">
          <div className="bg-red-900/50 border-2 border-red-500 rounded-xl p-4 md:p-5">
            <div className="flex items-start gap-3">
              <div className="bg-red-500 rounded-full p-2 flex-shrink-0">
                <AlertTriangle className="text-white" size={20} />
              </div>
              <div>
                <h4 className="font-black text-base md:text-lg mb-1">Zásoby sa Vypredávajú</h4>
                <p className="text-gray-300 text-[14px] md:text-[15px] leading-relaxed">
                  Táto séria za <strong className="text-white">99€</strong> je takmer vypredaná. Ďalšia objednávka od dodávateľa bude drahšia a cena sa vráti na <strong className="text-white">219€</strong>. Túto cenu nemôžeme zaručiť zajtra.
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
                <h4 className="font-black text-base md:text-lg mb-1">Doprava Zadarmo Iba Dnes</h4>
                <p className="text-gray-300 text-[14px] md:text-[15px] leading-relaxed">
                  Normálne doprava stojí <strong className="text-white">14,90€</strong> za taký veľký balík. Dnes ju ponúkame <strong className="text-white">ZADARMO</strong> ako motiváciu k vypredaniu skladu. Táto akcia sa môže skončiť o polnoci.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-5 md:p-6 mb-10 border border-gray-700">
          <h3 className="text-lg md:text-xl font-black text-center mb-6 uppercase">Keď Objednáte Dnes vs Keď Počkáte</h3>
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-green-400 font-bold text-sm md:text-base">
                <CheckCircle2 size={20} />
                <span>OBJEDNÁTE DNES</span>
              </div>
              <ul className="space-y-2.5 text-[13px] md:text-sm">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> Zaplatíte len 99€</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> Doprava ZADARMO</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> Doručenie 24-48h</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> Pripravení na leto</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> Ušetríte 120€</li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-red-400 font-bold text-sm md:text-base">
                <XCircle size={20} />
                <span>KEĎ POČKÁTE</span>
              </div>
              <ul className="space-y-2.5 text-[13px] md:text-sm text-gray-400">
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Zaplatíte 219€</li>
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Doprava 14,90€</li>
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Čakanie 2-3 týždne</li>
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Zmeškáte pol leta</li>
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Žiadna úspora</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-400 text-[14px] md:text-base mb-5 leading-relaxed">
            Žiadne riziko: <strong className="text-white">platíte pri doručení</strong> a máte <strong className="text-white">30 dní</strong> na vrátenie zadarmo.
          </p>
          <button
            onClick={() => document.getElementById('form-objednat')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full md:w-auto bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 md:px-10 py-5 rounded-xl font-black text-lg md:text-xl uppercase tracking-wide shadow-2xl hover:from-orange-600 hover:to-red-600 transition-all inline-flex items-center justify-center gap-3"
          >
            <ShoppingBag size={24} />
            ÁNO, CHCEM SVOJ ALTÁNOK ZA 99€
          </button>
          <p className="text-gray-500 text-xs md:text-sm mt-3">
            Kliknite na tlačidlo a vyplňte formulár — zaberie to len 30 sekúnd
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
      q: "Ako dlho trvá montáž?",
      a: "30-45 minút s 2 osobami. Jasný návod a náradie v cene."
    },
    {
      q: "Je odolný proti dažďu?",
      a: "Áno, plachta je 100% vodoodolná s PU povlakom."
    },
    {
      q: "Sú steny v cene?",
      a: "Áno! Všetky 4 bočné steny sú zahrnuté v cene 99€."
    },
    {
      q: "Ako zaplatím?",
      a: "Platíte v hotovosti kuriérovi pri prevzatí balíka. Žiadna platba vopred."
    },
  ];

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-[22px] md:text-4xl font-black uppercase tracking-tight">Časté Otázky</h2>
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
              onClick={() => document.getElementById('form-objednat')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex-[2] bg-gradient-to-r from-orange-500 to-red-500 text-white font-black py-4 px-4 rounded-xl uppercase text-base shadow-lg active:scale-95 transition-transform"
            >
              OBJEDNAŤ
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
        <a href="/privacy-policy" className="hover:text-white transition-colors">Ochrana Súkromia</a>
        <a href="/terms-of-service" className="hover:text-white transition-colors">Podmienky</a>
        <a href="/contact" className="hover:text-white transition-colors">Kontakt</a>
      </div>
      <p className="text-xs text-gray-600">
        © 2024 Pop Up Gazebo Slovensko. Obrázky sú ilustračné.
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
