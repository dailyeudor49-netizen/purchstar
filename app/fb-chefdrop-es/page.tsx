'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Script from 'next/script';
import { useRouter, useSearchParams } from 'next/navigation';

// --- API CONFIG ---
const API_CONFIG = {
  url: 'https://offers.italiadrop.com/forms/api/',
  uid: '019be4ed-fb60-7ba4-89d4-deecc13c8b0a',
  key: '7b172b0b1994e9fa9961ad',
  offer: '2218',
  lp: '2257'
};

// --- DATA ---
const REVIEWS = [
  { name: "Maria Garcia", title: "Ya no me imagino sin el! Ha cambiado mi vida", rating: 5, date: "Hace 2 dias", text: "Era esceptica por el precio tan bajo, pero es increible. Cocina todo solo, es facil de limpiar y las recetas son un exito garantizado. Me llego en 48 horas!", verified: true },
  { name: "Carlos Rodriguez", title: "Calidad por encima de las expectativas", rating: 5, date: "Hace 1 semana", text: "Materiales solidos y motor muy potente. Anoche hice un risotto y quedo perfecto, cremoso como en un restaurante. Por 89 euros es un regalo.", verified: true },
  { name: "Laura Martinez", title: "Excelente compra", rating: 4, date: "Hace 3 dias", text: "Lo compre como regalo para mi madre, ahora mi hermana tambien quiere uno. La pantalla es muy intuitiva.", verified: true },
  { name: "Jose Fernandez", title: "Paquete llegado intacto y a tiempo", rating: 5, date: "Hace 4 dias", text: "El mensajero fue muy amable. Pague en efectivo como prometido. El robot es robusto y hace un monton de cosas. Recomendado!", verified: true },
  { name: "Ana Lopez", title: "Sustituye todo en la cocina", rating: 5, date: "Hace 5 dias", text: "Tire la vieja batidora y la vaporera. Este hace todo. La pantalla es grande y se ve muy bien.", verified: true },
  { name: "Roberto Sanchez", title: "Relacion calidad-precio imbatible", rating: 5, date: "Hace 6 dias", text: "He visto productos similares a 400 euros. Este a 89 euros es una oferta irrepetible. La bascula es muy precisa.", verified: true },
  { name: "Elena Torres", title: "A mi hija le encanta", rating: 5, date: "Hace 1 semana", text: "Hacemos postres juntas viendo las videorecetas. Se ha convertido en nuestro momento favorito del dia.", verified: true },
  { name: "Miguel Ruiz", title: "Potente y silencioso", rating: 4, date: "Hace 1 semana", text: "Esperaba que hiciera mas ruido al amasar, pero es bastante silencioso. Perfecto para vivir en piso.", verified: true },
  { name: "Carmen Diaz", title: "Recetas faciles y deliciosas", rating: 5, date: "Hace 9 dias", text: "No soy buena cocinera, pero con la guia paso a paso no fallo. Mi marido se quedo sorprendido!", verified: true },
  { name: "Pablo Moreno", title: "Envio rapidisimo", rating: 5, date: "Hace 10 dias", text: "Pedi el lunes, llego el miercoles por la manana. Embalaje perfecto. El kit de accesorios es realmente completo.", verified: true },
  { name: "Sara Jimenez", title: "La pantalla es revolucionaria", rating: 5, date: "Hace 11 dias", text: "Ver los videos mientras cocinas elimina cualquier duda. Nunca volveria a los viejos libros de cocina en papel.", verified: true },
  { name: "David Gonzalez", title: "Perfecto para comida de bebes", rating: 5, date: "Hace 12 dias", text: "Coccion al vapor y trituracion perfectas. Ideal para familias con ninos pequenos.", verified: true },
  { name: "Marta Perez", title: "Diseno moderno y funcional", rating: 5, date: "Hace 2 semanas", text: "Queda genial en la encimera de la cocina. Blanco, brillante, muy elegante. Facil de desmontar y lavar.", verified: true },
  { name: "Jorge Alvarez", title: "Una verdadera ayuda", rating: 4, date: "Hace 2 semanas", text: "Me ayuda a comer mas sano gracias a la coccion al vapor. El unico defecto: me gustaria que el cable fuera un poco mas largo.", verified: true },
  { name: "Andrea Romero", title: "Super feliz con la compra", rating: 5, date: "Hace 3 semanas", text: "Lo uso todos los dias. Desde sofreir hasta hacer masa, hace de todo. Vale mucho mas de lo que cuesta.", verified: true }
];

