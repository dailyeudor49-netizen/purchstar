'use client';

import React, { useState, useEffect } from 'react';

export default function ThankYouPage() {
  const [orderCode, setOrderCode] = useState('');

  useEffect(() => {
    const stored = sessionStorage.getItem('orderCode');
    if (stored) {
      setOrderCode(stored);
    } else {
      const newCode = 'SLU-' + Math.floor(100000 + Math.random() * 900000).toString();
      sessionStorage.setItem('orderCode', newCode);
      setOrderCode(newCode);
    }
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #dc2626 0%, #b91c1c 50%, #991b1b 100%)',
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
          background: '#22c55e',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          boxShadow: '0 10px 30px rgba(34, 197, 94, 0.4)'
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
          Ordine Confermato!
        </h1>

        <p style={{
          color: '#6b7280',
          fontSize: '0.95rem',
          marginBottom: '1.5rem',
          lineHeight: 1.5
        }}>
          Il tuo Slimique Ultra è in preparazione e verrà spedito entro 24 ore.
        </p>

        {/* Order code */}
        <div style={{
          background: '#FEF2F2',
          borderRadius: '12px',
          padding: '1rem',
          marginBottom: '1.5rem',
          border: '2px solid #dc2626'
        }}>
          <div style={{ fontSize: '0.8rem', color: '#b91c1c', fontWeight: 600, marginBottom: '0.25rem' }}>CODICE ORDINE</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#dc2626', letterSpacing: '1px', fontFamily: 'monospace' }}>{orderCode}</div>
        </div>

        {/* Timeline */}
        <div style={{
          background: '#F8FAFC',
          borderRadius: '12px',
          padding: '1.25rem',
          marginBottom: '1.5rem',
          textAlign: 'left'
        }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E293B', marginBottom: '1rem' }}>📦 Prossimi passi:</div>

          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{ width: '24px', height: '24px', background: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0 }}>1</div>
            <div>
              <div style={{ fontWeight: 600, color: '#1E293B', fontSize: '0.9rem' }}>Elaborazione ordine</div>
              <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Oggi</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{ width: '24px', height: '24px', background: '#94a3b8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0 }}>2</div>
            <div>
              <div style={{ fontWeight: 600, color: '#1E293B', fontSize: '0.9rem' }}>Spedizione del pacco</div>
              <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Entro 24 ore</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <div style={{ width: '24px', height: '24px', background: '#94a3b8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0 }}>3</div>
            <div>
              <div style={{ fontWeight: 600, color: '#1E293B', fontSize: '0.9rem' }}>Consegna</div>
              <div style={{ color: '#64748b', fontSize: '0.8rem' }}>2-3 giorni lavorativi</div>
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
            <div style={{ fontWeight: 600, color: '#92400e', fontSize: '0.9rem' }}>Pagamento alla consegna</div>
            <div style={{ color: '#a16207', fontSize: '0.8rem' }}>Prepara €49,00 in contanti per il corriere</div>
          </div>
        </div>

        {/* Contact */}
        <div style={{
          fontSize: '0.85rem',
          color: '#64748b',
          marginBottom: '1.5rem'
        }}>
          Hai domande? Scrivici a: <a href="mailto:supporto@slimique.it" style={{ color: '#dc2626', fontWeight: 600, textDecoration: 'none' }}>supporto@slimique.it</a>
        </div>

        <a href="/" style={{
          display: 'inline-block',
          background: '#dc2626',
          color: 'white',
          padding: '0.875rem 2rem',
          borderRadius: '10px',
          fontSize: '0.95rem',
          fontWeight: 600,
          textDecoration: 'none'
        }}>
          Torna alla Home
        </a>
      </div>
    </div>
  );
}
