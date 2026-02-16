'use client';

import React, { useState, useEffect } from 'react';

export default function ThankYouPage() {
  const [orderCode, setOrderCode] = useState('');

  useEffect(() => {
    let code = sessionStorage.getItem('orderCode');
    if (!code) {
      code = 'VTX-' + Math.floor(100000 + Math.random() * 900000).toString();
      sessionStorage.setItem('orderCode', code);
    }
    setOrderCode(code);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #eab308 0%, #ca8a04 50%, #a16207 100%)',
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
          background: '#eab308',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          boxShadow: '0 10px 30px rgba(234, 179, 8, 0.4)'
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
          Naročilo potrjeno!
        </h1>

        <p style={{
          color: '#6b7280',
          fontSize: '0.95rem',
          marginBottom: '1.5rem',
          lineHeight: 1.5
        }}>
          Vaši VERTIX PRO se pripravljajo in bodo kmalu poslani.
        </p>

        {/* Order code */}
        <div style={{
          background: '#FEFCE8',
          borderRadius: '12px',
          padding: '1rem',
          marginBottom: '1.5rem',
          border: '2px solid #eab308'
        }}>
          <div style={{ fontSize: '0.8rem', color: '#a16207', fontWeight: 600, marginBottom: '0.25rem' }}>ŠTEVILKA NAROČILA</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ca8a04', letterSpacing: '1px', fontFamily: 'monospace' }}>{orderCode}</div>
        </div>

        {/* Timeline */}
        <div style={{
          background: '#F8FAFC',
          borderRadius: '12px',
          padding: '1.25rem',
          marginBottom: '1.5rem',
          textAlign: 'left'
        }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E293B', marginBottom: '1rem' }}>Naslednji koraki:</div>

          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{ width: '24px', height: '24px', background: '#eab308', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0 }}>1</div>
            <div>
              <div style={{ fontWeight: 600, color: '#1E293B', fontSize: '0.9rem' }}>Priprava naročila</div>
              <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Danes</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{ width: '24px', height: '24px', background: '#94a3b8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0 }}>2</div>
            <div>
              <div style={{ fontWeight: 600, color: '#1E293B', fontSize: '0.9rem' }}>Odpošiljanje</div>
              <div style={{ color: '#64748b', fontSize: '0.8rem' }}>V 24 urah</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <div style={{ width: '24px', height: '24px', background: '#94a3b8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0 }}>3</div>
            <div>
              <div style={{ fontWeight: 600, color: '#1E293B', fontSize: '0.9rem' }}>Dostava</div>
              <div style={{ color: '#64748b', fontSize: '0.8rem' }}>2-3 delovne dni</div>
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
            <div style={{ fontWeight: 600, color: '#92400e', fontSize: '0.9rem' }}>Plačilo po povzetju: €65,80</div>
            <div style={{ color: '#a16207', fontSize: '0.8rem' }}>Pripravite točen znesek za kurirja</div>
          </div>
        </div>

        {/* Contact */}
        <div style={{
          fontSize: '0.85rem',
          color: '#64748b',
          marginBottom: '1.5rem'
        }}>
          Imate vprašanja? Kontaktirajte nas: <a href="mailto:info@purchstar.com" style={{ color: '#ca8a04', fontWeight: 600, textDecoration: 'none' }}>info@purchstar.com</a>
        </div>

        <a href="/" style={{
          display: 'inline-block',
          background: '#eab308',
          color: 'white',
          padding: '0.875rem 2rem',
          borderRadius: '10px',
          fontSize: '0.95rem',
          fontWeight: 600,
          textDecoration: 'none'
        }}>
          Nazaj na glavno stran
        </a>
      </div>
    </div>
  );
}
