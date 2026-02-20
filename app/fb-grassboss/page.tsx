'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Star, 
  Truck, 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp,
  Package,
  User,
  Phone,
  MapPin,
  Check,
  Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-2xl flex items-center gap-2">
      <Clock size={24} />
      <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
    </div>
  );
};

const TopBar = () => (
  <div className="bg-black text-white py-2 px-4 text-center font-bold text-lg uppercase tracking-wider">
    GRASSBOSS™ PRO Series — Super Bundle ULTRA
  </div>
);

const Hero = () => (
  <section className="py-8 px-4 bg-white border-b border-gray-200">
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl md:text-6xl font-black text-black mb-4 leading-tight">
        “CAMMINI e il prato si sistema: bordi perfetti senza piegarti.”
      </h1>
      <p className="text-xl md:text-2xl text-gray-700 mb-6 font-medium">
        Trimmer 3-in-1 con RUOTE PRO + Blade System PRO + 2 Batterie 21V: sembra un attrezzo da professionista (ma lo usa chiunque).
      </p>
      
      <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
        <div className="flex items-center gap-1 text-yellow-500">
          {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={24} />)}
        </div>
        <span className="text-xl font-bold text-black">4,7/5 — “Consigliato da migliaia di amanti del giardino”</span>
        <span className="bg-black text-white px-3 py-1 rounded text-sm font-bold uppercase">Best Seller</span>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="relative">
          <img
            src="/images/grassboss/main.webp"
            alt="GrassBoss Pro"
            className="w-full rounded-2xl shadow-2xl border-4 border-black"
          />
          <div className="absolute top-4 right-4 bg-red-600 text-white p-4 rounded-full font-black text-2xl shadow-lg transform rotate-12">
            -50%
          </div>
        </div>

        <div className="text-left space-y-4">
          <ul className="space-y-3">
            {[
              "Ruote PRO: taglio dritto “come una mini-tosaerba”",
              "3-in-1: Trimmer + Edger + Modalità con ruote",
              "Blade System PRO: erba/rovi/rametti con lame dedicate",
              "2 Batterie 21V: lavori senza pause",
              "Asta telescopica: schiena salva, postura dritta",
              "Struttura lega + ABS: fatta per durare"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-xl font-bold text-black">
                <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={28} />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-red-600 mt-6">
            <div className="text-gray-500 line-through text-2xl font-bold">Prezzo oggi: €XX,90</div>
            <div className="text-5xl font-black text-red-600 mb-2">€XX,90</div>
            <div className="text-xl font-black text-red-600 animate-pulse uppercase">
              🔥 SOLO OGGI -50% - Promo lotto in esaurimento
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <a href="#order" className="bg-green-600 hover:bg-green-700 text-white text-3xl font-black py-6 px-8 rounded-2xl text-center shadow-xl transform transition hover:scale-105 uppercase">
              ORDINA ORA – PAGHI ALLA CONSEGNA
            </a>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm font-bold text-gray-600">
              <span className="flex items-center gap-1"><Check size={16} /> PL: “Płatność przy odbiorze”</span>
              <span className="flex items-center gap-1"><Check size={16} /> HR: “Plaćanje pouzećem”</span>
              <span className="flex items-center gap-1"><Check size={16} /> CZ: “Dobírka”</span>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-gray-700 font-bold">
              <div className="flex items-center gap-2"><Truck size={24} /> Spedizione 24/48h</div>
              <div className="flex items-center gap-2"><ShieldCheck size={24} /> Garanzia 1 anno</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const DemoGrid = () => {
  const items = [
    { title: "RUOTE PRO", desc: "doppia modalit\u00e0 con ruote + guida stabile", expl: "Spiegazione: cammini e tagli dritto, meno tremolio, pi\u00f9 veloce.", img: "/images/grassboss/ruote.jpg" },
    { title: "3-IN-1", desc: "trimmer + edger + \u201Cmower assist\u201D", expl: "Spiegazione: un attrezzo solo, zero confusione, zero spese extra.", img: "/images/grassboss/utilizzi.webp" },
    { title: "BLADE SYSTEM PRO", desc: "nylon / metallo / disco", expl: "Spiegazione: scegli la lama giusta e finisci anche rovi e rametti.", img: "/images/grassboss/varie%20lame.webp" },
    { title: "CAMBIO LAMA RAPIDO", desc: "sistema rapido (no competenze)", expl: "Spiegazione: in pochi secondi passi da erba a rovi.", img: "/images/grassboss/cambio%20lama.png" },
    { title: "2 BATTERIE 21V", desc: "doppia batteria inclusa", expl: "Spiegazione: continui a lavorare senza \u201Cstop a met\u00e0 giardino\u201D.", img: "/images/grassboss/batteria%20e%20caricabatterie.png" },
    { title: "ALTEZZA TELESCOPICA", desc: "88\u2013119 cm regolabile", expl: "Spiegazione: smetti di piegarti, lavori pi\u00f9 rilassato.", img: "/images/grassboss/asta%20allungabile.webp" },
    { title: "STRUTTURA PRO", desc: "asta in lega + corpo ABS antiurto", expl: "Spiegazione: dura nel tempo, non sembra un giocattolo.", img: "/images/grassboss/weed-cutter-main-4.webp" },
    { title: "GUIDA \u201CBOOMER-PROOF\u201D", desc: "manuale + QR video", expl: "Spiegazione: monti e parti anche se \u00e8 il primo attrezzo elettrico.", img: "/images/grassboss/aggiusta%20direzione.jpg" },
  ];

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-center mb-12 uppercase">Perché è il numero 1</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow-md border border-gray-200 flex flex-col">
              <img
                src={item.img}
                alt={item.title}
                className="w-full aspect-square object-cover rounded-lg mb-4 border-2 border-black"
              />
              <h3 className="text-xl font-black mb-1">{item.title}</h3>
              <p className="text-sm font-bold text-gray-600 mb-2 uppercase">{item.desc}</p>
              <p className="text-base text-gray-800 font-medium">{item.expl}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProblemAgitation = () => (
  <section className="py-16 px-4 bg-white">
    <div className="max-w-3xl mx-auto">
      <h2 className="text-4xl md:text-6xl font-black text-black mb-8 text-center uppercase">Stanco di…</h2>
      <ul className="space-y-6 mb-10">
        {[
          "tagliare l’erba e ritrovarti bordi brutti e “spelacchiati”?",
          "piegarti 100 volte e finire con schiena e spalle a pezzi?",
          "comprare lame/ricambi ogni settimana perché “si rompono”?",
          "dover tirare fuori 3 attrezzi diversi per fare un lavoro decente?"
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-4 text-2xl font-bold text-gray-800">
            <AlertTriangle className="text-red-600 flex-shrink-0 mt-1" size={32} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="bg-red-50 p-8 rounded-2xl border-l-8 border-red-600">
        <p className="text-2xl font-black text-black italic">
          Non è colpa tua. Molti trimmer economici vibrano, hanno lame deboli e ti obbligano a “spingere” con la forza.
        </p>
      </div>
    </div>
  </section>
);

const Solution = () => (
  <section className="py-16 px-4 bg-black text-white">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase">LA SOLUZIONE (Il Prodotto)</h2>
      <p className="text-4xl md:text-6xl font-black text-green-500 mb-8 leading-tight">
        Ecco GRASSBOSS™ PRO Series – Super Bundle ULTRA
      </p>
      <p className="text-2xl md:text-3xl font-bold mb-12">
        Il trimmer “cammina con te”: ruote + 3-in-1 + Blade System PRO.
      </p>
      
      <div className="grid md:grid-cols-3 gap-8 text-left">
        {[
          "Finisci il giardino in metà tempo perché tagli dritto, senza rifare due volte.",
          "Lavori più rilassato perché regoli altezza e non ti pieghi.",
          "Passi da erba a rovi con la lama giusta, non con “speranza e preghiere”."
        ].map((text, i) => (
          <div key={i} className="bg-white/10 p-6 rounded-2xl border border-white/20">
            <div className="text-green-500 mb-4"><CheckCircle2 size={40} /></div>
            <p className="text-xl font-bold leading-snug">{text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section className="py-16 px-4 bg-white">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-black text-center mb-12 uppercase">COME FUNZIONA (3 step a prova di bambino)</h2>
      <div className="grid md:grid-cols-3 gap-12">
        {[
          { step: "1", title: "Scegli la lama", desc: "(erba / rovi / rametti) + metti la guardia", img: "/images/grassboss/varie%20lame.webp" },
          { step: "2", title: "Inserisci la batteria", desc: "e regola l'altezza", img: "/images/grassboss/batteria%20e%20caricabatterie.png" },
          { step: "3", title: "Cammina e rifinisci", desc: "prato, bordi, angoli difficili", img: "/images/grassboss/bordi.png" }
        ].map((item, i) => (
          <div key={i} className="text-center">
            <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-4xl font-black mx-auto mb-6">
              {item.step}
            </div>
            <h3 className="text-2xl font-black mb-2">{item.title}</h3>
            <p className="text-xl font-bold text-gray-600">{item.desc}</p>
            <img
              src={item.img}
              alt={item.title}
              className="w-full aspect-square object-cover rounded-2xl mt-6 border-4 border-gray-100"
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

const PriceAnchorComparison = () => (
  <section className="py-16 px-4 bg-gray-50">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-black text-center mb-12 uppercase">ANCORAGGIO DI PREZZO (Noi vs Loro)</h2>
      <div className="overflow-hidden rounded-3xl border-4 border-black shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black text-white">
              <th className="p-6 text-2xl font-black border-r border-white/20">CARATTERISTICA</th>
              <th className="p-6 text-2xl font-black border-r border-white/20">LORO</th>
              <th className="p-6 text-2xl font-black bg-green-600">NOI (GRASSBOSS)</th>
            </tr>
          </thead>
          <tbody className="bg-white text-xl font-bold">
            <tr className="border-b border-gray-200">
              <td className="p-6 border-r border-gray-200">Alimentazione</td>
              <td className="p-6 border-r border-gray-200 text-red-600">Benzina pesante, fumi, rumore</td>
              <td className="p-6 bg-green-50 text-green-700">Elettrico, leggero, 2 batterie incluse</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-6 border-r border-gray-200">Precisione</td>
              <td className="p-6 border-r border-gray-200 text-red-600">Lavoro impreciso, vibrazioni</td>
              <td className="p-6 bg-green-50 text-green-700">Ruote PRO + 3-in-1: taglio dritto</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-6 border-r border-gray-200">Durata</td>
              <td className="p-6 border-r border-gray-200 text-red-600">Lame cheap che si rompono</td>
              <td className="p-6 bg-green-50 text-green-700">Blade System PRO: acciaio e lega</td>
            </tr>
            <tr>
              <td className="p-6 border-r border-gray-200">Valore</td>
              <td className="p-6 border-r border-gray-200 text-red-600">Prezzo alto per poca qualità</td>
              <td className="p-6 bg-green-50 text-green-700">Sembra un attrezzo da 10x il prezzo</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

const BundleValue = () => (
  <section className="py-16 px-4 bg-white">
    <div className="max-w-4xl mx-auto">
      <div className="bg-black text-white p-10 rounded-3xl border-8 border-green-600 shadow-2xl">
        <h2 className="text-4xl md:text-6xl font-black text-center mb-10 uppercase">IL BUNDLE (Offerta irrinunciabile)</h2>
        <p className="text-2xl font-bold text-center mb-12 uppercase tracking-widest">Dentro il Super Bundle ULTRA trovi:</p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <ul className="space-y-4">
            {[
              { text: "Trimmer 3-in-1 con Ruote PRO", val: "Incluso" },
              { text: "2 Batterie 21V", val: "Valore €XX" },
              { text: "Caricatore rapido", val: "Valore €XX" },
              { text: "Blade System PRO: dischi + metallo + nylon + spazzola infestanti", val: "Valore €XX" },
              { text: "Valigetta rigida", val: "Valore €XX" },
              { text: "Occhiali + Guanti", val: "Valore €XX" },
              { text: "Bonus digitale", val: "Valore €XX" }
            ].map((item, i) => (
              <li key={i} className="flex justify-between items-start gap-4 text-xl font-bold border-b border-white/20 pb-2">
                <span className="flex items-center gap-2"><Package className="text-green-500 flex-shrink-0" size={24} /> {item.text}</span>
                <span className="text-green-500 flex-shrink-0">{item.val}</span>
              </li>
            ))}
          </ul>
          <div className="relative">
            <img
              src="/images/grassboss/valigetta.png"
              alt="Bundle Contents"
              className="w-full rounded-2xl border-4 border-white"
            />
            <div className="absolute -bottom-6 -right-6 bg-red-600 p-6 rounded-2xl text-center shadow-2xl transform -rotate-3">
              <div className="text-xl font-bold line-through opacity-70">Valore: €XXX</div>
              <div className="text-4xl font-black">OGGI €XX,90</div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-3xl font-black text-green-500 mb-6 uppercase">Totale valore: €XXX → Oggi lo prendi a €XX,90 (paghi alla consegna)</p>
          <a href="#order" className="inline-block bg-green-600 hover:bg-green-700 text-white text-4xl font-black py-8 px-12 rounded-2xl shadow-xl transform transition hover:scale-105 uppercase">
            PRENDI IL BUNDLE ORA
          </a>
        </div>
      </div>
    </div>
  </section>
);

const SpecsTable = () => (
  <section className="py-16 px-4 bg-gray-50">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-black text-center mb-12 uppercase">SPECIFICHE CHE CONTANO</h2>
      <div className="bg-white rounded-3xl border-4 border-black overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-6 text-2xl font-black border-b-4 border-black">Specifica</th>
              <th className="p-6 text-2xl font-black border-b-4 border-black">Cosa significa per te</th>
            </tr>
          </thead>
          <tbody className="text-xl font-bold">
            {[
              ["3-in-1 (trimmer/edger/ruote)", "fai tutto con un solo attrezzo"],
              ["Altezza regolabile 88–119 cm", "meno mal di schiena"],
              ["2 batterie 21V incluse", "continuità lavoro"],
              ["Autonomia per batteria 30–45 min (claim)", "giardino medio senza ansia"],
              ["Kit lame multi-materiale", "erba/rovi/rametti"],
              ["Struttura lega + corpo ABS", "più durata, meno rotture"],
              ["Cambio lama rapido (claim)", "da rifinitura a rovi in poco"],
              ["Setup guidato + QR video", "lo usi anche se sei “negato”"]
            ].map(([spec, mean], i) => (
              <tr key={i} className="border-b border-gray-200 last:border-0 hover:bg-gray-50 transition">
                <td className="p-6 border-r border-gray-200">{spec}</td>
                <td className="p-6">{mean}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

const Reviews = () => (
  <section className="py-16 px-4 bg-white">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-black text-center mb-12 uppercase">COSA DICONO I CLIENTI</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {[
          { name: "Jan K.", text: "Con le ruote faccio i bordi dritti, finalmente." },
          { name: "Marek P.", text: "Due batterie: non mi fermo mai a metà." },
          { name: "Ivana S.", text: "Montato in pochi minuti con il video." },
          { name: "Petr D.", text: "Il metallo dura più delle plastiche che avevo prima." }
        ].map((rev, i) => (
          <div key={i} className="bg-gray-50 p-8 rounded-3xl border-2 border-gray-200 relative">
            <div className="flex text-yellow-500 mb-4">
              {[...Array(5)].map((_, j) => <Star key={j} fill="currentColor" size={20} />)}
            </div>
            <p className="text-2xl font-bold text-black mb-4">“{rev.text}”</p>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-black">
                {rev.name[0]}
              </div>
              <span className="text-lg font-black">{rev.name} (Acquisto verificato)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: "Taglia anche rovi e rametti?", a: "Sì, con il disco e le lame metallo dedicate." },
    { q: "Quanto dura la batteria?", a: "Dipende dal lavoro: indicativamente 30–45 min a batteria (con 2 batterie lavori molto di più)." },
    { q: "È difficile da montare?", a: "No: 3 step + guida QR video." },
    { q: "Posso usarlo se ho mal di schiena?", a: "Sì: altezza regolabile + ruote = meno piegamenti." },
    { q: "È sicuro vicino a muri e pietre?", a: "Guardia parasassi + più controllo con ruote (e ti diamo kit sicurezza)." }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-12 uppercase">DOMANDE FREQUENTI</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border-2 border-black overflow-hidden">
              <button 
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full p-6 text-left flex justify-between items-center text-2xl font-black hover:bg-gray-50 transition"
              >
                <span>D: {faq.q}</span>
                {open === i ? <ChevronUp size={32} /> : <ChevronDown size={32} />}
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-xl font-bold text-gray-700 border-t border-gray-100">
                      R: {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const OrderForm = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => setStatus('success'), 1500);
  };

  if (status === 'success') {
    return (
      <section id="order" className="py-20 px-4 bg-white text-center">
        <div className="max-w-2xl mx-auto bg-green-50 p-12 rounded-3xl border-4 border-green-600">
          <CheckCircle2 className="text-green-600 mx-auto mb-6" size={80} />
          <h2 className="text-4xl font-black mb-4">ORDINE RICEVUTO!</h2>
          <p className="text-2xl font-bold">Ti contatteremo a breve per confermare la spedizione.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="order" className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <h2 className="text-4xl md:text-6xl font-black uppercase leading-tight">MODULO D’ORDINE (Frizione zero)</h2>
          <div className="flex items-center gap-6 bg-red-50 p-6 rounded-2xl border-2 border-red-600">
            <Timer />
            <div className="text-2xl font-black text-red-600 uppercase">“Blocco promo”</div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-2xl font-bold"><Truck className="text-green-600" /> Spedizione Gratuita</div>
            <div className="flex items-center gap-3 text-2xl font-bold"><ShieldCheck className="text-green-600" /> Paghi alla Consegna</div>
            <div className="flex items-center gap-3 text-2xl font-bold"><Star className="text-yellow-500" /> Garanzia Soddisfatti o Rimborsati</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-3xl border-4 border-black shadow-2xl space-y-6">
          <div>
            <label className="block text-xl font-black mb-2 uppercase flex items-center gap-2"><User size={20} /> Nome e Cognome</label>
            <input 
              required
              type="text" 
              placeholder="Inserisci il tuo nome completo"
              className="w-full p-5 text-xl font-bold rounded-xl border-2 border-gray-300 focus:border-black outline-none transition"
            />
          </div>
          <div>
            <label className="block text-xl font-black mb-2 uppercase flex items-center gap-2"><Phone size={20} /> Telefono</label>
            <input 
              required
              type="tel" 
              placeholder="Il tuo numero per la consegna"
              className="w-full p-5 text-xl font-bold rounded-xl border-2 border-gray-300 focus:border-black outline-none transition"
            />
          </div>
          <div>
            <label className="block text-xl font-black mb-2 uppercase flex items-center gap-2"><MapPin size={20} /> Indirizzo completo</label>
            <textarea 
              required
              rows={4}
              placeholder="Via, Civico, Città, CAP"
              className="w-full p-5 text-xl font-bold rounded-xl border-2 border-gray-300 focus:border-black outline-none transition"
            ></textarea>
          </div>
          <button 
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-green-600 hover:bg-green-700 text-white text-3xl font-black py-8 rounded-2xl shadow-xl transform transition hover:scale-105 uppercase disabled:opacity-50"
          >
            {status === 'submitting' ? 'INVIO IN CORSO...' : 'ORDINA ORA – PAGHI ALLA CONSEGNA'}
          </button>
          <p className="text-center text-gray-500 font-bold">🔒 I tuoi dati sono al sicuro</p>
        </form>
      </div>
    </section>
  );
};

const StickyBottomBar = () => (
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-black p-4 z-50 md:hidden flex items-center justify-between gap-4 shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
    <div className="flex flex-col">
      <span className="text-gray-500 line-through font-bold text-sm">€XX,90</span>
      <span className="text-3xl font-black text-red-600 leading-none">€XX,90</span>
    </div>
    <a href="#order" className="flex-1 bg-green-600 text-white text-2xl font-black py-4 rounded-xl text-center uppercase shadow-lg active:scale-95 transition">
      ORDINA
    </a>
  </div>
);

// --- Main Page ---

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-green-200 pb-24 md:pb-0">
      <TopBar />
      <Hero />
      <DemoGrid />
      <ProblemAgitation />
      <Solution />
      <HowItWorks />
      <PriceAnchorComparison />
      <BundleValue />
      <SpecsTable />
      <Reviews />
      <FAQ />
      <OrderForm />
      
      {/* Footer / Trust */}
      <footer className="py-12 px-4 bg-black text-white text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex flex-wrap justify-center gap-8 opacity-70">
            <div className="flex items-center gap-2"><Truck /> Spedizione 24/48h</div>
            <div className="flex items-center gap-2"><ShieldCheck /> Pagamento alla consegna</div>
            <div className="flex items-center gap-2"><Shield /> Garanzia 1 anno</div>
          </div>
          <p className="text-gray-500 font-bold">© 2026 GRASSBOSS™ PRO Series. Tutti i diritti riservati.</p>
          <div className="flex justify-center gap-4 text-xs font-bold text-gray-600">
            <span>PL: “Płatność przy odbiorze”</span>
            <span>HR: “Plaćanje pouzećem”</span>
            <span>CZ: “Dobírka”</span>
          </div>
        </div>
      </footer>

      <StickyBottomBar />
    </div>
  );
}
