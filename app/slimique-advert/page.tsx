'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';

// --- FACEBOOK PIXEL CONFIG ---
const FB_PIXEL_ID = '1576025786901423';

// --- FACEBOOK PIXEL COMPONENT ---
const FacebookPixel = () => {
  useEffect(() => {
    const waitForFbq = setInterval(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const win = window as any;
      if (typeof window !== 'undefined' && typeof win.fbq === 'function') {
        clearInterval(waitForFbq);
        win.fbq('track', 'PageView');
        win.fbq('track', 'ViewContent', {
          content_name: 'Slimique Ultra',
          content_category: 'Health',
          content_type: 'product',
          value: 49,
          currency: 'EUR'
        });
        console.log('[FB Pixel] PageView and ViewContent tracked');
      }
    }, 100);

    const timeout = setTimeout(() => clearInterval(waitForFbq), 10000);
    return () => {
      clearInterval(waitForFbq);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
};

export default function SlimiqueBridgePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <FacebookPixel />

      <div className="max-w-lg w-full text-center">
        {/* Small label */}
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-4 font-semibold">
          Notizia del giorno
        </p>

        {/* Headline - Clickbait style */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug mb-6">
          Una donna di 54 anni rivela il <span className="underline decoration-green-500 decoration-2 underline-offset-4">trucco segreto</span> che le ha fatto perdere 12kg senza dieta né palestra
        </h1>

        {/* Teaser text */}
        <p className="text-gray-500 text-base mb-8">
          "I medici non riuscivano a crederci..."
        </p>

        {/* CTA Link - minimal style */}
        <a
          href="/slimique-ultra"
          className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 text-lg font-bold transition-colors"
        >
          Continua a leggere
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

    </div>
  );
}
