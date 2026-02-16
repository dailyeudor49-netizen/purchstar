
"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Script from 'next/script';
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

// Wrapper component to handle Suspense for useSearchParams
function LandingPageContent() {
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
      submitData.append('uid', '019be4ed-80e5-7970-ab86-1938a865c187');
      submitData.append('key', 'd05dde623c227395880400');
      submitData.append('offer', '2534');
      submitData.append('lp', '2573');
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
        // Google Ads Conversion Tracking
        if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
          (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'conversion', {
            'send_to': 'AW-17806153053/hdiQCOyMg-MbEN2q0apC'
          });
        }
        // Redirect to thank you page
        router.push('/gg-fryerdr-hu/ty');
      } else {
        alert('Hiba történt. Kérjük, próbálja újra.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Hiba történt. Kérjük, próbálja újra.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-orange-100 overflow-x-hidden">
      {/* Google Ads Global Site Tag */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-17806153053"
        strategy="afterInteractive"
      />
      <Script id="google-ads" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17806153053');
        `}
      </Script>

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
          <button onClick={() => scrollTo('toxic')} className="hover:text-orange-600 transition-colors">Egészség</button>
          <button onClick={() => scrollTo('capacity')} className="hover:text-orange-600 transition-colors">Kapacitás</button>
          <button onClick={() => scrollTo('reviews')} className="hover:text-orange-600 transition-colors">Vélemények</button>
        </nav>
        <button onClick={() => scrollTo('order')} className="bg-orange-600 text-white px-5 py-2.5 rounded-xl font-black text-xs shadow-lg active:scale-95 transition-all flex items-center gap-2">
          <ShoppingCart className="w-4 h-4" />
          RENDELJE MEG MOST
        </button>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="relative pt-10 md:pt-16 pb-12 md:pb-20 px-4 md:px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-[10px] md:text-xs font-bold mb-6 tracking-wider uppercase">
              <AlertTriangle className="w-3.5 h-3.5" />
              Figyelem: Mérgező anyagokat találtak a hagyományos fritőzökben
            </div>
            <h1 className="text-4xl md:text-7xl font-black leading-[1.1] mb-6 font-serif">
              Hagyja Abba Ételei <span className="text-red-600">Mérgezését</span> <span className="text-orange-600 underline decoration-4 underline-offset-8">Teflonnal</span>.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Míg a hagyományos fritőzök magas hőmérsékleten PFOA-t és PFAS-t bocsátanak ki,
              az új <strong>PureGlass 10L</strong> kizárólag <span className="text-green-600 font-bold">Tanúsított Boroszilikát Üveget</span> használ.
              Maximális tisztaság, nulla toxicitás, változatlan íz.
            </p>
            <div className="space-y-4 mb-10">
              {["XXL 10 Literes Kapacitás", "360°-os Átlátszó Üveg Kosár", "100% Vegyszermentes", "3x Intenzívebb Íz"].map((t, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="font-bold text-gray-800">{t}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-6">
              <button onClick={() => scrollTo('order')} className="w-full md:w-auto bg-orange-600 text-white text-lg font-bold px-10 py-5 rounded-2xl shadow-2xl hover:bg-orange-700 active:scale-95 transition-all flex flex-col items-center">
                EGÉSZSÉGESEN AKAROK FŐZNI
                <span className="text-[10px] opacity-80 font-normal mt-1 italic">50% kedvezmény még csak pár percig aktív</span>
              </button>
              <div className="flex items-center gap-4 px-4 py-3 border rounded-xl bg-gray-50 max-w-sm">
                <img src="https://picsum.photos/id/64/100/100" className="w-12 h-12 rounded-full border-2 border-white shadow-md flex-shrink-0" alt="Szakértő" />
                <div>
                  <p className="text-[10px] md:text-xs font-bold italic leading-tight text-gray-700">"Végre stressz nélkül eszünk. Egy lépés előre a családom egészségéért."</p>
                  <p className="text-[8px] md:text-[10px] uppercase text-gray-500 font-bold mt-1">- Dr. Nagy Katalin, Dietetikus</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-orange-200 rounded-full blur-3xl opacity-20 animate-pulse hidden md:block"></div>
            <div className="relative bg-white rounded-[40px] p-3 shadow-2xl border border-gray-100 overflow-hidden">
              <img src="/images/airfryer/1.webp" className="w-full rounded-[32px] hover:scale-105 transition-transform duration-700" alt="PureGlass XXL" />
              <div className="absolute top-8 right-8 bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-xl border border-orange-100 flex items-center gap-2 animate-bounce">
                <div className="bg-orange-500 w-2 h-2 rounded-full animate-ping"></div>
                <span className="font-bold text-gray-900 text-sm">Nagyon népszerű: 147 rendelés ma</span>
              </div>
            </div>
          </div>
        </section>

        {/* URGENCY STRIP */}
        <div className="bg-red-600 text-white py-3 px-4 text-center font-bold sticky top-16 z-40 flex items-center justify-center gap-3 text-xs md:text-sm shadow-xl">
          <Timer className="w-4 h-4 animate-pulse" />
          <span>LIMITÁLT AJÁNLAT: Csak 14 db XXL 31 499 Ft-ért. Holnaptól teljes ár: 62 999 Ft!</span>
        </div>

        {/* TOXIC COMPARISON */}
        <section id="toxic" className="py-20 md:py-32 px-4 md:px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-6xl font-black mb-6 font-serif">A Tudomány Nem Hazudik.</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">A tapadásmentes bevonatú fritőzök kémiai időzített bombák. 200°C felett a teflon mérgező gőzöket bocsát ki közvetlenül az ételbe.</p>
          </div>
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-stretch">
            <div className="bg-white border-2 border-red-100 rounded-[32px] p-8 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-red-500"></div>
              <h3 className="text-2xl font-bold text-red-600 mb-8 flex items-center justify-between">Hagyományos Fritőzök <Trash2 className="text-red-400 w-8 h-8" /></h3>
              <ul className="space-y-6">
                {[
                  { t: "PFAS és PFOA", d: "\"Örök\" vegyszerek, melyek felhalmozódnak a vérében." },
                  { t: "Mikroműanyagok", d: "A bevonat leválik és a tányérján végzi." },
                  { t: "Mérgező Gőzök", d: "Tudtán kívül tiszta vegyszert lélegez be a konyhában." }
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
                <p className="text-red-600 font-bold text-xs uppercase tracking-widest">MAGAS KÉMIAI KOCKÁZAT</p>
              </div>
            </div>
            <div className="bg-white border-4 border-orange-500 rounded-[32px] p-8 shadow-2xl relative md:scale-105 z-10">
              <div className="absolute top-0 right-0 bg-orange-500 text-white px-5 py-2 rounded-bl-3xl font-black text-[10px] tracking-widest uppercase">EGÉSZSÉGÜGYI TANÚSÍTVÁNY</div>
              <h3 className="text-2xl font-bold text-orange-600 mb-8 flex items-center justify-between">PureGlass XXL 10L <ShieldCheck className="text-orange-500 w-8 h-8" /></h3>
              <ul className="space-y-6">
                {[
                  { t: "Ultra-Tiszta Üveg", d: "100% inert boroszilikát üveg. Vegyszermentes." },
                  { t: "Nincs Bevonat", d: "Csak természetes anyagok. Nincs leválás." },
                  { t: "360°-os Átláthatóság", d: "Tökéletes sütés a fiók kinyitása nélkül." }
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
                <FlaskConical className="w-5 h-5" /> ISO EGÉSZSÉGÜGYI TANÚSÍTVÁNY
              </div>
            </div>
          </div>
        </section>

        {/* CAPACITY SECTION */}
        <section id="capacity" className="py-20 px-4 md:px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <img src="/images/airfryer/2.webp" className="rounded-[40px] shadow-2xl w-full" alt="10L XXL" />
            <div className="absolute -bottom-6 right-0 md:-right-6 bg-gray-900 text-white p-6 md:p-8 rounded-3xl shadow-xl">
              <p className="text-5xl font-black text-orange-500 mb-1 leading-none">10L</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-300">Hatalmas Kapacitás</p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-6xl font-black mb-8 font-serif leading-tight">Felejtse El a Kis 4L-es vagy 5L-es Méreteket.</h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed italic">"Míg mások 2-3 körben főznek, hogy megeteessék a családot, Ön egy egész csirkét krumplival együtt készíthet el egyszerre."</p>
            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <div className="bg-orange-100 p-3 rounded-2xl flex-shrink-0"><Users className="text-orange-600 w-8 h-8" /></div>
                <div><b className="text-lg block mb-1 text-gray-900">Ideális Családoknak (6+ fő)</b><p className="text-sm text-gray-500 leading-tight italic">Ne kelljen várniuk. Mindenki együtt az asztalnál.</p></div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-orange-100 p-3 rounded-2xl flex-shrink-0"><Scale className="text-orange-600 w-8 h-8" /></div>
                <div><b className="text-lg block mb-1 text-gray-900">Süssön Egész Csirkét</b><p className="text-sm text-gray-500 leading-tight italic">A vertikális tér és a boroszilikát üveg egyenletes, mély sütést biztosít.</p></div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-orange-100 p-3 rounded-2xl flex-shrink-0"><ChefHat className="text-orange-600 w-8 h-8" /></div>
                <div><b className="text-lg block mb-1 text-gray-900">Professzionális 3D Sütés</b><p className="text-sm text-gray-500 leading-tight italic">A levegő jobban kering a nagy kamrában, mindent hihetetlen ropogóssá téve.</p></div>
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
            <h2 className="text-3xl md:text-6xl font-black mb-8 font-serif">Az Íz Tiszta Kémia.</h2>
            <p className="text-xl text-gray-400 mb-12 font-light leading-relaxed">
              Az üveg nem szívja fel a szagokat és nem ad le fémes vagy műanyag mellékízt.
              Az étel végre úgy ízlik, ahogy kell: <span className="text-white font-bold italic underline decoration-orange-500">Mint az Étel.</span>
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="p-8 border border-white/10 rounded-[32px] bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10">
                <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 -rotate-6 shadow-xl"><Zap className="w-10 h-10 text-white" /></div>
                <b className="block text-xl mb-3">Azonnali Ropogósság</b>
                <p className="text-xs text-gray-400 leading-relaxed">Az üvegről visszaverődő hősugárzás rekordidő alatt tökéletes kérget hoz létre.</p>
              </div>
              <div className="p-8 border-2 border-orange-500/50 rounded-[32px] bg-white/5 backdrop-blur-sm md:scale-105 transition-all hover:bg-white/10">
                <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl"><Star className="w-10 h-10 text-white" /></div>
                <b className="block text-xl mb-3">Szaftos Belső</b>
                <p className="text-xs text-gray-400 leading-relaxed">Az üveg egyenletesen tartja a hőt, megőrizve a nedvességet a hús belsejében.</p>
              </div>
              <div className="p-8 border border-white/10 rounded-[32px] bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10">
                <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-6 shadow-xl">
                  <img src="https://cdn-icons-png.flaticon.com/512/3075/3075977.webp" className="w-10 h-10 invert" alt="Íz" />
                </div>
                <b className="block text-xl mb-3">Természetes Aroma</b>
                <p className="text-xs text-gray-400 leading-relaxed">Az ízmolekulákat nem változtatják meg a forró teflon kémiai gőzei.</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
               <img src="/images/airfryer/3.webp" className="max-w-md w-full rounded-2xl shadow-2xl mb-8" alt="Részletek" />
               <p className="text-orange-500 font-bold uppercase tracking-widest animate-pulse">Nézze, ahogy főz. Ízlelje meg, mint még soha.</p>
            </div>
          </div>
        </section>

        {/* TRUSTPILOT BAR */}
        <section className="bg-white py-12 border-b flex flex-col items-center px-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl font-bold">Kiváló</span>
            <div className="flex gap-1">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="bg-[#00b67a] p-1.5 rounded-sm">
                  <Star className="w-4 h-4 text-white fill-current" />
                </div>
              ))}
            </div>
          </div>
          <p className="text-gray-500 text-sm"><span className="font-black text-gray-800 underline">3.420 ellenőrzött vélemény</span> alapján a <span className="font-black text-[#00b67a]">Trustpilot</span>-on</p>
        </section>

        {/* AMAZON REVIEWS SECTION */}
        <section id="reviews" className="py-20 px-4 md:px-6 bg-white max-w-6xl mx-auto">
          <h2 className="text-3xl font-black mb-12 flex flex-col md:flex-row md:items-center gap-4">
            Vásárlói Vélemények
            <div className="flex items-center gap-1 text-orange-500">
                <Star className="fill-current w-6 h-6" />
                <span className="text-gray-900 text-xl font-black">4.9 / 5</span>
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
                          <span className="text-xs font-bold w-14 whitespace-nowrap">{row.s} csillag</span>
                          <div className="flex-grow h-5 bg-gray-100 rounded-sm overflow-hidden border">
                              <div className="h-full bg-orange-400" style={{ width: `${row.p}%` }}></div>
                          </div>
                          <span className="text-xs text-blue-600 font-bold w-10 text-right">{row.p}%</span>
                      </div>
                    ))}
                </div>
                <div className="pt-8 border-t hidden md:block">
                    <h4 className="font-bold text-lg mb-2 text-gray-900">Értékelje ezt a terméket</h4>
                    <p className="text-sm text-gray-600 mb-6">Ossza meg véleményét más vásárlókkal</p>
                    <button className="w-full py-2.5 border border-gray-300 rounded-xl text-sm font-black hover:bg-gray-50 transition-colors shadow-sm">Vélemény írása</button>
                </div>
            </div>

            {/* Reviews List */}
            <div className="md:col-span-8 space-y-12">
                {[
                  {
                    n: "Kovács Kata", d: "2024. május 14.", t: "Soha többé üveg nélkül! Méreganyagmentes és gyönyörű.",
                    c: "Elegem volt a műanyag szagból, valahányszor bekapcsoltam a régi fritőzömet. Ez a PureGlass teljesen más szinten van. Nézni, ahogy a krumpli aranybarnára sül a fiók kinyitása nélkül, hatalmas elégedettség.",
                    h: 245
                  },
                  {
                    n: "Szabó Péter", d: "2024. június 2.", t: "Hatalmas! A 10 liter ideális.",
                    c: "Végre főzhetek az egész családnak egyszerre. A kapacitás valós. Nagyon könnyen tisztítható, az üveg mosogatógépbe tehető. Szupergyors kiszállítás és az utánvételes fizetés nagyon kényelmes.",
                    h: 128
                  },
                  {
                    n: "Tóth Anna", d: "2024. június 10.", t: "Az egészség az első.",
                    c: "Főleg azért vettem, hogy kiiktassam a teflont a konyhámból. Érzékeny vagyok rá, és a boroszilikát üveg megnyugvást ad. Kiváló anyagok.",
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
                    <p className="text-xs text-gray-400">Vélemény Magyarországról, {r.d}</p>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase text-orange-700">
                      <span className="bg-orange-50 px-2 py-0.5 border border-orange-100 rounded-sm tracking-tighter">Ellenőrzött vásárlás</span>
                    </div>
                    <p className="text-sm text-gray-800 leading-relaxed italic">"{r.c}"</p>
                    <div className="flex items-center gap-6 pt-2">
                       <button className="px-6 py-2 border rounded-xl text-xs font-black hover:bg-gray-50 shadow-sm transition-colors flex items-center gap-2">
                          <ThumbsUp className="w-3.5 h-3.5" /> Hasznos
                       </button>
                       <span className="text-[10px] text-gray-400 italic font-medium">{r.h} ember találta hasznosnak</span>
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
              <h2 className="text-3xl font-black mb-10 leading-tight">Fektessen be az egészségébe.</h2>
              <div className="flex items-center gap-4 mb-10">
                <img src="/images/airfryer/4.webp" className="w-24 h-24 rounded-2xl object-cover bg-white p-1" alt="PureGlass" />
                <div>
                  <b className="block text-xl">PureGlass XXL 10L</b>
                  <span className="text-orange-400 font-bold text-sm">Platinum 2024 Modell</span>
                </div>
              </div>
              <div className="space-y-4 mb-12">
                <div className="flex justify-between items-center text-lg"><span>Eredeti ár:</span> <span className="line-through text-gray-500">62 999 Ft</span></div>
                <div className="flex justify-between items-center text-3xl font-black"><span>Ma csak:</span> <span className="text-orange-500">31 499 Ft</span></div>
                <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl text-green-400 font-bold text-center text-xs flex items-center justify-center gap-2">
                  <Truck className="w-4 h-4" /> INGYENES SZÁLLÍTÁS
                </div>
              </div>
              <div className="space-y-3 mb-12">
                {["Edzett Üveg", "10 LED Program", "INGYENES Receptkönyv", "24 Hónap Garancia"].map((x, i) => (
                  <div key={i} className="flex gap-3 items-center text-sm text-gray-300 font-medium">
                    <CheckCircle className="text-orange-500 w-4 h-4" /> {x}
                  </div>
                ))}
              </div>
              <div className="bg-white/5 p-5 rounded-2xl border border-white/10 flex items-center gap-4">
                 <ShieldCheck className="w-10 h-10 text-blue-400 flex-shrink-0" />
                 <div><p className="font-bold text-xs uppercase tracking-widest text-white">Teljes Garancia</p><p className="text-[10px] text-gray-400 leading-tight">Fizessen a termék ellenőrzése után. Nulla kockázat.</p></div>
              </div>
            </div>
            <div className="lg:col-span-3 p-8 md:p-12">
              <div className="mb-8 p-5 bg-orange-50 border border-orange-200 rounded-3xl flex items-start gap-4">
                <Info className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] font-bold text-orange-800 leading-tight uppercase tracking-tight">
                  VÁSÁRLÓI BIZTONSÁG: Csak Utánvétes Fizetést fogadunk el. Soha nem kérjük bankkártya adatait online. Rendeljen 30 másodperc alatt.
                </p>
              </div>
              <h3 className="text-2xl font-black mb-8 text-gray-900">Hová küldjük a csomagot?</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Teljes Név</label>
                    <input
                      required
                      placeholder="pl. Kovács János"
                      className="w-full p-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-orange-500 font-semibold transition-all shadow-sm"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Cím (utca, házszám, város)</label>
                    <input
                      required
                      placeholder="Fő utca 1, Budapest"
                      className="w-full p-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-orange-500 font-semibold transition-all shadow-sm"
                      value={formData.streetAddress}
                      onChange={(e) => setFormData({...formData, streetAddress: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Telefonszám (futárnak)</label>
                    <input
                      required
                      type="tel"
                      placeholder="pl. 06 30 123 4567"
                      className="w-full p-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-orange-500 font-semibold transition-all shadow-sm"
                      value={formData.tel}
                      onChange={(e) => setFormData({...formData, tel: e.target.value})}
                    />
                </div>
                <div className="p-4 bg-gray-50 border-2 border-orange-200 border-dashed rounded-[32px] flex items-center justify-between font-black text-xs text-orange-600">
                  <span className="flex items-center gap-2 px-2"><ShoppingCart className="w-4 h-4" /> UTÁNVÉTES FIZETÉS</span>
                  <div className="bg-orange-600 text-white px-3 py-1 rounded-full text-[9px] tracking-widest">100% BIZTONSÁGOS</div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-600 text-white text-xl font-black py-6 rounded-[32px] shadow-2xl hover:bg-orange-700 active:scale-95 transition-all flex items-center justify-center gap-4 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-7 h-7 animate-spin" />
                      FELDOLGOZÁS...
                    </>
                  ) : (
                    <>
                      MEGRENDELÉS ÉS FIZETÉS A FUTÁRNAK
                      <ShoppingBag className="w-7 h-7 group-hover:animate-bounce" />
                    </>
                  )}
                </button>
                <div className="flex flex-col items-center gap-4">
                   <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">Elégedettségi garancia vagy 30 napos visszatérítés</p>
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
            <p className="text-gray-500 text-sm italic leading-relaxed">"Az egészség azzal kezdődik, amit eszel, de legfőképpen azzal, amiben főzöl."</p>
          </div>
          <div>
            <h4 className="font-black text-orange-500 text-[10px] uppercase tracking-[0.3em] mb-8">Navigáció</h4>
            <ul className="space-y-4 text-sm font-black text-gray-400">
              <li><button onClick={() => scrollTo('toxic')} className="hover:text-white transition-colors">Miért Üveg?</button></li>
              <li><button onClick={() => scrollTo('capacity')} className="hover:text-white transition-colors">XXL Kapacitás</button></li>
              <li><button onClick={() => scrollTo('reviews')} className="hover:text-white transition-colors">Vélemények</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-orange-500 text-[10px] uppercase tracking-[0.3em] mb-8">Támogatás</h4>
            <p className="text-gray-500 text-xs leading-relaxed mb-6">24/7 segítség telefonos tanácsadóinkon keresztül.</p>
            <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10 text-[10px] font-bold">
              <Truck className="w-4 h-4 text-orange-500" /> KISZÁLLÍTÁS 48 ÓRÁN BELÜL
            </div>
          </div>
          <div className="bg-white/5 p-8 rounded-[32px] border border-white/10 flex flex-col items-center">
            <p className="text-[10px] font-black uppercase tracking-widest mb-6 opacity-50">Garantált Fizetés</p>
            <div className="text-orange-500 font-black italic flex items-center gap-2 text-sm leading-none bg-orange-500/10 px-6 py-4 rounded-2xl border border-orange-500/20">
              <ShieldCheck className="w-5 h-5" /> UTÁNVÉT
            </div>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-white/5 text-center text-[10px] text-gray-700 font-black tracking-[0.5em]">
          © 2024 PUREGLASS HEALTH TECHNOLOGIES HU
        </div>
      </footer>

      {/* STICKY CTA MOBILE */}
      {showStickyCTA && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50 md:hidden flex items-center justify-between shadow-[0_-15px_30px_rgba(0,0,0,0.1)] animate-in slide-in-from-bottom duration-500">
          <div>
            <span className="text-[10px] text-gray-400 line-through">62 999 Ft</span>
            <div className="text-xl font-black text-red-600">31 499 Ft</div>
          </div>
          <button onClick={() => scrollTo('order')} className="bg-orange-600 text-white px-8 py-4 rounded-2xl font-black text-xs flex items-center gap-2 shadow-2xl shadow-orange-200 active:scale-95">
            RENDELJE MEG MOST <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
}

// --- MAIN LANDING PAGE COMPONENT ---
export default function LandingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-orange-600" /></div>}>
      <LandingPageContent />
    </Suspense>
  );
}
