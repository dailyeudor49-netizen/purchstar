'use client';

import React, { useState, useEffect, Suspense } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  TrendingDown,
  Zap,
  ShieldCheck,
  Clock,
  Package,
  Star,
  ThumbsUp,
  Wind,
  Thermometer,
  VolumeX,
  ShoppingCart,
  ChevronRight,
  Truck,
  Award,
  ShieldAlert,
  ZapOff,
  Stethoscope,
  Lock
} from 'lucide-react';
import Script from 'next/script';
import { useRouter, useSearchParams } from 'next/navigation';

// --- API CONFIG ---
const API_CONFIG = {
  url: 'https://offers.supertrendaffiliateprogram.com/forms/api/',
  uid: '0198088f-a4bc-7ed8-89aa-83089fe0180e',
  key: 'ec15cab563da6cf51f0c7c',
  offer: '576',
  lp: '576'
};

// --- COLORS ---
const colors = {
  primaryBlue: '#0f172a',
  premiumGold: '#c5a059',
  actionRed: '#dc2626',
};

// --- Global Urgency Bar ---
const TopUrgency = () => (
  <div className="bg-red-600 text-white text-[10px] md:text-xs py-2 px-4 font-bold text-center uppercase tracking-widest animate-pulse sticky top-0 z-[110]">
    POZOR: IBA 9 KUSOV DOSTUPNÝCH ZA TÚTO CENU!
  </div>
);

