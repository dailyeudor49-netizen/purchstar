'use client';

import React, { useState, useEffect, useRef } from 'react';

// --- DATA ---
const REVIEWS = [
  { name: "Francesca B.", title: "Mai più senza! Mi ha cambiato la vita", rating: 5, date: "2 giorni fa", text: "Ero scettica per il prezzo così basso ma è incredibile. Cucina tutto da solo, pulizia facilissima e le ricette sono una garanzia. Arrivato in 48 ore!", verified: true },
  { name: "Marco Rossi", title: "Qualità superiore alle aspettative", rating: 5, date: "1 settimana fa", text: "Materiali robusti e motore potentissimo. Ho fatto il risotto ieri sera ed era perfetto, cremoso come al ristorante. Per 89 euro è un regalo.", verified: true },
  { name: "Valentina D.", title: "Ottimo acquisto", rating: 4, date: "3 giorni fa", text: "Preso come regalo per mia mamma, ora lo vuole anche mia sorella. Il display è molto intuitivo.", verified: true },
  { name: "Giuseppe L.", title: "Pacco arrivato integro e puntuale", rating: 5, date: "4 giorni fa", text: "Il corriere è stato gentilissimo. Ho pagato in contanti come promesso. Il robot è massiccio e fa una marea di cose. Consigliato!", verified: true },
  { name: "Alessandra M.", title: "Sostituisce tutto in cucina", rating: 5, date: "5 giorni fa", text: "Ho buttato via il vecchio frullatore e la vaporiera. Questo fa tutto lui. Lo schermo è grande e si vede benissimo.", verified: true },
  { name: "Roberto P.", title: "Rapporto qualità prezzo imbattibile", rating: 5, date: "6 giorni fa", text: "Ho visto prodotti simili a 1000 euro. Questo a 89 euro è un affare che non capita due volte. La bilancia è precisissima.", verified: true },
  { name: "Elena G.", title: "Mia figlia lo adora", rating: 5, date: "1 settimana fa", text: "Facciamo i dolci insieme seguendo le video ricette. È diventato il nostro momento preferito della giornata.", verified: true },
  { name: "Claudio S.", title: "Potente e silenzioso", rating: 4, date: "1 settimana fa", text: "Mi aspettavo facesse più rumore mentre impasta, invece è piuttosto silenzioso. Ottimo per chi vive in appartamento.", verified: true },
  { name: "Simona F.", title: "Ricette facili e gustose", rating: 5, date: "9 giorni fa", text: "Non sono brava a cucinare ma con la guida passo-passo non sbaglio un colpo. Mio marito è rimasto a bocca aperta!", verified: true },
  { name: "Luca T.", title: "Spedizione lampo", rating: 5, date: "10 giorni fa", text: "Ordinato lunedì, arrivato mercoledì mattina. Imballaggio perfetto. Il bundle di accessori è veramente completo.", verified: true },
  { name: "Sara V.", title: "Lo schermo è una svolta", rating: 5, date: "11 giorni fa", text: "Vedere i video mentre cucini ti toglie ogni dubbio. Non tornerei mai indietro ai vecchi ricettari cartacei.", verified: true },
  { name: "Paolo D.", title: "Ottimo per le pappe dei bimbi", rating: 5, date: "12 giorni fa", text: "Cottura a vapore e omogeneizzazione perfetta. Ideale per chi ha bambini piccoli in casa.", verified: true },
  { name: "Marta N.", title: "Design moderno e funzionale", rating: 5, date: "2 settimane fa", text: "Sta benissimo sul piano della cucina. Bianco lucido, molto elegante. Facile da smontare e lavare.", verified: true },
  { name: "Giorgio B.", title: "Un vero aiuto", rating: 4, date: "2 settimane fa", text: "Mi aiuta a mangiare più sano cucinando a vapore. Unica pecca: avrei voluto il cavo un po' più lungo.", verified: true },
  { name: "Anna R.", title: "Super felice dell'acquisto", rating: 5, date: "3 settimane fa", text: "Lo uso ogni singolo giorno. Dal soffritto alla torta, fa tutto lui. Vale molto più di quello che costa.", verified: true }
];

