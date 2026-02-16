"use client";

import React, { useState, useEffect, useRef } from 'react';

// --- CONFIGURAZIONE E COSTANTI ---
const BRAND_NAME = "AuraRelief Pro";
const PRICE = 49.90;
const ORIGINAL_PRICE = 149.00;
const DISCOUNT_PERCENT = 67;

const FEATURES = [
  {
    title: "Tecnologia EMS Multi-Zona",
    description: "Progettato per adattarsi non solo al collo, ma anche alla zona lombare, schiena e gambe. Una sensazione di leggerezza diffusa.",
    icon: "⚡"
  },
  {
    title: "Comfort Termico Rigenerante",
    description: "Un calore costante a 42°C che simula un trattamento professionale, ideale per sciogliere la tensione accumulata.",
    icon: "🔥"
  },
  {
    title: "Personalizzazione Totale",
    description: "6 modalità di massaggio e 15 livelli di intensità per trovare sempre il perfetto equilibrio tra relax e recupero.",
    icon: "⚙️"
  }
];

const REVIEWS = [
  { id: 1, title: "Relax totale per schiena e gambe", name: "Marco G.", rating: 5, comment: "Lo uso dopo il lavoro per sciogliere la tensione lombare. La sensazione di leggerezza è incredibile. Qualità costruttiva eccellente.", date: "15 Marzo 2024" },
  { id: 2, title: "Un vero aiuto dopo l'ufficio", name: "Valentina S.", rating: 5, comment: "Lavorando al PC sento spesso il collo rigido. 15 minuti con questo dispositivo e mi sento rinata. Molto versatile.", date: "2 Aprile 2024" },
  { id: 3, title: "Versatile e facilissimo da usare", name: "Roberto L.", rating: 5, comment: "Il calore è molto piacevole. Spedizione rapida e ho pagato comodamente alla consegna. Lo consiglio vivamente.", date: "22 Aprile 2024" },
  { id: 4, title: "Sensazione di leggerezza diffusa", name: "Alessio P.", rating: 5, comment: "Dopo gli allenamenti sentivo sempre le gambe pesanti. Questo dispositivo aiuta tantissimo a distendere i muscoli.", date: "5 Maggio 2024" },
  { id: 5, title: "Batteria ottima, design premium", name: "Giulia M.", rating: 4, comment: "Esteticamente molto curato. Lo uso per rilassarmi la sera sul divano, il calore a 42 gradi è la marcia in più.", date: "12 Maggio 2024" },
  { id: 6, title: "Perfetto per il recupero attivo", name: "Luca T.", rating: 5, comment: "Cercavo qualcosa per i polpacci. La tecnologia EMS è regolabile con precisione. Un acquisto azzeccatissimo.", date: "18 Maggio 2024" },
  { id: 7, title: "Pratico anche in viaggio", name: "Serena B.", rating: 5, comment: "Leggero, lo porto sempre con me. Mi aiuta a mantenere i muscoli rilassati anche durante i lunghi spostamenti.", date: "25 Maggio 2024" },
  { id: 8, title: "Potenza regolabile con precisione", name: "Davide V.", rating: 5, comment: "I 15 livelli di intensità sono fantastici. Si può passare da un leggero tocco a una stimolazione profonda.", date: "1 Giugno 2024" },
  { id: 9, title: "Addio tensioni accumulate", name: "Francesca R.", rating: 5, comment: "Il calore costante scioglie i nodi alla base del collo. Mi sento molto più libera nei movimenti durante il giorno.", date: "10 Giugno 2024" },
  { id: 10, title: "Molto più di un massaggiatore", name: "Matteo S.", rating: 4, comment: "Lo uso anche sulle braccia. Ottima l'idea del pagamento alla consegna, mi ha dato molta sicurezza nell'acquisto.", date: "15 Giugno 2024" },
  { id: 11, title: "Regalo perfetto", name: "Anna L.", rating: 5, comment: "Regalato a mio marito. Ora lo usa ogni sera prima di dormire, dice che lo aiuta a riposare molto meglio.", date: "20 Giugno 2024" },
  { id: 12, title: "Leggero ma spinge forte", name: "Stefano C.", rating: 5, comment: "Design a U perfetto per bloccarlo anche sulla zona lombare mentre sei seduto in poltrona. Potente.", date: "28 Giugno 2024" },
  { id: 13, title: "Spedizione lampo", name: "Elena F.", rating: 5, comment: "Arrivato in meno di 24 ore. Imballaggio perfetto e prodotto superiore alle aspettative. Elegante.", date: "5 Luglio 2024" },
  { id: 14, title: "Indispensabile per smart working", name: "Fabio D.", rating: 5, comment: "Lavorando da casa la postura ne risente. Questo è l'unico modo per finire la giornata senza sentirsi contratti.", date: "12 Luglio 2024" },
  { id: 15, title: "Ottimo rapporto qualità prezzo", name: "Paolo M.", rating: 4, comment: "Fa esattamente quello che promette. Semplice da usare e il calore si sente bene. Consigliato.", date: "18 Luglio 2024" },
  { id: 16, title: "Top per il benessere", name: "Chiara G.", rating: 5, comment: "Lo uso per le gambe la sera. Molto rilassante, lo consiglio a chi sta molto tempo in piedi.", date: "22 Luglio 2024" }
];

