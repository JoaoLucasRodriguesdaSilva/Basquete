import type { Jogador, Partida } from "@/types/partida";

export interface PartidaComId extends Partida {
  id: string;
}

const jogadores: Jogador[] = [];
const partidas: PartidaComId[] = [];

let proximoIdPartida = 1;
let filaDeEscrita: Promise<void> = Promise.resolve();

function clonarJogador(jogador: Jogador): Jogador {
  return { ...jogador };
}

function normalizarJogador(jogador: Jogador): Jogador {
  return {
    nome: jogador.nome.trim(),
    pontos: jogador.pontos,
  };
}

function clonarPartida(partida: PartidaComId): PartidaComId {
  return {
    ...partida,
    jogadores1: partida.jogadores1.map(clonarJogador),
    jogadores2: partida.jogadores2.map(clonarJogador),
  };
}

function clonarPartidaSemId(partida: Partida): Partida {
  return {
    ...partida,
    jogadores1: partida.jogadores1.map(clonarJogador),
    jogadores2: partida.jogadores2.map(clonarJogador),
  };
}

function normalizarPartida(partida: Partida): Partida {
  return {
    ...partida,
    time1: partida.time1.trim(),
    time2: partida.time2.trim(),
    jogadores1: partida.jogadores1.map(normalizarJogador),
    jogadores2: partida.jogadores2.map(normalizarJogador),
  };
}

function executarExclusivo<T>(operacao: () => T): Promise<T> {
  const resultado = filaDeEscrita.then(() => operacao());

  filaDeEscrita = resultado.then(
    () => undefined,
    (erro) => {
      console.error("Erro no armazenamento em memória.", erro);
      return undefined;
    },
  );
  return resultado;
}

type ResultadoCriacaoJogador = { sucesso: true; jogador: Jogador } | { sucesso: false; motivo: "duplicado" };
type ResultadoAtualizacaoJogador =
  | { sucesso: true; jogador: Jogador }
  | { sucesso: false; motivo: "nao_encontrado" | "duplicado" };
type ResultadoAtualizacaoPartida =
  | { sucesso: true; partida: PartidaComId }
  | { sucesso: false; motivo: "nao_encontrado" };

export function listarJogadores(): Jogador[] {
  return jogadores.map(clonarJogador);
}

export function buscarJogador(nome: string): Jogador | undefined {
  const jogador = jogadores.find((item) => item.nome === nome);
  return jogador ? clonarJogador(jogador) : undefined;
}

export async function criarJogador(jogador: Jogador): Promise<ResultadoCriacaoJogador> {
  return executarExclusivo(() => {
    const jogadorNormalizado = normalizarJogador(jogador);

    if (jogadores.some((item) => item.nome === jogadorNormalizado.nome)) {
      return { sucesso: false, motivo: "duplicado" };
    }

    const jogadorClonado = clonarJogador(jogadorNormalizado);
    jogadores.push(jogadorClonado);
    return { sucesso: true, jogador: clonarJogador(jogadorClonado) };
  });
}

export async function atualizarJogador(
  nomeAtual: string,
  atualizado: Jogador,
): Promise<ResultadoAtualizacaoJogador> {
  return executarExclusivo(() => {
    const jogadorNormalizado = normalizarJogador(atualizado);
    const indice = jogadores.findIndex((jogador) => jogador.nome === nomeAtual);

    if (indice === -1) {
      return { sucesso: false, motivo: "nao_encontrado" };
    }

    const jogadorDuplicado = jogadores.find(
      (jogador, outroIndice) => jogador.nome === jogadorNormalizado.nome && outroIndice !== indice,
    );

    if (jogadorDuplicado) {
      return { sucesso: false, motivo: "duplicado" };
    }

    jogadores[indice] = clonarJogador(jogadorNormalizado);
    return { sucesso: true, jogador: clonarJogador(jogadores[indice]) };
  });
}

export async function removerJogador(nome: string): Promise<boolean> {
  return executarExclusivo(() => {
    const indice = jogadores.findIndex((jogador) => jogador.nome === nome);

    if (indice === -1) {
      return false;
    }

    jogadores.splice(indice, 1);
    return true;
  });
}

export function listarPartidas(): PartidaComId[] {
  return partidas.map(clonarPartida);
}

export function buscarPartida(id: string): PartidaComId | undefined {
  const partida = partidas.find((item) => item.id === id);
  return partida ? clonarPartida(partida) : undefined;
}

export async function criarPartida(partida: Partida): Promise<PartidaComId> {
  return executarExclusivo(() => {
    const id = String(proximoIdPartida);
    proximoIdPartida += 1;
    const partidaNormalizada = normalizarPartida(partida);
    const partidaClonada = clonarPartidaSemId(partidaNormalizada);
    const novaPartida: PartidaComId = {
      ...partidaClonada,
      id,
    };

    partidas.push(novaPartida);
    return clonarPartida(novaPartida);
  });
}

export async function atualizarPartida(
  id: string,
  atualizada: Partida,
): Promise<ResultadoAtualizacaoPartida> {
  return executarExclusivo(() => {
    const partidaNormalizada = normalizarPartida(atualizada);
    const indice = partidas.findIndex((partida) => partida.id === id);

    if (indice === -1) {
      return { sucesso: false, motivo: "nao_encontrado" };
    }

    partidas[indice] = {
      ...clonarPartidaSemId(partidaNormalizada),
      id,
    };

    return { sucesso: true, partida: clonarPartida(partidas[indice]) };
  });
}

export async function removerPartida(id: string): Promise<boolean> {
  return executarExclusivo(() => {
    const indice = partidas.findIndex((partida) => partida.id === id);

    if (indice === -1) {
      return false;
    }

    partidas.splice(indice, 1);
    return true;
  });
}
