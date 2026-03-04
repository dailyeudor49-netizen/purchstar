"use client";

import { useState, useEffect, useRef } from "react";

/* ═══════════════════ Product Config ═══════════════════ */

const PRODUCT_TITLE = "SnellaWalk 360";
const PRODUCT_PRICE = 49.99;
const PRODUCT_COMPARE = 99.98;
const SHOP_NAME = "purchstar";

const COLORS = ["Bianco", "Beige", "Grigio"];
const SIZES = ["35", "36", "37", "38", "39", "40", "41", "42", "43", "44"];

const SIZE_TO_FULLSHIP: Record<string, number> = {
  "35": 5901, "36": 5902, "37": 5903, "38": 5904, "39": 5905,
  "40": 5906, "41": 5907, "42": 5908, "43": 5909, "44": 5910,
};

const UPSELL_PRICE = 4.99;
const UPSELL_FULLSHIP_ID = 5932;

/* ═══════════════════ Anti-spam ═══════════════════ */

const STORE_KEY = "cf_ord";
const HOUR = 3600000;
const REDO_WINDOW = 1; // ore per rifare l'ordine

interface SpamStore { t: number; n: number; perm?: boolean }

function getStore(): SpamStore | null {
  try {
    const d = JSON.parse(localStorage.getItem(STORE_KEY)!);
    if (d && typeof d === "object") return d;
  } catch {}
  return null;
}

function setStore(o: SpamStore) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(o)); } catch {}
}

function getSpamState(): { status: "free" | "blocked" } {
  const s = getStore();
  if (!s || !s.t) return { status: "free" };
  if (s.perm) return { status: "blocked" };
  if (s.n >= 2) { setStore({ ...s, perm: true }); return { status: "blocked" }; }
  if (s.n === 1 && Date.now() - s.t >= REDO_WINDOW * HOUR) {
    setStore({ ...s, perm: true });
    return { status: "blocked" };
  }
  return { status: "free" };
}

function recordOrder() {
  const s = getStore();
  const now = Date.now();
  if (!s || !s.t) { setStore({ t: now, n: 1 }); return; }
  const newN = (s.n || 0) + 1;
  setStore({ t: s.t, n: newN, perm: newN >= 2 ? true : undefined });
}

/* ═══════════════════ Province ═══════════════════ */

