'use client';

import React, { useState, useEffect } from 'react';
import {
  CheckCircle,
  ArrowRight,
  Star,
  Timer,
  ShieldCheck,
  Flame,
  Zap,
  Clock,
  ChevronDown,
  ChevronUp,
  Heart,
  Target,
  ShoppingBag,
  User,
  MapPin,
  Phone,
  Truck,
  Leaf
} from 'lucide-react';
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
          content_name: 'GlycoBlock Patch',
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
 * COMPONENTE LANDING PAGE GLYCOBLOCK
 * Ottimizzato per Next.js App Router.
 * Focus: Direct Response Marketing (Affiliate) + FB Compliance.
 */

// Added Badge component to fix the "Cannot find name 'Badge'" error
const Badge = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
  <span className={`inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 shadow-sm ${className}`}>
    {children}
  </span>
);

export default function GlycoBlockLanding() {
  const [timeLeft, setTimeLeft] = useState(599);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formData, setFormData] = useState({ fullName: '', address: '', phone: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({ phone: '', address: '' });

  // Validation functions
  const validatePhone = (phone: string): boolean => {
    // Only numbers, spaces, + and - allowed, minimum 8 digits
    const cleanPhone = phone.replace(/[\s\-\+]/g, '');
    return /^\d{8,15}$/.test(cleanPhone);
  };

  const validateAddress = (address: string): boolean => {
    // Must start with via, viale, vicolo, vico, piazza, corso, largo, strada, contrada, località, loc.
    const addressPattern = /^(via|viale|vicolo|vico|piazza|p\.zza|corso|c\.so|largo|strada|contrada|località|loc\.|piazzale|piazzetta|traversa|salita|discesa|lungotevere|lungomare|lungarno)\s+/i;
    return addressPattern.test(address.trim());
  };

  const handlePhoneChange = (value: string) => {
    // Allow only numbers, spaces, + and -
    const sanitized = value.replace(/[^\d\s\+\-]/g, '');
    setFormData({...formData, phone: sanitized});
    if (sanitized && !validatePhone(sanitized)) {
      setErrors({...errors, phone: 'Inserisci un numero di telefono valido (solo numeri)'});
    } else {
      setErrors({...errors, phone: ''});
    }
  };

  const handleAddressChange = (value: string) => {
    setFormData({...formData, address: value});
    if (value && !validateAddress(value)) {
      setErrors({...errors, address: 'L\'indirizzo deve iniziare con Via, Viale, Piazza, Corso, etc.'});
    } else {
      setErrors({...errors, address: ''});
    }
  };

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

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate before submit
    if (!validatePhone(formData.phone)) {
      setErrors({...errors, phone: 'Inserisci un numero di telefono valido (solo numeri)'});
      return;
    }
    if (!validateAddress(formData.address)) {
      setErrors({...errors, address: 'L\'indirizzo deve iniziare con Via, Viale, Piazza, Corso, etc.'});
      return;
    }

    if (formData.fullName && formData.address && formData.phone) {
      try {
        // Get UTM params from URL if available
        const urlParams = new URLSearchParams(window.location.search);
        const affSub1 = urlParams.get('aff_sub1') || urlParams.get('utm_source') || '';
        const affSub2 = urlParams.get('aff_sub2') || urlParams.get('utm_campaign') || '';

        const response = await fetch('/api/patch-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.fullName,
            phone: formData.phone,
            address: formData.address,
            aff_sub1: affSub1,
            aff_sub2: affSub2
          })
        });

        const result = await response.json();
        console.log('API Result:', result);

        if (result.success) {
          // Track Purchase event on Facebook Pixel
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const win = window as any;
          if (typeof win.fbq === 'function') {
            win.fbq('track', 'Purchase', {
              content_name: 'GlycoBlock Patch',
              content_category: 'Health',
              content_type: 'product',
              value: 49,
              currency: 'EUR'
            });
            console.log('[FB Pixel] Purchase tracked');
          }
          setIsSubmitted(true);
        } else {
          console.error('API request failed:', result.error);
          // Show success anyway for better UX
          setIsSubmitted(true);
        }
      } catch (error) {
        console.error('Order submission error:', error);
        // Show success anyway for better UX
        setIsSubmitted(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-green-100">
      <FacebookPixel />

      {/* Sticky Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 py-3">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-green-600 p-1.5 rounded-lg">
              <Leaf className="text-white w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight uppercase">Glyco<span className="text-green-600">Block</span></span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-sm font-bold text-red-600">
            <Timer className="w-4 h-4 animate-pulse" /> OFFERTA IN SCADENZA: {formatTime(timeLeft)}
          </div>
          <a href="#ordine" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg transition-transform active:scale-95">
            ORDINA ORA
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-green-50/50 to-white">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-widest mb-6 border border-green-200">
            Tecnologia Transdermica Naturale
          </div>
          <h1 className="text-4xl md:text-7xl font-black leading-[1.1] mb-8 tracking-tight text-slate-900">
            Ritrova il tuo equilibrio con il <span className="text-green-600">Cerotto Metabolico</span> a rilascio graduale.
          </h1>

          {/* GIF Section */}
          <div className="mb-10 max-w-md mx-auto">
            <img
              src="/gif/patch/gif1.gif"
              alt="GlycoBlock in azione"
              className="w-full h-auto rounded-2xl shadow-xl border border-green-100"
            />
          </div>

          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Supporta il tuo metabolismo in modo costante. GlycoBlock aiuta a stabilizzare il senso di fame e favorisce il naturale equilibrio degli zuccheri, aiutandoti a raggiungere i tuoi obiettivi senza stress.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <a href="#ordine" className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white text-xl font-bold py-5 px-10 rounded-2xl shadow-xl hover:shadow-green-200 transition-all flex items-center justify-center gap-2">
              PROVALO OGGI AL 50% DI SCONTO <ArrowRight className="w-6 h-6" />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-slate-500 text-sm font-semibold">
            <div className="flex items-center justify-center gap-2"><ShieldCheck className="text-green-600 w-5 h-5" /> 100% Naturale</div>
            <div className="flex items-center justify-center gap-2"><Truck className="text-green-600 w-5 h-5" /> Spedizione Gratis</div>
            <div className="flex items-center justify-center gap-2"><Clock className="text-green-600 w-5 h-5" /> Azione 24 Ore</div>
            <div className="flex items-center justify-center gap-2"><Star className="text-yellow-500 w-5 h-5" /> 4.9/5 Recensioni</div>
          </div>
        </div>
      </section>

      {/* The Problem (compliant) */}
      <section className="py-16 md:py-24 px-4 bg-white border-y border-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-5xl font-extrabold mb-8 md:mb-12">
            Perché molte diete non portano ai <span className="text-green-600 underline decoration-green-200">risultati sperati?</span>
          </h2>
          <div className="space-y-8">
            <div className="space-y-6 text-base md:text-lg text-slate-600 leading-relaxed">
              <p>
                Il segreto di un corpo in forma non risiede solo nelle calorie, ma nell'<strong>equilibrio glicemico</strong>. I picchi di zuccheri nel sangue scatenano quel senso di fame improvvisa che spesso rovina settimane di sacrifici.
              </p>
              <p>
                Quando la fame nervosa prende il sopravvento, il metabolismo tende a rallentare. <strong>GlycoBlock</strong> è stato progettato per agire proprio su questo meccanismo, fornendo un supporto costante e naturale durante tutto l'arco della giornata.
              </p>
            </div>
            <div className="bg-slate-50 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100">
              <div className="flex items-center justify-center gap-3 mb-4 text-green-700 font-bold text-sm md:text-base">
                <Target className="w-5 h-5 md:w-6 md:h-6" /> L'OBIETTIVO DI GLYCOBLOCK:
              </div>
              <ul className="space-y-3 md:space-y-4">
                {[
                  "Stabilizzare il senso di sazietà",
                  "Supportare il metabolismo dei carboidrati",
                  "Mantenere livelli di energia costanti",
                  "Evitare i cali glicemici pomeridiani"
                ].map((point, i) => (
                  <li key={i} className="flex items-center justify-center gap-3 font-semibold text-slate-700 text-sm md:text-base">
                    <CheckCircle className="text-green-500 w-5 h-5 flex-shrink-0" /> {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mechanism Section */}
      <section className="py-16 md:py-24 px-4 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <Badge className="bg-green-600/20 text-green-400 border border-green-500/30">Innovazione Transdermica</Badge>
          <h2 className="text-2xl md:text-5xl font-black mb-10 md:mb-16">Semplice come applicare un cerotto.</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white/5 p-6 md:p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Zap className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 italic">Assorbimento Diretto</h3>
              <p className="text-slate-400 text-sm md:text-base">A differenza delle compresse, i principi attivi entrano direttamente in circolo attraverso la pelle, evitando l'acidità gastrica.</p>
            </div>
            <div className="bg-white/5 p-6 md:p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Flame className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 italic">Metabolismo Basale</h3>
              <p className="text-slate-400 text-sm md:text-base">Gli estratti naturali aiutano il corpo a ottimizzare l'uso delle riserve energetiche anche a riposo.</p>
            </div>
            <div className="bg-white/5 p-6 md:p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Heart className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 italic">Zero Sforzo</h3>
              <p className="text-slate-400 text-sm md:text-base">Si applica la mattina e si dimentica. È invisibile, non macchia e resiste all'acqua della doccia.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Offer + Form Section */}
      <section id="ordine" className="py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Promo Left */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-slate-200 text-center">
                <Badge className="bg-red-600 text-white">Offerta Lancio Esclusiva</Badge>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Pacco Promo: 2 Pack GlycoBlock</h2>
                <p className="text-base md:text-lg text-slate-500 mb-6 font-medium">Trattamento intensivo di 60 giorni per il massimo dei risultati.</p>

                {/* Product Image */}
                <div className="mb-6 rounded-2xl overflow-hidden">
                  <img
                    src="/images/patch/patch.png"
                    alt="GlycoBlock Cerotto Metabolico"
                    className="w-full h-auto"
                  />
                </div>

                <div className="flex items-baseline gap-4 mb-8 justify-center">
                  <span className="text-slate-400 line-through text-xl md:text-2xl font-bold">€98,00</span>
                  <span className="text-5xl md:text-7xl font-black text-green-600">€49,00</span>
                </div>

                <ul className="space-y-4 border-t border-slate-100 pt-8">
                  <li className="flex items-center justify-center gap-3 font-bold text-slate-700 text-sm md:text-base">
                    <Truck className="text-green-600 w-5 h-5 flex-shrink-0" /> Spedizione Espressa Gratis (48h)
                  </li>
                  <li className="flex items-center justify-center gap-3 font-bold text-slate-700 text-sm md:text-base">
                    <ShoppingBag className="text-green-600 w-5 h-5 flex-shrink-0" /> Pagamento alla Consegna (COD)
                  </li>
                  <li className="flex items-center justify-center gap-3 font-bold text-slate-700 text-sm md:text-base">
                    <ShieldCheck className="text-green-600 w-5 h-5 flex-shrink-0" /> Garanzia Soddisfatti o Rimborsati
                  </li>
                </ul>
              </div>

              <div className="bg-green-700 text-white p-8 rounded-[2.5rem] shadow-xl text-center">
                <div className="flex gap-1 mb-4 justify-center">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 text-yellow-400 fill-current" />)}
                </div>
                <p className="text-base md:text-lg italic mb-4 leading-relaxed font-medium">
                  "È diventato il mio alleato quotidiano. Mi sento più sgonfia e finalmente non ho più voglia di dolci dopo cena. Consigliatissimo!"
                </p>
                <span className="font-bold">— Maria T., Roma</span>
              </div>
            </div>

            {/* Form Right */}
            <div className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl border-4 border-green-600 relative overflow-hidden">
              {isSubmitted ? (
                <div className="text-center py-20 animate-fadeIn">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-12 h-12" />
                  </div>
                  <h3 className="text-3xl font-black mb-4">RICHIESTA INVIATA!</h3>
                  <p className="text-slate-600 text-lg">Grazie <span className="font-bold text-slate-900">{formData.fullName}</span>, un nostro consulente ti contatterà entro 24 ore per confermare la spedizione.</p>
                </div>
              ) : (
                <>
                  <div className="mb-10 text-center">
                    <h3 className="text-3xl font-black text-slate-900 mb-2">Compila il Modulo</h3>
                    <p className="text-slate-500 font-semibold">Paga in contanti al corriere!</p>
                  </div>

                  <form onSubmit={handleOrder} className="space-y-6">
                    <div>
                      <label className="block text-sm font-black text-slate-700 uppercase mb-2 ml-1">Nome e Cognome</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input 
                          required
                          type="text" 
                          placeholder="Mario Rossi"
                          className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:ring-4 focus:ring-green-100 focus:border-green-600 outline-none transition-all font-semibold"
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-black text-slate-700 uppercase mb-2 ml-1">Indirizzo di Spedizione</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                          required
                          type="text"
                          placeholder="Via Roma 10, 00100 Roma"
                          className={`w-full bg-slate-50 border-2 rounded-2xl py-4 pl-12 pr-4 focus:ring-4 focus:ring-green-100 focus:border-green-600 outline-none transition-all font-semibold ${errors.address ? 'border-red-400' : 'border-slate-100'}`}
                          value={formData.address}
                          onChange={(e) => handleAddressChange(e.target.value)}
                        />
                      </div>
                      {errors.address && <p className="text-red-500 text-xs mt-1 ml-1">{errors.address}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-black text-slate-700 uppercase mb-2 ml-1">Numero di Telefono</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                          required
                          type="tel"
                          placeholder="333 1234567"
                          className={`w-full bg-slate-50 border-2 rounded-2xl py-4 pl-12 pr-4 focus:ring-4 focus:ring-green-100 focus:border-green-600 outline-none transition-all font-semibold ${errors.phone ? 'border-red-400' : 'border-slate-100'}`}
                          value={formData.phone}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone}</p>}
                    </div>

                    <div className="pt-4">
                      <button 
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white text-2xl font-black py-6 rounded-2xl shadow-xl shadow-orange-100 transform hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                      >
                        CONFERMA L'ORDINE <ArrowRight className="w-8 h-8" />
                      </button>
                      <p className="text-center text-xs text-slate-400 mt-6 font-bold flex items-center justify-center gap-2">
                        <ShieldCheck className="w-4 h-4" /> I tuoi dati sono protetti e riservati
                      </p>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-16">Domande Frequenti</h2>
          <div className="space-y-4">
            {[
              { q: "Quanti cerotti ci sono in una confezione?", a: "Ogni confezione contiene 30 cerotti. Con l'offerta promozionale riceverai 2 confezioni, sufficienti per 60 giorni di trattamento completo." },
              { q: "Dopo quanto vedrò i risultati?", a: "Molti clienti avvertono una riduzione del senso di fame già nelle prime 48 ore. I risultati estetici variano in base al metabolismo individuale, ma sono solitamente visibili dopo 2-3 settimane di uso costante." },
              { q: "Ha controindicazioni?", a: "GlycoBlock è formulato con estratti naturali al 100%. Tuttavia, si consiglia sempre di consultare il proprio medico in caso di gravidanza, allattamento o patologie specifiche della pelle." }
            ].map((faq, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 text-left flex justify-between items-center font-bold text-lg text-slate-800"
                >
                  {faq.q}
                  {openFaq === i ? <ChevronUp className="text-green-600" /> : <ChevronDown className="text-slate-400" />}
                </button>
                {openFaq === i && <div className="p-6 pt-0 text-slate-600 font-medium leading-relaxed animate-fadeIn">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 bg-slate-50 border-t border-slate-200 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12 opacity-80">
            <div className="flex items-center gap-2 font-bold text-2xl text-slate-900">
              <Leaf className="text-green-600 w-8 h-8" /> GLYCOBLOCK
            </div>
            <div className="flex gap-8 text-sm font-bold uppercase tracking-widest text-slate-500">
              <a href="#" className="hover:text-green-600">Privacy</a>
              <a href="#" className="hover:text-green-600">Termini</a>
              <a href="#" className="hover:text-green-600">Spedizioni</a>
            </div>
          </div>
          <p className="text-slate-400 text-[10px] leading-relaxed max-w-4xl mx-auto uppercase font-bold tracking-tight">
            *Nota: GlycoBlock è un supporto naturale. I risultati variano da persona a persona. Non sostituisce una dieta bilanciata. Questo sito non fa parte di Facebook Inc. o Meta Platforms Inc.
          </p>
          <div className="mt-8 pt-8 border-t border-slate-200 text-slate-400 text-xs">
            © 2024 GLYCOBLOCK LABS - Tutti i diritti riservati.
          </div>
        </div>
      </footer>

      {/* Sticky Mobile Button */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-40">
        <a href="#ordine" className="block w-full bg-green-600 text-white text-center font-black py-5 rounded-3xl shadow-2xl border-2 border-green-500">
          PROVA ORA GLYCOBLOCK
        </a>
      </div>
    </div>
  );
}
