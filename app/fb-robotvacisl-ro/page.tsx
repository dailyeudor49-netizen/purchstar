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
            <img src={src} alt={`Vedere ${index + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 relative">
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-red-600 text-white text-sm md:text-xs font-bold px-3 py-1.5 md:px-2 md:py-1 rounded-lg shadow-lg">-57%</span>
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
      {reviews.toLocaleString('ro-RO')} recenzii
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
          ATENȚIE: Doar 7 bucăți rămase în stoc!
        </span>
      </div>

      {/* Price - NEURO: Anchoring with big crossed price */}
      <div className="mb-5 text-center">
        <div className="text-gray-400 line-through text-2xl md:text-xl mb-1">826 Lei</div>
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-5xl md:text-4xl font-black text-green-600">355</span>
          <span className="text-2xl md:text-xl font-bold text-green-600">Lei</span>
        </div>
        <div className="mt-2 inline-block bg-red-100 text-red-700 px-4 py-1.5 rounded-full text-base md:text-sm font-bold">
          Economisești 471 Lei (57%)
        </div>
      </div>

      {/* Countdown - NEURO: Scarcity & Urgency */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-4 mb-5 shadow-lg">
        <div className="text-white text-center">
          <p className="text-sm font-medium mb-1 opacity-90">Promoția se încheie în:</p>
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
            <p className="font-bold text-green-800 text-lg md:text-base">CADOU: Stația Omni</p>
            <p className="text-green-700 text-base md:text-sm">Valoare 826 Lei - Azi 0 Lei!</p>
          </div>
        </div>
      </div>

      {/* Delivery */}
      <div className="mb-5">
        <div className="flex items-center gap-3 text-green-700 font-bold text-lg md:text-base mb-2">
          <Truck size={24} className="text-green-600" />
          LIVRARE GRATUITĂ 24-48 ore
        </div>
      </div>

      {/* Stock Bar - NEURO: Scarcity visualization */}
      <div className="mb-5">
        <div className="flex justify-between text-base md:text-sm mb-2">
          <span className="text-red-600 font-bold">Doar 7 bucăți rămase!</span>
          <span className="text-gray-500">93% vândute</span>
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
        COMAND - PLĂTESC LA LIVRARE
      </button>

      {/* Payment Method - NEURO: Risk reversal */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4">
        <div className="flex items-center justify-center gap-3 text-blue-800">
          <CreditCard size={22} />
          <span className="font-bold text-base md:text-sm">Plată DOAR la livrare</span>
        </div>
        <p className="text-center text-blue-600 text-sm mt-1">Nu riști nimic - verifici mai întâi!</p>
      </div>

      {/* Trust Badges - NEURO: Social proof & Authority */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl">
          <ShieldCheck size={20} className="text-green-600" />
          <span className="text-sm font-semibold text-gray-700">2 ani garanție</span>
        </div>
        <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl">
          <RefreshCw size={20} className="text-blue-600" />
          <span className="text-sm font-semibold text-gray-700">30 zile retur</span>
        </div>
        <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl">
          <Lock size={20} className="text-gray-600" />
          <span className="text-sm font-semibold text-gray-700">Tranzacție sigură</span>
        </div>
        <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl">
          <Award size={20} className="text-orange-600" />
          <span className="text-sm font-semibold text-gray-700">Certificat CE</span>
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
      NovaClean X1 - Robotul care se <span className="text-orange-500">Curăță Singur</span> și <span className="text-green-600">Îți Economisește Timpul</span>
    </h1>

    <StarRating rating={5} reviews={1248} />

    {/* Social Proof Bar - NEURO: Bandwagon effect */}
    <div className="bg-gradient-to-r from-orange-50 to-green-50 border border-orange-200 rounded-xl p-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-green-700 font-bold text-lg md:text-base flex items-center gap-2">
          <CheckCircle size={20} className="text-green-600" />
          Peste 5000+ clienți mulțumiți
        </span>
        <span className="flex items-center gap-2 text-orange-600 font-semibold text-base md:text-sm bg-orange-100 px-3 py-1 rounded-full">
          <Users size={16} />
          47 persoane vizualizează acum
        </span>
      </div>
    </div>

    <hr className="border-gray-200" />

    {/* Key Benefits - NEURO: Emotional triggers, loss aversion, future pacing */}
    <div className="space-y-4">
      <h3 className="font-black text-xl md:text-lg text-gray-900 flex items-center gap-2">
        <Sparkles className="text-orange-500" size={24} />
        Ce primești:
      </h3>
      <ul className="space-y-4">
        <li className="flex items-start gap-4 bg-green-50 p-4 rounded-xl border-l-4 border-green-500">
          <Check size={28} className="text-green-600 flex-shrink-0" />
          <div>
            <span className="font-bold text-lg md:text-base text-gray-900 block">Câștigă 2-3 ore ZILNIC</span>
            <span className="text-gray-600 text-base md:text-sm">Robotul curăță în locul tău - Tu te odihnești sau petreci timp cu familia</span>
          </div>
        </li>
        <li className="flex items-start gap-4 bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
          <Check size={28} className="text-blue-600 flex-shrink-0" />
          <div>
            <span className="font-bold text-lg md:text-base text-gray-900 block">ZERO contact cu murdăria</span>
            <span className="text-gray-600 text-base md:text-sm">Stația Omni golește, spală și usucă automat - 60 de zile nu atingi praful!</span>
          </div>
        </li>
        <li className="flex items-start gap-4 bg-purple-50 p-4 rounded-xl border-l-4 border-purple-500">
          <Check size={28} className="text-purple-600 flex-shrink-0" />
          <div>
            <span className="font-bold text-lg md:text-base text-gray-900 block">Casa MEREU pregătită pentru oaspeți</span>
            <span className="text-gray-600 text-base md:text-sm">Navigare LiDAR 360° - curăță sub mobilă, ocolește obstacolele, nu cade pe scări</span>
          </div>
        </li>
        <li className="flex items-start gap-4 bg-yellow-50 p-4 rounded-xl border-l-4 border-yellow-500">
          <Check size={28} className="text-yellow-600 flex-shrink-0" />
          <div>
            <span className="font-bold text-lg md:text-base text-gray-900 block">Ideal pentru alergici și proprietari de animale</span>
            <span className="text-gray-600 text-base md:text-sm">Filtru HEPA H13 captează 99,97% din alergeni - respiri aer curat</span>
          </div>
        </li>
        <li className="flex items-start gap-4 bg-orange-50 p-4 rounded-xl border-l-4 border-orange-500">
          <Check size={28} className="text-orange-600 flex-shrink-0" />
          <div>
            <span className="font-bold text-lg md:text-base text-gray-900 block">Funcționează silențios, chiar și noaptea</span>
            <span className="text-gray-600 text-base md:text-sm">Doar 55dB - poți dormi, te uiți la TV sau lucrezi fără deranj</span>
          </div>
        </li>
      </ul>
    </div>

    {/* What's in the box - NEURO: Perceived value stacking */}
    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-300 rounded-2xl p-5 md:p-4">
      <h3 className="font-black text-xl md:text-lg text-gray-900 mb-4 flex items-center gap-2">
        <Package className="text-orange-500" size={24} />
        Pachetul complet include:
      </h3>
      <div className="grid grid-cols-1 gap-3">
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm">
          <CheckCircle size={24} className="text-orange-500" />
          <span className="font-bold text-base text-gray-900">NovaStation Omni (valoare 826 Lei) - CADOU!</span>
        </div>
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm">
          <CheckCircle size={24} className="text-green-500" />
          <span className="text-base text-gray-700">NovaClean X1 Robot cu navigare LiDAR</span>
        </div>
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm">
          <CheckCircle size={24} className="text-green-500" />
          <span className="text-base text-gray-700">Telecomandă + baterii</span>
        </div>
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm">
          <CheckCircle size={24} className="text-green-500" />
          <span className="text-base text-gray-700">2x perii laterale + 2x saci 3L</span>
        </div>
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm">
          <CheckCircle size={24} className="text-green-500" />
          <span className="text-base text-gray-700">Instrucțiuni în limba română</span>
        </div>
      </div>
    </div>
  </div>
);

/* --- SPECS TABLE --- */
const SpecsTable: React.FC = () => {
  const specs = [
    { label: 'Putere aspirare', value: '6000 Pa', detail: 'Motor Nidec Brushless (Japonia)' },
    { label: 'Baterie', value: '5200 mAh', detail: 'Până la 180 min funcționare' },
    { label: 'Navigare', value: 'LiDAR LDS 4.0', detail: 'Cartografiere 360° + SLAM AI' },
    { label: 'Zgomot', value: '< 55 dB', detail: 'Mod noapte ultra-silențios' },
    { label: 'Conectivitate', value: 'WiFi 2.4/5 GHz', detail: 'Alexa, Google Home, App' },
    { label: 'Recipient praf', value: '3L (stație) / 400ml (robot)', detail: 'Golire automată 60 zile' },
    { label: 'Obstacole', value: 'Până la 20 mm', detail: 'Roți Off-Road' },
    { label: 'Filtrare', value: 'HEPA H13', detail: '99,97% microparticule' },
  ];

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <div className="bg-gray-100 px-5 py-4 border-b border-gray-200">
        <h3 className="font-black text-xl md:text-lg text-gray-900">Specificații tehnice</h3>
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
      title: "2-în-1: Aspirare și Mop",
      desc: "Motorul ciclon aspiră praful, laveta din microfibră îndepărtează petele persistente. O singură trecere, efect dublu."
    },
    {
      icon: <Navigation className="w-8 h-8" />,
      title: "Navigare Smart 3.0",
      desc: "Nu cade pe scări și nu lovește violent. Senzorii IR cartografiază încăperea și ocolesc obstacolele."
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Control Total de pe Telefon",
      desc: "Folosește telecomanda sau aplicația inclusă. Pornește curățenia de la birou și vino acasă într-o casă strălucitoare."
    },
    {
      icon: <Battery className="w-8 h-8" />,
      title: "Încărcare Automată",
      desc: "Când bateria se descarcă, se întoarce singur la NovaStation, se încarcă, se golește și continuă."
    },
    {
      icon: <Wind className="w-8 h-8" />,
      title: "Super Silențios - 55dB",
      desc: "Mai puțin de 65dB. Poți privi la TV sau adormi copiii în timp ce lucrează silențios."
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Filtru HEPA H13",
      desc: "Captează 99,9% din alergeni și praf fin. Ideal pentru alergici și proprietari de animale."
    }
  ];

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <div className="bg-gray-100 px-5 py-4 border-b border-gray-200">
        <h3 className="font-black text-xl md:text-lg text-gray-900">De ce NovaClean X1?</h3>
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
      <h3 className="font-black text-xl md:text-lg text-white text-center">Vezi NovaClean X1 în acțiune!</h3>
    </div>
    <div className="p-4 flex justify-center bg-gray-50">
      <img
        src="/gif/robot/gif.gif"
        alt="NovaClean X1 în acțiune"
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
        CADOU: Stația NovaStation Omni (valoare 826 Lei)
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
              <h4 className="font-bold text-gray-900 text-lg md:text-base">Golire Automată</h4>
              <p className="text-gray-600 text-base md:text-sm">Sacul de 3L ajunge pentru 2 luni!</p>
            </div>
          </div>
          <div className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-orange-100">
            <Droplets className="text-blue-500 flex-shrink-0" size={32} />
            <div>
              <h4 className="font-bold text-gray-900 text-lg md:text-base">Spălare și Schimbare Apă</h4>
              <p className="text-gray-600 text-base md:text-sm">Mop mereu curat automat</p>
            </div>
          </div>
          <div className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-orange-100">
            <Wind className="text-gray-500 flex-shrink-0" size={32} />
            <div>
              <h4 className="font-bold text-gray-900 text-lg md:text-base">Uscare la 45°C</h4>
              <p className="text-gray-600 text-base md:text-sm">Fără mucegai și mirosuri neplăcute</p>
            </div>
          </div>
          <div className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-orange-100">
            <Zap className="text-yellow-500 flex-shrink-0" size={32} />
            <div>
              <h4 className="font-bold text-gray-900 text-lg md:text-base">Încărcare Rapidă</h4>
              <p className="text-gray-600 text-base md:text-sm">+30% mai rapid pregătit de lucru</p>
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
      name: "Marian K.",
      verified: true,
      rating: 5,
      date: "acum 2 zile",
      title: "Mai bun decât iRobot la jumătate de preț!",
      text: "Sincer, am fost sceptic din cauza prețului. Dar aspiră mai bine decât vechiul meu iRobot de 2000 Lei. Părul de câine nu mai este o problemă.",
      helpful: 47
    },
    {
      name: "Ana M.",
      verified: true,
      rating: 5,
      date: "acum o săptămână",
      title: "Livrare rapidă, produs super",
      text: "A ajuns în 24 de ore. Curățenia cu mop nu este la fel de profundă ca manual, dar pentru menținerea curățeniei zilnice este ideal. Recomand!",
      helpful: 32
    },
    {
      name: "Petru N.",
      verified: true,
      rating: 5,
      date: "acum 3 zile",
      title: "Cea mai bună achiziție a anului",
      text: "Bateria este incredibilă. Curăță tot apartamentul meu de 80m² și încă rămâne încărcare. Cea mai bună achiziție a anului pentru soție (și pentru mine).",
      helpful: 28
    }
  ];

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <div className="bg-gray-100 px-5 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h3 className="font-black text-xl md:text-lg text-gray-900">Recenzii clienți</h3>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={20} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-lg md:text-base font-bold">4.9 din 5</span>
            <span className="text-base md:text-sm text-gray-500">(1.248 recenzii)</span>
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
            <div className="text-base md:text-sm text-gray-500 mt-2">1.248 recenzii</div>
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
                <span className="w-14 text-blue-600 font-semibold">{row.stars} st.</span>
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
                      <CheckCircle size={14} /> Achiziție verificată
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
                <p className="text-sm text-gray-500 mb-2">Data recenziei: {review.date}</p>
                <p className="text-base md:text-sm text-gray-700 leading-relaxed">{review.text}</p>
                <div className="mt-3 flex items-center gap-4">
                  <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-green-600 bg-gray-100 hover:bg-green-50 px-3 py-1.5 rounded-full transition">
                    <ThumbsUp size={16} /> Util ({review.helpful})
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
      question: "Se descurcă bine cu părul de animale?",
      answer: "Absolut da. Peria centrală în formă de V și aspirația ciclonică puternică au fost concepute special pentru a colecta părul de câine și pisică fără să se încurce."
    },
    {
      question: "Unde găsesc piese de schimb?",
      answer: "Oferim kituri de piese de schimb (perii, filtre HEPA, lavete) direct pe site-ul nostru la prețuri de fabrică. În plus, componentele sunt universale și ușor de găsit."
    },
    {
      question: "Garanția acoperă defecțiunile?",
      answer: "Da, oferim Garanție Directă de 2 ani. Dacă robotul are un defect tehnic, îl înlocuim gratuit cu unul nou. Suport 100% în limba română."
    },
    {
      question: "Cum funcționează plata la livrare?",
      answer: "Foarte simplu. Comanzi acum completând formularul, nu plătești nimic online. Vei plăti cash direct curierului la livrarea coletului (de obicei în 24/48 ore)."
    },
    {
      question: "Am nevoie de WiFi pentru funcționare?",
      answer: "Nu! Robotul funcționează perfect pur și simplu apăsând butonul 'Start' sau folosind telecomanda inclusă. Aplicația WiFi este un bonus opțional pentru cei care vor să îl programeze de acasă."
    }
  ];

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <div className="bg-gray-100 px-5 py-4 border-b border-gray-200">
        <h3 className="font-black text-xl md:text-lg text-gray-900">Întrebări Frecvente</h3>
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
        uid: '019bbd3b-0068-7ba3-b472-c0cccc3adcea',
        key: 'cdcb358f4654ad7580ddee',
        offer: '2660',
        lp: '4912',
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
      const subid = urlParams.get('subid');
      const subid2 = urlParams.get('subid2');
      const subid3 = urlParams.get('subid3');
      const subid4 = urlParams.get('subid4');
      const pubid = urlParams.get('pubid');

      if (utmSource) params.append('utm_source', utmSource);
      if (utmMedium) params.append('utm_medium', utmMedium);
      if (utmCampaign) params.append('utm_campaign', utmCampaign);
      if (utmContent) params.append('utm_content', utmContent);
      if (utmTerm) params.append('utm_term', utmTerm);
      if (subid) params.append('subid', subid);
      if (subid2) params.append('subid2', subid2);
      if (subid3) params.append('subid3', subid3);
      if (subid4) params.append('subid4', subid4);
      if (pubid) params.append('pubid', pubid);

      await fetch('https://offers.islaffiliate.com/forms/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      router.push('/ty/ty-fb-robotvacisl-ro');
    } catch (error) {
      console.error('[ISL API] Error:', error);
      router.push('/ty/ty-fb-robotvacisl-ro');
    }
  };

  return (
    <div id="order-form" className="border-4 border-orange-500 rounded-2xl overflow-hidden bg-white shadow-2xl">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 px-5 py-4">
        <h3 className="font-black text-white text-center text-2xl md:text-xl">COMANDĂ ACUM</h3>
        <p className="text-orange-100 text-center text-base md:text-sm mt-1">Plată DOAR la livrare - 0 Lei risc!</p>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="hidden" name="tmfp" />
          <input type="hidden" name="offer" value="2660" />

          <div>
            <label className="block text-base font-bold text-gray-700 mb-2">Nume și prenume</label>
            <input
              type="text"
              name="name"
              required
              className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              placeholder="Ex: Ion Popescu"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-base font-bold text-gray-700 mb-2">Număr de telefon</label>
            <input
              type="tel"
              name="phone"
              required
              className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              placeholder="Ex: +40 721 234 567"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-base font-bold text-gray-700 mb-2">Adresa de livrare</label>
            <input
              type="text"
              name="address"
              required
              className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              placeholder="Str. Exemplu nr. 10, București"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="bg-green-50 border-2 border-green-400 rounded-xl p-4 flex items-center gap-4">
            <div className="w-6 h-6 rounded-full border-4 border-green-500 bg-white flex-shrink-0"></div>
            <div>
              <span className="font-bold text-gray-800 text-lg">Plată la livrare</span>
              <p className="text-base text-gray-600">Cu numerar sau card la curier</p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-b from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-black py-5 px-4 rounded-xl shadow-2xl transition-all border-2 border-orange-600 text-xl transform hover:scale-[1.02] active:scale-[0.98]"
          >
            COMAND LA 355 LEI
          </button>

          <div className="flex justify-center items-center gap-2 text-base text-gray-500">
            <Lock size={16} /> Datele tale sunt sigure și criptate
          </div>
        </form>
      </div>
    </div>
  );
};

/* --- MAIN PAGE --- */
export default function NovaCleanFBRobotVacISLRO() {
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
        src="https://offers.islaffiliate.com/forms/tmfp/"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <img
        src="https://offers.islaffiliate.com/forms/api/ck/?o=2660&uid=019bbd3b-0068-7ba3-b472-c0cccc3adcea&lp=4912"
        style={{ width: '1px', height: '1px', display: 'none' }}
        alt=""
      />

      <div className="min-h-screen bg-white font-sans" suppressHydrationWarning>
        {/* Top Bar - NEURO: Urgency + Value proposition */}
        <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white text-center py-3 px-4">
          <span className="text-base md:text-sm font-bold animate-pulse block">
            ULTIMELE BUCĂȚI! Stația Omni CADOU (826 Lei) - Doar azi!
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
                  <span className="text-sm font-bold">ZILE</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-black text-2xl md:text-xl text-gray-900 mb-2">Garanție 100% Satisfacție</h3>
                <p className="text-lg md:text-base text-gray-600">
                  Dacă NovaClean X1 nu îndeplinește așteptările tale, îl preluăm și îți returnăm fiecare leu. <span className="font-bold text-green-700">Fără întrebări, fără risc.</span>
                </p>
              </div>
              <div className="flex-shrink-0 flex gap-6 md:gap-4">
                <div className="text-center">
                  <ShieldCheck className="w-10 h-10 md:w-8 md:h-8 text-green-600 mx-auto" />
                  <span className="text-sm font-semibold text-gray-600 block mt-1">2 ani garanție</span>
                </div>
                <div className="text-center">
                  <RefreshCw className="w-10 h-10 md:w-8 md:h-8 text-blue-600 mx-auto" />
                  <span className="text-sm font-semibold text-gray-600 block mt-1">Retur gratuit</span>
                </div>
                <div className="text-center">
                  <Truck className="w-10 h-10 md:w-8 md:h-8 text-orange-600 mx-auto" />
                  <span className="text-sm font-semibold text-gray-600 block mt-1">Livrare 24h</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sticky CTA - NEURO: Always visible action */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-orange-400 p-4 shadow-2xl z-50">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="text-sm text-gray-400 line-through">826 Lei</div>
              <div className="text-2xl font-black text-green-600">355 Lei</div>
            </div>
            <button
              onClick={scrollToOrder}
              className="flex-[1.5] bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-black text-lg py-4 rounded-xl border-2 border-orange-600 shadow-lg"
            >
              COMANDĂ ACUM
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
