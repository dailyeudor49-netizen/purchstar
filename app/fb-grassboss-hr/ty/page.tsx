"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Phone, Truck, ShieldCheck } from "lucide-react";

export default function ThankYouPage() {
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    const randomOrder = `GB-HR-${Date.now().toString().slice(-6)}${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
    setOrderNumber(randomOrder);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Top Bar */}
      <div className="bg-black text-white py-3 text-center font-black uppercase text-sm md:text-base">
        GRASSBOSS\u2122 PRO Series \u2014 Super Bundle ULTRA
      </div>

      <main className="max-w-3xl mx-auto px-4 py-16">
        {/* Success Icon */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
            <CheckCircle2 size={56} className="text-green-600" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase mb-4">
            Hvala na <span className="text-green-600">narud\u017Ebi!</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-bold">
            Va\u0161a narud\u017Eba <span className="text-black">GRASSBOSS\u2122 PRO Super Bundle ULTRA</span> je uspje\u0161no zaprimljena.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-gray-50 rounded-3xl p-8 border-2 border-gray-100 shadow-lg mb-10">
          <h2 className="text-xl font-black uppercase mb-6 text-black">Detalji narud\u017Ebe</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-gray-500 font-bold">Broj narud\u017Ebe:</span>
              <span className="font-black font-mono">{orderNumber}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-gray-500 font-bold">Proizvod:</span>
              <span className="font-black">GRASSBOSS\u2122 PRO Super Bundle ULTRA</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-gray-500 font-bold">Cijena:</span>
              <span className="font-black text-green-600 text-2xl">79,99 \u20AC</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-gray-500 font-bold">Na\u010Din pla\u0107anja:</span>
              <span className="font-black">Pouz\u0107em</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-bold">Status:</span>
              <span className="font-black text-green-600 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Obra\u0111uje se
              </span>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-green-50 border-2 border-green-200 rounded-3xl p-8 mb-10">
          <h3 className="text-xl font-black uppercase mb-6 text-green-700 flex items-center gap-2">
            <Phone size={24} /> \u0160to slijedi?
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <span className="bg-black text-white text-sm font-black w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
              <span className="text-lg font-medium">Na\u0161 konzultant \u0107e vas nazvati <span className="font-black">unutar 15 minuta</span> za potvrdu narud\u017Ebe.</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="bg-black text-white text-sm font-black w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
              <span className="text-lg font-medium">Primit \u0107ete SMS s <span className="font-black">linkom za pra\u0107enje po\u0161iljke</span>.</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="bg-black text-white text-sm font-black w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
              <span className="text-lg font-medium">Platite kuriru <span className="font-black">79,99 \u20AC pri preuzimanju</span>.</span>
            </li>
          </ul>
        </div>

        {/* What you'll receive */}
        <div className="bg-gray-50 rounded-3xl p-8 border-2 border-gray-100 mb-10">
          <h3 className="text-xl font-black uppercase mb-6">\u0160to \u0107ete primiti</h3>
          <ul className="space-y-3">
            {[
              "GRASSBOSS\u2122 Trimer 3-u-1 s PRO kota\u010Dima",
              "2 baterije 21V + brzi punja\u010D",
              "Blade System PRO: diskovi + metal + najlon + \u010Detka",
              "Tvrda torba za prijenos",
              "Nao\u010Dale + Rukavice (sigurnosni set)",
              "Digitalni bonus + Jamstvo 1 godina",
            ].map((x, i) => (
              <li key={i} className="flex gap-3 items-center">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="font-bold text-gray-800">{x}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="flex flex-col items-center text-center gap-2 p-4 bg-gray-50 rounded-2xl">
            <Truck size={32} className="text-black" />
            <p className="font-black text-xs md:text-sm uppercase">Dostava 24/48h</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2 p-4 bg-gray-50 rounded-2xl">
            <ShieldCheck size={32} className="text-black" />
            <p className="font-black text-xs md:text-sm uppercase">Jamstvo 1 godina</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2 p-4 bg-gray-50 rounded-2xl">
            <Phone size={32} className="text-black" />
            <p className="font-black text-xs md:text-sm uppercase">Podr\u0161ka 24/7</p>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center">
          <Link
            href="/fb-grassboss-hr"
            className="inline-block px-10 py-4 bg-black hover:bg-gray-800 text-white rounded-full font-black text-sm uppercase transition-all"
          >
            Povratak na glavnu stranicu
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-10 text-center text-sm font-bold text-gray-400 px-4">
        <p>GRASSBOSS\u2122 PRO Series \u2014 Super Bundle ULTRA &copy; 2025</p>
        <p className="mt-2 opacity-50 uppercase tracking-widest text-[10px]">Podr\u0161ka: support@grassboss.hr</p>
      </footer>
    </div>
  );
}
