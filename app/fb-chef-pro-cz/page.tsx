'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Script from 'next/script';
import { useRouter, useSearchParams } from 'next/navigation';

// --- API CONFIG ---
const API_CONFIG = {
  url: 'https://offers.italiadrop.com/forms/api/',
  uid: '019be4ed-80e5-7970-ab86-1938a865c187',
  key: 'd05dde623c227395880400',
  offer: '2878',
  lp: '2917'
};

// --- DATA ---
const REVIEWS = [
  { name: "Frantiska B.", title: "Uz si to bez neho nedovedu predstavit! Zmenilo mi to zivot", rating: 5, date: "pred 2 dny", text: "Byla jsem skepticka kvuli tak nizke cene, ale je uzasny. Vari vsechno sam, snadno se cisti a recepty jsou zaruka uspechu. Dostal jsem ho do 48 hodin!", verified: true },
  { name: "Marek Novak", title: "Kvalita nad ocekavani", rating: 5, date: "pred 1 tydnem", text: "Solidni materialy a velmi silny motor. Vcera vecer jsem udelal rizoto a bylo perfektni, kremove jako v restauraci. Za 2201 Kc je to darek.", verified: true },
  { name: "Valentyna D.", title: "Skvely nakup", rating: 4, date: "pred 3 dny", text: "Koupil jsem to jako darek pro mamu, ted chce moje sestra taky. Displej je velmi intuitivni.", verified: true },
  { name: "Josef L.", title: "Balik dorazil neporuseny a vcas", rating: 5, date: "pred 4 dny", text: "Kurier byl velmi mily. Zaplatil jsem hotove, jak bylo slibeno. Robot je masivni a dela spoustu veci. Doporucuji!", verified: true },
  { name: "Aleksandra M.", title: "Nahradi vsechno v kuchyni", rating: 5, date: "pred 5 dny", text: "Vyhodil jsem stary mixer a parovac. Tenhle dela vsechno. Obrazovka je velka a dobre citelna.", verified: true },
  { name: "Robert P.", title: "Pomer kvality a ceny je neprekonatelny", rating: 5, date: "pred 6 dny", text: "Videl jsem podobne produkty za 20000 Kc. Tento za 2201 Kc je prilezitost, ktera se neopakuje. Vaha je velmi presna.", verified: true },
  { name: "Elena G.", title: "Moje dcera ho miluje", rating: 5, date: "pred 1 tydnem", text: "Spolecne pripravujeme dezerty a divame se na videorecepty. Stal se z toho nas oblibeny moment dne.", verified: true },
  { name: "Klaudius S.", title: "Silny a tichy", rating: 4, date: "pred 1 tydnem", text: "Cekal jsem, ze bude hlucnejsi pri hneteni, ale je docela tichy. Skvely pro byty v panelovych domech.", verified: true },
  { name: "Simona F.", title: "Jednoduche a chutne recepty", rating: 5, date: "pred 9 dny", text: "Nejsem dobra v vareni, ale s pruvodcem krok za krokem nedelam chyby. Muj muz byl prekvapeny!", verified: true },
  { name: "Lukas T.", title: "Bleskova doprava", rating: 5, date: "pred 10 dny", text: "Objednal jsem v pondeli, dostal jsem ve stredu rano. Perfektni baleni. Sada prislusenstvi je opravdu kompletni.", verified: true },
  { name: "Sara W.", title: "Obrazovka je revoluce", rating: 5, date: "pred 11 dny", text: "Sledovani videi behem vareni rozptyluji vsechny pochybnosti. Nikdy bych se nevratil ke starym paperovym kucharkam.", verified: true },
  { name: "Pavel D.", title: "Skvely pro detskou vyzivu", rating: 5, date: "pred 12 dny", text: "Perfektni vareni v pare a mixovani. Idealni pro rodiny s malymi detmi.", verified: true },
  { name: "Marta N.", title: "Moderni a funkcni design", rating: 5, date: "pred 2 tydny", text: "Skvele vypada na kuchynske desce. Bily, leskly, velmi elegantni. Snadne rozebirani a mytí.", verified: true },
  { name: "Jiri B.", title: "Skutecna pomoc", rating: 4, date: "pred 2 tydny", text: "Pomaha mi jist zdraveji diky vareni v pare. Jedina nevyhoda: chtel bych, aby kabel byl trochu delsi.", verified: true },
  { name: "Anna R.", title: "Super spokojeny s nakupem", rating: 5, date: "pred 3 tydny", text: "Pouzivam ho kazdy den. Od restovani po pecivo, dela vsechno. Stoji za mnohem vic, nez kolik stoji.", verified: true }
];

