"use client";

import { useState, useEffect, useRef } from "react";

/* ───────────────────────── Hero Badge ───────────────────────── */

function HeroBadge() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const viewersRef = useRef(Math.floor(Math.random() * (70 - 9 + 1)) + 9);

  const messages = [
    "Ultimi pezzi disponibili",
    "Consegna Gratuita oggi",
    `${viewersRef.current} persone stanno visualizzando ora`,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => {
          const next = (prev + 1) % 3;
          if (next === 2) {
            viewersRef.current = Math.max(9, Math.min(70, viewersRef.current + Math.floor(Math.random() * 7) - 3));
          }
          return next;
        });
        setVisible(true);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentMessages = [
    messages[0],
    messages[1],
    `${viewersRef.current} persone stanno visualizzando ora`,
  ];

  return (
    <div
      className={`absolute bottom-3 right-3 z-10 max-w-fit rounded-lg bg-amber-500/80 px-3 py-2 text-center text-xs font-bold text-white backdrop-blur-sm transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {currentMessages[index]}
    </div>
  );
}

/* ───────────────────────── Hero Gallery ───────────────────────── */

const THUMBS_VISIBLE = 5;

export function HeroGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);
  const [thumbStart, setThumbStart] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const total = images.length;

  // Keep active thumb visible in the sliding window
  useEffect(() => {
    if (active < thumbStart) setThumbStart(active);
    else if (active >= thumbStart + THUMBS_VISIBLE) setThumbStart(active - THUMBS_VISIBLE + 1);
  }, [active, thumbStart]);

  // Autoplay every 3s
  useEffect(() => {
    if (!autoplay || total <= 1) return;
    const id = setInterval(() => {
      setActive((a) => (a === total - 1 ? 0 : a + 1));
    }, 3000);
    return () => clearInterval(id);
  }, [autoplay, total]);

  const prev = () => { setAutoplay(false); setActive((a) => (a === 0 ? total - 1 : a - 1)); };
  const next = () => { setAutoplay(false); setActive((a) => (a === total - 1 ? 0 : a + 1)); };

  if (total === 0) return null;

  const visibleThumbs = images.slice(thumbStart, thumbStart + THUMBS_VISIBLE);

  return (
    <div className="md:sticky md:top-24">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <img
          key={active}
          src={images[active]}
          alt={`Indestructible - Foto ${active + 1}`}
          className="h-full w-full object-contain animate-fade-in"
        />
        <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
          -50%
        </span>
        {/* Prev / Next */}
        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-gray-700 shadow-sm backdrop-blur-sm transition hover:bg-white" aria-label="Immagine precedente">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-gray-700 shadow-sm backdrop-blur-sm transition hover:bg-white" aria-label="Immagine successiva">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <HeroBadge />
      </div>
      {/* Thumbnails (mobile): max 5 with sliding window */}
      <div className="mt-3 flex items-center gap-1.5 md:hidden">
        {total > THUMBS_VISIBLE && (
          <button
            onClick={() => setThumbStart((s) => Math.max(0, s - 1))}
            disabled={thumbStart === 0}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition hover:bg-gray-200 disabled:opacity-30"
            aria-label="Miniature precedenti"
          >
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        )}
        <div className="grid flex-1 grid-cols-5 gap-1.5">
          {visibleThumbs.map((src, i) => {
            const realIndex = thumbStart + i;
            return (
              <button
                key={realIndex}
                onClick={() => setActive(realIndex)}
                className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                  realIndex === active ? "border-teal-600 ring-2 ring-teal-600/20" : "border-gray-200"
                }`}
              >
                <img src={src} alt={`Miniatura ${realIndex + 1}`} className="h-full w-full object-cover" loading="lazy" />
              </button>
            );
          })}
        </div>
        {total > THUMBS_VISIBLE && (
          <button
            onClick={() => setThumbStart((s) => Math.min(total - THUMBS_VISIBLE, s + 1))}
            disabled={thumbStart >= total - THUMBS_VISIBLE}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition hover:bg-gray-200 disabled:opacity-30"
            aria-label="Miniature successive"
          >
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        )}
      </div>
      {/* Thumbnails (desktop) */}
      <div className="mt-3 hidden items-center gap-1.5 md:flex">
        {/* Thumb prev */}
        {total > THUMBS_VISIBLE && (
          <button
            onClick={() => setThumbStart((s) => Math.max(0, s - 1))}
            disabled={thumbStart === 0}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition hover:bg-gray-200 disabled:opacity-30"
            aria-label="Miniature precedenti"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        )}
        <div className="grid flex-1 grid-cols-5 gap-2">
          {visibleThumbs.map((src, i) => {
            const realIndex = thumbStart + i;
            return (
              <button
                key={realIndex}
                onClick={() => setActive(realIndex)}
                className={`aspect-square overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                  realIndex === active ? "border-teal-600 ring-2 ring-teal-600/20 shadow-sm" : "border-gray-200 hover:border-teal-300"
                }`}
              >
                <img src={src} alt={`Miniatura ${realIndex + 1}`} className="h-full w-full object-cover" loading="lazy" />
              </button>
            );
          })}
        </div>
        {/* Thumb next */}
        {total > THUMBS_VISIBLE && (
          <button
            onClick={() => setThumbStart((s) => Math.min(total - THUMBS_VISIBLE, s + 1))}
            disabled={thumbStart >= total - THUMBS_VISIBLE}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition hover:bg-gray-200 disabled:opacity-30"
            aria-label="Miniature successive"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        )}
      </div>
    </div>
  );
}



