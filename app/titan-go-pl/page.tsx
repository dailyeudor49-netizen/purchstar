"use client";

import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useRouter } from 'next/navigation';

// Immagini del carosello
const CAROUSEL_IMAGES = [
  '/images/titango/Lenovo-Legion-Go-review-header.webp',
  '/images/titango/lenovolegiongo-1.webp',
  '/images/titango/1283878.webp',
  '/images/titango/MW9rqycaoDzZ7FwAaxgy8R.webp',
];

/**
 * CONFIGURAZIONE E COSTANTI
 */
const COLORS = {
  primary: '#3b82f6',
  secondary: '#8b5cf6',
  accent: '#ec4899',
  bg: '#050505',
};

const CHART_DATA = [
  { name: 'Cyberpunk 2077 (High)', TitanGo: 65, LegionGo: 58, SteamDeck: 32 },
  { name: 'Elden Ring (Ultra)', TitanGo: 58, LegionGo: 52, SteamDeck: 28 },
  { name: 'Starfield (Med)', TitanGo: 45, LegionGo: 40, SteamDeck: 22 },
  { name: 'Warzone (Comp)', TitanGo: 110, LegionGo: 95, SteamDeck: 45 },
];

const GAMES = [
  {
    title: "COD: WARZONE",
    description: "Zdominuj lobby. Dzięki trybowi FPS Sniper Twój kontroler staje się optyczną myszką. Natychmiastowa reakcja, zero ghostingu dla milimetrowych headshotów.",
    fps: "110+ FPS",
    advantage: "Taktyczna Przewaga Snajpera",
    color: "border-green-500/50"
  },
  {
    title: "FC 26",
    description: "Piłka nożna przyszłości w 144Hz. Totalna płynność w każdym dryblingu. Moc Ryzen Z1 Extreme eliminuje każde mikro-zacięcie, czyniąc HyperMotion prawdziwym.",
    fps: "144 FPS (Stabilne)",
    advantage: "Zero Input Lag",
    color: "border-blue-500/50"
  },
  {
    title: "FORTNITE",
    description: "Buduj i edytuj z prędkością światła. Konkurencyjna wydajność profesjonalnego PC w dłoni Twojej ręki. Błyskawiczne ładowanie.",
    fps: "160+ FPS (Tryb Perf)",
    advantage: "Pro-Build Ready",
    color: "border-purple-500/50"
  },
  {
    title: "GTA V / VI READY",
    description: "Los Santos jak nigdy wcześniej. Tekstury ultra i nieskończona głębia ostrości. Jedyna przenośna konsola z ekosystemem gotowym na next-gen od Rockstar.",
    fps: "85+ FPS (Ultra)",
    advantage: "Fotorealistyczna Grafika",
    color: "border-orange-500/50"
  }
];

/**
 * KOMPONENTY WEWNĘTRZNE
 */

// Komponent Karuzeli
const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-white/10">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {CAROUSEL_IMAGES.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`TitanGo Ultra ${i + 1}`}
              className="w-full flex-shrink-0 brightness-90"
            />
          ))}
        </div>
      </div>

      {/* Wskaźniki */}
      <div className="flex justify-center gap-2 mt-6">
        {CAROUSEL_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === currentIndex
                ? 'bg-blue-500 w-8'
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Strzałki nawigacji */}
      <button
        onClick={() => setCurrentIndex(prev => prev === 0 ? CAROUSEL_IMAGES.length - 1 : prev - 1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full backdrop-blur-sm transition-all"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => setCurrentIndex(prev => (prev + 1) % CAROUSEL_IMAGES.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full backdrop-blur-sm transition-all"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Badge info */}
      <div className="absolute -bottom-4 -right-4 bg-blue-600/20 backdrop-blur-xl p-4 rounded-xl border border-blue-500/50 text-left">
        <p className="text-blue-400 font-bold text-xs">8.8" PURESIGHT</p>
        <p className="text-[10px] text-gray-300">Rozdzielczość QHD+ 1600p</p>
      </div>
    </div>
  );
};

