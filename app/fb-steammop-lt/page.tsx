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
const SLOGAN = "Siurbia, plauna ir dezinfekuoja vienu judesiu.";
const PRICE_CURRENT = "99";
const PRICE_OLD = "199";
const DISCOUNT = "-50%";
const CURRENCY = "\u20ac";

const API_CONFIG = {
  url: 'https://offers.italiadrop.com/forms/api/',
  uid: '019be4ed-fb60-7ba4-89d4-deecc13c8b0a',
  key: '7b172b0b1994e9fa9961ad',
  offer: '3043',
  lp: '3079',
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
    {children || "U\u017dSAKYTI DABAR \u2013 MOK\u0116JIMAS PRISTATYMO METU"}
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
      router.push('/fb-steammop-lt/ty');
    } catch {
      router.push('/fb-steammop-lt/ty');
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
              {"PASKUTIN\u0116S PREKI\u0116S AKCIJOJE"}
            </div>
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-4 max-w-5xl">
              {"Pirmasis tikras 3-viename, kuris"} <span className="text-green-400">{"SIURBIA + PLAUNA + DEZINFEKUOJA GARAIS"}</span> {"vienu judesiu."}
            </h1>
            <p className="text-xl md:text-2xl font-medium text-zinc-400 max-w-3xl mb-8">
              {"Sauso ir dr\u0117gno valymo mopas kasdien + dezinfekcija garais, kai reikia. Joki\u0173 chemini\u0173 priemoni\u0173, joki\u0173 kvap\u0173."}
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <Badge icon={Wallet}>{"Mok\u0117jimas pristatymo metu"}</Badge>
              <Badge icon={Truck}>{"Pristatymas 24/48 val."}</Badge>
              <Badge icon={ShieldCheck}>{"Garantija 1 metai"}</Badge>
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
                "Tikras 3-viename: siurbia, plauna ir dezinfekuoja garais vienu judesiu",
                "Baigta su pur\u0161k\u0117 teplimu: nuolatinis \u0161varaus vandens cirkuliavimas",
                "I\u0161tirpdo lipnius ne\u0161varumus: auk\u0161tos temperat\u016bros garai riebalams ir d\u0117m\u0117ms",
                "Savaimin\u0117 valymas 60\u00b0C: volelis plaunamas kar\u0161tu vandeniu, visada higieni\u0161kas",
                "D\u017eiovinimas kar\u0161tu oru: jokio dr\u0117gno \u0161luost\u0117s kvapo",
                "Kra\u0161tai i\u0161 2 pusi\u0173: grindjuost\u0117s ir kampai pagaliau \u0161var\u016bs",
                "Anti-hair sistema: \u0161uk\u0173s kerpa ir i\u0161narplioja plaukus",
                "Stiprus siurbimas 16 000 Pa: surenka saus\u0105 ir \u0161lapi\u0105 pur\u0161k\u0105",
                "Pagalbin\u0117 trauka: ma\u017eiau pastang\u0173, daugiau grei\u010dio",
                "Dokin\u0117 stotis 3-viename: pad\u0117k, \u012fkrauk, i\u0161valyk ir i\u0161d\u017eiovink"
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
          <SectionTitle subtitle={"Pa\u017eangi technologija \u0161varai be kompromis\u0173"}>
            {"Kod\u0117l verta rinktis"} <span className="text-green-600">VAPORWASH PRO+</span>
          </SectionTitle>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { label: "\u0160VARUS VANDUO", title: "Visada \u0161varus vanduo", tech: "Nuolatinis \u0161varaus vandens cirkuliavimas", desc: "Nebesitep\u0117 pur\u0161k\u0117tu vandeniu: visada plaunate \u0161variu voleliu.", icon: Droplets, img: "/images/steammop/acquapulita.webp" },
              { label: "HIGIENA", title: "Joki\u0173 chemini\u0173 priemoni\u0173", tech: "Dezinfekcija garais \u2013 tik vandeniu", desc: "Kai reikia, \u012fjungiate garus ir viskas.", icon: ShieldCheck, img: "/images/steammop/vapormax.jpg" },
              { label: "RIEBALAI KO", title: "Lipn\u016bs ne\u0161varumai i\u0161tirpdyti", tech: "Auk\u0161tos temperat\u016bros garai", desc: "Atlipdina riebalus ir \u012fsisenusias d\u0117mes.", icon: Thermometer, img: "/images/steammop/sporcoappiccicoso.webp" },
              { label: "KRA\u0160TAI", title: "\u0160varios grindjuost\u0117s", tech: "Plovimas kra\u0161tas prie kra\u0161to i\u0161 2 pusi\u0173", desc: "Nepaliekama juoda linija palei sien\u0105.", icon: Maximize, img: "/images/steammop/battiscopa.webp" },
              { label: "ANTI-HAIR", title: "Kerpa susi\u0173pintus plaukus", tech: "I\u0161narpliojantis \u0161uk\u0173s", desc: "Plaukai ir gaur\u0117liai neu\u017ekemba volelio.", icon: Scissors, img: "/images/steammop/grovigli.webp" },
              { label: "VEDA JUS", title: "I\u0161manusis ekranas", tech: "Vizualinis gr\u012f\u017etamasis ry\u0161ys realiuoju laiku", desc: "\u017dinote, kada grindys tikrai \u0161varios.", icon: Gauge, img: "/images/steammop/schermo.jpeg" },
              { label: "AUTO-CLEAN", title: "Volelis plaunamas kar\u0161tai", tech: "HOT WASH 60\u00b0C", desc: "Tikra higiena, ne tik praplovimas.", icon: Zap, img: "/images/steammop/rullolavatoacaldo.webp" },
              { label: "BE KVAPO", title: "Sausas volelis", tech: "D\u017eiovinimas kar\u0161tu oru 30 min.", desc: "Jokio dr\u0117gno \u0161luost\u0117s kvapo.", icon: Wind, img: "/images/steammop/rulloasciutto.webp" },
              { label: "GALIA", title: "Sausi ir \u0161lapi ne\u0161varumai", tech: "Stiprus siurbimas", desc: "Surenka trupinius ir skys\u010dius vienu metu.", icon: ZapIcon, img: "/images/steammop/sporcosecco+umido.webp" },
              { label: "BE PASTANG\u0172", title: "Pagalbin\u0117 trauka", tech: "Motorizuota pavara", desc: "J\u016bs vadovaujate, jis va\u017eiuoja.", icon: Gauge, img: "/images/steammop/trazioneassistita.webp" },
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

      {/* --- PROBLEMA / AGITACIJA --- */}
      <section className="py-16 md:py-20 bg-zinc-900 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-8 md:mb-12 tracking-tighter">
            {"Vis dar vergaujate senam mopui?"}
          </h2>
          <div className="space-y-4 md:space-y-8">
            <div className="flex items-center gap-4 md:gap-6 text-left bg-white/5 p-4 md:p-6 rounded-2xl border border-white/10">
              <XCircle className="text-red-500 shrink-0" size={28} />
              <p className="text-lg md:text-2xl font-bold italic">{"\"Jums atsibodo pirmiausia \u0161luoti... paskui plauti mopu... o paskui lipnios grindys?\""}</p>
            </div>
            <div className="flex items-center gap-4 md:gap-6 text-left bg-white/5 p-4 md:p-6 rounded-2xl border border-white/10">
              <XCircle className="text-red-500 shrink-0" size={28} />
              <p className="text-lg md:text-2xl font-bold italic">{"\"Skuduras smirda? Tai rei\u0161kia, kad tik tepliojate pur\u0161k\u0105 ir bakterijas.\""}</p>
            </div>
            <div className="flex items-center gap-4 md:gap-6 text-left bg-white/5 p-4 md:p-6 rounded-2xl border border-white/10">
              <XCircle className="text-red-500 shrink-0" size={28} />
              <p className="text-lg md:text-2xl font-bold italic">{"\"O kampai? Visada ta juoda linija palei grindjuost\u0119...\""}</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SPRENDIMAS --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="inline-block bg-green-600 text-white text-sm font-black px-4 py-1 rounded-full mb-6 uppercase tracking-widest">
            {"Galutinis sprendimas"}
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">
            <span className="text-green-600">VAPORWASH PRO+</span>{" atlieka vis\u0105 darb\u0105 vienu judesiu: siurbia, plauna, o kai reikia \u2013 dezinfekuoja garais."}
          </h2>
          <p className="text-2xl md:text-3xl font-black text-zinc-500 uppercase italic mb-12">{"\"Paspauskite 1 mygtuk\u0105. Padaryta.\""}</p>

          <div className="aspect-video bg-zinc-100 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-4 md:border-8 border-zinc-50 mb-8 md:mb-12">
            <img src="/images/steammop/h12-pro-ultra-pc-frame1_9_1600x.webp" alt="VAPORWASH PRO+ veikime" className="w-full h-full object-cover" />
          </div>
          <CTAButton />
        </div>
      </section>

      {/* --- KAIP TAI VEIKIA --- */}
      <section className="py-20 bg-zinc-50">
        <div className="container mx-auto px-4">
          <SectionTitle>Paprasta kaip 1, 2, 3</SectionTitle>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Pripildykite bak\u0105", desc: "Detergentas neprivalomas", img: "/images/steammop/h12-pro-ultra-pc-frame1_6_800x.webp" },
              { step: "2", title: "Pasirinkite AUTO arba STEAM re\u017eim\u0105", desc: "I\u0161manusis galios valdymas", img: "/images/steammop/vapormax.jpg" },
              { step: "3", title: "Pad\u0117kite \u012f stot\u012f: savaimin\u0117 valymas ir d\u017eiovinimas", desc: "Jokios prie\u017ei\u016bros", img: "/images/steammop/rullolavatoacaldo.webp" },
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

      {/* --- MES VS JIE --- */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle>{"Palyginimas kalba pats u\u017e save"}</SectionTitle>

          {/* Mobile */}
          <div className="md:hidden space-y-3">
            {[
              { label: "Tikras 3-viename", v: "Taip", m: "Ne", l: "Tik 2-viename" },
              { label: "Dezinfekcija garais", v: "Taip", m: "Ne", l: "Ne" },
              { label: "Visada \u0161varus vanduo", v: "Taip", m: "Ne", l: "Taip" },
              { label: "Kra\u0161tai i\u0161 2 pusi\u0173", v: "Taip", m: "Ne", l: "Ne" },
              { label: "Anti-hair sistema", v: "Taip", m: "Ne", l: "Ne" },
              { label: "Savaimin\u0117 valymas kar\u0161tai", v: "Taip", m: "Ne", l: "Ne" },
              { label: "Laiko taupymas", v: "80%", m: "0%", l: "40%" },
              { label: "Joki\u0173 kvap\u0173", v: "Taip", m: "Ne", l: "Ne" },
            ].map((row, i) => (
              <div key={i} className="border border-zinc-200 rounded-xl overflow-hidden">
                <div className="bg-zinc-900 text-white p-3 text-center font-black uppercase text-sm tracking-wider">{row.label}</div>
                <div className="grid grid-cols-3 divide-x divide-zinc-100">
                  <div className="p-3 text-center bg-green-50">
                    <span className="block text-[10px] uppercase font-black text-zinc-400 mb-1">PRO+</span>
                    <span className="text-green-600 font-black text-sm">{row.v}</span>
                  </div>
                  <div className="p-3 text-center">
                    <span className="block text-[10px] uppercase font-black text-zinc-400 mb-1">Mopas</span>
                    <span className="text-zinc-400 font-bold text-sm">{row.m}</span>
                  </div>
                  <div className="p-3 text-center">
                    <span className="block text-[10px] uppercase font-black text-zinc-400 mb-1">Seni</span>
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
                  <th className="p-5 text-left text-lg font-black uppercase border-r border-white/10">{"Savyb\u0117"}</th>
                  <th className="p-5 text-center text-lg font-black uppercase bg-green-600 border-r border-white/10">VAPORWASH PRO+</th>
                  <th className="p-5 text-center text-lg font-black uppercase border-r border-white/10">{"Mopas/\u0160luota"}</th>
                  <th className="p-5 text-center text-lg font-black uppercase">Seni modeliai</th>
                </tr>
              </thead>
              <tbody className="text-lg font-bold">
                {[
                  { label: "Tikras 3-viename", v: true, m: false, l: "Tik 2-viename" },
                  { label: "Dezinfekcija garais", v: true, m: false, l: false },
                  { label: "Visada \u0161varus vanduo", v: true, m: false, l: true },
                  { label: "Kra\u0161tai i\u0161 2 pusi\u0173", v: true, m: false, l: false },
                  { label: "Anti-hair sistema", v: true, m: false, l: false },
                  { label: "Savaimin\u0117 valymas kar\u0161tai", v: true, m: false, l: false },
                  { label: "Laiko taupymas", v: "80%", m: "0%", l: "40%" },
                  { label: "Joki\u0173 kvap\u0173", v: true, m: false, l: false },
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
              {"RIBOTAS PASI\u016bLYMAS"}
            </div>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-6 md:mb-8 leading-none">
                  {"\u0160iandien gaunate"} <span className="text-green-500">{"PILN\u0104 KOMPLEKT\u0104"}</span>
                </h2>
                <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  {[
                    { name: "Atsarginis volelis", val: "19" },
                    { name: "Atsarginis filtras", val: "12" },
                    { name: "2 Mikropluostiniai gariniai padai", val: "15" },
                    { name: "\u0160uk\u0117s gaur\u0117liams + valymo \u012frankis", val: "9" },
                    { name: "Si\u016bli\u0173 ir kamp\u0173 valymo rinkinys", val: "14" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center justify-between text-base md:text-xl font-bold border-b border-white/10 pb-2">
                      <span>{item.name} <span className="text-zinc-500 text-xs md:text-sm">{"(Vert\u0117 "}{item.val}{" \u20ac)"}</span></span>
                      <span className="text-green-500 uppercase text-sm md:text-base ml-2 shrink-0">DOVANA</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-white/5 p-4 md:p-6 rounded-2xl border border-white/10">
                  <p className="text-lg md:text-2xl font-black uppercase mb-2">{"Pried\u0173 vert\u0117: "}<span className="line-through text-zinc-500">{"69 \u20ac"}</span></p>
                  <p className="text-2xl md:text-4xl font-black text-green-500 uppercase">{"\u0160IANDIEN KOMPLEKTE NEMOKAMAI"}</p>
                </div>
              </div>
              <div className="relative pb-4 pr-4">
                <div className="aspect-square bg-zinc-800 rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                  <img src="/images/steammop/h12-pro-ultra-pc-framea1_1000x.webp" alt="Priedai komplekte" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-0 right-0 bg-red-600 text-white w-24 h-24 md:w-32 md:h-32 rounded-full flex flex-col items-center justify-center font-black uppercase rotate-12 shadow-xl border-4 border-white">
                  <span className="text-xs md:text-sm">Sutaup.</span>
                  <span className="text-2xl md:text-3xl">{"99\u20ac"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ATSILIEPIMAI --- */}
      <section className="py-20 bg-zinc-50">
        <div className="container mx-auto px-4">
          <SectionTitle subtitle={"Daugiau nei 12 400 patenkint\u0173 klient\u0173 visoje Lietuvoje"}>
            {"K\u0105 sako m\u016bs\u0173 klientai"}
          </SectionTitle>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Mantas R.", city: "Vilnius", text: "\u017daibiškas pristatymas, atvyko per 24 valandas. Sumok\u0117jau pristatymo metu be jokiu problem\u0173. Siurbimo galia ne\u012ftik\u0117tina, surenka visk\u0105!", stars: 5 },
              { name: "Egl\u0117 V.", city: "Kaunas", text: "Pagaliau mopas, kuris tikrai valo kra\u0161tus. Garai \u2013 puikus priedas: dezinfekuoja ten, kur \u017eid\u017eia vaikai.", stars: 5 },
              { name: "Juozas T.", city: "Klaip\u0117da", text: "Buvau skepti\u0161kas, bet tur\u0117jau pakeisti nuomon\u0119. Savaimin\u0117 valymas kar\u0161tu vandeniu veikia puikiai, volelis niekada nesmirda. Puikus pirkinys.", stars: 5 },
              { name: "Ona L.", city: "\u0160iauliai", text: "Pried\u0173 rinkinys dovanai yra labai naudingas. Naudoju j\u012f kasdien ir sutaupau daug laiko. Kar\u0161tai rekomenduoju!", stars: 5 },
              { name: "Robertas F.", city: "Panev\u0117\u017eys", text: "Puikus kokyb\u0117s ir kainos santykis. Ekranas labai intuityvus, o pagalbin\u0117 trauka daro j\u012f lengv\u0105 kaip plunksn\u0105.", stars: 5 },
              { name: "Silvija M.", city: "Alytus", text: "Nepriekai\u0161tinga klient\u0173 prie\u017ei\u016bra. Tur\u0117jau klausim\u0105 d\u0117l gar\u0173 ir i\u0161 karto atsakė. Tvirtas ir gerai pagamintas produktas.", stars: 5 },
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
                    <p className="text-sm text-zinc-500 font-bold">{rev.city} {"\u2022 Patvirtintas pirkinys"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- DUK --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <SectionTitle>{"Da\u017enai u\u017eduodami klausimai"}</SectionTitle>
          <div className="space-y-4">
            {[
              { q: "Ar galiu naudoti ant parketo?", a: "Taip, VAPORWASH PRO+ yra saugus visoms sandarintoms grind\u0173 dangoms, \u012fskaitant parket\u0105, laminat\u0105, plyteles ir marmur\u0105. Gar\u0173 funkcija yra \u0161velni, bet efektyvi." },
              { q: "Ar reikalingas detergentas?", a: "Ne, gar\u0173 galia dezinfekuoja natūraliai tik vandeniu. Jei norite papildomo kvapo, galite \u012fpilti truput\u012f neputojan\u010dio detergento \u012f \u0161varaus vandens bak\u0105." },
              { q: "Kiek laiko veikia vienu \u012fkrovimu?", a: "XL bakas ir didel\u0117s talpos baterija leid\u017eia i\u0161valyti iki 150 m\u00b2 vienu \u012fkrovimu. Autonomija optimizuojama i\u0161maniuoju pur\u0161ko jutikliu." },
              { q: "Kaip j\u012f valyti?", a: "U\u017etenka pad\u0117ti \u012f dokin\u0119 stot\u012f ir paspausti savaimin\u0117 valymo mygtuk\u0105. Sistema i\u0161plaus volel\u012f 60\u00b0C vandeniu, o paskui i\u0161d\u017eiovins kar\u0161tu oru 30 minu\u010di\u0173." },
              { q: "O gaur\u0117liai/plaukai?", a: "\u012emontuoti \u0161uk\u0117s automati\u0161kai kerpa ir i\u0161narplioja gaur\u0117lius ir plaukus naudojimo metu, nukreipdami juos tiesiai \u012f pur\u0161ko bak\u0105 be volelio u\u017esikimšimo." },
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
                {"Pasi\u016blymas baigiasi po: "}{formatTime(timeLeft)}
              </div>
              <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4">
                {"U\u017epildykite form\u0105 ir"} <span className="text-green-600">{"MOK\u0116KITE PRISTATYMO METU"}</span>
              </h2>
              <p className="text-base md:text-xl font-bold text-zinc-500">{"M\u016bs\u0173 konsultantas susisieks su jumis u\u017esakymo patvirtinimui."}</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-black uppercase tracking-widest text-zinc-400 mb-2">{"Vardas ir pavard\u0117"}</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Pvz.: Jonas Jonaitis"
                  className="w-full bg-zinc-50 border-2 border-zinc-200 rounded-xl p-3 md:p-4 text-lg md:text-xl font-bold focus:border-green-600 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-black uppercase tracking-widest text-zinc-400 mb-2">{"Telefono numeris"}</label>
                <input
                  required
                  type="tel"
                  value={formData.tel}
                  onChange={(e) => setFormData({ ...formData, tel: e.target.value })}
                  placeholder="Pvz.: +370 6XX XXXXX"
                  className="w-full bg-zinc-50 border-2 border-zinc-200 rounded-xl p-3 md:p-4 text-lg md:text-xl font-bold focus:border-green-600 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-black uppercase tracking-widest text-zinc-400 mb-2">{"Pilnas adresas"}</label>
                <textarea
                  required
                  rows={3}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder={"Gatv\u0117, numeris, pa\u0161to kodas, miestas"}
                  className="w-full bg-zinc-50 border-2 border-zinc-200 rounded-xl p-3 md:p-4 text-lg md:text-xl font-bold focus:border-green-600 focus:outline-none transition-colors"
                ></textarea>
              </div>

              <div className="bg-green-50 p-4 md:p-6 rounded-2xl border-2 border-green-100 flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-black uppercase text-green-700">Kaina</p>
                  <p className="text-3xl md:text-4xl font-black text-zinc-950">{PRICE_CURRENT} {CURRENCY}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs md:text-sm font-black uppercase text-zinc-400 line-through">{PRICE_OLD} {CURRENCY}</p>
                  <p className="text-base md:text-lg font-black text-red-600 uppercase">Nuolaida 50%</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-green-600 hover:bg-green-500 text-white font-black text-xl md:text-3xl py-5 md:py-6 rounded-2xl transition-all transform hover:scale-[1.02] shadow-2xl uppercase tracking-tight flex items-center justify-center gap-3 disabled:opacity-50"
              >
                <ShoppingBag size={24} className="shrink-0" />
                {status === 'submitting' ? 'SIUN\u010cIAMA...' : "U\u017dSAKYTI DABAR \u2013 MOK\u0116JIMAS PRISTATYMO METU"}
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
            <a href="#" className="hover:text-white transition-colors">{"Privatumo politika"}</a>
            <a href="#" className="hover:text-white transition-colors">{"Taisykl\u0117s ir s\u0105lygos"}</a>
            <a href="#" className="hover:text-white transition-colors">Kontaktai</a>
          </div>
          <p className="text-xs opacity-50">&copy; 2026 {BRAND_NAME}. {"Visos teis\u0117s saugomos."}</p>
        </div>
      </footer>

      {/* --- STICKY BAR MOBILE --- */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden p-4 bg-white/80 backdrop-blur-lg border-t border-zinc-200">
        <CTAButton className="w-full text-lg py-4 rounded-lg shadow-2xl">
          {"U\u017dSAKYTI (MOK\u0116JIMAS PRISTATYMO METU)"}
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
