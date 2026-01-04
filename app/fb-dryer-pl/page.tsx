'use client';

import React, { useState, useEffect, Suspense, useRef } from 'react';
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

// --- FACEBOOK PIXEL CONFIG ---
const FB_PIXEL_ID = '1576025786901423';

// --- API CONFIG ---
const API_CONFIG = {
  url: 'https://offers.supertrendaffiliateprogram.com/forms/api/',
  uid: '0198088f-a4bc-7ed8-89aa-83089fe0180e',
  key: 'ec15cab563da6cf51f0c7c',
  offer: '577',
  lp: '577'
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
    UWAGA: TYLKO 9 SZTUK DOSTEPNYCH W TEJ CENIE!
  </div>
);

// --- Amazon Style Reviews Section ---
const AmazonReviews = () => {
  const reviews = [
    { name: "Marek Kowalski", date: "14 lutego 2026", text: "Niesamowite. Naprawde suszy 4kg ubran bez problemu. W mniej niz 45 minut mam koszule gotowe, wysterylizowane i cieple. Oszczednosc na rachunkach widac juz po pierwszym miesiacu.", img: "m1" },
    { name: "Anna W.", date: "2 marca 2026", text: "Uzywam glownie do poscieli. Osiaga temperature, ktora eliminuje zapach stechlizny. Juz bez tego nie moge, szczegolnie zima w Warszawie.", img: "w1" },
    { name: "Piotr B.", date: "10 marca 2026", text: "Solidny produkt. To nie jest zwykly chinczyk. Bebek ze stali nierdzewnej jest niezniszczalny. Zaplacilem przy odbiorze kurierowi, wszystko idealnie.", img: "m2" }
  ];

  return (
    <section id="recenzje" className="py-12 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Star className="text-orange-400 fill-current" size={24} /> Opinie Zweryfikowanych Klientow
        </h2>
        <div className="flex flex-col md:flex-row gap-8 mb-10 pb-8 border-b">
          <div className="md:w-1/3 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="text-4xl font-black">4.9</span>
              <div className="flex text-orange-400">
                {[1,2,3,4,5].map(s => <Star key={s} size={20} fill="currentColor" />)}
              </div>
            </div>
            <span className="text-sm text-slate-500">Na podstawie 14 582 kupujacych</span>
            <div className="mt-4 space-y-2">
              {[
                { stars: 5, pct: "94%" },
                { stars: 4, pct: "5%" },
                { stars: 3, pct: "1%" },
                { stars: 2, pct: "0%" },
                { stars: 1, pct: "0%" }
              ].map(row => (
                <div key={row.stars} className="flex items-center gap-2 text-xs text-blue-600">
                  <span className="w-12">{row.stars} gwiazd</span>
                  <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-400" style={{ width: row.pct }}></div>
                  </div>
                  <span className="text-slate-500 w-8">{row.pct}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-2/3 bg-slate-50 p-6 rounded-2xl">
            <h3 className="font-bold text-slate-900 mb-2 italic">"Najlepsza inwestycja dla domu w 2026 roku"</h3>
            <p className="text-sm text-slate-600">99,4% uzytkownikow zadeklarowalo, ze drastycznie zmniejszylo zapach wilgoci w domu i zaoszczedzilo srednio 180 PLN miesiecznie na elektrycznosci.</p>
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
                    <span className="text-[10px] text-green-600 font-bold uppercase tracking-tighter">Zweryfikowany Zakup</span>
                  </div>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-slate-800 font-medium">"{r.text}"</p>
              <span className="text-[10px] text-slate-400 block mt-2">Recenzja z dnia {r.date}</span>
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
          ZOBACZ <span className="text-blue-700 italic">MORUS ZERO DRYPRO 360 ULTRA</span> W AKCJI
        </h2>
        <p className="text-slate-500 font-medium">Odkryj jak dziala i dlaczego tysiace Polakow juz go wybralo.</p>
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
          Twoja przegladarka nie obsluguje tagu video.
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
        MOC <span className="text-[#c5a059] italic">BEZ KOMPROMISOW</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { icon: <Package size={32} />, title: "Pojemnosc XL 4KG", desc: "Suszy do 12 koszul lub komplet poscieli w jednym cyklu. Najbardziej pojemna w kategorii przenosnych." },
          { icon: <Thermometer size={32} />, title: "Dezynfekcja 65°C", desc: "Osiaga temperature krytyczna do eliminacji 99,9% bakterii, roztoczy i alergenow zagniezdonych w wilgotnych wloknach." },
          { icon: <Clock size={32} />, title: "Turbo-Dry 45 Minut", desc: "Ubrania suche, cieple i gotowe do zalozenia w mniej niz 45 minut. Koniec z czekaniem 2 dni na suszarce." },
          { icon: <ZapOff size={32} />, title: "Oszczednosc na Rachunkach", desc: "Zuzywa tylko 0,75 PLN za cykl. Klasyczna suszarka przemyslowa kosztuje srednio 6,50 PLN. Automatyczna oszczednosc." }
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
  const purchaseFired = useRef(false);
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

      // Fire Facebook Purchase event (only once)
      if (!purchaseFired.current && typeof window !== 'undefined' && (window as any).fbq) {
        purchaseFired.current = true;
        (window as any).fbq('track', 'Purchase', { currency: 'PLN', value: 299 });
      }

      await fetch(API_CONFIG.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      router.push('/ty/ty-fb-dryer-pl');
    } catch (error) {
      console.error('[Network API] Error:', error);
      router.push('/ty/ty-fb-dryer-pl');
    }
  };

  return (
    <section id="zamowienie" className="py-20 px-4 bg-slate-100">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-block bg-[#dc2626] text-white px-6 py-1 rounded-full text-sm font-black mb-4 uppercase tracking-widest animate-pulse">
            Oferta czasowa
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter text-slate-900 leading-[0.9]">WYPELNIJ FORMULARZ <br/><span className="text-blue-700 italic">PLAC PRZY ODBIORZE</span></h2>
          <p className="text-slate-500 font-medium">Karta nie jest wymagana. Placisz tylko gdy otrzymasz paczke.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] text-slate-900 border border-slate-200">
          <input type="hidden" name="tmfp" />

          <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-100">
             <div className="flex-1">
               <span className="text-slate-400 text-xs font-bold uppercase block">Cena Promocyjna</span>
               <span className="text-4xl font-black text-blue-700">299 PLN</span>
             </div>
             <div className="text-right">
               <span className="text-slate-400 text-xs font-bold uppercase block">Cena Katalogowa</span>
               <span className="text-xl font-bold text-slate-300 line-through">999 PLN</span>
             </div>
          </div>

          <div className="space-y-6">
            <div className="group">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-4 mb-1 block group-focus-within:text-blue-600 transition-colors">Imie i Nazwisko</label>
              <input
                required
                type="text"
                name="name"
                placeholder="Jan Kowalski"
                className="w-full bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl focus:border-blue-600 transition-all shadow-inner font-bold"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="group">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-4 mb-1 block group-focus-within:text-blue-600 transition-colors">Adres Dostawy (Ulica, Nr, Miasto, Kod)</label>
              <input
                required
                type="text"
                name="address"
                placeholder="ul. Przykladowa 10, 00-001 Warszawa"
                className="w-full bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl focus:border-blue-600 transition-all shadow-inner font-bold"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="group">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-4 mb-1 block group-focus-within:text-blue-600 transition-colors">Telefon (Do dostawy)</label>
              <input
                required
                type="tel"
                name="phone"
                placeholder="+48 600 123 456"
                className="w-full bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl focus:border-blue-600 transition-all shadow-inner font-bold"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-10 space-y-4">
            <button disabled={loading} className="w-full bg-[#dc2626] text-white py-6 md:py-7 rounded-2xl font-black text-lg md:text-2xl shadow-[0_15px_30px_rgba(220,38,38,0.4)] hover:bg-red-700 hover:translate-y-[-2px] active:translate-y-[1px] transition-all flex flex-col items-center justify-center gap-1 md:gap-4 uppercase tracking-tighter leading-tight">
              {loading ? "PRZETWARZANIE..." : (
                <>
                  <span>ZAMAWIAM TERAZ</span>
                  <span className="text-xs md:text-lg opacity-80">(PLACE PRZY ODBIORZE)</span>
                </>
              )}
            </button>
            <div className="flex items-center justify-center gap-6 opacity-60">
               <div className="flex items-center gap-1 text-[10px] font-black"><ShieldCheck size={14}/> DANE CHRONIONE</div>
               <div className="flex items-center gap-1 text-[10px] font-black"><Truck size={14}/> DARMOWA WYSYLKA</div>
            </div>
            <div className="flex justify-center items-center gap-2 text-sm text-gray-500">
              <Lock size={16} /> Twoje dane sa bezpieczne i szyfrowane
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

const OrderForm = () => (
  <Suspense fallback={<div className="py-20 text-center">Ladowanie...</div>}>
    <OrderFormContent />
  </Suspense>
);

// --- Problem Section (Pain Point) ---
const PainPoints = () => (
  <section className="py-20 px-4 bg-white">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-none tracking-tighter mb-4">
          ZMIENIASZ SWOJ DOM <br/><span className="text-red-600 italic underline">W FABRYKE PLESNI?</span>
        </h2>
        <p className="text-slate-500 font-medium">Kazda otwarta suszarka uwalnia do 2 litrow wody do Twoich pluc.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { icon: <ShieldAlert className="text-red-600" />, title: "Bakterie i Patogeny", desc: "Utrzymujaca sie wilgoc to raj dla roztoczy. DryPro sterylizuje ubrania w 65°C, niszczac problem u zrodla." },
          { icon: <TrendingDown className="text-red-600" />, title: "Marnowanie Pieniedzy", desc: "Tradycyjne suszarki to 'potwory energetyczne'. DryPro uzywa technologii Heat-Flow, zuzywa 1/10 pradu." },
          { icon: <Stethoscope className="text-red-600" />, title: "Zniszczone Ubrania", desc: "Nadmierne cieplo z pralni niszczy wlokna. Nasza kontrolowana rotacja utrzymuje ubrania jak nowe." }
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
            <Zap size={14} className="animate-pulse text-yellow-500 fill-current" /> Limitowana Edycja Premium 2026
          </div>
          <h1 className="text-5xl md:text-8xl font-black leading-[0.85] text-slate-900 tracking-tighter mb-6">
            LUKSUS SUCHYCH <br/><span className="text-blue-700 italic">I WYSTERYLIZOWANYCH</span> UBRAN W <span className="underline decoration-[#c5a059]">45 MINUT.</span>
          </h1>
          <p className="text-slate-600 text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-tight">
            Przestaj marnowac miejsce i pieniadze. Odkryj jedyna suszarke z <b>Pojemnoscia 4KG</b> i <b>Dezynfekcja w 65°C</b>, ktora zuzywa mniej niz zarowka.
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
             <span className="text-xs font-black uppercase tracking-widest text-center">Rabat Prime</span>
             <span className="text-4xl font-black leading-none">-70%</span>
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
                <img src={src} alt={`Widok ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <a href="#zamowienie" className="group w-full max-w-lg bg-[#dc2626] text-white py-6 md:py-7 rounded-[2rem] font-black text-xl md:text-2xl shadow-[0_20px_40px_rgba(220,38,38,0.4)] flex items-center justify-center gap-4 transition-all hover:scale-105 active:scale-95 uppercase tracking-tighter leading-none">
          ZAMOW TERAZ -70% <ShoppingCart className="group-hover:rotate-12 transition-transform" />
        </a>
        <p className="mt-4 text-slate-400 text-sm font-bold flex items-center gap-2">
          <Clock size={16}/> Juz 14 582 osob otrzymalo go do domu
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
      <a href="#zamowienie" className="hover:text-blue-700 transition-colors">Zalety</a>
      <a href="#zamowienie" className="hover:text-blue-700 transition-colors">Technologia</a>
      <a href="#recenzje" className="hover:text-blue-700 transition-colors">Opinie</a>
    </div>
    <a href="#zamowienie" className="bg-[#0f172a] text-white px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-blue-800 transition-all">
      KUP TERAZ
    </a>
  </nav>
);

const StickyCTA = () => (
  <div className="md:hidden fixed bottom-0 left-0 right-0 z-[200] bg-white border-t p-4 flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
    <div className="flex flex-col">
      <span className="text-[#dc2626] font-black text-3xl leading-none">299 PLN</span>
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Rabat Wyczerpania</span>
    </div>
    <a href="#zamowienie" className="bg-[#dc2626] text-white px-8 py-4 rounded-2xl font-black text-sm uppercase shadow-xl active:scale-95 transition-all tracking-tighter">
      SKORZYSTAJ TERAZ
    </a>
  </div>
);

export default function LandingPage() {
  return (
    <>
      {/* Facebook Pixel */}
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${FB_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>

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
             <div className="flex flex-col items-center gap-1 font-black text-[10px] uppercase tracking-widest"><Truck size={20} /> Ekspresowa Wysylka</div>
             <div className="flex flex-col items-center gap-1 font-black text-[10px] uppercase tracking-widest"><ShieldCheck size={20} /> Pelna Gwarancja</div>
             <div className="flex flex-col items-center gap-1 font-black text-[10px] uppercase tracking-widest"><Award size={20} /> Certyfikat CE</div>
             <div className="flex flex-col items-center gap-1 font-black text-[10px] uppercase tracking-widest"><ThumbsUp size={20} /> Zwrot 30 Dni</div>
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
              <p className="text-slate-400 text-sm max-w-md mx-auto">Ostateczne rozwiazanie problemu wilgoci w domu. Zaprojektowane w Niemczech, uwielbiane w Polsce.</p>
              <div className="flex justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500 pt-8 border-t border-white/5">
                <a href="#" className="hover:text-white transition-colors">Prywatnosc</a>
                <a href="#" className="hover:text-white transition-colors">Regulamin</a>
                <a href="#" className="hover:text-white transition-colors">Cookies</a>
              </div>
              <p className="text-[9px] text-slate-600 italic">&copy; 2026 DryPro 360 Ultra. Zastrzezenie: Oszczednosc energii i czas suszenia zaleza od rodzaju ladunku i warunkow uzytkowania.</p>
            </div>
          </section>
        </main>
        <StickyCTA />
      </div>
    </>
  );
}