// --- COMPONENTI UI ---

const AmazonStar: React.FC<{ filled?: boolean; className?: string }> = ({ filled = true, className = "w-5 h-5" }) => (
  <svg className={`${className} ${filled ? 'text-[#ffa41c]' : 'text-gray-200'} fill-current`} viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default function LandingPage() {
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [timeLeft, setTimeLeft] = useState(14 * 60 + 58);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: ''
  });

  const orderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(prev => prev > 0 ? prev - 1 : 0), 1000);
    const scroll = () => setShowFloatingCTA(window.scrollY > 800);
    window.addEventListener('scroll', scroll);
    return () => { clearInterval(timer); window.removeEventListener('scroll', scroll); };
  }, []);

  const formatTime = (s: number) => ({
    m: Math.floor(s / 60).toString().padStart(2, '0'),
    s: (s % 60).toString().padStart(2, '0')
  });

  const scrollToOrder = () => orderRef.current?.scrollIntoView({ behavior: 'smooth' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulazione invio
    setTimeout(() => { 
      setSubmitted(true); 
      setIsSubmitting(false); 
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  const time = formatTime(timeLeft);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 overflow-x-hidden">
      
      {/* 1. SCARCITY BAR */}
      <div className="bg-red-600 text-white text-[10px] md:text-sm text-center py-3 font-black uppercase tracking-[0.2em] sticky top-0 z-[100] shadow-xl">
        ⚠️ OFFERTA DISPONIBILE: SOLO 12 PEZZI RIMASTI A QUESTO PREZZO ⚠️
      </div>

      {/* 2. HERO SECTION */}
      <section className="relative pt-10 pb-20 md:pt-24 md:pb-40 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-10 shadow-lg animate-pulse">
              BEST SELLER BENESSERE 2024
            </div>
            <h1 className="text-[48px] md:text-8xl lg:text-9xl font-black leading-[0.9] mb-10 tracking-tighter italic uppercase">
              RITROVA LA <br/> <span className="text-blue-600">VITALITÀ</span> <br/>
              <span className="text-slate-400 font-light">IN 15 MINUTI.</span>
            </h1>
            <p className="text-2xl md:text-4xl text-slate-600 mb-12 leading-[1.1] font-medium text-balance">
              Dì addio alla tensione muscolare. Sperimenta una nuova sensazione di <span className="text-slate-900 font-extrabold underline decoration-blue-600 decoration-4 underline-offset-8">leggerezza totale</span>.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
              <button onClick={scrollToOrder} className="w-full md:w-auto px-16 py-8 bg-green-500 hover:bg-green-600 text-white font-black text-2xl md:text-3xl uppercase rounded-[2.5rem] shadow-[0_25px_50px_rgba(34,197,94,0.4)] transition-all hover:scale-110 active:scale-95">
                VOGLIO IL MIO RELAX!
              </button>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-4">
                  <span className="text-5xl md:text-7xl font-black">{PRICE.toFixed(2)}€</span>
                  <span className="text-xl text-slate-300 line-through font-bold">{ORIGINAL_PRICE.toFixed(2)}€</span>
                </div>
                <p className="text-xs font-black text-red-600 uppercase tracking-widest mt-2">Risparmio Immediato del 67%</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-8 border-t-2 border-slate-100 pt-10 opacity-70">
              <span className="text-xs md:text-sm font-black uppercase tracking-widest">🚚 Spedizione Gratuita 24h</span>
              <span className="text-xs md:text-sm font-black uppercase tracking-widest">💰 Paga alla Consegna</span>
            </div>
          </div>
          <div className="flex-1 w-full max-w-md lg:max-w-2xl">
            <img src="https://ae01.alicdn.com/kf/S8f2c8d8b6a3f4c6e9e4a8a5f8e5f8e5f8/Massaggiatore-Cervicale-Elettrico-EMS-Impulsi-Neck-Massager-Terapia-Magnetica-Riscaldamento-Sollievo-Dolore-Cervicale.webp" alt="AuraRelief Pro" className="w-full rounded-[4rem] shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-1000" />
          </div>
        </div>
      </section>

      {/* 3. PAIN SECTION (FB Compliant) */}
      <section className="py-24 md:py-40 bg-slate-950 text-white px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[42px] md:text-8xl font-black leading-[0.9] mb-16 uppercase italic tracking-tighter text-center lg:text-left">
            LA TENSIONE TI <br/> <span className="text-blue-500 underline decoration-8 underline-offset-8">STA FRENANDO?</span>
          </h2>
          <div className="grid lg:grid-cols-2 gap-20">
            <div className="space-y-10 text-xl md:text-3xl text-slate-400">
              <p>Non lasciare che lo stress quotidiano limiti la tua <span className="text-white font-black">libertà di movimento</span>. Il tuo corpo merita una pausa rigenerante ogni giorno.</p>
              <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 italic">
                <p className="text-white font-extrabold mb-4">"Finalmente un momento di vero distacco dallo stress quotidiano. Mi sento scattante come non mai."</p>
                <p className="text-sm opacity-60">— Per chi cerca il massimo comfort a casa.</p>
              </div>
            </div>
            <div className="space-y-12">
              {[
                { t: "Allenta le Tensioni", d: "Scioglie i nodi di stress accumulati in anni di postura errata.", e: "⛓️" },
                { t: "Riposo Migliore", d: "Favorisce una sensazione di calma totale prima di dormire.", e: "🌑" },
                { t: "Libertà Totale", d: "Per sentirti agile e dinamico in ogni attività della tua giornata.", e: "🏃" }
              ].map((it, i) => (
                <div key={i} className="flex gap-8 items-start">
                  <span className="w-16 h-16 bg-blue-600/20 text-3xl rounded-3xl flex items-center justify-center border border-blue-600/30">{it.e}</span>
                  <div>
                    <h4 className="text-2xl md:text-3xl font-black uppercase italic text-blue-400 leading-none mb-2">{it.t}</h4>
                    <p className="text-lg md:text-xl text-slate-400">{it.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. TIMER SECTION */}
      <section className="py-20 px-6 bg-white">
        <div className="bg-red-700 py-12 md:py-20 rounded-[4rem] text-center max-w-3xl mx-auto shadow-3xl text-white border-4 border-white/20">
          <p className="font-black uppercase text-xs md:text-sm tracking-[0.4em] mb-8">L'OFFERTA SPECIALE SCADE TRA:</p>
          <div className="flex justify-center items-center gap-6 md:gap-10 mb-10">
            <div className="flex flex-col">
              <span className="bg-white text-red-700 text-5xl md:text-8xl font-black p-6 rounded-[2rem] shadow-2xl w-24 md:w-40">{time.m}</span>
              <span className="text-[10px] uppercase font-black mt-4 opacity-60">Minuti</span>
            </div>
            <div className="text-5xl md:text-7xl font-black mb-14">:</div>
            <div className="flex flex-col">
              <span className="bg-white text-red-700 text-5xl md:text-8xl font-black p-6 rounded-[2rem] shadow-2xl w-24 md:w-40">{time.s}</span>
              <span className="text-[10px] uppercase font-black mt-4 opacity-60">Secondi</span>
            </div>
          </div>
          <p className="text-lg md:text-2xl font-bold italic opacity-90">Completa l'ordine ora per bloccare lo sconto di 100€.</p>
        </div>
      </section>

      {/* 5. FEATURES SECTION */}
      <section className="py-24 md:py-40 bg-white px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="order-2 md:order-1">
             <img src="https://ae01.alicdn.com/kf/S8f2c8d8b6a3f4c6e9e4a8a5f8e5f8e5f8/Massaggiatore-Cervicale-Elettrico-EMS-Impulsi-Neck-Massager-Terapia-Magnetica-Riscaldamento-Sollievo-Dolore-Cervicale.webp" alt="Features" className="rounded-[3rem] shadow-2xl" />
          </div>
          <div className="order-1 md:order-2 space-y-12">
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">PERCHÉ SCEGLIERLO?</h2>
            <div className="space-y-8">
              {FEATURES.map((f, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="text-4xl">{f.icon}</div>
                  <div>
                    <h4 className="text-2xl font-black mb-2 uppercase">{f.title}</h4>
                    <p className="text-slate-600 text-lg">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. REVIEWS SECTION */}
      <section className="py-24 md:py-40 bg-slate-50 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black mb-16 border-b-4 border-slate-200 pb-8 uppercase italic tracking-tighter">Recensioni Verificate</h2>
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:sticky lg:top-32 h-fit">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex">{[...Array(5)].map((_, i) => <AmazonStar key={i} className="w-8 h-8" />)}</div>
                <span className="text-3xl font-black">4.9 su 5</span>
              </div>
              <p className="text-slate-500 mb-10 text-lg">Basato su oltre 15.402 valutazioni reali in tutta Italia.</p>
              <div className="space-y-4">
                {[88, 9, 2, 1, 0].map((pct, i) => (
                  <div key={i} className="flex items-center gap-4 text-sm font-bold">
                    <span className="w-16 text-blue-600">{5-i} stelle</span>
                    <div className="flex-1 h-6 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
                      <div className="h-full bg-[#ffa41c] border border-[#de7921]" style={{ width: `${pct}%` }}></div>
                    </div>
                    <span className="w-10 text-right">{pct}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2 space-y-16">
              {REVIEWS.slice(0, visibleReviews).map((r) => (
                <div key={r.id} className="border-b border-slate-200 pb-16 last:border-0 animate-fade-in">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xl">{r.name[0]}</div>
                    <span className="text-xl font-extrabold">{r.name}</span>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex">{[...Array(5)].map((_, i) => <AmazonStar key={i} filled={i < r.rating} className="w-6 h-6" />)}</div>
                    <h4 className="font-black text-2xl leading-tight">{r.title}</h4>
                  </div>
                  <p className="text-sm text-slate-400 mb-6 uppercase tracking-widest">Recensito il {r.date} — <span className="text-[#c45500] font-black">Acquisto Verificato</span></p>
                  <p className="text-2xl text-slate-700 italic leading-relaxed font-medium">"{r.comment}"</p>
                </div>
              ))}
              {visibleReviews < REVIEWS.length && (
                <button onClick={() => setVisibleReviews(prev => prev + 5)} className="w-full py-6 bg-slate-900 text-white font-black rounded-3xl text-xl shadow-xl flex items-center justify-center gap-4 hover:bg-blue-600 transition-all group">
                  CARICA ALTRE RECENSIONI <span className="group-hover:translate-x-2 transition-transform">→</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 7. ORDER FORM SECTION */}
      <section ref={orderRef} className="py-24 md:py-40 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-[42px] md:text-8xl font-black uppercase leading-[0.9] mb-8 tracking-tighter italic">
            IL TUO <span className="text-blue-600">BENESSERE</span> <br/> TI ASPETTA.
          </h2>
          <p className="text-2xl md:text-4xl text-slate-500 italic font-medium">L'investimento più piccolo per la tua qualità di vita.</p>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-[4rem] shadow-[0_50px_100px_rgba(0,0,0,0.15)] overflow-hidden border border-slate-100 relative">
          <div className="bg-slate-900 p-12 text-white text-center">
            <h3 className="text-3xl md:text-5xl font-black uppercase italic mb-2 tracking-tighter">ORDINA ORA</h3>
            <p className="text-blue-400 font-black text-sm uppercase tracking-[0.3em]">PAGHERAI ALLA CONSEGNA</p>
          </div>

          {!submitted ? (
            <form onSubmit={handleOrderSubmit} className="p-10 md:p-16 space-y-12">
              <div className="bg-blue-50 p-10 rounded-[3rem] border-4 border-blue-600 relative text-center">
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-xl">MIGLIOR OFFERTA</span>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="text-left">
                    <h4 className="text-3xl font-black mb-1">1x AuraRelief Pro</h4>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">KIT COMPLETO VITALITÀ</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline gap-3"><span className="text-5xl font-black">{PRICE.toFixed(2)}€</span></div>
                    <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mt-2 animate-pulse">80€ DI RISPARMIO</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <input required name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Nome e Cognome" className="w-full p-8 bg-slate-50 border-2 border-slate-50 rounded-3xl focus:border-blue-600 focus:bg-white outline-none text-xl font-bold transition-all" />
                <input required name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="Numero di Cellulare" className="w-full p-8 bg-slate-50 border-2 border-slate-50 rounded-3xl focus:border-blue-600 focus:bg-white outline-none text-xl font-bold transition-all" />
                <input required name="address" value={formData.address} onChange={handleInputChange} placeholder="Indirizzo e N. Civico" className="w-full p-8 bg-slate-50 border-2 border-slate-50 rounded-3xl focus:border-blue-600 focus:bg-white outline-none text-xl font-bold transition-all" />
                <input required name="city" value={formData.city} onChange={handleInputChange} placeholder="Città e Provincia" className="w-full p-8 bg-slate-50 border-2 border-slate-50 rounded-3xl focus:border-blue-600 focus:bg-white outline-none text-xl font-bold transition-all" />
              </div>

              <button disabled={isSubmitting} className="w-full py-10 bg-green-500 hover:bg-green-600 text-white font-black text-3xl uppercase rounded-[3rem] shadow-2xl transition-all hover:scale-[1.05] active:scale-95 flex flex-col items-center justify-center gap-1 group">
                {isSubmitting ? (
                  <span className="animate-spin h-8 w-8 border-4 border-white border-t-transparent rounded-full"></span>
                ) : (
                  <>
                    <span>CONFERMA L'ORDINE</span>
                    <span className="text-sm opacity-80 font-bold tracking-[0.2em]">PAGAMENTO ALLA CONSEGNA</span>
                  </>
                )}
              </button>
              
              <div className="flex justify-center gap-8 opacity-40 grayscale group-hover:grayscale-0 transition-all pt-4">
                <span className="font-black italic text-xl">GLS</span>
                <span className="font-black italic text-xl">BRT</span>
                <span className="font-black italic text-xl">POSTE</span>
              </div>
            </form>
          ) : (
            <div className="p-20 text-center animate-fade-in">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto mb-8 text-5xl shadow-xl">✓</div>
              <h3 className="text-4xl font-black mb-6 uppercase tracking-tighter">ORDINE RICEVUTO!</h3>
              <p className="text-xl text-slate-600 italic">Il tuo nuovo percorso di benessere inizia oggi. Verrai contattato a breve per la conferma della spedizione.</p>
              <div className="mt-10 bg-slate-50 p-6 rounded-2xl border-2 border-dashed border-slate-200 inline-block">
                <p className="text-xs font-black uppercase text-slate-400">Riferimento: #AR-{Math.floor(1000 + Math.random() * 9000)}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-slate-950 text-slate-500 py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-12">
          <h3 className="text-white text-3xl font-black italic">{BRAND_NAME}</h3>
          <p className="text-sm leading-relaxed max-w-xl mx-auto opacity-60 italic">AuraRelief Pro Italia è leader nelle soluzioni per il benessere quotidiano. Non utilizziamo termini medici o promesse di cure. Consultare sempre un esperto per condizioni specifiche. Paga in contanti al corriere in totale sicurezza.</p>
          <div className="flex flex-wrap justify-center gap-10 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Termini di Vendita</a>
            <a href="#" className="hover:text-white">Spedizioni</a>
            <a href="#" className="hover:text-white">Contatti</a>
          </div>
          <p className="text-[10px] opacity-30">© 2024 AuraRelief Pro Italia. P.IVA 0123456789 - Tutti i diritti riservati.</p>
        </div>
      </footer>

      {/* FLOATING CTA */}
      {showFloatingCTA && !submitted && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] w-[95%] max-w-sm px-2">
          <button onClick={scrollToOrder} className="w-full bg-slate-900 text-white py-6 px-10 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex items-center justify-between font-black uppercase text-lg border-2 border-white/20 animate-urgent">
            <span className="flex flex-col items-start leading-none">
              <span className="text-[10px] text-red-400 mb-1 tracking-widest">OFFERTA LAMPO</span>
              <span>ORDINA ORA</span>
            </span>
            <span className="bg-green-500 px-6 py-2 rounded-2xl text-2xl shadow-inner">{PRICE.toFixed(2)}€</span>
          </button>
        </div>
      )}

      {/* CUSTOM ANIMATIONS */}
      {/* Fixed TypeScript error by removing jsx/global props and using dangerouslySetInnerHTML */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        
        @keyframes urgent { 
          0% { transform: scale(1) translateX(-50%); } 
          50% { transform: scale(1.05) translateX(-47.5%); box-shadow: 0 40px 80px rgba(0,0,0,0.6); } 
          100% { transform: scale(1) translateX(-50%); } 
        }
        .animate-urgent { animation: urgent 2s infinite ease-in-out; }
        
        .no-scrollbar::-webkit-scrollbar { display: none; }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow { animation: bounce-slow 4s infinite ease-in-out; }
      `}} />
    </div>
  );
}
