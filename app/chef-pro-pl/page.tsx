'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Script from 'next/script';
import { useRouter, useSearchParams } from 'next/navigation';

// --- API CONFIG ---
const API_CONFIG = {
  url: 'https://offers.supertrendaffiliateprogram.com/forms/api/',
  uid: '0198088f-a4bc-7ed8-89aa-83089fe0180e',
  key: 'ec15cab563da6cf51f0c7c',
  offer: '202',
  lp: '202'
};

// --- DATA ---
const REVIEWS = [
  { name: "Franciszka B.", title: "Juz nie wyobrazam sobie bez tego! Zmienilo moje zycie", rating: 5, date: "2 dni temu", text: "Bylam sceptyczna ze wzgledu na tak niska cene, ale jest niesamowity. Gotuje wszystko sam, latwo sie czysci, a przepisy sa gwarancja sukcesu. Dostalem w 48 godzin!", verified: true },
  { name: "Marek Kowalski", title: "Jakosc ponad oczekiwania", rating: 5, date: "1 tydzien temu", text: "Solidne materialy i bardzo mocny silnik. Wczoraj wieczorem zrobilem risotto i bylo idealne, kremowe jak w restauracji. Za 389 zl to prezent.", verified: true },
  { name: "Walentyna D.", title: "Swietny zakup", rating: 4, date: "3 dni temu", text: "Kupilem jako prezent dla mamy, teraz moja siostra tez chce. Wyswietlacz jest bardzo intuicyjny.", verified: true },
  { name: "Jozef L.", title: "Paczka dotarla nienaruszona i na czas", rating: 5, date: "4 dni temu", text: "Kurier byl bardzo mily. Zaplacilem gotowka zgodnie z obietnica. Robot jest masywny i robi mnostwo rzeczy. Polecam!", verified: true },
  { name: "Aleksandra M.", title: "Zastepuje wszystko w kuchni", rating: 5, date: "5 dni temu", text: "Wyrzucilem stary blender i parownik. Ten robi wszystko. Ekran jest duzy i dobrze widoczny.", verified: true },
  { name: "Robert P.", title: "Stosunek jakosci do ceny nie do pobicia", rating: 5, date: "6 dni temu", text: "Widzialem podobne produkty za 4000 zl. Ten za 389 zl to okazja, ktora sie nie powtorzy. Waga jest bardzo dokladna.", verified: true },
  { name: "Elena G.", title: "Moja corka go uwielbia", rating: 5, date: "1 tydzien temu", text: "Robimy razem desery, ogladajac wideoprzepisy. To stal sie nasz ulubiony moment dnia.", verified: true },
  { name: "Klaudiusz S.", title: "Mocny i cichy", rating: 4, date: "1 tydzien temu", text: "Spodziewalem sie, ze bedzie glosniejszy podczas zagniatania, ale jest dosc cichy. Swietny dla mieszkajacych w bloku.", verified: true },
  { name: "Simona F.", title: "Latwe i smaczne przepisy", rating: 5, date: "9 dni temu", text: "Nie jestem dobra w gotowaniu, ale z przewodnikiem krok po kroku nie popelniam bledow. Moj maz byl zaskoczony!", verified: true },
  { name: "Lukasz T.", title: "Ekspresowa wysylka", rating: 5, date: "10 dni temu", text: "Zamowilem w poniedzialek, dostalem w srode rano. Idealne opakowanie. Zestaw akcesoriow jest naprawde kompletny.", verified: true },
  { name: "Sara W.", title: "Ekran to rewolucja", rating: 5, date: "11 dni temu", text: "Ogladanie filmow podczas gotowania rozwiewa wszelkie watpliwosci. Nigdy nie wrocilbym do starych papierowych ksiazek kucharskich.", verified: true },
  { name: "Pawel D.", title: "Swietny do jedzenia dla dzieci", rating: 5, date: "12 dni temu", text: "Idealne gotowanie na parze i miksowanie. Idealny dla rodzin z malymi dziecmi.", verified: true },
  { name: "Marta N.", title: "Nowoczesny i funkcjonalny design", rating: 5, date: "2 tygodnie temu", text: "Wyglada swietnie na blacie kuchennym. Bialy, blyszczacy, bardzo elegancki. Latwy do rozmontowania i mycia.", verified: true },
  { name: "Jerzy B.", title: "Prawdziwa pomoc", rating: 4, date: "2 tygodnie temu", text: "Pomaga mi jesc zdrowiej dzieki gotowaniu na parze. Jedyna wada: chcialbym, zeby kabel byl troche dluzszy.", verified: true },
  { name: "Anna R.", title: "Super szczesliwa z zakupu", rating: 5, date: "3 tygodnie temu", text: "Uzywam go codziennie. Od podsmarzania po ciasto, robi wszystko. Jest wart znacznie wiecej niz kosztuje.", verified: true }
];