const PROVINCE = [
  { v: "AG", l: "Agrigento" }, { v: "AL", l: "Alessandria" }, { v: "AN", l: "Ancona" },
  { v: "AO", l: "Aosta" }, { v: "AR", l: "Arezzo" }, { v: "AP", l: "Ascoli Piceno" },
  { v: "AT", l: "Asti" }, { v: "AV", l: "Avellino" }, { v: "BA", l: "Bari" },
  { v: "BT", l: "Barletta-Andria-Trani" }, { v: "BL", l: "Belluno" }, { v: "BN", l: "Benevento" },
  { v: "BG", l: "Bergamo" }, { v: "BI", l: "Biella" }, { v: "BO", l: "Bologna" },
  { v: "BZ", l: "Bolzano" }, { v: "BS", l: "Brescia" }, { v: "BR", l: "Brindisi" },
  { v: "CA", l: "Cagliari" }, { v: "CL", l: "Caltanissetta" }, { v: "CB", l: "Campobasso" },
  { v: "CE", l: "Caserta" }, { v: "CT", l: "Catania" }, { v: "CZ", l: "Catanzaro" },
  { v: "CH", l: "Chieti" }, { v: "CO", l: "Como" }, { v: "CS", l: "Cosenza" },
  { v: "CR", l: "Cremona" }, { v: "KR", l: "Crotone" }, { v: "CN", l: "Cuneo" },
  { v: "EN", l: "Enna" }, { v: "FM", l: "Fermo" }, { v: "FE", l: "Ferrara" },
  { v: "FI", l: "Firenze" }, { v: "FG", l: "Foggia" }, { v: "FC", l: "Forlì-Cesena" },
  { v: "FR", l: "Frosinone" }, { v: "GE", l: "Genova" }, { v: "GO", l: "Gorizia" },
  { v: "GR", l: "Grosseto" }, { v: "IM", l: "Imperia" }, { v: "IS", l: "Isernia" },
  { v: "SP", l: "La Spezia" }, { v: "AQ", l: "L'Aquila" }, { v: "LT", l: "Latina" },
  { v: "LE", l: "Lecce" }, { v: "LC", l: "Lecco" }, { v: "LI", l: "Livorno" },
  { v: "LO", l: "Lodi" }, { v: "LU", l: "Lucca" }, { v: "MC", l: "Macerata" },
  { v: "MN", l: "Mantova" }, { v: "MS", l: "Massa-Carrara" }, { v: "MT", l: "Matera" },
  { v: "ME", l: "Messina" }, { v: "MI", l: "Milano" }, { v: "MO", l: "Modena" },
  { v: "MB", l: "Monza e Brianza" }, { v: "NA", l: "Napoli" }, { v: "NO", l: "Novara" },
  { v: "NU", l: "Nuoro" }, { v: "OR", l: "Oristano" }, { v: "PD", l: "Padova" },
  { v: "PA", l: "Palermo" }, { v: "PR", l: "Parma" }, { v: "PV", l: "Pavia" },
  { v: "PG", l: "Perugia" }, { v: "PU", l: "Pesaro e Urbino" }, { v: "PE", l: "Pescara" },
  { v: "PC", l: "Piacenza" }, { v: "PI", l: "Pisa" }, { v: "PT", l: "Pistoia" },
  { v: "PN", l: "Pordenone" }, { v: "PZ", l: "Potenza" }, { v: "PO", l: "Prato" },
  { v: "RG", l: "Ragusa" }, { v: "RA", l: "Ravenna" }, { v: "RC", l: "Reggio Calabria" },
  { v: "RE", l: "Reggio Emilia" }, { v: "RI", l: "Rieti" }, { v: "RN", l: "Rimini" },
  { v: "RM", l: "Roma" }, { v: "RO", l: "Rovigo" }, { v: "SA", l: "Salerno" },
  { v: "SS", l: "Sassari" }, { v: "SV", l: "Savona" }, { v: "SI", l: "Siena" },
  { v: "SR", l: "Siracusa" }, { v: "SO", l: "Sondrio" }, { v: "SU", l: "Sud Sardegna" },
  { v: "TA", l: "Taranto" }, { v: "TE", l: "Teramo" }, { v: "TR", l: "Terni" },
  { v: "TO", l: "Torino" }, { v: "TP", l: "Trapani" }, { v: "TN", l: "Trento" },
  { v: "TV", l: "Treviso" }, { v: "TS", l: "Trieste" }, { v: "UD", l: "Udine" },
  { v: "VA", l: "Varese" }, { v: "VE", l: "Venezia" }, { v: "VB", l: "Verbano-Cusio-Ossola" },
  { v: "VC", l: "Vercelli" }, { v: "VR", l: "Verona" }, { v: "VV", l: "Vibo Valentia" },
  { v: "VI", l: "Vicenza" }, { v: "VT", l: "Viterbo" },
];

/* ═══════════════════ Helpers ═══════════════════ */

function fmtPrice(n: number) {
  return n.toFixed(2).replace(".", ",") + " \u20AC";
}

/* ═══════════════════ Main Component ═══════════════════ */

