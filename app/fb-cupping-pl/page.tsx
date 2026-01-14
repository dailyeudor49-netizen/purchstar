'use client';

import React, { useState, useEffect, Suspense } from 'react';
import {
  Star,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  ChevronDown,
  ShoppingBag,
  Zap,
  Flame,
  UserCheck,
  ShieldCheck,
  Award,
  ChevronRight,
  Truck,
  TrendingUp,
  Activity,
  Lock
} from 'lucide-react';
import Script from 'next/script';
import { useRouter, useSearchParams } from 'next/navigation';

// --- API CONFIG ---
const API_CONFIG = {
  url: 'https://offers.uncappednetwork.com/forms/api/',
  uid: '0191dbf2-738a-7d28-82a0-18c3859d5e8f',
  key: '151af1e45a084aaf75c15f',
  offer: '2785',
  lp: '2818'
};

// --- DATA: 18 RECENZJI DLA 6 KLIKNIĘĆ "ZAŁADUJ WIĘCEJ" ---
const ALL_REVIEWS = [
  { user: "Marek B.", date: "14 lutego 2024", title: "Już bez niego nie wyobrażam sobie życia. Wart każdej złotówki!", rating: 5, content: "Wypróbowałem wiele masażerów, ale ten jest na innym poziomie. Ssanie jest bardzo mocne, a ciepło jest niebiańskie. Po 10 minutach plecy są jak nowe.", helpful: 84 },
  { user: "Anna F.", date: "2 lutego 2024", title: "Cudowny na cellulit", rating: 5, content: "Używam go na udach każdego wieczoru. Już po tygodniu skóra jest jędrniejsza. Trochę się czerwieni, ale szybko znika - to znaczy, że krew krąży! Gorąco polecam.", helpful: 42 },
  { user: "Jan M.", date: "28 stycznia 2024", title: "Świetny dla sportowców", rating: 4, content: "Używam go po bieganiu. Bardzo pomaga w drenażu. 4 gwiazdki tylko dlatego, że wolałbym trochę większą baterię, ale szybko się ładuje.", helpful: 15 },
  { user: "Petra G.", date: "20 stycznia 2024", title: "Żegnaj bólu karku!", rating: 5, content: "Przykładam go u podstawy szyi po 8 godzinach przy komputerze. Czuję, jak mięśnie dosłownie się rozluźniają pod ssaniem. Nie mogłam dokonać lepszego zakupu.", helpful: 56 },
  { user: "Robert P.", date: "12 stycznia 2024", title: "Oszczędzam mnóstwo pieniędzy", rating: 5, content: "Wcześniej chodziłem do fizjoterapeuty co dwa tygodnie. Teraz ze CuppingPro rozwiązuję węzły mięśniowe sam w domu. Zwrócił się w miesiąc.", helpful: 129 },
  { user: "Maja T.", date: "5 stycznia 2024", title: "Kupiłam dwa!", rating: 5, content: "Jeden dla mnie i jeden dla mamy. Ona cierpi na bóle w dolnej części pleców i to jej pomogło znowu chodzić bez tego ciągłego uczucia ciężkości. Fantastyczny prezent.", helpful: 31 },
  { user: "Franciszek S.", date: "29 grudnia 2023", title: "Doskonała jakość wykonania", rating: 5, content: "Widać, że to nie zwykły chiński plastik. Jest solidny, ekran jest wyraźny, a akcesoria są wysokiej jakości. Bardzo zadowolony z szybkiej dostawy.", helpful: 22 },
  { user: "Elena W.", date: "22 grudnia 2023", title: "Śpię znacznie lepiej", rating: 5, content: "Używam go przez 10 minut przed snem na ramionach. Usuwa całe napięcie dnia i wreszcie śpię 8 godzin bez przerwy.", helpful: 67 },
  { user: "Julia L.", date: "15 grudnia 2023", title: "Nogi lekkie jak piórko", rating: 5, content: "Pracuję stojąc cały dzień. Wieczorem nogi mnie bolały. CuppingPro reaktywuje krążenie i opuchlizna znika. Już nigdy ciężkich nóg.", helpful: 48 },
  { user: "Mariusz D.", date: "8 grudnia 2023", title: "Obowiązkowy na siłowni", rating: 4, content: "Używam go na intensywne zakwasy na nogach. Pomaga przyspieszyć regenerację. Świetny produkt, ekran bardzo intuicyjny.", helpful: 19 },
  { user: "Walentyna R.", date: "1 grudnia 2023", title: "Skóra widocznie poprawiona", rating: 5, content: "Oprócz masażu zauważyłam, że tekstura skóry na udach bardzo się poprawiła. Zatrzymywanie wody drastycznie się zmniejszyło.", helpful: 53 },
  { user: "Antoni K.", date: "24 listopada 2023", title: "Trafiony prezent", rating: 5, content: "Podarowałem żonie. Stał się jej ulubionym przedmiotem. Używa go codziennie. Obsługa klienta CuppingPro super dostępna.", helpful: 12 },
  { user: "Paweł M.", date: "18 listopada 2023", title: "Zabieram go nawet w podróże", rating: 5, content: "Mały i potężny. Podróżując dużo służbowo, zawsze mam sztywny kark. To rozwiązuje problem w hotelu w 5 minut.", helpful: 27 },
  { user: "Klara S.", date: "10 listopada 2023", title: "Lepsze niż oczekiwałam", rating: 5, content: "Byłam sceptyczna, ale musiałam zmienić zdanie. Siła ssania jest imponująca. Używajcie z odrobiną olejku do masażu!", helpful: 39 },
  { user: "Stefan F.", date: "2 listopada 2023", title: "Żegnaj lekom przeciwbólowym", rating: 5, content: "Brałem ibuprofen prawie codziennie na ból pleców. Odkąd używam CuppingPro, już go nie potrzebuję. Zmienia życie.", helpful: 91 },
  { user: "Sara O.", date: "25 października 2023", title: "Super drenujący", rating: 5, content: "Idealny dla osób cierpiących na zatrzymywanie wody. Używam go regularnie i widzę rezultaty. Ciepło bardzo pomaga w relaksacji.", helpful: 14 },
  { user: "Michał B.", date: "15 października 2023", title: "Błyskawiczna dostawa", rating: 4, content: "Dotarło w mniej niż 24 godziny. Opakowanie schludne. Produkt działa dobrze, tylko trzeba nauczyć się używać poziomów mocy.", helpful: 8 },
  { user: "Federyka L.", date: "5 października 2023", title: "Niepokonany stosunek jakości do ceny", rating: 5, content: "Za tę cenę nie znajdziesz niczego tak profesjonalnego. Polecam wszystkim moim przyjaciółkom.", helpful: 22 }
];

const OrderFormContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
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
        'address-level2': formData.city,
        'postal-code': formData.postalCode,
        ua: navigator.userAgent,
        tmfp: tmfp,
      });

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

      router.push('/ty/ty-fb-cupping-pl');
    } catch (error) {
      console.error('[Network API] Error:', error);
      router.push('/ty/ty-fb-cupping-pl');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 md:p-12 rounded-[3rem] border-2 border-gray-200 shadow-[0_30px_60px_rgba(0,0,0,0.1)]">
        <div className="text-center mb-8">
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Oferta Specjalna</p>
          <h3 className="text-3xl font-black uppercase italic mb-4">1x CUPPINGPRO™ PRO</h3>
          <div className="flex items-baseline justify-center gap-3 mb-6">
            <span className="text-5xl font-black text-red-600">249 zł</span>
            <span className="text-2xl text-gray-300 line-through">498 zł</span>
          </div>
          <ul className="flex flex-wrap justify-center gap-4 text-sm">
            <li className="flex gap-2 items-center font-bold"><CheckCircle2 className="text-green-500" size={18} /> Urządzenie CuppingPro Pro</li>
            <li className="flex gap-2 items-center font-bold"><CheckCircle2 className="text-green-500" size={18} /> Kabel USB-C</li>
            <li className="flex gap-2 items-center font-bold"><CheckCircle2 className="text-green-500" size={18} /> 24 miesiące gwarancji</li>
          </ul>
        </div>

        <div className="border-t border-gray-100 pt-8 mt-8">
          <p className="text-center text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Wypełnij, aby zamówić za pobraniem</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" name="tmfp" />
            <div>
              <label className="text-xs font-black uppercase text-gray-400 mb-1 block">Imię i Nazwisko</label>
              <input
                type="text"
                name="name"
                placeholder="Jan Kowalski"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:border-red-600 focus:outline-none transition-all font-bold"
              />
            </div>
            <div>
              <label className="text-xs font-black uppercase text-gray-400 mb-1 block">Adres Dostawy</label>
              <input
                type="text"
                name="address"
                placeholder="ul. Marszałkowska 10/5"
                required
                value={formData.address}
                onChange={handleChange}
                className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:border-red-600 focus:outline-none transition-all font-bold"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black uppercase text-gray-400 mb-1 block">Kod Pocztowy</label>
                <input
                  type="text"
                  name="postalCode"
                  placeholder="00-001"
                  required
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:border-red-600 focus:outline-none transition-all font-bold"
                />
              </div>
              <div>
                <label className="text-xs font-black uppercase text-gray-400 mb-1 block">Miasto</label>
                <input
                  type="text"
                  name="city"
                  placeholder="Warszawa"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:border-red-600 focus:outline-none transition-all font-bold"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-black uppercase text-gray-400 mb-1 block">Numer Telefonu</label>
              <input
                type="tel"
                name="phone"
                placeholder="+48 123 456 789"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:border-red-600 focus:outline-none transition-all font-bold"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-6 rounded-[2rem] font-black text-xl uppercase tracking-widest shadow-[0_15px_30px_rgba(239,68,68,0.4)] hover:bg-red-700 active:scale-95 transition-all mt-6"
            >
              {loading ? "PRZETWARZANIE..." : "ZAMÓW ZA POBRANIEM"}
            </button>
            <div className="flex justify-center items-center gap-2 text-sm text-gray-500 mt-4">
              <Lock size={16} /> Twoje dane są bezpieczne i szyfrowane
            </div>
            <p className="text-center text-xs text-gray-400 font-medium">
              Płacisz kurierowi przy dostawie. Darmowa dostawa.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

const OrderForm = () => (
  <Suspense fallback={<div className="py-20 text-center">Ładowanie...</div>}>
    <OrderFormContent />
  </Suspense>
);

export default function LandingPage() {
  const [timeLeft, setTimeLeft] = useState(599);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleLoadMore = () => {
    setVisibleReviews(prev => Math.min(prev + 3, ALL_REVIEWS.length));
  };

  return (
    <>
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

      <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-red-100 selection:text-red-900">

        {/* --- URGENCY HEADER --- */}
        <header className="fixed top-0 left-0 right-0 z-[100]">
          <div className="bg-red-600 text-white text-center py-2 px-2 text-[10px] md:text-sm font-black flex justify-center items-center gap-2 uppercase tracking-tight shadow-xl">
            <Clock size={14} className="animate-pulse" />
            OFERTA BŁYSKAWICZNA: -50% KOŃCZY SIĘ ZA {formatTime(timeLeft)} - OSTATNIE 4 SZTUKI DOSTĘPNE!
          </div>
          <nav className="bg-white/90 backdrop-blur-xl border-b border-gray-100 py-3 px-4 flex justify-between items-center">
            <div className="text-xl md:text-2xl font-black tracking-tighter italic text-red-600">CUPPINGPRO™</div>
            <a href="#order" className="bg-black text-white px-5 py-2 rounded-xl font-bold text-xs md:text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-lg">
              ZAMÓW TERAZ
            </a>
          </nav>
        </header>

        <main className="pt-24 overflow-x-hidden">

          {/* --- HERO SECTION --- */}
          <section className="px-4 py-12 md:py-24 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest border border-red-100">
                <Activity size={14} /> Polecane przez 450+ Centrów Wellness
              </div>
              <h1 className="text-4xl md:text-7xl font-black leading-[0.95] tracking-tighter text-gray-900">
                BÓL TO <br/> <span className="text-red-600">PASOŻYT.</span> <br/>
                POKONAJ GO W <br className="hidden md:block"/> 5 MINUT.
              </h1>
              <p className="text-lg md:text-2xl text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Przestań wyrzucać pieniądze na leki, które niszczą twój żołądek. Wypróbuj moc <span className="text-black font-bold">Inteligentnego Bańkowania</span> i wróć do życia bez ograniczeń.
              </p>
              <div className="flex flex-col gap-4 pt-4">
                <a href="#order" className="group flex items-center justify-center gap-3 bg-red-600 text-white px-8 py-5 md:py-7 rounded-[2rem] font-black text-xl md:text-3xl hover:bg-red-700 transition-all transform hover:scale-[1.03] shadow-[0_20px_50px_rgba(239,68,68,0.4)] uppercase italic">
                  Tak! Uwolnij moje plecy <ChevronRight className="group-hover:translate-x-2 transition-transform" size={28} />
                </a>
                <div className="flex justify-center lg:justify-start items-center gap-4 text-xs font-bold text-gray-400 uppercase">
                  <span className="flex items-center gap-1"><ShieldCheck size={16} className="text-green-500" /> Płatność za pobraniem</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span className="flex items-center gap-1"><Truck size={16} className="text-blue-500" /> Dostawa 24h</span>
                </div>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-red-600/10 blur-[120px] rounded-full"></div>
              <img
                src="/images/massaggiatore/37be453b-8d26-4dda-9172-db32f2c22b12.webp"
                alt="CuppingPro Device"
                className="relative z-10 w-full max-w-lg mx-auto rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.2)] hover:rotate-3 transition-transform duration-700"
              />
              <div className="absolute -bottom-6 right-0 md:-right-10 bg-white p-6 rounded-[2rem] shadow-2xl z-20 border border-gray-100 flex items-center gap-4 animate-bounce duration-[3000ms]">
                <div className="bg-yellow-400 p-3 rounded-2xl"><TrendingUp size={24} className="text-white" /></div>
                <div>
                  <p className="font-black text-sm uppercase leading-none">Best Seller #1</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Kategoria Zdrowie 2026</p>
                </div>
              </div>
            </div>
          </section>

          {/* --- LOGO STRIP --- */}
          <div className="bg-gray-50 py-10 border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-around items-center gap-8 opacity-40 grayscale">
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-6" />
              <div className="font-black text-lg italic tracking-tighter">FITNESS <span className="text-red-600">PRO</span></div>
              <div className="font-black text-lg italic tracking-tighter">BODY <span className="text-red-600">RECOVERY</span></div>
              <div className="font-black text-lg italic tracking-tighter">HEALTH <span className="text-red-600">CARE</span></div>
            </div>
          </div>

          {/* --- PROBLEM SECTION --- */}
          <section className="bg-black py-20 px-4 text-white">
            <div className="max-w-4xl mx-auto text-center space-y-16">
              <h2 className="text-3xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
                TWOJE CIAŁO CIĘ <br/> <span className="text-red-600 underline decoration-white">KARZE.</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { t: "MIĘŚNIE JAK KAMIEŃ", d: "Ramiona i kark tak twarde, że nie możesz obrócić głowy.", i: "⛓️" },
                  { t: "CHRONICZNY STRES", d: "To ciągłe napięcie, które zabiera ci oddech pod koniec dnia.", i: "🧨" },
                  { t: "ZASTÓJ LIMFY", d: "Ciężkie nogi i cellulit, które nigdy nie znikają.", i: "🌊" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="text-5xl mb-4">{item.i}</div>
                    <h3 className="font-black text-xl text-red-500 mb-2 uppercase">{item.t}</h3>
                    <p className="text-gray-400 font-medium leading-relaxed">{item.d}</p>
                  </div>
                ))}
              </div>
              <div className="bg-red-600 p-8 rounded-[3rem] shadow-2xl transform rotate-1">
                <p className="text-xl md:text-2xl font-black italic">
                  "Każdy dzień ignorowania bólu to kolejny dzień starzenia się. Przejmij kontrolę teraz albo zapłacisz cenę za 10 lat."
                </p>
              </div>
            </div>
          </section>

          {/* --- FEATURES --- */}
          <section className="py-24 px-4 max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-20">
              <div className="flex-1 space-y-12">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">KLINICZNA <span className="text-red-600 italic">TECHNOLOGIA</span> <br/> W DŁONI</h2>
                <div className="space-y-8">
                  {[
                    { icon: <Flame className="text-orange-500" />, title: "OGRZEWANIE DO 50°C", desc: "Rozpuszcza tłuszcz i napięte włókna mięśniowe w kilka sekund, jak profesjonalny masaż gorącymi kamieniami." },
                    { icon: <Zap className="text-blue-500" />, title: "DYNAMICZNE SSANIE", desc: "6 poziomów ekstremalnej próżni do usuwania toksyn i natychmiastowej reaktywacji krążenia krwi." },
                    { icon: <UserCheck className="text-green-500" />, title: "DRENAŻ LIMFATYCZNY", desc: "Eliminuje nadmiar płynów i walczy z cellulitem działając na przyczynę, nie tylko na estetykę." }
                  ].map((f, i) => (
                    <div key={i} className="flex gap-6 items-start">
                      <div className="bg-gray-100 p-4 rounded-2xl shrink-0">{f.icon}</div>
                      <div>
                        <h3 className="text-2xl font-black uppercase italic mb-1">{f.title}</h3>
                        <p className="text-gray-600 font-medium leading-relaxed">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 relative">
                <img src="/images/massaggiatore/c31feb76-d00b-4c7d-819c-b275864e941c.webp" alt="Features" className="rounded-[3rem] shadow-2xl" />
              </div>
            </div>
          </section>

          {/* --- VIDEO SECTION --- */}
          <section className="py-24 px-4 bg-black">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none mb-4">
                  ZOBACZ <span className="text-red-600">CUPPINGPRO™</span> W AKCJI
                </h2>
                <p className="text-gray-400 font-medium">Odkryj jak działa i dlaczego tysiące Polaków już go wybrało.</p>
              </div>
              <div className="relative rounded-[2rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] border-4 border-white/10">
                <video
                  className="w-full"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="/video/cupping-massage/917c18cf10204daeb9a48f638eba922b.SD-480p-1.0Mbps-64661437.mp4" type="video/mp4" />
                  Twoja przeglądarka nie obsługuje tagu wideo.
                </video>
              </div>
            </div>
          </section>

          {/* --- REVIEWS SECTION --- */}
          <section className="bg-gray-50 py-24 px-4 border-y border-gray-100">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black mb-4 flex items-center gap-3">
                    RECENZJE KLIENTÓW <span className="bg-gray-200 text-gray-600 text-sm px-3 py-1 rounded-full font-bold">14 500+</span>
                  </h2>
                  <div className="flex items-center gap-4">
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => <Star key={i} size={22} fill="currentColor" />)}
                    </div>
                    <span className="text-2xl font-black">4.8 z 5</span>
                  </div>
                </div>
                <div className="text-right hidden md:block">
                  <p className="text-sm font-bold text-green-600 uppercase tracking-widest">✅ 100% Zweryfikowanych Zakupów</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="md:col-span-1 space-y-3">
                  {[5, 4, 3, 2, 1].map((s) => (
                    <div key={s} className="flex items-center gap-3 text-sm font-bold">
                      <span className="w-12">{s} gwiazd.</span>
                      <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-400" style={{ width: s === 5 ? '88%' : s === 4 ? '10%' : '1%' }}></div>
                      </div>
                      <span className="w-8 text-gray-400">{s === 5 ? '88%' : s === 4 ? '10%' : '1%'}</span>
                    </div>
                  ))}
                </div>

                <div className="md:col-span-2 space-y-12">
                  {ALL_REVIEWS.slice(0, visibleReviews).map((rev, idx) => (
                    <div key={idx} className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-black text-gray-500 text-xs uppercase">{rev.user[0]}</div>
                        <span className="text-sm font-bold tracking-tight">{rev.user}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex text-yellow-500">
                          {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < rev.rating ? "currentColor" : "none"} />)}
                        </div>
                        <span className="text-sm font-black italic">{rev.title}</span>
                      </div>
                      <p className="text-xs text-gray-400">Recenzja z Polski {rev.date} - <span className="text-orange-600 font-bold uppercase">Zweryfikowany zakup</span></p>
                      <p className="text-gray-700 leading-relaxed font-medium">{rev.content}</p>
                      <div className="flex items-center gap-4 pt-2">
                        <button className="px-5 py-1.5 border border-gray-300 rounded-lg text-xs font-bold hover:bg-gray-100 shadow-sm active:scale-95 transition-all">Pomocne</button>
                        <span className="text-xs text-gray-400 font-bold italic">{rev.helpful} osób uważa to za pomocne</span>
                      </div>
                    </div>
                  ))}

                  {visibleReviews < ALL_REVIEWS.length && (
                    <button
                      onClick={handleLoadMore}
                      className="w-full bg-white border-2 border-black text-black py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      Pokaż kolejne 3 recenzje ({ALL_REVIEWS.length - visibleReviews} pozostało) <ChevronDown />
                    </button>
                  )}
                  {visibleReviews >= ALL_REVIEWS.length && (
                    <p className="text-center text-gray-400 font-bold italic uppercase tracking-widest text-xs">Zobaczyłeś wszystkie najlepsze recenzje.</p>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* --- PRICING SECTION --- */}
          <section id="order" className="py-24 px-4 bg-white">
            <div className="max-w-5xl mx-auto space-y-16">
              <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-gray-900">WYBIERZ SWÓJ <span className="text-red-600 underline">LEK.</span></h2>
                <div className="bg-red-600 text-white inline-block px-6 py-2 rounded-full font-black animate-bounce uppercase tracking-widest text-sm">
                  50% zniżki tylko dziś
                </div>
                <div className="pt-8">
                  <img src="/images/massaggiatore/2ddb9d4e-3ca6-448e-bff0-db8c225f3c60.webp" alt="CuppingPro Kit" className="max-w-md mx-auto rounded-3xl shadow-xl" />
                </div>
              </div>

              <OrderForm />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12">
                {[
                  { i: <ShieldCheck />, t: "Płatność za pobraniem" },
                  { i: <Truck />, t: "Dostawa 24/48h" },
                  { i: <Award />, t: "Oficjalna gwarancja" },
                  { i: <ShoppingBag />, t: "Łatwy zwrot" }
                ].map((badge, idx) => (
                  <div key={idx} className="flex flex-col items-center p-6 bg-white border border-gray-100 rounded-3xl shadow-sm text-center">
                    <div className="text-red-600 mb-2">{badge.i}</div>
                    <p className="text-[10px] font-black uppercase tracking-tighter leading-none">{badge.t}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* --- FAQ SECTION --- */}
          <section className="py-24 px-4 bg-gray-50">
            <div className="max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl md:text-5xl font-black text-center mb-12 uppercase italic">MASZ <span className="text-red-600 underline">PYTANIA?</span></h2>
              {[
                { q: "NAPRAWDĘ POMAGA NA BÓL?", a: "Tak. CuppingPro™ łączy kliniczne ssanie i terapię termiczną, aby rozluźnić głębokie mięśnie, gdzie masaże ręczne nie docierają." },
                { q: "CZY ZOSTAWIA ŚLADY NA SKÓRZE?", a: "Tak, bańkowanie przyciąga krew na powierzchnię, zostawiając czerwone kręgi. To znak, że krążenie zostało reaktywowane. Znikają w 2-3 dni." },
                { q: "CZY MOGĘ ZAPŁACIĆ GOTÓWKĄ?", a: "Oczywiście. Wybierz płatność za pobraniem i zapłać bezpośrednio kurierowi, gdy dotrze pod twój adres." },
                { q: "JAK DŁUGO WYTRZYMUJE BATERIA?", a: "Około 10-12 pełnych sesji po 15 minut na jednym ładowaniu USB-C." }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-6 text-left flex justify-between items-center group"
                  >
                    <span className="font-bold text-lg group-hover:text-red-600 transition-colors uppercase italic">{faq.q}</span>
                    <ChevronDown className={`transform transition-transform text-red-600 ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-40 p-6 pt-0' : 'max-h-0'}`}>
                    <p className="text-gray-600 font-medium leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* --- FOOTER --- */}
        <footer className="bg-black text-white py-20 px-4 pb-32 md:pb-20">
          <div className="max-w-7xl mx-auto text-center space-y-8">
            <div className="text-3xl font-black tracking-tighter italic text-red-600">CUPPINGPRO™</div>
            <p className="text-gray-500 text-sm max-w-xl mx-auto font-medium uppercase tracking-widest leading-loose">
              CuppingPro™ jest zarejestrowanym znakiem towarowym. <br/> Ponad 1 milion osób wybrało inteligentną technologię wellness. <br/>
              Siedziba: Warszawa, Polska.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase opacity-40 tracking-[0.3em]">
              <a href="#" className="hover:text-red-600">Polityka prywatności</a>
              <a href="#" className="hover:text-red-600">Regulamin</a>
              <a href="#" className="hover:text-red-600">Kontakt</a>
            </div>
            <p className="text-[10px] text-gray-800 pt-10 font-black uppercase">© 2024 CuppingPro Polska. Wszelkie prawa zastrzeżone.</p>
          </div>
        </footer>

        {/* --- STICKY MOBILE CTA --- */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-2xl border-t border-gray-100 p-4 md:hidden z-[110] flex items-center justify-between gap-4 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
          <div className="flex flex-col">
            <span className="text-gray-400 line-through text-[10px] font-black">498 zł</span>
            <div className="flex items-center gap-1">
              <span className="text-2xl font-black text-red-600">249 zł</span>
              <span className="bg-red-600 text-white text-[8px] px-1 rounded font-black">-50%</span>
            </div>
          </div>
          <a href="#order" className="flex-1 bg-red-600 text-white py-4 rounded-[1.5rem] font-black text-center uppercase tracking-widest shadow-2xl active:scale-95 transition-transform flex items-center justify-center gap-2 text-sm italic">
            UWOLNIJ SIĘ TERAZ <ArrowRight size={18} />
          </a>
        </div>

        <style jsx global>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            display: flex;
            width: fit-content;
            animation: scroll 20s linear infinite;
          }
          html { scroll-behavior: smooth; }
        `}</style>
      </div>
    </>
  );
}
