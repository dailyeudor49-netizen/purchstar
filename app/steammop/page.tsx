'use client';

import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  XCircle,
  Truck,
  ShieldCheck,
  Wallet,
  Star,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Zap,
  Clock,
  Droplets,
  Wind,
  Thermometer,
  Maximize,
  Scissors,
  Gauge,
  ZapIcon,
  ShoppingBag
} from 'lucide-react';
import { motion } from 'motion/react';

// --- CONSTANTS & CONFIG ---
const BRAND_NAME = "VAPORWASH PRO+";
const PRO_SERIES = "(PRO Series)";
const SLOGAN = "Aspira, lava e igienizza in una sola passata.";
const PRICE_CURRENT = "149,90"; 
const PRICE_OLD = "299,80";    
const DISCOUNT = "-50%";

// --- COMPONENTS ---

const Badge = ({ children, icon: Icon }: { children: React.ReactNode, icon: any }) => (
  <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/20">
    <Icon size={14} className="text-green-400" />
    <span>{children}</span>
  </div>
);

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="text-center mb-12 px-4">
    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 leading-none">
      {children}
    </h2>
    {subtitle && <p className="text-xl text-zinc-600 font-medium">{subtitle}</p>}
  </div>
);

const CTAButton = ({ className = "", children }: { className?: string, children?: React.ReactNode }) => (
  <a 
    href="#order-form" 
    className={`inline-flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 text-white font-black text-xl md:text-2xl py-5 px-8 rounded-xl transition-all transform hover:scale-105 shadow-xl uppercase tracking-tight ${className}`}
  >
    <ShoppingBag size={28} />
    {children || "ORDINA ORA – PAGHI ALLA CONSEGNA"}
  </a>
);

