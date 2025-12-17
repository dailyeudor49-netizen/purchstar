'use client';

import React, { useState, useEffect, Suspense } from 'react';
import {
  ArrowDown,
  Star,
  XCircle,
  CheckCircle2,
  Droplets,
  Clock,
  ShieldCheck,
  Sparkles,
  Quote,
  Shield,
  Truck,
  CreditCard,
  ShoppingBag,
  Send,
  Loader2
} from 'lucide-react';
import Script from 'next/script';
import { useSearchParams } from 'next/navigation';

// --- FACEBOOK PIXEL CONFIG ---
const FB_PIXEL_ID = '1576025786901423';

// --- CONSTANTS ---
const IMAGES = {
  heroBackground: "/images/collagen-mask/hero.png",
  productPack: "/images/collagen-mask/2.png",
  solutionTexture: "/images/collagen-mask/3.png",
  application: "/images/collagen-mask/4.png"
};

// --- API CONFIG ---
const API_CONFIG = {
  url: 'https://offers.uncappednetwork.com/forms/api/',
  uid: '0191dbf2-738a-7d28-82a0-18c3859d5e8f',
  key: '151af1e45a084aaf75c15f',
  offer: '3727',
  lp: '3767'
};

// --- TYPES ---
interface OrderFormData {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
}

interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  subid?: string;
  subid2?: string;
  subid3?: string;
  subid4?: string;
  pubid?: string;
}

enum FormStatus {
  IDLE = 'IDLE',
  SUBMITTING = 'SUBMITTING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

// --- FACEBOOK PIXEL COMPONENT ---
const FacebookPixel = () => {
  useEffect(() => {
    // Track PageView and ViewContent when component mounts
    const waitForFbq = setInterval(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const win = window as any;
      if (typeof window !== 'undefined' && typeof win.fbq === 'function') {
        clearInterval(waitForFbq);
        win.fbq('track', 'PageView');
        win.fbq('track', 'ViewContent', {
          content_name: 'Bio-Collagen Mask',
          content_category: 'Beauty',
          content_type: 'product',
          value: 169,
          currency: 'PLN'
        });
        console.log('[FB Pixel] PageView and ViewContent tracked');
      }
    }, 100);

    const timeout = setTimeout(() => clearInterval(waitForFbq), 10000);
    return () => {
      clearInterval(waitForFbq);
      clearTimeout(timeout);
    };
  }, []);

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
            fbq('init', '${FB_PIXEL_ID}');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
};

// --- COMPONENTS ---

