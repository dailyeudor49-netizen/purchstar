'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Script from 'next/script';
import { useRouter, useSearchParams } from 'next/navigation';

// --- API CONFIG ---
const API_CONFIG = {
  url: 'https://offers.italiadrop.com/forms/api/',
  uid: '019be4ed-fb60-7ba4-89d4-deecc13c8b0a',
  key: '7b172b0b1994e9fa9961ad',
  offer: '2219',
  lp: '2258'
};

// --- DATA ---
const REVIEWS = [
  { name: "Maria Silva", title: "Ja nao me imagino sem ele! Mudou a minha vida", rating: 5, date: "Ha 2 dias", text: "Era cetica por causa do preco tao baixo, mas e incrivel. Cozinha tudo sozinho, e facil de limpar e as receitas sao um sucesso garantido. Chegou em 48 horas!", verified: true },
  { name: "Carlos Santos", title: "Qualidade acima das expectativas", rating: 5, date: "Ha 1 semana", text: "Materiais solidos e motor muito potente. Ontem a noite fiz um risotto e ficou perfeito, cremoso como num restaurante. Por 109 euros e um presente.", verified: true },
  { name: "Laura Ferreira", title: "Excelente compra", rating: 4, date: "Ha 3 dias", text: "Comprei como presente para a minha mae, agora a minha irma tambem quer um. O ecra e muito intuitivo.", verified: true },
  { name: "Jose Oliveira", title: "Encomenda chegou intacta e a tempo", rating: 5, date: "Ha 4 dias", text: "O estafeta foi muito simpatico. Paguei em dinheiro como prometido. O robo e robusto e faz imensas coisas. Recomendo!", verified: true },
  { name: "Ana Costa", title: "Substitui tudo na cozinha", rating: 5, date: "Ha 5 dias", text: "Deitei fora a velha batedeira e a panela a vapor. Este faz tudo. O ecra e grande e ve-se muito bem.", verified: true },
  { name: "Roberto Pereira", title: "Relacao qualidade-preco imbativel", rating: 5, date: "Ha 6 dias", text: "Vi produtos semelhantes a 400 euros. Este a 109 euros e uma oferta irrepetivel. A balanca e muito precisa.", verified: true },
  { name: "Elena Rodrigues", title: "A minha filha adora", rating: 5, date: "Ha 1 semana", text: "Fazemos sobremesas juntas a ver as videoreceitas. Tornou-se o nosso momento favorito do dia.", verified: true },
  { name: "Miguel Martins", title: "Potente e silencioso", rating: 4, date: "Ha 1 semana", text: "Esperava que fizesse mais barulho ao amassar, mas e bastante silencioso. Perfeito para viver em apartamento.", verified: true },
  { name: "Carmen Almeida", title: "Receitas faceis e deliciosas", rating: 5, date: "Ha 9 dias", text: "Nao sou boa cozinheira, mas com o guia passo a passo nao falho. O meu marido ficou surpreendido!", verified: true },
  { name: "Paulo Gomes", title: "Envio rapidissimo", rating: 5, date: "Ha 10 dias", text: "Pedi na segunda, chegou na quarta de manha. Embalagem perfeita. O kit de acessorios e realmente completo.", verified: true },
  { name: "Sara Lopes", title: "O ecra e revolucionario", rating: 5, date: "Ha 11 dias", text: "Ver os videos enquanto cozinhas elimina qualquer duvida. Nunca voltaria aos velhos livros de receitas em papel.", verified: true },
  { name: "David Sousa", title: "Perfeito para comida de bebes", rating: 5, date: "Ha 12 dias", text: "Cozedura a vapor e trituracao perfeitas. Ideal para familias com criancas pequenas.", verified: true },
  { name: "Marta Ribeiro", title: "Design moderno e funcional", rating: 5, date: "Ha 2 semanas", text: "Fica otimo na bancada da cozinha. Branco, brilhante, muito elegante. Facil de desmontar e lavar.", verified: true },
  { name: "Jorge Fernandes", title: "Uma verdadeira ajuda", rating: 4, date: "Ha 2 semanas", text: "Ajuda-me a comer mais saudavel gracas a cozedura a vapor. O unico defeito: gostaria que o cabo fosse um pouco mais comprido.", verified: true },
  { name: "Andrea Carvalho", title: "Super feliz com a compra", rating: 5, date: "Ha 3 semanas", text: "Uso todos os dias. Desde refogar ate fazer massa, faz tudo. Vale muito mais do que custa.", verified: true }
];