export default function LandingPage() {
  const [timeLeft, setTimeLeft] = useState(900);
  const [heroSlide, setHeroSlide] = useState(0);
  const heroImages = [
    "/images/steammop/hero.webp",
    "/images/steammop/hero2.webp",
    "/images/steammop/hero3.webp"
  ];

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const prevSlide = () => setHeroSlide((c) => (c === 0 ? heroImages.length - 1 : c - 1));
  const nextSlide = () => setHeroSlide((c) => (c === heroImages.length - 1 ? 0 : c + 1));

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-green-100 selection:text-green-900 overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <header className="relative bg-zinc-950 text-white pt-12 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-zinc-900 to-transparent opacity-50 pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded mb-4 animate-pulse">
              ULTIMI PEZZI IN PROMO
            </div>
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-4 max-w-5xl">
              Il primo 3-in-1 che <span className="text-green-400">ASPIRA + LAVA + IGIENIZZA A VAPORE</span> (davvero) in una passata.
            </h1>
            <p className="text-xl md:text-2xl font-medium text-zinc-400 max-w-3xl mb-8">
              Lavapavimenti Wet &amp; Dry per ogni giorno + igienizzazione a vapore quando serve. Zero chimica, zero odori.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <Badge icon={Wallet}>Pagamento alla Consegna</Badge>
              <Badge icon={Truck}>Spedizione 24/48h</Badge>
              <Badge icon={ShieldCheck}>Garanzia 1 anno</Badge>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="aspect-square bg-zinc-800 rounded-2xl overflow-hidden shadow-2xl border border-zinc-700 relative">
                {heroImages.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`VAPORWASH PRO+ - ${i + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === heroSlide ? 'opacity-100' : 'opacity-0'}`}
                  />
                ))}
                {/* Frecce */}
                <button onClick={prevSlide} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-colors z-10">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={nextSlide} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-colors z-10">
                  <ChevronRight size={24} />
                </button>
                {/* Indicatori */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {heroImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setHeroSlide(i)}
                      className={`w-3 h-3 rounded-full transition-all ${i === heroSlide ? 'bg-green-500 scale-125' : 'bg-white/50 hover:bg-white/80'}`}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-4 bg-zinc-900 p-4 rounded-xl border border-white/10">
                <div className="flex items-baseline justify-center gap-3">
                  <span className="text-3xl font-black text-white">€{PRICE_CURRENT}</span>
                  <span className="text-lg text-zinc-500 line-through">€{PRICE_OLD}</span>
                  <span className="bg-red-600 text-white text-sm font-black px-2 py-0.5 rounded">{DISCOUNT}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {[
                "3-in-1 reale: aspira, lava e igienizza a vapore in una sola passata",
                "Basta spalmare lo sporco: circuito ad acqua pulita continua",
                "Scioglie lo sporco appiccicoso: vapore ad alta temperatura contro grasso e macchie",
                "Autopulizia a 60°C: rullo lavato a caldo, sempre igienizzato",
                "Asciugatura ad aria calda: niente odore di panno bagnato",
                "Bordi su 2 lati: battiscopa e angoli finalmente puliti",
                "Sistema anti-peli: il raschietto a pettine taglia i grovigli",
                "Aspirazione potente da 16.000 Pa: raccoglie sporco secco e umido",
                "Trazione assistita: meno fatica, più velocità",
                "Dock 3-in-1: riponi, ricarichi, igienizzi e asciughi"
              ].map((bullet, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={i} 
                  className="flex items-start gap-3 group"
                >
                  <div className="mt-1 bg-green-600 p-1 rounded-full text-white shrink-0 group-hover:scale-110 transition-transform">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-lg md:text-xl font-bold text-zinc-200 leading-tight">{bullet}</span>
                </motion.div>
              ))}
              
              <div className="pt-8">
                <CTAButton className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- DEMO GRID --- */}
      <section className="py-20 bg-zinc-50">
        <div className="container mx-auto px-4">
          <SectionTitle subtitle="Tecnologia avanzata per un pulito senza compromessi">
            Perché scegliere <span className="text-green-600">VAPORWASH PRO+</span>
          </SectionTitle>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { label: "PULITO VERO", title: "Acqua pulita sempre", tech: "Circuito acqua pulita continuo", desc: "Non spalma acqua sporca: lavi sempre con il rullo pulito.", icon: Droplets, img: "/images/steammop/acquapulita.webp" },
              { label: "IGIENE", title: "Zero chimica", tech: "Igienizzazione a vapore con sola acqua", desc: "Quando serve, attivi il vapore e via.", icon: ShieldCheck, img: "/images/steammop/vapormax.jpg" },
              { label: "UNTO KO", title: "Sporco appiccicoso sciolto", tech: "Vapore ad alta temperatura", desc: "Stacca grasso e macchie ostinate.", icon: Thermometer, img: "/images/steammop/sporcoappiccicoso.webp" },
              { label: "BORDI", title: "Battiscopa puliti", tech: "Pulizia bordo a bordo su 2 lati", desc: "Non lascia la riga nera lungo il muro.", icon: Maximize, img: "/images/steammop/battiscopa.webp" },
              { label: "ANTI-PELI", title: "Taglia i grovigli", tech: "Raschietto a pettine", desc: "Peli e capelli non intasano il rullo.", icon: Scissors, img: "/images/steammop/grovigli.webp" },
              { label: "TI GUIDA", title: "Display intelligente", tech: "Feedback visivo in tempo reale", desc: "Sai quando il pavimento è davvero pulito.", icon: Gauge, img: "/images/steammop/schermo.jpeg" },
              { label: "AUTO-CLEAN", title: "Rullo lavato a caldo", tech: "HOT WASH 60°C", desc: "Igiene vera, non un semplice risciacquo.", icon: Zap, img: "/images/steammop/rullolavatoacaldo.webp" },
              { label: "NO ODORI", title: "Rullo asciutto", tech: "Asciugatura ad aria calda 30 min", desc: "Niente odore di panno bagnato.", icon: Wind, img: "/images/steammop/rulloasciutto.webp" },
              { label: "POTENZA", title: "Sporco secco e umido", tech: "Aspirazione ad alta potenza", desc: "Raccoglie briciole e liquidi insieme.", icon: ZapIcon, img: "/images/steammop/sporcosecco+umido.webp" },
              { label: "SENZA SFORZO", title: "Trazione assistita", tech: "Trazione motorizzata", desc: "Tu la guidi, lei va.", icon: Gauge, img: "/images/steammop/trazioneassistita.webp" },
            ].map((card, i) => (
              <motion.div 
                whileHover={{ y: -5 }}
                key={i} 
                className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200 flex flex-col h-full"
              >
                <div className="text-[10px] font-black tracking-widest text-zinc-400 mb-2 uppercase">{card.label}</div>
                <div className="bg-green-100 text-green-700 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                  <card.icon size={24} />
                </div>
                <h3 className="text-xl font-black leading-none mb-2 uppercase">{card.title}</h3>
                <p className="text-sm font-bold text-green-600 mb-2">{card.tech}</p>
                <p className="text-zinc-600 text-sm leading-relaxed">{card.desc}</p>
                <div className="mt-auto pt-4">
                  <div className="aspect-square bg-zinc-100 rounded-lg overflow-hidden border border-zinc-100">
                    <img src={card.img} alt={card.title} className="w-full h-full object-cover" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROBLEMA / AGITAZIONE --- */}
      <section className="py-16 md:py-20 bg-zinc-900 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-8 md:mb-12 tracking-tighter">
            Ancora schiavo del vecchio mocio?
          </h2>
          <div className="space-y-4 md:space-y-8">
            <div className="flex items-center gap-4 md:gap-6 text-left bg-white/5 p-4 md:p-6 rounded-2xl border border-white/10">
              <XCircle className="text-red-500 shrink-0" size={28} />
              <p className="text-lg md:text-2xl font-bold italic">"Stanco di passare prima la scopa… poi il mocio… poi ritrovarti il pavimento appiccicoso?"</p>
            </div>
            <div className="flex items-center gap-4 md:gap-6 text-left bg-white/5 p-4 md:p-6 rounded-2xl border border-white/10">
              <XCircle className="text-red-500 shrink-0" size={28} />
              <p className="text-lg md:text-2xl font-bold italic">"Il panno puzza? Allora stai solo spalmando sporco e batteri."</p>
            </div>
            <div className="flex items-center gap-4 md:gap-6 text-left bg-white/5 p-4 md:p-6 rounded-2xl border border-white/10">
              <XCircle className="text-red-500 shrink-0" size={28} />
              <p className="text-lg md:text-2xl font-bold italic">"E gli angoli? Sempre quella riga nera lungo il battiscopa…"</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SOLUZIONE --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="inline-block bg-green-600 text-white text-sm font-black px-4 py-1 rounded-full mb-6 uppercase tracking-widest">
            La Soluzione Definitiva
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">
            <span className="text-green-600">VAPORWASH PRO+</span> fa il lavoro completo in una passata: aspira, lava e quando serve igienizza a vapore.
          </h2>
          <p className="text-2xl md:text-3xl font-black text-zinc-500 uppercase italic mb-12">"Premi 1 tasto. Finito."</p>
          
          <div className="aspect-video bg-zinc-100 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-4 md:border-8 border-zinc-50 mb-8 md:mb-12">
            <img
              src="/images/steammop/h12-pro-ultra-pc-frame1_9_1600x.webp"
              alt="VAPORWASH PRO+ in action"
              className="w-full h-full object-cover"
            />
          </div>
          
          <CTAButton />
        </div>
      </section>

      {/* --- COME FUNZIONA --- */}
      <section className="py-20 bg-zinc-50">
        <div className="container mx-auto px-4">
          <SectionTitle>Semplice come 1, 2, 3</SectionTitle>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Riempi il serbatoio", desc: "Detersivo opzionale", img: "/images/steammop/h12-pro-ultra-pc-frame1_6_800x.webp" },
              { step: "2", title: "Passa in modalità AUTO o STEAM", desc: "Gestione intelligente della potenza", img: "/images/steammop/vapormax.jpg" },
              { step: "3", title: "Riponi nel dock: autopulizia e asciugatura", desc: "Manutenzione zero", img: "/images/steammop/rullolavatoacaldo.webp" },
            ].map((s, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-200 text-center relative overflow-hidden group">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-green-600 text-white flex items-center justify-center text-5xl font-black rounded-full pt-4 pl-4">
                  {s.step}
                </div>
                <div className="aspect-square bg-zinc-100 rounded-2xl mb-6 overflow-hidden">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-2xl font-black uppercase mb-2 leading-tight">{s.title}</h3>
                <p className="text-zinc-500 font-bold">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- NOI VS LORO --- */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle>Il confronto non regge</SectionTitle>

          {/* Mobile: card impilate */}
          <div className="md:hidden space-y-3">
            {[
              { label: "3-in-1 Reale", v: "Sì", m: "No", l: "Solo 2-in-1" },
              { label: "Vapore igienizzante", v: "Sì", m: "No", l: "No" },
              { label: "Acqua pulita sempre", v: "Sì", m: "No", l: "Sì" },
              { label: "Bordi su 2 lati", v: "Sì", m: "No", l: "No" },
              { label: "Sistema anti-peli", v: "Sì", m: "No", l: "No" },
              { label: "Autopulizia calda", v: "Sì", m: "No", l: "No" },
              { label: "Tempo risparmiato", v: "80%", m: "0%", l: "40%" },
              { label: "Zero odori", v: "Sì", m: "No", l: "No" },
            ].map((row, i) => (
              <div key={i} className="border border-zinc-200 rounded-xl overflow-hidden">
                <div className="bg-zinc-900 text-white p-3 text-center font-black uppercase text-sm tracking-wider">
                  {row.label}
                </div>
                <div className="grid grid-cols-3 divide-x divide-zinc-100">
                  <div className="p-3 text-center bg-green-50">
                    <span className="block text-[10px] uppercase font-black text-zinc-400 mb-1">PRO+</span>
                    <span className="text-green-600 font-black text-sm">{row.v}</span>
                  </div>
                  <div className="p-3 text-center">
                    <span className="block text-[10px] uppercase font-black text-zinc-400 mb-1">Mocio</span>
                    <span className="text-zinc-400 font-bold text-sm">{row.m}</span>
                  </div>
                  <div className="p-3 text-center">
                    <span className="block text-[10px] uppercase font-black text-zinc-400 mb-1">Vecchi</span>
                    <span className="text-zinc-400 font-bold text-sm">{row.l}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: tabella */}
          <div className="hidden md:block overflow-hidden rounded-2xl border border-zinc-200 shadow-lg">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-zinc-950 text-white">
                  <th className="p-5 text-left text-lg font-black uppercase border-r border-white/10">Caratteristica</th>
                  <th className="p-5 text-center text-lg font-black uppercase bg-green-600 border-r border-white/10">VAPORWASH PRO+</th>
                  <th className="p-5 text-center text-lg font-black uppercase border-r border-white/10">Mocio/Scopa</th>
                  <th className="p-5 text-center text-lg font-black uppercase">Vecchi Modelli</th>
                </tr>
              </thead>
              <tbody className="text-lg font-bold">
                {[
                  { label: "3-in-1 Reale", v: true, m: false, l: "Solo 2-in-1" },
                  { label: "Vapore igienizzante", v: true, m: false, l: false },
                  { label: "Acqua pulita sempre", v: true, m: false, l: true },
                  { label: "Bordi su 2 lati", v: true, m: false, l: false },
                  { label: "Sistema anti-peli", v: true, m: false, l: false },
                  { label: "Autopulizia calda", v: true, m: false, l: false },
                  { label: "Tempo risparmiato", v: "80%", m: "0%", l: "40%" },
                  { label: "Zero odori", v: true, m: false, l: false },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-zinc-50" : "bg-white"}>
                    <td className="p-5 border border-zinc-200 uppercase tracking-tight">{row.label}</td>
                    <td className="p-5 border border-zinc-200 text-center bg-green-50">
                      {typeof row.v === 'boolean' ? (row.v ? <CheckCircle2 className="mx-auto text-green-600" /> : <XCircle className="mx-auto text-red-500" />) : row.v}
                    </td>
                    <td className="p-5 border border-zinc-200 text-center text-zinc-400">
                      {typeof row.m === 'boolean' ? (row.m ? <CheckCircle2 className="mx-auto" /> : <XCircle className="mx-auto" />) : row.m}
                    </td>
                    <td className="p-5 border border-zinc-200 text-center text-zinc-400">
                      {typeof row.l === 'boolean' ? (row.l ? <CheckCircle2 className="mx-auto" /> : <XCircle className="mx-auto" />) : row.l}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* --- BUNDLE SECTION --- */}
      <section className="py-16 md:py-20 bg-zinc-950 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-zinc-900 rounded-2xl md:rounded-[3rem] border-2 md:border-4 border-green-600 p-6 md:p-16 relative overflow-hidden">
            <div className="bg-green-600 text-white font-black text-xs md:text-base px-4 py-1 rounded-full uppercase tracking-widest text-center mb-6 md:absolute md:top-6 md:right-6 md:mb-0">
              OFFERTA LIMITATA
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-6 md:mb-8 leading-none">
                  Oggi ricevi il <span className="text-green-500">KIT COMPLETO</span>
                </h2>
                <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  {[
                    { name: "Rullo extra", val: "19" },
                    { name: "Filtro extra", val: "12" },
                    { name: "2 Pad microfibra steam", val: "15" },
                    { name: "Pettine anti-peli + tool pulizia", val: "9" },
                    { name: "Kit fughe e angoli", val: "14" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center justify-between text-base md:text-xl font-bold border-b border-white/10 pb-2">
                      <span>{item.name} <span className="text-zinc-500 text-xs md:text-sm">(Valore €{item.val})</span></span>
                      <span className="text-green-500 uppercase text-sm md:text-base ml-2 shrink-0">GRATIS</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-white/5 p-4 md:p-6 rounded-2xl border border-white/10">
                  <p className="text-lg md:text-2xl font-black uppercase mb-2">Valore accessori: <span className="line-through text-zinc-500">€69</span></p>
                  <p className="text-2xl md:text-4xl font-black text-green-500 uppercase">OGGI INCLUSI GRATIS</p>
                </div>
              </div>
              <div className="relative pb-4 pr-4">
                <div className="aspect-square bg-zinc-800 rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                  <img src="/images/steammop/h12-pro-ultra-pc-framea1_1000x.webp" alt="Bundle Accessories" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-0 right-0 bg-red-600 text-white w-24 h-24 md:w-32 md:h-32 rounded-full flex flex-col items-center justify-center font-black uppercase rotate-12 shadow-xl border-4 border-white">
                  <span className="text-xs md:text-sm">Risparmi</span>
                  <span className="text-2xl md:text-3xl">€149</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- REVIEWS --- */}
      <section className="py-20 bg-zinc-50">
        <div className="container mx-auto px-4">
          <SectionTitle subtitle="Oltre 12.400 clienti soddisfatti in tutta Italia">
            Cosa dicono i nostri clienti
          </SectionTitle>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Marco R.", city: "Roma", text: "Spedizione lampo, arrivata in 24 ore. Pagato alla consegna senza problemi. La potenza di aspirazione è mostruosa, tira su tutto!", stars: 5 },
              { name: "Elena V.", city: "Milano", text: "Finalmente una lavapavimenti che pulisce davvero i bordi. Il vapore è la ciliegina sulla torta per igienizzare dove giocano i bambini.", stars: 5 },
              { name: "Giuseppe T.", city: "Napoli", text: "Ero scettico ma mi sono dovuto ricredere. L'autopulizia a caldo funziona benissimo, il rullo non puzza mai. Ottimo acquisto.", stars: 5 },
              { name: "Anna L.", city: "Torino", text: "Il kit di accessori in regalo è utilissimo. La uso ogni giorno e risparmio un sacco di tempo. Consigliatissima!", stars: 5 },
              { name: "Roberto F.", city: "Bologna", text: "Ottimo rapporto qualità prezzo. Il display è molto intuitivo e la trazione assistita la rende leggera come una piuma.", stars: 5 },
              { name: "Silvia M.", city: "Firenze", text: "Servizio clienti impeccabile. Avevo un dubbio sul vapore e mi hanno risposto subito. Prodotto solido e ben costruito.", stars: 5 },
            ].map((rev, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-200">
                <div className="flex gap-1 mb-4">
                  {[...Array(rev.stars)].map((_, i) => <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-lg font-bold italic mb-6">"{rev.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-zinc-200 rounded-full flex items-center justify-center font-black text-zinc-500">
                    {rev.name[0]}
                  </div>
                  <div>
                    <p className="font-black uppercase leading-none">{rev.name}</p>
                    <p className="text-sm text-zinc-500 font-bold">{rev.city} • Acquisto Verificato</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <SectionTitle>Domande Frequenti</SectionTitle>
          <div className="space-y-4">
            {[
              { q: "Posso usarla sul parquet?", a: "Sì, VAPORWASH PRO+ è sicura su tutti i pavimenti sigillati, inclusi parquet, laminato, piastrelle e marmo. La funzione vapore è delicata ma efficace." },
              { q: "Serve detersivo?", a: "No, la potenza del vapore igienizza naturalmente con sola acqua. Se desideri una profumazione extra, puoi aggiungere un tappo di detersivo non schiumogeno nel serbatoio dell'acqua pulita." },
              { q: "Quanto dura la pulizia?", a: "Il serbatoio XL e la batteria ad alta capacità permettono di pulire fino a 150mq con una sola carica. L'autonomia è ottimizzata dal sensore intelligente dello sporco." },
              { q: "Come si pulisce?", a: "Basta riporla nel dock e premere il tasto autopulizia. Il sistema eseguirà un lavaggio del rullo a 60°C seguito da un'asciugatura ad aria calda di 30 minuti per eliminare ogni odore." },
              { q: "E peli/capelli?", a: "Il raschietto a pettine integrato taglia e districa automaticamente peli e capelli durante l'uso, convogliandoli direttamente nel serbatoio dello sporco senza intasare il rullo." },
            ].map((item, i) => (
              <details key={i} className="group bg-zinc-50 rounded-2xl border border-zinc-200 overflow-hidden">
                <summary className="list-none p-6 flex items-center justify-between cursor-pointer font-black uppercase text-lg select-none">
                  {item.q}
                  <ChevronDown size={24} className="group-open:rotate-180 transition-transform" />
                </summary>
                <div className="p-6 pt-0 text-zinc-600 font-medium text-lg leading-relaxed border-t border-zinc-200/50">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* --- ORDER FORM --- */}
      <section id="order-form" className="py-16 md:py-20 bg-zinc-950 text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white text-zinc-900 rounded-2xl md:rounded-[3rem] p-6 md:p-16 shadow-2xl relative overflow-hidden">
            <div className="text-center mb-8 md:mb-12">
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm font-black mb-4 uppercase tracking-widest">
                <Clock size={16} />
                Offerta scade tra: {formatTime(timeLeft)}
              </div>
              <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4">
                Compila il modulo e <span className="text-green-600">PAGHI ALLA CONSEGNA</span>
              </h2>
              <p className="text-base md:text-xl font-bold text-zinc-500">Un nostro operatore ti contatterà per confermare l'ordine.</p>
            </div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-black uppercase tracking-widest text-zinc-400 mb-2">Nome e Cognome</label>
                <input
                  type="text"
                  placeholder="Es: Mario Rossi"
                  className="w-full bg-zinc-50 border-2 border-zinc-200 rounded-xl p-3 md:p-4 text-lg md:text-xl font-bold focus:border-green-600 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-black uppercase tracking-widest text-zinc-400 mb-2">Numero di Telefono</label>
                <input
                  type="tel"
                  placeholder="Es: 333 1234567"
                  className="w-full bg-zinc-50 border-2 border-zinc-200 rounded-xl p-3 md:p-4 text-lg md:text-xl font-bold focus:border-green-600 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-black uppercase tracking-widest text-zinc-400 mb-2">Indirizzo Completo</label>
                <textarea
                  rows={3}
                  placeholder="Via, Civico, CAP, Città, Provincia"
                  className="w-full bg-zinc-50 border-2 border-zinc-200 rounded-xl p-3 md:p-4 text-lg md:text-xl font-bold focus:border-green-600 focus:outline-none transition-colors"
                ></textarea>
              </div>

              <div className="bg-green-50 p-4 md:p-6 rounded-2xl border-2 border-green-100 flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-black uppercase text-green-700">Prezzo Totale</p>
                  <p className="text-3xl md:text-4xl font-black text-zinc-950">€{PRICE_CURRENT}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs md:text-sm font-black uppercase text-zinc-400 line-through">€{PRICE_OLD}</p>
                  <p className="text-base md:text-lg font-black text-red-600 uppercase">Sconto 50%</p>
                </div>
              </div>

              <button className="w-full bg-green-600 hover:bg-green-500 text-white font-black text-xl md:text-3xl py-5 md:py-6 rounded-2xl transition-all transform hover:scale-[1.02] shadow-2xl uppercase tracking-tight flex items-center justify-center gap-3">
                <ShoppingBag size={24} className="shrink-0" />
                ORDINA ORA – PAGHI ALLA CONSEGNA
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 bg-zinc-950 text-zinc-500 text-center border-t border-white/5 pb-28 md:pb-12">
        <div className="container mx-auto px-4">
          <p className="font-black text-white text-xl md:text-2xl mb-4 uppercase tracking-tighter">{BRAND_NAME} {PRO_SERIES}</p>
          <p className="mb-6 md:mb-8 font-bold text-sm md:text-base">{SLOGAN}</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-xs md:text-sm font-bold uppercase tracking-widest mb-6 md:mb-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Termini e Condizioni</a>
            <a href="#" className="hover:text-white transition-colors">Contatti</a>
          </div>
          <p className="text-xs opacity-50">© 2026 {BRAND_NAME}. Tutti i diritti riservati.</p>
        </div>
      </footer>

      {/* --- STICKY BAR MOBILE --- */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden p-4 bg-white/80 backdrop-blur-lg border-t border-zinc-200">
        <CTAButton className="w-full text-lg py-4 rounded-lg shadow-2xl">
          ORDINA ORA (PAGHI ALLA CONSEGNA)
        </CTAButton>
      </div>

    </div>
  );
}
