'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Check, X, Star, ChevronDown, ChevronUp, Clock, ShieldCheck, Truck, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_CONFIG = {
  url: 'https://offers.supertrendaffiliateprogram.com/forms/api/',
  uid: '0198088f-a4bc-7ed8-89aa-83089fe0180e',
  key: 'ec15cab563da6cf51f0c7c',
  offer: '204',
  lp: '204',
};

function LandingPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(600);
  const [formData, setFormData] = useState({ name: '', tel: '', address: '' });
  const [status, setStatus] = useState<'idle' | 'submitting'>('idle');
  const [fingerprint, setFingerprint] = useState('');
  const [ipAddress, setIpAddress] = useState('');

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    const getFingerprint = async () => {
      try {
        const components = [
          navigator.userAgent,
          navigator.language,
          screen.width + 'x' + screen.height,
          screen.colorDepth,
          new Date().getTimezoneOffset(),
          navigator.hardwareConcurrency,
          navigator.platform
        ];
        const raw = components.join('|');
        const encoder = new TextEncoder();
        const data = encoder.encode(raw);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        setFingerprint(hashArray.map(b => b.toString(16).padStart(2, '0')).join(''));
      } catch {
        // fingerprint failed, will use IP fallback
      }
    };
    const getIp = async () => {
      try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        setIpAddress(data.ip);
      } catch {
        // IP fetch failed
      }
    };
    getFingerprint();
    getIp();
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const scrollToForm = () => {
    const element = document.getElementById('order-form');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const body = new URLSearchParams();
      body.append('uid', API_CONFIG.uid);
      body.append('key', API_CONFIG.key);
      body.append('offer', API_CONFIG.offer);
      body.append('lp', API_CONFIG.lp);
      body.append('name', formData.name);
      body.append('tel', formData.tel);
      body.append('street-address', formData.address);

      if (fingerprint) {
        body.append('tmfp', fingerprint);
      } else {
        if (ipAddress) body.append('ip', ipAddress);
        body.append('ua', navigator.userAgent);
      }

      const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'subid', 'subid2', 'subid3', 'subid4', 'pubid'];
      utmParams.forEach(param => {
        const val = searchParams.get(param);
        if (val) body.append(param, val);
      });

      await fetch(API_CONFIG.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        mode: 'no-cors',
      });

      router.push('/chefone-cz/ty');
    } catch {
      router.push('/chefone-cz/ty');
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans pb-24 selection:bg-emerald-100">
      {/* 1) TOP TRUST STRIP */}
      <div className="bg-neutral-100 py-2 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-center items-center gap-4 text-xs font-bold uppercase tracking-wider">
          <div className="flex items-center gap-2 text-emerald-600">
            <CreditCard size={16} />
            <span>{"Platba na dob\u00edrku"}</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-600">
            <ShieldCheck size={16} />
            <span>{"Z\u00e1ruka 1 rok"}</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-600">
            <Truck size={16} />
            <span>{"Rychl\u00e9 doru\u010den\u00ed 24/48h"}</span>
          </div>
        </div>
      </div>

      {/* 2) HERO SECTION */}
      <section className="py-8 px-4 max-w-4xl mx-auto text-center">
        <div className="mb-2">
          <span className="bg-black text-white px-3 py-1 text-sm font-bold uppercase tracking-widest">
            Serie: X9 PRO Series
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black leading-tight mb-2 uppercase italic">
          AURIXA ChefOne ULTRA
        </h1>
        <p className="text-xl md:text-2xl font-bold text-emerald-600 mb-6">
          {"\u201EVa\u0159en\u00ed jako \u0161\u00e9fkucha\u0159. Sta\u010d\u00ed stisknout Start.\u201C"}
        </p>

        <div className="mb-8">
          <h2 className="text-2xl md:text-4xl font-black mb-4 leading-tight">
            {"Vlo\u017ete ingredience. Stiskn\u011bte START. Ve\u010de\u0159e hotov\u00e1."}
          </h2>
          <p className="text-lg md:text-xl font-medium text-neutral-600">
            {"Velk\u00fd displej + navigovan\u00e9 recepty + integrovan\u00e1 v\u00e1ha: i kdy\u017e nejste zku\u0161en\u00fd kucha\u0159."}
          </p>
        </div>

        {/* Hero Image Grid */}
        <div className="grid grid-cols-2 gap-2 mb-8">
          <img src="/images/chef-one/aurixachefone.webp" alt="AURIXA ChefOne" className="w-full aspect-square object-cover rounded-lg shadow-md" />
          <img src="/images/chef-one/int_master-en_bimby_tm7-launch_Story%20Photos_DFP_0327_16x9_edit_3x2.webp" alt={"AURIXA v kuchyni"} className="w-full aspect-square object-cover rounded-lg shadow-md" />
          <img src="/images/chef-one/themomix-tm7_delivery-scope_collection_01_3x2.webp" alt="AURIXA kolekce" className="w-full aspect-square object-cover rounded-lg shadow-md" />
          <img src="/images/chef-one/themomix-tm7_delivery-scope_collection_02_3x2.webp" alt={"AURIXA p\u0159\u00edslu\u0161enstv\u00ed"} className="w-full aspect-square object-cover rounded-lg shadow-md" />
        </div>

        {/* Box OFFERTA */}
        <div className="bg-neutral-50 border-4 border-red-600 p-6 rounded-2xl mb-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-red-600 text-white px-4 py-1 font-black text-sm uppercase transform rotate-0">
            {"\u00daVODN\u00cd NAB\u00cdDKA \u2014 Pouze omezen\u00fd po\u010det kus\u016f"}
          </div>
          <div className="mt-4 flex flex-col items-center">
            <div className="text-neutral-400 line-through text-2xl font-bold">{"6 999 K\u010d"}</div>
            <div className="text-6xl md:text-7xl font-black text-black my-2">{"2 199 K\u010d"}</div>
            <div className="bg-red-600 text-white px-6 py-2 rounded-full font-black text-2xl animate-pulse">
              SLEVA: -69%
            </div>
          </div>
          <button
            onClick={scrollToForm}
            className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600 text-white font-black py-5 rounded-xl text-xl md:text-2xl shadow-lg transition-transform active:scale-95 uppercase"
          >
            {"OBJEDNEJTE \u2014 PLATBA NA DOB\u00cdRKU"}
          </button>
        </div>

        {/* Hero Bullets */}
        <div className="text-left space-y-4 max-w-2xl mx-auto">
          {[
            "Skute\u010dn\u00fdch 200\u00b0C: ope\u010dte maso a zeleninu, \u017e\u00e1dn\u00e9 \u201Esmutn\u00e9 va\u0159en\u00e9\u201C.",
            "Velk\u00fd displej s navigovan\u00fdmi recepty: \u0159ekne v\u00e1m co, kdy a kolik.",
            "Integrovan\u00e1 v\u00e1ha 5 kg / 1 g: p\u0159esn\u00e9 d\u00e1vkov\u00e1n\u00ed, \u017e\u00e1dn\u00e9 pl\u00fdtv\u00e1n\u00ed.",
            "XL m\u00edsa 4,5 l (3 litry efektivn\u00ed): rodinn\u00e9 porce najednou.",
            "Zp\u011btn\u00e1 rotace proti rozpadu: dokonal\u00e9 gul\u00e1\u0161e, rag\u00fa a pol\u00e9vky.",
            "CrispLid v\u00edko v cen\u011b: zap\u00e9k\u00e1, su\u0161\u00ed a dod\u00e1v\u00e1 k\u0159upavost bez trouby.",
            "Bezdr\u00e1tov\u00e1 teplotn\u00ed sonda: v\u00fdsledky jako od \u0161\u00e9fkucha\u0159e, bez h\u00e1d\u00e1n\u00ed.",
            "Automatick\u00e9 \u010di\u0161t\u011bn\u00ed jedn\u00edm tla\u010d\u00edtkem: pre-clean + deep clean proti mastnot\u011b.",
            "Offline v\u00edcejazy\u010dnost: funguje kdekoli, i bez Wi-Fi.",
            "Platba na dob\u00edrku: nulov\u00e9 riziko."
          ].map((text, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="bg-emerald-100 p-1 rounded-full mt-1">
                <Check className="text-emerald-600" size={18} />
              </div>
              <p className="text-lg font-bold">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3) SEZIONE "ZNÍ VÁM TO POVĚDOMĚ?" */}
      <section className="py-12 px-4 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black mb-8 text-center uppercase italic">
            {"ZN\u00cd V\u00c1M TO POV\u011aDOM\u011a?"}
          </h2>
          <div className="space-y-6 mb-10">
            {[
              "P\u0159ich\u00e1z\u00edte pozd\u011b dom\u016f a objedn\u00e1v\u00e1te \u201En\u00e1hodn\u00e9\u201C j\u00eddlo (a utr\u00e1c\u00edte p\u0159\u00edli\u0161)?",
              "Za\u010dnete va\u0159it a skon\u010d\u00edte s hrnci v\u0161ude a kuchyn\u00ed k \u00faklidu?",
              "Chyb\u00ed v\u00e1m \u201Eten spr\u00e1vn\u00fd chu\u0165\u201C, proto\u017ee roboty \u010dasto neum\u00ed opravdu op\u00e9ct?",
              "Cht\u011bli byste j\u00edst l\u00e9pe, ale nechcete b\u00fdt otrokem kuchyn\u011b?"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                <X className="text-red-500 shrink-0" size={24} />
                <p className="text-xl font-medium">{text}</p>
              </div>
            ))}
          </div>
          <div className="bg-emerald-600 p-6 rounded-2xl text-center">
            <p className="text-2xl md:text-3xl font-black uppercase">
              {"Nen\u00ed to va\u0161e chyba: prodali v\u00e1m \u201Epolovi\u010dn\u00ed\u201C roboty. Tady m\u00e1te ten definitivn\u00ed."}
            </p>
          </div>
        </div>
      </section>

      {/* 4) DEMO GRID */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black mb-12 text-center uppercase">
          TECHNOLOGIE ULTRA
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "re\u017eim op\u00e9k\u00e1n\u00ed", title: "Profesion\u00e1ln\u00ed op\u00e9k\u00e1n\u00ed", tech: "37\u2013200\u00b0C", desc: "Skute\u010dn\u00e9 op\u00e9k\u00e1n\u00ed, ne va\u0159en\u00ed.", img: "/images/chef-one/themomix-tm7_delivery-scope_collection_01_3x2%20(1).webp" },
            { label: "maxi displej", title: "Navigovan\u00e9 va\u0159en\u00ed krok za krokem", tech: "Integrovan\u00fd navig\u00e1tor", desc: "Nemo\u017en\u00e9 ud\u011blat chybu.", img: "/images/chef-one/passo-passo.webp" },
            { label: "p\u0159esnost 1 g", title: "Integrovan\u00e1 v\u00e1ha na gram", tech: "Nosnost 5 kg", desc: "Absolutn\u00ed p\u0159esnost.", img: "/images/chef-one/bilancia.webp" },
            { label: "objem", title: "XL m\u00edsa", tech: "4,5 l (3 litry efektivn\u00ed)", desc: "Pro celou rodinu.", img: "/images/chef-one/ciotolaxl.webp" },
            { label: "zp\u011btn\u00e1 rotace", title: "Proti rozpadu", tech: "\u0158\u00edzen\u00e1 rotace", desc: "Chr\u00e1n\u00ed jemn\u00e9 ingredience.", img: "/images/chef-one/themomix-tm7_delivery-scope_collection_01_3x2%20(2).webp" },
            { label: "zap\u00e9k\u00e1n\u00ed", title: "V\u00edko CrispLid", tech: "K\u0159upav\u00fd finish", desc: "Okam\u017eit\u00fd efekt trouby.", img: "/images/chef-one/coperchioi.webp" },
            { label: "p\u0159esn\u00e9 upozorn\u011bn\u00ed", title: "Bezdr\u00e1tov\u00e1 sonda", tech: "Kontrola teploty", desc: "Milimetrov\u011b p\u0159esn\u00e9 va\u0159en\u00ed.", img: "/images/chef-one/sondawireless.webp" },
            { label: "hygiena", title: "Automatick\u00e9 \u010di\u0161t\u011bn\u00ed", tech: "Pre-clean + Deep clean", desc: "Vy\u010dist\u00ed se samo jedn\u00edm tla\u010d\u00edtkem.", img: "/images/chef-one/pulizia.webp" }
          ].map((item, i) => (
            <div key={i} className="border-2 border-neutral-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img src={item.img} alt={item.title} className="w-full aspect-square object-cover" />
              <div className="p-5">
                <span className="bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest">
                  {item.label}
                </span>
                <h3 className="text-xl font-black mt-2 mb-1">{item.title}</h3>
                <p className="text-emerald-600 font-black text-sm mb-2">{item.tech}</p>
                <p className="text-neutral-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5) JAK TO FUNGUJE */}
      <section className="py-16 px-4 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black mb-12 text-center uppercase">
            {"JAK TO FUNGUJE (3 KROKY)"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { num: "1", title: "Vlo\u017ete ingredience", desc: "V\u00e1\u017e\u00ed, m\u00edch\u00e1 a nav\u00e1d\u00ed v\u00e1s." },
              { num: "2", title: "Stiskn\u011bte START", desc: "Teplota a \u010dasy automaticky." },
              { num: "3", title: "Serv\u00edrujte a usm\u011bjte se", desc: "Automatick\u00e9 \u010di\u0161t\u011bn\u00ed: hotovo." }
            ].map((step, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-lg border-b-8 border-emerald-500 text-center">
                <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center text-3xl font-black mx-auto mb-6">
                  {step.num}
                </div>
                <h3 className="text-2xl font-black mb-4">{step.title}</h3>
                <p className="text-lg text-neutral-600">{step.desc}</p>
              </div>
            ))}
          </div>
          <button
            onClick={scrollToForm}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-6 rounded-2xl text-2xl shadow-xl transition-transform active:scale-95 uppercase"
          >
            {"ANO, CHCI TO \u2014 PLATBA NA DOB\u00cdRKU"}
          </button>
        </div>
      </section>

      {/* 6) MY VS ONI */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black mb-12 text-center uppercase italic">
          MY VS ONI
        </h2>

        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          {[
            { label: "Skute\u010dn\u00e9 op\u00e9k\u00e1n\u00ed", noi: "200\u00b0C + CrispLid", loro: "\u010casto omezen\u00e9 / p\u0159\u00edslu\u0161enstv\u00ed nav\u00edc" },
            { label: "Navigovan\u00e9 va\u0159en\u00ed", noi: "Maxi displej + recepty krok za krokem", loro: "Ok, ale vysok\u00e1 cena" },
            { label: "Integrovan\u00e1 v\u00e1ha", noi: "5 kg / 1 g", loro: "Ano" },
            { label: "Rodina", noi: "XL m\u00edsa (3l efektivn\u00ed)", loro: "\u010casto men\u0161\u00ed" },
            { label: "\u010ci\u0161t\u011bn\u00ed", noi: "Automatick\u00e9 (Deep clean)", loro: "R\u016fzn\u00e9" },
            { label: "Platba", noi: "PLATBA NA DOB\u00cdRKU", loro: "Obvykle p\u0159edem", highlight: true },
            { label: "Cena", noi: "2 199 K\u010d (Dnes)", loro: "35 000+ K\u010d (Typick\u00fd premium)", price: true }
          ].map((row, i) => (
            <div key={i} className="border-2 border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-neutral-900 text-white p-3 text-center font-black uppercase text-sm tracking-widest">
                {row.label}
              </div>
              <div className="grid grid-cols-2 divide-x-2 divide-neutral-100">
                <div className={`p-4 text-center ${row.price || row.highlight ? 'bg-emerald-50' : ''}`}>
                  <span className="block text-[10px] uppercase font-black text-neutral-400 mb-1 tracking-tighter">AURIXA</span>
                  <span className="text-emerald-600 font-black text-sm leading-tight block">{row.noi}</span>
                </div>
                <div className={`p-4 text-center ${row.price ? 'bg-red-50' : ''}`}>
                  <span className="block text-[10px] uppercase font-black text-neutral-400 mb-1 tracking-tighter">{"OSTATN\u00cd"}</span>
                  <span className={`${row.price ? 'text-red-600' : 'text-neutral-500'} font-bold text-sm leading-tight block`}>{row.loro}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden md:block overflow-hidden rounded-2xl border-2 border-neutral-200 shadow-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-900 text-white">
                <th className="p-4 font-black uppercase text-sm">Vlastnost</th>
                <th className="p-4 font-black uppercase text-sm text-center">My</th>
                <th className="p-4 font-black uppercase text-sm text-center">Oni</th>
              </tr>
            </thead>
            <tbody className="text-lg">
              {[
                { label: "Skute\u010dn\u00e9 op\u00e9k\u00e1n\u00ed", noi: "200\u00b0C + CrispLid", loro: "\u010casto omezen\u00e9 / p\u0159\u00edslu\u0161enstv\u00ed nav\u00edc" },
                { label: "Navigovan\u00e9 va\u0159en\u00ed", noi: "Maxi displej + recepty krok za krokem", loro: "Ok, ale vysok\u00e1 cena" },
                { label: "Integrovan\u00e1 v\u00e1ha", noi: "5 kg / 1 g", loro: "Ano" },
                { label: "Rodina", noi: "XL m\u00edsa (3l efektivn\u00ed)", loro: "\u010casto men\u0161\u00ed" },
                { label: "\u010ci\u0161t\u011bn\u00ed", noi: "Automatick\u00e9 (Deep clean)", loro: "R\u016fzn\u00e9" },
                { label: "Platba", noi: "PLATBA NA DOB\u00cdRKU", loro: "Obvykle p\u0159edem", highlight: true },
                { label: "Cena", noi: "2 199 K\u010d (Dnes)", loro: "35 000+ K\u010d (Typick\u00fd premium)", price: true }
              ].map((row, i) => (
                <tr key={i} className="border-b border-neutral-100">
                  <td className="p-4 font-bold bg-neutral-50">{row.label}</td>
                  <td className={`p-4 text-center font-black ${row.price || row.highlight ? 'text-emerald-600 bg-emerald-50' : 'text-emerald-600'}`}>
                    {row.noi}
                  </td>
                  <td className={`p-4 text-center font-medium ${row.price ? 'text-red-600 bg-red-50' : 'text-neutral-400'}`}>
                    {row.loro}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 7) BALÍČEK + DÁRKY ZDARMA */}
      <section className="py-16 px-4 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black mb-12 text-center uppercase">
            {"BAL\u00cd\u010cEK + D\u00c1RKY ZDARMA"}
          </h2>
          <div className="bg-white text-black p-8 rounded-3xl shadow-2xl">
            <div className="space-y-6">
              {[
                { title: "CrispLid 200\u00b0C", val: "1 999 K\u010d" },
                { title: "Druh\u00e1 nerezov\u00e1 m\u00edsa + v\u00edko", val: "1 799 K\u010d" },
                { title: "Sada silikonov\u00fdch forem + profesion\u00e1ln\u00ed st\u011brka", val: "799 K\u010d" },
                { title: "Digit\u00e1ln\u00ed bonus: Meal-Prep na 30 dn\u00ed + Kompletn\u00ed kucha\u0159ka", val: "1 299 K\u010d" }
              ].map((gift, i) => (
                <div key={i} className="flex justify-between items-center border-b border-neutral-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-500 text-white p-1 rounded-full">
                      <Check size={16} />
                    </div>
                    <span className="text-xl font-bold">{gift.title}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-neutral-400 line-through block text-sm">{"Hodnota "}{gift.val}</span>
                    <span className="text-emerald-600 font-black text-xl">ZDARMA</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 pt-6 border-t-4 border-emerald-500 text-center">
              <p className="text-2xl font-bold mb-2">{"Celkov\u00e1 hodnota d\u00e1rk\u016f: 5 896 K\u010d"}</p>
              <p className="text-4xl font-black text-emerald-600 uppercase">{"→ DNES V CEN\u011a"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8) SPECIFIKACE */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black mb-12 text-center uppercase italic">
          {"SPECIFIKACE, KTER\u00c9 PO\u010c\u00cdTAJ\u00cd"}
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {[
            ["Teplota", "37\u2013200\u00b0C (ULTRA)"],
            ["M\u00edsa", "Nerez 4,5 l (3 litry efektivn\u00ed) + druh\u00e1 m\u00edsa v cen\u011b"],
            ["V\u00e1ha", "Integrovan\u00e1 5 kg / 1 g"],
            ["Displej", "Velk\u00fd dotykov\u00fd (maxi rozhran\u00ed)"],
            ["Programy", "Navigovan\u00e9 + manu\u00e1ln\u00ed + pokro\u010dil\u00e9 (slow cook / sous-vide / fermentace)"],
            ["Zp\u011btn\u00fd chod", "Ano (proti rozpadu)"],
            ["\u010ci\u0161t\u011bn\u00ed", "Pre-clean + Deep clean"],
            ["Jazyky", "V\u00edcejazy\u010dn\u00e9 + offline bal\u00ed\u010dek"],
            ["Bezpe\u010dnost", "Z\u00e1mek v\u00edka + d\u011btsk\u00fd z\u00e1mek + anti-splash"],
            ["Extra", "CrispLid v\u00edko + bezdr\u00e1tov\u00e1 sonda"]
          ].map(([label, val], i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:justify-between p-4 border-b border-neutral-100 gap-2">
              <span className="font-black uppercase text-neutral-500 text-sm">{label}</span>
              <span className="font-bold text-lg">{val}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 9) RECENZE */}
      <section className="py-16 px-4 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black mb-12 text-center uppercase">
            {"CO \u0158\u00cdKAJ\u00cd Z\u00c1KAZN\u00cdCI"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Kate\u0159ina M.", text: "\u201EMyslela jsem, \u017ee to bude slo\u017eit\u00e9\u2026 ale je to jako navigace.\u201C" },
              { name: "Petr S.", text: "\u201EKone\u010dn\u011b opravdu ope\u010de.\u201C" },
              { name: "Eva K.", text: "\u201EVelk\u00e1 m\u00edsa = meal prep hotov\u00fd.\u201C" }
            ].map((rev, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-md">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                </div>
                <p className="text-lg font-medium mb-4 italic">{rev.text}</p>
                <p className="font-black uppercase text-sm">{rev.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10) FAQ */}
      <section className="py-16 px-4 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black mb-12 text-center uppercase italic">
          {"\u010cASTO KLADEN\u00c9 OT\u00c1ZKY"}
        </h2>
        <div className="space-y-4">
          {[
            ["Pot\u0159ebuji nutn\u011b Wi-Fi?", "Ne. Recepty jsou zahrnuty a offline bal\u00ed\u010dek tak\u00e9."],
            ["Je t\u011b\u017ek\u00e9 ho pou\u017e\u00edvat?", "Ne: navigovan\u00fd re\u017eim a jasn\u00e9 kroky."],
            ["Opravdu ope\u010de?", "Ano: profesion\u00e1ln\u00ed re\u017eim op\u00e9k\u00e1n\u00ed a\u017e do 200\u00b0C."],
            ["Jak velk\u00e1 je m\u00edsa?", "4,5 l (3 litry efektivn\u00ed) + druh\u00e1 v cen\u011b."],
            ["Snadno se myje?", "Ano: automatick\u00e9 \u010di\u0161t\u011bn\u00ed jedn\u00edm tla\u010d\u00edtkem."],
            ["Jak plat\u00edm?", "Platba na dob\u00edrku."],
            ["Z\u00e1ruka?", "1 rok ofici\u00e1ln\u00ed z\u00e1ruky."]
          ].map(([q, a], i) => (
            <FaqItem key={i} question={q} answer={a} />
          ))}
        </div>
      </section>

      {/* 11) ORDER FORM */}
      <section id="order-form" className="py-16 px-4 bg-emerald-50 border-t-8 border-emerald-500">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-2xl border-2 border-emerald-200">
          <h2 className="text-3xl md:text-4xl font-black mb-2 text-center uppercase">
            {"Objednejte za 30 sekund (3 pole)"}
          </h2>

          <div className="flex items-center justify-center gap-2 text-red-600 font-black text-xl mb-8 animate-pulse">
            <Clock size={24} />
            <span>{"NAB\u00cdDKA KON\u010c\u00cd ZA: "}{formatTime(timeLeft)}</span>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-black uppercase mb-2 text-neutral-500">{"Jm\u00e9no a p\u0159\u00edjmen\u00ed"}</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={"Nap\u0159.: Jan Nov\u00e1k"}
                className="w-full p-4 border-2 border-neutral-200 rounded-xl text-lg focus:border-emerald-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-black uppercase mb-2 text-neutral-500">Telefon</label>
              <input
                required
                type="tel"
                value={formData.tel}
                onChange={(e) => setFormData({ ...formData, tel: e.target.value })}
                placeholder={"Nap\u0159.: +420 123 456 789"}
                className="w-full p-4 border-2 border-neutral-200 rounded-xl text-lg focus:border-emerald-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-black uppercase mb-2 text-neutral-500">{"\u00dapln\u00e1 adresa"}</label>
              <textarea
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder={"Ulice, \u010d\u00edslo, m\u011bsto, PS\u010c"}
                rows={3}
                className="w-full p-4 border-2 border-neutral-200 rounded-xl text-lg focus:border-emerald-500 outline-none transition-colors"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-6 rounded-2xl text-2xl shadow-xl transition-transform active:scale-95 uppercase mt-4 disabled:opacity-50"
            >
              {status === 'submitting' ? 'ODE\u0053\u00cdL\u00c1N\u00cd...' : "POTVRDIT OBJEDN\u00c1VKU \u2014 PLATBA NA DOB\u00cdRKU"}
            </button>

            <div className="flex items-center justify-center gap-2 text-emerald-600 font-bold mt-4">
              <ShieldCheck size={20} />
              <span>{"\u017d\u00e1dn\u00e1 karta. Plat\u00edte pouze na dob\u00edrku."}</span>
            </div>
          </form>
        </div>
      </section>

      {/* 12) STICKY BAR MOBILE */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-3 z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
        <div className="max-w-xl mx-auto">
          <button
            onClick={scrollToForm}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 rounded-xl text-lg shadow-lg flex items-center justify-center gap-3 uppercase"
          >
            <span>{"OBJEDNEJTE \u2014 PLATBA NA DOB\u00cdRKU"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

interface FaqItemProps {
  question: string;
  answer: string;
  key?: React.Key;
}

function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-2 border-neutral-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 flex justify-between items-center text-left bg-white hover:bg-neutral-50 transition-colors"
      >
        <span className="text-xl font-black">{question}</span>
        {isOpen ? <ChevronUp className="text-neutral-400" /> : <ChevronDown className="text-neutral-400" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 bg-neutral-50 border-t border-neutral-100 text-lg font-medium text-neutral-600">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
