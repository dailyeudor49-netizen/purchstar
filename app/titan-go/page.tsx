"use client";

import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Immagini del carosello
const CAROUSEL_IMAGES = [
  '/images/titango/Lenovo-Legion-Go-review-header.webp',
  '/images/titango/lenovolegiongo-1.webp',
  '/images/titango/1283878.webp',
  '/images/titango/MW9rqycaoDzZ7FwAaxgy8R.webp',
];

/** 
 * CONFIGURAZIONE E COSTANTI
 */
const COLORS = {
  primary: '#3b82f6',
  secondary: '#8b5cf6',
  accent: '#ec4899',
  bg: '#050505',
};

const CHART_DATA = [
  { name: 'Cyberpunk 2077 (High)', TitanGo: 65, LegionGo: 58, SteamDeck: 32 },
  { name: 'Elden Ring (Ultra)', TitanGo: 58, LegionGo: 52, SteamDeck: 28 },
  { name: 'Starfield (Med)', TitanGo: 45, LegionGo: 40, SteamDeck: 22 },
  { name: 'Warzone (Comp)', TitanGo: 110, LegionGo: 95, SteamDeck: 45 },
];

const GAMES = [
  {
    title: "COD: WARZONE",
    description: "Annienta la lobby. Con la modalità FPS Sniper, il tuo controller diventa un mouse ottico. Reattività istantanea, zero ghosting per headshot millimetrici.",
    fps: "110+ FPS",
    advantage: "Vantaggio Tattico Sniper",
    color: "border-green-500/50"
  },
  {
    title: "FC 26",
    description: "Il calcio del futuro è a 144Hz. Fluidità totale in ogni dribbling. La potenza del Ryzen Z1 Extreme elimina ogni micro-scatto, rendendo l'HyperMotion reale.",
    fps: "144 FPS (Rock Solid)",
    advantage: "Zero Input Lag",
    color: "border-blue-500/50"
  },
  {
    title: "FORTNITE",
    description: "Costruisci ed edita alla velocità della luce. Prestazioni competitive da PC desktop professionale nel palmo della tua mano. Caricamenti istantanei.",
    fps: "160+ FPS (Perf Mode)",
    advantage: "Pro-Build Ready",
    color: "border-purple-500/50"
  },
  {
    title: "GTA V / VI READY",
    description: "Los Santos come non l'hai mai vista. Textures ultra e profondità di campo infinita. L'unica portatile con l'ecosistema pronto per la next-gen di Rockstar.",
    fps: "85+ FPS (Ultra Settings)",
    advantage: "Grafica Fotorealistica",
    color: "border-orange-500/50"
  }
];

/**
 * COMPONENTI INTERNI
 */

// Componente Carosello
const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-white/10">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {CAROUSEL_IMAGES.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`TitanGo Ultra ${i + 1}`}
              className="w-full flex-shrink-0 brightness-90"
            />
          ))}
        </div>
      </div>

      {/* Indicatori */}
      <div className="flex justify-center gap-2 mt-6">
        {CAROUSEL_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === currentIndex
                ? 'bg-blue-500 w-8'
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Frecce navigazione */}
      <button
        onClick={() => setCurrentIndex(prev => prev === 0 ? CAROUSEL_IMAGES.length - 1 : prev - 1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full backdrop-blur-sm transition-all"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => setCurrentIndex(prev => (prev + 1) % CAROUSEL_IMAGES.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full backdrop-blur-sm transition-all"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Badge info */}
      <div className="absolute -bottom-4 -right-4 bg-blue-600/20 backdrop-blur-xl p-4 rounded-xl border border-blue-500/50 text-left">
        <p className="text-blue-400 font-bold text-xs">8.8" PURESIGHT</p>
        <p className="text-[10px] text-gray-300">Risoluzione QHD+ 1600p</p>
      </div>
    </div>
  );
};

