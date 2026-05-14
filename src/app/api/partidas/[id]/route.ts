import { NextResponse } from "next/server";

import { atualizarPartida, buscarPartida, removerPartida } from "@/lib/store";
import { isPartida } from "@/lib/validation";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_: Request, { params }: Params) {
  const { id } = await params;
  const idDecodificado = decodeURIComponent(id);
  const partida = buscarPartida(idDecodificado);

  if (!partida) {
    return NextResponse.json({ error: "Partida não encontrada." }, { status: 404 });
  }

  return NextResponse.json(partida);
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  const idDecodificado = decodeURIComponent(id);
  const body: unknown = await request.json();

  if (!isPartida(body)) {
    return NextResponse.json({ error: "Dados de partida inválidos." }, { status: 400 });
  }

  const resultado = await atualizarPartida(idDecodificado, body);

  if (!resultado.sucesso) {
    return NextResponse.json({ error: "Partida não encontrada." }, { status: 404 });
  }

  return NextResponse.json(resultado.partida);
}

export async function DELETE(_: Request, { params }: Params) {
  const { id } = await params;
  const idDecodificado = decodeURIComponent(id);
  const removida = await removerPartida(idDecodificado);

  if (!removida) {
    return NextResponse.json({ error: "Partida não encontrada." }, { status: 404 });
  }

  return new NextResponse(null, { status: 204 });
}