const ACCESSORIES = [
  { name: "Dzbanek XL 4.5L", img: "/images/chef-pro/boccale.jpg" },
  { name: "Kompletny Zestaw Parowy", img: "/images/chef-pro/vapore.jpg" },
  { name: "Koszyk do Gotowania", img: "/images/chef-pro/cestello-di-cottura.jpg" },
  { name: "Mieszadlo Motylkowe", img: "/images/chef-pro/accessorio-mixer.jpg" },
  { name: "Silikonowa Lopatka", img: "/images/chef-pro/spatola.jpg" },
  { name: "Ostrza ze Stali Nierdzewnej", img: "/images/chef-pro/lame.jpg" }
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
          'send_to': 'AW-17321474795/U6NiCJPW1c4bEOv1wsNA'
        });
      }

      router.push('/ty/ty-chef-pro-pl');
    } catch (error) {
      console.error('[Network API] Error:', error);
      router.push('/ty/ty-chef-pro-pl');
    }
  };

  if (orderStatus === 'success') {
    return (
      <div className="bg-white p-12 rounded-3xl shadow-2xl text-center border-4 border-green-500 animate-in zoom-in duration-500">
        <div className="text-7xl mb-6">✅</div>
        <h2 className="text-3xl font-black mb-4">ZAMOWIENIE POTWIERDZONE!</h2>
        <p className="text-gray-600 mb-8 font-medium">Dziekujemy za zakup. Nasz konsultant zadzwoni do Ciebie w ciagu 15 minut, aby potwierdzic dane wysylki.</p>
        <div className="p-4 bg-green-50 text-green-700 font-bold rounded-2xl">
          Twoja paczka dotrze w ciagu 24/48h. Przygotuj 389 PLN gotowka dla kuriera!
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border-4 border-rose-600 relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-rose-600 text-white px-6 py-2 rounded-bl-2xl font-black text-xs uppercase tracking-tighter">
        Darmowa Wysylka
      </div>
      <div className="text-center mb-10 mt-4">
        <h2 className="text-3xl font-black uppercase mb-2">Zamow Teraz</h2>
        <p className="text-rose-600 font-bold uppercase text-sm">Platnosc przy odbiorze</p>
      </div>
      <form onSubmit={handleOrder} className="space-y-6">
        <input type="hidden" name="tmfp" />
        <div className="space-y-2">
          <label className="block text-sm font-black text-gray-700 uppercase">Imie i Nazwisko *</label>
          <input
            required
            type="text"
            name="name"
            placeholder="np. Jan Kowalski"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-rose-600 outline-none transition-colors font-medium"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-black text-gray-700 uppercase">Telefon (dla kuriera) *</label>
          <input
            required
            type="tel"
            name="phone"
            placeholder="np. 600 123 456"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-rose-600 outline-none transition-colors font-medium"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-black text-gray-700 uppercase">Pelny Adres *</label>
          <input
            required
            type="text"
            name="address"
            placeholder="Ulica, Numer, Miasto, Kod"
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
          ) : "Potwierdz Zamowienie ➔"}
        </button>
        <p className="text-[10px] text-center text-gray-400 leading-tight">
          Wysylajac zamowienie akceptujesz warunki sprzedazy. Twoje dane sa chronione 256-bitowym szyfrowaniem SSL.
        </p>
      </form>
    </div>
  );
};

