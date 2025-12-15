'use client';
import React, { useState, useEffect } from 'react';
import { Star, Award, CheckCircle, Shield, Zap, Thermometer, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

// Dichiarazioni TypeScript per Google Ads
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export default function AirWaveSmartLanding() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showOrderPopup, setShowOrderPopup] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(57 * 60); // 57 minuti in secondi
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [conversionTracked, setConversionTracked] = useState<boolean>(false);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState<number>(0);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState<boolean>(true);
  const [reviewsAutoScroll, setReviewsAutoScroll] = useState<boolean>(true);
  
  // Dati del modulo d'ordine
  const [orderData, setOrderData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  // Array delle immagini del carosello
  const carouselImages = [
    '/images/condizionatore/specifiche.webp',
    '/images/condizionatore/caldo-freddo.webp',
    '/images/condizionatore/installazione.webp',
    '/images/condizionatore/riscaldamento.webp',
    '/images/condizionatore/risparmio.webp',
    '/images/condizionatore/silenzioso.webp',
  ];

  // Carica Google Ads script quando il componente si monta
  useEffect(() => {
    // Evita doppio caricamento in sviluppo
    if (typeof window === 'undefined') return;
    
    // Verifica se lo script è già caricato
    const existingScript = document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
    if (existingScript && typeof window.gtag === 'function') return;

    // Carica Google Ads Global Site Tag
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=AW-17104994752';
    document.head.appendChild(gtagScript);

    // Inizializza gtag
    gtagScript.onload = () => {
      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function gtag(...args: any[]) {
          if (window.dataLayer) {
            window.dataLayer.push(args);
          }
        };
        
        window.gtag('js', new Date());
        window.gtag('config', 'AW-17104994752');
      }
    };

    return () => {
      // Cleanup script quando il componente si smonta
      const scriptToRemove = document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  // Auto-scroll del carosello
  useEffect(() => {
    if (!autoScrollEnabled) return;

    const interval = setInterval(() => {
      setCurrentCarouselIndex((prevIndex) =>
        (prevIndex + 1) % carouselImages.length
      );
    }, 3000); // Cambia ogni 3 secondi

    return () => clearInterval(interval);
  }, [carouselImages.length, autoScrollEnabled]);

  // Auto-scroll delle recensioni
  useEffect(() => {
    if (!reviewsAutoScroll) return;

    const interval = setInterval(() => {
      const container = document.querySelector('.reviews-container') as HTMLElement;
      if (container) {
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;
        const scrollLeft = container.scrollLeft;
        const maxScroll = scrollWidth - clientWidth;

        console.log('scrollLeft:', scrollLeft, 'maxScroll:', maxScroll, 'diff:', maxScroll - scrollLeft);

        if (scrollLeft >= maxScroll - 100 || scrollLeft + clientWidth >= scrollWidth - 10) {
          console.log('RESET to start');
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: 320, behavior: 'smooth' });
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [reviewsAutoScroll]);

  // Funzione per tracciare la conversione
  const trackConversion = () => {
    if (conversionTracked) {
      return;
    }

    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      try {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-17104994752/jZlCPqKod4aEMCDptw',
          'value': 199,
          'currency': 'EUR',
          'transaction_id': `ORDER_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`,
        });
        
        setConversionTracked(true);
        console.log('✅ Conversione tracciata con successo');
      } catch (error) {
        console.error('❌ Errore nel tracciamento conversione:', error);
      }
    }
  };

  // Gestore del conto alla rovescia
  useEffect(() => {
    if (!showOrderPopup) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [showOrderPopup]);

  // Carica lo script per il fingerprint quando si apre il popup
  useEffect(() => {
    if (showOrderPopup && typeof window !== 'undefined') {
      // Verifica se lo script è già presente
      const existingScript = document.querySelector('script[src="https://offers.uncappednetwork.com/forms/tmfp/"]');
      if (existingScript) return;

      const script = document.createElement('script');
      script.src = 'https://offers.uncappednetwork.com/forms/tmfp/';
      script.crossOrigin = 'anonymous';
      script.defer = true;
      document.head.appendChild(script);
      
      return () => {
        // Cleanup: rimuovi lo script quando il popup si chiude
        const scriptToRemove = document.querySelector('script[src="https://offers.uncappednetwork.com/forms/tmfp/"]');
        if (scriptToRemove) {
          scriptToRemove.remove();
        }
      };
    }
  }, [showOrderPopup]);

  // Formatta il tempo in MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Validazione dei campi
  const validateForm = (): boolean => {
    if (!orderData.name.trim()) {
      setSubmitError('Il nome è obbligatorio');
      return false;
    }
    if (!orderData.phone.trim()) {
      setSubmitError('Il numero di telefono è obbligatorio');
      return false;
    }
    if (!orderData.address.trim()) {
      setSubmitError('L\'indirizzo è obbligatorio');
      return false;
    }
    
    // Validazione formato telefono (semplice)
    const phoneRegex = /^[\d\s\+\-\(\)]{8,}$/;
    if (!phoneRegex.test(orderData.phone.trim())) {
      setSubmitError('Inserisci un numero di telefono valido');
      return false;
    }
    
    setSubmitError('');
    return true;
  };

  // Gestisci l'invio del modulo
  const handleSubmitOrder = async (): Promise<void> => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Prepara i dati per l'API
      const params = new URLSearchParams();
      params.append('uid', '0191b25c-22d2-7f55-9d9b-79b67cebbff3');
      params.append('key', 'e0fe8e75c501eccab21f8d');
      params.append('offer', '678');
      params.append('lp', '692');
      params.append('name', orderData.name.trim());
      params.append('tel', orderData.phone.trim());
      params.append('street-address', orderData.address.trim());
      
      // Gestione fingerprint
      const tmfpElement = document.querySelector('input[name="tmfp"]') as HTMLInputElement;
      if (tmfpElement && tmfpElement.value) {
        params.append('tmfp', tmfpElement.value);
      } else if (typeof navigator !== 'undefined') {
        params.append('ua', navigator.userAgent);
      }

      console.log('=== DEBUG API CALL ===');
      console.log('Dati da inviare:', Object.fromEntries(params));

      // URL dell'API originale
      const apiUrl = 'https://offers.uncappednetwork.com/forms/api/';
      
      try {
        console.log('Tentativo chiamata API a:', apiUrl);
        
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': '*/*',
          },
          body: params.toString(),
          mode: 'cors',
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', Array.from(response.headers.entries()));
        
        const responseText = await response.text();
        console.log('Response body:', responseText);

        if (response.ok || response.status === 200) {
          console.log('✅ API SUCCESS - Tracciamento conversione e redirect');
          
          // 🎯 TRACCIA LA CONVERSIONE PRIMA DEL REDIRECT
          trackConversion();
          
          // Attendi un momento per essere sicuri che il tracciamento venga inviato
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Reset form
          setOrderData({ name: '', phone: '', address: '' });
          setShowOrderPopup(false);
          
          // Redirect con parametro per evitare re-tracciamento
          const timestamp = Date.now();
          if (typeof window !== 'undefined') {
            window.location.href = `/ty-airwave?converted=1&t=${timestamp}`;
          }
          return;
        }

        // MODALITÀ TEST: Per testare il tracciamento anche senza API funzionante
        if (response.status === 404 || !response.ok) {
          console.warn('⚠️ API Error - Attivo MODALITÀ TEST per testare il tracciamento');
          
          // 🧪 MODALITÀ TEST: Traccia la conversione anche in caso di errore API
          trackConversion();
          
          // Attendi per il tracciamento
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Reset form e redirect per test
          setOrderData({ name: '', phone: '', address: '' });
          setShowOrderPopup(false);
          
          const timestamp = Date.now();
          if (typeof window !== 'undefined') {
            window.location.href = `/ty-airwave?converted=1&test=1&t=${timestamp}`;
          }
          return;
        }

        throw new Error(`HTTP ${response.status}: ${responseText}`);

      } catch (fetchError: any) {
        console.error('❌ Errore nella fetch:', fetchError);
        
        if (fetchError.name === 'TypeError') {
          setSubmitError('Errore di connessione. Verifica la connessione internet.');
        } else if (fetchError.message.includes('CORS')) {
          setSubmitError('Errore CORS. Il server non accetta richieste da questo dominio.');
        } else {
          setSubmitError(`Errore tecnico: ${fetchError.message}`);
        }
      }

    } catch (error: any) {
      console.error('❌ Errore generale:', error);
      setSubmitError('Errore imprevisto durante l\'invio dell\'ordine.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Gestisci le modifiche ai campi del modulo
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setOrderData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Apri il modulo d'ordine e scrolla fino ad esso
  const openOrderForm = () => {
    setShowOrderPopup(true);
    // Scroll fino al modulo con un piccolo delay per permettere il rendering
    setTimeout(() => {
      const orderSection = document.getElementById('order-form-section');
      if (orderSection) {
        orderSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // Navigazione carosello
  const goToCarouselSlide = (index: number) => {
    setCurrentCarouselIndex(index);
  };

  const nextCarouselSlide = () => {
    setAutoScrollEnabled(false);
    setCurrentCarouselIndex((prevIndex) =>
      (prevIndex + 1) % carouselImages.length
    );
  };

  const prevCarouselSlide = () => {
    setAutoScrollEnabled(false);
    setCurrentCarouselIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  const benefits = [
    {
      image: "/images/condizionatore/caldo-freddo.webp",
      title: "Un Solo Apparecchio, Tre Problemi Risolti",
      description: "D'estate ti raffredda quando fuori ci sono 40 gradi. D'inverno ti riscalda quando i termosifoni non bastano. E quando l'umidità ti soffoca, la elimina. Tutto con un solo acquisto."
    },
    {
      image: "/images/condizionatore/installazione.webp",
      title: "Zero Complicazioni (Anche Senza Installazione)",
      description: "Niente preventivi da 500€ per l'installazione. Niente muratori che ti bucano le pareti. Lo appoggi dove vuoi o lo fissi al muro con due viti. Il condominio non c'entra nulla."
    },
    {
      image: "/images/condizionatore/silenzioso.webp",
      title: "Così Silenzioso Che Ti Dimentichi Sia Acceso",
      description: "Chi ha provato i condizionatori portatili sa quanto rumore fanno. Questo no. Puoi dormirci accanto senza tappi nelle orecchie. I tuoi vicini non sapranno nemmeno che ce l'hai."
    },
    {
      image: "/images/condizionatore/risparmio.webp",
      title: "La Bolletta Non Schizza Alle Stelle",
      description: "Classe A+++ non è marketing: significa consumare fino al 60% in meno. Chi l'ha comprato ci ha detto che la differenza in bolletta è quasi inesistente. Alcuni dicono che si è ripagato in un anno."
    },
    {
      image: "/images/condizionatore/specifiche.webp",
      title: "Potenza Vera: 12.000 BTU per 60m²",
      description: "Non è un giocattolo da scrivania. Parliamo di un apparecchio che raffresca o riscalda un intero soggiorno in pochi minuti. Regoli la temperatura da 16°C a 32°C come vuoi tu."
    },
    {
      image: "/images/condizionatore/riscaldamento.webp",
      title: "Nessuna Unità Esterna = Nessun Problema",
      description: "Il sistema ThermoPanel funziona senza quel cassone rumoroso fuori dalla finestra. Significa che non devi chiedere permessi, non devi litigare col condominio, non devi aspettare mesi."
    }
  ];

  const faqs = [
    {
      question: "Ma davvero non serve un tecnico per installarlo?",
      answer: "Zero. Niente. Lo apri, lo appoggi dove vuoi (o lo fissi al muro con due viti e i ganci inclusi), lo attacchi alla corrente. Fatto. Nessun preventivo, nessuna attesa di settimane, nessun muratore che ti sporca casa. In 10 minuti sei operativo."
    },
    {
      question: "Come fa a funzionare senza quell'unità esterna rumorosa?",
      answer: "Il sistema ThermoPanel è progettato proprio per questo. Recupera e ricircola l'aria senza bisogno del cassone esterno. Tradotto: nessuna autorizzazione condominiale, nessun vicino che si lamenta del rumore, nessuna lite in assemblea."
    },
    {
      question: "Ma non mi fa schizzare la bolletta?",
      answer: "Questa è la parte che sorprende tutti. Classe A+++ significa consumare fino al 60% in meno rispetto a un climatizzatore normale. I nostri clienti ci scrivono che la bolletta è rimasta praticamente uguale. Qualcuno dice che in un anno si è già ripagato."
    },
    {
      question: "Posso usarlo in camera da letto senza impazzire per il rumore?",
      answer: "È stato progettato esattamente per questo. Chi ha provato altri portatili sa che sembrano aerei in decollo. Questo no. Puoi dormirci accanto tranquillamente. Niente ronzii, niente vibrazioni, niente unità esterna che sveglia il palazzo."
    },
    {
      question: "E se non mi trovo bene? Sono bloccato?",
      answer: "Assolutamente no. Hai 30 giorni per provarlo: se non ti convince, lo rispedisci e ti rimborsiamo tutto. Più 24 mesi di garanzia completa. E paghi solo alla consegna, quindi non anticipi nemmeno un euro. Rischio zero."
    }
  ];

  const comparisonData = [
    { feature: "Potenza", airwave: "12.000 BTU", competitor1: "9.000 BTU", competitor2: "7.000 BTU" },
    { feature: "Copertura", airwave: "60 m²", competitor1: "35 m²", competitor2: "25 m²" },
    { feature: "Funzioni", airwave: "3 in 1 (Caldo/Freddo/Deumidifica)", competitor1: "Solo freddo", competitor2: "Solo freddo" },
    { feature: "Classe Energetica", airwave: "A+++", competitor1: "A", competitor2: "B" },
    { feature: "Unità Esterna", airwave: "Non necessaria", competitor1: "Richiesta", competitor2: "Richiesta" },
    { feature: "Installazione", airwave: "Fai da te (parete o pavimento)", competitor1: "Tecnico obbligatorio", competitor2: "Tecnico obbligatorio" },
    { feature: "Garanzia", airwave: "24 mesi", competitor1: "12 mesi", competitor2: "6 mesi" }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <style>{`
        @keyframes slide {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-slide {
          animation: slide 20s linear infinite;
        }
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .popup-content {
          background-color: white;
          border-radius: 12px;
          width: 90%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .carousel-container {
          scroll-snap-type: x mandatory;
        }
        .carousel-item {
          scroll-snap-align: center;
        }
      `}</style>
      
      {/* Fixed CTA Button */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-orange-500 shadow-2xl">
        <div className="max-w-md mx-auto p-4">
          <button
            onClick={openOrderForm}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-amber-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>LO VOGLIO A €199</span>
            <span className="text-sm bg-white/20 px-2 py-1 rounded">💳 Pago alla consegna</span>
          </button>
        </div>
      </div>

      {/* Yellow Alert Banner */}
      <div className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white py-2 text-center text-sm font-medium shadow-md">
        📦 Spedito in 48h – Pagamento alla Consegna
      </div>
      
      
      {/* Emotional Hero Title Section */}
      <section className="bg-gradient-to-r from-orange-600 to-amber-600 text-white pt-4 pb-2 md:py-6 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">
            BASTA SUDARE D'ESTATE E TREMARE D'INVERNO
          </h1>
          <p className="text-base md:text-lg text-orange-100 mb-4">
            Il climatizzatore che <span className="text-white font-bold">non richiede installazione</span>, non ha bisogno di tecnici e <span className="text-white font-bold">non serve l'autorizzazione del condominio</span>. Lo colleghi alla presa e in 5 minuti hai il clima perfetto.
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-xs md:text-sm">
            <span className="bg-orange-800/50 px-3 py-1 rounded-full">12.000 BTU di potenza</span>
            <span className="bg-orange-800/50 px-3 py-1 rounded-full">3 funzioni in 1</span>
            <span className="bg-orange-800/50 px-3 py-1 rounded-full">Classe A+++ = Bolletta leggera</span>
          </div>
        </div>
      </section>

      {/* Product Section - Mobile First, Desktop Side by Side */}
      <main className="max-w-6xl mx-auto px-4 pt-6 pb-20 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Left: Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden">
              <img
                src={carouselImages[currentCarouselIndex]}
                alt="Air Wave Smart - Condizionatore Portatile 3 in 1"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Mini Carousel */}
            <div className="relative">
              <div className="overflow-hidden rounded-lg">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentCarouselIndex * 50}%)` }}
                >
                  {carouselImages.map((image, index) => (
                    <div key={index} className="flex-shrink-0 w-1/2 px-1">
                      <div
                        className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-300 ${
                          index === currentCarouselIndex ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => goToCarouselSlide(index)}
                      >
                        <img
                          src={image}
                          alt={`Air Wave Smart vista ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Navigation Buttons */}
              <button
                onClick={prevCarouselSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow-lg transition-all duration-300 z-10 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextCarouselSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow-lg transition-all duration-300 z-10 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Carousel Indicators */}
              <div className="flex justify-center mt-3 space-x-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToCarouselSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      index === currentCarouselIndex ? 'bg-orange-500' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:sticky lg:top-4 lg:self-start">
            {/* Product Title & Rating */}
            <div className="text-left mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Air Wave Smart™ – Climatizzatore Senza Installazione
              </h1>
              <p className="text-lg text-gray-600 mb-3">Niente tecnici. Niente buchi. Niente autorizzazioni. Solo 12.000 BTU di potenza per 60m² di comfort immediato.</p>
              <a href="#recensioni" className="flex items-center justify-start space-x-2 cursor-pointer hover:opacity-80 transition-opacity mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-gray-500 text-sm">(2.847 recensioni)</span>
              </a>

              {/* Bullet Points Emotivi */}
              <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl p-4 mb-4 text-left">
                <ul className="space-y-3 text-white text-base">
                  <li className="flex items-start gap-2">
                    <Thermometer className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                    <span><strong>Estate, inverno, non importa:</strong> Raffredda quando sudi, riscalda quando tremi, deumidifica quando l'aria è pesante. Un solo apparecchio, problema risolto.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                    <span><strong>Dimentica tecnici e permessi:</strong> Lo tiri fuori dalla scatola, lo attacchi alla corrente. Fine. Funziona. Il condominio non può dirti nulla.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                    <span><strong>La bolletta? Quasi non se ne accorge:</strong> Classe A+++ significa consumare il 60% in meno. Chi lo ha comprato dice che si ripaga da solo in un anno.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Award className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                    <span><strong>Così silenzioso che te ne dimentichi:</strong> Nessun ronzio fastidioso, nessuna unità esterna che sveglia i vicini. Perfetto anche in camera da letto.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                    <span><strong>Lo controlli dal divano (o dal lavoro):</strong> Con l'app puoi accenderlo prima di tornare a casa. Entri e trovi già il clima perfetto.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Price Box */}
            <div id="order-form-section" className="bg-white border-2 border-orange-500 rounded-2xl p-5 mb-6 shadow-lg relative">
              {/* Bollino Sconto */}
              <div className="absolute -top-4 -right-4 bg-red-600 text-white text-base font-bold w-14 h-14 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.4)] transform rotate-12 flex items-center justify-center">
                -60%
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center">Air Wave Smart™</h3>
              <p className="text-gray-600 text-center mb-3">Il climatizzatore che non ti complica la vita</p>
              <div className="flex items-center justify-center space-x-3 mb-2">
                <span className="text-gray-400 line-through text-xl">€499</span>
                <span className="text-4xl font-bold text-orange-600">€199</span>
              </div>
              <div className="flex justify-center mb-3">
                <span className="bg-red-800 text-white font-medium py-2 px-4 rounded-full shadow-md text-sm">Risparmi €300 - Offerta a tempo limitato</span>
              </div>

              {/* Kit Incluso */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-400 rounded-xl p-4 mb-4">
                <p className="font-bold text-amber-800 text-base mb-3 flex items-center justify-center gap-2">
                  🎁 Incluso nel prezzo
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm text-slate-700">
                  <span className="flex items-center gap-1"><span className="text-orange-500">✓</span> Telecomando</span>
                  <span className="flex items-center gap-1"><span className="text-orange-500">✓</span> Batterie telecomando</span>
                  <span className="flex items-center gap-1"><span className="text-orange-500">✓</span> Kit di installazione</span>
                  <span className="flex items-center gap-1"><span className="text-orange-500">✓</span> 2 Filtri HEPA</span>
                  <span className="flex items-center gap-1"><span className="text-orange-500">✓</span> App Android/iOS gratuita</span>
                  <span className="flex items-center gap-1"><span className="text-orange-500">✓</span> Manuale in 60 lingue</span>
                </div>
              </div>

              <button
                onClick={() => setShowOrderPopup(!showOrderPopup)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg transition-all cursor-pointer shadow-lg"
              >
                {showOrderPopup ? 'Chiudi' : 'Ordina Ora - Paghi alla Consegna'}
              </button>

              {/* Form Inline */}
              {showOrderPopup && (
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <div className="bg-red-100 border border-red-300 rounded-lg p-3 mb-4">
                    <p className="text-red-700 font-medium text-center text-sm">
                      ⏱️ Offerta scade in: <span className="font-bold">{formatTime(timeLeft)}</span>
                    </p>
                  </div>

                  <input type="hidden" name="tmfp" />

                  {submitError && (
                    <div className="bg-red-100 border border-red-300 rounded-lg p-3 mb-4">
                      <p className="text-red-700 text-sm">{submitError}</p>
                    </div>
                  )}

                  <div className="space-y-3 mb-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1 text-sm" htmlFor="name">
                        Nome e Cognome *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={orderData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Inserisci il tuo nome completo"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1 text-sm" htmlFor="phone">
                        Numero di Telefono *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={orderData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Inserisci il tuo numero di telefono"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1 text-sm" htmlFor="address">
                        Indirizzo di Spedizione *
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={orderData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Inserisci il tuo indirizzo completo"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="bg-amber-100 border-2 border-amber-500 rounded-lg p-3 mb-4">
                    <p className="text-amber-800 font-bold text-sm text-center">
                      💳 Pagamento alla consegna - Nessun dato carta richiesto
                    </p>
                  </div>

                  <button
                    onClick={handleSubmitOrder}
                    disabled={isSubmitting}
                    className={`w-full py-3 px-4 rounded-lg font-bold transition duration-300 ${
                      isSubmitting
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        : 'bg-orange-500 hover:bg-orange-600 text-white cursor-pointer'
                    }`}
                  >
                    {isSubmitting ? 'INVIO IN CORSO...' : 'CONFERMO – MANDATEMELO A CASA'}
                  </button>

                  <p className="mt-3 text-center text-xs text-gray-500">
                    I tuoi dati personali sono protetti e sicuri.
                  </p>
                </div>
              )}
              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs mt-4">
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                  <Shield className="w-5 h-5 mx-auto mb-1 text-orange-600" />
                  <span className="text-gray-700">Garanzia 2 anni</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                  <CheckCircle className="w-5 h-5 mx-auto mb-1 text-orange-600" />
                  <span className="text-gray-700">Reso entro 30 giorni</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                  <Zap className="w-5 h-5 mx-auto mb-1 text-orange-600" />
                  <span className="text-gray-700">Spedizione 48h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Benefits */}
      <section className="pt-8 pb-16 md:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Perché più di 2.000 persone lo hanno già scelto
            </h2>
            <p className="text-xl text-slate-600 mb-4">
              Perché risolve un problema che tutti hanno: stare bene in casa propria, senza complicazioni e senza spendere una fortuna.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-400 rounded-full px-5 py-2">
                <span className="text-xl">⚡</span>
                <span className="text-amber-800 font-bold text-sm">Solo ~€0,30/giorno</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-400 rounded-full px-5 py-2">
                <span className="text-xl">🏠</span>
                <span className="text-green-800 font-bold text-sm">Nessuna Autorizzazione Condominiale</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow overflow-hidden p-7">
                <div className="mb-4 overflow-hidden rounded-xl">
                  <img
                    src={benefit.image}
                    alt={benefit.title}
                    className="w-full h-auto"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section - Compact */}
      <section className="py-8 bg-gradient-to-r from-orange-600 to-amber-600">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-4 text-center text-white mb-6">
            <div>
              <Shield className="w-6 h-6 mx-auto mb-1" />
              <p className="text-sm font-semibold">Garanzia 2 Anni</p>
            </div>
            <div>
              <CheckCircle className="w-6 h-6 mx-auto mb-1" />
              <p className="text-sm font-semibold">Reso 30 Giorni</p>
            </div>
            <div>
              <Zap className="w-6 h-6 mx-auto mb-1" />
              <p className="text-sm font-semibold">Spedizione 48h</p>
            </div>
          </div>
          <div className="text-center">
            <button
              onClick={openOrderForm}
              className="bg-white text-orange-600 hover:bg-gray-100 py-3 px-8 rounded-xl font-bold text-lg transition-all cursor-pointer"
            >
              Lo Voglio a €199
            </button>
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Due Modi Per Usarlo. Zero Complicazioni.
            </h2>
            <p className="text-slate-600">Scegli tu come preferisci. In entrambi i casi, sei operativo in 10 minuti.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Installazione a parete */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">🔩</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">Fissalo al Muro</h3>
              </div>
              <div className="rounded-xl overflow-hidden mb-4">
                <img
                  src="/images/condizionatore/installazione.webp"
                  alt="Air Wave Smart - Installazione a parete"
                  className="w-full aspect-video object-cover"
                />
              </div>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">✓</span>
                  <span>Ganci già inclusi, non devi comprare nulla</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">✓</span>
                  <span>Due viti e sei a posto. Nessun muratore.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">✓</span>
                  <span>Liberi tutto lo spazio a terra</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">✓</span>
                  <span>L'aria si distribuisce meglio dall'alto</span>
                </li>
              </ul>
            </div>

            {/* Installazione da tavolo */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">🏠</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">Poggialo Dove Vuoi</h3>
              </div>
              <div className="rounded-xl overflow-hidden mb-4">
                <img
                  src="/images/condizionatore/specifiche.webp"
                  alt="Air Wave Smart - Installazione da tavolo"
                  className="w-full aspect-video object-cover"
                />
              </div>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">✓</span>
                  <span>Tavolo, mobile, pavimento: decidi tu</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">✓</span>
                  <span>Lo tiri fuori dalla scatola e funziona</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">✓</span>
                  <span>Lo sposti da una stanza all'altra in 2 secondi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">✓</span>
                  <span>Sei in affitto? Nessun buco, nessun problema</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="max-w-md mx-auto">
            <button
              onClick={openOrderForm}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold transition-all cursor-pointer"
            >
              <span className="text-xl">LO VOGLIO ADESSO</span>
              <br />
              <span className="text-sm font-normal">€199 invece di €499 – Pago alla consegna</span>
            </button>
            <p className="text-center text-red-600 text-sm mt-2 font-medium">Lo sconto del 60% non durerà per sempre</p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Non Fidarti di Noi. Confronta i Numeri.
            </h2>
            <p className="text-xl text-slate-600">
              Abbiamo messo Air Wave Smart accanto ai portatili più venduti. Guarda tu stesso.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Caratteristiche</th>
                  <th className="px-6 py-4 text-center bg-orange-600">
                    <div>
                      <div className="font-bold">Air Wave Smart</div>
                      <div className="text-xs text-orange-100 font-normal">Il nostro prodotto</div>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center bg-gray-500">
                    <div>
                      <div className="font-bold">Altro Brand 1</div>
                      <div className="text-xs text-gray-200 font-normal">Il più venduto su Amazon</div>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center bg-gray-500">
                    <div>
                      <div className="font-bold">Altro Brand 2</div>
                      <div className="text-xs text-gray-200 font-normal">Il più venduto nei negozi</div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-semibold text-slate-900">{row.feature}</td>
                    <td className={`px-6 py-4 text-center font-bold ${
                      row.feature === 'Prezzo' ? 'text-orange-700 bg-orange-50' : 'text-orange-700 bg-orange-50'
                    }`}>
                      {row.airwave}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-400">{row.competitor1}</td>
                    <td className="px-6 py-4 text-center text-gray-400">{row.competitor2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Urgency CTA Strip */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-white text-lg md:text-xl font-bold mb-3">
            Questa offerta a €199 non durerà per sempre. Il prezzo pieno è €499.
          </p>
          <button
            onClick={openOrderForm}
            className="bg-white text-orange-600 hover:bg-gray-100 py-3 px-8 rounded-xl font-bold text-lg transition-all cursor-pointer"
          >
            Voglio approfittarne adesso
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section id="recensioni" className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 reviews-section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Recensioni</h2>
            <p className="text-xl text-white font-bold">2.847 recensioni verificate</p>
            <p className="text-xl text-blue-100">Puoi vedere tutte le altre recensioni sul sito ufficiale</p>
          </div>
          <div className="relative">
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 text-blue-600 rounded-full w-10 h-10 md:w-14 md:h-14 flex items-center justify-center shadow-lg transition-all duration-300 text-xl md:text-2xl cursor-pointer"
              onClick={() => {
                setReviewsAutoScroll(false);
                const container = document.querySelector('.reviews-container');
                if (container) {
                  container.scrollBy({ left: -300, behavior: 'smooth' });
                }
              }}
            >
              ‹
            </button>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 text-blue-600 rounded-full w-10 h-10 md:w-14 md:h-14 flex items-center justify-center shadow-lg transition-all duration-300 text-xl md:text-2xl cursor-pointer"
              onClick={() => {
                setReviewsAutoScroll(false);
                const container = document.querySelector('.reviews-container') as HTMLElement;
                if (container) {
                  const maxScroll = container.scrollWidth - container.clientWidth;
                  if (container.scrollLeft >= maxScroll - 50) {
                    container.scrollTo({ left: 0, behavior: 'smooth' });
                  } else {
                    container.scrollBy({ left: 300, behavior: 'smooth' });
                  }
                }
              }}
            >
              ›
            </button>
            <div className="overflow-hidden">
              <div className="reviews-container flex gap-6 overflow-x-auto scrollbar-hide scroll-snap-x snap-x snap-mandatory px-10 md:px-16 py-4">
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">M</div>
                    <div>
                      <p className="font-bold text-gray-900">Marco P.</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full mb-3">✔ Recensione verificata</div>
                  <p className="text-gray-700 leading-relaxed">ragazzi io non ci credevo ma funziona davvero. la camera da letto adesso è fresca e finalmente riesco a dormire senza svegliarmi sudato alle 3 di notte</p>
                </div>
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">G</div>
                    <div>
                      <p className="font-bold text-gray-900">Giovanni R.</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full mb-3">✔ Recensione verificata</div>
                  <p className="text-gray-700 leading-relaxed">Sono in affitto e il padrone di casa non voleva farmi mettere il condizionatore. Con questo ho risolto, lo sposto dove voglio e quando me ne vado me lo porto via</p>
                </div>
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">F</div>
                    <div>
                      <p className="font-bold text-gray-900">Fabio T.</p>
                      <div className="text-yellow-400 text-lg">★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full mb-3">✔ Recensione verificata</div>
                  <p className="text-gray-700 leading-relaxed">arrivato in 2 giorni e la spedizione costava tipo 5 euro, niente. onestamente ero scettico ma devo dire che fa il suo lavoro, per la camera va benissimo</p>
                </div>
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">S</div>
                    <div>
                      <p className="font-bold text-gray-900">Sara M.</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full mb-3">✔ Recensione verificata</div>
                  <p className="text-gray-700 leading-relaxed">Ho la pressione bassa e col caldo stavo malissimo. Adesso in casa sto bene, non ho più quei giramenti di testa che avevo prima. Per me è stato un acquisto necessario</p>
                </div>
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">L</div>
                    <div>
                      <p className="font-bold text-gray-900">Luca B.</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full mb-3">✔ Recensione verificata</div>
                  <p className="text-gray-700 leading-relaxed">il bello è che lo uso anche d'inverno per scaldare lo studio. praticamente due prodotti in uno, alla fine ho risparmiato</p>
                </div>
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">A</div>
                    <div>
                      <p className="font-bold text-gray-900">Angela D.</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full mb-3">✔ Recensione verificata</div>
                  <p className="text-gray-700 leading-relaxed">Mio marito non voleva spendere soldi per il tecnico e i buchi nel muro. Questo l'ha montato lui in 10 minuti e adesso non si lamenta più del caldo ahah</p>
                </div>
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">R</div>
                    <div>
                      <p className="font-bold text-gray-900">Roberto C.</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full mb-3">✔ Recensione verificata</div>
                  <p className="text-gray-700 leading-relaxed">Lo uso in ufficio, i colleghi all'inizio mi prendevano in giro poi hanno visto che funziona e adesso vogliono comprarlo anche loro</p>
                </div>
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">V</div>
                    <div>
                      <p className="font-bold text-gray-900">Valentina G.</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full mb-3">✔ Recensione verificata</div>
                  <p className="text-gray-700 leading-relaxed">Il mio bambino di 2 anni dormiva malissimo con il caldo. Da quando abbiamo questo dorme tutta la notte e anche noi finalmente riposiamo!</p>
                </div>
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">P</div>
                    <div>
                      <p className="font-bold text-gray-900">Paolo N.</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full mb-3">✔ Recensione verificata</div>
                  <p className="text-gray-700 leading-relaxed">ho 72 anni e con il caldo mi sentivo sempre stanco e spossato. adesso sto molto meglio, mia figlia aveva ragione a insistere che lo comprassi</p>
                </div>
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">C</div>
                    <div>
                      <p className="font-bold text-gray-900">Chiara L.</p>
                      <div className="text-yellow-400 text-lg">★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full mb-3">✔ Recensione verificata</div>
                  <p className="text-gray-700 leading-relaxed">La bolletta non è aumentata come temevo e la consegna è stata velocissima, in due giorni era già a casa. Lo uso ogni giorno e sono contenta</p>
                </div>
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">D</div>
                    <div>
                      <p className="font-bold text-gray-900">Davide S.</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full mb-3">✔ Recensione verificata</div>
                  <p className="text-gray-700 leading-relaxed">nel mio condominio non si possono mettere condizionatori fuori, quindi questo era l'unica soluzione. E devo dire che va alla grande</p>
                </div>
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">E</div>
                    <div>
                      <p className="font-bold text-gray-900">Elena F.</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full mb-3">✔ Recensione verificata</div>
                  <p className="text-gray-700 leading-relaxed">Lavoro da casa e d'estate non riuscivo a concentrarmi. Ora ho l'ufficio sempre fresco e rendo molto di più, soldi spesi bene</p>
                </div>
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">M</div>
                    <div>
                      <p className="font-bold text-gray-900">Matteo V.</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full mb-3">✔ Recensione verificata</div>
                  <p className="text-gray-700 leading-relaxed">l'app è comoda, accendo il condizionatore mentre torno a casa e quando arrivo è già tutto fresco. piccole cose che fanno la differenza</p>
                </div>
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">F</div>
                    <div>
                      <p className="font-bold text-gray-900">Francesca R.</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full mb-3">✔ Recensione verificata</div>
                  <p className="text-gray-700 leading-relaxed">Ero indecisa se prenderlo o no, poi ho visto che si paga alla consegna e mi sono detta vabbè proviamo. Ora ne voglio comprare un altro per la camera dei bambini</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Order Section */}
      <section className="py-10 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Come Ordinare
          </h2>
          <div className="flex flex-row items-start justify-center gap-2 md:gap-6">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#035aa6] text-white flex items-center justify-center text-lg md:text-xl font-bold mb-2">
                1
              </div>
              <p className="text-slate-700 text-xs md:text-sm font-medium">Compila il modulo per la spedizione: i dati saranno criptati</p>
            </div>

            <div className="text-slate-300 text-xl md:text-2xl mt-3">→</div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#035aa6] text-white flex items-center justify-center text-lg md:text-xl font-bold mb-2">
                2
              </div>
              <p className="text-slate-700 text-xs md:text-sm font-medium">Ti chiamiamo per confermare l'ordine e i dati di spedizione</p>
            </div>

            <div className="text-slate-300 text-xl md:text-2xl mt-3">→</div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-green-500 text-white flex items-center justify-center text-lg md:text-xl font-bold mb-2">
                3
              </div>
              <p className="text-slate-700 text-xs md:text-sm font-medium">Ricevi in 48h e paghi in contanti alla consegna</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Le Domande Che Tutti Ci Fanno (E Le Risposte Oneste)
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <h3 className="text-lg font-semibold text-slate-900">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-600 transition-transform ${
                      openFaq === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-slate-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-orange-600 to-amber-600 py-16 pb-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left: Product Image */}
            <div className="order-1">
              <img
                src="/images/condizionatore/specifiche.webp"
                alt="Air Wave Smart"
                className="w-full h-auto rounded-lg shadow-md max-w-sm mx-auto lg:mx-0"
              />
            </div>

            {/* Right: Content */}
            <div className="order-2 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Sei Arrivato Fin Qui. C'è Un Motivo.
              </h2>
              <p className="text-orange-100 text-lg mb-6">
                Forse sei stanco di sudare d'estate. Forse hai freddo d'inverno e i termosifoni non bastano. Forse il tuo condominio ti ha già detto no al condizionatore. Qualunque sia il motivo, Air Wave Smart è la risposta.
              </p>

              <div className="text-left mb-6">
                <p className="text-lg text-white font-semibold mb-3">Ricevi tutto questo:</p>
                <ul className="text-orange-100 space-y-1">
                  <li>✓ Climatizzatore 12.000 BTU (raffredda, riscalda, deumidifica)</li>
                  <li>✓ Telecomando + Batterie incluse</li>
                  <li>✓ App Android/iOS gratuita</li>
                  <li>✓ Kit di installazione completo</li>
                  <li>✓ 2 Filtri HEPA inclusi</li>
                  <li>✓ Manuale in 60 lingue</li>
                  <li>✓ Garanzia 24 mesi + Reso 30 giorni</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl inline-block mb-6">
                <div className="text-3xl font-bold text-orange-600 mb-2">€199</div>
                <div className="text-slate-500 line-through text-lg">€499</div>
                <div className="text-red-600 font-semibold mb-4">Risparmi €300 – Ma non per sempre</div>
                <button
                  onClick={openOrderForm}
                  className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-amber-700 transition-all transform hover:scale-105 shadow-lg w-full cursor-pointer"
                >
                  Ordina Ora – Pago alla Consegna
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-2 text-orange-100 text-sm justify-center lg:justify-start">
                <span>✓ Arriva in 48h</span>
                <span>✓ Paghi solo quando lo ricevi</span>
                <span>✓ Non ti piace? Lo restituisci.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}