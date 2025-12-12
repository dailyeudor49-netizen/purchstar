'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    __conversionFired?: boolean;
  }
}

const CONVERSION_ID = 'AW-17321474795';
const CONVERSION_LABEL = 'AW-17321474795/yRdmCLzQrtAbEOv1wsNA';

export default function ThankYouPage() {
  const [orderCode, setOrderCode] = useState('');

  // Fallback: check if gtag is already available (e.g., from cache)
  useEffect(() => {
    const checkAndFire = () => {
      if (window.__conversionFired) return;
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', {
          'send_to': CONVERSION_LABEL
        });
        window.__conversionFired = true;
      }
    };

    checkAndFire();
    const timeout = setTimeout(checkAndFire, 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem('orderCode');
    if (stored) {
      setOrderCode(stored);
    } else {
      const newCode = 'NCX-' + Math.floor(100000 + Math.random() * 900000).toString();
      sessionStorage.setItem('orderCode', newCode);
      setOrderCode(newCode);
    }
  }, []);

  const handleGtagLoad = () => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', CONVERSION_ID);

    if (!window.__conversionFired) {
      window.gtag('event', 'conversion', {
        'send_to': CONVERSION_LABEL
      });
      window.__conversionFired = true;
    }
  };

  return (
    <>
      {/* Google Tag (gtag.js) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${CONVERSION_ID}`}
        strategy="afterInteractive"
        onLoad={handleGtagLoad}
      />

      <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #16a34a 0%, #15803d 50%, #166534 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '2.5rem 2rem',
        maxWidth: '480px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
      }}>
        {/* Animated check */}
        <div style={{
          width: '90px',
          height: '90px',
          background: '#16a34a',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          boxShadow: '0 10px 30px rgba(22, 163, 74, 0.4)'
        }}>
          <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        </div>

        <h1 style={{
          fontSize: '1.75rem',
          fontWeight: 800,
          color: '#111827',
          marginBottom: '0.5rem'
        }}>
          Zamówienie Zatwierdzone!
        </h1>

        <p style={{
          color: '#6b7280',
          fontSize: '0.95rem',
          marginBottom: '1.5rem',
          lineHeight: 1.5
        }}>
          Twój NovaClean X1 ze stacją jest przygotowywany i niedługo zostanie wysłany.
        </p>

        {/* Order code */}
        <div style={{
          background: '#F0FDF4',
          borderRadius: '12px',
          padding: '1rem',
          marginBottom: '1.5rem',
          border: '2px solid #16a34a'
        }}>
          <div style={{ fontSize: '0.8rem', color: '#166534', fontWeight: 600, marginBottom: '0.25rem' }}>KOD ZAMÓWIENIA</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#16a34a', letterSpacing: '1px', fontFamily: 'monospace' }}>{orderCode}</div>
        </div>

        {/* Timeline */}
        <div style={{
          background: '#F8FAFC',
          borderRadius: '12px',
          padding: '1.25rem',
          marginBottom: '1.5rem',
          textAlign: 'left'
        }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E293B', marginBottom: '1rem' }}>📦 Co dalej:</div>

          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{ width: '24px', height: '24px', background: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0 }}>1</div>
            <div>
              <div style={{ fontWeight: 600, color: '#1E293B', fontSize: '0.9rem' }}>Realizacja zamówienia</div>
              <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Dzisiaj</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{ width: '24px', height: '24px', background: '#94a3b8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0 }}>2</div>
            <div>
              <div style={{ fontWeight: 600, color: '#1E293B', fontSize: '0.9rem' }}>Nadanie przesyłki</div>
              <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Do 24 godzin</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <div style={{ width: '24px', height: '24px', background: '#94a3b8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0 }}>3</div>
            <div>
              <div style={{ fontWeight: 600, color: '#1E293B', fontSize: '0.9rem' }}>Doręczenie</div>
              <div style={{ color: '#64748b', fontSize: '0.8rem' }}>2-3 dni roboczych</div>
            </div>
          </div>
        </div>

        {/* Payment reminder */}
        <div style={{
          background: '#FEF3C7',
          borderRadius: '12px',
          padding: '1rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          textAlign: 'left'
        }}>
          <span style={{ fontSize: '1.5rem' }}>💰</span>
          <div>
            <div style={{ fontWeight: 600, color: '#92400e', fontSize: '0.9rem' }}>Zapłata przy doręczeniu: 339 PLN</div>
            <div style={{ color: '#a16207', fontSize: '0.8rem' }}>Przygotuj odmierzoną kwotę dla kuriera</div>
          </div>
        </div>

        {/* Contact */}
        <div style={{
          fontSize: '0.85rem',
          color: '#64748b',
          marginBottom: '1.5rem'
        }}>
          Masz pytania? Napisz do nas: <a href="mailto:info@purchstar.com" style={{ color: '#16a34a', fontWeight: 600, textDecoration: 'none' }}>info@purchstar.com</a>
        </div>

        <a href="/" style={{
          display: 'inline-block',
          background: '#16a34a',
          color: 'white',
          padding: '0.875rem 2rem',
          borderRadius: '12px',
          fontWeight: 700,
          textDecoration: 'none',
          fontSize: '0.95rem'
        }}>
          Wróć do strony głównej
        </a>
      </div>
    </div>
    </>
  );
}
