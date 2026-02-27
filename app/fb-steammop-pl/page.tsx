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
const SLOGAN = "Odkurza, myje i dezynfekuje w jednym przejsciu.";
const PRICE_CURRENT = "359";
const PRICE_OLD = "718";
const DISCOUNT = "-50%";
const CURRENCY = "zl";

const API_CONFIG = {
  url: 'https://offers.supertrendaffiliateprogram.com/forms/api/',
  uid: '0198088f-a4bc-7ed8-89aa-83089fe0180e',
  key: 'ec15cab563da6cf51f0c7c',
  offer: '400',
  lp: '400',
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
    {children || "ZAMOW TERAZ \u2013 PLATNOSC PRZY ODBIORZE"}
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
      router.push('/fb-steammop-pl/ty');
    } catch {
      router.push('/fb-steammop-pl/ty');
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
              OSTATNIE SZTUKI W PROMOCJI
            </div>
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-4 max-w-5xl">
              {"Pierwszy prawdziwy 3-w-1, kt\u00f3ry"} <span className="text-green-400">{"ODKURZA + MYJE + DEZYNFEKUJE PAR\u0104"}</span> {"w jednym przej\u015bciu."}
            </h1>
            <p className="text-xl md:text-2xl font-medium text-zinc-400 max-w-3xl mb-8">
              {"Mop na mokro i sucho na co dzie\u0144 + dezynfekcja par\u0105, gdy potrzeba. Zero chemii, zero zapach\u00f3w."}
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <Badge icon={Wallet}>{"P\u0142atno\u015b\u0107 przy odbiorze"}</Badge>
              <Badge icon={Truck}>{"Wysy\u0142ka 24/48h"}</Badge>
              <Badge icon={ShieldCheck}>Gwarancja 1 rok</Badge>
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
                "Prawdziwy 3-w-1: odkurza, myje i dezynfekuje par\u0105 w jednym przej\u015bciu",
                "Koniec z rozmazywaniem brudu: ci\u0105g\u0142y obieg czystej wody",
                "Rozpuszcza lepki brud: para o wysokiej temperaturze na t\u0142uszcz i plamy",
                "Samooczyszczanie w 60\u00b0C: wa\u0142ek myty na gor\u0105co, zawsze higieniczny",
                "Suszenie gor\u0105cym powietrzem: \u017cadnego zapachu mokrej \u015bcierki",
                "Kraw\u0119dzie z 2 stron: listwy przypod\u0142ogowe i naro\u017cniki wreszcie czyste",
                "System anti-hair: grzebie\u0144 tnie i rozpl\u0105tuje w\u0142osy",
                "Mocne ssanie 16 000 Pa: zbiera suchy i mokry brud",
                "Trakcja wspomagana: mniej wysi\u0142ku, wi\u0119cej pr\u0119dko\u015bci",
                "Stacja dokuj\u0105ca 3-w-1: od\u0142\u00f3\u017c, na\u0142aduj, wyczy\u015b\u0107 i wysusz"
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
          <SectionTitle subtitle={"Zaawansowana technologia dla czysto\u015bci bez kompromis\u00f3w"}>
            {"Dlaczego warto wybra\u0107"} <span className="text-green-600">VAPORWASH PRO+</span>
          </SectionTitle>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { label: "CZYSTA WODA", title: "Zawsze czysta woda", tech: "Ci\u0105g\u0142y obieg czystej wody", desc: "Nie rozmazuje brudnej wody: myjesz zawsze czystym wa\u0142kiem.", icon: Droplets, img: "/images/steammop/acquapulita.webp" },
              { label: "HIGIENA", title: "Zero chemii", tech: "Dezynfekcja par\u0105 \u2013 sam\u0105 wod\u0105", desc: "Gdy potrzeba, w\u0142\u0105czasz par\u0119 i gotowe.", icon: ShieldCheck, img: "/images/steammop/vapormax.jpg" },
              { label: "T\u0141USZCZ KO", title: "Lepki brud rozpuszczony", tech: "Para o wysokiej temperaturze", desc: "Odpina t\u0142uszcz i uporczywe plamy.", icon: Thermometer, img: "/images/steammop/sporcoappiccicoso.webp" },
              { label: "KRAW\u0118DZIE", title: "Czyste listwy", tech: "Mycie brzeg do brzegu z 2 stron", desc: "Nie zostawia czarnej linii wzd\u0142u\u017c \u015bciany.", icon: Maximize, img: "/images/steammop/battiscopa.webp" },
              { label: "ANTI-HAIR", title: "Tnie spl\u0105tane w\u0142osy", tech: "Grzebie\u0144 rozpl\u0105tuj\u0105cy", desc: "W\u0142osy i sier\u015b\u0107 nie zatykaj\u0105 wa\u0142ka.", icon: Scissors, img: "/images/steammop/grovigli.webp" },
              { label: "PROWADZI CI\u0118", title: "Inteligentny wy\u015bwietlacz", tech: "Wizualny feedback w czasie rzeczywistym", desc: "Wiesz, kiedy pod\u0142oga jest naprawd\u0119 czysta.", icon: Gauge, img: "/images/steammop/schermo.jpeg" },
              { label: "AUTO-CLEAN", title: "Wa\u0142ek myty na gor\u0105co", tech: "HOT WASH 60\u00b0C", desc: "Prawdziwa higiena, nie zwyk\u0142e p\u0142ukanie.", icon: Zap, img: "/images/steammop/rullolavatoacaldo.webp" },
              { label: "BEZ ZAPACHU", title: "Suchy wa\u0142ek", tech: "Suszenie gor\u0105cym powietrzem 30 min", desc: "\u017badnego zapachu mokrej \u015bcierki.", icon: Wind, img: "/images/steammop/rulloasciutto.webp" },
              { label: "MOC", title: "Suchy i mokry brud", tech: "Ssanie o du\u017cej mocy", desc: "Zbiera okruchy i p\u0142yny jednocze\u015bnie.", icon: ZapIcon, img: "/images/steammop/sporcosecco+umido.webp" },
              { label: "BEZ WYSI\u0141KU", title: "Trakcja wspomagana", tech: "Nap\u0119d zmotoryzowany", desc: "Ty prowadzisz, ona jedzie.", icon: Gauge, img: "/images/steammop/trazioneassistita.webp" },
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

      {/* --- PROBLEMA / AGITACJA --- */}
      <section className="py-16 md:py-20 bg-zinc-900 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-8 md:mb-12 tracking-tighter">
            {"Nadal niewolnik starego mopa?"}
          </h2>
          <div className="space-y-4 md:space-y-8">
            <div className="flex items-center gap-4 md:gap-6 text-left bg-white/5 p-4 md:p-6 rounded-2xl border border-white/10">
              <XCircle className="text-red-500 shrink-0" size={28} />
              <p className="text-lg md:text-2xl font-bold italic">{"\"Masz do\u015b\u0107 najpierw zamiatania... potem mycia mopem... a potem lepkiej pod\u0142ogi?\""}</p>
            </div>
            <div className="flex items-center gap-4 md:gap-6 text-left bg-white/5 p-4 md:p-6 rounded-2xl border border-white/10">
              <XCircle className="text-red-500 shrink-0" size={28} />
              <p className="text-lg md:text-2xl font-bold italic">{"\"\u015acierka \u015bmierdzi? To znaczy, \u017ce tylko rozmazujesz brud i bakterie.\""}</p>
            </div>
            <div className="flex items-center gap-4 md:gap-6 text-left bg-white/5 p-4 md:p-6 rounded-2xl border border-white/10">
              <XCircle className="text-red-500 shrink-0" size={28} />
              <p className="text-lg md:text-2xl font-bold italic">{"\"A naro\u017cniki? Zawsze ta czarna linia wzd\u0142u\u017c listwy...\""}</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- ROZWI\u0104ZANIE --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="inline-block bg-green-600 text-white text-sm font-black px-4 py-1 rounded-full mb-6 uppercase tracking-widest">
            {"Rozwi\u0105zanie definitywne"}
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">
            <span className="text-green-600">VAPORWASH PRO+</span>{" wykonuje ca\u0142\u0105 prac\u0119 w jednym przej\u015bciu: odkurza, myje, a gdy trzeba \u2013 dezynfekuje par\u0105."}
          </h2>
          <p className="text-2xl md:text-3xl font-black text-zinc-500 uppercase italic mb-12">{"\"Naci\u015bnij 1 przycisk. Gotowe.\""}</p>

          <div className="aspect-video bg-zinc-100 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-4 md:border-8 border-zinc-50 mb-8 md:mb-12">
            <img src="/images/steammop/h12-pro-ultra-pc-frame1_9_1600x.webp" alt="VAPORWASH PRO+ w akcji" className="w-full h-full object-cover" />
          </div>
          <CTAButton />
        </div>
      </section>

      {/* --- JAK TO DZIALA --- */}
      <section className="py-20 bg-zinc-50">
        <div className="container mx-auto px-4">
          <SectionTitle>Proste jak 1, 2, 3</SectionTitle>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Nape\u0142nij zbiornik", desc: "Detergent opcjonalnie", img: "/images/steammop/h12-pro-ultra-pc-frame1_6_800x.webp" },
              { step: "2", title: "W\u0142\u0105cz tryb AUTO lub STEAM", desc: "Inteligentne zarz\u0105dzanie moc\u0105", img: "/images/steammop/vapormax.jpg" },
              { step: "3", title: "Od\u0142\u00f3\u017c do stacji: samooczyszczanie i suszenie", desc: "Zero konserwacji", img: "/images/steammop/rullolavatoacaldo.webp" },
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
          <SectionTitle>{"Por\u00f3wnanie m\u00f3wi samo za siebie"}</SectionTitle>

          {/* Mobile */}
          <div className="md:hidden space-y-3">
            {[
              { label: "Prawdziwy 3-w-1", v: "Tak", m: "Nie", l: "Tylko 2-w-1" },
              { label: "Dezynfekcja par\u0105", v: "Tak", m: "Nie", l: "Nie" },
              { label: "Zawsze czysta woda", v: "Tak", m: "Nie", l: "Tak" },
              { label: "Kraw\u0119dzie z 2 stron", v: "Tak", m: "Nie", l: "Nie" },
              { label: "System anti-hair", v: "Tak", m: "Nie", l: "Nie" },
              { label: "Samooczyszczanie na gor\u0105co", v: "Tak", m: "Nie", l: "Nie" },
              { label: "Oszcz\u0119dno\u015b\u0107 czasu", v: "80%", m: "0%", l: "40%" },
              { label: "Zero zapach\u00f3w", v: "Tak", m: "Nie", l: "Nie" },
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
                    <span className="block text-[10px] uppercase font-black text-zinc-400 mb-1">Stare</span>
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
                  <th className="p-5 text-left text-lg font-black uppercase border-r border-white/10">Cecha</th>
                  <th className="p-5 text-center text-lg font-black uppercase bg-green-600 border-r border-white/10">VAPORWASH PRO+</th>
                  <th className="p-5 text-center text-lg font-black uppercase border-r border-white/10">{"Mop/Miot\u0142a"}</th>
                  <th className="p-5 text-center text-lg font-black uppercase">Stare modele</th>
                </tr>
              </thead>
              <tbody className="text-lg font-bold">
                {[
                  { label: "Prawdziwy 3-w-1", v: true, m: false, l: "Tylko 2-w-1" },
                  { label: "Dezynfekcja par\u0105", v: true, m: false, l: false },
                  { label: "Zawsze czysta woda", v: true, m: false, l: true },
                  { label: "Kraw\u0119dzie z 2 stron", v: true, m: false, l: false },
                  { label: "System anti-hair", v: true, m: false, l: false },
                  { label: "Samooczyszczanie na gor\u0105co", v: true, m: false, l: false },
                  { label: "Oszcz\u0119dno\u015b\u0107 czasu", v: "80%", m: "0%", l: "40%" },
                  { label: "Zero zapach\u00f3w", v: true, m: false, l: false },
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
              OFERTA LIMITOWANA
            </div>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-6 md:mb-8 leading-none">
                  {"Dzi\u015b otrzymujesz"} <span className="text-green-500">KOMPLETNY ZESTAW</span>
                </h2>
                <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  {[
                    { name: "Zapasowy wa\u0142ek", val: "89" },
                    { name: "Zapasowy filtr", val: "55" },
                    { name: "2 Pady z mikrofibry steam", val: "69" },
                    { name: "Grzebie\u0144 na sier\u015b\u0107 + narz\u0119dzie czyszcz\u0105ce", val: "39" },
                    { name: "Zestaw do fug i naro\u017cnik\u00f3w", val: "65" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center justify-between text-base md:text-xl font-bold border-b border-white/10 pb-2">
                      <span>{item.name} <span className="text-zinc-500 text-xs md:text-sm">{"(Warto\u015b\u0107 "}{item.val}{" z\u0142)"}</span></span>
                      <span className="text-green-500 uppercase text-sm md:text-base ml-2 shrink-0">GRATIS</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-white/5 p-4 md:p-6 rounded-2xl border border-white/10">
                  <p className="text-lg md:text-2xl font-black uppercase mb-2">{"Warto\u015b\u0107 akcesori\u00f3w: "}<span className="line-through text-zinc-500">{"317 z\u0142"}</span></p>
                  <p className="text-2xl md:text-4xl font-black text-green-500 uppercase">{"DZI\u015a W ZESTAWIE GRATIS"}</p>
                </div>
              </div>
              <div className="relative pb-4 pr-4">
                <div className="aspect-square bg-zinc-800 rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                  <img src="/images/steammop/h12-pro-ultra-pc-framea1_1000x.webp" alt="Akcesoria w zestawie" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-0 right-0 bg-red-600 text-white w-24 h-24 md:w-32 md:h-32 rounded-full flex flex-col items-center justify-center font-black uppercase rotate-12 shadow-xl border-4 border-white">
                  <span className="text-xs md:text-sm">Oszcz.</span>
                  <span className="text-2xl md:text-3xl">{"359z\u0142"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- OPINIE --- */}
      <section className="py-20 bg-zinc-50">
        <div className="container mx-auto px-4">
          <SectionTitle subtitle={"Ponad 12 400 zadowolonych klient\u00f3w w ca\u0142ej Polsce"}>
            {"Co m\u00f3wi\u0105 nasi klienci"}
          </SectionTitle>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Marek R.", city: "Warszawa", text: "B\u0142yskawiczna wysy\u0142ka, dotar\u0142a w 24 godziny. Zap\u0142aci\u0142em przy odbiorze bez problem\u00f3w. Moc ssania jest niesamowita, zbiera wszystko!", stars: 5 },
              { name: "Ela W.", city: "Krak\u00f3w", text: "Wreszcie mop, kt\u00f3ry naprawd\u0119 czy\u015bci kraw\u0119dzie. Para to wisienka na torcie \u2013 dezynfekuje tam, gdzie bawi\u0105 si\u0119 dzieci.", stars: 5 },
              { name: "J\u00f3zef T.", city: "Gda\u0144sk", text: "By\u0142em sceptyczny, ale musia\u0142em zmieni\u0107 zdanie. Samooczyszczanie na gor\u0105co dzia\u0142a \u015bwietnie, wa\u0142ek nigdy nie \u015bmierdzi. \u015awietny zakup.", stars: 5 },
              { name: "Anna L.", city: "Wroc\u0142aw", text: "Zestaw akcesori\u00f3w w prezencie jest bardzo przydatny. U\u017cywam jej codziennie i oszcz\u0119dzam mn\u00f3stwo czasu. Gor\u0105co polecam!", stars: 5 },
              { name: "Robert F.", city: "Pozna\u0144", text: "\u015awietny stosunek jako\u015bci do ceny. Wy\u015bwietlacz jest bardzo intuicyjny, a trakcja wspomagana sprawia, \u017ce jest lekka jak pi\u00f3rko.", stars: 5 },
              { name: "Sylwia M.", city: "\u0141\u00f3d\u017a", text: "Nienaganna obs\u0142uga klienta. Mia\u0142am w\u0105tpliwo\u015b\u0107 odno\u015bnie pary i od razu mi odpowiedzieli. Solidny i dobrze zbudowany produkt.", stars: 5 },
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
                    <p className="text-sm text-zinc-500 font-bold">{rev.city} {"\u2022 Zweryfikowany zakup"}</p>
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
          <SectionTitle>{"Cz\u0119sto zadawane pytania"}</SectionTitle>
          <div className="space-y-4">
            {[
              { q: "Czy mog\u0119 u\u017cywa\u0107 jej na parkiecie?", a: "Tak, VAPORWASH PRO+ jest bezpieczna na wszystkich uszczelnionych pod\u0142ogach, w tym parkiecie, laminacie, p\u0142ytkach i marmurze. Funkcja pary jest delikatna, ale skuteczna." },
              { q: "Czy potrzebny jest detergent?", a: "Nie, moc pary dezynfekuje naturalnie sam\u0105 wod\u0105. Je\u015bli chcesz dodatkowego zapachu, mo\u017cesz doda\u0107 odrobin\u0119 niepieniącego detergentu do zbiornika czystej wody." },
              { q: "Jak d\u0142ugo wystarcza na jedno \u0142adowanie?", a: "Zbiornik XL i bateria o du\u017cej pojemno\u015bci pozwalaj\u0105 wyczy\u015bci\u0107 do 150 m\u00b2 na jednym \u0142adowaniu. Autonomia jest optymalizowana przez inteligentny czujnik brudu." },
              { q: "Jak si\u0119 czy\u015bci?", a: "Wystarczy odstawić j\u0105 do stacji dokuj\u0105cej i nacisn\u0105\u0107 przycisk samooczyszczania. System wykona mycie wa\u0142ka w 60\u00b0C, a nast\u0119pnie suszenie gor\u0105cym powietrzem przez 30 minut.", },
              { q: "A sier\u015b\u0107/w\u0142osy?", a: "Wbudowany grzebie\u0144 automatycznie tnie i rozpl\u0105tuje sier\u015b\u0107 i w\u0142osy podczas u\u017cytkowania, kieruj\u0105c je bezpo\u015brednio do zbiornika brudu bez zatykania wa\u0142ka." },
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
                {"Oferta wygasa za: "}{formatTime(timeLeft)}
              </div>
              <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4">
                {"Wype\u0142nij formularz i"} <span className="text-green-600">{"P\u0141A\u0106 PRZY ODBIORZE"}</span>
              </h2>
              <p className="text-base md:text-xl font-bold text-zinc-500">{"Nasz konsultant skontaktuje si\u0119 z Tob\u0105, aby potwierdzi\u0107 zam\u00f3wienie."}</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-black uppercase tracking-widest text-zinc-400 mb-2">{"Imi\u0119 i nazwisko"}</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Np.: Jan Kowalski"
                  className="w-full bg-zinc-50 border-2 border-zinc-200 rounded-xl p-3 md:p-4 text-lg md:text-xl font-bold focus:border-green-600 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-black uppercase tracking-widest text-zinc-400 mb-2">Numer telefonu</label>
                <input
                  required
                  type="tel"
                  value={formData.tel}
                  onChange={(e) => setFormData({ ...formData, tel: e.target.value })}
                  placeholder="Np.: +48 123 456 789"
                  className="w-full bg-zinc-50 border-2 border-zinc-200 rounded-xl p-3 md:p-4 text-lg md:text-xl font-bold focus:border-green-600 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-black uppercase tracking-widest text-zinc-400 mb-2">{"Pe\u0142ny adres"}</label>
                <textarea
                  required
                  rows={3}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder={"Ulica, numer, kod pocztowy, miasto"}
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
                  <p className="text-base md:text-lg font-black text-red-600 uppercase">Rabat 50%</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-green-600 hover:bg-green-500 text-white font-black text-xl md:text-3xl py-5 md:py-6 rounded-2xl transition-all transform hover:scale-[1.02] shadow-2xl uppercase tracking-tight flex items-center justify-center gap-3 disabled:opacity-50"
              >
                <ShoppingBag size={24} className="shrink-0" />
                {status === 'submitting' ? 'WYSY\u0141ANIE...' : "ZAM\u00d3W TERAZ \u2013 P\u0141A\u0106 PRZY ODBIORZE"}
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
            <a href="#" className="hover:text-white transition-colors">Polityka prywatnosci</a>
            <a href="#" className="hover:text-white transition-colors">Regulamin</a>
            <a href="#" className="hover:text-white transition-colors">Kontakt</a>
          </div>
          <p className="text-xs opacity-50">&copy; 2026 {BRAND_NAME}. Wszelkie prawa zastrzezone.</p>
        </div>
      </footer>

      {/* --- STICKY BAR MOBILE --- */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] bg-white/90 backdrop-blur-lg border-t border-zinc-200">
        <a
          href="#order-form"
          className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-500 text-white font-bold text-sm py-3 px-4 rounded-lg shadow-lg uppercase tracking-tight transition-all"
        >
          <ShoppingBag size={18} />
          {"Zam\u00f3w teraz \u2013 359 z\u0142"}
        </a>
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
