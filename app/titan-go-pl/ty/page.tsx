"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ThankYouPage() {
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    // Generate random order number
    const randomOrder = `TG${Date.now().toString().slice(-6)}${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
    setOrderNumber(randomOrder);
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-6 py-20">
      {/* Dynamic Style Injection for Orbitron */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
        .font-orbitron { font-family: 'Orbitron', sans-serif; }
        .text-gradient {
          background: linear-gradient(to right, #60a5fa, #a78bfa, #f472b6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        @keyframes confetti {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .confetti {
          position: fixed;
          width: 10px;
          height: 10px;
          top: -10px;
          animation: confetti 3s ease-in-out infinite;
        }
      ` }} />

      {/* Confetti effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="confetti"
            style={{
              left: `${Math.random() * 100}%`,
              backgroundColor: ['#3b82f6', '#8b5cf6', '#ec4899', '#22c55e', '#eab308'][Math.floor(Math.random() * 5)],
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-600/20 rounded-full blur-[150px] -z-10"></div>

      {/* Success Icon */}
      <div className="relative mb-8">
        <div className="w-32 h-32 bg-green-500/20 rounded-full flex items-center justify-center border-4 border-green-500 shadow-[0_0_60px_rgba(34,197,94,0.4)]">
          <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce">
          SUKCES!
        </div>
      </div>

      {/* Main Content */}
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-orbitron font-black mb-6 tracking-tighter">
          DZIĘKUJEMY ZA<br />
          <span className="text-gradient">ZAMÓWIENIE!</span>
        </h1>

        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
          Twoje zamówienie na <span className="text-white font-bold">TitanGo Ultra</span> zostało pomyślnie przyjęte.
          Nasz zespół wkrótce się z Tobą skontaktuje w celu potwierdzenia szczegółów.
        </p>

        {/* Order Details Card */}
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 mb-10">
          <div className="flex items-center justify-center gap-4 mb-6">
            <img
              src="/images/titango/lenovolegiongo-1.webp"
              alt="TitanGo Ultra"
              className="w-24 h-24 object-cover rounded-2xl border border-white/20"
            />
            <div className="text-left">
              <p className="font-bold text-white text-xl">TitanGo Ultra</p>
              <p className="text-sm text-gray-400">8.8" QHD+ | 144Hz | Ryzen Z1 Extreme</p>
              <p className="text-green-500 font-black text-2xl mt-1">299 zł</p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Numer zamówienia:</span>
              <span className="text-white font-mono font-bold">{orderNumber}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Status:</span>
              <span className="text-green-500 font-bold flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Przetwarzanie
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Metoda płatności:</span>
              <span className="text-white font-bold">Przy odbiorze</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Przewidywana dostawa:</span>
              <span className="text-blue-400 font-bold">1-3 dni robocze</span>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-blue-600/10 border border-blue-500/30 rounded-2xl p-6 mb-10">
          <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Co dalej?
          </h3>
          <ul className="text-left space-y-3 text-sm text-gray-300">
            <li className="flex items-start gap-3">
              <span className="bg-blue-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
              <span>Nasz konsultant zadzwoni do Ciebie <span className="text-white font-semibold">w ciągu 24 godzin</span> w celu potwierdzenia zamówienia</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-blue-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
              <span>Otrzymasz SMS z <span className="text-white font-semibold">linkiem do śledzenia przesyłki</span></span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-blue-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
              <span>Zapłacisz kurierowi <span className="text-white font-semibold">299 zł przy odbiorze</span></span>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="text-center text-gray-400 text-sm mb-10">
          <p>Masz pytania? Skontaktuj się z nami:</p>
          <p className="text-white font-bold mt-2">support@titango-ultra.pl</p>
        </div>

        {/* Back to Home */}
        <Link
          href="/titan-go-pl"
          className="inline-block px-10 py-4 bg-white/10 hover:bg-white/20 rounded-full font-bold text-sm transition-all border border-white/20 hover:border-white/40"
        >
          Wróć do strony głównej
        </Link>
      </div>

      {/* Footer */}
      <footer className="mt-20 text-center text-gray-600 text-xs">
        <p>TitanGo Ultra - Przenośna Konsola Gaming Premium</p>
        <p className="mt-2">© 2026 Wszelkie prawa zastrzeżone</p>
      </footer>
    </main>
  );
}
