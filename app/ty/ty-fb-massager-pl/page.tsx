'use client';

import React from 'react';
import {
  CheckCircle2,
  Truck,
  Phone,
  Clock,
  ShieldCheck,
  Package,
  Heart
} from 'lucide-react';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white text-gray-900 font-sans">

      {/* Header */}
      <header className="bg-white border-b py-4 px-4">
        <div className="max-w-4xl mx-auto flex justify-center">
          <div className="text-2xl font-black tracking-tighter italic text-blue-600">AURARELIEF PRO™</div>
        </div>
      </header>

      <main className="py-12 px-4">
        <div className="max-w-2xl mx-auto">

          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
              <CheckCircle2 className="text-green-600" size={48} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
              DZIĘKUJEMY ZA ZAMÓWIENIE!
            </h1>
            <p className="text-xl text-gray-600 font-medium">
              Twoje zamówienie zostało przyjęte i jest przetwarzane.
            </p>
          </div>

          {/* Order Info Card */}
          <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 mb-8">
            <h2 className="text-xl font-black uppercase mb-6 flex items-center gap-3">
              <Package className="text-blue-600" /> Co Dalej?
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="bg-blue-100 p-3 rounded-xl shrink-0">
                  <Phone className="text-blue-600" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Telefon Potwierdzający</h3>
                  <p className="text-gray-600">Nasz zespół skontaktuje się z Tobą w ciągu następnych 24 godzin, aby potwierdzić szczegóły zamówienia i adres dostawy.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-orange-100 p-3 rounded-xl shrink-0">
                  <Clock className="text-orange-600" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Szybka Realizacja</h3>
                  <p className="text-gray-600">Twoje zamówienie zostanie przetworzone i przygotowane do wysyłki w ciągu 24-48 godzin.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-green-100 p-3 rounded-xl shrink-0">
                  <Truck className="text-green-600" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Dostawa Pod Twój Adres</h3>
                  <p className="text-gray-600">Kurier dostarczy paczkę bezpośrednio pod Twój adres. Płacisz dopiero przy odbiorze paczki.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center shadow-sm">
              <ShieldCheck className="text-green-600 mx-auto mb-2" size={28} />
              <p className="text-xs font-black uppercase tracking-tight">Płatność Za Pobraniem</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center shadow-sm">
              <Truck className="text-blue-600 mx-auto mb-2" size={28} />
              <p className="text-xs font-black uppercase tracking-tight">Dostawa 24-48h</p>
            </div>
          </div>

          {/* Support Box */}
          <div className="bg-gray-50 rounded-2xl p-6 text-center">
            <Heart className="text-red-500 mx-auto mb-3" size={24} />
            <h3 className="font-bold mb-2">Potrzebujesz Pomocy?</h3>
            <p className="text-gray-600 text-sm mb-4">
              Nasz zespół obsługi klienta jest do Twojej dyspozycji w razie jakichkolwiek pytań.
            </p>
            <p className="text-sm font-bold text-gray-800">
              Email: pomoc@aurarelief.pl
            </p>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-2xl font-black tracking-tighter italic text-blue-600 mb-4">AURARELIEF PRO™</div>
          <p className="text-gray-500 text-xs uppercase tracking-widest">
            © 2024 AuraRelief Pro Polska. Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </footer>
    </div>
  );
}
