'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { FB_CONFIG } from '@/app/config/facebook';
import { generateEventId, trackPageView, trackViewContent, trackPurchase } from '@/app/lib/facebook/pixel';
import { getUserDataFromStorage, trackPurchaseCAPI } from '@/app/lib/facebook/capi';

export default function FacebookPixel() {
  const pathname = usePathname();

  useEffect(() => {
    // Aspetta che fbq sia disponibile
    const waitForFbq = setInterval(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const win = window as any;
      if (typeof window !== 'undefined' && typeof win.fbq === 'function') {
        clearInterval(waitForFbq);
        
        const pageViewEventId = generateEventId();

        // Traccia PageView su tutte le pagine
        trackPageView(pageViewEventId);
        console.log('[FB Pixel] PageView tracked on:', pathname);

        // Se siamo su una landing page (/fb-airwave-* o /fb-bluebull), traccia ViewContent
        if (pathname.startsWith('/fb-airwave')) {
          const viewContentEventId = generateEventId();
          console.log('[FB Pixel] Landing page detected, tracking ViewContent...');
          trackViewContent({
            content_name: 'Airwave Air Conditioner',
            content_category: 'Electronics',
            content_type: 'product',
          }, viewContentEventId);
          console.log('[FB Pixel] ViewContent tracked');
        }

        if (pathname.startsWith('/fb-bluebull')) {
          const viewContentEventId = generateEventId();
          console.log('[FB Pixel] Blubull landing page detected, tracking ViewContent...');
          trackViewContent({
            content_name: 'Blubull',
            content_category: 'Health',
            content_type: 'product',
          }, viewContentEventId);
          console.log('[FB Pixel] ViewContent tracked for Blubull');
        }

        // Se siamo su una thank you page (/ty/* o */ty), traccia Purchase
        if (pathname.startsWith('/ty') || pathname.endsWith('/ty')) {
          // Protezione anti-duplicato: usa timestamp ordine da cf_thankyou
          const PURCHASE_KEY = 'cf_purchase_fired';
          let orderTimestamp: string | null = null;

          try {
            const tyData = localStorage.getItem('cf_thankyou');
            if (tyData) {
              const parsed = JSON.parse(tyData);
              orderTimestamp = String(parsed.timestamp || Date.now());
            }
          } catch {}

          // Se non c'è timestamp, usa pathname + timestamp corrente come fallback
          const orderId = orderTimestamp || `${pathname}_${Date.now()}`;

          // Controlla se questo ordine è già stato tracciato
          try {
            const alreadyFired = localStorage.getItem(PURCHASE_KEY);
            if (alreadyFired === orderId) {
              console.log('[FB Pixel] Purchase already tracked for this order, skipping...');
              return;
            }
            // Segna come tracciato PRIMA di sparare
            localStorage.setItem(PURCHASE_KEY, orderId);
          } catch {}

          const purchaseEventId = generateEventId();
          console.log('[FB Pixel] Thank you page detected, tracking Purchase...');

          const userData = getUserDataFromStorage();

          // Determina i dati di acquisto in base alla thank you page
          let purchaseData = {
            content_name: 'Airwave Air Conditioner',
            content_category: 'Electronics',
            content_type: 'product',
            currency: 'EUR',
            value: 89.00,
          };

          // Thank you pages per DryPro 360 Ultra
          if (pathname.includes('ty-fb-dryer-cz')) {
            purchaseData = {
              content_name: 'DryPro 360 Ultra',
              content_category: 'Electronics',
              content_type: 'product',
              currency: 'CZK',
              value: 1749,
            };
          } else if (pathname.includes('ty-fb-dryer-sk')) {
            purchaseData = {
              content_name: 'DryPro 360 Ultra',
              content_category: 'Electronics',
              content_type: 'product',
              currency: 'EUR',
              value: 69.99,
            };
          } else if (pathname.includes('ty-fb-dryer-pl')) {
            purchaseData = {
              content_name: 'DryPro 360 Ultra',
              content_category: 'Electronics',
              content_type: 'product',
              currency: 'PLN',
              value: 299,
            };
          }
          // Thank you pages per NovaClean Robot
          else if (pathname.includes('ty-fb-robot-asp')) {
            purchaseData = {
              content_name: 'NovaClean X1 Robot',
              content_category: 'Electronics',
              content_type: 'product',
              currency: 'PLN',
              value: 349,
            };
          }
          // Thank you pages per Mini 17 Pro Titanium
          else if (pathname.includes('fb-miniphonerk-pl/ty')) {
            purchaseData = {
              content_name: 'Mini 17 Pro Titanium',
              content_category: 'Electronics',
              content_type: 'product',
              currency: 'PLN',
              value: 349,
            };
          } else if (pathname.includes('fb-miniphonerk-sk/ty')) {
            purchaseData = {
              content_name: 'Mini 17 Pro Titanium',
              content_category: 'Electronics',
              content_type: 'product',
              currency: 'EUR',
              value: 79.99,
            };
          } else if (pathname.includes('fb-miniphonerk-cz/ty')) {
            purchaseData = {
              content_name: 'Mini 17 Pro Titanium',
              content_category: 'Electronics',
              content_type: 'product',
              currency: 'CZK',
              value: 1999,
            };
          }
          // Thank you page per NovaClean X1 Robot (fb-robotdr-pl)
          else if (pathname.includes('ty-fb-robotdr-pl')) {
            purchaseData = {
              content_name: 'NovaClean X1 Robot',
              content_category: 'Electronics',
              content_type: 'product',
              currency: 'PLN',
              value: 339,
            };
          }
          // Thank you page per Cloudstep (VENOCARE PRO)
          else if (pathname.includes('cloudstep/ty')) {
            purchaseData = {
              content_name: 'VENOCARE PRO',
              content_category: 'Footwear',
              content_type: 'product',
              currency: 'EUR',
              value: 49.90,
            };
          }
          // Thank you page per SnellaWalk 360
          else if (pathname.includes('snellawalk360/ty')) {
            purchaseData = {
              content_name: 'SnellaWalk 360',
              content_category: 'Footwear',
              content_type: 'product',
              currency: 'EUR',
              value: 49.99,
            };
          }
          // Thank you page per Indestructible
          else if (pathname.includes('indestructible/ty')) {
            purchaseData = {
              content_name: 'Indestructible',
              content_category: 'Footwear',
              content_type: 'product',
              currency: 'EUR',
              value: 49.99,
            };
          }

          console.log('[FB Pixel] Purchase data:', purchaseData);

          // Traccia Purchase via Pixel (client-side)
          trackPurchase(purchaseData, purchaseEventId);

          // Traccia Purchase via CAPI (server-side via N8N)
          trackPurchaseCAPI(purchaseEventId, userData, purchaseData).then((success) => {
            if (success) {
              console.log('[FB CAPI] Purchase event sent successfully');
            } else {
              console.error('[FB CAPI] Failed to send Purchase event');
            }
          });
        }
      }
    }, 100);

    // Cleanup dopo 10 secondi se fbq non viene mai caricato
    const timeout = setTimeout(() => clearInterval(waitForFbq), 10000);

    return () => {
      clearInterval(waitForFbq);
      clearTimeout(timeout);
    };
  }, [pathname]);

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
            fbq('init', '${FB_CONFIG.PIXEL_ID}');
            console.log('[FB Pixel] Initialized with ID: ${FB_CONFIG.PIXEL_ID}');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${FB_CONFIG.PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
