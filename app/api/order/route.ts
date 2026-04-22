import { NextRequest, NextResponse } from "next/server";

const FULLSHIP_API_URL =
  process.env.FULLSHIP_API_URL ||
  "https://fullship-proxy.marco-quaranta-info.workers.dev";

const GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

interface OrderPayload {
  cart: {
    cod: boolean;
    id: number;
    code: string;
    totalPrice: string;
    products: { variantId: number; quantity: number; subtotal: string }[];
    shopName: string;
  };
  customer: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    address: string;
    city: string;
    state: string;
    countryCode: string;
    zip: string;
    shippingNotes: string;
  };
  pageId?: string;
  productTitle?: string;
}

async function sendToGoogleSheets(
  body: OrderPayload,
  fullshipStatus: "success" | "error"
) {
  if (!GOOGLE_SHEETS_WEBHOOK_URL) {
    console.log("[Sheets] No webhook URL configured, skipping...");
    return;
  }

  try {
    const sheetData = {
      prodotto: body.productTitle || "N/A",
      pagina: body.pageId || "unknown",
      nome: body.customer.firstName,
      cognome: body.customer.lastName,
      telefono: body.customer.phoneNumber,
      email: body.customer.email || "",
      indirizzo: body.customer.address,
      citta: body.customer.city,
      provincia: body.customer.state,
      cap: body.customer.zip,
      prezzo: body.cart.totalPrice,
      note: body.customer.shippingNotes || "",
      fullshipStatus,
    };

    await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sheetData),
    });

    console.log("[Sheets] Lead saved successfully");
  } catch (err) {
    console.error("[Sheets] Error saving lead:", err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: OrderPayload = await req.json();

    // Invia a Fullship
    const res = await fetch(FULLSHIP_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    const fullshipStatus = res.ok ? "success" : "error";

    // Invia a Google Sheets in parallelo (non blocca la risposta)
    sendToGoogleSheets(body, fullshipStatus);

    return NextResponse.json(data, { status: res.status });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Errore di rete";
    return NextResponse.json({ detail: message }, { status: 500 });
  }
}
