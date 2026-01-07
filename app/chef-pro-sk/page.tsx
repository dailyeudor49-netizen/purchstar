'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Script from 'next/script';
import { useRouter, useSearchParams } from 'next/navigation';

// --- API CONFIG ---
const API_CONFIG = {
  url: 'https://offers.supertrendaffiliateprogram.com/forms/api/',
  uid: '0198088f-a4bc-7ed8-89aa-83089fe0180e',
  key: 'ec15cab563da6cf51f0c7c',
  offer: '203',
  lp: '203'
};

// --- DATA ---
const REVIEWS = [
  { name: "Mária B.", title: "Už si to neviem predstaviť bez neho! Zmenil mi život", rating: 5, date: "pred 2 dňami", text: "Bola som skeptická kvôli takej nízkej cene, ale je úžasný. Varí všetko sám, ľahko sa čistí a recepty sú zárukou úspechu. Dostal som ho do 48 hodín!", verified: true },
  { name: "Marek Kováč", title: "Kvalita nad očakávania", rating: 5, date: "pred týždňom", text: "Pevné materiály a veľmi silný motor. Včera večer som urobil rizoto a bolo perfektné, krémové ako v reštaurácii. Za 89 € je to dar.", verified: true },
  { name: "Valentína D.", title: "Skvelá kúpa", rating: 4, date: "pred 3 dňami", text: "Kúpil som ako darček pre mamu, teraz chce aj moja sestra. Displej je veľmi intuitívny.", verified: true },
  { name: "Jozef L.", title: "Balík prišiel nepoškodený a včas", rating: 5, date: "pred 4 dňami", text: "Kuriér bol veľmi milý. Zaplatil som v hotovosti podľa sľubu. Robot je masívny a robí veľa vecí. Odporúčam!", verified: true },
  { name: "Alexandra M.", title: "Nahrádza všetko v kuchyni", rating: 5, date: "pred 5 dňami", text: "Vyhodil som starý mixér a parný hrniec. Tento robí všetko. Obrazovka je veľká a dobre viditeľná.", verified: true },
  { name: "Róbert P.", title: "Pomer ceny a kvality neprekonateľný", rating: 5, date: "pred 6 dňami", text: "Videl som podobné produkty za 400 €. Tento za 89 € je príležitosť, ktorá sa neopakuje. Váha je veľmi presná.", verified: true },
  { name: "Elena G.", title: "Moja dcéra ho miluje", rating: 5, date: "pred týždňom", text: "Robíme spolu dezerty a pozeráme videorecepty. Stal sa to náš obľúbený moment dňa.", verified: true },
  { name: "Claudius S.", title: "Silný a tichý", rating: 4, date: "pred týždňom", text: "Očakával som, že bude hlučnejší pri miesení, ale je dosť tichý. Skvelý pre tých, čo bývajú v byte.", verified: true },
  { name: "Simona F.", title: "Jednoduché a chutné recepty", rating: 5, date: "pred 9 dňami", text: "Nie som dobrá vo varení, ale s návodom krok za krokom nerobím chyby. Môj manžel bol prekvapený!", verified: true },
  { name: "Lukáš T.", title: "Expresné doručenie", rating: 5, date: "pred 10 dňami", text: "Objednal som v pondelok, dostal som v stredu ráno. Perfektné balenie. Sada príslušenstva je naozaj kompletná.", verified: true },
  { name: "Sára W.", title: "Obrazovka je revolúcia", rating: 5, date: "pred 11 dňami", text: "Pozeranie videí počas varenia rozptýli všetky pochybnosti. Nikdy by som sa nevrátil k starým papierovým kuchárskym knihám.", verified: true },
  { name: "Pavel D.", title: "Skvelý na detskú stravu", rating: 5, date: "pred 12 dňami", text: "Dokonalé varenie na pare a mixovanie. Ideálny pre rodiny s malými deťmi.", verified: true },
  { name: "Marta N.", title: "Moderný a funkčný dizajn", rating: 5, date: "pred 2 týždňami", text: "Vyzerá skvele na kuchynskej linke. Biely, lesklý, veľmi elegantný. Ľahko sa rozoberá a umýva.", verified: true },
  { name: "Juraj B.", title: "Skutočná pomoc", rating: 4, date: "pred 2 týždňami", text: "Pomáha mi jesť zdravšie vďaka vareniu na pare. Jediná nevýhoda: chcel by som trochu dlhší kábel.", verified: true },
  { name: "Anna R.", title: "Super spokojná s nákupom", rating: 5, date: "pred 3 týždňami", text: "Používam ho každý deň. Od opekania po cesto, robí všetko. Je hodný oveľa viac ako stojí.", verified: true }
];

