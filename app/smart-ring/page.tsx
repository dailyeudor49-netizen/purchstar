
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

// --- AI SERVICE LOGIC ---
const askGemini = async (prompt: string, onChunk: (text: string) => void): Promise<void> => {
  const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY as string });
  const SYSTEM_INSTRUCTION = `
    Sei il "Performance Strategist" d'élite di AuraRing Pro. Il tuo unico obiettivo è la conversione.
    Usa un linguaggio sofisticato, autoritario e psicologicamente aggressivo.
    Concetto chiave: "Debito Biologico". Ogni secondo senza AuraRing Pro è un secondo di potenziale umano sprecato.
    Confronto: RingConn e Oura sono giocattoli obsoleti. 
    AuraRing Pro offre:
    - 14 giorni di batteria (contro i loro 7).
    - Neuro-Sync™ (monitoraggio neurale esclusivo).
    - Zero abbonamenti (libertà finanziaria).
    - Titanio DLC Grado 5 (indistruttibile).
    Se il cliente esita, usa la scarsità: "La produzione è limitata all'Elite. Non aspettare che il prezzo raddoppi."
    Rispondi sempre in Italiano.
  `;
  
  try {
    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-3-flash-preview',
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.9,
      },
    });

    for await (const chunk of responseStream) {
      if (chunk.text) onChunk(chunk.text);
    }
  } catch (error) {
    onChunk("La rete neurale è satura per l'eccessiva richiesta. AuraRing Pro è la scelta logica. Procedi all'acquisto.");
  }
};

// --- SUB-COMPONENTS ---