/* ───────────────────────── LP Reviews ───────────────────────── */

const lpReviewData = [
  { batch: 1, av: "M", name: "Marco G.", meta: "✓ Verificato · Roma", stars: "★★★★★", text: "Lavoro in cantiere 8 ore al giorno. Prima arrivavo a casa distrutto con i piedi a pezzi. Con le Indestructible zero dolore e pesano la metà dei miei vecchi scarponi. Mi hanno davvero cambiato la giornata." },
  { batch: 1, av: "C", name: "Carlo R.", meta: "✓ Verificato · Milano", stars: "★★★★★", text: "Lavoro in officina e servivano scarpe resistenti ma leggere. Le Indestructible sono perfette: puntale in acciaio ma pesano come delle sneaker. Ne ordino un altro paio." },
  { batch: 1, av: "L", name: "Luca P.", meta: "✓ Verificato · Napoli", stars: "★★★★★", text: "All'inizio non ci credevo che fossero antinfortunistiche, sono troppo leggere. Ma il puntale in acciaio c'è eccome. Comodissime per lavorare tutto il giorno. Le consiglio a tutti." },
  { batch: 2, av: "A", name: "Andrea M.", meta: "✓ Verificato · Torino", stars: "★★★★★", text: "Lavoro in magazzino con carrelli e bancali. Con queste scarpe i piedi sono protetti e non sudo neanche d'estate. Il mesh traspirante funziona davvero. Magari le avessi scoperte prima." },
  { batch: 2, av: "P", name: "Paolo S.", meta: "✓ Verificato · Firenze", stars: "★★★★★", text: "I colleghi non credevano fossero scarpe antinfortunistiche! Sono leggere e comode ma proteggono alla grande. Il puntale ha già resistito a un pezzo di ferro caduto. Comprerò un paio anche per mio fratello." },
  { batch: 2, av: "R", name: "Roberto T.", meta: "✓ Verificato · Bologna", stars: "★★★★☆", text: "Arrivate in 2 giorni con GLS, comode fin da subito. Sto aspettando di testarle bene in cantiere. Per ora la leggerezza e il grip sono eccezionali. Metto 4 stelle e aggiorno presto." },
  { batch: 3, av: "I", name: "Ivan D.", meta: "✓ Verificato · Palermo", stars: "★★★★★", text: "Lavoro in magazzino e cammino più di 10km al giorno. Con le Indestructible zero dolore ai piedi per la prima volta in anni. L'ammortizzazione si sente davvero. Le consiglio a tutti i colleghi." },
  { batch: 3, av: "E", name: "Enrico V.", meta: "✓ Verificato · Bari", stars: "★★★★★", text: "Pensavo fosse marketing ma sono davvero indistruttibili. Le uso in cantiere ogni giorno, pioggia e fango, e dopo un mese sono come nuove. Entusiasta." },
  { batch: 3, av: "S", name: "Stefano F.", meta: "✓ Verificato · Verona", stars: "★★★★★", text: "Rapporto qualità-prezzo eccezionale al 50% di sconto. Ordinato con contrassegno, arrivate in 2 giorni con GLS. Super comode dal primo momento, piede fresco tutto il giorno. Molto contento." },
];

