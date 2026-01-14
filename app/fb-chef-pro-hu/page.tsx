'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Script from 'next/script';
import { useRouter, useSearchParams } from 'next/navigation';

// --- API CONFIG ---
const API_CONFIG = {
  url: 'https://offers.supertrendaffiliateprogram.com/forms/api/',
  uid: '0198088f-a4bc-7ed8-89aa-83089fe0180e',
  key: 'ec15cab563da6cf51f0c7c',
  offer: '206',
  lp: '206'
};

// --- DATA ---
const REVIEWS = [
  { name: "Borbala B.", title: "Mar el sem tudom kepzelni nelkule! Megvaltoztatta az eletemet", rating: 5, date: "2 napja", text: "Szkeptikus voltam az alacsony ar miatt, de fantasztikus. Mindent magatol foz, konnyen tisztithato, es a receptek garantalt sikerek. 48 oran belul megkaptam!", verified: true },
  { name: "Marton Kovacs", title: "Minoseg a varakozason felul", rating: 5, date: "1 hete", text: "Szilard anyagok es nagyon eros motor. Tegnap este rizottot keszitettem, es tokeletes volt, kremes, mint egy etteremben. 34 599 Ft-ert ez egy ajandek.", verified: true },
  { name: "Valeria D.", title: "Kivalo vetel", rating: 4, date: "3 napja", text: "Anyukamnak vettem ajandekba, most a hugom is akar egyet. A kijelzo nagyon intuitiv.", verified: true },
  { name: "Jozsef L.", title: "A csomag sertetlenul es idoben erkezett", rating: 5, date: "4 napja", text: "A futar nagyon kedves volt. Keszpenzzel fizettem, ahogy igertek. A robot massziv es rengeteg mindent csinal. Ajanlom!", verified: true },
  { name: "Alexandra M.", title: "Mindent helyettesit a konyhaban", rating: 5, date: "5 napja", text: "Kidobtam a regi turmixgepet es a parolot. Ez mindent megcsinal. A kepernyo nagy es jol olvashato.", verified: true },
  { name: "Robert P.", title: "Az ar-ertek arany verhetetetlen", rating: 5, date: "6 napja", text: "Lattam hasonlo termekeket 400 000 Ft-ert. Ez 34 599 Ft-ert olyan lehetoseg, ami nem ismetlodik meg. A merleg nagyon pontos.", verified: true },
  { name: "Elena G.", title: "A lanyom imadja", rating: 5, date: "1 hete", text: "Egyutt keszitunk desszerteket es nezunk videorecepteket. Ez lett a nap kedvenc pillanata.", verified: true },
  { name: "Kalman S.", title: "Eros es csendes", rating: 4, date: "1 hete", text: "Azt vartam, hogy hangosabb lesz dagasztas kozben, de eleg csendes. Kivalo panellakasokhoz.", verified: true },
  { name: "Simona F.", title: "Egyszeru es finom receptek", rating: 5, date: "9 napja", text: "Nem vagyok jo a fozesben, de a lepesrol lepesre vezetovel nem hibazok. A ferjem meglepodott!", verified: true },
  { name: "Laszlo T.", title: "Villamsebessegu szallitas", rating: 5, date: "10 napja", text: "Hetfon rendeltem, szerdan reggel megkaptam. Tokeletes csomagolas. A tartozekkeszlet tenyleg teljes.", verified: true },
  { name: "Sara W.", title: "A kepernyo forradalmi", rating: 5, date: "11 napja", text: "A videok nezese fozes kozben minden ketseget eloszlat. Soha nem ternek vissza a regi papir szakacskonyvekhez.", verified: true },
  { name: "Pal D.", title: "Kivalo babaetelhez", rating: 5, date: "12 napja", text: "Tokeletes parolas es turmixolas. Idealis kisgyermekes csaladoknak.", verified: true },
  { name: "Marta N.", title: "Modern es funkcionalis design", rating: 5, date: "2 hete", text: "Remekul mutat a konyha pultjan. Feher, fenyes, nagyon elegans. Konnyu szetszedni es mosni.", verified: true },
  { name: "Gyorgy B.", title: "Igazi segitseg", rating: 4, date: "2 hete", text: "Segit egeszsegesen enni a parolasnak koszonhetoen. Egyetlen hatranya: szeretnem, ha a kabel kicsit hosszabb lenne.", verified: true },
  { name: "Anna R.", title: "Nagyon elegedett vagyok a vasarlassal", rating: 5, date: "3 hete", text: "Minden nap hasznalom. A pirritastol a sutemenyig mindent megcsinal. Sokkal tobbet er, mint amennyibe kerul.", verified: true }
];