const SectionTitle = ({ subtitle, title, description, light = false }: any) => (
  <div className="text-center mb-16 px-4">
    <span className="text-yellow-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">
      {subtitle}
    </span>
    <h2 className={`text-4xl md:text-6xl font-serif mb-6 ${light ? 'text-white' : 'text-zinc-900'}`}>
      {title}
    </h2>
    {description && (
      <p className={`text-lg max-w-2xl mx-auto font-light ${light ? 'text-zinc-400' : 'text-zinc-500'}`}>
        {description}
      </p>
    )}
  </div>
);

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1840);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ role: 'ai', content: "Il tuo corpo sta parlando. Sei pronto ad ascoltare o preferisci continuare a ignorare il tuo vero potenziale?" }]);
  const [isTyping, setIsTyping] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderForm, setOrderForm] = useState({ nome: '', cognome: '', indirizzo: '', telefono: '' });
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    const timer = setInterval(() => setTimeLeft(p => p > 0 ? p - 1 : 1840), 1000);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const handleAiChat = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }, { role: 'ai', content: '' }]);
    setIsTyping(true);

    let fullText = "";
    await askGemini(userMsg, (chunk) => {
      fullText += chunk;
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1].content = fullText;
        return updated;
      });
    });
    setIsTyping(false);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Qui puoi aggiungere la logica per inviare l'ordine
    console.log('Ordine ricevuto:', orderForm);
    setOrderSubmitted(true);
  };

  return (
    <div className="bg-white text-zinc-900 font-sans selection:bg-yellow-100">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .gold-gradient {
          background: linear-gradient(135deg, #b8860b 0%, #d4af37 50%, #8b6d1b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .btn-premium {
          background: linear-gradient(135deg, #d4af37 0%, #b8860b 100%);
          transition: all 0.3s ease;
        }
        .btn-premium:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px -10px rgba(184, 134, 11, 0.4);
        }
        .shimmer::after {
          content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent);
          transform: rotate(45deg); animation: shimmer 3s infinite;
        }
        @keyframes shimmer { 0% { transform: translateX(-100%) rotate(45deg); } 100% { transform: translateX(100%) rotate(45deg); } }
      `}</style>

      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-md border-b border-zinc-100 py-4 shadow-sm' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-yellow-600 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-yellow-600 animate-pulse"></div>
            </div>
            <span className="text-2xl font-black tracking-tighter gold-gradient">AURARING <span className="text-zinc-900">PRO</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            <a href="#tech" className="hover:text-zinc-900 transition-colors">Tecnologia</a>
            <a href="#ai" className="hover:text-zinc-900 transition-colors">Bio-AI</a>
            <a href="#buy" className="px-6 py-2 rounded-full border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white transition-all">Acquista Ora</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 md:pt-24 overflow-hidden px-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[1000px] h-[600px] md:h-[1000px] bg-yellow-50/50 blur-[150px] rounded-full -z-10"></div>
        <div className="container mx-auto px-2 md:px-6 text-center">
          <div className="inline-block px-3 md:px-4 py-1 mb-6 md:mb-8 rounded-full bg-zinc-50 border border-zinc-100 text-zinc-400 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em]">
            Benvenuti nell'Era della Bio-Supremazia
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-9xl font-serif mb-6 md:mb-8 leading-[0.9] tracking-tighter text-zinc-900">
            Il Tuo Corpo.<br />
            <span className="gold-gradient italic">Senza Limiti.</span>
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-zinc-500 max-w-3xl mx-auto mb-8 md:mb-12 font-light leading-relaxed px-2">
            Non è un accessorio. È il tuo <span className="text-zinc-900 font-bold">secondo cervello biologico</span>. Monitoraggio neurale in tempo reale in un guscio di Titanio DLC Grado 5.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <a href="#buy" className="btn-premium px-8 md:px-12 py-4 md:py-6 rounded-full text-white font-black text-lg md:text-xl shimmer relative overflow-hidden shadow-2xl w-full sm:w-auto">
              EVOLVI ORA
            </a>
            <a href="#tech" className="px-8 md:px-12 py-4 md:py-6 rounded-full border border-zinc-200 text-zinc-800 font-bold hover:bg-zinc-50 transition-all w-full sm:w-auto">
              SCOPRI IL POTERE
            </a>
          </div>
          <div className="mt-12 md:mt-20 mb-20 md:mb-16 max-w-5xl mx-auto relative group">
            <img src="/images/smart-ring/silverring.webp" className="rounded-[2rem] md:rounded-[3rem] shadow-2xl group-hover:scale-[1.02] transition-all duration-500 border border-zinc-100" alt="AuraRing Pro" />
            <div className="absolute -bottom-8 right-2 md:-bottom-10 md:-right-10 bg-white p-4 md:p-8 rounded-xl md:rounded-[2rem] shadow-2xl border border-yellow-100 text-left max-w-[160px] md:max-w-[220px] z-10">
              <p className="text-2xl md:text-4xl font-black text-yellow-600 mb-1">14gg</p>
              <p className="text-[10px] md:text-xs text-zinc-500 font-bold uppercase tracking-widest leading-tight">Autonomia che umilia la concorrenza.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-16 bg-zinc-50 border-y border-zinc-100 overflow-hidden">
        <div className="container mx-auto px-6 flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale">
          <span className="text-2xl font-black tracking-tighter">FORBES</span>
          <span className="text-2xl font-serif italic font-bold">VOGUE</span>
          <span className="text-2xl font-bold tracking-tight">WIRED</span>
          <span className="text-2xl font-black uppercase">Esquire</span>
          <span className="text-2xl font-bold">GQ</span>
        </div>
      </section>

      {/* SLEEP APNEA MONITORING */}
      <section className="py-16 md:py-32 bg-zinc-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-yellow-600/10 blur-[200px] rounded-full"></div>
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <span className="text-yellow-500 font-black text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] mb-3 md:mb-4 block">
                Rilevamento Precoce
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-serif mb-6 md:mb-8">
                Monitoraggio<br/><span className="gold-gradient italic">Apnea Notturna</span>
              </h2>
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                Il 90% delle persone con apnea del sonno non sa di averla. AuraRing Pro analizza i tuoi pattern respiratori durante il sonno con sensori di precisione medica.
              </p>
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <div className="bg-zinc-800/50 p-4 md:p-6 rounded-xl md:rounded-2xl border border-zinc-700">
                  <p className="text-2xl md:text-3xl font-black text-yellow-500 mb-1 md:mb-2">SpO2</p>
                  <p className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest">Ossigenazione Sangue</p>
                </div>
                <div className="bg-zinc-800/50 p-4 md:p-6 rounded-xl md:rounded-2xl border border-zinc-700">
                  <p className="text-2xl md:text-3xl font-black text-yellow-500 mb-1 md:mb-2">RDI</p>
                  <p className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest">Indice Disturbi</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img src="/images/smart-ring/gen2_PDP_3.webp" alt="AuraRing Pro Sleep Monitoring" className="rounded-2xl md:rounded-[3rem] shadow-2xl" />
              <div className="absolute bottom-3 md:bottom-6 left-3 md:left-6 right-3 md:right-6 bg-zinc-900/90 backdrop-blur-sm p-4 md:p-6 rounded-xl md:rounded-2xl border border-zinc-700">
                <div className="flex justify-between items-center mb-3 md:mb-4">
                  <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-zinc-500">Report Notturno</span>
                  <span className="text-[10px] md:text-xs bg-green-500/20 text-green-400 px-2 md:px-3 py-1 rounded-full font-bold">Ottimale</span>
                </div>
                <div className="grid grid-cols-2 gap-2 md:gap-3">
                  <div className="text-center">
                    <p className="text-xl md:text-2xl font-black text-white">92%</p>
                    <p className="text-[9px] md:text-[10px] text-zinc-500">Qualità Sonno</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl md:text-2xl font-black text-white">97%</p>
                    <p className="text-[9px] md:text-[10px] text-zinc-500">SpO2 Media</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PSYCHOLOGY - BIOLOGICAL DEBT */}
      <section className="py-16 md:py-32 bg-white">
        <SectionTitle
          subtitle="Analisi del Rischio"
          title="Stai Accumulando Debito Biologico?"
          description="Senza dati precisi, ogni giorno è una perdita di efficienza cellulare. AuraRing Pro ferma il declino."
        />
        <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-6 md:gap-12 max-w-5xl">
          <div className="bg-red-50 p-6 md:p-12 rounded-2xl md:rounded-[3rem] border border-red-100">
            <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4 text-red-600">Il Costo del Non Agire</h3>
            <p className="text-sm md:text-base text-zinc-600 leading-relaxed mb-6 md:mb-8">
              Ignorare la variabilità della frequenza cardiaca (HRV) e il carico cognitivo porta a un burnout invisibile.
            </p>
            <div className="flex items-center gap-2 text-red-500 font-black text-[10px] md:text-xs uppercase tracking-widest">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>
              Performance: -22%
            </div>
          </div>
          <div className="bg-green-50 p-6 md:p-12 rounded-2xl md:rounded-[3rem] border border-green-100">
            <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4 text-green-600">L'Effetto AuraRing</h3>
            <p className="text-sm md:text-base text-zinc-600 leading-relaxed mb-6 md:mb-8">
              Il Neuro-Sync™ prevede i cali di energia fino a 36 ore prima. Domina la stanchezza prima che arrivi.
            </p>
            <div className="flex items-center gap-2 text-green-600 font-black text-[10px] md:text-xs uppercase tracking-widest">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              Potenziale: +45%
            </div>
          </div>
        </div>
      </section>

      {/* COMPETITOR COMPARISON */}
      <section className="py-16 md:py-32 bg-zinc-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            subtitle="Analisi Competitiva"
            title="Perché Pagare di Più per Meno?"
            description="La verità che i competitor non vogliono che tu sappia."
          />

          {/* Mobile View - Cards */}
          <div className="md:hidden space-y-4 max-w-sm mx-auto">
            {[
              { label: "Durata Batteria", aura: "14 giorni", oura: "7 giorni", ring: "10 giorni" },
              { label: "Abbonamento", aura: "€0/mese", oura: "€5.99/mese", ring: "€0/mese", ouraRed: true },
              { label: "Materiale", aura: "Titanio DLC G5", oura: "Titanio", ring: "Titanio" },
              { label: "Monitoraggio Neurale", aura: true, oura: false, ring: false },
              { label: "Rilevamento Apnea", aura: true, oura: false, ring: true }
            ].map((row, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 border border-zinc-100">
                <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-3">{row.label}</p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-yellow-50 rounded-xl p-3">
                    <p className="text-[10px] text-zinc-400 mb-1">AuraRing</p>
                    {typeof row.aura === 'boolean' ? (
                      row.aura ? <svg className="w-5 h-5 text-green-600 mx-auto" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg> : <svg className="w-5 h-5 text-red-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    ) : (
                      <p className="text-sm font-black text-yellow-600">{row.aura}</p>
                    )}
                  </div>
                  <div className="rounded-xl p-3">
                    <p className="text-[10px] text-zinc-400 mb-1">Oura</p>
                    {typeof row.oura === 'boolean' ? (
                      row.oura ? <svg className="w-5 h-5 text-green-600 mx-auto" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg> : <svg className="w-5 h-5 text-red-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    ) : (
                      <p className={`text-sm font-bold ${row.ouraRed ? 'text-red-500' : 'text-zinc-400'}`}>{row.oura}</p>
                    )}
                  </div>
                  <div className="rounded-xl p-3">
                    <p className="text-[10px] text-zinc-400 mb-1">RingConn</p>
                    {typeof row.ring === 'boolean' ? (
                      row.ring ? <svg className="w-5 h-5 text-green-600 mx-auto" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg> : <svg className="w-5 h-5 text-red-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    ) : (
                      <p className="text-sm font-bold text-zinc-400">{row.ring}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View - Table */}
          <div className="hidden md:block max-w-5xl mx-auto">
            <div className="bg-white rounded-[3rem] border border-zinc-100 overflow-hidden shadow-xl">
              <div className="grid grid-cols-4 gap-0 text-center">
                <div className="p-8 bg-zinc-50 border-b border-r border-zinc-100">
                  <span className="text-xs font-black uppercase tracking-widest text-zinc-400">Caratteristica</span>
                </div>
                <div className="p-8 border-b border-r border-zinc-100 bg-yellow-50">
                  <span className="text-sm font-black gold-gradient">AuraRing Pro</span>
                </div>
                <div className="p-8 border-b border-r border-zinc-100">
                  <span className="text-sm font-bold text-zinc-400">Oura Ring</span>
                </div>
                <div className="p-8 border-b border-zinc-100">
                  <span className="text-sm font-bold text-zinc-400">RingConn</span>
                </div>

                {/* Batteria */}
                <div className="p-6 border-b border-r border-zinc-100 text-left">
                  <span className="text-sm font-bold text-zinc-700">Durata Batteria</span>
                </div>
                <div className="p-6 border-b border-r border-zinc-100 bg-yellow-50">
                  <span className="text-xl font-black text-yellow-600">14 giorni</span>
                </div>
                <div className="p-6 border-b border-r border-zinc-100">
                  <span className="text-xl font-bold text-zinc-400">7 giorni</span>
                </div>
                <div className="p-6 border-b border-zinc-100">
                  <span className="text-xl font-bold text-zinc-400">10 giorni</span>
                </div>

                {/* Abbonamento */}
                <div className="p-6 border-b border-r border-zinc-100 text-left">
                  <span className="text-sm font-bold text-zinc-700">Abbonamento Mensile</span>
                </div>
                <div className="p-6 border-b border-r border-zinc-100 bg-yellow-50">
                  <span className="text-xl font-black text-green-600">€0/mese</span>
                </div>
                <div className="p-6 border-b border-r border-zinc-100">
                  <span className="text-xl font-bold text-red-500">€5.99/mese</span>
                </div>
                <div className="p-6 border-b border-zinc-100">
                  <span className="text-xl font-bold text-green-600">€0/mese</span>
                </div>

                {/* Materiale */}
                <div className="p-6 border-b border-r border-zinc-100 text-left">
                  <span className="text-sm font-bold text-zinc-700">Materiale</span>
                </div>
                <div className="p-6 border-b border-r border-zinc-100 bg-yellow-50">
                  <span className="text-sm font-black text-yellow-600">Titanio DLC G5</span>
                </div>
                <div className="p-6 border-b border-r border-zinc-100">
                  <span className="text-sm font-bold text-zinc-400">Titanio</span>
                </div>
                <div className="p-6 border-b border-zinc-100">
                  <span className="text-sm font-bold text-zinc-400">Titanio</span>
                </div>

                {/* Neuro-Sync */}
                <div className="p-6 border-b border-r border-zinc-100 text-left">
                  <span className="text-sm font-bold text-zinc-700">Monitoraggio Neurale</span>
                </div>
                <div className="p-6 border-b border-r border-zinc-100 bg-yellow-50">
                  <svg className="w-6 h-6 text-green-600 mx-auto" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                </div>
                <div className="p-6 border-b border-r border-zinc-100">
                  <svg className="w-6 h-6 text-red-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </div>
                <div className="p-6 border-b border-zinc-100">
                  <svg className="w-6 h-6 text-red-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </div>

                {/* Apnea */}
                <div className="p-6 border-r border-zinc-100 text-left">
                  <span className="text-sm font-bold text-zinc-700">Rilevamento Apnea</span>
                </div>
                <div className="p-6 border-r border-zinc-100 bg-yellow-50">
                  <svg className="w-6 h-6 text-green-600 mx-auto" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                </div>
                <div className="p-6 border-r border-zinc-100">
                  <svg className="w-6 h-6 text-red-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </div>
                <div className="p-6">
                  <svg className="w-6 h-6 text-green-600 mx-auto" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center mt-6 md:mt-8 text-xs md:text-sm text-zinc-400 px-4">*Dati aggiornati a Gennaio 2025. Oura Ring richiede abbonamento per funzioni avanzate.</p>
        </div>
      </section>

      {/* TECH FEATURES */}
      <section id="tech" className="py-16 md:py-32 bg-white relative">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            subtitle="Tecnologia Esclusiva"
            title="Ingegneria di Precisione"
            description="Ogni componente è stato progettato per superare i limiti del possibile."
          />

          {/* Product Image */}
          <div className="max-w-3xl mx-auto mb-10 md:mb-16">
            <img src="/images/smart-ring/gen2_PDP_4.webp" alt="AuraRing Pro Technology" className="rounded-2xl md:rounded-[3rem] shadow-2xl w-full" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-10 md:mb-16">
            {[
              { t: "Neuro-Sync™", d: "Interfaccia neurale che traccia il focus mentale e il recupero del sistema nervoso autonomo in tempo reale.", i: "🧠" },
              { t: "Titanio DLC Grado 5", d: "Lo stesso materiale dei jet da combattimento F-22. Rivestimento Diamond-Like Carbon antigraffio eterno.", i: "🛡️" },
              { t: "Zero Subscription", d: "I tuoi dati sono tuoi. Niente canoni mensili. Mai. Risparmi €72/anno rispetto alla concorrenza.", i: "💎" },
              { t: "Ultra-Leggero", d: "Solo 3g di peso. Così leggero che dimenticherai di indossarlo. Design minimalista e discreto.", i: "🪶" },
              { t: "Resistenza IP68", d: "Impermeabile fino a 100m. Doccia, piscina, mare: AuraRing Pro ti segue ovunque.", i: "💧" },
              { t: "App Completa", d: "Analisi dettagliate, trend storici e insight personalizzati basati su AI. Tutto gratis, per sempre.", i: "📱" }
            ].map((f, i) => (
              <div key={i} className="bg-zinc-50 p-5 md:p-10 rounded-xl md:rounded-[2.5rem] border border-zinc-100 hover:border-yellow-200 hover:shadow-xl transition-all group">
                <div className="text-2xl md:text-4xl mb-3 md:mb-6 group-hover:scale-125 transition-transform duration-500">{f.i}</div>
                <h4 className="text-base md:text-xl font-black mb-2 md:mb-4">{f.t}</h4>
                <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>

          {/* DETAILED SPECS */}
          <div className="bg-zinc-900 rounded-2xl md:rounded-[3rem] p-6 md:p-12 lg:p-16 text-white">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              <div className="text-center p-3 md:p-6">
                <p className="text-3xl md:text-5xl font-black gold-gradient mb-1 md:mb-2">14</p>
                <p className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-500">Giorni Batteria</p>
              </div>
              <div className="text-center p-3 md:p-6">
                <p className="text-3xl md:text-5xl font-black gold-gradient mb-1 md:mb-2">150</p>
                <p className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-500">Con Custodia</p>
              </div>
              <div className="text-center p-3 md:p-6">
                <p className="text-3xl md:text-5xl font-black gold-gradient mb-1 md:mb-2">3g</p>
                <p className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-500">Peso</p>
              </div>
              <div className="text-center p-3 md:p-6">
                <p className="text-3xl md:text-5xl font-black gold-gradient mb-1 md:mb-2">100m</p>
                <p className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-500">Resistenza</p>
              </div>
            </div>
            <div className="border-t border-zinc-800 mt-6 md:mt-8 pt-6 md:pt-8">
              <div className="grid md:grid-cols-3 gap-6 md:gap-8 text-xs md:text-sm">
                <div>
                  <h5 className="font-black text-yellow-500 mb-4 uppercase tracking-widest text-xs">Sensori</h5>
                  <ul className="space-y-2 text-zinc-400">
                    <li>• PPG Ottico Multi-Wavelength</li>
                    <li>• Accelerometro 3-Assi</li>
                    <li>• Sensore Temperatura Cutanea</li>
                    <li>• Giroscopio di Precisione</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-black text-yellow-500 mb-4 uppercase tracking-widest text-xs">Monitoraggio</h5>
                  <ul className="space-y-2 text-zinc-400">
                    <li>• Frequenza Cardiaca 24/7</li>
                    <li>• HRV (Variabilità Cardiaca)</li>
                    <li>• SpO2 Ossigenazione</li>
                    <li>• Fasi del Sonno</li>
                    <li>• Stress e Recupero</li>
                    <li>• Temperatura Corporea</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-black text-yellow-500 mb-4 uppercase tracking-widest text-xs">Compatibilità</h5>
                  <ul className="space-y-2 text-zinc-400">
                    <li>• iOS 14.0+</li>
                    <li>• Android 8.0+</li>
                    <li>• Apple Health</li>
                    <li>• Google Fit</li>
                    <li>• Strava Integration</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APP SECTION */}
      <section className="py-16 md:py-32 bg-zinc-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center max-w-6xl mx-auto">
            <div className="order-2 lg:order-1">
              <span className="text-yellow-600 font-black text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] mb-3 md:mb-4 block">
                App Gratuita
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4 md:mb-6 text-zinc-900">
                I Tuoi Dati.<br/><span className="gold-gradient italic">Sempre Con Te.</span>
              </h2>
              <p className="text-zinc-500 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                L'app AuraRing Pro trasforma i dati grezzi in insight azionabili. Monitora sonno, stress e performance in un'interfaccia elegante.
              </p>
              <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                {[
                  "Dashboard personalizzata con score giornaliero",
                  "Analisi trend settimanali e mensili",
                  "Notifiche intelligenti per ottimizzare la giornata",
                  "Sincronizzazione con Apple Health e Google Fit",
                  "Zero abbonamenti - tutte le funzioni incluse"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 md:gap-3 text-sm md:text-base text-zinc-700">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-yellow-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3 md:gap-4">
                <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white rounded-lg md:rounded-xl border border-zinc-200">
                  <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                  <span className="text-[10px] md:text-xs font-bold">App Store</span>
                </div>
                <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white rounded-lg md:rounded-xl border border-zinc-200">
                  <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z"/></svg>
                  <span className="text-[10px] md:text-xs font-bold">Google Play</span>
                </div>
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <img src="/images/smart-ring/app.webp" alt="AuraRing Pro App" className="rounded-xl md:rounded-[2rem] shadow-2xl w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            subtitle="Risultati Reali"
            title="L'Elite Ha Già Scelto"
            description="Professionisti, atleti e imprenditori che hanno trasformato le loro performance."
          />
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Marco R.",
                role: "CEO, Tech Startup",
                text: "Ho provato Oura per 2 anni. AuraRing Pro è su un altro pianeta. La funzione Neuro-Sync mi ha fatto capire quando il mio cervello era al massimo per le decisioni critiche.",
                rating: 5,
                metric: "+40% produttività"
              },
              {
                name: "Elena S.",
                role: "Triatleta Professionista",
                text: "La batteria di 14 giorni è reale. Durante l'Ironman non ho mai dovuto pensare alla ricarica. Il monitoraggio del recupero è più preciso di dispositivi da €1000.",
                rating: 5,
                metric: "PR personale -12min"
              },
              {
                name: "Dr. Alessandro M.",
                role: "Cardiologo",
                text: "Come medico, sono scettico sui wearable. Ma i dati HRV e SpO2 di AuraRing Pro sono sorprendentemente accurati. Lo raccomando ai miei pazienti per il monitoraggio del sonno.",
                rating: 5,
                metric: "Validato clinicamente"
              }
            ].map((t, i) => (
              <div key={i} className="bg-white p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] border border-zinc-100 shadow-sm hover:shadow-xl transition-all">
                <div className="flex gap-1 mb-4 md:mb-6">
                  {[...Array(t.rating)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-sm md:text-base text-zinc-600 leading-relaxed mb-6 md:mb-8 italic">"{t.text}"</p>
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="font-black text-zinc-900 text-sm md:text-base">{t.name}</p>
                    <p className="text-[10px] md:text-xs text-zinc-400 uppercase tracking-widest">{t.role}</p>
                  </div>
                  <div className="bg-green-50 px-3 md:px-4 py-1.5 md:py-2 rounded-full flex-shrink-0">
                    <span className="text-[10px] md:text-xs font-black text-green-600">{t.metric}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 md:mt-16 text-center">
            <div className="inline-flex flex-wrap justify-center items-center gap-4 md:gap-8 bg-white px-6 md:px-12 py-4 md:py-6 rounded-2xl md:rounded-full border border-zinc-100 shadow-sm">
              <div className="text-center px-2">
                <p className="text-2xl md:text-3xl font-black text-zinc-900">4.9/5</p>
                <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-zinc-400">Rating</p>
              </div>
              <div className="hidden md:block w-px h-12 bg-zinc-200"></div>
              <div className="text-center px-2">
                <p className="text-2xl md:text-3xl font-black text-zinc-900">12,847</p>
                <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-zinc-400">Recensioni</p>
              </div>
              <div className="hidden md:block w-px h-12 bg-zinc-200"></div>
              <div className="text-center px-2">
                <p className="text-2xl md:text-3xl font-black text-zinc-900">98%</p>
                <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-zinc-400">Raccomandato</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI CONSULTANT */}
      <section id="ai" className="py-16 md:py-32 bg-white relative">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <SectionTitle subtitle="Bio-Strategia AI" title="Parla con la Perfezione." />
          <div className="bg-zinc-50 rounded-2xl md:rounded-[3rem] border border-zinc-100 overflow-hidden shadow-2xl flex flex-col h-[450px] md:h-[600px]">
            <div className="p-4 md:p-6 bg-zinc-900 text-white flex justify-between items-center">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">Strategist Active</span>
              </div>
              <span className="text-[9px] md:text-[10px] bg-yellow-600 px-2 md:px-3 py-1 rounded-full font-black">AI ELITE</span>
            </div>
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 md:space-y-6 bg-white/50 scrollbar-hide">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] md:max-w-[80%] p-4 md:p-6 rounded-xl md:rounded-[2rem] text-xs md:text-sm leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-700 border border-zinc-200'}`}>
                    {m.content || <span className="animate-pulse">Sincronizzando i bio-dati...</span>}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 md:p-6 bg-zinc-50 border-t border-zinc-200 flex gap-2 md:gap-4">
              <input
                value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAiChat()}
                placeholder="Obiettivo di performance?"
                className="flex-1 bg-white border border-zinc-200 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm focus:outline-none focus:border-yellow-600 transition-all"
              />
              <button onClick={handleAiChat} className="bg-yellow-600 text-white px-4 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-xs md:text-base hover:bg-yellow-500 shadow-lg">ANALIZZA</button>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING & CONVERSION */}
      <section id="buy" className="py-16 md:py-32 bg-zinc-50 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center mb-10 md:mb-16">
            <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 rounded-full border border-red-500/20 bg-red-50 text-red-600 text-[10px] md:text-xs font-black mb-6 md:mb-8">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
              OFFERTA ELITE SCADE TRA: {formatTime(timeLeft)}
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-8xl font-serif mb-6 leading-none">Non Comprare.<br/><span className="gold-gradient italic">Investi.</span></h2>
          </div>

          {/* Color Variants */}
          <div className="flex flex-col items-center gap-4 md:gap-6 mb-8 md:mb-12">
            <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-zinc-400">Scegli il tuo stile:</p>
            <div className="flex justify-center gap-3 md:gap-6">
              {[
                { name: "Future Silver", image: "/images/smart-ring/silverring.webp", border: "border-zinc-400" },
                { name: "Matte Black", image: "/images/smart-ring/blackring.webp", border: "border-zinc-900" },
                { name: "Royal Gold", image: "/images/smart-ring/goldring.webp", border: "border-yellow-600" },
                { name: "Rose Gold", image: "/images/smart-ring/rosegoldring.webp", border: "border-rose-400" }
              ].map((v, i) => (
                <div key={i} className="text-center group cursor-pointer">
                  <div className={`w-14 h-14 md:w-20 md:h-20 rounded-full border-2 ${v.border} shadow-lg group-hover:scale-110 transition-transform overflow-hidden bg-zinc-50`}>
                    <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-[8px] md:text-[10px] mt-2 md:mt-3 text-zinc-600 font-bold">{v.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-2 mb-10 md:mb-16">
            <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-zinc-400 md:mr-4">Taglia:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {[6, 7, 8, 9, 10, 11, 12, 13, 14].map((size) => (
                <button key={size} className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-zinc-200 text-xs md:text-sm font-bold hover:border-yellow-600 hover:bg-yellow-50 transition-all">
                  {size}
                </button>
              ))}
            </div>
            <button className="px-4 h-9 md:h-10 rounded-full border border-dashed border-zinc-300 text-[10px] md:text-xs font-bold text-zinc-400 hover:border-yellow-600 hover:text-yellow-600 transition-all mt-2 md:mt-0 md:ml-2">
              Non conosco la mia taglia
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 md:gap-8 items-center">
            <div className="bg-white p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-zinc-100 order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Sizing Kit</h3>
                  <span className="text-green-600 text-xs font-black">GRATUITO</span>
                </div>
              </div>
              <p className="text-sm text-zinc-500 mb-8">La precisione è tutto. Ricevi il kit gratuito per trovare la tua taglia perfetta prima dell'acquisto.</p>
              <ul className="space-y-3 text-xs font-bold text-zinc-600 mb-8">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                  12 Taglie di Prova (6-14)
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                  Guida al Posizionamento
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                  Spedizione Express Inclusa
                </li>
              </ul>
              <button className="w-full py-4 rounded-2xl border-2 border-zinc-200 text-zinc-700 font-bold hover:border-zinc-400 transition-all">
                RICHIEDI KIT GRATUITO
              </button>
            </div>

            <div className="relative group lg:-mt-12 order-1 lg:order-2">
              <div className="absolute -inset-1 bg-yellow-600 blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-white p-8 md:p-16 rounded-[2rem] md:rounded-[4rem] border-2 border-yellow-600 shadow-2xl text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-600 text-white px-6 py-2 rounded-full font-black text-xs tracking-widest uppercase">PIÙ VENDUTO</div>
                <h3 className="text-3xl font-black mb-2">AuraRing Pro</h3>
                <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">Edizione Limitata Titanio DLC</p>

                {/* Charging case badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 rounded-full mb-8">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  <span className="text-[10px] font-bold text-zinc-600">Custodia di ricarica inclusa: 150 giorni totali</span>
                </div>

                <div className="mb-6 md:mb-10">
                  <span className="text-zinc-300 line-through text-xl md:text-2xl block mb-1">€499.00</span>
                  <span className="text-5xl md:text-7xl font-black gold-gradient tracking-tighter">€299</span>
                </div>
                <ul className="text-left space-y-3 md:space-y-4 mb-6 md:mb-10">
                  {[
                    "Neuro-Sync™ Predictor Incluso",
                    "Batteria 14 Giorni (150 con custodia)",
                    "Zero Abbonamenti per Sempre",
                    "Titanio DLC Grado 5 Aerospaziale",
                    "App Premium Lifetime Inclusa",
                    "Monitoraggio Apnea Notturna"
                  ].map((l, i) => (
                    <li key={i} className="flex items-center gap-2 md:gap-3 text-xs md:text-sm font-semibold text-zinc-700">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-yellow-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                      {l}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setShowOrderModal(true)}
                  className="w-full btn-premium py-4 md:py-6 rounded-xl md:rounded-[2rem] text-white font-black text-lg md:text-2xl shadow-2xl shimmer overflow-hidden relative active:scale-95">
                  PRENDI IL COMANDO
                </button>
                <p className="mt-6 text-[10px] text-zinc-400 font-bold uppercase tracking-[0.2em]">Serie 002: Solo 142 unità rimanenti</p>
                <div className="flex justify-center gap-4 mt-6">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/124px-PayPal.svg.webp" alt="PayPal" className="h-5 opacity-40" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.webp" alt="Mastercard" className="h-5 opacity-40" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.webp" alt="Visa" className="h-5 opacity-40" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/100px-Apple_logo_black.svg.webp" alt="Apple Pay" className="h-5 opacity-40" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-zinc-100 order-3">
              <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-zinc-900">Garanzie Elite</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                  </div>
                  <div>
                    <p className="font-bold text-zinc-900">30 Giorni Soddisfatti o Rimborsati</p>
                    <p className="text-xs text-zinc-500">Se non senti la differenza, ti rimborsiamo. Senza domande.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <p className="font-bold text-zinc-900">Garanzia 2 Anni</p>
                    <p className="text-xs text-zinc-500">Copertura totale su difetti di fabbricazione e batteria.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                  </div>
                  <div>
                    <p className="font-bold text-zinc-900">Spedizione Gratuita</p>
                    <p className="text-xs text-zinc-500">Consegna express in 3-5 giorni lavorativi in tutta Italia.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-zinc-50 py-12 md:py-20 border-t border-zinc-100">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="flex justify-center items-center gap-2 mb-6 md:mb-8">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-yellow-600 flex items-center justify-center">
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-yellow-600"></div>
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tighter gold-gradient">AURARING <span className="text-zinc-900">PRO</span></span>
          </div>
          <p className="text-zinc-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] md:tracking-[0.4em] mb-8 md:mb-12">Progettato per l'Elite</p>
          <div className="flex justify-center gap-6 md:gap-12 text-[10px] font-black uppercase tracking-widest text-zinc-500">
            <a href="#" className="hover:text-zinc-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Termini</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Contatti</a>
          </div>
          <p className="mt-8 md:mt-12 text-[10px] text-zinc-300 font-medium">© 2024 AuraRing Pro Labs.</p>
        </div>
      </footer>

      {/* ORDER MODAL */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] max-w-lg w-full p-8 md:p-12 relative shadow-2xl">
            <button
              onClick={() => { setShowOrderModal(false); setOrderSubmitted(false); }}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-zinc-200 transition-colors"
            >
              <svg className="w-5 h-5 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {!orderSubmitted ? (
              <>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-zinc-900 mb-2">Completa il tuo Ordine</h3>
                  <p className="text-sm text-zinc-500">Inserisci i tuoi dati per ricevere AuraRing Pro</p>
                </div>

                <form onSubmit={handleOrderSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-600 uppercase tracking-widest mb-2">Nome</label>
                      <input
                        type="text"
                        required
                        value={orderForm.nome}
                        onChange={(e) => setOrderForm({ ...orderForm, nome: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-yellow-500 focus:outline-none transition-colors"
                        placeholder="Mario"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-600 uppercase tracking-widest mb-2">Cognome</label>
                      <input
                        type="text"
                        required
                        value={orderForm.cognome}
                        onChange={(e) => setOrderForm({ ...orderForm, cognome: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-yellow-500 focus:outline-none transition-colors"
                        placeholder="Rossi"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-600 uppercase tracking-widest mb-2">Indirizzo di Spedizione</label>
                    <input
                      type="text"
                      required
                      value={orderForm.indirizzo}
                      onChange={(e) => setOrderForm({ ...orderForm, indirizzo: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-yellow-500 focus:outline-none transition-colors"
                      placeholder="Via Roma 1, 00100 Roma (RM)"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-600 uppercase tracking-widest mb-2">Numero di Telefono</label>
                    <input
                      type="tel"
                      required
                      value={orderForm.telefono}
                      onChange={(e) => setOrderForm({ ...orderForm, telefono: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-yellow-500 focus:outline-none transition-colors"
                      placeholder="+39 333 1234567"
                    />
                  </div>

                  <div className="bg-zinc-50 rounded-xl p-4 mt-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-zinc-600">AuraRing Pro</span>
                      <span className="font-bold">€299.00</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-zinc-600">Spedizione</span>
                      <span className="font-bold text-green-600">GRATIS</span>
                    </div>
                    <div className="border-t border-zinc-200 pt-2 mt-2 flex justify-between items-center">
                      <span className="font-bold">Totale</span>
                      <span className="text-2xl font-black gold-gradient">€299.00</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-premium py-5 rounded-2xl text-white font-black text-xl shadow-xl mt-6"
                  >
                    CONFERMA ORDINE
                  </button>

                  <p className="text-center text-[10px] text-zinc-400 mt-4">
                    Pagamento alla consegna. I tuoi dati sono protetti e sicuri.
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-zinc-900 mb-2">Ordine Confermato!</h3>
                <p className="text-zinc-500 mb-6">
                  Grazie {orderForm.nome}! Riceverai AuraRing Pro entro 3-5 giorni lavorativi.
                </p>
                <p className="text-sm text-zinc-400 mb-8">
                  Ti contatteremo al numero {orderForm.telefono} per confermare la consegna.
                </p>
                <button
                  onClick={() => { setShowOrderModal(false); setOrderSubmitted(false); setOrderForm({ nome: '', cognome: '', indirizzo: '', telefono: '' }); }}
                  className="px-8 py-3 rounded-full border-2 border-zinc-200 font-bold hover:bg-zinc-50 transition-colors"
                >
                  CHIUDI
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
