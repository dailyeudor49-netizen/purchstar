'use client';

import React, { useState } from 'react';
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

// --- CONSTANTS ---
const IMAGES = {
  heroBackground: "/images/collagen-mask/hero.webp",
  productPack: "/images/collagen-mask/2.webp",
  solutionTexture: "/images/collagen-mask/3.webp",
  application: "/images/collagen-mask/4.webp"
};

// --- TYPES ---
interface OrderFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
}

enum FormStatus {
  IDLE = 'IDLE',
  SUBMITTING = 'SUBMITTING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

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
    <div className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-rose-50 via-white to-rose-100">
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-20 md:opacity-30 mix-blend-multiply pointer-events-none transition-opacity duration-500"
        style={{ backgroundImage: `url(${IMAGES.heroBackground})` }}
      ></div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>

      <div className="container mx-auto px-6 relative z-10 pt-12 md:pt-0">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-6 animate-fade-in-up">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
            </div>
            <span className="text-gray-600 font-medium tracking-wide text-sm uppercase">La Maschera Virale del 2024</span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl leading-tight text-gray-900 mb-6 drop-shadow-sm">
            Svegliati con una <br />
            <span className="text-rose-600 italic">Pelle Nuova.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed font-light">
            La prima maschera al Bio-Collagene che diventa trasparente mentre la tua pelle beve nutrimento. Addio pori dilatati, benvenuta "Glass Skin".
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={scrollToForm} className="text-lg z-20">
              Voglio la "Glass Skin" ORA
            </Button>
            <div className="flex items-center gap-3 text-sm text-gray-500 mt-2 sm:mt-0 px-4 backdrop-blur-sm rounded-lg bg-white/30 border border-white/50 py-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              Disponibilità limitata: Solo 12 pack rimasti
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
              La triste verità
            </div>
            <h2 className="font-serif text-4xl text-gray-900">
              Ti guardi allo specchio e vedi...
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <XCircle className="text-red-400 shrink-0 mt-1" />
                <span className="text-lg text-gray-600">Pelle spenta, grigia e senza vita nonostante le creme.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="text-red-400 shrink-0 mt-1" />
                <span className="text-lg text-gray-600">Pori dilatati che nemmeno il fondotinta riesce a nascondere.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="text-red-400 shrink-0 mt-1" />
                <span className="text-lg text-gray-600">Segni di disidratazione e prime rughe visibili al mattino.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="text-red-400 shrink-0 mt-1" />
                <span className="text-lg text-gray-600">Frustrazione per aver speso centinaia di euro in prodotti inutili.</span>
              </li>
            </ul>

            {/* Before & After Image */}
            <div className="mt-8">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/images/collagen-mask/5.webp"
                  alt="Prima e dopo l'applicazione della Bio-Collagen Mask"
                  className="w-full h-auto"
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sm font-bold text-rose-700">
                  Risultati reali dopo 1 applicazione
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
                  alt="Bio-Collagen Mask in azione"
                  className="w-full h-auto max-h-64 object-contain mx-auto"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold tracking-widest text-rose-700 uppercase">
                  La Soluzione
                </div>
              </div>

              <div className="p-8">
                <h3 className="font-serif text-3xl text-gray-900 mb-6">
                  Bio-Collagen Deep Mask
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Non è una semplice maschera in tessuto. È idrogel solidificato contenente <strong>collagene ultra-basso molecolare</strong> che penetra dove le altre creme si fermano.
                </p>
                
                <div className="space-y-4 mb-8">
                   <div className="flex items-center gap-3 p-3 bg-rose-50 rounded-lg border border-rose-100/50">
                      <CheckCircle2 className="text-rose-600" />
                      <span className="font-medium text-rose-900">Penetrazione profonda (3-4 ore)</span>
                   </div>
                   <div className="flex items-center gap-3 p-3 bg-rose-50 rounded-lg border border-rose-100/50">
                      <CheckCircle2 className="text-rose-600" />
                      <span className="font-medium text-rose-900">Restringimento pori immediato</span>
                   </div>
                   <div className="flex items-center gap-3 p-3 bg-rose-50 rounded-lg border border-rose-100/50">
                      <CheckCircle2 className="text-rose-600" />
                      <span className="font-medium text-rose-900">Effetto Lifting al risveglio</span>
                   </div>
                </div>
                
