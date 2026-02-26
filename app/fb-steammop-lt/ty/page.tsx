"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Phone, Truck, ShieldCheck } from "lucide-react";

export default function ThankYouPage() {
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    const randomOrder = `VW-LT-${Date.now().toString().slice(-6)}${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
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
            {"D\u0117kojame u\u017e "}<span className="text-green-600">{"u\u017esakym\u0105!"}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-bold">
            {"J\u016bs\u0173 u\u017esakymas "}<span className="text-black">VAPORWASH PRO+</span>{" s\u0117kmingai priimtas."}
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-gray-50 rounded-3xl p-8 border-2 border-gray-100 shadow-lg mb-10">
          <h2 className="text-xl font-black uppercase mb-6 text-black">{"U\u017esakymo informacija"}</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-gray-500 font-bold">{"U\u017esakymo numeris:"}</span>
              <span className="font-black font-mono">{orderNumber}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-gray-500 font-bold">Produktas:</span>
              <span className="font-black">VAPORWASH PRO+</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-gray-500 font-bold">Kaina:</span>
              <span className="font-black text-green-600 text-2xl">{"99 \u20ac"}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-gray-500 font-bold">{"Mok\u0117jimo b\u016bdas:"}</span>
              <span className="font-black">{"Mok\u0117jimas pristatymo metu"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-bold">Statusas:</span>
              <span className="font-black text-green-600 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                {"Apdorojama"}
              </span>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-green-50 border-2 border-green-200 rounded-3xl p-8 mb-10">
          <h3 className="text-xl font-black uppercase mb-6 text-green-700 flex items-center gap-2">
            <Phone size={24} /> {"Kas toliau?"}
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <span className="bg-black text-white text-sm font-black w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
              <span className="text-lg font-medium">{"M\u016bs\u0173 konsultantas jums paskambins "}<span className="font-black">{"per 15 minu\u010di\u0173"}</span>{" u\u017esakymo patvirtinimui."}</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="bg-black text-white text-sm font-black w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
              <span className="text-lg font-medium">{"Gausite SMS su "}<span className="font-black">{"siuntos sekimo nuoroda"}</span>.</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="bg-black text-white text-sm font-black w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
              <span className="text-lg font-medium">{"Sumok\u0117site kurjeriui "}<span className="font-black">{"99 \u20ac pristatymo metu"}</span>.</span>
            </li>
          </ul>
        </div>

        {/* What you'll receive */}
        <div className="bg-gray-50 rounded-3xl p-8 border-2 border-gray-100 mb-10">
          <h3 className="text-xl font-black uppercase mb-6">{"K\u0105 gausite"}</h3>
          <ul className="space-y-3">
            {[
              "VAPORWASH PRO+ H12 Ultra",
              "Dvigubas vandens bakas (\u0161varus + pur\u0161kinas)",
              "Plovimo volelis su kar\u0161tu oru 75\u00b0C",
              "Gar\u0173 funkcija 110\u00b0C",
              "Automatinis volelio d\u017eiovinimas",
              "Plauk\u0173 ir susi\u0173pusi\u0173 pa\u0161ali\u0173 kirpimo sistema",
              "Skaitmeninis LED ekranas",
              "Pagalbin\u0117 trauka",
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
            <p className="font-black text-xs md:text-sm uppercase">{"Pristatymas 24/48 val."}</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2 p-4 bg-gray-50 rounded-2xl">
            <ShieldCheck size={32} className="text-black" />
            <p className="font-black text-xs md:text-sm uppercase">{"Garantija 1 metai"}</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2 p-4 bg-gray-50 rounded-2xl">
            <Phone size={32} className="text-black" />
            <p className="font-black text-xs md:text-sm uppercase">Palaikymas 24/7</p>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center">
          <Link
            href="/fb-steammop-lt"
            className="inline-block px-10 py-4 bg-black hover:bg-gray-800 text-white rounded-full font-black text-sm uppercase transition-all"
          >
            {"Gr\u012f\u017eti \u012f pagrindin\u012f puslap\u012f"}
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-10 text-center text-sm font-bold text-gray-400 px-4">
        <p>VAPORWASH PRO+ {"\u2014"} H12 Ultra Series &copy; 2025</p>
        <p className="mt-2 opacity-50 uppercase tracking-widest text-[10px]">Palaikymas: support@vaporwash.lt</p>
      </footer>
    </div>
  );
}