const ACCESSORIES = [
  { name: "Jarra XL 4.5L", img: "/images/chef-pro/boccale.jpg" },
  { name: "Set Vaporera Completo", img: "/images/chef-pro/vapore.jpg" },
  { name: "Cesta de Coccion", img: "/images/chef-pro/cestello-di-cottura.jpg" },
  { name: "Accesorio Mezclador Mariposa", img: "/images/chef-pro/accessorio-mixer.jpg" },
  { name: "Espatula de Silicona", img: "/images/chef-pro/spatola.jpg" },
  { name: "Cuchillas de Acero Inoxidable", img: "/images/chef-pro/lame.jpg" }
];

// --- ORDER FORM COMPONENT ---
const OrderFormContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderStatus, setOrderStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderStatus('loading');

    try {
      const form = e.currentTarget as HTMLFormElement;
      const tmfpInput = form.querySelector('input[name="tmfp"]') as HTMLInputElement;
      const tmfp = tmfpInput?.value || '';

      const params = new URLSearchParams({
        uid: API_CONFIG.uid,
        key: API_CONFIG.key,
        offer: API_CONFIG.offer,
        lp: API_CONFIG.lp,
        name: formData.name,
        tel: formData.phone,
        'street-address': formData.address,
        ua: navigator.userAgent,
        tmfp: tmfp,
      });

      // Add UTM params
      const utmSource = searchParams.get('utm_source');
      const utmMedium = searchParams.get('utm_medium');
      const utmCampaign = searchParams.get('utm_campaign');
      const utmContent = searchParams.get('utm_content');
      const utmTerm = searchParams.get('utm_term');

      if (utmSource) params.append('utm_source', utmSource);
      if (utmMedium) params.append('utm_medium', utmMedium);
      if (utmCampaign) params.append('utm_campaign', utmCampaign);
      if (utmContent) params.append('utm_content', utmContent);
      if (utmTerm) params.append('utm_term', utmTerm);

      await fetch(API_CONFIG.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      router.push('/ty/ty-fb-chefdrop-es');
    } catch (error) {
      console.error('[Network API] Error:', error);
      router.push('/ty/ty-fb-chefdrop-es');
    }
  };

  if (orderStatus === 'success') {
    return (
      <div className="bg-white p-12 rounded-3xl shadow-2xl text-center border-4 border-green-500 animate-in zoom-in duration-500">
        <div className="text-7xl mb-6">✅</div>
        <h2 className="text-3xl font-black mb-4">PEDIDO CONFIRMADO!</h2>
        <p className="text-gray-600 mb-8 font-medium">Gracias por tu compra. Nuestro consultor te llamara en 15 minutos para confirmar los datos de envio.</p>
        <div className="p-4 bg-green-50 text-green-700 font-bold rounded-2xl">
          Tu paquete llegara en 24/48h. Prepara 89€ en efectivo para el mensajero!
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border-4 border-rose-600 relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-rose-600 text-white px-6 py-2 rounded-bl-2xl font-black text-xs uppercase tracking-tighter">
        Envio Gratis
      </div>
      <div className="text-center mb-10 mt-4">
        <h2 className="text-3xl font-black uppercase mb-2">Pide Ahora</h2>
        <p className="text-rose-600 font-bold uppercase text-sm">Pago contra reembolso</p>
      </div>
      <form onSubmit={handleOrder} className="space-y-6">
        <input type="hidden" name="tmfp" />
        <div className="space-y-2">
          <label className="block text-sm font-black text-gray-700 uppercase">Nombre y Apellidos *</label>
          <input
            required
            type="text"
            name="name"
            placeholder="ej. Juan Garcia"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-rose-600 outline-none transition-colors font-medium"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-black text-gray-700 uppercase">Telefono (para el mensajero) *</label>
          <input
            required
            type="tel"
            name="phone"
            placeholder="ej. 612 345 678"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-rose-600 outline-none transition-colors font-medium"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-black text-gray-700 uppercase">Direccion Completa *</label>
          <input
            required
            type="text"
            name="address"
            placeholder="Calle, Numero, Ciudad, Codigo Postal"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-rose-600 outline-none transition-colors font-medium"
          />
        </div>

        <button
          disabled={orderStatus === 'loading'}
          className="w-full bg-rose-600 text-white text-2xl font-black py-6 rounded-2xl shadow-[0_10px_0_0_#9f1239] active:translate-y-1 active:shadow-none transition-all uppercase mt-8 flex items-center justify-center"
        >
          {orderStatus === 'loading' ? (
            <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : "Confirmar Pedido ➔"}
        </button>
        <p className="text-[10px] text-center text-gray-400 leading-tight">
          Al enviar el pedido aceptas las condiciones de venta. Tus datos estan protegidos con cifrado SSL de 256 bits.
        </p>
      </form>
    </div>
  );
};

const OrderForm = ({ formRef }: { formRef: React.RefObject<HTMLDivElement | null> }) => (
  <section ref={formRef} className="py-24 px-6 bg-rose-50 scroll-mt-20">
    <div className="max-w-md mx-auto">
      <Suspense fallback={<div className="py-20 text-center">Cargando...</div>}>
        <OrderFormContent />
      </Suspense>
    </div>
  </section>
);

// --- MAIN COMPONENT ---
export default function LandingPage() {
  const [timeLeft, setTimeLeft] = useState(600);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationName, setNotificationName] = useState("");

  const formRef = useRef<HTMLDivElement>(null);

  // Timer scarcity
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(prev => prev > 0 ? prev - 1 : 0), 1000);
    return () => clearInterval(timer);
  }, []);

  // Social Proof
  useEffect(() => {
    const names = ["Maria", "Carlos", "Laura", "Jose", "Ana", "Miguel", "Carmen"];
    const interval = setInterval(() => {
      setNotificationName(names[Math.floor(Math.random() * names.length)]);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 4000);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth' });

  const loadMoreReviews = () => {
    setIsLoadingReviews(true);
    setTimeout(() => {
      setVisibleReviews(prev => Math.min(prev + 3, REVIEWS.length));
      setIsLoadingReviews(false);
    }, 600);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <>
      {/* Fingerprint Script */}
      <Script
        src="https://offers.italiadrop.com/forms/tmfp/"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      {/* Click Tracking Pixel */}
      <img
        src={`https://offers.italiadrop.com/forms/api/ck/?o=${API_CONFIG.offer}&uid=${API_CONFIG.uid}&lp=${API_CONFIG.lp}`}
        style={{ width: '1px', height: '1px', display: 'none' }}
        alt=""
      />

      <div className="bg-gray-50 min-h-screen font-sans text-gray-900 selection:bg-rose-100 selection:text-rose-600">

        {/* Top Urgency Bar */}
        <div className="bg-black text-white py-2 text-center text-[10px] md:text-xs font-bold uppercase tracking-widest sticky top-0 z-[60]">
          🔥 Oferta de <span className="text-rose-500">Liquidacion</span> termina en: <span className="text-yellow-400">{formatTime(timeLeft)}</span> - Solo quedan 12 unidades
        </div>

        <main className="max-w-4xl mx-auto bg-white shadow-2xl relative">

          {/* HERO */}
          <section className="p-6 md:p-12 text-center">
            <div className="inline-block bg-rose-600 text-white px-4 py-1 rounded-full text-xs font-black uppercase mb-6 animate-bounce">
              Descuento Inmediato -70%
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-none mb-6 tracking-tighter">
              COCINA COMO UN PROFESIONAL POR SOLO <span className="text-rose-600">89€</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto font-medium">
              El Mejor Robot de Cocina Inteligente. Sustituye 15 electrodomesticos. Videorecetas y control por app.
            </p>

            <div className="relative max-w-lg mx-auto mb-10 group">
              <img
                src="/images/chef-pro/monsieur-cuisine-smart.jpg"
                alt="Robot de Cocina Inteligente"
                className="w-full h-auto rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -top-6 -right-6 bg-yellow-400 text-black w-28 h-28 rounded-full flex flex-col items-center justify-center font-black shadow-2xl rotate-12 border-4 border-white animate-pulse">
                <span className="text-sm line-through opacity-60">229€</span>
                <span className="text-2xl italic">89€</span>
              </div>
            </div>

            <button
              onClick={scrollToForm}
              className="w-full max-w-md bg-rose-600 text-white text-2xl font-black py-6 rounded-2xl shadow-[0_10px_0_0_#9f1239] hover:shadow-[0_5px_0_0_#9f1239] hover:translate-y-1 active:scale-95 transition-all uppercase tracking-tight"
            >
              Si! Lo Quiero por 89€ ➔
            </button>
            <p className="mt-6 text-green-600 font-bold flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
              Pago contra reembolso y Envio Gratis
            </p>
          </section>

          {/* AGGRESSIVE BANNER */}
          <div className="bg-rose-600 text-white py-10 px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-4 leading-tight">
              ⚠️ ATENCION: ULTIMAS UNIDADES EN STOCK ⚠️
            </h2>
            <p className="text-lg opacity-90 font-medium">
              Estamos vaciando el almacen antes de la renovacion de existencias. <br className="hidden md:block"/>
              Cuando se agoten, el precio volvera a 229€. No te pierdas esta oportunidad unica!
            </p>
          </div>

          {/* SMART FEATURES SECTION */}
          <section className="py-16 px-6 bg-gray-50">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">Tecnologia del Futuro</h2>
              <div className="h-2 w-24 bg-rose-600 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
              <div className="order-2 md:order-1">
                <span className="text-rose-600 font-black uppercase text-sm tracking-widest">Pantalla 8" HD</span>
                <h3 className="text-3xl font-black mt-2 mb-6 leading-tight">Videorecetas Integradas: Imposible Equivocarse!</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Mira a los chefs preparando el plato contigo. El robot te guia paso a paso con <strong>videos en alta definicion</strong> directamente en la pantalla tactil. Pausa y reanuda cuando quieras.
                </p>
                <ul className="space-y-4">
                  {["Mas de 1200 videorecetas precargadas", "Actualizaciones gratuitas por Wi-Fi", "Guia de voz inteligente"].map((t, i) => (
                    <li key={i} className="flex items-center gap-3 font-bold text-gray-800">
                      <span className="bg-green-100 text-green-600 p-1 rounded-full">✓</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 md:order-2">
                <img src="/images/chef-pro/monsieur-cuisine-smart (1).jpg" className="rounded-3xl shadow-2xl border-8 border-white" alt="Videorecetas" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <img src="/images/chef-pro/monsieur-cuisine-smart (2).jpg" className="rounded-3xl shadow-2xl border-8 border-white" alt="App para smartphone" />
              </div>
              <div>
                <span className="text-rose-600 font-black uppercase text-sm tracking-widest">App Dedicada</span>
                <h3 className="text-3xl font-black mt-2 mb-6 leading-tight">Controla Todo desde tu Smartphone</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Estas en el trabajo? Elige una receta desde la app y enviala al robot. Crea la lista de la compra, planifica las comidas y recibe notificaciones cuando la cena este lista.
                </p>
                <ul className="space-y-4">
                  {["Compatible con iOS y Android", "Planificador semanal", "Lista de la compra inteligente"].map((t, i) => (
                    <li key={i} className="flex items-center gap-3 font-bold text-gray-800">
                      <span className="bg-green-100 text-green-600 p-1 rounded-full">✓</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ACCESSORIES BUNDLE */}
          <section className="py-20 bg-gray-900 text-white px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black uppercase mb-4">EL KIT MAS COMPLETO DE LA HISTORIA</h2>
              <p className="text-gray-400 italic">Todo incluido en 89€ - Valor de los accesorios por separado: 149€</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {ACCESSORIES.map((acc, idx) => (
                <div key={idx} className="bg-gray-800 p-4 rounded-2xl border border-gray-700 text-center group hover:border-rose-500 transition-colors">
                  <img src={acc.img} alt={acc.name} className="w-full aspect-square object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform" />
                  <p className="font-bold text-sm uppercase">{acc.name}</p>
                </div>
              ))}
            </div>
          </section>

          {/* AMAZON REVIEWS SECTION */}
          <section className="py-20 px-6 border-t border-gray-100">
            <h2 className="text-3xl font-black mb-10 tracking-tighter">Opiniones de los clientes</h2>

            <div className="flex flex-col md:flex-row gap-12 mb-16 border-b border-gray-100 pb-12">
              <div className="w-full md:w-1/3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-yellow-500 text-2xl">★★★★★</div>
                  <span className="text-xl font-black text-gray-900">4.8 de 5</span>
                </div>
                <p className="text-gray-500 text-sm mb-6">1.452 valoraciones globales</p>

                <div className="space-y-3">
                  {[
                    { s: 5, p: 88 },
                    { s: 4, p: 9 },
                    { s: 3, p: 2 },
                    { s: 2, p: 1 },
                    { s: 1, p: 0 }
                  ].map((row) => (
                    <div key={row.s} className="flex items-center gap-4 group cursor-pointer">
                      <span className="text-sm text-blue-600 hover:underline min-w-[60px]">{row.s} estrellas</span>
                      <div className="flex-1 h-5 bg-gray-100 rounded-sm overflow-hidden">
                        <div className="h-full bg-yellow-400 group-hover:bg-yellow-500 transition-colors" style={{ width: `${row.p}%` }}></div>
                      </div>
                      <span className="text-sm text-gray-500 min-w-[30px]">{row.p}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 md:border-l border-gray-100 md:pl-12">
                <h3 className="text-xl font-bold mb-3">Valora este producto</h3>
                <p className="text-gray-600 mb-6">Comparte tu experiencia culinaria con otros usuarios.</p>
                <button className="w-full md:w-auto px-10 py-2.5 border border-gray-300 rounded-lg font-bold shadow-sm hover:bg-gray-50 transition-colors">
                  Escribir una opinion
                </button>
              </div>
            </div>

            <div className="space-y-12">
              {REVIEWS.slice(0, visibleReviews).map((rev, i) => (
                <div key={i} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                    </div>
                    <span className="font-bold text-sm">{rev.name}</span>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex text-yellow-500 text-xs">{"★".repeat(rev.rating)}{"☆".repeat(5-rev.rating)}</div>
                    <h4 className="font-black text-gray-900">{rev.title}</h4>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">Valorado en Espana {rev.date}</p>
                  {rev.verified && <p className="text-xs font-black text-orange-700 mb-3">Compra verificada</p>}
                  <p className="text-gray-800 leading-relaxed mb-6">{rev.text}</p>
                  <div className="flex items-center gap-6">
                    <button className="px-8 py-1.5 border border-gray-300 rounded-lg text-sm font-medium shadow-sm hover:bg-gray-50">Util</button>
                    <button className="text-gray-400 text-sm hover:underline">Informar</button>
                  </div>
                </div>
              ))}
            </div>

            {visibleReviews < REVIEWS.length && (
              <button
                onClick={loadMoreReviews}
                disabled={isLoadingReviews}
                className="w-full mt-16 py-4 border-2 border-gray-200 rounded-xl font-black text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-3"
              >
                {isLoadingReviews ? (
                  <div className="w-6 h-6 border-4 border-gray-300 border-t-rose-600 rounded-full animate-spin"></div>
                ) : "Mostrar mas opiniones"}
              </button>
            )}
          </section>

          {/* ORDER FORM SECTION */}
          <OrderForm formRef={formRef} />

          {/* TRUST BADGES */}
          <section className="py-16 bg-white border-t border-gray-100 px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
              {[
                { t: "Envio 24/48h", icon: "🚚" },
                { t: "Garantia 2 Anos", icon: "🛡️" },
                { t: "Satisfaccion o Devolucion", icon: "💎" },
                { t: "Atencion en Espana", icon: "🇪🇸" }
              ].map((badge, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <p className="text-[10px] font-black uppercase tracking-widest">{badge.t}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FOOTER */}
          <footer className="py-12 bg-gray-50 border-t border-gray-200 px-6 text-center text-[10px] text-gray-400">
            <p>© 2024 RoboChef Espana - Venta Afiliada</p>
            <div className="flex justify-center gap-6 mt-4 font-bold uppercase">
              <a href="#" className="hover:text-rose-600 transition-colors">Privacidad</a>
              <a href="#" className="hover:text-rose-600 transition-colors">Terminos</a>
              <a href="#" className="hover:text-rose-600 transition-colors">Contacto</a>
            </div>
          </footer>

        </main>

        {/* MOBILE STICKY CTA */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-gray-200 z-50 md:hidden flex items-center justify-between gap-4 animate-in slide-in-from-bottom duration-500">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase text-gray-400">Oferta</span>
            <span className="text-3xl font-black text-rose-600 leading-none">89€</span>
          </div>
          <button
            onClick={scrollToForm}
            className="flex-1 bg-rose-600 text-white font-black py-4 rounded-xl shadow-xl animate-pulse uppercase text-sm tracking-tighter"
          >
            Pedir con 1 Click
          </button>
        </div>

        {/* SOCIAL PROOF POPUP */}
        <div className={`fixed bottom-24 left-4 right-4 md:left-8 md:right-auto md:w-80 bg-white shadow-2xl rounded-2xl p-4 border-l-8 border-green-500 transition-all duration-700 z-[70] ${showNotification ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-90 pointer-events-none'}`}>
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-2 rounded-full text-green-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase">Ultima Compra</p>
              <p className="text-sm font-black text-gray-900">{notificationName} acaba de pedir el RoboChef Smart!</p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
