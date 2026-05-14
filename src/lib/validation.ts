import type { Jogador, Partida } from "@/types/partida";

const CRONOMETRO_PERIODO_REGEX = /^(?:[0-9]:[0-5][0-9]|10:00)$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isJogador(value: unknown): value is Jogador {
  if (!isRecord(value)) {
    return false;
  }

  const { nome, pontos } = value;

  return (
    typeof nome === "string" &&
    nome.trim().length > 0 &&
    typeof pontos === "number" &&
    Number.isInteger(pontos) &&
    pontos >= 0
  );
}

export function isPartida(value: unknown): value is Partida {
  if (!isRecord(value)) {
    return false;
  }

  const {
    periodo,
    cronometroPeriodo,
    time1,
    pontos1,
    jogadores1,
    time2,
    pontos2,
    jogadores2,
  } = value;

  return (
    (periodo === 1 || periodo === 2 || periodo === 3 || periodo === 4) &&
    typeof cronometroPeriodo === "string" &&
    CRONOMETRO_PERIODO_REGEX.test(cronometroPeriodo) &&
    typeof time1 === "string" &&
    time1.trim().length > 0 &&
    typeof pontos1 === "number" &&
    Number.isInteger(pontos1) &&
    pontos1 >= 0 &&
    Array.isArray(jogadores1) &&
    jogadores1.every(isJogador) &&
    typeof time2 === "string" &&
    time2.trim().length > 0 &&
    typeof pontos2 === "number" &&
    Number.isInteger(pontos2) &&
    pontos2 >= 0 &&
    Array.isArray(jogadores2) &&
    jogadores2.every(isJogador)
  );
}
