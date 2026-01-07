
'use client';

import React, { useState, useEffect } from 'react';

// --- COMPONENTS ---

const ScarcityBanner = () => {
  const [items, setItems] = useState(14);
  useEffect(() => {
    const timer = setInterval(() => {
      setItems(prev => (prev > 3 ? prev - 1 : prev));
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-red-700 text-white py-3 px-6 text-center text-sm md:text-lg font-black uppercase tracking-tighter flex items-center justify-center gap-4 sticky top-0 z-[60]">
      <span className="animate-ping w-2 h-2 md:w-3 md:h-3 bg-white rounded-full"></span>
      <span>URGENTE: SOLO {items} CONFEZIONI DISPONIBILI - 122 PERSONE STANNO GUARDANDO ORA!</span>
      <span className="hidden lg:inline bg-white text-red-700 px-3 py-1 rounded-md text-sm">OFFERTA 2X1 ATTIVA</span>
    </div>
  );
};

const Header = () => (
  <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
        <span className="text-white font-bold text-xl italic">B</span>
      </div>
      <span className="text-2xl font-black text-blue-900 tracking-tighter uppercase">BLUBULL</span>
    </div>
    <div className="hidden md:flex space-x-6 text-sm font-semibold text-gray-600 uppercase tracking-widest">
      <span className="text-blue-600">Offerta 2x1</span>
      <span>Spedizione Gratuita</span>
    </div>
  </header>
);

const Hero = ({ onCTA }: { onCTA: () => void }) => (
  <section className="relative pt-6 pb-16 px-6 bg-white overflow-hidden">
    <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
      <div className="bg-yellow-400 text-black px-4 py-1 rounded-md font-black text-sm mb-4 animate-bounce">
        SCOPERTA SCIENTIFICA 2024 - ORA DISPONIBILE SENZA RICETTA
      </div>
      <h1 className="text-4xl md:text-7xl font-black text-blue-900 leading-none mb-6 max-w-5xl tracking-tighter uppercase">
        DIVENTA UN <span className="text-red-600 underline">TORO</span> IN 15 MINUTI: POTENZA ESTREMA E DURATA RECORD
      </h1>
      <p className="text-xl md:text-2xl text-gray-800 mb-10 max-w-3xl font-extrabold uppercase italic">
        "La pillola blu è ufficialmente superata. Scopri la formula che sta terrorizzando le case farmaceutiche."
      </p>
      
      <div className="flex flex-col md:flex-row items-center gap-10 w-full mb-12">
        <div className="md:w-1/2 relative">
           <img
            src="/images/blubull/offert.png"
            alt="Blubull Power"
            className="w-full max-w-md mx-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]"
          />
          <div className="absolute top-0 right-0 bg-red-600 text-white w-28 h-28 rounded-full flex flex-col items-center justify-center font-black rotate-12 shadow-2xl border-4 border-white">
            <span className="text-sm">OMAGGIO</span>
            <span className="text-3xl">1+1</span>
          </div>
        </div>
        
        <div className="md:w-1/2 text-left bg-blue-900 text-white p-6 md:p-10 rounded-[40px] shadow-2xl relative overflow-hidden">
          <h3 className="text-2xl md:text-3xl font-black mb-6 border-b-2 border-red-500 pb-2 inline-block">EFFETTI IMMEDIATI:</h3>
          <ul className="space-y-4 mb-10 text-base md:text-lg font-bold">
            <li className="flex items-center gap-3"><span className="bg-red-500 p-1 rounded-full text-white text-[10px]">★</span>Erezione Marmorea al primo comando</li>
            <li className="flex items-center gap-3"><span className="bg-red-500 p-1 rounded-full text-white text-[10px]">★</span>Ritardo dell'eiaculazione fino a 50 minuti</li>
            <li className="flex items-center gap-3"><span className="bg-red-500 p-1 rounded-full text-white text-[10px]">★</span>Aumento volumetrico visibile istantaneo</li>
            <li className="flex items-center gap-3"><span className="bg-red-500 p-1 rounded-full text-white text-[10px]">★</span>Recupero pronto per il secondo round in 3 min</li>
          </ul>
          
          <div className="mb-8">
            <p className="text-blue-300 line-through text-xl">Valore Reale: 119,98€</p>
            <p className="text-6xl font-black text-white">59,99€</p>
            <p className="text-yellow-400 font-black text-xl">OFFERTA 2X1 ATTIVA SOLO ORA!</p>
          </div>

          <button 
            onClick={onCTA}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-5 rounded-2xl text-xl md:text-2xl shadow-[0_0_30px_rgba(220,38,38,0.5)] transition transform active:scale-95 animate-pulse uppercase"
          >
            ACCEDI ALL'OFFERTA RISERVATA
          </button>
        </div>
      </div>
    </div>
  </section>
);

const FacebookComments = () => {
  const [visibleCount, setVisibleCount] = useState(6);
  const totalCommentsCount = 24531;

  const allComments = [
    { name: "Marco Pozzi", avatar: "https://picsum.photos/100/100?random=201", comment: "Pazzesco. Ho 58 anni e pensavo che i miei giorni di gloria fossero finiti. Dopo la prima assunzione di Blubull sono diventato un marmo. Mia moglie ancora mi ringrazia! 🔥🔥🔥", likes: 12432, time: "4 min", reactions: ['like', 'love', 'wow'] },
    { name: "Luca Bianchi", avatar: "https://picsum.photos/100/100?random=202", comment: "Arrivato ieri in pacco anonimo. Ragazzi, non scherzano. È una bomba atomica. Sono durato quasi un'ora senza fermarmi. Prendetelo finché c'è l'offerta 2x1!", likes: 8541, time: "12 min", reactions: ['like', 'wow'] },
    { name: "Alessandro Neri", avatar: "https://picsum.photos/100/100?random=203", comment: "Meglio della roba chimica della farmacia. Nessun mal di testa, solo pura potenza. Finalmente un prodotto che mantiene quello che promette. Blubull numero 1 assoluto.", likes: 15233, time: "24 min", reactions: ['like', 'love'] },
    { name: "Giovanni Verdi", avatar: "https://picsum.photos/100/100?random=204", comment: "Ero scettico ma è un miracolo scientifico. Una durezza che non provavo da quando avevo 20 anni. Spaventoso. Ho dovuto chiedere scusa alla vicina per il rumore ahahah!", likes: 9211, time: "1 ora", reactions: ['like', 'wow', 'care'] },
    { name: "Roberto Gialli", avatar: "https://picsum.photos/100/100?random=205", comment: "Chi dice che non funziona è perché non l'ha provato. Io ho appena ordinato altre 6 scatole. Non voglio più restare senza.", likes: 7420, time: "3 ore", reactions: ['like'] },
    { name: "Massimiliano D.", avatar: "https://picsum.photos/100/100?random=206", comment: "Dico solo una cosa: mia moglie ha dovuto chiedermi di smettere perché era sfinita. Blubull ti trasforma in una macchina da guerra. Leggendario.", likes: 18312, time: "4 ore", reactions: ['like', 'love', 'wow'] },
    { name: "Francesco P.", avatar: "https://picsum.photos/100/100?random=207", comment: "A 65 anni ero ormai rassegnato. Con questo protocollo sono tornato un ragazzino di 18 anni. Erezione istantanea, durissima e che non scende mai.", likes: 11560, time: "5 ore", reactions: ['like', 'care'] },
    { name: "Pietro S.", avatar: "https://picsum.photos/100/100?random=213", comment: "Addio ansia da prestazione. Adesso so che quando mi spoglio, lei rimarrà a bocca aperta. Una sicurezza che non ha prezzo.", likes: 19334, time: "2 giorni", reactions: ['like', 'love', 'wow'] },
    { name: "Renato B.", avatar: "https://picsum.photos/100/100?random=219", comment: "Mia moglie è tornata a sorridere dopo anni di musi lunghi. Grazie Blubull, avete salvato il mio rapporto.", likes: 21432, time: "5 giorni", reactions: ['like', 'love', 'care'] }
  ];

  const getReactionIcons = (reactions: string[]) => (
    <div className="flex -space-x-1">
      {reactions.includes('like') && <div className="bg-blue-500 rounded-full p-0.5 border border-white z-30"><svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a2 2 0 00-.8 1.6V10.333z" /></svg></div>}
      {reactions.includes('love') && <div className="bg-red-500 rounded-full p-0.5 border border-white z-20"><svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" /></svg></div>}
      {reactions.includes('wow') && <div className="bg-yellow-500 rounded-full p-0.5 border border-white z-10 text-[8px] flex items-center justify-center">😮</div>}
    </div>
  );

  return (
    <section className="py-12 bg-gray-100 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-2xl border border-gray-200">
        <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-6">
          <span className="font-bold text-gray-900 text-lg">{totalCommentsCount.toLocaleString()} Commenti</span>
          <span className="text-blue-600 text-sm font-semibold cursor-pointer">Più pertinenti ▼</span>
        </div>
        <div className="space-y-8">
          {allComments.slice(0, visibleCount).map((c, i) => (
            <div key={i} className="flex gap-3">
              <img src={c.avatar} alt={c.name} className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover" />
              <div className="flex-grow">
                <div className="bg-[#f0f2f5] p-4 rounded-[20px] relative">
                  <p className="font-bold text-[13px] text-blue-900">{c.name}</p>
                  <p className="text-[14px] text-gray-900 mt-1">{c.comment}</p>
                  <div className="absolute -bottom-4 right-2 bg-white flex items-center gap-1.5 px-2 py-1 rounded-full shadow-md border border-gray-100">
                    {getReactionIcons(c.reactions)}
                    <span className="text-[12px] text-gray-600 font-bold">{c.likes.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex gap-4 mt-2 ml-4 text-[12px] font-bold text-gray-600">
                  <span className="hover:underline cursor-pointer">Mi piace</span>
                  <span className="hover:underline cursor-pointer">Rispondi</span>
                  <span className="font-normal text-gray-500">{c.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => setVisibleCount(allComments.length)} className="w-full mt-8 text-blue-600 font-black text-base hover:underline bg-gray-50 py-4 rounded-xl border-2 border-dashed border-blue-200 uppercase">
          Mostra altri { (totalCommentsCount - visibleCount).toLocaleString() } commenti...
        </button>
      </div>
    </section>
  );
};

const OrderForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 px-6 bg-blue-900 text-white rounded-[40px] shadow-2xl border-4 border-yellow-400">
        <h2 className="text-5xl font-black mb-6 uppercase">ORDINE BLOCCATO!</h2>
        <p className="text-2xl font-bold mb-8">Abbiamo riservato le tue 2 confezioni di Blubull. Un nostro esperto ti contatterà tra pochissimi minuti.</p>
        <div className="bg-red-600 p-4 rounded-xl inline-block animate-bounce font-black uppercase">Tieniti pronto a cambiare vita!</div>
      </div>
    );
  }

  return (
    <div id="order-form" className="max-w-5xl mx-auto py-12 md:py-20 px-4">
      <div className="bg-white rounded-[50px] shadow-2xl overflow-hidden flex flex-col md:flex-row border-[8px] md:border-[10px] border-blue-900">
        <div className="md:w-2/5 bg-blue-900 text-white p-8 md:p-10 flex flex-col justify-center">
          <div className="bg-red-600 text-center py-2 mb-8 font-black uppercase text-sm skew-x-[-10deg]">ULTIMA CHIAMATA</div>
          <h3 className="text-4xl font-black mb-8 leading-none uppercase">OFFERTA <span className="text-yellow-400 italic">LIMITATA</span> 2X1</h3>
          <div className="space-y-6 text-xl">
            <div className="flex justify-between font-black border-b border-blue-800 pb-4"><span>2X BLUBULL</span><span className="text-yellow-400">59,99€</span></div>
            <div className="flex justify-between text-blue-300"><span>Prezzo Originale</span><span className="line-through">119,98€</span></div>
            <div className="flex justify-between text-green-400 font-bold"><span>Spedizione</span><span>GRATUITA</span></div>
          </div>
        </div>
        <div className="md:w-3/5 p-8 md:p-12 bg-white">
          <h3 className="text-2xl md:text-3xl font-black text-blue-900 mb-8 uppercase italic underline decoration-red-600">Inserisci i tuoi dati</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input required type="text" name="nome" placeholder="NOME E COGNOME" className="w-full bg-gray-100 border-b-4 border-blue-900 p-5 rounded-t-xl outline-none font-black text-lg" />
            <input required type="tel" name="telefono" placeholder="NUMERO DI TELEFONO" className="w-full bg-gray-100 border-b-4 border-blue-900 p-5 rounded-t-xl outline-none font-black text-lg" />
            <input required type="text" name="indirizzo" placeholder="INDIRIZZO COMPLETO (VIA, CIVICO, CITTÀ)" className="w-full bg-gray-100 border-b-4 border-blue-900 p-5 rounded-t-xl outline-none font-black text-lg" />
            <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-6 rounded-2xl text-2xl md:text-3xl shadow-xl transition transform hover:-translate-y-1 uppercase">VOGLIO IL 2X1 ORA!</button>
            <p className="text-gray-400 text-[10px] font-black uppercase text-center mt-4 tracking-tighter">PAGHI ALLA CONSEGNA • PACCO 100% ANONIMO</p>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---

export default function LandingPage() {
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    // Controlla subito al mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <ScarcityBanner />
      <Header />
      <main>
        <Hero onCTA={scrollToForm} />
        
        {/* Benefits Section */}
        <section className="py-20 px-6 bg-blue-900 text-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { t: "ESPANSIONE MOLECOLARE", d: "Afflusso sanguigno del 300% superiore per dimensioni oltre ogni limite.", i: "💎" },
              { t: "CONTROLLO TOTALE", d: "Blocca i segnali di fatica. Decidi tu quando finire.", i: "🧠" },
              { t: "TESTOSTERONE BOOST", d: "Libido aggressiva e fame di conquista immediata.", i: "⚡" },
              { t: "RECUPERO FLASH", d: "Di nuovo pronto per il secondo round in meno di 180 secondi.", i: "🔄" }
            ].map((b, idx) => (
              <div key={idx} className="p-8 bg-blue-800 rounded-3xl border border-blue-700 hover:bg-red-600 transition-all transform hover:-translate-y-2">
                <div className="text-5xl mb-4">{b.i}</div>
                <h3 className="text-lg font-black mb-3 uppercase">{b.t}</h3>
                <p className="text-blue-100 text-sm font-bold leading-snug">{b.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Scientific Section */}
        <section className="py-20 px-6 bg-gray-100">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img src="/images/blubull/science.png" alt="Science" className="rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-4xl font-black text-blue-900 mb-6 uppercase">IL PROTOCOLLO BLUBULL: LA SCIENZA HA VINTO</h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-6 font-bold italic">"Forza il sangue nei corpi cavernosi, costringendoli a un'espansione massima mai vista prima."</p>
              <div className="bg-white p-6 rounded-2xl border-l-8 border-red-600 shadow-lg font-bold">Efficacia clinica certificata del 98.7%</div>
            </div>
          </div>
        </section>

        <FacebookComments />
        <OrderForm />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6 text-center text-[10px] uppercase">
        <p>© 2024 BLUBULL AFFILIATE - RISULTATI VARIABILI DA PERSONA A PERSONA. PAGAMENTO ALLA CONSEGNA.</p>
      </footer>

      {/* Sticky CTA - Non invadente */}
      {showStickyCTA && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={scrollToForm}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 text-sm md:text-base"
          >
            <span>🛒</span>
            <span>ORDINA ORA</span>
          </button>
        </div>
      )}
    </div>
  );
}
