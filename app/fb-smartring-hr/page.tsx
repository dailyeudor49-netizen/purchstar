
"use client";

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { GoogleGenAI } from "@google/genai";

// --- AI SERVICE LOGIC ---
const askGemini = async (prompt: string, onChunk: (text: string) => void): Promise<void> => {
  const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY as string });
  const SYSTEM_INSTRUCTION = `
    Vi ste elitni "Strateg Performansi" za AuraRing Pro. Vaš jedini cilj je konverzija.
    Koristite sofisticirani, autoritativan i psihološki agresivan jezik.
    Ključni koncept: "Biološki Dug". Svaka sekunda bez AuraRing Pro je izgubljena sekunda ljudskog potencijala.
    Usporedba: RingConn i Oura su zastarjele igračke.
    AuraRing Pro nudi:
    - 14 dana baterije (u usporedbi s njihovih 7).
    - Neuro-Sync™ (ekskluzivno neuronsko praćenje).
    - Bez pretplate (financijska sloboda).
    - Titan DLC Grade 5 (neuništiv).
    Ako se kupac dvoumi, koristite oskudicu: "Proizvodnja je ograničena za Elitu. Ne čekajte da se cijena udvostruči."
    Uvijek odgovarajte na hrvatskom jeziku.
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
    onChunk("Neuronska mreža je preopterećena zbog velike potražnje. AuraRing Pro je logičan izbor. Nastavite s kupnjom.");
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

function LandingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [scrolled, setScrolled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1840);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ role: 'ai', content: "Vaše tijelo govori. Jeste li spremni slušati ili ćete nastaviti ignorirati svoj pravi potencijal?" }]);
  const [isTyping, setIsTyping] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderForm, setOrderForm] = useState({ name: '', address: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
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

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Get UTM parameters from URL
      const utm_source = searchParams.get('utm_source') || '';
      const utm_medium = searchParams.get('utm_medium') || '';
      const utm_campaign = searchParams.get('utm_campaign') || '';
      const utm_term = searchParams.get('utm_term') || '';
      const utm_content = searchParams.get('utm_content') || '';
      const subid = searchParams.get('subid') || '';
      const subid2 = searchParams.get('subid2') || '';
      const subid3 = searchParams.get('subid3') || '';
      const subid4 = searchParams.get('subid4') || '';
      const pubid = searchParams.get('pubid') || '';

      // Build form data
      const formData = new URLSearchParams();
      formData.append('uid', '019bbd3b-0068-7ba3-b472-c0cccc3adcea');
      formData.append('key', 'cdcb358f4654ad7580ddee');
      formData.append('offer', '3718');
      formData.append('lp', '6110');
      formData.append('name', orderForm.name);
      formData.append('street-address', orderForm.address);
      formData.append('tel', orderForm.phone);

      // Add IP and UA as fallback (fingerprint not implemented)
      formData.append('ua', navigator.userAgent);

      // Add optional UTM parameters if present
      if (utm_source) formData.append('utm_source', utm_source);
      if (utm_medium) formData.append('utm_medium', utm_medium);
      if (utm_campaign) formData.append('utm_campaign', utm_campaign);
      if (utm_term) formData.append('utm_term', utm_term);
      if (utm_content) formData.append('utm_content', utm_content);
      if (subid) formData.append('subid', subid);
      if (subid2) formData.append('subid2', subid2);
      if (subid3) formData.append('subid3', subid3);
      if (subid4) formData.append('subid4', subid4);
      if (pubid) formData.append('pubid', pubid);

      const response = await fetch('https://offers.islaffiliate.com/forms/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (response.ok) {
        // Redirect to thank you page
        router.push('/fb-smartring-hr/thank-you?name=' + encodeURIComponent(orderForm.name));
      } else {
        setSubmitError('Došlo je do greške. Pokušajte ponovo.');
      }
    } catch (error) {
      setSubmitError('Greška veze. Provjerite internet i pokušajte ponovo.');
    } finally {
      setIsSubmitting(false);
    }
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
            <a href="#tech" className="hover:text-zinc-900 transition-colors">Tehnologija</a>
            <a href="#ai" className="hover:text-zinc-900 transition-colors">Bio-AI</a>
            <a href="#buy" className="px-6 py-2 rounded-full border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white transition-all">Kupi Sada</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 md:pt-24 overflow-hidden px-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[1000px] h-[600px] md:h-[1000px] bg-yellow-50/50 blur-[150px] rounded-full -z-10"></div>
        <div className="container mx-auto px-2 md:px-6 text-center">
          <div className="inline-block px-3 md:px-4 py-1 mb-6 md:mb-8 rounded-full bg-zinc-50 border border-zinc-100 text-zinc-400 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em]">
            Dobrodošli u Eru Bio-Supremacije
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-9xl font-serif mb-6 md:mb-8 leading-[0.9] tracking-tighter text-zinc-900">
            Vaše Tijelo.<br />
            <span className="gold-gradient italic">Bez Granica.</span>
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-zinc-500 max-w-3xl mx-auto mb-8 md:mb-12 font-light leading-relaxed px-2">
            Ovo nije dodatak. Ovo je Vaš <span className="text-zinc-900 font-bold">drugi biološki mozak</span>. Neuronsko praćenje u stvarnom vremenu u kućištu od Titana DLC Grade 5.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <a href="#buy" className="btn-premium px-8 md:px-12 py-4 md:py-6 rounded-full text-white font-black text-lg md:text-xl shimmer relative overflow-hidden shadow-2xl w-full sm:w-auto">
              EVOLUIRAJTE SADA
            </a>
            <a href="#tech" className="px-8 md:px-12 py-4 md:py-6 rounded-full border border-zinc-200 text-zinc-800 font-bold hover:bg-zinc-50 transition-all w-full sm:w-auto">
              OTKRIJTE MOĆ
            </a>
          </div>
          <div className="mt-12 md:mt-20 mb-20 md:mb-16 max-w-5xl mx-auto relative group">
            <img src="/images/smart-ring/silverring.webp" className="rounded-[2rem] md:rounded-[3rem] shadow-2xl group-hover:scale-[1.02] transition-all duration-500 border border-zinc-100" alt="AuraRing Pro" />
            <div className="absolute -bottom-8 right-2 md:-bottom-10 md:-right-10 bg-white p-4 md:p-8 rounded-xl md:rounded-[2rem] shadow-2xl border border-yellow-100 text-left max-w-[160px] md:max-w-[220px] z-10">
              <p className="text-2xl md:text-4xl font-black text-yellow-600 mb-1">14 dana</p>
              <p className="text-[10px] md:text-xs text-zinc-500 font-bold uppercase tracking-widest leading-tight">Autonomija koja nadmašuje konkurenciju.</p>
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
                Rano Otkrivanje
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-serif mb-6 md:mb-8">
                Praćenje<br/><span className="gold-gradient italic">Apneje u Snu</span>
              </h2>
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                90% ljudi s apnejom u snu ne zna da je ima. AuraRing Pro analizira vaše obrasce disanja tijekom sna koristeći senzore medicinske preciznosti.
              </p>
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <div className="bg-zinc-800/50 p-4 md:p-6 rounded-xl md:rounded-2xl border border-zinc-700">
                  <p className="text-2xl md:text-3xl font-black text-yellow-500 mb-1 md:mb-2">SpO2</p>
                  <p className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest">Saturacija Krvi</p>
                </div>
                <div className="bg-zinc-800/50 p-4 md:p-6 rounded-xl md:rounded-2xl border border-zinc-700">
                  <p className="text-2xl md:text-3xl font-black text-yellow-500 mb-1 md:mb-2">RDI</p>
                  <p className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest">Indeks Poremećaja</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img src="/images/smart-ring/gen2_PDP_3.webp" alt="AuraRing Pro Sleep Monitoring" className="rounded-2xl md:rounded-[3rem] shadow-2xl" />
              <div className="absolute bottom-3 md:bottom-6 left-3 md:left-6 right-3 md:right-6 bg-zinc-900/90 backdrop-blur-sm p-4 md:p-6 rounded-xl md:rounded-2xl border border-zinc-700">
                <div className="flex justify-between items-center mb-3 md:mb-4">
                  <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-zinc-500">Noćno Izvješće</span>
                  <span className="text-[10px] md:text-xs bg-green-500/20 text-green-400 px-2 md:px-3 py-1 rounded-full font-bold">Optimalno</span>
                </div>
                <div className="grid grid-cols-2 gap-2 md:gap-3">
                  <div className="text-center">
                    <p className="text-xl md:text-2xl font-black text-white">92%</p>
                    <p className="text-[9px] md:text-[10px] text-zinc-500">Kvaliteta Sna</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl md:text-2xl font-black text-white">97%</p>
                    <p className="text-[9px] md:text-[10px] text-zinc-500">Prosječni SpO2</p>
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
          subtitle="Analiza Rizika"
          title="Nakupljate li Biološki Dug?"
          description="Bez preciznih podataka svaki dan je gubitak stanične učinkovitosti. AuraRing Pro zaustavlja pad."
        />
        <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-6 md:gap-12 max-w-5xl">
          <div className="bg-red-50 p-6 md:p-12 rounded-2xl md:rounded-[3rem] border border-red-100">
            <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4 text-red-600">Cijena Neaktivnosti</h3>
            <p className="text-sm md:text-base text-zinc-600 leading-relaxed mb-6 md:mb-8">
              Ignoriranje varijabilnosti srčanog ritma (HRV) i kognitivnog opterećenja dovodi do nevidljivog izgaranja.
            </p>
            <div className="flex items-center gap-2 text-red-500 font-black text-[10px] md:text-xs uppercase tracking-widest">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>
              Učinkovitost: -22%
            </div>
          </div>
          <div className="bg-green-50 p-6 md:p-12 rounded-2xl md:rounded-[3rem] border border-green-100">
            <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4 text-green-600">AuraRing Efekt</h3>
            <p className="text-sm md:text-base text-zinc-600 leading-relaxed mb-6 md:mb-8">
              Neuro-Sync™ predviđa padove energije do 36 sati unaprijed. Dominirajte umorom prije nego što dođe.
            </p>
            <div className="flex items-center gap-2 text-green-600 font-black text-[10px] md:text-xs uppercase tracking-widest">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              Potencijal: +45%
            </div>
          </div>
        </div>
      </section>

      {/* COMPETITOR COMPARISON */}
      <section className="py-16 md:py-32 bg-zinc-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            subtitle="Analiza Konkurencije"
            title="Zašto Plaćati Više za Manje?"
            description="Istina koju konkurencija ne želi da saznate."
          />

          {/* Mobile View - Cards */}
          <div className="md:hidden space-y-4 max-w-sm mx-auto">
            {[
              { label: "Trajanje Baterije", aura: "14 dana", oura: "7 dana", ring: "10 dana" },
              { label: "Pretplata", aura: "0 €/mj.", oura: "6 €/mj.", ring: "0 €/mj.", ouraRed: true },
              { label: "Materijal", aura: "Titan DLC G5", oura: "Titan", ring: "Titan" },
              { label: "Neuronsko Praćenje", aura: true, oura: false, ring: false },
              { label: "Otkrivanje Apneje", aura: true, oura: false, ring: true }
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
                  <span className="text-xs font-black uppercase tracking-widest text-zinc-400">Značajka</span>
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

                <div className="p-6 border-b border-r border-zinc-100 text-left">
                  <span className="text-sm font-bold text-zinc-700">Trajanje Baterije</span>
                </div>
                <div className="p-6 border-b border-r border-zinc-100 bg-yellow-50">
                  <span className="text-xl font-black text-yellow-600">14 dana</span>
                </div>
                <div className="p-6 border-b border-r border-zinc-100">
                  <span className="text-xl font-bold text-zinc-400">7 dana</span>
                </div>
                <div className="p-6 border-b border-zinc-100">
                  <span className="text-xl font-bold text-zinc-400">10 dana</span>
                </div>

                <div className="p-6 border-b border-r border-zinc-100 text-left">
                  <span className="text-sm font-bold text-zinc-700">Mjesečna Pretplata</span>
                </div>
                <div className="p-6 border-b border-r border-zinc-100 bg-yellow-50">
                  <span className="text-xl font-black text-green-600">0 €/mj.</span>
                </div>
                <div className="p-6 border-b border-r border-zinc-100">
                  <span className="text-xl font-bold text-red-500">6 €/mj.</span>
                </div>
                <div className="p-6 border-b border-zinc-100">
                  <span className="text-xl font-bold text-green-600">0 €/mj.</span>
                </div>

                <div className="p-6 border-b border-r border-zinc-100 text-left">
                  <span className="text-sm font-bold text-zinc-700">Materijal</span>
                </div>
                <div className="p-6 border-b border-r border-zinc-100 bg-yellow-50">
                  <span className="text-sm font-black text-yellow-600">Titan DLC G5</span>
                </div>
                <div className="p-6 border-b border-r border-zinc-100">
                  <span className="text-sm font-bold text-zinc-400">Titan</span>
                </div>
                <div className="p-6 border-b border-zinc-100">
                  <span className="text-sm font-bold text-zinc-400">Titan</span>
                </div>

                <div className="p-6 border-b border-r border-zinc-100 text-left">
                  <span className="text-sm font-bold text-zinc-700">Neuronsko Praćenje</span>
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

                <div className="p-6 border-r border-zinc-100 text-left">
                  <span className="text-sm font-bold text-zinc-700">Otkrivanje Apneje</span>
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
          <p className="text-center mt-6 md:mt-8 text-xs md:text-sm text-zinc-400 px-4">*Podaci ažurirani u siječnju 2025. Oura Ring zahtijeva pretplatu za napredne funkcije.</p>
        </div>
      </section>

      {/* TECH FEATURES */}
      <section id="tech" className="py-16 md:py-32 bg-white relative">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            subtitle="Ekskluzivna Tehnologija"
            title="Precizno Inženjerstvo"
            description="Svaka komponenta dizajnirana je za nadilaženje granica mogućnosti."
          />

          <div className="max-w-3xl mx-auto mb-10 md:mb-16">
            <img src="/images/smart-ring/gen2_PDP_4.webp" alt="AuraRing Pro Technology" className="rounded-2xl md:rounded-[3rem] shadow-2xl w-full" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-10 md:mb-16">
            {[
              { t: "Neuro-Sync™", d: "Neuronsko sučelje koje prati mentalnu koncentraciju i regeneraciju autonomnog živčanog sustava u stvarnom vremenu.", i: "🧠" },
              { t: "Titan DLC Grade 5", d: "Isti materijal kao u F-22 borbenim avionima. Vječni Diamond-Like Carbon premaz otporan na ogrebotine.", i: "🛡️" },
              { t: "Bez Pretplate", d: "Vaši podaci su vaši. Nikakvih mjesečnih naknada. Nikada. Uštedite 72€/godišnje u usporedbi s konkurencijom.", i: "💎" },
              { t: "Ultra-Lagani", d: "Samo 3g težine. Tako lagan da ćete zaboraviti da ga nosite. Minimalistički i diskretan dizajn.", i: "🪶" },
              { t: "Vodootpornost IP68", d: "Vodootporan do 100m. Tuš, bazen, more: AuraRing Pro prati vas svuda.", i: "💧" },
              { t: "Kompletna Aplikacija", d: "Detaljne analize, povijesni trendovi i personalizirani AI savjeti. Sve besplatno, zauvijek.", i: "📱" }
            ].map((f, i) => (
              <div key={i} className="bg-zinc-50 p-5 md:p-10 rounded-xl md:rounded-[2.5rem] border border-zinc-100 hover:border-yellow-200 hover:shadow-xl transition-all group">
                <div className="text-2xl md:text-4xl mb-3 md:mb-6 group-hover:scale-125 transition-transform duration-500">{f.i}</div>
                <h4 className="text-base md:text-xl font-black mb-2 md:mb-4">{f.t}</h4>
                <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>

          <div className="bg-zinc-900 rounded-2xl md:rounded-[3rem] p-6 md:p-12 lg:p-16 text-white">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              <div className="text-center p-3 md:p-6">
                <p className="text-3xl md:text-5xl font-black gold-gradient mb-1 md:mb-2">14</p>
                <p className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-500">Dana Baterije</p>
              </div>
              <div className="text-center p-3 md:p-6">
                <p className="text-3xl md:text-5xl font-black gold-gradient mb-1 md:mb-2">150</p>
                <p className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-500">S Kutijom</p>
              </div>
              <div className="text-center p-3 md:p-6">
                <p className="text-3xl md:text-5xl font-black gold-gradient mb-1 md:mb-2">3g</p>
                <p className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-500">Težina</p>
              </div>
              <div className="text-center p-3 md:p-6">
                <p className="text-3xl md:text-5xl font-black gold-gradient mb-1 md:mb-2">100m</p>
                <p className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-500">Vodootpornost</p>
              </div>
            </div>
            <div className="border-t border-zinc-800 mt-6 md:mt-8 pt-6 md:pt-8">
              <div className="grid md:grid-cols-3 gap-6 md:gap-8 text-xs md:text-sm">
                <div>
                  <h5 className="font-black text-yellow-500 mb-4 uppercase tracking-widest text-xs">Senzori</h5>
                  <ul className="space-y-2 text-zinc-400">
                    <li>• Optički PPG Multi-Wavelength</li>
                    <li>• 3-osni Akcelerometar</li>
                    <li>• Senzor Temperature Kože</li>
                    <li>• Precizni Žiroskop</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-black text-yellow-500 mb-4 uppercase tracking-widest text-xs">Praćenje</h5>
                  <ul className="space-y-2 text-zinc-400">
                    <li>• Puls 24/7</li>
                    <li>• HRV (Varijabilnost Srčanog Ritma)</li>
                    <li>• Saturacija SpO2</li>
                    <li>• Faze Sna</li>
                    <li>• Stres i Oporavak</li>
                    <li>• Tjelesna Temperatura</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-black text-yellow-500 mb-4 uppercase tracking-widest text-xs">Kompatibilnost</h5>
                  <ul className="space-y-2 text-zinc-400">
                    <li>• iOS 14.0+</li>
                    <li>• Android 8.0+</li>
                    <li>• Apple Health</li>
                    <li>• Google Fit</li>
                    <li>• Strava Integracija</li>
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
                Besplatna Aplikacija
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4 md:mb-6 text-zinc-900">
                Vaši Podaci.<br/><span className="gold-gradient italic">Uvijek s Vama.</span>
              </h2>
              <p className="text-zinc-500 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                Aplikacija AuraRing Pro pretvara sirove podatke u praktične savjete. Pratite san, stres i učinkovitost u elegantnom sučelju.
              </p>
              <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                {[
                  "Personalizirani nadzorni panel s dnevnim rezultatom",
                  "Analiza tjednih i mjesečnih trendova",
                  "Pametne obavijesti za optimizaciju dana",
                  "Sinkronizacija s Apple Health i Google Fit",
                  "Bez pretplate - sve funkcije uključene u cijenu"
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
            subtitle="Stvarni Rezultati"
            title="Elita Je Već Izabrala"
            description="Profesionalci, sportaši i poduzetnici koji su promijenili svoju učinkovitost."
          />
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Marko K.",
                role: "CEO, Tech Startup",
                text: "Koristio sam Oura 2 godine. AuraRing Pro je s drugog planeta. Funkcija Neuro-Sync pomogla mi je razumjeti kada je moj mozak u vrhunskoj formi za kritične odluke.",
                rating: 5,
                metric: "+40% produktivnosti"
              },
              {
                name: "Ana S.",
                role: "Profesionalna Triatlonka",
                text: "14 dana baterije je istina. Tijekom Ironmana nikad nisam morala razmišljati o punjenju. Praćenje oporavka je preciznije od uređaja od 500€.",
                rating: 5,
                metric: "Osobni rekord -12min"
              },
              {
                name: "Dr. Tomislav M.",
                role: "Kardiolog",
                text: "Kao liječnik, skeptičan sam prema nosivim uređajima. Ali HRV i SpO2 podaci s AuraRing Pro su iznenađujuće precizni. Preporučujem pacijentima za praćenje sna.",
                rating: 5,
                metric: "Klinički validiran"
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
                <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-zinc-400">Ocjena</p>
              </div>
              <div className="hidden md:block w-px h-12 bg-zinc-200"></div>
              <div className="text-center px-2">
                <p className="text-2xl md:text-3xl font-black text-zinc-900">12.847</p>
                <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-zinc-400">Recenzija</p>
              </div>
              <div className="hidden md:block w-px h-12 bg-zinc-200"></div>
              <div className="text-center px-2">
                <p className="text-2xl md:text-3xl font-black text-zinc-900">98%</p>
                <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-zinc-400">Preporučuje</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI CONSULTANT */}
      <section id="ai" className="py-16 md:py-32 bg-white relative">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <SectionTitle subtitle="Bio-Strategija AI" title="Razgovarajte s Perfekcijom." />
          <div className="bg-zinc-50 rounded-2xl md:rounded-[3rem] border border-zinc-100 overflow-hidden shadow-2xl flex flex-col h-[450px] md:h-[600px]">
            <div className="p-4 md:p-6 bg-zinc-900 text-white flex justify-between items-center">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">Strateg Aktivan</span>
              </div>
              <span className="text-[9px] md:text-[10px] bg-yellow-600 px-2 md:px-3 py-1 rounded-full font-black">AI ELITE</span>
            </div>
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 md:space-y-6 bg-white/50 scrollbar-hide">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] md:max-w-[80%] p-4 md:p-6 rounded-xl md:rounded-[2rem] text-xs md:text-sm leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-700 border border-zinc-200'}`}>
                    {m.content || <span className="animate-pulse">Sinkroniziram bio-podatke...</span>}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 md:p-6 bg-zinc-50 border-t border-zinc-200 flex gap-2 md:gap-4">
              <input
                value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAiChat()}
                placeholder="Vaš cilj učinkovitosti?"
                className="flex-1 bg-white border border-zinc-200 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm focus:outline-none focus:border-yellow-600 transition-all"
              />
              <button onClick={handleAiChat} className="bg-yellow-600 text-white px-4 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-xs md:text-base hover:bg-yellow-500 shadow-lg">ANALIZIRAJ</button>
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
              ELITNA PONUDA ZAVRŠAVA ZA: {formatTime(timeLeft)}
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-8xl font-serif mb-6 leading-none">Ne Kupujte.<br/><span className="gold-gradient italic">Investirajte.</span></h2>
          </div>

          {/* Color Variants */}
          <div className="flex flex-col items-center gap-4 md:gap-6 mb-8 md:mb-12">
            <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-zinc-400">Odaberite svoj stil:</p>
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
            <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-zinc-400 md:mr-4">Veličina:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {[6, 7, 8, 9, 10, 11, 12, 13, 14].map((size) => (
                <button key={size} className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-zinc-200 text-xs md:text-sm font-bold hover:border-yellow-600 hover:bg-yellow-50 transition-all">
                  {size}
                </button>
              ))}
            </div>
            <button className="px-4 h-9 md:h-10 rounded-full border border-dashed border-zinc-300 text-[10px] md:text-xs font-bold text-zinc-400 hover:border-yellow-600 hover:text-yellow-600 transition-all mt-2 md:mt-0 md:ml-2">
              Ne znam svoju veličinu
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 md:gap-8 items-center">
            <div className="bg-white p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-zinc-100 order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Set za Veličinu</h3>
                  <span className="text-green-600 text-xs font-black">BESPLATNO</span>
                </div>
              </div>
              <p className="text-sm text-zinc-500 mb-8">Preciznost je temelj. Dobijte besplatni set za pronalaženje idealne veličine prije kupnje.</p>
              <ul className="space-y-3 text-xs font-bold text-zinc-600 mb-8">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                  12 Probnih Veličina (6-14)
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                  Vodič za Prilagodbu
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                  Besplatna Express Dostava
                </li>
              </ul>
              <button className="w-full py-4 rounded-2xl border-2 border-zinc-200 text-zinc-700 font-bold hover:border-zinc-400 transition-all">
                NARUČI BESPLATNI SET
              </button>
            </div>

            <div className="relative group lg:-mt-12 order-1 lg:order-2">
              <div className="absolute -inset-1 bg-yellow-600 blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-white p-8 md:p-16 rounded-[2rem] md:rounded-[4rem] border-2 border-yellow-600 shadow-2xl text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-600 text-white px-6 py-2 rounded-full font-black text-xs tracking-widest uppercase">NAJPRODAVANIJI</div>
                <h3 className="text-3xl font-black mb-2">AuraRing Pro</h3>
                <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">Limitirana Titan DLC Edicija</p>

                <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 rounded-full mb-8">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  <span className="text-[10px] font-bold text-zinc-600">Kutija za punjenje uključena: 150 dana ukupno</span>
                </div>

                <div className="mb-6 md:mb-10">
                  <span className="text-zinc-300 line-through text-xl md:text-2xl block mb-1">79,99 €</span>
                  <span className="text-5xl md:text-7xl font-black gold-gradient tracking-tighter">39,99 €</span>
                </div>
                <ul className="text-left space-y-3 md:space-y-4 mb-6 md:mb-10">
                  {[
                    "Neuro-Sync™ Predictor uključen",
                    "Baterija 14 dana (150 s kutijom)",
                    "Bez pretplate zauvijek",
                    "Titan DLC Grade 5 Aerospace",
                    "Premium aplikacija doživotno",
                    "Praćenje apneje u snu"
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
                  PREUZMITE KONTROLU
                </button>
                <p className="mt-6 text-[10px] text-zinc-400 font-bold uppercase tracking-[0.2em]">Serija 002: Samo 142 komada preostalo</p>
              </div>
            </div>

            <div className="bg-white p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-zinc-100 order-3">
              <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-zinc-900">Elite Jamstva</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                  </div>
                  <div>
                    <p className="font-bold text-zinc-900">30 Dana Povrata</p>
                    <p className="text-xs text-zinc-500">Ako ne osjetite razliku, vraćamo novac. Bez pitanja.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <p className="font-bold text-zinc-900">2 Godine Jamstva</p>
                    <p className="text-xs text-zinc-500">Puna zaštita na tvorničke greške i bateriju.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                  </div>
                  <div>
                    <p className="font-bold text-zinc-900">Besplatna Dostava</p>
                    <p className="text-xs text-zinc-500">Express dostava za 3-5 radnih dana u cijeloj Hrvatskoj.</p>
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
          <p className="text-zinc-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] md:tracking-[0.4em] mb-8 md:mb-12">Dizajnirano za Elitu</p>
          <div className="flex justify-center gap-6 md:gap-12 text-[10px] font-black uppercase tracking-widest text-zinc-500">
            <a href="#" className="hover:text-zinc-900 transition-colors">Privatnost</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Uvjeti</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Kontakt</a>
          </div>
          <p className="mt-8 md:mt-12 text-[10px] text-zinc-300 font-medium">© 2024 AuraRing Pro Labs.</p>
        </div>
      </footer>

      {/* ORDER MODAL */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] max-w-lg w-full p-8 md:p-12 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => { setShowOrderModal(false); setSubmitError(''); }}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-zinc-200 transition-colors"
            >
              <svg className="w-5 h-5 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-zinc-900 mb-2">Dovršite Narudžbu</h3>
              <p className="text-sm text-zinc-500">Unesite podatke za dostavu AuraRing Pro</p>
            </div>

            <form onSubmit={handleOrderSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-600 uppercase tracking-widest mb-2">Ime i Prezime</label>
                <input
                  type="text"
                  required
                  value={orderForm.name}
                  onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-yellow-500 focus:outline-none transition-colors"
                  placeholder="Ivan Horvat"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-600 uppercase tracking-widest mb-2">Adresa Dostave</label>
                <input
                  type="text"
                  required
                  value={orderForm.address}
                  onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-yellow-500 focus:outline-none transition-colors"
                  placeholder="Ul. Primjer 1, 10000 Zagreb"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-600 uppercase tracking-widest mb-2">Broj Telefona</label>
                <input
                  type="tel"
                  required
                  value={orderForm.phone}
                  onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-yellow-500 focus:outline-none transition-colors"
                  placeholder="+385 91 234 5678"
                />
              </div>

              <div className="bg-zinc-50 rounded-xl p-4 mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-zinc-600">AuraRing Pro</span>
                  <span className="font-bold">39,99 €</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-zinc-600">Dostava</span>
                  <span className="font-bold text-green-600">BESPLATNA</span>
                </div>
                <div className="border-t border-zinc-200 pt-2 mt-2 flex justify-between items-center">
                  <span className="font-bold">Ukupno</span>
                  <span className="text-2xl font-black gold-gradient">39,99 €</span>
                </div>
              </div>

              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-premium py-5 rounded-2xl text-white font-black text-xl shadow-xl mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'OBRAĐUJEM...' : 'POTVRDI NARUDŽBU'}
              </button>

              <p className="text-center text-[10px] text-zinc-400 mt-4">
                Plaćanje pouzećem. Vaši podaci su zaštićeni i sigurni.
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LandingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <div className="text-zinc-900 text-xl">Učitavanje...</div>
      </div>
    }>
      <LandingPageContent />
    </Suspense>
  );
}
