'use client';

import React, { useState, useEffect, Suspense } from 'react';
import {
  Star, Check, Clock, Shield, Truck, ShieldCheck, MapPin, CheckCircle,
  Wind, Sparkles, Zap, Shirt, Loader2
} from 'lucide-react';
import Script from 'next/script';
import { useSearchParams } from 'next/navigation';

// --- FACEBOOK PIXEL CONFIG ---
const FB_PIXEL_ID = '1576025786901423';

// --- API CONFIG ---
const API_CONFIG = {
  url: 'https://offers.uncappednetwork.com/forms/api/',
  uid: '0191dbf2-738a-7d28-82a0-18c3859d5e8f',
  key: '151af1e45a084aaf75c15f',
  offer: '3167',
  lp: '3201'
};

// --- TYPES ---
interface OrderFormData {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
}

interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  subid?: string;
  subid2?: string;
  subid3?: string;
  subid4?: string;
  pubid?: string;
}

enum FormStatus {
  IDLE = 'IDLE',
  SUBMITTING = 'SUBMITTING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

// --- CONSTANTS & DATA ---

const PRODUCT_DATA = {
  title: "DryFold Pro™ - Inteligentna Przenośna Suszarka [Nowy Model 2025]",
  subtitle: "Pierwsza z technologią jonów ujemnych, która suszy, prasuje i dezynfekuje Twoje delikatne ubrania w połowie czasu, bez ich niszczenia.",
  price: 309,
  originalPrice: 509,
  rating: 4.9,
  reviewCount: 2140,
  offerEnd: "50% zniżki ważne do północy",
  features: [
    "Technologia Ceramiczna PTC: Natychmiastowe ciepło, bezpieczne i energooszczędne",
    "Efekt Prasowania: Przepływ powietrza 3D redukuje zmarszczki o 80%",
    "Sterylizacja Blue-Ray + Jony: Ubrania miękkie, pachnące i wolne od bakterii",
    "Tryb WhisperQuiet™: Cicha, idealna nawet w nocy",
    "Bezpieczna dla Jedwabiu, Wełny i Kaszmiru (Inteligentna kontrola temperatury)"
  ]
};

const REVIEWS = [
  {
    id: 1,
    author: "Aleksandra M.",
    rating: 5,
    title: "Nie niszczy kaszmiru, niesamowite!",
    date: "Wczoraj",
    verified: true,
    content: "Bałam się wkładać moje drogie swetry. Ale technologia kontrolowanego ciepła jest fantastyczna. Wychodzą miękkie i ciepłe jak prosto z pralni. Warte każdej złotówki."
  },
  {
    id: 2,
    author: "Marek W.",
    rating: 5,
    title: "Uratowała mnie w podróży do Londynu",
    date: "2 dni temu",
    verified: true,
    content: "Ciągle padało, niemożliwe było wysuszyć koszule w hotelu. To urządzenie mieści się w walizce i w 1 godzinę mam koszulę gotową bez zmarszczek. Funkcja 'cicha' jest prawdziwa, w ogóle nie przeszkadza."
  },
  {
    id: 3,
    author: "Zofia R.",
    rating: 5,
    title: "Koniec z zapachem wilgoci w domu",
    date: "Tydzień temu",
    verified: true,
    content: "Mieszkam w 40m2 i suszarka w zimie zawsze śmierdziała. Z DryFold Pro wszystko suszy się natychmiast, a światło UV usuwa ten zapach stęchlizny. Dostawa w 24h, płatność przy odbiorze. Super!"
  }
];

// --- FACEBOOK PIXEL COMPONENT ---
const FacebookPixel = () => {
  useEffect(() => {
    const waitForFbq = setInterval(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const win = window as any;
      if (typeof window !== 'undefined' && typeof win.fbq === 'function') {
        clearInterval(waitForFbq);
        win.fbq('track', 'PageView');
        win.fbq('track', 'ViewContent', {
          content_name: 'DryFold Pro',
          content_category: 'Home Appliances',
          content_type: 'product',
          value: 309,
          currency: 'PLN'
        });
        console.log('[FB Pixel] PageView and ViewContent tracked');
      }
    }, 100);

    const timeout = setTimeout(() => clearInterval(waitForFbq), 10000);
    return () => {
      clearInterval(waitForFbq);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
};

// --- COMPONENTS ---

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-2 md:py-3 flex items-center justify-between">

        {/* Logo Area */}
        <div className="flex items-center gap-1">
          <div className="font-extrabold text-xl md:text-2xl tracking-tighter text-slate-900">
            Dry<span className="text-orange-500">Fold</span>
          </div>
          <span className="text-[10px] md:text-xs bg-cyan-700 text-white px-1 rounded ml-1">OFFICIAL</span>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm font-medium text-gray-700">
          <div className="flex items-center gap-1">
            <Truck className="w-4 h-4 text-green-600" />
            <span className="hidden sm:inline">Darmowa Wysyłka</span>
          </div>
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-orange-500" />
            <span className="hidden sm:inline">Płatność przy Odbiorze</span>
            <span className="sm:hidden text-orange-500 font-bold">Za Pobraniem</span>
          </div>
        </div>

      </div>

      {/* Promo Bar */}
      <div className="bg-slate-700 text-white text-center text-[10px] md:text-xs py-1 px-2 font-medium">
        🔥 Ponad 1500 sztuk sprzedanych w tym tygodniu. Oferta wygasa!
      </div>
    </header>
  );
};

const ProductMain = () => {
  const [activeImg, setActiveImg] = useState(0);

  const images = [
    "/images/portable-dryer/1.jpg",
    "/images/portable-dryer/2.jpg",
    "/images/portable-dryer/3.jpg",
    "/images/portable-dryer/4.jpg",
    "/images/portable-dryer/5.jpg",
    "/images/portable-dryer/6.jpg"
  ];

  const scrollToForm = () => {
    const formElement = document.getElementById('order-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="container mx-auto bg-white p-3 md:p-8 mt-2 md:mt-4 rounded-lg shadow-sm max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">

        {/* Left: Images - Optimized for Mobile */}
        <div className="flex flex-col gap-3">
          {/* Main Image */}
          <div className="relative rounded-lg overflow-hidden border border-gray-100 aspect-square md:aspect-auto">
             <img src={images[activeImg]} alt="Product Main" className="w-full h-full object-cover" />
             <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs md:text-sm font-bold px-3 py-1 rounded-full shadow-md z-10">
               -39% ZNIŻKI
             </div>
          </div>

          {/* Thumbnails - Horizontal Scroll on Mobile */}
          <div className="flex md:flex-wrap gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide snap-x" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImg(idx)}
                className={`snap-start border-2 rounded-md p-0.5 w-16 h-16 md:w-20 md:h-20 flex-shrink-0 transition-colors ${activeImg === idx ? 'border-orange-500' : 'border-gray-200'}`}
              >
                <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover rounded-sm" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Sales Copy */}
        <div className="flex flex-col justify-center">
          <div className="text-orange-500 font-bold text-xs md:text-sm mb-1 uppercase tracking-wide">
            Ograniczona Dostępność - Ostatnie sztuki 2025
          </div>

          <h1 className="text-xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-2">
            {PRODUCT_DATA.title}
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-4 leading-relaxed">
            {PRODUCT_DATA.subtitle}
          </p>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-current" />
              ))}
            </div>
            <span className="text-gray-500 font-medium text-sm md:text-base">({PRODUCT_DATA.reviewCount} zweryfikowanych opinii)</span>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-3 md:p-4 rounded-lg mb-6">
            <ul className="space-y-2 md:space-y-3">
              {PRODUCT_DATA.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 bg-green-500 rounded-full p-0.5 flex-shrink-0">
                    <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                  </div>
                  <span className="text-gray-800 font-medium text-sm md:text-base">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-3 md:gap-4 mb-2">
            <span className="text-3xl md:text-4xl font-bold text-gray-900">{PRODUCT_DATA.price} zł</span>
            <span className="text-lg md:text-xl text-gray-400 line-through">{PRODUCT_DATA.originalPrice} zł</span>
          </div>
          <div className="text-green-600 text-sm font-bold mb-6 flex items-center gap-2">
             <span className="animate-pulse">●</span> Darmowa Wysyłka w 24/48h
          </div>

          <button
            onClick={scrollToForm}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg md:text-xl font-bold py-3 md:py-4 px-8 rounded-lg shadow-lg transform transition hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            ZAMÓW I PŁAĆ PRZY ODBIORZE
            <span className="text-2xl hidden md:inline">👉</span>
          </button>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-gray-500">
            <div className="flex items-center gap-1"><Shield className="w-3 h-3 md:w-4 md:h-4" /> Gwarancja 2 Lata</div>
            <div className="flex items-center gap-1"><Clock className="w-3 h-3 md:w-4 md:h-4" /> Satysfakcja lub Zwrot</div>
          </div>

        </div>
      </div>
    </section>
  );
};

