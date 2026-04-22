/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Star, 
  Truck, 
  ShieldCheck, 
  Wallet, 
  Clock, 
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Zap,
  Shield,
  ThumbsUp,
  RotateCcw,
  Package,
  MessageSquare,
  ArrowRight,
  Menu,
  ShoppingBag
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Constants ---
const BRAND_NAME = "VENOCARE™ CloudStep";
const PRICE = "€49,90";
const LIST_PRICE = "€99,90";

// --- Components ---

const Header = () => (
  <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="font-black text-2xl tracking-tighter uppercase">VENOCARE™</div>
      <button 
        onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}
        className="bg-green-600 text-white px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest hover:bg-green-700 transition-colors hidden md:block"
      >
        Ordina Ora
      </button>
      <button className="md:hidden">
        <ShoppingBag size={24} />
      </button>
    </div>
  </header>
);

const Hero = () => {
  return (
    <section className="bg-white pt-8 pb-16 px-4 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 order-2 lg:order-1">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase text-gray-500">
              <Zap size={12} className="text-yellow-500" />
              PRO — 360 Fit Walk (Daily Sneaker)
            </div>
            <h1 className="text-4xl md:text-7xl font-black leading-[1.05] uppercase tracking-tighter text-balance">
              “La scarpa che cambia misura insieme ai tuoi piedi.”
            </h1>
            <p className="text-xl md:text-2xl font-medium text-gray-600 leading-relaxed max-w-xl">
              “Doppia regolazione + materiale elastico: comfort totale anche quando il gonfiore aumenta a fine giornata.”
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" className="text-yellow-400" />)}
            </div>
            <span className="font-bold text-sm underline opacity-70">4.8/5 (2.134 recensioni verificate)</span>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
            {[
              "Apertura 180° Easy-On",
              "Toe-Box Extra Largo",
              "Extra Depth Interna",
              "Interno Seam-Free Zones",
              "Suola Anti-Fatica",
              "Fit by Circonferenza",
              "Tomaia Automodellante",
              "Spacer Kit Incluso"
            ].map((bullet, i) => (
              <li key={i} className="flex items-center gap-3 font-bold text-base">
                <div className="bg-green-600 rounded-full p-1 flex-shrink-0">
                  <CheckCircle2 className="text-white" size={14} />
                </div>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <p className="text-gray-400 line-through font-bold text-xl">€99,90</p>
              <p className="text-5xl font-black text-black">€49,90</p>
              <p className="text-xs font-black text-green-600 uppercase tracking-widest mt-1">Spedizione Gratis + COD</p>
            </div>
            <CTAButton />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative group">
            <div className="aspect-square rounded-[3rem] overflow-hidden border-8 border-gray-50 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
              <img 
                src="https://picsum.photos/seed/venocare-hero/800" 
                alt="VENOCARE CloudStep" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-black text-white p-6 rounded-3xl shadow-2xl transform -rotate-3 hidden md:block">
              <p className="text-4xl font-black">SCONTO 50%</p>
              <p className="text-sm font-bold opacity-70 uppercase tracking-widest">Offerta limitata</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const OrderSteps = () => {
  const steps = [
    { icon: Package, title: "1. Ordina", desc: "Compila il modulo con i tuoi dati." },
    { icon: MessageSquare, title: "2. Conferma", desc: "Ti contattiamo su WhatsApp." },
    { icon: Truck, title: "3. Spedizione", desc: "Consegna in 24-48h con GLS." },
    { icon: RotateCcw, title: "4. Reso Facile", desc: "30 giorni per cambiare idea." }
  ];

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">Come ordinare?</h2>
          <div className="h-1.5 w-24 bg-green-600 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {steps.map((step, i) => (
            <div key={i} className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm text-center space-y-4">
              <div className="bg-black text-white w-14 h-14 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <step.icon size={28} />
              </div>
              <h3 className="text-lg font-black uppercase">{step.title}</h3>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Transformation = () => (
  <section className="bg-white py-20 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter">Piedi Caldi e Gonfi? Ecco la Soluzione</h2>
        <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">VENOCARE™ è progettata per il riposo post-giornata e il comfort domestico assoluto.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-12">
        {[
          { title: "Espande", desc: "La tomaia in knit elastico e pannelli stretch si espande seguendo il gonfiore naturale del piede.", icon: Zap },
          { title: "Scarica", desc: "Il Toe-box extra-largo lascia le dita libere anche in presenza di edemi o bendaggi leggeri.", icon: ThumbsUp },
          { title: "Regola", desc: "Grazie al doppio velcro regoli la calzata millimetricamente tra mattino e sera.", icon: Shield }
        ].map((item, i) => (
          <div key={i} className="text-center space-y-6 group">
            <div className="w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center mx-auto text-black transition-all duration-300 group-hover:bg-black group-hover:text-white group-hover:rotate-6">
              <item.icon size={48} />
            </div>
            <h3 className="text-3xl font-black uppercase tracking-tighter">{item.title}</h3>
            <p className="text-lg text-gray-600 font-medium leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const TechGrid = () => {
  const items = [
    { title: "Apertura 180° Easy-On", tech: "Zip + Doppio Velcro", desc: "Apri tutto, infili e richiudi. Ideale per chi ha mobilità ridotta o gonfiore variabile." },
    { title: "Fit by Circonferenza", tech: "Guida Killer", desc: "Oltre alla lunghezza, ti guidiamo sulla circonferenza di pianta e collo per un fit perfetto." },
    { title: "Toe-Box + Extra Depth", tech: "Dita Libere", desc: "Volume interno maggiorato per evitare ogni costrizione, anche con piedi molto gonfi." },
    { title: "Seam-Free Zones", tech: "Zero Sfregamento", desc: "Interno senza cuciture nei punti critici (alluce e 5° dito) per prevenire irritazioni." },
    { title: "Suola Anti-Fatica", tech: "Grip & Ammortizzo", desc: "Strato ammortizzante che riduce l'impatto e battistrada antiscivolo per massima sicurezza." },
    { title: "Spacer Kit Incluso", tech: "Volume Variabile", desc: "2 spessori inclusi per regolare il volume interno in 10 secondi a seconda del momento della giornata." }
  ];

  return (
    <section className="bg-black text-white py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Tecnologia per il Tuo Benessere</h2>
          <p className="text-xl text-gray-400 font-medium">Ogni dettaglio è studiato per chi soffre di piedi pesanti e gonfi.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div key={i} className="bg-zinc-900 p-10 rounded-[2.5rem] border border-zinc-800 hover:border-green-600 transition-all duration-300 group">
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 group-hover:text-green-400 transition-colors">{item.title}</h3>
              <p className="font-black text-green-500 text-xs uppercase mb-6 tracking-widest">{item.tech}</p>
              <p className="text-gray-400 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Timeline = () => (
  <section className="bg-white py-24 px-4">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Sollievo Immediato e Duraturo</h2>
        <p className="text-xl text-gray-500 font-medium">Il percorso verso gambe leggere e piedi riposati.</p>
      </div>
      <div className="space-y-16 relative before:absolute before:left-6 md:before:left-1/2 before:top-0 before:bottom-0 before:w-1 before:bg-gray-100">
        {[
          { week: "Giorno 1", title: "Primo Contatto", desc: "Senti subito la differenza: la tomaia non stringe e il piede ha finalmente lo spazio di cui ha bisogno." },
          { week: "Settimana 1", title: "Circolazione", desc: "La suola anti-fatica riduce gli impatti. La sera i piedi sono meno caldi e visibilmente meno gonfi." },
          { week: "Settimana 2", title: "Libertà", desc: "Cammini in casa e fuori con sicurezza. Il dolore da costrizione è solo un brutto ricordo." },
          { week: "Settimana 4", title: "Benessere", desc: "Il gonfiore cronico è gestito. Hai ritrovato il piacere di stare in piedi senza timore del post-giornata." }
        ].map((item, i) => (
          <div key={i} className={`relative flex flex-col md:flex-row gap-12 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 bg-black rounded-full border-8 border-white z-10 shadow-lg"></div>
            <div className="ml-16 md:ml-0 md:w-1/2 bg-gray-50 p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-green-600 font-black uppercase text-xs tracking-widest">{item.week}</span>
              <h4 className="text-3xl font-black uppercase tracking-tighter mt-2 mb-4">{item.title}</h4>
              <p className="text-lg text-gray-600 font-medium leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Reviews = () => {
  const reviews = [
    { name: "Maria G.", city: "Milano", text: "Lavoro in piedi 8 ore al giorno. Prima arrivavo a casa con i piedi bollenti e gonfi come palloncini. Con queste scarpe ho finalmente trovato sollievo, la tomaia elastica è una benedizione.", rating: 5 },
    { name: "Giuseppe R.", city: "Napoli", text: "Ho problemi di circolazione e spesso fatico a infilare le scarpe normali. L'apertura a 180 gradi e il velcro mi permettono di regolarle perfettamente anche quando il piede si gonfia durante il giorno.", rating: 5 },
    { name: "Elena V.", city: "Torino", text: "Le uso principalmente in casa e per brevi uscite. Sono leggerissime e non stringono mai. Lo spacer kit incluso è utilissimo per adattarle tra mattina e sera. Mai più senza.", rating: 5 }
  ];

  return (
    <section className="bg-gray-50 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">2.134 Recensioni Verificate</h2>
          <p className="text-xl text-gray-500 font-medium">Cosa dicono le persone che le usano ogni giorno.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <div key={i} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-6 relative">
              <div className="flex gap-1">
                {[...Array(rev.rating)].map((_, i) => <Star key={i} size={18} fill="currentColor" className="text-yellow-400" />)}
              </div>
              <p className="font-bold italic text-gray-600 text-lg leading-relaxed">"{rev.text}"</p>
              <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                <div>
                  <p className="font-black uppercase text-sm">{rev.name}</p>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{rev.city}</p>
                </div>
                <div className="bg-green-100 text-green-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                  Verificato
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Comparison = () => (
  <section className="bg-white py-24 px-4">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Acquista Senza Nessun Rischio</h2>
        <p className="text-xl text-gray-500 font-medium">La tua unica preoccupazione: scegliere la taglia.</p>
      </div>
      <div className="grid grid-cols-3 gap-0 rounded-[3rem] overflow-hidden border-4 border-black shadow-2xl">
        <div className="p-8 bg-gray-50 border-r-2 border-b-2 border-black"></div>
        <div className="p-8 bg-black text-white text-center font-black uppercase text-sm md:text-lg border-b-2 border-black">VENOCARE™</div>
        <div className="p-8 bg-gray-100 text-center font-black uppercase text-sm md:text-lg border-b-2 border-black opacity-50">Scarpe Comuni</div>
        
        {[
          ["Apertura 180° Easy-On", true, false],
          ["Toe-Box Extra Largo", true, false],
          ["Spacer Kit (Volume)", true, false],
          ["Tomaia Stretch", true, false],
          ["Seam-Free Zones", true, false],
          ["Garanzia 30gg", true, false]
        ].map((row, i) => (
          <React.Fragment key={i}>
            <div className="p-8 border-r-2 border-b-2 border-gray-100 font-bold text-sm md:text-lg">{row[0]}</div>
            <div className="p-8 border-r-2 border-b-2 border-gray-100 flex justify-center bg-green-50">
              <CheckCircle2 className="text-green-600" size={32} />
            </div>
            <div className="p-8 border-b-2 border-gray-100 flex justify-center opacity-30">
              <XCircle className="text-red-500" size={32} />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  </section>
);

const OrderForm = () => {
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <section id="order-form" className="bg-gray-50 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-[4rem] p-8 md:p-20 border border-gray-100 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-red-600 text-white px-12 py-3 font-black text-sm uppercase tracking-widest transform rotate-45 translate-x-12 translate-y-6 shadow-lg">
            Offerta Flash
          </div>
          
          <div className="grid lg:grid-cols-2 gap-20">
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
                  Fase 1 di 2
                </div>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Inserisci i Tuoi Dati</h2>
                <p className="text-xl text-gray-500 font-medium">Spedizione gratuita e pagamento alla consegna.</p>
              </div>

              <div className="bg-red-50 border-2 border-red-100 rounded-[2rem] p-8 flex items-center gap-6 text-red-700 font-black">
                <div className="bg-red-600 text-white p-4 rounded-2xl shadow-lg">
                  <Clock size={32} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest opacity-70">L'offerta scade tra:</p>
                  <p className="text-4xl tracking-tighter">{formatTime(timeLeft)}</p>
                </div>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-4">
                  <input type="text" className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-6 text-lg font-bold focus:bg-white focus:border-black outline-none transition-all shadow-sm" placeholder="Nome e Cognome" required />
                  <input type="text" className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-6 text-lg font-bold focus:bg-white focus:border-black outline-none transition-all shadow-sm" placeholder="Indirizzo e Numero Civico" required />
                  <input type="tel" className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-6 text-lg font-bold focus:bg-white focus:border-black outline-none transition-all shadow-sm" placeholder="Numero di Telefono" required />
                </div>
                
                <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-100 flex items-center gap-4">
                  <div className="bg-green-600 text-white p-2 rounded-full">
                    <Wallet size={20} />
                  </div>
                  <span className="font-bold text-green-800">Pagamento alla Consegna (Contanti)</span>
                </div>

                <button className="bg-green-600 hover:bg-green-700 text-white font-black text-2xl py-7 px-8 rounded-3xl shadow-xl shadow-green-100 active:scale-95 transition-all uppercase w-full">
                  CONFERMA ORDINE ORA
                </button>
              </form>

              <div className="flex justify-center gap-8 opacity-40 grayscale">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
              </div>
            </div>

            <div className="space-y-10">
              <div className="bg-gray-50 rounded-[3rem] p-10 border border-gray-100 shadow-sm space-y-8">
                <h4 className="text-3xl font-black uppercase tracking-tighter">Riepilogo Ordine</h4>
                <div className="flex gap-6">
                  <div className="w-32 h-32 rounded-[2rem] overflow-hidden border-4 border-white shadow-md flex-shrink-0">
                    <img src="https://picsum.photos/seed/shoes-summary/300" alt="Shoes" className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-black uppercase text-lg tracking-tighter">VENOCARE™ CloudStep Kit</p>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Taglia: Selezionabile dopo l'ordine</p>
                    <div className="flex items-center gap-3 pt-2">
                      <span className="text-3xl font-black">€49,90</span>
                      <span className="text-lg text-gray-400 line-through font-bold">€99,90</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 pt-8 border-t border-gray-200">
                  <div className="flex justify-between font-bold text-gray-400">
                    <span className="uppercase tracking-widest text-xs">Prezzo Originale</span>
                    <span>€99,90</span>
                  </div>
                  <div className="flex justify-between font-bold text-green-600">
                    <span className="uppercase tracking-widest text-xs">Spedizione</span>
                    <span>GRATIS</span>
                  </div>
                  <div className="flex justify-between text-4xl font-black pt-6">
                    <span className="tracking-tighter">TOTALE</span>
                    <span>€49,90</span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-[2.5rem] p-8 border border-yellow-100 space-y-4">
                <div className="flex items-center gap-3 font-black text-yellow-800 uppercase text-sm tracking-widest">
                  <AlertTriangle size={24} />
                  <span>Disclaimer Medico</span>
                </div>
                <p className="font-bold text-xs text-yellow-900/70 leading-relaxed">
                  “Non è un dispositivo medico. Se hai patologie o dolore cronico, consulta il tuo medico.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StickyBar = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 1000);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-6 left-4 right-4 z-50 md:hidden"
        >
          <div className="bg-white border-2 border-black rounded-[2rem] p-5 shadow-2xl flex items-center gap-6">
            <div className="flex-1">
              <p className="font-black text-2xl tracking-tighter">€49,90</p>
              <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest">Sconto 50% Attivo</p>
            </div>
            <button 
              onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex-[2] bg-green-600 text-white font-black py-4 px-6 rounded-2xl uppercase text-sm shadow-lg shadow-green-100 active:scale-95 transition-transform"
            >
              ORDINA ORA
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Footer = () => (
  <footer className="bg-gray-50 py-24 px-4">
    <div className="max-w-7xl mx-auto text-center space-y-12">
      <div className="font-black text-4xl uppercase tracking-tighter">VENOCARE™</div>
      <div className="flex flex-wrap justify-center gap-10 text-xs font-black uppercase text-gray-400 tracking-widest">
        <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-black transition-colors">Termini e Condizioni</a>
        <a href="#" className="hover:text-black transition-colors">Spedizioni</a>
        <a href="#" className="hover:text-black transition-colors">Contatti</a>
      </div>
      <div className="pt-12 border-t border-gray-200">
        <p className="text-[10px] text-gray-400 font-bold max-w-2xl mx-auto leading-relaxed uppercase tracking-widest">
          © 2026 VENOCARE™ Italia. Tutti i diritti riservati. I risultati possono variare da persona a persona. Le informazioni contenute in questo sito hanno scopo puramente informativo e non sostituiscono il parere del medico.
        </p>
      </div>
    </div>
  </footer>
);

const CTAButton = ({ className = "", children = "SÌ, LE VOGLIO ORA!" }: { className?: string, children?: React.ReactNode }) => (
  <button 
    onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}
    className={`bg-green-600 hover:bg-green-700 text-white font-black text-xl py-6 px-10 rounded-2xl shadow-xl shadow-green-100 active:scale-95 transition-all uppercase w-full sm:w-auto relative overflow-hidden group ${className}`}
  >
    <span className="relative z-10">{children}</span>
    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
  </button>
);

const TrustRow = () => (
  <div className="bg-white border-y border-gray-100 py-8 px-4">
    <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-6 md:h-8" />
      <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6 md:h-8" />
      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 md:h-8" />
      <div className="font-black text-xl tracking-tighter">GLS EXPRESS</div>
      <div className="font-black text-xl tracking-tighter">SSL SECURE</div>
    </div>
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-green-100">
      <Header />
      <Hero />
      <TrustRow />
      <OrderSteps />
      <Transformation />
      <TechGrid />
      <Timeline />
      <Reviews />
      <Comparison />
      <OrderForm />
      <Footer />
      <StickyBar />
    </div>
  );
}
