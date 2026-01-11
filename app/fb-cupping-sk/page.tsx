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
  offer: '2789',
  lp: '2822'
};

// --- DATA: 18 RECENZIÍ ---
const ALL_REVIEWS = [
  { user: "Marek B.", date: "14. februára 2024", title: "Už nikdy bez neho. Stojí za každý cent!", rating: 5, content: "Vyskúšal som veľa masážnych prístrojov, ale tento je na úplne inej úrovni. Nasávanie je veľmi silné a teplo je rajské. Po 10 minútach sú chrbát ako nový.", helpful: 84 },
  { user: "Anna F.", date: "2. februára 2024", title: "Zázračný na celulitídu", rating: 5, content: "Používam ho na stehnách každý večer. Už po týždni je koža pevnejšia. Trochu sčervenie, ale rýchlo zmizne - to znamená, že krv cirkuluje! Vrelo odporúčam.", helpful: 42 },
  { user: "Ivan M.", date: "28. januára 2024", title: "Skvelý pre športovcov", rating: 4, content: "Používam ho po behu. Veľmi pomáha s drenážou. 4 hviezdičky len preto, že by som preferoval trochu väčšiu batériu, ale nabíja sa rýchlo.", helpful: 15 },
  { user: "Petra G.", date: "20. januára 2024", title: "Zbohom bolesti krku!", rating: 5, content: "Dávam si ho na spodok krku po 8 hodinách pri počítači. Cítim, ako sa svaly doslova uvoľňujú pod nasávaním. Nemohla som urobiť lepší nákup.", helpful: 56 },
  { user: "Róbert P.", date: "12. januára 2024", title: "Šetrím kopu peňazí", rating: 5, content: "Predtým som chodil k fyzioterapeutovi každé dva týždne. Teraz so SlimWave riešim svalové uzly sám doma. Zaplatil sa za mesiac.", helpful: 129 },
  { user: "Mária T.", date: "5. januára 2024", title: "Kúpila som dva!", rating: 5, content: "Jeden pre mňa a jeden pre mamu. Ona trpí bolesťami v dolnej časti chrbta a toto jej pomohlo znova chodiť bez toho stáleho pocitu ťažoby. Fantastický darček.", helpful: 31 },
  { user: "František S.", date: "29. decembra 2023", title: "Vynikajúca kvalita spracovania", rating: 5, content: "Vidno, že to nie je obyčajný čínsky plast. Je robustný, displej je jasný a príslušenstvo je kvalitné. Veľmi spokojný s rýchlym doručením.", helpful: 22 },
  { user: "Elena V.", date: "22. decembra 2023", title: "Spím oveľa lepšie", rating: 5, content: "Používam ho 10 minút pred spaním na ramenách. Odstraňuje všetko napätie dňa a konečne spím 8 hodín v kuse.", helpful: 67 },
  { user: "Júlia L.", date: "15. decembra 2023", title: "Nohy ľahké ako pierko", rating: 5, content: "Pracujem postojačky celý deň. Večer mi nohy kričali. SlimWave reaktivuje cirkuláciu a opuch zmizne. Už nikdy ťažké nohy.", helpful: 48 },
  { user: "Mario D.", date: "8. decembra 2023", title: "Povinnosť pre fitko", rating: 4, content: "Používam ho na intenzívne DOMS-y na nohách. Pomáha urýchliť regeneráciu. Skvelý produkt, displej veľmi intuitívny.", helpful: 19 },
  { user: "Valentína R.", date: "1. decembra 2023", title: "Koža viditeľne zlepšená", rating: 5, content: "Okrem masáže som si všimla, že sa textúra kože na stehnách výrazne zlepšila. Zadržiavanie vody sa drasticky znížilo.", helpful: 53 },
  { user: "Anton K.", date: "24. novembra 2023", title: "Trafený darček", rating: 5, content: "Daroval som manželke. Stal sa jej obľúbeným predmetom. Používa ho každý deň. SlimWave zákaznícka podpora super dostupná.", helpful: 12 },
  { user: "Pavol M.", date: "18. novembra 2023", title: "Nosím ho aj na cesty", rating: 5, content: "Malý a výkonný. Keďže veľa cestujem pracovne, vždy mám stuhnutý krk. Toto vyrieši problém v hoteli za 5 minút.", helpful: 27 },
  { user: "Klára S.", date: "10. novembra 2023", title: "Lepšie ako som čakala", rating: 5, content: "Bola som skeptická, ale musela som zmeniť názor. Sila nasávania je pôsobivá. Používajte ho s trochou masážneho oleja!", helpful: 39 },
  { user: "Štefan F.", date: "2. novembra 2023", title: "Zbohom lieky proti bolesti", rating: 5, content: "Bral som ibuprofen takmer každý deň na bolesť chrbta. Odkedy používam SlimWave, už ho nepotrebujem. Mení život.", helpful: 91 },
  { user: "Sára O.", date: "25. októbra 2023", title: "Super drenážny", rating: 5, content: "Perfektný pre tých, čo trpia zadržiavaním. Používam ho pravidelne a vidím výsledky. Teplo veľmi pomáha relaxácii.", helpful: 14 },
  { user: "Michal B.", date: "15. októbra 2023", title: "Blesková dodávka", rating: 4, content: "Prišlo za menej ako 24 hodín. Balenie úhľadné. Produkt funguje dobre, len treba sa naučiť používať úrovne výkonu.", helpful: 8 },
  { user: "Frederika L.", date: "5. októbra 2023", title: "Neprekonateľný pomer ceny a kvality", rating: 5, content: "Za túto cenu nenájdete nič také profesionálne. Odporúčam všetkým svojim priateľkám.", helpful: 22 }
];

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

      router.push('/ty/ty-fb-cupping-sk');
    } catch (error) {
      console.error('[Network API] Error:', error);
      router.push('/ty/ty-fb-cupping-sk');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 md:p-12 rounded-[3rem] border-2 border-gray-200 shadow-[0_30px_60px_rgba(0,0,0,0.1)]">
        <div className="text-center mb-8">
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Špeciálna Ponuka</p>
          <h3 className="text-3xl font-black uppercase italic mb-4">1x SLIMWAVE™ PRO</h3>
          <div className="flex items-baseline justify-center gap-3 mb-6">
            <span className="text-5xl font-black text-red-600">€59,90</span>
            <span className="text-2xl text-gray-300 line-through">€119,00</span>
          </div>
          <ul className="flex flex-wrap justify-center gap-4 text-sm">
            <li className="flex gap-2 items-center font-bold"><CheckCircle2 className="text-green-500" size={18} /> SlimWave Pro zariadenie</li>
            <li className="flex gap-2 items-center font-bold"><CheckCircle2 className="text-green-500" size={18} /> USB-C kábel</li>
            <li className="flex gap-2 items-center font-bold"><CheckCircle2 className="text-green-500" size={18} /> 24 mesiacov záruka</li>
          </ul>
        </div>

        <div className="border-t border-gray-100 pt-8 mt-8">
          <p className="text-center text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Vyplňte pre objednávku na dobierku</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" name="tmfp" />
            <div>
              <label className="text-xs font-black uppercase text-gray-400 mb-1 block">Meno a Priezvisko</label>
              <input
                type="text"
                name="name"
                placeholder="Ján Novák"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:border-red-600 focus:outline-none transition-all font-bold"
              />
            </div>
            <div>
              <label className="text-xs font-black uppercase text-gray-400 mb-1 block">Adresa Doručenia</label>
              <input
                type="text"
                name="address"
                placeholder="Hlavná 10, 81101 Bratislava"
                required
                value={formData.address}
                onChange={handleChange}
                className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:border-red-600 focus:outline-none transition-all font-bold"
              />
            </div>
            <div>
              <label className="text-xs font-black uppercase text-gray-400 mb-1 block">Telefónne Číslo</label>
              <input
                type="tel"
                name="phone"
                placeholder="+421 900 123 456"
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
              {loading ? "SPRACOVÁVAM..." : "OBJEDNAŤ NA DOBIERKU"}
            </button>
            <div className="flex justify-center items-center gap-2 text-sm text-gray-500 mt-4">
              <Lock size={16} /> Vaše údaje sú bezpečné a šifrované
            </div>
            <p className="text-center text-xs text-gray-400 font-medium">
              Platíte kuriérovi pri doručení. Doprava zdarma.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

const OrderForm = () => (
  <Suspense fallback={<div className="py-20 text-center">Načítavam...</div>}>
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
            BLESKOVÁ PONUKA: -60% KONČÍ ZA {formatTime(timeLeft)} - POSLEDNÉ 4 KUSY DOSTUPNÉ!
          </div>
          <nav className="bg-white/90 backdrop-blur-xl border-b border-gray-100 py-3 px-4 flex justify-between items-center">
            <div className="text-xl md:text-2xl font-black tracking-tighter italic text-red-600">SLIMWAVE™</div>
            <a href="#order" className="bg-black text-white px-5 py-2 rounded-xl font-bold text-xs md:text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-lg">
              OBJEDNAŤ TERAZ
            </a>
          </nav>
        </header>

        <main className="pt-24 overflow-x-hidden">

          {/* --- HERO SECTION --- */}
          <section className="px-4 py-12 md:py-24 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest border border-red-100">
                <Activity size={14} /> Odporúčané 450+ Wellness Centrami
              </div>
              <h1 className="text-4xl md:text-7xl font-black leading-[0.95] tracking-tighter text-gray-900">
                BOLESŤ JE <br/> <span className="text-red-600">PARAZIT.</span> <br/>
                ZABI HO ZA <br className="hidden md:block"/> 5 MINÚT.
              </h1>
              <p className="text-lg md:text-2xl text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Prestaň vyhadzovať peniaze za lieky, ktoré ničia tvoj žalúdok. Vyskúšaj silu <span className="text-black font-bold">Inteligentného Cuppingu</span> a vráť sa k životu bez obmedzení.
              </p>
              <div className="flex flex-col gap-4 pt-4">
                <a href="#order" className="group flex items-center justify-center gap-3 bg-red-600 text-white px-8 py-5 md:py-7 rounded-[2rem] font-black text-xl md:text-3xl hover:bg-red-700 transition-all transform hover:scale-[1.03] shadow-[0_20px_50px_rgba(239,68,68,0.4)] uppercase italic">
                  Áno! Osloboď môj chrbát <ChevronRight className="group-hover:translate-x-2 transition-transform" size={28} />
                </a>
                <div className="flex justify-center lg:justify-start items-center gap-4 text-xs font-bold text-gray-400 uppercase">
                  <span className="flex items-center gap-1"><ShieldCheck size={16} className="text-green-500" /> Platba na dobierku</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span className="flex items-center gap-1"><Truck size={16} className="text-blue-500" /> Doručenie 24h</span>
                </div>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-red-600/10 blur-[120px] rounded-full"></div>
              <img
                src="/images/massaggiatore/37be453b-8d26-4dda-9172-db32f2c22b12.webp"
                alt="SlimWave Device"
                className="relative z-10 w-full max-w-lg mx-auto rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.2)] hover:rotate-3 transition-transform duration-700"
              />
              <div className="absolute -bottom-6 right-0 md:-right-10 bg-white p-6 rounded-[2rem] shadow-2xl z-20 border border-gray-100 flex items-center gap-4 animate-bounce duration-[3000ms]">
                <div className="bg-yellow-400 p-3 rounded-2xl"><TrendingUp size={24} className="text-white" /></div>
                <div>
                  <p className="font-black text-sm uppercase leading-none">Best Seller #1</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Kategória Zdravie 2026</p>
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
                TVOJE TELO ŤA <br/> <span className="text-red-600 underline decoration-white">TRESTÁ.</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { t: "SVALY AKO KAMEŇ", d: "Ramená a krk tak tvrdé, že nemôžeš otočiť hlavu.", i: "⛓️" },
                  { t: "CHRONICKÝ STRES", d: "To stále napätie, ktoré ti berie dych na konci dňa.", i: "🧨" },
                  { t: "ZASTOJ LYMFY", d: "Ťažké nohy a celulitída, ktoré nikdy nezmiznú.", i: "🌊" }
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
                  "Každý deň ignorovania bolesti je ďalší deň starnutia. Prevezmite kontrolu teraz alebo zaplatíte cenu o 10 rokov."
                </p>
              </div>
            </div>
          </section>

          {/* --- FEATURES --- */}
          <section className="py-24 px-4 max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-20">
              <div className="flex-1 space-y-12">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">KLINICKÁ <span className="text-red-600 italic">TECHNOLÓGIA</span> <br/> V DLANI RUKY</h2>
                <div className="space-y-8">
                  {[
                    { icon: <Flame className="text-orange-500" />, title: "ZAHRIEVANIE NA 50°C", desc: "Rozpúšťa tuky a napäté svalové vlákna za pár sekúnd, ako profesionálna masáž horúcimi kameňmi." },
                    { icon: <Zap className="text-blue-500" />, title: "DYNAMICKÁ SUKCIA", desc: "6 úrovní extrémneho vákua na odstránenie toxínov a okamžitú reaktiváciu krvného obehu." },
                    { icon: <UserCheck className="text-green-500" />, title: "LYMFATICKÁ DRENÁŽ", desc: "Eliminuje prebytočnú tekutinu a bojuje proti celulitíde pôsobením na príčinu, nie len na estetiku." }
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
                  POZRI SA NA <span className="text-red-600">SLIMWAVE™</span> V AKCII
                </h2>
                <p className="text-gray-400 font-medium">Objav, ako funguje a prečo si ho už vybrali tisíce Slovákov.</p>
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
                  Váš prehliadač nepodporuje video tag.
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
                    RECENZIE ZÁKAZNÍKOV <span className="bg-gray-200 text-gray-600 text-sm px-3 py-1 rounded-full font-bold">14.500+</span>
                  </h2>
                  <div className="flex items-center gap-4">
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => <Star key={i} size={22} fill="currentColor" />)}
                    </div>
                    <span className="text-2xl font-black">4.8 z 5</span>
                  </div>
                </div>
                <div className="text-right hidden md:block">
                  <p className="text-sm font-bold text-green-600 uppercase tracking-widest">✅ 100% Overené Nákupy</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="md:col-span-1 space-y-3">
                  {[5, 4, 3, 2, 1].map((s) => (
                    <div key={s} className="flex items-center gap-3 text-sm font-bold">
                      <span className="w-12">{s} hviezd</span>
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
                      <p className="text-xs text-gray-400">Recenzované na Slovensku {rev.date} - <span className="text-orange-600 font-bold uppercase">Overený nákup</span></p>
                      <p className="text-gray-700 leading-relaxed font-medium">{rev.content}</p>
                      <div className="flex items-center gap-4 pt-2">
                        <button className="px-5 py-1.5 border border-gray-300 rounded-lg text-xs font-bold hover:bg-gray-100 shadow-sm active:scale-95 transition-all">Užitočné</button>
                        <span className="text-xs text-gray-400 font-bold italic">{rev.helpful} ľudí to považuje za užitočné</span>
                      </div>
                    </div>
                  ))}

                  {visibleReviews < ALL_REVIEWS.length && (
                    <button
                      onClick={handleLoadMore}
                      className="w-full bg-white border-2 border-black text-black py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      Zobraziť ďalšie 3 recenzie ({ALL_REVIEWS.length - visibleReviews} zostáva) <ChevronDown />
                    </button>
                  )}
                  {visibleReviews >= ALL_REVIEWS.length && (
                    <p className="text-center text-gray-400 font-bold italic uppercase tracking-widest text-xs">Videli ste všetky najlepšie recenzie.</p>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* --- PRICING SECTION --- */}
          <section id="order" className="py-24 px-4 bg-white">
            <div className="max-w-5xl mx-auto space-y-16">
              <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-gray-900">VYBER SI SVOJ <span className="text-red-600 underline">LIEK.</span></h2>
                <div className="bg-red-600 text-white inline-block px-6 py-2 rounded-full font-black animate-bounce uppercase tracking-widest text-sm">
                  60% zľava len dnes
                </div>
                <div className="pt-8">
                  <img src="/images/massaggiatore/2ddb9d4e-3ca6-448e-bff0-db8c225f3c60.webp" alt="SlimWave Kit" className="max-w-md mx-auto rounded-3xl shadow-xl" />
                </div>
              </div>

              <OrderForm />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12">
                {[
                  { i: <ShieldCheck />, t: "Platba na dobierku" },
                  { i: <Truck />, t: "Doručenie 24/48h" },
                  { i: <Award />, t: "Oficiálna záruka" },
                  { i: <ShoppingBag />, t: "Jednoduchý návrat" }
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
              <h2 className="text-3xl md:text-5xl font-black text-center mb-12 uppercase italic">MÁTE <span className="text-red-600 underline">OTÁZKY?</span></h2>
              {[
                { q: "NAOZAJ POMÁHA PROTI BOLESTI?", a: "Áno. SlimWave™ kombinuje klinickú sukciu a termickú terapiu na uvoľnenie hlbokých svalov, kam ručné masáže nedosiahnu." },
                { q: "ZANECHÁVA STOPY NA KOŽI?", a: "Áno, cupping priťahuje krv na povrch a zanecháva červené kruhy. To je znak, že cirkulácia bola reaktivovaná. Zmiznú za 2-3 dni." },
                { q: "MÔŽEM PLATIŤ HOTOVOSŤOU?", a: "Samozrejme. Vyberte platbu na dobierku a zaplaťte priamo kuriérovi, keď príde na vašu adresu." },
                { q: "AKO DLHO VYDRŽÍ BATÉRIA?", a: "Približne 10-12 kompletných sedení po 15 minútach s jedným USB-C nabíjaním." }
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
            <div className="text-3xl font-black tracking-tighter italic text-red-600">SLIMWAVE™</div>
            <p className="text-gray-500 text-sm max-w-xl mx-auto font-medium uppercase tracking-widest leading-loose">
              SlimWave™ je registrovaná ochranná známka. <br/> Viac ako 1 milión ľudí si vybralo inteligentnú wellness technológiu. <br/>
              Sídlo: Bratislava, Slovensko.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase opacity-40 tracking-[0.3em]">
              <a href="#" className="hover:text-red-600">Zásady ochrany súkromia</a>
              <a href="#" className="hover:text-red-600">Obchodné podmienky</a>
              <a href="#" className="hover:text-red-600">Kontakt</a>
            </div>
            <p className="text-[10px] text-gray-800 pt-10 font-black uppercase">© 2024 SlimWave Slovensko. Všetky práva vyhradené.</p>
          </div>
        </footer>

        {/* --- STICKY MOBILE CTA --- */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-2xl border-t border-gray-100 p-4 md:hidden z-[110] flex items-center justify-between gap-4 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
          <div className="flex flex-col">
            <span className="text-gray-400 line-through text-[10px] font-black">€119,00</span>
            <div className="flex items-center gap-1">
              <span className="text-2xl font-black text-red-600">€59,90</span>
              <span className="bg-red-600 text-white text-[8px] px-1 rounded font-black">-60%</span>
            </div>
          </div>
          <a href="#order" className="flex-1 bg-red-600 text-white py-4 rounded-[1.5rem] font-black text-center uppercase tracking-widest shadow-2xl active:scale-95 transition-transform flex items-center justify-center gap-2 text-sm italic">
            OSLOBOĎ SA TERAZ <ArrowRight size={18} />
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
