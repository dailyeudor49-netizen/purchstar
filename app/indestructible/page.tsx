import type { Metadata } from "next";
import Script from "next/script";
import "./landing.css";
import fs from "fs";
import path from "path";
import { HeroGallery, StickyOrderButton, LpReviews, LpFaq } from "./client";
import { OrderSection } from "./OrderModal";

function getCarouselImages(): string[] {
  const dir = path.join(process.cwd(), "public/images/land/indestructible/carosello");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(webp|jpg|jpeg|png|avif)$/i.test(f))
    .sort((a, b) => parseInt(a) - parseInt(b))
    .map((f) => `/images/land/indestructible/carosello/${f}`);
}

export const metadata: Metadata = {
  title: "Indestructible - Scarpe da Lavoro Indistruttibili | Purchstar",
  description:
    "Scopri le Indestructible: scarpe da lavoro con puntale in acciaio, suola anti-perforazione e peso piuma. Leggere come sneaker, resistenti come scarponi.",
};


/* ════════════════════════════════════════════════════════════════════
   HERO SECTION
   ════════════════════════════════════════════════════════════════════ */

function HeroSection() {
  const images = getCarouselImages();
  return (
    <section className="mx-auto max-w-7xl px-4 pt-6 pb-10 md:pt-10 md:pb-14 sm:px-6 lg:px-8">
      <div className="grid items-start gap-8 md:grid-cols-2 md:gap-12">
        {/* Gallery (client) */}
        <HeroGallery images={images} />

        {/* Product Info */}
        <div>
          {/* Badges */}
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700">
              Puntale in Acciaio
            </span>
            <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
              Bestseller 2025
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-1 text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
            <span className="text-teal-700">Indestructible</span> — Scarpe da lavoro indistruttibili
          </h1>
          <p className="mb-4 text-base font-medium text-gray-500">
            Leggere come sneaker, resistenti come scarponi. Puntale in acciaio, suola anti-perforazione e comfort tutto il giorno.
          </p>

          {/* Rating */}
          <a href="#resenas" className="mb-5 flex items-center gap-2 no-underline">
            <span className="text-lg text-amber-400">★★★★★</span>
            <span className="text-sm font-extrabold text-gray-900">4,8/5</span>
            <span className="text-sm text-gray-400 underline underline-offset-2">(2.134 recensioni)</span>
          </a>

          {/* Price */}
          <div className="mb-6 flex items-baseline gap-3">
            <span className="text-4xl font-extrabold text-gray-900">€49,99</span>
            <span className="text-xl text-gray-400 line-through">€99,98</span>
            <span className="rounded-full border border-red-200 bg-red-50 px-2.5 py-0.5 text-xs font-bold text-red-600">
              -50%
            </span>
          </div>

          {/* Divider */}
          <div className="mb-6 h-px bg-gray-200" />

          {/* Feature bullets */}
          <ul className="mb-6 space-y-2.5">
            {[
              { bold: "Puntale in acciaio europeo", rest: "protezione totale delle dita da schiacciamenti e cadute" },
              { bold: "Suola anti-perforazione", rest: "materiale di grado militare che blocca chiodi e oggetti appuntiti" },
              { bold: "Flymesh traspirante", rest: "piedi asciutti e freschi anche dopo 10 ore di lavoro" },
              { bold: "Ultraleggere", rest: "pesano la metà di uno scarpone tradizionale" },
              { bold: "Antiscivolo certificata", rest: "grip avanzato su superfici bagnate e scivolose" },
              { bold: "Anti-usura", rest: "materiali resistenti progettati per durare a lungo" },
              { bold: "Flessibili e comode", rest: "distribuzione uniforme del peso su tutto il piede" },
            ].map((f) => (
              <li key={f.bold} className="border-l-[3px] border-teal-500 rounded-lg py-2.5 px-4 text-[16px] bg-white">
                <span className="text-gray-700">
                  <b className="font-bold text-gray-900">{f.bold}</b> — {f.rest}
                </span>
              </li>
            ))}
          </ul>

          {/* Order section: variant selectors + trigger + modal */}
          <OrderSection image={images[0] || ""} />

          {/* Shipping & Payment options */}
          <div className="space-y-3 rounded-xl border border-stone-200 bg-white p-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">Opzioni di Spedizione</p>
              <label className="mt-2 flex cursor-default items-center gap-3 rounded-lg border-2 border-green-500 bg-green-50/50 px-4 py-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-green-500">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-stone-900">Spedizione Express GLS</p>
                  <p className="text-[13px] text-stone-500">Consegna in 24-48h</p>
                </div>
                <span className="text-sm font-bold text-green-600">GRATUITA</span>
              </label>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">Opzioni di Pagamento</p>
              <label className="mt-2 flex cursor-default items-center gap-3 rounded-lg border-2 border-blue-500 bg-blue-50/50 px-4 py-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-blue-500">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-stone-900">Pagamento Contanti alla Consegna</p>
                  <p className="text-[13px] text-stone-500">Paghi direttamente al corriere</p>
                </div>
              </label>
            </div>
          </div>

          {/* Refund guarantee */}
          <div className="mt-3 mb-5 flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-teal-50 text-teal-600">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-sm leading-snug text-stone-600">
              <span className="font-semibold text-stone-800">Garanzia soddisfatti o rimborsati.</span> Se non ti piace, puoi richiedere un rimborso entro 30 giorni dalla consegna.
            </p>
          </div>

          {/* How it works box */}
          <div className="mb-5 rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-5 shadow-sm">
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-teal-600 sm:text-sm">Semplice e sicuro</p>
            <h3 className="mb-4 text-xl font-extrabold text-gray-900 sm:text-2xl">Come ordinare?</h3>

            <div className="mb-4 grid grid-cols-2 gap-2.5">
              {[
                { step: "1", title: "Ordina", desc: "Compila il modulo con nome, indirizzo e telefono." },
                { step: "2", title: "Conferma", desc: "Ricevi WhatsApp per confermare. Se non lo usi, ti chiamiamo." },
                { step: "3", title: "Spedizione 24–48h", desc: "Dopo la conferma il pacco parte subito con GLS. Paghi al corriere." },
                { step: "4", title: "Reso facile 30 giorni", desc: "Soddisfatti o rimborsati. Assistenza via WhatsApp/telefono." },
              ].map((s) => (
                <div key={s.step} className="rounded-lg border-l-[3px] border-teal-500 bg-white py-2.5 px-3.5">
                  <p className="text-[17px] font-extrabold text-teal-700">{s.step}. {s.title}</p>
                  <p className="mt-0.5 text-[15px] leading-snug text-gray-500">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-700">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
                  <path d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Zero anticipi
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-700">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Conferma rapida
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-700">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Assistenza prima della spedizione
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════════════════ */

const GADS_ID = "AW-17553930868";

export default function IndestructibleLanding() {
  return (
    <div className="bg-white">
      {/* Google Ads */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GADS_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="gtag-init-landing"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
gtag('config','${GADS_ID}');`,
        }}
      />
      <StickyOrderButton />
      <HeroSection />
      <div className="lp">
        <FasiSection />
        <StatsBar />
        <TechGridSection />
        <TimelineSection />
        <LpReviewsSection />
        <GuaranteesSection />
        <OrderStepsSection />
        <LpFaqSection />
        <Disclaimer />
      </div>
    </div>
  );
}

/* ═══════════════════ 3 FASI ═══════════════════ */

function FasiSection() {
  return (
    <section className="lp-fasi">
      <div className="lp-fasi-head">
        <h2>Lavora Duro, la Scarpa <em>Resiste a Tutto</em></h2>
        <p>Indestructible non è una scarpa da lavoro qualunque. Puntale in acciaio, suola anti-perforazione e peso piuma: protezione totale senza sacrificare il comfort.</p>
      </div>
      <div className="lp-fasi-grid">
        {[
          { img: "/images/land/indestructible/protegge.jpg", alt: "Protezione", tag: "Fase 1", title: "Protegge", text: "Puntale in acciaio europeo e suola anti-perforazione: le tue dita e i tuoi piedi sono al sicuro da qualsiasi impatto." },
          { img: "/images/land/indestructible/leggera.jpg", alt: "Leggerezza", tag: "Fase 2", title: "Leggera", text: "Pesano la metà di uno scarpone tradizionale. Le indossi la mattina e dimentichi di avere scarpe antinfortunistiche." },
          { img: "/images/land/indestructible/resiste.jpg", alt: "Resistenza", tag: "Fase 3", title: "Resiste", text: "Materiali di grado militare anti-usura. Cantiere, magazzino, officina: dopo mesi di lavoro duro, sono ancora come nuove." },
        ].map((f) => (
          <div key={f.title} className="lp-fase">
            <img src={f.img} alt={f.alt} />
            <div className="lp-fase-overlay">
              <span className="lp-fase-tag">{f.tag}</span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════ STATS BAR ═══════════════════ */

function StatsBar() {
  return (
    <section className="lp-stats-sec">
      <div className="lp-inner">
        <div className="lp-stats">
          <div>
            <div className="lp-stat-n">97%</div>
            <div className="lp-stat-l">Resistenza agli<br />impatti testata*</div>
          </div>
          <div>
            <div className="lp-stat-n">50%</div>
            <div className="lp-stat-l">Più leggere di uno<br />scarpone tradizionale</div>
          </div>
          <div>
            <div className="lp-stat-n">4.8</div>
            <div className="lp-stat-l">Valutazione media<br />+2.134 recensioni</div>
          </div>
        </div>
        <p className="lp-stats-disc">*Dati da test interni e recensioni verificate. I risultati possono variare in base alle condizioni di utilizzo.</p>
      </div>
    </section>
  );
}

/* ═══════════════════ 6 TECH GRID ═══════════════════ */

const techCards = [
  { img: "/images/land/indestructible/flymesh.png", alt: "Flymesh Traspirante", title: "Flymesh Traspirante", text: "Fodera in mesh traspirante che assorbe l'umidità per il massimo flusso d'aria e traspirabilità, per prevenire cattivi odori e piedi sudati." },
  { img: "/images/land/indestructible/puntaacciaio.png", alt: "Puntale in Acciaio Europeo", title: "Puntale in Acciaio Europeo", text: "Realizzato in acciaio ad alta resistenza per proteggere completamente le dita da schiacciamenti e cadute di oggetti." },
  { img: "/images/land/indestructible/perforazione.png", alt: "Resistenza alla Perforazione", title: "Resistenza alla Perforazione", text: "Materiale di grado militare che mantiene i piedi al sicuro dai rischi sul lavoro e dai pericoli ambientali." },
  { img: "/images/land/indestructible/anti-usura.png", alt: "Tecnologia Anti-usura", title: "Tecnologia Anti-usura", text: "Queste scarpe sono progettate per durare a lungo." },
  { img: "/images/land/indestructible/anti-scivolo.png", alt: "Antiscivolo", title: "Antiscivolo", text: "Maggiore resistenza a scivolamenti o slittamenti: ti mantiene al sicuro nei luoghi di lavoro scivolosi." },
  { img: "/images/land/indestructible/flessibili.png", alt: "Flessibili", title: "Flessibili", text: "La composizione elastica e flessibile aiuta a distribuire uniformemente il peso del corpo su tutto il piede." },
];

function TechGridSection() {
  return (
    <section className="lp-sec">
      <div className="lp-inner">
        <h2>6 Tecnologie in <em>Una Sola Scarpa</em></h2>
        <p className="sub">Ogni dettaglio della Indestructible™ è progettato per proteggere i tuoi piedi e farti lavorare meglio.</p>
        <div className="lp-grid6">
          {techCards.map((c) => (
            <div key={c.title} className="lp-card">
              <img src={c.img} alt={c.alt} />
              <div className="lp-card-content">
                <h4>{c.title}</h4>
                <p>{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ TIMELINE 4 WEEKS ═══════════════════ */

function TimelineSection() {
  return (
    <section className="lp-sec lp-sec-light" style={{ background: "#f7faf9" }}>
      <div className="lp-inner">
        <h2>Provale sul Campo: <em>Indistruttibili Davvero</em></h2>
        <p className="sub">Leggere come una sneaker, resistenti come uno scarpone. Mettile alla prova, settimana dopo settimana.</p>
        <div className="lp-timeline">
          {[
            { week: "Settimana 1", pct: "25%", title: "Leggerezza dal primo passo", text: "Le indossi e dimentichi di avere scarpe da lavoro. Pesano meno della metà di uno scarpone tradizionale, ma proteggono come l'acciaio." },
            { week: "Settimana 2", pct: "50%", title: "Zero fatica, massima protezione", text: "Lavori 8-10 ore in piedi senza dolori. Il puntale in acciaio e la suola anti-perforazione fanno il loro lavoro in silenzio." },
            { week: "Settimana 3", pct: "75%", title: "I colleghi te le invidiano", text: "Pioggia, fango, cantiere, magazzino: nessun segno di usura. Mentre gli altri cambiano scarpe, le tue sono come nuove." },
            { week: "Settimana 4", pct: "100%", title: "Indistruttibili. Punto.", text: "Un mese di lavoro duro e non un graffio. Leggere, traspiranti, indistruttibili. La migliore scarpa da lavoro che tu abbia mai avuto." },
          ].map((s) => (
            <div key={s.week} className="lp-tl-step">
              <div className="lp-tl-week">{s.week}</div>
              <div className="lp-tl-bar"><div className="lp-tl-fill" style={{ width: s.pct }} /></div>
              <div className="lp-tl-info">
                <strong>{s.title}</strong>
                <p>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="lp-tl-bottom">
          <div className="lp-tl-badge">Ultraleggere</div>
          <div className="lp-tl-badge">Puntale in acciaio</div>
          <div className="lp-tl-badge">Anti-perforazione</div>
        </div>
        <p className="lp-tl-disc">*La resistenza può variare in base alle condizioni di utilizzo e all'ambiente di lavoro.</p>
      </div>
    </section>
  );
}

/* ═══════════════════ REVIEWS (client) ═══════════════════ */

function LpReviewsSection() {
  return (
    <section className="lp-sec lp-sec-light" id="resenas">
      <div className="lp-inner">
        <h2>2.134 Recensioni <em>Verificate</em></h2>
        <p className="sub">Recensioni verificate esternamente a questo sito web.</p>
        <LpReviews />
      </div>
    </section>
  );
}

/* ═══════════════════ GUARANTEES ═══════════════════ */

function GuaranteesSection() {
  return (
    <section className="lp-sec lp-sec-dark">
      <div className="lp-inner">
        <h2>Acquista Senza <em>Nessun Rischio</em></h2>
        <p className="sub">La tua unica preoccupazione: scegliere la taglia.</p>
        <div className="lp-guar-grid">
          {[
            { icon: "📦", title: "Spedizione GRATIS", sub: "Consegna GLS 24-48h" },
            { icon: "💰", title: "Pagamento alla Consegna", sub: "Paghi al corriere in contanti" },
            { icon: "🔄", title: "Reso 30 Giorni", sub: "Soddisfatti o rimborsati" },
            { icon: "📞", title: "Assistenza Dedicata", sub: "WhatsApp o telefono" },
          ].map((g) => (
            <div key={g.title} className="lp-guar">
              <div className="lp-guar-ic">{g.icon}</div>
              <strong>{g.title}</strong>
              <small>{g.sub}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ ORDER STEPS ═══════════════════ */

function OrderStepsSection() {
  return (
    <section className="lp-sec">
      <div className="lp-inner">
        <h2>Ordinare È <em>Semplicissimo</em></h2>
        <p className="sub">Senza carta di credito, senza registrazione. In 2 minuti è fatto.</p>
        <div className="lp-pasos">
          {[
            { n: "1", title: "Effettua il tuo ordine", text: "Nome, indirizzo e telefono. Nient'altro." },
            { n: "2", title: "Ti contattiamo per confermare", text: "Ti scriviamo su WhatsApp per confermare i dati. Se non lo usi, ti chiamiamo." },
            { n: "3", title: "Ricevi con GLS e paghi al corriere", text: "Spedizione GRATIS 24-48h. Paghi in contanti alla consegna." },
            { n: "4", title: "Non ti convincono? Le restituisci", text: "30 giorni per il reso. Senza complicazioni. Soddisfatti o rimborsati." },
          ].map((s) => (
            <div key={s.n} className="lp-paso">
              <div className="lp-paso-n">{s.n}</div>
              <div><h4>{s.title}</h4><p>{s.text}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ FAQ (client) ═══════════════════ */

function LpFaqSection() {
  return (
    <section className="lp-sec lp-sec-light">
      <div className="lp-inner">
        <h2>Domande <em>Frequenti</em></h2>
        <LpFaq />
      </div>
    </section>
  );
}

/* ═══════════════════ DISCLAIMER ═══════════════════ */

function Disclaimer() {
  return (
    <div className="lp-disc">
      *Questo prodotto non è un dispositivo medico. I benefici percepiti possono variare da persona a persona. Immagini illustrative. Dati basati su sondaggi interni e recensioni verificate. Consulta un professionista per esigenze ortopediche specifiche.
    </div>
  );
}
