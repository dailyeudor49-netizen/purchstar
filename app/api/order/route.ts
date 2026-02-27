import { NextRequest, NextResponse } from "next/server";

const FULLSHIP_API_URL =
  process.env.FULLSHIP_API_URL ||
  "https://fullship-proxy.marco-quaranta-info.workers.dev";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await fetch(FULLSHIP_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Errore di rete";
    return NextResponse.json({ detail: message }, { status: 500 });
  }
}
