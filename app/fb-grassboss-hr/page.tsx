'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  CheckCircle2,
  Star,
  Truck,
  ShieldCheck,
  Clock,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Package,
  User,
  Phone,
  MapPin,
  Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-2xl flex items-center gap-2">
      <Clock size={24} />
      <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
    </div>
  );
};

const TopBar = () => (
  <div className="bg-black text-white py-2 px-4 text-center font-bold text-lg uppercase tracking-wider">
    {"GRASSBOSS\u2122 PRO Series \u2014 Super Bundle ULTRA"}
  </div>
);

const Hero = () => (
  <section className="py-8 px-4 bg-white border-b border-gray-200">
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl md:text-6xl font-black text-black mb-4 leading-tight">
        {"\u201CHODATE i travnjak se ure\u0111uje: savr\u0161eni rubovi bez saginjanja.\u201D"}
      </h1>
      <p className="text-xl md:text-2xl text-gray-700 mb-6 font-medium">
        {"Trimer 3-u-1 s PRO KOTA\u010CIMA + Blade System PRO + 2 baterije 21V: izgleda kao profesionalni alat (ali ga koristi svatko)."}
      </p>

      <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
        <div className="flex items-center gap-1 text-yellow-500">
          {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={24} />)}
        </div>
        <span className="text-xl font-bold text-black">{"4,7/5 \u2014 \u201CPreporuka tisu\u0107a ljubitelja vrta\u201D"}</span>
        <span className="bg-black text-white px-3 py-1 rounded text-sm font-bold uppercase">Best Seller</span>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="relative">
          <img
            src="/images/grassboss/main.webp"
            alt="GrassBoss Pro"
            className="w-full rounded-2xl shadow-2xl border-4 border-black"
          />
          <div className="absolute top-4 right-4 bg-red-600 text-white p-4 rounded-full font-black text-2xl shadow-lg transform rotate-12">
            -60%
          </div>
        </div>

        <div className="text-left space-y-4">
          <ul className="space-y-3">
            {[
              "PRO kota\u010Di: ravno rezanje \u201Ckao mini-kosilica\u201D",
              "3-u-1: Trimer + Rubnik + Na\u010Din s kota\u010Dima",
              "Blade System PRO: trava/grmlje/gran\u010Dice s posebnim no\u017Eevima",
              "2 baterije 21V: radite bez pauza",
              "Teleskopska \u0161ipka: \u010Duvajte le\u0111a, uspravan polo\u017Eaj",
              "Struktura legura + ABS: napravljena za trajnost"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-xl font-bold text-black">
                <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={28} />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-red-600 mt-6">
            <div className="text-gray-500 line-through text-2xl font-bold">{"Redovna cijena: 199,00 \u20AC"}</div>
            <div className="text-5xl font-black text-red-600 mb-2">{"79,99 \u20AC"}</div>
            <div className="text-xl font-black text-red-600 animate-pulse uppercase">
              SAMO DANAS -60% - Promocija do isteka zaliha
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <a href="#order" className="bg-green-600 hover:bg-green-700 text-white text-3xl font-black py-6 px-8 rounded-2xl text-center shadow-xl transform transition hover:scale-105 uppercase">
              {"NARU\u010CITE SADA \u2013 PLA\u0106ANJE POUZ\u0106EM"}
            </a>
            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-gray-700 font-bold">
              <div className="flex items-center gap-2"><Truck size={24} /> Dostava 24/48h</div>
              <div className="flex items-center gap-2"><ShieldCheck size={24} /> Jamstvo 1 godina</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const DemoGrid = () => {
  const items = [
    { title: "PRO KOTA\u010CI", desc: "dvostruki na\u010Din s kota\u010Dima + stabilno vo\u0111enje", expl: "Hodate i re\u017Eete ravno, manje drhtanja, br\u017Ee.", img: "/images/grassboss/ruote.jpg" },
    { title: "3-U-1", desc: "trimer + rubnik + \u201Cpomo\u0107 pri ko\u0161nji\u201D", expl: "Jedan alat, nula zabune, nula dodatnih tro\u0161kova.", img: "/images/grassboss/utilizzi.webp" },
    { title: "BLADE SYSTEM PRO", desc: "najlon / metal / disk", expl: "Odaberite pravi no\u017E i zavr\u0161ite \u010Dak i grmlje i gran\u010Dice.", img: "/images/grassboss/varie%20lame.webp" },
    { title: "BRZA ZAMJENA NO\u017DA", desc: "brzi sustav (bez iskustva)", expl: "U nekoliko sekundi prelazite s trave na grmlje.", img: "/images/grassboss/cambio%20lama.png" },
    { title: "2 BATERIJE 21V", desc: "dvostruka baterija uklju\u010Dena", expl: "Nastavljate raditi bez \u201Czaustavljanja na pola vrta\u201D.", img: "/images/grassboss/batteria%20e%20caricabatterie.png" },
    { title: "TELESKOPSKA VISINA", desc: "88\u2013119 cm podesiva", expl: "Prestanite se saginjati, radite opu\u0161tenije.", img: "/images/grassboss/asta%20allungabile.webp" },
    { title: "PRO STRUKTURA", desc: "\u0161ipka od legure + ABS otporno tijelo", expl: "Traje dugo, ne izgleda kao igra\u010Dka.", img: "/images/grassboss/weed-cutter-main-4.webp" },
    { title: "VODI\u010C ZA SVAKOGA", desc: "priru\u010Dnik + QR video", expl: "Sastavite i krenite \u010Dak i ako je ovo va\u0161 prvi elektri\u010Dni alat.", img: "/images/grassboss/aggiusta%20direzione.jpg" },
  ];

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-center mb-12 uppercase">{"Za\u0161to je broj 1"}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow-md border border-gray-200 flex flex-col">
              <img
                src={item.img}
                alt={item.title}
                className="w-full aspect-square object-cover rounded-lg mb-4 border-2 border-black"
              />
              <h3 className="text-xl font-black mb-1">{item.title}</h3>
              <p className="text-sm font-bold text-gray-600 mb-2 uppercase">{item.desc}</p>
              <p className="text-base text-gray-800 font-medium">{item.expl}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProblemAgitation = () => (
  <section className="py-16 px-4 bg-white">
    <div className="max-w-3xl mx-auto">
      <h2 className="text-4xl md:text-6xl font-black text-black mb-8 text-center uppercase">{"Umorni ste od\u2026"}</h2>
      <ul className="space-y-6 mb-10">
        {[
          "rezanja trave i ru\u017Enih, neurednih rubova?",
          "saginjanja 100 puta i zavr\u0161avanja s bolnim le\u0111ima i ramenima?",
          "kupovanja no\u017Eeva/rezervnih dijelova svaki tjedan jer se \u201Clome\u201D?",
          "va\u0111enja 3 razli\u010Dita alata za pristojno obavljen posao?"
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-4 text-2xl font-bold text-gray-800">
            <AlertTriangle className="text-red-600 flex-shrink-0 mt-1" size={32} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="bg-red-50 p-8 rounded-2xl border-l-8 border-red-600">
        <p className="text-2xl font-black text-black italic">
          {"Nije va\u0161a krivica. Mnogi jeftini trimeri vibriraju, imaju slabe no\u017Eeve i prisiljavaju vas da \u201Cgurate\u201D silom."}
        </p>
      </div>
    </div>
  </section>
);

const Solution = () => (
  <section className="py-16 px-4 bg-black text-white">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase">{"RJE\u0160ENJE"}</h2>
      <p className="text-4xl md:text-6xl font-black text-green-500 mb-8 leading-tight">
        {"Evo GRASSBOSS\u2122 PRO Series \u2013 Super Bundle ULTRA"}
      </p>
      <p className="text-2xl md:text-3xl font-bold mb-12">
        {"Trimer koji \u201Choda s vama\u201D: kota\u010Di + 3-u-1 + Blade System PRO."}
      </p>

      <div className="grid md:grid-cols-3 gap-8 text-left">
        {[
          "Zavr\u0161ite vrt u pola vremena jer re\u017Eete ravno, bez ponavljanja.",
          "Radite opu\u0161tenije jer pode\u0161avate visinu i ne saginjete se.",
          "Prelazite s trave na grmlje s pravim no\u017Eem, a ne s \u201Cnadom i molitvama\u201D."
        ].map((text, i) => (
          <div key={i} className="bg-white/10 p-6 rounded-2xl border border-white/20">
            <div className="text-green-500 mb-4"><CheckCircle2 size={40} /></div>
            <p className="text-xl font-bold leading-snug">{text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section className="py-16 px-4 bg-white">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-black text-center mb-12 uppercase">{"KAKO FUNKCIONIRA (3 jednostavna koraka)"}</h2>
      <div className="grid md:grid-cols-3 gap-12">
        {[
          { step: "1", title: "Odaberite no\u017E", desc: "(trava / grmlje / gran\u010Dice) + stavite \u0161titnik", img: "/images/grassboss/varie%20lame.webp" },
          { step: "2", title: "Umetnite bateriju", desc: "i podesite visinu", img: "/images/grassboss/batteria%20e%20caricabatterie.png" },
          { step: "3", title: "Hodajte i ure\u0111ujte", desc: "travnjak, rubove, te\u0161ke kutove", img: "/images/grassboss/bordi.png" }
        ].map((item, i) => (
          <div key={i} className="text-center">
            <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-4xl font-black mx-auto mb-6">
              {item.step}
            </div>
            <h3 className="text-2xl font-black mb-2">{item.title}</h3>
            <p className="text-xl font-bold text-gray-600">{item.desc}</p>
            <img
              src={item.img}
              alt={item.title}
              className="w-full aspect-square object-cover rounded-2xl mt-6 border-4 border-gray-100"
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

const PriceAnchorComparison = () => (
  <section className="py-16 px-4 bg-gray-50">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-black text-center mb-12 uppercase">MI vs KONKURENCIJA</h2>
      <div className="overflow-hidden rounded-3xl border-4 border-black shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black text-white">
              <th className="p-6 text-2xl font-black border-r border-white/20">KARAKTERISTIKA</th>
              <th className="p-6 text-2xl font-black border-r border-white/20">OSTALI</th>
              <th className="p-6 text-2xl font-black bg-green-600">MI (GRASSBOSS)</th>
            </tr>
          </thead>
          <tbody className="bg-white text-xl font-bold">
            <tr className="border-b border-gray-200">
              <td className="p-6 border-r border-gray-200">Napajanje</td>
              <td className="p-6 border-r border-gray-200 text-red-600">{"Te\u0161ki benzin, dimovi, buka"}</td>
              <td className="p-6 bg-green-50 text-green-700">{"Elektri\u010Dno, lagano, 2 baterije uklju\u010Dene"}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-6 border-r border-gray-200">Preciznost</td>
              <td className="p-6 border-r border-gray-200 text-red-600">Neprecizan rad, vibracije</td>
              <td className="p-6 bg-green-50 text-green-700">{"PRO kota\u010Di + 3-u-1: ravno rezanje"}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-6 border-r border-gray-200">Trajnost</td>
              <td className="p-6 border-r border-gray-200 text-red-600">{"Jeftini no\u017Eevi koji se lome"}</td>
              <td className="p-6 bg-green-50 text-green-700">{"Blade System PRO: \u010Delik i legura"}</td>
            </tr>
            <tr>
              <td className="p-6 border-r border-gray-200">Vrijednost</td>
              <td className="p-6 border-r border-gray-200 text-red-600">Visoka cijena za nisku kvalitetu</td>
              <td className="p-6 bg-green-50 text-green-700">{"Izgleda kao alat 10x ve\u0107e cijene"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

const BundleValue = () => (
  <section className="py-16 px-4 bg-white">
    <div className="max-w-4xl mx-auto">
      <div className="bg-black text-white p-10 rounded-3xl border-8 border-green-600 shadow-2xl">
        <h2 className="text-4xl md:text-6xl font-black text-center mb-10 uppercase">BUNDLE (Neodoljiva ponuda)</h2>
        <p className="text-2xl font-bold text-center mb-12 uppercase tracking-widest">U Super Bundle ULTRA pronalazite:</p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <ul className="space-y-4">
            {[
              { text: "Trimer 3-u-1 s PRO kota\u010Dima", val: "Uklju\u010Deno" },
              { text: "2 baterije 21V", val: "Vrijednost \u20AC30" },
              { text: "Brzi punja\u010D", val: "Vrijednost \u20AC15" },
              { text: "Blade System PRO: diskovi + metal + najlon + \u010Detka za korov", val: "Vrijednost \u20AC25" },
              { text: "Tvrda torba", val: "Vrijednost \u20AC20" },
              { text: "Nao\u010Dale + Rukavice", val: "Vrijednost \u20AC10" },
              { text: "Digitalni bonus", val: "Vrijednost \u20AC10" }
            ].map((item, i) => (
              <li key={i} className="flex justify-between items-start gap-4 text-xl font-bold border-b border-white/20 pb-2">
                <span className="flex items-center gap-2"><Package className="text-green-500 flex-shrink-0" size={24} /> {item.text}</span>
                <span className="text-green-500 flex-shrink-0">{item.val}</span>
              </li>
            ))}
          </ul>
          <div className="relative">
            <img
              src="/images/grassboss/valigetta.png"
              alt="Bundle"
              className="w-full rounded-2xl border-4 border-white"
            />
            <div className="absolute -bottom-6 -right-6 bg-red-600 p-6 rounded-2xl text-center shadow-2xl transform -rotate-3">
              <div className="text-xl font-bold line-through opacity-70">{"Vrijednost: 199 \u20AC"}</div>
              <div className="text-4xl font-black">{"DANAS 79,99 \u20AC"}</div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-3xl font-black text-green-500 mb-6 uppercase">{"Ukupna vrijednost: 199 \u20AC \u2192 Danas ga dobivate za 79,99 \u20AC (pla\u0107anje pouz\u0107em)"}</p>
          <a href="#order" className="inline-block bg-green-600 hover:bg-green-700 text-white text-4xl font-black py-8 px-12 rounded-2xl shadow-xl transform transition hover:scale-105 uppercase">
            UZMITE BUNDLE SADA
          </a>
        </div>
      </div>
    </div>
  </section>
);

const SpecsTable = () => (
  <section className="py-16 px-4 bg-gray-50">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-black text-center mb-12 uppercase">{"SPECIFIKACIJE KOJE SU VA\u017DNE"}</h2>
      <div className="bg-white rounded-3xl border-4 border-black overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-6 text-2xl font-black border-b-4 border-black">Specifikacija</th>
              <th className="p-6 text-2xl font-black border-b-4 border-black">{"\u0160to to zna\u010Di za vas"}</th>
            </tr>
          </thead>
          <tbody className="text-xl font-bold">
            {[
              ["3-u-1 (trimer/rubnik/kota\u010Di)", "radite sve jednim alatom"],
              ["Podesiva visina 88\u2013119 cm", "manje boli u le\u0111ima"],
              ["2 baterije 21V uklju\u010Dene", "kontinuirani rad"],
              ["Autonomija po bateriji 30\u201345 min", "prosje\u010Dan vrt bez stresa"],
              ["Set no\u017Eeva od vi\u0161e materijala", "trava/grmlje/gran\u010Dice"],
              ["Struktura legura + ABS tijelo", "ve\u0107a trajnost, manje lomova"],
              ["Brza zamjena no\u017Ea", "od ure\u0111ivanja do grmlja u trenu"],
              ["Vodi\u010D za postavljanje + QR video", "koristite ga \u010Dak i ako ste po\u010Detnik"]
            ].map(([spec, mean], i) => (
              <tr key={i} className="border-b border-gray-200 last:border-0 hover:bg-gray-50 transition">
                <td className="p-6 border-r border-gray-200">{spec}</td>
                <td className="p-6">{mean}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

const Reviews = () => (
  <section className="py-16 px-4 bg-white">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-black text-center mb-12 uppercase">{"\u0160TO KA\u017DU KUPCI"}</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {[
          { name: "Ivan K.", loc: "Zagreb", text: "S kota\u010Dima kona\u010Dno re\u017Eem rubove ravno." },
          { name: "Marko P.", loc: "Split", text: "Dvije baterije: nikad ne stanem na pola posla." },
          { name: "Ana S.", loc: "Rijeka", text: "Sastavljeno u par minuta pomo\u0107u videa." },
          { name: "Petar D.", loc: "Osijek", text: "Metal traje vi\u0161e od plastike koju sam imao prije." }
        ].map((rev, i) => (
          <div key={i} className="bg-gray-50 p-8 rounded-3xl border-2 border-gray-200 relative">
            <div className="flex text-yellow-500 mb-4">
              {[...Array(5)].map((_, j) => <Star key={j} fill="currentColor" size={20} />)}
            </div>
            <p className="text-2xl font-bold text-black mb-4">{"\u201C"}{rev.text}{"\u201D"}</p>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-black">
                {rev.name[0]}
              </div>
              <span className="text-lg font-black">{rev.name}, {rev.loc} {"(Potvr\u0111ena kupnja)"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: "Re\u017Ee li i grmlje i gran\u010Dice?", a: "Da, s diskom i posebnim metalnim no\u017Eevima." },
    { q: "Koliko traje baterija?", a: "Ovisi o poslu: orijentacijski 30\u201345 min po bateriji (s 2 baterije radite puno dulje)." },
    { q: "Je li te\u0161ko za sastaviti?", a: "Ne: 3 koraka + QR video vodi\u010D." },
    { q: "Mogu li ga koristiti ako imam probleme s le\u0111ima?", a: "Da: podesiva visina + kota\u010Di = manje saginjanja." },
    { q: "Je li siguran blizu zidova i kamenja?", a: "\u0160titnik od kamenja + vi\u0161e kontrole s kota\u010Dima (i dajemo vam sigurnosni set)." }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-12 uppercase">{"\u010CESTO POSTAVLJENA PITANJA"}</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border-2 border-black overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full p-6 text-left flex justify-between items-center text-2xl font-black hover:bg-gray-50 transition"
              >
                <span>P: {faq.q}</span>
                {open === i ? <ChevronUp size={32} /> : <ChevronDown size={32} />}
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-xl font-bold text-gray-700 border-t border-gray-100">
                      O: {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const OrderForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', tel: '', address: '' });
  const [fingerprint, setFingerprint] = useState('');
  const [ipAddress, setIpAddress] = useState('');

  useEffect(() => {
    const getFingerprint = async () => {
      try {
        const components = [
          navigator.userAgent,
          navigator.language,
          screen.width + 'x' + screen.height,
          screen.colorDepth,
          new Date().getTimezoneOffset(),
          navigator.hardwareConcurrency,
          navigator.platform
        ];
        const raw = components.join('|');
        const encoder = new TextEncoder();
        const data = encoder.encode(raw);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        setFingerprint(hashArray.map(b => b.toString(16).padStart(2, '0')).join(''));
      } catch {
        // fingerprint failed, will use IP fallback
      }
    };
    const getIp = async () => {
      try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        setIpAddress(data.ip);
      } catch {
        // IP fetch failed
      }
    };
    getFingerprint();
    getIp();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const body = new URLSearchParams();
      body.append('uid', '0198088f-a4bc-7ed8-89aa-83089fe0180e');
      body.append('key', 'ec15cab563da6cf51f0c7c');
      body.append('offer', '627');
      body.append('lp', '627');
      body.append('name', formData.name);
      body.append('tel', formData.tel);
      body.append('street-address', formData.address);

      if (fingerprint) {
        body.append('tmfp', fingerprint);
      } else {
        if (ipAddress) body.append('ip', ipAddress);
        body.append('ua', navigator.userAgent);
      }

      const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'subid', 'subid2', 'subid3', 'subid4', 'pubid'];
      utmParams.forEach(param => {
        const val = searchParams.get(param);
        if (val) body.append(param, val);
      });

      await fetch('https://offers.supertrendaffiliateprogram.com/forms/api/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        mode: 'no-cors',
      });

      router.push('/fb-grassboss-hr/ty');
    } catch {
      router.push('/fb-grassboss-hr/ty');
    }
  };

  return (
    <section id="order" className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <h2 className="text-4xl md:text-6xl font-black uppercase leading-tight">{"OBRAZAC ZA NARUD\u017DBU"}</h2>
          <div className="flex items-center gap-6 bg-red-50 p-6 rounded-2xl border-2 border-red-600">
            <Timer />
            <div className="text-2xl font-black text-red-600 uppercase">{"Promocija isti\u010De"}</div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-2xl font-bold"><Truck className="text-green-600" /> Besplatna dostava</div>
            <div className="flex items-center gap-3 text-2xl font-bold"><ShieldCheck className="text-green-600" /> {"Pla\u0107anje pouz\u0107em"}</div>
            <div className="flex items-center gap-3 text-2xl font-bold"><Star className="text-yellow-500" /> Jamstvo zadovoljstva</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-3xl border-4 border-black shadow-2xl space-y-6">
          <div>
            <label className="block text-xl font-black mb-2 uppercase flex items-center gap-2"><User size={20} /> Ime i prezime</label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={"Unesite va\u0161e puno ime"}
              className="w-full p-5 text-xl font-bold rounded-xl border-2 border-gray-300 focus:border-black outline-none transition"
            />
          </div>
          <div>
            <label className="block text-xl font-black mb-2 uppercase flex items-center gap-2"><Phone size={20} /> Telefon</label>
            <input
              required
              type="tel"
              value={formData.tel}
              onChange={(e) => setFormData({ ...formData, tel: e.target.value })}
              placeholder={"Va\u0161 broj za dostavu"}
              className="w-full p-5 text-xl font-bold rounded-xl border-2 border-gray-300 focus:border-black outline-none transition"
            />
          </div>
          <div>
            <label className="block text-xl font-black mb-2 uppercase flex items-center gap-2"><MapPin size={20} /> Potpuna adresa</label>
            <textarea
              required
              rows={4}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder={"Ulica, ku\u0107ni broj, grad, po\u0161tanski broj"}
              className="w-full p-5 text-xl font-bold rounded-xl border-2 border-gray-300 focus:border-black outline-none transition"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-green-600 hover:bg-green-700 text-white text-3xl font-black py-8 rounded-2xl shadow-xl transform transition hover:scale-105 uppercase disabled:opacity-50"
          >
            {status === 'submitting' ? 'SLANJE U TIJEKU...' : "NARU\u010CITE SADA \u2013 PLA\u0106ANJE POUZ\u0106EM"}
          </button>
          <p className="text-center text-gray-500 font-bold">{"Va\u0161i podaci su sigurni"}</p>
        </form>
      </div>
    </section>
  );
};

const StickyBottomBar = () => (
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-black p-4 z-50 md:hidden flex items-center justify-between gap-4 shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
    <div className="flex flex-col">
      <span className="text-gray-500 line-through font-bold text-sm">{"199,00 \u20AC"}</span>
      <span className="text-3xl font-black text-red-600 leading-none">{"79,99 \u20AC"}</span>
    </div>
    <a href="#order" className="flex-1 bg-green-600 text-white text-2xl font-black py-4 rounded-xl text-center uppercase shadow-lg active:scale-95 transition">
      {"NARU\u010CITE"}
    </a>
  </div>
);

// --- Main Page ---

function LandingPageContent() {
  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-green-200 pb-24 md:pb-0">
      <TopBar />
      <Hero />
      <DemoGrid />
      <ProblemAgitation />
      <Solution />
      <HowItWorks />
      <PriceAnchorComparison />
      <BundleValue />
      <SpecsTable />
      <Reviews />
      <FAQ />
      <OrderForm />

      {/* Footer / Trust */}
      <footer className="py-12 px-4 bg-black text-white text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex flex-wrap justify-center gap-8 opacity-70">
            <div className="flex items-center gap-2"><Truck /> Dostava 24/48h</div>
            <div className="flex items-center gap-2"><ShieldCheck /> {"Pla\u0107anje pouz\u0107em"}</div>
            <div className="flex items-center gap-2"><Shield /> Jamstvo 1 godina</div>
          </div>
          <p className="text-gray-500 font-bold">{"© 2025 GRASSBOSS\u2122 PRO Series. Sva prava pridr\u017Eana."}</p>
        </div>
      </footer>

      <StickyBottomBar />
    </div>
  );
}

export default function LandingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <LandingPageContent />
    </Suspense>
  );
}
