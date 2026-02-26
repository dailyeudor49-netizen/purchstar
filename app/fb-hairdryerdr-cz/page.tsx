
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle,
  Star,
  Clock,
  ShieldCheck,
  Truck,
  ArrowRight,
  Flame,
  Wind,
  Sparkles,
  Menu,
  X,
  ShoppingBag,
  CreditCard,
  ThumbsUp,
  AlertTriangle,
  Zap,
  Gift,
  ExternalLink,
  ShieldAlert,
  RotateCw,
  ZapOff,
  Scissors
} from 'lucide-react';

// --- PODKOMPONENTY ---

const LiveSalesToast = () => {
  const [visible, setVisible] = useState(false);
  const [currentSale, setCurrentSale] = useState({ name: 'Jana', city: 'Praha' });
  const names = ['Jana', 'Marie', 'Lucie', 'Eva', 'Petra', 'Tereza', 'Kate\u0159ina', 'Anna'];
  const cities = ['Praha', 'Brno', 'Ostrava', 'Plze\u0148', 'Liberec', 'Olomouc', '\u010cesk\u00e9 Bud\u011bjovice', 'Hradec Kr\u00e1lov\u00e9'];

  useEffect(() => {
    const trigger = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      setCurrentSale({ name: randomName, city: randomCity });
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
    };

    const interval = setInterval(trigger, 15000);
    const initialTimeout = setTimeout(trigger, 3000);
    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 md:bottom-24 left-2 md:left-4 right-2 md:right-auto z-[90] bg-white p-2.5 md:p-3 rounded-xl md:rounded-2xl shadow-2xl border border-gray-100 flex items-center gap-2 md:gap-3 max-w-[280px] md:max-w-none">
      <div className="w-8 h-8 md:w-10 md:h-10 bg-rose-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
        <ShoppingBag size={14} className="md:w-[18px] md:h-[18px]" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] md:text-xs font-bold text-gray-900 uppercase tracking-tighter truncate">{currentSale.name} z {currentSale.city}</p>
        <p className="text-[9px] md:text-[10px] text-gray-500 font-medium">{"Koupila AuraStyler\u2122"}</p>
      </div>
    </div>
  );
};

const TrustpilotBadge = () => (
  <div className="flex items-center gap-2 mb-4 bg-white/80 backdrop-blur inline-flex px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-[#00b67a] p-0.5 rounded-sm">
          <Star className="w-2.5 h-2.5 text-white fill-current" />
        </div>
      ))}
    </div>
    <span className="text-[10px] font-bold text-gray-800 uppercase tracking-tighter">{"V\u00fdborn\u00e9 4.9/5 na Trustpilotu"}</span>
  </div>
);

// --- HLAVN\u00cd KOMPONENTA ---