const ACCESSORIES = [
  { name: "XL Nádoba 4.5L", img: "/images/chef-pro/boccale.jpg" },
  { name: "Kompletná Parná Sada", img: "/images/chef-pro/vapore.jpg" },
  { name: "Varný Košík", img: "/images/chef-pro/cestello-di-cottura.jpg" },
  { name: "Miešacie Metličky", img: "/images/chef-pro/accessorio-mixer.jpg" },
  { name: "Silikónová Stierka", img: "/images/chef-pro/spatola.jpg" },
  { name: "Nerezové Čepele", img: "/images/chef-pro/lame.jpg" }
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

      // Google Ads Conversion
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
          'send_to': 'AW-17321474795/uDD1CPvtzs4bEOv1wsNA'
        });
      }

      router.push('/ty/ty-chef-pro-sk');
    } catch (error) {
      console.error('[Network API] Error:', error);
      router.push('/ty/ty-chef-pro-sk');
    }
  };

  if (orderStatus === 'success') {
    return (
      <div className="bg-white p-12 rounded-3xl shadow-2xl text-center border-4 border-green-500 animate-in zoom-in duration-500">
        <div className="text-7xl mb-6">✅</div>
        <h2 className="text-3xl font-black mb-4">OBJEDNÁVKA POTVRDENÁ!</h2>
        <p className="text-gray-600 mb-8 font-medium">Ďakujeme za nákup. Náš konzultant vám zavolá do 15 minút na potvrdenie údajov o doručení.</p>
        <div className="p-4 bg-green-50 text-green-700 font-bold rounded-2xl">
          Váš balík príde do 24/48h. Pripravte si 89 € v hotovosti pre kuriéra!
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border-4 border-rose-600 relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-rose-600 text-white px-6 py-2 rounded-bl-2xl font-black text-xs uppercase tracking-tighter">
        Doprava Zadarmo
      </div>
      <div className="text-center mb-10 mt-4">
        <h2 className="text-3xl font-black uppercase mb-2">Objednajte Teraz</h2>
        <p className="text-rose-600 font-bold uppercase text-sm">Platba pri prevzatí</p>
      </div>
      <form onSubmit={handleOrder} className="space-y-6">
        <input type="hidden" name="tmfp" />
        <div className="space-y-2">
          <label className="block text-sm font-black text-gray-700 uppercase">Meno a Priezvisko *</label>
          <input
            required
            type="text"
            name="name"
            placeholder="napr. Ján Novák"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-rose-600 outline-none transition-colors font-medium"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-black text-gray-700 uppercase">Telefón (pre kuriéra) *</label>
          <input
            required
            type="tel"
            name="phone"
            placeholder="napr. 0900 123 456"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-rose-600 outline-none transition-colors font-medium"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-black text-gray-700 uppercase">Úplná Adresa *</label>
          <input
            required
            type="text"
            name="address"
            placeholder="Ulica, Číslo, Mesto, PSČ"
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
          ) : "Potvrdiť Objednávku ➔"}
        </button>
        <p className="text-[10px] text-center text-gray-400 leading-tight">
          Odoslaním objednávky súhlasíte s obchodnými podmienkami. Vaše údaje sú chránené 256-bitovým SSL šifrovaním.
        </p>
      </form>
    </div>
  );
};

