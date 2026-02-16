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
  offer: '2946',
  lp: '2980'
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
    POZOR: SAMO 9 KOMADA DOSTUPNO PO OVOJ CIJENI!
  </div>
);

// --- Amazon Style Reviews Section ---
const AmazonReviews = () => {
  const reviews = [
    { name: "Marko Horvat", date: "14. veljače 2026.", text: "Nevjerojatno. Zaista suši 4kg odjeće bez problema. Za manje od 45 minuta imam košulje gotove, sterilizirane i tople. Ušteda na računima se vidi već od prvog mjeseca.", img: "m1" },
    { name: "Ana K.", date: "2. ožujka 2026.", text: "Koristim je najviše za posteljinu. Doseže temperaturu koja eliminira miris plijesni. Više ne mogu bez nje, pogotovo zimi u Zagrebu.", img: "w1" },
    { name: "Ivan B.", date: "10. ožujka 2026.", text: "Solidan proizvod. Nije običan kineski proizvod. Bubanj od nehrđajućeg čelika je neuništiv. Platio sam pouzećem, sve savršeno.", img: "m2" }
  ];

  return (
    <section id="recenzije" className="py-12 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Star className="text-orange-400 fill-current" size={24} /> Recenzije Verificiranih Kupaca
        </h2>
        <div className="flex flex-col md:flex-row gap-8 mb-10 pb-8 border-b">
          <div className="md:w-1/3 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="text-4xl font-black">4.9</span>
              <div className="flex text-orange-400">
                {[1,2,3,4,5].map(s => <Star key={s} size={20} fill="currentColor" />)}
              </div>
            </div>
            <span className="text-sm text-slate-500">Na temelju 14.582 kupca</span>
            <div className="mt-4 space-y-2">
              {[
                { stars: 5, pct: "94%" },
                { stars: 4, pct: "5%" },
                { stars: 3, pct: "1%" },
                { stars: 2, pct: "0%" },
                { stars: 1, pct: "0%" }
              ].map(row => (
                <div key={row.stars} className="flex items-center gap-2 text-xs text-blue-600">
                  <span className="w-12">{row.stars} zvjezdica</span>
                  <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-400" style={{ width: row.pct }}></div>
                  </div>
                  <span className="text-slate-500 w-8">{row.pct}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-2/3 bg-slate-50 p-6 rounded-2xl">
            <h3 className="font-bold text-slate-900 mb-2 italic">"Najbolja investicija za dom u 2026."</h3>
            <p className="text-sm text-slate-600">99,4% korisnika izjavilo je da su drastično smanjili miris vlage u domu i uštedjeli u prosjeku 30€ mjesečno na struji.</p>
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
                    <span className="text-[10px] text-green-600 font-bold uppercase tracking-tighter">Verificirana Kupnja</span>
                  </div>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-slate-800 font-medium">"{r.text}"</p>
              <span className="text-[10px] text-slate-400 block mt-2">Recenzija od {r.date}</span>
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
          POGLEDAJTE <span className="text-blue-700 italic">MORUS ZERO DRYPRO 360 ULTRA</span> NA DJELU
        </h2>
        <p className="text-slate-500 font-medium">Otkrijte kako funkcionira i zašto ga je već odabralo tisuće Hrvata.</p>
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
          Vaš preglednik ne podržava video oznaku.
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
        PERFORMANSE <span className="text-[#c5a059] italic">BEZ KOMPROMISA</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { icon: <Package size={32} />, title: "XL Kapacitet 4KG", desc: "Suši do 12 košulja ili kompletnu posteljinu u jednom ciklusu. Najveći kapacitet u kategoriji prijenosnih sušilica." },
          { icon: <Thermometer size={32} />, title: "Dezinfekcija 65°C", desc: "Doseže kritičnu temperaturu za eliminaciju 99,9% bakterija, grinja i alergena nakupljenih u vlažnim vlaknima." },
          { icon: <Clock size={32} />, title: "Turbo-Dry 45 Minuta", desc: "Odjeća suha, topla i spremna za nošenje za manje od 45 minuta. Gotovo s čekanjem 2 dana na sušilu." },
          { icon: <ZapOff size={32} />, title: "Ušteda na Računima", desc: "Troši samo 0,12€ po ciklusu. Klasična industrijska sušilica košta u prosjeku 1,10€. Automatska ušteda." }
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
      });

      // Add fingerprint or fallback to IP/UA
      if (tmfp) {
        params.append('tmfp', tmfp);
      } else {
        // Fetch user IP if fingerprint is missing
        try {
          const ipResponse = await fetch('https://api.ipify.org?format=json');
          const ipData = await ipResponse.json();
          params.append('ip', ipData.ip);
        } catch {
          // IP fetch failed, continue without it
        }
        params.append('ua', navigator.userAgent);
      }

      // Add UTM params
      const utmSource = searchParams.get('utm_source');
      const utmMedium = searchParams.get('utm_medium');
      const utmCampaign = searchParams.get('utm_campaign');
      const utmContent = searchParams.get('utm_content');
      const utmTerm = searchParams.get('utm_term');
      const subid = searchParams.get('subid');
      const subid2 = searchParams.get('subid2');
      const subid3 = searchParams.get('subid3');
      const subid4 = searchParams.get('subid4');
      const pubid = searchParams.get('pubid');

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

      await fetch(API_CONFIG.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      router.push('/ty/ty-fb-dryer-hr');
    } catch (error) {
      console.error('[Network API] Error:', error);
      router.push('/ty/ty-fb-dryer-hr');
    }
  };

  return (
    <section id="narudzba" className="py-20 px-4 bg-slate-100">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-block bg-[#dc2626] text-white px-6 py-1 rounded-full text-sm font-black mb-4 uppercase tracking-widest animate-pulse">
            Vremenski ograničena ponuda
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter text-slate-900 leading-[0.9]">ISPUNITE OBRAZAC <br/><span className="text-blue-700 italic">PLAĆANJE POUZEĆEM</span></h2>
          <p className="text-slate-500 font-medium">Ne treba vam kartica. Plaćate kada primite paket.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] text-slate-900 border border-slate-200">
          <input type="hidden" name="tmfp" />

          <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-100">
             <div className="flex-1">
               <span className="text-slate-400 text-xs font-bold uppercase block">Promotivna Cijena</span>
               <span className="text-4xl font-black text-blue-700">69,99€</span>
             </div>
             <div className="text-right">
               <span className="text-slate-400 text-xs font-bold uppercase block">Kataloška Cijena</span>
               <span className="text-xl font-bold text-slate-300 line-through">249,99€</span>
             </div>
          </div>

          <div className="space-y-6">
            <div className="group">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-4 mb-1 block group-focus-within:text-blue-600 transition-colors">Ime i Prezime</label>
              <input
                required
                type="text"
                name="name"
                placeholder="Ivan Horvat"
                className="w-full bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl focus:border-blue-600 transition-all shadow-inner font-bold"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="group">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-4 mb-1 block group-focus-within:text-blue-600 transition-colors">Adresa Dostave (Ulica, Broj, Grad, Poštanski Broj)</label>
              <input
                required
                type="text"
                name="address"
                placeholder="Ilica 10, Zagreb, 10000"
                className="w-full bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl focus:border-blue-600 transition-all shadow-inner font-bold"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="group">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-4 mb-1 block group-focus-within:text-blue-600 transition-colors">Telefon (Za dostavu)</label>
              <input
                required
                type="tel"
                name="phone"
                placeholder="+385 91 123 4567"
                className="w-full bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl focus:border-blue-600 transition-all shadow-inner font-bold"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-10 space-y-4">
            <button disabled={loading} className="w-full bg-[#dc2626] text-white py-6 md:py-7 rounded-2xl font-black text-lg md:text-2xl shadow-[0_15px_30px_rgba(220,38,38,0.4)] hover:bg-red-700 hover:translate-y-[-2px] active:translate-y-[1px] transition-all flex flex-col items-center justify-center gap-1 md:gap-4 uppercase tracking-tighter leading-tight">
              {loading ? "OBRAĐUJEM..." : (
                <>
                  <span>NARUČITE SADA</span>
                  <span className="text-xs md:text-lg opacity-80">(PLAĆANJE POUZEĆEM)</span>
                </>
              )}
            </button>
            <div className="flex items-center justify-center gap-6 opacity-60">
               <div className="flex items-center gap-1 text-[10px] font-black"><ShieldCheck size={14}/> ZAŠTIĆENI PODACI</div>
               <div className="flex items-center gap-1 text-[10px] font-black"><Truck size={14}/> BESPLATNA DOSTAVA</div>
            </div>
            <div className="flex justify-center items-center gap-2 text-sm text-gray-500">
              <Lock size={16} /> Vaši podaci su sigurni i šifrirani
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

const OrderForm = () => (
  <Suspense fallback={<div className="py-20 text-center">Učitavanje...</div>}>
    <OrderFormContent />
  </Suspense>
);

// --- Problem Section (Pain Point) ---
const PainPoints = () => (
  <section className="py-20 px-4 bg-white">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-none tracking-tighter mb-4">
          PRETVARATE LI SVOJ DOM <br/><span className="text-red-600 italic underline">U TVORNICU PLIJESNI?</span>
        </h2>
        <p className="text-slate-500 font-medium">Svako sušilo za rublje ispušta do 2 litre vode u vaše pluća.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { icon: <ShieldAlert className="text-red-600" />, title: "Bakterije i Patogeni", desc: "Trajna vlaga je raj za grinje. DryPro sterilizira odjeću na 65°C, uništavajući problem iz korijena." },
          { icon: <TrendingDown className="text-red-600" />, title: "Bacanje Novca", desc: "Tradicionalne sušilice su 'energetska čudovišta'. DryPro koristi Heat-Flow tehnologiju, trošeći 1/10 energije." },
          { icon: <Stethoscope className="text-red-600" />, title: "Uništena Odjeća", desc: "Prekomjerna toplina u praonicama uništava vlakna. Naša kontrolirana rotacija održava odjeću kao novu." }
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
            <Zap size={14} className="animate-pulse text-yellow-500 fill-current" /> Premium Limitirano Izdanje 2026
          </div>
          <h1 className="text-5xl md:text-8xl font-black leading-[0.85] text-slate-900 tracking-tighter mb-6">
            LUKSUZ SUHE <br/><span className="text-blue-700 italic">I STERILIZIRANE</span> ODJEĆE ZA <span className="underline decoration-[#c5a059]">45 MINUTA.</span>
          </h1>
          <p className="text-slate-600 text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-tight">
            Ne bacajte više prostor i novac. Otkrijte jedinu sušilicu s <b>Kapacitetom 4KG</b> i <b>Dezinfekcijom na 65°C</b>, koja troši manje od žarulje.
          </p>
        </div>

        <div className="relative w-full max-w-2xl mt-12 mb-12">
          <div className="absolute -inset-10 bg-blue-600/10 blur-[100px] rounded-full"></div>
          <img
            src={images[selectedImage]}
            alt="DryPro 360 Ultra Detalj"
            className="relative rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] z-10 border-8 border-white w-full object-cover"
          />
          <div className="absolute -top-4 -right-4 z-20 bg-[#c5a059] text-[#0f172a] p-8 rounded-[2.5rem] shadow-2xl rotate-12 flex flex-col items-center justify-center border-4 border-white">
             <span className="text-xs font-black uppercase tracking-widest text-center">Popust</span>
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
                <img src={src} alt={`Prikaz ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <a href="#narudzba" className="group w-full max-w-lg bg-[#dc2626] text-white py-6 md:py-7 rounded-[2rem] font-black text-xl md:text-2xl shadow-[0_20px_40px_rgba(220,38,38,0.4)] flex items-center justify-center gap-4 transition-all hover:scale-105 active:scale-95 uppercase tracking-tighter leading-none">
          NARUČITE SADA -72% <ShoppingCart className="group-hover:rotate-12 transition-transform" />
        </a>
        <p className="mt-4 text-slate-400 text-sm font-bold flex items-center gap-2">
          <Clock size={16}/> Već 14.582 ljudi ga je primilo kući
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
      <a href="#narudzba" className="hover:text-blue-700 transition-colors">Prednosti</a>
      <a href="#narudzba" className="hover:text-blue-700 transition-colors">Tehnologija</a>
      <a href="#recenzije" className="hover:text-blue-700 transition-colors">Recenzije</a>
    </div>
    <a href="#narudzba" className="bg-[#0f172a] text-white px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-blue-800 transition-all">
      KUPITE SADA
    </a>
  </nav>
);

const StickyCTA = () => (
  <div className="md:hidden fixed bottom-0 left-0 right-0 z-[200] bg-white border-t p-4 flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
    <div className="flex flex-col">
      <span className="text-[#dc2626] font-black text-3xl leading-none">69,99€</span>
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Rasprodaja Popust</span>
    </div>
    <a href="#narudzba" className="bg-[#dc2626] text-white px-8 py-4 rounded-2xl font-black text-sm uppercase shadow-xl active:scale-95 transition-all tracking-tighter">
      ISKORISTITE SADA
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
             <div className="flex flex-col items-center gap-1 font-black text-[10px] uppercase tracking-widest"><Truck size={20} /> Ekspresna Dostava</div>
             <div className="flex flex-col items-center gap-1 font-black text-[10px] uppercase tracking-widest"><ShieldCheck size={20} /> Potpuno Jamstvo</div>
             <div className="flex flex-col items-center gap-1 font-black text-[10px] uppercase tracking-widest"><Award size={20} /> CE Certifikat</div>
             <div className="flex flex-col items-center gap-1 font-black text-[10px] uppercase tracking-widest"><ThumbsUp size={20} /> Povrat 30 Dana</div>
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
              <p className="text-slate-400 text-sm max-w-md mx-auto">Konačno rješenje za problem vlage u domu. Dizajnirano u Njemačkoj, voljeno u Hrvatskoj.</p>
              <div className="flex justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500 pt-8 border-t border-white/5">
                <a href="#" className="hover:text-white transition-colors">Privatnost</a>
                <a href="#" className="hover:text-white transition-colors">Uvjeti</a>
                <a href="#" className="hover:text-white transition-colors">Kolačići</a>
              </div>
              <p className="text-[9px] text-slate-600 italic">&copy; 2026 DryPro 360 Ultra. Upozorenje: Ušteda energije i vrijeme sušenja ovise o vrsti punjenja i uvjetima korištenja.</p>
            </div>
          </section>
        </main>
        <StickyCTA />
      </div>
    </>
  );
}
