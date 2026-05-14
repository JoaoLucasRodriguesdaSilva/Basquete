import { NextResponse } from "next/server";

import { atualizarJogador, buscarJogador, removerJogador } from "@/lib/store";
import { isJogador } from "@/lib/validation";

interface Params {
  params: Promise<{ nome: string }>;
}

export async function GET(_: Request, { params }: Params) {
  const { nome } = await params;
  const nomeDecodificado = decodeURIComponent(nome).trim();
  const jogador = buscarJogador(nomeDecodificado);

  if (!jogador) {
    return NextResponse.json({ error: "Jogador não encontrado." }, { status: 404 });
  }

  return NextResponse.json(jogador);
}

export async function PUT(request: Request, { params }: Params) {
  const { nome } = await params;
  const nomeDecodificado = decodeURIComponent(nome).trim();
  const body: unknown = await request.json();

  if (!isJogador(body)) {
    return NextResponse.json({ error: "Dados de jogador inválidos." }, { status: 400 });
  }

  const resultado = await atualizarJogador(nomeDecodificado, body);

  if (!resultado.sucesso && resultado.motivo === "duplicado") {
    return NextResponse.json({ error: "Já existe jogador com esse nome." }, { status: 409 });
  }

  if (!resultado.sucesso) {
    return NextResponse.json({ error: "Jogador não encontrado." }, { status: 404 });
  }

  return NextResponse.json(resultado.jogador);
}

export async function DELETE(_: Request, { params }: Params) {
  const { nome } = await params;
  const nomeDecodificado = decodeURIComponent(nome).trim();
  const removido = await removerJogador(nomeDecodificado);

  if (!removido) {
    return NextResponse.json({ error: "Jogador não encontrado." }, { status: 404 });
  }

  return new NextResponse(null, { status: 204 });
}
