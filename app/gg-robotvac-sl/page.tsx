'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import {
  ShoppingCart, CheckCircle, ArrowDown, X, Clock, Zap, Package, Eye, Menu,
  Timer, Sparkles, Navigation, Smartphone, Battery, Wind, ShieldCheck,
  Star, Check, Truck, Lock, CreditCard, ChevronDown, ChevronUp, HelpCircle,
  ThumbsUp, RefreshCw, Trash2, Droplets, Cpu, Gauge, Wifi, Layers, Volume2, Maximize, Shield,
  ChevronLeft, ChevronRight
} from 'lucide-react';

/* --- COMPONENTS --- */

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-center space-x-2 bg-brand-red/10 text-brand-red font-bold py-2 px-4 rounded-lg border border-brand-red/20 animate-pulse text-red-600 bg-red-50 border-red-200">
      <Timer size={20} />
      <span>Ponudba se konča čez: {formatTime(timeLeft)}</span>
    </div>
  );
};

const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const images = [
    '/images/robot-asp/1.png',
    '/images/robot-asp/2.png',
    '/images/robot-asp/3.png',
    '/images/robot-asp/4.png',
    '/images/robot-asp/5.png',
    '/images/robot-asp/6.png',
    '/images/robot-asp/7.png',
    '/images/robot-asp/8.png',
    '/images/robot-asp/9.png',
  ];

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length, autoPlay]);

  const goToSlide = (index: number) => {
    setAutoPlay(false);
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setAutoPlay(false);
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setAutoPlay(false);
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full md:w-[700px] mx-auto">
      <div className="relative overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(255,87,34,0.3)] border border-white/10">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`NovaClean X1 - Slika ${index + 1}`}
              className="w-full flex-shrink-0 object-cover aspect-square"
            />
          ))}
        </div>

        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm z-40 cursor-pointer"
          aria-label="Prejšnja slika"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm z-40 cursor-pointer"
          aria-label="Naslednja slika"
        >
          <ChevronRight size={24} />
        </button>

        <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-lg font-bold text-sm shadow-lg animate-bounce">
          ✅ POSTAJA V PAKETU
        </div>

        <div className="absolute -bottom-1 left-0 right-0 h-10 bg-gradient-to-t from-[#111] to-transparent"></div>
      </div>

      <div className="flex justify-center gap-2 mt-4 px-2 overflow-x-auto pb-2">
        {images.map((src, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all duration-300 ${
              index === currentSlide
                ? 'ring-2 ring-orange-500 scale-105'
                : 'opacity-50 hover:opacity-80'
            }`}
            aria-label={`Pojdi na sliko ${index + 1}`}
          >
            <img
              src={src}
              alt={`Predogled ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      icon: <Sparkles className="w-8 h-8 text-white" />,
      bg: "bg-blue-500",
      title: "2-v-1: Sesanje in Pomivanje",
      desc: "Ciklonski motor posesa prah, medtem ko mikrovlakenska krpa odstranjuje trdovratne madeže. En prehod, dvojni rezultat."
    },
    {
      icon: <Navigation className="w-8 h-8 text-white" />,
      bg: "bg-purple-500",
      title: "Pametna Navigacija 3.0",
      desc: "Ne pade s stopnic in se ne zaleti. IR senzorji kartirajo prostor, se izogibajo oviram in čistijo pod posteljami in kavči."
    },
    {
      icon: <Smartphone className="w-8 h-8 text-white" />,
      bg: "bg-green-500",
      title: "Popoln Nadzor",
      desc: "Uporabite daljinski upravljalnik ali priloženo aplikacijo. Zaženite čiščenje iz pisarne in se vrnite v bleščečo hišo."
    },
    {
       icon: <Battery className="w-8 h-8 text-white" />,
       bg: "bg-yellow-500",
       title: "Samodejno Polnjenje",
       desc: "Ko se baterija izprazni, se sam vrne na NovaStation, se napolni, izprazni in nadaljuje tam, kjer je končal."
    },
    {
       icon: <Wind className="w-8 h-8 text-white" />,
       bg: "bg-teal-500",
       title: "Super Tih",
       desc: "Manj kot 65dB. Lahko gledate televizijo ali uspavate otroke, medtem ko tiho dela."
    },
    {
       icon: <ShieldCheck className="w-8 h-8 text-white" />,
       bg: "bg-red-500",
       title: "HEPA Filter",
       desc: "Zajame 99,9% alergenov in finega prahu. Idealno za alergike in lastnike hišnih ljubljenčkov."
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
           <span className="text-brand-orange text-orange-600 font-bold tracking-widest text-sm uppercase">Napredna Tehnologija</span>
           <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-2">
             Vse, kar pričakujete od robota.<br />
             <span className="text-gray-400">Brez nore cene.</span>
           </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 overflow-hidden relative">
              <div className={`absolute top-0 right-0 w-24 h-24 ${f.bg} opacity-10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150 duration-500`}></div>

              <div className={`mb-4 w-14 h-14 ${f.bg} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{f.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StationUpgrade: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-[#0a0a0a] text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-500/10 to-transparent pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">

          <div className="w-full md:w-1/2">
            <div className="inline-block bg-white/10 backdrop-blur border border-white/20 text-orange-500 font-bold px-4 py-1 rounded-full text-xs mb-6 uppercase tracking-widest">
              V CENI (VREDNOST €179)
            </div>
            <h2 className="text-4xl md:text-6xl font-black leading-none mb-6">
              DA, POSTAJA JE<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">V PAKETU.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Pravilno berete. Ne plačate dodatno. <strong>NovaStation™ Omni All-in-One</strong> je v osnovnem paketu. Robot se sam vrne, izprazni in očisti.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition duration-300">
                <Trash2 className="text-orange-500 mb-3 w-8 h-8" />
                <h4 className="font-bold text-lg mb-1">Samodejno Praznjenje</h4>
                <p className="text-gray-400 text-sm">Posesa umazanijo iz robota v zaprto vrečko 3L (zdrži 2 meseca).</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition duration-300">
                <Droplets className="text-blue-500 mb-3 w-8 h-8" />
                <h4 className="font-bold text-lg mb-1">Menjava Vode in Pranje</h4>
                <p className="text-gray-400 text-sm">Opere umazane krpe in napolni rezervoar robota s čisto vodo.</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition duration-300">
                <Wind className="text-gray-300 mb-3 w-8 h-8" />
                <h4 className="font-bold text-lg mb-1">Sušenje s Toploto</h4>
                <p className="text-gray-400 text-sm">Suši mop pri 45°C, s čimer preprečuje plesen in neprijetne vonjave.</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition duration-300">
                <Zap className="text-yellow-400 mb-3 w-8 h-8" />
                <h4 className="font-bold text-lg mb-1">Polnjenje +30%</h4>
                <p className="text-gray-400 text-sm">Pametno hitro polnjenje za hitrejšo vrnitev na delo.</p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 relative">
             <div className="absolute inset-0 bg-orange-500/20 blur-[100px] rounded-full"></div>
             <img
               src="/images/robot-asp/2.png"
               alt="NovaStation Omni Dock"
               className="relative z-10 rounded-2xl shadow-2xl border border-white/10 w-full object-cover transform hover:scale-105 transition duration-500"
             />

             <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-4 rounded-xl shadow-xl z-20 border-l-4 border-orange-500 max-w-xs hidden md:block">
                <div className="font-bold uppercase text-xs text-gray-500">Vrednost €179</div>
                <div className="font-black text-xl text-orange-500">BREZPLAČNO DANES</div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const ReviewCard: React.FC<{ name: string; country: string; flag: string; text: string; date: string }> = ({ name, country, flag, text, date }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-50">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold text-sm">
           {name.charAt(0)}
        </div>
        <div>
           <div className="font-bold text-sm text-gray-900">{name}</div>
           <span className="text-xs text-gray-400 flex items-center gap-1">
             {flag} {country} • {date}
           </span>
        </div>
      </div>
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
      </div>
    </div>
    <p className="text-gray-700 italic text-sm leading-relaxed mb-4 flex-grow">"{text}"</p>
    <div className="mt-auto flex items-center text-xs text-green-700 font-bold bg-green-50 w-fit px-2 py-1 rounded-md">
      <Check size={12} className="mr-1" /> Preverjen Nakup
    </div>
  </div>
);

const Reviews: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12 bg-gray-50 p-6 rounded-2xl border border-gray-100">
           <div className="text-5xl font-black text-gray-900">4.9<span className="text-2xl text-gray-400">/5</span></div>
           <div className="flex flex-col items-center md:items-start">
              <div className="flex text-yellow-400 mb-1">
                 {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="currentColor" />)}
              </div>
              <p className="text-gray-500 text-sm font-medium">Na podlagi <span className="underline">1.248 ocen</span> strank</p>
           </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <ReviewCard
            name="Ana Novak"
            country="Slovenija"
            flag="🇸🇮"
            date="pred 2 dnevi"
            text="Iskreno, bil sem skeptičen glede cene. Ampak sesa bolje kot moj stari iRobot za 400€. Pasja dlaka ni več problem."
          />
          <ReviewCard
            name="Marko Horvat"
            country="Slovenija"
            flag="🇸🇮"
            date="pred tednom"
            text="Prispel je v 24 urah. Pomivanje ni tako globoko kot ročno, ampak za vsakodnevno vzdrževanje čistoče je popoln. Priporočam!"
          />
          <ReviewCard
            name="Petra Kovač"
            country="Slovenija"
            flag="🇸🇮"
            date="pred 3 dnevi"
            text="Baterija traja večno. Očisti celotno moje 80m² stanovanje in še vedno ostane napolnjena. Najboljši nakup leta za ženo (in zame)."
          />
        </div>
      </div>
    </section>
  );
};

const SpecItem: React.FC<{ icon: React.ReactNode; label: string; value: string; detail?: string }> = ({ icon, label, value, detail }) => (
  <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-colors">
    <div className="text-brand-orange p-2 bg-orange-50 rounded-lg text-orange-600">
      {icon}
    </div>
    <div>
      <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">{label}</div>
      <div className="font-bold text-gray-900 text-lg">{value}</div>
      {detail && <div className="text-xs text-gray-400 mt-1">{detail}</div>}
    </div>
  </div>
);

const TechSpecs: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Tehnične Specifikacije</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Komponente industrijske kakovosti zasnovane za več kot 10 let uporabe.
            Primerjajte z modeli za 1000€.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SpecItem
            icon={<Gauge size={24} />}
            label="Sesalna Moč"
            value="6000 Pa"
            detail="Brezkrtačni motor Nidec™ (Japonska)"
          />
          <SpecItem
            icon={<Battery size={24} />}
            label="Baterija"
            value="5200 mAh"
            detail="Do 180 min neprekinjenega delovanja"
          />
          <SpecItem
            icon={<Cpu size={24} />}
            label="Navigacija"
            value="LiDAR LDS 4.0"
            detail="Lasersko Kartiranje 360° + SLAM AI"
          />
           <SpecItem
            icon={<Volume2 size={24} />}
            label="Glasnost"
            value="< 55 dB"
            detail="Ultra-Tihi Nočni Način"
          />
          <SpecItem
            icon={<Wifi size={24} />}
            label="Povezljivost"
            value="WiFi 2.4/5 GHz"
            detail="Združljivo z Alexa, Google Home in App"
          />
           <SpecItem
            icon={<Layers size={24} />}
            label="Kapaciteta Prahu"
            value="3 Litri (Postaja)"
            detail="400ml notranji rezervoar robota"
          />
          <SpecItem
            icon={<Maximize size={24} />}
            label="Premagovanje Ovir"
            value="20 mm"
            detail="Off-Road protizdrsna kolesa"
          />
          <SpecItem
            icon={<Shield size={24} />}
            label="Filtracija"
            value="HEPA H13"
            detail="Zajame 99,97% mikrodelcev"
          />
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg text-center text-xs text-gray-400">
           * Specifikacije preverjene v neodvisnem laboratoriju TÜV Rheinland. Certifikacija CE/RoHS v paketu.
        </div>
      </div>
    </section>
  );
};

const Guarantee: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-orange-50 border-y border-orange-100">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">

          <div className="flex-shrink-0 relative group">
            <div className="absolute inset-0 bg-orange-500 blur-xl opacity-20 rounded-full group-hover:opacity-30 transition-opacity"></div>
            <div className="w-32 h-32 md:w-40 md:h-40 bg-white border-4 border-orange-500 rounded-full flex flex-col items-center justify-center shadow-2xl relative z-10 transform rotate-[-5deg] group-hover:rotate-0 transition-transform duration-300">
              <span className="text-orange-500 font-black text-3xl md:text-4xl">30</span>
              <span className="text-gray-900 font-bold text-xs uppercase tracking-wider">Dni za</span>
              <span className="text-orange-500 font-bold text-sm uppercase">Test</span>
            </div>
          </div>

          <div className="text-center md:text-left flex-1">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 uppercase italic">
              100% Zadovoljstvo ali Vračilo Denarja
            </h2>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              Vemo, da je spletno nakupovanje lahko stresno. Zato vam damo <span className="font-bold">30 dni</span> za testiranje NovaClean X1 doma. Če ne čisti tako, kot obljubljamo, ali vam preprosto ni všeč barva, ga vzamemo nazaj in vrnemo vsak cent.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="flex items-center gap-2 text-sm font-bold text-gray-800 bg-white p-3 rounded-lg shadow-sm border border-orange-100">
                  <ShieldCheck className="text-green-500" /> Brez Tveganja
               </div>
               <div className="flex items-center gap-2 text-sm font-bold text-gray-800 bg-white p-3 rounded-lg shadow-sm border border-orange-100">
                  <RefreshCw className="text-blue-500" /> Brezplačna Vrnitev
               </div>
               <div className="flex items-center gap-2 text-sm font-bold text-gray-800 bg-white p-3 rounded-lg shadow-sm border border-orange-100">
                  <ThumbsUp className="text-orange-500" /> Podpora SI
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="w-full py-4 flex items-center justify-between text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold text-gray-900 text-lg pr-4">{question}</span>
        {isOpen ? <ChevronUp className="text-orange-500 flex-shrink-0" /> : <ChevronDown className="text-gray-400 flex-shrink-0" />}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-gray-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "Ali dobro deluje z živalsko dlako?",
      answer: "Absolutno da. Centralna krtača v obliki V in močno ciklonsko sesanje sta posebej zasnovana za zajemanje dlake psov in mačk brez zapletanja."
    },
    {
      question: "Kje najdem nadomestne dele?",
      answer: "Ponujamo komplete nadomestnih delov (krtače, HEPA filtri, krpe) neposredno na naši strani po tovarniških cenah. Poleg tega so komponente univerzalne in enostavno dostopne."
    },
    {
      question: "Ali garancija pokriva okvare?",
      answer: "Da, ponujamo 2-letno Neposredno Garancijo. Če ima robot tehnično napako, ga zamenjamo brezplačno za novega. 100% slovenska podpora."
    },
    {
      question: "Kako deluje plačilo po povzetju?",
      answer: "Zelo preprosto je. Naročite zdaj z izpolnitvijo obrazca, na spletu nič ne plačate. Plačate z gotovino neposredno kurirju ob dostavi paketa (običajno v 24/48 urah)."
    },
    {
      question: "Ali potrebuje WiFi za delovanje?",
      answer: "Ne! Robot deluje popolnoma samo s pritiskom na gumb 'Start' ali z uporabo priloženega daljinskega upravljalnika. WiFi aplikacija je neobvezen dodatek za tiste, ki ga želijo programirati zunaj doma."
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-8">
          <HelpCircle className="text-orange-500 w-8 h-8" />
          <h2 className="text-3xl font-bold text-center text-gray-900">Pogosto Zastavljena Vprašanja</h2>
        </div>
        <div className="bg-gray-50 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

const OrderForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const tmfpInput = e.currentTarget.querySelector('input[name="tmfp"]') as HTMLInputElement;
      const tmfp = tmfpInput?.value || '';

      const params = new URLSearchParams({
        uid: '019be4ed-80e5-7970-ab86-1938a865c187',
        key: 'd05dde623c227395880400',
        offer: '2368',
        lp: '2407',
        name: formData.name,
        tel: formData.phone,
        'street-address': formData.address,
      });

      // Add tmfp if available, otherwise add ua and ip
      if (tmfp) {
        params.append('tmfp', tmfp);
      } else {
        params.append('ua', navigator.userAgent);
      }

      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get('utm_source');
      const utmMedium = urlParams.get('utm_medium');
      const utmCampaign = urlParams.get('utm_campaign');
      const utmContent = urlParams.get('utm_content');
      const utmTerm = urlParams.get('utm_term');
      const subid = urlParams.get('subid');
      const subid2 = urlParams.get('subid2');
      const subid3 = urlParams.get('subid3');
      const subid4 = urlParams.get('subid4');
      const pubid = urlParams.get('pubid');

      if (utmSource) params.append('utm_source', utmSource);
      if (utmMedium) params.append('utm_medium', utmMedium);
      if (utmCampaign) params.append('utm_campaign', utmCampaign);
      if (utmContent) params.append('utm_content', utmContent);
      if (utmTerm) params.append('utm_term', utmTerm);
      if (subid) params.append('subid', subid);
      if (subid2) params.append('subid2', subid2);
      if (subid3) params.append('subid3', subid3);
      if (subid4) params.append('subid4', subid4);
      if (pubid) params.append('pubid', pubid);

      const response = await fetch('https://offers.italiadrop.com/forms/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      console.log('[Network API] Response status:', response.status);

      // Google Ads Conversion Tracking
      if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
        (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'conversion', {
          'send_to': 'AW-17791478075/i9VyCNDKpfMbELvS0aNC'
        });
      }

      router.push('/ty/ty-gg-robotvac-sl');
    } catch (error) {
      console.error('[Network API] Error:', error);
      router.push('/ty/ty-gg-robotvac-sl');
    }
  };

  return (
    <section id="order-form" className="py-16 px-4 bg-gradient-to-b from-gray-50 to-orange-100">
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-orange-500 relative">

        <div className="bg-red-600 text-white text-center py-2 text-sm font-bold animate-pulse">
           🔥 Veliko zanimanje: Le še 3 kosi s Postajo OMNI v paketu!
        </div>

        <div className="bg-white p-6 md:p-8">
          <div className="text-center mb-6">
            <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tight mb-2">Naročilni Obrazec</h3>
            <p className="text-gray-500">Izpolnite spodaj za pridobitev celotnega paketa.</p>
          </div>

          <div className="bg-orange-50 rounded-xl border-2 border-orange-500 p-5 mb-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">OMEJENA PONUDBA</div>

             <div className="flex items-center gap-4 mb-4">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                   <Package size={32} className="text-orange-500" />
                </div>
                <div>
                   <h4 className="font-black text-xl text-gray-900">NovaClean X1 PAKET</h4>
                   <div className="text-sm text-gray-600">Robot + Postaja + Dodatki</div>
                </div>
             </div>

             <div className="space-y-2 border-t border-orange-200 pt-3 text-sm">
                <div className="flex justify-between items-center text-gray-600">
                   <span>NovaClean Robot X1</span>
                   <span>€179,00</span>
                </div>
                <div className="flex justify-between items-center font-bold text-orange-500">
                   <span className="flex items-center gap-1"><Sparkles size={14} /> Postaja Omni-Clean</span>
                   <span className="bg-orange-500 text-white px-1 rounded text-xs">BREZPLAČNO</span>
                </div>
                <div className="flex justify-between items-center font-bold text-green-600">
                   <span className="flex items-center gap-1"><Truck size={14} /> Ekspresna Dostava</span>
                   <span className="bg-green-600 text-white px-1 rounded text-xs">BREZPLAČNO</span>
                </div>
                <div className="flex justify-between items-center text-red-600 font-bold">
                   <span>Akcijski Popust</span>
                   <span>- €99,01</span>
                </div>
             </div>

             <div className="flex justify-between items-end border-t-2 border-orange-200 mt-3 pt-2">
                <div className="text-xs text-gray-500 font-medium">Za plačilo<br/>ob dostavi:</div>
                <div className="text-3xl font-black text-green-700">€79,99</div>
             </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" name="tmfp" />

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Ime in Priimek</label>
              <input
                type="text"
                name="name"
                required
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition font-medium text-gray-900"
                placeholder="Npr: Janez Novak"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Telefon (za kurirja)</label>
              <input
                type="tel"
                name="phone"
                required
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition font-medium text-gray-900"
                placeholder="Npr: +386 40 123 456"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Celoten Naslov</label>
              <input
                type="text"
                name="address"
                required
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition font-medium text-gray-900"
                placeholder="ul. Primer 10, 1000 Ljubljana"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="mt-6 border-2 border-green-500 bg-green-50 rounded-xl p-4 flex items-center justify-between cursor-pointer relative">
               <div className="absolute -top-3 left-4 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">NAČIN PLAČILA</div>
               <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-4 border-green-500 bg-white"></div>
                  <span className="font-bold text-gray-800">Plačilo po Povzetju</span>
               </div>
               <CreditCard className="text-green-600 opacity-50" />
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white font-black text-xl py-5 rounded-xl shadow-xl shadow-orange-500/40 transform hover:scale-[1.01] transition-all duration-200 uppercase flex justify-center items-center gap-2 group"
            >
              NAROČI ZA €79,99
              <span className="bg-white/20 rounded-full p-1 group-hover:translate-x-1 transition-transform">
                 <Truck size={20} />
              </span>
            </button>

            <div className="flex justify-center items-center gap-2 text-xs text-gray-400 mt-4">
               <Lock size={12} /> Vaši podatki so varni in šifrirani SSL 256-bit
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

/* --- MAIN PAGE COMPONENT --- */

export default function NovaCleanLandingSL() {
  const [viewers, setViewers] = useState(12);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => {
        const change = Math.floor(Math.random() * 3) - 1;
        const newVal = prev + change;
        return newVal < 8 ? 8 : newVal > 25 ? 25 : newVal;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { id: 'features', label: 'Funkcije' },
    { id: 'station', label: 'Postaja' },
    { id: 'reviews', label: 'Ocene' },
    { id: 'specs', label: 'Specifikacije' },
    { id: 'faq', label: 'FAQ' },
  ];

  return (
    <>
      {/* Google Tag (gtag.js) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-17791478075"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17791478075');
        `}
      </Script>

      <Script
        src="https://offers.supertrendaffiliateprogram.com/forms/tmfp/"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <img
        src="https://offers.supertrendaffiliateprogram.com/forms/api/ck/?o=596&uid=0198088f-a4bc-7ed8-89aa-83089fe0180e&lp=596"
        style={{ width: '1px', height: '1px', display: 'none' }}
        alt=""
      />

      <div className="min-h-screen pb-24 md:pb-0 font-sans text-gray-900 bg-gray-50">

        <div className="fixed top-24 right-4 z-40 bg-white/90 backdrop-blur shadow-lg rounded-full px-4 py-2 border border-gray-200 hidden md:flex items-center gap-2 animate-fade-in-up pointer-events-none">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        <span className="text-xs font-bold text-gray-700"><span className="text-gray-900">{viewers}</span> ljudi si ogleduje to stran</span>
      </div>

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100 py-3 px-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg shadow-lg flex items-center justify-center text-white font-black italic text-lg">N</div>
            <span className="font-bold text-xl tracking-tight text-gray-900">NovaClean <span className="text-orange-500">X1</span></span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
             {navLinks.map(link => (
               <button
                 key={link.id}
                 onClick={() => scrollToSection(link.id)}
                 className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors"
               >
                 {link.label}
               </button>
             ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex bg-green-100 text-green-800 text-xs font-bold px-3 py-1.5 rounded-full items-center gap-1 shadow-inner border border-green-200">
              <CheckCircle size={14} /> BREZPLAČNA DOSTAVA
            </div>
            <button onClick={() => scrollToSection('order-form')} className="hidden md:block bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-full text-sm font-bold shadow-md transition-transform active:scale-95">
              NAROČI ZDAJ
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl md:hidden flex flex-col animate-fade-in-down origin-top">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="py-4 px-6 text-left font-medium text-gray-700 hover:bg-gray-50 hover:text-orange-500 border-b border-gray-50 last:border-none transition-colors flex justify-between items-center"
              >
                {link.label}
                <ArrowDown size={16} className="-rotate-90 opacity-30" />
              </button>
            ))}
            <div className="p-4 bg-gray-50">
               <button
                 onClick={() => scrollToSection('order-form')}
                 className="w-full bg-orange-600 text-white font-bold py-3 rounded-xl shadow-lg active:scale-95 transition-transform"
               >
                 POJDI NA PONUDBO
               </button>
            </div>
          </div>
        )}
      </header>

      <main>
        <div className="relative bg-[#111] text-white pt-10 pb-20 px-4 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-block bg-red-600 text-white text-xs md:text-sm font-bold px-3 py-1 rounded-full mb-4 animate-pulse shadow-[0_0_15px_rgba(211,47,47,0.5)]">
              ⚠️ BLISKOVITA PONUDBA: POSTAJA OMNI BREZPLAČNO
            </div>

            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4 tracking-tight">
              NIKOLI SE GA NE DOTIKAJTE.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-400">ČISTI SE SAM.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Robot, ki Sesa, Pomiva in <span className="text-white font-bold underline decoration-orange-500">Se Sam Prazni</span>. Tehnologija za €800, danes za ceno večerje.
            </p>

            <div className="mb-8 relative group perspective-1000">
              <HeroCarousel />

              <div className="absolute top-4 right-4 md:-right-4 bg-white text-gray-900 p-4 rounded-xl shadow-2xl transform rotate-3 border-4 border-orange-500 z-30">
                <div className="text-xs text-gray-500 font-bold uppercase">Vrednost Paketa €358</div>
                <div className="text-sm text-gray-500">Redna cena <span className="line-through text-gray-400 decoration-red-500 decoration-2">€179,00</span></div>
                <div className="text-4xl font-black text-green-700 tracking-tighter">€79<span className="text-xl align-top">,99</span></div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center mb-10 gap-4">
              <CountdownTimer />
            </div>

            <button
              onClick={() => scrollToSection('order-form')}
              className="w-full md:w-auto bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-black text-2xl px-8 py-6 rounded-full shadow-[0_0_40px_rgba(255,87,34,0.6)] transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 mx-auto ring-4 ring-orange-500/30"
            >
              NAROČITE PREDEN ZMANJKA
              <ArrowDown size={32} className="animate-bounce" />
            </button>

            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-400">
               <span className="flex items-center gap-1"><CheckCircle size={16} className="text-orange-500" /> Plačilo po Povzetju</span>
               <span className="flex items-center gap-1"><CheckCircle size={16} className="text-orange-500" /> 2 Leti Garancije</span>
               <span className="flex items-center gap-1"><CheckCircle size={16} className="text-orange-500" /> Zadovoljstvo ali Vrnitev</span>
            </div>
          </div>
        </div>

        <section className="py-16 px-4 bg-white">
           <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                 <div className="bg-red-50 p-8 rounded-3xl border border-red-100">
                    <h3 className="flex items-center gap-2 text-red-600 font-bold text-xl mb-4">
                       <X size={24} className="bg-red-200 rounded-full p-1" />
                       Stari Način
                    </h3>
                    <ul className="space-y-3 text-gray-600">
                       <li className="flex gap-2">❌ Praznjenje posode vsakič.</li>
                       <li className="flex gap-2">❌ Ročno pranje umazanega mopa.</li>
                       <li className="flex gap-2">❌ Prah se vrne po eni uri.</li>
                       <li className="flex gap-2">❌ Oglušujoč hrup sesalnika.</li>
                    </ul>
                 </div>
                 <div className="bg-green-50 p-8 rounded-3xl border border-green-100 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">NOVA CLEAN</div>
                    <h3 className="flex items-center gap-2 text-green-700 font-bold text-xl mb-4">
                       <CheckCircle size={24} className="bg-green-200 rounded-full p-1" />
                       Vaše Novo Življenje
                    </h3>
                    <ul className="space-y-3 text-gray-700 font-medium">
                       <li className="flex gap-2">✅ Samodejno praznjenje za 60 dni.</li>
                       <li className="flex gap-2">✅ Samodejno opran mop.</li>
                       <li className="flex gap-2">✅ Dom vedno pripravljen za goste.</li>
                       <li className="flex gap-2">✅ Več prostega časa za vas in družino.</li>
                    </ul>
                 </div>
              </div>
           </div>
        </section>

        <div id="features">
          <Features />
        </div>

        <div id="station">
          <StationUpgrade />
        </div>

        <section className="py-16 px-4 bg-white border-t border-gray-100">
           <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Kaj dobite za samo €79,99?</h2>
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 flex flex-col md:flex-row items-center gap-8">
                 <div className="w-full md:w-1/2 relative">
                    <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded animate-pulse z-10">VSE V PAKETU</div>
                    <img src="/images/robot-asp/1.png" className="rounded-xl shadow-lg w-full" alt="Vsebina paketa" />
                 </div>
                 <div className="w-full md:w-1/2">
                    <h3 className="text-xl font-bold mb-4">Komplet "Ultimate Clean"</h3>
                    <ul className="space-y-3">
                       <li className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg shadow-sm border border-orange-200">
                          <CheckCircle size={18} className="text-orange-500" />
                          <span className="font-bold">1x NovaStation™ Omni (Vrednost €179)</span>
                       </li>
                       <li className="flex items-center gap-2 p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                          <CheckCircle size={18} className="text-green-500" /> 1x NovaClean X1 Robot
                       </li>
                       <li className="flex items-center gap-2 p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                          <CheckCircle size={18} className="text-green-500" /> 1x Daljinski Upravljalnik (Baterije vključene)
                       </li>
                       <li className="flex items-center gap-2 p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                          <CheckCircle size={18} className="text-green-500" /> 2x Dodatne Stranske Krtače
                       </li>
                       <li className="flex items-center gap-2 p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                          <CheckCircle size={18} className="text-green-500" /> 2x Vrečke za Prah 3L
                       </li>
                    </ul>
                    <div className="mt-4 text-xs text-gray-500 bg-yellow-50 p-2 rounded border border-yellow-200 inline-block">
                       🎁 BONUS: Ekspresna Dostava z Zavarovanjem (Brezplačno)
                    </div>
                 </div>
              </div>
           </div>
        </section>

        <section className="py-16 px-4 bg-gray-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Kako imamo tako ceno?</h2>

            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
               <div className="flex flex-col md:grid md:grid-cols-5 gap-4 items-center justify-center">

                  <div className="col-span-2 w-full">
                     <div className="text-gray-400 text-sm mb-2 font-mono">ZNANE ZNAMKE</div>
                     <div className="flex justify-between items-center text-xs text-gray-500 mb-1 px-4">
                        <span>Tovarna</span>
                        <span>Marketing</span>
                        <span>Trgovine</span>
                     </div>
                     <div className="h-4 bg-gray-700 rounded-full overflow-hidden flex w-full">
                        <div className="w-1/4 bg-gray-500"></div>
                        <div className="w-2/4 bg-red-500"></div>
                        <div className="w-1/4 bg-red-700"></div>
                     </div>
                     <div className="mt-2 text-red-400 font-bold text-xl">€500 - €900</div>
                  </div>

                  <div className="col-span-1 flex justify-center items-center my-4 md:my-0">
                     <div className="w-10 h-10 rounded-full bg-white text-gray-900 font-black flex items-center justify-center shadow-lg text-sm">VS</div>
                  </div>

                  <div className="col-span-2 w-full transform md:scale-110 transition-transform">
                     <div className="text-orange-500 text-sm mb-2 font-bold tracking-widest">NOVACLEAN</div>
                     <div className="flex justify-between items-center text-xs text-gray-300 mb-1 px-4">
                        <span>Tovarna</span>
                        <span>Vi</span>
                     </div>
                     <div className="h-6 bg-gray-800 rounded-full overflow-hidden flex w-full border border-orange-500 shadow-[0_0_15px_rgba(255,87,34,0.3)]">
                        <div className="w-full bg-orange-500 flex items-center justify-center text-[10px] font-bold text-white">DIRECT TO CONSUMER</div>
                     </div>
                     <div className="mt-2 text-green-600 font-black text-3xl">€79,99</div>
                  </div>
               </div>
            </div>

            <p className="mt-8 text-gray-400 text-sm max-w-2xl mx-auto">
               Odpravili smo stroške blagovnih znamk, televizijskih oglasov in posrednikov. Plačate samo za tehnologijo, ne za logotip.
            </p>
          </div>
        </section>

        <div id="reviews">
          <Reviews />
        </div>

        <div id="specs">
          <TechSpecs />
        </div>

        <Guarantee />

        <div id="faq">
          <FAQ />
        </div>

        <OrderForm />
      </main>


      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 md:hidden z-50 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.1)] pb-safe transition-transform duration-300">
        <div className="flex items-center gap-3">
           <div className="flex-1">
              <div className="text-[10px] text-red-500 font-bold animate-pulse uppercase tracking-wider">⚡ Le še 7 kosov</div>
              <div className="text-2xl font-black text-green-700 leading-none">€79<span className="text-sm">,99</span></div>
           </div>
           <button
             onClick={() => scrollToSection('order-form')}
             className="flex-[1.5] bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold text-lg py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
           >
             NAROČI
             <ArrowDown size={20} className="animate-bounce" />
           </button>
        </div>
      </div>
      </div>
    </>
  );
}