const OrderForm = ({ formRef }: { formRef: React.RefObject<HTMLDivElement | null> }) => (
  <section ref={formRef} className="py-24 px-6 bg-rose-50 scroll-mt-20">
    <div className="max-w-md mx-auto">
      <Suspense fallback={<div className="py-20 text-center">Načítava sa...</div>}>
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
    const names = ["Marek", "Elena", "Jozef", "Sára", "Lukáš", "Alexandra", "Róbert"];
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

      <div className="bg-gray-50 min-h-screen font-sans text-gray-900 selection:bg-rose-100 selection:text-rose-600">

        {/* Top Urgency Bar */}
        <div className="bg-black text-white py-2 text-center text-[10px] md:text-xs font-bold uppercase tracking-widest sticky top-0 z-[60]">
          🔥 <span className="text-rose-500">Výpredajová</span> ponuka končí za: <span className="text-yellow-400">{formatTime(timeLeft)}</span> - Zostáva len 12 kusov
        </div>

        <main className="max-w-4xl mx-auto bg-white shadow-2xl relative">

          {/* HERO */}
          <section className="p-6 md:p-12 text-center">
            <div className="inline-block bg-rose-600 text-white px-4 py-1 rounded-full text-xs font-black uppercase mb-6 animate-bounce">
              Okamžitá Zľava -70%
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-none mb-6 tracking-tighter">
              VARTE AKO PROFESIONÁL ZA IBA <span className="text-rose-600">89 €</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto font-medium">
              Najlepší Inteligentný Kuchynský Robot. Nahradí 15 zariadení. Video recepty a ovládanie cez aplikáciu.
            </p>

            <div className="relative max-w-lg mx-auto mb-10 group">
              <img
                src="/images/chef-pro/monsieur-cuisine-smart.jpg"
                alt="Inteligentný Kuchynský Robot"
                className="w-full h-auto rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -top-6 -right-6 bg-yellow-400 text-black w-28 h-28 rounded-full flex flex-col items-center justify-center font-black shadow-2xl rotate-12 border-4 border-white animate-pulse">
                <span className="text-sm line-through opacity-60">297 €</span>
                <span className="text-2xl italic">89 €</span>
              </div>
            </div>

            <button
              onClick={scrollToForm}
              className="w-full max-w-md bg-rose-600 text-white text-2xl font-black py-6 rounded-2xl shadow-[0_10px_0_0_#9f1239] hover:shadow-[0_5px_0_0_#9f1239] hover:translate-y-1 active:scale-95 transition-all uppercase tracking-tight"
            >
              Áno! Chcem za 89 € ➔
            </button>
            <p className="mt-6 text-green-600 font-bold flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
              Platba pri prevzatí a Doprava Zadarmo
            </p>
          </section>

          {/* AGGRESSIVE BANNER */}
          <div className="bg-rose-600 text-white py-10 px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-4 leading-tight">
              ⚠️ POZOR: POSLEDNÉ KUSY NA SKLADE ⚠️
            </h2>
            <p className="text-lg opacity-90 font-medium">
              Vyprázdňujeme sklad pred obnovením zásob. <br className="hidden md:block"/>
              Po vypredaní sa cena vráti na 297 €. Nenechajte si ujsť túto jedinečnú príležitosť!
            </p>
          </div>

          {/* SMART FEATURES SECTION */}
          <section className="py-16 px-6 bg-gray-50">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">Technológia Budúcnosti</h2>
              <div className="h-2 w-24 bg-rose-600 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
              <div className="order-2 md:order-1">
                <span className="text-rose-600 font-black uppercase text-sm tracking-widest">8" HD Displej</span>
                <h3 className="text-3xl font-black mt-2 mb-6 leading-tight">Integrované Video Recepty: Nemožné urobiť chybu!</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Pozerajte šéfkuchárov pripravujúcich jedlo spolu s vami. Robot vás vedie krok za krokom pomocou <strong>videí vo vysokom rozlíšení</strong> priamo na dotykovej obrazovke. Zastavte a pokračujte kedykoľvek chcete.
                </p>
                <ul className="space-y-4">
                  {["Viac ako 1200 nahratých video receptov", "Bezplatné aktualizácie cez Wi-Fi", "Inteligentný hlasový sprievodca"].map((t, i) => (
                    <li key={i} className="flex items-center gap-3 font-bold text-gray-800">
                      <span className="bg-green-100 text-green-600 p-1 rounded-full">✓</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 md:order-2">
                <img src="/images/chef-pro/monsieur-cuisine-smart (1).jpg" className="rounded-3xl shadow-2xl border-8 border-white" alt="Video recepty" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <img src="/images/chef-pro/monsieur-cuisine-smart (2).jpg" className="rounded-3xl shadow-2xl border-8 border-white" alt="Aplikácia pre smartfón" />
              </div>
              <div>
                <span className="text-rose-600 font-black uppercase text-sm tracking-widest">Dedikovaná Aplikácia</span>
                <h3 className="text-3xl font-black mt-2 mb-6 leading-tight">Ovládajte Všetko zo Smartfónu</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Ste v práci? Vyberte recept z aplikácie a odošlite ho do robota. Vytvárajte nákupné zoznamy, plánujte jedlá a dostávajte upozornenia, keď je večera hotová.
                </p>
                <ul className="space-y-4">
                  {["Kompatibilný s iOS a Android", "Týždenný plánovač", "Inteligentný nákupný zoznam"].map((t, i) => (
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
              <h2 className="text-4xl font-black uppercase mb-4">NAJKOMPLETNEJŠIA SADA V HISTÓRII</h2>
              <p className="text-gray-400 italic">Všetko v cene 89 € - Hodnota príslušenstva samostatne: 149 €</p>
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
            <h2 className="text-3xl font-black mb-10 tracking-tighter">Recenzie zákazníkov</h2>

            <div className="flex flex-col md:flex-row gap-12 mb-16 border-b border-gray-100 pb-12">
              <div className="w-full md:w-1/3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-yellow-500 text-2xl">★★★★★</div>
                  <span className="text-xl font-black text-gray-900">4.8 z 5</span>
                </div>
                <p className="text-gray-500 text-sm mb-6">1 452 globálnych hodnotení</p>

                <div className="space-y-3">
                  {[
                    { s: 5, p: 88 },
                    { s: 4, p: 9 },
                    { s: 3, p: 2 },
                    { s: 2, p: 1 },
                    { s: 1, p: 0 }
                  ].map((row) => (
                    <div key={row.s} className="flex items-center gap-4 group cursor-pointer">
                      <span className="text-sm text-blue-600 hover:underline min-w-[50px]">{row.s} hviezd</span>
                      <div className="flex-1 h-5 bg-gray-100 rounded-sm overflow-hidden">
                        <div className="h-full bg-yellow-400 group-hover:bg-yellow-500 transition-colors" style={{ width: `${row.p}%` }}></div>
                      </div>
                      <span className="text-sm text-gray-500 min-w-[30px]">{row.p}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 md:border-l border-gray-100 md:pl-12">
                <h3 className="text-xl font-bold mb-3">Ohodnoťte tento produkt</h3>
                <p className="text-gray-600 mb-6">Podeľte sa o svoje kulinárske skúsenosti s ostatnými používateľmi.</p>
                <button className="w-full md:w-auto px-10 py-2.5 border border-gray-300 rounded-lg font-bold shadow-sm hover:bg-gray-50 transition-colors">
                  Napísať recenziu zákazníka
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
                  <p className="text-xs text-gray-500 mb-3">Hodnotené na Slovensku {rev.date}</p>
                  {rev.verified && <p className="text-xs font-black text-orange-700 mb-3">Overený nákup</p>}
                  <p className="text-gray-800 leading-relaxed mb-6">{rev.text}</p>
                  <div className="flex items-center gap-6">
                    <button className="px-8 py-1.5 border border-gray-300 rounded-lg text-sm font-medium shadow-sm hover:bg-gray-50">Užitočné</button>
                    <button className="text-gray-400 text-sm hover:underline">Nahlásiť</button>
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
                ) : "Zobraziť viac recenzií"}
              </button>
            )}
          </section>

          {/* ORDER FORM SECTION */}
          <OrderForm formRef={formRef} />

          {/* TRUST BADGES */}
          <section className="py-16 bg-white border-t border-gray-100 px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
              {[
                { t: "Doručenie 24/48h", icon: "🚚" },
                { t: "2 Roky Záruka", icon: "🛡️" },
                { t: "Spokojnosť alebo Vrátenie", icon: "💎" },
                { t: "Slovenská Podpora", icon: "🇸🇰" }
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
            <p>© 2024 RoboChef Slovensko - Affiliate Predaj</p>
            <div className="flex justify-center gap-6 mt-4 font-bold uppercase">
              <a href="#" className="hover:text-rose-600 transition-colors">Súkromie</a>
              <a href="#" className="hover:text-rose-600 transition-colors">Podmienky</a>
              <a href="#" className="hover:text-rose-600 transition-colors">Kontakt</a>
            </div>
          </footer>

        </main>

        {/* MOBILE STICKY CTA */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-gray-200 z-50 md:hidden flex items-center justify-between gap-4 animate-in slide-in-from-bottom duration-500">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase text-gray-400">Ponuka</span>
            <span className="text-3xl font-black text-rose-600 leading-none">89 €</span>
          </div>
          <button
            onClick={scrollToForm}
            className="flex-1 bg-rose-600 text-white font-black py-4 rounded-xl shadow-xl animate-pulse uppercase text-sm tracking-tighter"
          >
            Objednať 1 Kliknutím
          </button>
        </div>

        {/* SOCIAL PROOF POPUP */}
        <div className={`fixed bottom-24 left-4 right-4 md:left-8 md:right-auto md:w-80 bg-white shadow-2xl rounded-2xl p-4 border-l-8 border-green-500 transition-all duration-700 z-[70] ${showNotification ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-90 pointer-events-none'}`}>
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-2 rounded-full text-green-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase">Posledný Nákup</p>
              <p className="text-sm font-black text-gray-900">{notificationName} práve objednal RoboChef Smart!</p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
