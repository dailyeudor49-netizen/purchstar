
"use client";

import { CheckCircle, Truck, Phone, Shield, Clock, Package } from 'lucide-react';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Google Fonts */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&family=Playfair+Display:wght@700;900&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
      `}} />

      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2">
          <Shield className="w-6 h-6 text-orange-600" />
          <span className="text-xl font-black tracking-tighter">
            PURE<span className="text-orange-600">GLASS</span> <span className="text-gray-300 font-light ml-1">XXL</span>
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-16">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-200 animate-bounce">
            <CheckCircle className="w-14 h-14 text-white" />
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 font-serif">
            Köszönjük a rendelését!
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Az Ön <strong>PureGlass XXL 10L</strong> rendelése beérkezett és feldolgozás alatt áll.
          </p>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
          <h2 className="text-lg font-black text-gray-900 mb-6 uppercase tracking-wider">Mi következik?</h2>

          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="bg-orange-100 p-3 rounded-xl flex-shrink-0">
                <Phone className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Telefonos megerősítés</h3>
                <p className="text-sm text-gray-500">Tanácsadónk <strong>24 órán belül</strong> felhívja Önt a rendelés részleteinek megerősítésére.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-orange-100 p-3 rounded-xl flex-shrink-0">
                <Package className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Csomag előkészítése</h3>
                <p className="text-sm text-gray-500">Az Ön PureGlass XXL-jét gondosan becsomagoljuk és elküldjük raktárunkból.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-orange-100 p-3 rounded-xl flex-shrink-0">
                <Truck className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Kiszállítás 48-72 órán belül</h3>
                <p className="text-sm text-gray-500">A futár a megadott címre szállítja a csomagot. <strong>Utánvétes fizetés.</strong></p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-green-100 p-3 rounded-xl flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Ellenőrizze fizetés előtt</h3>
                <p className="text-sm text-gray-500">Ellenőrizheti a terméket fizetés előtt. <strong>Nulla kockázat!</strong></p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-gray-900 text-white rounded-3xl p-8 mb-8">
          <h2 className="text-lg font-black mb-6 uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-500" />
            Rendelés összegzése
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <span className="text-gray-400">Termék</span>
              <span className="font-bold">PureGlass XXL 10L</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <span className="text-gray-400">Eredeti ár</span>
              <span className="line-through text-gray-500">62 999 Ft</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <span className="text-gray-400">Az Ön ára</span>
              <span className="font-black text-2xl text-orange-500">31 499 Ft</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <span className="text-gray-400">Szállítás</span>
              <span className="font-bold text-green-400">INGYENES</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="font-bold text-lg">FIZETENDŐ</span>
              <span className="font-black text-3xl text-orange-500">31 499 Ft</span>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-4">
            Kérdése van? Lépjen kapcsolatba velünk:
          </p>
          <div className="inline-flex items-center gap-2 bg-orange-50 px-6 py-3 rounded-xl border border-orange-100">
            <Phone className="w-4 h-4 text-orange-600" />
            <span className="font-bold text-orange-600">Ügyfélszolgálat 24/7</span>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap justify-center gap-8 text-gray-400">
            <div className="flex items-center gap-2 text-xs font-bold">
              <Shield className="w-4 h-4" />
              BIZTONSÁGOS FIZETÉS
            </div>
            <div className="flex items-center gap-2 text-xs font-bold">
              <Truck className="w-4 h-4" />
              INGYENES SZÁLLÍTÁS
            </div>
            <div className="flex items-center gap-2 text-xs font-bold">
              <CheckCircle className="w-4 h-4" />
              24 HÓNAP GARANCIA
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-8 px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-orange-500" />
          <span className="text-lg font-black tracking-tighter">PURE<span className="text-orange-600">GLASS</span></span>
        </div>
        <p className="text-gray-500 text-xs">
          © 2024 PUREGLASS HEALTH TECHNOLOGIES HU
        </p>
      </footer>
    </div>
  );
}
