"use client";

import React, { useEffect, useState } from 'react';
import { CheckCircle2, Truck, Shield, Phone, Package, Clock, Star } from 'lucide-react';

export default function ThankYouPage() {
  const [orderData, setOrderData] = useState({ name: '', address: '', phone: '' });
  const [orderNumber] = useState(() => `LT-${Date.now().toString(36).toUpperCase()}`);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setOrderData({
      name: params.get('name') || '',
      address: params.get('address') || '',
      phone: params.get('phone') || '',
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white border-b-2 border-green-600 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-center">
          <div className="font-black text-xl tracking-tight uppercase">
            <span className="text-green-600">TurboTrim</span> <span className="text-gray-800">PRO</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10 md:py-16">
        {/* Success Icon + Title */}
        <div className="text-center mb-10">
          <div className="relative inline-block mb-6">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-bounce-slow">
              <CheckCircle2 size={56} className="text-green-600" />
            </div>
            <div className="absolute -top-1 -right-1 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
              <Star size={16} className="text-white" fill="white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 uppercase mb-3">
            Ačiū už užsakymą!
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Jūsų užsakymas sėkmingai priimtas ir apdorojamas.
          </p>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-green-100 overflow-hidden mb-8">
          <div className="bg-green-600 text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package size={22} />
              <span className="font-bold text-lg">Užsakymo informacija</span>
            </div>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-mono">{orderNumber}</span>
          </div>
          <div className="p-6 space-y-4">
            {orderData.name && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 font-bold text-sm">👤</span>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-bold">Vardas ir pavardė</p>
                  <p className="text-gray-800 font-semibold">{orderData.name}</p>
                </div>
              </div>
            )}
            {orderData.address && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 font-bold text-sm">📍</span>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-bold">Pristatymo adresas</p>
                  <p className="text-gray-800 font-semibold">{orderData.address}</p>
                </div>
              </div>
            )}
            {orderData.phone && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 font-bold text-sm">📞</span>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-bold">Telefonas</p>
                  <p className="text-gray-800 font-semibold">+370 {orderData.phone}</p>
                </div>
              </div>
            )}
            <div className="border-t border-gray-100 pt-4 mt-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 font-bold text-sm">💰</span>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-bold">Suma</p>
                  <p className="text-2xl font-black text-green-600">69€ <span className="text-sm font-normal text-gray-400">(mokėjimas pristatymo metu)</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What Happens Next */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-8">
          <h2 className="text-xl font-black text-gray-900 uppercase mb-6 text-center">Kas bus toliau?</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-black">1</div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
                  <Phone size={16} className="text-green-600" /> Operatoriaus skambutis
                </h3>
                <p className="text-gray-500 text-sm">Per artimiausias valandas mūsų operatorius paskambins jums patvirtinti užsakymą ir pristatymo detales.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-black">2</div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
                  <Truck size={16} className="text-green-600" /> Greitas pristatymas
                </h3>
                <p className="text-gray-500 text-sm">Jūsų TurboTrim PRO bus pristatytas per <strong>24-48 valandas</strong> tiesiai prie jūsų durų. Pristatymas <strong>NEMOKAMAS</strong>.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-black">3</div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
                  <Shield size={16} className="text-green-600" /> Mokėjimas pristatymo metu
                </h3>
                <p className="text-gray-500 text-sm">Mokate <strong>tik pristatymo metu</strong>, kai gausite ir patikrinsite savo produktą. Jokių išankstinių mokėjimų.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Guarantees */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { icon: <Truck size={20} />, text: "Nemokamas\npristatymas" },
            { icon: <Shield size={20} />, text: "5 metų\ngarantija" },
            { icon: <Clock size={20} />, text: "30 dienų\ngrąžinimas" },
            { icon: <Star size={20} />, text: "4.9/5\nįvertinimas" },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
              <div className="text-green-600 flex justify-center mb-2">{item.icon}</div>
              <p className="text-xs font-bold text-gray-700 whitespace-pre-line">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Package Reminder */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 md:p-8 text-white text-center">
          <h3 className="font-black text-lg md:text-xl uppercase mb-4">Jūsų pakete:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left max-w-lg mx-auto">
            {[
              "TurboTrim PRO daugiafunkcė krūmapjovė",
              "3 dantų peilis + automatinė galvutė su siūlu",
              "4x baterijos 20V/4Ah (2 bazinės + 2 papildomos)",
              "Dvigubas greitas įkroviklis",
              "Apsaugos rinkinys (akiniai + pirštinės + antveidis)",
              "Diržas su petneša + naudotojo vadovas",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-300 flex-shrink-0" />
                <span className="text-sm text-white/90">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-white/20">
            <p className="text-white/60 text-sm">Viskas įskaičiuota • Jokių papildomų mokesčių</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-10 text-gray-400 text-xs space-y-1">
          <p>© 2026 TurboTrim PRO. Visos teisės saugomos.</p>
          <p>Nuotraukos yra iliustracinio pobūdžio.</p>
        </div>
      </main>
    </div>
  );
}
