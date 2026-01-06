
'use client';

import React, { useState } from 'react';
import Script from 'next/script';
import {
  CheckCircle2,
  AlertTriangle,
  TrendingDown,
  Zap,
  ShieldCheck,
  Clock,
  Package,
  Star,
  ThumbsUp,
  Wind,
  Thermometer,
  VolumeX,
  ShoppingCart,
  ChevronRight,
  Truck,
  Award,
  ShieldAlert,
  ZapOff,
  Stethoscope
} from 'lucide-react';

/**
 * CUSTOM STYLES & CONFIG
 * Questi colori riflettono l'identità premium definita
 */
const colors = {
  primaryBlue: '#0f172a',
  premiumGold: '#c5a059',
  actionRed: '#dc2626',
};

// --- Global Urgency Bar ---
const TopUrgency = () => (
  <div className="bg-red-600 text-white text-[10px] md:text-xs py-2 px-4 font-bold text-center uppercase tracking-widest animate-pulse sticky top-0 z-[110]">
    ⚠️ SCORTE IN ESAURIMENTO: SOLO 9 UNITÀ DISPONIBILI A QUESTO PREZZO ⚠️
  </div>
);

// --- Amazon Style Reviews Section ---
const AmazonReviews = () => {
  const reviews = [
    { name: "Marco Valeri", date: "14 Febbraio 2026", text: "Incredibile. Asciuga davvero 4kg di roba senza problemi. In meno di 45 minuti ho le camicie pronte, sterilizzate e calde. Il risparmio in bolletta si vede già dopo il primo mese.", img: "m1" },
    { name: "Elena G.", date: "2 Marzo 2026", text: "La uso soprattutto per le lenzuola. Arriva a una temperatura che elimina l'odore di chiuso. Mai più senza, specialmente d'inverno a Milano.", img: "w1" },
    { name: "Sandro B.", date: "10 Marzo 2026", text: "Prodotto solido. Non è la solita cinesata. Il cestello inox è indistruttibile. Pagato alla consegna al corriere, tutto perfetto.", img: "m2" }
  ];

  return (
    <section id="recensioni" className="py-12 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Star className="text-orange-400 fill-current" size={24} /> Recensioni Clienti Certificati
        </h2>
        <div className="flex flex-col md:flex-row gap-8 mb-10 pb-8 border-b">
          <div className="md:w-1/3 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="text-4xl font-black">4.9</span>
              <div className="flex text-orange-400">
                {[1,2,3,4,5].map(s => <Star key={s} size={20} fill="currentColor" />)}
              </div>
            </div>
            <span className="text-sm text-slate-500">Basato su 14.582 acquirenti</span>
            <div className="mt-4 space-y-2">
              {[
                { stars: 5, pct: "94%" },
                { stars: 4, pct: "5%" },
                { stars: 3, pct: "1%" },
                { stars: 2, pct: "0%" },
                { stars: 1, pct: "0%" }
              ].map(row => (
                <div key={row.stars} className="flex items-center gap-2 text-xs text-blue-600">
                  <span className="w-12">{row.stars} stelle</span>
                  <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-400" style={{ width: row.pct }}></div>
                  </div>
                  <span className="text-slate-500 w-8">{row.pct}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-2/3 bg-slate-50 p-6 rounded-2xl">
            <h3 className="font-bold text-slate-900 mb-2 italic">"Il miglior investimento per la casa del 2026"</h3>
            <p className="text-sm text-slate-600">Il 99.4% degli utenti ha dichiarato di aver ridotto drasticamente l'odore di umidità in casa e di aver risparmiato mediamente 45€ al mese in elettricità.</p>
          </div>
        </div>

        <div className="space-y-8">
          {reviews.map((r, i) => (
            <div key={i} className="pb-8 border-b last:border-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700 text-sm">
                  {r.name[0]}
                </div>
                <div>
                  <span className="text-sm font-bold block">{r.name}</span>
                  <div className="flex items-center gap-1">
                    <div className="flex text-orange-400">
                      {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="currentColor" />)}
                    </div>
                    <span className="text-[10px] text-green-600 font-bold uppercase tracking-tighter">Acquisto Verificato</span>
                  </div>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-slate-800 font-medium">"{r.text}"</p>
              <span className="text-[10px] text-slate-400 block mt-2">Recensito il {r.date}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Video Section ---
const VideoSection = () => (
  <section className="py-16 px-4 bg-slate-100">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4">
          GUARDA IL <span className="text-blue-700 italic">MORUS ZERO DRYPRO 360 ULTRA</span> IN AZIONE
        </h2>
        <p className="text-slate-500 font-medium">Scopri come funziona e perché migliaia di italiani lo hanno già scelto.</p>
      </div>
      <div className="relative rounded-[2rem] overflow-hidden shadow-[0_30px_60px_-12px_rgba(0,0,0,0.25)] border-4 border-white">
        <video
          className="w-full"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/video/dryer/lp.mp4" type="video/mp4" />
          Il tuo browser non supporta il tag video.
        </video>
      </div>
    </div>
  </section>
);

// --- Power Specs Cards ---
const PowerSpecs = () => (
  <section className="py-16 px-4 bg-[#0f172a] text-white overflow-hidden relative">
    <div className="absolute top-0 right-0 w-64 h-64 bg-[#c5a059]/10 blur-[100px] rounded-full"></div>
    <div className="max-w-4xl mx-auto relative z-10">
      <h2 className="text-3xl md:text-5xl font-black mb-12 text-center uppercase tracking-tighter leading-none">
        POTENZA <span className="text-[#c5a059] italic">SENZA COMPROMESSI</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { icon: <Package size={32} />, title: "Capacità XL 4KG", desc: "Asciuga fino a 12 camicie o un set completo di lenzuola matrimoniali in un solo ciclo. La più capiente della categoria portatile." },
          { icon: <Thermometer size={32} />, title: "Igienizzazione 65°C", desc: "Raggiunge la temperatura termica critica per sterminare il 99,9% di batteri, acari e allergeni annidati nelle fibre umide." },
          { icon: <Clock size={32} />, title: "Turbo-Dry 45 Minuti", desc: "Capi asciutti, caldi e pronti da indossare in meno di 45 minuti. Non aspettare più 2 giorni sullo stendino." },
          { icon: <ZapOff size={32} />, title: "Taglia-Bolletta Real", desc: "Consuma solo 0,18€ per ciclo. Una classica asciugatrice industriale costa mediamente 1,65€ a carico. Risparmio automatico." }
        ].map((spec, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-[2rem] hover:bg-white/10 transition-all group">
            <div className="text-[#c5a059] mb-4 group-hover:scale-110 transition-transform">{spec.icon}</div>
            <h4 className="text-xl font-black mb-2 uppercase tracking-tighter">{spec.title}</h4>
            <p className="text-slate-400 text-sm leading-relaxed">{spec.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- High Conversion Order Form ---
const OrderForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <div className="bg-green-600 text-white p-12 rounded-[3rem] text-center shadow-2xl max-w-xl mx-auto my-12 animate-in fade-in zoom-in duration-500">
        <CheckCircle2 size={80} className="mx-auto mb-6" />
        <h3 className="text-3xl font-black mb-4">PRENOTAZIONE CONFERMATA!</h3>
        <p className="text-lg opacity-90">Il tuo DryPro 360 Ultra è stato riservato. Un nostro consulente ti chiamerà a breve per confermare l'indirizzo di spedizione.</p>
      </div>
    );
  }

  return (
    <section id="ordine" className="py-20 px-4 bg-slate-100">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-block bg-[#dc2626] text-white px-6 py-1 rounded-full text-sm font-black mb-4 uppercase tracking-widest animate-pulse">
            Offerta a tempo limitato
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter text-slate-900 leading-[0.9]">COMPILA IL FORM <br/><span className="text-blue-700 italic">PAGA ALLA CONSEGNA</span></h2>
          <p className="text-slate-500 font-medium">Nessuna carta richiesta. Paghi solo quando ricevi il pacco.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] text-slate-900 border border-slate-200">
          <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-100">
             <div className="flex-1">
               <span className="text-slate-400 text-xs font-bold uppercase block">Prezzo Scontato</span>
               <span className="text-4xl font-black text-blue-700">€69,99</span>
             </div>
             <div className="text-right">
               <span className="text-slate-400 text-xs font-bold uppercase block">Prezzo Listino</span>
               <span className="text-xl font-bold text-slate-300 line-through">€249,00</span>
             </div>
          </div>

          <div className="space-y-6">
            <div className="group">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-4 mb-1 block group-focus-within:text-blue-600 transition-colors">Nome e Cognome</label>
              <input required type="text" placeholder="Mario Rossi" className="w-full bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl focus:border-blue-600 transition-all shadow-inner font-bold" />
            </div>
            <div className="group">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-4 mb-1 block group-focus-within:text-blue-600 transition-colors">Indirizzo Completo (Via, N., Città, CAP)</label>
              <input required type="text" placeholder="Via Roma 1, 00100 Roma" className="w-full bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl focus:border-blue-600 transition-all shadow-inner font-bold" />
            </div>
            <div className="group">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-4 mb-1 block group-focus-within:text-blue-600 transition-colors">Cellulare (Per la consegna)</label>
              <input required type="tel" placeholder="+39 333 1234567" className="w-full bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl focus:border-blue-600 transition-all shadow-inner font-bold" />
            </div>
          </div>

          <div className="mt-10 space-y-4">
            <button disabled={loading} className="w-full bg-[#dc2626] text-white py-6 md:py-7 rounded-2xl font-black text-lg md:text-2xl shadow-[0_15px_30px_rgba(220,38,38,0.4)] hover:bg-red-700 hover:translate-y-[-2px] active:translate-y-[1px] transition-all flex flex-col items-center justify-center gap-1 md:gap-4 uppercase tracking-tighter leading-tight">
              {loading ? "ELABORAZIONE..." : (
                <>
                  <span>ORDINA ORA</span>
                  <span className="text-xs md:text-lg opacity-80">(PAGA ALLA CONSEGNA)</span>
                </>
              )}
            </button>
            <div className="flex items-center justify-center gap-6 opacity-60">
               <div className="flex items-center gap-1 text-[10px] font-black"><ShieldCheck size={14}/> DATI PROTETTI</div>
               <div className="flex items-center gap-1 text-[10px] font-black"><Truck size={14}/> SPEDIZIONE GRATIS</div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

// --- Problem Section (Pain Point) ---
const PainPoints = () => (
  <section className="py-20 px-4 bg-white">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-none tracking-tighter mb-4">
          STAI TRASFORMANDO LA TUA CASA <br/><span className="text-red-600 italic underline">IN UNA FABBRICA DI MUFFA?</span>
        </h2>
        <p className="text-slate-500 font-medium">Ogni stendino aperto rilascia fino a 2 litri d'acqua nei tuoi polmoni.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { icon: <ShieldAlert className="text-red-600" />, title: "Batteri & Patogeni", desc: "L'umidità persistente è il paradiso per gli acari. DryPro sterilizza i capi a 65°C distruggendo il problema alla radice." },
          { icon: <TrendingDown className="text-red-600" />, title: "Spreco di Denaro", desc: "Le asciugatrici tradizionali sono 'mostri energetici'. DryPro usa tecnologia Heat-Flow per consumare 1/10 della corrente." },
          { icon: <Stethoscope className="text-red-600" />, title: "Capi Rovinati", desc: "Il calore eccessivo delle lavanderie distrugge le fibre. La nostra rotazione controllata mantiene i capi nuovi come appena comprati." }
        ].map((p, i) => (
          <div key={i} className="bg-slate-50 p-8 rounded-[2.5rem] border-2 border-transparent hover:border-red-100 transition-colors">
            <div className="mb-6">{p.icon}</div>
            <h4 className="text-xl font-black mb-3 uppercase tracking-tighter leading-tight">{p.title}</h4>
            <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Hero = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const images = [
    '/images/dryer/1.jpg',
    '/images/dryer/2.jpg',
    '/images/dryer/3.jpg',
    '/images/dryer/4.jpg',
  ];

  return (
    <section className="relative pt-12 pb-20 px-4 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
        <div className="z-10 space-y-6">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-5 py-2 rounded-full font-black text-xs uppercase tracking-widest border border-blue-100 shadow-sm">
            <Zap size={14} className="animate-pulse text-yellow-500 fill-current" /> Edizione Limitata Premium 2026
          </div>
          <h1 className="text-5xl md:text-8xl font-black leading-[0.85] text-slate-900 tracking-tighter mb-6">
            IL LUSSO DI CAPI <br/><span className="text-blue-700 italic">ASCIUTTI E STERILIZZATI</span> IN <span className="underline decoration-[#c5a059]">45 MINUTI.</span>
          </h1>
          <p className="text-slate-600 text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-tight">
            Smetti di sprecare spazio e soldi. Scopri l'unica asciugatrice con <b>Capacità 4KG</b> e <b>Igienizzazione a 65°C</b> che consuma meno di una lampadina.
          </p>
        </div>

        <div className="relative w-full max-w-2xl mt-12 mb-12">
          <div className="absolute -inset-10 bg-blue-600/10 blur-[100px] rounded-full"></div>
          <img
            src={images[selectedImage]}
            alt="DryPro 360 Ultra Detail"
            className="relative rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] z-10 border-8 border-white w-full object-cover"
          />
          <div className="absolute -top-4 -right-4 z-20 bg-[#c5a059] text-[#0f172a] p-8 rounded-[2.5rem] shadow-2xl rotate-12 flex flex-col items-center justify-center border-4 border-white">
             <span className="text-xs font-black uppercase tracking-widest text-center">Sconto Prime</span>
             <span className="text-4xl font-black leading-none">-70%</span>
          </div>

          {/* Thumbnails */}
          <div className="flex justify-center gap-3 mt-6 relative z-10">
            {images.map((src, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-3 transition-all ${
                  index === selectedImage
                    ? 'border-[#c5a059] shadow-lg scale-110'
                    : 'border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={src} alt={`Vista ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <a href="#ordine" className="group w-full max-w-lg bg-[#dc2626] text-white py-6 md:py-7 rounded-[2rem] font-black text-xl md:text-2xl shadow-[0_20px_40px_rgba(220,38,38,0.4)] flex items-center justify-center gap-4 transition-all hover:scale-105 active:scale-95 uppercase tracking-tighter leading-none">
          ORDINA ORA AL -70% <ShoppingCart className="group-hover:rotate-12 transition-transform" />
        </a>
        <p className="mt-4 text-slate-400 text-sm font-bold flex items-center gap-2">
          <Clock size={16}/> Solo 14.582 persone lo hanno già ricevuto a casa
        </p>
      </div>
    </section>
  );
};

const Navbar = () => (
  <nav className="bg-white/90 backdrop-blur-xl sticky top-[24px] z-[100] border-b px-6 py-4 flex justify-between items-center shadow-sm">
    <div className="flex items-center gap-2">
      <div className="bg-[#0f172a] text-white p-2 rounded-xl">
        <Wind size={22} />
      </div>
      <span className="font-black text-2xl tracking-tighter">DRYPRO<span className="text-[#c5a059] italic uppercase">Ultra</span></span>
    </div>
    <div className="hidden md:flex gap-8 font-black text-[10px] uppercase tracking-widest text-slate-400">
      <a href="#ordine" className="hover:text-blue-700 transition-colors">Vantaggi</a>
      <a href="#ordine" className="hover:text-blue-700 transition-colors">Tecnologia</a>
      <a href="#recensioni" className="hover:text-blue-700 transition-colors">Feedback</a>
    </div>
    <a href="#ordine" className="bg-[#0f172a] text-white px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-blue-800 transition-all">
      ACQUISTA ORA
    </a>
  </nav>
);

const StickyCTA = () => (
  <div className="md:hidden fixed bottom-0 left-0 right-0 z-[200] bg-white border-t p-4 flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
    <div className="flex flex-col">
      <span className="text-[#dc2626] font-black text-3xl leading-none">€69,99</span>
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Sconto Esaurimento</span>
    </div>
    <a href="#ordine" className="bg-[#dc2626] text-white px-8 py-4 rounded-2xl font-black text-sm uppercase shadow-xl active:scale-95 transition-all tracking-tighter">
      APPROFITTA ORA
    </a>
  </div>
);

export default function LandingPage() {
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

      <div className="antialiased selection:bg-[#c5a059] selection:text-white bg-slate-50 text-slate-900">
        <TopUrgency />
      <Navbar />
      <main className="pb-24">
        <Hero />
        <div className="bg-slate-50 border-y py-12 px-4 flex flex-wrap justify-center gap-8 md:gap-16 opacity-60">
           <div className="flex flex-col items-center gap-1 font-black text-[10px] uppercase tracking-widest"><Truck size={20} /> Spedizione Express</div>
           <div className="flex flex-col items-center gap-1 font-black text-[10px] uppercase tracking-widest"><ShieldCheck size={20} /> Garanzia Totale</div>
           <div className="flex flex-col items-center gap-1 font-black text-[10px] uppercase tracking-widest"><Award size={20} /> Certificato CE</div>
           <div className="flex flex-col items-center gap-1 font-black text-[10px] uppercase tracking-widest"><ThumbsUp size={20} /> Reso 30 Giorni</div>
        </div>
        <PainPoints />
        <VideoSection />
        <PowerSpecs />
        <AmazonReviews />
        <OrderForm />
        
        {/* Footer info */}
        <section className="py-16 px-4 text-center bg-slate-900 text-white">
          <div className="max-w-4xl mx-auto space-y-6">
            <h3 className="text-2xl font-black italic tracking-tighter uppercase">DRYPRO 360 ULTRA</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto">La soluzione definitiva al problema dell'umidità domestica. Progettata in Germania, amata in Italia.</p>
            <div className="flex justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500 pt-8 border-t border-white/5">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Termini</a>
              <a href="#" className="hover:text-white transition-colors">Cookie</a>
            </div>
            <p className="text-[9px] text-slate-600 italic">&copy; 2026 DryPro 360 Ultra. Disclaimer: Il risparmio energetico e i tempi di asciugatura dipendono dal tipo di carico e dall'ambiente d'uso.</p>
          </div>
        </section>
      </main>
      <StickyCTA />
      </div>
    </>
  );
}

