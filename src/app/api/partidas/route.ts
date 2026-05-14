import { NextResponse } from "next/server";

import { criarPartida, listarPartidas } from "@/lib/store";
import { isPartida } from "@/lib/validation";

export async function GET() {
  return NextResponse.json(listarPartidas());
}

export async function POST(request: Request) {
  const body: unknown = await request.json();

  if (!isPartida(body)) {
    return NextResponse.json({ error: "Dados de partida inválidos." }, { status: 400 });
  }

  return NextResponse.json(criarPartida(body), { status: 201 });
}
