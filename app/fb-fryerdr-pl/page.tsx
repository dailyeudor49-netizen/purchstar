
"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ShieldCheck,
  Star,
  Timer,
  Truck,
  ShoppingCart,
  ShoppingBag,
  Shield,
  AlertTriangle,
  CheckCircle,
  Trash2,
  CheckCircle2,
  FlaskConical,
  Users,
  Scale,
  ChefHat,
  Zap,
  ThumbsUp,
  Info,
  ChevronRight,
  Loader2
} from 'lucide-react';

// --- MAIN LANDING PAGE COMPONENT ---
export default function LandingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    tel: '',
    streetAddress: ''
  });

  useEffect(() => {
    const handleScroll = () => setShowStickyCTA(window.scrollY > 800);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Get fingerprint from window if available
      const fingerprint = (window as unknown as { tmfp?: string }).tmfp || '';

      // Prepare form data
      const submitData = new URLSearchParams();
      submitData.append('uid', '019be4ed-fb60-7ba4-89d4-deecc13c8b0a');
      submitData.append('key', '7b172b0b1994e9fa9961ad');
      submitData.append('offer', '2538');
      submitData.append('lp', '2577');
      submitData.append('street-address', formData.streetAddress);
      submitData.append('tel', formData.tel);
      submitData.append('name', formData.name);

      if (fingerprint) {
        submitData.append('tmfp', fingerprint);
      } else {
        // Fallback to IP and UA if no fingerprint
        submitData.append('ua', navigator.userAgent);
      }

      // Add UTM parameters if present
      const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'subid', 'subid2', 'subid3', 'subid4', 'pubid'];
      utmParams.forEach(param => {
        const value = searchParams.get(param);
        if (value) submitData.append(param, value);
      });

      const response = await fetch('https://offers.italiadrop.com/forms/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: submitData.toString()
      });

      if (response.ok) {
        // Redirect to thank you page
        router.push('/fb-fryerdr-pl/ty');
      } else {
        alert('Wystąpił błąd. Spróbuj ponownie.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Wystąpił błąd. Spróbuj ponownie.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-orange-100 overflow-x-hidden">
      {/* Google Fonts & Smooth Scroll Fix */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&family=Playfair+Display:wght@700;900&display=swap');
        html { scroll-behavior: smooth; }
        section { scroll-margin-top: 80px; }
        .font-serif { font-family: 'Playfair Display', serif; }
      `}} />

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm h-16 px-4 md:px-12 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="bg-orange-600 p-1.5 rounded-lg shadow-lg shadow-orange-100">
            <Shield className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter">
            PURE<span className="text-orange-600">GLASS</span> <span className="hidden md:inline text-gray-300 font-light ml-1">XXL</span>
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8 font-bold text-[11px] uppercase tracking-widest text-gray-500">
          <button onClick={() => scrollTo('toxic')} className="hover:text-orange-600 transition-colors">Zdrowie</button>
          <button onClick={() => scrollTo('capacity')} className="hover:text-orange-600 transition-colors">Pojemność</button>
          <button onClick={() => scrollTo('reviews')} className="hover:text-orange-600 transition-colors">Opinie</button>
        </nav>
        <button onClick={() => scrollTo('order')} className="bg-orange-600 text-white px-5 py-2.5 rounded-xl font-black text-xs shadow-lg active:scale-95 transition-all flex items-center gap-2">
          <ShoppingCart className="w-4 h-4" />
          ZAMÓW TERAZ
        </button>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="relative pt-10 md:pt-16 pb-12 md:pb-20 px-4 md:px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-[10px] md:text-xs font-bold mb-6 tracking-wider uppercase">
              <AlertTriangle className="w-3.5 h-3.5" />
              Uwaga: Wykryto Toksyczne Substancje w Klasycznych Frytkowniacach
            </div>
            <h1 className="text-4xl md:text-7xl font-black leading-[1.1] mb-6 font-serif">
              Przestań <span className="text-red-600">Truć</span> Swoje Posiłki <span className="text-orange-600 underline decoration-4 underline-offset-8">Teflonem</span>.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Podczas gdy zwykłe frytkownice uwalniają PFOA i PFAS w wysokich temperaturach,
              nowa <strong>PureGlass 10L</strong> wykorzystuje wyłącznie <span className="text-green-600 font-bold">Certyfikowane Szkło Borokrzemianowe</span>.
              Maksymalna czystość, zero toksyczności, niezmieniony smak.
            </p>
            <div className="space-y-4 mb-10">
              {["Pojemność XXL 10 Litrów", "Kosz ze Szkła Przezroczystego 360°", "100% Bez substancji chemicznych", "Smak 3x intensywniejszy"].map((t, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="font-bold text-gray-800">{t}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-6">
              <button onClick={() => scrollTo('order')} className="w-full md:w-auto bg-orange-600 text-white text-lg font-bold px-10 py-5 rounded-2xl shadow-2xl hover:bg-orange-700 active:scale-95 transition-all flex flex-col items-center">
                CHCĘ GOTOWAĆ ZDROWO
                <span className="text-[10px] opacity-80 font-normal mt-1 italic">Rabat 50% aktywny jeszcze przez kilka minut</span>
              </button>
              <div className="flex items-center gap-4 px-4 py-3 border rounded-xl bg-gray-50 max-w-sm">
                <img src="https://picsum.photos/id/64/100/100" className="w-12 h-12 rounded-full border-2 border-white shadow-md flex-shrink-0" alt="Specjalista" />
                <div>
                  <p className="text-[10px] md:text-xs font-bold italic leading-tight text-gray-700">"Wreszcie jemy bez stresu. Krok naprzód dla zdrowia mojej rodziny."</p>
                  <p className="text-[8px] md:text-[10px] uppercase text-gray-500 font-bold mt-1">- Dr Anna Kowalska, Dietetyczka</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-orange-200 rounded-full blur-3xl opacity-20 animate-pulse hidden md:block"></div>
            <div className="relative bg-white rounded-[40px] p-3 shadow-2xl border border-gray-100 overflow-hidden">
              <img src="/images/airfryer/1.png" className="w-full rounded-[32px] hover:scale-105 transition-transform duration-700" alt="PureGlass XXL" />
              <div className="absolute top-8 right-8 bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-xl border border-orange-100 flex items-center gap-2 animate-bounce">
                <div className="bg-orange-500 w-2 h-2 rounded-full animate-ping"></div>
                <span className="font-bold text-gray-900 text-sm">Bardzo popularna: 147 zamówień dziś</span>
              </div>
            </div>
          </div>
        </section>

        {/* URGENCY STRIP */}
        <div className="bg-red-600 text-white py-3 px-4 text-center font-bold sticky top-16 z-40 flex items-center justify-center gap-3 text-xs md:text-sm shadow-xl">
          <Timer className="w-4 h-4 animate-pulse" />
          <span>OFERTA LIMITOWANA: Tylko 14 sztuk XXL w cenie 349 zł. Pełna cena 699 zł od jutra!</span>
        </div>

        {/* TOXIC COMPARISON */}
        <section id="toxic" className="py-20 md:py-32 px-4 md:px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-6xl font-black mb-6 font-serif">Nauka Nie Kłamie.</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Frytkownice z powłoką nieprzywierającą to chemiczne bomby zegarowe. Powyżej 200°C Teflon uwalnia toksyczne opary bezpośrednio do jedzenia.</p>
          </div>
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-stretch">
            <div className="bg-white border-2 border-red-100 rounded-[32px] p-8 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-red-500"></div>
              <h3 className="text-2xl font-bold text-red-600 mb-8 flex items-center justify-between">Tradycyjne Frytkownice <Trash2 className="text-red-400 w-8 h-8" /></h3>
              <ul className="space-y-6">
                {[
                  { t: "PFAS i PFOA", d: "\"Wieczne\" substancje gromadzące się w Twojej krwi." },
                  { t: "Mikroplastiki", d: "Powłoka odpryskuje i trafia na Twój talerz." },
                  { t: "Toksyczne Opary", d: "Nieświadomie wdychasz czystą chemię w kuchni." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <AlertTriangle className="text-red-500 flex-shrink-0 w-6 h-6" />
                    <div>
                      <p className="font-bold text-gray-900">{item.t}</p>
                      <p className="text-sm text-gray-500 leading-tight">{item.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-red-50 border-dashed text-center">
                <p className="text-red-600 font-bold text-xs uppercase tracking-widest">⚠️ WYSOKIE RYZYKO CHEMICZNE</p>
              </div>
            </div>
            <div className="bg-white border-4 border-orange-500 rounded-[32px] p-8 shadow-2xl relative md:scale-105 z-10">
              <div className="absolute top-0 right-0 bg-orange-500 text-white px-5 py-2 rounded-bl-3xl font-black text-[10px] tracking-widest uppercase">CERTYFIKAT ZDROWOTNY</div>
              <h3 className="text-2xl font-bold text-orange-600 mb-8 flex items-center justify-between">PureGlass XXL 10L <ShieldCheck className="text-orange-500 w-8 h-8" /></h3>
              <ul className="space-y-6">
                {[
                  { t: "Ultra-Czyste Szkło", d: "100% obojętne szkło borokrzemianowe. Bez chemii." },
                  { t: "Zero Powłok", d: "Tylko naturalne materiały. Bez odprysków." },
                  { t: "Widok 360°", d: "Idealne smażenie bez otwierania szuflady." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <CheckCircle2 className="text-green-500 flex-shrink-0 w-6 h-6" />
                    <div>
                      <p className="font-bold text-gray-900">{item.t}</p>
                      <p className="text-sm text-gray-500 leading-tight">{item.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-orange-100 border-dashed text-center flex items-center justify-center gap-2 text-green-600 font-bold text-sm">
                <FlaskConical className="w-5 h-5" /> CERTYFIKACJA ISO ZDROWIA
              </div>
            </div>
          </div>
        </section>

        {/* CAPACITY SECTION */}
        <section id="capacity" className="py-20 px-4 md:px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <img src="/images/airfryer/2.png" className="rounded-[40px] shadow-2xl w-full" alt="10L XXL" />
            <div className="absolute -bottom-6 right-0 md:-right-6 bg-gray-900 text-white p-6 md:p-8 rounded-3xl shadow-xl">
              <p className="text-5xl font-black text-orange-500 mb-1 leading-none">10L</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-300">Gigantyczna Pojemność</p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-6xl font-black mb-8 font-serif leading-tight">Zapomnij o małych 4L czy 5L.</h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed italic">"Podczas gdy inni muszą gotować w 2 lub 3 turach, żeby nakarmić rodzinę, Ty możesz przygotować całego kurczaka z ziemniakami za jednym razem."</p>
            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <div className="bg-orange-100 p-3 rounded-2xl flex-shrink-0"><Users className="text-orange-600 w-8 h-8" /></div>
                <div><b className="text-lg block mb-1 text-gray-900">Idealna dla Rodzin (6+ osób)</b><p className="text-sm text-gray-500 leading-tight italic">Niech już nie czekają. Wszyscy przy stole razem.</p></div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-orange-100 p-3 rounded-2xl flex-shrink-0"><Scale className="text-orange-600 w-8 h-8" /></div>
                <div><b className="text-lg block mb-1 text-gray-900">Upiecz Całego Kurczaka</b><p className="text-sm text-gray-500 leading-tight italic">Pionowa przestrzeń i szkło borokrzemianowe zapewniają równomierne i głębokie pieczenie.</p></div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-orange-100 p-3 rounded-2xl flex-shrink-0"><ChefHat className="text-orange-600 w-8 h-8" /></div>
                <div><b className="text-lg block mb-1 text-gray-900">Profesjonalne Pieczenie 3D</b><p className="text-sm text-gray-500 leading-tight italic">Powietrze lepiej cyrkuluje w dużej komorze, czyniąc wszystko niesamowicie chrupiącym.</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* FLAVOR EXPERIENCE */}
        <section className="py-24 px-4 bg-gray-900 text-white relative overflow-hidden text-center">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <img src="https://picsum.photos/id/42/1200/800" className="w-full h-full object-cover" />
          </div>
          <div className="max-w-4xl mx-auto relative z-10 px-4">
            <div className="flex justify-center mb-6 gap-1">
               {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />)}
            </div>
            <h2 className="text-3xl md:text-6xl font-black mb-8 font-serif">Smak to Czysta Chemia.</h2>
            <p className="text-xl text-gray-400 mb-12 font-light leading-relaxed">
              Szkło nie wchłania zapachów i nie uwalnia metalicznych ani plastikowych posmaków.
              Jedzenie w końcu smakuje tak jak powinno: <span className="text-white font-bold italic underline decoration-orange-500">Jedzeniem.</span>
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="p-8 border border-white/10 rounded-[32px] bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10">
                <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 -rotate-6 shadow-xl"><Zap className="w-10 h-10 text-white" /></div>
                <b className="block text-xl mb-3">Natychmiastowa Chrupkość</b>
                <p className="text-xs text-gray-400 leading-relaxed">Promieniowanie cieplne odbite od szkła tworzy idealną skórkę w rekordowym czasie.</p>
              </div>
              <div className="p-8 border-2 border-orange-500/50 rounded-[32px] bg-white/5 backdrop-blur-sm md:scale-105 transition-all hover:bg-white/10">
                <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl"><Star className="w-10 h-10 text-white" /></div>
                <b className="block text-xl mb-3">Soczyste Wnętrze</b>
                <p className="text-xs text-gray-400 leading-relaxed">Szkło równomiernie utrzymuje ciepło, zachowując soki wewnątrz mięsa.</p>
              </div>
              <div className="p-8 border border-white/10 rounded-[32px] bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10">
                <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-6 shadow-xl">
                  <img src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png" className="w-10 h-10 invert" alt="Flavor" />
                </div>
                <b className="block text-xl mb-3">Naturalny Aromat</b>
                <p className="text-xs text-gray-400 leading-relaxed">Cząsteczki smaku nie są zmieniane przez chemiczne opary gorącego Teflonu.</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
               <img src="/images/airfryer/3.png" className="max-w-md w-full rounded-2xl shadow-2xl mb-8" alt="Details" />
               <p className="text-orange-500 font-bold uppercase tracking-widest animate-pulse">Zobacz jak gotuje. Smakuj jak nigdy dotąd.</p>
            </div>
          </div>
        </section>

        {/* TRUSTPILOT BAR */}
        <section className="bg-white py-12 border-b flex flex-col items-center px-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl font-bold">Doskonałe</span>
            <div className="flex gap-1">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="bg-[#00b67a] p-1.5 rounded-sm">
                  <Star className="w-4 h-4 text-white fill-current" />
                </div>
              ))}
            </div>
          </div>
          <p className="text-gray-500 text-sm">Na podstawie <span className="font-black text-gray-800 underline">3.420 zweryfikowanych opinii</span> na <span className="font-black text-[#00b67a]">Trustpilot</span></p>
        </section>

        {/* AMAZON REVIEWS SECTION */}
        <section id="reviews" className="py-20 px-4 md:px-6 bg-white max-w-6xl mx-auto">
          <h2 className="text-3xl font-black mb-12 flex flex-col md:flex-row md:items-center gap-4">
            Opinie Klientów
            <div className="flex items-center gap-1 text-orange-500">
                <Star className="fill-current w-6 h-6" />
                <span className="text-gray-900 text-xl font-black">4.9 z 5</span>
            </div>
          </h2>

          <div className="grid md:grid-cols-12 gap-12">
            {/* Sidebar Stats */}
            <div className="md:col-span-4 space-y-6">
                <div className="flex flex-col gap-3">
                    {[
                      { s: 5, p: 92 },
                      { s: 4, p: 6 },
                      { s: 3, p: 1 },
                      { s: 2, p: 0 },
                      { s: 1, p: 0 }
                    ].map((row) => (
                      <div key={row.s} className="flex items-center gap-3">
                          <span className="text-xs font-bold w-14 whitespace-nowrap">{row.s} gwiazdek</span>
                          <div className="flex-grow h-5 bg-gray-100 rounded-sm overflow-hidden border">
                              <div className="h-full bg-orange-400" style={{ width: `${row.p}%` }}></div>
                          </div>
                          <span className="text-xs text-blue-600 font-bold w-10 text-right">{row.p}%</span>
                      </div>
                    ))}
                </div>
                <div className="pt-8 border-t hidden md:block">
                    <h4 className="font-bold text-lg mb-2 text-gray-900">Oceń ten produkt</h4>
                    <p className="text-sm text-gray-600 mb-6">Podziel się opinią z innymi klientami</p>
                    <button className="w-full py-2.5 border border-gray-300 rounded-xl text-sm font-black hover:bg-gray-50 transition-colors shadow-sm">Napisz opinię</button>
                </div>
            </div>

            {/* Reviews List */}
            <div className="md:col-span-8 space-y-12">
                {[
                  {
                    n: "Katarzyna W.", d: "14 maja 2024", t: "Nigdy więcej bez szkła! Nietoksyczna i piękna.",
                    c: "Miałam dość zapachu plastiku za każdym razem, gdy włączałam starą frytkownię. Ta PureGlass jest na innym poziomie. Patrzenie jak ziemniaki stają się złociste bez otwierania szuflady to ogromna satysfakcja.",
                    h: 245
                  },
                  {
                    n: "Marek K.", d: "2 czerwca 2024", t: "Ogromna! 10 litrów to ideał.",
                    c: "Wreszcie mogę gotować dla całej rodziny za jednym razem. Pojemność jest prawdziwa. Bardzo łatwa do czyszczenia, szkło można myć w zmywarce. Super szybka dostawa i płatność przy odbiorze bardzo wygodna.",
                    h: 128
                  },
                  {
                    n: "Zofia M.", d: "10 czerwca 2024", t: "Zdrowie przede wszystkim.",
                    c: "Kupiłam ją głównie po to, żeby wyeliminować teflon z mojej kuchni. Jestem przewrażliwiona na tym punkcie, a szkło borokrzemianowe daje mi spokój. Świetne materiały.",
                    h: 56
                  }
                ].map((r, i) => (
                  <div key={i} className="space-y-4 border-b pb-12 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500 text-xs">{r.n[0]}</div>
                      <span className="text-sm font-bold text-gray-900">{r.n}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-orange-500 fill-current" />)}
                      </div>
                      <span className="font-bold text-lg text-gray-900 leading-tight">{r.t}</span>
                    </div>
                    <p className="text-xs text-gray-400">Opinia z Polski, {r.d}</p>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase text-orange-700">
                      <span className="bg-orange-50 px-2 py-0.5 border border-orange-100 rounded-sm tracking-tighter">Zweryfikowany zakup</span>
                    </div>
                    <p className="text-sm text-gray-800 leading-relaxed italic">"{r.c}"</p>
                    <div className="flex items-center gap-6 pt-2">
                       <button className="px-6 py-2 border rounded-xl text-xs font-black hover:bg-gray-50 shadow-sm transition-colors flex items-center gap-2">
                          <ThumbsUp className="w-3.5 h-3.5" /> Pomocne
                       </button>
                       <span className="text-[10px] text-gray-400 italic font-medium">{r.h} osób uznało to za pomocne</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* ORDER SECTION */}
        <section id="order" className="py-20 px-4 md:px-6 bg-slate-50">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-0 bg-white rounded-[40px] shadow-2xl overflow-hidden border-8 border-white">
            <div className="lg:col-span-2 bg-gray-950 text-white p-8 md:p-12">
              <h2 className="text-3xl font-black mb-10 leading-tight">Zainwestuj w swoje zdrowie.</h2>
              <div className="flex items-center gap-4 mb-10">
                <img src="/images/airfryer/4.png" className="w-24 h-24 rounded-2xl object-cover bg-white p-1" alt="PureGlass" />
                <div>
                  <b className="block text-xl">PureGlass XXL 10L</b>
                  <span className="text-orange-400 font-bold text-sm">Model Platinum 2024</span>
                </div>
              </div>
              <div className="space-y-4 mb-12">
                <div className="flex justify-between items-center text-lg"><span>Cena regularna:</span> <span className="line-through text-gray-500">699 zł</span></div>
                <div className="flex justify-between items-center text-3xl font-black"><span>Dziś tylko:</span> <span className="text-orange-500">349 zł</span></div>
                <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl text-green-400 font-bold text-center text-xs flex items-center justify-center gap-2">
                  <Truck className="w-4 h-4" /> DARMOWA WYSYŁKA EKSPRESOWA
                </div>
              </div>
              <div className="space-y-3 mb-12">
                {["Szkło Wysokiej Wytrzymałości", "10 Programów LED", "Książka Kucharska GRATIS", "Gwarancja 24 Miesiące"].map((x, i) => (
                  <div key={i} className="flex gap-3 items-center text-sm text-gray-300 font-medium">
                    <CheckCircle className="text-orange-500 w-4 h-4" /> {x}
                  </div>
                ))}
              </div>
              <div className="bg-white/5 p-5 rounded-2xl border border-white/10 flex items-center gap-4">
                 <ShieldCheck className="w-10 h-10 text-blue-400 flex-shrink-0" />
                 <div><p className="font-bold text-xs uppercase tracking-widest text-white">Pełna Gwarancja</p><p className="text-[10px] text-gray-400 leading-tight">Zapłać dopiero po sprawdzeniu produktu. Zero ryzyka.</p></div>
              </div>
            </div>
            <div className="lg:col-span-3 p-8 md:p-12">
              <div className="mb-8 p-5 bg-orange-50 border border-orange-200 rounded-3xl flex items-start gap-4">
                <Info className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] font-bold text-orange-800 leading-tight uppercase tracking-tight">
                  BEZPIECZEŃSTWO KLIENTÓW: Akceptujemy tylko Płatność przy Odbiorze. Nigdy nie poprosimy o dane Twojej karty online. Zamów w 30 sekund.
                </p>
              </div>
              <h3 className="text-2xl font-black mb-8 text-gray-900">Gdzie wysłać paczkę?</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Imię i Nazwisko</label>
                    <input
                      required
                      placeholder="np. Jan Kowalski"
                      className="w-full p-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-orange-500 font-semibold transition-all shadow-sm"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Adres (ulica, numer, miasto)</label>
                    <input
                      required
                      placeholder="ul. Przykładowa 1, Warszawa"
                      className="w-full p-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-orange-500 font-semibold transition-all shadow-sm"
                      value={formData.streetAddress}
                      onChange={(e) => setFormData({...formData, streetAddress: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Numer Telefonu (dla kuriera)</label>
                    <input
                      required
                      type="tel"
                      placeholder="np. 500 123 456"
                      className="w-full p-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-orange-500 font-semibold transition-all shadow-sm"
                      value={formData.tel}
                      onChange={(e) => setFormData({...formData, tel: e.target.value})}
                    />
                </div>
                <div className="p-4 bg-gray-50 border-2 border-orange-200 border-dashed rounded-[32px] flex items-center justify-between font-black text-xs text-orange-600">
                  <span className="flex items-center gap-2 px-2"><ShoppingCart className="w-4 h-4" /> PŁATNOŚĆ PRZY ODBIORZE</span>
                  <div className="bg-orange-600 text-white px-3 py-1 rounded-full text-[9px] tracking-widest">100% BEZPIECZNE</div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-600 text-white text-xl font-black py-6 rounded-[32px] shadow-2xl hover:bg-orange-700 active:scale-95 transition-all flex items-center justify-center gap-4 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-7 h-7 animate-spin" />
                      PRZETWARZANIE...
                    </>
                  ) : (
                    <>
                      ZAMÓW I ZAPŁAĆ KURIEROWI
                      <ShoppingBag className="w-7 h-7 group-hover:animate-bounce" />
                    </>
                  )}
                </button>
                <div className="flex flex-col items-center gap-4">
                   <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">Satysfakcja gwarantowana lub zwrot w ciągu 30 dni</p>
                   <div className="flex gap-6 opacity-40 grayscale hover:grayscale-0 transition-all">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4" alt="MC" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" alt="PP" />
                   </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-950 text-white pt-20 pb-24 md:pb-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 text-center md:text-left">
          <div className="col-span-1">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
              <Shield className="text-orange-500 w-6 h-6" />
              <span className="text-2xl font-black tracking-tighter">PURE<span className="text-orange-600">GLASS</span></span>
            </div>
            <p className="text-gray-500 text-sm italic leading-relaxed">"Zdrowie zaczyna się od tego, co jesz, ale przede wszystkim od tego, w czym gotujesz."</p>
          </div>
          <div>
            <h4 className="font-black text-orange-500 text-[10px] uppercase tracking-[0.3em] mb-8">Nawigacja</h4>
            <ul className="space-y-4 text-sm font-black text-gray-400">
              <li><button onClick={() => scrollTo('toxic')} className="hover:text-white transition-colors">Dlaczego Szkło?</button></li>
              <li><button onClick={() => scrollTo('capacity')} className="hover:text-white transition-colors">Pojemność XXL</button></li>
              <li><button onClick={() => scrollTo('reviews')} className="hover:text-white transition-colors">Opinie</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-orange-500 text-[10px] uppercase tracking-[0.3em] mb-8">Wsparcie</h4>
            <p className="text-gray-500 text-xs leading-relaxed mb-6">Pomoc 24/7 przez naszych konsultantów telefonicznych.</p>
            <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10 text-[10px] font-bold">
              <Truck className="w-4 h-4 text-orange-500" /> DOSTAWA W 48 GODZIN
            </div>
          </div>
          <div className="bg-white/5 p-8 rounded-[32px] border border-white/10 flex flex-col items-center">
            <p className="text-[10px] font-black uppercase tracking-widest mb-6 opacity-50">Gwarantowana Płatność</p>
            <div className="text-orange-500 font-black italic flex items-center gap-2 text-sm leading-none bg-orange-500/10 px-6 py-4 rounded-2xl border border-orange-500/20">
              <ShieldCheck className="w-5 h-5" /> ZA POBRANIEM
            </div>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-white/5 text-center text-[10px] text-gray-700 font-black tracking-[0.5em]">
          © 2024 PUREGLASS HEALTH TECHNOLOGIES PL
        </div>
      </footer>

      {/* STICKY CTA MOBILE */}
      {showStickyCTA && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50 md:hidden flex items-center justify-between shadow-[0_-15px_30px_rgba(0,0,0,0.1)] animate-in slide-in-from-bottom duration-500">
          <div>
            <span className="text-[10px] text-gray-400 line-through">699 zł</span>
            <div className="text-xl font-black text-red-600">349 zł</div>
          </div>
          <button onClick={() => scrollTo('order')} className="bg-orange-600 text-white px-8 py-4 rounded-2xl font-black text-xs flex items-center gap-2 shadow-2xl shadow-orange-200 active:scale-95">
            ZAMÓW TERAZ <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
}