const ACCESSORIES = [
  { name: "Boccale XL 4.5L", img: "/images/chef-pro/boccale.jpg" },
  { name: "Set Vapore Completo", img: "/images/chef-pro/vapore.jpg" },
  { name: "Cestello Cottura", img: "/images/chef-pro/cestello-di-cottura.jpg" },
  { name: "Farfalla Mescolatrice", img: "/images/chef-pro/accessorio-mixer.jpg" },
  { name: "Spatola in Silicone", img: "/images/chef-pro/spatola.jpg" },
  { name: "Lame in Acciaio Inox", img: "/images/chef-pro/lame.jpg" }
];

// --- COMPONENTS ---

export default function LandingPage() {
  const [timeLeft, setTimeLeft] = useState(600);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationName, setNotificationName] = useState("");
  const [orderStatus, setOrderStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  
  const formRef = useRef<HTMLDivElement>(null);

  // Timer scarcity
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(prev => prev > 0 ? prev - 1 : 0), 1000);
    return () => clearInterval(timer);
  }, []);

  // Social Proof
  useEffect(() => {
    const names = ["Marco", "Elena", "Giuseppe", "Sara", "Luca", "Alessia", "Roberto"];
    const interval = setInterval(() => {
      setNotificationName(names[Math.floor(Math.random() * names.length)]);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 4000);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth' });

  const loadMoreReviews = () => {
    setIsLoadingReviews(true);
    setTimeout(() => {
      setVisibleReviews(prev => Math.min(prev + 3, REVIEWS.length));
      setIsLoadingReviews(false);
    }, 600);
  };

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderStatus('loading');
    setTimeout(() => setOrderStatus('success'), 2000);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-900 selection:bg-rose-100 selection:text-rose-600">
      
      {/* Top Urgency Bar */}
      <div className="bg-black text-white py-2 text-center text-[10px] md:text-xs font-bold uppercase tracking-widest sticky top-0 z-[60]">
        🔥 Offerta <span className="text-rose-500">Fuoritutto</span> scade tra: <span className="text-yellow-400">{formatTime(timeLeft)}</span> - Solo 12 pezzi rimasti
      </div>

      <main className="max-w-4xl mx-auto bg-white shadow-2xl relative">
        
        {/* HERO */}
        <section className="p-6 md:p-12 text-center">
          <div className="inline-block bg-rose-600 text-white px-4 py-1 rounded-full text-xs font-black uppercase mb-6 animate-bounce">
            Sconto Immediato -70%
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-none mb-6 tracking-tighter">
            CUCINA COME UN PROFESSIONISTA A SOLI <span className="text-rose-600">89€</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto font-medium">
            Il Robot da Cucina Smart definitivo. Sostituisce 15 elettrodomestici. Video ricette guidate e controllo via App.
          </p>

          <div className="relative max-w-lg mx-auto mb-10 group">
            <img
              src="/images/chef-pro/monsieur-cuisine-smart.jpg"
              alt="Robot da Cucina Smart"
              className="w-full h-auto rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute -top-6 -right-6 bg-yellow-400 text-black w-28 h-28 rounded-full flex flex-col items-center justify-center font-black shadow-2xl rotate-12 border-4 border-white animate-pulse">
              <span className="text-sm line-through opacity-60">299€</span>
              <span className="text-3xl italic">89€</span>
            </div>
          </div>

          <button 
            onClick={scrollToForm}
            className="w-full max-w-md bg-rose-600 text-white text-2xl font-black py-6 rounded-2xl shadow-[0_10px_0_0_#9f1239] hover:shadow-[0_5px_0_0_#9f1239] hover:translate-y-1 active:scale-95 transition-all uppercase tracking-tight"
          >
            Sì! Lo voglio a 89€ ➔
          </button>
          <p className="mt-6 text-green-600 font-bold flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
            Pagamento alla consegna & Spedizione Gratis
          </p>
        </section>

        {/* AGGRESSIVE BANNER */}
        <div className="bg-rose-600 text-white py-10 px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase mb-4 leading-tight">
            ⚠️ ATTENZIONE: ULTIMI PEZZI IN MAGAZZINO ⚠️
          </h2>
          <p className="text-lg opacity-90 font-medium">
            Stiamo svuotando il magazzino per rinnovo inventario. <br className="hidden md:block"/>
            Una volta esauriti, il prezzo tornerà a 299€. Non farti sfuggire questa occasione unica!
          </p>
        </div>

        {/* SMART FEATURES SECTION */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">Tecnologia del Futuro</h2>
            <div className="h-2 w-24 bg-rose-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <div className="order-2 md:order-1">
              <span className="text-rose-600 font-black uppercase text-sm tracking-widest">Display 8" HD</span>
              <h3 className="text-3xl font-black mt-2 mb-6 leading-tight">Video Ricette Integrate: Impossibile Sbagliare!</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Guarda gli Chef preparare il piatto insieme a te. Il Robot ti guida passo-passo con <strong>video in alta definizione</strong> direttamente sullo schermo touch. Metti in pausa e riprendi quando vuoi.
              </p>
              <ul className="space-y-4">
                {["1200+ Ricette video caricate", "Aggiornamenti Wi-Fi gratuiti", "Guida vocale intelligente"].map((t, i) => (
                  <li key={i} className="flex items-center gap-3 font-bold text-gray-800">
                    <span className="bg-green-100 text-green-600 p-1 rounded-full">✓</span> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 md:order-2">
              <img src="/images/chef-pro/monsieur-cuisine-smart (1).jpg" className="rounded-3xl shadow-2xl border-8 border-white" alt="Video ricette" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <img src="/images/chef-pro/monsieur-cuisine-smart (2).jpg" className="rounded-3xl shadow-2xl border-8 border-white" alt="Smartphone app" />
            </div>
            <div>
              <span className="text-rose-600 font-black uppercase text-sm tracking-widest">App Dedicata</span>
              <h3 className="text-3xl font-black mt-2 mb-6 leading-tight">Controlla tutto dal tuo Smartphone</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Sei in ufficio? Scegli la ricetta dall'App e inviala al Robot. Crea la lista della spesa, pianifica i pasti e ricevi notifiche quando la cena è pronta.
              </p>
              <ul className="space-y-4">
                {["Compatibile iOS e Android", "Pianificatore settimanale", "Lista della spesa smart"].map((t, i) => (
                  <li key={i} className="flex items-center gap-3 font-bold text-gray-800">
                    <span className="bg-green-100 text-green-600 p-1 rounded-full">✓</span> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ACCESSORIES BUNDLE */}
        <section className="py-20 bg-gray-900 text-white px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase mb-4">IL BUNDLE PIÙ COMPLETO DI SEMPRE</h2>
            <p className="text-gray-400 italic">Tutto incluso negli 89€ - Valore accessori separati: 149€</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {ACCESSORIES.map((acc, idx) => (
              <div key={idx} className="bg-gray-800 p-4 rounded-2xl border border-gray-700 text-center group hover:border-rose-500 transition-colors">
                <img src={acc.img} alt={acc.name} className="w-full aspect-square object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform" />
                <p className="font-bold text-sm uppercase">{acc.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* AMAZON REVIEWS SECTION */}
        <section className="py-20 px-6 border-t border-gray-100">
          <h2 className="text-3xl font-black mb-10 tracking-tighter">Recensioni dei clienti</h2>
          
          <div className="flex flex-col md:flex-row gap-12 mb-16 border-b border-gray-100 pb-12">
            <div className="w-full md:w-1/3">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-yellow-500 text-2xl">★★★★★</div>
                <span className="text-xl font-black text-gray-900">4.8 su 5</span>
              </div>
              <p className="text-gray-500 text-sm mb-6">1.452 valutazioni globali</p>
              
              <div className="space-y-3">
                {[
                  { s: 5, p: 88 },
                  { s: 4, p: 9 },
                  { s: 3, p: 2 },
                  { s: 2, p: 1 },
                  { s: 1, p: 0 }
                ].map((row) => (
                  <div key={row.s} className="flex items-center gap-4 group cursor-pointer">
                    <span className="text-sm text-blue-600 hover:underline min-w-[50px]">{row.s} stelle</span>
                    <div className="flex-1 h-5 bg-gray-100 rounded-sm overflow-hidden">
                      <div className="h-full bg-yellow-400 group-hover:bg-yellow-500 transition-colors" style={{ width: `${row.p}%` }}></div>
                    </div>
                    <span className="text-sm text-gray-500 min-w-[30px]">{row.p}%</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex-1 md:border-l border-gray-100 md:pl-12">
              <h3 className="text-xl font-bold mb-3">Recensisci questo prodotto</h3>
              <p className="text-gray-600 mb-6">Condividi la tua esperienza culinaria con altri utenti.</p>
              <button className="w-full md:w-auto px-10 py-2.5 border border-gray-300 rounded-lg font-bold shadow-sm hover:bg-gray-50 transition-colors">
                Scrivi una recensione cliente
              </button>
            </div>
          </div>

          <div className="space-y-12">
            {REVIEWS.slice(0, visibleReviews).map((rev, i) => (
              <div key={i} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                  </div>
                  <span className="font-bold text-sm">{rev.name}</span>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex text-yellow-500 text-xs">{"★".repeat(rev.rating)}{"☆".repeat(5-rev.rating)}</div>
                  <h4 className="font-black text-gray-900">{rev.title}</h4>
                </div>
                <p className="text-xs text-gray-500 mb-3">Recensito in Italia il {rev.date}</p>
                {rev.verified && <p className="text-xs font-black text-orange-700 mb-3">Acquisto verificato</p>}
                <p className="text-gray-800 leading-relaxed mb-6">{rev.text}</p>
                <div className="flex items-center gap-6">
                  <button className="px-8 py-1.5 border border-gray-300 rounded-lg text-sm font-medium shadow-sm hover:bg-gray-50">Utile</button>
                  <button className="text-gray-400 text-sm hover:underline">Segnala</button>
                </div>
              </div>
            ))}
          </div>

          {visibleReviews < REVIEWS.length && (
            <button 
              onClick={loadMoreReviews}
              disabled={isLoadingReviews}
              className="w-full mt-16 py-4 border-2 border-gray-200 rounded-xl font-black text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-3"
            >
              {isLoadingReviews ? (
                <div className="w-6 h-6 border-4 border-gray-300 border-t-rose-600 rounded-full animate-spin"></div>
              ) : "Mostra altre recensioni"}
            </button>
          )}
        </section>

        {/* ORDER FORM SECTION */}
        <section ref={formRef} className="py-24 px-6 bg-rose-50 scroll-mt-20">
          <div className="max-w-md mx-auto">
            {orderStatus === 'success' ? (
              <div className="bg-white p-12 rounded-3xl shadow-2xl text-center border-4 border-green-500 animate-in zoom-in duration-500">
                <div className="text-7xl mb-6">✅</div>
                <h2 className="text-3xl font-black mb-4">ORDINE CONFERMATO!</h2>
                <p className="text-gray-600 mb-8 font-medium">Grazie per il tuo acquisto. Un nostro operatore ti chiamerà entro 15 minuti per confermare i dati di spedizione.</p>
                <div className="p-4 bg-green-50 text-green-700 font-bold rounded-2xl">
                  Il tuo pacco arriverà in 24/48h. Prepara 89€ in contanti per il corriere!
                </div>
              </div>
            ) : (
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border-4 border-rose-600 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-rose-600 text-white px-6 py-2 rounded-bl-2xl font-black text-xs uppercase tracking-tighter">
                  Spedizione Gratuita
                </div>
                <div className="text-center mb-10 mt-4">
                  <h2 className="text-3xl font-black uppercase mb-2">Ordina Ora</h2>
                  <p className="text-rose-600 font-bold uppercase text-sm">Pagamento alla consegna</p>
                </div>
                <form onSubmit={handleOrder} className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-black text-gray-700 uppercase">Nome e Cognome *</label>
                    <input required type="text" placeholder="es. Mario Rossi" className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-rose-600 outline-none transition-colors font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-black text-gray-700 uppercase">Telefono (per il corriere) *</label>
                    <input required type="tel" placeholder="es. 340 1234567" className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-rose-600 outline-none transition-colors font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-black text-gray-700 uppercase">Indirizzo Completo *</label>
                    <input required type="text" placeholder="Via, Civico, Città, Prov." className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-rose-600 outline-none transition-colors font-medium" />
                  </div>
                  
                  <button 
                    disabled={orderStatus === 'loading'}
                    className="w-full bg-rose-600 text-white text-2xl font-black py-6 rounded-2xl shadow-[0_10px_0_0_#9f1239] active:translate-y-1 active:shadow-none transition-all uppercase mt-8 flex items-center justify-center"
                  >
                    {orderStatus === 'loading' ? (
                      <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : "Conferma Ordine ➔"}
                  </button>
                  <p className="text-[10px] text-center text-gray-400 leading-tight">
                    Inviando l'ordine accetti i termini di vendita. I tuoi dati sono protetti da crittografia SSL a 256 bit.
                  </p>
                </form>
              </div>
            )}
          </div>
        </section>

        {/* TRUST BADGES */}
        <section className="py-16 bg-white border-t border-gray-100 px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
            {[
              { t: "Spedizione 24/48h", icon: "🚚" },
              { t: "Garanzia 2 Anni", icon: "🛡️" },
              { t: "Soddisfatto o Rimborsato", icon: "💎" },
              { t: "Assistenza Italia", icon: "🇮🇹" }
            ].map((badge, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl mb-2">{badge.icon}</div>
                <p className="text-[10px] font-black uppercase tracking-widest">{badge.t}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-12 bg-gray-50 border-t border-gray-200 px-6 text-center text-[10px] text-gray-400">
          <p>© 2024 RoboChef Italia - Vendita in Affiliazione</p>
          <div className="flex justify-center gap-6 mt-4 font-bold uppercase">
            <a href="#" className="hover:text-rose-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-rose-600 transition-colors">Termini</a>
            <a href="#" className="hover:text-rose-600 transition-colors">Contatti</a>
          </div>
        </footer>

      </main>

      {/* MOBILE STICKY CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-gray-200 z-50 md:hidden flex items-center justify-between gap-4 animate-in slide-in-from-bottom duration-500">
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase text-gray-400">Offerta</span>
          <span className="text-3xl font-black text-rose-600 leading-none">89€</span>
        </div>
        <button 
          onClick={scrollToForm}
          className="flex-1 bg-rose-600 text-white font-black py-4 rounded-xl shadow-xl animate-pulse uppercase text-sm tracking-tighter"
        >
          Ordina con 1 Click
        </button>
      </div>

      {/* SOCIAL PROOF POPUP */}
      <div className={`fixed bottom-24 left-4 right-4 md:left-8 md:right-auto md:w-80 bg-white shadow-2xl rounded-2xl p-4 border-l-8 border-green-500 transition-all duration-700 z-[70] ${showNotification ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-90 pointer-events-none'}`}>
        <div className="flex items-center gap-4">
          <div className="bg-green-100 p-2 rounded-full text-green-600">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase">Acquisto Recente</p>
            <p className="text-sm font-black text-gray-900">{notificationName} ha appena ordinato RoboChef Smart!</p>
          </div>
        </div>
      </div>

    </div>
  );
}