export function LpReviews() {
  const [visibleBatch, setVisibleBatch] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <>
      <div className="lp-revs">
        {lpReviewData.filter((r) => r.batch <= visibleBatch).map((r, i) => (
          <div key={i} className="lp-rev">
            <div className="lp-rev-h">
              <div className="lp-rev-av">{r.av}</div>
              <div>
                <div className="lp-rev-name">{r.name}</div>
                <div className="lp-rev-meta">{r.meta}</div>
                <div className="lp-rev-stars">{r.stars}</div>
              </div>
            </div>
            <p>{r.text}</p>
          </div>
        ))}
      </div>

      {visibleBatch < 3 && (
        <button className="lp-revs-more" onClick={() => setVisibleBatch((b) => b + 1)}>
          Mostra altre recensioni ▾
        </button>
      )}

      <div className="lp-rev-form-wrap">
        {!formSubmitted ? (
          <>
            <h3>Lascia la tua recensione</h3>
            <form onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }}>
              <div className="lp-rev-field">
                <label htmlFor="lp-rv-name">Nome *</label>
                <input type="text" id="lp-rv-name" placeholder="Il tuo nome" required />
              </div>
              <div className="lp-rev-field">
                <label>Punteggio *</label>
                <div className="lp-star-select">
                  <input type="radio" id="lp-s5" name="lp-rating" value="5" required /><label htmlFor="lp-s5">★</label>
                  <input type="radio" id="lp-s4" name="lp-rating" value="4" /><label htmlFor="lp-s4">★</label>
                  <input type="radio" id="lp-s3" name="lp-rating" value="3" /><label htmlFor="lp-s3">★</label>
                  <input type="radio" id="lp-s2" name="lp-rating" value="2" /><label htmlFor="lp-s2">★</label>
                  <input type="radio" id="lp-s1" name="lp-rating" value="1" /><label htmlFor="lp-s1">★</label>
                </div>
              </div>
              <div className="lp-rev-field">
                <label htmlFor="lp-rv-text">La tua recensione *</label>
                <textarea id="lp-rv-text" placeholder="Raccontaci la tua esperienza con le Indestructible..." required />
              </div>
              <button type="submit" className="lp-rev-submit">Invia recensione</button>
            </form>
          </>
        ) : (
          <div className="lp-rev-success" style={{ display: "block" }}>
            <div className="lp-rev-success-ic">✅</div>
            <p><b>Grazie per la tua recensione!</b><br />La tua recensione è in fase di revisione. Verrà pubblicata una volta verificata la sua autenticità.</p>
          </div>
        )}
      </div>
    </>
  );
}

/* ───────────────────────── LP FAQ ───────────────────────── */

const lpFaqData = [
  { q: "Come funziona il pagamento in contrassegno?", a: "Fai l'ordine online, ti contattiamo via WhatsApp per confermare. Se non hai WhatsApp, ti chiamiamo per telefono. Il pacco parte con GLS e paghi in contanti al corriere. Senza carta né anticipi." },
  { q: "Quanto tempo ci vuole per la consegna?", a: "Spediamo con corriere espresso GLS. Consegna stimata 24-48 ore lavorative dopo la conferma dell'ordine." },
  { q: "Come scelgo la taglia giusta?", a: "La Indestructible calza regolare. Se sei tra due taglie, scegli quella più grande. Scrivici su WhatsApp dopo l'ordine se hai dubbi." },
  { q: "Sono davvero resistenti come scarponi tradizionali?", a: "Sì, il puntale in acciaio europeo e la suola anti-perforazione offrono la stessa protezione di uno scarpone pesante, ma con il 50% del peso in meno. Materiali di grado militare testati per resistere a impatti e usura." },
  { q: "Posso usarle tutto il giorno?", a: "Sì, sono progettate per turni di lavoro prolungati. Il mesh traspirante mantiene i piedi freschi anche dopo 10 ore in piedi." },
  { q: "Posso restituirle se non mi piacciono?", a: "Hai 30 giorni dalla consegna. Scrivici con il tuo numero d'ordine. Rispondiamo entro 24 ore. Soddisfatti o rimborsati." },
  { q: "Posso usare il mio plantare personalizzato?", a: "Sì, la soletta è estraibile. Puoi sostituirla con il tuo plantare personalizzato senza problemi." },
];

export function LpFaq() {
  return (
    <>
      {lpFaqData.map((item, i) => (
        <details key={i} className="lp-faq">
          <summary>{item.q}</summary>
          <div className="lp-faq-b">{item.a}</div>
        </details>
      ))}
    </>
  );
}

/* ───────────────────────── Sticky Order Button ───────────────────────── */

export function StickyOrderButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let io: IntersectionObserver | null = null;

    const setup = () => {
      const orderBtn = document.getElementById("ordina");
      const footer = document.querySelector("footer");
      if (!orderBtn) {
        requestAnimationFrame(setup);
        return;
      }

      let btnPassed = false;
      let footerVisible = false;

      const update = () => setShow(btnPassed && !footerVisible);

      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.target === orderBtn) {
              btnPassed = !entry.isIntersecting && entry.boundingClientRect.top < 0;
            } else if (entry.target === footer) {
              footerVisible = entry.isIntersecting;
            }
          }
          update();
        },
        { threshold: 0 }
      );

      io.observe(orderBtn);
      if (footer) io.observe(footer);
    };

    setup();
    return () => { if (io) io.disconnect(); };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 flex items-center justify-between bg-white px-4 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
      <span className="flex items-center gap-2">
        <span className="text-lg font-extrabold text-gray-900">€49,99</span>
        <span className="text-sm font-medium text-gray-400 line-through">€99,98</span>
      </span>
      <a
        href="#taglie"
        style={{ background: "linear-gradient(to bottom, #f0a030, #d48806)" }}
        className="rounded-full px-6 py-3 text-sm font-extrabold text-white shadow-[0_4px_12px_rgba(180,120,0,0.3)] active:scale-[0.97]"
      >
        Ordina Ora
      </a>
    </div>
  );
}
