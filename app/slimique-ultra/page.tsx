
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
          content_name: 'Slimique Ultra',
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

/**
 * COMPONENTE LANDING PAGE SLIMIQUE ULTRA
 * Struttura: Next.js App Router (Client Component)
 */

export default function LandingPage() {
  const [timeLeft, setTimeLeft] = useState(600);
  const [formData, setFormData] = useState({ nome: '', telefono: '', indirizzo: '', citta: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Get UTM params from URL if available
      const urlParams = new URLSearchParams(window.location.search);
      const affSub1 = urlParams.get('aff_sub1') || urlParams.get('utm_source') || '';
      const affSub2 = urlParams.get('aff_sub2') || urlParams.get('utm_campaign') || '';

      const response = await fetch('/api/slimique-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.nome,
          phone: formData.telefono,
          address: formData.indirizzo,
          aff_sub1: affSub1,
          aff_sub2: affSub2
        })
      });

      const result = await response.json();
      console.log('API Result:', result);

      // Track Purchase event on Facebook Pixel
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const win = window as any;
      if (typeof win.fbq === 'function') {
        win.fbq('track', 'Purchase', {
          content_name: 'Slimique Ultra',
          content_category: 'Health',
          content_type: 'product',
          value: 49,
          currency: 'EUR'
        });
        console.log('[FB Pixel] Purchase tracked');
      }

      setIsSubmitting(false);
      window.location.href = '/ty/ty-slimique-ultra';
    } catch (error) {
      console.error('Order submission error:', error);
      setIsSubmitting(false);
      window.location.href = '/ty/ty-slimique-ultra';
    }
  };

  const tickerContent = (
    <>
      <span className="mx-4">🔥 OFFERTA FLASH: 2 CONFEZIONI A SOLI 49€ 🔥</span>
      <span className="mx-4">🕒 SCADE TRA: {formatTime(timeLeft)} 🕒</span>
      <span className="mx-4">📦 SPEDIZIONE GRATUITA 📦</span>
      <span className="mx-4">💰 PAGAMENTO ALLA CONSEGNA 💰</span>
    </>
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-red-500 selection:text-white">
      <FacebookPixel />

      <style jsx global>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          display: flex;
          width: fit-content;
          animation: ticker-scroll 25s linear infinite;
        }
        .headline { line-height: 1.1; letter-spacing: -1.5px; }
        .border-red-dashed { border: 3px dashed #e11d48; }
        .highlight { background-color: #ffff00; font-weight: 800; padding: 0 4px; }
        .img-sharp {
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
          filter: contrast(1.05) saturate(1.1);
          -webkit-filter: contrast(1.05) saturate(1.1);
        }
      `}</style>

      {/* 1. URGENCY BANNER (FIXED MOBILE) */}
      <div className="bg-black text-white py-3 overflow-hidden sticky top-0 z-[100] border-b-2 border-red-600">
        <div className="animate-ticker whitespace-nowrap flex items-center text-[11px] md:text-sm font-black uppercase">
          <div className="flex flex-nowrap shrink-0">{tickerContent}{tickerContent}</div>
          <div className="flex flex-nowrap shrink-0">{tickerContent}{tickerContent}</div>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <header className="pt-8 pb-12 border-b-8 border-red-600">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-red-600 font-black uppercase text-sm md:text-lg mb-4 italic animate-pulse">
            ⚠️ ATTENZIONE: Leggi subito prima che l'offerta scada definitivamente
          </p>
          <h1 className="headline text-4xl md:text-7xl font-[900] mb-6 uppercase tracking-tight">
            BASTA NASCONDERSI! <br/>
            <span className="text-red-600">ELIMINA IL GRASSO</span> E SBLOCCA IL METABOLISMO IN 7 GIORNI!
          </h1>
          <p className="text-xl md:text-3xl font-extrabold mb-10 leading-tight">
            Niente Fame, Niente Stress. <br/>
            <span className="highlight">L'unica Formula 100% Naturale con Azione Termogenica.</span>
          </p>
          
          <div className="bg-gray-100 p-8 rounded-2xl mb-10 inline-block border-4 border-black/10 shadow-xl">
            <p className="text-3xl md:text-4xl font-black uppercase leading-none">
              PROMO EXCLUSIVE: <br/>
              <span className="text-red-600 text-5xl md:text-6xl">2 CONFEZIONI A 49€</span>
            </p>
            <p className="text-sm font-bold text-gray-500 mt-2">PAGHI ALLA CONSEGNA - SPEDIZIONE GRATIS</p>
          </div>

          <div className="max-w-md mx-auto relative group">
            <img
              src="/images/slimique-ultra/1.png"
              alt="Slimique Ultra Pack"
              className="w-full h-auto shadow-2xl mb-10 rounded-lg transform transition-transform group-hover:scale-105 img-sharp"
            />
            <div className="absolute -top-5 -right-5 bg-red-600 text-white font-black p-4 rounded-full shadow-lg -rotate-12">
              -55% OGGI
            </div>
          </div>

          <a 
            href="#ordina" 
            className="block w-full max-w-xl mx-auto bg-[#28a745] hover:bg-green-700 text-white text-3xl md:text-5xl font-black py-8 rounded-2xl shadow-[0_10px_0_rgb(22,101,31)] hover:shadow-none transition-all uppercase tracking-tighter"
          >
            SÌ! VOGLIO DIMAGRIRE ORA
          </a>
        </div>
      </header>

      {/* 3. PROBLEM SECTION (COPY AGGRESSIVO) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-12 uppercase text-red-600 leading-none">
            TI SENTI UN FALLIMENTO QUANDO TI GUARDI ALLO SPECCHIO?
          </h2>
          
          <div className="space-y-8 text-xl md:text-2xl leading-relaxed text-gray-800">
            <p>È inutile girarci intorno: <strong>guardarsi e non riconoscersi fa male.</strong></p>
            <p>La pancia è sempre gonfia, i fianchi sembrano esplodere da quei vecchi jeans e la stanchezza ti divora. Hai provato diete da fame che ti hanno lasciato solo nervosismo e zero chili persi.</p>
            
            <div className="bg-red-50 p-8 border-l-[12px] border-red-600 my-12">
              <h4 className="font-black text-red-600 uppercase text-2xl mb-4 italic">Il Grasso è una prigione:</h4>
              <ul className="list-none space-y-4 font-bold text-lg">
                <li>❌ Ti vergogni ad andare in spiaggia o in piscina</li>
                <li>❌ Ti senti osservata e giudicata per il tuo peso</li>
                <li>❌ Hai paura di problemi di salute seri</li>
                <li>❌ Il tuo metabolismo è letteralmente BLOCCATO</li>
              </ul>
            </div>

            <p>La verità? <strong>Non è colpa tua.</strong> È il tuo corpo che ha smesso di bruciare grassi. Ma oggi puoi resettare tutto.</p>
            <p className="font-black text-center text-3xl py-10 underline decoration-red-600 decoration-8 underline-offset-8">RIPRENDITI IL TUO CORPO, ORA.</p>

            {/* Image 4 */}
            <div className="mt-12 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/slimique-ultra/4.png"
                alt="Trasformazione corpo"
                className="w-full h-auto img-sharp"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. SOCIAL PROOF SECTION (MAGAZINES & TV) */}
      <section className="py-16 bg-[#fdf2f2] border-y border-red-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            <div className="flex flex-col">
              <div className="bg-[#b183a3] py-5 px-6 mb-8 rounded-lg">
                <h3 className="text-2xl md:text-4xl font-black text-center text-white leading-tight uppercase">
                  Cosa succede al tuo corpo in 7 giorni?
                </h3>
              </div>
              
              <ul className="space-y-8">
                {[
                  "Pancia piatta e definita già dopo i primi utilizzi",
                  "I jeans tornano a chiudersi senza fatica",
                  "Gambe leggere, slanciate e senza cellulite",
                  "Fame nervosa e attacchi di dolce SCOMPARSI",
                  "Pelle compatta e tonica su pancia e cosce",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-5">
                    <i className="fas fa-check-circle text-green-500 text-3xl shrink-0"></i>
                    <p className="text-xl font-bold italic leading-tight">{item}</p>
                  </li>
                ))}
                <li className="flex items-start gap-5 pt-4">
                  <i className="fas fa-star text-yellow-500 text-3xl shrink-0"></i>
                  <p className="text-xl font-black">
                    Zero sforzo, cambiamento totale: <span className="text-red-600 underline">li applichi e dimagrisci</span> mentre vivi la tua vita.
                  </p>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 shadow-2xl rounded-xl border-4 border-[#b183a3]/20 relative overflow-hidden">
              <div className="text-center mb-8">
                <p className="text-[#b183a3] font-black text-lg uppercase tracking-widest mb-2">As Seen On / Come Visto Su</p>
                <div className="h-1 w-20 bg-[#b183a3] mx-auto"></div>
              </div>

              {/* Media Display */}
              <div className="mb-10">
                <img
                  src="/images/slimique-ultra/3.png"
                  className="w-full rounded-lg shadow-lg img-sharp"
                  alt="Come visto su"
                />
              </div>

              <div className="grid grid-cols-3 md:grid-cols-6 gap-6 items-center justify-items-center opacity-60">
                <span className="font-black text-xl italic">Rai 1</span>
                <span className="font-black text-xl italic text-red-600">TG5</span>
                <span className="font-black text-xl italic text-blue-800">LA7</span>
                <span className="font-black text-xl italic">TGR</span>
                <span className="font-black text-xl italic">Rai 2</span>
                <span className="font-black text-xl italic text-red-600">Mediaset</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-12 uppercase text-red-600 leading-none">
            LE NOSTRE CLIENTI PARLANO
          </h2>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/images/slimique-ultra/2.png"
              alt="Recensioni clienti"
              className="w-full h-auto img-sharp"
            />
          </div>
        </div>
      </section>

      {/* +2000 CLIENTI SODDISFATTI SECTION */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-8 uppercase">
            <span className="text-red-600">+2000</span> CLIENTI SODDISFATTI
          </h2>
          <p className="text-xl md:text-2xl font-bold text-gray-600 mb-12">
            Unisciti a migliaia di donne che hanno già trasformato il loro corpo!
          </p>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/images/slimique-ultra/7.png"
              alt="Clienti soddisfatti"
              className="w-full h-auto img-sharp"
            />
          </div>
        </div>
      </section>

      {/* 5. SOLUTION SECTION */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-5xl font-black mb-6 uppercase text-red-600">PERCHÉ SLIMIQUE ULTRA È DIVERSO?</h2>
          <p className="text-2xl font-bold mb-16 text-gray-400 italic">Non è una pillola magica, è pura bio-tecnologia applicata al dimagrimento.</p>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: "fa-fire", title: "TERMOGENESI H24", desc: "Brucia grassi anche mentre dormi sul divano o riposi." },
              { icon: "fa-ban", title: "BLOCCO FAME", desc: "Annulla la voglia di dolci e carboidrati istantaneamente." },
              { icon: "fa-tint-slash", title: "DRENAGGIO URTO", desc: "Elimina i liquidi ristagnanti che causano il gonfiore." }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 p-10 rounded-3xl border border-white/10">
                <i className={`fas ${item.icon} text-red-600 text-6xl mb-6`}></i>
                <h4 className="text-2xl font-black mb-4 uppercase">{item.title}</h4>
                <p className="text-gray-400 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MINISTERO DELLA SALUTE SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-8 uppercase">
            <span className="text-green-600">APPROVATO</span> DAL MINISTERO DELLA SALUTE
          </h2>
          <p className="text-xl md:text-2xl font-bold text-gray-600 mb-12">
            Prodotto sicuro, testato e certificato per il tuo benessere.
          </p>
          <div className="rounded-2xl overflow-hidden shadow-2xl max-w-2xl mx-auto">
            <img
              src="/images/slimique-ultra/5.png"
              alt="Approvato dal Ministero della Salute"
              className="w-full h-auto img-sharp"
            />
          </div>
        </div>
      </section>

      {/* 6. ORDER FORM */}
      <section id="ordina" className="py-16 md:py-24 bg-gradient-to-b from-gray-100 to-white scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">

            {/* Product Summary Card */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-red-600">

              {/* Header */}
              <div className="bg-red-600 text-white py-4 px-6 text-center">
                <p className="text-sm font-bold uppercase tracking-wider mb-1">Offerta Speciale Limitata</p>
                <h3 className="text-2xl md:text-3xl font-black uppercase">SLIMIQUE ULTRA 2x1</h3>
              </div>

              {/* Price Section */}
              <div className="bg-gray-50 py-6 px-6 text-center border-b border-gray-200">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <span className="text-2xl text-gray-400 line-through font-bold">€98,00</span>
                  <span className="bg-red-600 text-white text-sm font-black px-3 py-1 rounded-full">-50%</span>
                </div>
                <p className="text-5xl md:text-6xl font-black text-red-600">€49,00</p>
                <p className="text-sm text-gray-500 font-bold mt-2">2 Confezioni • Spedizione GRATIS</p>
              </div>

              {/* Form */}
              <div className="p-6 md:p-8">
                {isSuccess ? (
                  <div className="bg-green-500 text-white p-8 rounded-2xl text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-black mb-2">ORDINE CONFERMATO!</h3>
                    <p className="font-bold">Ti contatteremo a breve per la conferma.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-black text-gray-500 uppercase mb-2">Nome e Cognome</label>
                      <input
                        required
                        className="w-full border-2 border-gray-200 bg-white p-4 rounded-xl text-lg font-semibold outline-none focus:border-red-600 transition-colors"
                        placeholder="Mario Rossi"
                        onChange={(e) => setFormData({...formData, nome: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-gray-500 uppercase mb-2">Numero di Telefono</label>
                      <input
                        required
                        type="tel"
                        className="w-full border-2 border-gray-200 bg-white p-4 rounded-xl text-lg font-semibold outline-none focus:border-red-600 transition-colors"
                        placeholder="333 1234567"
                        onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-gray-500 uppercase mb-2">Indirizzo Completo (Via, Città, CAP)</label>
                      <input
                        required
                        className="w-full border-2 border-gray-200 bg-white p-4 rounded-xl text-lg font-semibold outline-none focus:border-red-600 transition-colors"
                        placeholder="Via Roma 10, 00100 Roma"
                        onChange={(e) => setFormData({...formData, indirizzo: e.target.value})}
                      />
                    </div>

                    {/* Order Summary */}
                    <div className="bg-gray-50 rounded-xl p-4 mt-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600 font-semibold">Slimique Ultra (2 conf.)</span>
                        <span className="font-bold">€49,00</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600 font-semibold">Spedizione</span>
                        <span className="font-bold text-green-600">GRATIS</span>
                      </div>
                      <div className="border-t border-gray-200 pt-3 mt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-black">TOTALE</span>
                          <span className="text-2xl font-black text-red-600">€49,00</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 text-right">Pagamento alla consegna</p>
                      </div>
                    </div>

                    <button
                      disabled={isSubmitting}
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-black py-5 rounded-xl text-xl uppercase shadow-lg hover:shadow-xl transition-all mt-4"
                    >
                      {isSubmitting ? 'ELABORAZIONE...' : 'CONFERMA ORDINE →'}
                    </button>

                    <div className="flex items-center justify-center gap-4 text-sm text-gray-500 pt-2">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                        Pagamento Sicuro
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/><path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"/></svg>
                        Spedizione Gratis
                      </span>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. FOOTER MINIMALE */}
      <footer className="bg-white py-16 text-center border-t-2 border-gray-100">
        <div className="container mx-auto px-4 max-w-4xl text-[10px] md:text-xs text-gray-400 space-y-6 leading-relaxed">
          <div className="flex justify-center gap-8 mb-4 font-bold uppercase tracking-widest text-gray-500">
             <a href="#" className="hover:text-red-600 transition-colors">Privacy</a>
             <a href="#" className="hover:text-red-600 transition-colors">Termini</a>
             <a href="#" className="hover:text-red-600 transition-colors">Resi</a>
          </div>
          <p className="italic">Disclaimer: I risultati possono variare da individuo a individuo e non sono garantiti. Slimique Ultra non è un farmaco e non sostituisce un regime alimentare controllato e attività fisica costante.</p>
          <p className="font-bold">Copyright © 2024 - SLIMIQUE ULTRA™ OFFICIAL ITALIA - Tutti i diritti riservati.</p>
        </div>
      </footer>
    </div>
  );
}