const OrderForm = ({ formRef }: { formRef: React.RefObject<HTMLDivElement | null> }) => (
  <section ref={formRef} className="py-24 px-6 bg-rose-50 scroll-mt-20">
    <div className="max-w-md mx-auto">
      <Suspense fallback={<div className="py-20 text-center">Ladowanie...</div>}>
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
    const names = ["Marek", "Elena", "Jozef", "Sara", "Lukasz", "Aleksandra", "Robert"];
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
          🔥 Oferta <span className="text-rose-500">Wyprzedazowa</span> konczy sie za: <span className="text-yellow-400">{formatTime(timeLeft)}</span> - Zostalo tylko 12 sztuk
        </div>

        <main className="max-w-4xl mx-auto bg-white shadow-2xl relative">

          {/* HERO */}
          <section className="p-6 md:p-12 text-center">
            <div className="inline-block bg-rose-600 text-white px-4 py-1 rounded-full text-xs font-black uppercase mb-6 animate-bounce">
              Natychmiastowy Rabat -70%
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-none mb-6 tracking-tighter">
              GOTUJ JAK PROFESJONALISTA ZA JEDYNE <span className="text-rose-600">389 PLN</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto font-medium">
              Najlepszy Inteligentny Robot Kuchenny. Zastepuje 15 urzadzen. Wideoprzepisy i sterowanie przez aplikacje.
            </p>

            <div className="relative max-w-lg mx-auto mb-10 group">
              <img
                src="/images/chef-pro/monsieur-cuisine-smart.jpg"
                alt="Inteligentny Robot Kuchenny"
                className="w-full h-auto rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -top-6 -right-6 bg-yellow-400 text-black w-28 h-28 rounded-full flex flex-col items-center justify-center font-black shadow-2xl rotate-12 border-4 border-white animate-pulse">
                <span className="text-sm line-through opacity-60">1299 PLN</span>
                <span className="text-2xl italic">389 PLN</span>
              </div>
            </div>

            <button
              onClick={scrollToForm}
              className="w-full max-w-md bg-rose-600 text-white text-2xl font-black py-6 rounded-2xl shadow-[0_10px_0_0_#9f1239] hover:shadow-[0_5px_0_0_#9f1239] hover:translate-y-1 active:scale-95 transition-all uppercase tracking-tight"
            >
              Tak! Chce za 389 PLN ➔
            </button>
            <p className="mt-6 text-green-600 font-bold flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
              Platnosc przy odbiorze i Darmowa Wysylka
            </p>
          </section>

          {/* AGGRESSIVE BANNER */}
          <div className="bg-rose-600 text-white py-10 px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-4 leading-tight">
              ⚠️ UWAGA: OSTATNIE SZTUKI W MAGAZYNIE ⚠️
            </h2>
            <p className="text-lg opacity-90 font-medium">
              Oprozniamy magazyn przed odnowieniem zapasow. <br className="hidden md:block"/>
              Po wyczerpaniu cena wroci do 1299 PLN. Nie przegap tej wyjatkowej okazji!
            </p>
          </div>

          {/* SMART FEATURES SECTION */}
          <section className="py-16 px-6 bg-gray-50">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">Technologia Przyszlosci</h2>
              <div className="h-2 w-24 bg-rose-600 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
              <div className="order-2 md:order-1">
                <span className="text-rose-600 font-black uppercase text-sm tracking-widest">Wyswietlacz 8" HD</span>
                <h3 className="text-3xl font-black mt-2 mb-6 leading-tight">Zintegrowane Wideoprzepisy: Niemozliwe sie pomylic!</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Ogladaj szefow kuchni przygotowujacych danie razem z Toba. Robot prowadzi Cie krok po kroku dzieki <strong>filmom w wysokiej rozdzielczosci</strong> bezposrednio na ekranie dotykowym. Zatrzymuj i wznawiaj kiedy chcesz.
                </p>
                <ul className="space-y-4">
                  {["Ponad 1200 zaladowanych wideoprzepisow", "Darmowe aktualizacje Wi-Fi", "Inteligentny przewodnik glosowy"].map((t, i) => (
                    <li key={i} className="flex items-center gap-3 font-bold text-gray-800">
                      <span className="bg-green-100 text-green-600 p-1 rounded-full">✓</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 md:order-2">
                <img src="/images/chef-pro/monsieur-cuisine-smart (1).jpg" className="rounded-3xl shadow-2xl border-8 border-white" alt="Wideoprzepisy" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <img src="/images/chef-pro/monsieur-cuisine-smart (2).jpg" className="rounded-3xl shadow-2xl border-8 border-white" alt="Aplikacja na smartfon" />
              </div>
              <div>
                <span className="text-rose-600 font-black uppercase text-sm tracking-widest">Dedykowana Aplikacja</span>
                <h3 className="text-3xl font-black mt-2 mb-6 leading-tight">Kontroluj Wszystko ze Smartfona</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Jestes w pracy? Wybierz przepis z aplikacji i wyslij go do robota. Twórz liste zakupow, planuj posilki i otrzymuj powiadomienia, gdy kolacja jest gotowa.
                </p>
                <ul className="space-y-4">
                  {["Kompatybilny z iOS i Android", "Tygodniowy planer", "Inteligentna lista zakupow"].map((t, i) => (
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
              <h2 className="text-4xl font-black uppercase mb-4">NAJBARDZIEJ KOMPLETNY ZESTAW W HISTORII</h2>
              <p className="text-gray-400 italic">Wszystko w cenie 389 PLN - Wartosc akcesoriow oddzielnie: 649 PLN</p>
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
            <h2 className="text-3xl font-black mb-10 tracking-tighter">Opinie klientow</h2>

            <div className="flex flex-col md:flex-row gap-12 mb-16 border-b border-gray-100 pb-12">
              <div className="w-full md:w-1/3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-yellow-500 text-2xl">★★★★★</div>
                  <span className="text-xl font-black text-gray-900">4.8 na 5</span>
                </div>
                <p className="text-gray-500 text-sm mb-6">1 452 ocen globalnych</p>

                <div className="space-y-3">
                  {[
                    { s: 5, p: 88 },
                    { s: 4, p: 9 },
                    { s: 3, p: 2 },
                    { s: 2, p: 1 },
                    { s: 1, p: 0 }
                  ].map((row) => (
                    <div key={row.s} className="flex items-center gap-4 group cursor-pointer">
                      <span className="text-sm text-blue-600 hover:underline min-w-[50px]">{row.s} gwiazd</span>
                      <div className="flex-1 h-5 bg-gray-100 rounded-sm overflow-hidden">
                        <div className="h-full bg-yellow-400 group-hover:bg-yellow-500 transition-colors" style={{ width: `${row.p}%` }}></div>
                      </div>
                      <span className="text-sm text-gray-500 min-w-[30px]">{row.p}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 md:border-l border-gray-100 md:pl-12">
                <h3 className="text-xl font-bold mb-3">Ocen ten produkt</h3>
                <p className="text-gray-600 mb-6">Podziel sie swoim doswiadczeniem kulinarnym z innymi uzytkownikami.</p>
                <button className="w-full md:w-auto px-10 py-2.5 border border-gray-300 rounded-lg font-bold shadow-sm hover:bg-gray-50 transition-colors">
                  Napisz opinie klienta
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
                  <p className="text-xs text-gray-500 mb-3">Oceniono w Polsce {rev.date}</p>
                  {rev.verified && <p className="text-xs font-black text-orange-700 mb-3">Zweryfikowany zakup</p>}
                  <p className="text-gray-800 leading-relaxed mb-6">{rev.text}</p>
                  <div className="flex items-center gap-6">
                    <button className="px-8 py-1.5 border border-gray-300 rounded-lg text-sm font-medium shadow-sm hover:bg-gray-50">Pomocne</button>
                    <button className="text-gray-400 text-sm hover:underline">Zglos</button>
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
                ) : "Pokaz wiecej opinii"}
              </button>
            )}
          </section>

          {/* ORDER FORM SECTION */}
          <OrderForm formRef={formRef} />

          {/* TRUST BADGES */}
          <section className="py-16 bg-white border-t border-gray-100 px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
              {[
                { t: "Wysylka 24/48h", icon: "🚚" },
                { t: "Gwarancja 2 Lata", icon: "🛡️" },
                { t: "Satysfakcja lub Zwrot", icon: "💎" },
                { t: "Obsluga w Polsce", icon: "🇵🇱" }
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
            <p>© 2024 RoboChef Polska - Sprzedaz Afiliacyjna</p>
            <div className="flex justify-center gap-6 mt-4 font-bold uppercase">
              <a href="#" className="hover:text-rose-600 transition-colors">Prywatnosc</a>
              <a href="#" className="hover:text-rose-600 transition-colors">Regulamin</a>
              <a href="#" className="hover:text-rose-600 transition-colors">Kontakt</a>
            </div>
          </footer>

        </main>

        {/* MOBILE STICKY CTA */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-gray-200 z-50 md:hidden flex items-center justify-between gap-4 animate-in slide-in-from-bottom duration-500">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase text-gray-400">Oferta</span>
            <span className="text-3xl font-black text-rose-600 leading-none">389 PLN</span>
          </div>
          <button
            onClick={scrollToForm}
            className="flex-1 bg-rose-600 text-white font-black py-4 rounded-xl shadow-xl animate-pulse uppercase text-sm tracking-tighter"
          >
            Zamow 1 Kliknieciem
          </button>
        </div>

        {/* SOCIAL PROOF POPUP */}
        <div className={`fixed bottom-24 left-4 right-4 md:left-8 md:right-auto md:w-80 bg-white shadow-2xl rounded-2xl p-4 border-l-8 border-green-500 transition-all duration-700 z-[70] ${showNotification ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-90 pointer-events-none'}`}>
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-2 rounded-full text-green-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase">Ostatni Zakup</p>
              <p className="text-sm font-black text-gray-900">{notificationName} wlasnie zamowil RoboChef Smart!</p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
