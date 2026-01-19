"use client";

import React, { useState, useEffect, useRef } from 'react';

// --- KONFIGURACJA I STAŁE ---
const BRAND_NAME = "AuraRelief Pro";
const PRICE = 249;
const ORIGINAL_PRICE = 499;
const DISCOUNT_PERCENT = 50;

const FEATURES = [
  {
    title: "Technologia EMS Multi-Strefowa",
    description: "Zaprojektowany do dopasowania nie tylko do szyi, ale także do odcinka lędźwiowego, pleców i nóg. Uczucie lekkości w całym ciele.",
    icon: "⚡"
  },
  {
    title: "Regenerujący Komfort Termiczny",
    description: "Stałe ciepło 42°C, które symuluje profesjonalny zabieg, idealne do rozluźnienia nagromadzonego napięcia.",
    icon: "🔥"
  },
  {
    title: "Całkowita Personalizacja",
    description: "6 trybów masażu i 15 poziomów intensywności, aby zawsze znaleźć idealną równowagę między relaksem a regeneracją.",
    icon: "⚙️"
  }
];

const REVIEWS = [
  { id: 1, title: "Totalny relaks dla pleców i nóg", name: "Marek G.", rating: 5, comment: "Używam po pracy, żeby rozluźnić napięcie lędźwiowe. Uczucie lekkości jest niesamowite. Doskonała jakość wykonania.", date: "15 marca 2024" },
  { id: 2, title: "Prawdziwa pomoc po biurze", name: "Weronika S.", rating: 5, comment: "Pracując przy komputerze często czuję sztywność szyi. 15 minut z tym urządzeniem i czuję się jak nowo narodzona. Bardzo wszechstronny.", date: "2 kwietnia 2024" },
  { id: 3, title: "Wszechstronny i bardzo łatwy w użyciu", name: "Robert L.", rating: 5, comment: "Ciepło jest bardzo przyjemne. Szybka wysyłka i wygodnie zapłaciłem przy odbiorze. Gorąco polecam.", date: "22 kwietnia 2024" },
  { id: 4, title: "Uczucie lekkości w całym ciele", name: "Aleksy P.", rating: 5, comment: "Po treningach zawsze czułem ciężkość w nogach. To urządzenie naprawdę pomaga szybko rozluźnić mięśnie.", date: "5 maja 2024" },
  { id: 5, title: "Świetna bateria, premium design", name: "Julia M.", rating: 4, comment: "Estetycznie bardzo dopracowany. Używam wieczorami na kanapie do relaksu, ciepło 42 stopni to dodatkowy atut.", date: "12 maja 2024" },
  { id: 6, title: "Idealny do aktywnej regeneracji", name: "Łukasz T.", rating: 5, comment: "Szukałem czegoś na łydki. Technologia EMS jest precyzyjnie regulowana. Trafiony zakup.", date: "18 maja 2024" },
  { id: 7, title: "Praktyczny również w podróży", name: "Serena B.", rating: 5, comment: "Lekki, zawsze go ze sobą zabieram. Pomaga mi utrzymać mięśnie rozluźnione nawet podczas długich podróży.", date: "25 maja 2024" },
  { id: 8, title: "Precyzyjnie regulowana moc", name: "Dawid V.", rating: 5, comment: "15 poziomów intensywności to fantastyczne rozwiązanie. Można przejść od delikatnego dotyku do głębokiej stymulacji.", date: "1 czerwca 2024" },
  { id: 9, title: "Żegnaj skumulowane napięcie", name: "Franciszka R.", rating: 5, comment: "Stałe ciepło rozluźnia węzły u podstawy szyi. Czuję się znacznie swobodniej w ruchach przez cały dzień.", date: "10 czerwca 2024" },
  { id: 10, title: "Znacznie więcej niż masażer", name: "Mateusz S.", rating: 4, comment: "Używam go też na ramiona. Świetny pomysł z płatnością przy odbiorze, dało mi to dużo pewności przy zakupie.", date: "15 czerwca 2024" },
  { id: 11, title: "Idealny prezent", name: "Anna L.", rating: 5, comment: "Podarowałam mężowi. Teraz używa go każdego wieczoru przed snem, mówi że pomaga mu znacznie lepiej wypoczywać.", date: "20 czerwca 2024" },
  { id: 12, title: "Lekki ale mocny", name: "Stefan C.", rating: 5, comment: "Kształt U idealnie blokuje się również na odcinku lędźwiowym gdy siedzisz w fotelu. Mocny.", date: "28 czerwca 2024" },
  { id: 13, title: "Błyskawiczna wysyłka", name: "Elena F.", rating: 5, comment: "Dotarł w mniej niż 24 godziny. Idealne opakowanie i produkt przewyższający oczekiwania. Elegancki.", date: "5 lipca 2024" },
  { id: 14, title: "Niezbędny przy pracy zdalnej", name: "Fabio D.", rating: 5, comment: "Pracując z domu postawa bardzo cierpi. To jedyny sposób, żeby skończyć dzień bez uczucia skurczu.", date: "12 lipca 2024" },
  { id: 15, title: "Świetny stosunek jakości do ceny", name: "Paweł M.", rating: 4, comment: "Robi dokładnie to, co obiecuje. Prosty w użyciu i ciepło dobrze się czuje. Polecam.", date: "18 lipca 2024" },
  { id: 16, title: "Top dla dobrego samopoczucia", name: "Klara G.", rating: 5, comment: "Używam na nogi wieczorami. Bardzo relaksujący, polecam tym, którzy dużo stoją.", date: "22 lipca 2024" }
];

