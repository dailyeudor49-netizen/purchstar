"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

const FB_PIXEL_ID = "1576025786901423";
const GADS_ID = "AW-17553930868";

export default function TrackingPixels() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

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

    /* Facebook Pixel - Purchase */
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

    /* Try immediately, then retry a few times while scripts load */
    let fbOk = tryFb();
    let gOk = tryGtag();
    if (!fbOk || !gOk) {
      let attempts = 0;
      const iv = setInterval(() => {
        attempts++;
        if (!fbOk) fbOk = tryFb();
        if (!gOk) gOk = tryGtag();
        if ((fbOk && gOk) || attempts >= 10) clearInterval(iv);
      }, 500);
    }
  }, []);

  return (
    <>
      {/* Facebook Pixel */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${FB_PIXEL_ID}');
fbq('track','PageView');`,
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>

      {/* Google Ads */}
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