// --- Amazon Style Reviews Section ---
const AmazonReviews = () => {
  const reviews = [
    { name: "Martin Kováč", date: "14. februára 2026", text: "Neuveriteľné. Naozaj suší 4kg oblečenia bez problémov. Za menej ako 45 minút mám košele hotové, sterilizované a teplé. Úspora na účtoch je viditeľná už po prvom mesiaci.", img: "m1" },
    { name: "Anna W.", date: "2. marca 2026", text: "Používam hlavne na posteľnú bielizeň. Dosahuje teplotu, ktorá eliminuje zápach zatuchnutosti. Už bez toho nemôžem, hlavne v zime v Bratislave.", img: "w1" },
    { name: "Peter B.", date: "10. marca 2026", text: "Solídny produkt. Nie je to obyčajný čínsky výrobok. Bubon z nehrdzavejúcej ocele je nezničiteľný. Zaplatil som pri prevzatí kuriérovi, všetko perfektné.", img: "m2" }
  ];

  return (
    <section id="recenzie" className="py-12 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Star className="text-orange-400 fill-current" size={24} /> Recenzie Overených Zákazníkov
        </h2>
        <div className="flex flex-col md:flex-row gap-8 mb-10 pb-8 border-b">
          <div className="md:w-1/3 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="text-4xl font-black">4.9</span>
              <div className="flex text-orange-400">
                {[1,2,3,4,5].map(s => <Star key={s} size={20} fill="currentColor" />)}
              </div>
            </div>
            <span className="text-sm text-slate-500">Na základe 14 582 kupujúcich</span>
            <div className="mt-4 space-y-2">
              {[
                { stars: 5, pct: "94%" },
                { stars: 4, pct: "5%" },
                { stars: 3, pct: "1%" },
                { stars: 2, pct: "0%" },
                { stars: 1, pct: "0%" }
              ].map(row => (
                <div key={row.stars} className="flex items-center gap-2 text-xs text-blue-600">
                  <span className="w-12">{row.stars} hviezd</span>
                  <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-400" style={{ width: row.pct }}></div>
                  </div>
                  <span className="text-slate-500 w-8">{row.pct}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-2/3 bg-slate-50 p-6 rounded-2xl">
            <h3 className="font-bold text-slate-900 mb-2 italic">"Najlepšia investícia pre domácnosť v roku 2026"</h3>
            <p className="text-sm text-slate-600">99,4% používateľov uviedlo, že drasticky znížilo zápach vlhkosti doma a ušetrilo v priemere 45€ mesačne na elektrine.</p>
          </div>
        </div>

        <div className="space-y-8">
          {reviews.map((r, i) => (
            <div key={i} className="pb-8 border-b last:border-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700 text-sm">
                  {r.name[0]}
                </div>
                <div>
                  <span className="text-sm font-bold block">{r.name}</span>
                  <div className="flex items-center gap-1">
                    <div className="flex text-orange-400">
                      {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="currentColor" />)}
                    </div>
                    <span className="text-[10px] text-green-600 font-bold uppercase tracking-tighter">Overený Nákup</span>
                  </div>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-slate-800 font-medium">"{r.text}"</p>
              <span className="text-[10px] text-slate-400 block mt-2">Recenzia zo dňa {r.date}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Video Section ---
const VideoSection = () => (
  <section className="py-16 px-4 bg-slate-100">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4">
          POZRITE SA NA <span className="text-blue-700 italic">MORUS ZERO DRYPRO 360 ULTRA</span> V AKCII
        </h2>
        <p className="text-slate-500 font-medium">Objavte ako funguje a prečo si ho už vybrali tisíce Slovákov.</p>
      </div>
      <div className="relative rounded-[2rem] overflow-hidden shadow-[0_30px_60px_-12px_rgba(0,0,0,0.25)] border-4 border-white">
        <video
          className="w-full"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/video/dryer/lp.mp4" type="video/mp4" />
          Váš prehliadač nepodporuje video tag.
        </video>
      </div>
    </div>
  </section>
);

// --- Power Specs Cards ---
const PowerSpecs = () => (
  <section className="py-16 px-4 bg-[#0f172a] text-white overflow-hidden relative">
    <div className="absolute top-0 right-0 w-64 h-64 bg-[#c5a059]/10 blur-[100px] rounded-full"></div>
    <div className="max-w-4xl mx-auto relative z-10">
      <h2 className="text-3xl md:text-5xl font-black mb-12 text-center uppercase tracking-tighter leading-none">
        VÝKON <span className="text-[#c5a059] italic">BEZ KOMPROMISOV</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { icon: <Package size={32} />, title: "Kapacita XL 4KG", desc: "Suší až 12 košieľ alebo kompletnú posteľnú bielizeň v jednom cykle. Najväčšia kapacita v kategórii prenosných sušičiek." },
          { icon: <Thermometer size={32} />, title: "Dezinfekcia 65°C", desc: "Dosahuje kritickú teplotu na elimináciu 99,9% baktérií, roztočov a alergénov usadených vo vlhkých vláknach." },
          { icon: <Clock size={32} />, title: "Turbo-Dry 45 Minút", desc: "Oblečenie suché, teplé a pripravené na nosenie za menej ako 45 minút. Koniec s čakaním 2 dni na sušiaku." },
          { icon: <ZapOff size={32} />, title: "Úspora na Účtoch", desc: "Spotrebuje len 0,18€ za cyklus. Klasická priemyselná sušička stojí v priemere 1,65€. Automatická úspora." }
        ].map((spec, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-[2rem] hover:bg-white/10 transition-all group">
            <div className="text-[#c5a059] mb-4 group-hover:scale-110 transition-transform">{spec.icon}</div>
            <h4 className="text-xl font-black mb-2 uppercase tracking-tighter">{spec.title}</h4>
            <p className="text-slate-400 text-sm leading-relaxed">{spec.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- Order Form with API ---
const OrderFormContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    try {
      const tmfpInput = e.currentTarget.querySelector('input[name="tmfp"]') as HTMLInputElement;
      const tmfp = tmfpInput?.value || '';

      const params = new URLSearchParams({
        uid: API_CONFIG.uid,
        key: API_CONFIG.key,
        offer: API_CONFIG.offer,
        lp: API_CONFIG.lp,
        name: formData.name,
        tel: formData.phone,
        'street-address': formData.address,
        ua: navigator.userAgent,
        tmfp: tmfp,
      });

      // Add UTM params
      const utmSource = searchParams.get('utm_source');
      const utmMedium = searchParams.get('utm_medium');
      const utmCampaign = searchParams.get('utm_campaign');
      const utmContent = searchParams.get('utm_content');
      const utmTerm = searchParams.get('utm_term');

      if (utmSource) params.append('utm_source', utmSource);
      if (utmMedium) params.append('utm_medium', utmMedium);
      if (utmCampaign) params.append('utm_campaign', utmCampaign);
      if (utmContent) params.append('utm_content', utmContent);
      if (utmTerm) params.append('utm_term', utmTerm);

      await fetch(API_CONFIG.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      router.push('/ty/ty-fb-dryer-sk');
    } catch (error) {
      console.error('[Network API] Error:', error);
      router.push('/ty/ty-fb-dryer-sk');
    }
  };

  return (
    <section id="objednavka" className="py-20 px-4 bg-slate-100">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-block bg-[#dc2626] text-white px-6 py-1 rounded-full text-sm font-black mb-4 uppercase tracking-widest animate-pulse">
            Časovo obmedzená ponuka
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter text-slate-900 leading-[0.9]">VYPLŇTE FORMULÁR <br/><span className="text-blue-700 italic">PLAŤTE PRI PREVZATÍ</span></h2>
          <p className="text-slate-500 font-medium">Karta nie je potrebná. Platíte až keď dostanete balík.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] text-slate-900 border border-slate-200">
          <input type="hidden" name="tmfp" />

          <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-100">
             <div className="flex-1">
               <span className="text-slate-400 text-xs font-bold uppercase block">Akciová Cena</span>
               <span className="text-4xl font-black text-blue-700">69,99 €</span>
             </div>
             <div className="text-right">
               <span className="text-slate-400 text-xs font-bold uppercase block">Katalógová Cena</span>
               <span className="text-xl font-bold text-slate-300 line-through">249,00 €</span>
             </div>
          </div>

          <div className="space-y-6">
            <div className="group">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-4 mb-1 block group-focus-within:text-blue-600 transition-colors">Meno a Priezvisko</label>
              <input
                required
                type="text"
                name="name"
                placeholder="Ján Novák"
                className="w-full bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl focus:border-blue-600 transition-all shadow-inner font-bold"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="group">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-4 mb-1 block group-focus-within:text-blue-600 transition-colors">Adresa Doručenia (Ulica, Č., Mesto, PSČ)</label>
              <input
                required
                type="text"
                name="address"
                placeholder="Hlavná 10, 811 01 Bratislava"
                className="w-full bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl focus:border-blue-600 transition-all shadow-inner font-bold"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="group">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-4 mb-1 block group-focus-within:text-blue-600 transition-colors">Telefón (Pre doručenie)</label>
              <input
                required
                type="tel"
                name="phone"
                placeholder="+421 900 123 456"
                className="w-full bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl focus:border-blue-600 transition-all shadow-inner font-bold"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-10 space-y-4">
            <button disabled={loading} className="w-full bg-[#dc2626] text-white py-6 md:py-7 rounded-2xl font-black text-lg md:text-2xl shadow-[0_15px_30px_rgba(220,38,38,0.4)] hover:bg-red-700 hover:translate-y-[-2px] active:translate-y-[1px] transition-all flex flex-col items-center justify-center gap-1 md:gap-4 uppercase tracking-tighter leading-tight">
              {loading ? "SPRACOVÁVAM..." : (
                <>
                  <span>OBJEDNÁVAM TERAZ</span>
                  <span className="text-xs md:text-lg opacity-80">(PLATÍM PRI PREVZATÍ)</span>
                </>
              )}
            </button>
            <div className="flex items-center justify-center gap-6 opacity-60">
               <div className="flex items-center gap-1 text-[10px] font-black"><ShieldCheck size={14}/> ÚDAJE CHRÁNENÉ</div>
               <div className="flex items-center gap-1 text-[10px] font-black"><Truck size={14}/> DOPRAVA ZADARMO</div>
            </div>
            <div className="flex justify-center items-center gap-2 text-sm text-gray-500">
              <Lock size={16} /> Vaše údaje sú v bezpečí a šifrované
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

const OrderForm = () => (
  <Suspense fallback={<div className="py-20 text-center">Načítavam...</div>}>
    <OrderFormContent />
  </Suspense>
);

// --- Problem Section (Pain Point) ---
const PainPoints = () => (
  <section className="py-20 px-4 bg-white">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-none tracking-tighter mb-4">
          MENÍTE SVOJ DOMOV <br/><span className="text-red-600 italic underline">NA TOVÁREŇ NA PLESEŇ?</span>
        </h2>
        <p className="text-slate-500 font-medium">Každý otvorený sušiak uvoľňuje až 2 litre vody do vašich pľúc.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { icon: <ShieldAlert className="text-red-600" />, title: "Baktérie a Patogény", desc: "Pretrvávajúca vlhkosť je rajom pre roztoče. DryPro sterilizuje oblečenie pri 65°C, ničí problém pri koreni." },
          { icon: <TrendingDown className="text-red-600" />, title: "Plytvanie Peniazmi", desc: "Tradičné sušičky sú 'energetické monštrá'. DryPro používa technológiu Heat-Flow, spotrebuje 1/10 elektriny." },
          { icon: <Stethoscope className="text-red-600" />, title: "Zničené Oblečenie", desc: "Nadmerné teplo z práčovní ničí vlákna. Naša kontrolovaná rotácia udržuje oblečenie ako nové." }
        ].map((p, i) => (
          <div key={i} className="bg-slate-50 p-8 rounded-[2.5rem] border-2 border-transparent hover:border-red-100 transition-colors">
            <div className="mb-6">{p.icon}</div>
            <h4 className="text-xl font-black mb-3 uppercase tracking-tighter leading-tight">{p.title}</h4>
            <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Hero = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const images = [
    '/images/dryer/1.jpg',
    '/images/dryer/2.jpg',
    '/images/dryer/3.jpg',
    '/images/dryer/4.jpg',
  ];

  return (
    <section className="relative pt-12 pb-20 px-4 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
        <div className="z-10 space-y-6">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-5 py-2 rounded-full font-black text-xs uppercase tracking-widest border border-blue-100 shadow-sm">
            <Zap size={14} className="animate-pulse text-yellow-500 fill-current" /> Limitovaná Prémiová Edícia 2026
          </div>
          <h1 className="text-5xl md:text-8xl font-black leading-[0.85] text-slate-900 tracking-tighter mb-6">
            LUXUS SUCHÉHO <br/><span className="text-blue-700 italic">A STERILIZOVANÉHO</span> OBLEČENIA ZA <span className="underline decoration-[#c5a059]">45 MINÚT.</span>
          </h1>
          <p className="text-slate-600 text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-tight">
            Prestaňte plytvať priestorom a peniazmi. Objavte jedinú sušičku s <b>Kapacitou 4KG</b> a <b>Dezinfekciou pri 65°C</b>, ktorá spotrebuje menej ako žiarovka.
          </p>
        </div>

        <div className="relative w-full max-w-2xl mt-12 mb-12">
          <div className="absolute -inset-10 bg-blue-600/10 blur-[100px] rounded-full"></div>
          <img
            src={images[selectedImage]}
            alt="DryPro 360 Ultra Detail"
            className="relative rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] z-10 border-8 border-white w-full object-cover"
          />
          <div className="absolute -top-4 -right-4 z-20 bg-[#c5a059] text-[#0f172a] p-8 rounded-[2.5rem] shadow-2xl rotate-12 flex flex-col items-center justify-center border-4 border-white">
             <span className="text-xs font-black uppercase tracking-widest text-center">Zľava Prime</span>
             <span className="text-4xl font-black leading-none">-72%</span>
          </div>

          {/* Thumbnails */}
          <div className="flex justify-center gap-3 mt-6 relative z-10">
            {images.map((src, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-3 transition-all ${
                  index === selectedImage
                    ? 'border-[#c5a059] shadow-lg scale-110'
                    : 'border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={src} alt={`Pohľad ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <a href="#objednavka" className="group w-full max-w-lg bg-[#dc2626] text-white py-6 md:py-7 rounded-[2rem] font-black text-xl md:text-2xl shadow-[0_20px_40px_rgba(220,38,38,0.4)] flex items-center justify-center gap-4 transition-all hover:scale-105 active:scale-95 uppercase tracking-tighter leading-none">
          OBJEDNAŤ TERAZ -72% <ShoppingCart className="group-hover:rotate-12 transition-transform" />
        </a>
        <p className="mt-4 text-slate-400 text-sm font-bold flex items-center gap-2">
          <Clock size={16}/> Už 14 582 ľudí ho dostalo domov
        </p>
      </div>
    </section>
  );
};

const Navbar = () => (
  <nav className="bg-white/90 backdrop-blur-xl sticky top-[24px] z-[100] border-b px-6 py-4 flex justify-between items-center shadow-sm">
    <div className="flex items-center gap-2">
      <div className="bg-[#0f172a] text-white p-2 rounded-xl">
        <Wind size={22} />
      </div>
      <span className="font-black text-2xl tracking-tighter">DRYPRO<span className="text-[#c5a059] italic uppercase">Ultra</span></span>
    </div>
    <div className="hidden md:flex gap-8 font-black text-[10px] uppercase tracking-widest text-slate-400">
      <a href="#objednavka" className="hover:text-blue-700 transition-colors">Výhody</a>
      <a href="#objednavka" className="hover:text-blue-700 transition-colors">Technológia</a>
      <a href="#recenzie" className="hover:text-blue-700 transition-colors">Recenzie</a>
    </div>
    <a href="#objednavka" className="bg-[#0f172a] text-white px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-blue-800 transition-all">
      KÚPIŤ TERAZ
    </a>
  </nav>
);

const StickyCTA = () => (
  <div className="md:hidden fixed bottom-0 left-0 right-0 z-[200] bg-white border-t p-4 flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
    <div className="flex flex-col">
      <span className="text-[#dc2626] font-black text-3xl leading-none">69,99 €</span>
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Zľava Vypredania</span>
    </div>
    <a href="#objednavka" className="bg-[#dc2626] text-white px-8 py-4 rounded-2xl font-black text-sm uppercase shadow-xl active:scale-95 transition-all tracking-tighter">
      VYUŽIŤ TERAZ
    </a>
  </div>
);

export default function LandingPage() {
  return (
    <>
      {/* Google Tag (gtag.js) */}
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

      {/* Fingerprint Script */}
      <Script
        src="https://offers.supertrendaffiliateprogram.com/forms/tmfp/"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      {/* Click Tracking Pixel */}
      <img
        src={`https://offers.supertrendaffiliateprogram.com/forms/api/ck/?o=${API_CONFIG.offer}&uid=${API_CONFIG.uid}&lp=${API_CONFIG.lp}`}
        style={{ width: '1px', height: '1px', display: 'none' }}
        alt=""
      />

      <div className="antialiased selection:bg-[#c5a059] selection:text-white bg-slate-50 text-slate-900">
        <TopUrgency />
        <Navbar />
        <main className="pb-24">
          <Hero />
          <div className="bg-slate-50 border-y py-12 px-4 flex flex-wrap justify-center gap-8 md:gap-16 opacity-60">
             <div className="flex flex-col items-center gap-1 font-black text-[10px] uppercase tracking-widest"><Truck size={20} /> Expresná Doprava</div>
             <div className="flex flex-col items-center gap-1 font-black text-[10px] uppercase tracking-widest"><ShieldCheck size={20} /> Plná Záruka</div>
             <div className="flex flex-col items-center gap-1 font-black text-[10px] uppercase tracking-widest"><Award size={20} /> Certifikát CE</div>
             <div className="flex flex-col items-center gap-1 font-black text-[10px] uppercase tracking-widest"><ThumbsUp size={20} /> Vrátenie 30 Dní</div>
          </div>
          <PainPoints />
          <VideoSection />
          <PowerSpecs />
          <AmazonReviews />
          <OrderForm />

          {/* Footer info */}
          <section className="py-16 px-4 text-center bg-slate-900 text-white">
            <div className="max-w-4xl mx-auto space-y-6">
              <h3 className="text-2xl font-black italic tracking-tighter uppercase">DRYPRO 360 ULTRA</h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto">Definitívne riešenie problému vlhkosti v domácnosti. Navrhnuté v Nemecku, milované na Slovensku.</p>
              <div className="flex justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500 pt-8 border-t border-white/5">
                <a href="#" className="hover:text-white transition-colors">Súkromie</a>
                <a href="#" className="hover:text-white transition-colors">Podmienky</a>
                <a href="#" className="hover:text-white transition-colors">Cookies</a>
              </div>
              <p className="text-[9px] text-slate-600 italic">&copy; 2026 DryPro 360 Ultra. Upozornenie: Úspora energie a čas sušenia závisia od typu náplne a podmienok používania.</p>
            </div>
          </section>
        </main>
        <StickyCTA />
      </div>
    </>
  );
}
