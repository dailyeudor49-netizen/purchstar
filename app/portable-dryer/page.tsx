'use client';

import React, { useState, useEffect } from 'react';
import { 
  Star, Check, Clock, Shield, Truck, ShieldCheck, MapPin, CheckCircle, 
  Wind, Sparkles, Zap, Shirt 
} from 'lucide-react';

// --- CONSTANTS & DATA ---

const PRODUCT_DATA = {
  title: "DryFold Pro™ - L'Asciugatrice Portatile Intelligente [Nuovo Modello 2025]",
  subtitle: "La prima con tecnologia a Ioni Negativi che asciuga, stira e igienizza i tuoi capi delicati in metà tempo, senza rovinarli.",
  price: 49.90,
  originalPrice: 99.90,
  rating: 4.9,
  reviewCount: 2140,
  offerEnd: "Sconto del 50% valido fino a mezzanotte",
  features: [
    "Tecnologia Ceramica PTC: Calore istantaneo, sicuro e a basso consumo",
    "Effetto Stiratura: Il flusso d'aria 3D riduce le pieghe del 80%",
    "Sterilizzazione Blue-Ray + Ioni: Capi morbidi, profumati e privi di batteri",
    "Modalità WhisperQuiet™: Silenziosa, perfetta anche di notte",
    "Sicura su Seta, Lana e Cachemire (Controllo Smart della temperatura)"
  ]
};

const REVIEWS = [
  {
    id: 1,
    author: "Alessandra M.",
    rating: 5,
    title: "Non rovina il cachemire, incredibile!",
    date: "Ieri",
    verified: true,
    content: "Ero terrorizzata all'idea di mettere i miei maglioni costosi dentro. Invece la tecnologia a calore controllato è fantastica. Escono morbidi e caldi come appena usciti dalla lavanderia. Vale ogni centesimo."
  },
  {
    id: 2,
    author: "Marco V.",
    rating: 5,
    title: "Mi ha salvato in trasferta a Londra",
    date: "2 giorni fa",
    verified: true,
    content: "Pioveva sempre, impossibile asciugare le camicie in hotel. Questo dispositivo entra nel trolley e in 1 ora ho la camicia pronta e senza pieghe. La funzione 'silenziosa' è vera, non disturba affatto."
  },
  {
    id: 3,
    author: "Simona R.",
    rating: 5,
    title: "Finalmente niente più puzza di umido in casa",
    date: "Settimana scorsa",
    verified: true,
    content: "Vivo in 40mq e lo stendino in inverno puzzava sempre. Con DryFold Pro asciugo tutto subito e la luce UV toglie quell'odore di chiuso. Arrivata in 24h, pagata al corriere. Top!"
  }
];

// --- COMPONENTS ---

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-2 md:py-3 flex items-center justify-between">
        
        {/* Logo Area */}
        <div className="flex items-center gap-1">
          <div className="font-extrabold text-xl md:text-2xl tracking-tighter text-slate-900">
            Dry<span className="text-orange-500">Fold</span>
          </div>
          <span className="text-[10px] md:text-xs bg-cyan-700 text-white px-1 rounded ml-1">OFFICIAL</span>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm font-medium text-gray-700">
          <div className="flex items-center gap-1">
            <Truck className="w-4 h-4 text-green-600" />
            <span className="hidden sm:inline">Spedizione Gratuita</span>
          </div>
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-orange-500" />
            <span className="hidden sm:inline">Pagamento alla Consegna</span>
            <span className="sm:hidden text-orange-500 font-bold">Contrassegno</span>
          </div>
        </div>

      </div>
      
      {/* Promo Bar */}
      <div className="bg-slate-700 text-white text-center text-[10px] md:text-xs py-1 px-2 font-medium">
        🔥 Oltre 1.500 pezzi venduti questa settimana. Offerta in scadenza!
      </div>
    </header>
  );
};

