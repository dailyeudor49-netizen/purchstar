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

export default function GazeboPlThankYou() {
  const [orderData, setOrderData] = useState<{
    fullName?: string;
    address?: string;
    phone?: string;
  }>({});

  useEffect(() => {
    const storedData = localStorage.getItem('gazebo-pl-order');
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
  const formattedDate = deliveryDate.toLocaleDateString('pl-PL', {
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
              Zamówienie Potwierdzone!
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-2">
              Dziękujemy{orderData.fullName ? `, ${orderData.fullName.split(' ')[0]}` : ''}! Twoje zamówienie zostało przyjęte.
            </p>
            <p className="text-base text-gray-500">
              Zamówienie nr <span className="font-bold text-gray-700">{orderNumber}</span>
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
                  <p className="text-gray-500 text-sm mb-3">Podwójny Dach + 4 Ścianki Boczne</p>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl md:text-3xl font-black text-orange-600">427 zł</span>
                    <span className="text-base text-gray-400 line-through">949 zł</span>
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
                  <p className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">Adres Dostawy</p>
                  <p className="text-gray-600">{orderData.address || 'Adres podany'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Truck className="text-green-600" size={20} />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">Przewidywana Dostawa</p>
                  <p className="text-gray-600 capitalize">{formattedDate}</p>
                  <p className="text-green-600 font-bold text-sm mt-1">Wysyłka GRATIS</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Package className="text-blue-600" size={20} />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">Sposób Płatności</p>
                  <p className="text-gray-600">Pobranie - Płatność przy dostawie</p>
                  <p className="text-gray-500 text-sm mt-1">Kwota do zapłaty: <span className="font-bold text-gray-900">427 zł</span></p>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="p-6 md:p-8 bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg uppercase">Razem do Zapłaty</span>
                <span className="text-3xl md:text-4xl font-black">427 zł</span>
              </div>
              <p className="text-orange-100 text-sm mt-2">Zaoszczędziłeś 522 zł dzięki letniej promocji!</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* What Happens Next */}
      <section className="px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl md:text-2xl font-black text-center mb-8 uppercase tracking-tight">
            Co Dalej?
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
                <h3 className="font-bold text-gray-900 mb-1">Potwierdzenie SMS</h3>
                <p className="text-gray-600 text-sm">
                  Otrzymasz SMS z potwierdzeniem na numer {orderData.phone || 'podany'} ze szczegółami zamówienia.
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
                <h3 className="font-bold text-gray-900 mb-1">Przygotowanie i Wysyłka</h3>
                <p className="text-gray-600 text-sm">
                  Twoja altana zostanie przygotowana i wysłana w ciągu 24 godzin ekspresową przesyłką kurierską.
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
                <h3 className="font-bold text-gray-900 mb-1">Dostawa i Płatność</h3>
                <p className="text-gray-600 text-sm">
                  Kurier skontaktuje się przed dostawą. Zapłacisz 427 zł gotówką przy odbiorze.
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
              <p className="text-xs font-bold text-gray-700 uppercase">Ekspresowa Dostawa</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow border border-gray-100">
              <Shield className="text-green-500 mx-auto mb-2" size={28} />
              <p className="text-xs font-bold text-gray-700 uppercase">2 Lata Gwarancji</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow border border-gray-100">
              <Clock className="text-blue-500 mx-auto mb-2" size={28} />
              <p className="text-xs font-bold text-gray-700 uppercase">Zwrot 30 Dni</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow border border-gray-100">
              <Star className="text-yellow-500 mx-auto mb-2" size={28} />
              <p className="text-xs font-bold text-gray-700 uppercase">4.9/5 Gwiazdek</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 md:p-8 text-white text-center">
            <Phone className="mx-auto mb-4 text-orange-400" size={40} />
            <h3 className="text-xl md:text-2xl font-black mb-2 uppercase">Potrzebujesz Pomocy?</h3>
            <p className="text-gray-400 mb-4 text-sm md:text-base">
              Nasza obsługa klienta jest dostępna od poniedziałku do piątku, 9:00 - 18:00
            </p>
            <a
              href="tel:+48123456789"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
            >
              <Phone size={20} />
              Skontaktuj Się Z Nami
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
              Ekskluzywny Bonus!
            </h3>
            <p className="text-white/90 mb-4 text-sm md:text-base">
              Do zamówienia otrzymasz <strong>GRATIS</strong> dodatkowy zestaw kołków do mocowania na miękkim podłożu!
            </p>
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
              <span className="text-white font-bold">Wartość: 79 zł — GRATIS</span>
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
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Polityka Prywatności</Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">Regulamin</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Kontakt</Link>
          </div>
          <p className="text-xs text-gray-600">
            © 2024 Pop Up Gazebo Polska. Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </footer>
    </div>
  );
}