const ComparisonChart = () => (
  <div className="w-full h-80 bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10">
    <h3 className="text-xl font-bold mb-4 text-center tracking-tighter uppercase" style={{ fontFamily: 'var(--font-orbitron)' }}>
      DOMINIO FPS: TITANGO VS IL MONDO
    </h3>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={CHART_DATA}>
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis dataKey="name" stroke="#888" fontSize={10} />
        <YAxis stroke="#888" />
        <Tooltip 
          contentStyle={{ backgroundColor: '#111', border: '1px solid #444', borderRadius: '8px' }}
          itemStyle={{ color: '#fff' }}
        />
        <Legend />
        <Bar dataKey="TitanGo" fill="#3b82f6" radius={[4, 4, 0, 0]} name="TitanGo Ultra" />
        <Bar dataKey="LegionGo" fill="#a78bfa" radius={[4, 4, 0, 0]} name="Lenovo Legion Go" />
        <Bar dataKey="SteamDeck" fill="#444" radius={[4, 4, 0, 0]} name="Steam Deck OLED" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      // Always use direct process.env.API_KEY for GoogleGenAI initialization as per guidelines.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const history = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...history, { role: 'user', parts: [{ text: userMsg }] }],
        config: {
          systemInstruction: `Sei un esperto di marketing aggressivo per la console TitanGo Ultra. 
          Il tuo obiettivo è convincere l'utente che TitanGo Ultra è la scelta definitiva, superiore a Lenovo Legion Go e ROG Ally, 
          ma offerta a un prezzo ridicolo (€399 invece di €899) perché stiamo svuotando il magazzino.
          Usa un tono eccitato, persuasivo, quasi esasperato sulle caratteristiche (8.8" QHD+, 144Hz, Ryzen Z1 Extreme).
          Se l'utente è indeciso, usa la scarsità (solo 3 pezzi rimasti). 
          Rispondi in italiano in modo breve e d'impatto.`,
        }
      });

      // Directly access .text property from response as per guidelines.
      setMessages(prev => [...prev, { role: 'ai', content: response.text || "La TitanGo Ultra è potenza pura. Non fartela scappare!" }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'ai', content: "Ascolta, la TitanGo Ultra sta andando a ruba. Vuoi dominare il gaming o restare a guardare?" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.6)] transition-all hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        </button>
      ) : (
        <div className="w-80 md:w-96 bg-[#0a0a0a] rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[500px] border border-blue-500/30 backdrop-blur-xl">
          <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 flex justify-between items-center">
            <span className="font-bold tracking-tighter">TITANGO AI ADVISOR</span>
            <button onClick={() => setIsOpen(false)}><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
          </div>
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-xl max-w-[85%] ${m.role === 'user' ? 'bg-blue-600' : 'bg-white/5 border border-white/10'}`}>{m.content}</div>
              </div>
            ))}
            {loading && <div className="animate-pulse bg-white/5 p-3 rounded-xl w-12">...</div>}
          </div>
          <div className="p-4 border-t border-white/10 flex gap-2">
            <input 
              value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500" placeholder="Chiedimi della potenza..."
            />
            <button onClick={handleSend} className="bg-blue-600 p-2 rounded-lg"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg></button>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * LANDING PAGE PRINCIPALE
 */
// Tutte le recensioni
const ALL_REVIEWS = [
  // Batch 1 (iniziale)
  { name: "Marco B.", verified: true, stars: 5, date: "12 febbraio 2026", title: "Semplicemente PAZZESCA", review: "Sono un gamer da oltre 20 anni e questa console mi ha lasciato senza parole. Ho giocato a Cyberpunk 2077 in treno a 65 FPS stabili con dettagli alti. Il display è incredibile, i colori sono vividi e la fluidità a 144Hz si sente eccome. Il prezzo a cui l'ho pagata è assurdo, vale almeno il doppio.", helpful: 234 },
  { name: "Alessia R.", verified: true, stars: 5, date: "10 febbraio 2026", title: "Addio Steam Deck", review: "Ho venduto il mio Steam Deck OLED dopo una settimana con la TitanGo. Non c'è paragone: display più grande, prestazioni migliori, e la modalità FPS con il controller staccabile è geniale per gli sparatutto. Finalmente posso giocare a Valorant decentemente in mobilità!", helpful: 189 },
  { name: "Giuseppe T.", verified: true, stars: 5, date: "8 febbraio 2026", title: "Costruzione premium, prezzo ridicolo", review: "La qualità costruttiva è eccezionale. I materiali sono premium, i controller hanno un grip perfetto e il sistema di raffreddamento è silenziosissimo anche sotto stress. Ho fatto sessioni di 4 ore su Elden Ring senza mai sentire calore fastidioso. Consigliatissima.", helpful: 156 },
  { name: "Francesca M.", verified: true, stars: 4, date: "6 febbraio 2026", title: "Ottima ma batteria migliorabile", review: "La console è fantastica, prestazioni da PC gaming vero. Unico neo: la batteria dura circa 2-3 ore con giochi pesanti. Per il resto è perfetta. Il display QHD+ è spettacolare e Windows 11 gira fluido. Per il prezzo pagato è comunque un affare.", helpful: 98 },
  { name: "Luca P.", verified: true, stars: 5, date: "4 febbraio 2026", title: "WARZONE A 110 FPS. IN. MANO.", review: "Non ci credo ancora. Gioco a Warzone competitivo e faccio partite ranked dal divano o in pausa pranzo. La modalità FPS Sniper con il controller destro usato come mouse è GAME CHANGER. Ho migliorato il mio K/D da 1.2 a 1.8 in due settimane. Assurdo.", helpful: 312 },
  { name: "Simone C.", verified: true, stars: 5, date: "2 febbraio 2026", title: "Meglio della Legion Go originale", review: "Ho avuto la Lenovo Legion Go e l'ho restituita. Questa TitanGo Ultra ha lo stesso hardware ma costa la metà e ha il software ottimizzato meglio. Zero crash in 50 ore di utilizzo, Game Pass funziona perfettamente, emulazione PSP/PS2 impeccabile.", helpful: 145 },
  { name: "Elena V.", verified: true, stars: 5, date: "31 gennaio 2026", title: "Regalo perfetto per mio figlio", review: "L'ho regalata a mio figlio per il compleanno. Non si stacca più. Gioca a Fortnite, Minecraft, e anche ai giochi del Game Pass. La qualità è ottima, sembra un prodotto da 800€. Consegna velocissima e imballaggio perfetto.", helpful: 87 },
  { name: "Roberto D.", verified: true, stars: 5, date: "28 gennaio 2026", title: "Per viaggiatori: OBBLIGATORIA", review: "Viaggio molto per lavoro e questa console ha cambiato le mie serate in hotel. Red Dead Redemption 2 in 8.8 pollici è un'esperienza cinematografica. Ho completato anche Baldur's Gate 3 interamente su questa macchina. Batteria da migliorare ma col caricatore rapido non è un problema.", helpful: 203 },
  // Batch 2 (primo click)
  { name: "Davide L.", verified: true, stars: 5, date: "25 gennaio 2026", title: "Il futuro del gaming portatile", review: "Dopo anni di Nintendo Switch, questa è un'altra dimensione. Grafica PC reale, non versioni castrate. Ho giocato a Hogwarts Legacy con dettagli alti e sono rimasto a bocca aperta. Il prezzo poi è folle, pensavo fosse una truffa ma è tutto vero!", helpful: 178 },
  { name: "Chiara N.", verified: true, stars: 5, date: "23 gennaio 2026", title: "Finalmente gaming serio in mobilità", review: "Sono una sviluppatrice e uso questa console anche per testare giochi indie. La potenza c'è tutta, Windows 11 permette di fare qualsiasi cosa. Ho anche collegato monitor esterno e tastiera per lavorare. Versatilità pazzesca.", helpful: 134 },
  { name: "Antonio G.", verified: true, stars: 4, date: "21 gennaio 2026", title: "Quasi perfetta, qualche bug software", review: "L'hardware è bestiale, nulla da dire. Ho avuto qualche problema con i driver AMD all'inizio ma dopo gli aggiornamenti tutto risolto. Ora gira tutto liscio. Consiglio di aggiornare subito appena arriva. Per il resto, top assoluto.", helpful: 92 },
  { name: "Sara B.", verified: true, stars: 5, date: "19 gennaio 2026", title: "Mio marito non la molla più", review: "Gliel'ho regalata per Natale e da allora è incollato. Dice che è meglio del suo PC fisso per comodità. La usa sul divano, a letto, in bagno (sì, anche lì). Qualità eccezionale, sono contenta dell'acquisto.", helpful: 267 },
  { name: "Paolo F.", verified: true, stars: 5, date: "17 gennaio 2026", title: "CS2 competitivo OVUNQUE", review: "Gioco a Counter-Strike 2 a livello semi-pro e questa console mi permette di allenarmi ovunque. La modalità FPS è una rivoluzione, finalmente precisione da mouse su una portatile. Ho fatto ace al primo match. Incredibile.", helpful: 198 },
  { name: "Valentina S.", verified: true, stars: 5, date: "15 gennaio 2026", title: "Streaming su Twitch dalla console!", review: "Sono una piccola streamer e questa console mi ha aperto un mondo. Posso streamare direttamente senza PC, la qualità è ottima e il chat overlay funziona perfettamente. I miei viewer sono rimasti impressionati dalla qualità.", helpful: 156 },
  { name: "Matteo R.", verified: true, stars: 5, date: "13 gennaio 2026", title: "Emulazione PERFETTA", review: "Ho testato emulatori di tutto: PS2, GameCube, Wii, PSP, 3DS... tutto gira alla perfezione. Ho la mia collezione retro sempre con me. Zelda Wind Waker in 4K su questa bestia è un'esperienza religiosa.", helpful: 289 },
  { name: "Giulia C.", verified: true, stars: 4, date: "11 gennaio 2026", title: "Ottima ma pesante per sessioni lunghe", review: "La console è fantastica ma dopo 2 ore le mani si stancano un po'. Ho comprato un grip aggiuntivo e ora va molto meglio. Per il resto nulla da dire, prestazioni pazzesche e display stupendo.", helpful: 76 },
  // Batch 3 (secondo click)
  { name: "Andrea M.", verified: true, stars: 5, date: "9 gennaio 2026", title: "Addio ROG Ally, benvenuta TitanGo", review: "Avevo la ROG Ally e l'ho venduta dopo aver provato questa. Display più grande, controller migliori, e soprattutto COSTA MENO. Non capisco come facciano a venderla a questo prezzo, è quasi sospetto (in senso buono).", helpful: 234 },
  { name: "Lorenzo P.", verified: true, stars: 5, date: "7 gennaio 2026", title: "Il regalo che mi sono fatto", review: "Mi sono regalato questa console dopo un anno di lavoro intenso. Miglior acquisto della mia vita. Gioco a tutto: Starfield, Diablo 4, FC24... tutto gira benissimo. La porto anche in ufficio per la pausa pranzo.", helpful: 167 },
  { name: "Federica T.", verified: true, stars: 5, date: "5 gennaio 2026", title: "Perfetta per chi viaggia spesso", review: "Sono hostess e passo molto tempo in hotel. Questa console è diventata la mia compagna di viaggio. Leggerissima nello zaino, batteria sufficiente per i voli, e prestazioni da PC gaming. Non potrei essere più felice.", helpful: 198 },
  { name: "Riccardo V.", verified: true, stars: 5, date: "3 gennaio 2026", title: "Il display è ASSURDO", review: "144Hz, QHD+, colori perfetti. Questo display da solo vale metà del prezzo. Ho confrontato con Steam Deck OLED e il TitanGo vince su tutto: dimensioni, risoluzione, refresh rate. E costa pure meno!", helpful: 223 },
  { name: "Martina D.", verified: true, stars: 4, date: "1 gennaio 2026", title: "Buona ma servizio clienti da migliorare", review: "La console è ottima, 5 stelle meritate. Tolgo una stella solo perché ho avuto un problema con la spedizione e il supporto ha risposto dopo 3 giorni. Alla fine tutto risolto, ma potrebbero essere più veloci.", helpful: 54 },
  { name: "Nicola B.", verified: true, stars: 5, date: "30 dicembre 2025", title: "GTA 6 Ready? ASSOLUTAMENTE SÌ", review: "Ho preso questa console pensando al futuro. Con questo hardware sono sicuro che girerà anche GTA 6 quando uscirà. Intanto mi godo GTA 5 a dettagli ultra e RDR2 in tutta la sua gloria. Investimento azzeccato.", helpful: 312 },
  { name: "Alessandra L.", verified: true, stars: 5, date: "28 dicembre 2025", title: "Mia figlia la adora", review: "L'ho comprata per mia figlia di 16 anni, è al settimo cielo. Gioca a Fortnite, Valorant e tutti i giochi che prima poteva fare solo sul PC di famiglia. Ora ha la sua postazione portatile. Soldi ben spesi.", helpful: 145 },
  { name: "Tommaso G.", verified: true, stars: 5, date: "26 dicembre 2025", title: "Natale perfetto grazie a voi", review: "Ordinata il 20 dicembre, arrivata il 23. Giusto in tempo per Natale! La qualità è impressionante, mio fratello è impazzito quando l'ha scartata. Grazie per la spedizione velocissima e il packaging curato.", helpful: 178 },
];

export default function LandingPage() {
  const [timeLeft, setTimeLeft] = useState(1140); // 19 mins
  const [stock, setStock] = useState(3);
  const [reviewsToShow, setReviewsToShow] = useState(8); // Mostra 8 recensioni inizialmente

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(p => p > 0 ? p - 1 : 0), 1000);
    const s = setInterval(() => setStock(p => p > 1 && Math.random() > 0.9 ? p - 1 : p), 20000);
    return () => { clearInterval(t); clearInterval(s); };
  }, []);

  const fmt = (s: number) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-blue-500 selection:text-white font-sans overflow-x-hidden">
      
      {/* Dynamic Style Injection for Orbitron */}
      {/* Fix: Using dangerouslySetInnerHTML to avoid property 'jsx' does not exist error on standard style tag. */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
        .font-orbitron { font-family: 'Orbitron', sans-serif; }
        .text-gradient {
          background: linear-gradient(to right, #60a5fa, #a78bfa, #f472b6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
      ` }} />

      {/* Scarcity Banner */}
      <div className="bg-red-600 text-white py-2 px-4 text-center text-xs md:text-sm font-black animate-pulse sticky top-0 z-[90]">
        URGENTE: SOLO {stock} UNITÀ DISPONIBILI A PREZZO DI FABBRICA (€399). L'OFFERTA SCADE TRA {fmt(timeLeft)}
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-40 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[140px]"></div>
        </div>

        <div className="inline-block px-4 py-1 rounded-full border border-blue-500/50 bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-8">
          Ingegneria Estrema Senza Compromessi
        </div>

        <h1 className="text-6xl md:text-9xl font-orbitron font-black leading-[0.9] mb-8 tracking-tighter">
          NON GIOCARE.<br />
          <span className="text-gradient">DOMINA.</span>
        </h1>
        
        <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mb-12 leading-relaxed">
          TitanGo Ultra: Display 8.8" QHD+ a 144Hz, Ryzen Z1 Extreme e modalità FPS Sniper integrata. 
          <span className="text-white font-bold italic"> La potenza di un PC da 2000€ racchiusa in 800 grammi di pura rabbia tecnologica.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <button onClick={() => document.getElementById('pricing')?.scrollIntoView({behavior:'smooth'})} className="px-14 py-6 bg-blue-600 hover:bg-blue-500 rounded-full font-orbitron font-black text-xl shadow-[0_0_40px_rgba(37,99,235,0.5)] transition-all hover:scale-105">
            PRENDILA ORA - €500 SCONTO
          </button>
        </div>

        <div className="mt-20 relative w-full">
          <HeroCarousel />
        </div>
      </section>

      {/* Gaming Arsenal */}
      <section className="py-32 px-6 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-7xl font-orbitron font-black mb-6">GIOCA AI TITOLI PC<br /><span className="text-blue-500 underline decoration-blue-500/30">VERI.</span></h2>
            <p className="text-xl text-gray-400 italic">Dimentica le versioni mobile castrate. Qui hai il software originale a dettagli ULTRA.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {GAMES.map((game, i) => (
              <div key={i} className={`bg-white/5 backdrop-blur-sm p-8 rounded-[2.5rem] border-t-4 ${game.color} transition-all hover:-translate-y-3 hover:bg-white/10 group`}>
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-orbitron font-black leading-none max-w-[70%]">{game.title}</h3>
                  <span className="bg-blue-600/20 text-blue-400 text-[10px] px-2 py-1 rounded font-bold">{game.fps}</span>
                </div>
                <p className="text-gray-400 text-sm mb-10 leading-relaxed font-light">
                  {game.description}
                </p>
                <div className="flex items-center gap-2 text-blue-500 font-black text-[10px] uppercase tracking-widest">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
                  {game.advantage}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-20 p-8 border-2 border-dashed border-white/10 rounded-3xl text-center">
            <p className="text-gray-500 font-orbitron text-xs tracking-[0.4em]">COMPATIBILITÀ TOTALE CON STEAM, EPIC, GAME PASS E BATTLE.NET</p>
          </div>
        </div>
      </section>

      {/* Comparison Benchmark */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-orbitron font-bold mb-8">DISTRUGGI LA CONCORRENZA</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Mentre gli altri si accontentano di display a 60Hz o processori depotenziati per risparmiare sulla batteria, la TitanGo Ultra è stata progettata per un solo scopo: <span className="text-white font-bold">la vittoria assoluta.</span>
            </p>
            <div className="space-y-4">
              {["Frame rate superiore del 25% rispetto a Legion Go", "Raffreddamento ColdFront 4.0 (Zero Throttling)", "Display più grande del 20% rispetto a Steam Deck"].map((t, i) => (
                <div key={i} className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                  <span className="text-sm font-semibold text-gray-200">{t}</span>
                </div>
              ))}
            </div>
          </div>
          <ComparisonChart />
        </div>
      </section>

      {/* FPS Sniper Mode Detail */}
      <section className="py-32 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 relative">
             <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full"></div>
             <img src="/images/titango/lenovolegiongo-1.webp" alt="Sniper Mode" className="rounded-3xl border border-white/20 shadow-2xl" />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-orbitron font-black mb-8 leading-none">LA MODALITÀ FPS<br /><span className="text-blue-500">È UN CHEAT LEGALE.</span></h2>
            <p className="text-lg text-gray-400 mb-8">
              Stanca dei controller analogici imprecisi negli sparatutto? La TitanGo Ultra ti permette di staccare il controller destro e usarlo come un <span className="text-white font-bold">vero mouse ottico verticale</span>. Precisione pixel-perfect su Warzone e CS:GO.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-blue-400 font-black text-xl mb-1 italic">16K DPI</p>
                <p className="text-[10px] text-gray-500 uppercase">Sensore Ottico</p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-blue-400 font-black text-xl mb-1 italic">0.1ms</p>
                <p className="text-[10px] text-gray-500 uppercase">Latenza Click</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / CTA */}
      <section id="pricing" className="py-40 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-8xl font-orbitron font-black mb-12 italic tracking-tighter">PREZZO <span className="text-red-600 underline decoration-wavy">SCANDALOSO.</span></h2>
          
          <div className="relative bg-gradient-to-b from-blue-600/20 to-transparent p-[2px] rounded-[3rem]">
            <div className="bg-[#0a0a0a] rounded-[3rem] p-12 md:p-20">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white font-black px-10 py-2 rounded-full text-xs tracking-[0.3em] shadow-xl animate-bounce">
                OFFERTA LIMITATA AFFILIAZIONE
              </div>

              <div className="flex flex-col items-center mb-16">
                <span className="text-3xl text-gray-600 line-through mb-2">€ 899,00</span>
                <span className="text-8xl md:text-[10rem] font-orbitron font-black leading-none text-white tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  € 399
                </span>
                <span className="text-blue-400 font-bold mt-4 tracking-widest uppercase">Pagabile in 3 rate da 133€ con Klarna</span>
              </div>

              <ul className="grid md:grid-cols-2 gap-6 text-left mb-16 max-w-2xl mx-auto">
                {["Processore Ryzen Z1 Extreme", "512GB SSD NVMe Gen4", "16GB RAM LPDDR5X", "Schermo 144Hz 2.5K", "Windows 11 Home Pro", "Case Premium Inclusa"].map((li, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,1)]"></div>
                    {li}
                  </li>
                ))}
              </ul>

              {/* Order Form - Full Width Mobile */}
              <div className="bg-white/5 rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10 mb-8 w-full max-w-full mx-auto">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src="/images/titango/lenovolegiongo-1.webp"
                    alt="TitanGo Ultra"
                    className="w-20 h-20 object-cover rounded-xl border border-white/20 flex-shrink-0"
                  />
                  <div className="text-left">
                    <p className="font-bold text-white text-lg">TitanGo Ultra</p>
                    <p className="text-xs text-gray-400">8.8" QHD+ | 144Hz | Ryzen Z1</p>
                    <p className="text-blue-500 font-black text-xl">€399 <span className="text-gray-500 line-through text-sm font-normal">€899</span></p>
                  </div>
                </div>

                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert('Ordine ricevuto! Ti contatteremo a breve per la conferma.');
                  }}
                >
                  <input
                    type="text"
                    required
                    placeholder="Nome e Cognome *"
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all text-base"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Numero di Telefono *"
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all text-base"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Indirizzo Completo (Via, Città, CAP) *"
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all text-base"
                  />
                  <button
                    type="submit"
                    className="w-full py-5 bg-blue-600 hover:bg-blue-500 rounded-xl font-orbitron font-black text-lg sm:text-xl shadow-[0_10px_40px_rgba(37,99,235,0.4)] transition-all hover:scale-[1.02] active:scale-95"
                  >
                    ORDINA ORA - PAGO ALLA CONSEGNA
                  </button>
                </form>
              </div>

              <p className="text-gray-500 text-xs">Garanzia Italiana 24 Mesi | Reso Gratuito 30 Giorni | Spedizione Lampo 24h</p>
            </div>
          </div>
        </div>
      </section>

      {/* Amazon-Style Reviews Section */}
      <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="mb-10">
          {/* Header con titolo e contatore */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h2 className="text-3xl md:text-4xl font-orbitron font-black text-center sm:text-left">Recensioni dei Clienti</h2>
            <div className="flex items-center justify-center sm:justify-end gap-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-5 py-3 rounded-xl border border-blue-500/30">
              <div className="flex gap-1">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className={`w-5 h-5 ${i <= 4 ? 'text-yellow-500' : 'text-yellow-500/50'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-white font-black text-xl">4.8</span>
              <span className="text-gray-400">|</span>
              <span className="text-blue-400 font-bold">1.247 recensioni</span>
            </div>
          </div>

          {/* Rating Summary */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10 p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Rating grande */}
              <div className="text-center md:border-r md:border-white/10 md:pr-8">
                <div className="text-7xl font-black text-white mb-2 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">4.8</div>
                <div className="flex justify-center gap-1 mb-3">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} className={`w-6 h-6 ${i <= 4 ? 'text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]' : 'text-yellow-500/40'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-400 text-sm">Valutazione media su 5</p>
              </div>

              {/* Barre percentuali */}
              <div className="space-y-3">
                {[
                  { stars: 5, percent: 78 },
                  { stars: 4, percent: 15 },
                  { stars: 3, percent: 5 },
                  { stars: 2, percent: 1 },
                  { stars: 1, percent: 1 },
                ].map(({ stars, percent }) => (
                  <div key={stars} className="flex items-center gap-3 text-sm">
                    <span className="text-white font-medium w-14 flex items-center gap-1">
                      {stars} <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    </span>
                    <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full transition-all" style={{ width: `${percent}%` }} />
                    </div>
                    <span className="text-blue-400 font-bold w-12 text-right">{percent}%</span>
                  </div>
                ))}
              </div>

              {/* Statistiche */}
              <div className="text-center md:border-l md:border-white/10 md:pl-8">
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-center gap-2 text-green-500 mb-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-bold text-sm">VERIFICATO</span>
                  </div>
                  <p className="text-xs text-gray-400">Tutte le recensioni sono di acquisti verificati</p>
                </div>
                <div className="text-4xl font-black text-white mb-1">1.247</div>
                <p className="text-gray-400 text-sm">recensioni totali</p>
                <p className="text-blue-400 text-xs mt-2 font-medium">93% consiglia questo prodotto</p>
              </div>
            </div>
          </div>
        </div>

        {/* Individual Reviews */}
        <div className="space-y-6">
          {ALL_REVIEWS.slice(0, reviewsToShow).map((review, i) => (
            <div key={i} className="bg-white/5 rounded-2xl p-5 sm:p-6 border border-white/10 hover:border-white/20 transition-all">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-sm">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{review.name}</p>
                  {review.verified && (
                    <p className="text-xs text-green-500 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Acquisto verificato
                    </p>
                  )}
                </div>
                <div className="ml-auto text-right">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(s => (
                      <svg key={s} className={`w-4 h-4 ${s <= review.stars ? 'text-yellow-500' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{review.date}</p>
                </div>
              </div>

              <h4 className="font-bold text-white mb-2">{review.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{review.review}</p>

              <div className="flex items-center gap-4 text-xs text-gray-500">
                <button className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  Utile ({review.helpful})
                </button>
                <span>|</span>
                <button className="hover:text-blue-400 transition-colors">Segnala</button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {reviewsToShow < ALL_REVIEWS.length && (
          <div className="text-center mt-10">
            <button
              onClick={() => setReviewsToShow(prev => Math.min(prev + 8, ALL_REVIEWS.length))}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl text-sm font-bold transition-all shadow-lg hover:shadow-blue-500/25 hover:scale-105"
            >
              Carica altre {Math.min(8, ALL_REVIEWS.length - reviewsToShow)} recensioni
              <span className="ml-2 text-white/70">({ALL_REVIEWS.length - reviewsToShow} rimanenti)</span>
            </button>
          </div>
        )}
        {reviewsToShow >= ALL_REVIEWS.length && (
          <div className="text-center mt-10">
            <p className="text-gray-500 text-sm">Hai visualizzato tutte le {ALL_REVIEWS.length} recensioni</p>
          </div>
        )}
      </section>

{/* Footer */}
      <footer className="py-20 px-6 text-center border-t border-white/5 text-gray-600">
        <p className="text-xs mb-4">TitanGo Ultra è un prodotto distribuito tramite affiliazione esclusiva. Stock limitato.</p>
        <p className="text-[10px] max-w-3xl mx-auto leading-loose opacity-50 uppercase tracking-widest font-bold">
          Questo sito non fa parte del sito Web di Facebook o Facebook Inc. Inoltre, questo sito NON è approvato da Facebook in alcun modo. FACEBOOK è un marchio registrato di FACEBOOK, Inc.
        </p>
      </footer>

      {/* AI Sales Assistant */}
      <AIAssistant />
    </main>
  );
}