const Features = () => {
  return (
    <section className="container mx-auto mt-4 md:mt-6 bg-white p-4 md:p-12 shadow-sm rounded-sm">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 text-center leading-tight">
        Profesjonalna Technologia w Twoim Domu
      </h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8 md:mb-12 text-sm md:text-base">
        To nie jest tylko suszarka. To kompletny system pielęgnacji tkanin, który chroni włókna podczas suszenia.
      </p>

      {/* Grid Features with Icons */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 md:mb-16">
        <div className="flex flex-col items-center text-center group">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-50 text-cyan-700 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
            <Wind className="w-6 h-6 md:w-8 md:h-8" />
          </div>
          <h3 className="font-bold mb-2">Dual-Core PTC™</h3>
          <p className="text-sm text-gray-600">Nowy ceramiczny system grzewczy. Osiąga optymalną temperaturę w 3 sekundy bez spalania tlenu.</p>
        </div>
        <div className="flex flex-col items-center text-center group">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
            <Sparkles className="w-6 h-6 md:w-8 md:h-8" />
          </div>
          <h3 className="font-bold mb-2">Jony Ujemne</h3>
          <p className="text-sm text-gray-600">Podczas suszenia uwalnia jony, które rozluźniają włókna. Efekt? <strong>Bez prasowania</strong> dla większości ubrań.</p>
        </div>
        <div className="flex flex-col items-center text-center group">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
            <ShieldCheck className="w-6 h-6 md:w-8 md:h-8" />
          </div>
          <h3 className="font-bold mb-2">Safe-Temp Control</h3>
          <p className="text-sm text-gray-600">Mikroprocesor monitoruje ciepło 100 razy na sekundę. 100% bezpieczne nawet dla Jedwabiu i Wełny.</p>
        </div>
        <div className="flex flex-col items-center text-center group">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
            <Zap className="w-6 h-6 md:w-8 md:h-8" />
          </div>
          <h3 className="font-bold mb-2">Eco-Smart Chip</h3>
          <p className="text-sm text-gray-600">Maksymalna moc, minimalne zużycie. Kosztuje mniej niż 0,20 zł za pełny cykl suszenia.</p>
        </div>
      </div>

      {/* Premium Highlight Box */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-5 md:p-8 text-white mb-8 md:mb-12 shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
           <div className="flex-1">
              <div className="inline-block bg-orange-500 text-xs font-bold px-2 py-1 rounded mb-4 text-slate-900 uppercase shadow-lg">Nowość 2025</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">Twoja Pościel jak w Hotelu</h3>
              <p className="text-gray-300 mb-6 leading-relaxed text-sm md:text-base">
                Znasz to uczucie ciepłych i miękkich ręczników z luksusowych hoteli?
                DryFold Pro odtwarza ten efekt dzięki połączeniu ogrzewania wentylowanego i sterylizacji UV.
                Eliminuje 99,9% bakterii i roztoczy.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <li className="flex items-center gap-2"><Shirt className="w-4 h-4 text-orange-500 flex-shrink-0"/> Idealna do Bielizny i Skarpetek</li>
                <li className="flex items-center gap-2"><Shirt className="w-4 h-4 text-orange-500 flex-shrink-0"/> Doskonała do ubranek niemowlęcych</li>
                <li className="flex items-center gap-2"><Shirt className="w-4 h-4 text-orange-500 flex-shrink-0"/> Suszy Buty i Pluszaki</li>
                <li className="flex items-center gap-2"><Shirt className="w-4 h-4 text-orange-500 flex-shrink-0"/> Rozgrzewa piżamę zimą</li>
              </ul>
           </div>
           <div className="w-full md:w-1/3 bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-white/20 text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">98%</div>
              <p className="text-xs md:text-sm text-gray-300">Klientów deklaruje zmniejszenie użycia żelazka.</p>
           </div>
        </div>
      </div>

      {/* Comparison Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center bg-gray-50 p-4 md:p-10 rounded-lg">
        <div>
           <h3 className="text-lg md:text-xl font-bold mb-4">Problem tradycyjnych metod</h3>
           <ul className="space-y-4">
             <li className="flex items-start gap-3">
               <span className="text-red-500 font-bold text-lg md:text-xl">✗</span>
               <span className="text-gray-700 text-sm md:text-base">Suszarka w domu tworzy wilgoć, pleśń i trwa całymi dniami.</span>
             </li>
             <li className="flex items-start gap-3">
               <span className="text-red-500 font-bold text-lg md:text-xl">✗</span>
               <span className="text-gray-700 text-sm md:text-base">Klasyczne suszarki mechacą swetry i zużywają bardzo dużo prądu.</span>
             </li>
           </ul>
        </div>
        <div className="bg-white p-5 md:p-6 rounded-lg shadow-sm border border-green-100 relative overflow-hidden">
           <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-bl-lg">ZWYCIĘZCA</div>
           <h3 className="text-lg md:text-xl font-bold mb-4 text-green-700">Rozwiązanie DryFold Pro</h3>
           <ul className="space-y-4">
             <li className="flex items-start gap-3">
               <span className="text-green-500 font-bold text-lg md:text-xl">✓</span>
               <span className="text-gray-800 font-medium text-sm md:text-base">Ubrania gotowe w 30-90 minut (nawet Jeansy i Bluzy).</span>
             </li>
             <li className="flex items-start gap-3">
               <span className="text-green-500 font-bold text-lg md:text-xl">✓</span>
               <span className="text-gray-800 font-medium text-sm md:text-base">Czujnik przeciw przegrzaniu dla maksymalnego bezpieczeństwa.</span>
             </li>
             <li className="flex items-start gap-3">
               <span className="text-green-500 font-bold text-lg md:text-xl">✓</span>
               <span className="text-gray-800 font-medium text-sm md:text-base">Zero instalacji: otwórz, powieś, włącz.</span>
             </li>
           </ul>
           <div className="mt-6 text-center">
             <button
               onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}
               className="inline-block w-full md:w-auto bg-yellow-400 border border-yellow-500 hover:bg-yellow-500 text-black font-medium py-3 px-6 md:px-10 rounded-full shadow-lg transition-transform transform hover:scale-105 text-base md:text-lg"
             >
               Zamów DryFold Pro™ Dziś
             </button>
           </div>
        </div>
      </div>

    </section>
  );
};

const Reviews = () => {
  return (
    <section id="reviews" className="container mx-auto mt-6 bg-white p-6 md:p-8 shadow-sm rounded-sm mb-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

        {/* Summary */}
        <div className="md:col-span-4">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Opinie klientów</h2>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex text-orange-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.floor(PRODUCT_DATA.rating) ? 'fill-current' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-lg font-medium">{PRODUCT_DATA.rating} z 5</span>
          </div>
          <div className="text-gray-500 text-sm mb-6">{PRODUCT_DATA.reviewCount} globalnych ocen</div>

          <div className="space-y-3">
            {[
              { stars: "5 gwiazdek", pct: "75%" },
              { stars: "4 gwiazdki", pct: "15%" },
              { stars: "3 gwiazdki", pct: "5%" },
              { stars: "2 gwiazdki", pct: "3%" },
              { stars: "1 gwiazdka", pct: "2%" },
            ].map((row, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm text-cyan-700 hover:text-orange-500 hover:underline cursor-pointer">
                <span className="w-16 text-right">{row.stars}</span>
                <div className="flex-1 bg-gray-200 h-5 rounded-sm overflow-hidden border border-gray-300">
                  <div className="bg-orange-500 h-full" style={{ width: row.pct }}></div>
                </div>
                <span className="w-10 text-right">{row.pct}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Individual Reviews */}
        <div className="md:col-span-8">
          <h3 className="font-bold text-lg mb-4">Najlepsze opinie z Polski</h3>
          <div className="space-y-6">
            {REVIEWS.map((review) => (
              <div key={review.id} className="pb-6 border-b border-gray-200 last:border-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                    {review.author.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-gray-800">{review.author}</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex text-orange-500">
                     {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                      ))}
                  </div>
                  <span className="font-bold text-sm text-gray-900">{review.title}</span>
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  Opinia z Polski, {review.date}
                </div>
                {review.verified && (
                  <div className="text-xs text-orange-500 font-bold flex items-center gap-1 mb-2">
                    <CheckCircle className="w-3 h-3" /> Zweryfikowany zakup
                  </div>
                )}
                <p className="text-sm text-gray-800 leading-relaxed">
                  {review.content}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

const OrderForm = ({ utmParams }: { utmParams: UTMParams }) => {
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });
  const [status, setStatus] = useState<FormStatus>(FormStatus.IDLE);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getFingerprint = (): string => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    return win.tmfp || '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(FormStatus.SUBMITTING);
    setErrorMessage('');

    try {
      const fingerprint = getFingerprint();

      // Build form data for API
      const apiFormData = new URLSearchParams();
      apiFormData.append('uid', API_CONFIG.uid);
      apiFormData.append('key', API_CONFIG.key);
      apiFormData.append('offer', API_CONFIG.offer);
      apiFormData.append('lp', API_CONFIG.lp);
      apiFormData.append('name', formData.fullName);
      apiFormData.append('street-address', `${formData.address}, ${formData.city} ${formData.zipCode}`);
      apiFormData.append('tel', formData.phone);

      if (fingerprint) {
        apiFormData.append('tmfp', fingerprint);
      } else {
        apiFormData.append('ua', navigator.userAgent);
      }

      // UTM parameters
      if (utmParams.utm_source) apiFormData.append('utm_source', utmParams.utm_source);
      if (utmParams.utm_medium) apiFormData.append('utm_medium', utmParams.utm_medium);
      if (utmParams.utm_campaign) apiFormData.append('utm_campaign', utmParams.utm_campaign);
      if (utmParams.utm_term) apiFormData.append('utm_term', utmParams.utm_term);
      if (utmParams.utm_content) apiFormData.append('utm_content', utmParams.utm_content);
      if (utmParams.subid) apiFormData.append('subid', utmParams.subid);
      if (utmParams.subid2) apiFormData.append('subid2', utmParams.subid2);
      if (utmParams.subid3) apiFormData.append('subid3', utmParams.subid3);
      if (utmParams.subid4) apiFormData.append('subid4', utmParams.subid4);
      if (utmParams.pubid) apiFormData.append('pubid', utmParams.pubid);

      const response = await fetch(API_CONFIG.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: apiFormData.toString()
      });

      if (response.ok) {
        // Track Purchase event on Facebook Pixel
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const win = window as any;
        if (typeof win.fbq === 'function') {
          win.fbq('track', 'Purchase', {
            content_name: 'DryFold Pro',
            content_category: 'Home Appliances',
            content_type: 'product',
            value: 309,
            currency: 'PLN'
          });
          console.log('[FB Pixel] Purchase tracked');
        }

        // Redirect to thank you page
        window.location.href = '/ty/ty-dryer-pl';
      } else {
        throw new Error('API request failed');
      }
    } catch (error) {
      console.error('Order submission error:', error);
      setStatus(FormStatus.ERROR);
      setErrorMessage('Wystąpił błąd podczas składania zamówienia. Spróbuj ponownie.');
    }
  };

  if (status === FormStatus.SUCCESS) {
    return (
      <section id="order-form" className="container mx-auto px-4 py-8 md:py-12 max-w-2xl">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center border-t-4 border-green-500">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
            <CheckCircle className="w-10 h-10 md:w-12 md:h-12" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">Dziękujemy za zamówienie!</h2>
          <p className="text-base md:text-lg text-gray-600 mb-6">
            Nasz konsultant skontaktuje się z Tobą wkrótce przez WhatsApp lub telefonicznie, aby potwierdzić wysyłkę.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="order-form" className="container mx-auto px-2 md:px-4 py-6 md:py-8 max-w-4xl">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
        <div className="bg-slate-900 text-white p-4 text-center">
          <h3 className="text-lg md:text-2xl font-bold">Wypełnij formularz, aby zamówić</h3>
          <p className="text-gray-300 text-xs md:text-sm">Karta kredytowa nie jest wymagana. Płacisz bezpośrednio kurierowi.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* Summary Column */}
          <div className="bg-gray-50 p-4 md:p-8 border-b md:border-b-0 md:border-r border-gray-200">
            <div className="flex items-start gap-4 mb-4 md:mb-6">
              <img src="/images/portable-dryer/1.jpg" alt="Product" className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-md border border-gray-300" />
              <div>
                <h4 className="font-bold text-gray-900 leading-tight mb-1 text-sm md:text-base">{PRODUCT_DATA.title}</h4>
                <div className="text-red-700 font-bold text-lg md:text-xl">{PRODUCT_DATA.price} zł</div>
                <div className="text-xs md:text-sm text-gray-500 line-through">{PRODUCT_DATA.originalPrice} zł</div>
              </div>
            </div>

            <ul className="space-y-3 md:space-y-4 text-xs md:text-sm text-gray-700 mb-4 md:mb-8">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0" />
                <span>Gwarancja satysfakcji lub zwrot w 30 dni</span>
              </li>
              <li className="flex items-center gap-2">
                <Truck className="w-4 h-4 md:w-5 md:h-5 text-cyan-700 flex-shrink-0" />
                <span>Szybka Wysyłka ze Śledzeniem (Gratis)</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-orange-500 flex-shrink-0" />
                <span>Płatność przy Odbiorze (Gotówka)</span>
              </li>
            </ul>

            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded text-xs text-yellow-800 flex gap-2">
              <div className="font-bold">⚠️ UWAGA:</div>
              <div>Ze względu na duże zainteresowanie medialne, zapasy są ograniczone. Zamów dziś, aby zablokować cenę.</div>
            </div>
          </div>

          {/* Form Column */}
          <div className="p-4 md:p-8">
            {status === FormStatus.ERROR && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Imię i Nazwisko *</label>
                <input
                  required
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Jan Kowalski"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Numer Telefonu *</label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+48 123 456 789"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
                />
                <p className="text-xs text-gray-500 mt-1">Kurier zadzwoni przed dostawą.</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Adres i Numer *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                  <input
                    required
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="ul. Warszawska 10"
                    className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Miasto *</label>
                  <input
                    required
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Warszawa"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Kod Pocztowy *</label>
                  <input
                    required
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="00-001"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === FormStatus.SUBMITTING}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-base md:text-lg py-3 md:py-4 rounded-md shadow-md transition-colors mt-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === FormStatus.SUBMITTING ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Przetwarzanie...
                  </>
                ) : (
                  'POTWIERDŹ ZAMÓWIENIE - PŁATNOŚĆ PRZY ODBIORZE'
                )}
              </button>

              <div className="text-center text-xs text-gray-500 mt-2">
                Klikając, potwierdzasz zapoznanie się z polityką prywatności. Twoje dane są bezpieczne.
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const StickyFooter = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
    const formElement = document.getElementById('order-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] z-40 md:hidden flex items-center justify-between animate-slide-up">
      <div>
        <div className="text-xs text-gray-500 font-medium">Oferta Błyskawiczna:</div>
        <div className="text-xl font-extrabold text-red-700">{PRODUCT_DATA.price} zł</div>
      </div>
      <button
        onClick={scrollToForm}
        className="bg-orange-500 text-white font-bold py-2.5 px-6 rounded-lg shadow-md hover:bg-orange-600 transition-colors uppercase text-sm"
      >
        Zamów Teraz
      </button>
    </div>
  );
};

// --- MAIN PAGE CONTENT ---

function DryFoldLandingPageContent() {
  const searchParams = useSearchParams();

  const utmParams: UTMParams = {
    utm_source: searchParams.get('utm_source') || undefined,
    utm_medium: searchParams.get('utm_medium') || undefined,
    utm_campaign: searchParams.get('utm_campaign') || undefined,
    utm_term: searchParams.get('utm_term') || undefined,
    utm_content: searchParams.get('utm_content') || undefined,
    subid: searchParams.get('subid') || undefined,
    subid2: searchParams.get('subid2') || undefined,
    subid3: searchParams.get('subid3') || undefined,
    subid4: searchParams.get('subid4') || undefined,
    pubid: searchParams.get('pubid') || undefined,
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans text-gray-900">
      <FacebookPixel />
      <Header />

      <main className="pb-20 md:pb-0">
        <ProductMain />

        {/* Benefit Band */}
        <div className="bg-slate-900 text-white py-4 mt-8">
           <div className="container mx-auto px-4 flex justify-around text-center text-xs md:text-sm font-medium">
             <div>🚚 Szybka Wysyłka</div>
             <div>💰 Płatność przy Odbiorze</div>
             <div>⭐ Satysfakcja lub Zwrot</div>
           </div>
        </div>

        <Features />

        {/* Middle CTA */}
        <div className="container mx-auto px-4 text-center my-8">
          <button
             onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}
             className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-12 rounded-full shadow-lg text-lg transform transition hover:scale-105"
          >
            Chcę ją otrzymać do domu!
          </button>
        </div>

        <Reviews />

        {/* The Conversion Point */}
        <OrderForm utmParams={utmParams} />
      </main>

      <footer className="bg-white border-t border-gray-200 text-center py-8 mt-8 pb-24 md:pb-8">
        <div className="container mx-auto px-4 text-sm text-gray-500">
          <p className="mb-4 font-bold text-gray-700">DryFold™ Official Polska</p>
          <div className="flex justify-center gap-4 mb-4 text-xs">
            <span className="cursor-pointer hover:underline">Polityka Prywatności</span>
            <span className="cursor-pointer hover:underline">Regulamin</span>
            <span className="cursor-pointer hover:underline">Kontakt</span>
            <span className="cursor-pointer hover:underline">Wysyłka</span>
          </div>
          <p className="text-xs">© 2025 Wszelkie prawa zastrzeżone. Ta strona nie jest częścią serwisu Facebook ani Facebook Inc. Ponadto ta strona nie jest w żaden sposób wspierana przez Facebook.</p>
        </div>
      </footer>

      <StickyFooter />
    </div>
  );
}

// --- MAIN PAGE ---

export default function DryFoldLandingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-100">Ładowanie...</div>}>
      <DryFoldLandingPageContent />
    </Suspense>
  );
}
