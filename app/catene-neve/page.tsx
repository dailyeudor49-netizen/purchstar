'use client';
import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, Shield, Zap, ChevronDown, ChevronLeft, ChevronRight, AlertTriangle, Car, Snowflake, Clock, Lock, Wrench } from 'lucide-react';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export default function CateneNeveLanding() {
  const [timeLeft, setTimeLeft] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedEndTime = localStorage.getItem('catene-offer-end');
      if (savedEndTime) {
        const remaining = Math.floor((parseInt(savedEndTime) - Date.now()) / 1000);
        return remaining > 0 ? remaining : 0;
      } else {
        const endTime = Date.now() + 57 * 60 * 1000;
        localStorage.setItem('catene-offer-end', endTime.toString());
        return 57 * 60;
      }
    }
    return 57 * 60;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [orderData, setOrderData] = useState({ name: '', phone: '', address: '' });
  const [submitError, setSubmitError] = useState('');

  const slides = [
    '/images/catene/1.jpg',
    '/images/catene/2.jpg',
    '/images/catene/3.jpg',
    '/images/catene/4.jpg',
    '/images/catene/5.jpg',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!autoSlide) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length, autoSlide]);

  const stopAutoSlide = () => setAutoSlide(false);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const openOrderPopup = () => {
    document.getElementById('order-form-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!orderData.name.trim() || !orderData.phone.trim() || !orderData.address.trim()) {
      setSubmitError('Compila tutti i campi!');
      return;
    }
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('https://ap.purchstar.com/api/networks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: orderData.name.split(' ')[0] || orderData.name,
          lastName: orderData.name.split(' ').slice(1).join(' ') || '',
          phone: orderData.phone,
          address: orderData.address,
          product: 'SafeSnow 1-Minute-Ready',
          price: 59,
          source: 'catene-neve',
        }),
      });

      if (response.ok) {
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'conversion', {
            send_to: 'AW-17104994752/catene',
            value: 59,
            currency: 'EUR',
          });
        }
        window.location.href = '/ty/ty-catene';
      }
    } catch (error) {
      console.error(error);
      setSubmitError('Errore durante l\'invio. Riprova.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      question: "Funzionano davvero su qualsiasi auto?",
      answer: "Sì. Le <strong>SafeSnow 1-Minute-Ready</strong> sono universali e si adattano a pneumatici da 165mm a 285mm. Auto, SUV, furgoni. Non importa la marca o il modello: funzionano."
    },
    {
      question: "Come si montano?",
      answer: "Le posizioni sulla ruota, chiudi la clip, parti. 60 secondi per ruota, senza attrezzi, senza sporcarti le mani, senza sollevare l'auto. Facilissimo."
    },
    {
      question: "Vanno montate davanti o dietro?",
      answer: "Sulle ruote motrici. Se hai trazione anteriore (la maggior parte delle auto), le monti davanti. Se hai trazione posteriore, le monti dietro. Se hai un 4x4, generalmente davanti. Nel dubbio, controlla il libretto della tua auto."
    },
    {
      question: "Sono omologate?",
      answer: "Assolutamente sì. Le <strong>SafeSnow 1-Minute-Ready</strong> sono omologate secondo la normativa europea e accettate in tutti i paesi dove vige l'obbligo catene. Tienile sempre nel bagagliaio durante l'inverno."
    },
    {
      question: "Non rovinano i cerchi?",
      answer: "No. A differenza delle catene metalliche tradizionali, le SafeSnow 1-Minute-Ready hanno protezioni in gomma che evitano qualsiasi contatto metallo su metallo. I tuoi cerchi restano perfetti, che siano in lega o in acciaio."
    },
    {
      question: "Devo pagare subito?",
      answer: "No. Paghi in contanti al corriere quando ricevi il pacco. Zero rischi per te."
    },
    {
      question: "E se non mi vanno bene?",
      answer: "Hai 30 giorni per restituirle e riavere i soldi. Ma con la misura universale, è praticamente impossibile che non vadano bene."
    }
  ];

  const reviews = [
    { nome: 'Marco B.', testo: 'Le ho provate in montagna con 30cm di neve. La macchina andava come un treno. Le catene vecchie le ho buttate. Queste si montano in un attimo e non fanno casino. Compratele e basta.', stelle: 5, data: '15 Dicembre 2025', risposta: 'Marco, grazie! La montagna è un ottimo banco di prova. Siamo contenti che ti abbiano salvato il viaggio!' },
    { nome: 'Giuseppe T.', testo: 'Ho 67 anni e le catene normali erano un incubo. Mi dovevo inginocchiare nel fango, al freddo, con le mani gelate. Con queste ci ho messo letteralmente 2 minuti per tutte e 4 le ruote. Mai più senza.', stelle: 5, data: '12 Dicembre 2025' },
    { nome: 'Laura M.', testo: 'Viaggio spesso per lavoro in montagna. Le tenevo nel bagagliaio e quando è arrivata la nevicata improvvisa le ho montate in 5 minuti mentre i colleghi erano ancora lì a lottare con le catene normali. Figure da campionessa.', stelle: 5, data: '8 Dicembre 2025', risposta: 'Laura, questa è esattamente la situazione per cui le abbiamo progettate! Essere pronti quando gli altri sono in difficoltà.' },
    { nome: 'Antonio R.', testo: 'Scettico totale. Pensavo fossero le solite cinesate. Le ho testate sulla neve vera in montagna. Aderenza perfetta, nessun rumore strano, nessun danno ai cerchi. Mi sono ricreduto completamente.', stelle: 5, data: '1 Dicembre 2025', risposta: 'Antonio, lo scetticismo iniziale è normale. I fatti parlano da soli!' },
    { nome: 'Francesca D.', testo: 'Mio marito mi prendeva in giro quando le ho comprate. Poi si è trovato bloccato in autostrada e ha dovuto chiamarmi per farsi portare le MIE catene. Non ride più adesso.', stelle: 5, data: '25 Novembre 2025' },
    { nome: 'Roberto C.', testo: 'Le ho comprate per il mio SUV. Pensavo servissero catene speciali costose. Con 59 euro ho risolto. Le ho usate 3 volte questo inverno, sempre perfette. Soldi spesi bene.', stelle: 5, data: '18 Novembre 2025', risposta: 'Roberto, molti pensano che i SUV abbiano bisogno di catene speciali. La misura universale risolve tutto!' },
    { nome: 'Giovanna P.', testo: 'Vivo in montagna, la neve è di casa. Ho usato catene tradizionali per 20 anni. Queste sono un altro mondo. Velocissime, sicure, non devi stare mezz\'ora al freddo. Le consiglio a tutti i montanari come me.', stelle: 5, data: '10 Novembre 2025' },
    { nome: 'Stefano L.', testo: 'La prima volta che le ho usate ero nervoso. Poi ho capito che era più facile allacciarsi le scarpe. Un minuto e via. Adesso le consiglio a tutti. Anche mia suocera le ha prese.', stelle: 5, data: '2 Novembre 2025', risposta: 'Stefano, quando le consigli anche alla suocera vuol dire che funzionano davvero!' },
    { nome: 'Elena V.', testo: 'Bloccata sulla statale con la neve. Tutti fermi a montare catene nel panico. Io ho messo le SafeSnow in 2 minuti e sono ripartita. La gente mi guardava come fossi un\'aliena.', stelle: 5, data: '28 Ottobre 2025' },
    { nome: 'Massimo F.', testo: 'Ho confrontato con le catene del concessionario a 280 euro. Stesse prestazioni, prezzo ridicolo. Non capisco perché dovrei pagare 5 volte tanto. Consigliatissime.', stelle: 5, data: '20 Ottobre 2025', risposta: 'Massimo, il prezzo delle catene tradizionali è gonfiato. Noi tagliamo gli intermediari e offriamo qualità a prezzo giusto.' },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden font-sans leading-relaxed">
      {/* Fixed CTA Button */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-sky-500 shadow-2xl">
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex items-center justify-center space-x-2 mb-1">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-gray-500 text-xs">4.9 su 2.847 recensioni</span>
          </div>
          <button
            onClick={openOrderPopup}
            className="w-full bg-gradient-to-r from-sky-600 to-sky-700 text-white py-4 rounded-xl font-bold text-base sm:text-lg hover:from-sky-700 hover:to-sky-800 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap"
          >
            <span>ORDINA ORA - €59</span>
            <span className="text-xs sm:text-sm bg-white/20 px-2 py-1 rounded">Paga alla consegna</span>
          </button>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="bg-gradient-to-r from-sky-600 to-sky-700 text-white py-2 text-center text-sm font-medium shadow-md">
        Spedizione in 48h - Pagamento alla Consegna - Garanzia 30 Giorni
      </div>

      {/* Hero Title Section */}
      <section className="bg-white pt-6 pb-4 md:py-8 px-4 border-b">
        <div className="max-w-3xl mx-auto text-center">
         
          <h1 className="text-2xl md:text-4xl font-black text-[#0f1c3f] mb-4 leading-tight tracking-tight">
            BLOCCATO SULLA NEVE A <span className="text-sky-600">-10°C</span> A MONTARE CATENE?
          </h1>
          <p className="text-xl md:text-2xl font-bold text-red-700 mb-4">
            Smetti di rovinare i tuoi cerchi con le vecchie e costose catene da neve.
          </p>
          <p className="text-lg md:text-xl text-gray-700 bg-sky-50 border-2 border-sky-200 rounded-xl p-4 inline-block">
            Le <strong>SafeSnow 1-Minute-Ready</strong> si montano in un attimo. <strong>Universali, omologate</strong>, con <strong>protezione in gomma</strong> per i cerchi del tuo veicolo.
          </p>
        </div>
      </section>

      {/* Product Section */}
      <main className="max-w-6xl mx-auto px-4 pt-6 pb-20 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden relative">
              <img
                src={slides[currentSlide]}
                alt="SafeSnow 1-Minute-Ready"
                className="w-full h-full object-cover"
              />
              {/* Badge Ultimi Pezzi */}
              <div className="absolute top-3 left-3 bg-red-600 text-white text-sm font-bold px-3 py-2 rounded-lg shadow-lg">
                Ultimi 7 set disponibili
              </div>
              <button
                onClick={() => { stopAutoSlide(); setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow-lg transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => { stopAutoSlide(); setCurrentSlide((prev) => (prev + 1) % slides.length); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow-lg transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex justify-center gap-2">
              {slides.map((slide, i) => (
                <button
                  key={i}
                  onClick={() => { stopAutoSlide(); setCurrentSlide(i); }}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 cursor-pointer ${
                    i === currentSlide ? 'border-sky-500 ring-2 ring-sky-200' : 'border-gray-200'
                  }`}
                >
                  <img src={slide} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Bullet Points sotto la galleria - SOLO MOBILE */}
            <div className="bg-sky-50/50 rounded-xl p-5 text-left lg:hidden">
              <ul className="space-y-4 text-slate-800 text-base">
                <li className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-sky-700 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Si montano in un minuto:</strong> Non più ore al freddo, 60 secondi e parti.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Car className="w-6 h-6 text-sky-700 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Taglia universale:</strong> 165-285mm. Una misura, tutte le auto.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-sky-700 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Zero problemi ai controlli:</strong> Omologate UE. Legali ovunque.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Lock className="w-6 h-6 text-sky-700 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Addio cerchi graffiati:</strong> Protezione in gomma. Zero danni.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Snowflake className="w-6 h-6 text-sky-700 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Grip estremo:</strong> Neve, ghiaccio, fango. Vai ovunque.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:sticky lg:top-4 lg:self-start">
            {/* Price Box */}
            <div className="bg-white border-2 border-sky-500 rounded-2xl p-5 mb-6 shadow-lg relative">
              {/* Bollino Sconto */}
              <div className="absolute -top-4 -right-4 bg-red-600 text-white text-sm font-bold w-14 h-14 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.4)] transform rotate-12 flex items-center justify-center text-center leading-tight">
                -65%
              </div>

              {/* Titolo e Recensioni */}
              <h2 className="font-bold text-[#0f1c3f] text-center mb-1">
                <span className="text-xl block">SafeSnow 1-Minute-Ready</span>
                <span className="text-lg font-semibold text-gray-700">Catene da Neve Universali</span>
              </h2>
              <p className="text-sm text-gray-600 text-center mb-2">Set completo: 2 catene + borsa + guanti + kit manutenzione + guida rapida</p>

              <div className="flex items-center justify-center space-x-3 mb-4">
                <span className="text-gray-400 line-through text-xl" style={{ fontFamily: 'var(--font-montserrat)' }}>€169</span>
                <span className="text-5xl font-black text-sky-700" style={{ fontFamily: 'var(--font-montserrat)' }}>€59</span>
              </div>

              <button
                onClick={openOrderPopup}
                className="w-full bg-sky-600 hover:bg-sky-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all cursor-pointer shadow-lg"
              >
                Ordina Ora - Paghi alla Consegna
              </button>

              <p className="text-center font-bold mt-2">
                <span className="text-red-600">Pezzi rimanenti: 7</span>
              </p>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs mt-4">
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                  <Shield className="w-5 h-5 mx-auto mb-1 text-sky-700" />
                  <span className="text-gray-700">2 anni di garanzia</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                  <CheckCircle className="w-5 h-5 mx-auto mb-1 text-sky-700" />
                  <span className="text-gray-700">Reso 30 giorni</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                  <Zap className="w-5 h-5 mx-auto mb-1 text-sky-700" />
                  <span className="text-gray-700">Spedizione 48h</span>
                </div>
              </div>
            </div>

            {/* Bullet Points - SOLO DESKTOP */}
            <div className="hidden lg:block bg-sky-50/50 rounded-xl p-5 text-left">
              <ul className="space-y-4 text-slate-800 text-base">
                <li className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-sky-700 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Si montano in un minuto:</strong> Non più ore al freddo, 60 secondi e parti.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Car className="w-6 h-6 text-sky-700 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Taglia universale:</strong> 165-285mm. Una misura, tutte le auto.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-sky-700 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Zero problemi ai controlli:</strong> Omologate UE. Legali ovunque.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Lock className="w-6 h-6 text-sky-700 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Addio cerchi graffiati:</strong> Protezione in gomma. Zero danni.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Snowflake className="w-6 h-6 text-sky-700 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Grip estremo:</strong> Neve, ghiaccio, fango. Vai ovunque.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Striscia Omologazione */}
      <div className="bg-slate-800 text-white py-3 text-center text-sm font-medium">
        <strong>Prodotto Omologato</strong> - Conforme alla normativa europea catene da neve. Accettato in tutti i paesi UE.
      </div>

      {/* Comparison Section - Two Boxes with Images */}
      <section className="py-12 bg-slate-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-2 text-[#0f1c3f] tracking-tight">
            PUOI BUTTAR VIA LE VECCHIE CATENE
          </h2>
          <p className="text-lg text-gray-600 text-center mb-10">
            Da una parte il passato, dall'altra il futuro
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Box Catene Tradizionali - ROSSO */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl border-4 border-red-500">
              <div className="aspect-video bg-red-100 relative">
                <img
                  src="/images/catene/tradizionali.jpg"
                  alt="Catene tradizionali - difficili da montare"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 bg-gradient-to-b from-red-50 to-white">
                <h3 className="text-2xl font-black text-red-700 mb-4 text-center">CATENE TRADIZIONALI</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-red-800">
                    <span className="text-red-500 text-xl">✗</span>
                    <span><strong>15-20 minuti</strong> al gelo per montarle</span>
                  </li>
                  <li className="flex items-center gap-3 text-red-800">
                    <span className="text-red-500 text-xl">✗</span>
                    <span><strong>Graffiano e rovinano</strong> i cerchi</span>
                  </li>
                  <li className="flex items-center gap-3 text-red-800">
                    <span className="text-red-500 text-xl">✗</span>
                    <span><strong>Serve la misura esatta</strong> o non si montano</span>
                  </li>
                  <li className="flex items-center gap-3 text-red-800">
                    <span className="text-red-500 text-xl">✗</span>
                    <span><strong>Durano 2-3 stagioni</strong> poi si rompono</span>
                  </li>
                  <li className="flex items-center gap-3 text-red-800">
                    <span className="text-red-500 text-xl">✗</span>
                    <span><strong>Brutte</strong>, rumorose, scomode</span>
                  </li>
                </ul>
                <div className="mt-6 text-center">
                  <span className="text-3xl font-black text-red-600">€150-300</span>
                  <p className="text-red-500 text-sm">E durano poco</p>
                </div>
              </div>
            </div>

            {/* Box SafeSnow - BLU */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl border-4 border-sky-500">
              <div className="aspect-video bg-sky-100 relative">
                <img
                  src="/images/catene/safesnow.jpg"
                  alt="SafeSnow 1-Minute-Ready - montaggio facile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 bg-gradient-to-b from-sky-50 to-white">
                <h3 className="text-2xl font-black text-sky-700 mb-4 text-center">SAFESNOW 1-MINUTE-READY</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sky-900">
                    <span className="text-green-500 text-xl">✓</span>
                    <span><strong>60 secondi</strong> e sei pronto a partire</span>
                  </li>
                  <li className="flex items-center gap-3 text-sky-900">
                    <span className="text-green-500 text-xl">✓</span>
                    <span><strong>Proteggono i cerchi</strong> con rivestimento in gomma</span>
                  </li>
                  <li className="flex items-center gap-3 text-sky-900">
                    <span className="text-green-500 text-xl">✓</span>
                    <span><strong>Universali</strong> per tutte le auto (165-285mm)</span>
                  </li>
                  <li className="flex items-center gap-3 text-sky-900">
                    <span className="text-green-500 text-xl">✓</span>
                    <span><strong>Durano 10+ anni</strong> senza problemi</span>
                  </li>
                  <li className="flex items-center gap-3 text-sky-900">
                    <span className="text-green-500 text-xl">✓</span>
                    <span><strong>Design smart</strong>, eleganti e silenziose</span>
                  </li>
                </ul>
                <div className="mt-6 text-center">
                  <span className="text-3xl font-black text-sky-600">€59</span>
                  <p className="text-green-600 text-sm font-semibold">E durano per sempre</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCOPRI I BENEFICI - 6 Box */}
      <section className="py-12 bg-slate-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-3 text-[#0f1c3f] tracking-tight">
            PERCHÉ SCEGLIERE DI CAMBIARE OGGI
          </h2>
          <p className="text-lg text-gray-600 text-center mb-10">
            Una soluzione innovativa e definitiva al dilemma delle catene invernali
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Box 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-transparent hover:border-sky-500 transition-all">
              <div className="aspect-video">
                <img src="/images/catene/60-secondi.jpg" alt="Montaggio in 60 secondi" className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-black text-[#0f1c3f] mb-2 tracking-wide">60 SECONDI E VIA</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  Le catene normali richiedono 15-20 minuti di fatica al gelo. Le <strong>SafeSnow 1-Minute-Ready</strong> le <strong>agganci in 60 secondi</strong> e parti. Senza sollevare l'auto, senza attrezzi.
                </p>
              </div>
            </div>

            {/* Box 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-transparent hover:border-sky-500 transition-all">
              <div className="aspect-video">
                <img src="/images/catene/universali.jpg" alt="Compatibilità universale" className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-black text-[#0f1c3f] mb-2 tracking-wide">UNA MISURA PER TUTTI</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  Basta con le taglie sbagliate. Le <strong>SafeSnow 1-Minute-Ready</strong> sono <strong>universali da 165mm a 285mm</strong>. Auto, SUV, furgoni. Una sola misura, tutte le auto.
                </p>
              </div>
            </div>

            {/* Box 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-transparent hover:border-sky-500 transition-all">
              <div className="aspect-video">
                <img src="/images/catene/cerchi-protetti.jpg" alt="Protezione cerchi" className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-black text-[#0f1c3f] mb-2 tracking-wide">CERCHI PROTETTI</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  Le catene metalliche <strong>graffiano e rovinano i cerchi</strong>. Le <strong>SafeSnow 1-Minute-Ready</strong> hanno <strong>protezione in gomma</strong>. I tuoi cerchi restano come nuovi.
                </p>
              </div>
            </div>

            {/* Box 4 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-transparent hover:border-sky-500 transition-all">
              <div className="aspect-video">
                <img src="/images/catene/aderenza.jpg" alt="Aderenza su neve e ghiaccio" className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-black text-[#0f1c3f] mb-2 tracking-wide">ADERENZA BRUTALE</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  Testate in condizioni estreme: <strong>neve fresca, ghiaccio, fango</strong>. L'aderenza è superiore alle catene tradizionali. Vai ovunque con sicurezza.
                </p>
              </div>
            </div>

            {/* Box 5 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-transparent hover:border-sky-500 transition-all">
              <div className="aspect-video">
                <img src="/images/catene/omologate.jpg" alt="Omologate UE" className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-black text-[#0f1c3f] mb-2 tracking-wide">100% LEGALI</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  <strong>Omologate UE</strong>, accettate in tutti i paesi europei. Nessuna multa, nessun problema ai controlli. Tranquillità totale.
                </p>
              </div>
            </div>

            {/* Box 6 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-transparent hover:border-sky-500 transition-all">
              <div className="aspect-video">
                <img src="/images/catene/durata.jpg" alt="Durata 10+ anni" className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-black text-[#0f1c3f] mb-2 tracking-wide">DURANO 10+ ANNI</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  Le catene tradizionali durano 2-3 stagioni. Le <strong>SafeSnow 1-Minute-Ready</strong> sono fatte per durare <strong>oltre 10 anni</strong>. Un investimento, non una spesa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione Come Funziona */}
      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-2 md:mb-4 text-[#0f1c3f] tracking-wide">
            MONTAGGIO IN 3 PASSI
          </h2>
          <p className="text-lg text-gray-600 text-center mb-5 md:mb-10">
            Montale sulle ruote motrici. Così semplice che lo fa chiunque. Anche al buio. Anche con i guanti.
          </p>

          <div className="bg-gradient-to-br from-sky-50 to-sky-100 rounded-2xl p-4 md:p-8 border-2 border-sky-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-sky-600 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4 shadow-lg">
                  <span className="text-white text-lg md:text-2xl font-black">1</span>
                </div>
                <h3 className="text-lg md:text-xl font-black text-[#0f1c3f] mb-1 md:mb-2">POSIZIONA</h3>
                <p className="text-gray-700">
                  Apri le catene e <strong>posizionale sopra le ruote motrici</strong>. Non serve sollevare l'auto, non serve cric.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-sky-600 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4 shadow-lg">
                  <span className="text-white text-lg md:text-2xl font-black">2</span>
                </div>
                <h3 className="text-lg md:text-xl font-black text-[#0f1c3f] mb-1 md:mb-2">AGGANCIA</h3>
                <p className="text-gray-700">
                  Chiudi le <strong>clip di sicurezza</strong>. Click e senti che sono bloccate. Non serve regolazione.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-sky-600 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4 shadow-lg">
                  <span className="text-white text-lg md:text-2xl font-black">3</span>
                </div>
                <h3 className="text-lg md:text-xl font-black text-[#0f1c3f] mb-1 md:mb-2">PARTI</h3>
                <p className="text-gray-700">
                  <strong>Finito.</strong> Metti in moto e vai. Si adattano automaticamente.
                </p>
              </div>
            </div>

            <div className="mt-4 md:mt-8 text-center bg-white rounded-xl p-3 md:p-4 border-2 border-sky-400">
              <p className="text-base md:text-xl font-black text-slate-800">
                Nessun attrezzo. Nessuna esperienza richiesta. Non devi sollevare l'auto. 60 secondi e parti.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency Strip */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-white text-lg md:text-xl font-bold mb-3">
            Solo 7 set rimasti - SCONTO 65%: SafeSnow 1-Minute-Ready a soli €59
          </p>
          <button
            onClick={openOrderPopup}
            className="bg-white text-sky-700 hover:bg-gray-100 py-3 px-8 rounded-xl font-bold text-lg transition-all cursor-pointer"
          >
            Le voglio, ordina ora
          </button>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews-section" className="py-12 bg-sky-700">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center text-white mb-2 tracking-wide">
            Recensioni Verificate
          </h2>

          <div className="flex justify-center items-center gap-2 mb-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-current" />
              ))}
            </div>
            <span className="text-white font-bold text-xl">4.9</span>
          </div>

          <p className="text-center text-white/80 mb-8">2.847 recensioni verificate</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((review, i) => (
              <div key={i} className={`bg-white rounded-xl p-4 shadow ${i >= visibleReviews ? 'hidden md:block' : ''}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-sky-600 rounded-full flex items-center justify-center text-white font-bold">
                    {review.nome[0]}
                  </div>
                  <div>
                    <p className="font-bold text-[#0f1c3f]">{review.nome}</p>
                    <div className="flex text-yellow-400">
                      {[...Array(review.stelle)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  <div className="ml-auto text-right">
                    <span className="text-xs bg-sky-100 text-sky-900 px-2 py-1 rounded block mb-1">Acquisto verificato</span>
                    <span className="text-xs text-gray-500">{review.data}</span>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">{review.testo}</p>
                {review.risposta && (
                  <div className="mt-3 bg-sky-50 border-l-4 border-sky-400 p-3 rounded-r-lg">
                    <p className="text-xs font-semibold text-sky-900 mb-1">Risposta del venditore:</p>
                    <p className="text-gray-600 text-sm">{review.risposta}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {visibleReviews < reviews.length && (
            <div className="text-center mt-6 md:hidden">
              <button
                onClick={() => setVisibleReviews(prev => Math.min(prev + 3, reviews.length))}
                className="bg-white text-sky-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
              >
                Vedi altre recensioni
              </button>
            </div>
          )}

          <p className={`text-center text-white/70 mt-6 text-sm ${visibleReviews >= reviews.length ? 'block' : 'hidden'} md:block`}>
            Puoi vedere le restanti recensioni sul sito ufficiale.
          </p>
        </div>
      </section>

      {/* How to Order */}
      <section className="py-10 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-[#0f1c3f] mb-6 text-center tracking-wide">
            COME ORDINARE
          </h2>
          <div className="flex flex-row items-start justify-center gap-2 md:gap-6">
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-sky-600 text-white flex items-center justify-center text-lg md:text-xl font-bold mb-2">1</div>
              <p className="text-slate-700 text-xs md:text-sm font-medium">Compila il modulo con i tuoi dati</p>
            </div>
            <div className="text-slate-300 text-xl md:text-2xl mt-3">→</div>
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-sky-600 text-white flex items-center justify-center text-lg md:text-xl font-bold mb-2">2</div>
              <p className="text-slate-700 text-xs md:text-sm font-medium">Ti chiamiamo per confermare</p>
            </div>
            <div className="text-slate-300 text-xl md:text-2xl mt-3">→</div>
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-sky-600 text-white flex items-center justify-center text-lg md:text-xl font-bold mb-2">3</div>
              <p className="text-slate-700 text-xs md:text-sm font-medium">Ricevi in 48h e paghi alla consegna</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modulo d'Ordine */}
      <section id="order-form-section" className="bg-sky-700 py-12 pb-8">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-2 text-center tracking-wide">
            MODULO D'ORDINE
          </h2>
          <p className="text-white/80 mb-6 text-center">
            Compila per ricevere le SafeSnow 1-Minute-Ready al 65% di sconto
          </p>

          <div className="bg-white rounded-2xl p-6 shadow-xl">
            {/* Product Summary */}
            <div className="bg-slate-50 rounded-lg p-3 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold text-[#0f1c3f] text-lg">SafeSnow 1-Minute-Ready</span>
                  <span className="block text-sm text-gray-700">Catene da Neve Universali</span>
                  <p className="text-sm text-gray-600">Set completo: 2 catene + borsa + guanti + kit manutenzione + guida</p>
                  <div className="mt-1">
                    <span className="bg-amber-400 text-amber-900 text-xs font-bold px-2 py-1 rounded">SCONTO 65%</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-gray-400 line-through text-sm block" style={{ fontFamily: 'var(--font-montserrat)' }}>€169</span>
                  <span className="text-2xl font-black text-sky-700" style={{ fontFamily: 'var(--font-montserrat)' }}>€59</span>
                </div>
              </div>
            </div>

            {/* Timer */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-5 text-center">
              <p className="font-medium">
                <span className="text-orange-500">Offerta valida fino ad esaurimento.</span><br />
                <span className="text-red-700 font-bold">Solo 7 set rimasti.</span>
              </p>
            </div>

            {submitError && (
              <div className="bg-red-100 border border-red-300 rounded-lg p-3 mb-4">
                <p className="text-red-700 text-sm text-center">{submitError}</p>
              </div>
            )}

            <div className="space-y-4 mb-5">
              <div>
                <label className="block text-[#0f1c3f] font-semibold mb-2">Nome e Cognome *</label>
                <input
                  type="text"
                  name="name"
                  value={orderData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-lg"
                  placeholder="Mario Rossi"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-[#0f1c3f] font-semibold mb-2">Telefono (Cellulare) *</label>
                <input
                  type="tel"
                  name="phone"
                  value={orderData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-lg"
                  placeholder="333 1234567"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-[#0f1c3f] font-semibold mb-2">Indirizzo Completo *</label>
                <input
                  type="text"
                  name="address"
                  value={orderData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-lg"
                  placeholder="Via, Numero Civico, CAP, Città"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Payment Badge */}
            <div className="flex items-center justify-center gap-2 mb-5 text-gray-600">
              <span className="font-medium">Pagamento alla consegna</span>
              <span className="text-green-500">✓</span>
              <span>Nessun anticipo</span>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-4 px-4 rounded-xl font-bold text-lg transition duration-300 flex items-center justify-center gap-2 ${
                isSubmitting
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white cursor-pointer shadow-lg'
              }`}
            >
              {isSubmitting ? 'INVIO IN CORSO...' : <><span>CONFERMA ORDINE</span><ChevronRight className="w-5 h-5" /></>}
            </button>

            {/* Data Protection */}
            <p className="text-center text-gray-500 text-xs mt-4">
              I tuoi dati sono protetti e verranno usati solo per la spedizione
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-sky-700 py-8 pb-32">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-8 text-white tracking-wide">
            DOMANDE FREQUENTI
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <h3 className="text-lg font-semibold text-[#0f1c3f]">{faq.question}</h3>
                  <ChevronDown className={`w-5 h-5 text-slate-600 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