const ACCESSORIES = [
  { name: "Jarro XL 4.5L", img: "/images/chef-pro/boccale.jpg" },
  { name: "Conjunto Vaporizador Completo", img: "/images/chef-pro/vapore.jpg" },
  { name: "Cesto de Cozedura", img: "/images/chef-pro/cestello-di-cottura.jpg" },
  { name: "Acessorio Misturador Borboleta", img: "/images/chef-pro/accessorio-mixer.jpg" },
  { name: "Espatula de Silicone", img: "/images/chef-pro/spatola.jpg" },
  { name: "Laminas de Aco Inoxidavel", img: "/images/chef-pro/lame.jpg" }
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

      router.push('/ty/ty-fb-chefdrop-pt');
    } catch (error) {
      console.error('[Network API] Error:', error);
      router.push('/ty/ty-fb-chefdrop-pt');
    }
  };

  if (orderStatus === 'success') {
    return (
      <div className="bg-white p-12 rounded-3xl shadow-2xl text-center border-4 border-green-500 animate-in zoom-in duration-500">
        <div className="text-7xl mb-6">✅</div>
        <h2 className="text-3xl font-black mb-4">ENCOMENDA CONFIRMADA!</h2>
        <p className="text-gray-600 mb-8 font-medium">Obrigado pela sua compra. O nosso consultor ligara em 15 minutos para confirmar os dados de envio.</p>
        <div className="p-4 bg-green-50 text-green-700 font-bold rounded-2xl">
          A sua encomenda chegara em 24/48h. Prepare 109€ em dinheiro para o estafeta!
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
        <h2 className="text-3xl font-black uppercase mb-2">Encomende Agora</h2>
        <p className="text-rose-600 font-bold uppercase text-sm">Pagamento contra reembolso</p>
      </div>
      <form onSubmit={handleOrder} className="space-y-6">
        <input type="hidden" name="tmfp" />
        <div className="space-y-2">
          <label className="block text-sm font-black text-gray-700 uppercase">Nome Completo *</label>
          <input
            required
            type="text"
            name="name"
            placeholder="ex. Joao Silva"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-rose-600 outline-none transition-colors font-medium"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-black text-gray-700 uppercase">Telefone (para o estafeta) *</label>
          <input
            required
            type="tel"
            name="phone"
            placeholder="ex. 912 345 678"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-rose-600 outline-none transition-colors font-medium"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-black text-gray-700 uppercase">Morada Completa *</label>
          <input
            required
            type="text"
            name="address"
            placeholder="Rua, Numero, Cidade, Codigo Postal"
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
          ) : "Confirmar Encomenda ➔"}
        </button>
        <p className="text-[10px] text-center text-gray-400 leading-tight">
          Ao enviar a encomenda aceita as condicoes de venda. Os seus dados estao protegidos com encriptacao SSL de 256 bits.
        </p>
      </form>
    </div>
  );
};