const Button = ({
  variant = 'primary',
  fullWidth = false,
  children,
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline', fullWidth?: boolean }) => {
  const baseStyles = "py-4 px-8 rounded-full font-semibold transition-all duration-300 transform active:scale-95 shadow-lg flex items-center justify-center gap-2";

  const variants = {
    primary: "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-200/50",
    secondary: "bg-white text-rose-700 hover:bg-gray-50 border border-rose-200",
    outline: "bg-transparent border-2 border-white text-white hover:bg-white/10"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// --- SECTIONS ---

const Hero = ({ scrollToForm }: { scrollToForm: () => void }) => {
  return (
    <div className="relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br from-rose-50 via-white to-rose-100">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-20 md:opacity-30 mix-blend-multiply pointer-events-none transition-opacity duration-500"
        style={{ backgroundImage: `url(${IMAGES.heroBackground})` }}
      ></div>

      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>

      <div className="container mx-auto px-6 relative z-10 pt-6 md:pt-0">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-6 animate-fade-in-up">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
            </div>
            <span className="text-gray-600 font-medium tracking-wide text-sm uppercase">Wirusowa maska 2024 roku</span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl leading-tight text-gray-900 mb-6 drop-shadow-sm">
            Obudź się z <br />
            <span className="text-rose-600 italic">Nową Skórą.</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed font-light">
            Pierwsza maska z Bio-Kolagenem, która staje się przezroczysta, gdy Twoja skóra wchłania składniki odżywcze. Żegnaj rozszerzone pory, witaj „Glass Skin".
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={scrollToForm} className="text-lg z-20">
              Chcę „Glass Skin" TERAZ
            </Button>
            <div className="flex items-center gap-3 text-sm text-gray-500 mt-2 sm:mt-0 px-4 backdrop-blur-sm rounded-lg bg-white/30 border border-white/50 py-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              Ograniczona dostępność: Zostało tylko 12 zestawów
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-rose-300">
        <ArrowDown size={32} />
      </div>
    </div>
  );
};

const ProblemSolution = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          <div className="space-y-6 order-2 md:order-1">
            <div className="inline-block bg-gray-100 px-4 py-1 rounded-full text-xs font-bold tracking-widest text-gray-500 uppercase">
              Smutna prawda
            </div>
            <h2 className="font-serif text-4xl text-gray-900">
              Patrzysz w lustro i widzisz...
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <XCircle className="text-red-400 shrink-0 mt-1" />
                <span className="text-lg text-gray-600">Matową, szarą i pozbawioną życia skórę mimo stosowania kremów.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="text-red-400 shrink-0 mt-1" />
                <span className="text-lg text-gray-600">Rozszerzone pory, których nawet podkład nie jest w stanie ukryć.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="text-red-400 shrink-0 mt-1" />
                <span className="text-lg text-gray-600">Oznaki odwodnienia i pierwsze zmarszczki widoczne rano.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="text-red-400 shrink-0 mt-1" />
                <span className="text-lg text-gray-600">Frustrację z powodu wydania setek złotych na bezużyteczne produkty.</span>
              </li>
            </ul>

            {/* Before & After Image */}
            <div className="mt-8">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/images/collagen-mask/5.png"
                  alt="Przed i po zastosowaniu Bio-Collagen Mask"
                  className="w-full h-auto"
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sm font-bold text-rose-700">
                  Prawdziwe efekty po 1 aplikacji
                </div>
              </div>
            </div>
          </div>

          <div className="relative order-1 md:order-2">
            <div className="absolute -inset-4 bg-rose-100 rounded-3xl transform rotate-2"></div>
            <div className="relative bg-white rounded-2xl shadow-xl border border-rose-50 overflow-hidden">
              <div className="p-4 bg-rose-50/50 relative">
                <img
                  src="/gif/collagen-mask/gif1.gif"
                  alt="Bio-Collagen Mask w akcji"
                  className="w-full h-auto max-h-64 object-contain mx-auto"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold tracking-widest text-rose-700 uppercase">
                  Rozwiązanie
                </div>
              </div>

              <div className="p-8">
                <h3 className="font-serif text-3xl text-gray-900 mb-6">
                  Bio-Collagen Deep Mask
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  To nie jest zwykła maska w płachcie. To zestalony hydrożel zawierający <strong>kolagen o ultra-niskiej masie cząsteczkowej</strong>, który wnika tam, gdzie inne kremy nie docierają.
                </p>

                <div className="space-y-4 mb-8">
                   <div className="flex items-center gap-3 p-3 bg-rose-50 rounded-lg border border-rose-100/50">
                      <CheckCircle2 className="text-rose-600" />
                      <span className="font-medium text-rose-900">Głęboka penetracja (3-4 godziny)</span>
                   </div>
                   <div className="flex items-center gap-3 p-3 bg-rose-50 rounded-lg border border-rose-100/50">
                      <CheckCircle2 className="text-rose-600" />
                      <span className="font-medium text-rose-900">Natychmiastowe zwężenie porów</span>
                   </div>
                   <div className="flex items-center gap-3 p-3 bg-rose-50 rounded-lg border border-rose-100/50">
                      <CheckCircle2 className="text-rose-600" />
                      <span className="font-medium text-rose-900">Efekt liftingu po przebudzeniu</span>
                   </div>
                </div>

                <p className="text-sm text-center text-gray-400 italic">
                  Maska staje się przezroczysta, gdy kończy działać.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Droplets className="w-8 h-8 text-rose-500" />,
      title: "Głębokie Nawilżenie",
      desc: "Kwas hialuronowy o niskiej masie cząsteczkowej nawilża warstwy, do których kremy nie docierają."
    },
    {
      icon: <Clock className="w-8 h-8 text-rose-500" />,
      title: "Efekt Nocny",
      desc: "Załóż ją podczas snu. Rano maska jest przezroczysta: wszystko zostało wchłonięte."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-rose-500" />,
      title: "Wzmocniona Bariera",
      desc: "Odbudowuje uszkodzoną barierę skórną po jednej aplikacji."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-rose-500" />,
      title: "Niewidoczne Pory",
      desc: "Zwęża rozszerzone pory o 40% po pierwszym użyciu (Testy Kliniczne)."
    }
  ];

  return (
    <section className="py-20 bg-rose-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-5xl text-gray-900 mb-4">Nauka Piękna</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Dlaczego tysiące kobiet porzuca tradycyjne maski.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border-t-4 border-rose-200">
              <div className="mb-6 bg-rose-50 w-16 h-16 rounded-full flex items-center justify-center">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GeminiConsultant = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    setResponse(`Dla Twojego problemu "${input}", Bio-Collagen Mask jest idealna, ponieważ hydrolizowany kolagen o masie 243 Dalton wnika dokładnie tam, gdzie Twoja skóra ma niedobory, przywracając elastyczność i zwężając pory dla natychmiastowego efektu.`);

    setLoading(false);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-6 text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-rose-200 text-sm font-semibold tracking-wider mb-6">
          <Sparkles size={16} />
          <span>KONSULTANT AI URODY</span>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl mb-4">
          Masz wątpliwości? Zapytaj Wirtualnego Eksperta
        </h2>
        <p className="text-gray-300 mb-8">
          Opisz swój główny problem (np. „Mam bardzo suchą skórę i rozszerzone pory na nosie") i dowiedz się, dlaczego ta maska odmieni Twoją pielęgnację.
        </p>

        <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto mb-8">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Wpisz tutaj swoją niedoskonałość..."
            className="w-full py-4 px-6 pr-14 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400 backdrop-blur-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 top-2 p-2 bg-rose-600 rounded-full hover:bg-rose-500 transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
          </button>
        </form>

        {response && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 animate-fade-in text-left shadow-2xl">
            <div className="flex gap-3 mb-2">
               <div className="w-3 h-3 rounded-full bg-red-400"></div>
               <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
               <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <p className="text-lg leading-relaxed font-light text-rose-50">
              "{response}"
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    {
      name: "Katarzyna M.",
      role: "Zweryfikowana Klientka",
      content: "Byłam sceptyczna wobec TikToka, ale wow. Trzymałam ją całą noc. Rano była przezroczysta, a moja skóra wyglądała jak szkło. Nigdy czegoś takiego nie widziałam.",
      rating: 5
    },
    {
      name: "Anna R.",
      role: "Wizażystka",
      content: "Używam jej na pannach młodych wieczorem przed ślubem. Podkład się ślizga, pory zniknęły. To mój zawodowy sekret.",
      rating: 5
    },
    {
      name: "Zofia L.",
      role: "Zapracowana Mama",
      content: "Mam 42 lata i suchą skórę. Po zestawie 4 sztuk moje przyjaciółki pytały, czy robiłam botoks. Niesamowite.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="font-serif text-3xl md:text-5xl text-center text-gray-900 mb-16">
          Co mówią <br /> <span className="text-rose-600 italic">prawdziwe kobiety</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-gray-50 p-8 rounded-2xl relative">
              <Quote className="absolute top-4 right-4 text-rose-200 w-10 h-10" />
              <div className="flex gap-1 text-yellow-400 mb-4">
                {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-gray-700 mb-6 italic">"{review.content}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-rose-200 rounded-full flex items-center justify-center text-rose-700 font-bold">
                  {review.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{review.name}</h4>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const OrderForm = ({ id, utmParams }: { id: string; utmParams: UTMParams }) => {
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });
  const [status, setStatus] = useState<FormStatus>(FormStatus.IDLE);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getFingerprint = (): string => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    return win.tmfp || '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(FormStatus.SUBMITTING);
    setErrorMessage('');

    try {
      const fingerprint = getFingerprint();

      // Build form data for API
      const apiFormData = new URLSearchParams();
      apiFormData.append('uid', API_CONFIG.uid);
      apiFormData.append('key', API_CONFIG.key);
      apiFormData.append('offer', API_CONFIG.offer);
      apiFormData.append('lp', API_CONFIG.lp);
      apiFormData.append('name', formData.fullName);
      apiFormData.append('street-address', formData.address);
      apiFormData.append('tel', formData.phone);

      if (fingerprint) {
        apiFormData.append('tmfp', fingerprint);
      } else {
        // Fallback to IP and UA if no fingerprint
        apiFormData.append('ua', navigator.userAgent);
      }

      // Optional fields
      if (formData.city) apiFormData.append('address-level2', formData.city);
      if (formData.zipCode) apiFormData.append('postal-code', formData.zipCode);

      // UTM parameters
      if (utmParams.utm_source) apiFormData.append('utm_source', utmParams.utm_source);
      if (utmParams.utm_medium) apiFormData.append('utm_medium', utmParams.utm_medium);
      if (utmParams.utm_campaign) apiFormData.append('utm_campaign', utmParams.utm_campaign);
      if (utmParams.utm_term) apiFormData.append('utm_term', utmParams.utm_term);
      if (utmParams.utm_content) apiFormData.append('utm_content', utmParams.utm_content);
      if (utmParams.subid) apiFormData.append('subid', utmParams.subid);
      if (utmParams.subid2) apiFormData.append('subid2', utmParams.subid2);
      if (utmParams.subid3) apiFormData.append('subid3', utmParams.subid3);
      if (utmParams.subid4) apiFormData.append('subid4', utmParams.subid4);
      if (utmParams.pubid) apiFormData.append('pubid', utmParams.pubid);

      const response = await fetch(API_CONFIG.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: apiFormData.toString()
      });

      if (response.ok) {
        // Track Purchase event on Facebook Pixel
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const win = window as any;
        if (typeof win.fbq === 'function') {
          win.fbq('track', 'Purchase', {
            content_name: 'Bio-Collagen Mask',
            content_category: 'Beauty',
            content_type: 'product',
            value: 169,
            currency: 'PLN'
          });
          console.log('[FB Pixel] Purchase tracked');
        }

        // Redirect to thank you page
        window.location.href = '/ty/ty-collagen-pl';
      } else {
        throw new Error('API request failed');
      }
    } catch (error) {
      console.error('Order submission error:', error);
      setStatus(FormStatus.ERROR);
      setErrorMessage('Wystąpił błąd podczas składania zamówienia. Spróbuj ponownie.');
    }
  };

  if (status === FormStatus.SUCCESS) {
    return (
      <div id={id} className="py-20 bg-rose-50">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <div className="bg-white p-10 rounded-3xl shadow-xl border-2 border-green-100">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="text-green-600 w-10 h-10" />
            </div>
            <h2 className="font-serif text-3xl text-gray-900 mb-4">Zamówienie Przyjęte!</h2>
            <p className="text-gray-600 mb-8">
              Dziękujemy {formData.fullName}. Nasz konsultant skontaktuje się z Tobą pod numerem {formData.phone} w ciągu 24 godzin, aby potwierdzić wysyłkę.
            </p>
            <p className="text-sm text-gray-500">
              Sprawdź swoją skrzynkę mailową, aby zobaczyć podsumowanie.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id={id} className="py-20 bg-rose-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

          <div className="md:w-5/12 bg-gray-900 text-white p-8 md:p-12 flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-2xl mb-2">Twoje zamówienie</h3>
              <div className="h-1 w-12 bg-rose-500 mb-6"></div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-28 h-28 bg-white rounded-lg p-1 shrink-0 overflow-hidden">
                   <img
                      src={IMAGES.productPack}
                      alt="Bio-Collagen Mask Pack"
                      className="w-full h-full object-contain rounded bg-white"
                    />
                </div>
                <div>
                  <p className="font-bold text-lg leading-tight mb-1">Bio-Collagen Mask</p>
                  <p className="text-rose-300 text-sm">Zestaw 4 sztuk (Pełna kuracja)</p>
                </div>
              </div>

              <div className="space-y-3 border-t border-gray-700 pt-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Cena Katalogowa</span>
                  <span className="line-through text-gray-500">299 zł</span>
                </div>
                <div className="flex justify-between font-bold text-xl items-center">
                  <span>Oferta Dzisiaj</span>
                  <span className="text-rose-400 text-2xl">169 zł</span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-rose-400" /> Darmowa Wysyłka Ekspresowa
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-rose-400" /> Gwarancja Satysfakcji lub Zwrot Pieniędzy
              </div>
              <div className="flex items-center gap-2">
                <CreditCard size={16} className="text-rose-400" /> Płatność przy Odbiorze
              </div>
            </div>
          </div>

          <div className="md:w-7/12 p-8 md:p-12">
            <h2 className="font-serif text-2xl text-gray-900 mb-6">Gdzie wysłać przesyłkę?</h2>

            {status === FormStatus.ERROR && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Imię i Nazwisko</label>
                <input required name="fullName" value={formData.fullName} onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 outline-none" placeholder="Anna Kowalska" />
              </div>

              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Telefon (dla kuriera)</label>
                 <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 outline-none" placeholder="+48 123 456 789" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Adres</label>
                <input required name="address" value={formData.address} onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 outline-none" placeholder="ul. Warszawska 10" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Miasto</label>
                  <input required name="city" value={formData.city} onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 outline-none" placeholder="Warszawa" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kod Pocztowy</label>
                  <input required name="zipCode" value={formData.zipCode} onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 outline-none" placeholder="00-001" />
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  fullWidth
                  disabled={status === FormStatus.SUBMITTING}
                  className="text-lg"
                >
                  {status === FormStatus.SUBMITTING ? 'Przetwarzanie...' : 'Złóż Zamówienie - Płatność przy Odbiorze'}
                </Button>
                <p className="text-center text-xs text-gray-400 mt-4">
                  Klikając, potwierdzasz zapoznanie się z Polityką Prywatności. Twoje dane są bezpieczne.
                </p>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE CONTENT ---

function LandingPageContent() {
  const searchParams = useSearchParams();

  const utmParams: UTMParams = {
    utm_source: searchParams.get('utm_source') || undefined,
    utm_medium: searchParams.get('utm_medium') || undefined,
    utm_campaign: searchParams.get('utm_campaign') || undefined,
    utm_term: searchParams.get('utm_term') || undefined,
    utm_content: searchParams.get('utm_content') || undefined,
    subid: searchParams.get('subid') || undefined,
    subid2: searchParams.get('subid2') || undefined,
    subid3: searchParams.get('subid3') || undefined,
    subid4: searchParams.get('subid4') || undefined,
    pubid: searchParams.get('pubid') || undefined,
  };

  const scrollToForm = () => {
    const element = document.getElementById('order-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen font-sans text-gray-800 selection:bg-rose-200 selection:text-rose-900 pb-24 md:pb-0">
      <FacebookPixel />

      {/* Sticky Bottom CTA for Mobile - High Conversion */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)] border-t border-rose-100 p-4 animate-fade-in-up">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
             <span className="text-xs text-gray-500 line-through">299 zł</span>
             <span className="font-bold text-xl text-rose-600">169 zł</span>
          </div>
          <button
            onClick={scrollToForm}
            className="flex-1 bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-full text-base font-bold shadow-lg shadow-rose-200 active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            <ShoppingBag size={18} />
            Zamów Teraz
          </button>
        </div>
      </div>

      <Hero scrollToForm={scrollToForm} />

      <ProblemSolution />

      <Features />

      <GeminiConsultant />

      <Testimonials />

      {/* Scarcity Banner */}
      <div className="bg-rose-600 text-white py-3 text-center font-medium animate-pulse px-4">
        Uwaga: Ze względu na duże zainteresowanie z TikToka, zapasy się kończą.
      </div>

      <OrderForm id="order-form" utmParams={utmParams} />

      <footer className="bg-gray-900 text-gray-400 py-12 text-sm mb-20 md:mb-0">
        <div className="container mx-auto px-6 text-center">
          <p className="mb-4">&copy; 2024 BioCollagen Distribution Polska. Wszelkie prawa zastrzeżone.</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Polityka Prywatności</a>
            <a href="#" className="hover:text-white transition-colors">Regulamin</a>
            <a href="#" className="hover:text-white transition-colors">Kontakt</a>
          </div>
          <p className="mt-8 text-xs text-gray-600 max-w-lg mx-auto">
            Ta strona nie jest częścią serwisu Facebook ani Facebook Inc. Ponadto ta strona nie jest w żaden sposób wspierana przez Facebook. FACEBOOK jest znakiem towarowym FACEBOOK, Inc.
          </p>
        </div>
      </footer>
    </div>
  );
}

// --- MAIN PAGE ---

export default function LandingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Ładowanie...</div>}>
      <LandingPageContent />
    </Suspense>
  );
}
