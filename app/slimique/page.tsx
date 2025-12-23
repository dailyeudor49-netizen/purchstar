
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  Flame,
  Zap,
  Lock,
  Unlock,
  AlertTriangle,
  Star,
  ArrowDown,
  ShieldCheck,
  TrendingDown
} from 'lucide-react';

export default function AdvertorialPage() {
  const [likes, setLikes] = useState(4192);
  const [timeLeft, setTimeLeft] = useState(599);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
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

  return (
    <div className="min-h-screen bg-[#fcfcfd] text-slate-900 font-sans selection:bg-rose-100 selection:text-rose-900">
      {/* Top Banner - Urgency */}
      <div className="bg-rose-600 text-white text-[10px] md:text-xs font-black uppercase tracking-[0.2em] py-2 px-4 text-center sticky top-0 z-[60]">
        ATTENZIONE: Rapporto Investigativo Riservato ai residenti in Italia - Disponibile solo per oggi
      </div>

      {/* Modern Navigation */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-[32px] md:top-[40px] z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center -rotate-6 shadow-lg">
              <Zap className="w-5 h-5 text-rose-500 fill-current" />
            </div>
            <span className="font-black text-xl tracking-tighter text-slate-900">Bio<span className="text-rose-600 italic">Hacker</span> Female</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Scienza & Metabolismo</span>
            <div className="h-4 w-px bg-slate-200"></div>
            <button className="bg-rose-600 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-md hover:bg-rose-700 transition-colors">Abbonati</button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-20">
        {/* Editorial Header */}
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="bg-rose-50 text-rose-700 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border border-rose-100">Inchiesta Speciale</span>
            <span className="text-slate-400 text-xs font-semibold flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> 12 min di lettura neuro-scientifica
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[0.95] tracking-tight mb-10">
            Quell'ombra nello specchio che non riconosci più: <span className="text-rose-600 italic">Perché nessuna dieta potrà mai salvarti</span> finché non trovi "La Chiave".
          </h1>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 py-8 border-y border-slate-100">
            <div className="flex items-center gap-5">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150" 
                  className="w-16 h-16 rounded-2xl border-2 border-white shadow-xl object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  alt="Dott.ssa Giulia Rinaldi"
                />
                <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <p className="font-black text-slate-900 leading-none mb-1 text-xl">Dott.ssa Giulia Rinaldi</p>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">Neuro-Biobiologa e Ricercatrice • <span className="text-rose-600">Verified Expert</span></p>
              </div>
            </div>
            <div className="flex items-center gap-6">
               <div className="flex flex-col items-end">
                 <div className="flex items-center gap-1.5 text-rose-600 font-black text-xl">
                   <Heart className="w-5 h-5 fill-current" />
                   <span>{likes.toLocaleString()}</span>
                 </div>
                 <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest text-right">Approvazioni Scientifiche</p>
               </div>
               <div className="w-px h-10 bg-slate-100"></div>
               <button className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all">
                 <Share2 className="w-6 h-6" />
               </button>
            </div>
          </div>
        </header>

        {/* The Pain: Neuromarketing Hook */}
        <article className={`space-y-12 text-lg md:text-2xl leading-relaxed text-slate-700 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="first-letter:text-7xl first-letter:font-black first-letter:text-rose-600 first-letter:mr-3 first-letter:float-left">
            Chiudi gli occhi per un secondo. Ricordi l'ultima volta che sei entrata in un camerino, sotto quelle luci al neon spietate che sembrano <strong>evidenziare ogni tua minima insicurezza</strong>? 
          </p>

          <p>
            Ti guardi. Non riconosci quella figura. Quel gonfiore ostinato sui fianchi che sembra <strong>prendersi gioco di te</strong>, nonostante l'insalata scondita che hai mangiato ieri sera mentre gli altri ordinavano pizza. Senti il respiro farsi corto mentre cerchi disperatamente di chiudere una zip che fino a pochi mesi fa scorreva senza sforzo. 
            <strong>Ti senti umiliata. Ti senti invisibile. Ti senti, nel profondo, tradita dalla tua stessa biologia.</strong>
          </p>

          <blockquote className="relative py-12 px-8 md:px-16 bg-slate-50 rounded-[3rem] border border-slate-100 overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000"></div>
            <p className="relative z-10 text-slate-900 font-black italic text-2xl md:text-3xl leading-tight text-center">
              "Mi sentivo come se il mio corpo fosse una prigione di gomma. Potevo urlare, potevo digiunare, ma quel grasso non si muoveva di un millimetro. Mi guardavano al ristorante come se fossi io la colpevole... Ma io non stavo mangiando. Io stavo scomparendo dentro me stessa."
            </p>
            <cite className="block text-center mt-6 text-xs font-black uppercase tracking-[0.3em] text-rose-600 not-italic">— Maria V., 52 anni (Ex vittima del blocco metabolico)</cite>
          </blockquote>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight pt-10">
            La menzogna delle calorie: Perché ti stanno condannando al fallimento sociale.
          </h2>
          
          <p>
            L'industria del fitness vuole farti credere che sia una questione di <strong>forza di volontà</strong>. "Mangia meno, muoviti di più", dicono con quel tono di sufficienza. È la più grande bugia del secolo. È l'equivalente scientifico di dire a un uomo con le gambe legate di correre più veloce per liberarsi.
          </p>

          <p>
            Il vero colpevole è un <strong>"Fantasma Ormonale"</strong> che vive silenzioso nelle tue cellule. La scienza lo chiama <strong>Blocco Insulinico</strong>. Quando i tuoi recettori diventano "sordi" a causa dello stress cellulare e dell'età, il tuo corpo entra in modalità "Carestia Perenne". 
            Non importa se mangi solo aria: ogni singola molecola viene <strong>sequestrata e trasformata immediatamente in grasso di riserva viscerale</strong>. 
            <span className="bg-rose-100 px-2 py-1 font-bold text-rose-900 rounded-lg shadow-sm">Il tuo metabolismo è letteralmente sotto chiave.</span>
          </p>

          {/* Visual Evidence Section */}
          <div className="my-20 relative">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
                <img 
                  src="https://images.unsplash.com/photo-1541604193435-22287d32c2c2?auto=format&fit=crop&q=80&w=800" 
                  className="w-full aspect-square object-cover grayscale"
                  alt="Metabolismo Bloccato"
                />
                <div className="absolute inset-0 bg-slate-900/60 flex flex-col justify-center items-center text-white p-8 text-center opacity-100 group-hover:bg-slate-900/40 transition-all">
                  <Lock className="w-12 h-12 mb-4 text-rose-500 animate-pulse" />
                  <h4 className="font-black text-xl uppercase mb-2">Stato: Blocco</h4>
                  <p className="text-xs opacity-70">Recettori insulinici sordi. Accumulo adiposo accelerato.</p>
                </div>
              </div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
                <img 
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800" 
                  className="w-full aspect-square object-cover"
                  alt="Metabolismo Sbloccato"
                />
                <div className="absolute inset-0 bg-rose-600/60 flex flex-col justify-center items-center text-white p-8 text-center opacity-100 group-hover:bg-rose-600/40 transition-all">
                  <Unlock className="w-12 h-12 mb-4 text-white" />
                  <h4 className="font-black text-xl uppercase mb-2">Stato: Libero</h4>
                  <p className="text-xs opacity-90">Lipolisi attiva. Conversione dei grassi in energia pura.</p>
                </div>
              </div>
            </div>
            <div className="text-center mt-6">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.4em]">Riscontro termografico pre/post sblocco cellulare</p>
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
            La Svolta Neuro-Biologica: Il "Reset" che non passa per lo stomaco.
          </h2>

          <p>
            Per anni abbiamo cercato la soluzione in pillole, gocce e polveri. Ma il sistema digerente è un filtro brutale: distrugge fino all'85% dei principi attivi prima che possano anche solo sfiorare il tuo sangue. 
            Ecco perché le tue diete non funzionano. <strong>Stai parlando alla porta sbagliata.</strong>
          </p>

          <p>
            La vera rivoluzione è <strong>Transdermica</strong>. I ricercatori hanno isolato una combinazione di fito-molecole capaci di attraversare la barriera cutanea e <strong>resettare i recettori glicemici in tempo reale</strong>. 
            Immagina un interruttore che viene finalmente girato su "ON" dopo anni di buio totale.
          </p>

          {/* Product Reveal - The Hero */}
          <section className="my-24 bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.3)]">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-600 via-amber-400 to-rose-600"></div>
            <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 space-y-8">
                <div className="inline-block px-4 py-2 bg-rose-600 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-600/20">
                  Protocollo Golden Key v2.4
                </div>
                <h3 className="text-4xl md:text-6xl font-black leading-none tracking-tighter italic">
                  GlycoBlock: <span className="text-rose-500">L'Unica</span> Chiave del tuo Destino.
                </h3>
                <div className="space-y-6">
                   <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                         <ShieldCheck className="w-5 h-5 text-rose-500" />
                      </div>
                      <p className="text-lg md:text-xl m-0 leading-snug"><strong>Sblocca i Recettori Sordi</strong>: Invia un segnale bio-elettrico chimico che costringe le cellule a riaprirsi.</p>
                   </div>
                   <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                         <Flame className="w-5 h-5 text-rose-500" />
                      </div>
                      <p className="text-lg md:text-xl m-0 leading-snug"><strong>Lipolisi Autonoma</strong>: Il grasso viscerale viene finalmente "visto" e usato come carburante.</p>
                   </div>
                   <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                         <Zap className="w-5 h-5 text-rose-500" />
                      </div>
                      <p className="text-lg md:text-xl m-0 leading-snug"><strong>Stop Fame Nervosa</strong>: Disconnette il segnale di "bisogno di zucchero" dal cervello limbico.</p>
                   </div>
                </div>
                <div className="pt-8 border-t border-white/10">
                   <p className="text-xs text-slate-400 uppercase font-bold tracking-widest flex items-center gap-2">
                     <TrendingDown className="w-4 h-4" /> Risultati certificati su un campione di 1.250 donne (2023)
                   </p>
                </div>
              </div>
              <div className="w-full md:w-1/3 aspect-[3/4] bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2.5rem] border border-white/10 shadow-inner flex flex-col items-center justify-center p-8 text-center group">
                 <div className="w-24 h-24 bg-rose-600 rounded-full mb-6 flex items-center justify-center shadow-2xl shadow-rose-600/50 group-hover:scale-110 transition-transform">
                    <Star className="w-12 h-12 text-white fill-current" />
                 </div>
                 <p className="text-2xl font-black mb-2">GlycoBlock Kit</p>
                 <p className="text-sm text-slate-400 mb-8 font-medium">Reset Metabolico Transdermico</p>
                 <div className="w-full h-px bg-white/10 mb-8"></div>
                 <p className="text-[10px] font-black uppercase text-rose-500 tracking-widest animate-pulse">In Stock: SOLO 14 KIT</p>
              </div>
            </div>
          </section>

          <p className="text-2xl md:text-3xl font-black text-slate-900 leading-tight text-center max-w-2xl mx-auto italic py-10">
            "Ho smesso di essere un'ombra. Ho ricominciato a indossare i vestiti che amo. <span className="text-rose-600 underline decoration-rose-200 decoration-8 underline-offset-8">Ho ripreso il controllo del mio destino biologico.</span>"
          </p>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
             Perché dovresti agire proprio ORA (e non domani).
          </h2>
          <p>
            Il tuo corpo non aspetta. Ogni giorno passato nel "Blocco Metabolico" è un giorno di <strong>infiammazione cellulare silente</strong> che invecchia i tuoi organi, appesantisce il tuo cuore e ruba la tua gioia di vivere. 
            Il disagio che provi oggi, quel nodo alla gola davanti allo specchio, è il segnale d'allarme supremo del tuo sistema nervoso. 
            <strong>Stai per arrenderti all'invisibilità? O stai per combattere con l'unica arma neuro-scientifica che funziona davvero?</strong>
          </p>
        </article>

        {/* HIGH CONVERSION CTA SECTION */}
        <section className="mt-32 relative">
          <div className="absolute inset-0 bg-rose-600 blur-[100px] opacity-10"></div>
          <div className="relative bg-white border-4 border-slate-900 rounded-[4rem] p-8 md:p-20 text-center shadow-[0_40px_100px_rgba(0,0,0,0.1)]">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-10 py-4 rounded-3xl font-black text-sm uppercase tracking-[0.3em] flex items-center gap-3 shadow-2xl">
               <AlertTriangle className="w-5 h-5 text-amber-400" /> Stock Critico <AlertTriangle className="w-5 h-5 text-amber-400" />
            </div>
            
            <h2 className="text-4xl md:text-7xl font-black text-slate-900 mb-10 leading-[0.9] tracking-tighter">
              Dì addio alla <span className="text-rose-600">tua vecchia te</span>. Oggi.
            </h2>
            <p className="text-xl md:text-2xl text-slate-500 mb-16 max-w-2xl mx-auto leading-relaxed font-medium">
               Accedi oggi stesso al protocollo <strong>GlycoBlock</strong> con l'agevolazione riservata esclusivamente alla nostra community scientifica. 
               <br/><span className="text-rose-600 font-black italic">Avviso: Questa offerta si autodistruggerà al termine del timer.</span>
            </p>

            <div className="flex flex-col items-center gap-10">
              <a 
                href="https://vostro-link-affiliazione.com" 
                className="group relative inline-flex items-center gap-6 bg-rose-600 text-white px-12 py-8 md:px-20 md:py-10 rounded-full text-2xl md:text-4xl font-black uppercase transition-all hover:bg-rose-700 hover:scale-105 active:scale-95 shadow-[0_20px_80px_rgba(225,29,72,0.4)]"
              >
                VOGLIO IL MIO RESET ORA <ChevronRight className="w-10 h-10 group-hover:translate-x-3 transition-transform duration-500" />
              </a>
              
              <div className="space-y-4">
                 <div className="flex items-center justify-center gap-3 text-slate-900 font-black text-2xl md:text-3xl">
                   <Clock className="w-8 h-8 text-rose-600" /> 
                   <span className="tracking-tighter">OFFERTA SCADE IN: <span className="font-mono text-rose-600">{formatTime(timeLeft)}</span></span>
                 </div>
                 <div className="flex items-center justify-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
                   <p className="text-xs text-slate-400 font-black uppercase tracking-[0.2em]">Spedizione Gratuita Attiva in: <span className="text-slate-900 underline">Tutta Italia</span></p>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expert Voice / Trust Building */}
        <section className="mt-40 p-10 md:p-16 bg-slate-50 rounded-[4rem] border border-slate-100 flex flex-col md:flex-row gap-12 items-center">
           <div className="relative shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300" 
                className="w-48 h-48 md:w-64 md:h-64 rounded-[3rem] object-cover grayscale shadow-2xl"
                alt="Dott.ssa Rinaldi"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-50">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Signature_of_Barack_Obama.svg/1024px-Signature_of_Barack_Obama.svg.png" className="h-10 opacity-30 invert" alt="Firma Autografa" />
              </div>
           </div>
           <div>
              <h4 className="font-black text-slate-900 text-3xl mb-4">Nota Finale dell'Autore</h4>
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed italic mb-6">
                "Ho dedicato la mia vita allo studio del metabolismo femminile perché ho visto troppe donne brillanti spegnersi a causa di insicurezze biologiche. GlycoBlock non è solo un cerotto; è un manifesto di libertà. È il modo in cui diciamo basta a un'industria che trae profitto dai nostri fallimenti. Riprenditi il tuo corpo. Riprenditi il tuo sorriso."
              </p>
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">— Giulia Rinaldi, Neuro-Biobiologa</p>
           </div>
        </section>

        {/* Real Discussion Section */}
        <section className="mt-40 border-t-2 border-slate-100 pt-20 pb-20">
          <div className="flex items-center justify-between mb-16">
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">Voci della Community (1.248)</h3>
            <div className="flex gap-2">
               {[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 text-amber-400 fill-current" />)}
               <span className="font-bold text-slate-900 ml-2">4.9/5</span>
            </div>
          </div>
          
          <div className="space-y-12">
            {[
              { 
                name: "Valeria M.", 
                status: "Acquisto Verificato",
                time: "42 min fa", 
                text: "Ho pianto leggendo questo articolo. Mi sono sentita capita per la prima volta in 15 anni. Ho ordinato il kit ieri, mi hanno appena inviato il tracking. Non vedo l'ora di sbloccarmi.",
                avatar: "https://i.pravatar.cc/150?u=valeria"
              },
              { 
                name: "Silvia G.", 
                status: "Risultato Certificato",
                time: "2 ore fa", 
                text: "Funziona. Non fatevi domande inutili. Provatelo. Ho perso 5.4kg nelle prime 2 settimane e la cosa pazzesca è che la sera non sento più quel buco allo stomaco che mi costringeva a mangiare biscotti. Mi sento di nuovo io.",
                avatar: "https://i.pravatar.cc/150?u=silvia"
              },
              { 
                name: "Caterina 78", 
                status: "Acquisto Verificato",
                time: "5 ore fa", 
                text: "Finalmente qualcuno che parla seriamente di menopausa e blocco metabolico senza vendere aria fritta. Grazie Dott.ssa Rinaldi per il suo coraggio. Il cerotto è invisibile e comodissimo.",
                avatar: "https://i.pravatar.cc/150?u=caterina"
              }
            ].map((comment, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-6 p-8 bg-white rounded-[2.5rem] shadow-sm border border-slate-50 hover:shadow-md transition-shadow">
                <img src={comment.avatar} className="w-16 h-16 md:w-20 md:h-20 rounded-2xl shrink-0 object-cover" alt="User" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-black text-slate-900 text-lg">{comment.name}</p>
                      <span className="text-[10px] font-black uppercase text-green-600 tracking-widest">{comment.status}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{comment.time}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-base md:text-lg mb-6">{comment.text}</p>
                  <div className="flex items-center gap-8">
                     <button className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-rose-600 transition-colors">
                        <Heart className="w-4 h-4" /> Ti piace (12)
                     </button>
                     <button className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-rose-600 transition-colors">
                        <MessageCircle className="w-4 h-4" /> Rispondi
                     </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-20 bg-slate-900 p-12 rounded-[3rem] text-center text-white">
             <h4 className="text-2xl font-black mb-4 tracking-tight">Vuoi aggiungere la tua voce?</h4>
             <p className="text-slate-400 text-sm mb-8 font-medium italic">Solo gli utenti con un acquisto verificato possono pubblicare testimonianze dirette.</p>
             <button className="bg-white text-slate-900 font-black uppercase text-xs tracking-[0.3em] px-8 py-4 rounded-full shadow-xl hover:bg-slate-100 transition-colors">Effettua il Login</button>
          </div>
        </section>
      </main>

      {/* Corporate Compliance Footer */}
      <footer className="bg-slate-900 text-white py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-20 mb-20">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white fill-current" />
                </div>
                <span className="font-black text-2xl tracking-tighter uppercase">BioHacker</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium">
                Il principale portale indipendente dedicato alla salute metabolica femminile e al bio-hacking naturale. Informazione libera dai giganti dell'industria.
              </p>
              <div className="flex gap-4">
                 {[1,2,3].map(i => (
                   <div key={i} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-rose-600 transition-all cursor-pointer">
                      <Share2 className="w-4 h-4" />
                   </div>
                 ))}
              </div>
            </div>
            
            <div className="space-y-6">
               <h5 className="font-black text-white uppercase text-xs tracking-[0.4em] mb-8">Informazioni Legali</h5>
               <ul className="space-y-4 text-slate-500 text-sm font-bold uppercase tracking-widest">
                  <li className="hover:text-rose-600 cursor-pointer">Informativa Privacy</li>
                  <li className="hover:text-rose-600 cursor-pointer">Termini di Vendita</li>
                  <li className="hover:text-rose-600 cursor-pointer">Medical Disclaimer</li>
                  <li className="hover:text-rose-600 cursor-pointer">Cookie Policy</li>
               </ul>
            </div>

            <div className="space-y-6">
               <h5 className="font-black text-white uppercase text-xs tracking-[0.4em] mb-8">Contatti Redazione</h5>
               <p className="text-slate-400 text-sm font-medium italic mb-4">Per richieste stampa o collaborazioni scientifiche:</p>
               <p className="text-rose-500 font-black text-lg">redazione@biohackerfemale.it</p>
               <p className="text-slate-600 text-xs font-bold uppercase tracking-widest mt-8">Sede Legale: Via dell'Innovazione 42, 20121 Milano</p>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-16 text-[10px] md:text-[11px] text-slate-600 leading-loose uppercase tracking-[0.2em] font-black">
            <p className="mb-6 italic">*AVVERTENZA MEDICA: LE INFORMAZIONI CONTENUTE IN QUESTO RAPPORTO SONO A SCOPO PURAMENTE DIVULGATIVO E NON SOSTITUISCONO IL PARERE DEL MEDICO CURANTE. GLYCOBLOCK È UN SUPPORTO NATURALE E NON UN FARMACO. I RISULTATI DESCRITTI POSSONO VARIARE IN BASE AL METABOLISMO INDIVIDUALE E ALLO STILE DI VITA. L'USO DEL PRODOTTO DEVE ESSERE ACCOMPAGNATO DA UN REGIME ALIMENTARE EQUILIBRATO.</p>
            <p className="text-center">&copy; 2024 BIOHACKER FEMALE DIGITAL MEDIA GROUP. TUTTI I DIRITTI RISERVATI. P.IVA 092482390123</p>
          </div>
        </div>
      </footer>

      {/* Persistent Mobile CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 z-[100] flex items-center justify-between shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
         <div className="flex flex-col">
            <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest animate-pulse">Offerta Attiva</span>
            <span className="text-base font-black text-slate-900 tracking-tighter">DISPONIBILITÀ: 8 KIT</span>
         </div>
         <a href="https://vostro-link-affiliazione.com" className="bg-rose-600 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-rose-600/30 active:scale-95 transition-all">SBLOCCAMI ORA</a>
      </div>
    </div>
  );
}