const OrderForm = ({ formRef }: { formRef: React.RefObject<HTMLDivElement | null> }) => (
  <section ref={formRef} className="py-24 px-6 bg-rose-50 scroll-mt-20">
    <div className="max-w-md mx-auto">
      <Suspense fallback={<div className="py-20 text-center">A carregar...</div>}>
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
          🔥 Oferta de <span className="text-rose-500">Liquidacao</span> termina em: <span className="text-yellow-400">{formatTime(timeLeft)}</span> - Apenas 12 unidades restantes
        </div>

        <main className="max-w-4xl mx-auto bg-white shadow-2xl relative">

          {/* HERO */}
          <section className="p-6 md:p-12 text-center">
            <div className="inline-block bg-rose-600 text-white px-4 py-1 rounded-full text-xs font-black uppercase mb-6 animate-bounce">
              Desconto Imediato -70%
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-none mb-6 tracking-tighter">
              COZINHE COMO UM PROFISSIONAL POR APENAS <span className="text-rose-600">109€</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto font-medium">
              O Melhor Robo de Cozinha Inteligente. Substitui 15 eletrodomesticos. Videoreceitas e controlo por app.
            </p>

            <div className="relative max-w-lg mx-auto mb-10 group">
              <img
                src="/images/chef-pro/monsieur-cuisine-smart.jpg"
                alt="Robo de Cozinha Inteligente"
                className="w-full h-auto rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -top-6 -right-6 bg-yellow-400 text-black w-28 h-28 rounded-full flex flex-col items-center justify-center font-black shadow-2xl rotate-12 border-4 border-white animate-pulse">
                <span className="text-sm line-through opacity-60">229€</span>
                <span className="text-2xl italic">109€</span>
              </div>
            </div>

            <button
              onClick={scrollToForm}
              className="w-full max-w-md bg-rose-600 text-white text-2xl font-black py-6 rounded-2xl shadow-[0_10px_0_0_#9f1239] hover:shadow-[0_5px_0_0_#9f1239] hover:translate-y-1 active:scale-95 transition-all uppercase tracking-tight"
            >
              Sim! Quero por 109€ ➔
            </button>
            <p className="mt-6 text-green-600 font-bold flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
              Pagamento contra reembolso e Envio Gratis
            </p>
          </section>

          {/* AGGRESSIVE BANNER */}
          <div className="bg-rose-600 text-white py-10 px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-4 leading-tight">
              ⚠️ ATENCAO: ULTIMAS UNIDADES EM STOCK ⚠️
            </h2>
            <p className="text-lg opacity-90 font-medium">
              Estamos a esvaziar o armazem antes da renovacao de stock. <br className="hidden md:block"/>
              Quando esgotarem, o preco volta a 229€. Nao perca esta oportunidade unica!
            </p>
          </div>

          {/* SMART FEATURES SECTION */}
          <section className="py-16 px-6 bg-gray-50">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">Tecnologia do Futuro</h2>
              <div className="h-2 w-24 bg-rose-600 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
              <div className="order-2 md:order-1">
                <span className="text-rose-600 font-black uppercase text-sm tracking-widest">Ecra 8" HD</span>
                <h3 className="text-3xl font-black mt-2 mb-6 leading-tight">Videoreceitas Integradas: Impossivel Errar!</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Veja os chefs a preparar o prato consigo. O robo guia-o passo a passo com <strong>videos em alta definicao</strong> diretamente no ecra tactil. Pause e retome quando quiser.
                </p>
                <ul className="space-y-4">
                  {["Mais de 1200 videoreceitas pre-carregadas", "Atualizacoes gratuitas por Wi-Fi", "Guia de voz inteligente"].map((t, i) => (
                    <li key={i} className="flex items-center gap-3 font-bold text-gray-800">
                      <span className="bg-green-100 text-green-600 p-1 rounded-full">✓</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 md:order-2">
                <img src="/images/chef-pro/monsieur-cuisine-smart (1).jpg" className="rounded-3xl shadow-2xl border-8 border-white" alt="Videoreceitas" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <img src="/images/chef-pro/monsieur-cuisine-smart (2).jpg" className="rounded-3xl shadow-2xl border-8 border-white" alt="App para smartphone" />
              </div>
              <div>
                <span className="text-rose-600 font-black uppercase text-sm tracking-widest">App Dedicada</span>
                <h3 className="text-3xl font-black mt-2 mb-6 leading-tight">Controle Tudo a partir do Smartphone</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Esta no trabalho? Escolha uma receita na app e envie-a para o robo. Crie a lista de compras, planeie as refeicoes e receba notificacoes quando o jantar estiver pronto.
                </p>
                <ul className="space-y-4">
                  {["Compativel com iOS e Android", "Planificador semanal", "Lista de compras inteligente"].map((t, i) => (
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
              <h2 className="text-4xl font-black uppercase mb-4">O KIT MAIS COMPLETO DE SEMPRE</h2>
              <p className="text-gray-400 italic">Tudo incluido por 109€ - Valor dos acessorios em separado: 149€</p>
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
            <h2 className="text-3xl font-black mb-10 tracking-tighter">Opiniones dos clientes</h2>

            <div className="flex flex-col md:flex-row gap-12 mb-16 border-b border-gray-100 pb-12">
              <div className="w-full md:w-1/3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-yellow-500 text-2xl">★★★★★</div>
                  <span className="text-xl font-black text-gray-900">4.8 de 5</span>
                </div>
                <p className="text-gray-500 text-sm mb-6">1.452 avaliacoes globais</p>

                <div className="space-y-3">
                  {[
                    { s: 5, p: 88 },
                    { s: 4, p: 9 },
                    { s: 3, p: 2 },
                    { s: 2, p: 1 },
                    { s: 1, p: 0 }
                  ].map((row) => (
                    <div key={row.s} className="flex items-center gap-4 group cursor-pointer">
                      <span className="text-sm text-blue-600 hover:underline min-w-[60px]">{row.s} estrelas</span>
                      <div className="flex-1 h-5 bg-gray-100 rounded-sm overflow-hidden">
                        <div className="h-full bg-yellow-400 group-hover:bg-yellow-500 transition-colors" style={{ width: `${row.p}%` }}></div>
                      </div>
                      <span className="text-sm text-gray-500 min-w-[30px]">{row.p}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 md:border-l border-gray-100 md:pl-12">
                <h3 className="text-xl font-bold mb-3">Avalie este produto</h3>
                <p className="text-gray-600 mb-6">Partilhe a sua experiencia culinaria com outros utilizadores.</p>
                <button className="w-full md:w-auto px-10 py-2.5 border border-gray-300 rounded-lg font-bold shadow-sm hover:bg-gray-50 transition-colors">
                  Escrever uma opiniao
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
                  <p className="text-xs text-gray-500 mb-3">Avaliado em Portugal {rev.date}</p>
                  {rev.verified && <p className="text-xs font-black text-orange-700 mb-3">Compra verificada</p>}
                  <p className="text-gray-800 leading-relaxed mb-6">{rev.text}</p>
                  <div className="flex items-center gap-6">
                    <button className="px-8 py-1.5 border border-gray-300 rounded-lg text-sm font-medium shadow-sm hover:bg-gray-50">Util</button>
                    <button className="text-gray-400 text-sm hover:underline">Denunciar</button>
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
                ) : "Mostrar mais opinioes"}
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
                { t: "Satisfacao ou Devolucao", icon: "💎" },
                { t: "Apoio em Portugal", icon: "🇵🇹" }
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
            <p>© 2024 RoboChef Portugal - Venda Afiliada</p>
            <div className="flex justify-center gap-6 mt-4 font-bold uppercase">
              <a href="#" className="hover:text-rose-600 transition-colors">Privacidade</a>
              <a href="#" className="hover:text-rose-600 transition-colors">Termos</a>
              <a href="#" className="hover:text-rose-600 transition-colors">Contacto</a>
            </div>
          </footer>

        </main>

        {/* MOBILE STICKY CTA */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-gray-200 z-50 md:hidden flex items-center justify-between gap-4 animate-in slide-in-from-bottom duration-500">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase text-gray-400">Oferta</span>
            <span className="text-3xl font-black text-rose-600 leading-none">109€</span>
          </div>
          <button
            onClick={scrollToForm}
            className="flex-1 bg-rose-600 text-white font-black py-4 rounded-xl shadow-xl animate-pulse uppercase text-sm tracking-tighter"
          >
            Encomendar com 1 Click
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
              <p className="text-sm font-black text-gray-900">{notificationName} acabou de encomendar o RoboChef Smart!</p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
