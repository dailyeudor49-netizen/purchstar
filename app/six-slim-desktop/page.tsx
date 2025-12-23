'use client';

import React from 'react';

export default function SixSlimDesktopPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold text-gray-800">Benessere & Salute</div>
            <nav className="hidden md:flex gap-6 text-sm text-gray-600">
              <a href="#" className="hover:text-gray-900">Home</a>
              <a href="#" className="hover:text-gray-900">Fitness</a>
              <a href="#" className="hover:text-gray-900">Nutrizione</a>
              <a href="#" className="hover:text-gray-900">Lifestyle</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Article */}
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <article>
          {/* Category & Date */}
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">FITNESS</span>
            <span className="text-gray-400 text-sm">15 Dicembre 2024</span>
            <span className="text-gray-400 text-sm">• 5 min lettura</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
            I benefici dell'attività fisica: perché muoversi fa bene a corpo e mente
          </h1>

          {/* Author */}
          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-200">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold">DR</div>
            <div>
              <p className="font-medium text-gray-900">Dott.ssa Roberta Mancini</p>
              <p className="text-sm text-gray-500">Specialista in Medicina dello Sport</p>
            </div>
          </div>

          {/* Hero Image */}
          <div className="mb-10 rounded-xl overflow-hidden bg-gradient-to-br from-green-100 to-blue-100 h-64 flex items-center justify-center">
            <span className="text-6xl">🏃‍♀️</span>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p className="text-xl text-gray-600 font-medium">
              L'attività fisica regolare è uno dei pilastri fondamentali per mantenere uno stile di vita sano.
              Non si tratta solo di estetica, ma di un vero e proprio investimento sulla propria salute a lungo termine.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Benefici per il corpo</h2>

            <p>
              Muoversi con regolarità apporta numerosi benefici al nostro organismo. L'esercizio fisico aiuta a
              mantenere un peso corporeo equilibrato, migliora la circolazione sanguigna e rafforza il sistema
              cardiovascolare. Anche solo 30 minuti di camminata al giorno possono fare la differenza.
            </p>

            <p>
              L'attività fisica contribuisce inoltre a rafforzare muscoli e ossa, riducendo il rischio di
              osteoporosi e mantenendo una buona mobilità articolare anche con l'avanzare dell'età.
              Non è necessario diventare atleti professionisti: bastano piccoli gesti quotidiani.
            </p>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 my-8 rounded-r-lg">
              <p className="text-green-800 font-medium">
                💡 Lo sapevi? Secondo l'OMS, gli adulti dovrebbero praticare almeno 150 minuti di attività
                fisica moderata a settimana per mantenersi in salute.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Benefici per la mente</h2>

            <p>
              L'esercizio fisico non fa bene solo al corpo: è un potente alleato anche per la salute mentale.
              Durante l'attività fisica, il nostro cervello rilascia endorfine, i cosiddetti "ormoni della felicità",
              che contribuiscono a migliorare l'umore e ridurre stress e ansia.
            </p>

            <p>
              Numerosi studi scientifici hanno dimostrato che l'attività fisica regolare può aiutare a combattere
              la depressione e migliorare la qualità del sonno. Muoversi aiuta anche a mantenere la mente attiva
              e può contribuire a prevenire il declino cognitivo.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Come iniziare</h2>

            <p>
              Se non sei abituato a fare esercizio, inizia gradualmente. Ecco alcuni consigli pratici:
            </p>

            <ul className="list-disc pl-6 space-y-2 my-6">
              <li>Inizia con brevi passeggiate di 15-20 minuti</li>
              <li>Scegli un'attività che ti piace: nuoto, bicicletta, yoga, ballo</li>
              <li>Fissa obiettivi realistici e graduali</li>
              <li>Trova un compagno di allenamento per mantenerti motivato</li>
              <li>Ascolta il tuo corpo e non esagerare</li>
            </ul>

            <p>
              Ricorda: l'importante è essere costanti. Meglio poco ma regolare, piuttosto che sessioni
              intense ma sporadiche. Ogni passo conta verso una vita più sana e attiva.
            </p>

            <div className="bg-blue-50 border border-blue-200 p-6 my-8 rounded-xl">
              <h3 className="font-bold text-blue-900 mb-2">📌 Riassunto</h3>
              <p className="text-blue-800 text-sm">
                L'attività fisica regolare migliora la salute cardiovascolare, rafforza muscoli e ossa,
                aiuta a gestire il peso, riduce stress e ansia, e migliora la qualità del sonno.
                Bastano 30 minuti al giorno per iniziare a vedere i benefici.
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-10 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">#fitness</span>
              <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">#benessere</span>
              <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">#salute</span>
              <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">#attivitàfisica</span>
              <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">#lifestyle</span>
            </div>
          </div>

          {/* Share */}
          <div className="mt-8 flex items-center gap-4">
            <span className="text-sm text-gray-500">Condividi:</span>
            <div className="flex gap-2">
              <button className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700 transition">f</button>
              <button className="w-8 h-8 bg-sky-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-sky-600 transition">t</button>
              <button className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-green-600 transition">w</button>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <section className="mt-16">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Articoli correlati</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "10 esercizi da fare a casa senza attrezzi", category: "Fitness", emoji: "💪" },
              { title: "Alimentazione sana: i cibi da privilegiare", category: "Nutrizione", emoji: "🥗" },
              { title: "Come migliorare la qualità del sonno", category: "Lifestyle", emoji: "😴" },
            ].map((article, i) => (
              <a key={i} href="#" className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="text-3xl mb-3">{article.emoji}</div>
                <span className="text-xs text-green-600 font-semibold">{article.category}</span>
                <h4 className="font-semibold text-gray-800 mt-1 text-sm leading-snug">{article.title}</h4>
              </a>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center text-sm text-gray-500">
            <p className="mb-2">© 2024 Benessere & Salute - Tutti i diritti riservati</p>
            <div className="flex justify-center gap-4">
              <a href="#" className="hover:text-gray-700">Privacy Policy</a>
              <a href="#" className="hover:text-gray-700">Cookie Policy</a>
              <a href="#" className="hover:text-gray-700">Contatti</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
