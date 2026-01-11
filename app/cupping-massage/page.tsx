
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Star, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ArrowRight,
  ChevronDown,
  ShoppingBag,
  Zap,
  Flame,
  UserCheck,
  ShieldCheck,
  Award,
  ChevronRight,
  Truck,
  TrendingUp,
  Activity
} from 'lucide-react';

// --- DATA: 18 RECENSIONI PER 6 CLICK DI "CARICA ALTRO" ---
const ALL_REVIEWS = [
  { user: "Luca B.", date: "14 Febbraio 2024", title: "Mai più senza. Vale ogni centesimo!", rating: 5, content: "Ho provato molti massaggiatori ma questo è su un altro livello. L'aspirazione è fortissima e il calore è paradisiaco. Dopo 10 minuti la schiena è come nuova.", helpful: 84 },
  { user: "Simona F.", date: "2 Febbraio 2024", title: "Miracoloso per la cellulite", rating: 5, content: "Lo uso sulle cosce ogni sera. Già dopo una settimana la pelle è più compatta. Fa un po' di rossore ma scompare subito, vuol dire che il sangue circola! Consigliatissimo.", helpful: 42 },
  { user: "Davide M.", date: "28 Gennaio 2024", title: "Ottimo per sportivi", rating: 4, content: "Lo uso post-corsa. Aiuta tantissimo a drenare. 4 stelle solo perché avrei preferito una batteria leggermente più capiente, ma si carica velocemente.", helpful: 15 },
  { user: "Martina G.", date: "20 Gennaio 2024", title: "Addio cervicale!", rating: 5, content: "Lo metto sulla base del collo dopo 8 ore al computer. Sento i muscoli che si rilassano letteralmente sotto l'aspirazione. Non potevo fare acquisto migliore.", helpful: 56 },
  { user: "Roberto P.", date: "12 Gennaio 2024", title: "Risparmio un sacco di soldi", rating: 5, content: "Prima andavo dal fisioterapista ogni due settimane. Ora con SlimWave risolvo i nodi muscolari da solo a casa. Si è ripagato da solo in un mese.", helpful: 129 },
  { user: "Alessandra T.", date: "5 Gennaio 2024", title: "Ne ho comprati due!", rating: 5, content: "Uno per me e uno per mia mamma. Lei soffre di dolori lombari e questo l'ha aiutata a tornare a camminare senza quella sensazione di peso costante. Un regalo fantastico.", helpful: 31 },
  { user: "Francesco S.", date: "29 Dicembre 2023", title: "Qualità costruttiva eccellente", rating: 5, content: "Si vede che non è la solita plastica cinese. È robusto, il display è chiaro e gli accessori sono di qualità. Molto soddisfatto della spedizione veloce.", helpful: 22 },
  { user: "Elena V.", date: "22 Dicembre 2023", title: "Dormo molto meglio", rating: 5, content: "Lo uso 10 minuti prima di andare a letto sulle spalle. Mi toglie tutta la tensione della giornata e finalmente dormo 8 ore filate.", helpful: 67 },
  { user: "Giulia L.", date: "15 Dicembre 2023", title: "Gambe leggere come piume", rating: 5, content: "Lavoro in piedi tutto il giorno. La sera le mie gambe urlavano. SlimWave riattiva la circolazione e il gonfiore sparisce. Mai più gambe pesanti.", helpful: 48 },
  { user: "Marco D.", date: "8 Dicembre 2023", title: "Un must per chi fa palestra", rating: 4, content: "Lo uso per i DOMS intensi alle gambe. Aiuta a velocizzare il recupero. Ottimo prodotto, display molto intuitivo.", helpful: 19 },
  { user: "Valentina R.", date: "1 Dicembre 2023", title: "Pelle visibilmente migliorata", rating: 5, content: "Oltre al massaggio, ho notato che la grana della pelle sulle cosce è migliorata tantissimo. La ritenzione idrica è calata drasticamente.", helpful: 53 },
  { user: "Antonio K.", date: "24 Novembre 2023", title: "Regalo azzeccato", rating: 5, content: "Regalato a mia moglie. È diventato il suo oggetto preferito. Lo usa ogni giorno. Assistenza clienti SlimWave super disponibile.", helpful: 12 },
  { user: "Paolo M.", date: "18 Novembre 2023", title: "Lo porto anche in viaggio", rating: 5, content: "Piccolo e potente. Viaggiando molto per lavoro ho sempre il collo bloccato. Questo risolve il problema in hotel in 5 minuti.", helpful: 27 },
  { user: "Chiara S.", date: "10 Novembre 2023", title: "Meglio delle aspettative", rating: 5, content: "Ero scettica ma mi sono dovuta ricredere. La forza di aspirazione è impressionante. Usatelo con un po' di olio per massaggi!", helpful: 39 },
  { user: "Stefano F.", date: "2 Novembre 2023", title: "Addio antidolorifici", rating: 5, content: "Prendevo ibuprofene quasi ogni giorno per il mal di schiena. Da quando uso SlimWave non ne ho più avuto bisogno. Cambia la vita.", helpful: 91 },
  { user: "Sara O.", date: "25 Ottobre 2023", title: "Super drenante", rating: 5, content: "Perfetto per chi soffre di ritenzione. Lo uso con costanza e vedo i risultati. Il calore aiuta tantissimo il rilassamento.", helpful: 14 },
  { user: "Michele B.", date: "15 Ottobre 2023", title: "Spedizione lampo", rating: 4, content: "Arrivato in meno di 24 ore. Imballaggio curato. Il prodotto funziona bene, bisogna solo prendere la mano con i livelli di potenza.", helpful: 8 },
  { user: "Federica L.", date: "5 Ottobre 2023", title: "Rapporto qualità prezzo imbattibile", rating: 5, content: "A questo prezzo non trovi nulla di così professionale. Lo consiglio a tutte le mie amiche.", helpful: 22 }
];

