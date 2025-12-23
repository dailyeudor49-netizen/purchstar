'use client';

import React, { useState } from 'react';

export default function SixSlimDesktopPage() {
  const [formData, setFormData] = useState({ nome: '', telefono: '', indirizzo: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const affSub1 = urlParams.get('aff_sub1') || urlParams.get('utm_source') || '';
      const affSub2 = urlParams.get('aff_sub2') || urlParams.get('utm_campaign') || '';

      const params = new URLSearchParams({
        source_id: 'cac06d3486f2',
        aff_sub1: affSub1,
        aff_sub2: affSub2,
        name: formData.nome,
        phone: formData.telefono,
        address: formData.indirizzo
      });

      await fetch('https://network.worldfilia.net/manager/inventory/buy/ntm_sixslim_2x49.json?api_key=bzIGfLM1XwmR4l44_6rydQ', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
        mode: 'no-cors'
      });

      window.location.href = '/ty/ty-six-slim';
    } catch (error) {
      console.error('Order submission error:', error);
      window.location.href = '/ty/ty-six-slim';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-green-600 text-white py-3">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-sm font-medium">Spedizione Gratuita in tutta Italia | Pagamento alla Consegna</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-3xl">

        {/* Product Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Six-Slim
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Integratore alimentare naturale per il controllo del peso
          </p>

          {/* Product Image */}
          <div className="mb-8">
            <img
              src="/images/six-slim/hero.png"
              alt="Six-Slim Integratore"
              className="max-w-xs mx-auto"
            />
          </div>
        </div>

        {/* Description */}
        <div className="bg-gray-50 rounded-xl p-6 md:p-8 mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Informazioni sul prodotto</h2>

          <div className="space-y-4 text-gray-700">
            <p>
              Six-Slim è un integratore alimentare formulato con ingredienti di origine naturale,
              pensato per supportare il normale metabolismo e contribuire al controllo del peso
              nell'ambito di una dieta equilibrata e uno stile di vita sano.
            </p>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-semibold text-gray-900 mb-2">Modalità d'uso</h3>
              <p>Assumere 1 compressa al giorno con un bicchiere d'acqua, preferibilmente al mattino.</p>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-semibold text-gray-900 mb-2">Contenuto della confezione</h3>
              <p>Ogni confezione contiene 30 compresse (trattamento per 1 mese).</p>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-semibold text-gray-900 mb-2">Avvertenze</h3>
              <p className="text-sm text-gray-600">
                Gli integratori non vanno intesi come sostituti di una dieta variata ed equilibrata
                e di uno stile di vita sano. Non superare la dose giornaliera consigliata.
                Tenere fuori dalla portata dei bambini al di sotto dei 3 anni.
                Consultare il medico in caso di gravidanza, allattamento o patologie.
              </p>
            </div>
          </div>
        </div>

        {/* Offer */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-10 text-center">
          <p className="text-green-800 font-semibold mb-2">Offerta Speciale</p>
          <p className="text-3xl font-bold text-green-700 mb-1">2 Confezioni a €49,00</p>
          <p className="text-sm text-green-600">60 compresse totali - Spedizione gratuita</p>
        </div>

        {/* Order Form */}
        <div id="ordina" className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Ordina Ora</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome e Cognome</label>
              <input
                required
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                placeholder="Mario Rossi"
                value={formData.nome}
                onChange={(e) => setFormData({...formData, nome: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefono</label>
              <input
                required
                type="tel"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                placeholder="333 1234567"
                value={formData.telefono}
                onChange={(e) => setFormData({...formData, telefono: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Indirizzo di spedizione</label>
              <input
                required
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                placeholder="Via Roma 1, 00100 Roma (RM)"
                value={formData.indirizzo}
                onChange={(e) => setFormData({...formData, indirizzo: e.target.value})}
              />
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4 mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Six-Slim x2</span>
                <span className="font-semibold">€49,00</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Spedizione</span>
                <span className="font-semibold text-green-600">Gratuita</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold">Totale</span>
                  <span className="text-xl font-bold text-green-600">€49,00</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">Pagamento in contanti alla consegna</p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-lg transition-colors mt-4"
            >
              {isSubmitting ? 'Elaborazione...' : 'Conferma Ordine'}
            </button>
          </form>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center text-sm text-gray-500">
            <p className="mb-4">
              Six-Slim è un integratore alimentare. Gli integratori non sostituiscono una dieta variata
              e uno stile di vita sano. I risultati possono variare da persona a persona.
            </p>
            <div className="flex justify-center gap-4 mb-4">
              <a href="#" className="hover:text-gray-700">Privacy Policy</a>
              <a href="#" className="hover:text-gray-700">Termini e Condizioni</a>
              <a href="#" className="hover:text-gray-700">Contatti</a>
            </div>
            <p>© 2024 Six-Slim - Tutti i diritti riservati</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
