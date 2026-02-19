
"use client";

import React, { useState, useEffect } from 'react';
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
  offer: '671',
  lp: '671'
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
          Dosta boli desni i površinskog čišćenja
        </h1>
        <p className="text-xl md:text-3xl font-bold text-gray-700">
          Profesionalno čišćenje. Bez stomatologa. Bez boli.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-orange-500">
          <div className="flex">
            {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={20} />)}
          </div>
          <span className="font-bold text-black text-sm md:text-base">4.8/5 - +12.847 zadovoljnih kupaca - Bestseler 2025</span>
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
            -50% SAMO DANAS
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <ul className="space-y-3">
            {[
              "120 PSI stabilizirano → konstantna stvarna snaga",
              "1.600 impulsa/min → uklanja nevidljivi plak",
              "XL spremnik 750 ml → bez ponovnog punjenja",
              "10 razina pritiska → prilagodljivo",
              "GUM-REPAIR™ način → klinička masaža",
              "10 profesionalnih nastavaka uključeno",
              "Ugrađeni UV sterilizator",
              "Jamstvo 3 godine + Plaćanje pouzećem"
            ].map((bullet, i) => (
              <li key={i} className="flex items-start gap-3 text-lg md:text-xl font-medium">
                <CheckCircle2 className="text-[#0056b3] mt-1 shrink-0" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-gray-300">
            <div className="flex flex-wrap items-baseline gap-4 mb-2">
              <span className="text-xl md:text-2xl line-through text-gray-400">Redovna cijena: 99,99 €</span>
              <span className="text-4xl md:text-6xl font-black text-red-600">Danas: 49,99 €</span>
            </div>
            <p className="text-red-600 font-bold text-lg md:text-xl uppercase animate-bounce">Ponuda ograničena na posljednje zalihe!</p>
          </div>

          <button
            onClick={onOrderClick}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-black text-xl md:text-3xl py-6 rounded-2xl shadow-xl transition-transform active:scale-95 flex flex-col items-center gap-1"
          >
            <span>NARUČITE ODMAH – PLAĆANJE POUZEĆEM</span>
            <span className="text-sm md:text-lg font-bold opacity-90 italic">Besplatna dostava 24/48h</span>
          </button>

          <div className="grid grid-cols-3 gap-2 text-center text-[10px] md:text-sm font-bold text-green-700">
            <div className="flex flex-col items-center"><Truck size={24}/><span>Plaćanje pouzećem</span></div>
            <div className="flex flex-col items-center"><CheckCircle2 size={24}/><span>Dostava 24/48h</span></div>
            <div className="flex flex-col items-center"><ShieldCheck size={24}/><span>Jamstvo 3 godine</span></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const DemoGrid = () => {
  const cards = [
    { label: "ZDRAVE DESNI", title: "Prestanak krvarenja za 14 dana", tech: "Klinički testiran pritisak", desc: "Desni se prestaju nadraživati zahvaljujući ciljanoj stimulaciji.", img: "/images/hydrosonic/donna.png" },
    { label: "DUBOKO ČIŠĆENJE", title: "Čišćenje ispod desni 6 mm", tech: "Ultrazvučni mikro-impulsi", desc: "Doseže tamo gdje zubni konac i četkica ne mogu.", img: "/images/hydrosonic/Getto.png" },
    { label: "SNAGA", title: "Stabilna Dual Pump tehnologija", tech: "Konstantni protok 120 PSI", desc: "Bez gubitka snage tijekom korištenja, zajamčeno ravnomjerno čišćenje.", img: "/images/hydrosonic/7.png" },
    { label: "KLINIČKI", title: "Klinički GUM-REPAIR način", tech: "Aktivna masaža desni", desc: "Ubrzava zacjeljivanje tkiva i smanjuje upale.", img: "/images/hydrosonic/uomo.png" },
    { label: "PROFESIONALNO", title: "Komplet od 10 profesionalnih nastavaka", tech: "Svestranost za cijelu obitelj", desc: "Specifični nastavci za aparatiće, implantate i čišćenje jezika.", img: "/images/hydrosonic/Beccucci.png" },
    { label: "KAPACITET", title: "XL spremnik 750 ml", tech: "Autonomija preko 90 sekundi", desc: "Jedno punjenje dovoljno za potpuno i temeljito čišćenje.", img: "/images/hydrosonic/boccale.png" },
    { label: "HIGIJENA", title: "Ugrađeni UV sterilizator", tech: "Eliminira 99% bakterija", desc: "Dezinficira nastavke nakon svake upotrebe pomoću automatskih UV zraka.", img: "/images/hydrosonic/sanitazer.png" },
    { label: "USLUGA", title: "Plaćanje pouzećem 24/48h", tech: "Sigurna praćena dostava", desc: "Primate kući i plaćate tek kada imate paket u rukama.", img: "/images/hydrosonic/smalto.png" }
  ];
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-black text-center mb-12 uppercase">Zašto je HydroSonic Elite™ drugačiji?</h2>
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
        Koliko ste puta ignorirali tu <span className="text-red-600">crvenu</span> krv u umivaoniku?
      </h2>
      <div className="space-y-6 text-xl md:text-2xl font-medium text-gray-700 italic">
        <p>&quot;To je samo malo osjetljivosti&quot;, mislite svako jutro.</p>
        <p>Ali dok vi čekate, nevidljivi plak kopа <span className="text-black font-black underline">duboke tunele</span> ispod vaših desni, gdje nijedna četkica ne može doprijeti.</p>
        <p>Jeste li se ikada zapitali zašto, unatoč pranju zubi 3 puta dnevno, dah nikada nije svjež i stomatolog uvijek pronađe &quot;nešto za napraviti&quot;?</p>
      </div>
      <div className="mt-12 p-8 bg-white border-4 border-red-600 rounded-3xl shadow-2xl relative overflow-hidden">
        <p className="text-2xl font-black text-black leading-snug">
          Nije vaša krivnja. Prodavali su vam četkice koje čiste samo površinu, ostavljajući ostatke hrane da trule u mrtvim kutovima.
        </p>
        <p className="mt-4 text-xl font-bold text-red-600 uppercase">
          Prestanite riskirati zahvate od tisuća eura. Postoji profesionalni izlaz.
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

      router.push('/fb-hydrosonic-hr/ty');
    } catch {
      router.push('/fb-hydrosonic-hr/ty');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="order-form" className="py-16 px-4 bg-gray-900 text-white scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase text-green-500">Naručite danas - Plaćanje pouzećem</h2>
          <p className="text-xl font-bold opacity-90 italic">Kreditna kartica nije potrebna. Plaćate tek kada primite paket.</p>
          <div className="mt-8 flex flex-col items-center">
            <div className="bg-red-600 px-8 py-4 rounded-2xl flex items-center gap-4 text-2xl md:text-3xl font-black animate-pulse border-4 border-red-400">
              <Clock size={40} />
              <span>ISTJEČE ZA: {formatTime(timeLeft)}</span>
            </div>
            <p className="mt-4 text-red-400 font-black text-xl">Samo 7 komada preostalo na skladištu!</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="bg-white text-black p-8 rounded-[2rem] shadow-2xl border-t-8 border-green-600">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-lg font-black uppercase mb-1">Ime i prezime</label>
                <input type="text" required placeholder="Npr: Ivan Horvat" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-4 border-4 border-gray-100 rounded-xl outline-none focus:border-[#0056b3]" />
              </div>
              <div>
                <label className="block text-lg font-black uppercase mb-1">Telefon (Mobitel)</label>
                <input type="tel" required placeholder="Npr: 091 234 5678" value={formData.tel} onChange={(e) => setFormData({ ...formData, tel: e.target.value })} className="w-full p-4 border-4 border-gray-100 rounded-xl outline-none focus:border-[#0056b3]" />
              </div>
              <div>
                <label className="block text-lg font-black uppercase mb-1">Potpuna adresa</label>
                <textarea required rows={3} placeholder="Ulica, kućni broj, grad, poštanski broj" value={formData.streetAddress} onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })} className="w-full p-4 border-4 border-gray-100 rounded-xl outline-none focus:border-[#0056b3]"></textarea>
              </div>
              <div>
                <label className="block text-lg font-black uppercase mb-1">Poštanski broj</label>
                <input type="text" placeholder="Npr: 10000" value={formData.postalCode} onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })} className="w-full p-4 border-4 border-gray-100 rounded-xl outline-none focus:border-[#0056b3]" />
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-black text-2xl py-6 rounded-xl shadow-xl flex flex-col items-center">
                <span>{isSubmitting ? 'OBRADA...' : 'NARUČITE ODMAH'}</span>
                <span className="text-sm font-bold opacity-80 uppercase">Plaćate kuriru</span>
              </button>
            </form>
          </div>
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-2xl border-2 border-[#0056b3]">
              <h3 className="text-xl font-black mb-2 uppercase flex items-center gap-2 text-[#0056b3]"><ShieldCheck /> Vaše jamstvo</h3>
              <p className="italic opacity-80">&quot;Šaljemo proizvod, vi ga pregledajte i platite samo ako ste zadovoljni izravno kuriru.&quot;</p>
            </div>
            <ul className="space-y-3 font-black text-lg">
              <li className="flex items-center gap-3 text-green-500"><CheckCircle2 /> Ekspresna dostava 24/48h</li>
              <li className="flex items-center gap-3 text-green-500"><CheckCircle2 /> Plaćanje pouzećem</li>
              <li className="flex items-center gap-3 text-green-500"><CheckCircle2 /> Hrvatska korisnička podrška</li>
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
    { q: "Boli li?", a: "Ne, razina 1 ima samo 20 PSI, ultra nježna čak i za preosjetljive desni." },
    { q: "Je li glasno?", a: "Samo 65 dB, tiše od obične električne četkice." },
    { q: "Je li teško za korištenje?", a: "Ne. Samo 3 intuitivna gumba. Jednostavno za svakoga." },
    { q: "Je li za implantate?", a: "Da, namjenski nastavak je uključen." },
    { q: "Moram li platiti unaprijed?", a: "Ne, plaćate pouzećem." }
  ];
  return (
    <section className="py-16 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-black text-center mb-10 uppercase">Česta pitanja</h2>
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

export default function LandingPage() {
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
            <p className="font-black leading-tight text-xs md:text-base uppercase">Plaćanje pouzećem</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <RefreshCcw size={32} />
            <p className="font-black leading-tight text-xs md:text-base uppercase">Jamstvo 3 godine</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <Phone size={32} />
            <p className="font-black leading-tight text-xs md:text-base uppercase">Podrška 24/7</p>
          </div>
        </div>
      </div>

      <DemoGrid />
      <ProblemAgitation />

      {/* Solution Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase">Konačno rješenje bez napora</h2>
          <p className="text-xl font-bold text-[#0056b3] italic">HydroSonic Elite™ donosi posao stomatologa izravno u vašu kupaonicu.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <img src="/images/hydrosonic/Total.png" alt="HydroSonic Elite" className="rounded-3xl shadow-2xl border-8 border-gray-100" />
          <ul className="space-y-4">
            {[
              "Uklanja 99,9% plaka u samo 60 sekundi",
              "Masira desni stimulirajući mikrocirkulaciju",
              "Neophodno za one s aparatićima ili implantatima",
              "Eliminira loš zadah iz korijena",
              "Vrlo jednostavno za korištenje: samo jedan gumb",
              "Zajamčena ušteda na stomatološkim tretmanima"
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
          <h2 className="text-3xl md:text-5xl font-black mb-16 uppercase italic">Kliničko čišćenje u 3 koraka</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { n: "1", t: "Napunite mlakom vodom" },
              { n: "2", t: "Odaberite odgovarajuću razinu" },
              { n: "3", t: "Pritisnite i pustite da on obavi sve" }
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
                <th className="p-4 md:p-6">KARAKTERISTIKA</th>
                <th className="p-4 md:p-6 text-[#0056b3] bg-blue-50 text-center">MI</th>
                <th className="p-4 md:p-6 text-gray-400 text-center">ONI</th>
              </tr>
            </thead>
            <tbody className="text-sm md:text-lg">
              <tr className="border-b"><td className="p-4">Snaga 120 PSI</td><td className="p-4 text-green-600 bg-blue-50/50 text-center">DA</td><td className="p-4 text-red-500 text-center">NE</td></tr>
              <tr className="border-b"><td className="p-4">XL spremnik 750ml</td><td className="p-4 text-green-600 bg-blue-50/50 text-center">DA</td><td className="p-4 text-red-500 text-center">NE</td></tr>
              <tr className="border-b"><td className="p-4">UV sterilizator</td><td className="p-4 text-green-600 bg-blue-50/50 text-center">DA</td><td className="p-4 text-red-500 text-center">NE</td></tr>
              <tr className="bg-green-50 text-green-800"><td className="p-4">PLAĆANJE POUZEĆEM</td><td className="p-4 bg-blue-100 text-[#0056b3] text-center">DA</td><td className="p-4 text-red-500 text-center">NE</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Bundle Section */}
      <section className="py-16 px-4 bg-orange-50 border-y-4 border-orange-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-8 text-orange-800 uppercase italic">Super poklon paket</h2>
          <div className="bg-white p-8 rounded-[3rem] shadow-2xl relative overflow-hidden border-4 border-orange-300">
            <div className="absolute top-0 right-0 p-4 bg-orange-500 text-white font-black rotate-12">VRIJEDNOST 101 € GRATIS</div>
            <ul className="space-y-4 text-left font-black italic text-lg md:text-2xl mb-8">
              <li className="flex justify-between border-b pb-2"><span>Komplet 10 nastavaka</span> <span className="text-red-600">GRATIS</span></li>
              <li className="flex justify-between border-b pb-2"><span>Putna torbica</span> <span className="text-red-600">GRATIS</span></li>
              <li className="flex justify-between border-b pb-2"><span>Zubno ogledalo</span> <span className="text-red-600">GRATIS</span></li>
              <li className="flex justify-between"><span>PDF vodič</span> <span className="text-red-600">GRATIS</span></li>
            </ul>
            <div className="bg-orange-100 p-6 rounded-2xl">
              <p className="text-3xl md:text-5xl font-black text-[#0056b3]">SVE ZA SAMO 49,99 €</p>
              <button onClick={scrollToOrder} className="mt-4 bg-green-600 text-white font-black px-8 py-4 rounded-xl text-xl animate-pulse">ISKORISTITE ODMAH</button>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-black text-center mb-12 uppercase">Verificirane recenzije</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { n: "Marko H. (Zagreb)", t: "Nevjerojatno! Otkako ga koristim, desni mi više ne krvare. Brza dostava i platio sam kuriru." },
            { n: "Ana K. (Split)", t: "Savršeno za one s aparatićem kao ja. Čisti tamo gdje četkica nikada ne doseže." },
            { n: "Ivan P. (Rijeka)", t: "Osjetljivi implantati i savršen mlaz. Košta upola manje od poznatih, ali je mnogo bolji." }
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
        <p className="mt-2 opacity-50 uppercase tracking-widest text-[10px]">Podrška: support@procare.hr</p>
      </footer>

      {/* Sticky Mobile Bar */}
      {showSticky && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] p-3 bg-white/95 border-t-2 border-gray-200">
          <button onClick={scrollToOrder} className="w-full bg-green-600 text-white font-black py-4 rounded-xl shadow-2xl flex flex-col items-center">
            <span className="text-xl uppercase">NARUČITE ODMAH - 49,99 €</span>
            <span className="text-[10px] font-bold uppercase opacity-80 tracking-tighter">Plaćanje pouzećem - Dostava 24/48h</span>
          </button>
        </div>
      )}
    </div>
  );
}