export default function LandingPage() {
  const [timeLeft, setTimeLeft] = useState(599);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleLoadMore = () => {
    setVisibleReviews(prev => Math.min(prev + 3, ALL_REVIEWS.length));
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-red-100 selection:text-red-900">
      
      {/* --- URGENCY HEADER --- */}
      <header className="fixed top-0 left-0 right-0 z-[100]">
        <div className="bg-red-600 text-white text-center py-2 px-2 text-[10px] md:text-sm font-black flex justify-center items-center gap-2 uppercase tracking-tight shadow-xl">
          <Clock size={14} className="animate-pulse" />
          OFFERTA FLASH: -60% TERMINA TRA {formatTime(timeLeft)} - ULTIMI 4 PEZZI DISPONIBILI!
        </div>
        <nav className="bg-white/90 backdrop-blur-xl border-b border-gray-100 py-3 px-4 flex justify-between items-center">
          <div className="text-xl md:text-2xl font-black tracking-tighter italic text-red-600">SLIMWAVE™</div>
          <a href="#order" className="bg-black text-white px-5 py-2 rounded-xl font-bold text-xs md:text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-lg">
            ORDINA ORA
          </a>
        </nav>
      </header>

      <main className="pt-24 overflow-x-hidden">
        
        {/* --- HERO SECTION: NEUROMARKETING HOOK --- */}
        <section className="px-4 py-12 md:py-24 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest border border-red-100">
              <Activity size={14} /> Raccomandato da 450+ Centri Benessere
            </div>
            <h1 className="text-4xl md:text-7xl font-black leading-[0.95] tracking-tighter text-gray-900">
              IL DOLORE È UN <br/> <span className="text-red-600">PARASSITA.</span> <br/>
              UCCIDILO IN <br className="hidden md:block"/> 5 MINUTI.
            </h1>
            <p className="text-lg md:text-2xl text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Smetti di sprecare soldi in medicine che distruggono il tuo stomaco. Prova il potere della <span className="text-black font-bold">Coppettazione Intelligente</span> e torna a vivere senza limiti.
            </p>
            <div className="flex flex-col gap-4 pt-4">
              <a href="#order" className="group flex items-center justify-center gap-3 bg-red-600 text-white px-8 py-5 md:py-7 rounded-[2rem] font-black text-xl md:text-3xl hover:bg-red-700 transition-all transform hover:scale-[1.03] shadow-[0_20px_50px_rgba(239,68,68,0.4)] uppercase italic">
                Sì! Libera la mia schiena <ChevronRight className="group-hover:translate-x-2 transition-transform" size={28} />
              </a>
              <div className="flex justify-center lg:justify-start items-center gap-4 text-xs font-bold text-gray-400 uppercase">
                <span className="flex items-center gap-1"><ShieldCheck size={16} className="text-green-500" /> Pagamento alla consegna</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span className="flex items-center gap-1"><Truck size={16} className="text-blue-500" /> Consegna 24h</span>
              </div>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-red-600/10 blur-[120px] rounded-full"></div>
            <img
              src="/images/massaggiatore/37be453b-8d26-4dda-9172-db32f2c22b12.webp"
              alt="SlimWave Device"
              className="relative z-10 w-full max-w-lg mx-auto rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.2)] hover:rotate-3 transition-transform duration-700"
            />
            <div className="absolute -bottom-6 right-0 md:-right-10 bg-white p-6 rounded-[2rem] shadow-2xl z-20 border border-gray-100 flex items-center gap-4 animate-bounce duration-[3000ms]">
              <div className="bg-yellow-400 p-3 rounded-2xl"><TrendingUp size={24} className="text-white" /></div>
              <div>
                <p className="font-black text-sm uppercase leading-none">Best Seller #1</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Categoria Salute 2026</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- AMAZON-STYLE LOGO STRIP --- */}
        <div className="bg-gray-50 py-10 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-around items-center gap-8 opacity-40 grayscale">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-6" />
            <div className="font-black text-lg italic tracking-tighter">FITNESS <span className="text-red-600">PRO</span></div>
            <div className="font-black text-lg italic tracking-tighter">BODY <span className="text-red-600">RECOVERY</span></div>
            <div className="font-black text-lg italic tracking-tighter">HEALTH <span className="text-red-600">CARE</span></div>
          </div>
        </div>

        {/* --- PROBLEM SECTION: PAIN AMPLIFICATION --- */}
        <section className="bg-black py-20 px-4 text-white">
          <div className="max-w-4xl mx-auto text-center space-y-16">
            <h2 className="text-3xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
              IL TUO CORPO TI STA <br/> <span className="text-red-600 underline decoration-white">PUNENDO.</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { t: "MUSCOLI DI PIETRA", d: "Spalle e collo così duri da impedirti di girare la testa.", i: "⛓️" },
                { t: "STRESS CRONICO", d: "Quella tensione costante che ti toglie il fiato a fine giornata.", i: "🧨" },
                { t: "RISTAGNO LINFATICO", d: "Gambe pesanti e cellulite che non se ne vanno mai.", i: "🌊" }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="text-5xl mb-4">{item.i}</div>
                  <h3 className="font-black text-xl text-red-500 mb-2 uppercase">{item.t}</h3>
                  <p className="text-gray-400 font-medium leading-relaxed">{item.d}</p>
                </div>
              ))}
            </div>
            <div className="bg-red-600 p-8 rounded-[3rem] shadow-2xl transform rotate-1">
              <p className="text-xl md:text-2xl font-black italic">
                "Ogni giorno di dolore ignorato è un giorno di vecchiaia in più. Riprendi il controllo ora o pagherai il prezzo tra 10 anni."
              </p>
            </div>
          </div>
        </section>

        {/* --- FEATURES: THE SOLUTION --- */}
        <section className="py-24 px-4 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 space-y-12">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">TECNOLOGIA <span className="text-red-600 italic">CLINICA</span> <br/> NEL PALMO DELLA MANO</h2>
              <div className="space-y-8">
                {[
                  { icon: <Flame className="text-orange-500" />, title: "RISCALDAMENTO A 50°C", desc: "Scioglie il grasso e le fibre muscolari tese in pochi secondi, come un massaggio professionale a pietre calde." },
                  { icon: <Zap className="text-blue-500" />, title: "SUZIONE DINAMICA", desc: "6 livelli di vuoto estremo per rimuovere tossine e riattivare il flusso sanguigno istantaneamente." },
                  { icon: <UserCheck className="text-green-500" />, title: "DRENAGGIO LINFATICO", desc: "Elimina i liquidi in eccesso e combatte la cellulite agendo sulla causa, non solo sull'estetica." }
                ].map((f, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="bg-gray-100 p-4 rounded-2xl shrink-0">{f.icon}</div>
                    <div>
                      <h3 className="text-2xl font-black uppercase italic mb-1">{f.title}</h3>
                      <p className="text-gray-600 font-medium leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 relative">
              <img src="/images/massaggiatore/c31feb76-d00b-4c7d-819c-b275864e941c.webp" alt="Features" className="rounded-[3rem] shadow-2xl" />
            </div>
          </div>
        </section>

        {/* --- VIDEO SECTION --- */}
        <section className="py-24 px-4 bg-black">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none mb-4">
                GUARDA <span className="text-red-600">SLIMWAVE™</span> IN AZIONE
              </h2>
              <p className="text-gray-400 font-medium">Scopri come funziona e perché migliaia di italiani lo hanno già scelto.</p>
            </div>
            <div className="relative rounded-[2rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] border-4 border-white/10">
              <video
                className="w-full"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/video/cupping-massage/917c18cf10204daeb9a48f638eba922b.SD-480p-1.0Mbps-64661437.mp4" type="video/mp4" />
                Il tuo browser non supporta il tag video.
              </video>
            </div>
          </div>
        </section>

        {/* --- AMAZON REVIEWS SECTION: 6-CLICK PAGINATION --- */}
        <section className="bg-gray-50 py-24 px-4 border-y border-gray-100">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-black mb-4 flex items-center gap-3">
                  RECENSIONI CLIENTI <span className="bg-gray-200 text-gray-600 text-sm px-3 py-1 rounded-full font-bold">14.500+</span>
                </h2>
                <div className="flex items-center gap-4">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => <Star key={i} size={22} fill="currentColor" />)}
                  </div>
                  <span className="text-2xl font-black">4.8 su 5</span>
                </div>
              </div>
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-green-600 uppercase tracking-widest">✅ Acquisti Verificati al 100%</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="md:col-span-1 space-y-3">
                {[5, 4, 3, 2, 1].map((s) => (
                  <div key={s} className="flex items-center gap-3 text-sm font-bold">
                    <span className="w-12">{s} stelle</span>
                    <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400" style={{ width: s === 5 ? '88%' : s === 4 ? '10%' : '1%' }}></div>
                    </div>
                    <span className="w-8 text-gray-400">{s === 5 ? '88%' : s === 4 ? '10%' : '1%'}</span>
                  </div>
                ))}
              </div>

              <div className="md:col-span-2 space-y-12">
                {ALL_REVIEWS.slice(0, visibleReviews).map((rev, idx) => (
                  <div key={idx} className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-black text-gray-500 text-xs uppercase">{rev.user[0]}</div>
                      <span className="text-sm font-bold tracking-tight">{rev.user}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < rev.rating ? "currentColor" : "none"} />)}
                      </div>
                      <span className="text-sm font-black italic">{rev.title}</span>
                    </div>
                    <p className="text-xs text-gray-400">Recensito in Italia il {rev.date} - <span className="text-orange-600 font-bold uppercase">Acquisto verificato</span></p>
                    <p className="text-gray-700 leading-relaxed font-medium">{rev.content}</p>
                    <div className="flex items-center gap-4 pt-2">
                      <button className="px-5 py-1.5 border border-gray-300 rounded-lg text-xs font-bold hover:bg-gray-100 shadow-sm active:scale-95 transition-all">Utile</button>
                      <span className="text-xs text-gray-400 font-bold italic">{rev.helpful} persone l'hanno trovato utile</span>
                    </div>
                  </div>
                ))}

                {visibleReviews < ALL_REVIEWS.length && (
                  <button 
                    onClick={handleLoadMore}
                    className="w-full bg-white border-2 border-black text-black py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    Vedi altre 3 recensioni ({ALL_REVIEWS.length - visibleReviews} rimanenti) <ChevronDown />
                  </button>
                )}
                {visibleReviews >= ALL_REVIEWS.length && (
                  <p className="text-center text-gray-400 font-bold italic uppercase tracking-widest text-xs">Hai visualizzato tutte le migliori recensioni.</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* --- PRICING SECTION: ANCHORING & BUNDLES --- */}
        <section id="order" className="py-24 px-4 bg-white">
          <div className="max-w-5xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-gray-900">SCEGLI LA TUA <span className="text-red-600 underline">CURA.</span></h2>
              <div className="bg-red-600 text-white inline-block px-6 py-2 rounded-full font-black animate-bounce uppercase tracking-widest text-sm">
                Sconto del 60% solo per oggi
              </div>
              <div className="pt-8">
                <img src="/images/massaggiatore/2ddb9d4e-3ca6-448e-bff0-db8c225f3c60.webp" alt="SlimWave Kit" className="max-w-md mx-auto rounded-3xl shadow-xl" />
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              {/* Kit Base con Form */}
              <div className="bg-white p-8 md:p-12 rounded-[3rem] border-2 border-gray-200 shadow-[0_30px_60px_rgba(0,0,0,0.1)]">
                <div className="text-center mb-8">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Offerta Speciale</p>
                  <h3 className="text-3xl font-black uppercase italic mb-4">1x SLIMWAVE™ PRO</h3>
                  <div className="flex items-baseline justify-center gap-3 mb-6">
                    <span className="text-5xl font-black text-red-600">€59,90</span>
                    <span className="text-2xl text-gray-300 line-through">€119,00</span>
                  </div>
                  <ul className="flex flex-wrap justify-center gap-4 text-sm">
                    <li className="flex gap-2 items-center font-bold"><CheckCircle2 className="text-green-500" size={18} /> Dispositivo SlimWave Pro</li>
                    <li className="flex gap-2 items-center font-bold"><CheckCircle2 className="text-green-500" size={18} /> Cavo USB-C</li>
                    <li className="flex gap-2 items-center font-bold"><CheckCircle2 className="text-green-500" size={18} /> Garanzia 24 Mesi</li>
                  </ul>
                </div>

                <div className="border-t border-gray-100 pt-8 mt-8">
                  <p className="text-center text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Compila per ordinare in contrassegno</p>
                  <form className="space-y-4">
                    <div>
                      <label className="text-xs font-black uppercase text-gray-400 mb-1 block">Nome e Cognome</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Mario Rossi"
                        required
                        className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:border-red-600 focus:outline-none transition-all font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-black uppercase text-gray-400 mb-1 block">Indirizzo di Spedizione</label>
                      <input
                        type="text"
                        name="address"
                        placeholder="Via Roma 1, 00100 Roma"
                        required
                        className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:border-red-600 focus:outline-none transition-all font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-black uppercase text-gray-400 mb-1 block">Numero di Telefono</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+39 333 1234567"
                        required
                        className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:border-red-600 focus:outline-none transition-all font-bold"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-red-600 text-white py-6 rounded-[2rem] font-black text-xl uppercase tracking-widest shadow-[0_15px_30px_rgba(239,68,68,0.4)] hover:bg-red-700 active:scale-95 transition-all mt-6"
                    >
                      ORDINA IN CONTRASSEGNO
                    </button>
                    <p className="text-center text-xs text-gray-400 font-medium mt-4">
                      Paghi comodamente al corriere alla consegna. Spedizione gratuita.
                    </p>
                  </form>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12">
              {[
                { i: <ShieldCheck />, t: "Paga alla Consegna" },
                { i: <Truck />, t: "Consegna 24/48h" },
                { i: <Award />, t: "Garanzia Ufficiale" },
                { i: <ShoppingBag />, t: "Reso Facile" }
              ].map((badge, idx) => (
                <div key={idx} className="flex flex-col items-center p-6 bg-white border border-gray-100 rounded-3xl shadow-sm text-center">
                  <div className="text-red-600 mb-2">{badge.i}</div>
                  <p className="text-[10px] font-black uppercase tracking-tighter leading-none">{badge.t}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- FAQ SECTION --- */}
        <section className="py-24 px-4 bg-gray-50">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-center mb-12 uppercase italic">HAI <span className="text-red-600 underline">DUBBI?</span></h2>
            {[
              { q: "FUNZIONA DAVVERO CONTRO IL DOLORE?", a: "Sì. SlimWave™ combina suzione clinica e terapia termica per decontratturare i muscoli profondi dove i massaggi manuali non arrivano." },
              { q: "LASCIA SEGNI SULLA PELLE?", a: "Sì, la coppettazione richiama il sangue in superficie lasciando dei cerchi rossi. È il segno che la circolazione è stata riattivata. Spariscono in 2-3 giorni." },
              { q: "POSSO PAGARE IN CONTANTI?", a: "Certamente. Seleziona il pagamento alla consegna e paga direttamente al corriere quando arriva a casa tua." },
              { q: "QUANTO DURA LA BATTERIA?", a: "Circa 10-12 sessioni complete da 15 minuti con una singola carica USB-C." }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-6 text-left flex justify-between items-center group"
                >
                  <span className="font-bold text-lg group-hover:text-red-600 transition-colors uppercase italic">{faq.q}</span>
                  <ChevronDown className={`transform transition-transform text-red-600 ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-40 p-6 pt-0' : 'max-h-0'}`}>
                  <p className="text-gray-600 font-medium leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-black text-white py-20 px-4 pb-32 md:pb-20">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="text-3xl font-black tracking-tighter italic text-red-600">SLIMWAVE™</div>
          <p className="text-gray-500 text-sm max-w-xl mx-auto font-medium uppercase tracking-widest leading-loose">
            SlimWave™ è un marchio registrato. <br/> Oltre 1 milione di persone hanno scelto il benessere intelligente. <br/>
            Sede: Milano, Italia.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase opacity-40 tracking-[0.3em]">
            <a href="#" className="hover:text-red-600">Privacy Policy</a>
            <a href="#" className="hover:text-red-600">Termini e Condizioni</a>
            <a href="#" className="hover:text-red-600">Contatti</a>
          </div>
          <p className="text-[10px] text-gray-800 pt-10 font-black uppercase">© 2024 SlimWave Italia. All Rights Reserved.</p>
        </div>
      </footer>

      {/* --- STICKY MOBILE CTA --- */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-2xl border-t border-gray-100 p-4 md:hidden z-[110] flex items-center justify-between gap-4 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col">
          <span className="text-gray-400 line-through text-[10px] font-black">€119,00</span>
          <div className="flex items-center gap-1">
            <span className="text-2xl font-black text-red-600">€59,90</span>
            <span className="bg-red-600 text-white text-[8px] px-1 rounded font-black">-60%</span>
          </div>
        </div>
        <a href="#order" className="flex-1 bg-red-600 text-white py-4 rounded-[1.5rem] font-black text-center uppercase tracking-widest shadow-2xl active:scale-95 transition-transform flex items-center justify-center gap-2 text-sm italic">
          LIBERATI ORA <ArrowRight size={18} />
        </a>
      </div>

      <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: flex;
          width: fit-content;
          animation: scroll 20s linear infinite;
        }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}
