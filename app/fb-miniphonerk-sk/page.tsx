"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Smartphone,
  ShieldCheck,
  Star,
  CheckCircle2,
  Menu,
  X,
  ShoppingCart,
  ArrowRight,
  Truck,
  PhoneCall,
  MapPin,
  User,
  PackageOpen,
  MousePointer2,
  AlertCircle
} from 'lucide-react';

const Section: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className = "", id }) => (
  <section id={id} className={`py-16 md:py-24 px-4 md:px-12 lg:px-24 overflow-hidden ${className}`}>
    {children}
  </section>
);

const ReviewCard: React.FC<{ name: string; date: string; rating: number; text: string; image: string }> = ({ name, date, rating, text, image }) => (
  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 md:p-8 rounded-2xl md:rounded-3xl hover:border-blue-500/30 transition-all duration-500 group text-left">
    <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
      <img src={image} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-blue-500/20" alt={name} />
      <div>
        <h4 className="font-bold text-base md:text-lg text-white">{name}</h4>
        <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest">{date}</p>
      </div>
    </div>
    <div className="flex gap-1 mb-3 md:mb-4">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-yellow-500 text-yellow-500" />
      ))}
    </div>
    <p className="text-gray-300 italic leading-relaxed font-light text-sm md:text-base">"{text}"</p>
    <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-white/5 flex items-center justify-between">
      <div className="flex items-center gap-2 text-[10px] md:text-xs text-green-500 font-bold">
        <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4" /> Overeny nakup
      </div>
    </div>
  </div>
);

function LandingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phone: ''
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.address && formData.phone && !isSubmitting) {
      setIsSubmitting(true);

      try {
        const apiFormData = new FormData();
        apiFormData.append('uid', '0198088f-a4bc-7ed8-89aa-83089fe0180e');
        apiFormData.append('key', 'ec15cab563da6cf51f0c7c');
        apiFormData.append('offer', '120');
        apiFormData.append('lp', '120');
        apiFormData.append('name', formData.fullName);
        apiFormData.append('tel', formData.phone);
        apiFormData.append('street-address', formData.address);

        // Get fingerprint if available
        const tmfp = (window as any).tmfp || '';
        if (tmfp) {
          apiFormData.append('tmfp', tmfp);
        } else {
          // Fallback to IP and UA
          apiFormData.append('ua', navigator.userAgent);
        }

        // UTM parameters
        const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'subid', 'subid2', 'subid3', 'subid4', 'pubid'];
        utmParams.forEach(param => {
          const value = searchParams.get(param);
          if (value) apiFormData.append(param, value);
        });

        await fetch('https://offers.supertrendaffiliateprogram.com/forms/api/', {
          method: 'POST',
          body: apiFormData,
        });

        router.push('/fb-miniphonerk-sk/ty');
      } catch (error) {
        console.error('Error submitting form:', error);
        router.push('/fb-miniphonerk-sk/ty');
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500 selection:text-white font-sans overflow-x-hidden">
      {/* Top Banner */}
      <div className="bg-blue-600 text-white text-[10px] md:text-xs py-2 text-center font-bold uppercase tracking-widest z-[60] relative">
        ⚡ PREMIÉROVÁ PONUKA: Zostáva len 14 kusov na sklade ⚡
      </div>

      {/* Navigation */}
      <nav className={`fixed top-8 w-full z-50 transition-all duration-300 px-4 md:px-0`}>
        <div className={`max-w-4xl mx-auto px-6 py-4 flex justify-between items-center rounded-full transition-all duration-300 ${scrolled ? 'bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl translate-y-[-20px]' : 'bg-transparent'}`}>
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, 'home')}
            className="text-xl font-bold tracking-tighter flex items-center gap-2 group cursor-pointer"
          >
            <Smartphone className="w-6 h-6 text-blue-500 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Mini 17 Pro</span>
          </a>

          <div className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            <a href="#vision" onClick={(e) => handleNavClick(e, 'vision')} className="hover:text-white transition-colors">Vízia</a>
            <a href="#confronto" onClick={(e) => handleNavClick(e, 'confronto')} className="hover:text-white transition-colors">Porovnanie</a>
            <a href="#recensioni" onClick={(e) => handleNavClick(e, 'recensioni')} className="hover:text-white transition-colors">Recenzie</a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#prezzo"
              onClick={(e) => handleNavClick(e, 'prezzo')}
              className="bg-white text-black px-6 py-2 rounded-full text-[10px] font-black tracking-widest hover:bg-blue-500 hover:text-white transition-all active:scale-95 shadow-lg uppercase"
            >
              OBJEDNAT TERAZ
            </a>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white p-2">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Section id="home" className="relative pt-32 md:pt-48 pb-16 md:pb-20 flex flex-col items-center text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] md:w-[800px] h-[300px] md:h-[500px] bg-blue-500/10 blur-[120px] rounded-full -z-10 pointer-events-none"></div>

        <span className="inline-block px-3 md:px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[8px] md:text-[10px] font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase mb-6 md:mb-8 text-blue-400 animate-pulse max-w-[90%] leading-relaxed">
          JEDINÝ SMARTFÓN, KTORÝ VÁM VRÁTI SLOBODU
        </span>

        <h1 className="text-4xl md:text-9xl font-black tracking-tighter leading-none mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">
          Budúcnosť.<br /><span className="text-blue-500">Vo Vrecku.</span>
        </h1>

        <p className="max-w-2xl text-base md:text-xl text-gray-400 mb-8 md:mb-12 leading-relaxed px-2 font-light italic">
          Zminiatúrizovali sme dokonalosť. Mini 17 Pro nie je kompromis, je to vyhlásenie nezávislosti od obrovských telefónov.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-12 md:mb-24">
          <a
            href="#prezzo"
            onClick={(e) => handleNavClick(e, 'prezzo')}
            className="bg-blue-600 text-white px-6 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl text-sm md:text-lg font-black tracking-tight flex items-center justify-center gap-2 md:gap-3 group hover:bg-blue-500 hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] transition-all active:scale-95"
          >
            CHCEM SVOJ MINI <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="relative w-full max-w-4xl mx-auto group cursor-crosshair">
          <div className="absolute -inset-10 bg-blue-500/20 blur-[100px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <img
            src="/images/miniphone17/1.png"
            className="w-full h-auto rounded-[3rem] shadow-2xl border border-white/10 relative z-10 scale-100 group-hover:scale-[1.01] transition-transform duration-700"
            alt="Mini 17 Pro Hero"
          />
        </div>
      </Section>

      {/* ERGONOMIA Section */}
      <Section id="vision" className="bg-neutral-950 border-y border-white/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="relative order-2 md:order-1">
            <div className="absolute -inset-4 bg-red-500/10 blur-3xl rounded-full"></div>
            <div className="bg-white/5 backdrop-blur-md border border-red-500/20 p-5 md:p-10 rounded-2xl md:rounded-[3rem] relative z-10">
               <h3 className="text-lg md:text-2xl font-black mb-4 md:mb-6 flex items-center gap-2 text-red-500 uppercase tracking-tight">
                 <AlertCircle className="w-5 h-5 md:w-6 md:h-6" /> "Pasca" Gigantov
               </h3>
               <div className="space-y-4 md:space-y-6 text-left">
                  <div className="flex gap-3 md:gap-4">
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-red-500/20 flex-shrink-0 flex items-center justify-center text-red-500 font-black text-sm">1</div>
                    <p className="text-gray-400 text-xs md:text-sm"><strong>Chronická bolesť:</strong> Unavené zápästia a deformovaný "malíček od smartfónu".</p>
                  </div>
                  <div className="flex gap-3 md:gap-4">
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-red-500/20 flex-shrink-0 flex items-center justify-center text-red-500 font-black text-sm">2</div>
                    <p className="text-gray-400 text-xs md:text-sm"><strong>Neustále rozptýlenie:</strong> Obrovské obrazovky, aby vás držali prilepených k médiám.</p>
                  </div>
                  <div className="flex gap-3 md:gap-4">
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-red-500/20 flex-shrink-0 flex items-center justify-center text-red-500 font-black text-sm">3</div>
                    <p className="text-gray-400 text-xs md:text-sm"><strong>Nepraktickosť:</strong> Deformované vrecká a nemožná obsluha jednou rukou.</p>
                  </div>
               </div>
            </div>
          </div>
          <div className="text-left order-1 md:order-2">
            <h2 className="text-2xl md:text-6xl font-black mb-4 md:mb-8 tracking-tighter leading-tight">
              Navrhnutý pre <br /> <span className="text-blue-500 italic">Ľudskú Ruku.</span>
            </h2>
            <p className="text-base md:text-xl text-gray-400 mb-6 md:mb-8 font-light leading-relaxed">
              "Zóna palca" Mini 17 Pro pokrýva 100% obrazovky. Už nikdy nebudete potrebovať dve ruky na odoslanie správy.
            </p>
            <div className="flex items-center gap-3 md:gap-4 p-4 md:p-6 bg-blue-500/5 rounded-2xl md:rounded-3xl border border-blue-500/10">
               <MousePointer2 className="text-blue-500 w-8 h-8 md:w-10 md:h-10 animate-bounce flex-shrink-0" />
               <span className="text-xs md:text-sm font-black text-blue-300 uppercase tracking-wider md:tracking-widest">Motorická efektívnosť +85%</span>
            </div>
          </div>
        </div>
      </Section>

      {/* CONFRONTO Section */}
      <Section id="confronto" className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-6xl font-black mb-4 md:mb-6 tracking-tight uppercase">Prečo je Mini Lepší.</h2>
          <p className="text-gray-400 text-sm md:text-lg font-light">Porovnanie, ktoré veľké značky skrývajú.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-8 max-w-4xl mx-auto">
           {/* Competitor */}
           <div className="p-4 md:p-8 border border-white/5 rounded-2xl md:rounded-[2.5rem] bg-neutral-900/50 opacity-50 grayscale transition-all hover:grayscale-0">
              <h4 className="text-xs md:text-xl font-black mb-4 md:mb-8 text-gray-500 uppercase tracking-wider md:tracking-widest italic">Bežní "Veľkí"</h4>
              <ul className="space-y-3 md:space-y-6 font-medium">
                 <li className="flex items-center justify-between text-[10px] md:text-sm">
                    <span>Váha</span>
                    <span className="text-gray-400">240g+</span>
                 </li>
                 <li className="flex items-center justify-between text-[10px] md:text-sm">
                    <span>Jedna ruka</span>
                    <span className="text-red-500 uppercase font-black">Nie</span>
                 </li>
                 <li className="flex items-center justify-between text-[10px] md:text-sm">
                    <span>Praktickosť</span>
                    <span className="text-gray-400 italic">Zlá</span>
                 </li>
                 <li className="flex items-center justify-between text-[10px] md:text-sm">
                    <span>Cena</span>
                    <span className="text-gray-300">400€+</span>
                 </li>
              </ul>
           </div>

           {/* Mini 17 Pro */}
           <div className="p-4 md:p-10 border-2 border-blue-500 rounded-2xl md:rounded-[2.5rem] bg-blue-500/5 relative shadow-[0_0_50px_rgba(37,99,235,0.1)]">
              <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[8px] md:text-[10px] font-black px-3 md:px-6 py-1 md:py-1.5 rounded-full uppercase tracking-wider md:tracking-[0.2em] shadow-xl whitespace-nowrap">
                Múdra Voľba
              </div>
              <h4 className="text-xs md:text-xl font-black mb-4 md:mb-8 text-white uppercase tracking-wider md:tracking-widest mt-2 md:mt-0">Mini 17 Pro</h4>
              <ul className="space-y-3 md:space-y-6 font-bold">
                 <li className="flex items-center justify-between text-[10px] md:text-sm">
                    <span>Váha</span>
                    <span className="text-blue-500 underline decoration-2">108g</span>
                 </li>
                 <li className="flex items-center justify-between text-[10px] md:text-sm">
                    <span>Jedna ruka</span>
                    <span className="text-blue-500 underline decoration-2 uppercase font-black">100%</span>
                 </li>
                 <li className="flex items-center justify-between text-[10px] md:text-sm">
                    <span>Praktickosť</span>
                    <span className="text-blue-500 underline decoration-2">Top</span>
                 </li>
                 <li className="flex items-center justify-between text-[10px] md:text-sm">
                    <span>Cena</span>
                    <span className="text-blue-500 text-sm md:text-xl font-black">79,99€</span>
                 </li>
              </ul>
           </div>
        </div>
      </Section>

      {/* GALLERIA PRODOTTO */}
      <Section className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-6xl font-black mb-4 md:mb-6 tracking-tight uppercase">Dizajn <span className="text-blue-500">Premium.</span></h2>
          <p className="text-gray-400 text-sm md:text-lg font-light">Každý detail bol dotvorený k dokonalosti.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4 md:gap-8">
          <div className="relative group overflow-hidden rounded-2xl md:rounded-[3rem]">
            <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
            <img
              src="/images/miniphone17/2.png"
              className="w-full h-auto object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
              alt="Mini 17 Pro Design"
            />
          </div>
          <div className="relative group overflow-hidden rounded-2xl md:rounded-[3rem]">
            <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
            <img
              src="/images/miniphone17/3.png"
              className="w-full h-auto object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
              alt="Mini 17 Pro Detail"
            />
          </div>
        </div>
      </Section>

      {/* UNBOXING Section */}
      <Section className="bg-white text-black py-16 md:py-32 rounded-2xl md:rounded-[6rem] mx-2 md:mx-12 overflow-hidden shadow-inner">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-20 items-center">
           <div className="text-left">
              <span className="text-blue-600 font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-[9px] md:text-[10px] mb-4 md:mb-6 block">Emócia Vlastníctva</span>
              <h2 className="text-3xl md:text-7xl font-black mb-4 md:mb-8 tracking-tighter leading-[0.9] uppercase">Rozbaľte <br />Dokonalosť.</h2>
              <p className="text-sm md:text-xl text-gray-600 mb-6 md:mb-10 leading-relaxed font-light italic">
                Od okamihu dotyku soft-touch obalu po pocit titánu na koži. Elitný senzorický zážitok.
              </p>
              <div className="flex gap-6 md:gap-8">
                 <div className="flex flex-col items-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600/10 rounded-full flex items-center justify-center mb-2">
                       <PackageOpen className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                    </div>
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-wider md:tracking-widest">Eco-Luxury Box</span>
                 </div>
                 <div className="flex flex-col items-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600/10 rounded-full flex items-center justify-center mb-2">
                       <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                    </div>
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-wider md:tracking-widest">Kit Pro v balení</span>
                 </div>
              </div>
           </div>
           <div className="relative group perspective-1000">
              <img
                src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=1200&auto=format&fit=crop"
                className="rounded-2xl md:rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.3)] scale-95 group-hover:scale-100 transition-all duration-700 group-hover:rotate-1"
                alt="Unboxing Experience"
              />
           </div>
        </div>
      </Section>

      {/* Reviews Section */}
      <Section id="recensioni" className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-20">
          <h2 className="text-2xl md:text-6xl font-black mb-4 md:mb-6 tracking-tight uppercase">Čo o nás hovoria.</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-yellow-500 text-yellow-500" />)}
            </div>
            <p className="text-sm md:text-lg text-gray-400 font-light">4800+ 5-hviezdičkových recenzií</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          <ReviewCard
            name="Peter K."
            date="Pred 2 dňami"
            rating={5}
            image="https://picsum.photos/100/100?random=20"
            text="Neuveriteľné. Zaplatil som pri prevzatí, dostal som za 24 hodín. Už sa nikdy nevrátim k obrovskému telefónu. Kvalita titánu je úžasná."
          />
          <ReviewCard
            name="Jana M."
            date="Včera"
            rating={5}
            image="https://picsum.photos/100/100?random=21"
            text="Konečne môžem robiť všetko jednou rukou držiac kávu. Fotoaparát robí úžasné fotky v noci. Lepší ako originál."
          />
          <ReviewCard
            name="Martin V."
            date="Minulý týždeň"
            rating={5}
            image="https://picsum.photos/100/100?random=23"
            text="Technologický klenot. Dizajn je bezchybný a rýchlosť pôsobivá. Najlepší nákup roka, bez pochýb."
          />
        </div>
      </Section>

      {/* Pricing Section */}
      <Section id="prezzo" className="max-w-6xl mx-auto relative scroll-mt-20">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-7xl font-black mb-4 md:mb-6 tracking-tight uppercase">Získajte Budúcnosť.</h2>
          <p className="text-gray-400 text-sm md:text-xl font-light leading-relaxed max-w-2xl mx-auto italic px-2">
            Žiadna platba vopred. Plaťte až keď <span className="text-white font-bold underline decoration-blue-500">sa dotknete dokonalosti</span> na vlastné oči.
          </p>
        </div>

        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl md:rounded-[4rem] blur-2xl opacity-20"></div>
          <div className="relative bg-white/5 backdrop-blur-xl p-5 md:p-16 rounded-2xl md:rounded-[4rem] border border-white/10 shadow-3xl">

            <div className="grid lg:grid-cols-2 gap-8 md:gap-20 items-center">
              {/* Left side: Product Info */}
              <div className="text-left space-y-6 md:space-y-10">
                <div>
                  <div className="inline-block bg-blue-600 text-white px-4 md:px-6 py-1.5 md:py-2 rounded-full text-[8px] md:text-[10px] font-black uppercase mb-4 md:mb-8 tracking-[0.2em] md:tracking-[0.3em] shadow-lg shadow-blue-500/20">
                    Špeciálna Ponuka Aktívna
                  </div>
                  <h3 className="text-3xl md:text-6xl font-black mb-4 md:mb-6 tracking-tighter leading-none uppercase">Mini 17 Pro <br /><span className="text-blue-500">Titanium</span></h3>
                  <div className="flex items-baseline gap-3 md:gap-6 mb-4 md:mb-8">
                    <span className="text-gray-500 line-through text-2xl md:text-4xl font-light italic">299€</span>
                    <span className="text-5xl md:text-8xl font-black text-white tracking-tighter">79<span className="text-2xl md:text-4xl">,99€</span></span>
                  </div>
                </div>

                <div className="space-y-3 md:space-y-6">
                   <div className="flex items-center gap-3 md:gap-5 p-4 md:p-6 bg-white/5 rounded-xl md:rounded-[2rem] border border-white/5 hover:bg-white/10 transition-all">
                      <Truck className="w-7 h-7 md:w-10 md:h-10 text-blue-500 flex-shrink-0" />
                      <div>
                         <p className="font-black text-xs md:text-sm uppercase tracking-wider md:tracking-widest">Doprava Zadarmo Express</p>
                         <p className="text-[10px] md:text-xs text-gray-500">Po celom Slovensku za 24/48h</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3 md:gap-5 p-4 md:p-6 bg-white/5 rounded-xl md:rounded-[2rem] border border-white/5 hover:bg-white/10 transition-all">
                      <ShieldCheck className="w-7 h-7 md:w-10 md:h-10 text-blue-500 flex-shrink-0" />
                      <div>
                         <p className="font-black text-xs md:text-sm uppercase tracking-wider md:tracking-widest">30 Dní na Skúšku</p>
                         <p className="text-[10px] md:text-xs text-gray-500">Spokojnosť alebo Vrátenie</p>
                      </div>
                   </div>
                </div>

                <div className="flex items-center gap-3 md:gap-4">
                   <div className="flex -space-x-3 md:-space-x-4">
                     {[1,2,3,4,5].map(i => (
                       <img key={i} src={`https://picsum.photos/100/100?random=${i+50}`} className="w-8 h-8 md:w-12 md:h-12 rounded-full border-2 md:border-4 border-black" alt="Customer avatar" />
                     ))}
                   </div>
                   <p className="text-[10px] md:text-xs font-black text-blue-400 uppercase tracking-wider md:tracking-widest animate-pulse">Kusov: 14</p>
                </div>
              </div>

              {/* Right side: Order Form */}
              <div className="relative">
                <div className="absolute -inset-4 md:-inset-6 bg-blue-500/10 blur-3xl rounded-3xl opacity-50"></div>
                <form onSubmit={handleOrder} className="relative bg-black/60 backdrop-blur-2xl p-6 md:p-12 rounded-2xl md:rounded-[3rem] border border-white/10 space-y-5 md:space-y-8 shadow-2xl">
                  <div className="text-center mb-6 md:mb-10">
                    <h4 className="text-xl md:text-3xl font-black uppercase tracking-tight mb-2 italic">Údaje na Doručenie</h4>
                    <p className="text-[9px] md:text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] md:tracking-[0.3em]">Zaplatíte kuriérovi v hotovosti</p>
                  </div>

                  <div className="space-y-2 md:space-y-3 text-left">
                    <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em] text-gray-500 ml-3 md:ml-4">
                      Vaše meno a priezvisko
                    </label>
                    <div className="relative group">
                      <User className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-blue-500 group-focus-within:scale-110 transition-transform" />
                      <input
                        required
                        type="text"
                        placeholder="napr. Ján Novák"
                        className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-[1.5rem] pl-12 md:pl-16 pr-4 md:pr-6 py-4 md:py-5 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all placeholder:text-gray-700 text-sm md:text-base font-medium"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 md:space-y-3 text-left">
                    <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em] text-gray-500 ml-3 md:ml-4">
                      Úplná adresa
                    </label>
                    <div className="relative group">
                      <MapPin className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-blue-500 group-focus-within:scale-110 transition-transform" />
                      <input
                        required
                        type="text"
                        placeholder="Ulica, Číslo, Mesto a PSČ"
                        className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-[1.5rem] pl-12 md:pl-16 pr-4 md:pr-6 py-4 md:py-5 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all placeholder:text-gray-700 text-sm md:text-base font-medium"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 md:space-y-3 text-left">
                    <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em] text-gray-500 ml-3 md:ml-4">
                      Telefón na potvrdenie
                    </label>
                    <div className="relative group">
                      <PhoneCall className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-blue-500 group-focus-within:scale-110 transition-transform" />
                      <input
                        required
                        type="tel"
                        placeholder="+421 XXX XXX XXX"
                        className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-[1.5rem] pl-12 md:pl-16 pr-4 md:pr-6 py-4 md:py-5 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all placeholder:text-gray-700 text-sm md:text-base font-medium"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white px-6 md:px-8 py-4 md:py-6 rounded-xl md:rounded-[1.8rem] text-lg md:text-2xl font-black tracking-tight flex items-center justify-center gap-3 md:gap-4 hover:bg-blue-500 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_60px_rgba(37,99,235,0.4)] uppercase group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="w-6 h-6 md:w-8 md:h-8 group-hover:rotate-12 transition-transform" />
                    {isSubmitting ? 'ODOSIELAM...' : 'POTVRDIŤ TERAZ'}
                  </button>

                  <p className="text-[8px] md:text-[9px] text-gray-600 text-center font-bold uppercase tracking-wider md:tracking-widest leading-relaxed px-2">
                    Kliknutím potvrdzujete oboznámenie sa s podmienkami a súhlas s platbou na dobierku.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Trust Guarantee / FAQ Mini */}
      <Section className="max-w-4xl mx-auto text-center border-t border-white/5 pt-16 md:pt-32">
         <h4 className="text-xl md:text-3xl font-black mb-8 md:mb-16 uppercase tracking-tight italic">Žiadne Pochybnosti, Len Istoty.</h4>
         <div className="grid md:grid-cols-2 gap-8 md:gap-20 text-left">
            <div className="space-y-3 md:space-y-6">
               <h5 className="font-black text-blue-500 uppercase tracking-wider md:tracking-widest text-xs md:text-sm">Existuje riziko podvodu?</h5>
               <p className="text-sm md:text-base text-gray-400 leading-relaxed font-light">Odpoveď je kategorické nie. Platíte iba kuriérovi, keď máte balík v rukách. Môžete skontrolovať obal pred zaplatením.</p>
            </div>
            <div className="space-y-3 md:space-y-6">
               <h5 className="font-black text-blue-500 uppercase tracking-wider md:tracking-widest text-xs md:text-sm">A čo ak sa nezaľúbim?</h5>
               <p className="text-sm md:text-base text-gray-400 leading-relaxed font-light">Máte 30 dní na vyskúšanie Mini 17 Pro. Ak radšej chcete veľký telefón, vrátime vám všetko.</p>
            </div>
         </div>
      </Section>

      {/* Footer */}
      <footer className="py-16 md:py-32 border-t border-white/5 bg-neutral-950 pb-32 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-3 gap-10 md:gap-20 items-center">
          <div className="flex flex-col items-center md:items-start gap-4 md:gap-6">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, 'home')}
              className="flex items-center gap-2 font-black text-xl md:text-3xl tracking-tighter uppercase italic"
            >
              <Smartphone className="text-blue-500 w-6 h-6 md:w-8 md:h-8" />
              <span>Mini 17 Pro</span>
            </a>
            <p className="text-[10px] md:text-xs text-gray-600 max-w-xs text-center md:text-left leading-relaxed font-medium">
              Zminiatúrizovaná inovácia pre tých, ktorí nerobia kompromisy.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-500">
            <a href="#vision" onClick={(e) => handleNavClick(e, 'vision')} className="hover:text-white transition-colors">Vízia</a>
            <a href="#recensioni" onClick={(e) => handleNavClick(e, 'recensioni')} className="hover:text-white transition-colors">Recenzie</a>
            <a href="#prezzo" onClick={(e) => handleNavClick(e, 'prezzo')} className="hover:text-white transition-colors">Objednať</a>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2 md:gap-3">
            <div className="flex items-center gap-2 md:gap-3 text-green-500 text-[9px] md:text-[10px] font-black uppercase tracking-wider md:tracking-widest">
               <ShieldCheck className="w-4 h-4 md:w-5 md:h-5" /> Záruka 24 Mesiacov
            </div>
            <p className="text-[9px] md:text-[10px] text-gray-700 font-bold uppercase">© 2024 Mini Tech Revolution.</p>
          </div>
        </div>
      </footer>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[70] bg-black/98 backdrop-blur-3xl flex flex-col items-center justify-center gap-12 text-4xl font-black animate-fade-in md:hidden p-8">
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-10 right-10 text-white p-2 focus:rotate-90 transition-transform"><X className="w-12 h-12" /></button>
          <a href="#home" className="uppercase tracking-tighter hover:text-blue-500" onClick={(e) => handleNavClick(e, 'home')}>HOME</a>
          <a href="#vision" className="uppercase tracking-tighter hover:text-blue-500" onClick={(e) => handleNavClick(e, 'vision')}>VÍZIA</a>
          <a href="#confronto" className="uppercase tracking-tighter hover:text-blue-500" onClick={(e) => handleNavClick(e, 'confronto')}>POROVNANIE</a>
          <a href="#recensioni" className="uppercase tracking-tighter hover:text-blue-500" onClick={(e) => handleNavClick(e, 'recensioni')}>RECENZIE</a>
          <a
            href="#prezzo"
            onClick={(e) => handleNavClick(e, 'prezzo')}
            className="bg-blue-600 text-white px-16 py-6 rounded-3xl text-3xl font-black tracking-tighter shadow-2xl shadow-blue-600/30 active:scale-95 transition-transform"
          >
            OBJEDNAT TERAZ
          </a>
        </div>
      )}

      {/* Sticky Bottom Bar for Mobile Conversion */}
      <div className="md:hidden fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] p-5 bg-black/40 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] z-40 flex justify-between items-center px-8 shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
        <div className="flex flex-col text-left">
          <p className="text-[10px] text-gray-500 line-through font-bold">299€</p>
          <p className="text-2xl font-black text-white leading-none tracking-tighter">79,99€</p>
        </div>
        <a
          href="#prezzo"
          onClick={(e) => handleNavClick(e, 'prezzo')}
          className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl active:scale-95 transition-transform text-[11px] tracking-[0.2em] uppercase"
        >
          CHCEM TO
        </a>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <LandingPageContent />
    </Suspense>
  );
}
