'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import {
  CheckCircle, Star, Check, Truck, Lock, CreditCard, ChevronDown, ChevronUp,
  ShieldCheck, RefreshCw, Package, Sparkles, Battery, Wind, Navigation,
  Smartphone, Trash2, Droplets, Zap, Gauge, Cpu, Volume2, Wifi, Layers, Maximize, Shield,
  ChevronLeft, ChevronRight, Award, Clock, Users, ThumbsUp, Gift, AlertTriangle
} from 'lucide-react';

/* --- PRODUCT GALLERY --- */
const ProductGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  const images = [
    '/images/robot-asp/1.webp',
    '/images/robot-asp/2.webp',
    '/images/robot-asp/3.webp',
    '/images/robot-asp/4.webp',
    '/images/robot-asp/5.webp',
    '/images/robot-asp/6.webp',
    '/images/robot-asp/7.webp',
    '/images/robot-asp/8.webp',
    '/images/robot-asp/9.webp',
  ];

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:max-h-[500px] pb-2 md:pb-0">
        {images.map((src, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`flex-shrink-0 w-16 h-16 md:w-16 md:h-16 rounded border-2 overflow-hidden transition-all ${
              index === selectedImage
                ? 'border-orange-500 shadow-md'
                : 'border-gray-200 hover:border-orange-300'
            }`}
          >
            <img src={src} alt={`Pohľad ${index + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 relative">
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-red-600 text-white text-sm md:text-xs font-bold px-3 py-1.5 md:px-2 md:py-1 rounded-lg shadow-lg">-56%</span>
        </div>
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-green-600 text-white text-sm md:text-xs font-bold px-3 py-1.5 md:px-2 md:py-1 rounded-lg shadow-lg">BESTSELLER</span>
        </div>
        <img
          src={images[selectedImage]}
          alt="NovaClean X1"
          className="w-full rounded-xl border border-gray-200 shadow-lg"
        />
        <div className="flex justify-center gap-3 mt-4">
          <button
            onClick={() => setSelectedImage((prev) => (prev - 1 + images.length) % images.length)}
            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition shadow"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => setSelectedImage((prev) => (prev + 1) % images.length)}
            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition shadow"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

/* --- STAR RATING --- */
const StarRating: React.FC<{ rating: number; reviews: number }> = ({ rating, reviews }) => (
  <div className="flex items-center gap-2 flex-wrap">
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={22}
          className={star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
        />
      ))}
    </div>
    <span className="text-base md:text-sm text-blue-600 hover:text-orange-600 cursor-pointer font-semibold" suppressHydrationWarning>
      {reviews.toLocaleString('sk-SK')} recenzií
    </span>
  </div>
);

/* --- PRICE BOX --- */
const PriceBox: React.FC<{ onOrderClick: () => void }> = ({ onOrderClick }) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setTimeLeft(2 * 60 * 60);
  }, []);

  useEffect(() => {
    if (timeLeft === null) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft !== null]);

  const formatTime = (seconds: number | null) => {
    if (seconds === null) return '02:00:00';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="border-2 border-orange-400 rounded-2xl p-5 md:p-4 bg-white shadow-xl">
      {/* Urgency Banner */}
      <div className="bg-red-600 text-white text-center py-2 px-3 rounded-xl mb-4 animate-pulse">
        <span className="text-base md:text-sm font-bold flex items-center justify-center gap-2">
          <AlertTriangle size={18} />
          POZOR: Posledných 7 kusov na sklade!
        </span>
      </div>

      {/* Price - NEURO: Anchoring with big crossed price */}
      <div className="mb-5 text-center">
        <div className="text-gray-400 line-through text-2xl md:text-xl mb-1">179 €</div>
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-5xl md:text-4xl font-black text-green-600">79</span>
          <span className="text-2xl md:text-xl font-bold text-green-600">€</span>
        </div>
        <div className="mt-2 inline-block bg-red-100 text-red-700 px-4 py-1.5 rounded-full text-base md:text-sm font-bold">
          Ušetríte 100 € (56%)
        </div>
      </div>

      {/* Countdown - NEURO: Scarcity & Urgency */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-4 mb-5 shadow-lg">
        <div className="text-white text-center">
          <p className="text-sm font-medium mb-1 opacity-90">Akcia končí za:</p>
          <div className="text-3xl md:text-2xl font-black tracking-wider" suppressHydrationWarning>
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* Free Bonus - NEURO: Reciprocity */}
      <div className="bg-green-50 border-2 border-green-400 rounded-xl p-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="bg-green-500 rounded-full p-2">
            <Gift size={24} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-green-800 text-lg md:text-base">ZADARMO: Stanica Omni</p>
            <p className="text-green-700 text-base md:text-sm">Hodnota 179 € - Dnes 0 €!</p>
          </div>
        </div>
      </div>

      {/* Delivery */}
      <div className="mb-5">
        <div className="flex items-center gap-3 text-green-700 font-bold text-lg md:text-base mb-2">
          <Truck size={24} className="text-green-600" />
          DORUČENIE ZADARMO 24-48h
        </div>
      </div>

      {/* Stock Bar - NEURO: Scarcity visualization */}
      <div className="mb-5">
        <div className="flex justify-between text-base md:text-sm mb-2">
          <span className="text-red-600 font-bold">Zostáva iba 7 kusov!</span>
          <span className="text-gray-500">93% predaných</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 h-4 rounded-full transition-all duration-500" style={{ width: '93%' }}></div>
        </div>
      </div>

      {/* CTA Button - NEURO: Action-oriented, benefit-focused */}
      <button
        onClick={onOrderClick}
        className="w-full bg-gradient-to-b from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-black text-xl md:text-lg py-5 md:py-4 px-4 rounded-xl shadow-2xl transition-all mb-4 border-2 border-orange-600 transform hover:scale-[1.02] active:scale-[0.98]"
      >
        OBJEDNÁVAM - PLATBA PRI PREVZATÍ
      </button>

      {/* Payment Method - NEURO: Risk reversal */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4">
        <div className="flex items-center justify-center gap-3 text-blue-800">
          <CreditCard size={22} />
          <span className="font-bold text-base md:text-sm">Platba IBA pri prevzatí</span>
        </div>
        <p className="text-center text-blue-600 text-sm mt-1">Neriskujete - najprv si skontrolujete!</p>
      </div>

      {/* Trust Badges - NEURO: Social proof & Authority */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl">
          <ShieldCheck size={20} className="text-green-600" />
          <span className="text-sm font-semibold text-gray-700">2 roky záruka</span>
        </div>
        <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl">
          <RefreshCw size={20} className="text-blue-600" />
          <span className="text-sm font-semibold text-gray-700">30 dní na vrátenie</span>
        </div>
        <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl">
          <Lock size={20} className="text-gray-600" />
          <span className="text-sm font-semibold text-gray-700">Bezpečná transakcia</span>
        </div>
        <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl">
          <Award size={20} className="text-orange-600" />
          <span className="text-sm font-semibold text-gray-700">Certifikát CE</span>
        </div>
      </div>
    </div>
  );
};

/* --- PRODUCT INFO --- */
const ProductInfo: React.FC = () => (
  <div className="space-y-5">
    {/* Title - NEURO: Clear benefit-oriented headline */}
    <h1 className="text-3xl md:text-3xl font-black text-gray-900 leading-tight">
      NovaClean X1 - Robot, ktorý <span className="text-orange-500">Sám Seba Čistí</span> a <span className="text-green-600">Šetrí Váš Čas</span>
    </h1>

    <StarRating rating={5} reviews={1248} />

    {/* Social Proof Bar - NEURO: Bandwagon effect */}
    <div className="bg-gradient-to-r from-orange-50 to-green-50 border border-orange-200 rounded-xl p-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-green-700 font-bold text-lg md:text-base flex items-center gap-2">
          <CheckCircle size={20} className="text-green-600" />
          Viac ako 5000+ spokojných zákazníkov
        </span>
        <span className="flex items-center gap-2 text-orange-600 font-semibold text-base md:text-sm bg-orange-100 px-3 py-1 rounded-full">
          <Users size={16} />
          47 ľudí si práve prezerá
        </span>
      </div>
    </div>

    <hr className="border-gray-200" />

    {/* Key Benefits - NEURO: Emotional triggers, loss aversion, future pacing */}
    <div className="space-y-4">
      <h3 className="font-black text-xl md:text-lg text-gray-900 flex items-center gap-2">
        <Sparkles className="text-orange-500" size={24} />
        Čo získate:
      </h3>
      <ul className="space-y-4">
        <li className="flex items-start gap-4 bg-green-50 p-4 rounded-xl border-l-4 border-green-500">
          <Check size={28} className="text-green-600 flex-shrink-0" />
          <div>
            <span className="font-bold text-lg md:text-base text-gray-900 block">Získajte 2-3 hodiny DENNE späť</span>
            <span className="text-gray-600 text-base md:text-sm">Robot upratuje za Vás - Vy odpočívate alebo trávite čas s rodinou</span>
          </div>
        </li>
        <li className="flex items-start gap-4 bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
          <Check size={28} className="text-blue-600 flex-shrink-0" />
          <div>
            <span className="font-bold text-lg md:text-base text-gray-900 block">NULOVÝ kontakt s nečistotami</span>
            <span className="text-gray-600 text-base md:text-sm">Stanica Omni automaticky vysypáva, umýva a suší - Vy sa nedotknete prachu 60 dní!</span>
          </div>
        </li>
        <li className="flex items-start gap-4 bg-purple-50 p-4 rounded-xl border-l-4 border-purple-500">
          <Check size={28} className="text-purple-600 flex-shrink-0" />
          <div>
            <span className="font-bold text-lg md:text-base text-gray-900 block">Domov VŽDY pripravený na návštevy</span>
            <span className="text-gray-600 text-base md:text-sm">Navigácia LiDAR 360° - čistí pod nábytkom, obchádza prekážky, nespadne zo schodov</span>
          </div>
        </li>
        <li className="flex items-start gap-4 bg-yellow-50 p-4 rounded-xl border-l-4 border-yellow-500">
          <Check size={28} className="text-yellow-600 flex-shrink-0" />
          <div>
            <span className="font-bold text-lg md:text-base text-gray-900 block">Ideálne pre alergikov a domáce zvieratá</span>
            <span className="text-gray-600 text-base md:text-sm">HEPA H13 filter zachytí 99,97% alergénov - dýchate čistý vzduch</span>
          </div>
        </li>
        <li className="flex items-start gap-4 bg-orange-50 p-4 rounded-xl border-l-4 border-orange-500">
          <Check size={28} className="text-orange-600 flex-shrink-0" />
          <div>
            <span className="font-bold text-lg md:text-base text-gray-900 block">Pracuje ticho, aj v noci</span>
            <span className="text-gray-600 text-base md:text-sm">Iba 55dB - môžete spať, sledovať TV alebo pracovať bez rušenia</span>
          </div>
        </li>
      </ul>
    </div>

    {/* What's in the box - NEURO: Perceived value stacking */}
    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-300 rounded-2xl p-5 md:p-4">
      <h3 className="font-black text-xl md:text-lg text-gray-900 mb-4 flex items-center gap-2">
        <Package className="text-orange-500" size={24} />
        Kompletná sada v cene:
      </h3>
      <div className="grid grid-cols-1 gap-3">
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm">
          <CheckCircle size={24} className="text-orange-500" />
          <span className="font-bold text-base text-gray-900">NovaStation Omni (hodnota 179 €) - ZADARMO!</span>
        </div>
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm">
          <CheckCircle size={24} className="text-green-500" />
          <span className="text-base text-gray-700">NovaClean X1 Robot s navigáciou LiDAR</span>
        </div>
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm">
          <CheckCircle size={24} className="text-green-500" />
          <span className="text-base text-gray-700">Diaľkové ovládanie + batérie</span>
        </div>
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm">
          <CheckCircle size={24} className="text-green-500" />
          <span className="text-base text-gray-700">2x bočné kefy + 2x vrecká 3L</span>
        </div>
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm">
          <CheckCircle size={24} className="text-green-500" />
          <span className="text-base text-gray-700">Návod v slovenskom jazyku</span>
        </div>
      </div>
    </div>
  </div>
);

/* --- SPECS TABLE --- */
const SpecsTable: React.FC = () => {
  const specs = [
    { label: 'Sací výkon', value: '6000 Pa', detail: 'Brushless motor Nidec (Japonsko)' },
    { label: 'Batéria', value: '5200 mAh', detail: 'Až 180 min prevádzky' },
    { label: 'Navigácia', value: 'LiDAR LDS 4.0', detail: 'Mapovanie 360° + SLAM AI' },
    { label: 'Hlučnosť', value: '< 55 dB', detail: 'Ultra tichý nočný režim' },
    { label: 'Pripojenie', value: 'WiFi 2.4/5 GHz', detail: 'Alexa, Google Home, Aplikácia' },
    { label: 'Objem prachu', value: '3L (stanica) / 400ml (robot)', detail: 'Auto-vyprázdňovanie na 60 dní' },
    { label: 'Prekážky', value: 'Do 20 mm', detail: 'Off-Road kolieska' },
    { label: 'Filtrácia', value: 'HEPA H13', detail: '99,97% mikročastíc' },
  ];

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <div className="bg-gray-100 px-5 py-4 border-b border-gray-200">
        <h3 className="font-black text-xl md:text-lg text-gray-900">Technická špecifikácia</h3>
      </div>
      <table className="w-full">
        <tbody>
          {specs.map((spec, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-5 py-4 font-semibold text-gray-700 w-1/3 border-r border-gray-100 text-base md:text-sm">{spec.label}</td>
              <td className="px-5 py-4 text-gray-900">
                <span className="font-bold text-base md:text-sm">{spec.value}</span>
                {spec.detail && <span className="text-gray-500 text-sm block mt-1">{spec.detail}</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/* --- FEATURES SECTION --- */
const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "2-v-1: Vysáva a Mopuje",
      desc: "Cyklónový motor vysáva prach a mikrovláknový mop odstraňuje odolné škvrny. Jeden prejazd, dvojitý efekt."
    },
    {
      icon: <Navigation className="w-8 h-8" />,
      title: "Smart Navigácia 3.0",
      desc: "Nespadne zo schodov a nenarážá prudko. IR senzory mapujú miestnosť a obchádzajú prekážky."
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Plná kontrola z telefónu",
      desc: "Použite diaľkové ovládanie alebo dodanú aplikáciu. Spustite upratovanie z kancelárie a vráťte sa do žiariaceho domova."
    },
    {
      icon: <Battery className="w-8 h-8" />,
      title: "Automatické nabíjanie",
      desc: "Keď sa batéria vybije, sám sa vráti do NovaStation, nabije sa, vyprázdni a pokračuje."
    },
    {
      icon: <Wind className="w-8 h-8" />,
      title: "Super tichý - 55dB",
      desc: "Menej ako 65dB. Môžete sledovať televíziu alebo uspávať deti, zatiaľ čo on ticho pracuje."
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "HEPA H13 filter",
      desc: "Zachytáva 99,9% alergénov a jemného prachu. Ideálne pre alergikov a majiteľov domácich zvierat."
    }
  ];

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <div className="bg-gray-100 px-5 py-4 border-b border-gray-200">
        <h3 className="font-black text-xl md:text-lg text-gray-900">Prečo NovaClean X1?</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-4 p-5">
        {features.map((f, i) => (
          <div key={i} className="flex gap-4 p-4 rounded-xl bg-gray-50 hover:bg-orange-50 transition border border-transparent hover:border-orange-200">
            <div className="text-orange-500 flex-shrink-0">{f.icon}</div>
            <div>
              <h4 className="font-bold text-gray-900 text-lg md:text-base">{f.title}</h4>
              <p className="text-gray-600 text-base md:text-sm mt-1">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* --- GIF SECTION --- */
const GifSection: React.FC = () => (
  <div className="border border-gray-200 rounded-2xl overflow-hidden">
    <div className="bg-gradient-to-r from-orange-500 to-red-500 px-5 py-4">
      <h3 className="font-black text-xl md:text-lg text-white text-center">Pozrite sa na NovaClean X1 v akcii!</h3>
    </div>
    <div className="p-4 flex justify-center bg-gray-50">
      <img
        src="/gif/robot/gif.gif"
        alt="NovaClean X1 v akcii"
        className="w-full max-w-2xl rounded-xl shadow-2xl"
      />
    </div>
  </div>
);

/* --- STATION SECTION --- */
const StationSection: React.FC = () => (
  <div className="border-2 border-orange-400 rounded-2xl overflow-hidden shadow-lg">
    <div className="bg-gradient-to-r from-orange-500 to-red-500 px-5 py-4">
      <h3 className="font-black text-xl md:text-lg text-white flex items-center gap-3">
        <Gift size={24} />
        ZADARMO: Stanica NovaStation Omni (hodnota 179 €)
      </h3>
    </div>
    <div className="p-5 bg-orange-50">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <img src="/images/robot-asp/2.webp" alt="NovaStation" className="w-full rounded-xl border-2 border-orange-200 shadow-lg" />
        </div>
        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-orange-100">
            <Trash2 className="text-orange-500 flex-shrink-0" size={32} />
            <div>
              <h4 className="font-bold text-gray-900 text-lg md:text-base">Auto-vyprázdňovanie</h4>
              <p className="text-gray-600 text-base md:text-sm">Vrecko 3L vydrží na 2 mesiace!</p>
            </div>
          </div>
          <div className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-orange-100">
            <Droplets className="text-blue-500 flex-shrink-0" size={32} />
            <div>
              <h4 className="font-bold text-gray-900 text-lg md:text-base">Umývanie a výmena vody</h4>
              <p className="text-gray-600 text-base md:text-sm">Vždy čistý mop automaticky</p>
            </div>
          </div>
          <div className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-orange-100">
            <Wind className="text-gray-500 flex-shrink-0" size={32} />
            <div>
              <h4 className="font-bold text-gray-900 text-lg md:text-base">Sušenie 45°C</h4>
              <p className="text-gray-600 text-base md:text-sm">Bez plesní a nepríjemných zápachov</p>
            </div>
          </div>
          <div className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-orange-100">
            <Zap className="text-yellow-500 flex-shrink-0" size={32} />
            <div>
              <h4 className="font-bold text-gray-900 text-lg md:text-base">Rýchle nabíjanie</h4>
              <p className="text-gray-600 text-base md:text-sm">+30% rýchlejšie späť do práce</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* --- REVIEWS SECTION --- */
const ReviewsSection: React.FC = () => {
  const reviews = [
    {
      name: "Martin K.",
      verified: true,
      rating: 5,
      date: "pred 2 dňami",
      title: "Lepší ako iRobot za polovičnú cenu!",
      text: "Úprimne som bol skeptický kvôli cene. Ale vysáva lepšie ako môj starý iRobot za 400 €. Srsť od psa už nie je problém.",
      helpful: 47
    },
    {
      name: "Anna W.",
      verified: true,
      rating: 5,
      date: "pred týždňom",
      title: "Rýchle doručenie, skvelý produkt",
      text: "Dorazil za 24 hodín. Umývanie nie je tak hlboké ako ručné, ale pre každodenné udržiavanie čistoty je ideálny. Odporúčam!",
      helpful: 32
    },
    {
      name: "Peter N.",
      verified: true,
      rating: 5,
      date: "pred 3 dňami",
      title: "Najlepší nákup roku",
      text: "Batéria vydrží navždy. Vyčistí celý môj 80m² byt a ešte zostáva nabitie. Najlepší nákup roku pre manželku (a pre mňa).",
      helpful: 28
    }
  ];

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <div className="bg-gray-100 px-5 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h3 className="font-black text-xl md:text-lg text-gray-900">Recenzie zákazníkov</h3>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={20} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-lg md:text-base font-bold">4.9 z 5</span>
            <span className="text-base md:text-sm text-gray-500">(1 248 recenzií)</span>
          </div>
        </div>
      </div>

      {/* Rating Breakdown */}
      <div className="p-5 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="text-center sm:text-left">
            <div className="text-6xl md:text-5xl font-black text-gray-900">4.9</div>
            <div className="flex justify-center sm:justify-start mt-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={22} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <div className="text-base md:text-sm text-gray-500 mt-2">1 248 recenzií</div>
          </div>
          <div className="flex-1 space-y-2">
            {[
              { stars: 5, percent: 89 },
              { stars: 4, percent: 8 },
              { stars: 3, percent: 2 },
              { stars: 2, percent: 1 },
              { stars: 1, percent: 0 },
            ].map((row) => (
              <div key={row.stars} className="flex items-center gap-3 text-base md:text-sm">
                <span className="w-14 text-blue-600 font-semibold">{row.stars} hv.</span>
                <div className="flex-1 bg-gray-200 rounded-full h-5">
                  <div
                    className="bg-yellow-400 h-5 rounded-full"
                    style={{ width: `${row.percent}%` }}
                  ></div>
                </div>
                <span className="w-12 text-right text-gray-600 font-semibold">{row.percent}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="divide-y divide-gray-200">
        {reviews.map((review, index) => (
          <div key={index} className="p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-lg">
                {review.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="font-bold text-lg md:text-base">{review.name}</span>
                  {review.verified && (
                    <span className="text-sm text-orange-600 flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-full">
                      <CheckCircle size={14} /> Overený nákup
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={18}
                        className={s <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-base md:text-sm">{review.title}</span>
                </div>
                <p className="text-sm text-gray-500 mb-2">Recenzia zo dňa: {review.date}</p>
                <p className="text-base md:text-sm text-gray-700 leading-relaxed">{review.text}</p>
                <div className="mt-3 flex items-center gap-4">
                  <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-green-600 bg-gray-100 hover:bg-green-50 px-3 py-1.5 rounded-full transition">
                    <ThumbsUp size={16} /> Užitočné ({review.helpful})
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* --- FAQ SECTION --- */
const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Zvláda dobre srsť domácich zvierat?",
      answer: "Rozhodne áno. Centrálna kefa v tvare V a silné cyklónové sanie boli navrhnuté špeciálne pre zachytenie srsti psov a mačiek bez zamotania."
    },
    {
      question: "Kde môžem nájsť náhradné diely?",
      answer: "Ponúkame sady náhradných dielov (kefy, HEPA filtre, utierky) priamo na našich stránkach za továrenské ceny. Navyše sú komponenty univerzálne a ľahko dostupné."
    },
    {
      question: "Vzťahuje sa záruka na poruchy?",
      answer: "Áno, ponúkame 2-ročnú priamu záruku. Ak má robot technickú poruchu, vymeníme ho zadarmo za nový. 100% slovenská podpora."
    },
    {
      question: "Ako funguje platba pri prevzatí?",
      answer: "Je to veľmi jednoduché. Objednáte teraz vyplnením formulára, online neplatíte nič. Zaplatíte hotovosťou priamo kuriérovi pri doručení balíka (zvyčajne do 24/48 hodín)."
    },
    {
      question: "Potrebujem WiFi na prevádzku?",
      answer: "Nie! Robot funguje skvele jednoduchým stlačením tlačidla 'Start' alebo pomocou priloženého diaľkového ovládania. WiFi aplikácia je voliteľný doplnok pre tých, ktorí chcú programovať mimo domova."
    }
  ];

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <div className="bg-gray-100 px-5 py-4 border-b border-gray-200">
        <h3 className="font-black text-xl md:text-lg text-gray-900">Často kladené otázky</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {faqs.map((faq, index) => (
          <div key={index}>
            <button
              className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="font-semibold text-lg md:text-base text-gray-900 pr-4">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp size={24} className="text-orange-500 flex-shrink-0" />
              ) : (
                <ChevronDown size={24} className="text-gray-400 flex-shrink-0" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-5 pb-4 text-base md:text-sm text-gray-600 leading-relaxed">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/* --- ORDER FORM --- */
const OrderForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const tmfpInput = e.currentTarget.querySelector('input[name="tmfp"]') as HTMLInputElement;
      const tmfp = tmfpInput?.value || '';

      const params = new URLSearchParams({
        uid: '0191dbf2-738a-7d28-82a0-18c3859d5e8f',
        key: '151af1e45a084aaf75c15f',
        offer: '1259',
        lp: '1278',
        name: formData.name,
        tel: formData.phone,
        'street-address': formData.address,
        ua: navigator.userAgent,
        tmfp: tmfp,
      });

      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get('utm_source');
      const utmMedium = urlParams.get('utm_medium');
      const utmCampaign = urlParams.get('utm_campaign');
      const utmContent = urlParams.get('utm_content');
      const utmTerm = urlParams.get('utm_term');

      if (utmSource) params.append('utm_source', utmSource);
      if (utmMedium) params.append('utm_medium', utmMedium);
      if (utmCampaign) params.append('utm_campaign', utmCampaign);
      if (utmContent) params.append('utm_content', utmContent);
      if (utmTerm) params.append('utm_term', utmTerm);

      await fetch('https://offers.uncappednetwork.com/forms/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      router.push('/ty/ty-gg-robot-sk-unc');
    } catch (error) {
      console.error('[Network API] Error:', error);
      router.push('/ty/ty-gg-robot-sk-unc');
    }
  };

  return (
    <div id="order-form" className="border-4 border-orange-500 rounded-2xl overflow-hidden bg-white shadow-2xl">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 px-5 py-4">
        <h3 className="font-black text-white text-center text-2xl md:text-xl">OBJEDNAJTE TERAZ</h3>
        <p className="text-orange-100 text-center text-base md:text-sm mt-1">Platba IBA pri prevzatí - 0 € rizika!</p>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="hidden" name="tmfp" />
          <input type="hidden" name="offer" value="1259" />

          <div>
            <label className="block text-base font-bold text-gray-700 mb-2">Meno a priezvisko</label>
            <input
              type="text"
              name="name"
              required
              className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              placeholder="Napr: Ján Novák"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-base font-bold text-gray-700 mb-2">Telefónne číslo</label>
            <input
              type="tel"
              name="phone"
              required
              className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              placeholder="Napr: +421 900 123 456"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-base font-bold text-gray-700 mb-2">Adresa doručenia</label>
            <input
              type="text"
              name="address"
              required
              className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              placeholder="Napr: Hlavná 10, 811 01 Bratislava"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="bg-green-50 border-2 border-green-400 rounded-xl p-4 flex items-center gap-4">
            <div className="w-6 h-6 rounded-full border-4 border-green-500 bg-white flex-shrink-0"></div>
            <div>
              <span className="font-bold text-gray-800 text-lg">Platba pri prevzatí</span>
              <p className="text-base text-gray-600">Zaplatíte kuriérovi hotovosťou alebo kartou</p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-b from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-black py-5 px-4 rounded-xl shadow-2xl transition-all border-2 border-orange-600 text-xl transform hover:scale-[1.02] active:scale-[0.98]"
          >
            OBJEDNÁVAM ZA 79 €
          </button>

          <div className="flex justify-center items-center gap-2 text-base text-gray-500">
            <Lock size={16} /> Vaše údaje sú v bezpečí a šifrované
          </div>
        </form>
      </div>
    </div>
  );
};

/* --- MAIN PAGE --- */
export default function NovaCleanGGRobotSKUnc() {
  const scrollToOrder = () => {
    const element = document.getElementById('order-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Scripts */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-17321474795"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17321474795');
        `}
      </Script>

      <Script
        src="https://offers.uncappednetwork.com/forms/tmfp/"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <img
        src="https://offers.uncappednetwork.com/forms/api/ck/?o=1259&uid=0191dbf2-738a-7d28-82a0-18c3859d5e8f&lp=1278"
        style={{ width: '1px', height: '1px', display: 'none' }}
        alt=""
      />

      <div className="min-h-screen bg-white font-sans" suppressHydrationWarning>
        {/* Top Bar - NEURO: Urgency + Value proposition */}
        <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white text-center py-3 px-4">
          <span className="text-base md:text-sm font-bold animate-pulse block">
            POSLEDNÉ KUSY! Stanica Omni ZADARMO (179 €) - Iba dnes!
          </span>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Product Section */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Gallery */}
            <div className="lg:w-1/2">
              <ProductGallery />
            </div>

            {/* Right: Info + Price Box */}
            <div className="lg:w-1/2 space-y-6">
              <ProductInfo />

              {/* Desktop Price Box */}
              <div className="hidden lg:block sticky top-4">
                <PriceBox onOrderClick={scrollToOrder} />
              </div>
            </div>
          </div>

          {/* Mobile Price Box */}
          <div className="lg:hidden mt-8">
            <PriceBox onOrderClick={scrollToOrder} />
          </div>

          {/* Sections */}
          <div className="mt-12 space-y-10">
            <FeaturesSection />
            <GifSection />
            <StationSection />
            <SpecsTable />
            <ReviewsSection />
            <FAQSection />

            {/* Order Form */}
            <div className="max-w-xl mx-auto">
              <OrderForm />
            </div>
          </div>

          {/* Guarantee Banner - NEURO: Risk reversal */}
          <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div className="flex-shrink-0">
                <div className="w-28 h-28 md:w-24 md:h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex flex-col items-center justify-center text-white shadow-xl">
                  <span className="text-3xl md:text-2xl font-black">30</span>
                  <span className="text-sm font-bold">DNÍ</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-black text-2xl md:text-xl text-gray-900 mb-2">100% Záruka spokojnosti</h3>
                <p className="text-lg md:text-base text-gray-600">
                  Ak NovaClean X1 nesplní Vaše očakávania, vyzdvihneme ho a vrátime Vám každé euro. <span className="font-bold text-green-700">Bez otázok, bez rizika.</span>
                </p>
              </div>
              <div className="flex-shrink-0 flex gap-6 md:gap-4">
                <div className="text-center">
                  <ShieldCheck className="w-10 h-10 md:w-8 md:h-8 text-green-600 mx-auto" />
                  <span className="text-sm font-semibold text-gray-600 block mt-1">2 roky záruka</span>
                </div>
                <div className="text-center">
                  <RefreshCw className="w-10 h-10 md:w-8 md:h-8 text-blue-600 mx-auto" />
                  <span className="text-sm font-semibold text-gray-600 block mt-1">Vrátenie zadarmo</span>
                </div>
                <div className="text-center">
                  <Truck className="w-10 h-10 md:w-8 md:h-8 text-orange-600 mx-auto" />
                  <span className="text-sm font-semibold text-gray-600 block mt-1">Doručenie 24h</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sticky CTA - NEURO: Always visible action */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-orange-400 p-4 shadow-2xl z-50">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="text-sm text-gray-400 line-through">179 €</div>
              <div className="text-2xl font-black text-green-600">79 €</div>
            </div>
            <button
              onClick={scrollToOrder}
              className="flex-[1.5] bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-black text-lg py-4 rounded-xl border-2 border-orange-600 shadow-lg"
            >
              OBJEDNAŤ TERAZ
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