const ProductMain = () => {
  const [activeImg, setActiveImg] = useState(0);

  const images = [
    "https://picsum.photos/id/119/600/600",
    "https://picsum.photos/id/20/600/600",
    "https://picsum.photos/id/36/600/600",
    "https://picsum.photos/id/48/600/600"
  ];

  const scrollToForm = () => {
    const formElement = document.getElementById('order-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="container mx-auto bg-white p-3 md:p-8 mt-2 md:mt-4 rounded-lg shadow-sm max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        
        {/* Left: Images - Optimized for Mobile */}
        <div className="flex flex-col gap-3">
          {/* Main Image */}
          <div className="relative rounded-lg overflow-hidden border border-gray-100 aspect-square md:aspect-auto">
             <img src={images[activeImg]} alt="Product Main" className="w-full h-full object-cover" />
             <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs md:text-sm font-bold px-3 py-1 rounded-full shadow-md z-10">
               -50% DI SCONTO
             </div>
          </div>
          
          {/* Thumbnails - Horizontal Scroll on Mobile */}
          <div className="flex md:flex-wrap gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide snap-x" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
            {images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImg(idx)}
                className={`snap-start border-2 rounded-md p-0.5 w-16 h-16 md:w-20 md:h-20 flex-shrink-0 transition-colors ${activeImg === idx ? 'border-orange-500' : 'border-gray-200'}`}
              >
                <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover rounded-sm" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Sales Copy */}
        <div className="flex flex-col justify-center">
          <div className="text-orange-500 font-bold text-xs md:text-sm mb-1 uppercase tracking-wide">
            Disponibilità Limitata - Ultimi pezzi 2025
          </div>
          
          <h1 className="text-xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-2">
            {PRODUCT_DATA.title}
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-4 leading-relaxed">
            {PRODUCT_DATA.subtitle}
          </p>
          
          <div className="flex items-center gap-2 mb-6">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-current" />
              ))}
            </div>
            <span className="text-gray-500 font-medium text-sm md:text-base">({PRODUCT_DATA.reviewCount} recensioni verificate)</span>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-3 md:p-4 rounded-lg mb-6">
            <ul className="space-y-2 md:space-y-3">
              {PRODUCT_DATA.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 bg-green-500 rounded-full p-0.5 flex-shrink-0">
                    <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                  </div>
                  <span className="text-gray-800 font-medium text-sm md:text-base">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-3 md:gap-4 mb-2">
            <span className="text-3xl md:text-4xl font-bold text-gray-900">€{PRODUCT_DATA.price.toFixed(2)}</span>
            <span className="text-lg md:text-xl text-gray-400 line-through">€{PRODUCT_DATA.originalPrice.toFixed(2)}</span>
          </div>
          <div className="text-green-600 text-sm font-bold mb-6 flex items-center gap-2">
             <span className="animate-pulse">●</span> Spedizione Gratuita in 24/48h
          </div>

          <button 
            onClick={scrollToForm}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg md:text-xl font-bold py-3 md:py-4 px-8 rounded-lg shadow-lg transform transition hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            ORDINA E PAGA ALLA CONSEGNA
            <span className="text-2xl hidden md:inline">👉</span>
          </button>
          
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-gray-500">
            <div className="flex items-center gap-1"><Shield className="w-3 h-3 md:w-4 md:h-4" /> Garanzia 2 Anni</div>
            <div className="flex items-center gap-1"><Clock className="w-3 h-3 md:w-4 md:h-4" /> Soddisfatti o Rimborsati</div>
          </div>

        </div>
      </div>
    </section>
  );
};

