"use client";

import React, { useEffect, useMemo, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ShieldCheck,
  Truck,
  Clock3,
  BadgeCheck,
  Flame,
  Wind,
  Sparkles,
  Package,
  RotateCw,
  Scissors,
  Zap,
  PhoneCall,
  CheckCircle2,
  XCircle,
  Minus,
  ChevronRight,
  Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- CONFIG ---
const BRAND = {
  premium: "AeroLuxe 5X™",
  protech: "CoandaPro iQ™",
  mass: "Četka za kosu 5-u-1 WOW™",
  series: "Salon-Ready PRO Series",
  slogan: "Frizura kao iz salona. Bez oštećenja. Za 10 minuta.",
};

const OFFER = {
  listPrice: 149.0,
  salePrice: 59.99,
  discountLabel: "-60% DANAS",
  scarcityText: "ZADNJI KOMADI na AKCIJI (pouzeće) — dok traje brza dostava",
  badges: ["Plaćanje pouzećem", "Dostava 24/48h", "Jamstvo 1 godina"],
};

const API_CONFIG = {
  url: 'https://offers.supertrendaffiliateprogram.com/forms/api/',
  uid: '0198088f-a4bc-7ed8-89aa-83089fe0180e',
  key: 'ec15cab563da6cf51f0c7c',
  offer: '667',
  lp: '667'
};

function formatPrice(v: number, locale = "hr-HR", currency = "EUR") {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(v);
}

function useCountdown(minutes: number) {
  const [ms, setMs] = useState(minutes * 60 * 1000);
  useEffect(() => {
    const id = setInterval(() => setMs((m) => Math.max(0, m - 1000)), 1000);
    return () => clearInterval(id);
  }, []);
  const mm = Math.floor(ms / 60000);
  const ss = Math.floor((ms % 60000) / 1000);
  return { mm, ss, done: ms === 0 };
}

function SectionTitle({ kicker, title, subtitle }: { kicker?: string; title: string; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-8"
    >
      {kicker && <div className="text-[10px] md:text-xs font-black tracking-[0.2em] text-red-600 uppercase mb-2">{kicker}</div>}
      <h2 className="text-2xl md:text-4xl font-black leading-tight tracking-tight break-words">{title}</h2>
      {subtitle && <p className="mt-3 text-base md:text-lg text-neutral-600 max-w-2xl">{subtitle}</p>}
    </motion.div>
  );
}

function BadgeRow() {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {OFFER.badges.map((b, i) => (
        <span key={i} className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-neutral-700 shadow-sm">
          {i === 0 ? <ShieldCheck className="w-4 h-4 text-green-600" /> : i === 1 ? <Truck className="w-4 h-4 text-blue-600" /> : <BadgeCheck className="w-4 h-4 text-purple-600" />}
          {b}
        </span>
      ))}
    </div>
  );
}

function StarRow({ rating = 4.7, count = 1834 }: { rating?: number; count?: number }) {
  const full = Math.floor(rating);
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm mt-4 bg-neutral-50 self-start px-3 py-1.5 rounded-full border border-neutral-100">
      <div className="flex items-center text-yellow-500">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`w-3 h-3 sm:w-4 sm:h-4 ${i < full ? "fill-current" : "text-neutral-300"}`} />
        ))}
      </div>
      <div className="font-black text-neutral-900">{rating.toFixed(1)}/5</div>
      <div className="text-neutral-500 font-medium">({count}) • &quot;Bestseler&quot;</div>
    </div>
  );
}

