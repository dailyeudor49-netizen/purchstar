
'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';

// --- FACEBOOK PIXEL CONFIG ---
const FB_PIXEL_ID = '1576025786901423';

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
          content_name: 'Six-Slim',
          content_category: 'Health',
          content_type: 'product',
          value: 49,
          currency: 'EUR'
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

// --- LIVE NOTIFICATION COMPONENT ---
const LiveNotification = () => {
  const [visible, setVisible] = useState(false);
  const [notification, setNotification] = useState({ name: '', city: '', time: '' });

  const names = ['Maria', 'Giulia', 'Francesca', 'Alessandra', 'Chiara', 'Sara', 'Elena', 'Valentina', 'Martina', 'Federica', 'Silvia', 'Laura', 'Anna', 'Giorgia', 'Elisa'];
  const cities = ['Milano', 'Roma', 'Napoli', 'Torino', 'Bologna', 'Firenze', 'Palermo', 'Genova', 'Bari', 'Verona', 'Padova', 'Brescia', 'Catania', 'Venezia'];

  useEffect(() => {
    const showNotification = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      const randomTime = Math.floor(Math.random() * 15) + 1;

      setNotification({
        name: randomName,
        city: randomCity,
        time: `${randomTime} min fa`
      });
      setVisible(true);

      setTimeout(() => setVisible(false), 4000);
    };

    const interval = setInterval(showNotification, 8000);
    setTimeout(showNotification, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[200] bg-white rounded-xl shadow-2xl p-4 border-l-4 border-green-500 max-w-xs animate-bounce-in">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <p className="font-bold text-sm text-gray-800">{notification.name} da {notification.city}</p>
          <p className="text-xs text-gray-500">Ha appena ordinato Six-Slim • {notification.time}</p>
        </div>
      </div>
    </div>
  );
};

/**
 * COMPONENTE LANDING PAGE SIX-SLIM
 */
export default function LandingPage() {
  const [timeLeft, setTimeLeft] = useState(899);
  const [formData, setFormData] = useState({ nome: '', telefono: '', indirizzo: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewersCount, setViewersCount] = useState(297);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 899));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const viewerInterval = setInterval(() => {
      setViewersCount(prev => {
        const change = Math.floor(Math.random() * 7) - 3;
        return Math.max(280, Math.min(350, prev + change));
      });
    }, 5000);
    return () => clearInterval(viewerInterval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const affSub1 = urlParams.get('aff_sub1') || urlParams.get('utm_source') || '';
      const affSub2 = urlParams.get('aff_sub2') || urlParams.get('utm_campaign') || '';

      // Worldfilia API call
      const params = new URLSearchParams({
        source_id: 'cac06d3486f2',
        aff_sub1: affSub1,
        aff_sub2: affSub2,
        name: formData.nome,
        phone: formData.telefono,
        address: formData.indirizzo
      });

      await fetch('https://network.worldfilia.net/manager/inventory/buy/ntm_sixslim_2x49.json?api_key=bzIGfLM1XwmR4l44_6rydQ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
        mode: 'no-cors'
      });

      // Track Purchase event on Facebook Pixel
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const win = window as any;
      if (typeof win.fbq === 'function') {
        win.fbq('track', 'Purchase', {
          content_name: 'Six-Slim',
          content_category: 'Health',
          content_type: 'product',
          value: 49,
          currency: 'EUR'
        });
      }

      window.location.href = '/ty/ty-six-slim';
    } catch (error) {
      console.error('Order submission error:', error);
      window.location.href = '/ty/ty-six-slim';
    }
  };

  const recensioniImages = [
    '/images/six-slim/recensione-1.png',
    '/images/six-slim/recensione-2.png',
    '/images/six-slim/recensione-3.png',
    '/images/six-slim/recensione-4.jpg',
    '/images/six-slim/recensione-5.png',
    '/images/six-slim/recensione-6.png',
    '/images/six-slim/recensione-7.png',
    '/images/six-slim/recensione-8.png',
    '/images/six-slim/recensione-9.png',
    '/images/six-slim/recensione-10.png',
    '/images/six-slim/recensione-11.png',
    '/images/six-slim/recensione-12.png',
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <FacebookPixel />
      <LiveNotification />

      <style jsx global>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 156, 0, 0.5); }
          50% { box-shadow: 0 0 40px rgba(255, 156, 0, 0.8); }
        }
        @keyframes bounce-in {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { transform: translateX(10%); }
          100% { transform: translateX(0); opacity: 1; }
        }
        .animate-ticker {
          display: flex;
          width: fit-content;
          animation: ticker-scroll 20s linear infinite;
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out;
        }
        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .gradient-orange {
          background: linear-gradient(135deg, #ff9c00 0%, #ff6b00 100%);
        }
        .img-sharp {
          image-rendering: -webkit-optimize-contrast;
          filter: contrast(1.05) saturate(1.1);
        }
      `}</style>

      {/* URGENCY BANNER */}
      <div className="bg-black text-white py-2.5 overflow-hidden sticky top-0 z-[100]">
        <div className="animate-ticker whitespace-nowrap flex items-center text-xs md:text-sm font-black uppercase">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-nowrap shrink-0">
              <span className="mx-6 text-yellow-400">⚡ OFFERTA SHOCK: 1+1 GRATIS ⚡</span>
              <span className="mx-6">🔥 SCONTO -50% SOLO OGGI 🔥</span>
              <span className="mx-6 text-green-400">📦 SPEDIZIONE GRATUITA 📦</span>
              <span className="mx-6">💰 PAGHI ALLA CONSEGNA 💰</span>
            </div>
          ))}
        </div>
      </div>

      {/* COUNTDOWN BAR */}
      <div className="bg-red-600 text-white py-3 text-center">
        <p className="text-lg md:text-xl font-black animate-pulse">
          ⏰ OFFERTA SCADE TRA: <span className="text-yellow-300 text-2xl md:text-3xl">{formatTime(timeLeft)}</span> ⏰
        </p>
      </div>

      {/* HERO SECTION */}
      <header className="py-10 md:py-16 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4 max-w-5xl">

          {/* Live viewers */}
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 border border-red-300 rounded-full px-4 py-2 flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              <span className="text-red-700 font-bold text-sm">{viewersCount} persone stanno guardando ora</span>
            </div>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-none">
              BASTA SENTIRTI <span className="text-red-600">INTRAPPOLATA</span> NEL TUO CORPO!
            </h1>
            <p className="text-xl md:text-3xl font-bold text-gray-700 mb-4">
              Sblocca il metabolismo e <span className="bg-yellow-300 px-2">perdi fino a 15kg</span> in modo naturale
            </p>
            <p className="text-lg text-gray-500 font-semibold">
              La formula segreta usata da migliaia di donne italiane per tornare in forma SENZA diete impossibili
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Product Image */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 bg-red-600 text-white font-black py-3 px-5 rounded-xl rotate-[-8deg] shadow-lg z-10">
                <span className="text-2xl">-50%</span>
                <span className="block text-xs">SOLO OGGI</span>
              </div>
              <img
                src="/images/six-slim/hero.png"
                alt="Six-Slim"
                className="w-full max-w-md mx-auto drop-shadow-2xl img-sharp"
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 text-white font-black py-2 px-4 rounded-xl rotate-[5deg] shadow-lg">
                1+1 GRATIS!
              </div>
            </div>

            {/* Benefits Quick List */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-lg font-bold">
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <span key={i} className="text-yellow-500 text-2xl">★</span>
                  ))}
                </div>
                <span className="text-gray-600">+8.847 clienti soddisfatti</span>
              </div>

              {[
                { icon: "🔥", text: "Brucia grassi H24, anche mentre dormi" },
                { icon: "🚫", text: "Blocca la fame nervosa istantaneamente" },
                { icon: "⚡", text: "Accelera il metabolismo fino al 318%" },
                { icon: "💧", text: "Elimina ritenzione idrica e gonfiore" },
                { icon: "🌿", text: "100% naturale, senza effetti collaterali" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-md border-l-4 border-orange-500">
                  <span className="text-3xl">{item.icon}</span>
                  <span className="font-bold text-gray-800">{item.text}</span>
                </div>
              ))}

              <a
                href="#ordina"
                className="block w-full gradient-orange text-white text-center text-xl md:text-2xl font-black py-5 rounded-xl shadow-lg hover:shadow-xl transition-all uppercase pulse-glow mt-6"
              >
                🛒 ATTIVA OFFERTA 1+1 GRATIS →
              </a>
              <p className="text-center text-sm text-gray-500 font-semibold">
                ✓ Spedizione GRATIS • ✓ Paghi alla consegna • ✓ Garanzia 30 giorni
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* STORIA EMOZIONALE */}
      <section className="py-16 bg-gradient-to-b from-gray-100 to-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-l-8 border-red-500">
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-8 leading-tight">
              "Avevo smesso di guardarmi allo specchio. <span className="text-red-600">Mi faceva troppo male.</span>"
            </h2>

            <div className="space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed">
              <p>
                Mi chiamo <strong>Francesca</strong>, ho 47 anni e fino a 3 mesi fa pesavo <strong>87 kg</strong>.
              </p>

              <p>
                Ogni mattina era una tortura. Mi svegliavo già stanca, trascinavo i piedi fino al bagno e...
                <strong className="text-red-600">evitavo lo specchio</strong>. Non sopportavo più quello che vedevo.
              </p>

              <p className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500 italic">
                "Chi è quella donna? Non sono io. Io non sono così. Io non VOGLIO essere così."
              </p>

              <p>
                I vestiti nell'armadio? <strong>Inutili.</strong> Niente mi stava più. E ogni volta che provavo
                qualcosa di nuovo, finivo in lacrime nel camerino.
              </p>

              <p>
                La cosa peggiore? <strong>Gli sguardi.</strong> Della gente per strada. Delle amiche.
                Di mio marito. Sentivo il loro giudizio sulla mia pelle come un peso ancora più grande
                dei chili che portavo addosso.
              </p>

              <p className="bg-gray-100 p-6 rounded-xl">
                Ho provato <strong>TUTTO</strong>: diete da fame, beveroni disgustosi, palestre alle 6 di mattina,
                pillole che promettevano miracoli. Risultato? <strong className="text-red-600">Niente. Zero. Anzi, peggio di prima.</strong>
              </p>

              <p>
                Avevo perso la speranza. Pensavo: <em>"Forse sono fatta così. Forse devo accettarlo."</em>
              </p>

              <p className="text-2xl font-black text-gray-900 py-4">
                Poi, una sera, mia sorella mi ha parlato di Six-Slim...
              </p>

              <p>
                Non ci credevo. L'ennesima fregatura, pensavo. Ma ero così <strong>disperata</strong> che ho detto:
                "Vabbè, cosa ho da perdere?"
              </p>

              <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
                <p className="font-bold text-green-800 text-xl mb-2">Dopo 7 giorni:</p>
                <p className="text-green-700">La pancia era meno gonfia. I pantaloni si chiudevano senza tirare.</p>
              </div>

              <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
                <p className="font-bold text-green-800 text-xl mb-2">Dopo 30 giorni:</p>
                <p className="text-green-700">-8 kg sulla bilancia. Due taglie in meno. Le amiche mi chiedevano cosa avessi fatto.</p>
              </div>

              <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
                <p className="font-bold text-green-800 text-xl mb-2">Dopo 60 giorni:</p>
                <p className="text-green-700"><strong>-14 kg.</strong> Sono tornata a 73 kg. Ho comprato vestiti nuovi.
                Mi guardo allo specchio E MI PIACCIO.</p>
              </div>

              {/* Immagine Prima/Dopo */}
              <div className="my-8">
                <div className="bg-gradient-to-r from-red-100 to-green-100 p-4 rounded-2xl">
                  <img
                    src="/images/six-slim/prima-dopo.png"
                    alt="Trasformazione Francesca - Prima e Dopo Six-Slim"
                    className="w-full rounded-xl shadow-2xl img-sharp"
                  />
                  <p className="text-center text-sm font-bold text-gray-600 mt-4">
                    La mia trasformazione reale con Six-Slim: da 87kg a 73kg in 60 giorni
                  </p>
                </div>
              </div>

              <p className="text-xl font-bold text-gray-800">
                Mio marito non riesce a togliermi gli occhi di dosso. Le mie amiche mi invidiano.
                Ma soprattutto... <span className="text-green-600">IO mi sento finalmente ME STESSA.</span>
              </p>

              <p className="text-center text-2xl md:text-3xl font-black text-red-600 pt-6">
                Se io ce l'ho fatta, puoi farcela anche TU.
              </p>
            </div>

            <div className="mt-10 text-center">
              <a
                href="#ordina"
                className="inline-block gradient-orange text-white text-xl md:text-2xl font-black py-5 px-10 rounded-xl shadow-lg uppercase pulse-glow"
              >
                🛒 VOGLIO LA STESSA TRASFORMAZIONE →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMA SECTION - AGGRESSIVO */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-black text-center mb-10 leading-tight">
            SEI STANCA DI <span className="text-red-500">ODIARE</span> IL TUO RIFLESSO ALLO SPECCHIO?
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-red-900/30 p-6 rounded-2xl border border-red-500/30">
              <h3 className="text-xl font-black text-red-400 mb-4">❌ LA TUA SITUAZIONE ATTUALE:</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Ti svegli già stanca e senza energie</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span>I vestiti non ti entrano più</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Hai provato mille diete... tutte fallite</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Ti vergogni del tuo corpo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Il metabolismo è completamente BLOCCATO</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-900/30 p-6 rounded-2xl border border-green-500/30">
              <h3 className="text-xl font-black text-green-400 mb-4">✓ CON SIX-SLIM:</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Energie alle stelle dalla prima settimana</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Jeans 2 taglie in meno in 30 giorni</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Niente diete, niente rinunce</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Finalmente fiera del tuo corpo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Metabolismo riattivato e veloce</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <p className="text-2xl md:text-3xl font-black mb-6">
              Il problema NON sei tu. <br/>
              <span className="text-yellow-400">È il tuo metabolismo che ha smesso di funzionare.</span>
            </p>
            <a href="#ordina" className="inline-block gradient-orange text-white text-xl font-black py-4 px-10 rounded-xl shadow-lg uppercase">
              RIATTIVA IL TUO METABOLISMO ORA →
            </a>
          </div>
        </div>
      </section>

      {/* SCIENZA SECTION */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-black text-center mb-4">
            LA <span className="text-orange-500">SCIENZA</span> DIETRO SIX-SLIM
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 font-semibold">
            Formula brevettata che aumenta il metabolismo fino al 318%
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-orange-50 p-8 rounded-2xl border-2 border-orange-200">
              <div className="text-6xl font-black text-orange-500 mb-4">FASE 1</div>
              <h3 className="text-2xl font-black mb-4">Stimolazione Metabolica</h3>
              <p className="text-gray-700 leading-relaxed">
                Nei primi 7 giorni, Six-Slim <strong>risveglia il metabolismo dormiente</strong>.
                Gli ingredienti naturali iniziano a sciogliere i depositi di grasso ostinato,
                soprattutto su pancia, fianchi e cosce. Sentirai già più energia e meno gonfiore.
              </p>
            </div>

            <div className="bg-green-50 p-8 rounded-2xl border-2 border-green-200">
              <div className="text-6xl font-black text-green-500 mb-4">FASE 2</div>
              <h3 className="text-2xl font-black mb-4">Accelerazione Totale</h3>
              <p className="text-gray-700 leading-relaxed">
                Dal giorno 8 in poi, il tuo corpo entra in <strong>modalità brucia-grassi H24</strong>.
                Il metabolismo lavora fino al 318% più veloce. Bruci calorie anche mentre dormi,
                guardi la TV o lavori. Senza diete, senza palestra.
              </p>
            </div>
          </div>

          <div className="bg-gray-100 p-8 rounded-2xl text-center">
            <img
              src="/images/six-slim/img-2.png"
              alt="Six-Slim Formula"
              className="max-w-sm mx-auto mb-6 img-sharp"
            />
            <h3 className="text-2xl font-black mb-4">100% INGREDIENTI NATURALI</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Estratti vegetali selezionati, senza sostanze chimiche, senza effetti collaterali.
              Adatto anche a vegetariani e vegani.
            </p>
          </div>
        </div>
      </section>

      {/* ATTENZIONE FALSI */}
      <section className="py-12 bg-red-600 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-4xl font-black mb-4">
            ⚠️ ATTENZIONE AI FALSI! ⚠️
          </h2>
          <p className="text-lg md:text-xl font-bold mb-6">
            Six-Slim ORIGINALE è venduto SOLO su questo sito ufficiale.
            <br/>Diffida da imitazioni vendute su Amazon, eBay o farmacie.
          </p>
          <p className="text-yellow-300 font-black text-xl">
            Formula brevettata esclusiva - 10 anni di ricerca
          </p>
        </div>
      </section>

      {/* COME FUNZIONA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            SEMPLICISSIMO DA USARE
          </h2>
          <p className="text-xl text-gray-600 mb-12 font-semibold">
            Solo 1 compressa al giorno. Nient'altro.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-3xl font-black mx-auto mb-4">1</div>
              <h4 className="text-xl font-black mb-2">PRENDI</h4>
              <p className="text-gray-600">1 compressa al mattino con un bicchiere d'acqua</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-3xl font-black mx-auto mb-4">2</div>
              <h4 className="text-xl font-black mb-2">VIVI</h4>
              <p className="text-gray-600">Continua la tua vita normale, senza diete o palestra</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-3xl font-black mx-auto mb-4">3</div>
              <h4 className="text-xl font-black mb-2">DIMAGRISCI</h4>
              <p className="text-gray-600">Guarda i chili scomparire giorno dopo giorno</p>
            </div>
          </div>
        </div>
      </section>

      {/* ORDER FORM */}
      <section id="ordina" className="py-16 bg-gradient-to-b from-orange-100 to-white scroll-mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">

            {/* Urgency Box */}
            <div className="bg-red-600 text-white text-center py-4 px-6 rounded-t-3xl">
              <p className="text-sm font-bold uppercase mb-1">⚡ OFFERTA LIMITATA - ULTIMI PEZZI ⚡</p>
              <p className="text-2xl md:text-3xl font-black">SCONTO -50% + 1+1 GRATIS</p>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-b-3xl shadow-2xl overflow-hidden border-4 border-red-600 border-t-0">

              {/* Price Section */}
              <div className="bg-gray-50 py-6 px-6 text-center border-b border-gray-200">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <span className="text-2xl text-gray-400 line-through font-bold">€98,00</span>
                  <span className="bg-red-600 text-white text-sm font-black px-3 py-1 rounded-full animate-pulse">-50%</span>
                </div>
                <p className="text-5xl md:text-6xl font-black text-green-600">€49,00</p>
                <p className="text-lg font-bold text-gray-700 mt-2">2 CONFEZIONI (60 compresse totali)</p>
                <p className="text-sm text-gray-500 font-semibold">Spedizione GRATIS • Paghi alla consegna</p>
              </div>

              {/* Form */}
              <div className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase mb-2">Nome e Cognome *</label>
                    <input
                      required
                      className="w-full border-2 border-gray-200 bg-white p-4 rounded-xl text-lg font-semibold outline-none focus:border-orange-500 transition-colors"
                      placeholder="Es: Maria Rossi"
                      value={formData.nome}
                      onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase mb-2">Numero di Telefono *</label>
                    <input
                      required
                      type="tel"
                      className="w-full border-2 border-gray-200 bg-white p-4 rounded-xl text-lg font-semibold outline-none focus:border-orange-500 transition-colors"
                      placeholder="Es: 333 1234567"
                      value={formData.telefono}
                      onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase mb-2">Indirizzo Completo *</label>
                    <input
                      required
                      className="w-full border-2 border-gray-200 bg-white p-4 rounded-xl text-lg font-semibold outline-none focus:border-orange-500 transition-colors"
                      placeholder="Via, Numero, CAP, Città"
                      value={formData.indirizzo}
                      onChange={(e) => setFormData({...formData, indirizzo: e.target.value})}
                    />
                  </div>

                  {/* Order Summary */}
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold">Six-Slim x2 (1+1 GRATIS)</span>
                      <span className="font-black text-green-600">€49,00</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-600">Spedizione Express</span>
                      <span className="font-bold text-green-600">GRATIS</span>
                    </div>
                    <div className="border-t border-green-300 pt-2 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-black">TOTALE</span>
                        <span className="text-2xl font-black text-green-600">€49,00</span>
                      </div>
                    </div>
                  </div>

                  <button
                    disabled={isSubmitting}
                    className="w-full gradient-orange text-white font-black py-5 rounded-xl text-xl uppercase shadow-lg hover:shadow-xl transition-all pulse-glow"
                  >
                    {isSubmitting ? '⏳ ELABORAZIONE...' : '🛒 ORDINA ORA - PAGO ALLA CONSEGNA'}
                  </button>

                  <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 pt-2">
                    <span className="flex items-center gap-1">🔒 Pagamento Sicuro</span>
                    <span className="flex items-center gap-1">📦 Spedizione 24/48h</span>
                    <span className="flex items-center gap-1">✅ Garanzia 30gg</span>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* RECENSIONI SECTION */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-black text-center mb-4">
            <span className="text-orange-500">MIGLIAIA</span> DI DONNE HANNO GIÀ SCELTO SIX-SLIM
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12 font-bold">
            Risultati REALI da clienti VERIFICATE
          </p>

          <div className="space-y-4">
            {recensioniImages.map((src, index) => (
              <div key={index} className="rounded-2xl overflow-hidden shadow-xl bg-white">
                <img
                  src={src}
                  alt={`Recensione cliente ${index + 1}`}
                  className="w-full h-auto img-sharp"
                />
              </div>
            ))}
          </div>

          {/* Final CTA */}
          <div className="mt-12 text-center">
            <p className="text-2xl font-black mb-6 text-gray-800">
              Unisciti a loro! <span className="text-orange-500">Ordina adesso</span> prima che finisca l'offerta!
            </p>
            <a
              href="#ordina"
              className="inline-block gradient-orange text-white text-xl md:text-2xl font-black py-5 px-12 rounded-xl shadow-lg uppercase pulse-glow"
            >
              🛒 SÌ! VOGLIO DIMAGRIRE ORA →
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="bg-orange-500 text-white py-3 px-6 rounded-xl inline-block mb-8">
            <p className="font-black">📦 SPEDIZIONE GRATIS 24/48h IN TUTTA ITALIA 🇮🇹</p>
          </div>

          <div className="flex justify-center gap-8 mb-6 text-sm font-semibold text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Termini e Condizioni</a>
            <a href="#" className="hover:text-white transition-colors">Resi e Rimborsi</a>
          </div>

          <p className="text-xs text-gray-500 mb-4 max-w-2xl mx-auto">
            Disclaimer: I risultati possono variare da persona a persona. Six-Slim è un integratore alimentare e non sostituisce una dieta equilibrata e uno stile di vita sano. Consultare il medico prima dell'uso.
          </p>

          <p className="text-sm font-bold text-gray-400">
            © 2024 SIX-SLIM™ ITALIA - Tutti i diritti riservati
          </p>
        </div>
      </footer>

      {/* MOBILE STICKY CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-orange-500 p-3 z-[90] shadow-2xl">
        <a
          href="#ordina"
          className="block w-full gradient-orange text-white text-center text-lg font-black py-4 rounded-xl uppercase"
        >
          🛒 ORDINA ORA -50% + 1+1 GRATIS
        </a>
      </div>
    </div>
  );
}
