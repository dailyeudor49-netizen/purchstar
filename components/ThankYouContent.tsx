"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/* ═══════════════════ Types ═══════════════════ */

interface OrderData {
  product: { title?: string; image?: string | { src?: string } };
  variant: {
    size?: string;
    color?: string;
    price?: string;
    id?: string;
    option1?: string;
    option2?: string;
  };
  customer: {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    email?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    shippingNotes?: string;
  };
  optionNames?: string[];
  upsell: { name?: string; price?: string } | null;
  totalPrice?: string;
  timestamp?: number;
}

/* ═══════════════════ Helpers ═══════════════════ */

function fmtEur(n: number) {
  return n.toFixed(2).replace(".", ",") + " \u20AC";
}

function parseVariants(data: OrderData) {
  const v = data.variant || {};
  const optNames = data.optionNames || [];
  let color = "";
  let taglia = "";
  const extras: { n: string; v: string }[] = [];

  if (optNames.length > 0) {
    for (let i = 0; i < optNames.length; i++) {
      const nm = (optNames[i] || "").toLowerCase();
      const val =
        (v as unknown as Record<string, string>)[`option${i + 1}`] || "";
      if (!val) continue;
      if (
        nm.includes("colore") ||
        nm.includes("colori") ||
        nm.includes("color") ||
        nm.includes("colour")
      )
        color = val;
      else if (
        nm.includes("taglia") ||
        nm.includes("misura") ||
        nm.includes("size")
      )
        taglia = val;
      else extras.push({ n: optNames[i], v: val });
    }
  }

  if (!color && !taglia) {
    if (v.color) color = v.color;
    else if (v.option1) color = v.option1;
    if (v.size) taglia = v.size;
    else if (v.option2) taglia = v.option2;
  }

  return { color, taglia, extras };
}

/* ═══════════════════ Component ═══════════════════ */