const CountdownTimer = () => {
  const [time, setTime] = useState({ hours: 2, minutes: 59, seconds: 47 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center gap-1 md:gap-2 text-white font-mono">
      <div className="bg-white/20 backdrop-blur px-2 md:px-3 py-1 rounded-lg">
        <span className="text-base md:text-xl font-black">{String(time.hours).padStart(2, '0')}</span>
      </div>
      <span className="text-base md:text-xl font-black">:</span>
      <div className="bg-white/20 backdrop-blur px-2 md:px-3 py-1 rounded-lg">
        <span className="text-base md:text-xl font-black">{String(time.minutes).padStart(2, '0')}</span>
      </div>
      <span className="text-base md:text-xl font-black">:</span>
      <div className="bg-white/20 backdrop-blur px-2 md:px-3 py-1 rounded-lg">
        <span className="text-base md:text-xl font-black">{String(time.seconds).padStart(2, '0')}</span>
      </div>
    </div>
  );
};

const StockProgress = () => {
  const [stock] = useState(7);
  const maxStock = 50;
  const percentage = (stock / maxStock) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
        <span className="text-rose-500">{"⚠\ufe0f Zb\u00fdv\u00e1 pouze "}{stock}{" kus\u016f"}</span>
        <span className="text-gray-400">{Math.round(100 - percentage)}% prod\u00e1no</span>
      </div>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-rose-500 to-red-600 rounded-full transition-all duration-1000 animate-pulse"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

function LandingPageContent() {
  const searchParams = useSearchParams();
  const [showSticky, setShowSticky] = useState(false);
  const [formData, setFormData] = useState({ jmeno: '', adresa: '', telefon: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setShowSticky(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const body = new URLSearchParams();
      body.append('uid', '0198088f-a4bc-7ed8-89aa-83089fe0180e');
      body.append('key', 'ec15cab563da6cf51f0c7c');
      body.append('offer', '460');
      body.append('lp', '460');
      body.append('name', formData.jmeno);
      body.append('street-address', formData.adresa);
      body.append('tel', formData.telefon);

      let fingerprint = '';
      try {
        const components = [
          navigator.userAgent, navigator.language,
          screen.width + 'x' + screen.height, screen.colorDepth,
          new Date().getTimezoneOffset(), navigator.hardwareConcurrency, navigator.platform
        ];
        const raw = components.join('|');
        const data = new TextEncoder().encode(raw);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        fingerprint = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
      } catch { /* fingerprint failed */ }

      if (fingerprint) {
        body.append('tmfp', fingerprint);
      } else {
        try {
          const res = await fetch('https://api.ipify.org?format=json');
          const ipData = await res.json();
          body.append('ip', ipData.ip);
        } catch { /* IP fetch failed */ }
        body.append('ua', navigator.userAgent);
      }

      const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'subid', 'subid2', 'subid3', 'subid4', 'pubid'];
      utmParams.forEach(param => {
        const value = searchParams.get(param);
        if (value) body.append(param, value);
      });

      await fetch('https://offers.supertrendaffiliateprogram.com/forms/api/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        mode: 'no-cors',
      });

      window.location.href = '/fb-hairdryerdr-cz/ty';
    } catch (error) {
      window.location.href = '/fb-hairdryerdr-cz/ty';
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-rose-500 selection:text-white overflow-x-hidden">
      <img
        src="https://offers.supertrendaffiliateprogram.com/forms/api/ck/?o=460&uid=0198088f-a4bc-7ed8-89aa-83089fe0180e&lp=460"
        style={{ width: '1px', height: '1px', display: 'none' }}
        alt=""
      />

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 text-white py-3 text-center sticky top-0 z-[60] shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6">
          <span className="text-[10px] md:text-xs font-black tracking-widest uppercase flex items-center gap-2">
            <Zap className="w-4 h-4 animate-pulse" /> {"BLESKOV\u00c1 NAB\u00cdDKA -57% KON\u010c\u00cd ZA:"}
          </span>
          <CountdownTimer />
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-[52px] md:top-[56px] z-50">
        <div className="max-w-7xl mx-auto px-3 md:px-4 h-14 md:h-16 flex items-center justify-between">
          <div className="text-lg md:text-2xl font-black tracking-tighter uppercase italic">
            AURA<span className="text-rose-500 tracking-normal">STYLER™</span>
          </div>
          <div className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-widest">
            <a href="#unboxing" className="hover:text-rose-500 transition">Komplet</a>
            <a href="#features" className="hover:text-rose-500 transition">Technologie</a>
            <a href="#comparison" className="hover:text-rose-500 transition">{"Srovn\u00e1n\u00ed"}</a>
            <a href="#reviews" className="hover:text-rose-500 transition">Recenze</a>
          </div>
          <a href="#order" className="bg-rose-500 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-black uppercase shadow-lg shadow-rose-200 active:scale-95 transition-all">
            {"OBJEDNAT NYN\u00cd"}
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-4 md:pt-8 pb-8 md:pb-16 px-3 md:px-4 bg-[#fcfcfc] relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
          <div className="space-y-4 md:space-y-6 text-center lg:text-left">
            <TrustpilotBadge />
            <h1 className="text-3xl md:text-6xl lg:text-8xl font-black leading-[0.9] tracking-tighter uppercase">
              {"SALONOV\u00dd "}<span className="text-rose-500 italic">{"\u00da\u010cES"}</span>{" U V\u00c1S DOMA."}
            </h1>
            <p className="text-base md:text-xl text-gray-500 leading-tight max-w-xl mx-auto lg:mx-0 font-medium italic">
              {"Zapome\u0148te na \u017eehli\u010dky, kter\u00e9 ni\u010d\u00ed vlasy. Objevte s\u00edlu vzdu\u0161n\u00e9ho proudu Coanda."}</p>

            <div className="relative lg:hidden">
              <img src="/images/hairdryer/1.webp" className="rounded-2xl shadow-xl border-2 border-white w-full max-h-[250px] object-cover" alt={"AuraStyler Kompletn\u00ed set"} />
            </div>

            <div className="bg-white p-5 md:p-8 rounded-2xl md:rounded-[3rem] shadow-xl md:shadow-2xl border border-gray-100 max-w-md mx-auto lg:mx-0 relative overflow-hidden">
               <div className="absolute -right-10 top-4 md:-right-12 md:top-6 bg-red-600 text-white text-[8px] md:text-[9px] font-black px-10 md:px-12 py-1 md:py-1.5 rotate-45 uppercase tracking-widest shadow-lg">
                 {"Posledn\u00edch 7!"}
               </div>

               <div className="flex justify-between items-end mb-3 md:mb-4">
                 <div>
                    <span className="text-[10px] md:text-xs font-black text-rose-500 uppercase tracking-widest block mb-1">{"Speci\u00e1ln\u00ed nab\u00eddka"}</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl md:text-6xl font-black">{"1\u00a0498\u00a0K\u010d"}</span>
                      <span className="text-gray-400 line-through font-bold text-sm md:text-base">{"3\u00a0499\u00a0K\u010d"}</span>
                    </div>
                 </div>
                 <div className="text-right">
                    <span className="bg-rose-100 text-rose-600 px-2 md:px-3 py-1 rounded-full text-[9px] md:text-[10px] font-black uppercase animate-pulse">-57%</span>
                 </div>
               </div>

               <div className="mb-4 md:mb-6">
                 <StockProgress />
               </div>

               <a href="#order" className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 md:py-6 rounded-xl md:rounded-2xl text-base md:text-xl font-black shadow-xl shadow-green-200 transition-all flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4 relative overflow-hidden group active:scale-[0.98]">
                 <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></span>
                 <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" /> {"ANO, CHCI HO NYN\u00cd"} <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
               </a>

               <div className="flex items-center justify-center gap-3 md:gap-4 text-[8px] md:text-[9px] font-bold text-gray-400 uppercase">
                 <span className="flex items-center gap-1"><Truck className="w-3 h-3" /> Zdarma</span>
                 <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Z\u00e1ruka</span>
                 <span className="flex items-center gap-1"><CreditCard className="w-3 h-3" /> {"Na dob\u00edrku"}</span>
               </div>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <img src="/images/hairdryer/1.webp" className="rounded-[3rem] shadow-2xl border-4 border-white w-full object-cover" alt={"AuraStyler Kompletn\u00ed set"} />
          </div>
        </div>
      </section>

      {/* ACCESSORIES */}
      <section id="unboxing" className="py-12 md:py-24 bg-white px-3 md:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-20">
            <h2 className="text-2xl md:text-5xl lg:text-7xl font-black mb-2 md:mb-4 uppercase tracking-tighter italic">{"CO OBSAHUJE "}<span className="text-rose-500">BALEN\u00cd.</span></h2>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] md:text-xs">{"5 profesion\u00e1ln\u00edch n\u00e1stavc\u016f v cen\u011b"}</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10">
            <div className="border-t-2 border-gray-100 pt-4 md:pt-8 group">
              <div className="w-10 h-10 md:w-16 md:h-16 bg-gray-50 rounded-xl md:rounded-2xl flex items-center justify-center text-rose-500 mb-3 md:mb-6 group-hover:bg-rose-500 group-hover:text-white transition-all">
                <RotateCw className="w-5 h-5 md:w-8 md:h-8" />
              </div>
              <h3 className="text-sm md:text-2xl font-black mb-1 md:mb-2 uppercase tracking-tighter leading-tight">{"AirStyler ku\u017eel (P)"}</h3>
              <p className="text-[8px] md:text-xs font-black text-gray-400 uppercase tracking-widest mb-2 md:mb-4">{"Pro kudrliny ve sm\u011bru hodinov\u00fdch ru\u010di\u010dek"}</p>
              <p className="text-[10px] md:text-sm text-gray-600 leading-relaxed italic hidden md:block">
                {"Vytvo\u0159te objemn\u00e9 vlny a definovan\u00e9 kudrliny. D\u00edky vzdu\u0161n\u00e9mu proudu Coanda se vlasy automaticky ovinou kolem povrchu ku\u017eele."}
              </p>
            </div>

            <div className="border-t-2 border-gray-100 pt-4 md:pt-8 group">
              <div className="w-10 h-10 md:w-16 md:h-16 bg-gray-50 rounded-xl md:rounded-2xl flex items-center justify-center text-rose-500 mb-3 md:mb-6 group-hover:bg-rose-500 group-hover:text-white transition-all">
                <RotateCw className="w-5 h-5 md:w-8 md:h-8 scale-x-[-1]" />
              </div>
              <h3 className="text-sm md:text-2xl font-black mb-1 md:mb-2 uppercase tracking-tighter leading-tight">{"AirStyler ku\u017eel (L)"}</h3>
              <p className="text-[8px] md:text-xs font-black text-gray-400 uppercase tracking-widest mb-2 md:mb-4">{"Pro kudrliny v protism\u011bru"}</p>
              <p className="text-[10px] md:text-sm text-gray-600 leading-relaxed italic hidden md:block">
                {"Nepostradateln\u00fd pro vytvo\u0159en\u00ed symetrie. Pou\u017eijte tento ku\u017eel na opa\u010dnou stranu obli\u010deje a z\u00edskejte vyv\u00e1\u017een\u00fd, p\u0159irozen\u00fd vzhled jako v kade\u0159nictv\u00ed."}
              </p>
            </div>

            <div className="border-t-2 border-gray-100 pt-4 md:pt-8 group">
              <div className="w-10 h-10 md:w-16 md:h-16 bg-gray-50 rounded-xl md:rounded-2xl flex items-center justify-center text-rose-500 mb-3 md:mb-6 group-hover:bg-rose-500 group-hover:text-white transition-all">
                <ZapOff className="w-5 h-5 md:w-8 md:h-8" />
              </div>
              <h3 className="text-sm md:text-2xl font-black mb-1 md:mb-2 uppercase tracking-tighter leading-tight">{"Vyhlazovac\u00ed kart\u00e1\u010d"}</h3>
              <p className="text-[8px] md:text-xs font-black text-gray-400 uppercase tracking-widest mb-2 md:mb-4">{"Sbohem krepatost"}</p>
              <p className="text-[10px] md:text-sm text-gray-600 leading-relaxed italic hidden md:block">
                {"Navr\u017een\u00fd s tvrd\u00fdmi \u0161t\u011btinami pro zkrocen\u00ed krepatých vlas\u016f. Z\u00edskejte hedv\u00e1bn\u011b hladk\u00fd vzhled s v\u00fdrazn\u011b sn\u00ed\u017een\u00fdm pou\u017eit\u00edm extr\u00e9mn\u00edho tepla."}
              </p>
            </div>

            <div className="border-t-2 border-gray-100 pt-4 md:pt-8 group">
              <div className="w-10 h-10 md:w-16 md:h-16 bg-gray-50 rounded-xl md:rounded-2xl flex items-center justify-center text-rose-500 mb-3 md:mb-6 group-hover:bg-rose-500 group-hover:text-white transition-all">
                <Sparkles className="w-5 h-5 md:w-8 md:h-8" />
              </div>
              <h3 className="text-sm md:text-2xl font-black mb-1 md:mb-2 uppercase tracking-tighter leading-tight">{"Kart\u00e1\u010d na objem"}</h3>
              <p className="text-[8px] md:text-xs font-black text-gray-400 uppercase tracking-widest mb-2 md:mb-4">Objem XXL</p>
              <p className="text-[10px] md:text-sm text-gray-600 leading-relaxed italic hidden md:block">
                {"Sm\u011bruje vzduch mezi prameny pro tvarov\u00e1n\u00ed a objem p\u0159i su\u0161en\u00ed. Ide\u00e1ln\u00ed pro modelov\u00e1n\u00ed kone\u010dk\u016f a p\u0159irozen\u00fd objem u ko\u0159\u00ednk\u016f."}
              </p>
            </div>

            <div className="border-t-2 border-gray-100 pt-4 md:pt-8 group">
              <div className="w-10 h-10 md:w-16 md:h-16 bg-gray-50 rounded-xl md:rounded-2xl flex items-center justify-center text-rose-500 mb-3 md:mb-6 group-hover:bg-rose-500 group-hover:text-white transition-all">
                <Wind className="w-5 h-5 md:w-8 md:h-8" />
              </div>
              <h3 className="text-sm md:text-2xl font-black mb-1 md:mb-2 uppercase tracking-tighter leading-tight">{"Su\u0161ic\u00ed n\u00e1stavec"}</h3>
              <p className="text-[8px] md:text-xs font-black text-gray-400 uppercase tracking-widest mb-2 md:mb-4">{"Rychl\u00e9 su\u0161en\u00ed"}</p>
              <p className="text-[10px] md:text-sm text-gray-600 leading-relaxed italic hidden md:block">
                {"P\u0159ivede vlasy z mokr\u00e9ho stavu na ide\u00e1ln\u00ed vlhkost pro za\u010d\u00e1tek stylingu. Koncentrovan\u00fd proud vzduchu, kter\u00fd chr\u00e1n\u00ed keratin ve vlasech."}
              </p>
            </div>

            <div className="bg-rose-500 p-5 md:p-10 rounded-2xl md:rounded-[3rem] text-white flex flex-col justify-center items-center text-center shadow-xl shadow-rose-200">
               <Gift className="w-8 h-8 md:w-12 md:h-12 mb-3 md:mb-6 animate-bounce" />
               <h3 className="text-base md:text-3xl font-black mb-2 md:mb-4 uppercase tracking-tighter leading-none">{"KOMPLETN\u00cd SET\nJE V\u00c1\u0160 ZA 1\u00a0498\u00a0K\u010d"}</h3>
               <p className="text-[8px] md:text-xs font-black uppercase tracking-wider md:tracking-[0.2em] mb-3 md:mb-6 text-rose-100">{"M\u00edsto 3\u00a0499\u00a0K\u010d"}</p>
               <a href="#order" className="bg-white text-rose-500 px-4 md:px-8 py-2 md:py-3 rounded-full font-black uppercase text-[8px] md:text-[10px] tracking-widest hover:scale-105 transition-all">{"OBJEDNAT NYN\u00cd"}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-12 md:py-24 bg-gradient-to-b from-gray-50 to-white px-3 md:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-5xl lg:text-7xl font-black mb-2 md:mb-4 uppercase tracking-tighter italic">{"POD\u00cdVEJTE SE NA "}<span className="text-rose-500">{"V\u00ddSLEDEK."}</span></h2>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] md:text-xs">{"Profesion\u00e1ln\u00ed styling za p\u00e1r minut"}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center mb-8 md:mb-16">
            <div className="relative rounded-2xl md:rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
              <img src="/gif/hairdryer/1.gif" className="w-full h-auto" alt="AuraStyler v akci" />
              <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 bg-black/70 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4">
                <p className="text-white text-xs md:text-sm font-black uppercase tracking-wider">{"Efekt Coanda v akci"}</p>
                <p className="text-gray-300 text-[10px] md:text-xs italic">{"Vlasy se automaticky ovinou"}</p>
              </div>
            </div>

            <div className="relative rounded-2xl md:rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
              <img src="/images/hairdryer/2.webp" className="w-full h-auto object-cover" alt={"V\u00fdsledek stylingu"} />
              <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-rose-500 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-black uppercase">
                {"P\u0159ed a po"}
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl md:rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
            <img src="/images/hairdryer/3.webp" className="w-full h-[200px] md:h-[400px] object-cover" alt="AuraStyler detail" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end">
              <div className="p-6 md:p-12 text-white">
                <h3 className="text-xl md:text-4xl font-black uppercase tracking-tighter mb-2">{"Pr\u00e9miov\u00fd design"}</h3>
                <p className="text-gray-300 text-sm md:text-lg italic max-w-xl">{"Vysoce kvalitn\u00ed materi\u00e1ly a nejnov\u011bj\u0161\u00ed technologie pro salonov\u00e9 v\u00fdsledky."}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media */}
      <div className="bg-gray-50 py-6 md:py-12 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-4 md:gap-20 opacity-30 grayscale contrast-125">
          <span className="text-xl md:text-3xl font-serif italic font-black">VOGUE</span>
          <span className="text-xl md:text-3xl font-sans font-black tracking-tighter italic">VanityFair</span>
          <span className="text-lg md:text-2xl font-serif font-black">COSMOPOLITAN</span>
          <span className="text-xl md:text-3xl font-sans font-black italic tracking-tighter underline">ELLE</span>
        </div>
      </div>

      {/* LOSS AVERSION */}
      <section className="py-12 md:py-24 bg-gradient-to-b from-gray-900 to-black px-3 md:px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-rose-500 rounded-full blur-[100px] md:blur-[150px]"></div>
          <div className="absolute bottom-0 right-1/4 w-48 md:w-96 h-48 md:h-96 bg-rose-500 rounded-full blur-[100px] md:blur-[150px]"></div>
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-8 md:mb-16">
            <span className="inline-block bg-rose-500/20 text-rose-400 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-4 md:mb-6 border border-rose-500/30">
              <AlertTriangle className="inline w-2.5 h-2.5 md:w-3 md:h-3 mr-1" /> {"Pravda, kterou v\u00e1m nikdo ne\u0159ekne"}
            </span>
            <h2 className="text-2xl md:text-7xl font-black text-white uppercase tracking-tighter italic leading-[0.9] mb-4 md:mb-6">
              {"KA\u017dD\u00dd DEN, KDY \u010cEK\u00c1TE,"} <br/><span className="text-rose-500">ZTRÁC\u00cdTE.</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto font-medium italic px-2">
              {"Nejde jen o vlasy. Jde o \u010das, pen\u00edze a sebev\u011bdom\u00ed, kter\u00e9 ka\u017ed\u00e9 r\u00e1no vyhazujete."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-16">
            {[
              {
                icon: <Clock className="text-rose-500 w-6 h-6 md:w-10 md:h-10" />,
                value: "45 min",
                label: "Ztracen\u00fdch ka\u017ed\u00e9 r\u00e1no",
                desc: "To je 273 hodin ro\u010dn\u011b. 11 cel\u00fdch dn\u016f va\u0161eho \u017eivota p\u0159ed zrcadlem."
              },
              {
                icon: <CreditCard className="text-rose-500 w-6 h-6 md:w-10 md:h-10" />,
                value: "30 000 K\u010d+",
                label: "Vyhrozen\u00fdch ro\u010dn\u011b",
                desc: "Mezi kade\u0159nictv\u00edm, o\u0161et\u0159en\u00edmi a produkty, kter\u00e9 slibuj\u00ed z\u00e1zraky a pak zklam\u00e1vaj\u00ed."
              },
              {
                icon: <Flame className="text-rose-500 w-6 h-6 md:w-10 md:h-10" />,
                value: "80%",
                label: "Po\u0161kozen\u00fdch vlas\u016f",
                desc: "Tradi\u010dn\u00ed \u017eehli\u010dky dosahuj\u00ed 230\u00b0C. Po\u0161kozen\u00ed je nevratn\u00e9."
              }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 backdrop-blur border border-white/10 p-5 md:p-8 rounded-2xl md:rounded-[2.5rem] text-center group hover:bg-white/10 transition-all">
                <div className="mb-2 md:mb-4 flex justify-center">{item.icon}</div>
                <p className="text-3xl md:text-5xl font-black text-white mb-1 md:mb-2">{item.value}</p>
                <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-rose-400 mb-2 md:mb-4">{item.label}</p>
                <p className="text-[11px] md:text-sm text-gray-400 italic leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-rose-500/10 border-2 border-rose-500/30 rounded-2xl md:rounded-[3rem] p-6 md:p-14 text-center">
            <h3 className="text-lg md:text-4xl font-black text-white uppercase tracking-tighter mb-4 md:mb-6 italic leading-tight">
              {"\"Po\u010dk\u00e1m na p\u0159\u00ed\u0161t\u00ed m\u011bs\u00edc\" = Dal\u0161\u00edch 2\u00a0500\u00a0K\u010d do ko\u0161e"}
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto mb-6 md:mb-8 text-sm md:text-lg font-medium">
              {"1\u00a0847 \u017een, kter\u00e9 si tento t\u00fdden u\u017e objednaly?"} <br/>
              <span className="text-rose-400 font-black">{"Z\u00edtra se probud\u00ed s \u00fa\u010desem, kter\u00fd je u\u017e hotov\u00fd."}</span>
            </p>
            <a href="#order" className="inline-flex items-center gap-2 md:gap-3 bg-rose-500 text-white px-6 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase text-sm md:text-lg shadow-2xl shadow-rose-500/40 hover:scale-105 active:scale-95 transition-all">
              {"OBJEDNAT NYN\u00cd"} <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </a>
            <p className="text-[8px] md:text-[10px] text-gray-500 mt-3 md:mt-4 font-bold uppercase tracking-widest">
              {"Nab\u00eddka plat\u00ed pouze dnes. Z\u00edtra se cena vr\u00e1t\u00ed na 3\u00a0499\u00a0K\u010d"}
            </p>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section id="comparison" className="py-12 md:py-24 bg-white px-3 md:px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-7xl font-black text-center mb-8 md:mb-16 tracking-tighter uppercase italic">{"Vyberte si "}<span className="text-rose-500">{"chyt\u0159e."}</span></h2>
          <div className="grid grid-cols-2 gap-0 border-2 md:border-4 border-gray-900 rounded-2xl md:rounded-[4rem] overflow-hidden">
             <div className="p-4 md:p-12 bg-gray-50 opacity-40">
                <p className="text-xs md:text-xl font-black mb-4 md:mb-8 uppercase text-gray-400">{"Vedouc\u00ed zna\u010dka"}</p>
                <ul className="space-y-3 md:space-y-6">
                  <li className="flex gap-2 md:gap-3 text-[10px] md:text-sm font-bold text-gray-500 italic"><X className="text-red-500 shrink-0 w-4 h-4 md:w-5 md:h-5" /> <span>{"13\u00a0990\u00a0K\u010d"}</span></li>
                  <li className="flex gap-2 md:gap-3 text-[10px] md:text-sm font-bold text-gray-500 italic"><X className="text-red-500 shrink-0 w-4 h-4 md:w-5 md:h-5" /> <span>{"Platba p\u0159edem"}</span></li>
                  <li className="flex gap-2 md:gap-3 text-[10px] md:text-sm font-bold text-gray-500 italic"><X className="text-red-500 shrink-0 w-4 h-4 md:w-5 md:h-5" /> <span>{"Placen\u00e9 doru\u010den\u00ed"}</span></li>
                </ul>
             </div>
             <div className="p-4 md:p-12 bg-white relative">
                <div className="absolute top-3 right-3 md:top-6 md:right-6">
                   <CheckCircle className="text-green-500 w-5 h-5 md:w-8 md:h-8" />
                </div>
                <p className="text-xs md:text-xl font-black mb-4 md:mb-8 uppercase text-rose-500">{"AuraStyler\u2122"}</p>
                <ul className="space-y-3 md:space-y-6">
                  <li className="flex gap-2 md:gap-3 text-[10px] md:text-sm font-black italic"><CheckCircle className="text-green-500 shrink-0 w-4 h-4 md:w-5 md:h-5" /> <span>{"POUZE 1\u00a0498\u00a0K\u010d"}</span></li>
                  <li className="flex gap-2 md:gap-3 text-[10px] md:text-sm font-black italic"><CheckCircle className="text-green-500 shrink-0 w-4 h-4 md:w-5 md:h-5" /> <span>{"Platba na dob\u00edrku"}</span></li>
                  <li className="flex gap-2 md:gap-3 text-[10px] md:text-sm font-black italic"><CheckCircle className="text-green-500 shrink-0 w-4 h-4 md:w-5 md:h-5" /> <span>{"Doprava zdarma"}</span></li>
                </ul>
             </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-12 md:py-24 bg-gray-50 px-3 md:px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-6xl font-black mb-8 md:mb-16 text-center tracking-tighter uppercase italic">{"Ov\u011b\u0159en\u00e9 "}<span className="text-rose-500">recenze</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 items-center mb-8 md:mb-16 bg-white p-5 md:p-12 rounded-2xl md:rounded-[3rem] border border-gray-100">
            <div className="text-center md:text-left">
              <span className="text-5xl md:text-7xl font-black">4.9</span>
              <div className="flex gap-0.5 justify-center md:justify-start mt-2">
                 {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-orange-400 fill-current" />)}
              </div>
              <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400 mt-2">{"456 SPOKOJENCH Z\u00c1KAZNIC"}</p>
            </div>
            <div className="md:col-span-2 space-y-2 md:space-y-3">
               {[5, 4, 3, 2, 1].map(s => (
                 <div key={s} className="flex items-center gap-2 md:gap-4 text-[9px] md:text-[10px] font-black uppercase">
                    <span className="w-10 md:w-12">{s} {"HV\u011aZD"}</span>
                    <div className="flex-1 h-2 md:h-3 bg-gray-100 rounded-full overflow-hidden">
                       <div className="h-full bg-orange-400" style={{ width: s === 5 ? '92%' : s === 4 ? '6%' : '1%' }}></div>
                    </div>
                    <span className="w-8 text-gray-400">{s === 5 ? '92%' : s === 4 ? '6%' : '1%'}</span>
                 </div>
               ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {[
              { a: "Jana R.", r: "Neuv\u011b\u0159iteln\u00e9. D\u011bl\u00e1 p\u0159esn\u011b to, co slibuje. Kudrliny vydr\u017e\u00ed opravdu dlouho!", d: "Dnes" },
              { a: "Marie L.", r: "Bal\u00edk dorazil za 24 hodin. Zaplatila jsem kur\u00fdrovi v hotovosti. Super doporu\u010duji!", d: "V\u010dera" },
              { a: "Lucie V.", r: "Vyhlazovac\u00ed kart\u00e1\u010d je kouzelný pro ty, co maj\u00ed kudrnaty vlasy jako j\u00e1.", d: "P\u0159ed 2 dny" },
              { a: "Eva C.", r: "Neuv\u011b\u0159iteln\u00e1 hodnota za 1\u00a0498 K\u010d. Nem\u00e1 co z\u00e1vid\u011bt zna\u010dk\u00e1m za 13\u00a0000 K\u010d.", d: "P\u0159ed 3 dny" }
            ].map((rev, i) => (
              <div key={i} className="bg-white p-5 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-gray-100">
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                   <div className="w-8 h-8 md:w-10 md:h-10 bg-rose-50 rounded-full flex items-center justify-center font-black text-rose-500 text-sm md:text-base">{rev.a[0]}</div>
                   <div>
                     <p className="font-black text-[10px] md:text-xs uppercase">{rev.a}</p>
                     <p className="text-[8px] md:text-[9px] text-gray-400 font-bold uppercase">{rev.d}</p>
                   </div>
                </div>
                <div className="flex gap-0.5 mb-2 md:mb-3">
                   {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 md:w-3 md:h-3 text-orange-400 fill-current" />)}
                </div>
                <p className="text-[10px] md:text-sm font-black italic mb-2 md:mb-3">{"\"Ov\u011b\u0159en\u00fd n\u00e1kup\""}</p>
                <p className="text-gray-600 text-[11px] md:text-sm leading-relaxed italic">{`"${rev.r}"`}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form */}
      <section id="order" className="py-12 md:py-24 bg-gray-900 px-3 md:px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-20 items-center">
          <div className="text-white text-center lg:text-left">
             <h2 className="text-3xl md:text-8xl font-black uppercase tracking-tighter leading-none italic mb-4 md:mb-8">{"PLAŤTE"} <br/> <span className="text-rose-500">{"KUR\u00ddROVI."}</span></h2>
             <p className="text-sm md:text-xl text-gray-400 font-medium italic mb-6 md:mb-10">{"\"Karta nen\u00ed pot\u0159eba. Plat\u00edte a\u017e kdy\u017e m\u00e1te v\u00fdrobek v rukou.\""}</p>
             <div className="space-y-2 md:space-y-4 hidden lg:block">
               {[
                 { t: "Platba v hotovosti", i: <CreditCard className="w-5 h-5" /> },
                 { t: "Doprava zdarma 24h", i: <Truck className="w-5 h-5" /> },
                 { t: "Z\u00e1ruka 2 roky", i: <ShieldCheck className="w-5 h-5" /> }
               ].map((x, i) => (
                 <div key={i} className="flex items-center gap-3 md:gap-4 bg-white/5 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-white/10">
                    <div className="text-rose-500">{x.i}</div>
                    <p className="font-black text-xs md:text-sm uppercase tracking-widest">{x.t}</p>
                 </div>
               ))}
             </div>
             <div className="flex justify-center gap-4 lg:hidden">
               <div className="flex flex-col items-center gap-1 text-[9px] font-bold text-gray-400 uppercase">
                 <CreditCard className="w-5 h-5 text-rose-500" />
                 <span>Hotovost</span>
               </div>
               <div className="flex flex-col items-center gap-1 text-[9px] font-bold text-gray-400 uppercase">
                 <Truck className="w-5 h-5 text-rose-500" />
                 <span>24h zdarma</span>
               </div>
               <div className="flex flex-col items-center gap-1 text-[9px] font-bold text-gray-400 uppercase">
                 <ShieldCheck className="w-5 h-5 text-rose-500" />
                 <span>2 roky</span>
               </div>
             </div>
          </div>

          <div className="bg-white p-5 md:p-12 rounded-2xl md:rounded-[3rem] shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 left-0 right-0 bg-green-500 text-white text-center py-1.5 md:py-2 text-[8px] md:text-[10px] font-black uppercase tracking-widest">
               {"✓ 2\u00a0847 objedn\u00e1vek tento t\u00fdden"}
             </div>

             <form onSubmit={handleOrder} className="space-y-3 md:space-y-5 mt-6 md:mt-8">
               <div className="text-center mb-4 md:mb-8">
                 <h3 className="text-xl md:text-3xl font-black uppercase tracking-tighter">{"Kam to m\u00e1me poslat?"}</h3>
                 <p className="text-[9px] md:text-[10px] font-black uppercase text-gray-400 tracking-widest mt-1 md:mt-2">{"Vypl\u0148te za 30 sekund \u2022 Platba kur\u00fdrovi"}</p>
               </div>

               <div className="flex items-center justify-center gap-1.5 md:gap-2 mb-4 md:mb-6">
                 <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ${formData.jmeno ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                 <div className={`w-6 md:w-8 h-0.5 ${formData.adresa ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                 <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ${formData.adresa ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                 <div className={`w-6 md:w-8 h-0.5 ${formData.telefon ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                 <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ${formData.telefon ? 'bg-green-500' : 'bg-gray-200'}`}></div>
               </div>

               <div className="relative">
                 <input
                   required
                   className={`w-full p-4 md:p-5 bg-gray-50 rounded-xl md:rounded-2xl outline-none border-2 transition-all font-bold text-sm md:text-base ${activeField === 'jmeno' ? 'border-rose-500 bg-white shadow-lg' : 'border-transparent'}`}
                   placeholder={"Jm\u00e9no a p\u0159\u00edjmen\u00ed *"}
                   value={formData.jmeno}
                   onChange={e => setFormData({...formData, jmeno: e.target.value})}
                   onFocus={() => setActiveField('jmeno')}
                   onBlur={() => setActiveField(null)}
                 />
                 {formData.jmeno && <CheckCircle className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-green-500 w-4 h-4 md:w-5 md:h-5" />}
               </div>

               <div className="relative">
                 <input
                   required
                   className={`w-full p-4 md:p-5 bg-gray-50 rounded-xl md:rounded-2xl outline-none border-2 transition-all font-bold text-sm md:text-base ${activeField === 'adresa' ? 'border-rose-500 bg-white shadow-lg' : 'border-transparent'}`}
                   placeholder={"Kompletn\u00ed adresa *"}
                   value={formData.adresa}
                   onChange={e => setFormData({...formData, adresa: e.target.value})}
                   onFocus={() => setActiveField('adresa')}
                   onBlur={() => setActiveField(null)}
                 />
                 {formData.adresa && <CheckCircle className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-green-500 w-4 h-4 md:w-5 md:h-5" />}
               </div>

               <div className="relative">
                 <input
                   required
                   type="tel"
                   className={`w-full p-4 md:p-5 bg-gray-50 rounded-xl md:rounded-2xl outline-none border-2 transition-all font-bold text-sm md:text-base ${activeField === 'telefon' ? 'border-rose-500 bg-white shadow-lg' : 'border-transparent'}`}
                   placeholder={"Telefon (pro kur\u00fdra) *"}
                   value={formData.telefon}
                   onChange={e => setFormData({...formData, telefon: e.target.value})}
                   onFocus={() => setActiveField('telefon')}
                   onBlur={() => setActiveField(null)}
                 />
                 {formData.telefon && <CheckCircle className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-green-500 w-4 h-4 md:w-5 md:h-5" />}
               </div>

               <div className="bg-gray-50 rounded-xl md:rounded-2xl p-3 md:p-4 space-y-1.5 md:space-y-2 text-xs md:text-sm">
                 <div className="flex justify-between font-bold">
                   <span>{"AuraStyler\u2122 Kompletn\u00ed set"}</span>
                   <span className="line-through text-gray-400">{"3\u00a0499\u00a0K\u010d"}</span>
                 </div>
                 <div className="flex justify-between font-bold text-green-600">
                   <span>Sleva -57%</span>
                   <span>-2 001 K\u010d</span>
                 </div>
                 <div className="flex justify-between font-bold">
                   <span>{"Expresn\u00ed doprava"}</span>
                   <span className="text-green-600">ZDARMA</span>
                 </div>
                 <div className="border-t pt-2 flex justify-between font-black text-lg md:text-xl">
                   <span>CELKEM</span>
                   <span className="text-rose-500">{"1\u00a0498\u00a0K\u010d"}</span>
                 </div>
               </div>

               <button
                 disabled={isSubmitting}
                 className="w-full py-4 md:py-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl md:rounded-2xl text-sm md:text-xl font-black uppercase shadow-2xl shadow-green-300 hover:from-green-600 hover:to-green-700 transform transition-all active:scale-[0.98] disabled:opacity-70 relative overflow-hidden group"
               >
                 <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></span>
                 {isSubmitting ? (
                   <span className="flex items-center justify-center gap-2">
                     <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                     {"ZPRACOV\u00c1V\u00c1M..."}
                   </span>
                 ) : (
                   <span className="flex items-center justify-center gap-2">
                     <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" /> <span className="hidden md:inline">{"DOKON\u010cIT OBJEDN\u00c1VKU - "}</span>{"PLATBA KUR\u00ddROVI"}
                   </span>
                 )}
               </button>

               <div className="flex items-center justify-center gap-4 md:gap-6 pt-1 md:pt-2">
                 <div className="flex items-center gap-1 text-[8px] md:text-[9px] font-bold text-gray-400">
                   <ShieldCheck className="w-3 h-3 md:w-4 md:h-4 text-green-500" /> {"SSL Zabezpe\u010den\u00e9"}
                 </div>
                 <div className="flex items-center gap-1 text-[8px] md:text-[9px] font-bold text-gray-400">
                   <Truck className="w-3 h-3 md:w-4 md:h-4 text-green-500" /> 24-48h
                 </div>
                 <div className="flex items-center gap-1 text-[8px] md:text-[9px] font-bold text-gray-400">
                   <RotateCw className="w-3 h-3 md:w-4 md:h-4 text-green-500" /> {"Snadn\u00e9 vr\u00e1cen\u00ed"}
                 </div>
               </div>
             </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 md:py-20 bg-black text-white px-3 md:px-4 text-center pb-24 md:pb-20">
        <div className="text-xl md:text-2xl font-black tracking-tighter uppercase italic mb-4 md:mb-8">
           AURA<span className="text-rose-500 tracking-normal">STYLER™</span>
        </div>
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4 md:gap-10 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6 md:mb-12">
           <a href="#" className="hover:text-white transition">{"Z\u00e1sady ochrany osobn\u00edch \u00fadaj\u016f"}</a>
           <a href="#" className="hover:text-white transition">{"Obchodn\u00ed podm\u00ednky"}</a>
           <a href="#" className="hover:text-white transition">{"Pr\u00e1vo na odstoupen\u00ed"}</a>
        </div>
        <p className="text-[8px] md:text-[10px] text-gray-700 font-black uppercase tracking-widest md:tracking-[0.4em] leading-relaxed">
          {"AURA STYLER\u2122 NEN\u00cd P\u0158IDRU\u017dEN\u00c1 K DYSON LTD."} <br/>
          {"ZNA\u010cKA DYSON\u00ae PAT\u0158\u00cd SV\u00c9MU VLASTN\u00cdKOVI."}
        </p>
      </footer>

      <LiveSalesToast />

      {/* Sticky Mobile CTA */}
      <div className={`fixed bottom-0 left-0 right-0 z-[100] transition-all duration-500 transform lg:hidden ${showSticky ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="bg-white border-t-2 border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.15)] p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-gray-900">{"1\u00a0498\u00a0K\u010d"}</span>
                <span className="text-sm text-gray-400 line-through">{"3\u00a0499\u00a0K\u010d"}</span>
              </div>
              <span className="text-[9px] font-bold text-green-600 uppercase">Doprava zdarma</span>
            </div>
            <a href="#order" className="flex-1 max-w-[200px] bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-2xl font-black text-sm shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all">
              {"OBJEDNAT"} <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}

export default function LandingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center"><div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div></div>}>
      <LandingPageContent />
    </Suspense>
  );
}