const ACCESSORIES = [
  { name: "XL Tarto 4.5L", img: "/images/chef-pro/boccale.jpg" },
  { name: "Teljes Parolo Keszlet", img: "/images/chef-pro/vapore.jpg" },
  { name: "Fozo Kosar", img: "/images/chef-pro/cestello-di-cottura.jpg" },
  { name: "Pillango Keveropenge", img: "/images/chef-pro/accessorio-mixer.jpg" },
  { name: "Szilikon Lapocka", img: "/images/chef-pro/spatola.jpg" },
  { name: "Rozsdamentes Pengek", img: "/images/chef-pro/lame.jpg" }
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

      router.push('/ty/ty-fb-chef-pro-hu');
    } catch (error) {
      console.error('[Network API] Error:', error);
      router.push('/ty/ty-fb-chef-pro-hu');
    }
  };

  if (orderStatus === 'success') {
    return (
      <div className="bg-white p-12 rounded-3xl shadow-2xl text-center border-4 border-green-500 animate-in zoom-in duration-500">
        <div className="text-7xl mb-6">✅</div>
        <h2 className="text-3xl font-black mb-4">RENDELES VISSZAIGAZOLVA!</h2>
        <p className="text-gray-600 mb-8 font-medium">Koszonjuk a vasarlasat. Tanacsadonk 15 percen belul felhivja a szallitasi adatok megerositesere.</p>
        <div className="p-4 bg-green-50 text-green-700 font-bold rounded-2xl">
          Csomagja 24/48 oran belul erkezik. Keszitsen elo 34 599 Ft keszpenzt a futarnak!
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border-4 border-rose-600 relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-rose-600 text-white px-6 py-2 rounded-bl-2xl font-black text-xs uppercase tracking-tighter">
        Ingyenes Szallitas
      </div>
      <div className="text-center mb-10 mt-4">
        <h2 className="text-3xl font-black uppercase mb-2">Rendeljen Most</h2>
        <p className="text-rose-600 font-bold uppercase text-sm">Fizetes atvetelkor</p>
      </div>
      <form onSubmit={handleOrder} className="space-y-6">
        <input type="hidden" name="tmfp" />
        <div className="space-y-2">
          <label className="block text-sm font-black text-gray-700 uppercase">Nev *</label>
          <input
            required
            type="text"
            name="name"
            placeholder="pl. Kovacs Janos"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-rose-600 outline-none transition-colors font-medium"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-black text-gray-700 uppercase">Telefon (futarnak) *</label>
          <input
            required
            type="tel"
            name="phone"
            placeholder="pl. 06 30 123 4567"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-rose-600 outline-none transition-colors font-medium"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-black text-gray-700 uppercase">Teljes Cim *</label>
          <input
            required
            type="text"
            name="address"
            placeholder="Utca, Hazszam, Varos, Iranyitoszam"
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
          ) : "Rendeles Megerositese ➔"}
        </button>
        <p className="text-[10px] text-center text-gray-400 leading-tight">
          A rendeles elkuldesevel elfogadja az ertekesitesi felteteleket. Adatait 256 bites SSL titkositas vedi.
        </p>
      </form>
    </div>
  );
};

