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
  url: 'https://offers.uncappednetwork.com/forms/api/',
  uid: '0191dbf2-738a-7d28-82a0-18c3859d5e8f',
  key: '151af1e45a084aaf75c15f',
  offer: '3166',
  lp: '3200'
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
    DEMESIO: TIK 9 VIENETAI PRIEINAMI SIUO KAINA!
  </div>
);

// --- Amazon Style Reviews Section ---
const AmazonReviews = () => {
  const reviews = [
    { name: "Marius Kazlauskas", date: "2026 m. vasario 14 d.", text: "Neikainuojama. Tikrai isdzovina 4kg drabuziu be problemu. Per maziau nei 45 minutes turiu marskinius paruostus, sterilizuotus ir siltus. Sutaupymas saskaituose matomas jau po pirmo menesio.", img: "m1" },
    { name: "Ruta V.", date: "2026 m. kovo 2 d.", text: "Naudoju daugiausia patalynei. Pasiekia temperatura, kuri pasalina apmusijimo kvapa. Jau negaliu be jo, ypac ziema Vilniuje.", img: "w1" },
    { name: "Tomas B.", date: "2026 m. kovo 10 d.", text: "Tvirtas produktas. Tai ne iprastas kiniskas gaminys. Nerudijancio plieno buugnas yra nesunaikinamas. Sumokejau kurjeriui pristatymo metu, viskas puikiai.", img: "m2" }
  ];

  return (
    <section id="atsiliepimai" className="py-12 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Star className="text-orange-400 fill-current" size={24} /> Patvirtintu Klientu Atsiliepimai
        </h2>
        <div className="flex flex-col md:flex-row gap-8 mb-10 pb-8 border-b">
          <div className="md:w-1/3 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="text-4xl font-black">4.9</span>
              <div className="flex text-orange-400">
                {[1,2,3,4,5].map(s => <Star key={s} size={20} fill="currentColor" />)}
              </div>
            </div>
            <span className="text-sm text-slate-500">Remiantis 14 582 pirkeju</span>
            <div className="mt-4 space-y-2">
              {[
                { stars: 5, pct: "94%" },
                { stars: 4, pct: "5%" },
                { stars: 3, pct: "1%" },
                { stars: 2, pct: "0%" },
                { stars: 1, pct: "0%" }
              ].map(row => (
                <div key={row.stars} className="flex items-center gap-2 text-xs text-blue-600">
                  <span className="w-12">{row.stars} zvaig.</span>
                  <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-400" style={{ width: row.pct }}></div>
                  </div>
                  <span className="text-slate-500 w-8">{row.pct}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-2/3 bg-slate-50 p-6 rounded-2xl">
            <h3 className="font-bold text-slate-900 mb-2 italic">"Geriausia investicija namams 2026 metais"</h3>
            <p className="text-sm text-slate-600">99,4% vartotoju teige, kad drastiskai sumazino dregmes kvapa namuose ir sutaupe vidutiniskai 45 EUR per menesi uz elektra.</p>
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
                    <span className="text-[10px] text-green-600 font-bold uppercase tracking-tighter">Patvirtintas Pirkimas</span>
                  </div>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-slate-800 font-medium">"{r.text}"</p>
              <span className="text-[10px] text-slate-400 block mt-2">Atsiliepimas is {r.date}</span>
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
          ZIUREKITE <span className="text-blue-700 italic">MORUS ZERO DRYPRO 360 ULTRA</span> VEIKIME
        </h2>
        <p className="text-slate-500 font-medium">Suzinokite, kaip jis veikia ir kodel tukstanciai lietuviu jau ji pasirinko.</p>
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
          Jusu narsykle nepalaiko video zymes.
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
        GALIA <span className="text-[#c5a059] italic">BE KOMPROMISU</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { icon: <Package size={32} />, title: "XL Talpa 4KG", desc: "Isdzovina iki 12 marskiniu arba pilna patalynkes komplekta vienu ciklu. Didziausia talpa nesiojamuose dziovintuvuose." },
          { icon: <Thermometer size={32} />, title: "Dezinfekcija 65°C", desc: "Pasiekia kritine temperatura, kad sunaikintu 99,9% bakteriju, erksciu ir alergenu, isitaisiusiu dregname audinyje." },
          { icon: <Clock size={32} />, title: "Turbo-Dry 45 Minutes", desc: "Drabuziai sausi, silti ir paruosti deveti per maziau nei 45 minutes. Nebereikia laukti 2 dienu ant dziovyklos." },
          { icon: <ZapOff size={32} />, title: "Taupymas Saskaituose", desc: "Sunaudoja tik 0,18 EUR per cikla. Iprastas pramoninis dziovintuvas kainuoja vidutiniskai 1,65 EUR. Automatinis taupymas." }
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

      router.push('/ty/ty-fb-dryer-lt');
    } catch (error) {
      console.error('[Network API] Error:', error);
      router.push('/ty/ty-fb-dryer-lt');
    }
  };

  return (
    <section id="uzsakymas" className="py-20 px-4 bg-slate-100">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-block bg-[#dc2626] text-white px-6 py-1 rounded-full text-sm font-black mb-4 uppercase tracking-widest animate-pulse">
            Ribotas pasiulymas
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter text-slate-900 leading-[0.9]">UZPILDYKITE FORMA <br/><span className="text-blue-700 italic">MOKEKITE PRISTATYMO METU</span></h2>
          <p className="text-slate-500 font-medium">Kortele nereikalinga. Mokate tik gavus siuntini.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] text-slate-900 border border-slate-200">
          <input type="hidden" name="tmfp" />

          <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-100">
             <div className="flex-1">
               <span className="text-slate-400 text-xs font-bold uppercase block">Akcijos Kaina</span>
               <span className="text-4xl font-black text-blue-700">69 EUR</span>
             </div>
             <div className="text-right">
               <span className="text-slate-400 text-xs font-bold uppercase block">Katalogo Kaina</span>
               <span className="text-xl font-bold text-slate-300 line-through">249 EUR</span>
             </div>
          </div>

          <div className="space-y-6">
            <div className="group">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-4 mb-1 block group-focus-within:text-blue-600 transition-colors">Vardas ir Pavarde</label>
              <input
                required
                type="text"
                name="name"
                placeholder="Jonas Jonaitis"
                className="w-full bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl focus:border-blue-600 transition-all shadow-inner font-bold"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="group">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-4 mb-1 block group-focus-within:text-blue-600 transition-colors">Pristatymo Adresas (Gatve, Nr., Miestas, Pasto kodas)</label>
              <input
                required
                type="text"
                name="address"
                placeholder="Gedimino pr. 10, LT-01103 Vilnius"
                className="w-full bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl focus:border-blue-600 transition-all shadow-inner font-bold"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="group">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-4 mb-1 block group-focus-within:text-blue-600 transition-colors">Telefonas (Pristatymui)</label>
              <input
                required
                type="tel"
                name="phone"
                placeholder="+370 600 12345"
                className="w-full bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl focus:border-blue-600 transition-all shadow-inner font-bold"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-10 space-y-4">
            <button disabled={loading} className="w-full bg-[#dc2626] text-white py-6 md:py-7 rounded-2xl font-black text-lg md:text-2xl shadow-[0_15px_30px_rgba(220,38,38,0.4)] hover:bg-red-700 hover:translate-y-[-2px] active:translate-y-[1px] transition-all flex flex-col items-center justify-center gap-1 md:gap-4 uppercase tracking-tighter leading-tight">
              {loading ? "APDOROJAMA..." : (
                <>
                  <span>UZSAKYTI DABAR</span>
                  <span className="text-xs md:text-lg opacity-80">(MOKETI PRISTATYMO METU)</span>
                </>
              )}
            </button>
            <div className="flex items-center justify-center gap-6 opacity-60">
               <div className="flex items-center gap-1 text-[10px] font-black"><ShieldCheck size={14}/> DUOMENYS APSAUGOTI</div>
               <div className="flex items-center gap-1 text-[10px] font-black"><Truck size={14}/> NEMOKAMAS PRISTATYMAS</div>
            </div>
            <div className="flex justify-center items-center gap-2 text-sm text-gray-500">
              <Lock size={16} /> Jusu duomenys yra saugus ir uzsifroti
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

const OrderForm = () => (
  <Suspense fallback={<div className="py-20 text-center">Kraunama...</div>}>
    <OrderFormContent />
  </Suspense>
);

// --- Problem Section (Pain Point) ---
const PainPoints = () => (
  <section className="py-20 px-4 bg-white">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-none tracking-tighter mb-4">
          AR PAVERCIETE SAVO NAMUS <br/><span className="text-red-600 italic underline">PELESIU FABRIKA?</span>
        </h2>
        <p className="text-slate-500 font-medium">Kiekviena atvira dziovykla ispusta iki 2 litru vandens i jusu plaucius.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { icon: <ShieldAlert className="text-red-600" />, title: "Bakterijos ir Patogenai", desc: "Nuolatine dregme yra rojus erkems. DryPro sterilizuoja drabuziu 65°C temperatura, sunaikindamas problema is esmés." },
          { icon: <TrendingDown className="text-red-600" />, title: "Pinigu Svaistymas", desc: "Tradiciniai dziovintuvai yra 'energijos monstrai'. DryPro naudoja Heat-Flow technologija, sunaudoja 1/10 elektros." },
          { icon: <Stethoscope className="text-red-600" />, title: "Sugadinti Drabuziai", desc: "Per didelis kaitinimas skalbyklose gadina audinius. Musu kontroliuojamas sukimas issaugo drabuziu kaip naujus." }
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
    '/images/dryer/1.webp',
    '/images/dryer/2.webp',
    '/images/dryer/3.webp',
    '/images/dryer/4.webp',
  ];

  return (
    <section className="relative pt-12 pb-20 px-4 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
        <div className="z-10 space-y-6">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-5 py-2 rounded-full font-black text-xs uppercase tracking-widest border border-blue-100 shadow-sm">
            <Zap size={14} className="animate-pulse text-yellow-500 fill-current" /> Ribota Premium Laida 2026
          </div>
          <h1 className="text-5xl md:text-8xl font-black leading-[0.85] text-slate-900 tracking-tighter mb-6">
            SAUSU IR <br/><span className="text-blue-700 italic">STERILIZUOTU</span> DRABUZIU PRABANGA PER <span className="underline decoration-[#c5a059]">45 MINUTES.</span>
          </h1>
          <p className="text-slate-600 text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-tight">
            Nustokite svaistyti vieta ir pinigus. Atraskite vienintelj dziovintuvg su <b>4KG Talpa</b> ir <b>Dezinfekcija 65°C</b>, kuris sunaudoja maziau nei lempute.
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
             <span className="text-xs font-black uppercase tracking-widest text-center">Prime Nuolaida</span>
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
                <img src={src} alt={`Vaizdas ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <a href="#uzsakymas" className="group w-full max-w-lg bg-[#dc2626] text-white py-6 md:py-7 rounded-[2rem] font-black text-xl md:text-2xl shadow-[0_20px_40px_rgba(220,38,38,0.4)] flex items-center justify-center gap-4 transition-all hover:scale-105 active:scale-95 uppercase tracking-tighter leading-none">
          UZSAKYTI DABAR -72% <ShoppingCart className="group-hover:rotate-12 transition-transform" />
        </a>
        <p className="mt-4 text-slate-400 text-sm font-bold flex items-center gap-2">
          <Clock size={16}/> Jau 14 582 zmones gavo ji i namus
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
      <a href="#uzsakymas" className="hover:text-blue-700 transition-colors">Privalumai</a>
      <a href="#uzsakymas" className="hover:text-blue-700 transition-colors">Technologija</a>
      <a href="#atsiliepimai" className="hover:text-blue-700 transition-colors">Atsiliepimai</a>
    </div>
    <a href="#uzsakymas" className="bg-[#0f172a] text-white px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-blue-800 transition-all">
      PIRKTI DABAR
    </a>
  </nav>
);

const StickyCTA = () => (
  <div className="md:hidden fixed bottom-0 left-0 right-0 z-[200] bg-white border-t p-4 flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
    <div className="flex flex-col">
      <span className="text-[#dc2626] font-black text-3xl leading-none">69 EUR</span>
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Ispardavimo Nuolaida</span>
    </div>
    <a href="#uzsakymas" className="bg-[#dc2626] text-white px-8 py-4 rounded-2xl font-black text-sm uppercase shadow-xl active:scale-95 transition-all tracking-tighter">
      PASINAUDOTI DABAR
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
        src="https://offers.uncappednetwork.com/forms/tmfp/"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      {/* Click Tracking Pixel */}
      <img
        src={`https://offers.uncappednetwork.com/forms/api/ck/?o=${API_CONFIG.offer}&uid=${API_CONFIG.uid}&lp=${API_CONFIG.lp}`}
        style={{ width: '1px', height: '1px', display: 'none' }}
        alt=""
      />

      <div className="antialiased selection:bg-[#c5a059] selection:text-white bg-slate-50 text-slate-900">
        <TopUrgency />
        <Navbar />
        <main className="pb-24">
          <Hero />
          <div className="bg-slate-50 border-y py-12 px-4 flex flex-wrap justify-center gap-8 md:gap-16 opacity-60">
             <div className="flex flex-col items-center gap-1 font-black text-[10px] uppercase tracking-widest"><Truck size={20} /> Greitas Pristatymas</div>
             <div className="flex flex-col items-center gap-1 font-black text-[10px] uppercase tracking-widest"><ShieldCheck size={20} /> Pilna Garantija</div>
             <div className="flex flex-col items-center gap-1 font-black text-[10px] uppercase tracking-widest"><Award size={20} /> CE Sertifikatas</div>
             <div className="flex flex-col items-center gap-1 font-black text-[10px] uppercase tracking-widest"><ThumbsUp size={20} /> Grazinimas 30 Dienu</div>
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
              <p className="text-slate-400 text-sm max-w-md mx-auto">Galutinis dregmes problemos sprendimas namuose. Sukurta Vokietijoje, megstama Lietuvoje.</p>
              <div className="flex justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500 pt-8 border-t border-white/5">
                <a href="#" className="hover:text-white transition-colors">Privatumas</a>
                <a href="#" className="hover:text-white transition-colors">Salygos</a>
                <a href="#" className="hover:text-white transition-colors">Slapukai</a>
              </div>
              <p className="text-[9px] text-slate-600 italic">&copy; 2026 DryPro 360 Ultra. Ispejimas: Energijos taupymas ir dziovinimo laikas priklauso nuo krovinio tipo ir naudojimo salygu.</p>
            </div>
          </section>
        </main>
        <StickyCTA />
      </div>
    </>
  );
}
