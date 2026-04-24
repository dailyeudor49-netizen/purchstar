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
 * POP UP GAZEBO — 3x3m Podwójny Dach
 * Landing Page dla Facebook Ads - Agresywny Marketing - POLSKA
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
          <span className="font-black text-sm md:text-base uppercase tracking-wide">LETNIA PROMOCJA - OSTATNIE SZTUKI!</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-300">Oferta kończy się za:</span>
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
      <span className="text-red-700 font-black text-base">UWAGA: Tylko 7 sztuk w magazynie!</span>
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
      <span><strong className="text-black">{Math.max(15, viewers)}</strong> osób ogląda teraz ten produkt</span>
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
        Zamów -55%
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
                LETNIA PROMOCJA
              </span>
            </div>

            <h1 className="text-[28px] md:text-4xl font-black leading-tight uppercase tracking-tight text-gray-900">
              Pop Up Gazebo 3x3m<br />
              <span className="text-orange-600">Podwójny Dach + 4 Ścianki Boczne</span>
            </h1>

            <p className="text-[17px] md:text-lg text-gray-600 leading-relaxed">
              Konstrukcja ze stali premium, wodoodporny materiał z ochroną UV oraz zdejmowane ścianki boczne w cenie.
            </p>
          </div>

          {/* BIG PRICE */}
          <div className="bg-gradient-to-r from-orange-50 via-yellow-50 to-orange-50 p-5 rounded-2xl border-2 border-orange-300 shadow-lg">
            <div className="flex items-center justify-center gap-4 mb-2">
              <span className="text-gray-400 line-through text-2xl font-bold">949 zł</span>
              <div className="relative">
                <span className="text-5xl md:text-6xl font-black text-orange-600">427 zł</span>
              </div>
            </div>
            <div className="text-center mb-3">
              <span className="bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-black inline-block">
                OSZCZĘDZASZ 522 zł — TYLKO DZIŚ!
              </span>
            </div>
            <div className="flex items-center justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} size={22} fill="currentColor" className="text-yellow-500" />)}
              <span className="font-bold text-sm ml-2">4.9/5</span>
              <span className="text-gray-500 text-sm">(847 opinii)</span>
            </div>
            <StockCounter />
          </div>

          {/* Live Viewers */}
          <LiveViewers />

          {/* Bullet Points */}
          <ul className="space-y-2.5">
            {[
              { icon: Ruler, text: "3x3 Metry — Miejsce dla 8-10 osób" },
              { icon: Layers, text: "Podwójny Wentylowany Dach — Chłodno nawet przy 40°C" },
              { icon: Droplets, text: "100% Wodoodporny — Pełna ochrona" },
              { icon: Wind, text: "4 Ścianki Boczne W Cenie" },
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
              ZAMÓW — PŁATNOŚĆ PRZY DOSTAWIE
            </button>
            <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-500">
              <Lock size={14} />
              <span>Bezpieczna płatność gotówką przy dostawie</span>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-gray-100 p-3 rounded-xl text-center">
              <Truck className="mx-auto mb-1 text-orange-600" size={22} />
              <p className="text-[11px] font-bold text-gray-700">Wysyłka<br />GRATIS</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-xl text-center">
              <RotateCcw className="mx-auto mb-1 text-orange-600" size={22} />
              <p className="text-[11px] font-bold text-gray-700">Zwrot<br />30 Dni</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-xl text-center">
              <Shield className="mx-auto mb-1 text-orange-600" size={22} />
              <p className="text-[11px] font-bold text-gray-700">Gwarancja<br />2 Lata</p>
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
            <span className="font-bold text-sm flex items-center gap-2"><Truck size={16} /> EKSPRESOWA DOSTAWA 24-48H</span>
            <span className="font-bold text-sm flex items-center gap-2"><Shield size={16} /> 2 LATA GWARANCJI</span>
            <span className="font-bold text-sm flex items-center gap-2"><RotateCcw size={16} /> ZWROT GRATIS</span>
            <span className="font-bold text-sm flex items-center gap-2"><ThumbsUp size={16} /> +5.000 KLIENTÓW</span>
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
          Masz Dość Siedzenia W Domu Latem?
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Problems */}
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="text-lg md:text-xl font-black text-red-600 mb-4 flex items-center gap-2">
            <XCircle size={24} /> BEZ POP UP GAZEBO
          </h3>
          <ul className="space-y-3">
            {[
              "Palące słońce uniemożliwiające przebywanie na zewnątrz",
              "Nagłe burze psujące imprezy i grillowanie",
              "Brak prywatności przed sąsiadami",
              "Meble ogrodowe niszczone przez pogodę",
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
            <CheckCircle2 size={24} /> Z POP UP GAZEBO
          </h3>
          <ul className="space-y-3">
            {[
              "Przyjemny cień nawet przy 40°C",
              "Pełna ochrona przed deszczem",
              "Prywatność dzięki ściankom bocznym",
              "Ciesz się ogrodem przez cały rok",
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
      title: "Podwójny Wentylowany Dach",
      desc: "Nawet o 10°C chłodniej niż w zwykłych altanach.",
      img: "/images/gazebo/1.jpg",
    },
    {
      title: "Wodoodporny Materiał",
      desc: "Poliester 180g/m² z powłoką PU. 100% wodoodporny.",
      img: "/images/gazebo/2.jpg",
    },
    {
      title: "Stal Premium",
      desc: "Malowana proszkowo, odporna na rdzę. Wytrzymuje wiatr do 50 km/h.",
      img: "/images/gazebo/3.jpg",
    },
    {
      title: "4 Ścianki W Cenie",
      desc: "Prywatność i ochrona przed wiatrem. Montaż w 30 sekund.",
      img: "/images/gazebo/4.jpg",
    },
    {
      title: "Łatwy Montaż",
      desc: "2 osoby, 30 minut. Wszystko w zestawie.",
      img: "/images/gazebo/5.jpg",
    },
    {
      title: "Elegancki Design",
      desc: "Beżowy kolor pasujący do każdego ogrodu.",
      img: "/images/gazebo/6.jpg",
    },
  ];

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
            Dlaczego Wybrać <span className="text-orange-600">Pop Up Gazebo</span>
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
          Specyfikacja Techniczna
        </h2>
      </div>

      <div className="bg-gray-800 rounded-2xl p-5 md:p-6">
        <div className="grid grid-cols-2 gap-4 md:gap-5">
          {[
            { label: "Wymiary", value: "3m x 3m x 2.65m" },
            { label: "Powierzchnia", value: "9 m²" },
            { label: "Konstrukcja", value: "Lakierowana stal" },
            { label: "Materiał", value: "Poliester 180g/m²" },
            { label: "Wodoodporność", value: "100%" },
            { label: "Ochrona UV", value: "UPF 50+" },
            { label: "Pojemność", value: "8-10 osób" },
            { label: "Ścianki Boczne", value: "4 w cenie" },
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
  { batch: 1, av: "M", name: "Marek B.", city: "Warszawa", stars: 5, text: "Rozłożyłem go w 40 minut z żoną. Niesamowita jakość za tę cenę, myślałem, że dostanę tanie materiały, ale konstrukcja jest naprawdę solidna. Podwójny dach to geniusz!" },
  { batch: 1, av: "J", name: "Joanna S.", city: "Kraków", stars: 5, text: "Przetrwał już dwie silne burze bez jednej kropli wody. Ścianki boczne są super praktyczne, gdy sąsiedzi są w ogrodzie. Bardzo polecam!" },
  { batch: 1, av: "P", name: "Piotr F.", city: "Łódź", stars: 5, text: "Za 427 zł to prezent! Widziałem go w sklepie za prawie dwukrotnie więcej. Dotarł w 2 dni, montaż prosty. Teraz zawsze jemy obiad pod altaną." },
  // Batch 2
  { batch: 2, av: "L", name: "Lucyna R.", city: "Wrocław", stars: 5, text: "Zorganizowaliśmy urodziny syna pod altaną. 15 dzieci bezpiecznych przed słońcem! Stabilna konstrukcja, elegancki kolor pasujący do naszego ogrodu." },
  { batch: 2, av: "T", name: "Tomasz D.", city: "Poznań", stars: 5, text: "Szukałem altany ze ściankami bocznymi w cenie, gdzie indziej sprzedają je osobno za 200 zł więcej. Tu wszystko było w cenie. Jakość premium!" },
  { batch: 2, av: "K", name: "Katarzyna M.", city: "Gdańsk", stars: 5, text: "Podwójny dach naprawdę robi różnicę. Zawsze jest tam świeże powietrze nawet o 14:00. Zmontowane w mniej niż godzinę, efekt spektakularny!" },
  // Batch 3
  { batch: 3, av: "R", name: "Robert C.", city: "Szczecin", stars: 5, text: "Trzecia altana, którą kupuję w 5 lat, pierwsze dwie wyrzuciłem po jednym sezonie. Ta wygląda, że wytrzyma: mocna stal, wytrzymały materiał, idealne szwy." },
  { batch: 3, av: "E", name: "Ewa L.", city: "Bydgoszcz", stars: 5, text: "Używam jej jako kącika do czytania i porannej kawy. Z opuszczonymi ściankami to mój mały raj. Świetny stosunek jakości do ceny!" },
  { batch: 3, av: "D", name: "Dawid P.", city: "Lublin", stars: 5, text: "Wątpiłem z powodu niskiej ceny, zamówiłem gotowy na zwrot. Ale się myliłem: top jakość, szybka dostawa, łatwy montaż. 5 gwiazdek zasłużonych." },
  // Batch 4
  { batch: 4, av: "V", name: "Weronika T.", city: "Białystok", stars: 5, text: "Nareszcie mogę jeść śniadanie w ogrodzie bez umierania z gorąca! Altana dotarła dobrze zapakowana, żaden element uszkodzony. Bardzo polecam." },
  { batch: 4, av: "O", name: "Oskar M.", city: "Katowice", stars: 5, text: "Kupiłem ją na niedzielne grillowanie. Przetrwała już 3 letnie burze bez problemów. Moi przyjaciele byli zachwyceni jakością." },
  { batch: 4, av: "A", name: "Anna G.", city: "Częstochowa", stars: 5, text: "U nas latem słońce jest bardzo silne. Podwójny dach utrzymuje przestrzeń chłodną. Ścianki boczne idealne dla prywatności. Świetny zakup!" },
  // Batch 5
  { batch: 5, av: "F", name: "Filip F.", city: "Radom", stars: 5, text: "Rozłożyłem altanę sam w około 50 minut według instrukcji. Stabilna konstrukcja, jakościowy materiał. Za tę cenę nie ma lepszej." },
  { batch: 5, av: "I", name: "Iwona R.", city: "Toruń", stars: 4, text: "Doskonały produkt, tylko instrukcja mogłaby być jaśniejsza. Ale ostatecznie wszystko zmontowane perfekcyjnie. Altana jest piękna i funkcjonalna." },
  { batch: 5, av: "H", name: "Hubert B.", city: "Kielce", stars: 5, text: "Kupiłem ją na ślub córki w ogrodzie. Elegancka, przestronna, ochroniła gości przed lipcowym słońcem. Pieniądze bardzo dobrze wydane!" },
  // Batch 6
  { batch: 6, av: "B", name: "Barbara C.", city: "Rzeszów", stars: 5, text: "Używam jej codziennie do pracy przy komputerze na zewnątrz. Z WiFi i altaną mam swoje biuro w ogrodzie. Genialne!" },
  { batch: 6, av: "G", name: "Gustaw L.", city: "Olsztyn", stars: 5, text: "Szukałem czegoś solidnego, co wytrzyma. Po 6 miesiącach intensywnego użytkowania mogę powiedzieć, że to doskonały produkt. Żadnych problemów." },
  { batch: 6, av: "N", name: "Natalia V.", city: "Gliwice", stars: 5, text: "Płatność przy dostawie bardzo wygodna, żadnego ryzyka. Kurier był punktualny. Altana jest dokładnie jak na zdjęciach, a właściwie jeszcze lepsza!" },
  // Batch 7
  { batch: 7, av: "U", name: "Urban Z.", city: "Zabrze", stars: 5, text: "Fantastycznie! Używam jej na kolacje na zewnątrz z przyjaciółmi. Jakość naprawdę najwyższa, materiał wygląda bardzo wytrzymale. Świetny zakup!" },
  { batch: 7, av: "Z", name: "Zuzanna N.", city: "Elbląg", stars: 5, text: "Moja stara altana złamała się po roku. Ta wygląda o wiele solidniej. Ścianki boczne to niesamowity bonus za tę cenę." },
  { batch: 7, av: "C", name: "Cezary S.", city: "Płock", stars: 5, text: "Idealna do naszego ogrodu! Montaż bardzo prosty, we dwoje potrzebowaliśmy pół godziny. Beżowy kolor jest elegancki i pasuje do wszystkiego." },
  // Batch 8
  { batch: 8, av: "W", name: "Wojciech M.", city: "Opole", stars: 5, text: "U nas latem jest bardzo gorąco. Podwójny dach utrzymuje przestrzeń chłodną! Szybka dostawa i produkt zgodny z opisem." },
  { batch: 8, av: "X", name: "Krystyna P.", city: "Tarnów", stars: 5, text: "Porównywałam wiele altan online, ta miała najlepszy stosunek jakości do ceny. Nie byłam rozczarowana, wręcz przeciwnie! Solidna i piękna konstrukcja." },
  { batch: 8, av: "Y", name: "Jakub C.", city: "Zielona Góra", stars: 5, text: "Używam jej nawet zimą do ochrony mebli ogrodowych. 100% wodoodporna, testowałem przy silnym deszczu. Żadnych przecieków!" },
  // Batch 9
  { batch: 9, av: "S", name: "Sylwia A.", city: "Legnica", stars: 5, text: "Kupiłam ją na lato, stała się centrum naszych wieczorów w ogrodzie. Znajomi zawsze pytają, gdzie ją kupiłam. Super zadowolona!" },
  { batch: 9, av: "Q", name: "Kamil D.", city: "Kalisz", stars: 4, text: "Dobry produkt ogólnie. Chciałbym tylko, żeby były dostępne różne kolory. Ale jakość jest doskonała za zapłaconą cenę." },
  { batch: 9, av: "AA", name: "Adam V.", city: "Nowy Sącz", stars: 5, text: "Wahałem się z płatnością przy dostawie, ale wszystko było perfekcyjne. Altana dotarła cała i dobrze zapakowana. Polecam!" },
  // Batch 10
  { batch: 10, av: "AB", name: "Blanka F.", city: "Stalowa Wola", stars: 5, text: "Nareszcie altana, która nie odleci przy pierwszym wietrze! Konstrukcja jest solidna i ścianki dobrze chronią. Bardzo zadowolona z zakupu." },
  { batch: 10, av: "AC", name: "Czesław E.", city: "Konin", stars: 5, text: "Rozłożyłem ją na chrzciny siostrzeńca. Wszyscy goście byli zachwyceni. Estetycznie piękna i bardzo funkcjonalna." },
  { batch: 10, av: "AD", name: "Dagmara L.", city: "Piła", stars: 5, text: "Po długim szukaniu wybrałam tę i nie żałuję. Cena jest nie do pobicia za oferowaną jakość. Szybka dostawa!" },
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
          <h2 className="text-[22px] md:text-4xl font-black uppercase tracking-tight">847 Zadowolonych Klientów</h2>
          <p className="text-gray-500 text-[15px] md:text-base mt-2">Zweryfikowane opinie naszych klientów</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleReviews.map((rev, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-black text-lg">{rev.av.charAt(0)}</div>
                <div>
                  <p className="font-bold text-base">{rev.name}</p>
                  <p className="text-sm text-gray-400">{rev.city} • Zweryfikowany zakup</p>
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
              Pokaż więcej opinii
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
    if (!form.fullName.trim()) errs.fullName = "Wpisz imię i nazwisko";
    if (!form.address.trim()) errs.address = "Wpisz pełny adres";
    const digits = form.phone.replace(/\D/g, "");
    if (!form.phone.trim()) errs.phone = "Wpisz numer telefonu";
    else if (digits.length < 7) errs.phone = "Nieprawidłowy numer";
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

    // Required fields - Polish offer
    formData.append('uid', '019be4ed-fb60-7ba4-89d4-deecc13c8b0a');
    formData.append('key', '7b172b0b1994e9fa9961ad');
    formData.append('offer', '3254');
    formData.append('lp', '3300');
    formData.append('name', form.fullName.trim());
    formData.append('tel', '+48' + form.phone.trim().replace(/\s/g, ''));
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
      localStorage.setItem("gazebo-pl-order", JSON.stringify({
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
        alert("Wystąpił błąd. Spróbuj ponownie.");
        setSubmitting(false);
        return;
      }

      window.location.href = "/ty/gazebo-pl";
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "spróbuj ponownie";
      console.error("Network Error:", message);
      alert("Błąd sieci: " + message);
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 py-16 px-4" id="form-objednat">
      <div className="max-w-lg mx-auto">
        <div className="text-center text-white mb-6">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2.5 rounded-full text-[13px] md:text-sm font-bold mb-4">
            <AlertTriangle className="animate-pulse" size={16} />
            LIMITOWANA OFERTA - TYLKO 7 SZTUK
          </div>
          <h2 className="text-[28px] md:text-4xl font-black uppercase mb-3">
            Zamów Teraz!
          </h2>
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-white/70 line-through text-xl md:text-2xl">949 zł</span>
            <span className="text-5xl md:text-6xl font-black">427 zł</span>
          </div>
          <p className="text-white/90 text-[15px] md:text-base">
            Wysyłka GRATIS • Dostawa 24-48h
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-5 md:p-6 shadow-2xl space-y-4">
          <div>
            <label className="block text-[15px] md:text-base font-bold text-gray-700 mb-1.5">Imię i Nazwisko *</label>
            <input
              type="text"
              placeholder="Np. Jan Kowalski"
              value={form.fullName}
              onChange={(e) => updateForm("fullName", e.target.value)}
              className={`w-full py-4 px-4 border-2 rounded-xl text-[16px] font-medium outline-none transition-colors ${errors.fullName ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-orange-500"}`}
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-[15px] md:text-base font-bold text-gray-700 mb-1.5">Pełny Adres *</label>
            <input
              type="text"
              placeholder="ul. Przykładowa 123, 00-001 Warszawa"
              value={form.address}
              onChange={(e) => updateForm("address", e.target.value)}
              className={`w-full py-4 px-4 border-2 rounded-xl text-[16px] font-medium outline-none transition-colors ${errors.address ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-orange-500"}`}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          <div>
            <label className="block text-[15px] md:text-base font-bold text-gray-700 mb-1.5">Numer Telefonu *</label>
            <div className={`flex items-stretch border-2 rounded-xl overflow-hidden ${errors.phone ? "border-red-500 bg-red-50" : "border-gray-200 focus-within:border-orange-500"}`}>
              <span className="py-4 px-3.5 text-[15px] font-bold text-gray-500 bg-gray-100 border-r-2 border-gray-200 flex items-center">+48</span>
              <input
                type="tel"
                placeholder="512 345 678"
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
                POTWIERDŹ ZAMÓWIENIE — 427 zł
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 text-[14px] md:text-[15px] text-gray-500 pt-2">
            <Lock size={16} className="text-green-600" />
            <span><strong className="text-green-600">BEZPIECZNA</strong> płatność gotówką przy dostawie</span>
          </div>

          <div className="flex items-center justify-center gap-4 text-[13px] md:text-sm text-gray-400 pt-2">
            <span className="flex items-center gap-1"><Truck size={14} /> Wysyłka Gratis</span>
            <span className="flex items-center gap-1"><RotateCcw size={14} /> Zwrot 30 dni</span>
            <span className="flex items-center gap-1"><Shield size={14} /> Gwarancja 2 lata</span>
          </div>
        </form>

        <p className="text-center text-white/70 text-[13px] md:text-sm mt-4">
          Nasz operator skontaktuje się z Tobą w celu potwierdzenia zamówienia
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
            UWAGA — PRZECZYTAJ ZANIM PRZEJDZIESZ DALEJ
          </div>
        </div>

        <h2 className="text-[26px] md:text-5xl font-black text-center uppercase tracking-tight mb-8 leading-tight">
          Dlaczego Musisz <span className="text-orange-500">Działać TERAZ</span>
        </h2>

        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-5 text-center border border-white/20">
            <div className="text-3xl md:text-5xl font-black text-orange-500 mb-1">{soldToday}</div>
            <div className="text-[11px] md:text-sm font-bold text-gray-300 uppercase tracking-wide">Sprzedano Dziś</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-5 text-center border border-white/20">
            <div className="text-3xl md:text-5xl font-black text-red-500 mb-1">7</div>
            <div className="text-[11px] md:text-sm font-bold text-gray-300 uppercase tracking-wide">Sztuk Zostało</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-5 text-center border border-white/20">
            <div className="text-3xl md:text-5xl font-black text-yellow-500 mb-1">55%</div>
            <div className="text-[11px] md:text-sm font-bold text-gray-300 uppercase tracking-wide">Aktywna Zniżka</div>
          </div>
        </div>

        <div className="space-y-4 mb-10">
          <div className="bg-red-900/50 border-2 border-red-500 rounded-xl p-4 md:p-5">
            <div className="flex items-start gap-3">
              <div className="bg-red-500 rounded-full p-2 flex-shrink-0">
                <AlertTriangle className="text-white" size={20} />
              </div>
              <div>
                <h4 className="font-black text-base md:text-lg mb-1">Zapasy Się Kończą</h4>
                <p className="text-gray-300 text-[14px] md:text-[15px] leading-relaxed">
                  Ta seria za <strong className="text-white">427 zł</strong> jest prawie wyprzedana. Następne zamówienie od dostawcy będzie droższe i cena wróci do <strong className="text-white">949 zł</strong>. Tej ceny nie możemy zagwarantować jutro.
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
                <h4 className="font-black text-base md:text-lg mb-1">Wysyłka Gratis Tylko Dziś</h4>
                <p className="text-gray-300 text-[14px] md:text-[15px] leading-relaxed">
                  Normalnie wysyłka kosztuje <strong className="text-white">59 zł</strong> za tak dużą paczkę. Dziś oferujemy ją <strong className="text-white">GRATIS</strong> jako zachętę do wyprzedania magazynu. Ta promocja może się skończyć o północy.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-5 md:p-6 mb-10 border border-gray-700">
          <h3 className="text-lg md:text-xl font-black text-center mb-6 uppercase">Gdy Zamówisz Dziś vs Gdy Poczekasz</h3>
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-green-400 font-bold text-sm md:text-base">
                <CheckCircle2 size={20} />
                <span>ZAMÓWISZ DZIŚ</span>
              </div>
              <ul className="space-y-2.5 text-[13px] md:text-sm">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> Zapłacisz tylko 427 zł</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> Wysyłka GRATIS</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> Dostawa 24-48h</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> Gotowi na lato</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500 flex-shrink-0" /> Oszczędzasz 522 zł</li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-red-400 font-bold text-sm md:text-base">
                <XCircle size={20} />
                <span>GDY POCZEKASZ</span>
              </div>
              <ul className="space-y-2.5 text-[13px] md:text-sm text-gray-400">
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Zapłacisz 949 zł</li>
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Wysyłka 59 zł</li>
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Czekanie 2-3 tygodnie</li>
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Przegapisz pół lata</li>
                <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500 flex-shrink-0" /> Żadnej oszczędności</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-400 text-[14px] md:text-base mb-5 leading-relaxed">
            Żadnego ryzyka: <strong className="text-white">płacisz przy dostawie</strong> i masz <strong className="text-white">30 dni</strong> na darmowy zwrot.
          </p>
          <button
            onClick={() => document.getElementById('form-objednat')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full md:w-auto bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 md:px-10 py-5 rounded-xl font-black text-lg md:text-xl uppercase tracking-wide shadow-2xl hover:from-orange-600 hover:to-red-600 transition-all inline-flex items-center justify-center gap-3"
          >
            <ShoppingBag size={24} />
            TAK, CHCĘ MOJĄ ALTANĘ ZA 427 zł
          </button>
          <p className="text-gray-500 text-xs md:text-sm mt-3">
            Kliknij przycisk i wypełnij formularz — zajmie to tylko 30 sekund
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
      q: "Jak długo trwa montaż?",
      a: "30-45 minut z 2 osobami. Jasna instrukcja i narzędzia w zestawie."
    },
    {
      q: "Czy jest odporny na deszcz?",
      a: "Tak, materiał jest 100% wodoodporny z powłoką PU."
    },
    {
      q: "Czy ścianki są w cenie?",
      a: "Tak! Wszystkie 4 ścianki boczne są wliczone w cenę 427 zł."
    },
    {
      q: "Jak zapłacę?",
      a: "Płacisz gotówką kurierowi przy odbiorze paczki. Żadnej płatności z góry."
    },
  ];

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-[22px] md:text-4xl font-black uppercase tracking-tight">Najczęściej Zadawane Pytania</h2>
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
              <p className="font-black text-3xl text-orange-600">427 zł</p>
              <p className="text-xs font-bold text-gray-400 line-through">949 zł</p>
            </div>
            <button
              onClick={() => document.getElementById('form-objednat')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex-[2] bg-gradient-to-r from-orange-500 to-red-500 text-white font-black py-4 px-4 rounded-xl uppercase text-base shadow-lg active:scale-95 transition-transform"
            >
              ZAMÓW
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
        <a href="/privacy-policy" className="hover:text-white transition-colors">Polityka Prywatności</a>
        <a href="/terms-of-service" className="hover:text-white transition-colors">Regulamin</a>
        <a href="/contact" className="hover:text-white transition-colors">Kontakt</a>
      </div>
      <p className="text-xs text-gray-600">
        © 2024 Pop Up Gazebo Polska. Zdjęcia mają charakter poglądowy.
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
