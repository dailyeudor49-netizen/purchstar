"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Phone, Truck, ShieldCheck } from "lucide-react";

export default function ThankYouPage() {
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    const randomOrder = `CO-CZ-${Date.now().toString().slice(-6)}${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
    setOrderNumber(randomOrder);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Top Bar */}
      <div className="bg-black text-white py-3 text-center font-black uppercase text-sm md:text-base">
        AURIXA ChefOne ULTRA — X9 PRO Series
      </div>

      <main className="max-w-3xl mx-auto px-4 py-16">
        {/* Success Icon */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
            <CheckCircle2 size={56} className="text-green-600" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase mb-4">
            {"D\u011bkujeme za "}<span className="text-green-600">{"objedn\u00e1vku!"}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-bold">
            {"Va\u0161e objedn\u00e1vka "}<span className="text-black">AURIXA ChefOne ULTRA</span>{" byla \u00fasp\u011b\u0161n\u011b p\u0159ijata."}
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-gray-50 rounded-3xl p-8 border-2 border-gray-100 shadow-lg mb-10">
          <h2 className="text-xl font-black uppercase mb-6 text-black">{"Detaily objedn\u00e1vky"}</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-gray-500 font-bold">{"C\u030c\u00edslo objedn\u00e1vky:"}</span>
              <span className="font-black font-mono">{orderNumber}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-gray-500 font-bold">Produkt:</span>
              <span className="font-black">AURIXA ChefOne ULTRA</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-gray-500 font-bold">Cena:</span>
              <span className="font-black text-green-600 text-2xl">{"2 199 K\u010d"}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-gray-500 font-bold">{"Zp\u016fsob platby:"}</span>
              <span className="font-black">{"Na dob\u00edrku"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-bold">Status:</span>
              <span className="font-black text-green-600 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                {"Zpracov\u00e1v\u00e1 se"}
              </span>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-green-50 border-2 border-green-200 rounded-3xl p-8 mb-10">
          <h3 className="text-xl font-black uppercase mb-6 text-green-700 flex items-center gap-2">
            <Phone size={24} /> {"Co n\u00e1sleduje?"}
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <span className="bg-black text-white text-sm font-black w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
              <span className="text-lg font-medium">{"N\u00e1\u0161 konzultant v\u00e1m zavol\u00e1 "}<span className="font-black">{"do 15 minut"}</span>{" pro potvrzen\u00ed objedn\u00e1vky."}</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="bg-black text-white text-sm font-black w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
              <span className="text-lg font-medium">{"Obdr\u017e\u00edte SMS s "}<span className="font-black">{"odkazem na sledov\u00e1n\u00ed z\u00e1silky"}</span>.</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="bg-black text-white text-sm font-black w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
              <span className="text-lg font-medium">{"Zaplatíte kurýrovi "}<span className="font-black">{"2 199 K\u010d p\u0159i p\u0159evzet\u00ed"}</span>.</span>
            </li>
          </ul>
        </div>

        {/* What you'll receive */}
        <div className="bg-gray-50 rounded-3xl p-8 border-2 border-gray-100 mb-10">
          <h3 className="text-xl font-black uppercase mb-6">{"Co obdr\u017e\u00edte"}</h3>
          <ul className="space-y-3">
            {[
              "AURIXA ChefOne ULTRA X9 PRO",
              "CrispLid 200\u00b0C",
              "Druh\u00e1 nerezov\u00e1 m\u00edsa + v\u00edko",
              "Sada silikonov\u00fdch forem + profesion\u00e1ln\u00ed st\u011brka",
              "Bezdr\u00e1tov\u00e1 teplotn\u00ed sonda",
              "Digit\u00e1ln\u00ed bonus: Meal-Prep 30 dn\u00ed + Kucha\u0159ka + Z\u00e1ruka 1 rok",
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
            <p className="font-black text-xs md:text-sm uppercase">{"Doru\u010den\u00ed 24/48h"}</p>
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
            href="/chefone-cz"
            className="inline-block px-10 py-4 bg-black hover:bg-gray-800 text-white rounded-full font-black text-sm uppercase transition-all"
          >
            {"Zp\u011bt na hlavn\u00ed str\u00e1nku"}
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-10 text-center text-sm font-bold text-gray-400 px-4">
        <p>AURIXA ChefOne ULTRA — X9 PRO Series &copy; 2025</p>
        <p className="mt-2 opacity-50 uppercase tracking-widest text-[10px]">Podpora: support@aurixa.cz</p>
      </footer>
    </div>
  );
}
