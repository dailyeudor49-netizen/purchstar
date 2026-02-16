
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle,
  Star,
  Clock,
  ShieldCheck,
  Truck,
  ArrowRight,
  Flame,
  Wind,
  Sparkles,
  Menu,
  X,
  ShoppingBag,
  CreditCard,
  ThumbsUp,
  AlertTriangle,
  Zap,
  Gift,
  ExternalLink,
  ShieldAlert,
  RotateCw,
  ZapOff,
  Scissors
} from 'lucide-react';

// --- SOTTO-COMPONENTI INTERNI ---

const LiveSalesToast = () => {
  const [visible, setVisible] = useState(false);
  const [currentSale, setCurrentSale] = useState({ name: 'Maria', city: 'Lisboa' });
  const names = ['Maria', 'Ana', 'Joana', 'Sofia', 'Beatriz', 'Carolina', 'Ines', 'Mariana'];
  const cities = ['Lisboa', 'Porto', 'Braga', 'Coimbra', 'Faro', 'Setubal', 'Aveiro', 'Viseu'];

  useEffect(() => {
    const trigger = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      setCurrentSale({ name: randomName, city: randomCity });
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
    };

    const interval = setInterval(trigger, 15000);
    const initialTimeout = setTimeout(trigger, 3000);
    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 md:bottom-24 left-2 md:left-4 right-2 md:right-auto z-[90] bg-white p-2.5 md:p-3 rounded-xl md:rounded-2xl shadow-2xl border border-gray-100 flex items-center gap-2 md:gap-3 max-w-[280px] md:max-w-none">
      <div className="w-8 h-8 md:w-10 md:h-10 bg-rose-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
        <ShoppingBag size={14} className="md:w-[18px] md:h-[18px]" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] md:text-xs font-bold text-gray-900 uppercase tracking-tighter truncate">{currentSale.name} de {currentSale.city}</p>
        <p className="text-[9px] md:text-[10px] text-gray-500 font-medium">Comprou AuraStyler™</p>
      </div>
    </div>
  );
};

const TrustpilotBadge = () => (
  <div className="flex items-center gap-2 mb-4 bg-white/80 backdrop-blur inline-flex px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-[#00b67a] p-0.5 rounded-sm">
          <Star className="w-2.5 h-2.5 text-white fill-current" />
        </div>
      ))}
    </div>
    <span className="text-[10px] font-bold text-gray-800 uppercase tracking-tighter">Excelente 4.9/5 no Trustpilot</span>
  </div>
);

// --- COMPONENTE PRINCIPALE ---