export default function ThankYouContent({
  landingSlug,
}: {
  landingSlug: string;
}) {
  const [data, setData] = useState<OrderData | null | "empty">(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("cf_thankyou");
      if (!raw) {
        setData("empty");
        return;
      }
      const parsed = JSON.parse(raw) as OrderData;
      setData(parsed);
      localStorage.removeItem("cf_thankyou");
    } catch {
      setData("empty");
    }
  }, []);

  /* Loading state */
  if (data === null) {
    return <div className="min-h-[60vh]" />;
  }

  /* No data */
  if (data === "empty") {
    return (
      <div className="ty-wrap" style={{ textAlign: "center", padding: "60px 20px" }}>
        <h2
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 22,
            marginBottom: 10,
          }}
        >
          Nessun ordine trovato
        </h2>
        <p style={{ color: "#5f6368", fontSize: 15, marginBottom: 24 }}>
          Sembra che non sia stato effettuato alcun ordine di recente.
        </p>
        <Link href="/" className="ty-btn-p" style={{ display: "inline-flex", maxWidth: 260, margin: "0 auto" }}>
          Torna al negozio
        </Link>
      </div>
    );
  }

  /* ── Parse order data ── */
  const p = data.product || {};
  const v = data.variant || {};
  const c = data.customer || {};
  const { color, taglia, extras } = parseVariants(data);

  const orderNum = "IT-" + String(data.timestamp || Date.now()).slice(-6);

  const imgSrc = (typeof p.image === "object" && p.image?.src) ? p.image.src : (p.image as string) || "";

  const price = parseFloat(v.price || "0") || 0;
  const upsell = data.upsell || null;
  const upsellPrice = upsell ? parseFloat(upsell.price || "0") || 0 : 0;
  const totalPrice = price + upsellPrice;

  const productUrl = `/land/${landingSlug}`;

  return (
    <>
      {/* ── Scoped styles ── */}
      <style>{`
        .ty * { margin: 0; padding: 0; box-sizing: border-box; }
        .ty {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: #f6f6f7;
          color: #1a1a1a;
          line-height: 1.6;
          min-height: 80vh;
          -webkit-font-smoothing: antialiased;
        }
        .ty-wrap {
          max-width: 620px;
          margin: 0 auto;
          padding: 40px 20px 64px;
        }
        .ty-header {
          text-align: center;
          padding-bottom: 32px;
          margin-bottom: 28px;
          border-bottom: 1px solid #e1e1e1;
        }
        .ty-check {
          width: 56px; height: 56px; border-radius: 50%;
          background: #e6f4ea;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 16px;
          animation: tyPop .5s cubic-bezier(.34,1.56,.64,1) forwards;
          transform: scale(0);
        }
        @keyframes tyPop { to { transform: scale(1); } }
        .ty-check svg {
          width: 26px; height: 26px;
          stroke: #137333; fill: none;
          stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round;
          opacity: 0; animation: tyShow .3s .35s ease forwards;
        }
        @keyframes tyShow { to { opacity: 1; } }
        .ty-order-id {
          font-size: 11px; font-weight: 600; color: #888;
          text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 6px;
        }
        .ty-header h1 {
          font-family: 'Poppins', sans-serif;
          font-size: 26px; font-weight: 700; color: #1a1a1a;
          margin-bottom: 4px; letter-spacing: -.3px;
        }
        .ty-header-sub { font-size: 15px; color: #5f6368; }
        .ty-card {
          background: #fff;
          border: 1px solid #e1e1e1;
          border-radius: 10px;
          padding: 24px;
          margin-bottom: 16px;
        }
        .ty-a1 { animation: tyUp .4s .1s ease both; }
        .ty-a2 { animation: tyUp .4s .2s ease both; }
        .ty-a3 { animation: tyUp .4s .3s ease both; }
        @keyframes tyUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ty-card-title {
          font-family: 'Poppins', sans-serif;
          font-size: 14px; font-weight: 700; color: #1a1a1a;
          margin-bottom: 16px; padding-bottom: 12px;
          border-bottom: 1px solid #f0f0f0;
          text-transform: uppercase; letter-spacing: .4px;
        }
        .ty-product {
          display: flex; gap: 18px; align-items: center;
        }
        .ty-product-img {
          width: 100px; height: 100px;
          border-radius: 10px; border: 1px solid #e8e8e8;
          background: #fafafa; overflow: hidden; flex-shrink: 0;
        }
        .ty-product-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .ty-product-name {
          font-size: 16px; font-weight: 600; color: #1a1a1a;
          margin-bottom: 10px; line-height: 1.3;
        }
        .ty-variant-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .ty-vtag {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 13px; color: #444;
          background: #f5f5f5; border: 1px solid #e8e8e8;
          border-radius: 6px; padding: 4px 10px; font-weight: 500;
        }
        .ty-vtag-label { color: #888; font-weight: 400; }
        .ty-prices { margin-top: 18px; padding-top: 14px; border-top: 1px solid #f0f0f0; }
        .ty-pr {
          display: flex; justify-content: space-between; align-items: center;
          padding: 4px 0; font-size: 14px; color: #5f6368;
        }
        .ty-pr .l { font-weight: 500; }
        .ty-pr .v { font-weight: 500; }
        .ty-pr.free .v { color: #137333; font-weight: 600; }
        .ty-pr.total {
          padding-top: 12px; margin-top: 8px;
          border-top: 2px solid #1a1a1a;
          font-size: 17px; color: #1a1a1a;
        }
        .ty-pr.total .l { font-family: 'Poppins', sans-serif; font-weight: 700; }
        .ty-pr.total .v { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 19px; }
        .ty-cash {
          display: flex; align-items: flex-start; gap: 10px;
          background: #fffbeb; border: 1px solid #fde68a;
          border-radius: 8px; padding: 12px 14px;
          font-size: 13px; color: #92400e; line-height: 1.5;
          margin-top: 14px;
        }
        .ty-cash svg { width: 18px; height: 18px; fill: #d97706; flex-shrink: 0; margin-top: 1px; }
        .ty-step {
          display: flex; align-items: flex-start; gap: 14px; padding: 14px 0;
        }
        .ty-step:not(:last-child) { border-bottom: 1px solid #f3f3f3; }
        .ty-step:first-child { padding-top: 0; }
        .ty-step:last-child { padding-bottom: 0; }
        .ty-step-num {
          width: 28px; height: 28px; border-radius: 50%;
          background: #1a1a1a; color: #fff;
          font-size: 13px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 1px;
        }
        .ty-step-text { flex: 1; }
        .ty-step-text strong { display: block; font-size: 14px; font-weight: 600; color: #1a1a1a; margin-bottom: 2px; }
        .ty-step-text span { font-size: 13px; color: #5f6368; line-height: 1.5; }
        .ty-dgrid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 18px;
        }
        @media (max-width: 480px) {
          .ty-dgrid { grid-template-columns: 1fr; gap: 12px; }
        }
        .ty-dlabel {
          font-size: 11px; text-transform: uppercase;
          letter-spacing: .7px; color: #888; font-weight: 600; margin-bottom: 3px;
        }
        .ty-dval {
          font-size: 14px; color: #1a1a1a; font-weight: 500;
          line-height: 1.4; word-break: break-word;
        }
        .ty-pay-row { margin-top: 14px; padding-top: 12px; border-top: 1px solid #f3f3f3; }
        .ty-actions {
          display: flex; flex-direction: column; gap: 10px;
          margin-top: 24px;
          animation: tyUp .4s .5s ease both;
        }
        .ty-btn-p {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 15px 24px;
          background: #1a1a1a; color: #fff; border: none; border-radius: 8px;
          font-size: 15px; font-weight: 600; font-family: 'Inter', sans-serif;
          cursor: pointer; text-decoration: none; transition: all .2s; text-align: center;
        }
        .ty-btn-p:hover { background: #333; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,.12); }
        .ty-btn-s {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 13px 24px;
          background: #fff; color: #d93025; border: 1.5px solid #d93025; border-radius: 8px;
          font-size: 14px; font-weight: 600; font-family: 'Inter', sans-serif;
          cursor: pointer; text-decoration: none; transition: all .2s; text-align: center;
        }
        .ty-btn-s:hover { background: #fef2f2; }
        .ty-btn-s svg { width: 16px; height: 16px; stroke: #d93025; fill: none; stroke-width: 2; }
      `}</style>

      <div className="ty">
        <div className="ty-wrap">
          {/* ── Header ── */}
          <div className="ty-header">
            <div className="ty-check">
              <svg viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <div className="ty-order-id">Ordine {orderNum}</div>
            <h1>Grazie per il tuo ordine!</h1>
            <p className="ty-header-sub">
              {c.firstName || ""}, il tuo ordine è stato ricevuto correttamente.
            </p>
          </div>

          {/* ── Product card ── */}
          <div className="ty-card ty-a1">
            <div className="ty-card-title">Il tuo prodotto</div>
            <div className="ty-product">
              <div className="ty-product-img">
                {imgSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={imgSrc} alt={p.title || "Prodotto"} />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ccc",
                      fontSize: 12,
                    }}
                  >
                    Nessuna immagine
                  </div>
                )}
              </div>
              <div>
                <div className="ty-product-name">
                  {p.title || "Prodotto"}
                </div>
                {(taglia || extras.length > 0) && (
                  <div className="ty-variant-tags">
                    {taglia && (
                      <span className="ty-vtag">
                        <span className="ty-vtag-label">Taglia:</span> {taglia}
                      </span>
                    )}
                    {extras.map((ex, i) => (
                      <span key={i} className="ty-vtag">
                        <span className="ty-vtag-label">{ex.n}:</span> {ex.v}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Prices */}
            <div className="ty-prices">
              <div className="ty-pr">
                <span className="l">Subtotale</span>
                <span className="v">{fmtEur(price)}</span>
              </div>
              {upsell && (
                <div className="ty-pr">
                  <span className="l">Plantare Ortopedico</span>
                  <span className="v">{fmtEur(upsellPrice)}</span>
                </div>
              )}
              <div className="ty-pr free">
                <span className="l">Spedizione express</span>
                <span className="v">Gratis</span>
              </div>
              <div className="ty-pr free">
                <span className="l">Contrassegno</span>
                <span className="v">Gratis</span>
              </div>
              <div className="ty-pr total">
                <span className="l">Totale da pagare</span>
                <span className="v">{fmtEur(totalPrice)}</span>
              </div>
            </div>

            {/* Cash warning */}
            <div className="ty-cash">
              <svg viewBox="0 0 24 24">
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
              </svg>
              <span>
                <strong>Importante:</strong> Il pagamento viene effettuato in{" "}
                <strong>contanti</strong> al corriere. Il corriere potrebbe non
                avere il resto, ti preghiamo di preparare l&apos;importo esatto
                di <strong>{fmtEur(totalPrice)}</strong>.
              </span>
            </div>
          </div>

          {/* ── Steps ── */}
          <div className="ty-card ty-a2">
            <div className="ty-card-title">Cosa succede ora?</div>
            <div className="ty-step">
              <div className="ty-step-num">1</div>
              <div className="ty-step-text">
                <strong>Conferma dell&apos;ordine</strong>
                <span>
                  A breve riceverai una chiamata o un messaggio WhatsApp per
                  confermare il tuo ordine e verificare i dati di spedizione.
                </span>
              </div>
            </div>
            <div className="ty-step">
              <div className="ty-step-num">2</div>
              <div className="ty-step-text">
                <strong>Spedizione express gratuita</strong>
                <span>
                  Una volta confermato, il tuo ordine verrà spedito
                  immediatamente con corriere espresso. La spedizione è{" "}
                  <b style={{ color: "#137333" }}>completamente gratuita</b>.
                </span>
              </div>
            </div>
            <div className="ty-step">
              <div className="ty-step-num">3</div>
              <div className="ty-step-text">
                <strong>Ricevi e paga in contanti</strong>
                <span>
                  Il tuo ordine arriverà in pochi giorni. Paga comodamente al
                  corriere. Il contrassegno{" "}
                  <b style={{ color: "#137333" }}>
                    non ha alcun costo aggiuntivo
                  </b>
                  .
                </span>
              </div>
            </div>
          </div>

          {/* ── Customer data ── */}
          <div className="ty-card ty-a3">
            <div className="ty-card-title">Dati di spedizione</div>
            <div className="ty-dgrid">
              <div>
                <div className="ty-dlabel">Nome e cognome</div>
                <div className="ty-dval">
                  {(c.firstName || "") + " " + (c.lastName || "")}
                </div>
              </div>
              <div>
                <div className="ty-dlabel">Telefono</div>
                <div className="ty-dval">{c.phoneNumber || ""}</div>
              </div>
              <div>
                <div className="ty-dlabel">Email</div>
                <div className="ty-dval">{c.email || "Non fornita"}</div>
              </div>
              <div>
                <div className="ty-dlabel">Indirizzo</div>
                <div className="ty-dval">{c.address || ""}</div>
              </div>
              <div>
                <div className="ty-dlabel">Città e CAP</div>
                <div className="ty-dval">
                  {c.city || ""}
                  {c.zip ? ", " + c.zip : ""}
                </div>
              </div>
              <div>
                <div className="ty-dlabel">Provincia</div>
                <div className="ty-dval">{c.state || ""}</div>
              </div>
              {c.shippingNotes && (
                <div style={{ gridColumn: "1/-1" }}>
                  <div className="ty-dlabel">Note di spedizione</div>
                  <div className="ty-dval">{c.shippingNotes}</div>
                </div>
              )}
            </div>
            <div className="ty-pay-row">
              <div className="ty-dlabel">Metodo di pagamento</div>
              <div
                className="ty-dval"
                style={{ color: "#1B5E6B", fontWeight: 600 }}
              >
                Contrassegno (contanti)
              </div>
            </div>
          </div>

          {/* ── Actions ── */}
          <div className="ty-actions">
            <Link href="/" className="ty-btn-p">
              Continua lo shopping
            </Link>
            <Link href={productUrl} className="ty-btn-s">
              <svg viewBox="0 0 24 24">
                <path d="M3 12h18M3 12l6-6M3 12l6 6" />
              </svg>
              Dati errati? Ordina di nuovo
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
