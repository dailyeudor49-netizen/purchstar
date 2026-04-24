"use client";

import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Truck,
  Phone,
  Clock,
  Shield,
  Package,
  MapPin,
  Star,
  Gift
} from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function GazeboHrThankYou() {
  const [orderData, setOrderData] = useState<{
    fullName?: string;
    address?: string;
    phone?: string;
  }>({});

  useEffect(() => {
    const storedData = localStorage.getItem('gazebo-hr-order');
    if (storedData) {
      try {
        setOrderData(JSON.parse(storedData));
      } catch {
        // ignore
      }
    }
  }, []);

  const orderNumber = `GZB-${Date.now().toString().slice(-6)}`;
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 2);
  const formattedDate = deliveryDate.toLocaleDateString('hr-HR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="font-black text-2xl uppercase tracking-tight">
            <span className="text-orange-500">POP UP</span> GAZEBO
          </div>
        </div>
      </header>

      {/* Success Hero */}
      <section className="py-10 md:py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="mb-6"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto flex items-center justify-center shadow-2xl">
              <CheckCircle2 className="text-white" size={60} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 uppercase tracking-tight">
              Narudžba Potvrđena!
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-2">
              Hvala{orderData.fullName ? `, ${orderData.fullName.split(' ')[0]}` : ''}! Vaša narudžba je zaprimljena.
            </p>
            <p className="text-base text-gray-500">
              Narudžba br. <span className="font-bold text-gray-700">{orderNumber}</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Order Summary Card */}
      <section className="px-4 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Product */}
            <div className="p-6 md:p-8 border-b border-gray-100">
              <div className="flex gap-4 md:gap-6">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0 relative">
                  <Image
                    src="/images/gazebo/1.jpg"
                    alt="Pop Up Gazebo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-lg md:text-xl text-gray-900 mb-1">
                    Pop Up Gazebo 3x3m
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">Dvostruki Krov + 4 Bočne Stijene</p>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl md:text-3xl font-black text-orange-600">99,00 €</span>
                    <span className="text-base text-gray-400 line-through">219,00 €</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="p-6 md:p-8 bg-gray-50 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-orange-600" size={20} />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">Adresa Dostave</p>
                  <p className="text-gray-600">{orderData.address || 'Adresa navedena'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Truck className="text-green-600" size={20} />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">Očekivana Dostava</p>
                  <p className="text-gray-600 capitalize">{formattedDate}</p>
                  <p className="text-green-600 font-bold text-sm mt-1">Dostava BESPLATNO</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Package className="text-blue-600" size={20} />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">Način Plaćanja</p>
                  <p className="text-gray-600">Pouzeće - Plaćanje pri dostavi</p>
                  <p className="text-gray-500 text-sm mt-1">Iznos za plaćanje: <span className="font-bold text-gray-900">99,00 €</span></p>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="p-6 md:p-8 bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg uppercase">Ukupno za Plaćanje</span>
                <span className="text-3xl md:text-4xl font-black">99,00 €</span>
              </div>
              <p className="text-orange-100 text-sm mt-2">Uštedili ste 120,00 € s ljetnom akcijom!</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* What Happens Next */}
      <section className="px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl md:text-2xl font-black text-center mb-8 uppercase tracking-tight">
            Što Slijedi?
          </h2>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 flex gap-4"
            >
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-black text-xl">
                1
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Potvrda putem SMS-a</h3>
                <p className="text-gray-600 text-sm">
                  Primit ćete SMS potvrdu na broj {orderData.phone || 'naveden'} s detaljima narudžbe.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 flex gap-4"
            >
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-black text-xl">
                2
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Priprema i Slanje</h3>
                <p className="text-gray-600 text-sm">
                  Vaša sjenica bit će pripremljena i poslana unutar 24 sata ekspresnom kurirskom službom.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
              className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 flex gap-4"
            >
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-black text-xl">
                3
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Dostava i Plaćanje</h3>
                <p className="text-gray-600 text-sm">
                  Kurir će vas kontaktirati prije dostave. Platit ćete 99€ gotovinom pri preuzimanju.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 text-center shadow border border-gray-100">
              <Truck className="text-orange-500 mx-auto mb-2" size={28} />
              <p className="text-xs font-bold text-gray-700 uppercase">Ekspresna Dostava</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow border border-gray-100">
              <Shield className="text-green-500 mx-auto mb-2" size={28} />
              <p className="text-xs font-bold text-gray-700 uppercase">2 Godine Jamstva</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow border border-gray-100">
              <Clock className="text-blue-500 mx-auto mb-2" size={28} />
              <p className="text-xs font-bold text-gray-700 uppercase">Povrat 30 Dana</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow border border-gray-100">
              <Star className="text-yellow-500 mx-auto mb-2" size={28} />
              <p className="text-xs font-bold text-gray-700 uppercase">4.9/5 Zvjezdica</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 md:p-8 text-white text-center">
            <Phone className="mx-auto mb-4 text-orange-400" size={40} />
            <h3 className="text-xl md:text-2xl font-black mb-2 uppercase">Trebate Pomoć?</h3>
            <p className="text-gray-400 mb-4 text-sm md:text-base">
              Naša korisnička služba dostupna je od ponedjeljka do petka, 9:00 - 18:00
            </p>
            <a
              href="tel:+385123456789"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
            >
              <Phone size={20} />
              Kontaktirajte Nas
            </a>
          </div>
        </div>
      </section>

      {/* Bonus Gift Section */}
      <section className="px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl p-6 md:p-8 text-center">
            <Gift className="mx-auto mb-4 text-white" size={48} />
            <h3 className="text-xl md:text-2xl font-black text-white mb-2 uppercase">
              Ekskluzivni Bonus!
            </h3>
            <p className="text-white/90 mb-4 text-sm md:text-base">
              Uz vašu narudžbu dobivate <strong>BESPLATNO</strong> dodatni set klinova za učvršćivanje na mekom tlu!
            </p>
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
              <span className="text-white font-bold">Vrijednost: 19,90€ — BESPLATNO</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <div className="font-black text-2xl uppercase tracking-tight">
            <span className="text-orange-500">POP UP</span> GAZEBO
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-xs font-bold uppercase text-gray-500 tracking-wide">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Politika Privatnosti</Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">Uvjeti Korištenja</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Kontakt</Link>
          </div>
          <p className="text-xs text-gray-600">
            © 2024 Pop Up Gazebo Hrvatska. Sva prava pridržana.
          </p>
        </div>
      </footer>
    </div>
  );
}
