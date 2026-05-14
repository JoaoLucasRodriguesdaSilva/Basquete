import type { Jogador, Partida } from "@/types/partida";

export interface PartidaComId extends Partida {
  id: string;
}

const jogadores: Jogador[] = [];
const partidas: PartidaComId[] = [];

let proximoIdPartida = 1;

export function listarJogadores(): Jogador[] {
  return jogadores;
}

export function buscarJogador(nome: string): Jogador | undefined {
  return jogadores.find((jogador) => jogador.nome === nome);
}

export function criarJogador(jogador: Jogador): Jogador {
  jogadores.push(jogador);
  return jogador;
}

export function atualizarJogador(nomeAtual: string, atualizado: Jogador): Jogador | undefined {
  const indice = jogadores.findIndex((jogador) => jogador.nome === nomeAtual);

  if (indice === -1) {
    return undefined;
  }

  jogadores[indice] = atualizado;
  return jogadores[indice];
}

export function removerJogador(nome: string): boolean {
  const indice = jogadores.findIndex((jogador) => jogador.nome === nome);

  if (indice === -1) {
    return false;
  }

  jogadores.splice(indice, 1);
  return true;
}

export function listarPartidas(): PartidaComId[] {
  return partidas;
}

export function buscarPartida(id: string): PartidaComId | undefined {
  return partidas.find((partida) => partida.id === id);
}

export function criarPartida(partida: Partida): PartidaComId {
  const novaPartida: PartidaComId = {
    ...partida,
    id: String(proximoIdPartida++),
  };

  partidas.push(novaPartida);
  return novaPartida;
}

export function atualizarPartida(id: string, atualizada: Partida): PartidaComId | undefined {
  const indice = partidas.findIndex((partida) => partida.id === id);

  if (indice === -1) {
    return undefined;
  }

  partidas[indice] = {
    ...atualizada,
    id,
  };

  return partidas[indice];
}

export function removerPartida(id: string): boolean {
  const indice = partidas.findIndex((partida) => partida.id === id);

  if (indice === -1) {
    return false;
  }

  partidas.splice(indice, 1);
  return true;
}
