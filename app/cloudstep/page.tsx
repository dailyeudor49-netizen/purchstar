"use client";

import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  XCircle,
  Star,
  Truck,
  Wallet,
  Clock,
  AlertTriangle,
  Zap,
  Shield,
  ThumbsUp,
  RotateCcw,
  Package,
  MessageSquare,
  ShoppingBag
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { OrderSection } from './OrderModal';

/**
 * VENOCARE™ PRO — 360 Fit Walk
 * Landing Page "Boomer-Proof" ad alto contrasto.
 * Target: Piedi gonfi, mobilità ridotta, comfort post-giornata.
 */

// --- Sotto-Componenti ---

const Header = () => (
  <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="font-black text-2xl tracking-tighter uppercase">VENOCARE™</div>
      <button 
        onClick={() => document.getElementById('ordina')?.scrollIntoView({ behavior: 'smooth' })}
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


const HERO_IMAGES = [
  "/images/cloudstep/unnamed (9).jpg",
  "/images/cloudstep/nero.jpg",
  "/images/cloudstep/grigio.jpg",
];

const Hero = () => {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
  const next = () => setIdx((i) => (i + 1) % HERO_IMAGES.length);

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
              &ldquo;La scarpa che cambia misura insieme ai tuoi piedi.&rdquo;
            </h1>
            <p className="text-xl md:text-2xl font-medium text-gray-600 leading-relaxed max-w-xl">
              &ldquo;Doppia regolazione + materiale elastico: comfort totale anche quando il gonfiore aumenta a fine giornata.&rdquo;
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
              "Apertura 180° Easy-On", "Toe-Box Extra Largo", "Extra Depth Interna",
              "Interno Seam-Free Zones", "Suola Anti-Fatica", "Fit by Circonferenza",
              "Tomaia Automodellante", "Spacer Kit Incluso"
            ].map((bullet, i) => (
              <li key={i} className="flex items-center gap-3 font-bold text-base">
                <div className="bg-green-600 rounded-full p-1 flex-shrink-0">
                  <CheckCircle2 className="text-white" size={14} />
                </div>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <OrderSection image={HERO_IMAGES[idx]} />
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative group">
            <div className="aspect-square rounded-[3rem] overflow-hidden border-8 border-gray-50 shadow-2xl relative">
              {HERO_IMAGES.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`VENOCARE CloudStep ${i + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === idx ? "opacity-100" : "opacity-0"}`}
                />
              ))}
              {/* Frecce */}
              <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-10">
                <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-gray-800 fill-none" strokeWidth={2.5}><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-10">
                <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-gray-800 fill-none" strokeWidth={2.5}><path d="M9 6l6 6-6 6" /></svg>
              </button>
              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {HERO_IMAGES.map((_, i) => (
                  <button key={i} onClick={() => setIdx(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === idx ? "bg-white scale-125 shadow" : "bg-white/50"}`} />
                ))}
              </div>
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

const TrustRow = () => (
  <div className="bg-white border-y border-gray-100 py-8 px-4">
    <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
      <div className="font-black text-xl tracking-tighter">PAYPAL</div>
      <div className="font-black text-xl tracking-tighter">VISA / MC</div>
      <div className="font-black text-xl tracking-tighter">GLS EXPRESS</div>
      <div className="font-black text-xl tracking-tighter">SSL SECURE</div>
    </div>
  </div>
);

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
          { title: "Espande", desc: "La tomaia in knit elastico e pannelli stretch si espande seguendo il gonfiore naturale del piede.", img: "/images/cloudstep/adatta.jpg" },
          { title: "Scarica", desc: "Il Toe-box extra-largo lascia le dita libere anche in presenza di edemi o bendaggi leggeri.", img: "/images/cloudstep/materiali.png" },
          { title: "Regola", desc: "Grazie al doppio velcro regoli la calzata millimetricamente tra mattino e sera.", img: "/images/cloudstep/strap.jpg" }
        ].map((item, i) => (
          <div key={i} className="text-center space-y-6 group">
            <div className="w-full aspect-[4/3] rounded-[2rem] overflow-hidden mx-auto border border-gray-100 shadow-sm">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
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
    { title: "Apertura 180° Easy-On", tech: "Zip + Doppio Velcro", desc: "Apri tutto, infili e richiudi. Ideale per chi ha mobilità ridotta o gonfiore variabile.", img: "/images/cloudstep/unnamed (2).jpg" },
    { title: "Fit by Circonferenza", tech: "Guida Killer", desc: "Oltre alla lunghezza, ti guidiamo sulla circonferenza di pianta e collo per un fit perfetto.", img: "/images/cloudstep/unnamed (6).jpg" },
    { title: "Toe-Box + Extra Depth", tech: "Dita Libere", desc: "Volume interno maggiorato per evitare ogni costrizione, anche con piedi molto gonfi.", img: "/images/cloudstep/unnamed (3).jpg" },
    { title: "Seam-Free Zones", tech: "Zero Sfregamento", desc: "Interno senza cuciture nei punti critici (alluce e 5° dito) per prevenire irritazioni.", img: "/images/cloudstep/unnamed (5).jpg" },
    { title: "Suola Anti-Fatica", tech: "Grip & Ammortizzo", desc: "Strato ammortizzante che riduce l'impatto e battistrada antiscivolo per massima sicurezza.", img: "/images/cloudstep/unnamed.jpg" },
    { title: "Spacer Kit Incluso", tech: "Volume Variabile", desc: "2 spessori inclusi per regolare il volume interno in 10 secondi a seconda del momento della giornata.", img: "/images/cloudstep/unnamed (4).jpg" }
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
            <div key={i} className="bg-zinc-900 rounded-[2.5rem] border border-zinc-800 hover:border-green-600 transition-all duration-300 group overflow-hidden">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-8 pt-6">
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 group-hover:text-green-400 transition-colors">{item.title}</h3>
                <p className="font-black text-green-500 text-xs uppercase mb-4 tracking-widest">{item.tech}</p>
                <p className="text-gray-400 font-medium leading-relaxed">{item.desc}</p>
              </div>
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

const reviewData = [
  { batch: 1, av: "M", name: "Maria G.", meta: "Verificata · Milano", stars: 5, text: "Lavoro in piedi 8 ore al giorno. Prima arrivavo a casa con i piedi bollenti e gonfi come palloncini. Con le VENOCARE ho finalmente trovato sollievo, la tomaia elastica è una benedizione." },
  { batch: 1, av: "G", name: "Giuseppe R.", meta: "Verificato · Napoli", stars: 5, text: "Ho problemi di circolazione e spesso fatico a infilare le scarpe normali. L'apertura a 180 gradi e il velcro mi permettono di regolarle perfettamente anche quando il piede si gonfia durante il giorno." },
  { batch: 1, av: "E", name: "Elena V.", meta: "Verificata · Torino", stars: 5, text: "Le uso principalmente in casa e per brevi uscite. Sono leggerissime e non stringono mai. Lo spacer kit incluso è utilissimo per adattarle tra mattina e sera. Mai più senza." },
  { batch: 2, av: "A", name: "Anna M.", meta: "Verificata · Roma", stars: 5, text: "Soffro di piedi gonfi da anni per problemi venosi. Queste scarpe si adattano al gonfiore senza stringere. Il doppio velcro è geniale: regolo la calzata in 2 secondi. Le migliori che abbia mai provato." },
  { batch: 2, av: "P", name: "Pietro S.", meta: "Verificato · Firenze", stars: 5, text: "Le ho prese per mia madre che ha difficoltà a piegarsi. Con l'apertura totale le infila da sola senza sforzo. La suola antiscivolo le dà sicurezza. Ne ordino un paio anche per mio padre." },
  { batch: 2, av: "R", name: "Rosa T.", meta: "Verificata · Bologna", stars: 4, text: "Arrivate in 2 giorni con GLS. Comodissime fin da subito, il materiale traspirante tiene il piede fresco. Metto 4 stelle perché aspetto di testarle nel lungo periodo, ma la prima impressione è ottima." },
  { batch: 3, av: "L", name: "Lucia D.", meta: "Verificata · Palermo", stars: 5, text: "Sono diabetica e ho bisogno di scarpe senza cuciture interne. Le Seam-Free Zones sono perfette: nessuno sfregamento, nessuna irritazione. Finalmente posso camminare tranquilla." },
  { batch: 3, av: "F", name: "Franco B.", meta: "Verificato · Bari", stars: 5, text: "A 72 anni avevo rinunciato a camminare per il dolore ai piedi. Con le VENOCARE ho ripreso le passeggiate serali. La suola ammortizzante fa una differenza enorme. Grazie davvero." },
  { batch: 3, av: "S", name: "Sandra F.", meta: "Verificata · Verona", stars: 5, text: "Rapporto qualità-prezzo eccezionale al 50% di sconto. Ordinato con contrassegno, arrivate in 2 giorni. Super comode, piede fresco tutto il giorno anche d'estate. Molto contenta." },
];

const Reviews = () => {
  const [visibleBatch, setVisibleBatch] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const visible = reviewData.filter((r) => r.batch <= visibleBatch);

  return (
    <section className="bg-gray-50 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">2.134 Recensioni Verificate</h2>
          <p className="text-xl text-gray-500 font-medium">Cosa dicono le persone che le usano ogni giorno.</p>
        </div>

        {/* Review cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {visible.map((rev, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center text-lg font-black shrink-0">{rev.av}</div>
                <div>
                  <p className="font-black text-sm uppercase">{rev.name}</p>
                  <p className="text-[11px] text-gray-400 font-bold">{rev.meta}</p>
                </div>
              </div>
              <div className="flex gap-0.5">
                {[...Array(rev.stars)].map((_, j) => <Star key={j} size={16} fill="currentColor" className="text-yellow-400" />)}
                {[...Array(5 - rev.stars)].map((_, j) => <Star key={j} size={16} fill="currentColor" className="text-gray-200" />)}
              </div>
              <p className="text-gray-600 font-medium leading-relaxed text-[15px]">{rev.text}</p>
            </div>
          ))}
        </div>

        {/* Load more */}
        {visibleBatch < 3 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisibleBatch((b) => b + 1)}
              className="bg-white border-2 border-black text-black font-black uppercase text-sm tracking-widest px-10 py-4 rounded-full hover:bg-black hover:text-white transition-all active:scale-95"
            >
              Mostra altre recensioni
            </button>
          </div>
        )}

        {/* Review form */}
        <div className="max-w-2xl mx-auto mt-16 bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm">
          {!formSubmitted ? (
            <>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-6">Lascia la tua recensione</h3>
              <form onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Nome *</label>
                  <input type="text" placeholder="Il tuo nome" required className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl p-4 text-base font-bold focus:bg-white focus:border-black outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Punteggio *</label>
                  <div className="flex gap-1">
                    {[5, 4, 3, 2, 1].map((v) => (
                      <label key={v} className="cursor-pointer text-3xl text-gray-300 hover:text-yellow-400 transition-colors has-[:checked]:text-yellow-400 has-[:checked]~label:text-yellow-400">
                        <input type="radio" name="cs-rating" value={v} required className="sr-only" />
                        <Star size={28} fill="currentColor" />
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">La tua recensione *</label>
                  <textarea placeholder="Raccontaci la tua esperienza con le VENOCARE..." required rows={4} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl p-4 text-base font-bold focus:bg-white focus:border-black outline-none transition-all resize-y" />
                </div>
                <button type="submit" className="bg-black text-white font-black uppercase text-sm tracking-widest px-10 py-4 rounded-full hover:bg-gray-800 transition-colors active:scale-95 w-full">
                  Invia recensione
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">&#9989;</div>
              <p className="text-lg font-bold text-gray-900 mb-2">Grazie per la tua recensione!</p>
              <p className="text-sm text-gray-500 font-medium">La tua recensione è in fase di revisione. Verrà pubblicata una volta verificata.</p>
            </div>
          )}
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
      <div className="grid grid-cols-3 gap-0 rounded-2xl md:rounded-[3rem] overflow-hidden border-2 md:border-4 border-black shadow-2xl">
        <div className="p-3 md:p-8 bg-gray-50 border-r-2 border-b-2 border-black"></div>
        <div className="p-3 md:p-8 bg-black text-white text-center font-black uppercase text-[11px] md:text-lg border-b-2 border-black">VENOCARE™</div>
        <div className="p-3 md:p-8 bg-gray-100 text-center font-black uppercase text-[11px] md:text-lg border-b-2 border-black opacity-50">Scarpe Comuni</div>
        {[
          ["Apertura 180° Easy-On", true, false],
          ["Toe-Box Extra Largo", true, false],
          ["Spacer Kit (Volume)", true, false],
          ["Tomaia Stretch", true, false],
          ["Seam-Free Zones", true, false],
          ["Garanzia 30gg", true, false]
        ].map((row, i) => (
          <React.Fragment key={i}>
            <div className="p-3 md:p-8 border-r-2 border-b-2 border-gray-100 font-bold text-xs md:text-lg flex items-center">{row[0]}</div>
            <div className="p-3 md:p-8 border-r-2 border-b-2 border-gray-100 flex items-center justify-center bg-green-50">
              <CheckCircle2 className="text-green-600" size={22} />
            </div>
            <div className="p-3 md:p-8 border-b-2 border-gray-100 flex items-center justify-center opacity-30">
              <XCircle className="text-red-500" size={22} />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  </section>
);


const StickyBar = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 1000);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="fixed bottom-6 left-4 right-4 z-50 md:hidden">
          <div className="bg-white border-2 border-black rounded-[2rem] p-5 shadow-2xl flex items-center gap-6">
            <div className="flex-1">
              <p className="font-black text-2xl tracking-tighter">€49,90</p>
              <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest">Sconto 50% Attivo</p>
            </div>
            <button onClick={() => document.getElementById('ordina')?.scrollIntoView({ behavior: 'smooth' })} className="flex-[2] bg-green-600 text-white font-black py-4 px-6 rounded-2xl uppercase text-sm shadow-lg shadow-green-100 active:scale-95 transition-transform">ORDINA ORA</button>
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
          © 2026 VENOCARE™ Italia. Tutti i diritti riservati. I risultati possono variare da persona a persona.
        </p>
      </div>
    </div>
  </footer>
);

// --- Componente Principale ---

export default function Page() {
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
      <Footer />
      <StickyBar />
    </div>
  );
}