// Countdown Timer Component
const CountdownTimer = () => {
  const [time, setTime] = useState({ hours: 2, minutes: 59, seconds: 47 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center gap-1 md:gap-2 text-white font-mono">
      <div className="bg-white/20 backdrop-blur px-2 md:px-3 py-1 rounded-lg">
        <span className="text-base md:text-xl font-black">{String(time.hours).padStart(2, '0')}</span>
      </div>
      <span className="text-base md:text-xl font-black">:</span>
      <div className="bg-white/20 backdrop-blur px-2 md:px-3 py-1 rounded-lg">
        <span className="text-base md:text-xl font-black">{String(time.minutes).padStart(2, '0')}</span>
      </div>
      <span className="text-base md:text-xl font-black">:</span>
      <div className="bg-white/20 backdrop-blur px-2 md:px-3 py-1 rounded-lg">
        <span className="text-base md:text-xl font-black">{String(time.seconds).padStart(2, '0')}</span>
      </div>
    </div>
  );
};

// Progress Bar for Stock
const StockProgress = () => {
  const [stock] = useState(7);
  const maxStock = 50;
  const percentage = (stock / maxStock) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
        <span className="text-rose-500">⚠️ Apenas {stock} unidades restantes</span>
        <span className="text-gray-400">{Math.round(100 - percentage)}% vendido</span>
      </div>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-rose-500 to-red-600 rounded-full transition-all duration-1000 animate-pulse"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

function LandingPageContent() {
  const searchParams = useSearchParams();
  const [showSticky, setShowSticky] = useState(false);
  const [formData, setFormData] = useState({ nome: '', morada: '', telefone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setShowSticky(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = new FormData();
      form.append('uid', '019be4ed-fb60-7ba4-89d4-deecc13c8b0a');
      form.append('key', '7b172b0b1994e9fa9961ad');
      form.append('offer', '2266');
      form.append('lp', '2305');
      form.append('name', formData.nome);
      form.append('street-address', formData.morada);
      form.append('tel', formData.telefone);

      // Get fingerprint or fallback to IP/UA
      const tmfp = (window as any).tmfp || '';
      if (tmfp) {
        form.append('tmfp', tmfp);
      } else {
        form.append('ua', navigator.userAgent);
      }

      // UTM parameters
      const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'subid', 'subid2', 'subid3', 'subid4', 'pubid'];
      utmParams.forEach(param => {
        const value = searchParams.get(param);
        if (value) form.append(param, value);
      });

      await fetch('https://offers.italiadrop.com/forms/api/', {
        method: 'POST',
        body: form,
      });

      window.location.href = '/fb-hairdryerdr-pt/ty';
    } catch (error) {
      console.error('Error submitting form:', error);
      window.location.href = '/fb-hairdryerdr-pt/ty';
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-rose-500 selection:text-white overflow-x-hidden">
      {/* Click Tracking Pixel */}
      <img
        src="https://offers.italiadrop.com/forms/api/ck/?o=2266&uid=019be4ed-fb60-7ba4-89d4-deecc13c8b0a&lp=2305"
        style={{ width: '1px', height: '1px', display: 'none' }}
        alt=""
      />

      {/* Top Banner - IMPROVED with countdown */}
      <div className="bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 text-white py-3 text-center sticky top-0 z-[60] shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6">
          <span className="text-[10px] md:text-xs font-black tracking-widest uppercase flex items-center gap-2">
            <Zap className="w-4 h-4 animate-pulse" /> OFERTA RELAMPAGO -72% TERMINA EM:
          </span>
          <CountdownTimer />
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-[52px] md:top-[56px] z-50">
        <div className="max-w-7xl mx-auto px-3 md:px-4 h-14 md:h-16 flex items-center justify-between">
          <div className="text-lg md:text-2xl font-black tracking-tighter uppercase italic">
            AURA<span className="text-rose-500 tracking-normal">STYLER™</span>
          </div>

          <div className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-widest">
            <a href="#unboxing" className="hover:text-rose-500 transition">O Kit</a>
            <a href="#features" className="hover:text-rose-500 transition">Tecnologia</a>
            <a href="#comparison" className="hover:text-rose-500 transition">Comparacao</a>
            <a href="#reviews" className="hover:text-rose-500 transition">Opinioes</a>
          </div>

          <a href="#order" className="bg-rose-500 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-black uppercase shadow-lg shadow-rose-200 active:scale-95 transition-all">
            ENCOMENDAR AGORA
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-4 md:pt-8 pb-8 md:pb-16 px-3 md:px-4 bg-[#fcfcfc] relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
          <div className="space-y-4 md:space-y-6 text-center lg:text-left">
            <TrustpilotBadge />
            <h1 className="text-3xl md:text-6xl lg:text-8xl font-black leading-[0.9] tracking-tighter uppercase">
              PENTEADO DE <span className="text-rose-500 italic">SALAO</span> EM SUA CASA.
            </h1>
            <p className="text-base md:text-xl text-gray-500 leading-tight max-w-xl mx-auto lg:mx-0 font-medium italic">
              "Adeus as chapinhas que queimam. Descubra o poder do ar Coanda."
            </p>

            {/* Mobile image - show before price card on mobile */}
            <div className="relative lg:hidden">
              <img src="/images/hairdryer/1.webp" className="rounded-2xl shadow-xl border-2 border-white w-full max-h-[250px] object-cover" alt="AuraStyler Kit Completo" />
            </div>

            <div className="bg-white p-5 md:p-8 rounded-2xl md:rounded-[3rem] shadow-xl md:shadow-2xl border border-gray-100 max-w-md mx-auto lg:mx-0 relative overflow-hidden">
               {/* Urgency ribbon */}
               <div className="absolute -right-10 top-4 md:-right-12 md:top-6 bg-red-600 text-white text-[8px] md:text-[9px] font-black px-10 md:px-12 py-1 md:py-1.5 rotate-45 uppercase tracking-widest shadow-lg">
                 Ultimas 7!
               </div>

               <div className="flex justify-between items-end mb-3 md:mb-4">
                 <div>
                    <span className="text-[10px] md:text-xs font-black text-rose-500 uppercase tracking-widest block mb-1">Oferta Especial</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl md:text-6xl font-black">69€</span>
                      <span className="text-gray-400 line-through font-bold text-sm md:text-base">249€</span>
                    </div>
                 </div>
                 <div className="text-right">
                    <span className="bg-rose-100 text-rose-600 px-2 md:px-3 py-1 rounded-full text-[9px] md:text-[10px] font-black uppercase animate-pulse">-72%</span>
                 </div>
               </div>

               {/* Stock Progress */}
               <div className="mb-4 md:mb-6">
                 <StockProgress />
               </div>

               <a href="#order" className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 md:py-6 rounded-xl md:rounded-2xl text-base md:text-xl font-black shadow-xl shadow-green-200 transition-all flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4 relative overflow-hidden group active:scale-[0.98]">
                 <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></span>
                 <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" /> SIM, QUERO AGORA <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
               </a>

               {/* Trust signals micro */}
               <div className="flex items-center justify-center gap-3 md:gap-4 text-[8px] md:text-[9px] font-bold text-gray-400 uppercase">
                 <span className="flex items-center gap-1"><Truck className="w-3 h-3" /> Gratis</span>
                 <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Garantia</span>
                 <span className="flex items-center gap-1"><CreditCard className="w-3 h-3" /> Paga depois</span>
               </div>
            </div>
          </div>
          {/* Desktop image only */}
          <div className="relative hidden lg:block">
            <img src="/images/hairdryer/1.webp" className="rounded-[3rem] shadow-2xl border-4 border-white w-full object-cover" alt="AuraStyler Kit Completo" />
          </div>
        </div>
      </section>

      {/* ACCESSORIES SECTION - THE HEART OF THE REQUEST */}
      <section id="unboxing" className="py-12 md:py-24 bg-white px-3 md:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-20">
            <h2 className="text-2xl md:text-5xl lg:text-7xl font-black mb-2 md:mb-4 uppercase tracking-tighter italic">O QUE INCLUI <span className="text-rose-500">A CAIXA.</span></h2>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] md:text-xs">5 acessorios profissionais incluidos</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10">
            {/* 1. Cone AirStyler Direito */}
            <div className="border-t-2 border-gray-100 pt-4 md:pt-8 group">
              <div className="w-10 h-10 md:w-16 md:h-16 bg-gray-50 rounded-xl md:rounded-2xl flex items-center justify-center text-rose-500 mb-3 md:mb-6 group-hover:bg-rose-500 group-hover:text-white transition-all">
                <RotateCw className="w-5 h-5 md:w-8 md:h-8" />
              </div>
              <h3 className="text-sm md:text-2xl font-black mb-1 md:mb-2 uppercase tracking-tighter leading-tight">Cone AirStyler (DIR)</h3>
              <p className="text-[8px] md:text-xs font-black text-gray-400 uppercase tracking-widest mb-2 md:mb-4">Para caracois no sentido horario</p>
              <p className="text-[10px] md:text-sm text-gray-600 leading-relaxed italic hidden md:block">
                Cria ondas volumosas e caracois definidos. Gracas ao fluxo de ar Coanda, o seu cabelo e atraido e envolve automaticamente a superficie do cone.
              </p>
            </div>

            {/* 2. Cone AirStyler Esquerdo */}
            <div className="border-t-2 border-gray-100 pt-4 md:pt-8 group">
              <div className="w-10 h-10 md:w-16 md:h-16 bg-gray-50 rounded-xl md:rounded-2xl flex items-center justify-center text-rose-500 mb-3 md:mb-6 group-hover:bg-rose-500 group-hover:text-white transition-all">
                <RotateCw className="w-5 h-5 md:w-8 md:h-8 scale-x-[-1]" />
              </div>
              <h3 className="text-sm md:text-2xl font-black mb-1 md:mb-2 uppercase tracking-tighter leading-tight">Cone AirStyler (ESQ)</h3>
              <p className="text-[8px] md:text-xs font-black text-gray-400 uppercase tracking-widest mb-2 md:mb-4">Para caracois no sentido anti-horario</p>
              <p className="text-[10px] md:text-sm text-gray-600 leading-relaxed italic hidden md:block">
                Indispensavel para criar simetria. Use este cone para o lado oposto do rosto e obtenha um look equilibrado e natural como no salao.
              </p>
            </div>

            {/* 3. Escova Alisadora */}
            <div className="border-t-2 border-gray-100 pt-4 md:pt-8 group">
              <div className="w-10 h-10 md:w-16 md:h-16 bg-gray-50 rounded-xl md:rounded-2xl flex items-center justify-center text-rose-500 mb-3 md:mb-6 group-hover:bg-rose-500 group-hover:text-white transition-all">
                <ZapOff className="w-5 h-5 md:w-8 md:h-8" />
              </div>
              <h3 className="text-sm md:text-2xl font-black mb-1 md:mb-2 uppercase tracking-tighter leading-tight">Escova Alisadora</h3>
              <p className="text-[8px] md:text-xs font-black text-gray-400 uppercase tracking-widest mb-2 md:mb-4">Adeus ao frizz</p>
              <p className="text-[10px] md:text-sm text-gray-600 leading-relaxed italic hidden md:block">
                Concebida com cerdas rigidas para disciplinar o cabelo com tendencia ao frizz. Obtenha um liso sedoso reduzindo drasticamente o uso de calor extremo.
              </p>
            </div>

            {/* 4. Escova Redonda */}
            <div className="border-t-2 border-gray-100 pt-4 md:pt-8 group">
              <div className="w-10 h-10 md:w-16 md:h-16 bg-gray-50 rounded-xl md:rounded-2xl flex items-center justify-center text-rose-500 mb-3 md:mb-6 group-hover:bg-rose-500 group-hover:text-white transition-all">
                <Sparkles className="w-5 h-5 md:w-8 md:h-8" />
              </div>
              <h3 className="text-sm md:text-2xl font-black mb-1 md:mb-2 uppercase tracking-tighter leading-tight">Escova Volumizadora</h3>
              <p className="text-[8px] md:text-xs font-black text-gray-400 uppercase tracking-widest mb-2 md:mb-4">Volume XXL</p>
              <p className="text-[10px] md:text-sm text-gray-600 leading-relaxed italic hidden md:block">
                Direciona o ar entre as madeixas para dar corpo e forma enquanto seca. Perfeito para modelar as pontas e dar aquele volume natural as raizes.
              </p>
            </div>

            {/* 5. Secador Pre-Styling */}
            <div className="border-t-2 border-gray-100 pt-4 md:pt-8 group">
              <div className="w-10 h-10 md:w-16 md:h-16 bg-gray-50 rounded-xl md:rounded-2xl flex items-center justify-center text-rose-500 mb-3 md:mb-6 group-hover:bg-rose-500 group-hover:text-white transition-all">
                <Wind className="w-5 h-5 md:w-8 md:h-8" />
              </div>
              <h3 className="text-sm md:text-2xl font-black mb-1 md:mb-2 uppercase tracking-tighter leading-tight">Pre-Styling Dryer</h3>
              <p className="text-[8px] md:text-xs font-black text-gray-400 uppercase tracking-widest mb-2 md:mb-4">Secagem rapida</p>
              <p className="text-[10px] md:text-sm text-gray-600 leading-relaxed italic hidden md:block">
                Leva o cabelo do estado molhado a humidade perfeita para comecar o styling. Fluxo de ar concentrado que respeita a queratina do cabelo.
              </p>
            </div>

            {/* Final Value Proposition Card */}
            <div className="bg-rose-500 p-5 md:p-10 rounded-2xl md:rounded-[3rem] text-white flex flex-col justify-center items-center text-center shadow-xl shadow-rose-200">
               <Gift className="w-8 h-8 md:w-12 md:h-12 mb-3 md:mb-6 animate-bounce" />
               <h3 className="text-base md:text-3xl font-black mb-2 md:mb-4 uppercase tracking-tighter leading-none">O SET COMPLETO <br/>E SEU POR 69€</h3>
               <p className="text-[8px] md:text-xs font-black uppercase tracking-wider md:tracking-[0.2em] mb-3 md:mb-6 text-rose-100">Em vez de 249,00€</p>
               <a href="#order" className="bg-white text-rose-500 px-4 md:px-8 py-2 md:py-3 rounded-full font-black uppercase text-[8px] md:text-[10px] tracking-widest hover:scale-105 transition-all">ENCOMENDAR AGORA</a>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase with GIF */}
      <section className="py-12 md:py-24 bg-gradient-to-b from-gray-50 to-white px-3 md:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-5xl lg:text-7xl font-black mb-2 md:mb-4 uppercase tracking-tighter italic">VEJA O <span className="text-rose-500">RESULTADO.</span></h2>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] md:text-xs">Styling profissional em poucos minutos</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center mb-8 md:mb-16">
            {/* GIF */}
            <div className="relative rounded-2xl md:rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
              <img src="/gif/hairdryer/1.gif" className="w-full h-auto" alt="AuraStyler em acao" />
              <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 bg-black/70 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4">
                <p className="text-white text-xs md:text-sm font-black uppercase tracking-wider">Efeito Coanda em acao</p>
                <p className="text-gray-300 text-[10px] md:text-xs italic">O cabelo envolve-se automaticamente</p>
              </div>
            </div>

            {/* Image 2 */}
            <div className="relative rounded-2xl md:rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
              <img src="/images/hairdryer/2.webp" className="w-full h-auto object-cover" alt="Resultado styling" />
              <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-rose-500 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-black uppercase">
                Antes e Depois
              </div>
            </div>
          </div>

          {/* Image 3 - Full width */}
          <div className="relative rounded-2xl md:rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
            <img src="/images/hairdryer/3.webp" className="w-full h-[200px] md:h-[400px] object-cover" alt="AuraStyler detalhe" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end">
              <div className="p-6 md:p-12 text-white">
                <h3 className="text-xl md:text-4xl font-black uppercase tracking-tighter mb-2">Design Premium</h3>
                <p className="text-gray-300 text-sm md:text-lg italic max-w-xl">Materiais de alta qualidade e tecnologia de ponta para resultados de salao.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Authority */}
      <div className="bg-gray-50 py-6 md:py-12 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-4 md:gap-20 opacity-30 grayscale contrast-125">
          <span className="text-xl md:text-3xl font-serif italic font-black">VOGUE</span>
          <span className="text-xl md:text-3xl font-sans font-black tracking-tighter italic">VanityFair</span>
          <span className="text-lg md:text-2xl font-serif font-black">COSMOPOLITAN</span>
          <span className="text-xl md:text-3xl font-sans font-black italic tracking-tighter underline">ELLE</span>
        </div>
      </div>

      {/* LOSS AVERSION SECTION - Neuromarketing */}
      <section className="py-12 md:py-24 bg-gradient-to-b from-gray-900 to-black px-3 md:px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-rose-500 rounded-full blur-[100px] md:blur-[150px]"></div>
          <div className="absolute bottom-0 right-1/4 w-48 md:w-96 h-48 md:h-96 bg-rose-500 rounded-full blur-[100px] md:blur-[150px]"></div>
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-8 md:mb-16">
            <span className="inline-block bg-rose-500/20 text-rose-400 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-4 md:mb-6 border border-rose-500/30">
              <AlertTriangle className="inline w-2.5 h-2.5 md:w-3 md:h-3 mr-1" /> A verdade que ninguem te conta
            </span>
            <h2 className="text-2xl md:text-7xl font-black text-white uppercase tracking-tighter italic leading-[0.9] mb-4 md:mb-6">
              CADA DIA QUE ESPERAS <br/><span className="text-rose-500">ESTAS A PERDER.</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto font-medium italic px-2">
              Nao e so uma questao de cabelo. E o tempo, o dinheiro e a confianca em ti mesma que deitas fora todas as manhas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-16">
            {[
              {
                icon: <Clock className="text-rose-500 w-6 h-6 md:w-10 md:h-10" />,
                value: "45 min",
                label: "Perdidos todas as manhas",
                desc: "Sao 273 horas por ano. 11 dias inteiros da tua vida em frente ao espelho."
              },
              {
                icon: <CreditCard className="text-rose-500 w-6 h-6 md:w-10 md:h-10" />,
                value: "1.200€+",
                label: "Desperdicados por ano",
                desc: "Entre cabeleireiro, tratamentos, produtos que prometem milagres e depois desiludem."
              },
              {
                icon: <Flame className="text-rose-500 w-6 h-6 md:w-10 md:h-10" />,
                value: "80%",
                label: "Cabelo danificado",
                desc: "As chapinhas tradicionais alcancam 230°C. O dano e irreversivel."
              }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 backdrop-blur border border-white/10 p-5 md:p-8 rounded-2xl md:rounded-[2.5rem] text-center group hover:bg-white/10 transition-all">
                <div className="mb-2 md:mb-4 flex justify-center">{item.icon}</div>
                <p className="text-3xl md:text-5xl font-black text-white mb-1 md:mb-2">{item.value}</p>
                <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-rose-400 mb-2 md:mb-4">{item.label}</p>
                <p className="text-[11px] md:text-sm text-gray-400 italic leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-rose-500/10 border-2 border-rose-500/30 rounded-2xl md:rounded-[3rem] p-6 md:p-14 text-center">
            <h3 className="text-lg md:text-4xl font-black text-white uppercase tracking-tighter mb-4 md:mb-6 italic leading-tight">
              "Espero para o proximo mes" = Mais 100€ deitados fora
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto mb-6 md:mb-8 text-sm md:text-lg font-medium">
              As 1.847 mulheres que ja encomendaram esta semana? <br/>
              <span className="text-rose-400 font-black">Amanha acordam com o penteado ja pronto.</span>
            </p>
            <a href="#order" className="inline-flex items-center gap-2 md:gap-3 bg-rose-500 text-white px-6 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase text-sm md:text-lg shadow-2xl shadow-rose-500/40 hover:scale-105 active:scale-95 transition-all">
              ENCOMENDAR AGORA <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </a>
            <p className="text-[8px] md:text-[10px] text-gray-500 mt-3 md:mt-4 font-bold uppercase tracking-widest">
              Oferta valida apenas hoje. Amanha o preco volta a 249€
            </p>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section id="comparison" className="py-12 md:py-24 bg-white px-3 md:px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-7xl font-black text-center mb-8 md:mb-16 tracking-tighter uppercase italic">Escolhe <span className="text-rose-500">com sabedoria.</span></h2>
          <div className="grid grid-cols-2 gap-0 border-2 md:border-4 border-gray-900 rounded-2xl md:rounded-[4rem] overflow-hidden">
             <div className="p-4 md:p-12 bg-gray-50 opacity-40">
                <p className="text-xs md:text-xl font-black mb-4 md:mb-8 uppercase text-gray-400">Marca Lider</p>
                <ul className="space-y-3 md:space-y-6">
                  <li className="flex gap-2 md:gap-3 text-[10px] md:text-sm font-bold text-gray-500 italic"><X className="text-red-500 shrink-0 w-4 h-4 md:w-5 md:h-5" /> <span>549,00€</span></li>
                  <li className="flex gap-2 md:gap-3 text-[10px] md:text-sm font-bold text-gray-500 italic"><X className="text-red-500 shrink-0 w-4 h-4 md:w-5 md:h-5" /> <span>Pagamento antecipado</span></li>
                  <li className="flex gap-2 md:gap-3 text-[10px] md:text-sm font-bold text-gray-500 italic"><X className="text-red-500 shrink-0 w-4 h-4 md:w-5 md:h-5" /> <span>Envio pago</span></li>
                </ul>
             </div>
             <div className="p-4 md:p-12 bg-white relative">
                <div className="absolute top-3 right-3 md:top-6 md:right-6">
                   <CheckCircle className="text-green-500 w-5 h-5 md:w-8 md:h-8" />
                </div>
                <p className="text-xs md:text-xl font-black mb-4 md:mb-8 uppercase text-rose-500">AuraStyler™</p>
                <ul className="space-y-3 md:space-y-6">
                  <li className="flex gap-2 md:gap-3 text-[10px] md:text-sm font-black italic"><CheckCircle className="text-green-500 shrink-0 w-4 h-4 md:w-5 md:h-5" /> <span>APENAS 69,00€</span></li>
                  <li className="flex gap-2 md:gap-3 text-[10px] md:text-sm font-black italic"><CheckCircle className="text-green-500 shrink-0 w-4 h-4 md:w-5 md:h-5" /> <span>Pagas na entrega</span></li>
                  <li className="flex gap-2 md:gap-3 text-[10px] md:text-sm font-black italic"><CheckCircle className="text-green-500 shrink-0 w-4 h-4 md:w-5 md:h-5" /> <span>Envio Gratis</span></li>
                </ul>
             </div>
          </div>
        </div>
      </section>

      {/* Amazon-Style Reviews */}
      <section id="reviews" className="py-12 md:py-24 bg-gray-50 px-3 md:px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-6xl font-black mb-8 md:mb-16 text-center tracking-tighter uppercase italic">Opinioes <span className="text-rose-500">Verificadas</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 items-center mb-8 md:mb-16 bg-white p-5 md:p-12 rounded-2xl md:rounded-[3rem] border border-gray-100">
            <div className="text-center md:text-left">
              <span className="text-5xl md:text-7xl font-black">4.9</span>
              <div className="flex gap-0.5 justify-center md:justify-start mt-2">
                 {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-orange-400 fill-current" />)}
              </div>
              <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400 mt-2">456 CLIENTES SATISFEITAS</p>
            </div>
            <div className="md:col-span-2 space-y-2 md:space-y-3">
               {[5, 4, 3, 2, 1].map(s => (
                 <div key={s} className="flex items-center gap-2 md:gap-4 text-[9px] md:text-[10px] font-black uppercase">
                    <span className="w-10 md:w-12">{s} ESTRELAS</span>
                    <div className="flex-1 h-2 md:h-3 bg-gray-100 rounded-full overflow-hidden">
                       <div className="h-full bg-orange-400" style={{ width: s === 5 ? '92%' : s === 4 ? '6%' : '1%' }}></div>
                    </div>
                    <span className="w-8 text-gray-400">{s === 5 ? '92%' : s === 4 ? '6%' : '1%'}</span>
                 </div>
               ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {[
              { a: "Maria R.", r: "Incrivel. Faz exatamente o que promete. Os caracois aguentam muito tempo!", d: "Hoje" },
              { a: "Ana L.", r: "Encomenda chegou em 24 horas. Paguei ao estafeta em dinheiro. Super recomendado!", d: "Ontem" },
              { a: "Sofia V.", r: "A escova alisadora e magica para quem tem o cabelo encrespado como eu.", d: "Ha 2 dias" },
              { a: "Joana C.", r: "Valor incrivel por 69 euros. Nao tem nada a invejar as marcas de 500 euros.", d: "Ha 3 dias" }
            ].map((rev, i) => (
              <div key={i} className="bg-white p-5 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-gray-100">
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                   <div className="w-8 h-8 md:w-10 md:h-10 bg-rose-50 rounded-full flex items-center justify-center font-black text-rose-500 text-sm md:text-base">{rev.a[0]}</div>
                   <div>
                     <p className="font-black text-[10px] md:text-xs uppercase">{rev.a}</p>
                     <p className="text-[8px] md:text-[9px] text-gray-400 font-bold uppercase">{rev.d}</p>
                   </div>
                </div>
                <div className="flex gap-0.5 mb-2 md:mb-3">
                   {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 md:w-3 md:h-3 text-orange-400 fill-current" />)}
                </div>
                <p className="text-[10px] md:text-sm font-black italic mb-2 md:mb-3">"Compra verificada"</p>
                <p className="text-gray-600 text-[11px] md:text-sm leading-relaxed italic">"{rev.r}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form */}
      <section id="order" className="py-12 md:py-24 bg-gray-900 px-3 md:px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-20 items-center">
          <div className="text-white text-center lg:text-left">
             <h2 className="text-3xl md:text-8xl font-black uppercase tracking-tighter leading-none italic mb-4 md:mb-8">PAGA AO <br/> <span className="text-rose-500">ESTAFETA.</span></h2>
             <p className="text-sm md:text-xl text-gray-400 font-medium italic mb-6 md:mb-10">"Nenhum cartao necessario. Pagas apenas quando tens o produto nas tuas maos."</p>
             <div className="space-y-2 md:space-y-4 hidden lg:block">
               {[
                 { t: "Pagamento em Dinheiro", i: <CreditCard className="w-5 h-5" /> },
                 { t: "Envio 24h Gratis", i: <Truck className="w-5 h-5" /> },
                 { t: "Garantia 2 Anos", i: <ShieldCheck className="w-5 h-5" /> }
               ].map((x, i) => (
                 <div key={i} className="flex items-center gap-3 md:gap-4 bg-white/5 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-white/10">
                    <div className="text-rose-500">{x.i}</div>
                    <p className="font-black text-xs md:text-sm uppercase tracking-widest">{x.t}</p>
                 </div>
               ))}
             </div>
             {/* Mobile trust badges - horizontal */}
             <div className="flex justify-center gap-4 lg:hidden">
               <div className="flex flex-col items-center gap-1 text-[9px] font-bold text-gray-400 uppercase">
                 <CreditCard className="w-5 h-5 text-rose-500" />
                 <span>Dinheiro</span>
               </div>
               <div className="flex flex-col items-center gap-1 text-[9px] font-bold text-gray-400 uppercase">
                 <Truck className="w-5 h-5 text-rose-500" />
                 <span>24h Gratis</span>
               </div>
               <div className="flex flex-col items-center gap-1 text-[9px] font-bold text-gray-400 uppercase">
                 <ShieldCheck className="w-5 h-5 text-rose-500" />
                 <span>2 Anos</span>
               </div>
             </div>
          </div>

          <div className="bg-white p-5 md:p-12 rounded-2xl md:rounded-[3rem] shadow-2xl relative overflow-hidden">
             {/* Form header badge */}
             <div className="absolute top-0 left-0 right-0 bg-green-500 text-white text-center py-1.5 md:py-2 text-[8px] md:text-[10px] font-black uppercase tracking-widest">
               ✓ 2.847 encomendas esta semana
             </div>

             <form onSubmit={handleOrder} className="space-y-3 md:space-y-5 mt-6 md:mt-8">
               <div className="text-center mb-4 md:mb-8">
                 <h3 className="text-xl md:text-3xl font-black uppercase tracking-tighter">Para onde enviamos?</h3>
                 <p className="text-[9px] md:text-[10px] font-black uppercase text-gray-400 tracking-widest mt-1 md:mt-2">Completa em 30 segundos • Pagas ao estafeta</p>
               </div>

               {/* Progress indicator */}
               <div className="flex items-center justify-center gap-1.5 md:gap-2 mb-4 md:mb-6">
                 <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ${formData.nome ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                 <div className={`w-6 md:w-8 h-0.5 ${formData.morada ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                 <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ${formData.morada ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                 <div className={`w-6 md:w-8 h-0.5 ${formData.telefone ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                 <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ${formData.telefone ? 'bg-green-500' : 'bg-gray-200'}`}></div>
               </div>

               <div className="relative">
                 <input
                   required
                   className={`w-full p-4 md:p-5 bg-gray-50 rounded-xl md:rounded-2xl outline-none border-2 transition-all font-bold text-sm md:text-base ${activeField === 'nome' ? 'border-rose-500 bg-white shadow-lg' : 'border-transparent'}`}
                   placeholder="Nome e Apelido *"
                   value={formData.nome}
                   onChange={e => setFormData({...formData, nome: e.target.value})}
                   onFocus={() => setActiveField('nome')}
                   onBlur={() => setActiveField(null)}
                 />
                 {formData.nome && <CheckCircle className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-green-500 w-4 h-4 md:w-5 md:h-5" />}
               </div>

               <div className="relative">
                 <input
                   required
                   className={`w-full p-4 md:p-5 bg-gray-50 rounded-xl md:rounded-2xl outline-none border-2 transition-all font-bold text-sm md:text-base ${activeField === 'morada' ? 'border-rose-500 bg-white shadow-lg' : 'border-transparent'}`}
                   placeholder="Morada completa *"
                   value={formData.morada}
                   onChange={e => setFormData({...formData, morada: e.target.value})}
                   onFocus={() => setActiveField('morada')}
                   onBlur={() => setActiveField(null)}
                 />
                 {formData.morada && <CheckCircle className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-green-500 w-4 h-4 md:w-5 md:h-5" />}
               </div>

               <div className="relative">
                 <input
                   required
                   type="tel"
                   className={`w-full p-4 md:p-5 bg-gray-50 rounded-xl md:rounded-2xl outline-none border-2 transition-all font-bold text-sm md:text-base ${activeField === 'telefone' ? 'border-rose-500 bg-white shadow-lg' : 'border-transparent'}`}
                   placeholder="Telefone (para o estafeta) *"
                   value={formData.telefone}
                   onChange={e => setFormData({...formData, telefone: e.target.value})}
                   onFocus={() => setActiveField('telefone')}
                   onBlur={() => setActiveField(null)}
                 />
                 {formData.telefone && <CheckCircle className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-green-500 w-4 h-4 md:w-5 md:h-5" />}
               </div>

               {/* Order summary */}
               <div className="bg-gray-50 rounded-xl md:rounded-2xl p-3 md:p-4 space-y-1.5 md:space-y-2 text-xs md:text-sm">
                 <div className="flex justify-between font-bold">
                   <span>AuraStyler™ Kit Completo</span>
                   <span className="line-through text-gray-400">249€</span>
                 </div>
                 <div className="flex justify-between font-bold text-green-600">
                   <span>Desconto -72%</span>
                   <span>-180€</span>
                 </div>
                 <div className="flex justify-between font-bold">
                   <span>Envio Expresso</span>
                   <span className="text-green-600">GRATIS</span>
                 </div>
                 <div className="border-t pt-2 flex justify-between font-black text-lg md:text-xl">
                   <span>TOTAL</span>
                   <span className="text-rose-500">69,00€</span>
                 </div>
               </div>

               <button
                 disabled={isSubmitting}
                 className="w-full py-4 md:py-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl md:rounded-2xl text-sm md:text-xl font-black uppercase shadow-2xl shadow-green-300 hover:from-green-600 hover:to-green-700 transform transition-all active:scale-[0.98] disabled:opacity-70 relative overflow-hidden group"
               >
                 <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></span>
                 {isSubmitting ? (
                   <span className="flex items-center justify-center gap-2">
                     <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                     A PROCESSAR...
                   </span>
                 ) : (
                   <span className="flex items-center justify-center gap-2">
                     <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" /> <span className="hidden md:inline">COMPLETAR ENCOMENDA - </span>PAGO AO ESTAFETA
                   </span>
                 )}
               </button>

               {/* Trust badges under button */}
               <div className="flex items-center justify-center gap-4 md:gap-6 pt-1 md:pt-2">
                 <div className="flex items-center gap-1 text-[8px] md:text-[9px] font-bold text-gray-400">
                   <ShieldCheck className="w-3 h-3 md:w-4 md:h-4 text-green-500" /> SSL Seguro
                 </div>
                 <div className="flex items-center gap-1 text-[8px] md:text-[9px] font-bold text-gray-400">
                   <Truck className="w-3 h-3 md:w-4 md:h-4 text-green-500" /> 24-48h
                 </div>
                 <div className="flex items-center gap-1 text-[8px] md:text-[9px] font-bold text-gray-400">
                   <RotateCw className="w-3 h-3 md:w-4 md:h-4 text-green-500" /> Devolucao facil
                 </div>
               </div>
             </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 md:py-20 bg-black text-white px-3 md:px-4 text-center pb-24 md:pb-20">
        <div className="text-xl md:text-2xl font-black tracking-tighter uppercase italic mb-4 md:mb-8">
           AURA<span className="text-rose-500 tracking-normal">STYLER™</span>
        </div>
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4 md:gap-10 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6 md:mb-12">
           <a href="#" className="hover:text-white transition">Politica de Privacidade</a>
           <a href="#" className="hover:text-white transition">Termos de Venda</a>
           <a href="#" className="hover:text-white transition">Direito de Arrependimento</a>
        </div>
        <p className="text-[8px] md:text-[10px] text-gray-700 font-black uppercase tracking-widest md:tracking-[0.4em] leading-relaxed">
          AURA STYLER™ NAO ESTA AFILIADA A DYSON LTD. <br/>
          A MARCA DYSON® PERTENCE AO SEU RESPETIVO PROPRIETARIO.
        </p>
      </footer>

      <LiveSalesToast />

      {/* Sticky Mobile CTA - IMPROVED */}
      <div className={`fixed bottom-0 left-0 right-0 z-[100] transition-all duration-500 transform lg:hidden ${showSticky ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="bg-white border-t-2 border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.15)] p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-gray-900">69€</span>
                <span className="text-sm text-gray-400 line-through">249€</span>
              </div>
              <span className="text-[9px] font-bold text-green-600 uppercase">Envio Gratis</span>
            </div>
            <a href="#order" className="flex-1 max-w-[200px] bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-2xl font-black text-sm shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all">
              ENCOMENDAR <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}

export default function LandingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center"><div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div></div>}>
      <LandingPageContent />
    </Suspense>
  );
}