const Features = () => {
  return (
    <section className="container mx-auto mt-4 md:mt-6 bg-white p-4 md:p-12 shadow-sm rounded-sm">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 text-center leading-tight">
        Tecnologia Professionale a casa tua
      </h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8 md:mb-12 text-sm md:text-base">
        Non è solo un'asciugatrice. È un sistema completo di cura dei tessuti che protegge le fibre mentre asciuga.
      </p>

      {/* Grid Features with Icons */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 md:mb-16">
        <div className="flex flex-col items-center text-center group">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-50 text-cyan-700 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
            <Wind className="w-6 h-6 md:w-8 md:h-8" />
          </div>
          <h3 className="font-bold mb-2">Dual-Core PTC™</h3>
          <p className="text-sm text-gray-600">Nuovo sistema di riscaldamento ceramico. Raggiunge la temperatura ottimale in 3 secondi senza bruciare ossigeno.</p>
        </div>
        <div className="flex flex-col items-center text-center group">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
            <Sparkles className="w-6 h-6 md:w-8 md:h-8" />
          </div>
          <h3 className="font-bold mb-2">Ioni Negativi</h3>
          <p className="text-sm text-gray-600">Mentre asciuga, rilascia ioni che distendono le fibre. Risultato? <strong>Niente stiro</strong> sulla maggior parte dei capi.</p>
        </div>
        <div className="flex flex-col items-center text-center group">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
            <ShieldCheck className="w-6 h-6 md:w-8 md:h-8" />
          </div>
          <h3 className="font-bold mb-2">Safe-Temp Control</h3>
          <p className="text-sm text-gray-600">Il microprocessore monitora il calore 100 volte al secondo. Sicuro al 100% anche su Seta e Lana.</p>
        </div>
        <div className="flex flex-col items-center text-center group">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
            <Zap className="w-6 h-6 md:w-8 md:h-8" />
          </div>
          <h3 className="font-bold mb-2">Eco-Smart Chip</h3>
          <p className="text-sm text-gray-600">Massima potenza, minimo spreco. Costa meno di 0,05€ per ciclo completo di asciugatura.</p>
        </div>
      </div>

      {/* Premium Highlight Box */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-5 md:p-8 text-white mb-8 md:mb-12 shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
           <div className="flex-1">
              <div className="inline-block bg-orange-500 text-xs font-bold px-2 py-1 rounded mb-4 text-slate-900 uppercase shadow-lg">Novità 2025</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">La tua biancheria come in Hotel</h3>
              <p className="text-gray-300 mb-6 leading-relaxed text-sm md:text-base">
                Hai presente quella sensazione di asciugamani caldi e soffici degli hotel di lusso? 
                DryFold Pro ricrea quell'effetto grazie alla combinazione di calore ventilato e sterilizzazione UV. 
                Elimina il 99.9% di batteri e acari.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <li className="flex items-center gap-2"><Shirt className="w-4 h-4 text-orange-500 flex-shrink-0"/> Ideale per Intimo e Calzini</li>
                <li className="flex items-center gap-2"><Shirt className="w-4 h-4 text-orange-500 flex-shrink-0"/> Perfetto per vestiti neonati</li>
                <li className="flex items-center gap-2"><Shirt className="w-4 h-4 text-orange-500 flex-shrink-0"/> Asciuga Scarpe e Peluche</li>
                <li className="flex items-center gap-2"><Shirt className="w-4 h-4 text-orange-500 flex-shrink-0"/> Riscalda il pigiama in inverno</li>
              </ul>
           </div>
           <div className="w-full md:w-1/3 bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-white/20 text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">98%</div>
              <p className="text-xs md:text-sm text-gray-300">Dei clienti dichiara di aver ridotto l'uso del ferro da stiro.</p>
           </div>
        </div>
      </div>

      {/* Comparison Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center bg-gray-50 p-4 md:p-10 rounded-lg">
        <div>
           <h3 className="text-lg md:text-xl font-bold mb-4">Il problema dei metodi tradizionali</h3>
           <ul className="space-y-4">
             <li className="flex items-start gap-3">
               <span className="text-red-500 font-bold text-lg md:text-xl">✗</span>
               <span className="text-gray-700 text-sm md:text-base">Lo stendino in casa crea umidità, muffa e impiega giorni.</span>
             </li>
             <li className="flex items-start gap-3">
               <span className="text-red-500 font-bold text-lg md:text-xl">✗</span>
               <span className="text-gray-700 text-sm md:text-base">Le asciugatrici classiche infeltriscono i maglioni e consumano tantissimo.</span>
             </li>
           </ul>
        </div>
        <div className="bg-white p-5 md:p-6 rounded-lg shadow-sm border border-green-100 relative overflow-hidden">
           <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-bl-lg">WINNER</div>
           <h3 className="text-lg md:text-xl font-bold mb-4 text-green-700">La soluzione DryFold Pro</h3>
           <ul className="space-y-4">
             <li className="flex items-start gap-3">
               <span className="text-green-500 font-bold text-lg md:text-xl">✓</span>
               <span className="text-gray-800 font-medium text-sm md:text-base">Capi pronti in 30-90 minuti (anche Jeans e Felpe).</span>
             </li>
             <li className="flex items-start gap-3">
               <span className="text-green-500 font-bold text-lg md:text-xl">✓</span>
               <span className="text-gray-800 font-medium text-sm md:text-base">Sensore anti-surriscaldamento per massima sicurezza.</span>
             </li>
             <li className="flex items-start gap-3">
               <span className="text-green-500 font-bold text-lg md:text-xl">✓</span>
               <span className="text-gray-800 font-medium text-sm md:text-base">Zero installazione: apri, appendi, accendi.</span>
             </li>
           </ul>
           <div className="mt-6 text-center">
             <button 
               onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}
               className="inline-block w-full md:w-auto bg-yellow-400 border border-yellow-500 hover:bg-yellow-500 text-black font-medium py-3 px-6 md:px-10 rounded-full shadow-lg transition-transform transform hover:scale-105 text-base md:text-lg"
             >
               Ordina DryFold Pro™ Oggi
             </button>
           </div>
        </div>
      </div>
      
    </section>
  );
};

const Reviews = () => {
  return (
    <section id="reviews" className="container mx-auto mt-6 bg-white p-6 md:p-8 shadow-sm rounded-sm mb-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Summary */}
        <div className="md:col-span-4">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Recensioni clienti</h2>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex text-orange-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.floor(PRODUCT_DATA.rating) ? 'fill-current' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-lg font-medium">{PRODUCT_DATA.rating} su 5</span>
          </div>
          <div className="text-gray-500 text-sm mb-6">{PRODUCT_DATA.reviewCount} valutazioni globali</div>
          
          <div className="space-y-3">
            {[
              { stars: "5 stelle", pct: "75%" },
              { stars: "4 stelle", pct: "15%" },
              { stars: "3 stelle", pct: "5%" },
              { stars: "2 stelle", pct: "3%" },
              { stars: "1 stella", pct: "2%" },
            ].map((row, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm text-cyan-700 hover:text-orange-500 hover:underline cursor-pointer">
                <span className="w-16 text-right">{row.stars}</span>
                <div className="flex-1 bg-gray-200 h-5 rounded-sm overflow-hidden border border-gray-300">
                  <div className="bg-orange-500 h-full" style={{ width: row.pct }}></div>
                </div>
                <span className="w-10 text-right">{row.pct}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Individual Reviews */}
        <div className="md:col-span-8">
          <h3 className="font-bold text-lg mb-4">Recensioni migliori dall'Italia</h3>
          <div className="space-y-6">
            {REVIEWS.map((review) => (
              <div key={review.id} className="pb-6 border-b border-gray-200 last:border-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                    {review.author.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-gray-800">{review.author}</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex text-orange-500">
                     {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                      ))}
                  </div>
                  <span className="font-bold text-sm text-gray-900">{review.title}</span>
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  Recensito in Italia il {review.date}
                </div>
                {review.verified && (
                  <div className="text-xs text-orange-500 font-bold flex items-center gap-1 mb-2">
                    <CheckCircle className="w-3 h-3" /> Acquisto verificato
                  </div>
                )}
                <p className="text-sm text-gray-800 leading-relaxed">
                  {review.content}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

const OrderForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <section id="order-form" className="container mx-auto px-4 py-8 md:py-12 max-w-2xl">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center border-t-4 border-green-500">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
            <CheckCircle className="w-10 h-10 md:w-12 md:h-12" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">Grazie per il tuo ordine!</h2>
          <p className="text-base md:text-lg text-gray-600 mb-6">
            Un nostro operatore ti contatterà a breve su WhatsApp o telefonicamente per confermare la spedizione.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="order-form" className="container mx-auto px-2 md:px-4 py-6 md:py-8 max-w-4xl">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
        <div className="bg-slate-900 text-white p-4 text-center">
          <h3 className="text-lg md:text-2xl font-bold">Compila il modulo per ordinare</h3>
          <p className="text-gray-300 text-xs md:text-sm">Non serve la carta di credito. Paghi direttamente al corriere.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Summary Column */}
          <div className="bg-gray-50 p-4 md:p-8 border-b md:border-b-0 md:border-r border-gray-200">
            <div className="flex items-start gap-4 mb-4 md:mb-6">
              <img src="https://picsum.photos/id/119/150/150" alt="Product" className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-md border border-gray-300" />
              <div>
                <h4 className="font-bold text-gray-900 leading-tight mb-1 text-sm md:text-base">{PRODUCT_DATA.title}</h4>
                <div className="text-red-700 font-bold text-lg md:text-xl">€{PRODUCT_DATA.price}</div>
                <div className="text-xs md:text-sm text-gray-500 line-through">€{PRODUCT_DATA.originalPrice}</div>
              </div>
            </div>

            <ul className="space-y-3 md:space-y-4 text-xs md:text-sm text-gray-700 mb-4 md:mb-8">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0" />
                <span>Garanzia soddisfatti o rimborsati 30 giorni</span>
              </li>
              <li className="flex items-center gap-2">
                <Truck className="w-4 h-4 md:w-5 md:h-5 text-cyan-700 flex-shrink-0" />
                <span>Spedizione Rapida Tracciata (Gratis)</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-orange-500 flex-shrink-0" />
                <span>Pagamento alla Consegna (Contanti)</span>
              </li>
            </ul>

            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded text-xs text-yellow-800 flex gap-2">
              <div className="font-bold">⚠️ ATTENZIONE:</div>
              <div>A causa dell'alta richiesta mediatica, le scorte sono limitate. Ordina oggi per bloccare il prezzo.</div>
            </div>
          </div>

          {/* Form Column */}
          <div className="p-4 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Nome e Cognome *</label>
                <input required type="text" placeholder="Mario Rossi" className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base" />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Numero di Telefono *</label>
                <input required type="tel" placeholder="333 1234567" className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base" />
                <p className="text-xs text-gray-500 mt-1">Il corriere ti chiamerà prima della consegna.</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Indirizzo e Numero Civico *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                  <input required type="text" placeholder="Via Roma 10" className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Città *</label>
                  <input required type="text" placeholder="Milano" className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">CAP *</label>
                  <input required type="text" placeholder="20100" className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Note per il corriere (Opzionale)</label>
                <textarea rows={2} placeholder="Es. Citofono Rossi, lasciare in portineria..." className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-base md:text-lg py-3 md:py-4 rounded-md shadow-md transition-colors mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Elaborazione in corso...' : 'CONFERMA ORDINE - PAGA ALLA CONSEGNA'}
              </button>
              
              <div className="text-center text-xs text-gray-500 mt-2">
                Cliccando confermi di aver letto la privacy policy. I tuoi dati sono al sicuro.
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const StickyFooter = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
    const formElement = document.getElementById('order-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] z-40 md:hidden flex items-center justify-between animate-slide-up">
      <div>
        <div className="text-xs text-gray-500 font-medium">Offerta Lampo:</div>
        <div className="text-xl font-extrabold text-red-700">€{PRODUCT_DATA.price.toFixed(2)}</div>
      </div>
      <button 
        onClick={scrollToForm}
        className="bg-orange-500 text-white font-bold py-2.5 px-6 rounded-lg shadow-md hover:bg-orange-600 transition-colors uppercase text-sm"
      >
        Ordina Ora
      </button>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---

export default function DryFoldLandingPage() {
  return (
    <div className="bg-gray-100 min-h-screen font-sans text-gray-900">
      <Header />
      
      <main className="pb-20 md:pb-0">
        <ProductMain />
        
        {/* Benefit Band */}
        <div className="bg-slate-900 text-white py-4 mt-8">
           <div className="container mx-auto px-4 flex justify-around text-center text-xs md:text-sm font-medium">
             <div>🚚 Spedizione Veloce</div>
             <div>💰 Pagamento alla Consegna</div>
             <div>⭐ Soddisfatti o Rimborsati</div>
           </div>
        </div>

        <Features />
        
        {/* Middle CTA */}
        <div className="container mx-auto px-4 text-center my-8">
          <button 
             onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}
             className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-12 rounded-full shadow-lg text-lg transform transition hover:scale-105"
          >
            Voglio riceverla a casa!
          </button>
        </div>

        <Reviews />
        
        {/* The Conversion Point */}
        <OrderForm />
      </main>

      <footer className="bg-white border-t border-gray-200 text-center py-8 mt-8 pb-24 md:pb-8">
        <div className="container mx-auto px-4 text-sm text-gray-500">
          <p className="mb-4 font-bold text-gray-700">DryFold™ Official Italia</p>
          <div className="flex justify-center gap-4 mb-4 text-xs">
            <span className="cursor-pointer hover:underline">Privacy Policy</span>
            <span className="cursor-pointer hover:underline">Termini e Condizioni</span>
            <span className="cursor-pointer hover:underline">Contattaci</span>
            <span className="cursor-pointer hover:underline">Spedizioni</span>
          </div>
          <p className="text-xs">© 2025 Tutti i diritti riservati. Questo sito non è parte del sito Facebook o Facebook Inc. Inoltre, questo sito non è approvato da Facebook in alcun modo.</p>
        </div>
      </footer>

      <StickyFooter />
    </div>
  );
}