const OrderForm = ({ formRef }: { formRef: React.RefObject<HTMLDivElement | null> }) => (
  <section ref={formRef} className="py-24 px-6 bg-rose-50 scroll-mt-20">
    <div className="max-w-md mx-auto">
      <Suspense fallback={<div className="py-20 text-center">Betoltes...</div>}>
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
    const names = ["Marton", "Elena", "Jozsef", "Sara", "Laszlo", "Alexandra", "Robert"];
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
          🔥 <span className="text-rose-500">Kirusitasi</span> ajanlat vege: <span className="text-yellow-400">{formatTime(timeLeft)}</span> - Csak 12 darab maradt
        </div>

        <main className="max-w-4xl mx-auto bg-white shadow-2xl relative">

          {/* HERO */}
          <section className="p-6 md:p-12 text-center">
            <div className="inline-block bg-rose-600 text-white px-4 py-1 rounded-full text-xs font-black uppercase mb-6 animate-bounce">
              Azonnali Kedvezmeny -70%
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-none mb-6 tracking-tighter">
              FOZZÖN MINT EGY PROFI CSAK <span className="text-rose-600">34 599 Ft</span>-ERT
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto font-medium">
              A Legjobb Intelligens Konyhai Robot. 15 keszuleket helyettesit. Videoreceptek es alkalmazas vezerles.
            </p>

            <div className="relative max-w-lg mx-auto mb-10 group">
              <img
                src="/images/chef-pro/monsieur-cuisine-smart.jpg"
                alt="Intelligens Konyhai Robot"
                className="w-full h-auto rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -top-6 -right-6 bg-yellow-400 text-black w-32 h-32 rounded-full flex flex-col items-center justify-center font-black shadow-2xl rotate-12 border-4 border-white animate-pulse">
                <span className="text-xs line-through opacity-60">114 999 Ft</span>
                <span className="text-xl italic">34 599 Ft</span>
              </div>
            </div>

            <button
              onClick={scrollToForm}
              className="w-full max-w-md bg-rose-600 text-white text-2xl font-black py-6 rounded-2xl shadow-[0_10px_0_0_#9f1239] hover:shadow-[0_5px_0_0_#9f1239] hover:translate-y-1 active:scale-95 transition-all uppercase tracking-tight"
            >
              Igen! Kerem 34 599 Ft-ert ➔
            </button>
            <p className="mt-6 text-green-600 font-bold flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
              Fizetes Atvetelkor es Ingyenes Szallitas
            </p>
          </section>

          {/* AGGRESSIVE BANNER */}
          <div className="bg-rose-600 text-white py-10 px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-4 leading-tight">
              ⚠️ FIGYELEM: UTOLSO DARABOK RAKTARON ⚠️
            </h2>
            <p className="text-lg opacity-90 font-medium">
              Kiuritjuk a raktart a keszlet feltoltese elott. <br className="hidden md:block"/>
              Kifogytas utan az ar visszater 114 999 Ft-ra. Ne hagyja ki ezt a kivalo lehetoseget!
            </p>
          </div>

          {/* SMART FEATURES SECTION */}
          <section className="py-16 px-6 bg-gray-50">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">A Jovo Technologiaja</h2>
              <div className="h-2 w-24 bg-rose-600 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
              <div className="order-2 md:order-1">
                <span className="text-rose-600 font-black uppercase text-sm tracking-widest">8" HD Kijelzo</span>
                <h3 className="text-3xl font-black mt-2 mb-6 leading-tight">Integralt Videoreceptek: Lehetetlen Hibazni!</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Nezze vegig, ahogy a sefszekacsok elkeszitik az etelt Onnel egyutt. A robot lepesrol lepesre vezeti <strong>nagy felbontasu videokkal</strong> kozvetlenul az erintokepernyon. Megallithatja es folytathata barrmikor.
                </p>
                <ul className="space-y-4">
                  {["Tobb mint 1200 feltoltott videoreceptp", "Ingyenes Wi-Fi frissitesek", "Intelligens hangvezeto"].map((t, i) => (
                    <li key={i} className="flex items-center gap-3 font-bold text-gray-800">
                      <span className="bg-green-100 text-green-600 p-1 rounded-full">✓</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 md:order-2">
                <img src="/images/chef-pro/monsieur-cuisine-smart (1).jpg" className="rounded-3xl shadow-2xl border-8 border-white" alt="Videoreceptek" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <img src="/images/chef-pro/monsieur-cuisine-smart (2).jpg" className="rounded-3xl shadow-2xl border-8 border-white" alt="Okostelefon alkalmazas" />
              </div>
              <div>
                <span className="text-rose-600 font-black uppercase text-sm tracking-widest">Dedikalt Alkalmazas</span>
                <h3 className="text-3xl font-black mt-2 mb-6 leading-tight">Vezerelsen Mindent az Okostelefonjarol</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Munkahelyen van? Valasszon ki egy receptet az alkalmazasbol es kuldje el a robotnak. Keszitsen bevasarlolistat, tervezze meg az etkezeseket, es kapjon ertesitest, amikor kesz a vacsora.
                </p>
                <ul className="space-y-4">
                  {["iOS es Android kompatibilis", "Heti tervezo", "Intelligens bevasarlolista"].map((t, i) => (
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
              <h2 className="text-4xl font-black uppercase mb-4">A LEGTELJESEBB KESZLET A TORTENELEMBEN</h2>
              <p className="text-gray-400 italic">Minden 34 599 Ft arban - Tartozekok erteke kulon: 64 900 Ft</p>
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
            <h2 className="text-3xl font-black mb-10 tracking-tighter">Vasarloi velemenyek</h2>

            <div className="flex flex-col md:flex-row gap-12 mb-16 border-b border-gray-100 pb-12">
              <div className="w-full md:w-1/3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-yellow-500 text-2xl">★★★★★</div>
                  <span className="text-xl font-black text-gray-900">4.8 az 5-bol</span>
                </div>
                <p className="text-gray-500 text-sm mb-6">1 452 globalis ertekeles</p>

                <div className="space-y-3">
                  {[
                    { s: 5, p: 88 },
                    { s: 4, p: 9 },
                    { s: 3, p: 2 },
                    { s: 2, p: 1 },
                    { s: 1, p: 0 }
                  ].map((row) => (
                    <div key={row.s} className="flex items-center gap-4 group cursor-pointer">
                      <span className="text-sm text-blue-600 hover:underline min-w-[50px]">{row.s} csillag</span>
                      <div className="flex-1 h-5 bg-gray-100 rounded-sm overflow-hidden">
                        <div className="h-full bg-yellow-400 group-hover:bg-yellow-500 transition-colors" style={{ width: `${row.p}%` }}></div>
                      </div>
                      <span className="text-sm text-gray-500 min-w-[30px]">{row.p}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 md:border-l border-gray-100 md:pl-12">
                <h3 className="text-xl font-bold mb-3">Ertekellje ezt a termerket</h3>
                <p className="text-gray-600 mb-6">Ossza meg fozesi elmenyet mas felhasznalokkal.</p>
                <button className="w-full md:w-auto px-10 py-2.5 border border-gray-300 rounded-lg font-bold shadow-sm hover:bg-gray-50 transition-colors">
                  Vasarloi velemeny irasa
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
                  <p className="text-xs text-gray-500 mb-3">Ertekelve Magyarorszagon {rev.date}</p>
                  {rev.verified && <p className="text-xs font-black text-orange-700 mb-3">Ellenorzott vasarlas</p>}
                  <p className="text-gray-800 leading-relaxed mb-6">{rev.text}</p>
                  <div className="flex items-center gap-6">
                    <button className="px-8 py-1.5 border border-gray-300 rounded-lg text-sm font-medium shadow-sm hover:bg-gray-50">Hasznos</button>
                    <button className="text-gray-400 text-sm hover:underline">Jelentes</button>
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
                ) : "Tobb velemeny megjelenitese"}
              </button>
            )}
          </section>

          {/* ORDER FORM SECTION */}
          <OrderForm formRef={formRef} />

          {/* TRUST BADGES */}
          <section className="py-16 bg-white border-t border-gray-100 px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
              {[
                { t: "Szallitas 24/48 ora", icon: "🚚" },
                { t: "2 Ev Garancia", icon: "🛡️" },
                { t: "Elegedettseg vagy Visszaterites", icon: "💎" },
                { t: "Magyar Ugyfelszolgalat", icon: "🇭🇺" }
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
            <p>© 2024 RoboChef Magyarorszag - Affiliate Ertekesites</p>
            <div className="flex justify-center gap-6 mt-4 font-bold uppercase">
              <a href="#" className="hover:text-rose-600 transition-colors">Adatvedelem</a>
              <a href="#" className="hover:text-rose-600 transition-colors">Feltetelek</a>
              <a href="#" className="hover:text-rose-600 transition-colors">Kapcsolat</a>
            </div>
          </footer>

        </main>

        {/* MOBILE STICKY CTA */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-gray-200 z-50 md:hidden flex items-center justify-between gap-4 animate-in slide-in-from-bottom duration-500">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase text-gray-400">Ajanlat</span>
            <span className="text-2xl font-black text-rose-600 leading-none">34 599 Ft</span>
          </div>
          <button
            onClick={scrollToForm}
            className="flex-1 bg-rose-600 text-white font-black py-4 rounded-xl shadow-xl animate-pulse uppercase text-sm tracking-tighter"
          >
            Rendeles 1 Kattintassal
          </button>
        </div>

        {/* SOCIAL PROOF POPUP */}
        <div className={`fixed bottom-24 left-4 right-4 md:left-8 md:right-auto md:w-80 bg-white shadow-2xl rounded-2xl p-4 border-l-8 border-green-500 transition-all duration-700 z-[70] ${showNotification ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-90 pointer-events-none'}`}>
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-2 rounded-full text-green-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase">Legutobbi Vasarlas</p>
              <p className="text-sm font-black text-gray-900">{notificationName} epp most rendelt RoboChef Smart-ot!</p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