const ComparisonChart = () => (
  <div className="w-full h-80 bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10">
    <h3 className="text-xl font-bold mb-4 text-center tracking-tighter uppercase" style={{ fontFamily: 'var(--font-orbitron)' }}>
      DOMINACJA FPS: TITANGO VS RESZTA ŚWIATA
    </h3>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={CHART_DATA}>
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis dataKey="name" stroke="#888" fontSize={10} />
        <YAxis stroke="#888" />
        <Tooltip
          contentStyle={{ backgroundColor: '#111', border: '1px solid #444', borderRadius: '8px' }}
          itemStyle={{ color: '#fff' }}
        />
        <Legend />
        <Bar dataKey="TitanGo" fill="#3b82f6" radius={[4, 4, 0, 0]} name="TitanGo Ultra" />
        <Bar dataKey="LegionGo" fill="#a78bfa" radius={[4, 4, 0, 0]} name="Lenovo Legion Go" />
        <Bar dataKey="SteamDeck" fill="#444" radius={[4, 4, 0, 0]} name="Steam Deck OLED" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const history = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...history, { role: 'user', parts: [{ text: userMsg }] }],
        config: {
          systemInstruction: `Jesteś ekspertem od agresywnego marketingu konsoli TitanGo Ultra.
          Twój cel to przekonanie użytkownika, że TitanGo Ultra to ostateczny wybór, lepszy od Lenovo Legion Go i ROG Ally,
          ale oferowany w śmiesznej cenie (299 zł zamiast 599 zł) bo opróżniamy magazyn.
          Używaj podekscytowanego, perswazyjnego, prawie zdesperowanego tonu o cechach (8.8" QHD+, 144Hz, Ryzen Z1 Extreme).
          Jeśli użytkownik jest niezdecydowany, użyj niedoboru (zostały tylko 3 sztuki).
          Odpowiadaj po polsku krótko i z mocą.`,
        }
      });

      setMessages(prev => [...prev, { role: 'ai', content: response.text || "TitanGo Ultra to czysta moc. Nie przegap!" }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'ai', content: "Słuchaj, TitanGo Ultra rozchodzi się jak świeże bułeczki. Chcesz dominować w graniu czy tylko patrzeć?" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.6)] transition-all hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        </button>
      ) : (
        <div className="w-80 md:w-96 bg-[#0a0a0a] rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[500px] border border-blue-500/30 backdrop-blur-xl">
          <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 flex justify-between items-center">
            <span className="font-bold tracking-tighter">TITANGO AI DORADCA</span>
            <button onClick={() => setIsOpen(false)}><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
          </div>
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-xl max-w-[85%] ${m.role === 'user' ? 'bg-blue-600' : 'bg-white/5 border border-white/10'}`}>{m.content}</div>
              </div>
            ))}
            {loading && <div className="animate-pulse bg-white/5 p-3 rounded-xl w-12">...</div>}
          </div>
          <div className="p-4 border-t border-white/10 flex gap-2">
            <input
              value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500" placeholder="Zapytaj o moc..."
            />
            <button onClick={handleSend} className="bg-blue-600 p-2 rounded-lg"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg></button>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * STRONA GŁÓWNA
 */
// Wszystkie recenzje
const ALL_REVIEWS = [
  { name: "Marek B.", verified: true, stars: 5, date: "12 lutego 2026", title: "Po prostu SZALEŃSTWO", review: "Jestem graczem od ponad 20 lat i ta konsola zostawiła mnie bez słów. Grałem w Cyberpunk 2077 w pociągu przy stabilnych 65 FPS na wysokich detalach. Wyświetlacz jest niesamowity, kolory żywe, a płynność 144Hz naprawdę się czuje. Cena, jaką zapłaciłem, jest absurdalna, warta co najmniej dwa razy tyle.", helpful: 234 },
  { name: "Aleksandra R.", verified: true, stars: 5, date: "10 lutego 2026", title: "Żegnaj Steam Deck", review: "Sprzedałam mojego Steam Deck OLED po tygodniu z TitanGo. Nie ma porównania: większy wyświetlacz, lepsza wydajność, a tryb FPS z odłączanym kontrolerem jest genialny do strzelanek. Wreszcie mogę grać w Valorant przyzwoicie w podróży!", helpful: 189 },
  { name: "Józef T.", verified: true, stars: 5, date: "8 lutego 2026", title: "Budowa premium, śmieszna cena", review: "Jakość wykonania jest wyjątkowa. Materiały są premium, kontrolery mają idealny chwyt, a system chłodzenia jest super cichy nawet pod obciążeniem. Grałem 4-godzinne sesje w Elden Ring bez odczuwania nieprzyjemnego ciepła. Gorąco polecam.", helpful: 156 },
  { name: "Franciszka M.", verified: true, stars: 4, date: "6 lutego 2026", title: "Świetna, ale bateria do poprawy", review: "Konsola jest fantastyczna, wydajność prawdziwego PC do gier. Jedyny minus: bateria wytrzymuje około 2-3 godzin przy ciężkich grach. Poza tym jest idealna. Wyświetlacz QHD+ jest spektakularny, a Windows 11 działa płynnie. Za tę cenę to i tak okazja.", helpful: 98 },
  { name: "Łukasz P.", verified: true, stars: 5, date: "4 lutego 2026", title: "WARZONE NA 110 FPS. W. RĘKU.", review: "Wciąż nie mogę uwierzyć. Gram kompetytywnie w Warzone i rozgrywam rankingi z kanapy lub w przerwie obiadowej. Tryb FPS Sniper z prawym kontrolerem używanym jako mysz to GAME CHANGER. Poprawiłem moje K/D z 1.2 do 1.8 w dwa tygodnie. Szaleństwo.", helpful: 312 },
  { name: "Szymon C.", verified: true, stars: 5, date: "2 lutego 2026", title: "Lepsza niż oryginalna Legion Go", review: "Miałem Lenovo Legion Go i ją zwróciłem. Ta TitanGo Ultra ma ten sam hardware, ale kosztuje połowę i ma lepiej zoptymalizowane oprogramowanie. Zero crashów w 50 godzinach użytkowania, Game Pass działa idealnie, emulacja PSP/PS2 bezbłędna.", helpful: 145 },
  { name: "Helena V.", verified: true, stars: 5, date: "31 stycznia 2026", title: "Idealny prezent dla syna", review: "Podarowałam ją synowi na urodziny. Nie może się od niej oderwać. Gra w Fortnite, Minecraft, a także w gry z Game Pass. Jakość jest doskonała, wygląda jak produkt za 3000 zł. Szybka dostawa i idealne opakowanie.", helpful: 87 },
  { name: "Robert D.", verified: true, stars: 5, date: "28 stycznia 2026", title: "Dla podróżujących: OBOWIĄZKOWA", review: "Dużo podróżuję służbowo i ta konsola zmieniła moje wieczory w hotelach. Red Dead Redemption 2 na 8.8 cala to kinowe doświadczenie. Ukończyłem też Baldur's Gate 3 całkowicie na tej maszynie. Bateria do poprawy, ale z szybką ładowarką to nie problem.", helpful: 203 },
  { name: "Dawid L.", verified: true, stars: 5, date: "25 stycznia 2026", title: "Przyszłość przenośnego grania", review: "Po latach z Nintendo Switch, to jest inny wymiar. Prawdziwa grafika PC, nie kastrowane wersje. Grałem w Hogwarts Legacy na wysokich detalach i oniemiałem. Cena jest szalona, myślałem że to oszustwo, ale wszystko prawdziwe!", helpful: 178 },
  { name: "Klara N.", verified: true, stars: 5, date: "23 stycznia 2026", title: "Wreszcie poważne granie w podróży", review: "Jestem programistką i używam tej konsoli też do testowania gier indie. Moc jest prawdziwa, Windows 11 pozwala robić wszystko. Podłączyłam też zewnętrzny monitor i klawiaturę do pracy. Szalona wszechstronność.", helpful: 134 },
  { name: "Antoni G.", verified: true, stars: 4, date: "21 stycznia 2026", title: "Prawie idealna, trochę bugów software", review: "Hardware jest bestią, nic do powiedzenia. Miałem kilka problemów z driverami AMD na początku, ale po aktualizacjach wszystko naprawione. Teraz wszystko działa płynnie. Polecam zaktualizować od razu po otrzymaniu. Poza tym, absolutny top.", helpful: 92 },
  { name: "Sara B.", verified: true, stars: 5, date: "19 stycznia 2026", title: "Mój mąż nie może jej puścić", review: "Podarowałam mu ją na Gwiazdkę i od tamtej pory jest przyklejony. Mówi, że jest lepsza niż jego stacjonarny PC pod względem wygody. Używa jej na kanapie, w łóżku, w łazience (tak, tam też). Wyjątkowa jakość, jestem zadowolona z zakupu.", helpful: 267 },
  { name: "Paweł F.", verified: true, stars: 5, date: "17 stycznia 2026", title: "CS2 kompetytywnie WSZĘDZIE", review: "Gram w Counter-Strike 2 na poziomie semi-pro i ta konsola pozwala mi trenować wszędzie. Tryb FPS to rewolucja, wreszcie precyzja myszy na przenośnej. Zrobiłem ace w pierwszym meczu. Niesamowite.", helpful: 198 },
  { name: "Walentyna S.", verified: true, stars: 5, date: "15 stycznia 2026", title: "Streaming na Twitch z konsoli!", review: "Jestem małą streamerką i ta konsola otworzyła mi świat. Mogę streamować bezpośrednio bez PC, jakość jest świetna i chat overlay działa idealnie. Moi widzowie byli pod wrażeniem jakości.", helpful: 156 },
  { name: "Mateusz R.", verified: true, stars: 5, date: "13 stycznia 2026", title: "IDEALNA emulacja", review: "Testowałem emulatory wszystkiego: PS2, GameCube, Wii, PSP, 3DS... wszystko działa perfekcyjnie. Mam moją kolekcję retro zawsze przy sobie. Zelda Wind Waker w 4K na tej bestii to religijne doświadczenie.", helpful: 289 },
  { name: "Julia C.", verified: true, stars: 4, date: "11 stycznia 2026", title: "Świetna ale ciężka na długie sesje", review: "Konsola jest fantastyczna, ale po 2 godzinach ręce się trochę męczą. Kupiłam dodatkowy grip i teraz jest dużo lepiej. Poza tym nic do zarzucenia, szalona wydajność i wspaniały wyświetlacz.", helpful: 76 },
  { name: "Andrzej M.", verified: true, stars: 5, date: "9 stycznia 2026", title: "Żegnaj ROG Ally, witaj TitanGo", review: "Miałem ROG Ally i sprzedałem ją po wypróbowaniu tej. Większy wyświetlacz, lepsze kontrolery, a przede wszystkim KOSZTUJE MNIEJ. Nie rozumiem jak mogą ją sprzedawać w tej cenie, to prawie podejrzane (w dobrym sensie).", helpful: 234 },
  { name: "Wawrzyniec P.", verified: true, stars: 5, date: "7 stycznia 2026", title: "Prezent, który sobie zrobiłem", review: "Kupiłem sobie tę konsolę po intensywnym roku pracy. Najlepszy zakup mojego życia. Gram we wszystko: Starfield, Diablo 4, FC24... wszystko działa świetnie. Biorę ją nawet do biura na przerwę obiadową.", helpful: 167 },
  { name: "Federyka T.", verified: true, stars: 5, date: "5 stycznia 2026", title: "Idealna dla często podróżujących", review: "Jestem stewardessą i spędzam dużo czasu w hotelach. Ta konsola stała się moim towarzyszem podróży. Lekka w plecaku, bateria wystarczająca na loty, a wydajność jak PC do gier. Nie mogłabym być szczęśliwsza.", helpful: 198 },
  { name: "Ryszard V.", verified: true, stars: 5, date: "3 stycznia 2026", title: "Wyświetlacz jest SZALONY", review: "144Hz, QHD+, idealne kolory. Sam ten wyświetlacz jest wart połowy ceny. Porównałem ze Steam Deck OLED i TitanGo wygrywa we wszystkim: rozmiar, rozdzielczość, częstotliwość odświeżania. I kosztuje mniej!", helpful: 223 },
  { name: "Martyna D.", verified: true, stars: 4, date: "1 stycznia 2026", title: "Dobra ale obsługa klienta do poprawy", review: "Konsola jest świetna, zasługuje na 5 gwiazdek. Odejmuję jedną tylko dlatego, że miałam problem z wysyłką i wsparcie odpowiedziało po 3 dniach. Ostatecznie wszystko rozwiązane, ale mogliby być szybsi.", helpful: 54 },
  { name: "Mikołaj B.", verified: true, stars: 5, date: "30 grudnia 2025", title: "GTA 6 Ready? ABSOLUTNIE TAK", review: "Kupiłem tę konsolę myśląc o przyszłości. Z tym hardware jestem pewien, że pójdzie też GTA 6 gdy wyjdzie. W międzyczasie cieszę się GTA 5 na ultra detalach i RDR2 w całej okazałości. Trafiona inwestycja.", helpful: 312 },
  { name: "Aleksandra L.", verified: true, stars: 5, date: "28 grudnia 2025", title: "Moja córka ją uwielbia", review: "Kupiłam ją dla mojej 16-letniej córki, jest w siódmym niebie. Gra w Fortnite, Valorant i wszystkie gry, w które wcześniej mogła grać tylko na rodzinnym PC. Teraz ma swoją przenośną stację. Pieniądze dobrze wydane.", helpful: 145 },
  { name: "Tomasz G.", verified: true, stars: 5, date: "26 grudnia 2025", title: "Idealne Święta dzięki wam", review: "Zamówiona 20 grudnia, dostarczona 23. Akurat na Gwiazdkę! Jakość jest imponująca, mój brat oszalał gdy ją rozpakował. Dziękuję za błyskawiczną wysyłkę i staranne opakowanie.", helpful: 178 },
];

export default function LandingPage() {
  const [timeLeft, setTimeLeft] = useState(1140); // 19 min
  const [stock, setStock] = useState(3);
  const [reviewsToShow, setReviewsToShow] = useState(8);
  const [formData, setFormData] = useState({
    name: '',
    tel: '',
    streetAddress: '',
    postalCode: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(p => p > 0 ? p - 1 : 0), 1000);
    const s = setInterval(() => setStock(p => p > 1 && Math.random() > 0.9 ? p - 1 : p), 20000);
    return () => { clearInterval(t); clearInterval(s); };
  }, []);

  const fmt = (s: number) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Get UTM parameters from URL
      const urlParams = new URLSearchParams(window.location.search);

      // Build form data
      const submitData = new URLSearchParams();
      submitData.append('uid', '0198088f-a4bc-7ed8-89aa-83089fe0180e');
      submitData.append('key', 'ec15cab563da6cf51f0c7c');
      submitData.append('offer', '538');
      submitData.append('lp', '538');
      submitData.append('name', formData.name);
      submitData.append('tel', formData.tel);
      submitData.append('street-address', formData.streetAddress);

      // Try to get fingerprint, fallback to IP/UA
      const tmfp = (window as any).tmfp;
      if (tmfp) {
        submitData.append('tmfp', tmfp);
      } else {
        // Will be handled server-side or via API
        submitData.append('ua', navigator.userAgent);
      }

      // Optional fields
      if (formData.postalCode) submitData.append('postal-code', formData.postalCode);

      // UTM parameters
      const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'subid', 'subid2', 'subid3', 'subid4', 'pubid'];
      utmParams.forEach(param => {
        const value = urlParams.get(param);
        if (value) submitData.append(param, value);
      });

      const response = await fetch('https://offers.supertrendaffiliateprogram.com/forms/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: submitData.toString()
      });

      if (response.ok) {
        router.push('/titan-go-pl/ty');
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Redirect to thank you page anyway for better UX
      router.push('/titan-go-pl/ty');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-blue-500 selection:text-white font-sans overflow-x-hidden">

      {/* Dynamic Style Injection for Orbitron */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
        .font-orbitron { font-family: 'Orbitron', sans-serif; }
        .text-gradient {
          background: linear-gradient(to right, #60a5fa, #a78bfa, #f472b6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
      ` }} />

      {/* Scarcity Banner */}
      <div className="bg-red-600 text-white py-2 px-4 text-center text-xs md:text-sm font-black animate-pulse sticky top-0 z-[90]">
        PILNE: TYLKO {stock} SZTUKI DOSTĘPNE W CENIE FABRYCZNEJ (299 zł). OFERTA WYGASA ZA {fmt(timeLeft)}
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-40 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[140px]"></div>
        </div>

        <div className="inline-block px-4 py-1 rounded-full border border-blue-500/50 bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-8">
          Ekstremalna Inżynieria Bez Kompromisów
        </div>

        <h1 className="text-6xl md:text-9xl font-orbitron font-black leading-[0.9] mb-8 tracking-tighter">
          NIE GRAJ.<br />
          <span className="text-gradient">DOMINUJ.</span>
        </h1>

        <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mb-12 leading-relaxed">
          TitanGo Ultra: Wyświetlacz 8.8" QHD+ 144Hz, Ryzen Z1 Extreme i wbudowany tryb FPS Sniper.
          <span className="text-white font-bold italic"> Moc PC za 8000 zł zamknięta w 800 gramach czystej technologicznej furii.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <button onClick={() => document.getElementById('pricing')?.scrollIntoView({behavior:'smooth'})} className="px-14 py-6 bg-blue-600 hover:bg-blue-500 rounded-full font-orbitron font-black text-xl shadow-[0_0_40px_rgba(37,99,235,0.5)] transition-all hover:scale-105">
            KUP TERAZ - 300 zł ZNIŻKI
          </button>
        </div>

        <div className="mt-20 relative w-full">
          <HeroCarousel />
        </div>
      </section>

      {/* Gaming Arsenal */}
      <section className="py-32 px-6 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-7xl font-orbitron font-black mb-6">GRAJ W PRAWDZIWE<br /><span className="text-blue-500 underline decoration-blue-500/30">GRY PC.</span></h2>
            <p className="text-xl text-gray-400 italic">Zapomnij o kastrowanych wersjach mobilnych. Tutaj masz oryginalne oprogramowanie na detalach ULTRA.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {GAMES.map((game, i) => (
              <div key={i} className={`bg-white/5 backdrop-blur-sm p-8 rounded-[2.5rem] border-t-4 ${game.color} transition-all hover:-translate-y-3 hover:bg-white/10 group`}>
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-orbitron font-black leading-none max-w-[70%]">{game.title}</h3>
                  <span className="bg-blue-600/20 text-blue-400 text-[10px] px-2 py-1 rounded font-bold">{game.fps}</span>
                </div>
                <p className="text-gray-400 text-sm mb-10 leading-relaxed font-light">
                  {game.description}
                </p>
                <div className="flex items-center gap-2 text-blue-500 font-black text-[10px] uppercase tracking-widest">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
                  {game.advantage}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 p-8 border-2 border-dashed border-white/10 rounded-3xl text-center">
            <p className="text-gray-500 font-orbitron text-xs tracking-[0.4em]">PEŁNA KOMPATYBILNOŚĆ ZE STEAM, EPIC, GAME PASS I BATTLE.NET</p>
          </div>
        </div>
      </section>

      {/* Comparison Benchmark */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-orbitron font-bold mb-8">ZNISZCZ KONKURENCJĘ</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Podczas gdy inni zadowalają się wyświetlaczami 60Hz lub procesorami ograniczonymi dla oszczędności baterii, TitanGo Ultra została zaprojektowana z jednym celem: <span className="text-white font-bold">absolutne zwycięstwo.</span>
            </p>
            <div className="space-y-4">
              {["Frame rate wyższy o 25% od Legion Go", "Chłodzenie ColdFront 4.0 (Zero Throttlingu)", "Wyświetlacz większy o 20% od Steam Deck"].map((t, i) => (
                <div key={i} className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                  <span className="text-sm font-semibold text-gray-200">{t}</span>
                </div>
              ))}
            </div>
          </div>
          <ComparisonChart />
        </div>
      </section>

      {/* FPS Sniper Mode Detail */}
      <section className="py-32 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 relative">
             <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full"></div>
             <img src="/images/titango/lenovolegiongo-1.webp" alt="Sniper Mode" className="rounded-3xl border border-white/20 shadow-2xl" />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-orbitron font-black mb-8 leading-none">TRYB FPS<br /><span className="text-blue-500">TO LEGALNY CHEAT.</span></h2>
            <p className="text-lg text-gray-400 mb-8">
              Masz dość nieprecyzyjnych analogowych kontrolerów w strzelankach? TitanGo Ultra pozwala odłączyć prawy kontroler i używać go jako <span className="text-white font-bold">prawdziwej pionowej myszy optycznej</span>. Precyzja pixel-perfect w Warzone i CS:GO.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-blue-400 font-black text-xl mb-1 italic">16K DPI</p>
                <p className="text-[10px] text-gray-500 uppercase">Sensor Optyczny</p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-blue-400 font-black text-xl mb-1 italic">0.1ms</p>
                <p className="text-[10px] text-gray-500 uppercase">Opóźnienie Kliknięcia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / CTA */}
      <section id="pricing" className="py-40 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-8xl font-orbitron font-black mb-12 italic tracking-tighter">CENA <span className="text-red-600 underline decoration-wavy">SKANDALICZNA.</span></h2>

          <div className="relative bg-gradient-to-b from-blue-600/20 to-transparent p-[2px] rounded-[3rem]">
            <div className="bg-[#0a0a0a] rounded-[3rem] p-12 md:p-20">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white font-black px-10 py-2 rounded-full text-xs tracking-[0.3em] shadow-xl animate-bounce">
                LIMITOWANA OFERTA PARTNERSKA
              </div>

              <div className="flex flex-col items-center mb-16">
                <span className="text-3xl text-gray-600 line-through mb-2">599 zł</span>
                <span className="text-8xl md:text-[10rem] font-orbitron font-black leading-none text-white tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  299 zł
                </span>
                <span className="text-blue-400 font-bold mt-4 tracking-widest uppercase">Płatność w 3 ratach po 99,67 zł</span>
              </div>

              <ul className="grid md:grid-cols-2 gap-6 text-left mb-16 max-w-2xl mx-auto">
                {["Procesor Ryzen Z1 Extreme", "512GB SSD NVMe Gen4", "16GB RAM LPDDR5X", "Ekran 144Hz 2.5K", "Windows 11 Home Pro", "Etui Premium w zestawie"].map((li, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,1)]"></div>
                    {li}
                  </li>
                ))}
              </ul>

              {/* Order Form - Full Width Mobile */}
              <div className="bg-white/5 rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10 mb-8 w-full max-w-full mx-auto">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src="/images/titango/lenovolegiongo-1.webp"
                    alt="TitanGo Ultra"
                    className="w-20 h-20 object-cover rounded-xl border border-white/20 flex-shrink-0"
                  />
                  <div className="text-left">
                    <p className="font-bold text-white text-lg">TitanGo Ultra</p>
                    <p className="text-xs text-gray-400">8.8" QHD+ | 144Hz | Ryzen Z1</p>
                    <p className="text-blue-500 font-black text-xl">299 zł <span className="text-gray-500 line-through text-sm font-normal">599 zł</span></p>
                  </div>
                </div>

                <form
                  className="space-y-4"
                  onSubmit={handleSubmit}
                >
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Imię i Nazwisko *"
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all text-base"
                  />
                  <input
                    type="tel"
                    required
                    value={formData.tel}
                    onChange={e => setFormData(prev => ({ ...prev, tel: e.target.value }))}
                    placeholder="Numer Telefonu *"
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all text-base"
                  />
                  <input
                    type="text"
                    required
                    value={formData.streetAddress}
                    onChange={e => setFormData(prev => ({ ...prev, streetAddress: e.target.value }))}
                    placeholder="Pełny Adres (Ulica, Miasto, Kod Pocztowy) *"
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all text-base"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed rounded-xl font-orbitron font-black text-lg sm:text-xl shadow-[0_10px_40px_rgba(37,99,235,0.4)] transition-all hover:scale-[1.02] active:scale-95"
                  >
                    {isSubmitting ? 'PRZETWARZANIE...' : 'ZAMÓW TERAZ - PŁATNOŚĆ PRZY ODBIORZE'}
                  </button>
                </form>
              </div>

              <p className="text-gray-500 text-xs">Gwarancja 24 Miesiące | Darmowy Zwrot 30 Dni | Błyskawiczna Wysyłka 24h</p>
            </div>
          </div>
        </div>
      </section>

      {/* Amazon-Style Reviews Section */}
      <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="mb-10">
          {/* Header z tytułem i licznikiem */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h2 className="text-3xl md:text-4xl font-orbitron font-black text-center sm:text-left">Opinie Klientów</h2>
            <div className="flex items-center justify-center sm:justify-end gap-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-5 py-3 rounded-xl border border-blue-500/30">
              <div className="flex gap-1">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className={`w-5 h-5 ${i <= 4 ? 'text-yellow-500' : 'text-yellow-500/50'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-white font-black text-xl">4.8</span>
              <span className="text-gray-400">|</span>
              <span className="text-blue-400 font-bold">1.247 opinii</span>
            </div>
          </div>

          {/* Rating Summary */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10 p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Duża ocena */}
              <div className="text-center md:border-r md:border-white/10 md:pr-8">
                <div className="text-7xl font-black text-white mb-2 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">4.8</div>
                <div className="flex justify-center gap-1 mb-3">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} className={`w-6 h-6 ${i <= 4 ? 'text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]' : 'text-yellow-500/40'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-400 text-sm">Średnia ocena z 5</p>
              </div>

              {/* Paski procentowe */}
              <div className="space-y-3">
                {[
                  { stars: 5, percent: 78 },
                  { stars: 4, percent: 15 },
                  { stars: 3, percent: 5 },
                  { stars: 2, percent: 1 },
                  { stars: 1, percent: 1 },
                ].map(({ stars, percent }) => (
                  <div key={stars} className="flex items-center gap-3 text-sm">
                    <span className="text-white font-medium w-14 flex items-center gap-1">
                      {stars} <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    </span>
                    <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full transition-all" style={{ width: `${percent}%` }} />
                    </div>
                    <span className="text-blue-400 font-bold w-12 text-right">{percent}%</span>
                  </div>
                ))}
              </div>

              {/* Statystyki */}
              <div className="text-center md:border-l md:border-white/10 md:pl-8">
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-center gap-2 text-green-500 mb-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-bold text-sm">ZWERYFIKOWANE</span>
                  </div>
                  <p className="text-xs text-gray-400">Wszystkie opinie pochodzą od zweryfikowanych kupujących</p>
                </div>
                <div className="text-4xl font-black text-white mb-1">1.247</div>
                <p className="text-gray-400 text-sm">wszystkich opinii</p>
                <p className="text-blue-400 text-xs mt-2 font-medium">93% poleca ten produkt</p>
              </div>
            </div>
          </div>
        </div>

        {/* Individual Reviews */}
        <div className="space-y-6">
          {ALL_REVIEWS.slice(0, reviewsToShow).map((review, i) => (
            <div key={i} className="bg-white/5 rounded-2xl p-5 sm:p-6 border border-white/10 hover:border-white/20 transition-all">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-sm">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{review.name}</p>
                  {review.verified && (
                    <p className="text-xs text-green-500 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Zweryfikowany zakup
                    </p>
                  )}
                </div>
                <div className="ml-auto text-right">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(s => (
                      <svg key={s} className={`w-4 h-4 ${s <= review.stars ? 'text-yellow-500' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{review.date}</p>
                </div>
              </div>

              <h4 className="font-bold text-white mb-2">{review.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{review.review}</p>

              <div className="flex items-center gap-4 text-xs text-gray-500">
                <button className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  Pomocne ({review.helpful})
                </button>
                <span>|</span>
                <button className="hover:text-blue-400 transition-colors">Zgłoś</button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {reviewsToShow < ALL_REVIEWS.length && (
          <div className="text-center mt-10">
            <button
              onClick={() => setReviewsToShow(prev => Math.min(prev + 8, ALL_REVIEWS.length))}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl text-sm font-bold transition-all shadow-lg hover:shadow-blue-500/25 hover:scale-105"
            >
              Załaduj kolejne {Math.min(8, ALL_REVIEWS.length - reviewsToShow)} opinie
              <span className="ml-2 text-white/70">({ALL_REVIEWS.length - reviewsToShow} pozostało)</span>
            </button>
          </div>
        )}
        {reviewsToShow >= ALL_REVIEWS.length && (
          <div className="text-center mt-10">
            <p className="text-gray-500 text-sm">Wyświetlono wszystkie {ALL_REVIEWS.length} opinie</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 text-center border-t border-white/5 text-gray-600">
        <p className="text-xs mb-4">TitanGo Ultra to produkt dystrybuowany w ramach ekskluzywnego programu partnerskiego. Ograniczona ilość.</p>
        <p className="text-[10px] max-w-3xl mx-auto leading-loose opacity-50 uppercase tracking-widest font-bold">
          Ta strona nie jest częścią strony Facebook ani Facebook Inc. Ponadto ta strona NIE jest w żaden sposób zatwierdzona przez Facebook. FACEBOOK jest znakiem towarowym FACEBOOK, Inc.
        </p>
      </footer>

      {/* AI Sales Assistant */}
      <AIAssistant />
    </main>
  );
}
