'use client';

import React, { useState, useEffect } from 'react';
import { Check, X, Star, ChevronDown, ChevronUp, Clock, ShieldCheck, Truck, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * AURIXA ChefOne ULTRA - Landing Page (Next.js App Router Version)
 * Da inserire in: app/landing/page.tsx (o simile)
 */

export default function LandingPage() {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minuti

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

  const scrollToForm = () => {
    const element = document.getElementById('order-form');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans pb-24 selection:bg-emerald-100">
      {/* 1) TOP TRUST STRIP */}
      <div className="bg-neutral-100 py-2 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-center items-center gap-4 text-xs font-bold uppercase tracking-wider">
          <div className="flex items-center gap-2 text-emerald-600">
            <CreditCard size={16} />
            <span>Paghi alla consegna</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-600">
            <ShieldCheck size={16} />
            <span>Garanzia 1 anno</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-600">
            <Truck size={16} />
            <span>Spedizione rapida 24/48h</span>
          </div>
        </div>
      </div>

      {/* 2) HERO SECTION */}
      <section className="py-8 px-4 max-w-4xl mx-auto text-center">
        <div className="mb-2">
          <span className="bg-black text-white px-3 py-1 text-sm font-bold uppercase tracking-widest">
            Serie: X9 PRO Series
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black leading-tight mb-2 uppercase italic">
          AURIXA ChefOne ULTRA
        </h1>
        <p className="text-xl md:text-2xl font-bold text-emerald-600 mb-6">
          “Cucina da Chef. Tu premi Start.”
        </p>

        <div className="mb-8">
          <h2 className="text-2xl md:text-4xl font-black mb-4 leading-tight">
            Metti gli ingredienti. Premi START. Cena pronta.
          </h2>
          <p className="text-lg md:text-xl font-medium text-neutral-600">
            Display gigante + ricette guidate + bilancia integrata: anche se non sei pratico.
          </p>
        </div>

        {/* Hero Image Grid */}
        <div className="grid grid-cols-2 gap-2 mb-8">
          <img src="/images/chef-one/aurixachefone.webp" alt="AURIXA ChefOne" className="w-full aspect-square object-cover rounded-lg shadow-md" />
          <img src="/images/chef-one/int_master-en_bimby_tm7-launch_Story%20Photos_DFP_0327_16x9_edit_3x2.webp" alt="AURIXA in cucina" className="w-full aspect-square object-cover rounded-lg shadow-md" />
          <img src="/images/chef-one/themomix-tm7_delivery-scope_collection_01_3x2.webp" alt="AURIXA collezione" className="w-full aspect-square object-cover rounded-lg shadow-md" />
          <img src="/images/chef-one/themomix-tm7_delivery-scope_collection_02_3x2.webp" alt="AURIXA accessori" className="w-full aspect-square object-cover rounded-lg shadow-md" />
        </div>

        {/* Box OFFERTA */}
        <div className="bg-neutral-50 border-4 border-red-600 p-6 rounded-2xl mb-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-red-600 text-white px-4 py-1 font-black text-sm uppercase transform rotate-0">
            OFFERTA LANCIO — Solo per poche unità
          </div>
          <div className="mt-4 flex flex-col items-center">
            <div className="text-neutral-400 line-through text-2xl font-bold">€ 799</div>
            <div className="text-6xl md:text-7xl font-black text-black my-2">€ 399</div>
            <div className="bg-red-600 text-white px-6 py-2 rounded-full font-black text-2xl animate-pulse">
              SCONTO: -50%
            </div>
          </div>
          <button 
            onClick={scrollToForm}
            className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600 text-white font-black py-5 rounded-xl text-xl md:text-2xl shadow-lg transition-transform active:scale-95 uppercase"
          >
            ORDINA ORA — PAGHI ALLA CONSEGNA
          </button>
        </div>

        {/* Hero Bullets */}
        <div className="text-left space-y-4 max-w-2xl mx-auto">
          {[
            "200°C reali: rosoli carne e verdure, non “lessi tristi”.",
            "Schermo grande con ricette guidate: ti dice cosa fare, quando e quanto.",
            "Bilancia integrata 5 kg / 1 g: dosi perfette, zero sprechi.",
            "Ciotola XL da 4,5 L (3 Litri effettivi): porzioni famiglia in una volta.",
            "Rotazione inversa anti-sfaldamento: spezzatini, ragù e zuppe perfetti.",
            "Coperchio CrispLid incluso: gratina, asciuga e dona croccantezza senza forno.",
            "Sonda temperatura wireless: risultati da chef, senza indovinare.",
            "Pulizia automatica con 1 tasto: pre-clean + deep clean antigrasso.",
            "Multi-lingua offline: funziona ovunque, anche senza Wi-Fi.",
            "Paghi alla consegna: zero rischi."
          ].map((text, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="bg-emerald-100 p-1 rounded-full mt-1">
                <Check className="text-emerald-600" size={18} />
              </div>
              <p className="text-lg font-bold">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3) SEZIONE “TI SUONA FAMILIARE?” */}
      <section className="py-12 px-4 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black mb-8 text-center uppercase italic">
            TI SUONA FAMILIARE?
          </h2>
          <div className="space-y-6 mb-10">
            {[
              "Torni tardi e finisci per ordinare cibo “a caso” (e spendere troppo)?",
              "Inizi a cucinare e ti ritrovi con pentole ovunque e cucina da pulire?",
              "Ti manca sempre “quel gusto” perché i robot spesso non rosolano davvero?",
              "Vorresti mangiare meglio, ma senza diventare schiavo della cucina?"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                <X className="text-red-500 shrink-0" size={24} />
                <p className="text-xl font-medium">{text}</p>
              </div>
            ))}
          </div>
          <div className="bg-emerald-600 p-6 rounded-2xl text-center">
            <p className="text-2xl md:text-3xl font-black uppercase">
              Non è colpa tua: è che ti hanno venduto robot “mezzi”. Qui hai il definitivo.
            </p>
          </div>
        </div>
      </section>

      {/* 4) SEZIONE DEMO GRID */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black mb-12 text-center uppercase">
          TECNOLOGIA ULTRA
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "modalit\u00e0 rosolatura", title: "Rosolatura professionale", tech: "37\u2013200\u00b0C", desc: "Rosolatura vera, non bollitura.", img: "/images/chef-one/themomix-tm7_delivery-scope_collection_01_3x2%20(1).webp" },
            { label: "UI maxi", title: "Cucina guidata passo-passo", tech: "Navigatore integrato", desc: "Impossibile sbagliare.", img: "/images/chef-one/passo-passo.webp" },
            { label: "step 1 g", title: "Bilancia integrata al grammo", tech: "Portata 5 kg", desc: "Precisione assoluta.", img: "/images/chef-one/bilancia.webp" },
            { label: "Capienza", title: "Ciotola XL", tech: "4,5 L (3 Litri effettivi)", desc: "Per tutta la famiglia.", img: "/images/chef-one/ciotolaxl.webp" },
            { label: "Rotazione inversa", title: "Anti-sfaldamento", tech: "Rotazione controllata", desc: "Protegge gli ingredienti delicati.", img: "/images/chef-one/themomix-tm7_delivery-scope_collection_01_3x2%20(2).webp" },
            { label: "gratinatura", title: "Coperchio CrispLid", tech: "Finish croccante", desc: "Effetto forno immediato.", img: "/images/chef-one/coperchioi.webp" },
            { label: "Avviso perfetto", title: "Sonda wireless", tech: "Controllo temperatura", desc: "Cotture al cuore millimetriche.", img: "/images/chef-one/sondawireless.webp" },
            { label: "Igiene", title: "Pulizia automatica", tech: "Pre-clean + Deep clean", desc: "Si pulisce da solo con un tasto.", img: "/images/chef-one/pulizia.webp" }
          ].map((item, i) => (
            <div key={i} className="border-2 border-neutral-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img src={item.img} alt={item.title} className="w-full aspect-square object-cover" />
              <div className="p-5">
                <span className="bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest">
                  {item.label}
                </span>
                <h3 className="text-xl font-black mt-2 mb-1">{item.title}</h3>
                <p className="text-emerald-600 font-black text-sm mb-2">{item.tech}</p>
                <p className="text-neutral-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5) COME FUNZIONA */}
      <section className="py-16 px-4 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black mb-12 text-center uppercase">
            COME FUNZIONA (3 STEP)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { num: "1", title: "Metti gli ingredienti", desc: "Lui pesa, mescola e ti guida." },
              { num: "2", title: "Premi START", desc: "Temperatura e tempi automatici." },
              { num: "3", title: "Servi e sorridi", desc: "Pulizia automatica: fine." }
            ].map((step, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-lg border-b-8 border-emerald-500 text-center">
                <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center text-3xl font-black mx-auto mb-6">
                  {step.num}
                </div>
                <h3 className="text-2xl font-black mb-4">{step.title}</h3>
                <p className="text-lg text-neutral-600">{step.desc}</p>
              </div>
            ))}
          </div>
          <button 
            onClick={scrollToForm}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-6 rounded-2xl text-2xl shadow-xl transition-transform active:scale-95 uppercase"
          >
            SÌ, LO VOGLIO — PAGHI ALLA CONSEGNA
          </button>
        </div>
      </section>

      {/* 6) NOI VS LORO */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black mb-12 text-center uppercase italic">
          NOI VS LORO
        </h2>
        
        {/* Mobile View (Stacked Cards) */}
        <div className="md:hidden space-y-4">
          {[
            { label: "Rosolatura reale", noi: "200°C + CrispLid", loro: "Spesso limitato / accessori extra" },
            { label: "Cucina guidata", noi: "UI maxi + ricette passo-passo", loro: "Ok, ma prezzo elevato" },
            { label: "Bilancia integrata", noi: "5 kg / 1 g", loro: "Sì" },
            { label: "Famiglia", noi: "Ciotola XL (3L effettivi)", loro: "Spesso più piccola" },
            { label: "Pulizia", noi: "Automatica (Deep clean)", loro: "Variabile" },
            { label: "Pagamento", noi: "PAGHI ALLA CONSEGNA", loro: "Di solito anticipato", highlight: true },
            { label: "Prezzo", noi: "€ 399 (Oggi)", loro: "€ 1.300+ (Tipico premium)", price: true }
          ].map((row, i) => (
            <div key={i} className="border-2 border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-neutral-900 text-white p-3 text-center font-black uppercase text-sm tracking-widest">
                {row.label}
              </div>
              <div className="grid grid-cols-2 divide-x-2 divide-neutral-100">
                <div className={`p-4 text-center ${row.price || row.highlight ? 'bg-emerald-50' : ''}`}>
                  <span className="block text-[10px] uppercase font-black text-neutral-400 mb-1 tracking-tighter">AURIXA</span>
                  <span className="text-emerald-600 font-black text-sm leading-tight block">{row.noi}</span>
                </div>
                <div className={`p-4 text-center ${row.price ? 'bg-red-50' : ''}`}>
                  <span className="block text-[10px] uppercase font-black text-neutral-400 mb-1 tracking-tighter">ALTRI</span>
                  <span className={`${row.price ? 'text-red-600' : 'text-neutral-500'} font-bold text-sm leading-tight block`}>{row.loro}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View (Table) */}
        <div className="hidden md:block overflow-hidden rounded-2xl border-2 border-neutral-200 shadow-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-900 text-white">
                <th className="p-4 font-black uppercase text-sm">Caratteristica</th>
                <th className="p-4 font-black uppercase text-sm text-center">Noi</th>
                <th className="p-4 font-black uppercase text-sm text-center">Loro</th>
              </tr>
            </thead>
            <tbody className="text-lg">
              {[
                { label: "Rosolatura reale", noi: "200°C + CrispLid", loro: "Spesso limitato / accessori extra" },
                { label: "Cucina guidata", noi: "UI maxi + ricette passo-passo", loro: "Ok, ma prezzo elevato" },
                { label: "Bilancia integrata", noi: "5 kg / 1 g", loro: "Sì" },
                { label: "Famiglia", noi: "Ciotola XL (3L effettivi)", loro: "Spesso più piccola" },
                { label: "Pulizia", noi: "Automatica (Deep clean)", loro: "Variabile" },
                { label: "Pagamento", noi: "PAGHI ALLA CONSEGNA", loro: "Di solito anticipato", highlight: true },
                { label: "Prezzo", noi: "€ 399 (Oggi)", loro: "€ 1.300+ (Tipico premium)", price: true }
              ].map((row, i) => (
                <tr key={i} className="border-b border-neutral-100">
                  <td className="p-4 font-bold bg-neutral-50">{row.label}</td>
                  <td className={`p-4 text-center font-black ${row.price || row.highlight ? 'text-emerald-600 bg-emerald-50' : 'text-emerald-600'}`}>
                    {row.noi}
                  </td>
                  <td className={`p-4 text-center font-medium ${row.price ? 'text-red-600 bg-red-50' : 'text-neutral-400'}`}>
                    {row.loro}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 7) BUNDLE + OMAGGI */}
      <section className="py-16 px-4 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black mb-12 text-center uppercase">
            BUNDLE + OMAGGI
          </h2>
          <div className="bg-white text-black p-8 rounded-3xl shadow-2xl">
            <div className="space-y-6">
              {[
                { title: "CrispLid 200°C", val: "€79" },
                { title: "Seconda ciotola inox + coperchio", val: "€69" },
                { title: "Set stampi silicone + spatola pro", val: "€29" },
                { title: "Bonus digitale: Meal-Prep 30 giorni + Ricettario completo", val: "€49" }
              ].map((gift, i) => (
                <div key={i} className="flex justify-between items-center border-b border-neutral-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-500 text-white p-1 rounded-full">
                      <Check size={16} />
                    </div>
                    <span className="text-xl font-bold">{gift.title}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-neutral-400 line-through block text-sm">Valore {gift.val}</span>
                    <span className="text-emerald-600 font-black text-xl">GRATIS</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 pt-6 border-t-4 border-emerald-500 text-center">
              <p className="text-2xl font-bold mb-2">Totale valore omaggi: €226</p>
              <p className="text-4xl font-black text-emerald-600 uppercase">→ INCLUSI OGGI</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8) SPEC CHE CONTANO */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black mb-12 text-center uppercase italic">
          SPEC CHE CONTANO
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {[
            ["Temperatura", "37–200°C (ULTRA)"],
            ["Ciotola", "Inox 4,5 L (3 Litri effettivi) + seconda ciotola inclusa"],
            ["Bilancia", "Integrata 5 kg / 1 g"],
            ["Schermo", "Touch grande (UI maxi)"],
            ["Programmi", "Guidati + manuale + avanzati (slow cook / sous-vide / fermentazione)"],
            ["Reverse", "Sì (anti-sfaldamento)"],
            ["Pulizia", "Pre-clean + Deep clean"],
            ["Lingue", "Multi-lingua + pack offline"],
            ["Sicurezza", "Blocco coperchio + child lock + anti-splash"],
            ["Extra", "Coperchio CrispLid + sonda wireless"]
          ].map(([label, val], i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:justify-between p-4 border-b border-neutral-100 gap-2">
              <span className="font-black uppercase text-neutral-500 text-sm">{label}</span>
              <span className="font-bold text-lg">{val}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 9) RECENSIONI */}
      <section className="py-16 px-4 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black mb-12 text-center uppercase">
            COSA DICONO I CLIENTI
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Katarina M.", text: "“Pensavo fosse complicato… invece è come un navigatore.”" },
              { name: "Piotr S.", text: "“Finalmente rosola davvero.”" },
              { name: "Éva K.", text: "“Ciotola grande = meal prep fatto.”" }
            ].map((rev, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-md">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                </div>
                <p className="text-lg font-medium mb-4 italic">{rev.text}</p>
                <p className="font-black uppercase text-sm">{rev.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10) FAQ */}
      <section className="py-16 px-4 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black mb-12 text-center uppercase italic">
          DOMANDE FREQUENTI
        </h2>
        <div className="space-y-4">
          {[
            ["Serve per forza il Wi-Fi?", "No. Hai ricette incluse e pack offline."],
            ["È difficile da usare?", "No: modalità guidata e step chiari."],
            ["Rosola davvero?", "Sì: modalità rosolatura professionale fino a 200°C."],
            ["Quanto è grande la ciotola?", "4,5 L (3 Litri effettivi) + seconda inclusa."],
            ["Si lava facilmente?", "Sì: pulizia automatica con un tasto."],
            ["Come pago?", "Pagamento alla consegna."],
            ["Garanzia?", "1 anno di garanzia ufficiale."]
          ].map(([q, a], i) => (
            <FaqItem key={i} question={q} answer={a} />
          ))}
        </div>
      </section>

      {/* 11) ORDER FORM */}
      <section id="order-form" className="py-16 px-4 bg-emerald-50 border-t-8 border-emerald-500">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-2xl border-2 border-emerald-200">
          <h2 className="text-3xl md:text-4xl font-black mb-2 text-center uppercase">
            Ordina in 30 secondi (3 campi)
          </h2>
          
          <div className="flex items-center justify-center gap-2 text-red-600 font-black text-xl mb-8 animate-pulse">
            <Clock size={24} />
            <span>OFFERTA SCADE TRA: {formatTime(timeLeft)}</span>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-black uppercase mb-2 text-neutral-500">Nome e Cognome</label>
              <input 
                type="text" 
                placeholder="Es: Mario Rossi"
                className="w-full p-4 border-2 border-neutral-200 rounded-xl text-lg focus:border-emerald-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-black uppercase mb-2 text-neutral-500">Telefono</label>
              <input 
                type="tel" 
                placeholder="Es: 333 1234567"
                className="w-full p-4 border-2 border-neutral-200 rounded-xl text-lg focus:border-emerald-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-black uppercase mb-2 text-neutral-500">Indirizzo completo</label>
              <textarea 
                placeholder="Via, Civico, Città, CAP"
                rows={3}
                className="w-full p-4 border-2 border-neutral-200 rounded-xl text-lg focus:border-emerald-500 outline-none transition-colors"
              ></textarea>
            </div>
            
            <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-6 rounded-2xl text-2xl shadow-xl transition-transform active:scale-95 uppercase mt-4">
              CONFERMA ORDINE — PAGHI ALLA CONSEGNA
            </button>
            
            <div className="flex items-center justify-center gap-2 text-emerald-600 font-bold mt-4">
              <ShieldCheck size={20} />
              <span>Nessuna carta. Paghi solo alla consegna.</span>
            </div>
          </form>
        </div>
      </section>

      {/* 12) STICKY BAR MOBILE */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-3 z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
        <div className="max-w-xl mx-auto">
          <button 
            onClick={scrollToForm}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 rounded-xl text-lg shadow-lg flex items-center justify-center gap-3 uppercase"
          >
            <span>ORDINA ORA — PAGHI ALLA CONSEGNA</span>
          </button>
        </div>
      </div>
    </div>
  );
}

interface FaqItemProps {
  question: string;
  answer: string;
  key?: React.Key;
}

function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-2 border-neutral-100 rounded-xl overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 flex justify-between items-center text-left bg-white hover:bg-neutral-50 transition-colors"
      >
        <span className="text-xl font-black">{question}</span>
        {isOpen ? <ChevronUp className="text-neutral-400" /> : <ChevronDown className="text-neutral-400" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 bg-neutral-50 border-t border-neutral-100 text-lg font-medium text-neutral-600">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
