"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Phone, Truck, ShieldCheck } from "lucide-react";

export default function ThankYouPage() {
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    const randomOrder = `VW-PL-${Date.now().toString().slice(-6)}${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
    setOrderNumber(randomOrder);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Top Bar */}
      <div className="bg-black text-white py-3 text-center font-black uppercase text-sm md:text-base">
        VAPORWASH PRO+ {"\u2014"} H12 Ultra Series
      </div>

      <main className="max-w-3xl mx-auto px-4 py-16">
        {/* Success Icon */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
            <CheckCircle2 size={56} className="text-green-600" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase mb-4">
            {"Dzi\u0119kujemy za "}<span className="text-green-600">{"zam\u00f3wienie!"}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-bold">
            {"Twoje zam\u00f3wienie "}<span className="text-black">VAPORWASH PRO+</span>{" zosta\u0142o pomy\u015blnie przyj\u0119te."}
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-gray-50 rounded-3xl p-8 border-2 border-gray-100 shadow-lg mb-10">
          <h2 className="text-xl font-black uppercase mb-6 text-black">{"Szczeg\u00f3\u0142y zam\u00f3wienia"}</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-gray-500 font-bold">{"Numer zam\u00f3wienia:"}</span>
              <span className="font-black font-mono">{orderNumber}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-gray-500 font-bold">Produkt:</span>
              <span className="font-black">VAPORWASH PRO+</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-gray-500 font-bold">Cena:</span>
              <span className="font-black text-green-600 text-2xl">{"359 z\u0142"}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-gray-500 font-bold">{"Metoda p\u0142atno\u015bci:"}</span>
              <span className="font-black">{"P\u0142atno\u015b\u0107 przy odbiorze"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-bold">Status:</span>
              <span className="font-black text-green-600 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                {"W trakcie realizacji"}
              </span>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-green-50 border-2 border-green-200 rounded-3xl p-8 mb-10">
          <h3 className="text-xl font-black uppercase mb-6 text-green-700 flex items-center gap-2">
            <Phone size={24} /> {"Co dalej?"}
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <span className="bg-black text-white text-sm font-black w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
              <span className="text-lg font-medium">{"Nasz konsultant zadzwoni do Ciebie "}<span className="font-black">{"w ci\u0105gu 15 minut"}</span>{" w celu potwierdzenia zam\u00f3wienia."}</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="bg-black text-white text-sm font-black w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
              <span className="text-lg font-medium">{"Otrzymasz SMS z "}<span className="font-black">{"linkiem do \u015bledzenia przesy\u0142ki"}</span>.</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="bg-black text-white text-sm font-black w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
              <span className="text-lg font-medium">{"Zap\u0142acisz kurierowi "}<span className="font-black">{"459 z\u0142 przy odbiorze"}</span>.</span>
            </li>
          </ul>
        </div>

        {/* What you'll receive */}
        <div className="bg-gray-50 rounded-3xl p-8 border-2 border-gray-100 mb-10">
          <h3 className="text-xl font-black uppercase mb-6">{"Co otrzymasz"}</h3>
          <ul className="space-y-3">
            {[
              "VAPORWASH PRO+ H12 Ultra",
              "Podw\u00f3jny zbiornik na wod\u0119 (czysta + brudna)",
              "Rolka myjąca z gor\u0105cym powietrzem 75\u00b0C",
              "Funkcja pary 110\u00b0C",
              "Automatyczne suszenie rolki",
              "System przycinania w\u0142os\u00f3w i spl\u0105tanych w\u0142\u00f3kien",
              "Cyfrowy wy\u015bwietlacz LED",
              "Trakcja wspomagana",
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
            <p className="font-black text-xs md:text-sm uppercase">{"Wysy\u0142ka 24/48h"}</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2 p-4 bg-gray-50 rounded-2xl">
            <ShieldCheck size={32} className="text-black" />
            <p className="font-black text-xs md:text-sm uppercase">{"Gwarancja 1 rok"}</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2 p-4 bg-gray-50 rounded-2xl">
            <Phone size={32} className="text-black" />
            <p className="font-black text-xs md:text-sm uppercase">Wsparcie 24/7</p>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center">
          <Link
            href="/fb-steammop-pl"
            className="inline-block px-10 py-4 bg-black hover:bg-gray-800 text-white rounded-full font-black text-sm uppercase transition-all"
          >
            {"Wr\u00f3\u0107 na stron\u0119 g\u0142\u00f3wn\u0105"}
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-10 text-center text-sm font-bold text-gray-400 px-4">
        <p>VAPORWASH PRO+ {"\u2014"} H12 Ultra Series &copy; 2025</p>
        <p className="mt-2 opacity-50 uppercase tracking-widest text-[10px]">Wsparcie: support@vaporwash.pl</p>
      </footer>
    </div>
  );
}
