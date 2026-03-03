"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

const GADS_ID = "AW-17553930868";

export default function TrackingPixels() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    /* Controlla se Purchase già sparato (protegge da refresh pagina) */
    const PURCHASE_KEY = "cf_purchase_fired";
    try {
      if (localStorage.getItem(PURCHASE_KEY)) return;
    } catch {}

    let raw: string | null = null;
    try {
      raw = localStorage.getItem("cf_thankyou");
    } catch {}
    if (!raw) return;

    let d: {
      product?: { title?: string };
      variant?: { id?: string; price?: string };
      upsell?: { price?: string } | null;
      totalPrice?: string;
      timestamp?: number;
      gadsConv?: string;
    };
    try {
      d = JSON.parse(raw);
    } catch {
      return;
    }

    const price = parseFloat(d.variant?.price || "0") || 0;
    const ups = d.upsell ? parseFloat(d.upsell.price || "0") || 0 : 0;
    const value = price + ups;

    /* Facebook Pixel - Purchase (usa fbq globale dal layout, NO doppio init) */
    const tryFb = () => {
      const w = window as unknown as Record<string, unknown>;
      if (typeof w.fbq === "function") {
        (w.fbq as Function)("track", "Purchase", {
          content_ids: [d.variant?.id ? String(d.variant.id) : ""],
          content_type: "product",
          content_name: d.product?.title || "",
          value,
          currency: "EUR",
        });
        return true;
      }
      return false;
    };

    /* Google Ads - Conversion (etichetta dinamica per prodotto) */
    const gadsConv = d.gadsConv;
    const tryGtag = () => {
      if (!gadsConv) return true;
      const w = window as unknown as Record<string, unknown>;
      if (typeof w.gtag === "function") {
        (w.gtag as Function)("event", "conversion", {
          send_to: gadsConv,
          value,
          currency: "EUR",
          transaction_id:
            "IT-" + String(d.timestamp || Date.now()).slice(-6),
        });
        return true;
      }
      return false;
    };

    /* Segna come completato e pulisci localStorage */
    const markDone = () => {
      try {
        localStorage.setItem(PURCHASE_KEY, "1");
        localStorage.removeItem("cf_thankyou");
      } catch {}
    };

    /* Try immediately, then retry a few times while scripts load */
    let fbOk = tryFb();
    let gOk = tryGtag();
    if (!fbOk || !gOk) {
      let attempts = 0;
      const iv = setInterval(() => {
        attempts++;
        if (!fbOk) fbOk = tryFb();
        if (!gOk) gOk = tryGtag();
        if (fbOk && gOk) {
          clearInterval(iv);
          markDone();
        } else if (attempts >= 10) {
          clearInterval(iv);
          /* Segna solo se almeno fbq ha sparato, altrimenti lascia cf_thankyou
             così un refresh può riprovare */
          if (fbOk) markDone();
        }
      }, 500);
    } else {
      markDone();
    }
  }, []);

  return (
    <>
      {/* Google Ads — fbq è già caricato dal FacebookPixel globale nel layout */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GADS_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
gtag('config','${GADS_ID}',{send_page_view:false});`,
        }}
      />
    </>
  );
}