                <p className="text-sm text-center text-gray-400 italic">
                  La maschera diventa trasparente quando ha finito di lavorare.
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
      title: "Idratazione Profonda",
      desc: "L'acido ialuronico oligo-molecolare idrata gli strati che le creme non raggiungono."
    },
    {
      icon: <Clock className="w-8 h-8 text-rose-500" />,
      title: "Effetto Notte",
      desc: "Indossala mentre dormi. Al mattino la maschera è trasparente: tutto è stato assorbito."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-rose-500" />,
      title: "Barriera Rinforzata",
      desc: "Ripristina la barriera cutanea danneggiata in una sola applicazione."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-rose-500" />,
      title: "Pori Invisibili",
      desc: "Stringe i pori dilatati del 40% dopo il primo utilizzo (Test Clinici)."
    }
  ];

  return (
    <section className="py-20 bg-rose-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-5xl text-gray-900 mb-4">La Scienza della Bellezza</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Perché migliaia di donne stanno abbandonando le maschere tradizionali.</p>
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
    
    // NOTA PER LO SVILUPPATORE NEXT.JS:
    // In produzione, sposta questa chiamata in una Server Action per proteggere la tua API Key.
    // Qui simuliamo una risposta intelligente per far funzionare la UI immediatamente.
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulazione risposta AI
    setResponse(`Per il tuo problema "${input}", la Bio-Collagen Mask è ideale perché il collagene idrolizzato a 243 Dalton penetra esattamente dove la tua pelle è carente, ripristinando l'elasticità e chiudendo i pori per un effetto immediato.`);
    
    setLoading(false);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-6 text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-rose-200 text-sm font-semibold tracking-wider mb-6">
          <Sparkles size={16} />
          <span>BEAUTY AI CONSULTANT</span>
        </div>
        
        <h2 className="font-serif text-3xl md:text-4xl mb-4">
          Hai dubbi? Chiedi all'Esperto Virtuale
        </h2>
        <p className="text-gray-300 mb-8">
          Descrivi il tuo problema principale (es. "Ho la pelle molto secca e pori dilatati sul naso") e scopri perché questa maschera cambierà la tua routine.
        </p>

        <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto mb-8">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Scrivi qui il tuo inestetismo..."
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
      name: "Giulia M.",
      role: "Cliente Verificata",
      content: "Ero scettica su TikTok, ma wow. L'ho tenuta tutta la notte. Al mattino era trasparente e la mia pelle sembrava vetro. Mai visto niente del genere.",
      rating: 5
    },
    {
      name: "Elena R.",
      role: "Makeup Artist",
      content: "La uso sulle spose la sera prima. Il fondotinta scivola via, i pori sono spariti. È il mio segreto professionale.",
      rating: 5
    },
    {
      name: "Sofia L.",
      role: "Mamma impegnata",
      content: "Ho 42 anni e la pelle secca. Dopo il pacco da 4, le mie amiche mi hanno chiesto se avessi fatto il botox. Assurdo.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="font-serif text-3xl md:text-5xl text-center text-gray-900 mb-16">
          Cosa dicono le donne <br /> <span className="text-rose-600 italic">reali</span>
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

const OrderForm = ({ id }: { id: string }) => {
  const [formData, setFormData] = useState<OrderFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });
  const [status, setStatus] = useState<FormStatus>(FormStatus.IDLE);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(FormStatus.SUBMITTING);
    
    // Simulate API call
    setTimeout(() => {
      setStatus(FormStatus.SUCCESS);
      console.log("Order Data:", formData);
    }, 1500);
  };

  if (status === FormStatus.SUCCESS) {
    return (
      <div id={id} className="py-20 bg-rose-50">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <div className="bg-white p-10 rounded-3xl shadow-xl border-2 border-green-100">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="text-green-600 w-10 h-10" />
            </div>
            <h2 className="font-serif text-3xl text-gray-900 mb-4">Ordine Ricevuto!</h2>
            <p className="text-gray-600 mb-8">
              Grazie {formData.firstName}. Un nostro consulente ti contatterà su WhatsApp al numero {formData.phone} entro 24 ore per confermare la spedizione.
            </p>
            <p className="text-sm text-gray-500">
              Controlla la tua email per il riepilogo.
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
              <h3 className="font-serif text-2xl mb-2">Il tuo ordine</h3>
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
                  <p className="text-rose-300 text-sm">Pack da 4 Pezzi (Trattamento completo)</p>
                </div>
              </div>
              
              <div className="space-y-3 border-t border-gray-700 pt-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Prezzo Listino</span>
                  <span className="line-through text-gray-500">€79.99</span>
                </div>
                <div className="flex justify-between font-bold text-xl items-center">
                  <span>Offerta Oggi</span>
                  <span className="text-rose-400 text-2xl">€39.99</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 space-y-3 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-rose-400" /> Spedizione Espressa Gratuita
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-rose-400" /> Garanzia Soddisfatti o Rimborsati
              </div>
              <div className="flex items-center gap-2">
                <CreditCard size={16} className="text-rose-400" /> Pagamento alla Consegna
              </div>
            </div>
          </div>

          <div className="md:w-7/12 p-8 md:p-12">
            <h2 className="font-serif text-2xl text-gray-900 mb-6">Dove dobbiamo spedire?</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                  <input required name="firstName" value={formData.firstName} onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 outline-none" placeholder="Maria" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cognome</label>
                  <input required name="lastName" value={formData.lastName} onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 outline-none" placeholder="Rossi" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 outline-none" placeholder="maria@esempio.it" />
              </div>

              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Telefono (per il corriere)</label>
                 <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 outline-none" placeholder="+39 333 1234567" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Indirizzo</label>
                <input required name="address" value={formData.address} onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 outline-none" placeholder="Via Roma 10" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Città</label>
                  <input required name="city" value={formData.city} onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 outline-none" placeholder="Milano" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CAP</label>
                  <input required name="zipCode" value={formData.zipCode} onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 outline-none" placeholder="20121" />
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  fullWidth 
                  disabled={status === FormStatus.SUBMITTING}
                  className="text-lg"
                >
                  {status === FormStatus.SUBMITTING ? 'Elaborazione...' : 'Completa Ordine - Pagamento alla Consegna'}
                </Button>
                <p className="text-center text-xs text-gray-400 mt-4">
                  Cliccando confermi di aver letto la Privacy Policy. I tuoi dati sono al sicuro.
                </p>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---

export default function LandingPage() {
  const scrollToForm = () => {
    const element = document.getElementById('order-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen font-sans text-gray-800 selection:bg-rose-200 selection:text-rose-900 pb-24 md:pb-0">
      
      {/* Sticky Bottom CTA for Mobile - High Conversion */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)] border-t border-rose-100 p-4 animate-fade-in-up">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
             <span className="text-xs text-gray-500 line-through">€79.99</span>
             <span className="font-bold text-xl text-rose-600">€39.99</span>
          </div>
          <button 
            onClick={scrollToForm} 
            className="flex-1 bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-full text-base font-bold shadow-lg shadow-rose-200 active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            <ShoppingBag size={18} />
            Ordina Ora
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
        🔥 Attenzione: A causa dell'alta richiesta da TikTok, le scorte stanno terminando.
      </div>

      <OrderForm id="order-form" />

      <footer className="bg-gray-900 text-gray-400 py-12 text-sm mb-20 md:mb-0">
        <div className="container mx-auto px-6 text-center">
          <p className="mb-4">&copy; 2024 BioCollagen Distribution Italia. Tutti i diritti riservati.</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Termini di Servizio</a>
            <a href="#" className="hover:text-white transition-colors">Contatti</a>
          </div>
          <p className="mt-8 text-xs text-gray-600 max-w-lg mx-auto">
            Questo sito non è parte del sito Facebook o Facebook Inc. Inoltre, questo sito non è approvato da Facebook in alcun modo. FACEBOOK è un marchio registrato di FACEBOOK, Inc.
          </p>
        </div>
      </footer>
    </div>
  );
}