"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Phone, Truck, ShieldCheck } from "lucide-react";

export default function ThankYouPage() {
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    const randomOrder = `VW-SK-${Date.now().toString().slice(-6)}${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
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
            {"\u010eakujeme za "}<span className="text-green-600">{"objedn\u00e1vku!"}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-bold">
            {"Va\u0161a objedn\u00e1vka "}<span className="text-black">VAPORWASH PRO+</span>{" bola \u00faspe\u0161ne prijat\u00e1."}
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-gray-50 rounded-3xl p-8 border-2 border-gray-100 shadow-lg mb-10">
          <h2 className="text-xl font-black uppercase mb-6 text-black">{"Detaily objedn\u00e1vky"}</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-gray-500 font-bold">{"\u010c\u00edslo objedn\u00e1vky:"}</span>
              <span className="font-black font-mono">{orderNumber}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-gray-500 font-bold">Produkt:</span>
              <span className="font-black">VAPORWASH PRO+</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-gray-500 font-bold">Cena:</span>
              <span className="font-black text-green-600 text-2xl">{"79 \u20ac"}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-gray-500 font-bold">{"Sp\u00f4sob platby:"}</span>
              <span className="font-black">{"Na dob\u00eerku"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-bold">Status:</span>
              <span className="font-black text-green-600 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                {"Spracov\u00e1va sa"}
              </span>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-green-50 border-2 border-green-200 rounded-3xl p-8 mb-10">
          <h3 className="text-xl font-black uppercase mb-6 text-green-700 flex items-center gap-2">
            <Phone size={24} /> {"\u010co nasleduje?"}
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <span className="bg-black text-white text-sm font-black w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
              <span className="text-lg font-medium">{"N\u00e1\u0161 konzultant v\u00e1m zavol\u00e1 "}<span className="font-black">{"do 15 min\u00fat"}</span>{" na potvrdenie objedn\u00e1vky."}</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="bg-black text-white text-sm font-black w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
              <span className="text-lg font-medium">{"Dostanete SMS s "}<span className="font-black">{"odkazom na sledovanie z\u00e1sielky"}</span>.</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="bg-black text-white text-sm font-black w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
              <span className="text-lg font-medium">{"Zaplat\u00edte kuri\u00e9rovi "}<span className="font-black">{"109 \u20ac pri prevzat\u00ed"}</span>.</span>
            </li>
          </ul>
        </div>

        {/* What you'll receive */}
        <div className="bg-gray-50 rounded-3xl p-8 border-2 border-gray-100 mb-10">
          <h3 className="text-xl font-black uppercase mb-6">{"\u010co dostanete"}</h3>
          <ul className="space-y-3">
            {[
              "VAPORWASH PRO+ H12 Ultra",
              "Dvojit\u00e1 n\u00e1dr\u017e na vodu (\u010dist\u00e1 + \u0161pinav\u00e1)",
              "Umyvac\u00ed valec s hor\u00facim vzduchom 75\u00b0C",
              "Funkcia pary 110\u00b0C",
              "Automatick\u00e9 su\u0161enie valca",
              "Syst\u00e9m strihania vlasov a zamotaných vl\u00e1kien",
              "Digit\u00e1lny LED displej",
              "Asistovan\u00fd pohon",
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
            <p className="font-black text-xs md:text-sm uppercase">{"Doprava 24/48h"}</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2 p-4 bg-gray-50 rounded-2xl">
            <ShieldCheck size={32} className="text-black" />
            <p className="font-black text-xs md:text-sm uppercase">{"Z\u00e1ruka 1 rok"}</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2 p-4 bg-gray-50 rounded-2xl">
            <Phone size={32} className="text-black" />
            <p className="font-black text-xs md:text-sm uppercase">Podpora 24/7</p>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center">
          <Link
            href="/fb-steammop-sk"
            className="inline-block px-10 py-4 bg-black hover:bg-gray-800 text-white rounded-full font-black text-sm uppercase transition-all"
          >
            {"Sp\u00e4\u0165 na hlavn\u00fa str\u00e1nku"}
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-10 text-center text-sm font-bold text-gray-400 px-4">
        <p>VAPORWASH PRO+ {"\u2014"} H12 Ultra Series &copy; 2025</p>
        <p className="mt-2 opacity-50 uppercase tracking-widest text-[10px]">Podpora: support@vaporwash.sk</p>
      </footer>
    </div>
  );
}
