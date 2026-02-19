
"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ShieldCheck,
  Truck,
  Star,
  CheckCircle2,
  Phone,
  RefreshCcw,
  AlertCircle,
  Sparkles,
  Clock,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

// --- STYLES & CONFIG ---
const medicalBlue = '#0056b3';

// --- API CONFIG ---
const API_CONFIG = {
  url: 'https://offers.supertrendaffiliateprogram.com/forms/api/',
  uid: '0198088f-a4bc-7ed8-89aa-83089fe0180e',
  key: 'ec15cab563da6cf51f0c7c',
  offer: '672',
  lp: '672'
};

// --- SUB-COMPONENTS ---

const HeroSection = ({ onOrderClick }: { onOrderClick: () => void }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const images = [
    '/images/hydrosonic/Main.png',
    '/images/hydrosonic/Total.png',
    '/images/hydrosonic/7.png'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="px-4 py-8 md:py-16 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-7xl font-black leading-tight text-black mb-4">
          Dovolj bolečin dlesni in površinskega čiščenja
        </h1>
        <p className="text-xl md:text-3xl font-bold text-gray-700">
          Profesionalno čiščenje. Brez zobozdravnika. Brez bolečin.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-orange-500">
          <div className="flex">
            {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={20} />)}
          </div>
          <span className="font-bold text-black text-sm md:text-base">4.8/5 - +12.847 zadovoljnih kupcev - Bestseler 2025</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="relative aspect-square overflow-hidden rounded-2xl shadow-2xl border-4 border-gray-100">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt="HydroSonic Elite"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${idx === currentImg ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
          <div className="absolute top-4 left-4 bg-red-600 text-white font-black text-xl px-4 py-2 rounded-lg transform -rotate-3 animate-pulse z-10">
            -50% SAMO DANES
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <ul className="space-y-3">
            {[
              "120 PSI stabilizirano → konstantna resnična moč",
              "1.600 impulzov/min → odstrani nevidni zobni oblak",
              "XL rezervoar 750 ml → brez ponovnega polnjenja",
              "10 stopenj pritiska → prilagodljivo",
              "Način GUM-REPAIR™ → klinična masaža",
              "10 profesionalnih nastavkov vključenih",
              "Vgrajen UV sterilizator",
              "Garancija 3 leta + Plačilo ob prevzemu"
            ].map((bullet, i) => (
              <li key={i} className="flex items-start gap-3 text-lg md:text-xl font-medium">
                <CheckCircle2 className="text-[#0056b3] mt-1 shrink-0" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-gray-300">
            <div className="flex flex-wrap items-baseline gap-4 mb-2">
              <span className="text-xl md:text-2xl line-through text-gray-400">Redna cena: 99,99 €</span>
              <span className="text-4xl md:text-6xl font-black text-red-600">Danes: 49,99 €</span>
            </div>
            <p className="text-red-600 font-bold text-lg md:text-xl uppercase animate-bounce">Ponudba omejena na zadnje zaloge!</p>
          </div>

          <button
            onClick={onOrderClick}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-black text-xl md:text-3xl py-6 rounded-2xl shadow-xl transition-transform active:scale-95 flex flex-col items-center gap-1"
          >
            <span>NAROČITE ZDAJ – PLAČILO OB PREVZEMU</span>
            <span className="text-sm md:text-lg font-bold opacity-90 italic">Brezplačna dostava 24/48h</span>
          </button>

          <div className="grid grid-cols-3 gap-2 text-center text-[10px] md:text-sm font-bold text-green-700">
            <div className="flex flex-col items-center"><Truck size={24}/><span>Plačilo ob prevzemu</span></div>
            <div className="flex flex-col items-center"><CheckCircle2 size={24}/><span>Dostava 24/48h</span></div>
            <div className="flex flex-col items-center"><ShieldCheck size={24}/><span>Garancija 3 leta</span></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const DemoGrid = () => {
  const cards = [
    { label: "ZDRAVE DLESNI", title: "Prenehanje krvavitve v 14 dneh", tech: "Klinično preizkušen pritisk", desc: "Dlesni se prenehajo dražiti zahvaljujoč ciljani stimulaciji.", img: "/images/hydrosonic/donna.png" },
    { label: "GLOBOKO ČIŠČENJE", title: "Čiščenje pod dlesnijo 6 mm", tech: "Ultrazvočni mikro-impulzi", desc: "Doseže tja, kamor zobna nitka in ščetka ne moreta.", img: "/images/hydrosonic/Getto.png" },
    { label: "MOČ", title: "Stabilna tehnologija Dual Pump", tech: "Konstanten pretok 120 PSI", desc: "Brez izgube moči med uporabo, zagotovljeno enakomerno čiščenje.", img: "/images/hydrosonic/7.png" },
    { label: "KLINIČNO", title: "Klinični način GUM-REPAIR", tech: "Aktivna masaža dlesni", desc: "Pospešuje celjenje tkiv in zmanjšuje vnetja.", img: "/images/hydrosonic/uomo.png" },
    { label: "PROFESIONALNO", title: "Komplet 10 profesionalnih nastavkov", tech: "Vsestranskost za vso družino", desc: "Specifični nastavki za zobne aparate, vsadke in čiščenje jezika.", img: "/images/hydrosonic/Beccucci.png" },
    { label: "KAPACITETA", title: "XL rezervoar 750 ml", tech: "Avtonomija več kot 90 sekund", desc: "Eno polnjenje zadostuje za popolno in temeljito čiščenje.", img: "/images/hydrosonic/boccale.png" },
    { label: "HIGIENA", title: "Vgrajen UV sterilizator", tech: "Odstrani 99% bakterij", desc: "Razkuži nastavke po vsaki uporabi s samodejnimi UV žarki.", img: "/images/hydrosonic/sanitazer.png" },
    { label: "STORITEV", title: "Plačilo ob prevzemu 24/48h", tech: "Varna sledljiva dostava", desc: "Prejmete domov in plačate šele, ko imate paket v rokah.", img: "/images/hydrosonic/smalto.png" }
  ];
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-black text-center mb-12 uppercase">Zakaj je HydroSonic Elite™ drugačen?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="flex flex-col border-2 border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow">
            <div className="aspect-square relative overflow-hidden">
              <img src={card.img} alt={card.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 bg-[#0056b3] text-white text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest">
                {card.label}
              </div>
            </div>
            <div className="p-5 flex flex-col flex-grow bg-white">
              <h3 className="font-black text-xl leading-tight mb-2 uppercase">{card.title}</h3>
              <p className="text-[#0056b3] font-bold text-sm mb-3">{card.tech}</p>
              <p className="text-gray-600 text-sm font-medium">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const ProblemAgitation = () => (
  <section className="py-16 px-4 bg-gray-50 border-y border-gray-200">
    <div className="max-w-4xl mx-auto text-center">
      <div className="flex justify-center mb-6">
        <AlertCircle size={64} className="text-red-600 animate-pulse" />
      </div>
      <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight uppercase">
        Kolikokrat ste ignorirali to <span className="text-red-600">rdečo</span> kri v umivalniku?
      </h2>
      <div className="space-y-6 text-xl md:text-2xl font-medium text-gray-700 italic">
        <p>&quot;To je samo malo občutljivosti&quot;, si mislite vsako jutro.</p>
        <p>Toda medtem ko čakate, nevidni zobni oblak koplje <span className="text-black font-black underline">globoke tunele</span> pod vašimi dlesnmi, kamor nobena ščetka ne more doseči.</p>
        <p>Ste se kdaj vprašali, zakaj kljub umivanju zob 3-krat dnevno dah nikoli ni svež in zobozdravnik vedno najde &quot;nekaj za narediti&quot;?</p>
      </div>
      <div className="mt-12 p-8 bg-white border-4 border-red-600 rounded-3xl shadow-2xl relative overflow-hidden">
        <p className="text-2xl font-black text-black leading-snug">
          Ni vaša krivda. Prodajali so vam ščetke, ki čistijo samo površino in puščajo ostanke hrane, da gniejo v mrtvih kotih.
        </p>
        <p className="mt-4 text-xl font-bold text-red-600 uppercase">
          Nehajte tvegati posege za tisoče evrov. Obstaja profesionalna rešitev.
        </p>
      </div>
    </div>
  </section>
);

const OrderForm = ({ searchParams }: { searchParams: URLSearchParams }) => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(900);
  const [formData, setFormData] = useState({ name: '', tel: '', streetAddress: '', postalCode: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const rs = s % 60;
    return `${m}:${rs < 10 ? '0' : ''}${rs}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let tmfp = '';
      try {
        const w = window as unknown as Record<string, unknown>;
        if (typeof w.tmfp === 'string') tmfp = w.tmfp;
      } catch {}

      let ip = '';
      let ua = navigator.userAgent;
      if (!tmfp) {
        try {
          const ipRes = await fetch('https://api.ipify.org?format=json');
          const ipData = await ipRes.json();
          ip = ipData.ip;
        } catch {}
      }

      const body = new URLSearchParams();
      body.append('uid', API_CONFIG.uid);
      body.append('key', API_CONFIG.key);
      body.append('offer', API_CONFIG.offer);
      body.append('lp', API_CONFIG.lp);
      body.append('name', formData.name);
      body.append('tel', formData.tel);
      body.append('street-address', formData.streetAddress);
      if (formData.postalCode) body.append('postal-code', formData.postalCode);
      if (tmfp) body.append('tmfp', tmfp);
      if (!tmfp && ip) body.append('ip', ip);
      if (!tmfp && ua) body.append('ua', ua);

      // UTM params
      const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'subid', 'subid2', 'subid3', 'subid4', 'pubid'];
      utmKeys.forEach(key => {
        const val = searchParams.get(key);
        if (val) body.append(key, val);
      });

      await fetch(API_CONFIG.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      router.push('/fb-hydrosonic-sl/ty');
    } catch {
      router.push('/fb-hydrosonic-sl/ty');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="order-form" className="py-16 px-4 bg-gray-900 text-white scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase text-green-500">Naročite danes - Plačilo ob prevzemu</h2>
          <p className="text-xl font-bold opacity-90 italic">Kreditna kartica ni potrebna. Plačate šele, ko prejmete paket.</p>
          <div className="mt-8 flex flex-col items-center">
            <div className="bg-red-600 px-8 py-4 rounded-2xl flex items-center gap-4 text-2xl md:text-3xl font-black animate-pulse border-4 border-red-400">
              <Clock size={40} />
              <span>POTEČE ČEZ: {formatTime(timeLeft)}</span>
            </div>
            <p className="mt-4 text-red-400 font-black text-xl">Samo 7 kosov preostane na zalogi!</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="bg-white text-black p-8 rounded-[2rem] shadow-2xl border-t-8 border-green-600">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-lg font-black uppercase mb-1">Ime in priimek</label>
                <input type="text" required placeholder="Npr: Janez Novak" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-4 border-4 border-gray-100 rounded-xl outline-none focus:border-[#0056b3]" />
              </div>
              <div>
                <label className="block text-lg font-black uppercase mb-1">Telefon (Mobilni)</label>
                <input type="tel" required placeholder="Npr: 040 123 456" value={formData.tel} onChange={(e) => setFormData({ ...formData, tel: e.target.value })} className="w-full p-4 border-4 border-gray-100 rounded-xl outline-none focus:border-[#0056b3]" />
              </div>
              <div>
                <label className="block text-lg font-black uppercase mb-1">Popoln naslov</label>
                <textarea required rows={3} placeholder="Ulica, hišna številka, mesto, poštna številka" value={formData.streetAddress} onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })} className="w-full p-4 border-4 border-gray-100 rounded-xl outline-none focus:border-[#0056b3]"></textarea>
              </div>
              <div>
                <label className="block text-lg font-black uppercase mb-1">Poštna številka</label>
                <input type="text" placeholder="Npr: 1000" value={formData.postalCode} onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })} className="w-full p-4 border-4 border-gray-100 rounded-xl outline-none focus:border-[#0056b3]" />
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-black text-2xl py-6 rounded-xl shadow-xl flex flex-col items-center">
                <span>{isSubmitting ? 'OBDELAVA...' : 'NAROČITE ZDAJ'}</span>
                <span className="text-sm font-bold opacity-80 uppercase">Plačate kurirju</span>
              </button>
            </form>
          </div>
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-2xl border-2 border-[#0056b3]">
              <h3 className="text-xl font-black mb-2 uppercase flex items-center gap-2 text-[#0056b3]"><ShieldCheck /> Vaša garancija</h3>
              <p className="italic opacity-80">&quot;Pošljemo izdelek, vi ga preglejte in plačate samo, če ste zadovoljni, neposredno kurirju.&quot;</p>
            </div>
            <ul className="space-y-3 font-black text-lg">
              <li className="flex items-center gap-3 text-green-500"><CheckCircle2 /> Ekspresna dostava 24/48h</li>
              <li className="flex items-center gap-3 text-green-500"><CheckCircle2 /> Plačilo ob prevzemu</li>
              <li className="flex items-center gap-3 text-green-500"><CheckCircle2 /> Slovenska podpora strankam</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const faqs = [
    { q: "Ali boli?", a: "Ne, stopnja 1 ima le 20 PSI, ultra nežna tudi za preobčutljive dlesni." },
    { q: "Ali je glasno?", a: "Samo 65 dB, tišje od običajne električne ščetke." },
    { q: "Ali je težko za uporabo?", a: "Ne. Samo 3 intuitivni gumbi. Preprosto za vsakogar." },
    { q: "Ali je za vsadke?", a: "Da, namenski nastavek je vključen." },
    { q: "Ali moram plačati vnaprej?", a: "Ne, plačate ob prevzemu." }
  ];
  return (
    <section className="py-16 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-black text-center mb-10 uppercase">Pogosta vprašanja</h2>
      <div className="space-y-4">
        {faqs.map((f, i) => (
          <div key={i} className="border-2 border-gray-100 rounded-xl overflow-hidden">
            <button onClick={() => setOpenIdx(openIdx === i ? null : i)} className="w-full p-5 text-left flex justify-between font-black uppercase italic">
              {f.q} {openIdx === i ? <ChevronUp /> : <ChevronDown />}
            </button>
            {openIdx === i && <div className="p-5 bg-gray-50 border-t-2 border-gray-100">{f.a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
};

// --- MAIN PAGE COMPONENT ---

function LandingPageContent() {
  const searchParams = useSearchParams();
  const scrollToOrder = () => {
    document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const [showSticky, setShowSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => setShowSticky(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black selection:bg-green-100">
      {/* Top Bar */}
      <div className="bg-[#0056b3] text-white py-3 text-center font-black uppercase text-sm md:text-base sticky top-0 z-50">
        HydroSonic Elite™ – ProCare Series™
      </div>

      <HeroSection onOrderClick={scrollToOrder} />

      {/* Trust Bar */}
      <div className="bg-[#0056b3] py-8 border-y-4 border-blue-400">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-white">
          <div className="flex flex-col items-center text-center gap-2">
            <Truck size={32} />
            <p className="font-black leading-tight text-xs md:text-base uppercase">Dostava 24/48h</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <ShieldCheck size={32} />
            <p className="font-black leading-tight text-xs md:text-base uppercase">Plačilo ob prevzemu</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <RefreshCcw size={32} />
            <p className="font-black leading-tight text-xs md:text-base uppercase">Garancija 3 leta</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <Phone size={32} />
            <p className="font-black leading-tight text-xs md:text-base uppercase">Podpora 24/7</p>
          </div>
        </div>
      </div>

      <DemoGrid />
      <ProblemAgitation />

      {/* Solution Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase">Končna rešitev brez napora</h2>
          <p className="text-xl font-bold text-[#0056b3] italic">HydroSonic Elite™ prinese delo zobozdravnika neposredno v vašo kopalnico.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <img src="/images/hydrosonic/Total.png" alt="HydroSonic Elite" className="rounded-3xl shadow-2xl border-8 border-gray-100" />
          <ul className="space-y-4">
            {[
              "Odstrani 99,9% zobnega oblaka v samo 60 sekundah",
              "Masira dlesni in spodbuja mikrocirkulacijo",
              "Nujno za tiste z zobnimi aparati ali vsadki",
              "Odpravi slab zadah pri korenu",
              "Zelo enostavno za uporabo: samo en gumb",
              "Zagotovljen prihranek pri zobozdravstvenih tretmajih"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4 text-lg md:text-xl font-black bg-gray-50 p-4 rounded-xl border-l-8 border-[#0056b3]">
                <Sparkles className="text-[#0056b3] mt-1 shrink-0" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 px-4 bg-[#0056b3] text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-16 uppercase italic">Klinično čiščenje v 3 korakih</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { n: "1", t: "Napolnite z mlačno vodo" },
              { n: "2", t: "Izberite ustrezno stopnjo" },
              { n: "3", t: "Pritisnite in pustite, da opravi vse" }
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-20 h-20 bg-white text-[#0056b3] rounded-full flex items-center justify-center text-4xl font-black mb-4">{s.n}</div>
                <h3 className="text-2xl font-black italic">{s.t}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-center mb-12 uppercase">HydroSonic Elite™ vs Ostali</h2>
        <div className="overflow-hidden rounded-3xl shadow-2xl border-4 border-gray-100">
          <table className="w-full text-left font-black">
            <thead className="bg-gray-100 text-sm md:text-base">
              <tr>
                <th className="p-4 md:p-6">LASTNOST</th>
                <th className="p-4 md:p-6 text-[#0056b3] bg-blue-50 text-center">MI</th>
                <th className="p-4 md:p-6 text-gray-400 text-center">ONI</th>
              </tr>
            </thead>
            <tbody className="text-sm md:text-lg">
              <tr className="border-b"><td className="p-4">Moč 120 PSI</td><td className="p-4 text-green-600 bg-blue-50/50 text-center">DA</td><td className="p-4 text-red-500 text-center">NE</td></tr>
              <tr className="border-b"><td className="p-4">XL rezervoar 750ml</td><td className="p-4 text-green-600 bg-blue-50/50 text-center">DA</td><td className="p-4 text-red-500 text-center">NE</td></tr>
              <tr className="border-b"><td className="p-4">UV sterilizator</td><td className="p-4 text-green-600 bg-blue-50/50 text-center">DA</td><td className="p-4 text-red-500 text-center">NE</td></tr>
              <tr className="bg-green-50 text-green-800"><td className="p-4">PLAČILO OB PREVZEMU</td><td className="p-4 bg-blue-100 text-[#0056b3] text-center">DA</td><td className="p-4 text-red-500 text-center">NE</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Bundle Section */}
      <section className="py-16 px-4 bg-orange-50 border-y-4 border-orange-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-8 text-orange-800 uppercase italic">Super darilni paket</h2>
          <div className="bg-white p-8 rounded-[3rem] shadow-2xl relative overflow-hidden border-4 border-orange-300">
            <div className="absolute top-0 right-0 p-4 bg-orange-500 text-white font-black rotate-12">VREDNOST 101 € GRATIS</div>
            <ul className="space-y-4 text-left font-black italic text-lg md:text-2xl mb-8">
              <li className="flex justify-between border-b pb-2"><span>Komplet 10 nastavkov</span> <span className="text-red-600">GRATIS</span></li>
              <li className="flex justify-between border-b pb-2"><span>Potovalna torbica</span> <span className="text-red-600">GRATIS</span></li>
              <li className="flex justify-between border-b pb-2"><span>Zobno ogledalo</span> <span className="text-red-600">GRATIS</span></li>
              <li className="flex justify-between"><span>PDF vodič</span> <span className="text-red-600">GRATIS</span></li>
            </ul>
            <div className="bg-orange-100 p-6 rounded-2xl">
              <p className="text-3xl md:text-5xl font-black text-[#0056b3]">VSE ZA SAMO 49,99 €</p>
              <button onClick={scrollToOrder} className="mt-4 bg-green-600 text-white font-black px-8 py-4 rounded-xl text-xl animate-pulse">IZKORISTITE ZDAJ</button>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-black text-center mb-12 uppercase">Preverjene ocene</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { n: "Marko N. (Ljubljana)", t: "Neverjetno! Odkar ga uporabljam, dlesni mi ne krvavijo več. Hitra dostava in plačal sem kurirju." },
            { n: "Ana P. (Maribor)", t: "Popolno za tiste z aparatom kot sem jaz. Čisti tam, kamor ščetka nikoli ne doseže." },
            { n: "Janez K. (Celje)", t: "Občutljivi vsadki in popoln curek. Stane pol manj kot znane znamke, a je veliko boljši." }
          ].map((r, i) => (
            <div key={i} className="bg-white border-4 border-gray-100 p-6 rounded-3xl shadow-lg">
              <div className="flex text-orange-500 mb-2">{[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}</div>
              <p className="font-black italic text-lg mb-2">&quot;{r.t}&quot;</p>
              <p className="text-sm font-bold text-gray-500">— {r.n}</p>
            </div>
          ))}
        </div>
      </section>

      <OrderForm searchParams={searchParams} />
      <FAQSection />

      {/* Footer */}
      <footer className="bg-gray-100 py-10 text-center text-sm font-bold text-gray-400 px-4">
        <p>HydroSonic Elite™ – ProCare Series™ © 2025</p>
        <p className="mt-2 opacity-50 uppercase tracking-widest text-[10px]">Podpora: support@procare.si</p>
      </footer>

      {/* Sticky Mobile Bar */}
      {showSticky && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] p-3 bg-white/95 border-t-2 border-gray-200">
          <button onClick={scrollToOrder} className="w-full bg-green-600 text-white font-black py-4 rounded-xl shadow-2xl flex flex-col items-center">
            <span className="text-xl uppercase">NAROČITE ZDAJ - 49,99 €</span>
            <span className="text-[10px] font-bold uppercase opacity-80 tracking-tighter">Plačilo ob prevzemu - Dostava 24/48h</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default function LandingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <LandingPageContent />
    </Suspense>
  );
}
