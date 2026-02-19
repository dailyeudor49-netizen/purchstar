"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Phone, Truck, ShieldCheck } from 'lucide-react';

export default function ThankYouPage() {
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    const randomOrder = `HS-HR-${Date.now().toString().slice(-6)}${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
    setOrderNumber(randomOrder);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Top Bar */}
      <div className="bg-[#0056b3] text-white py-3 text-center font-black uppercase text-sm md:text-base">
        HydroSonic Elite™ – ProCare Series™
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
          <p className="text-xl md:text-2xl text-gray-600 font-bold">
            Vaša narudžba <span className="text-black">HydroSonic Elite™</span> je uspješno zaprimljena.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-gray-50 rounded-3xl p-8 border-2 border-gray-100 shadow-lg mb-10">
          <h2 className="text-xl font-black uppercase mb-6 text-[#0056b3]">Detalji narudžbe</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-gray-500 font-bold">Broj narudžbe:</span>
              <span className="font-black font-mono">{orderNumber}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-gray-500 font-bold">Proizvod:</span>
              <span className="font-black">HydroSonic Elite™</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-gray-500 font-bold">Cijena:</span>
              <span className="font-black text-green-600 text-2xl">49,99 €</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-gray-500 font-bold">Način plaćanja:</span>
              <span className="font-black">Pouzećem</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-bold">Status:</span>
              <span className="font-black text-green-600 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Obrađuje se
              </span>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-8 mb-10">
          <h3 className="text-xl font-black uppercase mb-6 text-[#0056b3] flex items-center gap-2">
            <Phone size={24} /> Što slijedi?
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <span className="bg-[#0056b3] text-white text-sm font-black w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
              <span className="text-lg font-medium">Naš konzultant će vas nazvati <span className="font-black">unutar 15 minuta</span> za potvrdu narudžbe.</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="bg-[#0056b3] text-white text-sm font-black w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
              <span className="text-lg font-medium">Primit ćete SMS s <span className="font-black">linkom za praćenje pošiljke</span>.</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="bg-[#0056b3] text-white text-sm font-black w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
              <span className="text-lg font-medium">Platite kuriru <span className="font-black">49,99 € pri preuzimanju</span>.</span>
            </li>
          </ul>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="flex flex-col items-center text-center gap-2 p-4 bg-gray-50 rounded-2xl">
            <Truck size={32} className="text-[#0056b3]" />
            <p className="font-black text-xs md:text-sm uppercase">Dostava 24/48h</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2 p-4 bg-gray-50 rounded-2xl">
            <ShieldCheck size={32} className="text-[#0056b3]" />
            <p className="font-black text-xs md:text-sm uppercase">Jamstvo 3 godine</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2 p-4 bg-gray-50 rounded-2xl">
            <Phone size={32} className="text-[#0056b3]" />
            <p className="font-black text-xs md:text-sm uppercase">Podrška 24/7</p>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center">
          <Link
            href="/fb-hydrosonic-hr"
            className="inline-block px-10 py-4 bg-[#0056b3] hover:bg-[#004494] text-white rounded-full font-black text-sm uppercase transition-all"
          >
            Povratak na glavnu stranicu
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-10 text-center text-sm font-bold text-gray-400 px-4">
        <p>HydroSonic Elite™ – ProCare Series™ © 2025</p>
        <p className="mt-2 opacity-50 uppercase tracking-widest text-[10px]">Podrška: support@procare.hr</p>
      </footer>
    </div>
  );
}
