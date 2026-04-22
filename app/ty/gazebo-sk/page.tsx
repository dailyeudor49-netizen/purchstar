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

export default function GazeboSkThankYou() {
  const [orderData, setOrderData] = useState<{
    fullName?: string;
    address?: string;
    phone?: string;
  }>({});

  useEffect(() => {
    // Získať údaje objednávky z localStorage
    const storedData = localStorage.getItem('gazebo-sk-order');
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
  const formattedDate = deliveryDate.toLocaleDateString('sk-SK', {
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
              Objednávka Potvrdená!
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-2">
              Ďakujeme{orderData.fullName ? `, ${orderData.fullName.split(' ')[0]}` : ''}! Vaša objednávka bola prijatá.
            </p>
            <p className="text-base text-gray-500">
              Objednávka č. <span className="font-bold text-gray-700">{orderNumber}</span>
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
                  <p className="text-gray-500 text-sm mb-3">Dvojitá Strecha + 4 Bočné Steny</p>
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
                  <p className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">Adresa Doručenia</p>
                  <p className="text-gray-600">{orderData.address || 'Adresa poskytnutá'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Truck className="text-green-600" size={20} />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">Predpokladané Doručenie</p>
                  <p className="text-gray-600 capitalize">{formattedDate}</p>
                  <p className="text-green-600 font-bold text-sm mt-1">Doprava ZADARMO</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Package className="text-blue-600" size={20} />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">Spôsob Platby</p>
                  <p className="text-gray-600">Dobierka - Platba pri doručení</p>
                  <p className="text-gray-500 text-sm mt-1">Suma na úhradu: <span className="font-bold text-gray-900">99,00 €</span></p>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="p-6 md:p-8 bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg uppercase">Celkom na Úhradu</span>
                <span className="text-3xl md:text-4xl font-black">99,00 €</span>
              </div>
              <p className="text-orange-100 text-sm mt-2">Ušetrili ste 120,00 € s letnou akciou!</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* What Happens Next */}
      <section className="px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl md:text-2xl font-black text-center mb-8 uppercase tracking-tight">
            Čo Bude Nasledovať?
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
                <h3 className="font-bold text-gray-900 mb-1">Potvrdenie cez SMS</h3>
                <p className="text-gray-600 text-sm">
                  Dostanete SMS potvrdenie na číslo {orderData.phone || 'poskytnuté'} s detailmi objednávky.
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
                <h3 className="font-bold text-gray-900 mb-1">Príprava a Odoslanie</h3>
                <p className="text-gray-600 text-sm">
                  Váš altánok bude pripravený a odoslaný do 24 hodín expresnou kuriérskou službou.
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
                <h3 className="font-bold text-gray-900 mb-1">Doručenie a Platba</h3>
                <p className="text-gray-600 text-sm">
                  Kuriér vás bude kontaktovať pred doručením. Zaplatíte 99€ v hotovosti pri prevzatí.
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
              <p className="text-xs font-bold text-gray-700 uppercase">Expresné Doručenie</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow border border-gray-100">
              <Shield className="text-green-500 mx-auto mb-2" size={28} />
              <p className="text-xs font-bold text-gray-700 uppercase">2 Roky Záruky</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow border border-gray-100">
              <Clock className="text-blue-500 mx-auto mb-2" size={28} />
              <p className="text-xs font-bold text-gray-700 uppercase">Vrátenie 30 Dní</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow border border-gray-100">
              <Star className="text-yellow-500 mx-auto mb-2" size={28} />
              <p className="text-xs font-bold text-gray-700 uppercase">4.9/5 Hviezdičiek</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 md:p-8 text-white text-center">
            <Phone className="mx-auto mb-4 text-orange-400" size={40} />
            <h3 className="text-xl md:text-2xl font-black mb-2 uppercase">Potrebujete Pomoc?</h3>
            <p className="text-gray-400 mb-4 text-sm md:text-base">
              Naša zákaznícka služba je k dispozícii od pondelka do piatku, 9:00 - 18:00
            </p>
            <a
              href="tel:+421123456789"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
            >
              <Phone size={20} />
              Kontaktujte Nás
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
              Exkluzívny Bonus!
            </h3>
            <p className="text-white/90 mb-4 text-sm md:text-base">
              S vašou objednávkou dostanete <strong>ZADARMO</strong> extra sadu kolíkov na ukotvenie na mäkkom teréne!
            </p>
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
              <span className="text-white font-bold">Hodnota: 19,90€ — ZADARMO</span>
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
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Ochrana Súkromia</Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">Podmienky</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Kontakt</Link>
          </div>
          <p className="text-xs text-gray-600">
            © 2024 Pop Up Gazebo Slovensko. Všetky práva vyhradené.
          </p>
        </div>
      </footer>
    </div>
  );
}
