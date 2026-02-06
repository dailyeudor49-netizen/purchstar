'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Image from 'next/image';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || 'Kupče';

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="py-4 px-4 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-bold">AuraRing Pro</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Thank You Message */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hvala Vam, {name}!
          </h1>

          <p className="text-xl text-purple-200 mb-8">
            Vaša narudžba je uspješno zaprimljena
          </p>

          {/* Order Confirmation Box */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="relative w-20 h-20">
                <Image
                  src="/images/smart-ring/silverring.webp"
                  alt="AuraRing Pro"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg">AuraRing Pro</h3>
                <p className="text-purple-300">Pametni zdravstveni prsten</p>
              </div>
            </div>

            <div className="border-t border-white/20 pt-6">
              <h4 className="font-semibold text-lg mb-4">Što slijedi?</h4>
              <ul className="text-left space-y-3 text-purple-200">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-purple-500/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm">1</span>
                  </span>
                  <span>Naš konzultant će Vas kontaktirati telefonom radi potvrde narudžbe</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-purple-500/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm">2</span>
                  </span>
                  <span>Nakon potvrde, Vaš AuraRing Pro bit će poslan u roku od 24-48 sati</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-purple-500/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm">3</span>
                  </span>
                  <span>Plaćanje pouzećem - platit ćete kuriru prilikom dostave</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Price Reminder */}
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-6 mb-8 border border-green-500/30">
            <p className="text-green-300 font-semibold mb-2">Vaša promotivna cijena</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl font-bold text-white">39,99 €</span>
              <span className="text-lg text-gray-400 line-through">79,99 €</span>
              <span className="bg-green-500 text-white text-sm font-bold px-2 py-1 rounded">
                -50%
              </span>
            </div>
          </div>

          {/* Features Reminder */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">💓</div>
              <p className="text-sm text-purple-200">Praćenje srca 24/7</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">😴</div>
              <p className="text-sm text-purple-200">Analiza sna</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🔋</div>
              <p className="text-sm text-purple-200">150 dana baterije</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">💧</div>
              <p className="text-sm text-purple-200">Vodootporan 100m</p>
            </div>
          </div>

          {/* Contact Info */}
          <p className="text-gray-400 text-sm">
            Imate pitanja? Kontaktirajte nas: <br />
            <span className="text-purple-300">support@auraring.hr</span>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center text-gray-400 text-sm">
          <p>© 2024 AuraRing Pro. Sva prava pridržana.</p>
        </div>
      </footer>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Učitavanje...</div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
