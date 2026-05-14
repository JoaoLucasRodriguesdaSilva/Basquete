import { NextResponse } from "next/server";

import { atualizarJogador, buscarJogador, removerJogador } from "@/lib/store";
import { isJogador } from "@/lib/validation";

interface Params {
  params: Promise<{ nome: string }>;
}

export async function GET(_: Request, { params }: Params) {
  const { nome } = await params;
  const jogador = buscarJogador(nome);

  if (!jogador) {
    return NextResponse.json({ error: "Jogador não encontrado." }, { status: 404 });
  }

  return NextResponse.json(jogador);
}

export async function PUT(request: Request, { params }: Params) {
  const { nome } = await params;
  const body: unknown = await request.json();

  if (!isJogador(body)) {
    return NextResponse.json({ error: "Dados de jogador inválidos." }, { status: 400 });
  }

  const jogadorComNovoNome = buscarJogador(body.nome);

  if (jogadorComNovoNome && body.nome !== nome) {
    return NextResponse.json({ error: "Já existe jogador com esse nome." }, { status: 409 });
  }

  const atualizado = atualizarJogador(nome, body);

  if (!atualizado) {
    return NextResponse.json({ error: "Jogador não encontrado." }, { status: 404 });
  }

  return NextResponse.json(atualizado);
}

export async function DELETE(_: Request, { params }: Params) {
  const { nome } = await params;
  const removido = removerJogador(nome);

  if (!removido) {
    return NextResponse.json({ error: "Jogador não encontrado." }, { status: 404 });
  }

  return new NextResponse(null, { status: 204 });
}