export function OrderSection({ image }: { image: string }) {
  const [color, setColor] = useState(COLORS[0]);
  const [size, setSize] = useState("39");
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | "blocked">(1);
  const [upsell, setUpsell] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const scrollYRef = useRef(0);
  const modalRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    firstName: "", lastName: "", phoneNumber: "", email: "",
    address: "", city: "", state: "", zip: "", shippingNotes: "",
  });

  const updateForm = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
  };

  /* Body scroll lock */
  useEffect(() => {
    if (modalOpen) {
      scrollYRef.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.width = "100%";
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollYRef.current);
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [modalOpen]);

  const openModal = () => {
    const state = getSpamState();
    if (state.status === "blocked") {
      setModalOpen(true);
      setStep("blocked");
      return;
    }
    setModalOpen(true);
    setUpsell(false);
    setStep(1);
    setErrors({});
    setSubmitting(false);
    try {
      const w = window as unknown as Record<string, unknown>;
      if (typeof w.fbq === "function") (w.fbq as Function)("track", "InitiateCheckout", { content_ids: [String(SIZE_TO_FULLSHIP[size] || 0)], content_type: "product", value: PRODUCT_PRICE, currency: "EUR" });
    } catch {}
  };

  const closeModal = () => setModalOpen(false);

  const goToStep = (s: 1 | 2 | "blocked") => {
    setStep(s);
    if (modalRef.current) modalRef.current.scrollTop = 0;
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.firstName.trim()) errs.firstName = "Campo obbligatorio";
    if (!form.lastName.trim()) errs.lastName = "Campo obbligatorio";
    const digits = form.phoneNumber.replace(/\D/g, "");
    if (!form.phoneNumber.trim()) errs.phoneNumber = "Campo obbligatorio";
    else if (digits.length < 7) errs.phoneNumber = "Inserisci almeno 7 cifre";
    if (!form.address.trim()) errs.address = "Campo obbligatorio";
    if (!form.city.trim()) errs.city = "Campo obbligatorio";
    if (!form.state) errs.state = "Campo obbligatorio";
    if (!form.zip.trim()) errs.zip = "Campo obbligatorio";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    const state = getSpamState();
    if (state.status === "blocked") { goToStep("blocked"); return; }
    setSubmitting(true);

    const fid = SIZE_TO_FULLSHIP[size] || 0;
    const products: { variantId: number; quantity: number; subtotal: string }[] = [
      { variantId: fid, quantity: 1, subtotal: PRODUCT_PRICE.toFixed(2) },
    ];
    let totalPrice = PRODUCT_PRICE;
    if (upsell) {
      products.push({ variantId: UPSELL_FULLSHIP_ID, quantity: 1, subtotal: UPSELL_PRICE.toFixed(2) });
      totalPrice += UPSELL_PRICE;
    }

    const payload = {
      cart: { cod: true, id: fid, code: String(Date.now()), totalPrice: totalPrice.toFixed(2), products, shopName: SHOP_NAME },
      customer: {
        firstName: form.firstName.trim(), lastName: form.lastName.trim(),
        phoneNumber: "+39 " + form.phoneNumber.trim(),
        address: form.address.trim(), city: form.city.trim(), state: form.state,
        countryCode: "IT", zip: form.zip.trim(),
        email: form.email.trim(), shippingNotes: form.shippingNotes.trim(),
      },
    };

    /* Save for TY page + reset purchase flag */
    try {
      localStorage.removeItem("cf_purchase_fired");
      localStorage.setItem("cf_thankyou", JSON.stringify({
        product: { title: PRODUCT_TITLE, image },
        variant: { size, color, price: PRODUCT_PRICE.toFixed(2) },
        customer: payload.customer,
        upsell: upsell ? { name: "Plantare Ortopedico", price: UPSELL_PRICE.toFixed(2) } : null,
        totalPrice: totalPrice.toFixed(2),
        timestamp: Date.now(),
        gadsConv: "AW-17553930868/TbPiCNiu25sbEPT0rrJB",
      }));
      localStorage.setItem("userData", JSON.stringify({
        nome: form.firstName.trim(),
        cognome: form.lastName.trim(),
        telefono: form.phoneNumber.trim(),
        indirizzo: form.address.trim(),
        email: form.email.trim(),
      }));
    } catch {}

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json();
      if (!res.ok) {
        let msg = `Errore ${res.status}: `;
        if (body?.cart?.non_field_errors) msg += body.cart.non_field_errors.join(", ");
        else if (body?.detail) msg += body.detail;
        else msg += JSON.stringify(body);
        alert(msg);
        setSubmitting(false);
        return;
      }
      recordOrder();
      window.location.href = "/snellawalk360/ty";
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "riprova";
      alert("Errore di rete: " + message);
      setSubmitting(false);
    }
  };

  const total = PRODUCT_PRICE + (upsell ? UPSELL_PRICE : 0);

  /* shared input class */
  const inputCls = (field: string) =>
    `w-full py-3 px-3.5 border-[1.5px] rounded-[10px] text-sm text-gray-700 bg-white outline-none transition-colors ${
      errors[field] ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-[#e87a00] focus:shadow-[0_0_0_3px_rgba(232,122,0,0.1)]"
    }`;

  const goldBtnCls = "w-full py-4 rounded-full text-white text-base font-bold cursor-pointer transition-all flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(180,120,0,0.3)] hover:shadow-[0_6px_22px_rgba(180,120,0,0.4)]";
  const goldBg = { background: "linear-gradient(to bottom, #f0a030, #d48806)" };

  return (
    <>
      {/* ─── Variant Selectors ─── */}
      <div className="mb-4" id="taglie">
        <p className="text-sm font-semibold text-gray-500 mb-2.5">Taglia</p>
        <div className="flex flex-wrap gap-2.5">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`h-[50px] w-[50px] rounded-full border-2 text-[15px] font-medium transition-all ${
                size === s
                  ? "border-[#1B5E6B] bg-[#1B5E6B] text-white font-semibold"
                  : "border-gray-300 bg-white text-gray-700 hover:border-gray-500"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Trigger Button ─── */}
      <div className="flex flex-col items-center w-full my-5" id="ordina">
        <button
          onClick={openModal}
          style={goldBg}
          className="inline-flex items-center justify-center gap-2.5 w-full max-w-[600px] px-9 py-[18px] rounded-full text-white text-lg font-bold border-none cursor-pointer transition-all shadow-[0_4px_20px_rgba(180,120,0,0.35)] hover:shadow-[0_8px_30px_rgba(180,120,0,0.45)] hover:-translate-y-0.5 active:translate-y-0"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
            <path d="M3 3h18v2H3zm0 4h18v14H3zm4 4h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zM7 15h10v2H7z" />
          </svg>
          Ordina Ora — Pagamento alla Consegna
        </button>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 mt-2.5 tracking-wide">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#27ae60] shrink-0">
            <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
          </svg>
          Spedizione rapida e gratuita
        </span>
      </div>

      {/* ─── Modal Overlay ─── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[2147483647] flex items-center justify-center bg-black/55 p-4"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div
            ref={modalRef}
            className="animate-cf-slide-up bg-white rounded-2xl w-full max-w-[480px] relative shadow-[0_25px_60px_rgba(0,0,0,0.2)] max-h-[92vh] overflow-y-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-5 pt-[18px] pb-3.5 border-b border-gray-100">
              <button
                onClick={() => goToStep(1)}
                className={`w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition ${step === 1 || step === "blocked" ? "invisible" : ""}`}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-gray-700 fill-none" strokeWidth={2.5}><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <span className="text-base font-bold text-gray-900">
                {step === 1 ? "Il Tuo Ordine" : step === 2 ? "Dove spediamo?" : ""}
              </span>
              <button onClick={closeModal} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition">
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-gray-500 fill-none" strokeWidth={2}><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>

            {/* ── Stepper ── */}
            {step !== "blocked" && (
              <div className="flex items-center justify-center gap-0 px-5 pt-4 pb-3">
                <div className="flex items-center">
                  <span className={`w-[26px] h-[26px] rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${step >= 1 ? "bg-[#e87a00] text-white" : "bg-gray-200 text-gray-400"}`}>1</span>
                  <span className={`text-xs font-semibold ml-1.5 whitespace-nowrap ${step >= 1 ? "text-[#e87a00]" : "text-gray-400"}`}>Riepilogo</span>
                </div>
                <div className={`flex-1 h-[3px] mx-2 rounded transition-colors ${step === 2 ? "bg-[#e87a00]" : "bg-gray-200"}`} />
                <div className="flex items-center">
                  <span className={`w-[26px] h-[26px] rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${step === 2 ? "bg-[#e87a00] text-white" : "bg-gray-200 text-gray-400"}`}>2</span>
                  <span className={`text-xs font-semibold ml-1.5 whitespace-nowrap ${step === 2 ? "text-[#e87a00]" : "text-gray-400"}`}>Dati spedizione</span>
                </div>
              </div>
            )}

            {/* ══════════ STEP 1: RIEPILOGO ══════════ */}
            {step === 1 && (
              <div className="px-5 pt-4 pb-5">
                {/* Product card */}
                <div className="flex gap-3.5 items-center p-3.5 bg-[#fafafa] border border-gray-200 rounded-xl mb-4">
                  <div className="w-[72px] h-[72px] rounded-[10px] border border-gray-200 overflow-hidden shrink-0 bg-white">
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-semibold text-gray-900 mb-0.5 leading-tight">{PRODUCT_TITLE}</p>
                    <p className="text-[13px] text-gray-400 mb-1">Taglia {size}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[17px] font-bold text-[#137333]">{fmtPrice(PRODUCT_PRICE)}</span>
                      <span className="text-sm text-gray-400 line-through">{fmtPrice(PRODUCT_COMPARE)}</span>
                    </div>
                  </div>
                  <span onClick={closeModal} className="text-xs text-[#e87a00] font-semibold cursor-pointer underline shrink-0 self-start mt-0.5">Modifica</span>
                </div>

                {/* Social proof */}
                <div className="flex items-center gap-1.5 text-sm text-gray-400 mb-3 px-0.5">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#f5a623] shrink-0"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" /></svg>
                  <span>Il <strong className="text-gray-600">73%</strong> dei clienti aggiunge anche questo al proprio ordine</span>
                </div>

                {/* Upsell */}
                <div
                  onClick={() => setUpsell(!upsell)}
                  className={`flex items-start gap-3 p-3.5 border-2 rounded-xl cursor-pointer transition-all select-none mb-5 flex-wrap ${
                    upsell ? "border-[#e87a00] bg-[#fffbf5]" : "border-gray-200 hover:border-[#e87a00] hover:bg-[#fffbf5]"
                  }`}
                >
                  <div className={`w-[22px] h-[22px] border-2 rounded-[5px] flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                    upsell ? "bg-[#e87a00] border-[#e87a00]" : "border-gray-300"
                  }`}>
                    <svg viewBox="0 0 24 24" className={`w-[13px] h-[13px] stroke-white fill-none transition-opacity ${upsell ? "opacity-100" : "opacity-0"}`} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                  </div>
                  <div className="w-16 h-16 rounded-lg border border-gray-200 overflow-hidden shrink-0 bg-[#fafafa]">
                    <img src="https://www.otomedical.it/wp-content/uploads/2023/01/plantari-ortopedici.png" alt="Plantare Ortopedico" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 mb-px">Aggiungi al tuo ordine</p>
                    <p className="text-[15px] font-semibold text-gray-900">Plantare Ortopedico</p>
                    <p className="text-[13px] text-gray-400 leading-snug mb-1.5">Supporto arco plantare e postura. Taglia unica (35-44).</p>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm text-gray-400 line-through">19,99 &euro;</span>
                      <span className="text-[17px] font-bold text-[#137333]">+4,99 &euro;</span>
                    </div>
                  </div>
                </div>

                {/* Proceed */}
                <button onClick={() => goToStep(2)} style={goldBg} className={goldBtnCls}>
                  Procedi con l&apos;ordine
                  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
              </div>
            )}

            {/* ══════════ STEP 2: DATI SPEDIZIONE ══════════ */}
            {step === 2 && (
              <div className="px-5 pt-4 pb-5">
                {/* Product cards */}
                <div className="mb-[18px] flex flex-col gap-2.5">
                  <div className="flex gap-3 items-center p-3 bg-[#fafafa] border border-gray-200 rounded-[10px]">
                    <div className="w-[60px] h-[60px] rounded-lg border border-gray-200 overflow-hidden shrink-0 bg-white">
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-gray-900 leading-tight">{PRODUCT_TITLE}</p>
                      <p className="text-[11px] text-gray-400">Taglia {size}</p>
                    </div>
                    <span className="text-[15px] font-bold text-[#137333] shrink-0">{fmtPrice(PRODUCT_PRICE)}</span>
                  </div>
                  {upsell && (
                    <div className="flex gap-3 items-center p-3 bg-[#fafafa] border border-gray-200 rounded-[10px]">
                      <div className="w-[60px] h-[60px] rounded-lg border border-gray-200 overflow-hidden shrink-0 bg-[#fafafa]">
                        <img src="https://www.otomedical.it/wp-content/uploads/2023/01/plantari-ortopedici.png" alt="Plantare" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-gray-900 leading-tight">Plantare Ortopedico</p>
                        <p className="text-[11px] text-gray-400">Taglia unica (35-44)</p>
                      </div>
                      <span className="text-[15px] font-bold text-[#137333] shrink-0">{fmtPrice(UPSELL_PRICE)}</span>
                    </div>
                  )}
                </div>

                {/* Form */}
                <div className="flex gap-2.5 max-md:flex-col">
                  <div className="flex-1 mb-3.5">
                    <label className="block text-[13px] font-semibold text-gray-700 mb-1">Nome <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Mario" value={form.firstName} onChange={(e) => updateForm("firstName", e.target.value)} className={inputCls("firstName")} />
                    {errors.firstName && <p className="text-[11px] text-red-500 mt-0.5">{errors.firstName}</p>}
                  </div>
                  <div className="flex-1 mb-3.5">
                    <label className="block text-[13px] font-semibold text-gray-700 mb-1">Cognome <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Rossi" value={form.lastName} onChange={(e) => updateForm("lastName", e.target.value)} className={inputCls("lastName")} />
                    {errors.lastName && <p className="text-[11px] text-red-500 mt-0.5">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="mb-3.5">
                  <label className="block text-[13px] font-semibold text-gray-700 mb-1">Telefono <span className="text-red-500">*</span></label>
                  <div className={`flex items-stretch border-[1.5px] rounded-[10px] overflow-hidden transition-colors ${errors.phoneNumber ? "border-red-500 bg-red-50" : "border-gray-300 focus-within:border-[#e87a00] focus-within:shadow-[0_0_0_3px_rgba(232,122,0,0.1)]"}`}>
                    <span className="py-3 px-3 text-sm font-semibold text-gray-500 bg-gray-100 border-r-[1.5px] border-gray-300 flex items-center shrink-0">+39</span>
                    <input type="tel" placeholder="333 123 4567" value={form.phoneNumber} onChange={(e) => updateForm("phoneNumber", e.target.value)} className="flex-1 py-3 px-3.5 text-sm text-gray-700 outline-none bg-transparent" />
                  </div>
                  <p className="text-[11px] text-gray-400 mt-0.5">Per ricevere il codice di tracciamento via SMS</p>
                  {errors.phoneNumber && <p className="text-[11px] text-red-500 mt-0.5">{errors.phoneNumber}</p>}
                </div>

                <div className="mb-3.5">
                  <label className="block text-[13px] font-semibold text-gray-700 mb-1">Email <span className="text-xs font-normal text-[#b87a00]">(facoltativo)</span></label>
                  <input type="email" placeholder="mario.rossi@email.com" value={form.email} onChange={(e) => updateForm("email", e.target.value)} className={inputCls("email")} />
                  <p className="text-[11px] text-gray-400 mt-0.5">Per ricevere la conferma d&apos;ordine via email</p>
                </div>

                <div className="mb-3.5">
                  <label className="block text-[13px] font-semibold text-gray-700 mb-1">Indirizzo completo <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Via Roma 1, interno 5" value={form.address} onChange={(e) => updateForm("address", e.target.value)} className={inputCls("address")} />
                  {errors.address && <p className="text-[11px] text-red-500 mt-0.5">{errors.address}</p>}
                </div>

                <div className="flex gap-2.5">
                  <div className="flex-1 mb-3.5">
                    <label className="block text-[13px] font-semibold text-gray-700 mb-1">Citt&agrave; <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Milano" value={form.city} onChange={(e) => updateForm("city", e.target.value)} className={inputCls("city")} />
                    {errors.city && <p className="text-[11px] text-red-500 mt-0.5">{errors.city}</p>}
                  </div>
                  <div className="flex-1 mb-3.5">
                    <label className="block text-[13px] font-semibold text-gray-700 mb-1">Provincia <span className="text-red-500">*</span></label>
                    <select value={form.state} onChange={(e) => updateForm("state", e.target.value)} className={inputCls("state")}>
                      <option value="">--</option>
                      {PROVINCE.map((p) => <option key={p.v} value={p.v}>{p.l}</option>)}
                    </select>
                    {errors.state && <p className="text-[11px] text-red-500 mt-0.5">{errors.state}</p>}
                  </div>
                  <div className="flex-1 mb-3.5">
                    <label className="block text-[13px] font-semibold text-gray-700 mb-1">CAP <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="20100" value={form.zip} onChange={(e) => updateForm("zip", e.target.value)} className={inputCls("zip")} />
                    {errors.zip && <p className="text-[11px] text-red-500 mt-0.5">{errors.zip}</p>}
                  </div>
                </div>

                <div className="mb-3.5">
                  <label className="block text-[13px] font-semibold text-gray-700 mb-1">Note per il corriere <span className="text-xs font-normal text-[#b87a00]">(facoltativo)</span></label>
                  <textarea placeholder="Es. citofono non funzionante, lasciare al vicino, secondo piano..." rows={2} value={form.shippingNotes} onChange={(e) => updateForm("shippingNotes", e.target.value)} className="w-full py-3 px-3.5 border-[1.5px] border-gray-300 rounded-[10px] text-sm text-gray-700 bg-white outline-none transition-colors resize-y min-h-[56px] focus:border-[#e87a00] focus:shadow-[0_0_0_3px_rgba(232,122,0,0.1)]" />
                </div>

                {/* Breakdown */}
                <div className="border-t border-gray-200 mt-[18px] pt-3.5 mb-4">
                  <div className="flex justify-between items-center py-1 text-[13px] text-gray-500">
                    <span>Scarpe</span><span className="font-medium">{fmtPrice(PRODUCT_PRICE)}</span>
                  </div>
                  {upsell && (
                    <div className="flex justify-between items-center py-1 text-[13px] text-gray-500">
                      <span>Plantare Ortopedico</span><span className="font-medium">{fmtPrice(UPSELL_PRICE)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-1 text-[13px] text-gray-500">
                    <span>Spedizione</span><span className="font-semibold text-[#137333]">GRATUITA</span>
                  </div>
                  <div className="flex justify-between items-center pt-2.5 mt-1.5 border-t-2 border-gray-900 text-[15px] font-bold text-gray-900">
                    <span>Totale da pagare al corriere</span>
                    <span className="text-[17px] text-[#137333]">{fmtPrice(total)}</span>
                  </div>
                </div>

                {/* COD warning */}
                <div className="bg-[#fff8f0] border-[1.5px] border-[#f5d5a0] rounded-[10px] p-3.5 mb-[18px] text-xs text-[#8a5a00] leading-relaxed">
                  <strong className="font-bold text-[#137333]">Importante:</strong> Cliccando su &quot;Conferma Ordine&quot; ti impegni a ricevere il pacco e pagare <strong className="font-bold text-[#137333]">{fmtPrice(total)}</strong> in contanti al corriere. Inserisci dati reali, un nostro operatore potrebbe contattarti per la conferma.
                </div>

                {/* Submit */}
                <button onClick={handleSubmit} disabled={submitting} style={goldBg} className={`${goldBtnCls} disabled:opacity-60 disabled:cursor-wait`}>
                  {submitting ? (
                    <div className="w-5 h-5 border-[3px] border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth={2}><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      <span>Conferma Ordine — Paga alla Consegna</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* ══════════ BLOCKED ══════════ */}
            {step === "blocked" && (
              <div className="text-center py-[30px] px-5">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "linear-gradient(135deg, #e74c3c, #c0392b)" }}>
                  <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-white fill-none" strokeWidth={3}><path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                </div>
                <h3 className="text-lg font-extrabold text-red-500 mb-2">Ordine non disponibile</h3>
                <p className="text-sm text-gray-500 mb-5 leading-relaxed">Hai già effettuato un ordine su questo sito. Non è possibile effettuare ulteriori ordini.</p>
                <button onClick={closeModal} className="py-3.5 px-8 bg-gray-400 text-white rounded-full text-[15px] font-semibold cursor-pointer w-full">Chiudi</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
