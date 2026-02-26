'use client';

import React, { useState, useEffect } from 'react';

export default function ThankYouPage() {
  const [orderCode, setOrderCode] = useState('');

  useEffect(() => {
    const stored = sessionStorage.getItem('orderCode');
    if (stored) {
      setOrderCode(stored);
    } else {
      const newCode = 'AUR-' + Math.floor(100000 + Math.random() * 900000).toString();
      sessionStorage.setItem('orderCode', newCode);
      setOrderCode(newCode);
    }
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #e11d48 0%, #be123c 50%, #9f1239 100%)',
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
          {"Objedn\u00e1vka potvrzena!"}
        </h1>

        <p style={{
          color: '#6b7280',
          fontSize: '0.95rem',
          marginBottom: '1.5rem',
          lineHeight: 1.5
        }}>
          {"V\u00e1\u0161 AuraStyler\u2122 Kompletn\u00ed set se p\u0159ipravuje a bude brzy odesl\u00e1n."}
        </p>

        {/* Order code */}
        <div style={{
          background: '#FEF2F2',
          borderRadius: '12px',
          padding: '1rem',
          marginBottom: '1.5rem',
          border: '2px solid #e11d48'
        }}>
          <div style={{ fontSize: '0.8rem', color: '#9f1239', fontWeight: 600, marginBottom: '0.25rem' }}>{"K\u00d3D OBJEDN\u00c1VKY"}</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#e11d48', letterSpacing: '1px', fontFamily: 'monospace' }}>{orderCode}</div>
        </div>

        {/* Timeline */}
        <div style={{
          background: '#F8FAFC',
          borderRadius: '12px',
          padding: '1.25rem',
          marginBottom: '1.5rem',
          textAlign: 'left'
        }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E293B', marginBottom: '1rem' }}>{"📦 Dal\u0161\u00ed kroky:"}</div>

          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{ width: '24px', height: '24px', background: '#e11d48', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0 }}>1</div>
            <div>
              <div style={{ fontWeight: 600, color: '#1E293B', fontSize: '0.9rem' }}>{"Zpracov\u00e1n\u00ed objedn\u00e1vky"}</div>
              <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Dnes</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{ width: '24px', height: '24px', background: '#94a3b8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0 }}>2</div>
            <div>
              <div style={{ fontWeight: 600, color: '#1E293B', fontSize: '0.9rem' }}>{"Odesl\u00e1n\u00ed bal\u00edku"}</div>
              <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{"Za 24 hodin"}</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <div style={{ width: '24px', height: '24px', background: '#94a3b8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0 }}>3</div>
            <div>
              <div style={{ fontWeight: 600, color: '#1E293B', fontSize: '0.9rem' }}>{"Doru\u010den\u00ed"}</div>
              <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{"2-3 pracovn\u00ed dny"}</div>
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
            <div style={{ fontWeight: 600, color: '#92400e', fontSize: '0.9rem' }}>{"Platba na dob\u00edrku: 1\u00a0498\u00a0K\u010d"}</div>
            <div style={{ color: '#a16207', fontSize: '0.8rem' }}>{"P\u0159ipravte si p\u0159esnou \u010d\u00e1stku pro kur\u00fdra"}</div>
          </div>
        </div>

        {/* Contact */}
        <div style={{
          fontSize: '0.85rem',
          color: '#64748b',
          marginBottom: '1.5rem'
        }}>
          {"M\u00e1te dotazy? Napi\u0161te n\u00e1m: "}<a href="mailto:info@purchstar.com" style={{ color: '#e11d48', fontWeight: 600, textDecoration: 'none' }}>info@purchstar.com</a>
        </div>

        <a href="/fb-hairdryerdr-cz" style={{
          display: 'inline-block',
          background: '#e11d48',
          color: 'white',
          padding: '0.875rem 2rem',
          borderRadius: '12px',
          fontWeight: 700,
          textDecoration: 'none',
          fontSize: '0.95rem'
        }}>
          {"Zp\u011bt na za\u010d\u00e1tek"}
        </a>
      </div>
    </div>
  );
}
