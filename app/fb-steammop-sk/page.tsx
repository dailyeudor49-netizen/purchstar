'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  CheckCircle2,
  XCircle,
  Truck,
  ShieldCheck,
  Wallet,
  Star,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Zap,
  Clock,
  Droplets,
  Wind,
  Thermometer,
  Maximize,
  Scissors,
  Gauge,
  ZapIcon,
  ShoppingBag
} from 'lucide-react';
import { motion } from 'motion/react';

// --- CONSTANTS & CONFIG ---
const BRAND_NAME = "VAPORWASH PRO+";
const PRO_SERIES = "(PRO Series)";
const SLOGAN = "Vys\u00e1va, umyje a dezinfikuje v jednom \u0165ahu.";
const PRICE_CURRENT = "109";
const PRICE_OLD = "220";
const DISCOUNT = "-50%";
const CURRENCY = "\u20ac";

const API_CONFIG = {
  url: 'https://offers.italiadrop.com/forms/api/',
  uid: '019be4ed-fb60-7ba4-89d4-deecc13c8b0a',
  key: '7b172b0b1994e9fa9961ad',
  offer: '3042',
  lp: '3078',
};

// --- COMPONENTS ---

const Badge = ({ children, icon: Icon }: { children: React.ReactNode; icon: any }) => (
  <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/20">
    <Icon size={14} className="text-green-400" />
    <span>{children}</span>
  </div>
);

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
  <div className="text-center mb-12 px-4">
    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 leading-none">
      {children}
    </h2>
    {subtitle && <p className="text-xl text-zinc-600 font-medium">{subtitle}</p>}
  </div>
);

const CTAButton = ({ className = "", children }: { className?: string; children?: React.ReactNode }) => (
  <a
    href="#order-form"
    className={`inline-flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 text-white font-black text-xl md:text-2xl py-5 px-8 rounded-xl transition-all transform hover:scale-105 shadow-xl uppercase tracking-tight ${className}`}
  >
    <ShoppingBag size={28} />
    {children || "OBJEDNA\u0164 TERAZ \u2013 PLATBA NA DOB\u00ceRKU"}
  </a>
);

// --- MAIN CONTENT ---

function LandingPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(900);
  const [heroSlide, setHeroSlide] = useState(0);
  const [status, setStatus] = useState<'idle' | 'submitting'>('idle');
  const [formData, setFormData] = useState({ name: '', tel: '', address: '' });
  const [fingerprint, setFingerprint] = useState('');
  const [ipAddress, setIpAddress] = useState('');

  const heroImages = [
    "/images/steammop/hero.webp",
    "/images/steammop/hero2.webp",
    "/images/steammop/hero3.webp"
  ];

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    const getFingerprint = async () => {
      try {
        const components = [
          navigator.userAgent, navigator.language,
          screen.width + 'x' + screen.height, screen.colorDepth,
          new Date().getTimezoneOffset(), navigator.hardwareConcurrency, navigator.platform
        ];
        const raw = components.join('|');
        const data = new TextEncoder().encode(raw);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        setFingerprint(Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join(''));
      } catch { /* fingerprint failed */ }
    };
    const getIp = async () => {
      try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        setIpAddress(data.ip);
      } catch { /* IP fetch failed */ }
    };
    getFingerprint();
    getIp();
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const prevSlide = () => setHeroSlide((c) => (c === 0 ? heroImages.length - 1 : c - 1));
  const nextSlide = () => setHeroSlide((c) => (c === heroImages.length - 1 ? 0 : c + 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const body = new URLSearchParams();
      body.append('uid', API_CONFIG.uid);
      body.append('key', API_CONFIG.key);
      body.append('offer', API_CONFIG.offer);
      body.append('lp', API_CONFIG.lp);
      body.append('name', formData.name);
      body.append('tel', formData.tel);
      body.append('street-address', formData.address);

      if (fingerprint) {
        body.append('tmfp', fingerprint);
      } else {
        if (ipAddress) body.append('ip', ipAddress);
        body.append('ua', navigator.userAgent);
      }

      const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'subid', 'subid2', 'subid3', 'subid4', 'pubid'];
      utmParams.forEach(param => {
        const val = searchParams.get(param);
        if (val) body.append(param, val);
      });

      await fetch(API_CONFIG.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        mode: 'no-cors',
      });
      router.push('/fb-steammop-sk/ty');
    } catch {
      router.push('/fb-steammop-sk/ty');
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-green-100 selection:text-green-900 overflow-x-hidden">

      {/* --- HERO SECTION --- */}
      <header className="relative bg-zinc-950 text-white pt-12 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-zinc-900 to-transparent opacity-50 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded mb-4 animate-pulse">
              {"POSLEDN\u00c9 KUSY V AKCII"}
            </div>
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-4 max-w-5xl">
              {"Prv\u00fd skuto\u010dn\u00fd 3-v-1, ktor\u00fd"} <span className="text-green-400">{"VYS\u00c1VA + UMYJE + DEZINFIKUJE PAROU"}</span> {"v jednom \u0165ahu."}
            </h1>
            <p className="text-xl md:text-2xl font-medium text-zinc-400 max-w-3xl mb-8">
              {"Mop na mokro aj sucho ka\u017ed\u00fd de\u0148 + dezinfekcia parou, ke\u010f treba. \u017diadna ch\u00e9mia, \u017eiadne z\u00e1pachy."}
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <Badge icon={Wallet}>{"Platba na dob\u00eerku"}</Badge>
              <Badge icon={Truck}>{"Doprava 24/48h"}</Badge>
              <Badge icon={ShieldCheck}>{"Z\u00e1ruka 1 rok"}</Badge>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="aspect-square bg-zinc-800 rounded-2xl overflow-hidden shadow-2xl border border-zinc-700 relative">
                {heroImages.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`VAPORWASH PRO+ - ${i + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === heroSlide ? 'opacity-100' : 'opacity-0'}`}
                  />
                ))}
                <button onClick={prevSlide} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-colors z-10">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={nextSlide} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-colors z-10">
                  <ChevronRight size={24} />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {heroImages.map((_, i) => (
                    <button key={i} onClick={() => setHeroSlide(i)} className={`w-3 h-3 rounded-full transition-all ${i === heroSlide ? 'bg-green-500 scale-125' : 'bg-white/50 hover:bg-white/80'}`} />
                  ))}
                </div>
              </div>
              <div className="mt-4 bg-zinc-900 p-4 rounded-xl border border-white/10">
                <div className="flex items-baseline justify-center gap-3">
                  <span className="text-3xl font-black text-white">{PRICE_CURRENT} {CURRENCY}</span>
                  <span className="text-lg text-zinc-500 line-through">{PRICE_OLD} {CURRENCY}</span>
                  <span className="bg-red-600 text-white text-sm font-black px-2 py-0.5 rounded">{DISCOUNT}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {[
                "Skuto\u010dn\u00fd 3-v-1: vys\u00e1va, umyje a dezinfikuje parou v jednom \u0165ahu",
                "Koniec s rozm\u00e1zan\u00edm \u0161piny: neust\u00e1ly obeh \u010distej vody",
                "Rozp\u00fa\u0161\u0165a lepiv\u00fa \u0161pinu: para o vysokej teplote na mastnotu a \u0161kvrny",
                "Samo\u010distenie v 60\u00b0C: valec um\u00fdvan\u00fd za hor\u00faca, v\u017edy hygienick\u00fd",
                "Su\u0161enie hor\u00facim vzduchom: \u017eiadny z\u00e1pach mokrej handry",
                "Hrany z 2 str\u00e1n: sokle a rohy kone\u010dne \u010dist\u00e9",
                "Syst\u00e9m anti-hair: hrebe\u0148 strih\u00e1 a rozp\u00fat\u00e1va vlasy",
                "Siln\u00e9 nasanie 16 000 Pa: zbiera such\u00fa aj mokr\u00fa \u0161pinu",
                "Asistovan\u00fd pohon: menej n\u00e1mahy, viac r\u00fdchlosti",
                "Dokovacia stanica 3-v-1: odlo\u017e, nabite, vy\u010disti a vysu\u0161"
              ].map((bullet, i) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={i}
                  className="flex items-start gap-3 group"
                >
                  <div className="mt-1 bg-green-600 p-1 rounded-full text-white shrink-0 group-hover:scale-110 transition-transform">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-lg md:text-xl font-bold text-zinc-200 leading-tight">{bullet}</span>
                </motion.div>
              ))}
              <div className="pt-8">
                <CTAButton className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- DEMO GRID --- */}
      <section className="py-20 bg-zinc-50">
        <div className="container mx-auto px-4">
          <SectionTitle subtitle={"Pokro\u010dil\u00e1 technol\u00f3gia pre \u010distotu bez kompromisov"}>
            {"Pre\u010do si vybra\u0165"} <span className="text-green-600">VAPORWASH PRO+</span>
          </SectionTitle>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { label: "\u010cIST\u00c1 VODA", title: "V\u017edy \u010dist\u00e1 voda", tech: "Neust\u00e1ly obeh \u010distej vody", desc: "Nerozm\u00e1zava \u0161pinav\u00fa vodu: umyjete v\u017edy \u010dist\u00fdm valcom.", icon: Droplets, img: "/images/steammop/acquapulita.webp" },
              { label: "HYGIENA", title: "\u017diadna ch\u00e9mia", tech: "Dezinfekcia parou \u2013 len vodou", desc: "Ke\u010f treba, zap\u00ednate paru a hotovo.", icon: ShieldCheck, img: "/images/steammop/vapormax.jpg" },
              { label: "MASTNOTA KO", title: "Lepiv\u00e1 \u0161pina rozpusten\u00e1", tech: "Para o vysokej teplote", desc: "Odlepuje mastnotu a odolne \u0161kvrny.", icon: Thermometer, img: "/images/steammop/sporcoappiccicoso.webp" },
              { label: "HRANY", title: "\u010cist\u00e9 sokle", tech: "Umytie hrana k hrane z 2 str\u00e1n", desc: "Nezan\u00e1cha \u010diernu \u010diaru pozdĺ\u017e steny.", icon: Maximize, img: "/images/steammop/battiscopa.webp" },
              { label: "ANTI-HAIR", title: "Strih\u00e1 zamotane vlasy", tech: "Rozp\u00fatavac\u00ed hrebe\u0148", desc: "Vlasy a chlpy neupchan\u00e1vaj\u00fa valec.", icon: Scissors, img: "/images/steammop/grovigli.webp" },
              { label: "PREV\u00c1DZA \u0164A", title: "Inteligentn\u00fd displej", tech: "Vizu\u00e1lna sp\u00e4tn\u00e1 v\u00e4zba v re\u00e1lnom \u010dase", desc: "Viete, kedy je podlaha naozaj \u010dist\u00e1.", icon: Gauge, img: "/images/steammop/schermo.jpeg" },
              { label: "AUTO-CLEAN", title: "Valec um\u00fdvan\u00fd za hor\u00faca", tech: "HOT WASH 60\u00b0C", desc: "Skuto\u010dn\u00e1 hygiena, nie len opl\u00e1chnutie.", icon: Zap, img: "/images/steammop/rullolavatoacaldo.webp" },
              { label: "BEZ Z\u00c1PACHU", title: "Such\u00fd valec", tech: "Su\u0161enie hor\u00facim vzduchom 30 min", desc: "\u017diadny z\u00e1pach mokrej handry.", icon: Wind, img: "/images/steammop/rulloasciutto.webp" },
              { label: "SILA", title: "Such\u00e1 aj mokr\u00e1 \u0161pina", tech: "Siln\u00e9 nasanie", desc: "Zbiera omrvinky aj tekutiny naraz.", icon: ZapIcon, img: "/images/steammop/sporcosecco+umido.webp" },
              { label: "BEZ N\u00c1MAHY", title: "Asistovan\u00fd pohon", tech: "Motorizovan\u00fd n\u00e1hon", desc: "Vy vediete, on ide.", icon: Gauge, img: "/images/steammop/trazioneassistita.webp" },
            ].map((card, i) => (
              <motion.div
                whileHover={{ y: -5 }}
                key={i}
                className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200 flex flex-col h-full"
              >
                <div className="text-[10px] font-black tracking-widest text-zinc-400 mb-2 uppercase">{card.label}</div>
                <div className="bg-green-100 text-green-700 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                  <card.icon size={24} />
                </div>
                <h3 className="text-xl font-black leading-none mb-2 uppercase">{card.title}</h3>
                <p className="text-sm font-bold text-green-600 mb-2">{card.tech}</p>
                <p className="text-zinc-600 text-sm leading-relaxed">{card.desc}</p>
                <div className="mt-auto pt-4">
                  <div className="aspect-square bg-zinc-100 rounded-lg overflow-hidden border border-zinc-100">
                    <img src={card.img} alt={card.title} className="w-full h-full object-cover" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROBL\u00c9M / AGIT\u00c1CIA --- */}
      <section className="py-16 md:py-20 bg-zinc-900 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-8 md:mb-12 tracking-tighter">
            {"St\u00e1le ot\u00e1\u010dka star\u00e9ho mopu?"}
          </h2>
          <div className="space-y-4 md:space-y-8">
            <div className="flex items-center gap-4 md:gap-6 text-left bg-white/5 p-4 md:p-6 rounded-2xl border border-white/10">
              <XCircle className="text-red-500 shrink-0" size={28} />
              <p className="text-lg md:text-2xl font-bold italic">{"\"M\u00e1te dos\u0165 najsk\u00f4r zamet\u00e1... potom mopom... a potom lepkavej podlahy?\""}</p>
            </div>
            <div className="flex items-center gap-4 md:gap-6 text-left bg-white/5 p-4 md:p-6 rounded-2xl border border-white/10">
              <XCircle className="text-red-500 shrink-0" size={28} />
              <p className="text-lg md:text-2xl font-bold italic">{"\"Handra smrd\u00ed? To znamen\u00e1, \u017ee len rozm\u00e1zavate \u0161pinu a bakt\u00e9rie.\""}</p>
            </div>
            <div className="flex items-center gap-4 md:gap-6 text-left bg-white/5 p-4 md:p-6 rounded-2xl border border-white/10">
              <XCircle className="text-red-500 shrink-0" size={28} />
              <p className="text-lg md:text-2xl font-bold italic">{"\"A rohy? V\u017edy t\u00e1 \u010dierna \u010diara pozdĺ\u017e sokla...\""}</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- RIE\u0160ENIE --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="inline-block bg-green-600 text-white text-sm font-black px-4 py-1 rounded-full mb-6 uppercase tracking-widest">
            {"Definit\u00edvne rie\u0161enie"}
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">
            <span className="text-green-600">VAPORWASH PRO+</span>{" odvedie v\u0161etku pr\u00e1cu v jednom \u0165ahu: vys\u00e1va, umyje, a ke\u010f treba \u2013 dezinfikuje parou."}
          </h2>
          <p className="text-2xl md:text-3xl font-black text-zinc-500 uppercase italic mb-12">{"\"Stla\u010dte 1 tla\u010didlo. Hotovo.\""}</p>

          <div className="aspect-video bg-zinc-100 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-4 md:border-8 border-zinc-50 mb-8 md:mb-12">
            <img src="/images/steammop/h12-pro-ultra-pc-frame1_9_1600x.webp" alt="VAPORWASH PRO+ v akcii" className="w-full h-full object-cover" />
          </div>
          <CTAButton />
        </div>
      </section>

      {/* --- AKO TO FUNGUJE --- */}
      <section className="py-20 bg-zinc-50">
        <div className="container mx-auto px-4">
          <SectionTitle>{"Jednoduch\u00e9 ako 1, 2, 3"}</SectionTitle>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Naplnte n\u00e1dr\u017e", desc: "Detergent volite\u013en\u00fd", img: "/images/steammop/h12-pro-ultra-pc-frame1_6_800x.webp" },
              { step: "2", title: "Zapnite re\u017eim AUTO alebo STEAM", desc: "Inteligentn\u00e9 riadenie v\u00fdkonu", img: "/images/steammop/vapormax.jpg" },
              { step: "3", title: "Odlo\u017ete do stanice: samo\u010distenie a su\u0161enie", desc: "\u017diadna \u00fadr\u017eba", img: "/images/steammop/rullolavatoacaldo.webp" },
            ].map((s, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-200 text-center relative overflow-hidden group">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-green-600 text-white flex items-center justify-center text-5xl font-black rounded-full pt-4 pl-4">
                  {s.step}
                </div>
                <div className="aspect-square bg-zinc-100 rounded-2xl mb-6 overflow-hidden">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-2xl font-black uppercase mb-2 leading-tight">{s.title}</h3>
                <p className="text-zinc-500 font-bold">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MY VS ONI --- */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle>{"Porovnanie hovor\u00ed samo za seba"}</SectionTitle>

          {/* Mobile */}
          <div className="md:hidden space-y-3">
            {[
              { label: "Skuto\u010dn\u00fd 3-v-1", v: "Ano", m: "Nie", l: "Len 2-v-1" },
              { label: "Dezinfekcia parou", v: "Ano", m: "Nie", l: "Nie" },
              { label: "V\u017edy \u010dist\u00e1 voda", v: "Ano", m: "Nie", l: "Ano" },
              { label: "Hrany z 2 str\u00e1n", v: "Ano", m: "Nie", l: "Nie" },
              { label: "Syst\u00e9m anti-hair", v: "Ano", m: "Nie", l: "Nie" },
              { label: "Samo\u010distenie za hor\u00faca", v: "Ano", m: "Nie", l: "Nie" },
              { label: "\u00daspora \u010dasu", v: "80%", m: "0%", l: "40%" },
              { label: "\u017diadne z\u00e1pachy", v: "Ano", m: "Nie", l: "Nie" },
            ].map((row, i) => (
              <div key={i} className="border border-zinc-200 rounded-xl overflow-hidden">
                <div className="bg-zinc-900 text-white p-3 text-center font-black uppercase text-sm tracking-wider">{row.label}</div>
                <div className="grid grid-cols-3 divide-x divide-zinc-100">
                  <div className="p-3 text-center bg-green-50">
                    <span className="block text-[10px] uppercase font-black text-zinc-400 mb-1">PRO+</span>
                    <span className="text-green-600 font-black text-sm">{row.v}</span>
                  </div>
                  <div className="p-3 text-center">
                    <span className="block text-[10px] uppercase font-black text-zinc-400 mb-1">Mop</span>
                    <span className="text-zinc-400 font-bold text-sm">{row.m}</span>
                  </div>
                  <div className="p-3 text-center">
                    <span className="block text-[10px] uppercase font-black text-zinc-400 mb-1">{"Star\u00e9"}</span>
                    <span className="text-zinc-400 font-bold text-sm">{row.l}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop */}
          <div className="hidden md:block overflow-hidden rounded-2xl border border-zinc-200 shadow-lg">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-zinc-950 text-white">
                  <th className="p-5 text-left text-lg font-black uppercase border-r border-white/10">{"Vlastnos\u0165"}</th>
                  <th className="p-5 text-center text-lg font-black uppercase bg-green-600 border-r border-white/10">VAPORWASH PRO+</th>
                  <th className="p-5 text-center text-lg font-black uppercase border-r border-white/10">{"Mop/Metla"}</th>
                  <th className="p-5 text-center text-lg font-black uppercase">{"Star\u00e9 modely"}</th>
                </tr>
              </thead>
              <tbody className="text-lg font-bold">
                {[
                  { label: "Skuto\u010dn\u00fd 3-v-1", v: true, m: false, l: "Len 2-v-1" },
                  { label: "Dezinfekcia parou", v: true, m: false, l: false },
                  { label: "V\u017edy \u010dist\u00e1 voda", v: true, m: false, l: true },
                  { label: "Hrany z 2 str\u00e1n", v: true, m: false, l: false },
                  { label: "Syst\u00e9m anti-hair", v: true, m: false, l: false },
                  { label: "Samo\u010distenie za hor\u00faca", v: true, m: false, l: false },
                  { label: "\u00daspora \u010dasu", v: "80%", m: "0%", l: "40%" },
                  { label: "\u017diadne z\u00e1pachy", v: true, m: false, l: false },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-zinc-50" : "bg-white"}>
                    <td className="p-5 border border-zinc-200 uppercase tracking-tight">{row.label}</td>
                    <td className="p-5 border border-zinc-200 text-center bg-green-50">
                      {typeof row.v === 'boolean' ? (row.v ? <CheckCircle2 className="mx-auto text-green-600" /> : <XCircle className="mx-auto text-red-500" />) : row.v}
                    </td>
                    <td className="p-5 border border-zinc-200 text-center text-zinc-400">
                      {typeof row.m === 'boolean' ? (row.m ? <CheckCircle2 className="mx-auto" /> : <XCircle className="mx-auto" />) : row.m}
                    </td>
                    <td className="p-5 border border-zinc-200 text-center text-zinc-400">
                      {typeof row.l === 'boolean' ? (row.l ? <CheckCircle2 className="mx-auto" /> : <XCircle className="mx-auto" />) : row.l}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* --- BUNDLE --- */}
      <section className="py-16 md:py-20 bg-zinc-950 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-zinc-900 rounded-2xl md:rounded-[3rem] border-2 md:border-4 border-green-600 p-6 md:p-16 relative overflow-hidden">
            <div className="bg-green-600 text-white font-black text-xs md:text-base px-4 py-1 rounded-full uppercase tracking-widest text-center mb-6 md:absolute md:top-6 md:right-6 md:mb-0">
              {"LIMITOVAN\u00c1 PONUKA"}
            </div>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-6 md:mb-8 leading-none">
                  {"Dnes dostanete"} <span className="text-green-500">{"KOMPLETN\u00da S\u00daPRAVU"}</span>
                </h2>
                <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  {[
                    { name: "N\u00e1hradn\u00fd valec", val: "19" },
                    { name: "N\u00e1hradn\u00fd filter", val: "12" },
                    { name: "2 Pady z mikrovl\u00e1kna steam", val: "15" },
                    { name: "Hrebe\u0148 na chlpy + \u010distiaci n\u00e1stroj", val: "9" },
                    { name: "Sada na \u0161k\u00e1ry a rohy", val: "14" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center justify-between text-base md:text-xl font-bold border-b border-white/10 pb-2">
                      <span>{item.name} <span className="text-zinc-500 text-xs md:text-sm">{"(Hodnota "}{item.val}{" \u20ac)"}</span></span>
                      <span className="text-green-500 uppercase text-sm md:text-base ml-2 shrink-0">GRATIS</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-white/5 p-4 md:p-6 rounded-2xl border border-white/10">
                  <p className="text-lg md:text-2xl font-black uppercase mb-2">{"Hodnota pr\u00edslu\u0161enstva: "}<span className="line-through text-zinc-500">{"69 \u20ac"}</span></p>
                  <p className="text-2xl md:text-4xl font-black text-green-500 uppercase">{"DNES V S\u00daPRAVE GRATIS"}</p>
                </div>
              </div>
              <div className="relative pb-4 pr-4">
                <div className="aspect-square bg-zinc-800 rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                  <img src="/images/steammop/h12-pro-ultra-pc-framea1_1000x.webp" alt={"Pr\u00edslu\u0161enstvo v s\u00faprave"} className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-0 right-0 bg-red-600 text-white w-24 h-24 md:w-32 md:h-32 rounded-full flex flex-col items-center justify-center font-black uppercase rotate-12 shadow-xl border-4 border-white">
                  <span className="text-xs md:text-sm">{"\u00daspora"}</span>
                  <span className="text-2xl md:text-3xl">{"109\u20ac"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- RECENZIE --- */}
      <section className="py-20 bg-zinc-50">
        <div className="container mx-auto px-4">
          <SectionTitle subtitle={"Viac ako 12 400 spokojn\u00fdch z\u00e1kazn\u00edkov na Slovensku"}>
            {"\u010co hovoria na\u0161i z\u00e1kazn\u00edci"}
          </SectionTitle>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Marek R.", city: "Bratislava", text: "Bleskurychlé doru\u010denie, dorazilo za 24 hod\u00edn. Zaplatil som na dob\u00eerku bez probl\u00e9mov. Sila nasania je neuverite\u013en\u00e1, zoberie v\u0161etko!", stars: 5 },
              { name: "Eva K.", city: "Ko\u0161ice", text: "Kone\u010dne mop, ktor\u00fd naozaj \u010dist\u00ed hrany. Para je bonus nav\u00fd\u0161e \u2013 dezinfikuje tam, kde sa hraj\u00fa deti.", stars: 5 },
              { name: "Jozef T.", city: "\u017dilina", text: "Bol som skeptick\u00fd, ale musel som zmeni\u0165 n\u00e1zor. Samo\u010distenie za hor\u00faca funguje v\u00fdborne, valec nikdy nesmrd\u00ed. Skvel\u00fd n\u00e1kup.", stars: 5 },
              { name: "Anna L.", city: "Nitra", text: "Sada pr\u00edslu\u0161enstva zadarmo je ve\u013emi u\u017eito\u010dn\u00e1. Pou\u017e\u00edvam ju ka\u017ed\u00fd de\u0148 a u\u0161etr\u00edm ve\u013ea \u010dasu. Vr\u00facne odpor\u00fa\u010dam!", stars: 5 },
              { name: "R\u00f3bert F.", city: "Pre\u0161ov", text: "Skvel\u00fd pomer kvality a ceny. Displej je ve\u013emi intuit\u00edvny a asistovan\u00fd pohon sprav\u00ed, \u017ee je \u013eahk\u00e1 ako pierko.", stars: 5 },
              { name: "Silvia M.", city: "Bansk\u00e1 Bystrica", text: "Bezchybn\u00fd z\u00e1kazn\u00edcky servis. Mala som ot\u00e1zku k pare a hne\u010f mi odp\u00edsali. Solidn\u00fd a dobre postaven\u00fd produkt.", stars: 5 },
            ].map((rev, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-200">
                <div className="flex gap-1 mb-4">
                  {[...Array(rev.stars)].map((_, j) => <Star key={j} size={18} className="fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-lg font-bold italic mb-6">{`"${rev.text}"`}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-zinc-200 rounded-full flex items-center justify-center font-black text-zinc-500">{rev.name[0]}</div>
                  <div>
                    <p className="font-black uppercase leading-none">{rev.name}</p>
                    <p className="text-sm text-zinc-500 font-bold">{rev.city} {"\u2022 Overen\u00fd n\u00e1kup"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <SectionTitle>{"Casto kladen\u00e9 ot\u00e1zky"}</SectionTitle>
          <div className="space-y-4">
            {[
              { q: "Mo\u017eem ju pou\u017e\u00edva\u0165 na parkety?", a: "Ano, VAPORWASH PRO+ je bezpe\u010dn\u00e1 na v\u0161etk\u00fdch utesnen\u00fdch podlah\u00e1ch, vr\u00e1tane parketov, lamin\u00e1tu, dla\u017ed\u00edc a mramoru. Funkcia pary je \u0161etrn\u00e1, ale \u00fa\u010dinn\u00e1." },
              { q: "Potrebujem detergent?", a: "Nie, sila pary dezinfikuje prirodzene len vodou. Ak chcete pr\u00eddavn\u00fa v\u00f4\u0148u, m\u00f4\u017eete prida\u0165 trochu nepeniv\u00e9ho detergentu do n\u00e1dr\u017ee na \u010dist\u00fa vodu." },
              { q: "Ako dlho vydr\u017e\u00ed na jedno nabitie?", a: "XL n\u00e1dr\u017e a bat\u00e9ria s ve\u013ekou kapacitou umo\u017e\u0148uj\u00fa vy\u010disti\u0165 a\u017e 150 m\u00b2 na jedno nabitie. Auton\u00f3mia je optimalizovan\u00e1 inteligentn\u00fdm senzorom \u0161piny." },
              { q: "Ako sa \u010dist\u00ed?", a: "Sta\u010d\u00ed ju odlo\u017ei\u0165 do dokovacej stanice a stla\u010di\u0165 tla\u010didlo samo\u010distenia. Syst\u00e9m um\u00fdva valec v 60\u00b0C a potom ho su\u0161\u00ed hor\u00facim vzduchom 30 min\u00fat." },
              { q: "A chlpy/vlasy?", a: "Vstavan\u00fd hrebe\u0148 automaticky strih\u00e1 a rozp\u00fatava chlpy a vlasy po\u010das pou\u017e\u00edvania, smeruj\u00fac ich priamo do n\u00e1dr\u017ee na \u0161pinu bez upchatia valca." },
            ].map((item, i) => (
              <details key={i} className="group bg-zinc-50 rounded-2xl border border-zinc-200 overflow-hidden">
                <summary className="list-none p-6 flex items-center justify-between cursor-pointer font-black uppercase text-lg select-none">
                  {item.q}
                  <ChevronDown size={24} className="group-open:rotate-180 transition-transform shrink-0 ml-2" />
                </summary>
                <div className="p-6 pt-0 text-zinc-600 font-medium text-lg leading-relaxed border-t border-zinc-200/50">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* --- ORDER FORM --- */}
      <section id="order-form" className="py-16 md:py-20 bg-zinc-950 text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white text-zinc-900 rounded-2xl md:rounded-[3rem] p-6 md:p-16 shadow-2xl relative overflow-hidden">
            <div className="text-center mb-8 md:mb-12">
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm font-black mb-4 uppercase tracking-widest">
                <Clock size={16} />
                {"Ponuka vypr\u0161\u00ed o: "}{formatTime(timeLeft)}
              </div>
              <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4">
                {"Vyplnte formul\u00e1r a"} <span className="text-green-600">{"PLA\u0164TE NA DOB\u00ceRKU"}</span>
              </h2>
              <p className="text-base md:text-xl font-bold text-zinc-500">{"N\u00e1\u0161 konzultant v\u00e1m zavol\u00e1 na potvrdenie objedn\u00e1vky."}</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-black uppercase tracking-widest text-zinc-400 mb-2">{"Meno a priezvisko"}</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={"Napr.: J\u00e1n Nov\u00e1k"}
                  className="w-full bg-zinc-50 border-2 border-zinc-200 rounded-xl p-3 md:p-4 text-lg md:text-xl font-bold focus:border-green-600 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-black uppercase tracking-widest text-zinc-400 mb-2">{"Telef\u00f3nne \u010d\u00edslo"}</label>
                <input
                  required
                  type="tel"
                  value={formData.tel}
                  onChange={(e) => setFormData({ ...formData, tel: e.target.value })}
                  placeholder="Napr.: +421 9XX XXX XXX"
                  className="w-full bg-zinc-50 border-2 border-zinc-200 rounded-xl p-3 md:p-4 text-lg md:text-xl font-bold focus:border-green-600 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-black uppercase tracking-widest text-zinc-400 mb-2">{"Pln\u00e1 adresa"}</label>
                <textarea
                  required
                  rows={3}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder={"Ulica, \u010d\u00edslo, PS\u010c, mesto"}
                  className="w-full bg-zinc-50 border-2 border-zinc-200 rounded-xl p-3 md:p-4 text-lg md:text-xl font-bold focus:border-green-600 focus:outline-none transition-colors"
                ></textarea>
              </div>

              <div className="bg-green-50 p-4 md:p-6 rounded-2xl border-2 border-green-100 flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-black uppercase text-green-700">Cena</p>
                  <p className="text-3xl md:text-4xl font-black text-zinc-950">{PRICE_CURRENT} {CURRENCY}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs md:text-sm font-black uppercase text-zinc-400 line-through">{PRICE_OLD} {CURRENCY}</p>
                  <p className="text-base md:text-lg font-black text-red-600 uppercase">{"Z\u013eava 50%"}</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-green-600 hover:bg-green-500 text-white font-black text-xl md:text-3xl py-5 md:py-6 rounded-2xl transition-all transform hover:scale-[1.02] shadow-2xl uppercase tracking-tight flex items-center justify-center gap-3 disabled:opacity-50"
              >
                <ShoppingBag size={24} className="shrink-0" />
                {status === 'submitting' ? 'ODOSIELANIE...' : "OBJEDNA\u0164 TERAZ \u2013 PLATBA NA DOB\u00ceRKU"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 bg-zinc-950 text-zinc-500 text-center border-t border-white/5 pb-28 md:pb-12">
        <div className="container mx-auto px-4">
          <p className="font-black text-white text-xl md:text-2xl mb-4 uppercase tracking-tighter">{BRAND_NAME} {PRO_SERIES}</p>
          <p className="mb-6 md:mb-8 font-bold text-sm md:text-base">{SLOGAN}</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-xs md:text-sm font-bold uppercase tracking-widest mb-6 md:mb-8">
            <a href="#" className="hover:text-white transition-colors">{"Ochrana osobn\u00fdch \u00fadajov"}</a>
            <a href="#" className="hover:text-white transition-colors">{"Obchodn\u00e9 podmienky"}</a>
            <a href="#" className="hover:text-white transition-colors">Kontakt</a>
          </div>
          <p className="text-xs opacity-50">&copy; 2026 {BRAND_NAME}. {"V\u0161etky pr\u00e1va vyhraden\u00e9."}</p>
        </div>
      </footer>

      {/* --- STICKY BAR MOBILE --- */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden p-4 bg-white/80 backdrop-blur-lg border-t border-zinc-200">
        <CTAButton className="w-full text-lg py-4 rounded-lg shadow-2xl">
          {"OBJEDNA\u0164 (PLATBA NA DOB\u00ceRKU)"}
        </CTAButton>
      </div>

    </div>
  );
}

// --- EXPORT WITH SUSPENSE ---

export default function LandingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <LandingPageContent />
    </Suspense>
  );
}
