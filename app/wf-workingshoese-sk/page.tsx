
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Star,
  ArrowRight,
  TrendingUp,
  Award,
  Wind,
  XCircle,
  CheckCircle2,
  Shield,
  RotateCw,
  Cloud,
  Zap,
  Fingerprint,
  Lock,
  Truck,
  RotateCcw
} from 'lucide-react';

/**
 * VERTIX PRO - Landing Page SK
 * Slovak version for Next.js App Router
 */

const productImages = [
  '/images/scarpelavoro/s-l1200.webp',
  '/images/scarpelavoro/pimg_61811834488ce244955d.webp',
  '/images/scarpelavoro/pimg_a522a71d76b88d3fdd5e.webp',
  '/images/scarpelavoro/pimg_d44f7310a7ca15c077fd.webp',
  '/images/scarpelavoro/pimg_e3ed30386e844f0635a7.webp'
];

export default function LandingPage() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [selectedSize, setSelectedSize] = useState('42');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(productImages[0]);
  const [isZoomed, setIsZoomed] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  // UTM and tracking parameters
  const [trackingParams, setTrackingParams] = useState({
    aff_sub1: '',
    aff_sub2: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Get UTM params from URL
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      setTrackingParams({
        aff_sub1: urlParams.get('aff_sub1') || urlParams.get('utm_source') || '',
        aff_sub2: urlParams.get('aff_sub2') || urlParams.get('utm_campaign') || ''
      });
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.address) {
      alert('Prosím vyplňte všetky povinné polia');
      return;
    }

    setIsSubmitting(true);

    try {
      const params = new URLSearchParams({
        source_id: 'cac06d3486f2',
        aff_sub1: trackingParams.aff_sub1,
        aff_sub2: trackingParams.aff_sub2,
        name: formData.name,
        phone: formData.phone,
        address: `${formData.address} - Veľkosť: ${selectedSize}`
      });

      const response = await fetch('https://network.worldfilia.net/manager/inventory/buy/sfn_workingshoes_sk.json?api_key=bzIGfLM1XwmR4l44_6rydQ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString()
      });

      if (response.ok) {
        router.push('/ty/ty-wf-workingshoese-sk');
      } else {
        router.push('/ty/ty-wf-workingshoese-sk');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      router.push('/ty/ty-wf-workingshoese-sk');
    } finally {
      setIsSubmitting(false);
    }
  };

  const sizes = ['38', '39', '40', '41', '42', '43', '44', '45', '46'];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden selection:bg-yellow-500 selection:text-slate-900">

      {/* --- STYLES (Inline to ensure self-containment) --- */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&family=Oswald:wght@500;700&display=swap');

        .font-oswald { font-family: 'Oswald', sans-serif; }
        .premium-gradient { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
      `}</style>

      {/* --- NAVIGATION --- */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-xl py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-yellow-500 p-1.5 rounded-lg">
              <ShieldCheck className="text-slate-900 w-6 h-6" />
            </div>
            <span className="font-oswald text-2xl font-bold tracking-tighter text-white uppercase italic">
              VERTIX <span className="text-yellow-500">PRO</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-white font-medium text-sm">
            <a href="#features" className="hover:text-yellow-500 transition-colors uppercase tracking-widest text-[10px] font-black">Technológia</a>
            <a href="#comparison" className="hover:text-yellow-500 transition-colors uppercase tracking-widest text-[10px] font-black">Porovnanie</a>
            <a href="#reviews" className="hover:text-yellow-500 transition-colors uppercase tracking-widest text-[10px] font-black">Recenzie</a>
            <button
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-yellow-500 text-slate-900 px-6 py-2 rounded-full font-black text-xs hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/20 uppercase italic"
            >
              OBJEDNAŤ TERAZ
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center pt-24 md:pt-0 premium-gradient overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-yellow-500 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500 rounded-full blur-[150px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-black mb-8 animate-float">
              <Star className="w-4 h-4 fill-yellow-500" />
              #1 PROFESIONÁLNA PRACOVNÁ OBUV 2024
            </div>
            <h1 className="font-oswald text-5xl sm:text-6xl lg:text-8xl font-bold text-white leading-[1] mb-8 uppercase tracking-tighter">
              ÚPLNÁ <span className="text-yellow-500">OCHRANA.</span><br/>ĽAHKÉ AKO PIERKO.
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed max-w-lg mx-auto md:mx-0 font-medium">
              Prestaňte obetovať svoj komfort kvôli bezpečnosti. S <span className="text-white font-bold">VERTIX PRO</span> získate balistickú ochranu vojenskej čižmy s pohodlím tenisky.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 mb-12">
              <button
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-10 py-6 rounded-2xl font-black text-2xl flex items-center justify-center gap-3 transition-all transform hover:scale-105 shadow-[0_20px_40px_rgba(251,191,36,0.3)] uppercase italic font-oswald tracking-tighter"
              >
                VYSKÚŠAJTE TERAZ <Zap className="fill-slate-900 w-6 h-6" />
              </button>
              <div className="flex flex-col items-center md:items-start gap-2">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 shadow-xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-slate-900 font-bold text-sm">
                      {['M', 'A', 'G', 'L'][i-1]}
                    </div>
                  ))}
                </div>
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">+12 000 SPOKOJNÝCH ZÁKAZNÍKOV</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto md:mx-0">
              <div className="flex items-center gap-3 text-slate-300 font-bold text-[10px] bg-white/5 p-4 rounded-2xl border border-white/10 uppercase tracking-widest">
                <ShieldCheck className="text-green-500 w-5 h-5" /> Titánová oceľ
              </div>
              <div className="flex items-center gap-3 text-slate-300 font-bold text-[10px] bg-white/5 p-4 rounded-2xl border border-white/10 uppercase tracking-widest">
                <ShieldCheck className="text-green-500 w-5 h-5" /> Anti-prepichnutie
              </div>
            </div>
          </div>

          <div className="relative flex justify-center items-center py-12 md:py-0">
            <div className="absolute inset-0 bg-yellow-500/20 blur-[120px] rounded-full"></div>
            <div className="relative z-10">
              <img
                src="/images/scarpelavoro/s-l1200.webp"
                alt="VERTIX PRO Stealth"
                className="w-full max-w-md h-auto rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] transform md:rotate-6 hover:rotate-0 transition-all duration-1000 ease-out border-4 border-white/10"
              />

              {/* Badges - Hidden on very small screens to avoid overlap, properly positioned elsewhere */}
              <div className="hidden sm:block absolute -top-10 -left-10 bg-white p-5 rounded-[2rem] shadow-2xl animate-float border border-slate-100">
                <div className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]">Hmotnosť</div>
                <div className="text-slate-900 font-black text-3xl font-oswald italic leading-none">380g</div>
              </div>

              <div className="hidden sm:block absolute -bottom-10 -right-6 bg-slate-900 p-6 rounded-[2rem] shadow-2xl border border-slate-700">
                <div className="text-yellow-500 font-black text-xl italic uppercase font-oswald tracking-tighter">Hyper-Lock™</div>
                <div className="text-white text-[9px] font-black tracking-[0.3em] opacity-50 uppercase mt-1">Bez šnúrok</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TRUST BAR --- */}
      <div className="bg-white py-6 md:py-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:flex md:flex-wrap justify-center gap-4 md:gap-20 items-center">
          <div className="flex items-center gap-2 md:gap-3 font-black text-[8px] md:text-[10px] tracking-[0.1em] md:tracking-[0.2em] opacity-40 uppercase">
            <Award className="w-4 h-4 md:w-5 md:h-5" /> Certifikát CE
          </div>
          <div className="flex items-center gap-2 md:gap-3 font-black text-[8px] md:text-[10px] tracking-[0.1em] md:tracking-[0.2em] opacity-40 uppercase">
            <ShieldCheck className="w-4 h-4 md:w-5 md:h-5" /> ISO 20345:2011
          </div>
          <div className="flex items-center gap-2 md:gap-3 font-black text-[8px] md:text-[10px] tracking-[0.1em] md:tracking-[0.2em] opacity-40 uppercase">
            <TrendingUp className="w-4 h-4 md:w-5 md:h-5" /> Top kvalita 2024
          </div>
          <div className="flex items-center gap-2 md:gap-3 font-black text-[8px] md:text-[10px] tracking-[0.1em] md:tracking-[0.2em] opacity-40 uppercase">
            <Wind className="w-4 h-4 md:w-5 md:h-5" /> 100% Priedušné
          </div>
        </div>
      </div>

      {/* --- PROBLEM / SOLUTION --- */}
      <section className="py-16 md:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10 md:mb-20">
            <h2 className="text-3xl md:text-6xl font-oswald font-bold mb-4 md:mb-6 uppercase italic tracking-tighter">ZBOHOM STARÝM PRACOVNÝM TOPÁNKAM</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg font-medium leading-relaxed px-2">Tvrdá práca vyžaduje moderné nástroje. Nezničte si nohy zastaranou obuvou.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-8 items-stretch">
            <div className="bg-red-50 p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-red-100 flex flex-col transition-transform hover:scale-[0.98]">
              <h3 className="text-lg md:text-2xl font-black text-red-700 mb-6 md:mb-10 flex items-center gap-2 md:gap-3 uppercase italic font-oswald tracking-tight">
                <XCircle className="w-6 h-6 md:w-8 md:h-8" /> MINULOSŤ
              </h3>
              <ul className="space-y-4 md:space-y-8 flex-grow">
                {[
                  "Ťažké cez 1kg: okamžitá svalová únava.",
                  "Neznesiteľné teplo: spotené nohy a pľuzgiere.",
                  "Špinavé šnúrky: neustále riziko zakopnutia.",
                  "Tvrdá podrážka: chronická bolesť kolien a chrbta.",
                  "Škaredý dizajn: nemožné nosiť mimo práce."
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 md:gap-4 text-red-900/50 font-bold text-xs md:text-sm">
                    <span className="shrink-0 text-red-400 font-black">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] border-4 border-green-500 shadow-[0_30px_60px_rgba(34,197,94,0.15)] flex flex-col transform md:scale-105 z-10 transition-transform">
              <h3 className="text-lg md:text-2xl font-black text-green-600 mb-6 md:mb-10 flex items-center gap-2 md:gap-3 uppercase italic font-oswald tracking-tight">
                <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8" /> BUDÚCNOSŤ: VERTIX PRO
              </h3>
              <ul className="space-y-4 md:space-y-8 flex-grow">
                {[
                  "Ultra-Light: zabudnete, že ich máte na nohách.",
                  "Aero-Tech Mesh: aktívna 360° ventilácia.",
                  "Hyper-Lock™: dokonalé zapnutie za sekundu.",
                  "Ergo-Memory: profesionálna ortopedická podpora.",
                  "Stealth Design: štýl sa stretáva s bezpečnosťou."
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 md:gap-5 text-slate-900 font-black text-sm md:text-base">
                    <CheckCircle2 className="shrink-0 text-green-500 w-5 h-5 md:w-6 md:h-6" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES --- */}
      <section id="features" className="py-16 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-24">
            <span className="text-yellow-600 font-black tracking-[0.2em] md:tracking-[0.4em] uppercase text-[9px] md:text-[10px] italic">Vynikajúce inžinierstvo</span>
            <h2 className="text-2xl md:text-7xl font-oswald font-bold mt-3 md:mt-4 mb-4 md:mb-8 uppercase italic tracking-tighter leading-none">TECHNOLÓGIA V SLUŽBÁCH<br/>VAŠEJ BEZPEČNOSTI.</h2>
            <div className="w-20 md:w-32 h-1.5 md:h-2.5 bg-yellow-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10">
            {[
              { icon: <Shield />, title: "Titánová oceľ", text: "Odolnosť voči nárazu do 200J. Certifikovaná balistická ochrana vašich prstov." },
              { icon: <RotateCw />, title: "Hyper-Lock™", text: "Mikrometrický rotačný systém. Žiadne šnúrky, len milimetrové okamžité zapnutie." },
              { icon: <Cloud />, title: "Aero-Ventilácia", text: "3D priedušné vlákno, ktoré odvádza teplo a vlhkosť. Svieže nohy aj v lete." },
              { icon: <Lock />, title: "Kevlarová podrážka", text: "Nepriepustná vnútorná podrážka. Klince a plechy nemajú žiadnu šancu." },
              { icon: <Zap />, title: "X-Shock Absorber", text: "Reaktívna tlmiaca technológia. Eliminuje stres z nárazu na pätu." },
              { icon: <Fingerprint />, title: "Extrémne priľnavosť", text: "Zmes podrážky optimalizovaná pre klzké povrchy, oleje a priemyselné kvapaliny." }
            ].map((f, i) => (
              <div key={i} className="group p-4 md:p-12 rounded-2xl md:rounded-[3.5rem] bg-slate-50 hover:bg-slate-900 transition-all duration-500 border border-slate-100 hover:shadow-2xl hover:-translate-y-3">
                <div className="mb-4 md:mb-8 text-yellow-500 group-hover:scale-110 transition-transform origin-left [&>svg]:w-8 [&>svg]:h-8 md:[&>svg]:w-12 md:[&>svg]:h-12">
                  {f.icon}
                </div>
                <h3 className="text-base md:text-2xl font-oswald font-bold mb-2 md:mb-5 uppercase italic group-hover:text-white tracking-tighter">{f.title}</h3>
                <p className="text-slate-500 group-hover:text-slate-400 leading-relaxed font-bold text-[10px] md:text-sm">
                  {f.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- COMPARISON --- */}
      <section id="comparison" className="py-16 md:py-32 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-6xl font-oswald font-bold text-center mb-10 md:mb-20 uppercase italic tracking-tighter">PREČO VERTIX PRO?</h2>

          <div className="overflow-x-auto rounded-2xl md:rounded-[3rem] border border-slate-800 bg-slate-900/50 backdrop-blur-3xl shadow-2xl">
            <table className="w-full text-left border-collapse min-w-[320px]">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="py-4 md:py-10 px-3 md:px-8 text-slate-500 font-black uppercase text-[8px] md:text-[10px] tracking-wider md:tracking-widest">Detail</th>
                  <th className="py-4 md:py-10 px-3 md:px-8 bg-yellow-500 text-slate-900 font-black text-center uppercase tracking-tight md:tracking-tighter text-xs md:text-xl italic">VERTIX PRO</th>
                  <th className="py-4 md:py-10 px-3 md:px-8 text-slate-500 font-black text-center uppercase text-[8px] md:text-[10px] tracking-wider md:tracking-widest">OSTATNÍ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {[
                  { label: "Hmotnosť", us: "380g", them: "900g+" },
                  { label: "Zapínanie", us: "Hyper-Lock™", them: "Šnúrky" },
                  { label: "Špička", us: "Titán", them: "Štandard" },
                  { label: "Podrážka", us: "Kevlar", them: "Tuhá" },
                  { label: "Komfort", us: "Memory", them: "Žiadny" }
                ].map((row, i) => (
                  <tr key={i} className="group hover:bg-white/5 transition-colors">
                    <td className="py-4 md:py-8 px-3 md:px-8 font-black text-slate-400 text-[10px] md:text-xs italic uppercase tracking-wider md:tracking-widest">{row.label}</td>
                    <td className="py-4 md:py-8 px-3 md:px-8 text-center text-yellow-500 font-black bg-yellow-500/5 text-xs md:text-lg italic tracking-tight md:tracking-tighter">{row.us}</td>
                    <td className="py-4 md:py-8 px-3 md:px-8 text-center text-slate-600 font-bold text-[10px] md:text-xs">{row.them}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section id="reviews" className="py-16 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-6xl font-oswald font-bold mb-10 md:mb-20 uppercase italic tracking-tighter">ČO HOVORIA ZÁKAZNÍCI</h2>
          <div className="grid md:grid-cols-3 gap-4 md:gap-10">
            {[
              { name: "Marek V.", role: "Stavbyvedúci", text: "Nikdy som nemal tak pohodlnú obuv za 20 rokov v práci. Systém bez šnúrok je revolúcia." },
              { name: "Andrej S.", role: "Mechanik", text: "Nosím ich v dielni celý deň. Ľahké ako pierko, ale skutočne chránia pred všetkým." },
              { name: "Jana R.", role: "Logistika", text: "Denne nachodím 15km. Už žiadna bolesť na konci smeny. Výnimočné." }
            ].map((r, i) => (
              <div key={i} className="bg-slate-50 p-6 md:p-10 rounded-2xl md:rounded-[3rem] border border-slate-100 flex flex-col text-left">
                <div className="flex text-yellow-500 mb-4 md:mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 md:w-5 md:h-5 fill-yellow-500" />)}
                </div>
                <p className="text-slate-700 font-bold italic mb-6 md:mb-10 text-sm md:text-lg leading-relaxed">&quot;{r.text}&quot;</p>
                <div className="mt-auto pt-4 md:pt-6 border-t border-slate-200">
                  <div className="font-black text-slate-900 uppercase italic tracking-tight text-sm md:text-base">{r.name}</div>
                  <div className="text-slate-400 text-[9px] md:text-[10px] font-black uppercase tracking-widest">{r.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section id="pricing" className="py-16 md:py-32 bg-slate-50 relative pb-32 md:pb-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-24 items-start">

            {/* Gallery */}
            <div className="space-y-4 md:space-y-8">
              <div
                className="bg-white p-2 md:p-4 rounded-2xl md:rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden group cursor-zoom-in"
                onClick={() => setIsZoomed(true)}
              >
                <img
                  src={selectedImage}
                  className="w-full rounded-xl md:rounded-[2.5rem] group-hover:scale-105 transition-transform duration-500"
                  alt="VERTIX PRO Stealth"
                />
              </div>
              <div className="grid grid-cols-5 gap-2 md:gap-3">
                {productImages.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`bg-white p-1 md:p-2 rounded-lg md:rounded-2xl shadow-sm cursor-pointer transition-all ${selectedImage === img ? 'border-2 border-yellow-500 scale-105' : 'border border-slate-100 hover:border-yellow-500'}`}
                  >
                    <img src={img} className="rounded-md md:rounded-xl aspect-square object-cover" alt="thumbnail" />
                  </div>
                ))}
              </div>
            </div>

            {/* Checkout Form */}
            <div className="bg-white p-6 md:p-14 rounded-2xl md:rounded-[3.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.1)] border-2 border-slate-100 relative mt-8 md:mt-0">
              <div className="absolute -top-4 md:-top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-yellow-500 font-black px-4 md:px-8 py-2 md:py-2.5 rounded-full text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] shadow-2xl border border-yellow-500/50 whitespace-nowrap">
                LIMITOVANÁ PONUKA
              </div>

              <div className="text-center mb-8 md:mb-12 mt-2 md:mt-0">
                <h3 className="text-2xl md:text-6xl font-oswald font-black uppercase italic tracking-tighter text-slate-900 leading-none">
                  VERTIX <span className="text-yellow-500">PRO</span> STEALTH
                </h3>
                <div className="flex justify-center items-center gap-1 text-yellow-500 mt-3 md:mt-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-yellow-500" />)}
                  <span className="text-slate-400 text-[9px] md:text-[10px] ml-2 font-black uppercase tracking-wider md:tracking-widest">(1.2k recenzií)</span>
                </div>
              </div>

              <div className="bg-slate-50 p-5 md:p-8 rounded-xl md:rounded-[2rem] mb-8 md:mb-12 border border-slate-100 text-center">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-wider md:tracking-widest italic">Úvodná cena</span>
                  <span className="bg-red-600 text-white px-2 md:px-3 py-1 rounded-lg font-black text-[8px] md:text-[9px] animate-pulse">ZĽAVA 62%</span>
                </div>
                <div className="flex items-baseline justify-center gap-3 md:gap-5">
                  <span className="text-5xl md:text-7xl font-black text-slate-900 italic font-oswald leading-none">€59,90</span>
                  <span className="text-xl md:text-3xl text-slate-300 line-through font-bold">€159</span>
                </div>
                <div className="mt-4 md:mt-6 flex flex-col gap-1 md:gap-2">
                  <p className="text-slate-500 font-black text-[10px] md:text-xs flex items-center justify-center gap-2 uppercase tracking-tight md:tracking-tighter">
                    <Truck className="w-3 h-3 md:w-4 md:h-4 text-green-500" /> + €5,90 Doprava (Express 48h)
                  </p>
                  <p className="text-green-600 font-black text-[9px] md:text-[10px] uppercase tracking-wider md:tracking-widest">Platba na dobierku k dispozícii</p>
                </div>
              </div>

              <form onSubmit={handleOrder} className="space-y-6 md:space-y-10 mb-8 md:mb-14">
                <div>
                  <label className="block text-[9px] md:text-[10px] font-black text-slate-400 uppercase mb-3 md:mb-5 tracking-[0.2em] md:tracking-[0.3em] italic">1. Vyberte veľkosť (EU)</label>
                  <div className="grid grid-cols-5 gap-2 md:gap-3">
                    {sizes.map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`py-3 md:py-5 rounded-xl md:rounded-2xl font-black text-base md:text-xl transition-all border-2 ${selectedSize === s ? 'border-yellow-500 bg-yellow-50 text-slate-900 shadow-xl scale-105' : 'border-slate-100 hover:border-slate-300 text-slate-400'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] md:text-[10px] font-black text-slate-400 uppercase mb-3 md:mb-5 tracking-[0.2em] md:tracking-[0.3em] italic">2. Vaše údaje</label>
                  <div className="space-y-3 md:space-y-4">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Celé meno *"
                      className="w-full px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl border-2 border-slate-100 focus:border-yellow-500 outline-none transition-colors text-sm md:text-base font-bold"
                      required
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Telefónne číslo *"
                      className="w-full px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl border-2 border-slate-100 focus:border-yellow-500 outline-none transition-colors text-sm md:text-base font-bold"
                      required
                    />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Adresa doručenia (ulica, mesto, PSČ) *"
                      className="w-full px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl border-2 border-slate-100 focus:border-yellow-500 outline-none transition-colors text-sm md:text-base font-bold"
                      required
                    />
                  </div>
                </div>

                <div className="p-4 md:p-6 bg-green-50 rounded-xl md:rounded-2xl border border-green-100 flex items-center gap-3 md:gap-5">
                  <div className="bg-green-500 p-2 md:p-3 rounded-xl md:rounded-2xl text-white shadow-lg shadow-green-500/20">
                    <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <div className="font-black text-green-700 uppercase italic text-xs md:text-sm tracking-tight">100% BEZPEČNÁ ZÁRUKA</div>
                    <div className="text-green-600/70 text-[9px] md:text-[10px] font-black uppercase tracking-wider md:tracking-widest">Zaplaťte kuriérovi pri prevzatí</div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full ${isSubmitting ? 'bg-slate-400' : 'bg-yellow-500 hover:bg-yellow-400'} text-slate-900 py-5 md:py-8 rounded-xl md:rounded-[2rem] font-black text-lg md:text-2xl flex flex-col items-center justify-center transition-all transform active:scale-95 shadow-2xl shadow-yellow-500/40 group overflow-hidden relative`}
                >
                  <div className="flex items-center gap-3 md:gap-5 uppercase italic font-oswald tracking-tighter relative z-10">
                    {isSubmitting ? 'SPRACOVÁVAM...' : 'OBJEDNAŤ TERAZ - PLATIŤ NESKÔR'} <ArrowRight className="group-hover:translate-x-3 transition-transform w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  {!isSubmitting && <span className="text-[8px] md:text-[9px] uppercase font-black tracking-[0.3em] md:tracking-[0.4em] opacity-50 mt-1 md:mt-2 relative z-10">Zostáva už len niekoľko kusov</span>}
                </button>
              </form>

              <div className="grid grid-cols-2 gap-4 md:gap-8 mt-8 md:mt-14 pt-6 md:pt-10 border-t border-slate-100">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="bg-slate-100 p-2 md:p-3 rounded-xl md:rounded-2xl"><Truck className="text-slate-900 w-4 h-4 md:w-5 md:h-5" /></div>
                  <div className="text-[8px] md:text-[9px] font-black text-slate-500 uppercase leading-relaxed tracking-[0.1em] md:tracking-[0.2em]">Rýchla<br/>dodávka 48h</div>
                </div>
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="bg-slate-100 p-2 md:p-3 rounded-xl md:rounded-2xl"><RotateCcw className="text-slate-900 w-4 h-4 md:w-5 md:h-5" /></div>
                  <div className="text-[8px] md:text-[9px] font-black text-slate-500 uppercase leading-relaxed tracking-[0.1em] md:tracking-[0.2em]">Jednoduchá<br/>vratka 30 dní</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-950 text-slate-500 py-12 md:py-24 pb-28 md:pb-24 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6 md:mb-10">
                <div className="bg-yellow-500 p-1.5 md:p-2 rounded-lg md:rounded-xl">
                  <ShieldCheck className="text-slate-900 w-5 h-5 md:w-6 md:h-6" />
                </div>
                <span className="font-oswald text-2xl md:text-3xl font-bold tracking-tighter text-white uppercase italic">
                  VERTIX <span className="text-yellow-500">PRO</span>
                </span>
              </div>
              <p className="max-w-md mb-6 md:mb-10 leading-relaxed font-medium text-slate-400 text-sm md:text-base">
                Vznikli sme s jediným cieľom: chrániť tých, ktorí budujú budúcnosť. Naša obuv spája balistické inžinierstvo s luxusným ortopedickým dizajnom.
              </p>
              <div className="flex gap-3 md:gap-4">
                {[1,2,3].map(i => (
                  <div key={i} className="w-10 h-10 md:w-14 md:h-14 bg-slate-900 border border-slate-800 rounded-xl md:rounded-2xl flex items-center justify-center hover:bg-yellow-500 hover:text-slate-900 hover:scale-110 transition-all cursor-pointer group">
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-current rounded-sm opacity-20 group-hover:opacity-100"></div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-black uppercase mb-6 md:mb-10 tracking-[0.2em] md:tracking-[0.3em] text-[9px] md:text-[10px] italic">Informácie</h4>
              <ul className="space-y-4 md:space-y-6 text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em] text-slate-600">
                <li><a href="#" className="hover:text-yellow-500 transition-colors">Právne podmienky</a></li>
                <li><a href="#" className="hover:text-yellow-500 transition-colors">Ochrana súkromia</a></li>
                <li><a href="#" className="hover:text-yellow-500 transition-colors">Pravidlá vrátenia</a></li>
                <li><a href="#" className="hover:text-yellow-500 transition-colors">Doprava</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black uppercase mb-6 md:mb-10 tracking-[0.2em] md:tracking-[0.3em] text-[9px] md:text-[10px] italic">Kontakt</h4>
              <ul className="space-y-4 md:space-y-6 text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em] text-slate-600">
                <li><a href="#" className="hover:text-yellow-500 transition-colors">Podpora 24/7</a></li>
                <li><a href="#" className="hover:text-yellow-500 transition-colors">Stav objednávky</a></li>
                <li><a href="#" className="hover:text-yellow-500 transition-colors">Tabuľka veľkostí</a></li>
                <li><a href="#" className="hover:text-yellow-500 transition-colors">E-mailová podpora</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 md:mt-24 pt-8 md:pt-12 border-t border-slate-900/50 text-center text-[8px] md:text-[9px] opacity-20 uppercase tracking-[0.3em] md:tracking-[0.6em] font-black text-white">
            © 2024 VERTIX PRO Official | SafeGear Slovakia
          </div>
        </div>
      </footer>

      {/* --- MOBILE CTA (Fixed at bottom) --- */}
      <div className="md:hidden fixed bottom-0 left-0 w-full p-4 bg-white/95 backdrop-blur-xl border-t border-slate-200 z-[110] shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <button
          onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
          className="w-full bg-yellow-500 text-slate-900 py-5 rounded-[1.5rem] font-black text-lg flex items-center justify-center gap-3 active:scale-95 transition-transform uppercase italic font-oswald tracking-tighter"
        >
          OBJEDNAŤ - PLATIŤ NA DOBIERKU <ArrowRight className="w-6 h-6" />
        </button>
      </div>

      {/* --- ZOOM MODAL --- */}
      {isZoomed && (
        <div
          className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-2 md:p-4 cursor-zoom-out"
          onClick={() => setIsZoomed(false)}
        >
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 md:p-3 transition-colors z-10"
          >
            <XCircle className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <img
            src={selectedImage}
            alt="VERTIX PRO Zoom"
            className="max-w-full max-h-[75vh] md:max-h-[85vh] rounded-xl md:rounded-3xl shadow-2xl"
          />
          <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3">
            {productImages.map((img, i) => (
              <div
                key={i}
                onClick={(e) => { e.stopPropagation(); setSelectedImage(img); }}
                className={`w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl overflow-hidden cursor-pointer transition-all ${selectedImage === img ? 'ring-2 ring-yellow-500 scale-110' : 'opacity-60 hover:opacity-100'}`}
              >
                <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
