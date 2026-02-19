
"use client";

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Truck, 
  Star, 
  CheckCircle2, 
  Phone, 
  RefreshCcw, 
  AlertCircle, 
  Sparkles, 
  Gift, 
  Clock, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';

// --- STYLES & CONFIG ---
const medicalBlue = '#0056b3';

// --- SUB-COMPONENTS (Internal for single-file requirement) ---

const HeroSection = ({ onOrderClick }: { onOrderClick: () => void }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const images = [
    '/images/hydrosonic/Main.png',
    '/images/hydrosonic/Total.png',
    '/images/hydrosonic/7.png'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="px-4 py-8 md:py-16 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-7xl font-black leading-tight text-black mb-4">
          Basta dolore gengivale e pulizia superficiale
        </h1>
        <p className="text-xl md:text-3xl font-bold text-gray-700">
          Pulizia professionale. Senza dentista. Senza dolore.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-orange-500">
          <div className="flex">
            {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={20} />)}
          </div>
          <span className="font-bold text-black text-sm md:text-base">⭐ 4.8/5 • +12.847 clienti soddisfatti • Best Seller 2025</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="relative aspect-square overflow-hidden rounded-2xl shadow-2xl border-4 border-gray-100">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt="HydroSonic Elite"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${idx === currentImg ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
          <div className="absolute top-4 left-4 bg-red-600 text-white font-black text-xl px-4 py-2 rounded-lg transform -rotate-3 animate-pulse z-10">
            -50% SOLO OGGI
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <ul className="space-y-3">
            {[
              "120 PSI stabilizzati → potenza reale costante",
              "1.600 impulsi/min → rimuove placca invisibile",
              "Serbatoio XL 750 ml → zero refill",
              "10 livelli pressione → personalizzato",
              "Modalità GUM-REPAIR™ → massaggio clinico",
              "10 beccucci professionali inclusi",
              "UV Sanitizer integrato",
              "Garanzia 3 anni + Paghi alla consegna"
            ].map((bullet, i) => (
              <li key={i} className="flex items-start gap-3 text-lg md:text-xl font-medium">
                <CheckCircle2 className="text-[#0056b3] mt-1 shrink-0" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-gray-300">
            <div className="flex flex-wrap items-baseline gap-4 mb-2">
              <span className="text-xl md:text-2xl line-through text-gray-400">Prezzo di listino: €199</span>
              <span className="text-4xl md:text-6xl font-black text-red-600">Oggi: €99</span>
            </div>
            <p className="text-red-600 font-bold text-lg md:text-xl uppercase animate-bounce">Offerta limitata alle ultime scorte!</p>
          </div>

          <button 
            onClick={onOrderClick}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-black text-xl md:text-3xl py-6 rounded-2xl shadow-xl transition-transform active:scale-95 flex flex-col items-center gap-1"
          >
            <span>ORDINA ORA – PAGHI ALLA CONSEGNA</span>
            <span className="text-sm md:text-lg font-bold opacity-90 italic">Spedizione Gratuita 24/48h</span>
          </button>

          <div className="grid grid-cols-3 gap-2 text-center text-[10px] md:text-sm font-bold text-green-700">
            <div className="flex flex-col items-center"><Truck size={24}/><span>Pagamento alla Consegna</span></div>
            <div className="flex flex-col items-center"><CheckCircle2 size={24}/><span>Spedizione 24/48h</span></div>
            <div className="flex flex-col items-center"><ShieldCheck size={24}/><span>Garanzia 3 anni</span></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const DemoGrid = () => {
  const cards = [
    { label: "GENGIVE SANE", title: "Stop sanguinamento in 14 giorni", tech: "Pressione clinicamente testata", desc: "Le gengive smettono di irritarsi grazie alla stimolazione mirata.", img: "/images/hydrosonic/donna.png" },
    { label: "PULIZIA PROFONDA", title: "Pulizia sotto gengiva 6 mm", tech: "Micro-impulsi ultrasonici", desc: "Arriva dove il filo interdentale e lo spazzolino si fermano.", img: "/images/hydrosonic/Getto.png" },
    { label: "POTENZA", title: "Tecnologia Dual Pump stabile", tech: "Flusso 120 PSI costante", desc: "Nessun calo di potenza durante l'uso, pulizia uniforme garantita.", img: "/images/hydrosonic/7.png" },
    { label: "CLINICO", title: "Modalità GUM-REPAIR clinica", tech: "Massaggio gengivale attivo", desc: "Accelera la guarigione dei tessuti e riduce le infiammazioni.", img: "/images/hydrosonic/uomo.png" },
    { label: "PROFESSIONALE", title: "Kit 10 beccucci professionali", tech: "Versatilità per tutta la famiglia", desc: "Punte specifiche per apparecchi, impianti e pulizia lingua.", img: "/images/hydrosonic/Beccucci.png" },
    { label: "CAPIENZA", title: "Serbatoio XL 750 ml", tech: "Autonomia oltre 90 secondi", desc: "Basta una sola ricarica per una pulizia completa e minuziosa.", img: "/images/hydrosonic/boccale.png" },
    { label: "IGIENE", title: "UV Sanitizer integrato", tech: "Elimina il 99% dei batteri", desc: "Disinfetta le punte dopo ogni uso tramite raggi UV automatici.", img: "/images/hydrosonic/sanitazer.png" },
    { label: "SERVIZIO", title: "Paghi alla consegna 24/48h", tech: "Spedizione sicura tracciata", desc: "Ricevi a casa e paghi solo quando hai il pacco in mano.", img: "/images/hydrosonic/smalto.png" }
  ];
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-black text-center mb-12 uppercase">Perché HydroSonic Elite™ è diverso?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="flex flex-col border-2 border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow">
            <div className="aspect-square relative overflow-hidden">
              <img src={card.img} alt={card.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 bg-[#0056b3] text-white text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest">
                {card.label}
              </div>
            </div>
            <div className="p-5 flex flex-col flex-grow bg-white">
              <h3 className="font-black text-xl leading-tight mb-2 uppercase">{card.title}</h3>
              <p className="text-[#0056b3] font-bold text-sm mb-3">{card.tech}</p>
              <p className="text-gray-600 text-sm font-medium">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const ProblemAgitation = () => (
  <section className="py-16 px-4 bg-gray-50 border-y border-gray-200">
    <div className="max-w-4xl mx-auto text-center">
      <div className="flex justify-center mb-6">
        <AlertCircle size={64} className="text-red-600 animate-pulse" />
      </div>
      <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight uppercase">
        Quante volte hai ignorato quel sangue <span className="text-red-600">rosso</span> nel lavandino?
      </h2>
      <div className="space-y-6 text-xl md:text-2xl font-medium text-gray-700 italic">
        <p>"È solo un po' di sensibilità", pensi ogni mattina.</p>
        <p>Ma mentre tu aspetti, la placca invisibile sta scavando <span className="text-black font-black underline">tunnel profondi</span> sotto le tue gengive, dove nessuno spazzolino può arrivare.</p>
        <p>Ti sei mai chiesto perché, nonostante lavi i denti 3 volte al giorno, l'alito non è mai fresco e il dentista trova sempre "qualcosa da fare"?</p>
      </div>
      <div className="mt-12 p-8 bg-white border-4 border-red-600 rounded-3xl shadow-2xl relative overflow-hidden">
        <p className="text-2xl font-black text-black leading-snug">
          Non è colpa tua. Ti hanno venduto spazzolini che puliscono solo la superficie, lasciando marcire i residui di cibo nei punti ciechi.
        </p>
        <p className="mt-4 text-xl font-bold text-red-600 uppercase">
          Smetti di rischiare interventi da migliaia di euro. C'è una via d'uscita professionale.
        </p>
      </div>
    </div>
  </section>
);

const OrderForm = () => {
  const [timeLeft, setTimeLeft] = useState(900);
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const rs = s % 60;
    return `${m}:${rs < 10 ? '0' : ''}${rs}`;
  };

  return (
    <section id="order-form" className="py-16 px-4 bg-gray-900 text-white scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase text-green-500">Ordina Oggi - Paghi alla Consegna</h2>
          <p className="text-xl font-bold opacity-90 italic">Nessuna carta di credito necessaria. Paghi solo quando ricevi il pacco.</p>
          <div className="mt-8 flex flex-col items-center">
            <div className="bg-red-600 px-8 py-4 rounded-2xl flex items-center gap-4 text-2xl md:text-3xl font-black animate-pulse border-4 border-red-400">
              <Clock size={40} />
              <span>SCADE TRA: {formatTime(timeLeft)}</span>
            </div>
            <p className="mt-4 text-red-400 font-black text-xl">⚠️ Solo 7 pezzi rimasti in magazzino!</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="bg-white text-black p-8 rounded-[2rem] shadow-2xl border-t-8 border-green-600">
            <form onSubmit={(e) => { e.preventDefault(); alert("Ordine ricevuto! Ti contatteremo a breve."); }} className="space-y-6">
              <div>
                <label className="block text-lg font-black uppercase mb-1">Nome e Cognome</label>
                <input type="text" required placeholder="Es: Mario Rossi" className="w-full p-4 border-4 border-gray-100 rounded-xl outline-none focus:border-[#0056b3]" />
              </div>
              <div>
                <label className="block text-lg font-black uppercase mb-1">Telefono (Cellulare)</label>
                <input type="tel" required placeholder="Es: 333 1234567" className="w-full p-4 border-4 border-gray-100 rounded-xl outline-none focus:border-[#0056b3]" />
              </div>
              <div>
                <label className="block text-lg font-black uppercase mb-1">Indirizzo Completo</label>
                <textarea required rows={3} placeholder="Via, Civico, Città, CAP" className="w-full p-4 border-4 border-gray-100 rounded-xl outline-none focus:border-[#0056b3]"></textarea>
              </div>
              <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-black text-2xl py-6 rounded-xl shadow-xl flex flex-col items-center">
                <span>ORDINA ORA</span>
                <span className="text-sm font-bold opacity-80 uppercase">Paghi al corriere</span>
              </button>
            </form>
          </div>
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-2xl border-2 border-[#0056b3]">
              <h3 className="text-xl font-black mb-2 uppercase flex items-center gap-2 text-[#0056b3]"><ShieldCheck /> La Tua Garanzia</h3>
              <p className="italic opacity-80">"Spediamo il prodotto, lo controlli e lo paghi solo se sei soddisfatto direttamente al corriere."</p>
            </div>
            <ul className="space-y-3 font-black text-lg">
              <li className="flex items-center gap-3 text-green-500"><CheckCircle2 /> Spedizione Espressa 24/48h</li>
              <li className="flex items-center gap-3 text-green-500"><CheckCircle2 /> Pagamento alla Consegna</li>
              <li className="flex items-center gap-3 text-green-500"><CheckCircle2 /> Assistenza Italiana</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const faqs = [
    { q: "Fa male?", a: "No, il livello 1 è di soli 20 PSI, ultra delicato anche per gengive ipersensibili." },
    { q: "È rumoroso?", a: "Solo 65 dB, meno di un normale spazzolino elettrico." },
    { q: "È difficile da usare?", a: "No. Solo 3 pulsanti intuitivi. Boomer-proof garantito." },
    { q: "È per impianti?", a: "Sì, punta dedicata inclusa." },
    { q: "Devo pagare prima?", a: "No, paghi alla consegna." }
  ];
  return (
    <section className="py-16 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-black text-center mb-10 uppercase">FAQ</h2>
      <div className="space-y-4">
        {faqs.map((f, i) => (
          <div key={i} className="border-2 border-gray-100 rounded-xl overflow-hidden">
            <button onClick={() => setOpenIdx(openIdx === i ? null : i)} className="w-full p-5 text-left flex justify-between font-black uppercase italic">
              {f.q} {openIdx === i ? <ChevronUp /> : <ChevronDown />}
            </button>
            {openIdx === i && <div className="p-5 bg-gray-50 border-t-2 border-gray-100">{f.a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
};

// --- MAIN PAGE COMPONENT ---

export default function LandingPage() {
  const scrollToOrder = () => {
    document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const [showSticky, setShowSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => setShowSticky(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black selection:bg-green-100">
      {/* Top Bar */}
      <div className="bg-[#0056b3] text-white py-3 text-center font-black uppercase text-sm md:text-base sticky top-0 z-50">
        HydroSonic Elite™ – ProCare Series™
      </div>

      <HeroSection onOrderClick={scrollToOrder} />

      {/* Trust Bar */}
      <div className="bg-[#0056b3] py-8 border-y-4 border-blue-400">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-white">
          <div className="flex flex-col items-center text-center gap-2">
            <Truck size={32} />
            <p className="font-black leading-tight text-xs md:text-base uppercase">Spedizione 24/48h</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <ShieldCheck size={32} />
            <p className="font-black leading-tight text-xs md:text-base uppercase">Paghi alla Consegna</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <RefreshCcw size={32} />
            <p className="font-black leading-tight text-xs md:text-base uppercase">Garanzia 3 Anni</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <Phone size={32} />
            <p className="font-black leading-tight text-xs md:text-base uppercase">Supporto 24/7</p>
          </div>
        </div>
      </div>

      <DemoGrid />
      <ProblemAgitation />

      {/* Solution Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase">La Soluzione Definitiva Senza Sforzo</h2>
          <p className="text-xl font-bold text-[#0056b3] italic">HydroSonic Elite™ porta il lavoro del dentista direttamente nel tuo bagno.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <img src="/images/hydrosonic/Total.png" alt="HydroSonic Elite" className="rounded-3xl shadow-2xl border-8 border-gray-100" />
          <ul className="space-y-4">
            {[
              "Rimuove il 99.9% della placca in soli 60 secondi",
              "Massaggia le gengive stimolando il microcircolo",
              "Indispensabile per chi ha Apparecchi o Impianti",
              "Elimina l'alito cattivo alla radice",
              "Facilissimo da usare: un solo tasto",
              "Risparmio garantito su sedute di igiene"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4 text-lg md:text-xl font-black bg-gray-50 p-4 rounded-xl border-l-8 border-[#0056b3]">
                <Sparkles className="text-[#0056b3] mt-1 shrink-0" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 px-4 bg-[#0056b3] text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-16 uppercase italic">Pulizia Clinica in 3 Step</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { n: "1", t: "Riempilo con acqua tiepida" },
              { n: "2", t: "Seleziona il livello adatto" },
              { n: "3", t: "Premi e lascia che faccia tutto lui" }
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-20 h-20 bg-white text-[#0056b3] rounded-full flex items-center justify-center text-4xl font-black mb-4">{s.n}</div>
                <h3 className="text-2xl font-black italic">{s.t}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-center mb-12 uppercase">HydroSonic Elite™ vs Altri</h2>
        <div className="overflow-hidden rounded-3xl shadow-2xl border-4 border-gray-100">
          <table className="w-full text-left font-black">
            <thead className="bg-gray-100 text-sm md:text-base">
              <tr>
                <th className="p-4 md:p-6">CARATTERISTICA</th>
                <th className="p-4 md:p-6 text-[#0056b3] bg-blue-50 text-center">NOI</th>
                <th className="p-4 md:p-6 text-gray-400 text-center">LORO</th>
              </tr>
            </thead>
            <tbody className="text-sm md:text-lg">
              <tr className="border-b"><td className="p-4">Potenza 120 PSI</td><td className="p-4 text-green-600 bg-blue-50/50 text-center">SÌ</td><td className="p-4 text-red-500 text-center">NO</td></tr>
              <tr className="border-b"><td className="p-4">Serbatoio XL 750ml</td><td className="p-4 text-green-600 bg-blue-50/50 text-center">SÌ</td><td className="p-4 text-red-500 text-center">NO</td></tr>
              <tr className="border-b"><td className="p-4">Sanificatore UV</td><td className="p-4 text-green-600 bg-blue-50/50 text-center">SÌ</td><td className="p-4 text-red-500 text-center">NO</td></tr>
              <tr className="bg-green-50 text-green-800"><td className="p-4">PAGHI ALLA CONSEGNA</td><td className="p-4 bg-blue-100 text-[#0056b3] text-center">SÌ</td><td className="p-4 text-red-500 text-center">NO</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Bundle Section */}
      <section className="py-16 px-4 bg-orange-50 border-y-4 border-orange-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-8 text-orange-800 uppercase italic">Super Bundle Omaggio</h2>
          <div className="bg-white p-8 rounded-[3rem] shadow-2xl relative overflow-hidden border-4 border-orange-300">
            <div className="absolute top-0 right-0 p-4 bg-orange-500 text-white font-black rotate-12">VALORE €101 GRATIS</div>
            <ul className="space-y-4 text-left font-black italic text-lg md:text-2xl mb-8">
              <li className="flex justify-between border-b pb-2"><span>Kit 10 Beccucci</span> <span className="text-red-600">GRATIS</span></li>
              <li className="flex justify-between border-b pb-2"><span>Custodia Travel</span> <span className="text-red-600">GRATIS</span></li>
              <li className="flex justify-between border-b pb-2"><span>Specchietto Dentale</span> <span className="text-red-600">GRATIS</span></li>
              <li className="flex justify-between"><span>Guida PDF</span> <span className="text-red-600">GRATIS</span></li>
            </ul>
            <div className="bg-orange-100 p-6 rounded-2xl">
              <p className="text-3xl md:text-5xl font-black text-[#0056b3]">TUTTO A SOLI €99</p>
              <button onClick={scrollToOrder} className="mt-4 bg-green-600 text-white font-black px-8 py-4 rounded-xl text-xl animate-pulse">APPROFITTA ORA</button>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-black text-center mb-12 uppercase">Recensioni Verificate</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { n: "Marco G. (Roma)", t: "Incredibile! Da quando lo uso le mie gengive non sanguinano più. Spedizione veloce e pagato al corriere." },
            { n: "Maria L. (Napoli)", t: "Perfetto per chi ha l'apparecchio come me. Pulisce dove lo spazzolino non arriva mai." },
            { n: "Roberto P. (Milano)", t: "Impianti delicati e getto perfetto. Costa la metà di quelli famosi ma è molto meglio." }
          ].map((r, i) => (
            <div key={i} className="bg-white border-4 border-gray-100 p-6 rounded-3xl shadow-lg">
              <div className="flex text-orange-500 mb-2">{[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}</div>
              <p className="font-black italic text-lg mb-2">"{r.t}"</p>
              <p className="text-sm font-bold text-gray-500">— {r.n}</p>
            </div>
          ))}
        </div>
      </section>

      <OrderForm />
      <FAQSection />

      {/* Footer */}
      <footer className="bg-gray-100 py-10 text-center text-sm font-bold text-gray-400 px-4">
        <p>HydroSonic Elite™ – ProCare Series™ © 2025</p>
        <p className="mt-2 opacity-50 uppercase tracking-widest text-[10px]">P.IVA: IT00000000000 | Supporto: support@procare.it</p>
      </footer>

      {/* Sticky Mobile Bar */}
      {showSticky && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] p-3 bg-white/95 border-t-2 border-gray-200">
          <button onClick={scrollToOrder} className="w-full bg-green-600 text-white font-black py-4 rounded-xl shadow-2xl flex flex-col items-center">
            <span className="text-xl uppercase">ORDINA ORA - €99</span>
            <span className="text-[10px] font-bold uppercase opacity-80 tracking-tighter">Paghi alla consegna • Spedizione 24/48h</span>
          </button>
        </div>
      )}
    </div>
  );
}