function HeroBullets() {
  const bullets = [
    { icon: RotateCw, t: "Automatski kovrče DX/SX", d: "Zrak obavija pramen: bez ručnog rada, simetrični valovi." },
    { icon: Flame, t: "Bez vruće glačale", d: "Kontrola topline \u201Csafe styling\u201D: manje oštećenja, više sjaja." },
    { icon: Wind, t: "Od mokre do frizure", d: "Suši i oblikuje u istom potezu." },
    { icon: Sparkles, t: "Anti-frizz Ionic+", d: "Sjajnija i urednija kosa: zbogom efekt \u201Cslame\u201D." },
    { icon: Zap, t: "3 iQ programa za svakoga", d: "Ravno • Valovi • Volumen: odaberite i pratite korake." },
    { icon: Clock3, t: "Vođeni Cold Shot", d: "Hladan zrak: pomaže fiksirati i produžiti trajanje frizure." },
    { icon: Package, t: "Lock-Click PRO nastavci", d: "Dvostruki klik: ne otpadaju dok četkate." },
    { icon: Scissors, t: "EasyClean filter", d: "Izvadi se i očisti u par sekundi: konstantna snaga." },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
      {bullets.map((b, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.05 }}
          className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-xl bg-green-50">
              <b.icon className="w-5 h-5 text-green-700" />
            </div>
            <div>
              <div className="font-black text-neutral-900">{b.t}</div>
              <div className="text-sm text-neutral-600 mt-1 leading-relaxed">{b.d}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function PriceBox() {
  return (
    <div className="rounded-2xl border-2 border-green-600 bg-green-50/30 p-4 sm:p-6 shadow-sm mt-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-green-600 text-white px-3 py-1 text-[10px] font-black tracking-widest rounded-bl-xl">
        {OFFER.discountLabel}
      </div>
      <div className="flex items-end justify-between gap-2 sm:gap-4">
        <div>
          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1">Redovna cijena</div>
          <div className="text-base sm:text-xl line-through font-bold text-neutral-400">{formatPrice(OFFER.listPrice)}</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-bold text-green-700 uppercase tracking-wider mb-1">Akcija</div>
          <div className="text-2xl sm:text-4xl font-black text-neutral-900">{formatPrice(OFFER.salePrice)}</div>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-800 bg-white/80 p-2 rounded-lg border border-green-100">
        <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse flex-shrink-0" />
        <span className="truncate">{OFFER.scarcityText}</span>
      </div>
    </div>
  );
}

function SquareMedia({ src, className = "" }: { src: string; className?: string }) {
  return (
    <div className={`aspect-square w-full overflow-hidden rounded-2xl border border-neutral-100 bg-neutral-100 relative group ${className}`}>
      <img
        alt="Product showcase"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        src={src}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}

function DemoGrid() {
  const cards = [
    { label: "AUTO-WRAP", title: "Kovrče koje se same rade", tech: "Cilindri DX/SX + Coanda protok", desc: "Približite pramen: sam se obavija. Vi klizite duž kose i fiksirate hladnim zrakom.", img: "/images/coanda/ricci.png" },
    { label: "SAFE-HEAT", title: "Bez vruće glačale", tech: "Kontrola topline + \u201Csafe styling\u201D", desc: "Oblikovanje zrakom: manje stresa za isušenu i lomljivu kosu.", img: "/images/coanda/asciuga.png" },
    { label: "WET-TO-STYLE", title: "Od mokre do frizure", tech: "Motor velike brzine + koncentrator", desc: "Sušite pa prijeđite na pravi nastavak bez mijenjanja alata.", img: "/images/coanda/curva.png" },
    { label: "IONIC+", title: "Anti-frizz sjaj", tech: "Ionizator + smoothing kanal", desc: "Smanjuje statički elektricitet: urednija i sjajnija kosa.", img: "/images/coanda/prima%20dopo.png" },
    { label: "IQ-3 NAČINA", title: "3 programa za svakoga", tech: "Ravno • Valovi • Volumen", desc: "Ne morate biti vješti: odaberete izgled i pratite korake.", img: "/images/coanda/8.png" },
    { label: "LOCK-CLICK", title: "Nastavci koji ne otpadaju", tech: "Dvostruki klik + gumb za otpuštanje", desc: "Ništa ne klima: više sigurnosti i kontrole.", img: "/images/coanda/9.png" },
    { label: "COLD SHOT", title: "Duže trajanje", tech: "Namjenski hladan zrak", desc: "Pomaže fiksirati oblikovanje i održati rezultat duže.", img: "/images/coanda/motore.png" },
    { label: "EASYCLEAN", title: "Konstantna snaga", tech: "Izvlačivi filter + četkica", desc: "Čisti se za 30 sekundi: manje gubitka protoka tijekom vremena.", img: "/images/coanda/box%20regali.png" },
  ];

  return (
    <section className="mt-20">
      <SectionTitle
        kicker="DEMO — POGLEDAJTE ŠTO RADI"
        title="8 razloga zašto ga odabrati danas"
        subtitle="Svaki detalj osmišljen je da vam pruži salonski rezultat izravno kod kuće."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="rounded-3xl border border-neutral-100 bg-white p-4 shadow-sm hover:shadow-xl transition-all"
          >
            <SquareMedia src={c.img} />
            <div className="mt-5 text-[10px] font-black tracking-[0.2em] text-red-600 uppercase">{c.label}</div>
            <div className="text-lg md:text-xl font-black mt-1 text-neutral-900 break-words">{c.title}</div>
            <div className="mt-2 font-bold text-sm text-neutral-800">
              <span className="underline decoration-2 underline-offset-4 decoration-green-600/30">{c.tech}</span>
            </div>
            <div className="mt-3 text-sm text-neutral-600 leading-relaxed">{c.desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function PainAgitation() {
  return (
    <section className="mt-24 bg-neutral-900 rounded-[3rem] p-8 md:p-16 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[100px] rounded-full" />
      <div className="relative z-10">
        <SectionTitle
          kicker="PRAVI PROBLEM"
          title="Umorni ste od frizz kose, ravne ili &quot;bez oblika&quot;?"
          subtitle="Većina tradicionalnih alata oštećuje kosu ili zahtijeva sate ručnog rada."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {[
            "Sušiti pa opet sve ponovo raditi s glačalom/uvijačem?",
            "Raditi kovrče koje traju 20 minuta i onda se sruše?",
            "Paliti kosu vrućim alatima i završiti s rascijepljenim vrhovima?",
            "Kupiti nastavke koji izgledaju lijepo… a onda otpadaju dok ih koristite?",
          ].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6 backdrop-blur-sm"
            >
              <div className="flex gap-3 md:gap-4">
                <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-600/20 flex items-center justify-center">
                  <XCircle className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-lg md:text-xl font-bold leading-tight break-words">{t}</div>
                  <p className="mt-3 text-neutral-400 text-xs md:text-sm leading-relaxed">
                    Nije vaša krivnja: većina alata traži tehniku, vrijeme… i &quot;ekstremnu toplinu&quot;. Ovdje je ideja drugačija: zrak + kontrola + pravi nastavci.
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionHowItWorks() {
  return (
    <section className="mt-24">
      <SectionTitle
        kicker="RJEŠENJE"
        title="CoandaPro iQ™ ULTRA 5X: vaš čarobni štapić"
        subtitle="Bez napora, bez tisuću alata, bez straha od glačala."
      />
      <div className="rounded-[2.5rem] border border-neutral-100 bg-white p-8 md:p-12 shadow-sm">
        <div className="text-2xl font-black mb-10 text-center">Kako funkcionira u 3 jednostavna koraka</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-100 -translate-y-1/2 z-0" />
          {[
            { n: "01", t: "Osušite", d: "Stavite koncentrator i uklonite vlagu u par minuta.", icon: Wind, color: "text-blue-600", bg: "bg-blue-50" },
            { n: "02", t: "Odaberite izgled", d: "Pritisnite iQ program: Ravno • Valovi • Volumen.", icon: Zap, color: "text-yellow-600", bg: "bg-yellow-50" },
            { n: "03", t: "Završite i fiksirajte", d: "Koristite pravi nastavak i završite s vođenim cold shotom.", icon: Clock3, color: "text-green-600", bg: "bg-green-50" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className={`w-20 h-20 rounded-full ${s.bg} flex items-center justify-center mb-6 shadow-sm border-4 border-white`}>
                <s.icon className={`w-10 h-10 ${s.color}`} />
              </div>
              <div className="text-xs font-black tracking-widest text-neutral-400 mb-2">{s.n}</div>
              <div className="text-xl md:text-2xl font-black text-neutral-900 mb-2 break-words">{s.t}</div>
              <div className="text-neutral-600 text-sm leading-relaxed px-4">{s.d}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CompareTable() {
  const rows = [
    { k: "Cijena", us: "59,99€ akcija", them: "500€+" },
    { k: "Oštećenja", us: "Safe-Heat Guard", them: "Agresivno" },
    { k: "Kovrče", us: "Auto-wrap", them: "Ručno" },
    { k: "Nastavci", us: "Lock-Click PRO", them: "Nestabilni" },
    { k: "Jednostavnost", us: "3 iQ prog.", them: "Zbunjujuće" },
    { k: "Plaćanje", us: "Pouzećem", them: "Samo kartica" },
  ];

  return (
    <section className="mt-24">
      <SectionTitle
        kicker="MI vs ONI"
        title="Zašto se isplati"
        subtitle="Ako ste vidjeli multi-stylere za 500€+, odmah ćete razumjeti vrijednost."
      />
      <div className="overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border border-neutral-100 bg-white shadow-xl">
        <div className="grid grid-cols-3 bg-neutral-50 p-4 md:p-6 font-black text-[10px] md:text-sm tracking-wider uppercase border-b">
          <div className="text-neutral-400">Info</div>
          <div className="text-green-700">{BRAND.protech}</div>
          <div className="text-red-600">Ostali</div>
        </div>
        {rows.map((r, i) => (
          <div key={i} className="grid grid-cols-3 gap-2 md:gap-4 p-4 md:p-6 border-b last:border-b-0 items-center">
            <div className="font-bold text-neutral-900 text-[10px] md:text-sm break-words">{r.k}</div>
            <div className="flex items-center gap-1.5 md:gap-3">
              <div className="flex-shrink-0 w-4 h-4 md:w-6 md:h-6 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-green-700" />
              </div>
              <div className="text-[10px] md:text-sm font-bold text-neutral-800 leading-tight">{r.us}</div>
            </div>
            <div className="flex items-center gap-1.5 md:gap-3">
              <div className="flex-shrink-0 w-4 h-4 md:w-6 md:h-6 rounded-full bg-red-100 flex items-center justify-center">
                <Minus className="w-3 h-3 md:w-4 md:h-4 text-red-600" />
              </div>
              <div className="text-[10px] md:text-sm text-neutral-500 leading-tight">{r.them}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BundleSection() {
  const scrollToOrder = () => document.getElementById("ordina")?.scrollIntoView({ behavior: "smooth" });
  const items = [
    { t: "Premium tvrda torbica", v: 25 },
    { t: "Termo podloga", v: 15 },
    { t: "2 kopče za razdvajanje", v: 10 },
    { t: "Set nastavaka 5-u-1", v: 60 },
    { t: "Digitalni bonus", v: 19 },
  ];
  const total = items.reduce((s, x) => s + x.v, 0);

  return (
    <section className="mt-24">
      <SectionTitle
        kicker="NEODOLJIV PAKET"
        title="U kutiji pronalazite SVE"
        subtitle="Kompletni set za svaku potrebu oblikovanja, bez skrivenih troškova."
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-[2rem] md:rounded-[2.5rem] border border-neutral-100 bg-white p-4 md:p-6 shadow-sm flex flex-col"
        >
          <SquareMedia src="/images/coanda/box%20omaggi.png" className="flex-grow" />
          <div className="mt-6">
            <div className="font-black text-xl md:text-2xl text-neutral-900">Kompletni ULTRA set</div>
            <p className="text-neutral-600 mt-2 text-sm md:text-base">Sve potrebno za stvaranje profesionalnih lookova odmah.</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-[2rem] md:rounded-[2.5rem] border border-neutral-100 bg-white p-6 md:p-8 shadow-sm"
        >
          <div className="text-lg md:text-xl font-black mb-6">Stvarna vrijednost paketa</div>
          <div className="space-y-3">
            {items.map((x, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl md:rounded-2xl border border-neutral-50 bg-neutral-50/50 p-3 md:p-4">
                <div className="font-bold text-neutral-700 text-xs md:text-sm">{x.t}</div>
                <div className="font-black text-neutral-900 text-xs md:text-sm">{formatPrice(x.v)}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl md:rounded-3xl bg-neutral-900 text-white p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 blur-3xl rounded-full" />
            <div className="relative z-10">
              <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2">Ukupna vrijednost</div>
              <div className="text-3xl md:text-4xl font-black">{formatPrice(total)}</div>
              <div className="mt-4 inline-flex items-center gap-2 bg-green-600 text-white px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                <Sparkles className="w-3 h-3" /> Uključeno u akciju
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SpecTable() {
  const rows = [
    ["Motor", "PowerJet 110K™ (visoka brzina)"],
    ["Načini rada", "3 iQ programa: Ravno / Valovi / Volumen"],
    ["Kontrola topline", "Smart-Heat Guard™ + safe styling ograničenje"],
    ["Postavke", "3 razine zraka • 3 razine topline • cold shot"],
    ["Tehnologija kovrča", "Dual-Direction Auto-Wrap™ DX/SX"],
    ["Anti-frizz", "Ionic+™ smoothing"],
    ["Nastavci", "5-u-1 + torbica + pokloni"],
    ["Pričvršćivanje", "Lock-Click PRO™ (dvostruki klik)"],
    ["Filter", "EasyClean™ izvlačivi"],
    ["Kabel", "Okretni 360° profesionalni"],
  ];

  return (
    <section className="mt-24">
      <SectionTitle
        kicker="TEHNIČKE SPECIFIKACIJE"
        title="Snaga susreće preciznost"
        subtitle="Nije samo dizajn: napredni inženjering u službi vaše kose."
      />
      <div className="overflow-hidden rounded-[2rem] border border-neutral-100 bg-white shadow-sm">
        {rows.map((r, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-2 p-6 border-b last:border-b-0 hover:bg-neutral-50 transition-colors">
            <div className="font-black text-neutral-900 uppercase text-xs tracking-widest">{r[0]}</div>
            <div className="md:col-span-2 text-neutral-700 font-bold">{r[1]}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Reviews() {
  const reviews = [
    { n: "Katarina M.", c: "Zagreb", t: "Promijenio mi je jutro. Od mokre kose do uredne frizure u par minuta. I plaćam pouzećem: top.", s: 5 },
    { n: "Ivana P.", c: "Split", t: "Kovrče su najlakše! Cilindar ih sam obavija. S hladnim zrakom traju puno duže.", s: 5 },
    { n: "Petra N.", c: "Rijeka", t: "Bojala sam se da će biti komplicirano. Ali programi su jednostavni i nastavci se dobro pričvrste.", s: 5 },
    { n: "Maja T.", c: "Osijek", t: "Frizz kosa zbogom. Sjajniji i uredniji efekt, bez glačala.", s: 5 },
  ];

  return (
    <section className="mt-24">
      <SectionTitle
        kicker="RECENZIJE"
        title="Tko je probao ne vraća se nazad"
        subtitle="Tisuće žena već su revolucionirale svoju jutarnju rutinu."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-[2rem] border border-neutral-100 bg-white p-8 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-black text-lg text-neutral-900">{r.n}</div>
                <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{r.c}</div>
              </div>
              <div className="flex text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>
            <p className="text-neutral-700 font-medium leading-relaxed italic">&quot;{r.t}&quot;</p>
            <div className="mt-6 flex items-center gap-2 text-[10px] font-black text-green-700 uppercase tracking-widest bg-green-50 self-start px-3 py-1 rounded-full">
              <CheckCircle2 className="w-3 h-3" /> Verificirana kupnja
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "Moram li biti vješta?", a: "Ne: odaberite iQ program (Ravno/Valovi/Volumen) i pratite 3 koraka. Auto-wrap uvelike pomaže." },
    { q: "Oštećuje li kosu?", a: "Cilj je smanjiti stres: oblikovanje zrakom + kontrola topline + cold shot. Nije vruća glačala." },
    { q: "Za kakvu kosu je prikladna?", a: "Osmišljena za kontrolu: jači protok za sušenje, četke za ravnanje/volumen, cilindri za valove/kovrče." },
    { q: "Otpadaju li nastavci?", a: "Ne: Lock-Click PRO (dvostruki klik) + gumb za otpuštanje. Ostaju čvrsto dok radite." },
    { q: "Koliko traju kovrče?", a: "Koristite manje pramene i završite s vođenim cold shotom: pomaže fiksirati." },
    { q: "Kako se čisti?", a: "EasyClean filter: izvadi se i očisti za par sekundi. Konstantnija snaga tijekom vremena." },
    { q: "Mogu li platiti pouzećem?", a: "Da: Plaćanje pouzećem (COD). Online nije potrebna kartica." },
    { q: "Koliko dugo traje dostava?", a: "Obično 24/48h radnim danom (ovisno o zoni). Primate potvrdu putem SMS/telefona." },
  ];

  return (
    <section className="mt-24">
      <SectionTitle
        kicker="ČESTA PITANJA"
        title="Sve što trebate znati"
        subtitle="Brzi odgovori za uklanjanje svih nedoumica."
      />
      <div className="space-y-4 max-w-3xl mx-auto">
        {faqs.map((f, i) => (
          <motion.details
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="group rounded-3xl border border-neutral-100 bg-white p-6 shadow-sm cursor-pointer"
          >
            <summary className="flex items-center justify-between font-black text-lg list-none">
              {f.q}
              <ChevronRight className="w-5 h-5 text-neutral-400 group-open:rotate-90 transition-transform" />
            </summary>
            <div className="mt-4 text-neutral-600 leading-relaxed font-medium">{f.a}</div>
          </motion.details>
        ))}
      </div>
    </section>
  );
}

function OrderForm({ searchParams }: { searchParams: URLSearchParams }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mm, ss } = useCountdown(15);

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
      const ua = navigator.userAgent;
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
      body.append('name', name);
      body.append('tel', phone);
      body.append('street-address', address);
      if (tmfp) body.append('tmfp', tmfp);
      if (!tmfp && ip) body.append('ip', ip);
      if (!tmfp && ua) body.append('ua', ua);

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

      router.push('/fb-coanda-hr/ty');
    } catch {
      router.push('/fb-coanda-hr/ty');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="ordina" className="mt-24 pb-32">
      <SectionTitle
        kicker="NARUČITE ODMAH"
        title="Rezervirajte ponudu i platite pouzećem"
        subtitle="Ispunite podatke ispod. Kontaktirat ćemo vas za potvrdu dostave."
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[2rem] md:rounded-[3rem] border-4 border-green-600 bg-white p-6 md:p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-green-600 text-white px-4 md:px-6 py-2 text-[10px] md:text-sm font-black tracking-widest rounded-bl-2xl md:rounded-bl-3xl">
            OGRANIČENA PONUDA
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-red-50 flex items-center justify-center">
              <Clock3 className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
            </div>
            <div>
              <div className="text-[10px] font-black text-red-600 uppercase tracking-widest">Istječe za:</div>
              <div className="text-2xl md:text-4xl font-black tabular-nums text-neutral-900">{String(mm).padStart(2, "0")}:{String(ss).padStart(2, "0")}</div>
            </div>
          </div>

          <div className="mb-8 p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
            <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1">Akcijska cijena</div>
            <div className="flex items-baseline gap-3">
              <div className="text-2xl md:text-4xl font-black text-neutral-900">{formatPrice(OFFER.salePrice)}</div>
              <div className="text-sm md:text-lg line-through font-bold text-neutral-300">{formatPrice(OFFER.listPrice)}</div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Ime i prezime</label>
              <input
                className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 p-3 md:p-4 text-base md:text-lg font-bold focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-green-600 transition-all outline-none"
                placeholder="Npr. Ana Horvat"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Telefon</label>
              <input
                className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 p-3 md:p-4 text-base md:text-lg font-bold focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-green-600 transition-all outline-none"
                placeholder="Npr. +385 91 234 5678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                type="tel"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Potpuna adresa</label>
              <textarea
                className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 p-3 md:p-4 text-base md:text-lg font-bold focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-green-600 transition-all outline-none min-h-[100px] md:min-h-[120px]"
                placeholder="Ulica, kućni broj, grad, poštanski broj..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-[1.5rem] md:rounded-[2rem] bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white text-lg md:text-2xl font-black py-4 md:py-6 shadow-xl shadow-green-600/20 transition-all active:scale-95 group relative overflow-hidden"
            >
              <div className="relative z-10 flex items-center justify-center gap-3">
                {isSubmitting ? 'OBRADA...' : 'NARUČITE ODMAH'} <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>

            <div className="flex items-center justify-center gap-4 pt-4">
              <div className="flex items-center gap-1.5 text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5 text-green-600" /> 100% Sigurno
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                <Truck className="w-3.5 h-3.5 text-blue-600" /> Brzo
              </div>
            </div>
          </form>
        </motion.div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] md:rounded-[2.5rem] border border-neutral-100 bg-white p-6 md:p-8 shadow-sm"
          >
            <div className="text-lg md:text-xl font-black mb-6">Što ćete primiti kući</div>
            <ul className="space-y-4">
              {[
                "CoandaPro iQ™ ULTRA 5X (5-u-1)",
                "Premium tvrda torbica",
                "Termo podloga + 2 kopče",
                "Digitalni bonus \u201C7 lookova u 10 min\u201D",
                "Jamstvo 1 godina + podrška",
              ].map((x, i) => (
                <li key={i} className="flex gap-3 md:gap-4 items-start">
                  <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-700" />
                  </div>
                  <span className="font-bold text-neutral-800 text-base md:text-lg">{x}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-[2rem] md:rounded-[2.5rem] border border-neutral-100 bg-neutral-900 text-white p-6 md:p-8 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <PhoneCall className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
              <div className="text-lg md:text-xl font-black">Posvećena podrška</div>
            </div>
            <p className="text-neutral-400 font-medium leading-relaxed text-sm md:text-base">
              Nakon narudžbe primit ćete SMS ili poziv za potvrdu. Naš tim vam je na raspolaganju za svaku nedoumicu.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StickyBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-100 bg-white/95 backdrop-blur-xl"
        >
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
            <div className="flex flex-col">
              <div className="text-[8px] md:text-[10px] font-black text-neutral-400 uppercase tracking-widest">Ponuda</div>
              <div className="text-sm md:text-xl font-black text-neutral-900 leading-none">
                {formatPrice(OFFER.salePrice)}
              </div>
            </div>
            <a
              href="#ordina"
              className="flex-grow sm:flex-grow-0 rounded-xl md:rounded-2xl bg-green-600 hover:bg-green-700 text-white font-black px-4 md:px-8 py-3 md:py-4 shadow-lg shadow-green-600/20 text-center text-xs md:text-base transition-all active:scale-95"
            >
              NARUČITE ODMAH (COD)
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TopBar() {
  return (
    <div className="sticky top-0 z-40 border-b border-neutral-100 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 py-3 md:py-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-neutral-900 text-white flex items-center justify-center font-black text-sm md:text-xl shadow-lg shadow-neutral-900/10">
            CP
          </div>
          <div className="hidden xs:block">
            <div className="font-black leading-tight text-xs md:text-lg tracking-tight">{BRAND.protech}</div>
            <div className="text-[8px] md:text-[10px] font-black text-neutral-400 uppercase tracking-widest">{BRAND.series}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-2 mr-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Dostupnost: Visoka</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LandingPageContent() {
  const searchParams = useSearchParams();
  const scrollToOrder = () => document.getElementById("ordina")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-green-100 selection:text-green-900">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap');
        html { scroll-behavior: smooth; }
        body { font-family: 'Inter', sans-serif; }
      `}</style>

      <TopBar />

      <main className="mx-auto max-w-6xl px-4">
        {/* HERO */}
        <section className="pt-12 md:pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                <Flame className="w-3 h-3" /> Ograničena ponuda • COD
              </div>
              <h1 className="text-3xl md:text-6xl font-black leading-[1.1] tracking-tight text-neutral-900 break-words">
                Frizura kao iz salona... <span className="relative inline-block">
                  bez glačale
                  <div className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-1 md:h-2 bg-green-600/20 -rotate-1" />
                </span> i bez oštećivanja kose.
              </h1>
              <p className="mt-6 text-xl text-neutral-600 font-medium leading-relaxed max-w-xl">
                5 alata u 1: suši, ravna, kovrča, daje volumen, uklanja frizz. <span className="text-neutral-900 font-bold">{BRAND.slogan}</span>
              </p>

              <StarRow />
              <BadgeRow />
              <PriceBox />

              <div className="mt-10 flex flex-col sm:flex-row items-center gap-6">
                <a
                  href="#ordina"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-[2rem] bg-green-600 hover:bg-green-700 text-white text-xl font-black px-10 py-6 shadow-2xl shadow-green-600/20 transition-all active:scale-95 group"
                >
                  NARUČITE ODMAH <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
                <div className="text-sm text-neutral-500 font-medium flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-green-600" /> Plaćanje pouzećem
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <SquareMedia src="/images/coanda/main.png" className="rounded-[2rem]" />
                <SquareMedia src="/images/coanda/ricci.png" className="rounded-[2rem] translate-y-8" />
                <SquareMedia src="/images/coanda/asciuga.png" className="rounded-[2rem] -translate-y-4" />
                <SquareMedia src="/images/coanda/curva.png" className="rounded-[2rem] translate-y-4" />
              </div>
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-green-600/5 blur-[120px] rounded-full" />
            </motion.div>
          </div>

          <HeroBullets />
        </section>

        <DemoGrid />
        <PainAgitation />
        <SolutionHowItWorks />
        <CompareTable />
        <BundleSection />
        <SpecTable />
        <Reviews />
        <FAQ />
        <OrderForm searchParams={searchParams} />
      </main>

      <StickyBar />

      <footer className="bg-neutral-50 border-t border-neutral-100 py-16 mt-20">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center font-black text-xl mx-auto mb-6">
            CP
          </div>
          <div className="text-sm font-black text-neutral-400 uppercase tracking-[0.3em] mb-4">
            {BRAND.protech} • {BRAND.series}
          </div>
          <p className="text-neutral-500 text-xs max-w-2xl mx-auto leading-relaxed">
            © 2025 CoandaPro iQ™. Sva prava pridržana. Ova stranica nije dio web stranice Facebooka ili Facebook Inc. Također, ova stranica NIJE odobrena od strane Facebooka na bilo koji način. FACEBOOK je registrirani zaštitni znak tvrtke FACEBOOK, Inc.
          </p>
        </div>
      </footer>
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
