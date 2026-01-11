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
  offer: '2790',
  lp: '2823'
};

// --- DATA: 18 RECENZIJ ---
const ALL_REVIEWS = [
  { user: "Marko B.", date: "14. februar 2024", title: "Nikoli več brez njega. Vreden vsakega centa!", rating: 5, content: "Preizkusil sem veliko maserjev, vendar je ta na povsem drugi ravni. Sesanje je zelo močno, toplota pa rajska. Po 10 minutah so hrbet kot nov.", helpful: 84 },
  { user: "Ana F.", date: "2. februar 2024", title: "Čudežen za celulit", rating: 5, content: "Uporabljam ga na stegnih vsak večer. Že po tednu dni je koža čvrstejša. Malo pordi, vendar hitro izgine - to pomeni, da kri kroži! Toplo priporočam.", helpful: 42 },
  { user: "Ivan M.", date: "28. januar 2024", title: "Odličen za športnike", rating: 4, content: "Uporabljam ga po teku. Zelo pomaga pri drenaži. 4 zvezdice samo zato, ker bi raje imel malo večjo baterijo, vendar se hitro polni.", helpful: 15 },
  { user: "Petra G.", date: "20. januar 2024", title: "Adijo bolečina v vratu!", rating: 5, content: "Dajem si ga na spodnji del vratu po 8 urah za računalnikom. Čutim, kako se mišice dobesedno sproščajo pod sesanjem. Nisem mogla narediti boljšega nakupa.", helpful: 56 },
  { user: "Robert P.", date: "12. januar 2024", title: "Prihranim kup denarja", rating: 5, content: "Prej sem hodil k fizioterapevtu vsaka dva tedna. Zdaj s SlimWave rešujem mišične vozle sam doma. Poplačal se je v enem mesecu.", helpful: 129 },
  { user: "Maja T.", date: "5. januar 2024", title: "Kupila sem dva!", rating: 5, content: "Enega zame in enega za mamo. Ona trpi za bolečinami v spodnjem delu hrbta in to ji je pomagalo, da spet hodi brez tega stalnega občutka teže. Fantastično darilo.", helpful: 31 },
  { user: "Franc S.", date: "29. december 2023", title: "Odlična kakovost izdelave", rating: 5, content: "Vidi se, da to ni običajna kitajska plastika. Je robusten, zaslon je jasen, dodatki pa kakovostni. Zelo zadovoljen s hitro dostavo.", helpful: 22 },
  { user: "Elena V.", date: "22. december 2023", title: "Spim veliko bolje", rating: 5, content: "Uporabljam ga 10 minut pred spanjem na ramenih. Odstrani vso napetost dneva in končno spim 8 ur neprekinjeno.", helpful: 67 },
  { user: "Julija L.", date: "15. december 2023", title: "Noge lahke kot pero", rating: 5, content: "Delam stoje cel dan. Zvečer so mi noge kričale. SlimWave ponovno aktivira cirkulacijo in oteklina izgine. Nikoli več težke noge.", helpful: 48 },
  { user: "Mario D.", date: "8. december 2023", title: "Obvezno za fitnes", rating: 4, content: "Uporabljam ga za intenzivne DOMS-e na nogah. Pomaga pospešiti okrevanje. Odličen izdelek, zaslon zelo intuitiven.", helpful: 19 },
  { user: "Valentina R.", date: "1. december 2023", title: "Koža vidno izboljšana", rating: 5, content: "Poleg masaže sem opazila, da se je tekstura kože na stegnih zelo izboljšala. Zadrževanje vode se je drastično zmanjšalo.", helpful: 53 },
  { user: "Anton K.", date: "24. november 2023", title: "Zadetek darilo", rating: 5, content: "Podaril sem ženi. Postal je njen najljubši predmet. Uporablja ga vsak dan. SlimWave podpora strankam super dosegljiva.", helpful: 12 },
  { user: "Pavel M.", date: "18. november 2023", title: "Nosim ga tudi na potovanja", rating: 5, content: "Majhen in zmogljiv. Ker veliko potujem služ beno, imam vedno otrpel vrat. To reši problem v hotelu v 5 minutah.", helpful: 27 },
  { user: "Klara S.", date: "10. november 2023", title: "Boljše od pričakovanj", rating: 5, content: "Bila sem skeptična, vendar sem morala spremeniti mnenje. Moč sesanja je impresivna. Uporabljajte ga z malo masažnega olja!", helpful: 39 },
  { user: "Štefan F.", date: "2. november 2023", title: "Adijo zdravila proti bolečinam", rating: 5, content: "Jemal sem ibuprofen skoraj vsak dan za bolečine v hrbtu. Odkar uporabljam SlimWave, ga ne potrebujem več. Spreminja življenje.", helpful: 91 },
  { user: "Sara O.", date: "25. oktober 2023", title: "Super drenažni", rating: 5, content: "Popoln za tiste, ki trpijo zaradi zadrževanja. Uporabljam ga redno in vidim rezultate. Toplota zelo pomaga pri sprostitvi.", helpful: 14 },
  { user: "Miha B.", date: "15. oktober 2023", title: "Bliskovita dostava", rating: 4, content: "Prispelo v manj kot 24 urah. Embalaža urejena. Izdelek deluje dobro, le naučiti se je treba uporabljati stopnje moči.", helpful: 8 },
  { user: "Federika L.", date: "5. oktober 2023", title: "Nepremagljivo razmerje cene in kakovosti", rating: 5, content: "Za to ceno ne najdete nič tako profesionalnega. Priporočam vsem svojim prijateljicam.", helpful: 22 }
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

      router.push('/ty/ty-fb-cupping-sl');
    } catch (error) {
      console.error('[Network API] Error:', error);
      router.push('/ty/ty-fb-cupping-sl');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 md:p-12 rounded-[3rem] border-2 border-gray-200 shadow-[0_30px_60px_rgba(0,0,0,0.1)]">
        <div className="text-center mb-8">
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Posebna Ponudba</p>
          <h3 className="text-3xl font-black uppercase italic mb-4">1x SLIMWAVE™ PRO</h3>
          <div className="flex items-baseline justify-center gap-3 mb-6">
            <span className="text-5xl font-black text-red-600">€59,90</span>
            <span className="text-2xl text-gray-300 line-through">€119,00</span>
          </div>
          <ul className="flex flex-wrap justify-center gap-4 text-sm">
            <li className="flex gap-2 items-center font-bold"><CheckCircle2 className="text-green-500" size={18} /> SlimWave Pro naprava</li>
            <li className="flex gap-2 items-center font-bold"><CheckCircle2 className="text-green-500" size={18} /> USB-C kabel</li>
            <li className="flex gap-2 items-center font-bold"><CheckCircle2 className="text-green-500" size={18} /> 24 mesecev garancije</li>
          </ul>
        </div>

        <div className="border-t border-gray-100 pt-8 mt-8">
          <p className="text-center text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Izpolnite za naročilo po povzetju</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" name="tmfp" />
            <div>
              <label className="text-xs font-black uppercase text-gray-400 mb-1 block">Ime in Priimek</label>
              <input
                type="text"
                name="name"
                placeholder="Janez Novak"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:border-red-600 focus:outline-none transition-all font-bold"
              />
            </div>
            <div>
              <label className="text-xs font-black uppercase text-gray-400 mb-1 block">Naslov Dostave</label>
              <input
                type="text"
                name="address"
                placeholder="Slovenska cesta 10, 1000 Ljubljana"
                required
                value={formData.address}
                onChange={handleChange}
                className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:border-red-600 focus:outline-none transition-all font-bold"
              />
            </div>
            <div>
              <label className="text-xs font-black uppercase text-gray-400 mb-1 block">Telefonska Številka</label>
              <input
                type="tel"
                name="phone"
                placeholder="+386 40 123 456"
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
              {loading ? "OBDELUJEM..." : "NAROČI PO POVZETJU"}
            </button>
            <div className="flex justify-center items-center gap-2 text-sm text-gray-500 mt-4">
              <Lock size={16} /> Vaši podatki so varni in šifrirani
            </div>
            <p className="text-center text-xs text-gray-400 font-medium">
              Plačate kurirju ob dostavi. Brezplačna dostava.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

const OrderForm = () => (
  <Suspense fallback={<div className="py-20 text-center">Nalagam...</div>}>
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
            BLISKOVITA PONUDBA: -60% SE KONČA ČEZ {formatTime(timeLeft)} - ZADNJI 4 KOSI NA VOLJO!
          </div>
          <nav className="bg-white/90 backdrop-blur-xl border-b border-gray-100 py-3 px-4 flex justify-between items-center">
            <div className="text-xl md:text-2xl font-black tracking-tighter italic text-red-600">SLIMWAVE™</div>
            <a href="#order" className="bg-black text-white px-5 py-2 rounded-xl font-bold text-xs md:text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-lg">
              NAROČI ZDAJ
            </a>
          </nav>
        </header>

        <main className="pt-24 overflow-x-hidden">

          {/* --- HERO SECTION --- */}
          <section className="px-4 py-12 md:py-24 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest border border-red-100">
                <Activity size={14} /> Priporočeno s strani 450+ Wellness Centrov
              </div>
              <h1 className="text-4xl md:text-7xl font-black leading-[0.95] tracking-tighter text-gray-900">
                BOLEČINA JE <br/> <span className="text-red-600">PARAZIT.</span> <br/>
                UBIJ GA V <br className="hidden md:block"/> 5 MINUTAH.
              </h1>
              <p className="text-lg md:text-2xl text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Nehaj zapravljati denar za zdravila, ki uničujejo tvoj želodec. Preizkusi moč <span className="text-black font-bold">Pametnega Cuppinga</span> in se vrni k življenju brez omejitev.
              </p>
              <div className="flex flex-col gap-4 pt-4">
                <a href="#order" className="group flex items-center justify-center gap-3 bg-red-600 text-white px-8 py-5 md:py-7 rounded-[2rem] font-black text-xl md:text-3xl hover:bg-red-700 transition-all transform hover:scale-[1.03] shadow-[0_20px_50px_rgba(239,68,68,0.4)] uppercase italic">
                  Da! Osvobodi moj hrbet <ChevronRight className="group-hover:translate-x-2 transition-transform" size={28} />
                </a>
                <div className="flex justify-center lg:justify-start items-center gap-4 text-xs font-bold text-gray-400 uppercase">
                  <span className="flex items-center gap-1"><ShieldCheck size={16} className="text-green-500" /> Plačilo po povzetju</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span className="flex items-center gap-1"><Truck size={16} className="text-blue-500" /> Dostava 24h</span>
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
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Kategorija Zdravje 2026</p>
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
                TVOJE TELO TE <br/> <span className="text-red-600 underline decoration-white">KAZNUJE.</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { t: "MIŠICE KOT KAMEN", d: "Ramena in vrat tako trda, da ne moreš obrniti glave.", i: "⛓️" },
                  { t: "KRONIČNI STRES", d: "Ta stalna napetost, ki ti jemlje dih ob koncu dneva.", i: "🧨" },
                  { t: "ZASTOJ LIMFE", d: "Težke noge in celulit, ki nikoli ne izgineta.", i: "🌊" }
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
                  "Vsak dan ignoriranja bolečine je še en dan staranja. Prevzemi nadzor zdaj ali boš plačal ceno čez 10 let."
                </p>
              </div>
            </div>
          </section>

          {/* --- FEATURES --- */}
          <section className="py-24 px-4 max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-20">
              <div className="flex-1 space-y-12">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">KLINIČNA <span className="text-red-600 italic">TEHNOLOGIJA</span> <br/> V DLANI ROKE</h2>
                <div className="space-y-8">
                  {[
                    { icon: <Flame className="text-orange-500" />, title: "OGREVANJE NA 50°C", desc: "Topi maščobe in napeta mišična vlakna v nekaj sekundah, kot profesionalna masaža z vročimi kamni." },
                    { icon: <Zap className="text-blue-500" />, title: "DINAMIČNO SESANJE", desc: "6 stopenj ekstremnega vakuuma za odstranjevanje toksinov in takojšnjo reaktivacijo krvnega obtoka." },
                    { icon: <UserCheck className="text-green-500" />, title: "LIMFNA DRENAŽA", desc: "Odpravlja odvečno tekočino in se bori proti celulitu z delovanjem na vzrok, ne le na estetiko." }
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
                  POGLEJ <span className="text-red-600">SLIMWAVE™</span> V AKCIJI
                </h2>
                <p className="text-gray-400 font-medium">Odkrij, kako deluje in zakaj so ga že izbrali tisoči Slovencev.</p>
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
                  Vaš brskalnik ne podpira video oznake.
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
                    OCENE STRANK <span className="bg-gray-200 text-gray-600 text-sm px-3 py-1 rounded-full font-bold">14.500+</span>
                  </h2>
                  <div className="flex items-center gap-4">
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => <Star key={i} size={22} fill="currentColor" />)}
                    </div>
                    <span className="text-2xl font-black">4.8 od 5</span>
                  </div>
                </div>
                <div className="text-right hidden md:block">
                  <p className="text-sm font-bold text-green-600 uppercase tracking-widest">✅ 100% Preverjeni Nakupi</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="md:col-span-1 space-y-3">
                  {[5, 4, 3, 2, 1].map((s) => (
                    <div key={s} className="flex items-center gap-3 text-sm font-bold">
                      <span className="w-12">{s} zvezdic</span>
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
                      <p className="text-xs text-gray-400">Ocenjeno v Sloveniji {rev.date} - <span className="text-orange-600 font-bold uppercase">Preverjen nakup</span></p>
                      <p className="text-gray-700 leading-relaxed font-medium">{rev.content}</p>
                      <div className="flex items-center gap-4 pt-2">
                        <button className="px-5 py-1.5 border border-gray-300 rounded-lg text-xs font-bold hover:bg-gray-100 shadow-sm active:scale-95 transition-all">Koristno</button>
                        <span className="text-xs text-gray-400 font-bold italic">{rev.helpful} ljudem se zdi to koristno</span>
                      </div>
                    </div>
                  ))}

                  {visibleReviews < ALL_REVIEWS.length && (
                    <button
                      onClick={handleLoadMore}
                      className="w-full bg-white border-2 border-black text-black py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      Prikaži še 3 ocene ({ALL_REVIEWS.length - visibleReviews} preostalo) <ChevronDown />
                    </button>
                  )}
                  {visibleReviews >= ALL_REVIEWS.length && (
                    <p className="text-center text-gray-400 font-bold italic uppercase tracking-widest text-xs">Videli ste vse najboljše ocene.</p>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* --- PRICING SECTION --- */}
          <section id="order" className="py-24 px-4 bg-white">
            <div className="max-w-5xl mx-auto space-y-16">
              <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-gray-900">IZBERI SVOJE <span className="text-red-600 underline">ZDRAVILO.</span></h2>
                <div className="bg-red-600 text-white inline-block px-6 py-2 rounded-full font-black animate-bounce uppercase tracking-widest text-sm">
                  60% popust samo danes
                </div>
                <div className="pt-8">
                  <img src="/images/massaggiatore/2ddb9d4e-3ca6-448e-bff0-db8c225f3c60.webp" alt="SlimWave Kit" className="max-w-md mx-auto rounded-3xl shadow-xl" />
                </div>
              </div>

              <OrderForm />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12">
                {[
                  { i: <ShieldCheck />, t: "Plačilo po povzetju" },
                  { i: <Truck />, t: "Dostava 24/48h" },
                  { i: <Award />, t: "Uradna garancija" },
                  { i: <ShoppingBag />, t: "Enostavna vrnitev" }
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
              <h2 className="text-3xl md:text-5xl font-black text-center mb-12 uppercase italic">IMATE <span className="text-red-600 underline">VPRAŠANJA?</span></h2>
              {[
                { q: "RES POMAGA PROTI BOLEČINI?", a: "Da. SlimWave™ kombinira klinično sesanje in termično terapijo za sprostitev globokih mišic, kamor ročne masaže ne dosežejo." },
                { q: "PUŠČA SLEDI NA KOŽI?", a: "Da, cupping privlači kri na površino in pušča rdeče kroge. To je znak, da je bila cirkulacija reaktivirana. Izginejo v 2-3 dneh." },
                { q: "ALI LAHKO PLAČAM Z GOTOVINO?", a: "Seveda. Izberite plačilo po povzetju in plačajte neposredno kurirju, ko pride na vaš naslov." },
                { q: "KAKO DOLGO ZDRŽI BATERIJA?", a: "Približno 10-12 popolnih sej po 15 minut z enim USB-C polnjenjem." }
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
              SlimWave™ je registrirana blagovna znamka. <br/> Več kot 1 milijon ljudi je izbralo pametno wellness tehnologijo. <br/>
              Sedež: Ljubljana, Slovenija.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase opacity-40 tracking-[0.3em]">
              <a href="#" className="hover:text-red-600">Politika zasebnosti</a>
              <a href="#" className="hover:text-red-600">Pogoji uporabe</a>
              <a href="#" className="hover:text-red-600">Kontakt</a>
            </div>
            <p className="text-[10px] text-gray-800 pt-10 font-black uppercase">© 2024 SlimWave Slovenija. Vse pravice pridržane.</p>
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
            OSVOBODI SE ZDAJ <ArrowRight size={18} />
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
