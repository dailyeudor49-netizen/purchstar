"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Phone, Truck, ShieldCheck, Star } from "lucide-react";

export default function ThankYouPage() {
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    const randomOrder = `CP-HR-${Date.now().toString().slice(-6)}${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
    setOrderNumber(randomOrder);
  }, []);

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* Top Bar */}
      <div className="sticky top-0 z-40 border-b border-neutral-100 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 py-3 md:py-4 flex items-center gap-2 md:gap-4">
          <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-neutral-900 text-white flex items-center justify-center font-black text-sm md:text-xl shadow-lg">
            CP
          </div>
          <div>
            <div className="font-black leading-tight text-xs md:text-lg tracking-tight">CoandaPro iQ™</div>
            <div className="text-[8px] md:text-[10px] font-black text-neutral-400 uppercase tracking-widest">Salon-Ready PRO Series</div>
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 py-16">
        {/* Success Icon */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
            <CheckCircle2 size={56} className="text-green-600" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase mb-4">
            Hvala na <span className="text-green-600">narudžbi!</span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-500 font-bold">
            Vaša narudžba <span className="text-neutral-900">CoandaPro iQ™ ULTRA 5X</span> je uspješno zaprimljena.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="rounded-[2rem] border border-neutral-100 bg-neutral-50 p-8 shadow-sm mb-10">
          <h2 className="text-xl font-black uppercase mb-6 text-neutral-900">Detalji narudžbe</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-neutral-200 pb-3">
              <span className="text-neutral-500 font-bold">Broj narudžbe:</span>
              <span className="font-black font-mono">{orderNumber}</span>
            </div>
            <div className="flex justify-between items-center border-b border-neutral-200 pb-3">
              <span className="text-neutral-500 font-bold">Proizvod:</span>
              <span className="font-black">CoandaPro iQ™ ULTRA 5X</span>
            </div>
            <div className="flex justify-between items-center border-b border-neutral-200 pb-3">
              <span className="text-neutral-500 font-bold">Cijena:</span>
              <span className="font-black text-green-600 text-2xl">59,99 €</span>
            </div>
            <div className="flex justify-between items-center border-b border-neutral-200 pb-3">
              <span className="text-neutral-500 font-bold">Način plaćanja:</span>
              <span className="font-black">Pouzećem</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-500 font-bold">Status:</span>
              <span className="font-black text-green-600 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Obrađuje se
              </span>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 shadow-sm mb-10">
          <h3 className="text-xl font-black uppercase mb-6 flex items-center gap-2">
            <Phone size={24} className="text-green-600" /> Što slijedi?
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <span className="bg-neutral-900 text-white text-sm font-black w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
              <span className="text-lg font-medium">Naš konzultant će vas nazvati <span className="font-black">unutar 15 minuta</span> za potvrdu narudžbe.</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="bg-neutral-900 text-white text-sm font-black w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
              <span className="text-lg font-medium">Primit ćete SMS s <span className="font-black">linkom za praćenje pošiljke</span>.</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="bg-neutral-900 text-white text-sm font-black w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
              <span className="text-lg font-medium">Platite kuriru <span className="font-black">59,99 € pri preuzimanju</span>.</span>
            </li>
          </ul>
        </div>

        {/* What you'll receive */}
        <div className="rounded-[2rem] border border-neutral-100 bg-neutral-50 p-8 shadow-sm mb-10">
          <h3 className="text-xl font-black uppercase mb-6">Što ćete primiti</h3>
          <ul className="space-y-3">
            {[
              "CoandaPro iQ™ ULTRA 5X (5-u-1)",
              "Premium tvrda torbica",
              "Termo podloga + 2 kopče",
              "Set nastavaka 5-u-1",
              "Digitalni bonus + Jamstvo 1 godina",
            ].map((x, i) => (
              <li key={i} className="flex gap-3 items-center">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="font-bold text-neutral-800">{x}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="flex flex-col items-center text-center gap-2 p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
            <Truck size={32} className="text-neutral-900" />
            <p className="font-black text-xs md:text-sm uppercase">Dostava 24/48h</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2 p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
            <ShieldCheck size={32} className="text-neutral-900" />
            <p className="font-black text-xs md:text-sm uppercase">Jamstvo 1 godina</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2 p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
            <Phone size={32} className="text-neutral-900" />
            <p className="font-black text-xs md:text-sm uppercase">Podrška 24/7</p>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center">
          <Link
            href="/fb-coanda-hr"
            className="inline-block px-10 py-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full font-black text-sm uppercase transition-all"
          >
            Povratak na glavnu stranicu
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-50 border-t border-neutral-100 py-16 mt-20">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center font-black text-xl mx-auto mb-6">
            CP
          </div>
          <div className="text-sm font-black text-neutral-400 uppercase tracking-[0.3em] mb-4">
            CoandaPro iQ™ • Salon-Ready PRO Series
          </div>
          <p className="text-neutral-500 text-xs max-w-2xl mx-auto leading-relaxed">
            © 2025 CoandaPro iQ™. Sva prava pridržana.
          </p>
        </div>
      </footer>
    </div>
  );
}
