import { NextResponse } from "next/server";

import { criarJogador, listarJogadores } from "@/lib/store";
import { isJogador } from "@/lib/validation";

export async function GET() {
  return NextResponse.json(listarJogadores());
}

export async function POST(request: Request) {
  const body: unknown = await request.json();

  if (!isJogador(body)) {
    return NextResponse.json({ error: "Dados de jogador inválidos." }, { status: 400 });
  }

  const resultado = await criarJogador(body);

  if (!resultado.sucesso) {
    return NextResponse.json({ error: "Jogador já existe." }, { status: 409 });
  }

  return NextResponse.json(resultado.jogador, { status: 201 });
}
