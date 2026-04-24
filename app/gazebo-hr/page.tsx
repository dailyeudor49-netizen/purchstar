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
 * POP UP GAZEBO — 3x3m Dvostruki Krov
 * Landing Page za Facebook Ads - Agresivni Marketing - HRVATSKA
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
          <span className="font-black text-sm md:text-base uppercase tracking-wide">LJETNA AKCIJA - POSLJEDNJI KOMADI!</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-300">Ponuda završava za:</span>
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
      <span className="text-red-700 font-black text-base">PAŽNJA: Samo 7 komada na zalihama!</span>
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
      <span><strong className="text-black">{Math.max(15, viewers)}</strong> osoba trenutno gleda ovaj proizvod</span>
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
        Naruči -55%
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
                LJETNA AKCIJA
              </span>
            </div>

            <h1 className="text-[28px] md:text-4xl font-black leading-tight uppercase tracking-tight text-gray-900">
              Pop Up Gazebo 3x3m<br />
              <span className="text-orange-600">Dvostruki Krov + 4 Bočne Stijene</span>
            </h1>

            <p className="text-[17px] md:text-lg text-gray-600 leading-relaxed">
              Premium čelična konstrukcija, vodootporna cerada s UV zaštitom i odvojive bočne stijene uključene u cijenu.
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
                UŠTEDITE 120€ — SAMO DANAS!
              </span>
            </div>
            <div className="flex items-center justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} size={22} fill="currentColor" className="text-yellow-500" />)}
              <span className="font-bold text-sm ml-2">4.9/5</span>
              <span className="text-gray-500 text-sm">(847 recenzija)</span>
            </div>
            <StockCounter />
          </div>

          {/* Live Viewers */}
          <LiveViewers />

          {/* Bullet Points */}
          <ul className="space-y-2.5">
            {[
              { icon: Ruler, text: "3x3 Metra — Prostor za 8-10 osoba" },
              { icon: Layers, text: "Dvostruki Ventilirani Krov — Hladno i pri 40°C" },
              { icon: Droplets, text: "100% Vodootporno — Potpuna zaštita" },
              { icon: Wind, text: "4 Bočne Stijene Uključene" },
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
              NARUČI — PLAĆANJE PRI DOSTAVI
            </button>
            <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-500">
              <Lock size={14} />
              <span>Sigurno plaćanje gotovinom pri dostavi</span>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-gray-100 p-3 rounded-xl text-center">
              <Truck className="mx-auto mb-1 text-orange-600" size={22} />
              <p className="text-[11px] font-bold text-gray-700">Dostava<br />BESPLATNO</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-xl text-center">
              <RotateCcw className="mx-auto mb-1 text-orange-600" size={22} />
              <p className="text-[11px] font-bold text-gray-700">Povrat<br />30 Dana</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-xl text-center">
              <Shield className="mx-auto mb-1 text-orange-600" size={22} />
              <p className="text-[11px] font-bold text-gray-700">Jamstvo<br />2 Godine</p>
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
            <span className="font-bold text-sm flex items-center gap-2"><Truck size={16} /> EKSPRESNA DOSTAVA 24-48H</span>
            <span className="font-bold text-sm flex items-center gap-2"><Shield size={16} /> 2 GODINE JAMSTVA</span>
            <span className="font-bold text-sm flex items-center gap-2"><RotateCcw size={16} /> BESPLATAN POVRAT</span>
            <span className="font-bold text-sm flex items-center gap-2"><ThumbsUp size={16} /> +5.000 KUPACA</span>
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
          Dosta Vam Je Sjedenja U Kući Ljeti?
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
              "Žareće sunce koje onemogućuje boravak vani",
              "Iznenadne oluje kvare slavlja i roštilj",
              "Nema privatnosti od susjeda",
              "Vrtni namještaj uništen vremenom",
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
              "Ugodan hlad i pri 40°C",
              "Potpuna zaštita od kiše",
              "Privatnost zahvaljujući bočnim stijenama",
              "Uživajte u vrtu cijelu godinu",
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
      title: "Dvostruki Ventilirani Krov",
      desc: "Do 10°C hladnije nego u običnim sjenicama.",
      img: "/images/gazebo/1.jpg",
    },
    {
      title: "Vodootporna Cerada",
      desc: "Poliester 180g/m² s PU premazom. 100% vodootporno.",
      img: "/images/gazebo/2.jpg",
    },
    {
      title: "Premium Čelik",
      desc: "Praškasto lakiran protiv hrđe. Izdržava vjetar do 50 km/h.",
      img: "/images/gazebo/3.jpg",
    },
    {
      title: "4 Stijene Uključene",
      desc: "Privatnost i zaštita od vjetra. Montaža za 30 sekundi.",
      img: "/images/gazebo/4.jpg",
    },
    {
      title: "Jednostavna Montaža",
      desc: "2 osobe, 30 minuta. Sve uključeno u pakiranju.",
      img: "/images/gazebo/5.jpg",
    },
    {
      title: "Elegantan Dizajn",
      desc: "Bež boja koja se uklapa u svaki vrt.",
      img: "/images/gazebo/6.jpg",
    },
  ];

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
            Zašto Odabrati <span className="text-orange-600">Pop Up Gazebo</span>
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
          Tehničke Specifikacije
        </h2>
      </div>

      <div className="bg-gray-800 rounded-2xl p-5 md:p-6">
        <div className="grid grid-cols-2 gap-4 md:gap-5">
          {[
            { label: "Dimenzije", value: "3m x 3m x 2.65m" },
            { label: "Površina", value: "9 m²" },
            { label: "Konstrukcija", value: "Lakirani čelik" },
            { label: "Cerada", value: "Poliester 180g/m²" },
            { label: "Vodootpornost", value: "100%" },
            { label: "UV Zaštita", value: "UPF 50+" },
            { label: "Kapacitet", value: "8-10 osoba" },
            { label: "Bočne Stijene", value: "4 uključene" },
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
  { batch: 1, av: "M", name: "Marko B.", city: "Zagreb", stars: 5, text: "Postavio sam ga za 40 minuta sa suprugom. Nevjerojatna kvaliteta za ovu cijenu, mislio sam da ću dobiti jeftine materijale, ali konstrukcija je stvarno čvrsta. Dvostruki krov je genijalan!" },
  { batch: 1, av: "J", name: "Jelena S.", city: "Split", stars: 5, text: "Već je preživio dvije jake oluje bez jedne kapi vode. Bočne stijene su super praktične kad su susjedi u vrtu. Toplo preporučujem!" },
  { batch: 1, av: "P", name: "Petar F.", city: "Rijeka", stars: 5, text: "Za 99€ je to poklon! Vidio sam ga u trgovini gotovo za dvostruku cijenu. Stigao je za 2 dana, montaža jednostavna. Sad uvijek ručamo pod sjeenicom." },
  // Batch 2
  { batch: 2, av: "L", name: "Lucija R.", city: "Osijek", stars: 5, text: "Imali smo sinov rođendan pod sjenicom. 15 djece sigurno od sunca! Stabilna konstrukcija, elegantna boja koja se uklapa u naš vrt." },
  { batch: 2, av: "T", name: "Tomislav D.", city: "Zadar", stars: 5, text: "Tražio sam sjenicu s bočnim stijenama uključenim u cijenu, drugdje ih prodaju zasebno za 50€ više. Ovdje je sve bilo u cijeni. Premium kvaliteta!" },
  { batch: 2, av: "K", name: "Katarina M.", city: "Pula", stars: 5, text: "Dvostruki krov stvarno čini razliku. Uvijek je svjež zrak čak i u 14 sati popodne. Postavljeno za manje od sat vremena, rezultat je spektakularan!" },
  // Batch 3
  { batch: 3, av: "R", name: "Robert C.", city: "Slavonski Brod", stars: 5, text: "Treća sjenica koju kupujem u 5 godina, prve dvije sam bacio nakon jedne sezone. Ova izgleda kao da će izdržati: jaki čelik, otporna cerada, savršeni šavovi." },
  { batch: 3, av: "E", name: "Eva L.", city: "Karlovac", stars: 5, text: "Koristim je kao kutak za čitanje i jutarnju kavu. Sa spuštenim stijenama to je moj mali raj. Odličan omjer cijene i kvalitete!" },
  { batch: 3, av: "D", name: "Davor P.", city: "Varaždin", stars: 5, text: "Sumnjao sam zbog niske cijene, naručio sam spreman za povrat. Ali prevario sam se: top kvaliteta, brza dostava, jednostavna montaža. 5 zvjezdica zasluženih." },
  // Batch 4
  { batch: 4, av: "V", name: "Vesna T.", city: "Šibenik", stars: 5, text: "Konačno mogu doručkovati u vrtu bez umiranja od vrućine! Sjenica je stigla dobro zapakirana, nijedan dio oštećen. Toplo preporučujem." },
  { batch: 4, av: "O", name: "Ognjen M.", city: "Dubrovnik", stars: 5, text: "Kupio sam je za nedjeljni roštilj. Već je preživjela 3 ljetne oluje bez problema. Moji prijatelji su bili oduševljeni kvalitetom." },
  { batch: 4, av: "A", name: "Ana G.", city: "Bjelovar", stars: 5, text: "Kod nas je ljeti sunce vrlo jako. Dvostruki krov održava prostor hladnim. Bočne stijene savršene za privatnost. Odličan kupovina!" },
  // Batch 5
  { batch: 5, av: "F", name: "Filip F.", city: "Koprivnica", stars: 5, text: "Postavio sam sjenicu sam za otprilike 50 minuta prema uputama. Stabilna konstrukcija, kvalitetna cerada. Za ovu cijenu nema bolje." },
  { batch: 5, av: "I", name: "Ivana R.", city: "Čakovec", stars: 4, text: "Odličan proizvod, samo upute su mogle biti jasnije. Ali na kraju sve savršeno postavljeno. Sjenica je prekrasna i funkcionalna." },
  { batch: 5, av: "H", name: "Hrvoje B.", city: "Sisak", stars: 5, text: "Kupio sam je za kćerkino vjenčanje u vrtu. Elegantna, prostrana, zaštitila goste od srpanjskog sunca. Novac vrlo dobro potrošen!" },
  // Batch 6
  { batch: 6, av: "B", name: "Barbara C.", city: "Vukovar", stars: 5, text: "Koristim je svaki dan za rad na računalu vani. S WiFi-jem i sjenicom imam svoj ured u vrtu. Genijalno!" },
  { batch: 6, av: "G", name: "Goran L.", city: "Požega", stars: 5, text: "Tražio sam nešto čvrsto što će izdržati. Nakon 6 mjeseci intenzivne upotrebe mogu reći da je ovo odličan proizvod. Nikakvih problema." },
  { batch: 6, av: "N", name: "Nikolina V.", city: "Vinkovci", stars: 5, text: "Plaćanje pri dostavi vrlo praktično, nikakav rizik. Kurir je bio točan. Sjenica je točno kao na slikama, zapravo još bolja!" },
  // Batch 7
  { batch: 7, av: "U", name: "Uroš Z.", city: "Samobor", stars: 5, text: "Fantastično! Koristim je za večere vani s prijateljima. Kvaliteta je zaista vrhunska, cerada izgleda vrlo izdržljivo. Odličan kupovina!" },
  { batch: 7, av: "Z", name: "Zdravka N.", city: "Velika Gorica", stars: 5, text: "Moja stara sjenica se slomila nakon jedne godine. Ova izgleda puno čvršće. Bočne stijene su nevjerojatan plus za ovu cijenu." },
  { batch: 7, av: "C", name: "Cvjetko S.", city: "Đakovo", stars: 5, text: "Savršena za naš vrt! Montaža vrlo jednostavna, u dvoje nam je trebalo pola sata. Bež boja je elegantna i uklapa se u sve." },
  // Batch 8
  { batch: 8, av: "W", name: "Vladimir M.", city: "Križevci", stars: 5, text: "Kod nas je ljeti jako vruće. Dvostruki krov održava prostor hladnim! Brza dostava i proizvod odgovara opisu." },
  { batch: 8, av: "X", name: "Kristina P.", city: "Virovitica", stars: 5, text: "Uspoređivala sam mnogo sjenica online, ova je imala najbolji omjer kvalitete i cijene. Nisam bila razočarana, naprotiv! Čvrsta i lijepa konstrukcija." },
  { batch: 8, av: "Y", name: "Jakov C.", city: "Gospić", stars: 5, text: "Koristim je čak i zimi za zaštitu vrtnog namještaja. 100% vodootporno, testirao sam pri jakoj kiši. Nikakvih curenja!" },
  // Batch 9
  { batch: 9, av: "S", name: "Sanja A.", city: "Ogulin", stars: 5, text: "Kupila sam je za ljeto, postala je središte naših večeri u vrtu. Prijatelji uvijek pitaju gdje sam je nabavila. Super zadovoljna!" },
  { batch: 9, av: "Q", name: "Krešimir D.", city: "Ivanec", stars: 4, text: "Dobar proizvod općenito. Samo bih želio da su dostupne različite boje. Ali kvaliteta je izvrsna za plaćenu cijenu." },
  { batch: 9, av: "AA", name: "Ante V.", city: "Makarska", stars: 5, text: "Oklijevao sam s plaćanjem pri dostavi, ali sve je bilo savršeno. Sjenica je stigla cijela i dobro zapakirana. Preporučujem!" },
  // Batch 10
  { batch: 10, av: "AB", name: "Blanka F.", city: "Trogir", stars: 5, text: "Konačno sjenica koja ne odleti pri prvom vjetru! Konstrukcija je čvrsta i stijene dobro štite. Vrlo zadovoljna kupnjom." },
  { batch: 10, av: "AC", name: "Čedomir E.", city: "Sinj", stars: 5, text: "Postavio sam je za krštenje nećaka. Svi gosti su bili oduševljeni. Estetski prekrasna i vrlo funkcionalna." },
  { batch: 10, av: "AD", name: "Darija L.", city: "Metković", stars: 5, text: "Nakon dugog traženja odabrala sam ovu i ne žalim. Cijena je nenadmašna za ponuđenu kvalitetu. Brza dostava!" },
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
          <h2 className="text-[22px] md:text-4xl font-black uppercase tracking-tight">847 Zadovoljnih Kupaca</h2>
          <p className="text-gray-500 text-[15px] md:text-base mt-2">Provjerene recenzije naših kupaca</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleReviews.map((rev, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-black text-lg">{rev.av.charAt(0)}</div>
                <div>
                  <p className="font-bold text-base">{rev.name}</p>
                  <p className="text-sm text-gray-400">{rev.city} • Verificirana kupnja</p>
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
              Prikaži više recenzija
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
    if (!form.fullName.trim()) errs.fullName = "Unesite ime i prezime";
    if (!form.address.trim()) errs.address = "Unesite potpunu adresu";
    const digits = form.phone.replace(/\D/g, "");
    if (!form.phone.trim()) errs.phone = "Unesite telefonski broj";
    else if (digits.length < 7) errs.phone = "Nevažeći broj";
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

    // Required fields - Croatian offer
    formData.append('uid', '019be4ed-fb60-7ba4-89d4-deecc13c8b0a');
    formData.append('key', '7b172b0b1994e9fa9961ad');
    formData.append('offer', '3255');
    formData.append('lp', '3302');
    formData.append('name', form.fullName.trim());
    formData.append('tel', '+385' + form.phone.trim().replace(/\s/g, ''));
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
      localStorage.setItem("gazebo-hr-order", JSON.stringify({
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
        alert("Došlo je do greške. Pokušajte ponovo.");
        setSubmitting(false);
        return;
      }

      window.location.href = "/ty/gazebo-hr";
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "pokušajte ponovo";
      console.error("Network Error:", message);
      alert("Greška mreže: " + message);
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 py-16 px-4" id="form-objednat">
      <div className="max-w-lg mx-auto">
        <div className="text-center text-white mb-6">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2.5 rounded-full text-[13px] md:text-sm font-bold mb-4">
            <AlertTriangle className="animate-pulse" size={16} />
            OGRANIČENA PONUDA - SAMO 7 KOMADA
          </div>
          <h2 className="text-[28px] md:text-4xl font-black uppercase mb-3">
            Naručite Sada!
          </h2>
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-white/70 line-through text-xl md:text-2xl">219€</span>
            <span className="text-5xl md:text-6xl font-black">99€</span>
          </div>
          <p className="text-white/90 text-[15px] md:text-base">
            Dostava BESPLATNO • Isporuka 24-48h
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-5 md:p-6 shadow-2xl space-y-4">
          <div>
            <label className="block text-[15px] md:text-base font-bold text-gray-700 mb-1.5">Ime i Prezime *</label>
            <input
              type="text"
              placeholder="Npr. Ivan Horvat"
              value={form.fullName}
              onChange={(e) => updateForm("fullName", e.target.value)}
              className={`w-full py-4 px-4 border-2 rounded-xl text-[16px] font-medium outline-none transition-colors ${errors.fullName ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-orange-500"}`}
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-[15px] md:text-base font-bold text-gray-700 mb-1.5">Potpuna Adresa *</label>
            <input
              type="text"
              placeholder="Ulica 123, 10000 Zagreb"
              value={form.address}
              onChange={(e) => updateForm("address", e.target.value)}
              className={`w-full py-4 px-4 border-2 rounded-xl text-[16px] font-medium outline-none transition-colors ${errors.address ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-orange-500"}`}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          <div>
            <label className="block text-[15px] md:text-base font-bold text-gray-700 mb-1.5">Telefonski Broj *</label>
            <div className={`flex items-stretch border-2 rounded-xl overflow-hidden ${errors.phone ? "border-red-500 bg-red-50" : "border-gray-200 focus-within:border-orange-500"}`}>
              <span className="py-4 px-3.5 text-[15px] font-bold text-gray-500 bg-gray-100 border-r-2 border-gray-200 flex items-center">+385</span>
              <input
                type="tel"
                placeholder="91 234 5678"
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
                POTVRDITE NARUDŽBU — 99€ PRI DOSTAVI
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 text-[14px] md:text-[15px] text-gray-500 pt-2">
            <Lock size={16} className="text-green-600" />
            <span><strong className="text-green-600">SIGURNO</strong> plaćanje gotovinom pri dostavi</span>
          </div>

          <div className="flex items-center justify-center gap-4 text-[13px] md:text-sm text-gray-400 pt-2">
            <span className="flex items-center gap-1"><Truck size={14} /> Dostava Besplatno</span>
            <span className="flex items-center gap-1"><RotateCcw size={14} /> Povrat 30 dana</span>
            <span className="flex items-center gap-1"><Shield size={14} /> Jamstvo 2 godine</span>
          </div>
        </form>

        <p className="text-center text-white/70 text-[13px] md:text-sm mt-4">
          Naš operater će vas kontaktirati radi potvrde narudžbe
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
            PAŽNJA — PROČITAJTE PRIJE NEGO NASTAVITE
          </div>
        </div>

        <h2 className="text-[26px] md:text-5xl font-black text-center uppercase tracking-tight mb-8 leading-tight">
          Zašto Morate <span className="text-orange-500">Djelovati ODMAH</span>
        </h2>

        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-5 text-center border border-white/20">
            <div className="text-3xl md:text-5xl font-black text-orange-500 mb-1">{soldToday}</div>
            <div className="text-[11px] md:text-sm font-bold text-gray-300 uppercase tracking-wide">Prodano Danas</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-5 text-center border border-white/20">
            <div className="text-3xl md:text-5xl font-black text-red-500 mb-1">7</div>
            <div className="text-[11px] md:text-sm font-bold text-gray-300 uppercase tracking-wide">Komada Preostalo</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-5 text-center border border-white/20">
            <div className="text-3xl md:text-5xl font-black text-yellow-500 mb-1">55%</div>
            <div className="text-[11px] md:text-sm font-bold text-gray-300 uppercase tracking-wide">Aktivni Popust</div>
          </div>
        </div>

        <div className="space-y-4 mb-10">
          <div className="bg-red-900/50 border-2 border-red-500 rounded-xl p-4 md:p-5">
            <div className="flex items-start gap-3">
              <div className="bg-red-500 rounded-full p-2 flex-shrink-0">
                <AlertTriangle className="text-white" size={20} />
              </div>
              <div>
                <h4 className="font-black text-base md:text-lg mb-1">Zalihe Se Rasprodaju</h4>
                <p className="text-gray-300 text-[14px] md:text-[15px] leading-relaxed">
                  Ova serija za <strong className="text-white">99€</strong> je gotovo rasprodana. Sljedeća narudžba od dobavljača bit će skuplja i cijena će se vratiti na <strong className="text-white">219€</strong>. Ovu cijenu ne možemo garantirati sutra.
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
                <h4 className="font-black text-base md:text-lg mb-1">Besplatna Dostava Samo Danas</h4>
                <p className="text-gray-300 text-[14px] md:text-[15px] leading-relaxed">
                  Inače dostava košta <strong className="text-white">14,90€</strong> za tako veliki paket. Danas je nudimo <strong className="text-white">BESPLATNO</strong> kao poticaj za rasprodaju skladišta. Ova akcija može završiti u ponoć.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-5 md:p-6 mb-10 border border-gray-700">
          <h3 className="text-lg md:text-xl font-black text-center mb-6 uppercase">Kad Naručite Danas vs Kad Pričekate</h3>
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-green-400 font-bold text-sm md:text-base">
                <CheckCircle2 size={20} />
                <span>NARUČITE DANAS</span>
              </div>
              <ul className="space-y-2.5 text-[13px] md:text-sm">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> Platite samo 99€</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> Dostava BESPLATNO</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> Isporuka 24-48h</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> Spremni za ljeto</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> Uštedite 120€</li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-red-400 font-bold text-sm md:text-base">
                <XCircle size={20} />
                <span>KAD PRIČEKATE</span>
              </div>
              <ul className="space-y-2.5 text-[13px] md:text-sm text-gray-400">
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Platite 219€</li>
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Dostava 14,90€</li>
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Čekanje 2-3 tjedna</li>
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Propustite pola ljeta</li>
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Nikakva ušteda</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-400 text-[14px] md:text-base mb-5 leading-relaxed">
            Nikakav rizik: <strong className="text-white">plaćate pri dostavi</strong> i imate <strong className="text-white">30 dana</strong> za besplatan povrat.
          </p>
          <button
            onClick={() => document.getElementById('form-objednat')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full md:w-auto bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 md:px-10 py-5 rounded-xl font-black text-lg md:text-xl uppercase tracking-wide shadow-2xl hover:from-orange-600 hover:to-red-600 transition-all inline-flex items-center justify-center gap-3"
          >
            <ShoppingBag size={24} />
            DA, ŽELIM SVOJU SJENICU ZA 99€
          </button>
          <p className="text-gray-500 text-xs md:text-sm mt-3">
            Kliknite na gumb i ispunite obrazac — traje samo 30 sekundi
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
      q: "Koliko traje montaža?",
      a: "30-45 minuta s 2 osobe. Jasne upute i alat uključeni."
    },
    {
      q: "Je li otporan na kišu?",
      a: "Da, cerada je 100% vodootporna s PU premazom."
    },
    {
      q: "Jesu li stijene uključene?",
      a: "Da! Sve 4 bočne stijene uključene su u cijenu od 99€."
    },
    {
      q: "Kako plaćam?",
      a: "Plaćate gotovinom kuriru pri preuzimanju paketa. Nikakvo plaćanje unaprijed."
    },
  ];

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-[22px] md:text-4xl font-black uppercase tracking-tight">Česta Pitanja</h2>
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
              NARUČI
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
        <a href="/privacy-policy" className="hover:text-white transition-colors">Politika Privatnosti</a>
        <a href="/terms-of-service" className="hover:text-white transition-colors">Uvjeti Korištenja</a>
        <a href="/contact" className="hover:text-white transition-colors">Kontakt</a>
      </div>
      <p className="text-xs text-gray-600">
        © 2024 Pop Up Gazebo Hrvatska. Slike su ilustrativne.
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