const ACCESSORIES = [
  { name: "XL nadoba 4.5L", img: "/images/chef-pro/boccale.jpg" },
  { name: "Kompletni sada pro vareni v pare", img: "/images/chef-pro/vapore.jpg" },
  { name: "Varici kosik", img: "/images/chef-pro/cestello-di-cottura.jpg" },
  { name: "Motylkove mipadlo", img: "/images/chef-pro/accessorio-mixer.jpg" },
  { name: "Silikonova stipatka", img: "/images/chef-pro/spatola.jpg" },
  { name: "Nerezove cepele", img: "/images/chef-pro/lame.jpg" }
];

// --- ORDER FORM COMPONENT ---
const OrderFormContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderStatus, setOrderStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderStatus('loading');

    try {
      const form = e.currentTarget as HTMLFormElement;
      const tmfpInput = form.querySelector('input[name="tmfp"]') as HTMLInputElement;
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

      // Google Ads Conversion
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
          'send_to': 'AW-17321474795/U6NiCJPW1c4bEOv1wsNA'
        });
      }

      router.push('/ty/ty-fb-chef-pro-cz');
    } catch (error) {
      console.error('[Network API] Error:', error);
      router.push('/ty/ty-fb-chef-pro-cz');
    }
  };

  if (orderStatus === 'success') {
    return (
      <div className="bg-white p-12 rounded-3xl shadow-2xl text-center border-4 border-green-500 animate-in zoom-in duration-500">
        <div className="text-7xl mb-6">✅</div>
        <h2 className="text-3xl font-black mb-4">OBJEDNAVKA POTVRZENA!</h2>
        <p className="text-gray-600 mb-8 font-medium">Dekujeme za vas nakup. Nas konzultant vam zavola do 15 minut pro potvrzeni udaju o doruceni.</p>
        <div className="p-4 bg-green-50 text-green-700 font-bold rounded-2xl">
          Vas balik dorazi behem 24/48 hodin. Pripravte si 2201 Kc v hotovosti pro kuriera!
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border-4 border-rose-600 relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-rose-600 text-white px-6 py-2 rounded-bl-2xl font-black text-xs uppercase tracking-tighter">
        Doprava Zdarma
      </div>
      <div className="text-center mb-10 mt-4">
        <h2 className="text-3xl font-black uppercase mb-2">Objednejte Nyni</h2>
        <p className="text-rose-600 font-bold uppercase text-sm">Platba pri prevzeti</p>
      </div>
      <form onSubmit={handleOrder} className="space-y-6">
        <input type="hidden" name="tmfp" />
        <div className="space-y-2">
          <label className="block text-sm font-black text-gray-700 uppercase">Jmeno a Prijmeni *</label>
          <input
            required
            type="text"
            name="name"
            placeholder="napr. Jan Novak"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-rose-600 outline-none transition-colors font-medium"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-black text-gray-700 uppercase">Telefon (pro kuriera) *</label>
          <input
            required
            type="tel"
            name="phone"
            placeholder="napr. 600 123 456"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-rose-600 outline-none transition-colors font-medium"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-black text-gray-700 uppercase">Uplna Adresa *</label>
          <input
            required
            type="text"
            name="address"
            placeholder="Ulice, Cislo, Mesto, PSC"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-rose-600 outline-none transition-colors font-medium"
          />
        </div>

        <button
          disabled={orderStatus === 'loading'}
          className="w-full bg-rose-600 text-white text-2xl font-black py-6 rounded-2xl shadow-[0_10px_0_0_#9f1239] active:translate-y-1 active:shadow-none transition-all uppercase mt-8 flex items-center justify-center"
        >
          {orderStatus === 'loading' ? (
            <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : "Potvrdit Objednavku ➔"}
        </button>
        <p className="text-[10px] text-center text-gray-400 leading-tight">
          Odeslanim objednavky prijimate podminky prodeje. Vase data jsou chranena 256bitovym SSL sifrovamim.
        </p>
      </form>
    </div>
  );
};

const OrderForm = ({ formRef }: { formRef: React.RefObject<HTMLDivElement | null> }) => (
  <section ref={formRef} className="py-24 px-6 bg-rose-50 scroll-mt-20">
    <div className="max-w-md mx-auto">
      <Suspense fallback={<div className="py-20 text-center">Nacitani...</div>}>
        <OrderFormContent />
      </Suspense>
    </div>
  </section>
);

// --- MAIN COMPONENT ---
export default function LandingPage() {
  const [timeLeft, setTimeLeft] = useState(600);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationName, setNotificationName] = useState("");

  const formRef = useRef<HTMLDivElement>(null);

  // Timer scarcity
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(prev => prev > 0 ? prev - 1 : 0), 1000);
    return () => clearInterval(timer);
  }, []);

  // Social Proof
  useEffect(() => {
    const names = ["Marek", "Elena", "Josef", "Sara", "Lukas", "Aleksandra", "Robert"];
    const interval = setInterval(() => {
      setNotificationName(names[Math.floor(Math.random() * names.length)]);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 4000);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth' });

  const loadMoreReviews = () => {
    setIsLoadingReviews(true);
    setTimeout(() => {
      setVisibleReviews(prev => Math.min(prev + 3, REVIEWS.length));
      setIsLoadingReviews(false);
    }, 600);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

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
        src="https://offers.italiadrop.com/forms/tmfp/"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      {/* Click Tracking Pixel */}
      <img
        src={`https://offers.italiadrop.com/forms/api/ck/?o=${API_CONFIG.offer}&uid=${API_CONFIG.uid}&lp=${API_CONFIG.lp}`}
        style={{ width: '1px', height: '1px', display: 'none' }}
        alt=""
      />

      <div className="bg-gray-50 min-h-screen font-sans text-gray-900 selection:bg-rose-100 selection:text-rose-600">

        {/* Top Urgency Bar */}
        <div className="bg-black text-white py-2 text-center text-[10px] md:text-xs font-bold uppercase tracking-widest sticky top-0 z-[60]">
          🔥 <span className="text-rose-500">Vyprodejova</span> nabidka konci za: <span className="text-yellow-400">{formatTime(timeLeft)}</span> - Zbyva pouze 12 kusu
        </div>

        <main className="max-w-4xl mx-auto bg-white shadow-2xl relative">

          {/* HERO */}
          <section className="p-6 md:p-12 text-center">
            <div className="inline-block bg-rose-600 text-white px-4 py-1 rounded-full text-xs font-black uppercase mb-6 animate-bounce">
              Okamzita Sleva -70%
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-none mb-6 tracking-tighter">
              VARTE JAKO PROFESIONAL JEN ZA <span className="text-rose-600">2201 Kc</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto font-medium">
              Nejlepsi Inteligentni Kuchynsky Robot. Nahradi 15 spotrebicu. Videorecepty a ovladani pres aplikaci.
            </p>

            <div className="relative max-w-lg mx-auto mb-10 group">
              <img
                src="/images/chef-pro/monsieur-cuisine-smart.jpg"
                alt="Inteligentni Kuchynsky Robot"
                className="w-full h-auto rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -top-6 -right-6 bg-yellow-400 text-black w-28 h-28 rounded-full flex flex-col items-center justify-center font-black shadow-2xl rotate-12 border-4 border-white animate-pulse">
                <span className="text-sm line-through opacity-60">7299 Kc</span>
                <span className="text-2xl italic">2201 Kc</span>
              </div>
            </div>

            <button
              onClick={scrollToForm}
              className="w-full max-w-md bg-rose-600 text-white text-2xl font-black py-6 rounded-2xl shadow-[0_10px_0_0_#9f1239] hover:shadow-[0_5px_0_0_#9f1239] hover:translate-y-1 active:scale-95 transition-all uppercase tracking-tight"
            >
              Ano! Chci za 2201 Kc ➔
            </button>
            <p className="mt-6 text-green-600 font-bold flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
              Platba pri prevzeti a Doprava Zdarma
            </p>
          </section>

          {/* AGGRESSIVE BANNER */}
          <div className="bg-rose-600 text-white py-10 px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-4 leading-tight">
              ⚠️ POZOR: POSLEDNI KUSY NA SKLADE ⚠️
            </h2>
            <p className="text-lg opacity-90 font-medium">
              Vyprazdnujeme sklad pred doplnenim zasob. <br className="hidden md:block"/>
              Po vyprodani se cena vrati na 7299 Kc. Nenechte si ujit tuto vyjimecnou prilezitost!
            </p>
          </div>

          {/* SMART FEATURES SECTION */}
          <section className="py-16 px-6 bg-gray-50">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">Technologie Budoucnosti</h2>
              <div className="h-2 w-24 bg-rose-600 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
              <div className="order-2 md:order-1">
                <span className="text-rose-600 font-black uppercase text-sm tracking-widest">8" HD Displej</span>
                <h3 className="text-3xl font-black mt-2 mb-6 leading-tight">Integrovane Videorecepty: Nelze udelat chybu!</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Sledujte sefkuchare, jak pripravuji jidlo spolecne s vami. Robot vas vede krok za krokem diky <strong>videim ve vysokem rozliseni</strong> primo na dotykovem displeji. Pozastavujte a pokracujte kdykoli chcete.
                </p>
                <ul className="space-y-4">
                  {["Pres 1200 nahranech videoreceptu", "Bezplatne aktualizace pres Wi-Fi", "Inteligentni hlasovy pruvodce"].map((t, i) => (
                    <li key={i} className="flex items-center gap-3 font-bold text-gray-800">
                      <span className="bg-green-100 text-green-600 p-1 rounded-full">✓</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 md:order-2">
                <img src="/images/chef-pro/monsieur-cuisine-smart (1).jpg" className="rounded-3xl shadow-2xl border-8 border-white" alt="Videorecepty" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <img src="/images/chef-pro/monsieur-cuisine-smart (2).jpg" className="rounded-3xl shadow-2xl border-8 border-white" alt="Aplikace pro smartphone" />
              </div>
              <div>
                <span className="text-rose-600 font-black uppercase text-sm tracking-widest">Specialni Aplikace</span>
                <h3 className="text-3xl font-black mt-2 mb-6 leading-tight">Ovladejte Vse ze Smartphonu</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Jste v praci? Vyberte recept z aplikace a poslete ho do robota. Vytvarejte nakupni seznamy, planujte jidla a dostanete upozorneni, kdyz je vecere hotova.
                </p>
                <ul className="space-y-4">
                  {["Kompatibilni s iOS a Android", "Tydenni planovac", "Inteligentni nakupni seznam"].map((t, i) => (
                    <li key={i} className="flex items-center gap-3 font-bold text-gray-800">
                      <span className="bg-green-100 text-green-600 p-1 rounded-full">✓</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ACCESSORIES BUNDLE */}
          <section className="py-20 bg-gray-900 text-white px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black uppercase mb-4">NEJKOMPLETNEJSI SADA V HISTORII</h2>
              <p className="text-gray-400 italic">Vse v cene 2201 Kc - Hodnota prislusenstvi samostatne: 3649 Kc</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {ACCESSORIES.map((acc, idx) => (
                <div key={idx} className="bg-gray-800 p-4 rounded-2xl border border-gray-700 text-center group hover:border-rose-500 transition-colors">
                  <img src={acc.img} alt={acc.name} className="w-full aspect-square object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform" />
                  <p className="font-bold text-sm uppercase">{acc.name}</p>
                </div>
              ))}
            </div>
          </section>

          {/* AMAZON REVIEWS SECTION */}
          <section className="py-20 px-6 border-t border-gray-100">
            <h2 className="text-3xl font-black mb-10 tracking-tighter">Recenze zakazniku</h2>

            <div className="flex flex-col md:flex-row gap-12 mb-16 border-b border-gray-100 pb-12">
              <div className="w-full md:w-1/3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-yellow-500 text-2xl">★★★★★</div>
                  <span className="text-xl font-black text-gray-900">4.8 z 5</span>
                </div>
                <p className="text-gray-500 text-sm mb-6">1 452 globalnich hodnoceni</p>

                <div className="space-y-3">
                  {[
                    { s: 5, p: 88 },
                    { s: 4, p: 9 },
                    { s: 3, p: 2 },
                    { s: 2, p: 1 },
                    { s: 1, p: 0 }
                  ].map((row) => (
                    <div key={row.s} className="flex items-center gap-4 group cursor-pointer">
                      <span className="text-sm text-blue-600 hover:underline min-w-[50px]">{row.s} hvezd</span>
                      <div className="flex-1 h-5 bg-gray-100 rounded-sm overflow-hidden">
                        <div className="h-full bg-yellow-400 group-hover:bg-yellow-500 transition-colors" style={{ width: `${row.p}%` }}></div>
                      </div>
                      <span className="text-sm text-gray-500 min-w-[30px]">{row.p}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 md:border-l border-gray-100 md:pl-12">
                <h3 className="text-xl font-bold mb-3">Ohodnotte tento produkt</h3>
                <p className="text-gray-600 mb-6">Podelte se o svou kucharskou zkusenost s ostatnimi uzivateli.</p>
                <button className="w-full md:w-auto px-10 py-2.5 border border-gray-300 rounded-lg font-bold shadow-sm hover:bg-gray-50 transition-colors">
                  Napsat recenzi zakaznika
                </button>
              </div>
            </div>

            <div className="space-y-12">
              {REVIEWS.slice(0, visibleReviews).map((rev, i) => (
                <div key={i} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                    </div>
                    <span className="font-bold text-sm">{rev.name}</span>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex text-yellow-500 text-xs">{"★".repeat(rev.rating)}{"☆".repeat(5-rev.rating)}</div>
                    <h4 className="font-black text-gray-900">{rev.title}</h4>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">Hodnoceno v Cesku {rev.date}</p>
                  {rev.verified && <p className="text-xs font-black text-orange-700 mb-3">Overeny nakup</p>}
                  <p className="text-gray-800 leading-relaxed mb-6">{rev.text}</p>
                  <div className="flex items-center gap-6">
                    <button className="px-8 py-1.5 border border-gray-300 rounded-lg text-sm font-medium shadow-sm hover:bg-gray-50">Uzitecne</button>
                    <button className="text-gray-400 text-sm hover:underline">Nahlasit</button>
                  </div>
                </div>
              ))}
            </div>

            {visibleReviews < REVIEWS.length && (
              <button
                onClick={loadMoreReviews}
                disabled={isLoadingReviews}
                className="w-full mt-16 py-4 border-2 border-gray-200 rounded-xl font-black text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-3"
              >
                {isLoadingReviews ? (
                  <div className="w-6 h-6 border-4 border-gray-300 border-t-rose-600 rounded-full animate-spin"></div>
                ) : "Zobrazit dalsi recenze"}
              </button>
            )}
          </section>

          {/* ORDER FORM SECTION */}
          <OrderForm formRef={formRef} />

          {/* TRUST BADGES */}
          <section className="py-16 bg-white border-t border-gray-100 px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
              {[
                { t: "Doruceni 24/48h", icon: "🚚" },
                { t: "Zaruka 2 Roky", icon: "🛡️" },
                { t: "Spokojenost nebo Vraceni", icon: "💎" },
                { t: "Podpora v Cesku", icon: "🇨🇿" }
              ].map((badge, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <p className="text-[10px] font-black uppercase tracking-widest">{badge.t}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FOOTER */}
          <footer className="py-12 bg-gray-50 border-t border-gray-200 px-6 text-center text-[10px] text-gray-400">
            <p>© 2024 RoboChef Cesko - Afiliační Prodej</p>
            <div className="flex justify-center gap-6 mt-4 font-bold uppercase">
              <a href="#" className="hover:text-rose-600 transition-colors">Soukromi</a>
              <a href="#" className="hover:text-rose-600 transition-colors">Podminky</a>
              <a href="#" className="hover:text-rose-600 transition-colors">Kontakt</a>
            </div>
          </footer>

        </main>

        {/* MOBILE STICKY CTA */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-gray-200 z-50 md:hidden flex items-center justify-between gap-4 animate-in slide-in-from-bottom duration-500">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase text-gray-400">Nabidka</span>
            <span className="text-3xl font-black text-rose-600 leading-none">2201 Kc</span>
          </div>
          <button
            onClick={scrollToForm}
            className="flex-1 bg-rose-600 text-white font-black py-4 rounded-xl shadow-xl animate-pulse uppercase text-sm tracking-tighter"
          >
            Objednat 1 Kliknutim
          </button>
        </div>

        {/* SOCIAL PROOF POPUP */}
        <div className={`fixed bottom-24 left-4 right-4 md:left-8 md:right-auto md:w-80 bg-white shadow-2xl rounded-2xl p-4 border-l-8 border-green-500 transition-all duration-700 z-[70] ${showNotification ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-90 pointer-events-none'}`}>
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-2 rounded-full text-green-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase">Posledni Nakup</p>
              <p className="text-sm font-black text-gray-900">{notificationName} prave objednal RoboChef Smart!</p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