// --- KOMPONENTY UI ---

const AmazonStar: React.FC<{ filled?: boolean; className?: string }> = ({ filled = true, className = "w-4 h-4" }) => (
  <svg className={`${className} ${filled ? 'text-[#ffa41c]' : 'text-gray-300'} fill-current`} viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default function LandingPage() {
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    tel: '',
    'street-address': ''
  });

  const orderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeLeft(14 * 60 + 58);
  }, []);

  useEffect(() => {
    if (timeLeft === null) return;
    const timer = setInterval(() => setTimeLeft(prev => prev !== null && prev > 0 ? prev - 1 : 0), 1000);
    const scroll = () => setShowFloatingCTA(window.scrollY > 800);
    window.addEventListener('scroll', scroll);
    return () => { clearInterval(timer); window.removeEventListener('scroll', scroll); };
  }, [timeLeft !== null]);

  const formatTime = (s: number | null) => ({
    m: s !== null ? Math.floor(s / 60).toString().padStart(2, '0') : '--',
    s: s !== null ? (s % 60).toString().padStart(2, '0') : '--'
  });

  const scrollToOrder = () => orderRef.current?.scrollIntoView({ behavior: 'smooth' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getUTMParams = () => {
    if (typeof window === 'undefined') return {};
    const urlParams = new URLSearchParams(window.location.search);
    return {
      utm_source: urlParams.get('utm_source') || '',
      utm_medium: urlParams.get('utm_medium') || '',
      utm_campaign: urlParams.get('utm_campaign') || '',
      utm_term: urlParams.get('utm_term') || '',
      utm_content: urlParams.get('utm_content') || '',
      subid: urlParams.get('subid') || '',
      subid2: urlParams.get('subid2') || '',
      subid3: urlParams.get('subid3') || '',
      subid4: urlParams.get('subid4') || '',
      pubid: urlParams.get('pubid') || ''
    };
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const utmParams = getUTMParams();
      const tmfp = typeof window !== 'undefined' && (window as unknown as { tmfp?: string }).tmfp ? (window as unknown as { tmfp: string }).tmfp : '';

      const payload = new URLSearchParams({
        uid: '0191dbf2-738a-7d28-82a0-18c3859d5e8f',
        key: '151af1e45a084aaf75c15f',
        offer: '2785',
        lp: '2818',
        'street-address': formData['street-address'],
        tel: formData.tel,
        name: formData.name,
        ...(tmfp && { tmfp }),
        ...Object.fromEntries(Object.entries(utmParams).filter(([, v]) => v))
      });

      const response = await fetch('https://offers.uncappednetwork.com/forms/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payload.toString()
      });

      if (response.ok) {
        window.location.href = '/ty/ty-fb-massager-pl';
      } else {
        alert('Wystąpił błąd. Proszę spróbować ponownie.');
        setIsSubmitting(false);
      }
    } catch {
      alert('Wystąpił błąd połączenia. Proszę spróbować ponownie.');
      setIsSubmitting(false);
    }
  };

  const time = formatTime(timeLeft);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 overflow-x-hidden">

      {/* 1. SCARCITY BAR */}
      <div className="bg-red-600 text-white text-[10px] sm:text-xs md:text-sm text-center py-2 sm:py-3 font-bold uppercase tracking-wide sticky top-0 z-[100] shadow-xl px-2">
        ⚠️ OFERTA DOSTĘPNA: TYLKO 12 SZTUK W TEJ CENIE ⚠️
      </div>

      {/* 2. HERO SECTION - Mobile Optimized */}
      <section className="relative pt-6 pb-10 sm:pt-10 sm:pb-16 md:pt-20 md:pb-32 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16 relative z-10">
          <div className="flex-1 text-center md:text-left w-full">
            <div className="inline-block bg-blue-600 text-white px-4 py-1.5 sm:px-6 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-4 sm:mb-6 shadow-lg">
              BESTSELLER WELLNESS 2024
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black leading-[1] mb-4 sm:mb-6 tracking-tight uppercase">
              ODZYSKAJ <span className="text-blue-600">WITALNOŚĆ</span>{" "}
              <span className="text-slate-400 font-light block sm:inline">W 15 MINUT</span>
            </h1>
            <p className="text-base sm:text-lg md:text-2xl text-slate-600 mb-6 sm:mb-8 leading-relaxed font-medium">
              Pożegnaj napięcie mięśniowe. Doświadcz nowego uczucia <span className="text-slate-900 font-bold">całkowitej lekkości</span>.
            </p>

            {/* Price + CTA - Mobile Stack */}
            <div className="flex flex-col items-center md:items-start gap-4 mb-6">
              <div className="flex items-baseline gap-3 justify-center md:justify-start">
                <span className="text-4xl sm:text-5xl md:text-6xl font-black">{PRICE} zł</span>
                <span className="text-lg sm:text-xl text-slate-400 line-through">{ORIGINAL_PRICE} zł</span>
              </div>
              <p className="text-xs font-bold text-red-600 uppercase tracking-wide">Oszczędzasz {DISCOUNT_PERCENT}%</p>
              <button onClick={scrollToOrder} className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-green-500 hover:bg-green-600 text-white font-bold text-lg sm:text-xl uppercase rounded-2xl shadow-lg transition-all active:scale-95">
                CHCĘ MÓJ RELAKS!
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6 border-t border-slate-200 pt-4 sm:pt-6 text-slate-500">
              <span className="text-xs sm:text-sm font-medium">🚚 Darmowa Dostawa</span>
              <span className="text-xs sm:text-sm font-medium">💰 Płatność Przy Odbiorze</span>
            </div>
          </div>

          {/* Product Image */}
          <div className="flex-1 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <img src="https://ae01.alicdn.com/kf/S8f2c8d8b6a3f4c6e9e4a8a5f8e5f8e5f8/Massaggiatore-Cervicale-Elettrico-EMS-Impulsi-Neck-Massager-Terapia-Magnetica-Riscaldamento-Sollievo-Dolore-Cervicale.jpg" alt="AuraRelief Pro" className="w-full rounded-3xl shadow-xl" />
          </div>
        </div>
      </section>

      {/* 3. PROBLEM SECTION - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-24 bg-slate-950 text-white px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black leading-tight mb-8 sm:mb-12 uppercase tracking-tight text-center">
            CZY NAPIĘCIE <span className="text-blue-500">CIĘ HAMUJE?</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-8 sm:mb-10 text-center max-w-2xl mx-auto">
            Nie pozwól, aby codzienny stres ograniczał Twoją <span className="text-white font-bold">swobodę ruchu</span>. Twoje ciało zasługuje na regenerującą przerwę każdego dnia.
          </p>

          {/* Benefits Grid */}
          <div className="grid gap-4 sm:gap-6">
            {[
              { t: "Rozluźnia Napięcia", d: "Rozluźnia węzły stresu nagromadzone przez lata złej postawy.", e: "⛓️" },
              { t: "Lepszy Odpoczynek", d: "Sprzyja uczuciu całkowitego spokoju przed snem.", e: "🌙" },
              { t: "Całkowita Swoboda", d: "Poczuj się zwinny i dynamiczny w każdej aktywności.", e: "🏃" }
            ].map((it, i) => (
              <div key={i} className="flex gap-4 items-start bg-white/5 p-4 sm:p-6 rounded-2xl">
                <span className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600/20 text-2xl rounded-xl flex items-center justify-center shrink-0">{it.e}</span>
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-blue-400 mb-1">{it.t}</h4>
                  <p className="text-sm sm:text-base text-slate-400">{it.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TIMER SECTION - Mobile Optimized */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="bg-red-600 py-8 sm:py-12 px-4 sm:px-8 rounded-3xl text-center max-w-lg mx-auto text-white">
          <p className="font-bold uppercase text-xs sm:text-sm tracking-wider mb-4 sm:mb-6">OFERTA WYGASA ZA:</p>
          <div className="flex justify-center items-center gap-3 sm:gap-6 mb-4 sm:mb-6">
            <div className="flex flex-col items-center">
              <span className="bg-white text-red-600 text-3xl sm:text-5xl md:text-6xl font-black w-16 sm:w-20 md:w-24 py-2 sm:py-3 rounded-xl">{time.m}</span>
              <span className="text-[10px] sm:text-xs uppercase font-bold mt-2 opacity-80">Min</span>
            </div>
            <span className="text-3xl sm:text-5xl font-black">:</span>
            <div className="flex flex-col items-center">
              <span className="bg-white text-red-600 text-3xl sm:text-5xl md:text-6xl font-black w-16 sm:w-20 md:w-24 py-2 sm:py-3 rounded-xl">{time.s}</span>
              <span className="text-[10px] sm:text-xs uppercase font-bold mt-2 opacity-80">Sek</span>
            </div>
          </div>
          <p className="text-sm sm:text-base font-medium opacity-90">Zamów teraz i zaoszczędź 250 zł!</p>
        </div>
      </section>

      {/* 5. FEATURES SECTION - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-24 bg-white px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 uppercase">Dlaczego Warto Go Wybrać?</h2>
          <div className="grid gap-6 sm:gap-8">
            {FEATURES.map((f, i) => (
              <div key={i} className="flex gap-4 sm:gap-6 items-start bg-gray-50 p-4 sm:p-6 rounded-2xl">
                <div className="text-3xl sm:text-4xl">{f.icon}</div>
                <div>
                  <h4 className="text-lg sm:text-xl font-bold mb-2">{f.title}</h4>
                  <p className="text-sm sm:text-base text-slate-600">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. REVIEWS SECTION - Amazon Style Mobile Optimized */}
      <section className="py-10 sm:py-16 md:py-20 bg-gray-50 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-gray-900">Opinie klientów</h2>

          {/* Rating Summary - Amazon Style */}
          <div className="bg-white rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-sm border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              {/* Overall Rating */}
              <div className="flex items-center gap-3">
                <span className="text-4xl sm:text-5xl font-bold text-gray-900">4.9</span>
                <div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => <AmazonStar key={i} filled={true} className="w-5 h-5 sm:w-6 sm:h-6" />)}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">15 402 ocen</p>
                </div>
              </div>

              {/* Rating Bars */}
              <div className="flex-1 space-y-1.5 sm:space-y-2">
                {[
                  { stars: 5, pct: 88 },
                  { stars: 4, pct: 9 },
                  { stars: 3, pct: 2 },
                  { stars: 2, pct: 1 },
                  { stars: 1, pct: 0 }
                ].map((item) => (
                  <div key={item.stars} className="flex items-center gap-2 text-xs sm:text-sm">
                    <span className="w-12 sm:w-14 text-blue-600 hover:underline cursor-pointer">{item.stars} gwiazdek</span>
                    <div className="flex-1 h-4 sm:h-5 bg-gray-200 rounded overflow-hidden">
                      <div className="h-full bg-[#ffa41c]" style={{ width: `${item.pct}%` }}></div>
                    </div>
                    <span className="w-8 sm:w-10 text-right text-gray-600">{item.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews List - Amazon Style */}
          <div className="space-y-4 sm:space-y-6">
            {REVIEWS.slice(0, visibleReviews).map((r) => (
              <div key={r.id} className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-200">
                {/* Reviewer */}
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm sm:text-base">
                    {r.name[0]}
                  </div>
                  <span className="text-sm sm:text-base font-medium text-gray-900">{r.name}</span>
                </div>

                {/* Rating + Title */}
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => <AmazonStar key={i} filled={i < r.rating} className="w-4 h-4" />)}
                  </div>
                  <h4 className="font-bold text-sm sm:text-base text-gray-900">{r.title}</h4>
                </div>

                {/* Date */}
                <p className="text-xs text-gray-500 mb-2 sm:mb-3">
                  Recenzja z {r.date} | <span className="text-[#c45500]">Zweryfikowany zakup</span>
                </p>

                {/* Comment */}
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{r.comment}</p>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {visibleReviews < REVIEWS.length && (
            <button
              onClick={() => setVisibleReviews(prev => prev + 3)}
              className="w-full mt-4 sm:mt-6 py-3 sm:py-4 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-xl text-sm sm:text-base hover:bg-gray-50 transition-colors"
            >
              Zobacz więcej recenzji
            </button>
          )}
        </div>
      </section>

      {/* 7. ORDER FORM SECTION - Mobile Optimized */}
      <section ref={orderRef} className="py-10 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 sm:mb-3">
            Zamów <span className="text-blue-600">AuraRelief Pro</span>
          </h2>
          <p className="text-center text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">Płatność przy odbiorze - bez ryzyka!</p>

          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Form Header */}
            <div className="bg-slate-900 p-4 sm:p-6 text-white text-center">
              <h3 className="text-xl sm:text-2xl font-bold mb-1">ZAMÓW TERAZ</h3>
              <p className="text-blue-400 text-xs sm:text-sm font-medium">PŁATNOŚĆ PRZY ODBIORZE</p>
            </div>

            <form onSubmit={handleOrderSubmit} className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
              {/* Product Box */}
              <div className="bg-blue-50 p-4 sm:p-5 rounded-xl border-2 border-blue-500 relative">
                <span className="absolute -top-3 left-4 bg-blue-600 text-white text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase">Najlepsza Oferta</span>
                <div className="flex justify-between items-center pt-1">
                  <div>
                    <h4 className="text-base sm:text-lg font-bold">1x AuraRelief Pro</h4>
                    <p className="text-xs sm:text-sm text-gray-500">Kompletny zestaw</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-black">{PRICE} zł</span>
                    <p className="text-[10px] sm:text-xs text-red-600 font-bold">-250 zł</p>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-3 sm:space-y-4">
                <input
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Imię i Nazwisko"
                  className="w-full p-3 sm:p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-base"
                />
                <input
                  required
                  name="tel"
                  value={formData.tel}
                  onChange={handleInputChange}
                  placeholder="Numer telefonu"
                  type="tel"
                  className="w-full p-3 sm:p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-base"
                />
                <input
                  required
                  name="street-address"
                  value={formData['street-address']}
                  onChange={handleInputChange}
                  placeholder="Adres (ulica, numer, miasto, kod pocztowy)"
                  className="w-full p-3 sm:p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-base"
                />
              </div>

              {/* Submit Button */}
              <button
                disabled={isSubmitting}
                className="w-full py-4 sm:py-5 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold text-lg sm:text-xl uppercase rounded-xl shadow-lg transition-all active:scale-[0.98]"
              >
                {isSubmitting ? "PRZETWARZANIE..." : "ZAMAWIAM"}
              </button>

              <p className="text-center text-xs text-gray-400">
                Klikając "Zamawiam" akceptujesz regulamin
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-10 sm:py-12 px-4 sm:px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
          <h3 className="text-white text-xl sm:text-2xl font-bold">{BRAND_NAME}</h3>
          <p className="text-xs sm:text-sm leading-relaxed opacity-70">
            AuraRelief Pro Polska jest liderem rozwiązań dla codziennego dobrego samopoczucia w domu.
            Nie używamy terminów medycznych ani obietnic leczenia.
          </p>
          <div className="flex justify-center gap-6 text-xs font-medium">
            <a href="#" className="hover:text-white">Prywatność</a>
            <a href="#" className="hover:text-white">Regulamin</a>
            <a href="#" className="hover:text-white">Wysyłka</a>
          </div>
          <p className="text-[10px] sm:text-xs opacity-50">© 2024 AuraRelief Pro. Wszelkie prawa zastrzeżone.</p>
        </div>
      </footer>

      {/* FLOATING CTA - Mobile Optimized */}
      {showFloatingCTA && (
        <div className="fixed bottom-4 left-4 right-4 z-[200] sm:left-1/2 sm:-translate-x-1/2 sm:w-auto sm:max-w-sm">
          <button
            onClick={scrollToOrder}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 sm:py-4 px-6 rounded-2xl shadow-2xl flex items-center justify-between font-bold text-base sm:text-lg"
          >
            <span>Zamów teraz</span>
            <span className="bg-white/20 px-3 sm:px-4 py-1 rounded-lg">{PRICE} zł</span>
          </button>
        </div>
      )}
    </div>
  );
}
