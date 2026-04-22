import { NextRequest, NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

export async function GET(req: NextRequest) {
  // Verifica password
  const password = req.headers.get("x-admin-password");

  if (!ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Admin password not configured" },
      { status: 500 }
    );
  }

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Leggi leads da Google Sheets
  if (!GOOGLE_SHEETS_WEBHOOK_URL) {
    return NextResponse.json(
      { error: "Google Sheets webhook not configured", leads: [] },
      { status: 200 }
    );
  }

  try {
    const res = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`Google Sheets error: ${res.status}`);
    }

    const rawData = await res.json();

    // Il primo elemento è l'header, gli altri sono i dati
    if (!Array.isArray(rawData) || rawData.length < 2) {
      return NextResponse.json({ leads: [] }, { status: 200 });
    }

    const headers = rawData[0];
    const rows = rawData.slice(1);

    // Mappa i dati in oggetti
    const leads = rows.map((row: string[]) => ({
      data: row[0] || "",
      prodotto: row[1] || "",
      pagina: row[2] || "",
      nome: row[3] || "",
      cognome: row[4] || "",
      telefono: row[5] || "",
      email: row[6] || "",
      indirizzo: row[7] || "",
      citta: row[8] || "",
      provincia: row[9] || "",
      cap: row[10] || "",
      prezzo: row[11] || "",
      note: row[12] || "",
      fullshipStatus: row[13] || "",
    })).reverse(); // Più recenti prima

    return NextResponse.json({ leads }, { status: 200 });
  } catch (err) {
    console.error("[Admin] Error fetching leads:", err);
    return NextResponse.json(
      { error: "Failed to fetch leads", leads: [] },
      { status: 200 }
    );
  }
}
